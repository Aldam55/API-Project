const express = require('express');
const { requireAuth } = require('../../utils/auth')
const { Spot, SpotImage, Review } = require('../../db/models');
const router = express.Router();

router.get('/current', async (req, res) => {
    const ownerId = req.user.id
    const spots = await Spot.findAll({
        where: {
            ownerId: ownerId
        }
    })

    res.json(spots)
})


router.get('/', async (req, res) => {
    const spots = await Spot.findAll({
        include: [
            { model: Review },
            {
                model: SpotImage,
                attributes: ['url'],
                as: 'previewImage'
            }
        ]
    })
    res.json(spots)
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
