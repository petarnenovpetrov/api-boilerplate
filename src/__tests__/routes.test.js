//https://dev.to/nedsoft/testing-nodejs-express-api-with-jest-and-supertest-1km6
const app = require('../app');
const request = require('supertest');
const mongoose = require('mongoose');
const ProductModel = require('../models').product;

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
      .send({
        name: 'Gillette',
        price: 12.99,
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('_id');
    expect(res.body).toHaveProperty('name');
    expect(res.body).toHaveProperty('price');
  });
  it('should not create a new product with same name', async () => {
    const res = await request(app)
      .post('/api/product')
      .set('X-UID', '1234')
      .send({
        name: 'Gillette',
        price: 12.99,
      });
    expect(res.statusCode).toEqual(500);
  });
  it('should not create a new product without price', async () => {
    const res = await request(app)
      .post('/api/product')
      .set('X-UID', '1234')
      .send({
        name: 'Gillette',
      });
    expect(res.statusCode).toEqual(500);
  });
});
