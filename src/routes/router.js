const express = require('express');
const app = express.Router();
const vehiculoController = require('../controllers/vehiculo.controller');
const placaController = require('../../src/controllers/catalogos/placa.controller');
const tipoCombustibleController = require('../../src/controllers/catalogos/tipoCombustible.controlle');
const marcaController = require('../../src/controllers/catalogos/marca.controller');
const colorController = require('../../src/controllers/catalogos/color.controller');

//vehiculos
app.get('/id', vehiculoController.findByIdC );
app.get('/All', vehiculoController.findAll );
app.get('/AllSimple', vehiculoController.findAllSequelize );
app.post('/save', vehiculoController.save );
app.post('/editById', vehiculoController.editById );
app.post('/deleteById', vehiculoController.deteleById );


//catalogo placa
app.get('/placa/id', placaController.findByPkC );
app.get('/placa/All', placaController.findAll );
app.post('/placa/save', placaController.save );
app.post('/placa/editById', placaController.editById );
app.post('/placa/deleteById', placaController.deteleById );

//catalogo tipo combustible
app.get('/tipoCombustible/id', tipoCombustibleController.findByPkC );
app.get('/tipoCombustible/All', tipoCombustibleController.findAll );
app.post('/tipoCombustible/save', tipoCombustibleController.save );
app.post('/tipoCombustible/editById', tipoCombustibleController.editById );
app.post('/tipoCombustible/deleteById', tipoCombustibleController.deteleById );

//catalogo marca
app.get('/marca/id', marcaController.findByPkC );
app.get('/marca/All', marcaController.findAll );
app.post('/marca/save', marcaController.save );
app.post('/marca/editById', marcaController.editById );
app.post('/marca/deleteById', marcaController.deteleById );

//catalogo color
app.get('/color/id', colorController.findByPkC );
app.get('/color/All', colorController.findAll );
app.post('/color/save', colorController.save );
app.post('/color/editById', colorController.editById );
app.post('/color/deleteById', colorController.deteleById );

module.exports = app;