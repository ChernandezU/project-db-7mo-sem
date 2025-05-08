const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Obtener el token
    if (!token) {
      return res.status(401).json({ message: "No autorizado, falta el token." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "SECRET_KEY");
    req.user = decoded; // Guardar datos del usuario en `req.user`
    next();
  } catch (err) {
    console.error("❌ Error en autenticación:", err.message);
    return res.status(401).json({ message: "Token inválido o expirado." });
  }
};