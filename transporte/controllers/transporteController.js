//aquí está la logica de cada endpoint
// Controlador para la tabla Portales
const transporteService = require('../services/transporteService');

exports.getAllTransportes = async (req, res, next) => {
  try {
    const result = await transporteService.getAllTransportes();
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.getTransporteById = async (req, res, next) => {
  try {
    const result = await transporteService.getTransporteById(req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.createTransporte = async (req, res, next) => {
  try {
    const result = await transporteService.createTransporte(req.body);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

exports.updateTransporte = async (req, res, next) => {
  try {
    const result = await transporteService.updateTransporte(req.params.id, req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.deleteTransporte = async (req, res, next) => {
  try {
    const result = await transporteService.deleteTransporte(req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};