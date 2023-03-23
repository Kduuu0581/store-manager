const { expect } = require('chai');
const sinon = require('sinon');
const saleModel = require('../../../src/models/saleModel');

const connection = require('../../../src/models/connection');
const { regiterProductMock, listSales, getIdSales } = require('./mocks/sales.model.mock');

describe('Teste de unidade salesModel', function () {
  it('Cadastra nova venda', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);
    const result = await saleModel.insertSale();
    expect(result).to.equal(1);
   });
  it('Cadastra venda de um produto', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);
    const result = await saleModel.insertProductSale(regiterProductMock[0]);
    expect(result).to.equal(1);
  });
  this.afterEach(function () {
    sinon.restore();
  });
});