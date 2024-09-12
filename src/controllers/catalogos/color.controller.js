const {
    findByPk,
    findAll,
    save,
    editById,
    deleteById,
  } = require("../../services/catalogos/color.service");
  
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
          msg: "Color encontrado exitosamente.",
          valid: true,
        });
      } else {
        // retornar mensaje de error
        res.status(404).json({ msg: "No se encontró el color.", valid: false });
      }
    } catch (error) {
      console.error("Error en el controlador:", error);
      res.status(500).json({ msg: "Error al buscar el color." });
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
          msg: "Colores encontrados exitosamente.",
          valid: true,
        });
      } else {
        // retornar mensaje de error
        res.status(404).json({ msg: "No se encontraron colores.", valid: false });
      }
    } catch (error) {
      console.error("Error en el controlador:", error);
      res.status(500).json({ msg: "Error al buscar los colores." });
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
          res.status(404).json({ msg: "El color ya existe.", valid: false });
        } else {
          res.status(200).json({
            data: result.data,
            msg: "Color guardado exitosamente.",
            valid: true,
          });
        }
      } else {
        // retornar mensaje de error
        res
          .status(404)
          .json({ msg: "No se pudo guardar el color.", valid: false });
      }
    } catch (error) {
      console.error("Error en el controlador:", error);
      res.status(500).json({ msg: "Error al guardar el color." });
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
          msg: "Color editado exitosamente.",
          valid: true,
        });
      } else {
        // retornar mensaje de error
        res
          .status(404)
          .json({ msg: "No se pudo editar el color.", valid: false });
      }
    } catch (error) {
      console.error("Error en el controlador:", error);
      res.status(500).json({ msg: "Error al editar el color." });
    }
  };
  
  exports.deteleById = async (req, res) => {
    try {
      const obj = { ...req.body };
      const result = await deleteById(obj);
      if (result.valid) {
        res.status(200).json({
          data: result.data,
          msg: "Color eliminado exitosamente.",
          valid: true,
        });
      } else {
        res
          .status(404)
          .json({ msg: "No se pudo eliminar el Color.", valid: false });
      }
    } catch (error) {
      console.error("Error en el controlador:", error);
      res.status(500).json({ msg: "Error al eliminar el color." });
    }
  };
  