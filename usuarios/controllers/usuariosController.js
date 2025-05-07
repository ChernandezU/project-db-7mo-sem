//aquí está la logica de cada endpoint
const usuariosService = require('../services/usuariosService');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

// Función para registrar usuario
exports.registerUsuario = async (req, res, next) => {
  try {
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
    const user = await usuariosService.getUsuarioByCorreo(correo);

    if (!user) {
      return res.status(400).json({ message: 'Usuario no encontrado' });
    }

    const isPasswordValid = await bcrypt.compare(contrasena, user.contrasena);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Contraseña incorrecta' });
    }

    const token = jwt.sign({ userId: user.id_usuario, tipo_usuario: user.tipo_usuario }, 'SECRET_KEY', { expiresIn: '1h' });

    res.json({ token });
  } catch (err) {
    next(err);
  }
};

// Función para recuperar contraseña
exports.recoverPassword = async (req, res, next) => {
  try {
    const { correo } = req.body;
    const user = await usuariosService.getUsuarioByCorreo(correo);

    if (!user) {
      return res.status(400).json({ message: 'Usuario no encontrado' });
    }

    // Crear un token de recuperación de contraseña
    const token = jwt.sign({ userId: user.id_usuario }, 'SECRET_KEY', { expiresIn: '15m' });

    // Enviar el correo de recuperación
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'tuemail@gmail.com',
        pass: 'tu_contrasena'
      }
    });

    const mailOptions = {
      from: 'tuemail@gmail.com',
      to: correo,
      subject: 'Recuperación de Contraseña',
      text: `Haz clic en el siguiente enlace para recuperar tu contraseña: http://localhost:3000/api/usuarios/reset-password/${token}`
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: 'Correo de recuperación enviado' });
  } catch (err) {
    next(err);
  }
};

// Función para restablecer contraseña
exports.resetPassword = async (req, res, next) => {
  try {
    const { token, nueva_contrasena } = req.body;
    const decoded = jwt.verify(token, 'SECRET_KEY');
    const hashedPassword = await bcrypt.hash(nueva_contrasena, 10);
    
    const result = await usuariosService.updateContrasena(decoded.userId, hashedPassword);
    
    res.json({ message: 'Contraseña actualizada correctamente' });
  } catch (err) {
    next(err);
  }
};
