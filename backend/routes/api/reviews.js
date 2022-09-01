const express = require('express');
const { requireAuth, restoreUser } = require('../../utils/auth')
const { Spot, SpotImage, Review, User, ReviewImage } = require('../../db/models');
const sequelize = require('sequelize');
const user = require('../../db/models/user');
const router = express.Router();
const { Op } = require('sequelize')

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
    if (review.userId !== req.user.id) {
        res.statusCode = 403
        return res.json({
            "message": "Forbidden",
            "statusCode": res.statusCode
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

router.get('/current', requireAuth, async (req, res) => {
    const reviews = await Review.findAll({
        where: {
            userId: req.user.id
        },
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName'],
                where: {
                    id: req.user.id
                }
            },
            {
                model: Spot,
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'description'],
                },
                include: {
                    model: SpotImage,
                    where: {
                        preview: true
                    },
                    limit: 1,
                    attributes: ['url']
                }
            },
            {
                model: ReviewImage,
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'reviewId']
                }
            }
        ]
    })
    for (let i = 0; i < reviews.length; i++) {
        let reviewsObj = reviews[i].toJSON()
        let urlObj = reviewsObj.Spot.SpotImages[0]
        if (urlObj) {
            reviewsObj.Spot.previewImage = urlObj.url
        } else {
            reviewsObj.Spot.previewImage = null
        }
        delete reviewsObj.Spot.SpotImages
        reviews[i] = reviewsObj
    }

    res.json({
        Reviews: reviews
    })
})

router.put('/:reviewId', requireAuth, async (req, res) => {
    const { review, stars } = req.body
    const oldReview = await Review.findByPk(req.params.reviewId)
    if (!oldReview) {
        res.statusCode = 404
        res.json({
            message: "Review couldn't be found",
            statusCode: res.statusCode
        })
    }
    if (oldReview.userId !== req.user.id) {
        res.statusCode = 403
        return res.json({
            "message": "Forbidden",
            "statusCode": res.statusCode
        })
    }
    try {
        oldReview.update({
            review: review,
            stars: stars
        })

        return res.json(oldReview)
    } catch {
        res.statusCode = 400
        res.json({
            message: "Validation error",
            statusCode: res.statusCode,
            errors: {
                review: "Review text is required",
                stars: "Stars must be an integer from 1 to 5"
            }
        })
    }

})

router.delete('/:reviewId', requireAuth, async (req, res) => {
    const review = await Review.findByPk(req.params.reviewId)
    if (!review) {
        res.statusCode = 404
        return res.json({
            message: "Review couldn't be found",
            statusCode: res.statusCode
        })
    }
    if (review.userId !== req.user.id) {
        res.statusCode = 403
        return res.json({
            "message": "Forbidden",
            "statusCode": res.statusCode
        })
    }

    review.destroy()

    res.statusCode = 200
    return res.json({
        message: "Successfully deleted",
        statusCode: res.statusCode
    })
})


module.exports = router;
