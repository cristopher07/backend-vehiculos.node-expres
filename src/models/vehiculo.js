/* jshint indent: 1 */

const { Model, DataTypes, Sequelize } = require('sequelize');

const vehiculo_TABLE = 'vehiculo';

class vehiculo extends Model {
    static config(sequelize) {
        return {
            sequelize,
            tableName: vehiculo_TABLE,
            modelName: 'vehiculo',
            timestamps: true
        }
    }
} 


  const vehiculoSchema = {
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
    fkIdtipoPlaca: {
        type: DataTypes.BIGINT,
        allowNull: true,
        field: 'FK_ID_TIPO_PLACA'
    },
  }
    
           
  module.exports = { vehiculo, vehiculoSchema };
