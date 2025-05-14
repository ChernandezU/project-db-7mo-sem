//Aquí se recibe la petición del usuario y se llama a los controladores. Controlas qué se envía como respuesta.
const express = require('express');
const router = express.Router();
const controller = require('../controllers/visaController');

router.get('/', controller.getAllVisas);
router.get('/:id_visa', controller.getVisaById);
router.post('/', controller.createVisa);
router.put('/:id_visa', controller.updateVisa);

module.exports = router;
