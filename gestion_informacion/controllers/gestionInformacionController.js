//aquí está la logica de cada endpoint
const gestionInformacionService = require('../services/gestionInformacionService');

exports.obtenerInformacion = async (req, res, next) => {
  try {
    const info = await gestionInformacionService.obtenerInformacion();
    res.status(200).json(info);
  } catch (error) {
    next(error);
  }
};

exports.crearInformacion = async (req, res, next) => {
  try {
    const nuevaInfo = await gestionInformacionService.crearInformacion(req.body);
    res.status(201).json(nuevaInfo);
  } catch (error) {
    next(error);
  }
};

exports.actualizarInformacion = async (req, res, next) => {
  try {
    const infoActualizada = await gestionInformacionService.actualizarInformacion(req.params.id, req.body);
    res.status(200).json(infoActualizada);
  } catch (error) {
    next(error);
  }
};

exports.eliminarInformacion = async (req, res, next) => {
  try {
    await gestionInformacionService.eliminarInformacion(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
