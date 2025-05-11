//aquí está la logica de cada endpoint
// Controlador para la tabla Portales
const portalService = require('../services/portalService');

exports.getAllPortales = async (req, res, next) => {
  try {
    const result = await portalService.getAllPortales();
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.getPortalById = async (req, res, next) => {
  try {
    const result = await portalService.getPortalById(req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.createPortal = async (req, res, next) => {
  try {
    const result = await portalService.createPortal(req.body);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

exports.updatePortal = async (req, res, next) => {
  try {
    const result = await portalService.updatePortal(req.params.id, req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.deletePortal = async (req, res, next) => {
  try {
    const result = await portalService.deletePortal(req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};
