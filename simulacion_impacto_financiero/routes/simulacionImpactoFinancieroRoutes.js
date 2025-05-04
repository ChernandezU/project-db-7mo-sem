//Aquí se recibe la petición del usuario y se llama a los servicios. Controlas qué se envía como respuesta.
const express = require('express');
const router = express.Router();
const simulacionImpactoFinancieroController = require('../controllers/simulacionImpactoFinancieroController');

// Rutas para simulaciones de impacto financiero
router.get('/', simulacionImpactoFinancieroController.getAllSimulaciones);
router.get('/:id', simulacionImpactoFinancieroController.getSimulacionById);
router.post('/', simulacionImpactoFinancieroController.createSimulacion);
router.put('/:id', simulacionImpactoFinancieroController.updateSimulacion);
router.delete('/:id', simulacionImpactoFinancieroController.deleteSimulacion);

module.exports = router;
