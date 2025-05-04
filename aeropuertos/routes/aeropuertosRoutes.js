//Aquí se recibe la petición del usuario y se llama a los servicios. Controlas qué se envía como respuesta.
<<<<<<< HEAD
const express = require('express');
const router = express.Router();
const controller = require('../controllers/aeropuertosController');

router.get('/', controller.getAeropuertos);
router.get('/:id', controller.getAeropuertoById);
router.post('/', controller.createAeropuerto);
router.put('/:id', controller.updateAeropuerto);
router.delete('/:id', controller.deleteAeropuerto);

module.exports = router;
=======
const oracledb = require('oracledb');
const { getConnection } = require('../../config/db');
//

const express = require('express');
const { getAllAeropuertos, getAeropuertoById, createAeropuerto, updateAeropuerto, deleteAeropuerto } = require('../controllers/aeropuertosController');

const router = express.Router();

router.get('/', getAllAeropuertos);
router.get('/:id', getAeropuertoById);
router.post('/', createAeropuerto);
router.put('/:id', updateAeropuerto);
router.delete('/:id', deleteAeropuerto);

module.exports = router;
>>>>>>> 96a565c3f0b8b728cace02e6a4c5a21424055f39
