const {vehiculo, vehiculoSchema} = require('./vehiculo');

function setupModels(sequelize) {
    vehiculo.init(vehiculoSchema, vehiculo.config(sequelize));
}

module.exports = setupModels;