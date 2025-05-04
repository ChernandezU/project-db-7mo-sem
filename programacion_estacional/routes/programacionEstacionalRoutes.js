//Aquí se recibe la petición del usuario y se llama a los controladores. Controlas qué se envía como respuesta.
const express = require('express');
const router = express.Router();
const programacionEstacionalController = require('../controllers/programacionEstacionalController');

// Rutas correctamente referenciadas a los métodos exportados
router.get('/', programacionEstacionalController.getAllProgramaciones);
router.get('/:id', programacionEstacionalController.getProgramacionById);
router.post('/', programacionEstacionalController.createProgramacion);
router.put('/:id', programacionEstacionalController.updateProgramacion);
router.delete('/:id', programacionEstacionalController.deleteProgramacion);

module.exports = router;
