//Aquí se recibe la petición del usuario y se llama a los servicios. Controlas qué se envía como respuesta.
const express = require('express');
const router = express.Router();
const controller = require('../controllers/gestioninformacionController');

router.get('/', controller.getAllInformacion);
router.get('/:id', controller.getInformacionById);
router.post('/', controller.createInformacion);
router.put('/:id', controller.updateInformacion);
router.delete('/:id', controller.deleteInformacion);

module.exports = router;
