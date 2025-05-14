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
    console.log('📌 ID recibido en controlador:', req.params.id_pago);

    if (!req.params.id_pago) {
      return res.status(400).json({ error: 'ID_PAGO es obligatorio.' });
    }

    const result = await pagoService.getPagoById(req.params.id_pago);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.createPago = async (req, res, next) => {
  try {
    const { id_factura, metodo_pago, monto_pagado, monto_equipaje, detalle_pago } = req.body;

    if (!id_factura || !metodo_pago || !monto_pagado || !detalle_pago) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }

    const result = await pagoService.createPago({ id_factura, metodo_pago, monto_pagado, monto_equipaje, detalle_pago });
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

exports.deletePago = async (req, res, next) => {
  try {
    console.log('📌 ID recibido en controlador para eliminar:', req.params.id_pago);

    if (!req.params.id_pago) {
      return res.status(400).json({ error: 'ID_PAGO es obligatorio para eliminar.' });
    }

    const result = await pagoService.deletePago(req.params.id_pago);
    res.json(result);
  } catch (err) {
    next(err);
  }
};