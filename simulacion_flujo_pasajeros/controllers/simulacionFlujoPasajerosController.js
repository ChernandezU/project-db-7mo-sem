//aquí está la logica de cada endpoint
//Aquí se recibe la petición del usuario y se llama a los servicios. Controlas qué se envía como respuesta.
const service = require('../services/simulacionFlujoPasajerosService');

exports.getAllSimulacionesFlujo = async (req, res, next) => {
  try {
    const result = await service.getAllSimulacionesFlujo();
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.getSimulacionFlujoById = async (req, res, next) => {
  try {
    const result = await service.getSimulacionFlujoById(req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.createSimulacionFlujo = async (req, res, next) => {
  try {
    const result = await service.createSimulacionFlujo(req.body);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

exports.updateSimulacionFlujo = async (req, res, next) => {
  try {
    const result = await service.updateSimulacionFlujo(req.params.id, req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.deleteSimulacionFlujo = async (req, res, next) => {
  try {
    const result = await service.deleteSimulacionFlujo(req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};
