//Aquí se recibe la petición del usuario y se llama a los controladores. Controlas qué se envía como respuesta.
const express = require('express');
const router = express.Router();
const controller = require('../controllers/mantenimientoPistasController');

router.get('/', controller.getAllMantenimientosPistas);
router.get('/:id', controller.getMantenimientoPistaById);
router.post('/', controller.createMantenimientoPista);
router.put('/:id', controller.updateMantenimientoPista);
router.delete('/:id', controller.deleteMantenimientoPista);

module.exports = router;
