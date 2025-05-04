//aquí está la logica de cada endpoint
const avionesService = require('../services/avionesService');

exports.obtenerAviones = async (req, res, next) => {
  try {
    const aviones = await avionesService.obtenerAviones();
    res.status(200).json(aviones);
  } catch (error) {
    next(error);
  }
};

exports.crearAvion = async (req, res, next) => {
  try {
    const nuevoAvion = await avionesService.crearAvion(req.body);
    res.status(201).json(nuevoAvion);
  } catch (error) {
    next(error);
  }
};

exports.actualizarAvion = async (req, res, next) => {
  try {
    const avionActualizado = await avionesService.actualizarAvion(req.params.id, req.body);
    res.status(200).json(avionActualizado);
  } catch (error) {
    next(error);
  }
};

exports.eliminarAvion = async (req, res, next) => {
  try {
    await avionesService.eliminarAvion(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
