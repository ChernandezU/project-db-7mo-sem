//aquí está la logica de cada endpoint
// Controlador para la tabla Portales
const pistaService = require('../services/pistaService');

exports.getAllPistas = async (req, res, next) => {
  try {
    const result = await pistaService.getAllPistas();
    res.json(result);
  } catch (err) {
    next(err);
  }
};
