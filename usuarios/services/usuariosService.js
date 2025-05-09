const oracledb = require('oracledb');
const { getConnection } = require('../../config/db');

// Obtener usuario por ID con bloqueo seguro
exports.getUsuarioById = async (id_usuario) => {
  const connection = await getConnection();
  const result = await connection.execute(
    `SELECT ID_USUARIO, NOMBRE, CORREO, TIPO_USUARIO, VERSION 
     FROM USUARIOS WHERE ID_USUARIO = :id_usuario FOR UPDATE SKIP LOCKED`,
    [id_usuario]
  );
  await connection.close();
  return result.rows.length > 0 ? result.rows[0] : null;
};

// Crear usuario con manejo de concurrencia
exports.createUsuario = async (data) => {
  const { nombre, correo, contrasena, tipo_usuario } = data;
  const connection = await getConnection();

  await connection.execute(
    `INSERT INTO USUARIOS (NOMBRE, CORREO, CONTRASENA, TIPO_USUARIO, VERSION) 
     VALUES (:nombre, :correo, :contrasena, :tipo_usuario, 1)`,
    { nombre, correo, contrasena, tipo_usuario }
  );

  await connection.execute('COMMIT');
  await connection.close();
  return { message: 'Usuario registrado correctamente' };
};

// Obtener usuario por correo
exports.getUsuarioByCorreo = async (correo) => {
  const connection = await getConnection();
  const result = await connection.execute(
    `SELECT ID_USUARIO, NOMBRE, CORREO, CONTRASENA, TIPO_USUARIO, VERSION 
     FROM USUARIOS WHERE CORREO = :correo FOR UPDATE SKIP LOCKED`,
    [correo]
  );
  await connection.close();

  if (result.rows.length === 0) return null;

  const usuarioEncontrado = result.rows[0];
  return {
    id_usuario: usuarioEncontrado[0],
    nombre: usuarioEncontrado[1],
    correo: usuarioEncontrado[2],
    contrasena: usuarioEncontrado[3],
    tipo_usuario: usuarioEncontrado[4],
    version: usuarioEncontrado[5]
  };
};

// Actualizar datos con manejo de versiones
exports.updateUsuario = async (id_usuario, data, version_actual) => {
  const connection = await getConnection();

  try {
    await connection.execute('BEGIN');

    const result = await connection.execute(
      `UPDATE USUARIOS SET NOMBRE = :nombre, CORREO = :correo, TIPO_USUARIO = :tipo_usuario, VERSION = VERSION + 1 
       WHERE ID_USUARIO = :id_usuario AND VERSION = :version_actual`,
      { nombre: data.nombre, correo: data.correo, tipo_usuario: data.tipo_usuario, id_usuario, version_actual }
    );

    if (result.rowsAffected === 0) {
      throw new Error('Otro usuario ya modificó este registro. Recarga la página e intenta nuevamente.');
    }

    await connection.execute('COMMIT');
  } catch (err) {
    await connection.execute('ROLLBACK');
    throw err;
  }

  await connection.close();
  return { message: 'Usuario actualizado correctamente' };
};

// Actualizar contraseña con validación de concurrencia
exports.updateContrasena = async (id_usuario, nueva_contrasena, version_actual) => {
  const connection = await getConnection();

  try {
    await connection.execute('BEGIN');

    const result = await connection.execute(
      `UPDATE USUARIOS SET CONTRASENA = :nueva_contrasena, VERSION = VERSION + 1 
       WHERE ID_USUARIO = :id_usuario AND VERSION = :version_actual`,
      { nueva_contrasena, id_usuario, version_actual }
    );

    if (result.rowsAffected === 0) {
      throw new Error('Otro usuario ya modificó este usuario. Recarga la página e intenta nuevamente.');
    }

    await connection.execute('COMMIT');
  } catch (err) {
    await connection.execute('ROLLBACK');
    throw err;
  }

  await connection.close();
  return { message: 'Contraseña actualizada correctamente' };
};