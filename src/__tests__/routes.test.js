//https://dev.to/nedsoft/testing-nodejs-express-api-with-jest-and-supertest-1km6
const app = require('../app');
const request = require('supertest');
const mongoose = require('mongoose');
const ProductModel = require('../models').product;

const mockProduct = {
  id: '1',
  name: 'Gillette',
  price: 10.99,
  quantyty: 20,
};

const mockProductWithOutPrice = {
  id: '1',
  name: 'Gillette',
};
//E2E tests routes.js

beforeAll(async () => {
  await mongoose.connect(
    global.__MONGO_URI__,
    { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
    async err => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      await ProductModel.deleteMany({});
    },
  );
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Product Endpoints', () => {
  it('should create a new product', async () => {
    const res = await request(app)
      .post('/api/product')
      .set('X-UID', '1234')
      .send(mockProduct);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('name');
    expect(res.body).toHaveProperty('price');
  });
  it('should not create a new product with same name', async () => {
    const res = await request(app)
      .post('/api/product')
      .set('X-UID', '1234')
      .send(mockProduct);
    expect(res.statusCode).toEqual(500);
  });
  it('should not create a new product without price', async () => {
    const res = await request(app)
      .post('/api/product')
      .set('X-UID', '1234')
      .send(mockProductWithOutPrice);
    expect(res.statusCode).toEqual(500);
  });
  it('should get all products', async () => {
    const res = await request(app)
      .get('/api/product')
      .set('X-UID', '1234');
    const products = res.body;
    expect(res.statusCode).toEqual(200);
    expect(products.length).toBe(1);
    expect(products[0].name).toBe(mockProduct.name);
    expect(products[0].price).toBe(mockProduct.price);
    expect(products[0].quantyty).toBe(mockProduct.quantyty);
  });
  it('should get product by Id', async () => {
    const res = await request(app)
      .get('/api/product/1')
      .set('X-UID', '1234');
    const product = res.body;
    expect(res.statusCode).toEqual(200);
    expect(product.id).toBe(mockProduct.id);
    expect(product.name).toBe(mockProduct.name);
    expect(product.price).toBe(mockProduct.price);
    expect(product.quantyty).toBe(mockProduct.quantyty);
  });
  it('should not get product by wrong Id', async () => {
    const res = await request(app)
      .get('/api/product/2')
      .set('X-UID', '1234');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeNull();
  });
  it('should update price and quantyty to product by Id', async () => {
    const res = await request(app)
      .put('/api/product/1')
      .set('X-UID', '1234')
      .send({ price: 33.99, quantyty: 44 });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('price');
    expect(res.body.price).toBe(33.99);
    expect(res.body).toHaveProperty('quantyty');
    expect(res.body.quantyty).toBe(44);
  });
  it('should update price to product by Id', async () => {
    const res = await request(app)
      .put('/api/product/1')
      .set('X-UID', '1234')
      .send({ price: 44.99 });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('price');
    expect(res.body.price).toBe(44.99);
  });
  it('should update quantyty to product by Id', async () => {
    const res = await request(app)
      .put('/api/product/1')
      .set('X-UID', '1234')
      .send({ quantyty: 20 });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('quantyty');
    expect(res.body.quantyty).toBe(20);
  });
  it('should not update quantyty to product by Id', async () => {
    const res = await request(app)
      .put('/api/product/1')
      .set('X-UID', '1234')
      .send({ quantyty: 20.59 });
    expect(res.statusCode).toEqual(500);
  });
  it('should delete product by Id', async () => {
    const res = await request(app)
      .delete('/api/product/1')
      .set('X-UID', '1234');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id');
    expect(res.body.id).toBe('1');
  });
});
