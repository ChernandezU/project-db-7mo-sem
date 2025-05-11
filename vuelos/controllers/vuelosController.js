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
    const {
      ID_AVION,
      ORIGEN,
      DESTINO,
      FECHA_SALIDA,
      FECHA_LLEGADA,
      HORA_SALIDA,
      HORA_LLEGADA,
      ESTADO,
      CAPACIDAD_MAXIMA,
      TIPO_VUELO
    } = req.body;

    if (!['activo', 'cancelado', 'finalizado', 'demorado'].includes(ESTADO)) {
      return res.status(400).json({ message: "Estado de vuelo inválido. Debe ser 'activo', 'cancelado', 'finalizado' o 'demorado'." });
    }

    if (!['nacional', 'internacional'].includes(TIPO_VUELO)) {
      return res.status(400).json({ message: "Tipo de vuelo inválido. Debe ser 'nacional' o 'internacional'." });
    }

    const result = await vuelosService.createVuelo({
      ID_AVION,
      ORIGEN,
      DESTINO,
      FECHA_SALIDA,
      FECHA_LLEGADA,
      HORA_SALIDA,
      HORA_LLEGADA,
      ESTADO,
      CAPACIDAD_MAXIMA,
      TIPO_VUELO
    });

    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
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