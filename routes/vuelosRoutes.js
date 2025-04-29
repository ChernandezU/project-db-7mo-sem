//aquí se definen las rutas de los api rests

const express = require('express');
const router = express.Router();
const vuelosController = require('../controllers/vuelosController');

router.get('/all', vuelosController.getAllVuelos);

module.exports = router;
