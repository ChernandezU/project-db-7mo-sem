const express = require('express');
const router = express.Router();
const vuelosController = require('../controllers/vuelosController');

router.get('/', vuelosController.obtenerVuelos);
router.post('/', vuelosController.crearVuelo);
router.put('/:id', vuelosController.actualizarVuelo);
router.delete('/:id', vuelosController.eliminarVuelo);

module.exports = router;
