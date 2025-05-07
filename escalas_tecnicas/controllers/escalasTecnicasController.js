//aquí está la logica de cada endpoint
const escalasService = require('../services/escalasTecnicasService');

exports.getAllEscalas = async (req, res, next) => {
  try {
    const result = await escalasService.getAllEscalas();
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.getEscalaById = async (req, res, next) => {
  try {
    const result = await escalasService.getEscalaById(req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.createEscala = async (req, res, next) => {
  try {
    const result = await escalasService.createEscala(req.body);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

exports.updateEscala = async (req, res, next) => {
  try {
    const result = await escalasService.updateEscala(req.params.id, req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.deleteEscala = async (req, res, next) => {
  try {
    const result = await escalasService.deleteEscala(req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};
