//aquí está la logica de cada endpoint
// Controlador para la tabla Portales
const licenciaService = require('../services/licenciaService');

exports.getAllLicencias = async (req, res, next) => {
  try {
    const result = await licenciaService.getAllLicencias();
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.getLicenciaById = async (req, res, next) => {
  try {
    const result = await licenciaService.getLicenciaById(req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.createLicencia = async (req, res, next) => {
  try {
    const result = await licenciaService.createLicencia(req.body);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

exports.updateLicencia = async (req, res, next) => {
  try {
    const result = await licenciaService.updateLicencia(req.params.id, req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.deleteLicencia = async (req, res, next) => {
  try {
    const result = await licenciaService.deleteLicencia(req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};
