const express = require('express');
const cors = require('cors');

const config = require('./config');
const routes = require('./routes');
const middleware = require('./middleware');

const app = express();

app.use(express.json());
app.use(cors());

config.pino.init(app);
config.mongoose.init();
//INFO: add some security check
//checkUID validate header "X-UID:1234"
//app.use(middleware.checkUID);
routes.init(app);

app.use(async (err, req, res, next) => {
  if (err) {
    await middleware.errorHandler(err);
    return next(err);
  }
});

module.exports = app;
