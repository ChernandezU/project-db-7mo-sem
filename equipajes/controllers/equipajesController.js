//aquí está la logica de cada endpoint
const equipajesService = require('../services/equipajesService');

exports.getAllEquipajes = async (req, res, next) => {
  try {
    const result = await equipajesService.getAllEquipajes();
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.getEquipajeById = async (req, res, next) => {
  try {
    const result = await equipajesService.getEquipajeById(req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.createEquipaje = async (req, res, next) => {
  try {
    const result = await equipajesService.createEquipaje(req.body);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

exports.updateEquipaje = async (req, res, next) => {
  try {
    const result = await equipajesService.updateEquipaje(req.params.id, req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.deleteEquipaje = async (req, res, next) => {
  try {
    const result = await equipajesService.deleteEquipaje(req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};
