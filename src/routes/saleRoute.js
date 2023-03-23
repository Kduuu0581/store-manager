const express = require('express');
const saleController = require('../controllers/saleController');
const validateSale = require('../middlewares/validationInputSales');

const router = express.Router();

router.post('/', validateSale, saleController.registreSale);
router.get('/', saleController.listSale);
router.get('/:id', saleController.getSale);
router.delete('/:id', saleController.deleteSale);

module.exports = router;
