const models = require('./models');

module.exports = ((ns) => {
    const Product = models.product;
    ns.setProduct = function(req, res) {
        return new Promise((resolve, reject) => {
            const name = req.body.name;
            const product = new Product();
            product.name = name;
            product.save((err, product) => {
                if (err) {
                    reject(err);
                }
                resolve(product);
            });
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
