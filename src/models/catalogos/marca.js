/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('marca', {
    idMarca: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'ID_MARCA',
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
    tableName: 'marca',
    timestamps: false,
    indexes: [
      {
        name: "ID_MARCA_PK",
        unique: true,
        fields: [
          { name: "ID_MARCA" },
        ]
      },
    ]
  });
};



