const { expect } = require('chai');
const sinon = require('sinon');
const { saleModel, productModel } = require('../../../src/models');
const saleService = require('../../../src/services/saleService');
const { listSales, getIdSales } = require("./mocks/sales.service.mock");

const { regiterProductMock } = require('./mocks/sales.service.mock');
const { listProduct } = require('./mocks/products.service.mock');

describe('Teste de unidade saleService', function () {
  describe('Testa o cadastro de vendas com dados válidos', async function () {
    it('Retorna erro ao passar quantidade inválida', async function () {
      const result = await saleService.registreSale([{ productId: 1, quantity: 0 }]);
      expect(result.type).to.equal(422);
      expect(result.message).to.equal('"quantity" must be greater than or equal to 1');
     });
    it('Retorna erro ao passar um Id inválido', async function () {
      sinon.stub(productModel, 'listProductById').resolves(undefined);
      const result = await saleService.registreSale([{ productId: 99, quantity: 1 }]);
      expect(result.type).to.equal(404);
      expect(result.message).to.equal('Product not found');
     });
  });
  describe('Testa cadastro de venda com dados válidos', function () {
    it('Retorna o Id válido', async function () {
      sinon.stub(productModel, 'listProductById').resolves(listProduct);
      sinon.stub(saleModel, 'insertSale').resolves(3);
      sinon.stub(saleModel, 'insertProductSale').resolves();
      const result = await saleService.registreSale(regiterProductMock);
      expect(result.type).to.equal(404);
      expect(result.message).to.deep.equal('Product not found');
    });
  });
    describe('Testa a lista de vendas', function () {
      it('Retorna lista completa de vendas', async function () {
        sinon.stub(saleModel, 'findAllSale').resolves(listSales);
        const result = await saleService.findAllSale();
        expect(result.type).to.be.equal(null);
        expect(result.message).to.deep.equal(listSales);
      });
      it('Retorna lista de vendas pelo Id', async function () {
        sinon.stub(saleModel, 'findSaleById').resolves(getIdSales);
        const result = await saleService.findSaleById(1);
        expect(result.type).to.be.equal(null);
        expect(result.message).to.deep.equal(getIdSales);
      });
    });
  afterEach(() => {
    sinon.restore();
   });
 });