const express = require('express');
const { requireAuth } = require('../../utils/auth')
const { Spot, SpotImage, Review, User, ReviewImage, Booking } = require('../../db/models');
const sequelize = require('sequelize')
const router = express.Router();

router.get('/:spotId/bookings', async (req, res) => {
    const spot = await Spot.findByPk(req.params.spotId)
    if (!spot) {
        res.statusCode = 404
        res.json({
            message: "Spot coulnd't be found",
            statusCode: res.statusCode
        })
    }
    if (req.user.id !== spot.ownerId) {
        const bookings = await Booking.findAll({
            where: {
                spotId: spot.id
            },
            attributes: {
                include: ['spotId', 'startDate', 'endDate']
            }
        })
        return res.json(bookings)
    }
    if (req.user.id === spot.ownerId) {
        const bookings = await Booking.findAll({
            where: {
                spotId: spot.id
            },
            include: [
                {
                    model: User,
                    attributes: ['id', 'firstName', 'lastName']
                }
            ],
            attributes: ['id', 'spotId', 'userId', 'startDate', 'endDate', 'createdAt', 'updatedAt']

        })
        return res.json(bookings)
    }

})

router.put('/:spotId', requireAuth, async (req, res) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body
    const spot = await Spot.findByPk(req.params.spotId)
    if (!spot) {
        res.statusCode = 404
        res.json({
            message: "Spot couldn't be found",
            statusCode: res.statusCode
        })
    }
    try {
        spot.update({
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price
        })
        return res.json(spot)
    } catch {
        res.statusCode = 400
        res.json({
            message: 'Validation Error',
            statusCode: res.statusCode,
            errors: {
                "address": "Street address is required",
                "city": "City is required",
                "state": "State is required",
                "country": "Country is required",
                "lat": "Latitude is not valid",
                "lng": "Longitude is not valid",
                "name": "Name must be less than 50 characters",
                "description": "Description is required",
                "price": "Price per day is required"
            }
        })
    }


})

router.get('/:spotId/reviews', async (req, res) => {
    const spot = await Spot.findByPk(req.params.spotId)
    const reviews = await Review.findAll({
        where: {
            spotId: req.params.spotId
        },
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: ReviewImage,
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'reviewId']
                }
            }
        ]

    })
    if (!spot) {
        res.statusCode = 404
        res.json({
            message: "Spot couldn't be found",
            statusCode: res.statusCode
        })
    }

    res.json({
        Reviews: reviews
    })
})

router.get('/current', async (req, res) => {
    const ownerId = req.user.id
    const spots = await Spot.findAll({
        where: {
            ownerId: ownerId
        }
    })

    res.json({
        Spot: spots
    })
})

router.get('/:spotId', async (req, res) => {
    const spot = await Spot.findByPk(req.params.spotId, {
        include: [
            { model: SpotImage },
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName'],
                as: 'Owner'
            }
        ]
    })
    if (!spot) {
        res.statusCode = 404
        res.json({
            message: "Spot couldn't be found",
            statusCode: res.statusCode
        })
    }

    res.json(spot)
})


router.get('/', async (req, res) => {
    const spots = await Spot.findAll({
        // include: [
        //     { model: Review },
        //     {
        //         model: SpotImage,
        //         attributes: ['url'],
        //         where: {
        //             preview: true
        //         }
        //     }
        // ],
        // attributes: {
        //     include: [
        //         [
        //             sequelize.fn("AVG", sequelize.col('Reviews.stars')),
        //             'avgRating'
        //         ]
        //     ]
        // }
    })

    res.json({
        Spot: spots
    })
})

router.post('/:spotId/bookings', requireAuth, async (req, res) => {
    const { startDate, endDate } = req.body
    const spot = await Spot.findByPk(req.params.spotId)
    if (!spot) {
        res.statusCode = 404
        res.json({
            message: "Spot couldn't be found",
            statusCode: res.statusCode
        })
    }
    // const bookings = await Booking.findOne({
    //     where: {
    //         spotId: spot.id
    //     }
    // })
    // if ((bookings.startDate <= startDate && bookings.endDate >= startDate)
    //     || (bookings.startDate <= endDate && bookings.endDate >= endDate)) {
    //     res.statusCode = 403
    //     res.json({
    //         "message": "Sorry, this spot is already booked for the specified dates",
    //         "statusCode": 403,
    //         "errors": {
    //             "startDate": "Start date conflicts with an existing booking",
    //             "endDate": "End date conflicts with an existing booking"
    //         }
    //     })
    // }
    // if(spot.userId === req.user.id) throw Error
    const newBooking = await Booking.create({
        spotId: spot.id,
        userId: req.user.id,
        startDate,
        endDate
    })

    res.json(newBooking)
})

router.post('/:spotId/reviews', async (req, res) => {
    const { review, stars } = req.body
    const spot = await Spot.findByPk(req.params.spotId)
    const existingReviews = await Review.findOne({
        where: {
            userId: req.user.id
        }
    })
    if (!spot) {
        res.statusCode = 404
        res.json({
            message: "Spot couldn't be found",
            statusCode: res.statusCode
        })
    }
    if (existingReviews) {
        res.statusCode = 403
        res.json({
            message: "User already has a review for this spot",
            statusCode: res.statusCode
        })
    }
    try {
        const newReview = await Review.create({
            userId: req.user.id,
            spotId: spot.id,
            review,
            stars
        })

        return res.json(newReview)
    } catch {
        res.json({
            "message": "Validation error",
            "statusCode": 400,
            "errors": {
                "review": "Review text is required",
                "stars": "Stars must be an integer from 1 to 5",
            }
        })
    }

})

router.post('/:spotId/images', requireAuth, async (req, res) => {
    const { url } = req.body
    const spot = await Spot.findByPk(req.params.spotId)
    if (!spot) {
        res.statusCode = 404
        res.json({
            message: "Spot couldn't be found",
            statusCode: res.statusCode
        })
    }
    const spotImage = await SpotImage.create({
        spotId: Number(req.params.spotId),
        url: url,
        preview: true
    })
    res.json({
        id: spotImage.id,
        url,
        preview: true
    })
})

router.post('/', async (req, res) => {
    const user = req.user
    const { address, city, state, country, lat, lng, name, description, price } = req.body
    try {
        const newSpot = await Spot.create({
            ownerId: user.id,
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price,
        })

        return res.json(newSpot)
    } catch {
        res.statusCode = 400
        res.json({
            message: 'Validation Error',
            statusCode: res.statusCode,
            errors: {
                "address": "Street address is required",
                "city": "City is required",
                "state": "State is required",
                "country": "Country is required",
                "lat": "Latitude is not valid",
                "lng": "Longitude is not valid",
                "name": "Name must be less than 50 characters",
                "description": "Description is required",
                "price": "Price per day is required"
            }
        })
    }

})

module.exports = router;
