//unit tests models.js
const mongoose = require('mongoose');
const ProductModel = require('../models').product;
const ProductData = { id: "1",name: 'Gilette', price: 10.99, quantyty: 12 };

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

    expect(savedProduct.id).toBeDefined();
    expect(savedProduct.name).toBe(ProductData.name);
  });

  it('should insert product successfully, but the field does not defined in schema should be undefined', async () => {
    const validProduct = new ProductModel({
      id: "2",
      name: 'Viking',
      blades: 3,
      price: 7.99,
    });
    const savedProduct = await validProduct.save();
    expect(savedProduct.id).toBeDefined();
    expect(savedProduct.name).toBe('Viking');
    expect(savedProduct.blades).toBeUndefined();
  });

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

  it('create product with decimal quantyty should failed', async () => {
    const productWithDecimalQuantyty = new ProductModel({
      id:"3",
      name: 'Big',
      price: 10.99,
      quantyty: 10.5,
    });
    let err;
    try {
      const savedProductWithoutRequiredField = await productWithDecimalQuantyty.save();
      error = savedProductWithoutRequiredField;
    } catch (error) {
      err = error;
    }

    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.quantyty).toBeDefined();
  });
});
