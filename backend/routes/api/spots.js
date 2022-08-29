const express = require('express');
const { User, Spot } = require('../../db/models');
const router = express.Router();

router.get('/', async (req, res) => {
    const spots = await Spot.findAll()
    res.json(spots)
})

router.post('/', async (req, res) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body
    // try {
    const newSpot = await Spot.create({
        // ownerId: id,
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
    // } catch {
    //     res.statusCode = 400
    //     res.json({
    //         message: 'Validation Error',
    //         statusCode: res.statusCode,
    //         errors: {
    //             "address": "Street address is required",
    //             "city": "City is required",
    //             "state": "State is required",
    //             "country": "Country is required",
    //             "lat": "Latitude is not valid",
    //             "lng": "Longitude is not valid",
    //             "name": "Name must be less than 50 characters",
    //             "description": "Description is required",
    //             "price": "Price per day is required"
    //         }
    //     })
    // }

})

module.exports = router;
