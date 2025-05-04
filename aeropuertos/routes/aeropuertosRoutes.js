//Aquí se recibe la petición del usuario y se llama a los servicios. Controlas qué se envía como respuesta.
const express = require('express');
const router = express.Router();
const controller = require('../controllers/aeropuertosController');

router.get('/', controller.getAeropuertos);
router.get('/:id', controller.getAeropuertoById);
router.post('/', controller.createAeropuerto);
router.put('/:id', controller.updateAeropuerto);
router.delete('/:id', controller.deleteAeropuerto);

module.exports = router;
