const pagoService = require('../services/pagoService');

exports.getAllPagos = async (req, res, next) => {
  try {
    const result = await pagoService.getAllPagos();
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.getPagoById = async (req, res, next) => {
  try {
    const result = await pagoService.getPagoById(req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.createPago = async (req, res, next) => {
  try {
    const { id_factura, metodo_pago, monto_pagado, monto_equipaje, detalle_pago } = req.body;

    const result = await pagoService.createPago({
      id_factura,
      metodo_pago,
      monto_pagado,
      monto_equipaje,
      detalle_pago
    });

    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

exports.updatePago = async (req, res, next) => {
  try {
    const { metodo_pago, monto_pagado, monto_equipaje, detalle_pago } = req.body;

    const result = await pagoService.updatePago(req.params.id, {
      metodo_pago,
      monto_pagado,
      monto_equipaje,
      detalle_pago
    });

    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.deletePago = async (req, res, next) => {
  try {
    const result = await pagoService.deletePago(req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};