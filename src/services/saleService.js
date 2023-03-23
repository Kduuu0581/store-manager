const saleModel = require('../models/saleModel');
const { validateRegistreSaleQuantity,
  validateProductExist } = require('./validations/validationInputValues');

  const registreSale = async (sale) => {
  const erro = await validateRegistreSaleQuantity(sale);
    if (erro.type) return erro;
    
  const erro2 = await validateProductExist(sale);
    if (erro2.type) return erro2;
    
  const saleId = await saleModel.insertSale();
    await Promise.all(
      sale.map(async ({ productId, quantity }) =>
        saleModel.insertProductSale({
          productId,
          quantity,
          saleId,
        })),
  );
  return { type: null, message: { id: saleId, itemsSold: sale } };
  };

const findSaleById = async (idSale) => {
  const result = await saleModel.findSaleById(idSale);
  if (!result.length) return { type: 404, message: 'Sale not found' };
  return { type: null, message: result };
};
 
const findAllSale = async () => {
  const result = await saleModel.findAllSale();
  return { type: null, message: result };
};
 
const deleteSale = async (id) => {
  const affectedRows = await saleModel.deleteSaleProduct(id);
  if (!affectedRows) return { type: 404, message: 'Sale not found' };
  await saleModel.deleteSale(id);
  return { type: null, message: '' };
 };
 
module.exports = {
  registreSale,
  findSaleById,
  findAllSale,
  deleteSale,
};