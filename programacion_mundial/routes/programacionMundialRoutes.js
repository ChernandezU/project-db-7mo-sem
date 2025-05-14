const express = require('express');
const router = express.Router();
const controller = require('../controllers/programacionMundialController');

router.get('/', controller.getAllProgramacionesMundiales);

module.exports = router;
