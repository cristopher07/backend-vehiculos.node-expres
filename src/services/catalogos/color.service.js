const { where } = require("sequelize");
const { sequelize, Sequelize } = require("../../libs/sequelize");

//MODELS

const color = require("../../models/catalogos/color")(sequelize, Sequelize);
const { Op } = require("sequelize");
/** **********************************************************************
 * SERVICES
 ************************************************************************/

exports.findByPk = async (id) => {
  try {
    const result = await color.findByPk(id.idColor);
    return { valid: true, data: result };
  } catch (error) {
    console.error("Error", error);
    return { valid: false, data: null };
  }
};

exports.findAll = async () => {
  try {
    const result = await color.findAll();
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
    const result = await color.findOrCreate(aux);
    return { valid: true, data: result };
  } catch (error) {
    console.error("Error en el servicio:", error);
    return { valid: false, data: null };
  }
};

exports.editById = async (obj) => {
  try {
    const responsePadre = await color.findAll({
      where: {
        descripcion: obj.descripcion,
        activo: 1,
        idColor: {
          [Op.notLike]: obj.idColor,
        },
      },
    });
    if (responsePadre.length === 0) {
        const result = await color.update({
            descripcion: obj.descripcion,
        },{
            where: {
                idColor: obj.idColor,
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
    const result = await color.update({
      activo: 0,
    },{
      where: {
        idColor: obj.idColor,
      },
    });
    return { valid: true, data: result };
  } catch (error) {
    console.error("Error en el servicio:", error);
    return { valid: false, data: null };
  }
};
