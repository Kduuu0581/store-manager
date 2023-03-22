const express = require('express');
const saleController = require('../controllers/saleController');
const validateSale = require('../middlewares/validationInputSales');

const router = express.Router();

router.post('/', validateSale, saleController.registreSale);

module.exports = router;
