//Aquí se recibe la petición del usuario y se llama a los servicios. Controlas qué se envía como respuesta.
const oracledb = require('oracledb');
const { getConnection } = require('../../config/db');
//
const express = require('express');
const { getAllArrestos, getArrestoById, createArresto, updateArresto, deleteArresto } = require('../controllers/arrestosController');

const router = express.Router();

router.get('/', getAllArrestos);
router.get('/:id', getArrestoById);
router.post('/', createArresto);
router.put('/:id', updateArresto);
router.delete('/:id', deleteArresto);

module.exports = router;