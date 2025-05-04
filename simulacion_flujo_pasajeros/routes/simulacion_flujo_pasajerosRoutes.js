//Aquí se recibe la petición del usuario y se llama a los servicios. Controlas qué se envía como respuesta.
const oracledb = require('oracledb');
const { getConnection } = require('../../config/db');
//
const express = require('express');
const { getAllSimulacionFlujoPasajeros, getSimulacionFlujoPasajerosById, createSimulacionFlujoPasajeros, updateSimulacionFlujoPasajeros, deleteSimulacionFlujoPasajeros } = require('../controllers/simulacionFlujoPasajerosController');

const router = express.Router();

router.get('/', getAllSimulacionFlujoPasajeros);
router.get('/:id', getSimulacionFlujoPasajerosById);
router.post('/', createSimulacionFlujoPasajeros);
router.put('/:id', updateSimulacionFlujoPasajeros);
router.delete('/:id', deleteSimulacionFlujoPasajeros);

module.exports = router;