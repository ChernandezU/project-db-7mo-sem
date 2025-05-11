const escalasService = require('../services/escalasTecnicasService');

exports.getAllEscalas = async (req, res, next) => {
  try {
    const result = await escalasService.getAllEscalas();
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.getEscalaById = async (req, res, next) => {
  try {
    const result = await escalasService.getEscalaById(req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.createEscala = async (req, res, next) => {
  try {
    const { id_vuelo, pais, ciudad, aeropuerto, codigo_iata_aeropuerto, fecha_hora_llegada, fecha_hora_salida, duracion_estimada, duracion_real, estado_escala, observaciones } = req.body;

    if (!['Pendiente', 'Completada', 'Cancelada'].includes(estado_escala)) {
      return res.status(400).json({ message: "Estado inválido. Debe ser 'Pendiente', 'Completada' o 'Cancelada'." });
    }

    const result = await escalasService.createEscala({
      id_vuelo,
      pais,
      ciudad,
      aeropuerto,
      codigo_iata_aeropuerto,
      fecha_hora_llegada,
      fecha_hora_salida,
      duracion_estimada,
      duracion_real,
      estado_escala,
      observaciones
    });

    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

exports.updateEscala = async (req, res, next) => {
  try {
    const result = await escalasService.updateEscala(req.params.id, req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.deleteEscala = async (req, res, next) => {
  try {
    const result = await escalasService.deleteEscala(req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};