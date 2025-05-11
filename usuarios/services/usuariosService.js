const oracledb = require('oracledb');
const { getConnection } = require('../../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SALT_ROUNDS = 10;
const SECRET_KEY = process.env.JWT_SECRET;

// Registrar usuario sin `ESTADO`
exports.createUsuario = async (data) => {
  const { nombre, correo, contrasena, tipo_usuario } = data;
  const connection = await getConnection();

  // Validar que el correo no exista
  const correoExistente = await connection.execute(
    `SELECT COUNT(*) AS total FROM USUARIOS WHERE CORREO = :correo`,
    [correo]
  );

  if (correoExistente.rows[0].TOTAL > 0) {
    throw new Error('El correo ya está registrado.');
  }
// Hash de la contraseña antes de guardarla
  const hash = await bcrypt.hash(contrasena, SALT_ROUNDS);

  try {
    await connection.execute(
      `INSERT INTO USUARIOS (NOMBRE, CORREO, CONTRASENA, TIPO_USUARIO) 
       VALUES (:nombre, :correo, :contrasena, :tipo_usuario)`,
      { nombre, correo, contrasena: hash, tipo_usuario }
    );

    await connection.execute('COMMIT');
  } catch (err) {
    await connection.execute('ROLLBACK');
    throw err;
  }

  await connection.close();
  return { message: 'Usuario registrado correctamente' };
};



// Login con validación de usuario activo e inicio de sesión seguro
exports.loginUsuario = async (correo, contrasena) => {
  const connection = await getConnection();
  const result = await connection.execute(
    `SELECT ID_USUARIO, NOMBRE, CORREO, CONTRASENA, TIPO_USUARIO
     FROM USUARIOS WHERE CORREO = :correo`,
    [correo]
  );

  await connection.close();

  if (result.rows.length === 0) {
    throw new Error('Usuario no encontrado.');
  }

  const usuario = result.rows[0];

  if (usuario[5] === 'inactivo') {
    throw new Error('Usuario inactivo, no puede iniciar sesión.');
  }

  // Verificar la contraseña
  const match = await bcrypt.compare(contrasena, usuario[3]);
  if (!match) {
    throw new Error('Contraseña incorrecta.');
  }

  // Generar el token JWT
  const token = jwt.sign(
    { id_usuario: usuario[0], tipo_usuario: usuario[4] },
    SECRET_KEY,
    { expiresIn: '1h' }
  );

  return { token, usuario: { id_usuario: usuario[0], nombre: usuario[1], correo: usuario[2], tipo_usuario: usuario[4] } };
};