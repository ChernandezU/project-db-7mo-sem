//Aquí se recibe la petición del usuario y se llama a los servicios. Controlas qué se envía como respuesta.
const oracledb = require('oracledb');
const { getConnection } = require('../../config/db');
//
const express = require('express');
const { getAllEscalasTecnicas, getEscalaTecnicaById, createEscalaTecnica, updateEscalaTecnica, deleteEscalaTecnica } = require('../controllers/escalasTecnicasController');

const router = express.Router();

router.get('/', getAllEscalasTecnicas);
router.get('/:id', getEscalaTecnicaById);
router.post('/', createEscalaTecnica);
router.put('/:id', updateEscalaTecnica);
router.delete('/:id', deleteEscalaTecnica);

module.exports = router;