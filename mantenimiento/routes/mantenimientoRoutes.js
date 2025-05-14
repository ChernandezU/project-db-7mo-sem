//Aquí se recibe la petición del usuario y se llama a los servicios. Controlas qué se envía como respuesta.
const express = require('express');
const router = express.Router();
const mantenimientoController = require('../controllers/mantenimientoController');

router.get('/aviones', mantenimientoController.getAvionesEnMantenimiento);
router.get('/aviones/:id_avion', mantenimientoController.getMantenimientoByAvionId);
router.delete('/aviones/:id_avion', mantenimientoController.deleteMantenimientoByAvionId);

module.exports = router;
