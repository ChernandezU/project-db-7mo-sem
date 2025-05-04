//aquí está la logica de cada endpoint
const simulacionTraficoAereoService = require('../services/simulacionTraficoAereoService');

const getAllSimulacionTraficoAereo = async (req, res) => {
  const simulaciones = await simulacionTraficoAereoService.getAllSimulacionTraficoAereo();
  res.json(simulaciones);
};

const getSimulacionTraficoAereoById = async (req, res) => {
  const simulacion = await simulacionTraficoAereoService.getSimulacionTraficoAereoById(req.params.id);
  res.json(simulacion || { message: "Simulación no encontrada" });
};

const createSimulacionTraficoAereo = async (req, res) => {
  const nuevaSimulacion = await simulacionTraficoAereoService.createSimulacionTraficoAereo(req.body);
  res.json(nuevaSimulacion);
};

const updateSimulacionTraficoAereo = async (req, res) => {
  const actualizado = await simulacionTraficoAereoService.updateSimulacionTraficoAereo(req.params.id, req.body);
  res.json(actualizado ? { message: "Simulación actualizada" } : { message: "Error al actualizar" });
};

const deleteSimulacionTraficoAereo = async (req, res) => {
  await simulacionTraficoAereoService.deleteSimulacionTraficoAereo(req.params.id);
  res.json({ message: "Simulación eliminada" });
};

module.exports = { getAllSimulacionTraficoAereo, getSimulacionTraficoAereoById, createSimulacionTraficoAereo, updateSimulacionTraficoAereo, deleteSimulacionTraficoAereo };