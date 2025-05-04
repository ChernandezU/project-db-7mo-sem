//aquí está la logica de cada endpoint
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
