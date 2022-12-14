const express = require('express');
const { requireAuth } = require('../../utils/auth')
const { Spot, SpotImage, Review, User, ReviewImage, Booking } = require('../../db/models');
const sequelize = require('sequelize');
const user = require('../../db/models/user');
const router = express.Router();
const { Op } = require('sequelize')

router.get('/current', requireAuth, async (req, res) => {
    const bookings = await Booking.findAll({
        where: {
            userId: req.user.id
        },
        include: [
            {
                model: Spot,
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'description']
                },
                include: {
                    model: SpotImage,
                    where: {
                        preview: true
                    },
                    limit: 1,
                    attributes: ['url']
                }
            }
        ],
    })

    for (let i = 0; i < bookings.length; i++) {
        let bookingsObj = bookings[i].toJSON()
        let urlObj = bookingsObj.Spot.SpotImages[0]
        if (urlObj) {
            bookingsObj.Spot.previewImage = urlObj.urlObj
        } else {
            bookingsObj.Spot.previewImage = null
        }
        delete bookingsObj.Spot.SpotImages
        bookings[i] = bookingsObj
    }

    res.json({
        Bookings: bookings
    })
})

router.delete('/:bookingId', requireAuth, async (req, res) => {
    const booking = await Booking.findByPk(req.params.bookingId)
    if (!booking) {
        res.statusCode = 404
        return res.json({
            message: "Booking couldn't be found",
            statusCode: res.statusCode
        })
    }
    // if (booking.userId !== req.user.id || booking.spotId !== req.user.id) {
    //     res.statusCode = 403
    //     return res.json({
    //         "message": "Forbidden",
    //         "statusCode": res.statusCode
    //     })
    // }
    if (booking.startDate < new Date() && booking.endDate > new Date()) {
        res.statusCode = 403
        return res.json({
            message: "Bookings that have been started can't be deleted",
            statusCode: res.statusCode
        })
    }
    const spot = await Spot.findOne({
        where: {
            id: booking.spotId
        }
    })
    if (booking.userId === req.user.id || spot.ownerId === req.user.id) {
        booking.destroy()
        res.statusCode = 200
        return res.json({
            message: "Successfully deleted",
            statusCode: res.statusCode
        })
    } else {
        res.statusCode = 403
        return res.json({
            "message": "Forbidden",
            "statusCode": res.statusCode
        })
    }

})

router.put('/:bookingId', requireAuth, async (req, res) => {
    const { startDate, endDate } = req.body
    const booking = await Booking.findByPk(req.params.bookingId)
    if (!booking) {
        res.statusCode = 404
        return res.json({
            message: "Booking couldn't be found",
            statusCode: res.statusCode
        })
    }
    if (booking.userId !== req.user.id) {
        res.statusCode = 403
        return res.json({
            "message": "Forbidden",
            "statusCode": res.statusCode
        })
    }
    if (booking.endDate < new Date()) {
        res.statusCode = 403
        return res.json({
            message: "Past bookings can't be modified",
            statusCode: res.statusCode
        })
    }
    const existingBooking = await Booking.findAll({
        where: {
            spotId: booking.spotId,
            startDate: {
                [Op.lte]: endDate,
                [Op.gte]: startDate
            }
        }
    })
    const existingBooking2 = await Booking.findAll({
        where: {
            spotId: booking.spotId,
            endDate: {
                [Op.lte]: endDate,
                [Op.gte]: startDate
            }
        }
    })
    if (existingBooking.length >= 1 || existingBooking2.length >= 1) {
        res.statusCode = 403
        res.json({
            "message": "Sorry, this spot is already booked for the specified dates",
            "statusCode": res.statusCode,
            "errors": {
                "startDate": "Start date conflicts with an existing booking",
                "endDate": "End date conflicts with an existing booking"
            }
        })
    }
    try {
        booking.update({
            startDate: startDate,
            endDate: endDate
        })
        return res.json(booking)
    } catch {
        res.statusCode = 400
        res.json({
            message: 'Validation error',
            statusCode: res.statusCode,
            errors: {
                endDate: 'endDate cannot come before startDate'
            }
        })
    }

})

module.exports = router;
