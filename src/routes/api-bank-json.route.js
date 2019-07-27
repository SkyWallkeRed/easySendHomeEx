const express = require('express');
const router = express.Router();

const bankXML_controller = require('../controllers/bankJson.controller');

// CRUD Location
router.get('/', bankXML_controller.getBanksXML);

module.exports = router;
