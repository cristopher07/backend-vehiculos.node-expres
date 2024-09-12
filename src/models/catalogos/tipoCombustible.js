/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tipoCombustible', {
    idTipoCombustible: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'ID_TIPO_COMBUSTIBLE',
    },
    descripcion: {
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: 0,
        field: 'DESCRIPCION',
    },
    activo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 1,
        field: 'ACTIVO',
    },
  }, {
    sequelize,
    tableName: 'tipo_combustible',
    timestamps: false,
    indexes: [
      {
        name: "ID_TIPO_COMBUSTIBLE_PK",
        unique: true,
        fields: [
          { name: "ID_TIPO_COMBUSTIBLE" },
        ]
      },
    ]
  });
};



