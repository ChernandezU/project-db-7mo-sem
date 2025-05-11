//aquí está la logica de cada endpoint
// Controlador para la tabla Portales
const carroService = require('../services/carroService');

exports.getAllCarros = async (req, res, next) => {
  try {
    const result = await carroService.getAllCarros();
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.getCarroById = async (req, res, next) => {
  try {
    const result = await carroService.getCarroById(req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.createCarro = async (req, res, next) => {
  try {
    const result = await carroService.createCarro(req.body);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

exports.updateCarro = async (req, res, next) => {
  try {
    const result = await carroService.updateCarro(req.params.id, req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.deleteCarro = async (req, res, next) => {
  try {
    const result = await carroService.deleteCarro(req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};
