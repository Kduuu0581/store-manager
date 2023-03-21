const productModel = require('../models/productModel');

const listProducts = async () => { 
  const products = await productModel.listProducts();
  return { type: null, message: products };
};

const listProductById = async (id) => { 
  const product = await productModel.listProductById(id);
  if (!product) {
    return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  }
  return { type: null, message: product };
};

module.exports = {
  listProducts,
  listProductById,
};