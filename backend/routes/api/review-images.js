const express = require('express');
const { requireAuth } = require('../../utils/auth')
const { ReviewImage } = require('../../db/models');
const sequelize = require('sequelize');
const user = require('../../db/models/user');
const router = express.Router();

router.delete('/:imageId', requireAuth, async (req, res) => {
    const reviewImage = await ReviewImage.findByPk(req.params.imageId)
    if (!reviewImage) {
        res.statusCode = 404
        return res.json({
            message: "Review Image couldn't be found",
            statusCode: res.statusCode
        })
    }
    // if (reviewImage.reviewId !== req.user.id) {
    //     res.statusCode = 403
    //     return res.json({
    //         "message": "Forbidden",
    //         "statusCode": res.statusCode
    //     })
    // }

    reviewImage.destroy()
    res.statusCode = 200
    res.json({
        message: "Successfully deleted",
        statusCode: res.statusCode
    })
})

module.exports = router;
