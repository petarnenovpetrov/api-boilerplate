const service = require('../service');
//https://dev.to/nedsoft/testing-nodejs-express-api-with-jest-and-supertest-1km6
const app = require('../app');
const request = require('supertest');
const data = require('./data.json');

function mockPromise() {
  return Promise.resolve();
}
Object.keys(service).forEach(key => {
  service[key] = jest.fn().mockImplementation(mockPromise);
});

describe('Should call services', () => {
  it('should call service to create a new product', async () => {
    const res = await request(app)
      .post('/api/product')
      .set(data.customHeader.name, data.customHeader.value)
      .send(data.mockProduct);
    expect(service.setProduct).toHaveBeenCalled();
    expect(service.setProduct).toHaveBeenCalledWith(data.mockProduct);
  });

  it('should call service to get all products', async () => {
    const res = await request(app)
      .get('/api/product')
      .set(data.customHeader.name, data.customHeader.value);
    expect(service.getProducts).toHaveBeenCalled();
    expect(service.getProducts).toHaveBeenCalledWith();
  });

  it('should call service to get product by Id', async () => {
    const res = await request(app)
      .get(`/api/product/${data.mockProduct.id}`)
      .set(data.customHeader.name, data.customHeader.value);
    expect(service.getProductById).toHaveBeenCalled();
    expect(service.getProductById).toHaveBeenCalledWith({
      id: data.mockProduct.id,
    });
  });

  it('should call service to update price and quantyty to product by Id', async () => {
    const res = await request(app)
      .put(`/api/product/${data.mockProduct.id}`)
      .set(data.customHeader.name, data.customHeader.value)
      .send(data.mockUpdateProduct);
    expect(service.updateProductById).toHaveBeenCalled();
    expect(service.updateProductById).toHaveBeenCalledWith(
      data.mockUpdateProduct,
      {
        id: data.mockProduct.id,
      },
    );
  });

  it('should call service to  deleteProductById', async () => {
    const res = await request(app)
      .delete(`/api/product/${data.mockProduct.id}`)
      .set(data.customHeader.name, data.customHeader.value);
    expect(service.deleteProductById).toHaveBeenCalled();
  });

  it('should call service to get api wellkome message', async () => {
    const res = await request(app)
      .get('/api')
      .set(data.customHeader.name, data.customHeader.value);
    expect(service.getApi).toHaveBeenCalled();
  });
});
