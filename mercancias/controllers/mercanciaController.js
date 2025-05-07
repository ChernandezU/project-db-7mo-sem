//aquí está la logica de cada endpoint
const mercanciaService = require('../services/mercanciaService');

exports.getAllMercancias = async (req, res, next) => {
  try {
    const result = await mercanciaService.getAllMercancias();
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.getMercanciaById = async (req, res, next) => {
  try {
    const result = await mercanciaService.getMercanciaById(req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.createMercancia = async (req, res, next) => {
  try {
    const result = await mercanciaService.createMercancia(req.body);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

exports.updateMercancia = async (req, res, next) => {
  try {
    const result = await mercanciaService.updateMercancia(req.params.id, req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.deleteMercancia = async (req, res, next) => {
  try {
    const result = await mercanciaService.deleteMercancia(req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};
