//Aquí se recibe la petición del usuario y se llama a los servicios. Controlas qué se envía como respuesta.
const express = require('express');
const router = express.Router();
const facturacionController = require('../controllers/facturacionController');

router.get('/', facturacionController.getFacturas);
router.get('/:id', facturacionController.getFacturaById);
router.post('/', facturacionController.createFactura);
router.put('/:id', facturacionController.updateFactura);
router.delete('/:id', facturacionController.deleteFactura);

module.exports = router;
