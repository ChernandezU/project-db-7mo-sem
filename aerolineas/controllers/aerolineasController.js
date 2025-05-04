//aquí está la logica de cada endpoint
const aerolineaService = require('../services/aerolineasService');

const getAllAerolineas = async (req, res) => {
  const aerolineas = await aerolineaService.getAllAerolineas();
  res.json(aerolineas);
};

const getAerolineaById = async (req, res) => {
  const aerolinea = await aerolineaService.getAerolineaById(req.params.id);
  res.json(aerolinea || { message: "Aerolinea no encontrada" });
};

const createAerolinea = async (req, res) => {
  const nuevaAerolinea = await aerolineaService.createAerolinea(req.body);
  res.json(nuevaAerolinea);
};

const updateAerolinea = async (req, res) => {
  const actualizado = await aerolineaService.updateAerolinea(req.params.id, req.body);
  res.json(actualizado ? { message: "Aerolinea actualizada" } : { message: "Error al actualizar" });
};

const deleteAerolinea = async (req, res) => {
  await aerolineaService.deleteAerolinea(req.params.id);
  res.json({ message: "Aerolinea eliminada" });
};

module.exports = { getAllAerolineas, getAerolineaById, createAerolinea, updateAerolinea, deleteAerolinea };