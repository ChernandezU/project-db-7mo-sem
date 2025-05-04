//Aquí se recibe la petición del usuario y se llama a los servicios. Controlas qué se envía como respuesta.
const oracledb = require('oracledb');
const { getConnection } = require('../../config/db');
//
const express = require('express');
const { getAllProgramacionEstacional, getProgramacionEstacionalById, createProgramacionEstacional, updateProgramacionEstacional, deleteProgramacionEstacional } = require('../controllers/programacionEstacionalController');

const router = express.Router();

router.get('/', getAllProgramacionEstacional);
router.get('/:id', getProgramacionEstacionalById);
router.post('/', createProgramacionEstacional);
router.put('/:id', updateProgramacionEstacional);
router.delete('/:id', deleteProgramacionEstacional);

module.exports = router;