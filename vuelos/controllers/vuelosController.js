const vuelosService = require('../services/vuelosService');

exports.getAllVuelos = async (req, res, next) => {
  try {
    const result = await vuelosService.getAllVuelos();
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.getVueloById = async (req, res, next) => {
  try {
    const result = await vuelosService.getVueloById(req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.createVuelo = async (req, res, next) => {
  try {
    const { id_programa, fecha, plazas_disponibles, id_avion, estado } = req.body;

    if (!id_programa || !fecha || !plazas_disponibles || !id_avion || !estado) {
      return res.status(400).json({ message: 'Faltan parámetros obligatorios en la solicitud.' });
    }

    if (!['activo', 'cancelado', 'finalizado'].includes(estado.trim())) {
      return res.status(400).json({ message: "Estado de vuelo inválido. Debe ser 'activo', 'cancelado' o 'finalizado'." });
    }

    const result = await vuelosService.createVuelo({ id_programa, fecha, plazas_disponibles, id_avion, estado });
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
  console.log('Datos en req.body:', req.body);
console.log('id_programa recibido:', req.body.id_programa);
};

exports.updateVuelo = async (req, res, next) => {
  try {
    const result = await vuelosService.updateVuelo(req.params.id, req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.deleteVuelo = async (req, res, next) => {
  try {
    const result = await vuelosService.deleteVuelo(req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};