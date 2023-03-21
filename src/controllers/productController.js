const productService = require('../services/productService');

const listProducts = async (_req, res) => { 
  const { type, message } = await productService.listProducts();
  if (type) return res.status(500).json({ message });
  res.status(200).json(message);
};

const listProductsById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productService.listProductById(id);
  if (type) return res.status(404).json({ message });
  return res.status(200).json(message);
};

module.exports = {
  listProducts,
  listProductsById,
};