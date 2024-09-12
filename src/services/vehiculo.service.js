const { sequelize, Sequelize } = require("../libs/sequelize");

//MODELS
const vehiculo = require("../models/vehiculo")(sequelize, Sequelize);
const { Op } = require("sequelize");
/** **********************************************************************
 * SERVICES
 ************************************************************************/

exports.findAllSequelize = async () => {
  try {
    const result = await vehiculo.findAll();
    return { valid: true, data: result };
  } catch (error) {
    console.error("Error en el servicio:", error);
    return { valid: false, data: null };
  }
};

exports.findAll = async ({ busqueda = "", rowsPerPage = 10, page = 0 }) => {
  // Calcular el offset para la paginación
  const offset = page * rowsPerPage;

  try {
    // Construir la consulta básica
    let query = `
    SELECT COUNT(*) OVER() AS count,
        v.ID_VEHICULO as idVehiculo, 
        v.PLACA as placa, 
        v.MODELO as modelo,
        v.ACTIVO as activo, 
        v.FK_ID_COLOR as fkIdColor,
        c.ID_COLOR as idColor,
        c.DESCRIPCION as descripcionColor,
        v.FK_ID_MARCA as fkIdMarca,
        m.ID_MARCA as idMarca, 
        m.DESCRIPCION as descripcionMarca,
        v.FK_ID_TIPO_COMBUSTIBLE as fkIdTipoCombustible, 
        tc.ID_TIPO_COMBUSTIBLE as idTipoCombustible,
        tc.DESCRIPCION as descripcionTipoCombustible,
        v.FK_ID_TIPO_PLACA as fkIdTipoPlaca,
        tp.ID_TIPO_PLACA as idTipoPlaca,
        tp.DESCRIPCION as descripcionTipoPlaca
    FROM vehiculos.vehiculo as v
    LEFT JOIN color c ON c.ID_COLOR = v.FK_ID_COLOR 
    LEFT JOIN marca m ON m.ID_MARCA = v.FK_ID_MARCA 
    LEFT JOIN tipo_combustible tc ON tc.ID_TIPO_COMBUSTIBLE = v.FK_ID_TIPO_COMBUSTIBLE 
    LEFT JOIN tipo_placa tp ON tp.ID_TIPO_PLACA = v.FK_ID_TIPO_PLACA 
    WHERE v.ACTIVO = 1
`;

    // Si hay una búsqueda, agregar la condición para varias columnas
    if (busqueda) {
      query += `
        AND (
            v.PLACA LIKE :busqueda
            OR v.MODELO LIKE :busqueda
            OR c.DESCRIPCION LIKE :busqueda
            OR m.DESCRIPCION LIKE :busqueda
            OR tc.DESCRIPCION LIKE :busqueda
            OR tp.DESCRIPCION LIKE :busqueda
        )
    `;
    }

    // Aplicar la paginación con LIMIT y OFFSET
    query += `
    ORDER BY v.ID_VEHICULO
    LIMIT :rowsPerPage OFFSET :offset
    `;
    const response = await sequelize.query(query, {
      replacements: {
        busqueda: `%${busqueda}%`, // Para hacer búsquedas parciales
        rowsPerPage, // Limitar el número de filas por página
        offset, // Desplazamiento para paginación
      },
      type: Sequelize.QueryTypes.SELECT,
    });

    const totalRecords = response.length > 0 ? response[0].count : 0;
    return {
      totalRecords, // Total de registros (no paginado)
      data: response, // Datos de la página actual
      valid: true,
    };
  } catch (error) {
    console.error("Error", error);
    return {
      totalRecords: 0,
      data: [],
      valid: false,
    };
  }
};

exports.save = async (obj) => {
  const aux = {
    where: {
      placa: obj.placa,
      activo: 1,
    },
    defaults: {
      placa: obj.placa,
      modelo: obj.modelo,
      fkIdColor: obj.fkIdColor,
      fkIdMarca: obj.fkIdMarca,
      fkIdTipoCombustible: obj.fkIdTipoCombustible,
      fkIdTipoPlaca: obj.fkIdTipoPlaca,
      activo: 1,
    },
  };
  try {
    const result = await vehiculo.findOrCreate(aux);
    return { valid: true, data: result };
  } catch (error) {
    console.error("Error en el servicio:", error);
    return { valid: false, data: null };
  }
};

exports.editById = async (obj) => {
  console.log("obj: ", obj);
  try {
    const responsePadre = await vehiculo.findAll({
      where: {
        placa: obj.placa,
        activo: 1,
        idVehiculo: {
          [Op.notLike]: obj.idVehiculo,
        },
      },
    });
    if (responsePadre.length === 0) {
        const result = await vehiculo.update({
            placa: obj.placa,
            modelo: obj.modelo,
            fkIdColor: obj.fkIdColor,
            fkIdMarca: obj.fkIdMarca,
            fkIdTipoCombustible: obj.fkIdTipoCombustible,
            fkIdTipoPlaca: obj.fkIdTipoPlaca,
        },{
            where: {
              idVehiculo: obj.idVehiculo,
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
    const result = await vehiculo.update({
      activo: 0,
    },{
      where: {
        idVehiculo: obj.idVehiculo,
      },
    });
    return { valid: true, data: result };
  } catch (error) {
    console.error("Error en el servicio:", error);
    return { valid: false, data: null };
  }
};

exports.findByPk = async (id) => {
  try {
    const result = await vehiculo.findByPk(id.idVehiculo);
    return { valid: true, data: result };
  } catch (error) {
    console.error("Error", error);
    return { valid: false, data: null };
  }
};

