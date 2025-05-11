const express = require('express');
const router = express.Router();
const controller = require('../controllers/reservaController');

// Rutas actualizadas con validaciones de los nuevos campos
router.get('/', controller.getAllReservas);
router.get('/:id', controller.getReservaById);
router.post('/', controller.createReserva);
router.put('/:id', controller.updateReserva);
router.delete('/:id', controller.deleteReserva);

module.exports = router;