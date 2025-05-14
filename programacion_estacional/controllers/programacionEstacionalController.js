//aquí está la logica de cada endpoint
const programacionEstacionalService = require('../services/programacionEstacionalService');

exports.getAllProgramacionesEstacionales = async (req, res, next) => {
  try {
    const result = await programacionEstacionalService.getAllProgramacionesEstacionales();
    res.json(result);
  } catch (err) {
    next(err);
  }
};