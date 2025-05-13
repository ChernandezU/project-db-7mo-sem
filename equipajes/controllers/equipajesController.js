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
    const { id_reserva, peso, dimensiones, estado } = req.body;

    console.log('Datos recibidos en el controlador:', { id_reserva, peso, dimensiones, estado });

    const result = await equipajesService.createEquipaje({ id_reserva, peso, dimensiones, estado });

    if (result.success) {
      return res.status(201).json(result);
    } else {
      return res.status(500).json(result);
    }
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