const saleService = require('../services/saleService');

const registreSale = async (req, res) => {
  const product = req.body;
  const { type, message } = await saleService.registreSale(product);
  if (type) return res.status(type).json({ message });
  return res.status(201).json(message);
};

const getSale = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await saleService.findSaleById(Number(id));
  if (type) return res.status(type).json({ message });
  return res.status(200).json(message);
 };

const listSale = async (req, res) => {
  const { message } = await saleService.findAllSale();
  return res.status(200).json(message);
};
 
const deleteSale = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await saleService.deleteSale(Number(id));
  if (type) return res.status(type).json({ message });
  return res.status(204).json();
 };
 
module.exports = {
  registreSale,
  getSale,
  listSale,
  deleteSale,
};