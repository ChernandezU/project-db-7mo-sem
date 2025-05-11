//aquí está la logica de cada endpoint
// Controlador para la tabla Portales
const cuentaService = require('../services/cuentaService');

exports.getAllCuentas = async (req, res, next) => {
  try {
    const result = await cuentaService.getAllCuentas();
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.getCuentaById = async (req, res, next) => {
  try {
    const result = await cuentaService.getCuentaById(req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.createCuenta = async (req, res, next) => {
  try {
    const result = await cuentaService.createCuenta(req.body);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

exports.updateCuenta = async (req, res, next) => {
  try {
    const result = await cuentaService.updateCuenta(req.params.id, req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.deleteCuenta = async (req, res, next) => {
  try {
    const result = await cuentaService.deleteCuenta(req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};
