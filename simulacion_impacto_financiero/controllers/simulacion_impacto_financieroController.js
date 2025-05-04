//aquí está la logica de cada endpoint
const simulacionImpactoFinancieroService = require('../services/simulacionImpactoFinancieroService');

const getAllSimulacionImpactoFinanciero = async (req, res) => {
  const simulaciones = await simulacionImpactoFinancieroService.getAllSimulacionImpactoFinanciero();
  res.json(simulaciones);
};

const getSimulacionImpactoFinancieroById = async (req, res) => {
  const simulacion = await simulacionImpactoFinancieroService.getSimulacionImpactoFinancieroById(req.params.id);
  res.json(simulacion || { message: "Simulación no encontrada" });
};

const createSimulacionImpactoFinanciero = async (req, res) => {
  const nuevaSimulacion = await simulacionImpactoFinancieroService.createSimulacionImpactoFinanciero(req.body);
  res.json(nuevaSimulacion);
};

const updateSimulacionImpactoFinanciero = async (req, res) => {
  const actualizado = await simulacionImpactoFinancieroService.updateSimulacionImpactoFinanciero(req.params.id, req.body);
  res.json(actualizado ? { message: "Simulación actualizada" } : { message: "Error al actualizar" });
};

const deleteSimulacionImpactoFinanciero = async (req, res) => {
  await simulacionImpactoFinancieroService.deleteSimulacionImpactoFinanciero(req.params.id);
  res.json({ message: "Simulación eliminada" });
};

module.exports = { getAllSimulacionImpactoFinanciero, getSimulacionImpactoFinancieroById, createSimulacionImpactoFinanciero, updateSimulacionImpactoFinanciero, deleteSimulacionImpactoFinanciero };