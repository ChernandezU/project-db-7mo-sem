//Aquí se recibe la petición del usuario y se llama a los servicios. Controlas qué se envía como respuesta.
const express = require('express');
const router = express.Router();
const controller = require('../controllers/usuariosController');

// Ruta para registrar usuario
router.post('/register', controller.registerUsuario);

// Ruta para login de usuario
router.post('/login', controller.loginUsuario);

// Ruta para recuperar contraseña
router.post('/recover-password', controller.recoverPassword);

// Ruta para restablecer contraseña
router.post('/reset-password', controller.resetPassword);

module.exports = router;
