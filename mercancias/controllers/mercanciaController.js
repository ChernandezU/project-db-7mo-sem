const mercanciaService = require('../services/mercanciaService');

exports.getAllMercancias = async (req, res, next) => {
  try {
    const result = await mercanciaService.getAllMercancias();
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.getMercanciaById = async (req, res, next) => {
  try {
    const result = await mercanciaService.getMercanciaById(req.params.id_mercancia);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.createMercancia = async (req, res, next) => {
  try {
    const { descripcion, peso, id_reserva } = req.body;

    if (!descripcion || !peso || !id_reserva) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }

    const result = await mercanciaService.createMercancia({ descripcion, peso, id_reserva });
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};
exports.deleteMercancia = async (req, res, next) => {
  try {
    const id_mercancia = req.params.id_mercancia;
    console.log('📌 ID recibido en controlador para eliminar:', id_mercancia);

    if (!id_mercancia) {
      return res.status(400).json({ error: 'ID_MERCANCIA es obligatorio para eliminar.' });
    }

    const result = await mercanciaService.deleteMercancia(id_mercancia);
    res.json(result);
  } catch (err) {
    console.error('📌 Error en deleteMercancia:', err);
    next(err);
  }
};