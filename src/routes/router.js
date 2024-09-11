const express = require('express');
const app = express.Router();
const vehiculoController = require('../controllers/vehiculo.controller');


app.get('/id', vehiculoController.findByIdC );

app.get('/All', vehiculoController.findAll );


module.exports = app;