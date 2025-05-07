//Aquí se recibe la petición del usuario y se llama a los servicios. Controlas qué se envía como respuesta.
const express = require('express');
const router = express.Router();
const controller = require('../controllers/facturacionController');

router.get('/', controller.getAllFacturas);
router.get('/:id', controller.getFacturaById);
router.post('/', controller.createFactura);
router.put('/:id', controller.updateFactura);
router.delete('/:id', controller.deleteFactura);

module.exports = router;
