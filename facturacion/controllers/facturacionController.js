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
    console.log('📌 ID recibido en controlador:', req.params.id_factura); // 🔎 Depuración

    if (!req.params.id_factura) {
      return res.status(400).json({ error: 'ID_FACTURA es obligatorio.' });
    }

    const result = await facturacionService.getFacturaById(req.params.id_factura);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.createFactura = async (req, res, next) => {
  try {
    const { id_reserva, monto } = req.body;

    if (!id_reserva || !monto) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }

    const result = await facturacionService.createFactura({ id_reserva, monto });
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

exports.deleteFactura = async (req, res, next) => {
  try {
    const result = await facturacionService.deleteFactura(req.params.id_factura);
    res.json(result);
  } catch (err) {
    next(err);
  }
};