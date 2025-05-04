//aquí está la logica de cada endpoint
const service = require('../services/programasVueloService');

const getAll = async (req, res) => {
  try {
    const data = await service.getAllProgramasVuelo();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener los programas de vuelo' });
  }
};

const getById = async (req, res) => {
  try {
    const data = await service.getProgramaVueloById(req.params.id);
    if (!data) return res.status(404).json({ error: 'No encontrado' });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener el programa de vuelo' });
  }
};

const create = async (req, res) => {
  try {
    await service.createProgramaVuelo(req.body);
    res.status(201).json({ message: 'Programa de vuelo creado' });
  } catch (err) {
    res.status(500).json({ error: 'Error al crear' });
  }
};

const update = async (req, res) => {
  try {
    await service.updateProgramaVuelo(req.params.id, req.body);
    res.json({ message: 'Programa de vuelo actualizado' });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar' });
  }
};

const remove = async (req, res) => {
  try {
    await service.deleteProgramaVuelo(req.params.id);
    res.json({ message: 'Programa de vuelo eliminado' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar' });
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
