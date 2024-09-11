const { Sequelize } = require('sequelize');
const { config } = require('../config/config');
const setupModels = require('../models');

// Crear una instancia de Sequelize
const sequelize = new Sequelize(
    config.dbName,       // nombre de la base de datos
    config.dbUser,       // usuario de la base de datos
    config.dbPassword,   // contraseña de la base de datos
    {
        host: config.dbHost, // host de la base de datos
        dialect: 'mysql'     // dialecto de la base de datos
    }
);

// Sincronizar modelos con la base de datos
sequelize.sync();

// Configurar los modelos
setupModels(sequelize);

// Exportar la instancia de Sequelize
module.exports = { sequelize, Sequelize };
