//aquí está la logica de cada endpoint
//Aquí se recibe la petición del usuario y se llama a los servicios. Controlas qué se envía como respuesta.
const oracledb = require('oracledb');
const { getConnection } = require('../../config/db');
const operacionesAereasService = require('../services/operacionesAereasService');

// Obtener todas las operaciones aéreas
exports.getAllOperaciones = async (req, res, next) => {
  try {
    const data = await operacionesAereasService.getAllOperaciones();
    res.json(data);
  } catch (error) {
    next(error);
  }
};

// Obtener operación aérea por ID
exports.getOperacionById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await operacionesAereasService.getOperacionById(id);
    if (!data) return res.status(404).json({ message: 'No encontrado' });
    res.json(data);
  } catch (error) {
    next(error);
  }
};

// Crear nueva operación aérea
exports.createOperacion = async (req, res, next) => {
  try {
    const nueva = req.body;
    const result = await operacionesAereasService.createOperacion(nueva);
    res.status(201).json({ message: 'Creado exitosamente', id: result });
  } catch (error) {
    next(error);
  }
};

// Actualizar operación aérea por ID
exports.updateOperacion = async (req, res, next) => {
  try {
    const { id } = req.params;
    const cambios = req.body;
    await operacionesAereasService.updateOperacion(id, cambios);
    res.json({ message: 'Actualizado correctamente' });
  } catch (error) {
    next(error);
  }
};

// Eliminar operación aérea por ID
exports.deleteOperacion = async (req, res, next) => {
  try {
    const { id } = req.params;
    await operacionesAereasService.deleteOperacion(id);
    res.json({ message: 'Eliminado correctamente' });
  } catch (error) {
    next(error);
  }
};
