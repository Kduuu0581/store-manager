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
 
module.exports = {
  registreSale,
};