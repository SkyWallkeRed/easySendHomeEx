const express = require('express');
const router = express.Router();

const bankJson_controller = require('../controllers/bankJson.controller');

// CRUD Location
router.get('/', bankJson_controller.getBanksJson);
router.get('/by_code', bankJson_controller.getBankBy_bankCode);
router.get('/by_name', bankJson_controller.getBankBy_bankName);
router.get('/query', bankJson_controller.getBankByQuery);
router.get('/filter_params', bankJson_controller.getFilterOptions);

module.exports = router;
