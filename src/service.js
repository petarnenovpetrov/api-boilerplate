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
  Object.defineProperty(ns.setProduct, 'body', {
    value: ['id', 'name', 'price', 'quantyty'],
  });
  Object.defineProperty(ns.setProduct, 'method', {
    value: 'POST',
  });
  Object.defineProperty(ns.setProduct, 'url', {
    value: '/api/product',
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
  Object.defineProperty(ns.getProductById, 'params', {
    value: ['id'],
  });
  Object.defineProperty(ns.getProductById, 'method', {
    value: 'GET',
  });
  Object.defineProperty(ns.getProductById, 'url', {
    value: '/api/product',
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
  Object.defineProperty(ns.deleteProductById, 'params', {
    value: ['id'],
  });
  Object.defineProperty(ns.deleteProductById, 'method', {
    value: 'DELETE',
  });
  Object.defineProperty(ns.deleteProductById, 'url', {
    value: '/api/product',
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
  Object.defineProperty(ns.updateProductById, 'params', {
    value: ['id'],
  });
  Object.defineProperty(ns.updateProductById, 'body', {
    value: ['price', 'quantyty'],
  });
  Object.defineProperty(ns.updateProductById, 'method', {
    value: 'PUT',
  });
  Object.defineProperty(ns.updateProductById, 'url', {
    value: '/api/product',
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

  Object.defineProperty(ns.getProducts, 'method', {
    value: 'GET',
  });
  Object.defineProperty(ns.getProducts, 'url', {
    value: '/api/product',
  });

  ns.getApi = function(req, res) {
    return new Promise((resolve, reject) => {
      resolve('Hello API');
    });
  };
  Object.defineProperty(ns.getApi, 'method', {
    value: 'GET',
  });
  Object.defineProperty(ns.getApi, 'url', {
    value: '/api',
  });

  return ns;
})({});
