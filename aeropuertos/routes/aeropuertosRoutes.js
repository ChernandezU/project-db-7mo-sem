const express = require('express');
const router = express.Router();
const aeropuertosController = require('../controllers/aeropuertosController');

router.get('/', aeropuertosController.obtenerAeropuertos);
router.post('/', aeropuertosController.crearAeropuerto);
router.put('/:id', aeropuertosController.actualizarAeropuerto);
router.delete('/:id', aeropuertosController.eliminarAeropuerto);

module.exports = router;
