const express = require('express');
const { requireAuth } = require('../../utils/auth')
const { Spot, SpotImage, Review, User } = require('../../db/models');
const sequelize = require('sequelize')
const router = express.Router();

router.post('/:reviewId/images', requireAuth, async (req, res) => {
    const { url } = req.body
    const review = await Review.findByPk(req.params.reviewId)
    const newReviewImage = await ReviewImage.create({
        reviewId: review.id,
        url
    })
    
    res.json({
        id: newReviewImage.id,
        url: url
    })
})


module.exports = router;
