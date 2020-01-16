const express = require('express');

const config = require('./src/config');
const routes = require('./src/routes');
const middleware = require('./src/middleware');

const app = express();

app.use(express.json());

config.pino.init(app);
config.mongoose.init();

const port = 3000;

//check all requests
app.use(middleware.checkUID);

routes.init(app);

app.use(async (err, req, res, next) => {
    if (err) {
        await middleware.errorHandler(err);
        return next(err);
    }
});

app.listen(port, () => {
    console.log(`Server start at port ${port}`);
});
