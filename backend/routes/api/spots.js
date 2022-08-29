const express = require('express');
const { Spot } = require('../../db/models');
const router = express.Router();

router.get('/', async (req, res) => {
    const spots = await Spot.findAll()
    res.json(spots)
})

// router.post('/', async (req, res) => {
//     const {ownerId, address, city, state, }
// })

module.exports = router;
