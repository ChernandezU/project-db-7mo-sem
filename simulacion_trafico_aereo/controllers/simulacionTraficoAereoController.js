//aquí está la logica de cada endpoint
//Aquí se recibe la petición del usuario y se llama a los servicios. Controlas qué se envía como respuesta.
const simulacionTraficoAereoService = require('../services/simulacionTraficoAereoService');

exports.getAllSimulacionesTrafico = async (req, res, next) => {
  try {
    const result = await simulacionTraficoAereoService.getAllSimulacionesTrafico();
    res.json(result);
  } catch (err) {
    next(err);
  }
};