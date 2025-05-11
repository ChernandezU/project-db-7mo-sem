//aquí está la logica de cada endpoint
// Controlador para la tabla Portales
const checkInService = require('../services/checkinService');

exports.getAllCheckIns = async (req, res, next) => {
  try {
    const result = await checkInService.getAllCheckIns();
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.getCheckInById = async (req, res, next) => {
  try {
    const result = await checkInService.getCheckInById(req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.createCheckIn = async (req, res, next) => {
  try {
    const result = await checkInService.createCheckIn(req.body);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

exports.updateCheckIn = async (req, res, next) => {
  try {
    const result = await checkInService.updateCheckIn(req.params.id, req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.deleteCheckIn = async (req, res, next) => {
  try {
    const result = await checkInService.deleteCheckIn(req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};