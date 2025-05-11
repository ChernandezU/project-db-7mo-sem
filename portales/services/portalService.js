//servicio para la gestion de .....
const oracledb = require('oracledb');
const { getConnection } = require('../../config/db');

exports.getAllPortales = async () => {
  const connection = await getConnection();
  const result = await connection.execute(`SELECT * FROM PORTALES`);
  await connection.close();
  return result.rows;
};

exports.getPortalById = async (id) => {
  const connection = await getConnection();
  const result = await connection.execute(
    `SELECT * FROM PORTALES WHERE ID_PORTAL = :id`,
    [id]
  );
  await connection.close();
  return result.rows[0];
};

exports.createPortal = async (data) => {
  const { nombre, url, activo } = data;

  const connection = await getConnection();
  await connection.execute(
    `INSERT INTO PORTALES (NOMBRE, URL, ACTIVO) VALUES (:nombre, :url, :activo)`,
    { nombre, url, activo },
    { autoCommit: true }
  );
  await connection.close();
  return { message: 'Portal creado correctamente' };
};

exports.updatePortal = async (id, data) => {
  const { nombre, url, activo } = data;

  const connection = await getConnection();
  await connection.execute(
    `UPDATE PORTALES SET NOMBRE = :nombre, URL = :url, ACTIVO = :activo WHERE ID_PORTAL = :id`,
    { nombre, url, activo, id },
    { autoCommit: true }
  );
  await connection.close();
  return { message: 'Portal actualizado correctamente' };
};

exports.deletePortal = async (id) => {
  const connection = await getConnection();
  await connection.execute(
    `DELETE FROM PORTALES WHERE ID_PORTAL = :id`,
    [id],
    { autoCommit: true }
  );
  await connection.close();
  return { message: 'Portal eliminado correctamente' };
};
