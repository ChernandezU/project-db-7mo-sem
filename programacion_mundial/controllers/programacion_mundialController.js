//aquí está la logica de cada endpoint
const programacionMundialService = require('../services/programacionMundialService');

const getAllProgramacionMundial = async (req, res) => {
  const programaciones = await programacionMundialService.getAllProgramacionMundial();
  res.json(programaciones);
};

const getProgramacionMundialById = async (req, res) => {
  const programacion = await programacionMundialService.getProgramacionMundialById(req.params.id);
  res.json(programacion || { message: "Programación no encontrada" });
};

const createProgramacionMundial = async (req, res) => {
  const nuevaProgramacion = await programacionMundialService.createProgramacionMundial(req.body);
  res.json(nuevaProgramacion);
};

const updateProgramacionMundial = async (req, res) => {
  const actualizado = await programacionMundialService.updateProgramacionMundial(req.params.id, req.body);
  res.json(actualizado ? { message: "Programación actualizada" } : { message: "Error al actualizar" });
};

const deleteProgramacionMundial = async (req, res) => {
  await programacionMundialService.deleteProgramacionMundial(req.params.id);
  res.json({ message: "Programación eliminada" });
};

module.exports = { getAllProgramacionMundial, getProgramacionMundialById, createProgramacionMundial, updateProgramacionMundial, deleteProgramacionMundial };