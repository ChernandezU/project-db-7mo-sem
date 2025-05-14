const visaService = require('../services/visaService');

exports.getAllVisas = async (req, res, next) => {
  try {
    const result = await visaService.getAllVisas();
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.getVisaById = async (req, res, next) => {
  try {
    console.log('📌 ID recibido en controlador:', req.params.id_visa);

    if (!req.params.id_visa) {
      return res.status(400).json({ error: 'ID_VISA es obligatorio.' });
    }

    const result = await visaService.getVisaById(req.params.id_visa);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.createVisa = async (req, res, next) => {
  try {
    const { id_usuario, numero_visa, tipo_visa, fecha_emision, fecha_vencimiento, estado } = req.body;

    if (!id_usuario || !numero_visa || !tipo_visa || !fecha_emision || !fecha_vencimiento || !estado) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }

    const result = await visaService.createVisa({ id_usuario, numero_visa, tipo_visa, fecha_emision, fecha_vencimiento, estado });
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

exports.updateVisa = async (req, res, next) => {
  try {
    const result = await visaService.updateVisa(req.params.id_visa, req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
};
