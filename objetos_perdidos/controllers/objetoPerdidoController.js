//aquí está la logica de cada endpoint
const objetoPerdidoService = require('../services/objetoPerdidoService');

exports.getAllObjetos = async (req, res, next) => {
  try {
    const result = await objetoPerdidoService.getAllObjetos();
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.getObjetoById = async (req, res, next) => {
  try {
    const result = await objetoPerdidoService.getObjetoById(req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.createObjeto = async (req, res, next) => {
  try {
    const result = await objetoPerdidoService.createObjeto(req.body);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

exports.updateObjeto = async (req, res, next) => {
  try {
    const result = await objetoPerdidoService.updateObjeto(req.params.id, req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.deleteObjeto = async (req, res, next) => {
  try {
    const result = await objetoPerdidoService.deleteObjeto(req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};
