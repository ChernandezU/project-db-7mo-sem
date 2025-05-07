//aquí está la logica de cada endpoint
const operacionTerrestreService = require('../services/operacionTerrestreService');

exports.getAllOperaciones = async (req, res, next) => {
  try {
    const result = await operacionTerrestreService.getAllOperaciones();
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.getOperacionById = async (req, res, next) => {
  try {
    const result = await operacionTerrestreService.getOperacionById(req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.createOperacion = async (req, res, next) => {
  try {
    const result = await operacionTerrestreService.createOperacion(req.body);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

exports.updateOperacion = async (req, res, next) => {
  try {
    const result = await operacionTerrestreService.updateOperacion(req.params.id, req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.deleteOperacion = async (req, res, next) => {
  try {
    const result = await operacionTerrestreService.deleteOperacion(req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};
