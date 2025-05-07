//aquí está la logica de cada endpoint
const programaVueloService = require('../services/programaVueloService');

exports.getAllProgramasVuelo = async (req, res, next) => {
  try {
    const result = await programaVueloService.getAllProgramasVuelo();
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.getProgramaVueloById = async (req, res, next) => {
  try {
    const result = await programaVueloService.getProgramaVueloById(req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.createProgramaVuelo = async (req, res, next) => {
  try {
    const result = await programaVueloService.createProgramaVuelo(req.body);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

exports.updateProgramaVuelo = async (req, res, next) => {
  try {
    const result = await programaVueloService.updateProgramaVuelo(req.params.id, req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.deleteProgramaVuelo = async (req, res, next) => {
  try {
    const result = await programaVueloService.deleteProgramaVuelo(req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};
