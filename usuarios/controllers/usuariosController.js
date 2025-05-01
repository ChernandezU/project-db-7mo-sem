//aquí está la logica de cada endpoint
const usuariosService = require('../services/usuariosService');

const getUsuarios = async (req, res, next) => {
  try {
    const usuarios = await usuariosService.getUsuarios();
    res.json(usuarios);
  } catch (err) {
    next(err);
  }
};

const getUsuarioById = async (req, res, next) => {
  try {
    const usuario = await usuariosService.getUsuarioById(req.params.id);
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(usuario);
  } catch (err) {
    next(err);
  }
};

const createUsuario = async (req, res, next) => {
  try {
    const data = await usuariosService.createUsuario(req.body);
    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
};

const updateUsuario = async (req, res, next) => {
  try {
    const data = await usuariosService.updateUsuario(req.params.id, req.body);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

const deleteUsuario = async (req, res, next) => {
  try {
    const data = await usuariosService.deleteUsuario(req.params.id);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getUsuarios,
  getUsuarioById,
  createUsuario,
  updateUsuario,
  deleteUsuario
};
