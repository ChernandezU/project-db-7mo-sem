//Aquí se recibe la petición del usuario y se llama a los servicios. Controlas qué se envía como respuesta.
const oracledb = require('oracledb');
const { getConnection } = require('../../config/db');
//
const express = require('express');
const { getAllSimulacionImpactoFinanciero, getSimulacionImpactoFinancieroById, createSimulacionImpactoFinanciero, updateSimulacionImpactoFinanciero, deleteSimulacionImpactoFinanciero } = require('../controllers/simulacionImpactoFinancieroController');

const router = express.Router();

router.get('/', getAllSimulacionImpactoFinanciero);
router.get('/:id', getSimulacionImpactoFinancieroById);
router.post('/', createSimulacionImpactoFinanciero);
router.put('/:id', updateSimulacionImpactoFinanciero);
router.delete('/:id', deleteSimulacionImpactoFinanciero);

module.exports = router;