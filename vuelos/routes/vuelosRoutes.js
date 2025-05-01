const express = require('express');
const programasVueloController = require('../controllers/programasVueloController');
const router = express.Router();

router.get('/programas', programasVueloController.getAllProgramas);
router.get('/programas/:id', programasVueloController.getProgramaById);

module.exports = router;
