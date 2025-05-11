//aquí está la logica de cada endpoint
// Controlador para la tabla Portales
const visaService = require('../services/visaService');

exports.getAllVisas = async (req, res, next) => {
  try {
    const result = await visaService.getAllVisas();
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.getVisaById = async (req, res, next) => {
  try {
    const result = await visaService.getVisaById(req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.createVisa = async (req, res, next) => {
  try {
    const result = await visaService.createVisa(req.body);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

exports.updateVisa = async (req, res, next) => {
  try {
    const result = await visaService.updateVisa(req.params.id, req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.deleteVisa = async (req, res, next) => {
  try {
    const result = await visaService.deleteVisa(req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};
