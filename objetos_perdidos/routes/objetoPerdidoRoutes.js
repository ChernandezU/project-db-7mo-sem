//Aquí se recibe la petición del usuario y se llama a los servicios. Controlas qué se envía como respuesta.
const express = require('express');
const router = express.Router();
const controller = require('../controllers/objetoPerdidoController');

router.get('/', controller.getAllObjetos);
router.get('/:id', controller.getObjetoById);
router.post('/', controller.createObjeto);
router.delete('/:id', controller.deleteObjeto);

module.exports = router;
