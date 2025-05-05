//aquí está la logica de cada endpoint
const equipajesService = require('../services/equipajesService');

const getAllEquipajes = async (req, res) => {
  const equipajes = await equipajesService.getAllEquipajes();
  res.json(equipajes);
};

const getEquipajeById = async (req, res) => {
  const equipaje = await equipajesService.getEquipajeById(req.params.id);
  res.json(equipaje || { message: "Equipaje no encontrado" });
};

const createEquipaje = async (req, res) => {
  const nuevoEquipaje = await equipajesService.createEquipaje(req.body);
  res.json(nuevoEquipaje);
};

const updateEquipaje = async (req, res) => {
  const actualizado = await equipajesService.updateEquipaje(req.params.id, req.body);
  res.json(actualizado ? { message: "Equipaje actualizado" } : { message: "Error al actualizar" });
};

const deleteEquipaje = async (req, res) => {
  await equipajesService.deleteEquipaje(req.params.id);
  res.json({ message: "Equipaje eliminado" });
};

module.exports = { getAllEquipajes, getEquipajeById, createEquipaje, updateEquipaje, deleteEquipaje };