//aquí está la logica de cada endpoint
const simulacionFlujoPasajerosService = require('../services/simulacionFlujoPasajerosService');

const getAllSimulacionFlujoPasajeros = async (req, res) => {
  const simulaciones = await simulacionFlujoPasajerosService.getAllSimulacionFlujoPasajeros();
  res.json(simulaciones);
};

const getSimulacionFlujoPasajerosById = async (req, res) => {
  const simulacion = await simulacionFlujoPasajerosService.getSimulacionFlujoPasajerosById(req.params.id);
  res.json(simulacion || { message: "Simulación no encontrada" });
};

const createSimulacionFlujoPasajeros = async (req, res) => {
  const nuevaSimulacion = await simulacionFlujoPasajerosService.createSimulacionFlujoPasajeros(req.body);
  res.json(nuevaSimulacion);
};

const updateSimulacionFlujoPasajeros = async (req, res) => {
  const actualizado = await simulacionFlujoPasajerosService.updateSimulacionFlujoPasajeros(req.params.id, req.body);
  res.json(actualizado ? { message: "Simulación actualizada" } : { message: "Error al actualizar" });
};

const deleteSimulacionFlujoPasajeros = async (req, res) => {
  await simulacionFlujoPasajerosService.deleteSimulacionFlujoPasajeros(req.params.id);
  res.json({ message: "Simulación eliminada" });
};

module.exports = { getAllSimulacionFlujoPasajeros, getSimulacionFlujoPasajerosById, createSimulacionFlujoPasajeros, updateSimulacionFlujoPasajeros, deleteSimulacionFlujoPasajeros };