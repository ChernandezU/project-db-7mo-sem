//aquí está la logica de cada endpoint
const horariosVuelosService = require('../services/horariosVuelosService');

// Obtener todos los horarios de vuelo
const getAllHorariosVuelos = async (req, res) => {
  try {
    const horariosVuelos = await horariosVuelosService.getAllHorariosVuelos();
    res.status(200).json(horariosVuelos);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener los horarios de vuelo', error: err.message });
  }
};

// Obtener un horario de vuelo por ID
const getHorarioVueloById = async (req, res) => {
  try {
    const id = req.params.id;
    const horarioVuelo = await horariosVuelosService.getHorarioVueloById(id);
    if (horarioVuelo) {
      res.status(200).json(horarioVuelo);
    } else {
      res.status(404).json({ message: 'Horario de vuelo no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener el horario de vuelo', error: err.message });
  }
};

// Crear un nuevo horario de vuelo
const createHorarioVuelo = async (req, res) => {
  try {
    const nuevoHorario = req.body;
    const result = await horariosVuelosService.createHorarioVuelo(nuevoHorario);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ message: 'Error al crear el horario de vuelo', error: err.message });
  }
};

// Actualizar un horario de vuelo por ID
const updateHorarioVuelo = async (req, res) => {
  try {
    const id = req.params.id;
    const horarioActualizado = req.body;
    const result = await horariosVuelosService.updateHorarioVuelo(id, horarioActualizado);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: 'Horario de vuelo no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar el horario de vuelo', error: err.message });
  }
};

// Eliminar un horario de vuelo por ID
const deleteHorarioVuelo = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await horariosVuelosService.deleteHorarioVuelo(id);
    if (result) {
      res.status(200).json({ message: 'Horario de vuelo eliminado con éxito' });
    } else {
      res.status(404).json({ message: 'Horario de vuelo no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar el horario de vuelo', error: err.message });
  }
};

module.exports = {
  getAllHorariosVuelos,
  getHorarioVueloById,
  createHorarioVuelo,
  updateHorarioVuelo,
  deleteHorarioVuelo
};
