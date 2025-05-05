//aquí está la logica de cada endpoint
<<<<<<< HEAD
=======
const mantenimientoService = require('../services/mantenimientoService');

const getAllMantenimientos = async (req, res) => {
  const mantenimientos = await mantenimientoService.getAllMantenimientos();
  res.json(mantenimientos);
};

const getMantenimientoById = async (req, res) => {
  const mantenimiento = await mantenimientoService.getMantenimientoById(req.params.id);
  res.json(mantenimiento || { message: "Mantenimiento no encontrado" });
};

const createMantenimiento = async (req, res) => {
  const nuevoMantenimiento = await mantenimientoService.createMantenimiento(req.body);
  res.json(nuevoMantenimiento);
};

const updateMantenimiento = async (req, res) => {
  const actualizado = await mantenimientoService.updateMantenimiento(req.params.id, req.body);
  res.json(actualizado ? { message: "Mantenimiento actualizado" } : { message: "Error al actualizar" });
};

const deleteMantenimiento = async (req, res) => {
  await mantenimientoService.deleteMantenimiento(req.params.id);
  res.json({ message: "Mantenimiento eliminado" });
};

module.exports = { getAllMantenimientos, getMantenimientoById, createMantenimiento, updateMantenimiento, deleteMantenimiento };
>>>>>>> origin/desarrollo/sheyla
