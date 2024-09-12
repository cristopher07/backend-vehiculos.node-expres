/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('color', {
    idColor: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'ID_COLOR',
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
    tableName: 'color',
    timestamps: false,
    indexes: [
      {
        name: "ID_COLOR_PK",
        unique: true,
        fields: [
          { name: "ID_COLOR" },
        ]
      },
    ]
  });
};