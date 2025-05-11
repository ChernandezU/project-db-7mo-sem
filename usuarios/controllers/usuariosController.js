const usuariosService = require('../services/usuariosService');

exports.registerUsuario = async (req, res, next) => {
  try {
    const { nombre, correo, contrasena, tipo_usuario } = req.body;

    if (!['admin', 'cliente', 'staff'].includes(tipo_usuario)) {
      return res.status(400).json({ message: "Tipo de usuario inválido." });
    }

    const result = await usuariosService.createUsuario({ nombre, correo, contrasena, tipo_usuario });
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};



exports.loginUsuario = async (req, res, next) => {
  try {
    const { correo, contrasena } = req.body;
    const result = await usuariosService.loginUsuario(correo, contrasena);
    res.json({ token: result.token, usuario: result.usuario });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};