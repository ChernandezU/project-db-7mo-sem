//aquí está la logica de cada endpoint
const reservasService = require('../services/reservasService');

const getAllReservas = async (req, res) => {
  const reservas = await reservasService.getAllReservas();
  res.json(reservas);
};

const getReservaById = async (req, res) => {
  const reserva = await reservasService.getReservaById(req.params.id);
  res.json(reserva || { message: "Reserva no encontrada" });
};

const createReserva = async (req, res) => {
  req.body.version = 1;  // Establece la versión inicial
  const nuevaReserva = await reservasService.createReserva(req.body);
  res.json(nuevaReserva);
};

const updateReserva = async (req, res) => {
  const actualizado = await reservasService.updateReserva(req.params.id, req.body);
  res.json(actualizado ? { message: "Reserva actualizada" } : { message: "Error: posible conflicto de concurrencia" });
};

const deleteReserva = async (req, res) => {
  await reservasService.deleteReserva(req.params.id);
  res.json({ message: "Reserva eliminada" });
};

module.exports = { getAllReservas, getReservaById, createReserva, updateReserva, deleteReserva };