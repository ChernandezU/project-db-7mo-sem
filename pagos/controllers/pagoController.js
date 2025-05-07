//aquí está la logica de cada endpoint
const pagoService = require('../services/pagoService');

exports.getAllPagos = async (req, res, next) => {
  try {
    const result = await pagoService.getAllPagos();
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.getPagoById = async (req, res, next) => {
  try {
    const result = await pagoService.getPagoById(req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.createPago = async (req, res, next) => {
  try {
    const result = await pagoService.createPago(req.body);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

exports.updatePago = async (req, res, next) => {
  try {
    const result = await pagoService.updatePago(req.params.id, req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.deletePago = async (req, res, next) => {
  try {
    const result = await pagoService.deletePago(req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};
