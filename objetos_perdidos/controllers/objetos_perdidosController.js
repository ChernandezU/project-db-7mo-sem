//aquí está la logica de cada endpoint
const objetosService = require('../services/objetosPerdidosService');

const getObjetos = async (req, res, next) => {
  try {
    const objetos = await objetosService.getObjetos();
    res.json(objetos);
  } catch (err) {
    next(err);
  }
};

const getObjetoById = async (req, res, next) => {
  try {
    const objeto = await objetosService.getObjetoById(req.params.id);
    if (!objeto) return res.status(404).json({ error: 'Objeto no encontrado' });
    res.json(objeto);
  } catch (err) {
    next(err);
  }
};

const createObjeto = async (req, res, next) => {
  try {
    const data = await objetosService.createObjeto(req.body);
    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
};

const updateObjeto = async (req, res, next) => {
  try {
    const data = await objetosService.updateObjeto(req.params.id, req.body);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

const deleteObjeto = async (req, res, next) => {
  try {
    const data = await objetosService.deleteObjeto(req.params.id);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getObjetos,
  getObjetoById,
  createObjeto,
  updateObjeto,
  deleteObjeto
};
