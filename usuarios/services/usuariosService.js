//servicio para la gestion de .....
const { getConnection } = require('../../config/db');

const getUsuarios = async () => {
  const conn = await getConnection();
  const result = await conn.execute(`SELECT id_usuario, nombre, correo, tipo_usuario FROM Usuarios`);
  await conn.close();
  return result.rows;
};

const getUsuarioById = async (id) => {
  const conn = await getConnection();
  const result = await conn.execute(
    `SELECT id_usuario, nombre, correo, tipo_usuario FROM Usuarios WHERE id_usuario = :id`,
    [id]
  );
  await conn.close();
  return result.rows[0];
};

const createUsuario = async ({ nombre, correo, contrasena, tipo_usuario }) => {
  const conn = await getConnection();
  await conn.execute(
    `INSERT INTO Usuarios (nombre, correo, contrasena, tipo_usuario) VALUES (:nombre, :correo, :contrasena, :tipo_usuario)`,
    { nombre, correo, contrasena, tipo_usuario },
    { autoCommit: true }
  );
  await conn.close();
  return { message: 'Usuario creado exitosamente' };
};

const updateUsuario = async (id, { nombre, correo, contrasena, tipo_usuario }) => {
  const conn = await getConnection();
  await conn.execute(
    `UPDATE Usuarios SET nombre = :nombre, correo = :correo, contrasena = :contrasena, tipo_usuario = :tipo_usuario WHERE id_usuario = :id`,
    { nombre, correo, contrasena, tipo_usuario, id },
    { autoCommit: true }
  );
  await conn.close();
  return { message: 'Usuario actualizado correctamente' };
};

const deleteUsuario = async (id) => {
  const conn = await getConnection();
  await conn.execute(
    `DELETE FROM Usuarios WHERE id_usuario = :id`,
    { id },
    { autoCommit: true }
  );
  await conn.close();
  return { message: 'Usuario eliminado exitosamente' };
};

module.exports = {
  getUsuarios,
  getUsuarioById,
  createUsuario,
  updateUsuario,
  deleteUsuario
};
