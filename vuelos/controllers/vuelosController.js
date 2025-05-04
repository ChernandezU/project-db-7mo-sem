const vuelosService = require('../services/vuelosService');

// Obtener todos los vuelos
exports.obtenerVuelos = async (req, res, next) => {
  try {
    const vuelos = await vuelosService.obtenerVuelos();
    res.status(200).json(vuelos);
  } catch (error) {
    next(error);
  }
};

// Crear un nuevo vuelo
exports.crearVuelo = async (req, res, next) => {
  try {
    const nuevoVuelo = await vuelosService.crearVuelo(req.body);
    res.status(201).json(nuevoVuelo);
  } catch (error) {
    next(error);
  }
};

// Actualizar un vuelo
exports.actualizarVuelo = async (req, res, next) => {
  try {
    const vueloActualizado = await vuelosService.actualizarVuelo(req.params.id, req.body);
    res.status(200).json(vueloActualizado);
  } catch (error) {
    next(error);
  }
};

// Eliminar un vuelo
exports.eliminarVuelo = async (req, res, next) => {
  try {
    await vuelosService.eliminarVuelo(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
