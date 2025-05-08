//aquí está la logica de cada endpoint
const usuariosService = require('../services/usuariosService');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const formData = require("form-data");
const Mailgun = require("mailgun.js");
const mailgun = new Mailgun(formData);
const recoveryTokens = new Map(); // 📌 Guardará los tokens temporalmente 

const mg = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_API_KEY
});

//funcion para obtener perfil
exports.getPerfil = async (req, res, next) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ message: "No autorizado, token inválido." });
    }

    console.log("🔍 Buscando perfil para userId:", userId);

    const user = await usuariosService.getUsuarioById(userId);
    console.log("✅ Usuario obtenido:", user); // 👀 Verificar qué devuelve la consulta

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    // 📌 Asegurar que la respuesta se envía correctamente
    res.json({
      id_usuario: user[0],  // 📌 Accede correctamente al array
      nombre: user[1],
      correo: user[2],
      tipo_usuario: user[3]
    });


  } catch (err) {
    console.error("❌ Error obteniendo perfil:", err);
    res.status(500).json({ message: "Error interno.", error: err.message });
  }
};

// Función para registrar usuario
exports.registerUsuario = async (req, res, next) => {
  try {
    console.log("Datos recibidos",req.body);
    const { nombre, correo, contrasena, tipo_usuario } = req.body;
    const hashedPassword = await bcrypt.hash(contrasena, 10);
    const result = await usuariosService.createUsuario({ nombre, correo, contrasena: hashedPassword, tipo_usuario });
    res.status(201).json({ message: 'Usuario registrado correctamente' });
  } catch (err) {
    next(err);
  }
};

// Función para login
exports.loginUsuario = async (req, res, next) => {
  try {
    const { correo, contrasena } = req.body;
    console.log("Buscando usuario: ", correo);

    const user = await usuariosService.getUsuarioByCorreo(correo);
    console.log("Usuario encontrado: ", user);

    if (!user) {
      return res.status(400).json({ message: 'Usuario no encontrado' });
    }

    console.log(" Hash guardado en BD:", user.contrasena);
    console.log(" Contraseña ingresada:", contrasena);

    // Intentar comparación
    if (!user.contrasena) {
      console.error("❌ Error: Hash de contraseña no encontrado en BD.");
      return res.status(400).json({ message: 'Error interno: No se encontró la contraseña en la BD' });
    }

    const isPasswordValid = await bcrypt.compare(contrasena, user.contrasena);
    console.log("comparacion de contraseña",isPasswordValid);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Contraseña incorrecta' });
    }

    const token = jwt.sign(
      { userId: user.id_usuario, tipo_usuario: user.tipo_usuario },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    console.log("✅ Token generado:", token);  // 👀 Verificar que el token no es undefined

    res.json({ token }); 
    console.log("✅ Token respuesta:", token);
 // 📌 Enviar el token en la respuesta
  } catch (err) {
    console.error("❌ Error en login:", err);
    next(err);
  }
};



// Función para recuperar contraseña
exports.updateContrasena = async (req, res) => {
  try {
    const { correo, nueva_contrasena } = req.body;

    const user = await usuariosService.getUsuarioByCorreo(correo);
    if (!user) return res.status(400).json({ message: "Usuario no encontrado" });

    const hashedPassword = await bcrypt.hash(nueva_contrasena, 10);
    await usuariosService.updateContrasena(user.id_usuario, hashedPassword);

    res.json({ message: "Contraseña actualizada correctamente" });
  } catch (err) {
    console.error("❌ Error actualizando contraseña:", err);
    res.status(500).json({ message: "Error interno." });
  }
};

// Función para restablecer contraseña con token
exports.resetPasswordWithToken = async (req, res) => {
  try {
    const { correo, recoveryToken, nueva_contrasena } = req.body;

    const user = await usuariosService.getUsuarioByCorreo(correo);
    if (!user) return res.status(400).json({ message: "Usuario no encontrado" });

    // 📌 Validar el token desde memoria en lugar de la BD
    const storedToken = recoveryTokens.get(user.id_usuario);
    if (!storedToken || storedToken !== recoveryToken) {
      return res.status(401).json({ message: "Token inválido o expirado" });
    }

    // Cifrar nueva contraseña
    const hashedPassword = await bcrypt.hash(nueva_contrasena, 10);
    await usuariosService.updateContrasena(user.id_usuario, hashedPassword);

    // 📌 Eliminar el token después de su uso
    recoveryTokens.delete(user.id_usuario);

    res.json({ message: "Contraseña actualizada correctamente" });
  } catch (err) {
    console.error("❌ Error restableciendo contraseña:", err);
    res.status(500).json({ message: "Error interno." });
  }
};