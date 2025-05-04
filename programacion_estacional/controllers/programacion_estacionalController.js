//aquí está la logica de cada endpoint
const programacionEstacionalService = require('../services/programacionEstacionalService');

const getAllProgramacionEstacional = async (req, res) => {
  const programaciones = await programacionEstacionalService.getAllProgramacionEstacional();
  res.json(programaciones);
};

const getProgramacionEstacionalById = async (req, res) => {
  const programacion = await programacionEstacionalService.getProgramacionEstacionalById(req.params.id);
  res.json(programacion || { message: "Programación no encontrada" });
};

const createProgramacionEstacional = async (req, res) => {
  const nuevaProgramacion = await programacionEstacionalService.createProgramacionEstacional(req.body);
  res.json(nuevaProgramacion);
};

const updateProgramacionEstacional = async (req, res) => {
  const actualizado = await programacionEstacionalService.updateProgramacionEstacional(req.params.id, req.body);
  res.json(actualizado ? { message: "Programación actualizada" } : { message: "Error al actualizar" });
};

const deleteProgramacionEstacional = async (req, res) => {
  await programacionEstacionalService.deleteProgramacionEstacional(req.params.id);
  res.json({ message: "Programación eliminada" });
};

module.exports = { getAllProgramacionEstacional, getProgramacionEstacionalById, createProgramacionEstacional, updateProgramacionEstacional, deleteProgramacionEstacional };