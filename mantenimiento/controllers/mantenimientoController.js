//aquí está la logica de cada endpoint

const mantenimientoService = require('../services/mantenimientoService');

exports.getAllMantenimientos = async (req, res, next) => {
  try {
    const result = await mantenimientoService.getAllMantenimientos();
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.getMantenimientoById = async (req, res, next) => {
  try {
    const result = await mantenimientoService.getMantenimientoById(req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.createMantenimiento = async (req, res, next) => {
  try {
    const result = await mantenimientoService.createMantenimiento(req.body);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

exports.updateMantenimiento = async (req, res, next) => {
  try {
    const result = await mantenimientoService.updateMantenimiento(req.params.id, req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.deleteMantenimiento = async (req, res, next) => {
  try {
    const result = await mantenimientoService.deleteMantenimiento(req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};
