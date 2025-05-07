//Aquí se recibe la petición del usuario y se llama a los servicios. Controlas qué se envía como respuesta.
const express = require('express');
const router = express.Router();
const controller = require('../controllers/pagoController');

router.get('/', controller.getAllPagos);
router.get('/:id', controller.getPagoById);
router.post('/', controller.createPago);
router.put('/:id', controller.updatePago);
router.delete('/:id', controller.deletePago);

module.exports = router;
