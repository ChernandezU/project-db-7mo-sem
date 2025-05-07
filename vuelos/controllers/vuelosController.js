const vuelosService = require('../services/vuelosService');

exports.getAllVuelos = async (req, res, next) => {
  try {
    const result = await vuelosService.getAllVuelos();
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.getVueloById = async (req, res, next) => {
  try {
    const result = await vuelosService.getVueloById(req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.createVuelo = async (req, res, next) => {
  try {
    const result = await vuelosService.createVuelo(req.body);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

exports.updateVuelo = async (req, res, next) => {
  try {
    const result = await vuelosService.updateVuelo(req.params.id, req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.deleteVuelo = async (req, res, next) => {
  try {
    const result = await vuelosService.deleteVuelo(req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};
