//Aquí se recibe la petición del usuario y se llama a los servicios. Controlas qué se envía como respuesta.
const express = require('express');
const router = express.Router();
const simulacionTraficoAereoController = require('../controllers/simulacionTraficoAereoController');

// Rutas para simulaciones de tráfico aéreo
router.get('/', simulacionTraficoAereoController.getAllSimulaciones); // Obtener todas las simulaciones
router.get('/:id', simulacionTraficoAereoController.getSimulacionById); // Obtener simulación por ID
router.post('/', simulacionTraficoAereoController.createSimulacion); // Crear nueva simulación
router.put('/:id', simulacionTraficoAereoController.updateSimulacion); // Actualizar simulación por ID
router.delete('/:id', simulacionTraficoAereoController.deleteSimulacion); // Eliminar simulación por ID

module.exports = router;
