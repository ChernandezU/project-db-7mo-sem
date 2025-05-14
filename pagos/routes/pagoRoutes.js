//Aquí se recibe la petición del usuario y se llama a los servicios. Controlas qué se envía como respuesta.
const express = require('express');
const router = express.Router();
const controller = require('../controllers/pagoController');

router.get('/', controller.getAllPagos);
router.get('/:id_pago', controller.getPagoById);
router.post('/', controller.createPago);
router.delete('/:id_pago', controller.deletePago);

module.exports = router;
