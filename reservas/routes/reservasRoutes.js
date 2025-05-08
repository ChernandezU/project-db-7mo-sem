//Aquí se recibe la petición del usuario y se llama a los servicios. Controlas qué se envía como respuesta.
const express = require('express');
const router = express.Router();
const controller = require('../controllers/reservaController');

router.get('/', controller.getAllReservas);
router.get('/:id', controller.getReservaById);
router.post('/', controller.createReserva);
router.put('/:id', controller.updateReserva);
router.delete('/:id', controller.deleteReserva);

module.exports = router;
