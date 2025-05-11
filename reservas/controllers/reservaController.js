const reservaService = require('../services/reservaService');

exports.getAllReservas = async (req, res, next) => {
  try {
    const result = await reservaService.getAllReservas();
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.getReservaById = async (req, res, next) => {
  try {
    const result = await reservaService.getReservaById(req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

// Crear reserva con validaciones adicionales
exports.createReserva = async (req, res, next) => {
  try {
    const { id_usuario, id_vuelo, asiento, modalidad_venta, id_portal, id_visa, pasaporte, estado_reserva, fecha_reserva } = req.body;

    if (!['online', 'aeropuerto'].includes(modalidad_venta)) {
      return res.status(400).json({ message: "Modalidad de venta inválida. Debe ser 'online' o 'aeropuerto'." });
    }

    if (modalidad_venta === 'aeropuerto' && !pasaporte) {
      return res.status(400).json({ message: "Debes proporcionar un número de pasaporte para ventas en aeropuerto." });
    }

    const result = await reservaService.createReserva({
      id_usuario,
      id_vuelo,
      asiento,
      modalidad_venta,
      id_portal,
      id_visa,
      pasaporte,
      estado_reserva,
      fecha_reserva
    });

    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

// Actualizar reserva incluyendo `checkin_status`
exports.updateReserva = async (req, res, next) => {
  try {
    const { asiento, checkin_status } = req.body;

    if (checkin_status && !['pendiente', 'completado'].includes(checkin_status)) {
      return res.status(400).json({ message: "Estado de check-in inválido. Debe ser 'pendiente' o 'completado'." });
    }

    const result = await reservaService.updateReserva(req.params.id, {
      asiento,
      checkin_status
    });

    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.deleteReserva = async (req, res, next) => {
  try {
    const result = await reservaService.deleteReserva(req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};