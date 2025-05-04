//aquí está la logica de cada endpoint
const mercanciasService = require('../services/mercanciasService');

const getMercancias = async (req, res, next) => {
  try {
    const mercancias = await mercanciasService.getMercancias();
    res.json(mercancias);
  } catch (err) {
    next(err);
  }
};

const getMercanciaById = async (req, res, next) => {
  try {
    const mercancia = await mercanciasService.getMercanciaById(req.params.id);
    if (!mercancia) return res.status(404).json({ error: 'Mercancía no encontrada' });
    res.json(mercancia);
  } catch (err) {
    next(err);
  }
};

const createMercancia = async (req, res, next) => {
  try {
    const data = await mercanciasService.createMercancia(req.body);
    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
};

const updateMercancia = async (req, res, next) => {
  try {
    const data = await mercanciasService.updateMercancia(req.params.id, req.body);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

const deleteMercancia = async (req, res, next) => {
  try {
    const data = await mercanciasService.deleteMercancia(req.params.id);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getMercancias,
  getMercanciaById,
  createMercancia,
  updateMercancia,
  deleteMercancia
};
