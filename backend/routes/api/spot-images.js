const express = require('express');
const { requireAuth } = require('../../utils/auth')
const { Spot, SpotImage, Review, User, ReviewImage, Booking } = require('../../db/models');
const sequelize = require('sequelize');
const user = require('../../db/models/user');
const router = express.Router();

router.delete('/:spotImageId', requireAuth, async (req, res) => {
    const spotImage = await SpotImage.findByPk(req.params.spotImageId)
    if (!spotImage) {
        res.statusCode = 404
        res.json({
            message: "Spot Image couldn't be found",
            statusCode: res.statusCode
        })
    }

    spotImage.destroy()
    res.statusCode = 200
    res.json({
        message: "Successfully deleted",
        statusCode: res.statusCode
    })
})

module.exports = router;
