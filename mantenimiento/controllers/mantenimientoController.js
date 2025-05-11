const mantenimientoService = require('../services/mantenimientoService');

exports.getAllMantenimientos = async (req, res, next) => {
  try {
    const result = await mantenimientoService.getAllMantenimientos();
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.getMantenimientoById = async (req, res, next) => {
  try {
    const result = await mantenimientoService.getMantenimientoById(req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.createMantenimiento = async (req, res, next) => {
  try {
    const { id_avion, fecha_inicio, fecha_fin, descripcion, tipo_mantenimiento, tipo_revision, estado } = req.body;

    if (!['Pendiente', 'En proceso', 'Finalizado'].includes(estado)) {
      return res.status(400).json({ message: "Estado inválido. Debe ser 'Pendiente', 'En proceso' o 'Finalizado'." });
    }

    if (!['preventivo', 'correctivo'].includes(tipo_revision)) {
      return res.status(400).json({ message: "Tipo de revisión inválido. Debe ser 'preventivo' o 'correctivo'." });
    }

    const result = await mantenimientoService.createMantenimiento({
      id_avion,
      fecha_inicio,
      fecha_fin,
      descripcion,
      tipo_mantenimiento,
      tipo_revision,
      estado
    });

    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

exports.updateMantenimiento = async (req, res, next) => {
  try {
    const result = await mantenimientoService.updateMantenimiento(req.params.id, req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.deleteMantenimiento = async (req, res, next) => {
  try {
    const result = await mantenimientoService.deleteMantenimiento(req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};