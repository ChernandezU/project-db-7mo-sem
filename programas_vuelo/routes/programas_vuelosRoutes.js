//Aquí se recibe la petición del usuario y se llama a los servicios. Controlas qué se envía como respuesta.
const express = require('express');
const router = express.Router();
const controller = require('../controllers/programasVueloController');

router.get('/', controller.getProgramas);
router.get('/:id', controller.getProgramaById);
router.post('/', controller.createPrograma);
router.put('/:id', controller.updatePrograma);
router.delete('/:id', controller.deletePrograma);

module.exports = router;
