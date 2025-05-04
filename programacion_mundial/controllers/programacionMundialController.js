//Aquí se recibe la petición del usuario y se llama a los servicios. Controlas qué se envía como respuesta.
const oracledb = require('oracledb');
const { getConnection } = require('../../config/db');
const programacionMundialService = require('../services/programacionMundialService');

// Obtener todas las programaciones mundiales
exports.getAllProgramacionesMundiales = async (req, res, next) => {
  try {
    const data = await programacionMundialService.getAllProgramacionesMundiales();
    res.json(data);
  } catch (error) {
    next(error);
  }
};

// Obtener una programación mundial por ID
exports.getProgramacionMundialById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await programacionMundialService.getProgramacionMundialById(id);
    if (!data) return res.status(404).json({ message: 'No encontrado' });
    res.json(data);
  } catch (error) {
    next(error);
  }
};

// Crear nueva programación mundial
exports.createProgramacionMundial = async (req, res, next) => {
  try {
    const nueva = req.body;
    const result = await programacionMundialService.createProgramacionMundial(nueva);
    res.status(201).json({ message: 'Creado exitosamente', id: result });
  } catch (error) {
    next(error);
  }
};

// Actualizar programación mundial por ID
exports.updateProgramacionMundial = async (req, res, next) => {
  try {
    const { id } = req.params;
    const cambios = req.body;
    await programacionMundialService.updateProgramacionMundial(id, cambios);
    res.json({ message: 'Actualizado correctamente' });
  } catch (error) {
    next(error);
  }
};

// Eliminar programación mundial por ID
exports.deleteProgramacionMundial = async (req, res, next) => {
  try {
    const { id } = req.params;
    await programacionMundialService.deleteProgramacionMundial(id);
    res.json({ message: 'Eliminado correctamente' });
  } catch (error) {
    next(error);
  }
};
