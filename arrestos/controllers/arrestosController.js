//aquí está la logica de cada endpoint
//Aquí se recibe la petición del usuario y se llama a los servicios. Controlas qué se envía como respuesta.
const oracledb = require('oracledb');
const { getConnection } = require('../../config/db');
const arrestosService = require('../services/arrestosService');

// Obtener todos los arrestos
exports.getAllArrestos = async (req, res, next) => {
  try {
    const data = await arrestosService.getAllArrestos();
    res.json(data);
  } catch (error) {
    next(error);
  }
};

// Obtener un arresto por ID
exports.getArrestoById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await arrestosService.getArrestoById(id);
    if (!data) return res.status(404).json({ message: 'No encontrado' });
    res.json(data);
  } catch (error) {
    next(error);
  }
};

// Crear nuevo arresto
exports.createArresto = async (req, res, next) => {
  try {
    const nuevo = req.body;
    const result = await arrestosService.createArresto(nuevo);
    res.status(201).json({ message: 'Creado exitosamente', id: result });
  } catch (error) {
    next(error);
  }
};

// Actualizar arresto por ID
exports.updateArresto = async (req, res, next) => {
  try {
    const { id } = req.params;
    const cambios = req.body;
    await arrestosService.updateArresto(id, cambios);
    res.json({ message: 'Actualizado correctamente' });
  } catch (error) {
    next(error);
  }
};

// Eliminar arresto por ID
exports.deleteArresto = async (req, res, next) => {
  try {
    const { id } = req.params;
    await arrestosService.deleteArresto(id);
    res.json({ message: 'Eliminado correctamente' });
  } catch (error) {
    next(error);
  }
};
