'use strict';

var express = require('express');
var router = express.Router();

var client_controller = require('../controllers/client.controller');

router.get('/', client_controller.home);

module.exports = router;
//# sourceMappingURL=client.route.js.map