//aquí está la logica de cada endpoint
const facturacionService = require('../services/facturacionService');

exports.getAllFacturas = async (req, res, next) => {
  try {
    const result = await facturacionService.getAllFacturas();
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.getFacturaById = async (req, res, next) => {
  try {
    const result = await facturacionService.getFacturaById(req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.createFactura = async (req, res, next) => {
  try {
    const result = await facturacionService.createFactura(req.body);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

exports.updateFactura = async (req, res, next) => {
  try {
    const result = await facturacionService.updateFactura(req.params.id, req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.deleteFactura = async (req, res, next) => {
  try {
    const result = await facturacionService.deleteFactura(req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};
