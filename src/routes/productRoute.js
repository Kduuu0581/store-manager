const express = require('express');
const productController = require('../controllers/productController');
const { validateName } = require('../middlewares/validationInputValues');

const router = express.Router();

router.get('/', productController.listProducts);
router.post('/', validateName, productController.registerProduct);
router.get('/:id', productController.listProductsById);
router.put('/:id', validateName, productController.setProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;