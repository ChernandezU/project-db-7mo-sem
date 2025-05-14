const mantenimientoService = require('../services/mantenimientoService');

exports.getAvionesEnMantenimiento = async (req, res, next) => {
  try {
    const result = await mantenimientoService.getAvionesEnMantenimiento();
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.getMantenimientoByAvionId = async (req, res, next) => {
  try {
    const result = await mantenimientoService.getMantenimientoByAvionId(req.params.id_avion);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.deleteMantenimientoByAvionId = async (req, res, next) => {
  try {
    const result = await mantenimientoService.deleteMantenimientoByAvionId(req.params.id_avion);
    res.json(result);
  } catch (err) {
    next(err);
  }
};