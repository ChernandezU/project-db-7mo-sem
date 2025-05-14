//Aquí se recibe la petición del usuario y se llama a los controladores. Controlas qué se envía como respuesta.
const express = require('express');
const router = express.Router();
const controller = require('../controllers/checkinController');

router.get('/', controller.getAllCheckIns);
router.post('/', controller.createCheckIn);
router.delete('/:id_checkin', controller.deleteCheckIn);

module.exports = router;