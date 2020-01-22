//unit tests models.js
const mongoose = require('mongoose');
const ProductModel = require('../models').product;
const ProductData = { name: 'Gilette', price: 10.99 };

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
        await ProductModel.deleteMany({});
      },
    );
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should create & save product successfully', async () => {
    const validProduct = new ProductModel(ProductData);
    const savedProduct = await validProduct.save();

    expect(savedProduct._id).toBeDefined();
    expect(savedProduct.name).toBe(ProductData.name);
  });

  // // Test Schema is working!!!
  // // You shouldn't be able to add in any field that isn't defined in the schema
  it('should insert product successfully, but the field does not defined in schema should be undefined', async () => {
    const validProduct = new ProductModel({
      name: 'Viking',
      blades: 3,
      price: 7.99,
    });
    const savedProduct = await validProduct.save();
    expect(savedProduct._id).toBeDefined();
    expect(savedProduct.name).toBe('Viking');
    expect(savedProduct.blades).toBeUndefined();
  });

  // Test Validation is working!!!
  // It should us told us the errors in on price field.
  it('create product without required field should failed', async () => {
    const productWithoutRequiredField = new ProductModel({ name: 'Big' });
    let err;
    try {
      const savedProductWithoutRequiredField = await productWithoutRequiredField.save();
      error = savedProductWithoutRequiredField;
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.price).toBeDefined();
  });
});
