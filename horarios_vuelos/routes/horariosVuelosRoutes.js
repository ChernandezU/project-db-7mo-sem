//Aquí se recibe la petición del usuario y se llama a los servicios. Controlas qué se envía como respuesta.
const express = require('express');
const router = express.Router();
const horariosVuelosController = require('../controllers/horariosVuelosController');

// Definir las rutas para los horarios de vuelo
router.get('/', horariosVuelosController.getAllHorariosVuelos);
router.get('/:id', horariosVuelosController.getHorarioVueloById);
router.post('/', horariosVuelosController.createHorarioVuelo);
router.put('/:id', horariosVuelosController.updateHorarioVuelo);
router.delete('/:id', horariosVuelosController.deleteHorarioVuelo);

module.exports = router;
