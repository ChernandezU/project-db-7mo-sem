//aquí está la logica de cada endpoint
//Aquí se recibe la petición del usuario y se llama a los servicios. Controlas qué se envía como respuesta.
const simulacionImpactoFinancieroService = require('../services/simulacionImpactoFinancieroService');

exports.getAllSimulacionesFinancieras = async (req, res, next) => {
  try {
    const result = await simulacionImpactoFinancieroService.getAllSimulacionesFinancieras();
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.getSimulacionFinancieraById = async (req, res, next) => {
  try {
    const result = await simulacionImpactoFinancieroService.getSimulacionFinancieraById(req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.createSimulacionFinanciera = async (req, res, next) => {
  try {
    const result = await simulacionImpactoFinancieroService.createSimulacionFinanciera(req.body);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

exports.updateSimulacionFinanciera = async (req, res, next) => {
  try {
    const result = await simulacionImpactoFinancieroService.updateSimulacionFinanciera(req.params.id, req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.deleteSimulacionFinanciera = async (req, res, next) => {
  try {
    const result = await simulacionImpactoFinancieroService.deleteSimulacionFinanciera(req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};
