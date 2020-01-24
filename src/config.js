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
    url:
      process.env.NODE_ENV === 'test'
        ? global.__MONGO_URI__
        : 'mongodb://mongo:27017/api', //change mongo to localhost if run local
    async init() {
      await mongoose.connect(ns.mongoose.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      });
      const db = mongoose.connection;
      db.once('open', () => {
        console.info('Connection to mongodb opened');
        console.info(ns.mongoose.url);
      });
      db.on('error', err => {
        console.error(err.message || JSON.stringify(err));
      });
    },
  };

  return ns;
})({});
