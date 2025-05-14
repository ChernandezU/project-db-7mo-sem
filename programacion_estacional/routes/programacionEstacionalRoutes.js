//Aquí se recibe la petición del usuario y se llama a los controladores. Controlas qué se envía como respuesta.
const express = require('express');
const router = express.Router();
const controller = require('../controllers/programacionEstacionalController');

router.get('/', controller.getAllProgramacionesEstacionales);

module.exports = router;
