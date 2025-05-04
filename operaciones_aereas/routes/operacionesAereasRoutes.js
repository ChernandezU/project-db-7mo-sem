//Aquí se recibe la petición del usuario y se llama a los servicios. Controlas qué se envía como respuesta.
const express = require('express');
const router = express.Router();
const operacionesAereasController = require('../controllers/operacionesAereasController');

// Rutas para operaciones aéreas
router.get('/', operacionesAereasController.getAllOperaciones); // Obtener todas las operaciones
router.get('/:id', operacionesAereasController.getOperacionById); // Obtener operación por ID
router.post('/', operacionesAereasController.createOperacion); // Crear nueva operación
router.put('/:id', operacionesAereasController.updateOperacion); // Actualizar operación por ID
router.delete('/:id', operacionesAereasController.deleteOperacion); // Eliminar operación por ID

module.exports = router;
