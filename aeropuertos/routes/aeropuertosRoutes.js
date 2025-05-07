const express = require('express');
const router = express.Router();
const aeropuertosController = require('../controllers/aeropuertosController');

router.get('/all', aeropuertosController.getAllAeropuertos);
router.get('/:id', aeropuertosController.getAeropuertoById);
router.post('/', aeropuertosController.createAeropuerto);
router.put('/:id', aeropuertosController.updateAeropuerto);
router.delete('/:id', aeropuertosController.deleteAeropuerto);

module.exports = router;
