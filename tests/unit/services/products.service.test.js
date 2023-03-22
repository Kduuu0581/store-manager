const { expect } = require('chai');
const sinon = require('sinon');
const { productModel } = require('../../../src/models');
const { productService } = require('../../../src/services');
const { listProducts } = require('./mocks/products.service.mock');

describe('Testa de unidade productService', function () {
  describe('Testa a listagem de produtos', function () {
    it('Testa se recupera a lista de todos os produtos', async function () {
      sinon.stub(productModel, 'listProducts').resolves(listProducts);
      const result = await productService.listProducts();
      expect(result.type).to.be.equal(null);
      expect(result.message).to.be.deep.equal(listProducts);
    });
    it('Testa se retorna o produto pelo id', async function () {
      sinon.stub(productModel, 'listProductById').resolves(listProducts[0]);
      const result = await productService.listProductById(1);
      expect(result.type).to.be.equal(null);
      expect(result.message).to.be.deep.equal(listProducts[0]);
    });
    it('Testa se retorna uma menssagem de erro caso o id seja inválido', async function () {
      sinon.stub(productModel, 'listProductById').resolves(undefined);
      const result = await productService.listProductById(99);
      expect(result.type).to.be.equal('ID_INVALID');
      expect(result.message).to.be.equal('Product not found');
     });
  });
  afterEach(function () {
    sinon.restore();
  })
});