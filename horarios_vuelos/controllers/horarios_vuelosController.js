//aquí está la logica de cada endpoint
const horariosVuelosService = require('../services/horariosVuelosService');

const getAllHorariosVuelos = async (req, res) => {
  const horarios = await horariosVuelosService.getAllHorariosVuelos();
  res.json(horarios);
};

const getHorariosVuelosById = async (req, res) => {
  const horario = await horariosVuelosService.getHorariosVuelosById(req.params.id);
  res.json(horario || { message: "Horario no encontrado" });
};

const createHorariosVuelos = async (req, res) => {
  const nuevoHorario = await horariosVuelosService.createHorariosVuelos(req.body);
  res.json(nuevoHorario);
};

const updateHorariosVuelos = async (req, res) => {
  const actualizado = await horariosVuelosService.updateHorariosVuelos(req.params.id, req.body);
  res.json(actualizado ? { message: "Horario actualizado" } : { message: "Error al actualizar" });
};

const deleteHorariosVuelos = async (req, res) => {
  await horariosVuelosService.deleteHorariosVuelos(req.params.id);
  res.json({ message: "Horario eliminado" });
};

module.exports = { getAllHorariosVuelos, getHorariosVuelosById, createHorariosVuelos, updateHorariosVuelos, deleteHorariosVuelos };