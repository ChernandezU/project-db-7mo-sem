//Aquí se recibe la petición del usuario y se llama a los servicios. Controlas qué se envía como respuesta.
const express = require('express');
const router = express.Router();
const controller = require('../controllers/personalController');

router.get('/', controller.getAllPersonal);
router.get('/:id', controller.getPersonalById);
router.post('/', controller.createPersonal);
router.put('/:id', controller.updatePersonal);
router.delete('/:id', controller.deletePersonal);

module.exports = router;
