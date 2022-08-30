const express = require('express');
const { requireAuth } = require('../../utils/auth')
const { Spot, SpotImage, Review, User, ReviewImage } = require('../../db/models');
const sequelize = require('sequelize')
const router = express.Router();

router.post('/:reviewId/images', requireAuth, async (req, res) => {
    const { url } = req.body
    const review = await Review.findByPk(req.params.reviewId)
    if (!review) {
        res.statusCode = 404
        res.json({
            message: "Review couldn't be found",
            statusCode: res.statusCode = 404
        })
    }
    const existingReviewImages = await ReviewImage.findAll({
        where: {
            reviewId: Number(req.params.reviewId)
        }
    })
    if (existingReviewImages.length >= 10) {
        res.statusCode = 403
        res.json({
            message: "Maximum number of images for this resource was reached",
            statusCode: res.statusCode
        })
    }
    const newReviewImage = await ReviewImage.create({
        reviewId: Number(req.params.reviewId),
        url
    })

    res.json({
        id: newReviewImage.id,
        url: url
    })
})

router.get('/current', async (req, res) => {
    const reviews = await Review.findAll({
        where: {
            userId: req.user.id
        }
    })

    res.json({
        Reviews: reviews
    })
})


module.exports = router;
