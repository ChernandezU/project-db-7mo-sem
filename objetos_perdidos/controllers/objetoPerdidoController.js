//aquí está la logica de cada endpoint
const objetoPerdidoService = require('../services/objetoPerdidoService');

exports.getAllObjetos = async (req, res, next) => {
  try {
    const result = await objetoPerdidoService.getAllObjetos();
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.getObjetoById = async (req, res, next) => {
  try {
    const result = await objetoPerdidoService.getObjetoById(req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.createObjeto = async (req, res, next) => {
  try {
    const { descripcion, fecha_encontrado, estado } = req.body;

    if (!descripcion || !estado) {
      return res.status(400).json({ error: 'Los campos "descripcion" y "estado" son obligatorios.' });
    }

    const result = await objetoPerdidoService.createObjeto({ descripcion, fecha_encontrado, estado });
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

exports.deleteObjeto = async (req, res, next) => {
  try {
    const result = await objetoPerdidoService.deleteObjeto(req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};
