const express = require('express');

const config = require('./config');
const routes = require('./routes');
const middleware = require('./middleware');

const app = express();

app.use(express.json());

//config.pino.init(app);
(async () => {
  await config.mongoose.init();
})();

//INFO: check all requests
app.use(middleware.checkUID);

routes.init(app);

app.use(async (err, req, res, next) => {
  if (err) {
    await middleware.errorHandler(err);
    return next(err);
  }
});

module.exports = app;
