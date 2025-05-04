//Aquí se recibe la petición del usuario y se llama a los servicios. Controlas qué se envía como respuesta.
const express = require('express');
const router = express.Router();
const operacionesController = require('../controllers/operacionesTerrestresController');

router.get('/', operacionesController.getOperaciones);
router.get('/:id', operacionesController.getOperacionById);
router.post('/', operacionesController.createOperacion);
router.put('/:id', operacionesController.updateOperacion);
router.delete('/:id', operacionesController.deleteOperacion);

module.exports = router;
