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
  ns.getApi = function(req, res) {
    return new Promise((resolve, reject) => {
      resolve('Hello API');
    });
  };

  return ns;
})({});
