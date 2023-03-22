const validateSale = async (req, res, next) => {
  const product = req.body;
  const validationProductId = product.every(({ productId }) => productId);
  if (!validationProductId) return res.status(400).json({ message: '"productId" is required' });

  const validationQuantity = product.every(({ quantity }) => quantity || Number(quantity) === 0);
  if (!validationQuantity) return res.status(400).json({ message: '"quantity" is required' });
  
  next();
};
 
module.exports = validateSale;