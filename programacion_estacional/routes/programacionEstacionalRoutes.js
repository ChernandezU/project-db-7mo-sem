//Aquí se recibe la petición del usuario y se llama a los controladores. Controlas qué se envía como respuesta.
const express = require('express');
const router = express.Router();
const controller = require('../controllers/programacionEstacionalController');

router.get('/', controller.getAllProgramacionesEstacionales);
router.get('/:id', controller.getProgramacionEstacionalById);
router.post('/', controller.createProgramacionEstacional);
router.put('/:id', controller.updateProgramacionEstacional);
router.delete('/:id', controller.deleteProgramacionEstacional);

module.exports = router;
