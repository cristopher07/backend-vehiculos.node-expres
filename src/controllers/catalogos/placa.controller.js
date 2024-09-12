const {
  findByPk,
  findAll,
  save,
  editById,
  deleteById,
} = require("../../services/catalogos/placa.service");

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
        msg: "Placa encontrada exitosamente.",
        valid: true,
      });
    } else {
      // retornar mensaje de error
      res.status(404).json({ msg: "No se encontró la placa.", valid: false });
    }
  } catch (error) {
    console.error("Error en el controlador:", error);
    res.status(500).json({ msg: "Error al buscar la placa." });
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
        msg: "Placas encontradas exitosamente.",
        valid: true,
      });
    } else {
      // retornar mensaje de error
      res.status(404).json({ msg: "No se encontraron placas.", valid: false });
    }
  } catch (error) {
    console.error("Error en el controlador:", error);
    res.status(500).json({ msg: "Error al buscar las placas." });
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
        res.status(404).json({ msg: "La placa ya existe.", valid: false });
      } else {
        res.status(200).json({
          data: result.data,
          msg: "Placa guardada exitosamente.",
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
        msg: "Placa editada exitosamente.",
        valid: true,
      });
    } else {
      // retornar mensaje de error
      res
        .status(404)
        .json({ msg: "No se pudo editar la placa.", valid: false });
    }
  } catch (error) {
    console.error("Error en el controlador:", error);
    res.status(500).json({ msg: "Error al editar la placa." });
  }
};

exports.deteleById = async (req, res) => {
  try {
    const obj = { ...req.body };
    const result = await deleteById(obj);
    if (result.valid) {
      res.status(200).json({
        data: result.data,
        msg: "Placa eliminada exitosamente.",
        valid: true,
      });
    } else {
      res
        .status(404)
        .json({ msg: "No se pudo eliminar la placa.", valid: false });
    }
  } catch (error) {
    console.error("Error en el controlador:", error);
    res.status(500).json({ msg: "Error al eliminar la placa." });
  }
};
