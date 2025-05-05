//Aquí se recibe la petición del usuario y se llama a los servicios. Controlas qué se envía como respuesta.
const oracledb = require('oracledb');
const { getConnection } = require('../../config/db');
//
const express = require('express');
const { getAllGestionInformacion, getGestionInformacionById, createGestionInformacion, updateGestionInformacion, deleteGestionInformacion } = require('../controllers/gestionInformacionController');

const router = express.Router();

router.get('/', getAllGestionInformacion);
router.get('/:id', getGestionInformacionById);
router.post('/', createGestionInformacion);
router.put('/:id', updateGestionInformacion);
router.delete('/:id', deleteGestionInformacion);

module.exports = router;