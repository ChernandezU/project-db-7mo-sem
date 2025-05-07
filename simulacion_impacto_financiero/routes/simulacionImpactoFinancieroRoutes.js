//Aquí se recibe la petición del usuario y se llama a los servicios. Controlas qué se envía como respuesta.
const express = require('express');
const router = express.Router();
const controller = require('../controllers/simulacionImpactoFinancieroController');

router.get('/', controller.getAllSimulacionesFinancieras);
router.get('/:id', controller.getSimulacionFinancieraById);
router.post('/', controller.createSimulacionFinanciera);
router.put('/:id', controller.updateSimulacionFinanciera);
router.delete('/:id', controller.deleteSimulacionFinanciera);

module.exports = router;
