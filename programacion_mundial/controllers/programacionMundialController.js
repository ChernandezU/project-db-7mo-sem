//Aquí se recibe la petición del usuario y se llama a los servicios. Controlas qué se envía como respuesta.
const programacionMundialService = require('../services/programacionMundialService');

exports.getAllProgramacionesMundiales = async (req, res, next) => {
  try {
    const result = await programacionMundialService.getAllProgramacionesMundiales();
    res.json(result);
  } catch (err) {
    next(err);
  }
};
