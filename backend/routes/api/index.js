// backend/routes/api/index.js
const router = require('express').Router();

const { restoreUser } = require('../../utils/auth.js');

router.use(restoreUser);


module.exports = router;
