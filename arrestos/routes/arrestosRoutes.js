const express = require('express');
const router = express.Router();
const arrestosController = require('../controllers/arrestosController');

// Rutas para arrestos
router.get('/', arrestosController.getAllArrestos); // Obtener todos los arrestos
router.get('/:id', arrestosController.getArrestoById); // Obtener arresto por ID
router.post('/', arrestosController.createArresto); // Crear un nuevo arresto
router.put('/:id', arrestosController.updateArresto); // Actualizar arresto por ID
router.delete('/:id', arrestosController.deleteArresto); // Eliminar arresto por ID

module.exports = router;
