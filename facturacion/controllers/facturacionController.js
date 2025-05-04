//aquí está la logica de cada endpoint
const facturacionService = require('../services/facturacionService');

const getFacturas = async (req, res, next) => {
  try {
    const facturas = await facturacionService.getFacturas();
    res.json(facturas);
  } catch (err) {
    next(err);
  }
};

const getFacturaById = async (req, res, next) => {
  try {
    const factura = await facturacionService.getFacturaById(req.params.id);
    if (!factura) return res.status(404).json({ error: 'Factura no encontrada' });
    res.json(factura);
  } catch (err) {
    next(err);
  }
};

const createFactura = async (req, res, next) => {
  try {
    const data = await facturacionService.createFactura(req.body);
    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
};

const updateFactura = async (req, res, next) => {
  try {
    const data = await facturacionService.updateFactura(req.params.id, req.body);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

const deleteFactura = async (req, res, next) => {
  try {
    const data = await facturacionService.deleteFactura(req.params.id);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getFacturas,
  getFacturaById,
  createFactura,
  updateFactura,
  deleteFactura
};
