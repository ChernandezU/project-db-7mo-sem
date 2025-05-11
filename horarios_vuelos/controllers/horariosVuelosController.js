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
    const result = await horariosVuelosService.getHorarioVueloById(req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.createHorarioVuelo = async (req, res, next) => {
  try {
    const { id_vuelo, hora_salida, hora_llegada, zona_horaria, estado } = req.body;

    if (!['Programado', 'Confirmado', 'Cancelado', 'Demorado'].includes(estado)) {
      return res.status(400).json({ message: "Estado inválido. Debe ser 'Programado', 'Confirmado', 'Cancelado' o 'Demorado'." });
    }

    const result = await horariosVuelosService.createHorarioVuelo({
      id_vuelo,
      hora_salida,
      hora_llegada,
      zona_horaria,
      estado
    });

    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

exports.updateHorarioVuelo = async (req, res, next) => {
  try {
    const result = await horariosVuelosService.updateHorarioVuelo(req.params.id, req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.deleteHorarioVuelo = async (req, res, next) => {
  try {
    const result = await horariosVuelosService.deleteHorarioVuelo(req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};