// backend/routes/api/index.js
const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const spotsRouter = require('./spots')
const reviewsRouter = require('./reviews')
const bookingsRouter = require('./bookings')
const spotImagesRouter = require('./spot-images')
const reviewImagesRouter = require('./review-images')
const { restoreUser } = require('../../utils/auth.js');

router.use(restoreUser);

router.use('/review-images', reviewImagesRouter)

router.use('/spot-images', spotImagesRouter)

router.use('/reviews', reviewsRouter)

router.use('/bookings', bookingsRouter)

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/spots', spotsRouter)

router.post('/test', (req, res) => {
    res.json({ requestBody: req.body });
});

module.exports = router;
