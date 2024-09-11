const express = require('express');

const vehiculoRouter = require('./router');

function routerApi(app) {
    const router = express.Router();
    app.use('/api/', router);
    router.use('/vehiculos', vehiculoRouter);
}

module.exports = routerApi;

