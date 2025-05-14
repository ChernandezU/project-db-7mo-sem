//aquí está la logica de cada endpoint
//Aquí se recibe la petición del usuario y se llama a los servicios. Controlas qué se envía como respuesta.
const service = require('../services/simulacionFlujoPasajerosService');


const simulacionFlujoPasajerosService = require('../services/simulacionFlujoPasajerosService');

exports.getAllSimulacionesFlujo = async (req, res, next) => {
  try {
    const result = await simulacionFlujoPasajerosService.getAllSimulacionesFlujo();
    res.json(result);
  } catch (err) {
    next(err);
  }
};