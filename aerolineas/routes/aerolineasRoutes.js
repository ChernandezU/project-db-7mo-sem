//Aquí se recibe la petición del usuario y se llama a los servicios. Controlas qué se envía como respuesta.
const oracledb = require('oracledb');
const { getConnection } = require('../../config/db');

//
const express = require('express');
const { getAllAerolineas, getAerolineaById, createAerolinea, updateAerolinea, deleteAerolinea } = require('../controllers/aerolineasController');

const router = express.Router();

router.get('/', getAllAerolineas);
router.get('/:id', getAerolineaById);
router.post('/', createAerolinea);
router.put('/:id', updateAerolinea);
router.delete('/:id', deleteAerolinea);

module.exports = router;