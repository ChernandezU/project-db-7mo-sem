//servicio para la gestion de .....
const oracledb = require('oracledb');
const { getConnection } = require('../../config/db');

exports.getAllPistas = async () => {
  const connection = await getConnection();
  const result = await connection.execute(`SELECT * FROM PISTAS`);
  await connection.close();
  return result.rows;
};

exports.getPistaById = async (id) => {
  const connection = await getConnection();
  const result = await connection.execute(
    `SELECT * FROM PISTAS WHERE ID_PISTA = :id`,
    [id]
  );
  await connection.close();
  return result.rows[0];
};

exports.createPista = async (data) => {
  const { nombre, estado, longitud, ancho } = data;

  const connection = await getConnection();
  await connection.execute(
    `INSERT INTO PISTAS (NOMBRE, ESTADO, LONGITUD, ANCHO) 
    VALUES (:nombre, :estado, :longitud, :ancho)`,
    { nombre, estado, longitud, ancho },
    { autoCommit: true }
  );
  await connection.close();
  return { message: 'Pista creada correctamente' };
};

exports.updatePista = async (id, data) => {
  const { nombre, estado, longitud, ancho } = data;

  const connection = await getConnection();
  await connection.execute(
    `UPDATE PISTAS SET NOMBRE = :nombre, ESTADO = :estado, 
    LONGITUD = :longitud, ANCHO = :ancho 
    WHERE ID_PISTA = :id`,
    { nombre, estado, longitud, ancho, id },
    { autoCommit: true }
  );
  await connection.close();
  return { message: 'Pista actualizada correctamente' };
};

exports.deletePista = async (id) => {
  const connection = await getConnection();
  await connection.execute(
    `DELETE FROM PISTAS WHERE ID_PISTA = :id`,
    [id],
    { autoCommit: true }
  );
  await connection.close();
  return { message: 'Pista eliminada correctamente' };
};
