//aquí está la logica de cada endpoint
//Aquí se recibe la petición del usuario y se llama a los servicios. Controlas qué se envía como respuesta.
const simulacionTraficoAereoService = require('../services/simulacionTraficoAereoService');

exports.getAllSimulacionesTrafico = async (req, res, next) => {
  try {
    const result = await simulacionTraficoAereoService.getAllSimulacionesTrafico();
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.getSimulacionTraficoById = async (req, res, next) => {
  try {
    const result = await simulacionTraficoAereoService.getSimulacionTraficoById(req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.createSimulacionTrafico = async (req, res, next) => {
  try {
    const result = await simulacionTraficoAereoService.createSimulacionTrafico(req.body);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

exports.updateSimulacionTrafico = async (req, res, next) => {
  try {
    const result = await simulacionTraficoAereoService.updateSimulacionTrafico(req.params.id, req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.deleteSimulacionTrafico = async (req, res, next) => {
  try {
    const result = await simulacionTraficoAereoService.deleteSimulacionTrafico(req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};
