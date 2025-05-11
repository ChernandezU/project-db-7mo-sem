//aquí está la logica de cada endpoint
// Controlador para la tabla Portales
const mantenimientoPistaService = require('../services/mantenimientoPistaService');

exports.getAllMantenimientosPistas = async (req, res, next) => {
  try {
    const result = await mantenimientoPistaService.getAllMantenimientosPistas();
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.getMantenimientoPistaById = async (req, res, next) => {
  try {
    const result = await mantenimientoPistaService.getMantenimientoPistaById(req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.createMantenimientoPista = async (req, res, next) => {
  try {
    const result = await mantenimientoPistaService.createMantenimientoPista(req.body);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

exports.updateMantenimientoPista = async (req, res, next) => {
  try {
    const result = await mantenimientoPistaService.updateMantenimientoPista(req.params.id, req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.deleteMantenimientoPista = async (req, res, next) => {
  try {
    const result = await mantenimientoPistaService.deleteMantenimientoPista(req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};
