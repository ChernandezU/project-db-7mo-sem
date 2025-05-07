//aquí está la logica de cada endpoint
const reservaService = require('../services/reservaService');

exports.getAllReservas = async (req, res, next) => {
  try {
    const result = await reservaService.getAllReservas();
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.getReservaById = async (req, res, next) => {
  try {
    const result = await reservaService.getReservaById(req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.createReserva = async (req, res, next) => {
  try {
    const result = await reservaService.createReserva(req.body);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

exports.updateReserva = async (req, res, next) => {
  try {
    const result = await reservaService.updateReserva(req.params.id, req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.deleteReserva = async (req, res, next) => {
  try {
    const result = await reservaService.deleteReserva(req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};
