//aquí está la logica de cada endpoint
//Aquí se recibe la petición del usuario y se llama a los servicios. Controlas qué se envía como respuesta.
const operacionAereaService = require('../services/operacionAereaService');

exports.getAllOperaciones = async (req, res, next) => {
  try {
    const result = await operacionAereaService.getAllOperaciones();
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.getOperacionById = async (req, res, next) => {
  try {
    const result = await operacionAereaService.getOperacionById(req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.createOperacion = async (req, res, next) => {
  try {
    const result = await operacionAereaService.createOperacion(req.body);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

exports.updateOperacion = async (req, res, next) => {
  try {
    const result = await operacionAereaService.updateOperacion(req.params.id, req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.deleteOperacion = async (req, res, next) => {
  try {
    const result = await operacionAereaService.deleteOperacion(req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};
