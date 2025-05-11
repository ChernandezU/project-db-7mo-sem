//Aquí se recibe la petición del usuario y se llama a los controladores. Controlas qué se envía como respuesta.
const express = require('express');
const router = express.Router();
const controller = require('../controllers/transporteController');

router.get('/', controller.getAllTransportes);
router.get('/:id', controller.getTransporteById);
router.post('/', controller.createTransporte);
router.put('/:id', controller.updateTransporte);
router.delete('/:id', controller.deleteTransporte);

module.exports = router;