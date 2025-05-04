//aquí está la logica de cada endpoint
const programacionEstacionalService = require('../services/programacionEstacionalService');

// Obtener todas las programaciones estacionales
exports.getAllProgramaciones = async (req, res, next) => {
  try {
    const data = await programacionEstacionalService.getAllProgramaciones();
    res.json(data);
  } catch (error) {
    next(error);
  }
};

// Obtener una programación por ID
exports.getProgramacionById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await programacionEstacionalService.getProgramacionById(id);
    if (!data) return res.status(404).json({ message: 'No encontrado' });
    res.json(data);
  } catch (error) {
    next(error);
  }
};

// Crear nueva programación
exports.createProgramacion = async (req, res, next) => {
  try {
    const nueva = req.body;
    const result = await programacionEstacionalService.createProgramacion(nueva);
    res.status(201).json({ message: 'Creado exitosamente', id: result });
  } catch (error) {
    next(error);
  }
};

// Actualizar programación por ID
exports.updateProgramacion = async (req, res, next) => {
  try {
    const { id } = req.params;
    const cambios = req.body;
    await programacionEstacionalService.updateProgramacion(id, cambios);
    res.json({ message: 'Actualizado correctamente' });
  } catch (error) {
    next(error);
  }
};

// Eliminar programación por ID
exports.deleteProgramacion = async (req, res, next) => {
  try {
    const { id } = req.params;
    await programacionEstacionalService.deleteProgramacion(id);
    res.json({ message: 'Eliminado correctamente' });
  } catch (error) {
    next(error);
  }
};
