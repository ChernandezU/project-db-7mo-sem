//aquí está la logica de cada endpoint
const programacionEstacionalService = require('../services/programacionEstacionalService');

exports.getAllProgramacionesEstacionales = async (req, res, next) => {
  try {
    const result = await programacionEstacionalService.getAllProgramacionesEstacionales();
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.getProgramacionEstacionalById = async (req, res, next) => {
  try {
    const result = await programacionEstacionalService.getProgramacionEstacionalById(req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.createProgramacionEstacional = async (req, res, next) => {
  try {
    const result = await programacionEstacionalService.createProgramacionEstacional(req.body);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

exports.updateProgramacionEstacional = async (req, res, next) => {
  try {
    const result = await programacionEstacionalService.updateProgramacionEstacional(req.params.id, req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.deleteProgramacionEstacional = async (req, res, next) => {
  try {
    const result = await programacionEstacionalService.deleteProgramacionEstacional(req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};
