//aquí está la logica de cada endpoint
const personalService = require('../services/personalService');

exports.getAllPersonal = async (req, res, next) => {
  try {
    const result = await personalService.getAllPersonal();
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.getPersonalById = async (req, res, next) => {
  try {
    const result = await personalService.getPersonalById(req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.createPersonal = async (req, res, next) => {
  try {
    const result = await personalService.createPersonal(req.body);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

exports.updatePersonal = async (req, res, next) => {
  try {
    const result = await personalService.updatePersonal(req.params.id, req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.deletePersonal = async (req, res, next) => {
  try {
    const result = await personalService.deletePersonal(req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};
