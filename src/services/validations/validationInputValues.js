const { validateName, validateQuantity } = require('./schema');
const productModel = require('../../models/productModel');

const validateRegistreProduct = (name) => {
  const { error } = validateName.validate(name);
  if (error) {
    return {
    type: 'INVALID_VALUE',
    message: '"name" length must be at least 5 characters long',
  };
}
  return { type: null, message: '' };
};

const validateRegistreSaleQuantity = (sale) => {
  const validation = sale.every(({ quantity }) => {
    const { error } = validateQuantity.validate(quantity);
    if (error) return false;
    return true;
  });
  if (!validation) {
    return {
      type: 422,
      message: '"quantity" must be greater than or equal to 1',
    };
  }
  return { type: null, message: '' };
};
 
const validateProductExist = async (sale) => {
  const listProduct = await Promise.all(
    sale.map(({ productId }) => productModel.listProductById(productId)),
  );
  const validateExist = listProduct.every((product) => product !== undefined);
  if (!validateExist) {
    return {
      type: 404,
      message: 'Product not found',
    };
  }
  return { type: null, message: '' };
 };

module.exports = {
  validateRegistreProduct,
  validateRegistreSaleQuantity,
  validateProductExist,
};