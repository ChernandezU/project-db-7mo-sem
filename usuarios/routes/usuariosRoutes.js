//Aquí se recibe la petición del usuario y se llama a los servicios. Controlas qué se envía como respuesta.
const express = require('express');
const router = express.Router();
const controller = require('../controllers/usuariosController');


// Ruta para registrar usuario
router.post('/register', controller.registerUsuario);

// Ruta para obtener el perfil
router.get('/perfil', controller.getPerfil);

// Ruta para login de usuario
router.post('/login', controller.loginUsuario);

// Ruta para recuperar contraseña
router.put('/update-password', controller.updateContrasena); // Sin autenticación

// Ruta para restablecer contraseña
router.post('/reset-password', controller.resetPasswordWithToken);

module.exports = router;
