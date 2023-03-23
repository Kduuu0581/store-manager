const productModel = require('../models/productModel');
const { validateRegistreProduct } = require('./validations/validationInputValues');

const listProducts = async () => { 
  const products = await productModel.listProducts();
  return { type: null, message: products };
};

const listProductById = async (id) => { 
  const product = await productModel.listProductById(id);
  if (!product) {
    return { type: 'ID_INVALID', message: 'Product not found' };
  }
  return { type: null, message: product };
};

const insert = async (name) => {
  const { type, message } = validateRegistreProduct(name);
  if (type) return { type, message };
  const newProductId = await productModel.insert({ name });
  const newProduct = await productModel.listProductById(newProductId);
  return { type: null, message: newProduct };
};
 
const update = async (name, id) => {
  const { type, message } = validateRegistreProduct(name);
  if (type) return { type, message };
  const affectedRows = await productModel.update(name, id);
  if (!affectedRows) {
    return { type: 404, message: 'Product not found' };
   }
   const productUpdate = await productModel.listProductById(id);
   return { type: null, message: productUpdate };
};

const deleteProduct = async (id) => {
  const affectedRows = await productModel.deleteProduct(id);
  if (!affectedRows) {
    return { type: 404, message: 'Product not found' };
  }
  return { type: null, message: '' };
 };
 
module.exports = {
  listProducts,
  listProductById,
  insert,
  update,
  deleteProduct,
};