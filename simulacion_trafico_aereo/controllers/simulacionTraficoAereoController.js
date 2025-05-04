//aquí está la logica de cada endpoint
//Aquí se recibe la petición del usuario y se llama a los servicios. Controlas qué se envía como respuesta.
const oracledb = require('oracledb');
const { getConnection } = require('../../config/db');
const simulacionTraficoAereoService = require('../services/simulacionTraficoAereoService');

// Obtener todas las simulaciones de tráfico aéreo
exports.getAllSimulaciones = async (req, res, next) => {
  try {
    const data = await simulacionTraficoAereoService.getAllSimulaciones();
    res.json(data);
  } catch (error) {
    next(error);
  }
};

// Obtener simulación de tráfico aéreo por ID
exports.getSimulacionById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await simulacionTraficoAereoService.getSimulacionById(id);
    if (!data) return res.status(404).json({ message: 'No encontrado' });
    res.json(data);
  } catch (error) {
    next(error);
  }
};

// Crear nueva simulación de tráfico aéreo
exports.createSimulacion = async (req, res, next) => {
  try {
    const nueva = req.body;
    const result = await simulacionTraficoAereoService.createSimulacion(nueva);
    res.status(201).json({ message: 'Creado exitosamente', id: result });
  } catch (error) {
    next(error);
  }
};

// Actualizar simulación de tráfico aéreo por ID
exports.updateSimulacion = async (req, res, next) => {
  try {
    const { id } = req.params;
    const cambios = req.body;
    await simulacionTraficoAereoService.updateSimulacion(id, cambios);
    res.json({ message: 'Actualizado correctamente' });
  } catch (error) {
    next(error);
  }
};

// Eliminar simulación de tráfico aéreo por ID
exports.deleteSimulacion = async (req, res, next) => {
  try {
    const { id } = req.params;
    await simulacionTraficoAereoService.deleteSimulacion(id);
    res.json({ message: 'Eliminado correctamente' });
  } catch (error) {
    next(error);
  }
};
