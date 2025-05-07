//Aquí se recibe la petición del usuario y se llama a los servicios. Controlas qué se envía como respuesta.
const programacionMundialService = require('../services/programacionMundialService');

exports.getAllProgramacionesMundiales = async (req, res, next) => {
  try {
    const result = await programacionMundialService.getAllProgramacionesMundiales();
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.getProgramacionMundialById = async (req, res, next) => {
  try {
    const result = await programacionMundialService.getProgramacionMundialById(req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.createProgramacionMundial = async (req, res, next) => {
  try {
    const result = await programacionMundialService.createProgramacionMundial(req.body);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

exports.updateProgramacionMundial = async (req, res, next) => {
  try {
    const result = await programacionMundialService.updateProgramacionMundial(req.params.id, req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.deleteProgramacionMundial = async (req, res, next) => {
  try {
    const result = await programacionMundialService.deleteProgramacionMundial(req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};
