//aquí está la logica de cada endpoint
// Controlador para la tabla Portales
const pistaService = require('../services/pistaService');

exports.getAllPistas = async (req, res, next) => {
  try {
    const result = await pistaService.getAllPistas();
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.getPistaById = async (req, res, next) => {
  try {
    const result = await pistaService.getPistaById(req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.createPista = async (req, res, next) => {
  try {
    const result = await pistaService.createPista(req.body);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

exports.updatePista = async (req, res, next) => {
  try {
    const result = await pistaService.updatePista(req.params.id, req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.deletePista = async (req, res, next) => {
  try {
    const result = await pistaService.deletePista(req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};