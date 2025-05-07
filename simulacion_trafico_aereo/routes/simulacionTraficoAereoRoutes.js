//Aquí se recibe la petición del usuario y se llama a los servicios. Controlas qué se envía como respuesta.
const express = require('express');
const router = express.Router();
const controller = require('../controllers/simulacionTraficoAereoController');

router.get('/', controller.getAllSimulacionesTrafico);
router.get('/:id', controller.getSimulacionTraficoById);
router.post('/', controller.createSimulacionTrafico);
router.put('/:id', controller.updateSimulacionTrafico);
router.delete('/:id', controller.deleteSimulacionTrafico);

module.exports = router;
