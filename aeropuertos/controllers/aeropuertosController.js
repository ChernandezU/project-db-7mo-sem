const aeropuertosService = require('../services/aeropuertosService');

exports.obtenerAeropuertos = async (req, res, next) => {
  try {
    const aeropuertos = await aeropuertosService.obtenerAeropuertos();
    res.status(200).json(aeropuertos);
  } catch (error) {
    next(error);
  }
};

exports.crearAeropuerto = async (req, res, next) => {
  try {
    const nuevoAeropuerto = await aeropuertosService.crearAeropuerto(req.body);
    res.status(201).json(nuevoAeropuerto);
  } catch (error) {
    next(error);
  }
};

exports.actualizarAeropuerto = async (req, res, next) => {
  try {
    const aeropuertoActualizado = await aeropuertosService.actualizarAeropuerto(req.params.id, req.body);
    res.status(200).json(aeropuertoActualizado);
  } catch (error) {
    next(error);
  }
};

exports.eliminarAeropuerto = async (req, res, next) => {
  try {
    await aeropuertosService.eliminarAeropuerto(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
