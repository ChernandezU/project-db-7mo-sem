const horariosVuelosService = require('../services/horariosVuelosService');

exports.getAllHorariosVuelos = async (req, res, next) => {
  try {
    const result = await horariosVuelosService.getAllHorariosVuelos();
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.getHorarioVueloById = async (req, res, next) => {
  try {
    console.log('📌 ID recibido en controlador:', req.params.id_horario);

    if (!req.params.id_horario) {
      return res.status(400).json({ error: 'ID_HORARIO es obligatorio.' });
    }

    const result = await horariosVuelosService.getHorarioVueloById(req.params.id_horario);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.createHorarioVuelo = async (req, res, next) => {
  try {
    const { id_vuelo, hora_salida, hora_llegada, estado } = req.body;

    if (!id_vuelo || !hora_salida || !hora_llegada || !estado) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }

    const result = await horariosVuelosService.createHorarioVuelo({ id_vuelo, hora_salida, hora_llegada, estado });
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

exports.deleteHorarioVuelo = async (req, res, next) => {
  try {
    console.log('📌 ID recibido en controlador para eliminar:', req.params.id_horario);

    if (!req.params.id_horario) {
      return res.status(400).json({ error: 'ID_HORARIO es obligatorio para eliminar.' });
    }

    const result = await horariosVuelosService.deleteHorarioVuelo(req.params.id_horario);
    res.json(result);
  } catch (err) {
    next(err);
  }
};