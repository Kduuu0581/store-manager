const connection = require('./connection');

const listProducts = async () => { 
  const [products] = await connection.execute('SELECT * FROM products');
  return products;
};

const listProductsById = async (id) => { 
  const [[product]] = await connection.execute(
    'SELECT * FROM products WHERE id=?',
    [id],
  );
  return product;
};

module.exports = {
  listProducts,
  listProductsById,
};