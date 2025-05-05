//Aquí se recibe la petición del usuario y se llama a los servicios. Controlas qué se envía como respuesta.
const oracledb = require('oracledb');
const { getConnection } = require('../../config/db');
//
const express = require('express');
const { getAllMantenimientos, getMantenimientoById, createMantenimiento, updateMantenimiento, deleteMantenimiento } = require('../controllers/mantenimientoController');

const router = express.Router();

router.get('/', getAllMantenimientos);
router.get('/:id', getMantenimientoById);
router.post('/', createMantenimiento);
router.put('/:id', updateMantenimiento);
router.delete('/:id', deleteMantenimiento);

module.exports = router;