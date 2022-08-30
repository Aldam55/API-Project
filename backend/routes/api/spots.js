const express = require('express');
const { requireAuth } = require('../../utils/auth')
const { Spot, SpotImage, Review, User } = require('../../db/models');
const sequelize = require('sequelize')
const router = express.Router();


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
