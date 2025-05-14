const arrestosService = require('../services/arrestosService');

exports.getAllArrestos = async (req, res, next) => {
  try {
    const result = await arrestosService.getAllArrestos();
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.getArrestoById = async (req, res, next) => {
  try {
    const result = await arrestosService.getArrestoById(req.params.id_arresto);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.deleteArresto = async (req, res, next) => {
  try {
    const result = await arrestosService.deleteArresto(req.params.id_arresto);
    res.json(result);
  } catch (err) {
    next(err);
  }
};