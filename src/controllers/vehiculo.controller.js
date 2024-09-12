const { findByPk, findAll, findAllSequelize, save, editById, deleteById } = require("../services/vehiculo.service");


exports.findByIdC = async (req, res) => {
    const result = await findByPk(req.query);

    try {
        // validar proceso exitoso
        if (result.valid) {
          // retornar mensaje de exito
          res.status(200).json({
            data: result.data,
            msg: "Vehículo encontrado exitosamente.",
            valid: true,
          });
        } else {
          // retornar mensaje de error
          res.status(404).json({ msg: "No se encontró el vehículo.", valid: false });
        }
      } catch (error) {
        console.error("Error en el controlador:", error);
        res.status(500).json({ msg: "Error al buscar el vehículo." });
      }
}; 

exports.findAll = async (req, res) => {
    const { busqueda = "", rowsPerPage = 10, page = 0, paginacion = "" } = req.query;

    try {
        // Llamada al servicio que devuelve los resultados paginados
        const result = await findAll({ busqueda, rowsPerPage, page, paginacion });

        // Verificar si la respuesta contiene datos en 'data'
        if (result.valid === true && result.data.length > 0) {
            // Preparar la respuesta
            const msg = 'Vehículos encontrados exitosamente.';

            // Retornar mensaje de éxito y datos
            res.status(200).json({ 
                data: result.data, 
                count: result.totalRecords,  // totalRecords contiene el total de registros
                msg: msg,
                valid: true,
            });
        } else {
            // Retornar mensaje cuando no hay datos
            res.status(404).json({ msg: 'No se encontraron vehículos.', data: [], valid: false });
        }
    } catch (error) {
        console.error('Error en el controlador:', error);
        res.status(500).json({ msg: 'Error al buscar los vehículos.' });
    }
};

exports.findAllSequelize = async (req, res) => {
    const result = await findAllSequelize();

    // validar proceso exitoso
    if (result.valid) {
        // retornar mensaje de exito
        res.status(200).json({
            data: result.data,
            msg: "Vehículos encontrados exitosamente.",
            valid: true,
        });
    } else {
        // retornar mensaje de error
        res.status(400).json({ msg: "No se encontraron vehículos.", valid: false });
    }
};

exports.save = async (req, res) => {
  
    const result = await save(req.body);
    try {
      // validar proceso exitoso
      if (result.valid) {
        // retornar mensaje de exito
        if (result.data[1] === false) {
          res.status(404).json({ msg: "El vehículo ya existe.", valid: false });
        } else {
          res.status(200).json({
            data: result.data,
            msg: "Vehículo guardado exitosamente.",
            valid: true,
          });
        }
      } else {
        // retornar mensaje de error
        res
          .status(404)
          .json({ msg: "No se pudo guardar el vehículo.", valid: false });
      }
    } catch (error) {
      console.error("Error en el controlador:", error);
      res.status(500).json({ msg: "Error al guardar vehículo" });
    }
  };
  
  exports.editById = async (req, res) => {
  
    const result = await editById(req.body);
    try {
      // validar proceso exitoso
      if (result.valid) {
        // retornar mensaje de exito
        res.status(200).json({
          data: result.data,
          msg: "Vehículo editado exitosamente.",
          valid: true,
        });
      } else {
        // retornar mensaje de error
        res
          .status(404)
          .json({ msg: "No se pudo editar el vehículo.", valid: false });
      }
    } catch (error) {
      console.error("Error en el controlador:", error);
      res.status(500).json({ msg: "Error al editar el vehículo." });
    }
  };
  
  exports.deteleById = async (req, res) => {
    try {
      const obj = { ...req.body };
      const result = await deleteById(obj);
      if (result.valid) {
        res.status(200).json({
          data: result.data,
          msg: "Vehículo eliminado exitosamente.",
          valid: true,
        });
      } else {
        res .status(404).json({ msg: "No se pudo eliminar el vehículo.", valid: false });
      }
    } catch (error) {
      console.error("Error en el controlador:", error);
      res.status(500).json({ msg: "Error al eliminar el vehículo." });
    }
  };
  

