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
  it('Retorna uma venda pelo id', async function () {
    sinon.stub(connection, 'execute').resolves([getIdSales]);
    const result = await saleModel.findSaleById(1);
    expect(result).to.be.deep.equal(getIdSales);
  });
  it('Retorna todas as vendas', async function () {
    sinon.stub(connection, 'execute').resolves([listSales]);
    const result = await saleModel.findAllSale();
    expect(result).to.be.deep.equal(listSales);
   });
  this.afterEach(function () {
    sinon.restore();
  });
});