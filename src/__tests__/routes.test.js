//https://dev.to/nedsoft/testing-nodejs-express-api-with-jest-and-supertest-1km6
const app = require('../app');
const request = require('supertest');
const mongoose = require('mongoose');
const ProductModel = require('../models').product;
const data = require('./data.json');

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
      .set(data.customHeader.name, data.customHeader.value)
      .send(data.mockProduct);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('name');
    expect(res.body).toHaveProperty('price');
  });
  it('should not create a new product with same name', async () => {
    const res = await request(app)
      .post('/api/product')
      .set(data.customHeader.name, data.customHeader.value)
      .send(data.mockProduct);
    expect(res.statusCode).toEqual(500);
  });
  it('should not create a new product without price', async () => {
    const res = await request(app)
      .post('/api/product')
      .set(data.customHeader.name, data.customHeader.value)
      .send(data.mockProductWithOutPrice);
    expect(res.statusCode).toEqual(500);
  });
  it('should get all products', async () => {
    const res = await request(app)
      .get('/api/product')
      .set(data.customHeader.name, data.customHeader.value);
    const products = res.body;
    expect(res.statusCode).toEqual(200);
    expect(products.length).toBe(1);
    expect(products[0].name).toBe(data.mockProduct.name);
    expect(products[0].price).toBe(data.mockProduct.price);
    expect(products[0].quantyty).toBe(data.mockProduct.quantyty);
  });
  it('should get product by Id', async () => {
    const res = await request(app)
      .get(`/api/product/${data.mockProduct.id}`)
      .set(data.customHeader.name, data.customHeader.value);
    const product = res.body;
    expect(res.statusCode).toEqual(200);
    expect(product.id).toBe(data.mockProduct.id);
    expect(product.name).toBe(data.mockProduct.name);
    expect(product.price).toBe(data.mockProduct.price);
    expect(product.quantyty).toBe(data.mockProduct.quantyty);
  });
  it('should not get product by wrong Id', async () => {
    const res = await request(app)
      .get(`/api/product/data.mockProductWithWrongId.id`)
      .set(data.customHeader.name, data.customHeader.value);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeNull();
  });
  it('should update price and quantyty to product by Id', async () => {
    const res = await request(app)
      .put(`/api/product/${data.mockProduct.id}`)
      .set(data.customHeader.name, data.customHeader.value)
      .send(data.mockUpdateProduct);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('price');
    expect(res.body.price).toBe(data.mockUpdateProduct.price);
    expect(res.body).toHaveProperty('quantyty');
    expect(res.body.quantyty).toBe(data.mockUpdateProduct.quantyty);
  });
  it('should update price to product by Id', async () => {
    const res = await request(app)
      .put(`/api/product/${data.mockProduct.id}`)
      .set(data.customHeader.name, data.customHeader.value)
      .send({ price: data.mockUpdateProduct.price });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('price');
    expect(res.body.price).toBe(data.mockUpdateProduct.price);
  });
  it('should update quantyty to product by Id', async () => {
    const res = await request(app)
      .put(`/api/product/${data.mockProduct.id}`)
      .set(data.customHeader.name, data.customHeader.value)
      .send({ quantyty: data.mockUpdateProduct.quantyty });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('quantyty');
    expect(res.body.quantyty).toBe(data.mockUpdateProduct.quantyty);
  });
  it('should not update quantyty to product by Id', async () => {
    const res = await request(app)
      .put(`/api/product/${data.mockProduct.id}`)
      .set(data.customHeader.name, data.customHeader.value)
      .send({ quantyty: data.mockProductWithWrongProps.quantyty });
    expect(res.statusCode).toEqual(500);
  });
  it('should delete product by Id', async () => {
    const res = await request(app)
      .delete(`/api/product/${data.mockProduct.id}`)
      .set(data.customHeader.name, data.customHeader.value);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id');
    expect(res.body.id).toBe(data.mockProduct.id);
  });
});
