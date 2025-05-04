const express = require('express');
const router = express.Router();
const avionesController = require('../controllers/avionesController');

router.get('/', avionesController.obtenerAviones);
router.post('/', avionesController.crearAvion);
router.put('/:id', avionesController.actualizarAvion);
router.delete('/:id', avionesController.eliminarAvion);

module.exports = router;
