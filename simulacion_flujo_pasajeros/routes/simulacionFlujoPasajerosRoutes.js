//Aquí se recibe la petición del usuario y se llama a los servicios. Controlas qué se envía como respuesta.
const express = require('express');
const router = express.Router();
const simulacionFlujoPasajerosController = require('../controllers/simulacionFlujoPasajerosController');

// Rutas para simulaciones de flujo de pasajeros
router.get('/', simulacionFlujoPasajerosController.getAllSimulaciones); // Obtener todas las simulaciones
router.get('/:id', simulacionFlujoPasajerosController.getSimulacionById); // Obtener simulación por ID
router.post('/', simulacionFlujoPasajerosController.createSimulacion); // Crear nueva simulación
router.put('/:id', simulacionFlujoPasajerosController.updateSimulacion); // Actualizar simulación por ID
router.delete('/:id', simulacionFlujoPasajerosController.deleteSimulacion); // Eliminar simulación por ID

module.exports = router;
