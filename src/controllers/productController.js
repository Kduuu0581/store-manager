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

const registerProduct = async (req, res) => {
  const { name } = req.body;
  const { type, message } = await productService.insert(name);
  if (type) return res.status(type).json({ message });
  res.status(201).json(message);
};
 
const setProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const { type, message } = await productService.update(name, Number(id));
  if (type) return res.status(type).json({ message });
  res.status(200).json(message);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productService.deleteProduct(Number(id));
  if (type) return res.status(type).json({ message });
  res.status(204).json();
 };
 
module.exports = {
  listProducts,
  listProductsById,
  registerProduct,
  setProduct,
  deleteProduct,
};