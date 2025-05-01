//aquí está la logica de cada endpoint
const service = require('../services/programasVueloService');

const getProgramas = async (req, res, next) => {
  try {
    const data = await service.getProgramas();
    res.json(data);
  } catch (err) {
    next(err);
  }
};

const getProgramaById = async (req, res, next) => {
  try {
    const data = await service.getProgramaById(req.params.id);
    if (!data) return res.status(404).json({ error: 'No encontrado' });
    res.json(data);
  } catch (err) {
    next(err);
  }
};

const createPrograma = async (req, res, next) => {
  try {
    const data = await service.createPrograma(req.body);
    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
};

const updatePrograma = async (req, res, next) => {
  try {
    const data = await service.updatePrograma(req.params.id, req.body);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

const deletePrograma = async (req, res, next) => {
  try {
    const data = await service.deletePrograma(req.params.id);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getProgramas,
  getProgramaById,
  createPrograma,
  updatePrograma,
  deletePrograma
};
