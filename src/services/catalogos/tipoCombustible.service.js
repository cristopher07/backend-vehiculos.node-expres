const { where } = require("sequelize");
const { sequelize, Sequelize } = require("../../libs/sequelize");

//MODELS

const tipoCombustible = require("../../models/catalogos/tipoCombustible")(sequelize, Sequelize);
const { Op } = require("sequelize");
/** **********************************************************************
 * SERVICES
 ************************************************************************/

exports.findByPk = async (id) => {
  try {
    const result = await tipoCombustible.findByPk(id.idTipoCombustible);
    return { valid: true, data: result };
  } catch (error) {
    console.error("Error", error);
    return { valid: false, data: null };
  }
};

exports.findAll = async () => {
  try {
    const result = await tipoCombustible.findAll(
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
    const result = await tipoCombustible.findOrCreate(aux);
    return { valid: true, data: result };
  } catch (error) {
    console.error("Error en el servicio:", error);
    return { valid: false, data: null };
  }
};

exports.editById = async (obj) => {
  try {
    const responsePadre = await tipoCombustible.findAll({
      where: {
        descripcion: obj.descripcion,
        activo: 1,
        idTipoCombustible: {
          [Op.notLike]: obj.idTipoCombustible,
        },
      },
    });
    if (responsePadre.length === 0) {
        const result = await tipoCombustible.update({
            descripcion: obj.descripcion,
        },{
            where: {
                idTipoCombustible: obj.idTipoCombustible,
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
    const result = await tipoCombustible.update({
      activo: 0,
    },{
      where: {
        idTipoCombustible: obj.idTipoCombustible,
      },
    });
    return { valid: true, data: result };
  } catch (error) {
    console.error("Error en el servicio:", error);
    return { valid: false, data: null };
  }
};
