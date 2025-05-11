//Aquí se recibe la petición del usuario y se llama a los controladores. Controlas qué se envía como respuesta.
const express = require('express');
const router = express.Router();
const controller = require('../controllers/carroController');

router.get('/', controller.getAllCarros);
router.get('/:id', controller.getCarroById);
router.post('/', controller.createCarro);
router.put('/:id', controller.updateCarro);
router.delete('/:id', controller.deleteCarro);

module.exports = router;
