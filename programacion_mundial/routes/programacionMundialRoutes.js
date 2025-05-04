const express = require('express');
const router = express.Router();
const programacionMundialController = require('../controllers/programacionMundialController');

// Rutas para programaciones mundiales
router.get('/', programacionMundialController.getAllProgramacionesMundiales); // Obtener todas las programaciones mundiales
router.get('/:id', programacionMundialController.getProgramacionMundialById); // Obtener programación mundial por ID
router.post('/', programacionMundialController.createProgramacionMundial); // Crear nueva programación mundial
router.put('/:id', programacionMundialController.updateProgramacionMundial); // Actualizar programación mundial por ID
router.delete('/:id', programacionMundialController.deleteProgramacionMundial); // Eliminar programación mundial por ID

module.exports = router;
