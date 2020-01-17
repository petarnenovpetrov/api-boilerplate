const service = require('./service');
module.exports = (ns => {
  ns.init = function(app) {
    //welckome message
    app.get('/api', async (req, res, next) => {
      await service
        .getApi(req, res)
        .then(data => res.json(data))
        .catch(err => next(err));
    });

    //Product resource
    app.get('/api/product', async (req, res, next) => {
      await service
        .getProducts(req, res)
        .then(data => res.json(data))
        .catch(err => next(err));
    });

    app.post('/api/product', async (req, res, next) => {
      await service
        .setProduct(req, res)
        .then(data => res.json(data))
        .catch(err => next(err));
    });
  };
  return ns;
})({});
