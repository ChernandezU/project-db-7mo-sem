//aquí está la logica de cada endpoint

const vuelosService = require('../services/vuelosService');

exports.getAllVuelos = async (req, res, next) => {
  try {
    const data = await vuelosService.obtenerVuelos();
    res.json(data);
  } catch (err) {
    next(err);
  }
};

