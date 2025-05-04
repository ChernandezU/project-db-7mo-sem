//Aquí se recibe la petición del usuario y se llama a los servicios. Controlas qué se envía como respuesta.
const oracledb = require('oracledb');
const { getConnection } = require('../../config/db');
//
const express = require('express');
const { getAllOperacionesAereas, getOperacionAereaById, createOperacionAerea, updateOperacionAerea, deleteOperacionAerea } = require('../controllers/operacionesAereasController');

const router = express.Router();

router.get('/', getAllOperacionesAereas);
router.get('/:id', getOperacionAereaById);
router.post('/', createOperacionAerea);
router.put('/:id', updateOperacionAerea);
router.delete('/:id', deleteOperacionAerea);

module.exports = router;