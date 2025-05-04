//Aquí se recibe la petición del usuario y se llama a los servicios. Controlas qué se envía como respuesta.
const express = require('express');
const router = express.Router();
const gestionInformacionController = require('../controllers/gestioninformacionController');

router.get('/', gestionInformacionController.obtenerInformacion);
router.post('/', gestionInformacionController.crearInformacion);
router.put('/:id', gestionInformacionController.actualizarInformacion);
router.delete('/:id', gestionInformacionController.eliminarInformacion);

module.exports = router;
