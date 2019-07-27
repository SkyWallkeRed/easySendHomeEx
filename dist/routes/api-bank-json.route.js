'use strict';

var express = require('express');
var router = express.Router();

var bankXML_controller = require('../controllers/bankJson.controller');

// CRUD Location
router.get('/', bankXML_controller.getBanksXML);

module.exports = router;
//# sourceMappingURL=api-bank-json.route.js.map