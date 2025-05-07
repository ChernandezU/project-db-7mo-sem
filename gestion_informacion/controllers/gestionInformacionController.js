//aquí está la logica de cada endpoint
const gestionInformacionService = require('../services/gestionInformacionService');

exports.getAllInformacion = async (req, res, next) => {
  try {
    const result = await gestionInformacionService.getAllInformacion();
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.getInformacionById = async (req, res, next) => {
  try {
    const result = await gestionInformacionService.getInformacionById(req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.createInformacion = async (req, res, next) => {
  try {
    const result = await gestionInformacionService.createInformacion(req.body);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

exports.updateInformacion = async (req, res, next) => {
  try {
    const result = await gestionInformacionService.updateInformacion(req.params.id, req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.deleteInformacion = async (req, res, next) => {
  try {
    const result = await gestionInformacionService.deleteInformacion(req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};
