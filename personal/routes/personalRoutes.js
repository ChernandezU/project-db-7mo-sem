//Aquí se recibe la petición del usuario y se llama a los servicios. Controlas qué se envía como respuesta.
const oracledb = require('oracledb');
const { getConnection } = require('../../config/db');
//
const express = require('express');
const { getAllPersonal, getPersonalById, createPersonal, updatePersonal, deletePersonal } = require('../controllers/personalController');

const router = express.Router();

router.get('/', getAllPersonal);
router.get('/:id', getPersonalById);
router.post('/', createPersonal);
router.put('/:id', updatePersonal);
router.delete('/:id', deletePersonal);

module.exports = router;