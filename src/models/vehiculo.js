/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('vehiculo', {
    idVehiculo: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'ID_VEHICULO',
    },
    placa: {
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: 0,
        field: 'PLACA',
    },
    modelo: {
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: '-',
        field: 'MODELO',
    },
    activo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 1,
        field: 'ACTIVO',
    },
    fkIdColor: {
        type: DataTypes.BIGINT,
        allowNull: true,
        field: 'FK_ID_COLOR'
      },
    fkIdMarca: {
            type: DataTypes.BIGINT,
            allowNull: true,
            field: 'FK_ID_MARCA'
    },
    fkIdTipoCombustible: {
        type: DataTypes.BIGINT,
        allowNull: true,
        field: 'FK_ID_TIPO_COMBUSTIBLE'
    },
    fkIdTipoPlaca: {
        type: DataTypes.BIGINT,
        allowNull: true,
        field: 'FK_ID_TIPO_PLACA'
    },
  }, {
    sequelize,
    tableName: 'vehiculo',
    timestamps: false,
    indexes: [
      {
        name: "ID_VEHICULO_PK",
        unique: true,
        fields: [
          { name: "ID_VEHICULO" },
        ]
      },
    ]
  });
};

