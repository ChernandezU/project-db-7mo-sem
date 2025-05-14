//Aquí se recibe la petición del usuario y se llama a los servicios. Controlas qué se envía como respuesta.
const express = require('express');
const router = express.Router();
const controller = require('../controllers/simulacionFlujoPasajerosController');

router.get('/',controller.getAllSimulacionesFlujo);

module.exports = router;
