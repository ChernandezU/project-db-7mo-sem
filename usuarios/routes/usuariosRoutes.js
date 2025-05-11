const express = require('express');
const router = express.Router();
const controller = require('../controllers/usuariosController');

// Ruta para registrar usuario
router.post('/register', controller.registerUsuario);

// Ruta para login de usuario
router.post('/login', controller.loginUsuario);

module.exports = router;