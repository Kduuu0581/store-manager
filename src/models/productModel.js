const connection = require('./connection');

const listProducts = async () => { 
  const [products] = await connection.execute('SELECT * FROM StoreManager.products');
  return products;
};

const listProductById = async (id) => { 
  const [[product]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id=?',
    [id],
  );
  return product;
};

const insert = async (newProduct) => {
  const columns = Object.keys(newProduct).join(',');
  const placeHolders = Object.keys(newProduct).map((_key) => '?').join(',');
  const [{ insertId }] = await connection.execute(
    `INSERT INTO StoreManager.products (${columns}) VALUES (${placeHolders})`,
    [...Object.values(newProduct)],
  );
  return insertId;
 };

module.exports = {
  listProducts,
  listProductById,
  insert,
};