const facturacionService = require('../services/facturacionService');

exports.getAllFacturas = async (req, res, next) => {
  try {
    const result = await facturacionService.getAllFacturas();
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.getFacturaById = async (req, res, next) => {
  try {
    const result = await facturacionService.getFacturaById(req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.createFactura = async (req, res, next) => {
  try {
    const { id_reserva, monto } = req.body;

    const result = await facturacionService.createFactura({
      id_reserva,
      monto
    });

    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

exports.updateFactura = async (req, res, next) => {
  try {
    const { monto } = req.body;

    const result = await facturacionService.updateFactura(req.params.id, {
      monto
    });

    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.deleteFactura = async (req, res, next) => {
  try {
    const result = await facturacionService.deleteFactura(req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};