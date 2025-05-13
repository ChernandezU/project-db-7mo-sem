const aeropuertosService = require('../services/aeropuertosService');

exports.getAllAeropuertos = async (req, res) => {           //
  try {
    const data = await aeropuertosService.getAllAeropuertos();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener aeropuertos' });
  }
};

exports.getAeropuertoById = async (req, res) => {            //
  try {
    const data = await aeropuertosService.getAeropuertoById(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener aeropuerto' });
  }
};

exports.createAeropuerto = async (req, res) => {             //
  try {
    const result = await aeropuertosService.createAeropuerto(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear aeropuerto' });
  }
};

exports.updateAeropuerto = async (req, res) => {             //
  try {
    const result = await aeropuertosService.updateAeropuerto(req.params.id, req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar aeropuerto' });
  }
};

exports.deleteAeropuerto = async (req, res) => {              //
  try {
    const result = await aeropuertosService.deleteAeropuerto(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar aeropuerto' });
  }
};
