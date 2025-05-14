//aquí está la logica de cada endpoint
const personalService = require('../services/personalService');

exports.getAllPersonal = async (req, res, next) => {
  try {
    const result = await personalService.getAllPersonal();
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.getPersonalById = async (req, res, next) => {
  try {
    const result = await personalService.getPersonalById(req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.createPersonal = async (req, res, next) => {
  try {
    const { nombre, cargo, contacto } = req.body;

    if (!nombre || !cargo || !contacto) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }

    const result = await personalService.createPersonal({ nombre, cargo, contacto });
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

exports.updatePersonal = async (req, res, next) => {
  try {
    const result = await personalService.updatePersonal(req.params.id, req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.deletePersonal = async (req, res, next) => {
  try {
    const result = await personalService.deletePersonal(req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};