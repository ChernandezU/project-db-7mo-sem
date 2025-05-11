//Aquí se recibe la petición del usuario y se llama a los controladores. Controlas qué se envía como respuesta.
const express = require('express');
const router = express.Router();
const controller = require('../controllers/licenciaController');

router.get('/', controller.getAllLicencias);
router.get('/:id', controller.getLicenciaById);
router.post('/', controller.createLicencia);
router.put('/:id', controller.updateLicencia);
router.delete('/:id', controller.deleteLicencia);

module.exports = router;
