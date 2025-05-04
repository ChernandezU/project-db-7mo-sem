//Aquí se recibe la petición del usuario y se llama a los servicios. Controlas qué se envía como respuesta.
const oracledb = require('oracledb');
const { getConnection } = require('../../config/db');
//
const express = require('express');
const { getAllSimulacionTraficoAereo, getSimulacionTraficoAereoById, createSimulacionTraficoAereo, updateSimulacionTraficoAereo, deleteSimulacionTraficoAereo } = require('../controllers/simulacionTraficoAereoController');

const router = express.Router();

router.get('/', getAllSimulacionTraficoAereo);
router.get('/:id', getSimulacionTraficoAereoById);
router.post('/', createSimulacionTraficoAereo);
router.put('/:id', updateSimulacionTraficoAereo);
router.delete('/:id', deleteSimulacionTraficoAereo);

module.exports = router;