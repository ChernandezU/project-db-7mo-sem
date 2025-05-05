//Aquí se recibe la petición del usuario y se llama a los servicios. Controlas qué se envía como respuesta.
const oracledb = require('oracledb');
const { getConnection } = require('../../config/db');
//
const express = require('express');
const { getAllEquipajes, getEquipajeById, createEquipaje, updateEquipaje, deleteEquipaje } = require('../controllers/equipajesController');

const router = express.Router();

router.get('/', getAllEquipajes);
router.get('/:id', getEquipajeById);
router.post('/', createEquipaje);
router.put('/:id', updateEquipaje);
router.delete('/:id', deleteEquipaje);

module.exports = router;