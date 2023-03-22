const saleService = require('../services/saleService');

const registreSale = async (req, res) => {
  const product = req.body;
  const { type, message } = await saleService.registreSale(product);
  if (type) return res.status(type).json({ message });
  return res.status(201).json(message);
};
 
module.exports = {
  registreSale,
};