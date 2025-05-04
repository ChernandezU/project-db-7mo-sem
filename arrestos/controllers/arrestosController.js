//aquí está la logica de cada endpoint
const arrestosService = require('../services/arrestosService');

const getAllArrestos = async (req, res) => {
  const arrestos = await arrestosService.getAllArrestos();
  res.json(arrestos);
};

const getArrestoById = async (req, res) => {
  const arresto = await arrestosService.getArrestoById(req.params.id);
  res.json(arresto || { message: "Arresto no encontrado" });
};

const createArresto = async (req, res) => {
  const nuevoArresto = await arrestosService.createArresto(req.body);
  res.json(nuevoArresto);
};

const updateArresto = async (req, res) => {
  const actualizado = await arrestosService.updateArresto(req.params.id, req.body);
  res.json(actualizado ? { message: "Arresto actualizado" } : { message: "Error al actualizar" });
};

const deleteArresto = async (req, res) => {
  await arrestosService.deleteArresto(req.params.id);
  res.json({ message: "Arresto eliminado" });
};

module.exports = { getAllArrestos, getArrestoById, createArresto, updateArresto, deleteArresto };