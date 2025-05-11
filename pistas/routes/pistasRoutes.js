//Aquí se recibe la petición del usuario y se llama a los controladores. Controlas qué se envía como respuesta.
const express = require('express');
const router = express.Router();
const controller = require('../controllers/pistaController');

router.get('/', controller.getAllPistas);
router.get('/:id', controller.getPistaById);
router.post('/', controller.createPista);
router.put('/:id', controller.updatePista);
router.delete('/:id', controller.deletePista);

module.exports = router;