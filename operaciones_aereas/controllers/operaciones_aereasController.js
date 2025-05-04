//aquí está la logica de cada endpoint
const operacionesAereasService = require('../services/operacionesAereasService');

const getAllOperacionesAereas = async (req, res) => {
  const operaciones = await operacionesAereasService.getAllOperacionesAereas();
  res.json(operaciones);
};

const getOperacionAereaById = async (req, res) => {
  const operacion = await operacionesAereasService.getOperacionAereaById(req.params.id);
  res.json(operacion || { message: "Operación no encontrada" });
};

const createOperacionAerea = async (req, res) => {
  const nuevaOperacion = await operacionesAereasService.createOperacionAerea(req.body);
  res.json(nuevaOperacion);
};

const updateOperacionAerea = async (req, res) => {
  const actualizado = await operacionesAereasService.updateOperacionAerea(req.params.id, req.body);
  res.json(actualizado ? { message: "Operación actualizada" } : { message: "Error al actualizar" });
};

const deleteOperacionAerea = async (req, res) => {
  await operacionesAereasService.deleteOperacionAerea(req.params.id);
  res.json({ message: "Operación eliminada" });
};

module.exports = { getAllOperacionesAereas, getOperacionAereaById, createOperacionAerea, updateOperacionAerea, deleteOperacionAerea };