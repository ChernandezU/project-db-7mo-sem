//aquí está la logica de cada endpoint
const avionesService = require('../services/avionesService');

exports.getAllAviones = async (req, res) => {
  try {
    const data = await avionesService.getAllAviones();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener aviones' });
  }
};

exports.getAvionById = async (req, res) => {
  try {
    const data = await avionesService.getAvionById(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener avión' });
  }
};

exports.createAvion = async (req, res) => {
  try {
    const result = await avionesService.createAvion(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear avión' });
  }
};

exports.updateAvion = async (req, res) => {
  try {
    const result = await avionesService.updateAvion(req.params.id, req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar avión' });
  }
};

exports.deleteAvion = async (req, res) => {
  try {
    const result = await avionesService.deleteAvion(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar avión' });
  }
};
