//Aquí se recibe la petición del usuario y se llama a los servicios. Controlas qué se envía como respuesta.
const express = require('express');
const router = express.Router();
const mercanciasController = require('../controllers/mercanciasController');

router.get('/', mercanciasController.getMercancias);
router.get('/:id', mercanciasController.getMercanciaById);
router.post('/', mercanciasController.createMercancia);
router.put('/:id', mercanciasController.updateMercancia);
router.delete('/:id', mercanciasController.deleteMercancia);

module.exports = router;
