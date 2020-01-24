const models = require('./models');

module.exports = (ns => {
  const Product = models.product;
  ns.setProduct = function(req, res) {
    return new Promise((resolve, reject) => {
      const { id, name, price, quantyty } = req.body;
      const product = new Product({ id, name, price, quantyty });
      product.save((err, product) => {
        if (err) {
          reject(err);
        }
        resolve(product);
      });
    });
  };
  Object.defineProperty(ns.setProduct, 'meta', {
    value: {
      body: ['id', 'name', 'price', 'quantyty'],
      method: 'POST',
      url: '/api/product',
    },
  });

  ns.getProductById = function(req, res) {
    return new Promise((resolve, reject) => {
      const { id } = req.params;
      Product.findOne({ id: id }, (err, product) => {
        if (err) {
          reject(err);
        }
        resolve(product);
      });
    });
  };
  Object.defineProperty(ns.getProductById, 'meta', {
    value: {
      params: ['id'],
      method: 'GET',
      url: '/api/product',
    },
  });

  ns.deleteProductById = function(req, res) {
    return new Promise((resolve, reject) => {
      const { id } = req.params;
      Product.findOneAndDelete({ id: id }, (err, product) => {
        if (err) {
          reject(err);
        }
        resolve(product);
      });
    });
  };

  Object.defineProperty(ns.deleteProductById, 'meta', {
    value: {
      params: ['id'],
      method: 'DELETE',
      url: '/api/product',
    },
  });
  ns.updateProductById = function(req, res) {
    return new Promise((resolve, reject) => {
      const { id } = req.params;
      const { ...props } = req.body;
      Product.findOneAndUpdate(
        { id: id },
        { ...props },
        { new: true, runValidators: true },
        (err, product) => {
          if (err) {
            reject(err);
          }
          resolve(product);
        },
      );
    });
  };
  Object.defineProperty(ns.updateProductById, 'meta', {
    value: {
      params: ['id'],
      body: ['price', 'quantyty'],
      method: 'PUT',
      url: '/api/product',
    },
  });
  ns.getProducts = function(req, res) {
    return new Promise((resolve, reject) => {
      Product.find({}, (err, products) => {
        if (err) {
          reject(err);
        }
        resolve(products);
      });
    });
  };
  Object.defineProperty(ns.getProducts, 'meta', {
    value: {
      method: 'GET',
      url: '/api/product',
    },
  });
  ns.getApi = function(req, res) {
    return new Promise((resolve, reject) => {
      resolve('Hello API');
    });
  };
  Object.defineProperty(ns.getApi, 'meta', {
    value: {
      method: 'GET',
      url: '/api',
    },
  });

  return ns;
})({});
