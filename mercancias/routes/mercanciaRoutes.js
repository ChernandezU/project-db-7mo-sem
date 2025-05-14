//Aquí se recibe la petición del usuario y se llama a los servicios. Controlas qué se envía como respuesta.
const express = require('express');
const router = express.Router();
const controller = require('../controllers/mercanciaController');

router.get('/', controller.getAllMercancias);
router.get('/:id_mercancia', controller.getMercanciaById); // ✅ Correcto
router.delete('/:id_mercancia', controller.deleteMercancia); // ✅ Correcto
router.post('/', controller.createMercancia);

module.exports = router;
