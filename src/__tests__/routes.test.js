//https://dev.to/nedsoft/testing-nodejs-express-api-with-jest-and-supertest-1km6
require('../index');
const request = require('supertest');
const mongoose = require('mongoose');
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
    },
  );
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Post Endpoints', () => {
  it('should create a new post', async () => {
    const res = await request('http://localhost:3000')
      .post('/api/product')
      .set('X-UID', '1234')
      .send({
        name: 'Gillette',
      });
    expect(res.statusCode).toEqual(200);
    //expect(res.body).toHaveProperty('post');
  });
    it('should create a new post', async () => {
      const res = await request('http://localhost:3000')
        .post('/api/product')
        .set('X-UID', '1235')
        .send({
          name: 'Gillette',
        });
      expect(res.statusCode).toEqual(500);
      //expect(res.body).toHaveProperty('post');
    });
});
