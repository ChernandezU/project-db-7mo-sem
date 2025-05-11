//Aquí se recibe la petición del usuario y se llama a los controladores. Controlas qué se envía como respuesta.
const express = require('express');
const router = express.Router();
const controller = require('../controller/checkInController');

router.get('/', controller.getAllCheckIns);
router.get('/:id', controller.getCheckInById);
router.post('/', controller.createCheckIn);
router.put('/:id', controller.updateCheckIn);
router.delete('/:id', controller.deleteCheckIn);

module.exports = router;