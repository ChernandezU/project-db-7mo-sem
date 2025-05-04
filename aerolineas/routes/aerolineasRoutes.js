//Aquí se recibe la petición del usuario y se llama a los servicios. Controlas qué se envía como respuesta.
// Aquí se recibe la petición del usuario y se llama a los controladores.
const express = require('express');
const router = express.Router();
const aerolineasController = require('../controllers/aerolineasController');

router.get('/', aerolineasController.getAllAerolineas);
router.get('/:id', aerolineasController.getAerolineaById);
router.post('/', aerolineasController.createAerolinea);
router.put('/:id', aerolineasController.updateAerolinea);
router.delete('/:id', aerolineasController.deleteAerolinea);

module.exports = router;
