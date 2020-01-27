const service = require('./service');
module.exports = (ns => {
  ns.init = function(app) {
    //welckome message
    app.get('/api', async (req, res, next) => {
      await service
        .getApi()
        .then(data => res.json(data))
        .catch(err => next(err));
    });

    //Product resource
    app.get('/api/product', async (req, res, next) => {
      await service
        .getProducts()
        .then(data => res.json(data))
        .catch(err => next(err));
    });

    app.post('/api/product', async (req, res, next) => {
      await service
        .setProduct(req.body)
        .then(data => res.json(data))
        .catch(err => next(err));
    });

    app.get('/api/product/:id', async (req, res, next) => {
      await service
        .getProductById(req.params)
        .then(data => res.json(data))
        .catch(err => next(err));
    });

    app.put('/api/product/:id', async (req, res, next) => {
      await service
        .updateProductById(req.body, req.params)
        .then(data => res.json(data))
        .catch(err => next(err));
    });

    app.delete('/api/product/:id', async (req, res, next) => {
      await service
        .deleteProductById(req.params)
        .then(data => res.json(data))
        .catch(err => next(err));
    });
  };
  return ns;
})({});
