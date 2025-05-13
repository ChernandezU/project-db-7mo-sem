const express = require('express');
const router = express.Router();
const controller = require('../controllers/reservaController');

// Rutas actualizadas con validaciones de los nuevos campos
router.get('/', controller.getAllReservas);
router.get('/:id', controller.getReservaById);
router.post('/', controller.createReserva);

module.exports = router;