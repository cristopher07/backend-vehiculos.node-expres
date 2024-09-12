/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('placa', {
    idTipoPlaca: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'ID_TIPO_PLACA',
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
    tableName: 'tipo_placa',
    timestamps: false,
    indexes: [
      {
        name: "ID_TIPO_PLACA_PK",
        unique: true,
        fields: [
          { name: "ID_TIPO_PLACA" },
        ]
      },
    ]
  });
};



