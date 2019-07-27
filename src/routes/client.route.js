const express = require('express');
const router = express.Router();

const client_controller = require('../controllers/client.controller');

router.get('/', client_controller.home);

module.exports = router;
