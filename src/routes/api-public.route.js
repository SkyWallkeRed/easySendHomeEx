const express = require('express');
const router = express.Router();

router.use('/bankJson', require('./bankJson.route'));

module.exports = router;
