//Aquí se recibe la petición del usuario y se llama a los servicios. Controlas qué se envía como respuesta.
const express = require('express');
const router = express.Router();
const horariosVuelosController = require('../controllers/horariosVuelosController');

// ✅ Rutas para horarios de vuelos
router.get('/', horariosVuelosController.getAllHorariosVuelos); // Obtener todos los horarios de vuelos
router.get('/:id_horario', horariosVuelosController.getHorarioVueloById); // Obtener horario de vuelo por ID
router.post('/', horariosVuelosController.createHorarioVuelo); // Crear un nuevo horario de vuelo
router.delete('/:id_horario', horariosVuelosController.deleteHorarioVuelo); // Eliminar horario de vuelo por ID

module.exports = router;