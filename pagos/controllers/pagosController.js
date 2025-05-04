//aquí está la logica de cada endpoint
const pagosService = require('../services/pagosService');

const getPagos = async (req, res, next) => {
  try {
    const pagos = await pagosService.getPagos();
    res.json(pagos);
  } catch (err) {
    next(err);
  }
};

const getPagoById = async (req, res, next) => {
  try {
    const pago = await pagosService.getPagoById(req.params.id);
    if (!pago) return res.status(404).json({ error: 'Pago no encontrado' });
    res.json(pago);
  } catch (err) {
    next(err);
  }
};

const createPago = async (req, res, next) => {
  try {
    const data = await pagosService.createPago(req.body);
    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
};

const updatePago = async (req, res, next) => {
  try {
    const data = await pagosService.updatePago(req.params.id, req.body);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

const deletePago = async (req, res, next) => {
  try {
    const data = await pagosService.deletePago(req.params.id);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getPagos,
  getPagoById,
  createPago,
  updatePago,
  deletePago
};
