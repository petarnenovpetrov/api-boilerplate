//unit tests models.js
const mongoose = require('mongoose');
const ProductModel = require('../models').product;
const data = require('./data.json');
const ProductDataGillette = data.Gillette;
const ProductDataViking = data.Viking;
const ProductDataBig = data.Big;

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
    const validProduct = new ProductModel(ProductDataGillette);
    const savedProduct = await validProduct.save();

    expect(savedProduct._id).toBeDefined();
    expect(savedProduct.id).toBe(ProductDataGillette.id);
    expect(savedProduct.name).toBe(ProductDataGillette.name);
    expect(savedProduct.price).toBe(ProductDataGillette.price);
    expect(savedProduct.quantyty).toBe(ProductDataGillette.quantyty);
  });

  it('should insert product successfully, but the field does not defined in schema should be undefined', async () => {
    const validProduct = new ProductModel(ProductDataViking);
    const savedProduct = await validProduct.save();
    expect(savedProduct._id).toBeDefined();
    expect(savedProduct.id).toBe(ProductDataViking.id);
    expect(savedProduct.name).toBe(ProductDataViking.name);
    expect(savedProduct.blades).toBeUndefined();
  });

  it('create product without required field should failed', async () => {
    const productWithoutRequiredField = new ProductModel({
      name: ProductDataBig.name,
    });
    let err;
    try {
      const savedProductWithoutRequiredField = await productWithoutRequiredField.save();
      error = savedProductWithoutRequiredField;
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.id).toBeDefined();
    expect(err.errors.price).toBeDefined();
  });

  it('create product with decimal quantyty should failed', async () => {
    const productWithDecimalQuantyty = new ProductModel(ProductDataBig);
    let err;
    try {
      const savedProductWithoutRequiredField = await productWithDecimalQuantyty.save();
    } catch (error) {
      err = error;
    }

    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.quantyty).toBeDefined();
  });
});
