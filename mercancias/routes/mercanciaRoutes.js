//Aquí se recibe la petición del usuario y se llama a los servicios. Controlas qué se envía como respuesta.
const express = require('express');
const router = express.Router();
const controller = require('../controllers/mercanciaController');

router.get('/', controller.getAllMercancias);
router.get('/:id', controller.getMercanciaById);
router.post('/', controller.createMercancia);
router.put('/:id', controller.updateMercancia);
router.delete('/:id', controller.deleteMercancia);

module.exports = router;
