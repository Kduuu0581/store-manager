const connection = require('./connection');

const insertSale = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUE (now())',
  );
  return insertId;
};
 
const insertProductSale = async ({ productId, quantity, saleId }) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUE (?, ?, ?)',
    [saleId, productId, quantity],
  );
  return insertId;
};

const findSaleById = async (idSale) => {
  const [productSale] = await connection.execute(
    `SELECT date,
    sp.product_id AS 'productId',
    sp.quantity
    FROM
    StoreManager.sales_products AS sp
    INNER JOIN StoreManager.sales AS s ON sp.sale_id = s.id
    WHERE sp.sale_id = ?;`,
    [idSale],
  );
  return productSale;
};
 
const findAllSale = async () => {
  const [productSale] = await connection.execute(
    `SELECT 
    sp.sale_id AS 'saleId',
    date,
    sp.product_id AS 'productId',
    sp.quantity
    FROM
    StoreManager.sales_products AS sp
    INNER JOIN StoreManager.sales AS s ON sp.sale_id = s.id`,
  );
  return productSale;
 };
 
module.exports = {
  insertSale,
  insertProductSale,
  findSaleById,
  findAllSale,
};