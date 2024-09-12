const {
    findByPk,
    findAll,
    save,
    editById,
    deleteById,
  } = require("../../services/catalogos/tipoCombustible.service");
  
  /** **********************************************************************
   * CONTROLLERS
   ************************************************************************/
  
  exports.findByPkC = async (req, res) => {
    const result = await findByPk(req.query);
    try {
      // validar proceso exitoso
      if (result.valid) {
        // retornar mensaje de exito
        res.status(200).json({
          data: result.data,
          msg: "Tipo combustible encontrado exitosamente.",
          valid: true,
        });
      } else {
        // retornar mensaje de error
        res.status(404).json({ msg: "No se encontró el tipo Combustible.", valid: false });
      }
    } catch (error) {
      console.error("Error en el controlador:", error);
      res.status(500).json({ msg: "Error al buscar  el tipo Combustible." });
    }
  };
  
  exports.findAll = async (req, res) => {
    const result = await findAll();
    try {
      // validar proceso exitoso
      if (result.valid) {
        // retornar mensaje de exito
        res.status(200).json({
          data: result.data,
          msg: " El tipo de combustible encontrado exitosamente.",
          valid: true,
        });
      } else {
        // retornar mensaje de error
        res.status(404).json({ msg: "No se encontraron tipos de combustible.", valid: false });
      }
    } catch (error) {
      console.error("Error en el controlador:", error);
      res.status(500).json({ msg: "Error al buscar el tipo de combustible ." });
    }
  };
  
  exports.save = async (req, res) => {
    const obj = { ...req.body };
    const result = await save(obj);
    try {
      // validar proceso exitoso
      if (result.valid) {
        // retornar mensaje de exito
        if (result.data[1] === false) {
          res.status(404).json({ msg: "El tipo de combustible ya existe.", valid: false });
        } else {
          res.status(200).json({
            data: result.data,
            msg: "Tipo de combustible guardado exitosamente.",
            valid: true,
          });
        }
      } else {
        // retornar mensaje de error
        res
          .status(404)
          .json({ msg: "No se pudo guardar la placa.", valid: false });
      }
    } catch (error) {
      console.error("Error en el controlador:", error);
      res.status(500).json({ msg: "Error al guardar la placa." });
    }
  };
  
  exports.editById = async (req, res) => {
    const obj = { ...req.body };
    const result = await editById(obj);
    try {
      // validar proceso exitoso
      if (result.valid) {
        // retornar mensaje de exito
        res.status(200).json({
          data: result.data,
          msg: "Tipo de combustible editado exitosamente.",
          valid: true,
        });
      } else {
        // retornar mensaje de error
        res
          .status(404)
          .json({ msg: "No se pudo editar el tipo de combustible.", valid: false });
      }
    } catch (error) {
      console.error("Error en el controlador:", error);
      res.status(500).json({ msg: "Error al editar." });
    }
  };
  
  exports.deteleById = async (req, res) => {
    try {
      const obj = { ...req.body };
      const result = await deleteById(obj);
      if (result.valid) {
        res.status(200).json({
          data: result.data,
          msg: "Tipo de combustible eliminado exitosamente.",
          valid: true,
        });
      } else {
        res
          .status(404)
          .json({ msg: "No se pudo eliminar el tipo de combustible.", valid: false });
      }
    } catch (error) {
      console.error("Error en el controlador:", error);
      res.status(500).json({ msg: "Error al eliminar." });
    }
  };
  