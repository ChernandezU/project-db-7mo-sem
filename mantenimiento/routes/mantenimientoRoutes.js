//Aquí se recibe la petición del usuario y se llama a los servicios. Controlas qué se envía como respuesta.
const express = require('express');
const router = express.Router();
const controller = require('../controllers/mantenimientoController');

router.get('/', controller.getAllMantenimientos);
router.get('/:id', controller.getMantenimientoById);
router.post('/', controller.createMantenimiento);
router.put('/:id', controller.updateMantenimiento);
router.delete('/:id', controller.deleteMantenimiento);

module.exports = router;
