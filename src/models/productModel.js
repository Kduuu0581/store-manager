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

module.exports = {
  listProducts,
  listProductById,
};