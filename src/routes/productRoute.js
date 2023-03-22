const express = require('express');
const productController = require('../controllers/productController');
const validateName = require('../middlewares/validationInputValues');

const router = express.Router();

router.get('/', productController.listProducts);
router.get('/:id', productController.listProductsById);
router.post('/', validateName, productController.registerProduct);

module.exports = router;