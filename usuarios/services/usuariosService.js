//servicio para la gestion de .....
const oracledb = require('oracledb');
const { getConnection } = require('../../config/db');

// Crear usuario
exports.createUsuario = async (data) => {
  const { nombre, correo, contrasena, tipo_usuario } = data;

  const connection = await getConnection();
  await connection.execute(
    `INSERT INTO USUARIOS (NOMBRE, CORREO, CONTRASENA, TIPO_USUARIO) VALUES (:nombre, :correo, :contrasena, :tipo_usuario)`,
    { nombre, correo, contrasena, tipo_usuario },
    { autoCommit: true }
  );
  await connection.close();
  return { message: 'Usuario registrado correctamente' };
};

// Obtener usuario por correo
exports.getUsuarioByCorreo = async (correo) => {
  const connection = await getConnection();
  const result = await connection.execute(
    `SELECT * FROM USUARIOS WHERE CORREO = :correo`,
    [correo]
  );
  await connection.close();
  return result.rows[0];
};

// Actualizar contraseña
exports.updateContrasena = async (id_usuario, nueva_contrasena) => {
  const connection = await getConnection();
  await connection.execute(
    `UPDATE USUARIOS SET CONTRASENA = :nueva_contrasena WHERE ID_USUARIO = :id_usuario`,
    { nueva_contrasena, id_usuario },
    { autoCommit: true }
  );
  await connection.close();
  return { message: 'Contraseña actualizada correctamente' };
};
