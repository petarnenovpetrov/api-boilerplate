//unit tests models.js
const mongoose = require('mongoose');
const ProductModel = require('../models').product;
const ProductData = { name: 'Gilette' };

describe('Product Model Test', () => {
  // It's just so easy to connect to the MongoDB Memory Server
  // By using mongoose.connect

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

  it('create & save user successfully', async () => {
    const validProduct = new ProductModel(ProductData);
    const savedProduct = await validProduct.save();
    // Object Id should be defined when successfully saved to MongoDB.
    expect(savedProduct._id).toBeDefined();
    expect(savedProduct.name).toBe(ProductData.name);
    // expect(savedProduct.gender).toBe(ProductData.gender);
    // expect(savedProduct.dob).toBe(ProductData.dob);
    // expect(savedProduct.loginUsing).toBe(ProductData.loginUsing);
  });

  // // Test Schema is working!!!
  // // You shouldn't be able to add in any field that isn't defined in the schema
  // it('insert user successfully, but the field does not defined in schema should be undefined', async () => {
  //     const userWithInvalidField = new ProductModel({ name: 'TekLoon', gender: 'Male', nickname: 'Handsome TekLoon' });
  //     const savedUserWithInvalidField = await userWithInvalidField.save();
  //     expect(savedUserWithInvalidField._id).toBeDefined();
  //     expect(savedUserWithInvalidField.nickkname).toBeUndefined();
  // });

  // // Test Validation is working!!!
  // // It should us told us the errors in on gender field.
  // it('create user without required field should failed', async () => {
  //     const userWithoutRequiredField = new ProductModel({ name: 'TekLoon' });
  //     let err;
  //     try {
  //         const savedUserWithoutRequiredField = await userWithoutRequiredField.save();
  //         error = savedUserWithoutRequiredField;
  //     } catch (error) {
  //         err = error
  //     }
  //     expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
  //     expect(err.errors.gender).toBeDefined();
  // });
});
