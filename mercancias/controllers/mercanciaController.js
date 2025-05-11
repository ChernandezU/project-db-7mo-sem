const mercanciaService = require('../services/mercanciaService');

exports.getAllMercancias = async (req, res, next) => {
  try {
    const result = await mercanciaService.getAllMercancias();
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.getMercanciaById = async (req, res, next) => {
  try {
    const result = await mercanciaService.getMercanciaById(req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.createMercancia = async (req, res, next) => {
  try {
    const { descripcion, peso, id_reserva, tipo_envio, estado_envio } = req.body;

    if (!['comercial', 'equipaje especial'].includes(tipo_envio)) {
      return res.status(400).json({ message: "Tipo de envío inválido. Debe ser 'comercial' o 'equipaje especial'." });
    }

    if (!['Pendiente', 'En tránsito', 'Entregado', 'Cancelado'].includes(estado_envio)) {
      return res.status(400).json({ message: "Estado inválido. Debe ser 'Pendiente', 'En tránsito', 'Entregado' o 'Cancelado'." });
    }

    const result = await mercanciaService.createMercancia({
      descripcion,
      peso,
      id_reserva,
      tipo_envio,
      estado_envio
    });

    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

exports.updateMercancia = async (req, res, next) => {
  try {
    const result = await mercanciaService.updateMercancia(req.params.id, req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.deleteMercancia = async (req, res, next) => {
  try {
    const result = await mercanciaService.deleteMercancia(req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};