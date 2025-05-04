//aquí está la logica de cada endpoint
const operacionesService = require('../services/operacionesTerrestresService');

const getOperaciones = async (req, res, next) => {
  try {
    const operaciones = await operacionesService.getOperaciones();
    res.json(operaciones);
  } catch (err) {
    next(err);
  }
};

const getOperacionById = async (req, res, next) => {
  try {
    const operacion = await operacionesService.getOperacionById(req.params.id);
    if (!operacion) return res.status(404).json({ error: 'Operación terrestre no encontrada' });
    res.json(operacion);
  } catch (err) {
    next(err);
  }
};

const createOperacion = async (req, res, next) => {
  try {
    const data = await operacionesService.createOperacion(req.body);
    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
};

const updateOperacion = async (req, res, next) => {
  try {
    const data = await operacionesService.updateOperacion(req.params.id, req.body);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

const deleteOperacion = async (req, res, next) => {
  try {
    const data = await operacionesService.deleteOperacion(req.params.id);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getOperaciones,
  getOperacionById,
  createOperacion,
  updateOperacion,
  deleteOperacion
};
