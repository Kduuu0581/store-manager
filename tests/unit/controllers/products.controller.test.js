const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { expect } = chai;
chai.use(sinonChai);

const { productController } = require('../../../src/controllers');
const { productService } = require('../../../src/services');
const { listProducts } = require('./mocks/products.controller.mock');

describe('Teste de unidade productController', function() {
  describe('Listando os produtos', function () { 
    it('Deve retornar o status 200 e a lista de produtos', async function () {
      const res = {};
      const req = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productService, 'listProducts').resolves({
        type: null,
        message: listProducts,
      });
      await productController.listProducts(req, res);
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(listProducts);
    });
    it('Deve retornar o status 200 e o produto com id correto', async function () {
      const res = {};
      const req = { params: { id: 1 } };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productService, 'listProductById').resolves({
        type: null,
        message: listProducts[0],
      });
      await productController.listProductsById(req, res);
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(listProducts[0]);
    });
    it('Deve retornar o status 404 e a mensagem de erro', async function () {
      const res = {};
      const req = { params: { id: 99 } };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productService, 'listProductById').resolves({
        type: 'ID_INVALID',
        message: 'Product not found',
      });
      await productController.listProductsById(req, res);
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });
  });
  describe('Inserindo um produto', function () {
    it('Deve retornar o status 201 ao inserir dados válidos', async function () {
      const res = {};
      const req = { body: { name: 'Martelo do Thor' } };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productService, 'insert').resolves({
        type: null,
        message: listProducts[0],
      });
      await productController.registerProduct(req, res);
      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(listProducts[0]);
    });
    it('Deve retornar o status 422 ao inserir dados inválidos', async function () {
      const res = {};
      const req = { body: { name: 'Ao' } };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productService, 'insert').resolves({
        type: 422,
        message: '"name" length must be at least 5 characters long',
      });
      await productController.registerProduct(req, res);
      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({ message: '"name" length must be at least 5 characters long' });
     });
   });
  afterEach(function () {
    sinon.restore();
   });
});