const express = require('express');
const router = express.Router();
const arrestosController = require('../controllers/arrestosController');

// ✅ Rutas para arrestos
router.get('/', arrestosController.getAllArrestos); // Obtener todos los arrestos
router.get('/:id_arresto', arrestosController.getArrestoById); // Obtener arresto por ID_ARRESTO
router.delete('/:id_arresto', arrestosController.deleteArresto); // Eliminar arresto por ID_ARRESTO

module.exports = router;