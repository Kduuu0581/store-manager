const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { productModel } = require('../../../src/models');
const { listProducts } = require('./mocks/products.model.mock');

describe('Testa de unidade productModel', function () {
  it('Recupera a lista de todos os produtos', async function () {
    sinon.stub(connection, 'execute').resolves([listProducts]);
    const result = await productModel.listProducts();
    expect(result).to.be.deep.equal(listProducts);
  });
  it('Recupera um produto pelo id', async function () {
    sinon.stub(connection, 'execute').resolves([[listProducts[0]]]);
    const result = await productModel.listProductById(1);
    expect(result).to.be.deep.equal(listProducts[0]);
  });
  afterEach(function () {
    sinon.restore();
  })
 });