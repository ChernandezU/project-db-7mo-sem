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
    const { id_reserva, tipo_equipaje, peso, dimensiones, descripcion, id_vuelo } = req.body;

    const result = await equipajesService.createEquipaje({
      id_reserva,
      tipo_equipaje,
      peso,
      dimensiones,
      descripcion,
      id_vuelo
    });

    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

exports.updateEquipaje = async (req, res, next) => {
  try {
    const { tipo_equipaje, peso } = req.body;

    const result = await equipajesService.updateEquipaje(req.params.id, {
      tipo_equipaje,
      peso
    });

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