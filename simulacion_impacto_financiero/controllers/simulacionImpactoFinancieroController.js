//aquí está la logica de cada endpoint
//Aquí se recibe la petición del usuario y se llama a los servicios. Controlas qué se envía como respuesta.
const oracledb = require('oracledb');
const { getConnection } = require('../../config/db');
const simulacionImpactoFinancieroService = require('../services/simulacionImpactoFinancieroService');

// Obtener todas las simulaciones
exports.getAllSimulaciones = async (req, res, next) => {
  try {
    const data = await simulacionImpactoFinancieroService.getAllSimulaciones();
    res.json(data);
  } catch (error) {
    next(error);
  }
};

// Obtener simulación por ID
exports.getSimulacionById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await simulacionImpactoFinancieroService.getSimulacionById(id);
    if (!data) return res.status(404).json({ message: 'No encontrado' });
    res.json(data);
  } catch (error) {
    next(error);
  }
};

// Crear nueva simulación
exports.createSimulacion = async (req, res, next) => {
  try {
    const nueva = req.body;
    const result = await simulacionImpactoFinancieroService.createSimulacion(nueva);
    res.status(201).json({ message: 'Creado exitosamente', id: result });
  } catch (error) {
    next(error);
  }
};

// Actualizar simulación por ID
exports.updateSimulacion = async (req, res, next) => {
  try {
    const { id } = req.params;
    const cambios = req.body;
    await simulacionImpactoFinancieroService.updateSimulacion(id, cambios);
    res.json({ message: 'Actualizado correctamente' });
  } catch (error) {
    next(error);
  }
};

// Eliminar simulación por ID
exports.deleteSimulacion = async (req, res, next) => {
  try {
    const { id } = req.params;
    await simulacionImpactoFinancieroService.deleteSimulacion(id);
    res.json({ message: 'Eliminado correctamente' });
  } catch (error) {
    next(error);
  }
};
