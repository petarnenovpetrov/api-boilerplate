//ns - Nice Shot ;)
const pino = require('express-pino-logger');
const mongoose = require('mongoose');
module.exports = (ns => {
  ns.pino = {
    init(app) {
      app.use(
        pino({
          prettyPrint: {
            colorize: true,
          },
        }),
      );
    },
  };
  ns.mongoose = {
    url: 'mongodb://localhost:27017/api',
    init() {
      mongoose.connect(ns.mongoose.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      });
      const db = mongoose.connection;
      db.once('open', () => {
        console.info('Connection to mongodb opened');
      });
      db.on('error', err => {
        console.error(err.message || JSON.stringify(err));
      });
    },
  };

  return ns;
})({});
