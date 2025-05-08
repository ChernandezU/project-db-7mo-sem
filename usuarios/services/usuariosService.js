//servicio para la gestion de .....
const oracledb = require('oracledb');
const { getConnection } = require('../../config/db');

// obtener usuario
exports.getUsuarioById = async (id_usuario) => {
  const connection = await getConnection();
  const result = await connection.execute(
    `SELECT ID_USUARIO, NOMBRE, CORREO, TIPO_USUARIO FROM USUARIOS WHERE ID_USUARIO = :id_usuario`,
    [id_usuario]
  );
  await connection.close();

  console.log("datos obtenidos en BD:",result.rows);

  return result.rows.length > 0 ? result.rows[0] : null;
};


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
    `SELECT ID_USUARIO, NOMBRE, CORREO, CONTRASENA, TIPO_USUARIO FROM USUARIOS WHERE CORREO = :correo`,
    [correo]
  );
  await connection.close();

  console.log("🔍 Resultado BD:", result.rows); // 👀 Verificar qué devuelve la BD

  if (result.rows.length === 0) return null; // Si no hay resultado, devolver null

  // Convertir el array en un objeto correctamente
  const usuarioEncontrado = result.rows[0]; // Devolviendo el resultado sin desestructurar
  return {
    id_usuario: usuarioEncontrado[0],
    nombre: usuarioEncontrado[1],
    correo: usuarioEncontrado[2],
    contrasena: usuarioEncontrado[3],
    tipo_usuario: usuarioEncontrado[4]
  };
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
};