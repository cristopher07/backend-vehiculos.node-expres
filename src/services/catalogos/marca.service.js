const { where } = require("sequelize");
const { sequelize, Sequelize } = require("../../libs/sequelize");

//MODELS

const marca = require("../../models/catalogos/marca")(sequelize, Sequelize);
const { Op } = require("sequelize");
/** **********************************************************************
 * SERVICES
 ************************************************************************/

exports.findByPk = async (id) => {
  try {
    const result = await marca.findByPk(id.idMarca);
    return { valid: true, data: result };
  } catch (error) {
    console.error("Error", error);
    return { valid: false, data: null };
  }
};

exports.findAll = async () => {
  try {
    const result = await marca.findAll(
      {
        where: {
          activo: 1,
        },
      }
    );
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
    const result = await marca.findOrCreate(aux);
    return { valid: true, data: result };
  } catch (error) {
    console.error("Error en el servicio:", error);
    return { valid: false, data: null };
  }
};

exports.editById = async (obj) => {
  try {
    const responsePadre = await marca.findAll({
      where: {
        descripcion: obj.descripcion,
        activo: 1,
        idMarca: {
          [Op.notLike]: obj.idMarca,
        },
      },
    });
    if (responsePadre.length === 0) {
        const result = await marca.update({
            descripcion: obj.descripcion,
        },{
            where: {
                idMarca: obj.idMarca,
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
    const result = await marca.update({
      activo: 0,
    },{
      where: {
        idMarca: obj.idMarca,
      },
    });
    return { valid: true, data: result };
  } catch (error) {
    console.error("Error en el servicio:", error);
    return { valid: false, data: null };
  }
};
