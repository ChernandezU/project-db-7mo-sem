//Aquí se recibe la petición del usuario y se llama a los servicios. Controlas qué se envía como respuesta.
const oracledb = require('oracledb');
const { getConnection } = require('../../config/db');
//
const express = require('express');
const { getAllAviones, getAvionById, createAvion, updateAvion, deleteAvion } = require('../controllers/avionesController');

const router = express.Router();

router.get('/', getAllAviones);
router.get('/:id', getAvionById);
router.post('/', createAvion);
router.put('/:id', updateAvion);
router.delete('/:id', deleteAvion);

module.exports = router;