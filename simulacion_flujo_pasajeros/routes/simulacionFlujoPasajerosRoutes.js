//Aquí se recibe la petición del usuario y se llama a los servicios. Controlas qué se envía como respuesta.
const express = require('express');
const router = express.Router();
const controller = require('../controllers/simulacionFlujoPasajerosController');

router.get('/', controller.getAllSimulacionesFlujo);
router.get('/:id', controller.getSimulacionFlujoById);
router.post('/', controller.createSimulacionFlujo);
router.put('/:id', controller.updateSimulacionFlujo);
router.delete('/:id', controller.deleteSimulacionFlujo);

module.exports = router;
