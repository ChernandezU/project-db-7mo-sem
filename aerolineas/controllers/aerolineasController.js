//aquí está la logica de cada endpoint
// Aquí se recibe la petición del usuario y se llama a los servicios. Controlas qué se envía como respuesta.
const oracledb = require('oracledb');
const { getConnection } = require('../../config/db');
const aerolineasService = require('../services/aerolineasService');

exports.getAllAerolineas = async (req, res, next) => {
  try {
    const data = await aerolineasService.getAllAerolineas();
    res.json(data);
  } catch (error) {
    next(error);
  }
};

exports.getAerolineaById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await aerolineasService.getAerolineaById(id);
    if (!data) return res.status(404).json({ message: 'No encontrado' });
    res.json(data);
  } catch (error) {
    next(error);
  }
};

exports.createAerolinea = async (req, res, next) => {
  try {
    const nueva = req.body;
    const result = await aerolineasService.createAerolinea(nueva);
    res.status(201).json({ message: 'Creado exitosamente', id: result });
  } catch (error) {
    next(error);
  }
};

exports.updateAerolinea = async (req, res, next) => {
  try {
    const { id } = req.params;
    const cambios = req.body;
    await aerolineasService.updateAerolinea(id, cambios);
    res.json({ message: 'Actualizado correctamente' });
  } catch (error) {
    next(error);
  }
};

exports.deleteAerolinea = async (req, res, next) => {
  try {
    const { id } = req.params;
    await aerolineasService.deleteAerolinea(id);
    res.json({ message: 'Eliminado correctamente' });
  } catch (error) {
    next(error);
  }
};
