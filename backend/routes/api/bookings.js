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

module.exports = router;
