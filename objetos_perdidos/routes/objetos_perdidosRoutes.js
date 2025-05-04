//Aquí se recibe la petición del usuario y se llama a los servicios. Controlas qué se envía como respuesta.
const express = require('express');
const router = express.Router();
const objetosController = require('../controllers/objetosPerdidosController');

router.get('/', objetosController.getObjetos);
router.get('/:id', objetosController.getObjetoById);
router.post('/', objetosController.createObjeto);
router.put('/:id', objetosController.updateObjeto);
router.delete('/:id', objetosController.deleteObjeto);

module.exports = router;
