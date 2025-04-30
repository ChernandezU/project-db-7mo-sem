//aquí se definen las rutas de los api rests
const express = require('express');
const router = express.Router();
const vuelosController = require('../controllers/vuelosController');

router.get('/', vuelosController.getAllVuelos);
router.post('/', vuelosController.createVuelo);
router.put('/:id', vuelosController.updateVuelo);
router.delete('/:id', vuelosController.deleteVuelo);

module.exports = router;
