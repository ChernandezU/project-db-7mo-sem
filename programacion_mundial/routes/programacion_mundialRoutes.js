//Aquí se recibe la petición del usuario y se llama a los servicios. Controlas qué se envía como respuesta.
const oracledb = require('oracledb');
const { getConnection } = require('../../config/db');
//
const express = require('express');
const { getAllProgramacionMundial, getProgramacionMundialById, createProgramacionMundial, updateProgramacionMundial, deleteProgramacionMundial } = require('../controllers/programacionMundialController');

const router = express.Router();

router.get('/', getAllProgramacionMundial);
router.get('/:id', getProgramacionMundialById);
router.post('/', createProgramacionMundial);
router.put('/:id', updateProgramacionMundial);
router.delete('/:id', deleteProgramacionMundial);

module.exports = router;
