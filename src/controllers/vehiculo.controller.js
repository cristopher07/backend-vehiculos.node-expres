const { findById, findAll } = require("../services/vehiculo.service");


exports.findByIdC = async (req, res) => {
    const result = await findById(req.query);

      // validar proceso exitoso
      if (result.valid) {
        // retornar mensaje de exito
        res.status(200).send(responsesServices.success({ rows: result.data }, { msg: successMessages.SUCCESS_FINDALL }));
    } else {
        // retornar mensaje de error
        res.status(400).send(responsesServices.error({ msg: errorMessages.ERROR_FINDALL }));
    }
}; 

exports.findAll = async (req, res) => {
    const { busqueda = "", rowsPerPage = 10, page = 0, paginacion = "" } = req.query;

    try {
        // Llamada al servicio que devuelve los resultados paginados
        const result = await findAll({ busqueda, rowsPerPage, page, paginacion });
        console.log("---result: ", result);

        // Verificar si la respuesta contiene datos en 'data'
        if (result.data && result.data.length > 0) {
            // Preparar la respuesta
            const msg = result.data.map(element => ({
                idVehiculo: element.idVehiculo,
                placa: element.placa,
                modelo: element.modelo,
                activo: element.activo,
                fkIdColor: element.fkIdColor,
                idColor: element.idColor,
                descripcionColor: element.descripcionColor,
                fkIdMarca: element.fkIdMarca,
                idMarca: element.idMarca,
                descripcionMarca: element.descripcionMarca,
                fkIdTipoCombustible: element.fkIdTipoCombustible,
                idTipoCombustible: element.idTipoCombustible,
                descripcionTipoCombustible: element.descripcionTipoCombustible,
                fkIdTipoPlaca: element.fkIdTipoPlaca,
                idTipoPlaca: element.idTipoPlaca,
                descripcionTipoPlaca: element.descripcionTipoPlaca
            }));

            // Retornar mensaje de éxito y datos
            res.status(200).json({ 
                data: msg, 
                count: result.totalRecords,  // totalRecords contiene el total de registros
                msg: 'Vehículos encontrados exitosamente.' 
            });
        } else {
            // Retornar mensaje cuando no hay datos
            res.status(404).json({ msg: 'No se encontraron vehículos.' });
        }
    } catch (error) {
        console.error('Error en el controlador:', error);
        res.status(500).json({ msg: 'Error al buscar los vehículos.' });
    }
};
