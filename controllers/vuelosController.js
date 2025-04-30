//aquí está la logica de cada endpoint
const vuelosService = require('../services/vuelosService');

const getAllVuelos = async (req, res, next) => {
  try {
    const vuelos = await vuelosService.getAllVuelos();
    res.status(200).json(vuelos);
  } catch (error) {
    console.error('Error al obtener los vuelos:', error);
    res.status(500).json({ error: error.message });
  }
};

const createVuelo = async (req, res, next) => {
  try {
    const vuelo = req.body;
    const result = await vuelosService.createVuelo(vuelo);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

const updateVuelo = async (req, res, next) => {
  try {
    const id = req.params.id;
    const vuelo = req.body;
    const result = await vuelosService.updateVuelo(id, vuelo);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const deleteVuelo = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await vuelosService.deleteVuelo(id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllVuelos,
  createVuelo,
  updateVuelo,
  deleteVuelo
};
