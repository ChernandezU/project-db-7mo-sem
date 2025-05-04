//Aquí se recibe la petición del usuario y se llama a los servicios. Controlas qué se envía como respuesta.
const oracledb = require('oracledb');
const { getConnection } = require('../../config/db');
//
const express = require('express');
const { getAllHorariosVuelos, getHorariosVuelosById, createHorariosVuelos, updateHorariosVuelos, deleteHorariosVuelos } = require('../controllers/horariosVuelosController');

const router = express.Router();

router.get('/', getAllHorariosVuelos);
router.get('/:id', getHorariosVuelosById);
router.post('/', createHorariosVuelos);
router.put('/:id', updateHorariosVuelos);
router.delete('/:id', deleteHorariosVuelos);

module.exports = router;