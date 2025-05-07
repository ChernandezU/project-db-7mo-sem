//Aquí se recibe la petición del usuario y se llama a los servicios. Controlas qué se envía como respuesta.
const express = require('express');
const router = express.Router();
const controller = require('../controllers/operacionAereaController');

router.get('/', controller.getAllOperaciones);
router.get('/:id', controller.getOperacionById);
router.post('/', controller.createOperacion);
router.put('/:id', controller.updateOperacion);
router.delete('/:id', controller.deleteOperacion);

module.exports = router;
