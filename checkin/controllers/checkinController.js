const checkInService = require('../services/checkinService');

exports.getAllCheckIns = async (req, res, next) => {
  try {
    const result = await checkInService.getAllCheckIns();
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.createCheckIn = async (req, res, next) => {
  try {
    const { id_reserva, pasaporte, fecha_checkin, terminal } = req.body;

    if (!id_reserva || !pasaporte || !fecha_checkin || !terminal) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }

    const result = await checkInService.createCheckIn({ id_reserva, pasaporte, fecha_checkin, terminal });
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

exports.deleteCheckIn = async (req, res, next) => {
  try {
    console.log('📌 ID recibido en controlador para eliminar:', req.params.id_checkin);

    if (!req.params.id_checkin) {
      return res.status(400).json({ error: 'ID_CHECKIN es obligatorio para eliminar.' });
    }

    const result = await checkInService.deleteCheckIn(req.params.id_checkin);
    res.json(result);
  } catch (err) {
    next(err);
  }
};