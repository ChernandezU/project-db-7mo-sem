//aquí está la logica de cada endpoint
// Controlador para la tabla Portales
const portalService = require('../services/portalService');

exports.getAllPortales = async (req, res, next) => {
  try {
    const result = await portalService.getAllPortales();
    res.json(result);
  } catch (err) {
    next(err);
  }
};