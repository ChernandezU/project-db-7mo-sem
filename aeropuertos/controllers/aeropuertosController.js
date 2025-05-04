//aquí está la logica de cada endpoint
<<<<<<< HEAD
const service = require('../services/aeropuertosService');

const getAeropuertos = async (req, res, next) => {
  try {
    const data = await service.getAeropuertos();
    res.json(data);
  } catch (err) {
    next(err);
  }
};

const getAeropuertoById = async (req, res, next) => {
  try {
    const data = await service.getAeropuertoById(req.params.id);
    if (!data) return res.status(404).json({ error: 'No encontrado' });
    res.json(data);
  } catch (err) {
    next(err);
  }
};

const createAeropuerto = async (req, res, next) => {
  try {
    const data = await service.createAeropuerto(req.body);
    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
};

const updateAeropuerto = async (req, res, next) => {
  try {
    const data = await service.updateAeropuerto(req.params.id, req.body);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

const deleteAeropuerto = async (req, res, next) => {
  try {
    const data = await service.deleteAeropuerto(req.params.id);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAeropuertos,
  getAeropuertoById,
  createAeropuerto,
  updateAeropuerto,
  deleteAeropuerto
};
=======
const aeropuertoService = require('../services/aeropuertosService');

const getAllAeropuertos = async (req, res) => {
  const aeropuertos = await aeropuertoService.getAllAeropuertos();
  res.json(aeropuertos);
};

const getAeropuertoById = async (req, res) => {
  const aeropuerto = await aeropuertoService.getAeropuertoById(req.params.id);
  res.json(aeropuerto || { message: "Aeropuerto no encontrado" });
};

const createAeropuerto = async (req, res) => {
  const nuevoAeropuerto = await aeropuertoService.createAeropuerto(req.body);
  res.json(nuevoAeropuerto);
};

const updateAeropuerto = async (req, res) => {
  const actualizado = await aeropuertoService.updateAeropuerto(req.params.id, req.body);
  res.json(actualizado ? { message: "Aeropuerto actualizado" } : { message: "Error al actualizar" });
};

const deleteAeropuerto = async (req, res) => {
  await aeropuertoService.deleteAeropuerto(req.params.id);
  res.json({ message: "Aeropuerto eliminado" });
};

module.exports = { getAllAeropuertos, getAeropuertoById, createAeropuerto, updateAeropuerto, deleteAeropuerto };
>>>>>>> 96a565c3f0b8b728cace02e6a4c5a21424055f39
