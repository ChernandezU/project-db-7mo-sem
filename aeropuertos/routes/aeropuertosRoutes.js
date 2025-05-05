//Aquí se recibe la petición del usuario y se llama a los servicios. Controlas qué se envía como respuesta.

const express = require('express');
const router = express.Router();
const oracledb = require('oracledb');
const { getConnection } = require('../../config/db');

// Importando los controladores de manera consistente
const { 
    getAeropuertos, 
    getAeropuertoById, 
    createAeropuerto, 
    updateAeropuerto, 
    deleteAeropuerto 
} = require('../controllers/aeropuertosController');

// Definiendo las rutas
router.get('/', getAeropuertos);
router.get('/:id', getAeropuertoById);
router.post('/', createAeropuerto);
router.put('/:id', updateAeropuerto);
router.delete('/:id', deleteAeropuerto);

module.exports = router;
