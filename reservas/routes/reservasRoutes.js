//Aquí se recibe la petición del usuario y se llama a los servicios. Controlas qué se envía como respuesta.
const express = require('express');
const { getAllReservas, getReservaById, createReserva, updateReserva, deleteReserva } = require('../controllers/reservasController');

const router = express.Router();

router.get('/', getAllReservas);
router.get('/:id', getReservaById);
router.post('/', createReserva);
router.put('/:id', updateReserva);
router.delete('/:id', deleteReserva);

module.exports = router;