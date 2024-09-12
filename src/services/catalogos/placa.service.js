const { where } = require("sequelize");
const { sequelize, Sequelize } = require("../../libs/sequelize");

//MODELS

const placa = require("../../models/catalogos/placa")(sequelize, Sequelize);
const { Op } = require("sequelize");
/** **********************************************************************
 * SERVICES
 ************************************************************************/

exports.findByPk = async (id) => {
  try {
    const result = await placa.findByPk(id.idTipoPlaca);
    return { valid: true, data: result };
  } catch (error) {
    console.error("Error", error);
    return { valid: false, data: null };
  }
};

exports.findAll = async () => {
  try {
    const result = await placa.findAll();
    return { valid: true, data: result };
  } catch (error) {
    console.error("Error en el servicio:", error);
    return { valid: false, data: null };
  }
};

exports.save = async (obj) => {
  const aux = {
    where: {
      descripcion: obj.descripcion,
      activo: 1,
    },
    defaults: {
      descripcion: obj.descripcion,
      activo: 1,
    },
  };
  try {
    const result = await placa.findOrCreate(aux);
    return { valid: true, data: result };
  } catch (error) {
    console.error("Error en el servicio:", error);
    return { valid: false, data: null };
  }
};

exports.editById = async (obj) => {
  try {
    const responsePadre = await placa.findAll({
      where: {
        descripcion: obj.descripcion,
        activo: 1,
        idTipoPlaca: {
          [Op.notLike]: obj.idTipoPlaca,
        },
      },
    });
    if (responsePadre.length === 0) {
        const result = await placa.update({
            descripcion: obj.descripcion,
        },{
            where: {
                idTipoPlaca: obj.idTipoPlaca,
            },
          });
          return { valid: true, data: result };
     
    } else {
        return { valid: false, data: null };
    }
  } catch (error) {
    console.error("Error en el servicio:", error);
    return { valid: false, data: null };
  }
};

exports.deleteById = async (obj) => {
  try{
    const result = await placa.update({
      activo: 0,
    },{
      where: {
        idTipoPlaca: obj.idTipoPlaca,
      },
    });
    return { valid: true, data: result };
  } catch (error) {
    console.error("Error en el servicio:", error);
    return { valid: false, data: null };
  }
};
