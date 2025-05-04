//aquí está la logica de cada endpoint
const avionesService = require('../services/avionesService');

const getAllAviones = async (req, res) => {
  const aviones = await avionesService.getAllAviones();
  res.json(aviones);
};

const getAvionById = async (req, res) => {
  const avion = await avionesService.getAvionById(req.params.id);
  res.json(avion || { message: "Avión no encontrado" });
};

const createAvion = async (req, res) => {
  const nuevoAvion = await avionesService.createAvion(req.body);
  res.json(nuevoAvion);
};

const updateAvion = async (req, res) => {
  const actualizado = await avionesService.updateAvion(req.params.id, req.body);
  res.json(actualizado ? { message: "Avión actualizado" } : { message: "Error al actualizar" });
};

const deleteAvion = async (req, res) => {
  await avionesService.deleteAvion(req.params.id);
  res.json({ message: "Avión eliminado" });
};

module.exports = { getAllAviones, getAvionById, createAvion, updateAvion, deleteAvion };