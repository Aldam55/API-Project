const express = require('express');
const { requireAuth } = require('../../utils/auth')
const { Spot, SpotImage, Review, User, ReviewImage, Booking } = require('../../db/models');
const sequelize = require('sequelize');
const user = require('../../db/models/user');
const router = express.Router();

router.get('/current', async (req, res) => {
    const bookings = await Booking.findAll({
        where: {
            userId: req.user.id
        },
        include: [
            {
                model: Spot,
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            }
        ],
    })

    res.json({
        Bookings: bookings
    })
})

router.delete('/:bookingId', requireAuth, async (req, res) => {
    const booking = await Booking.findByPk(req.params.bookingId)
    if (!booking) {
        res.statusCode = 404
        res.json({
            message: "Booking couldn't be found",
            statusCode: res.statusCode
        })
    }

    const spot = await Spot.findOne({
        where: {
            spotId: booking.spotId
        }
    })
    if (booking.userId === req.user.id || spot.ownerId === req.user.id) {
        booking.destroy()
        res.statusCode = 200
        res.json({
            message: "Successfully deleted",
            statusCode: res.statusCode
        })
    }
    // bookings that have been started can't be deleted

})

router.put('/:bookingId', requireAuth, async (req, res) => {
    const { startDate, endDate } = req.body
    const booking = await Booking.findByPk(req.params.bookingId)
})

module.exports = router;
