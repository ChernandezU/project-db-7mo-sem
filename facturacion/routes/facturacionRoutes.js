//Aquí se recibe la petición del usuario y se llama a los servicios. Controlas qué se envía como respuesta.
const express = require('express');
const router = express.Router();
const controller = require('../controllers/facturacionController');

router.get('/', controller.getAllFacturas);
router.get('/:id_factura', controller.getFacturaById); // ✅ Correcto
router.post('/', controller.createFactura);
router.delete('/:id_factura', controller.deleteFactura);

module.exports = router;
