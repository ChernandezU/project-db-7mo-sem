//Aquí se recibe la petición del usuario y se llama a los servicios. Controlas qué se envía como respuesta.
const express = require('express');
const router = express.Router();
const pagosController = require('../controllers/pagosController');

router.get('/', pagosController.getPagos);
router.get('/:id', pagosController.getPagoById);
router.post('/', pagosController.createPago);
router.put('/:id', pagosController.updatePago);
router.delete('/:id', pagosController.deletePago);

module.exports = router;
