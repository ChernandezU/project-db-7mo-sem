//servicio para la gestion de .....
const oracledb = require('oracledb');
const { getConnection } = require('../../config/db');

exports.getAllTransportes = async () => {
  const connection = await getConnection();
  const result = await connection.execute(`SELECT * FROM TRANSPORTE`);
  await connection.close();
  return result.rows;
};

exports.getTransporteById = async (id) => {
  const connection = await getConnection();
  const result = await connection.execute(
    `SELECT * FROM TRANSPORTE WHERE ID_TRANSPORTE = :id`,
    [id]
  );
  await connection.close();
  return result.rows[0];
};

exports.createTransporte = async (data) => {
  const { tipo, capacidad, estado } = data;

  const connection = await getConnection();
  await connection.execute(
    `INSERT INTO TRANSPORTE (TIPO, CAPACIDAD, ESTADO) 
    VALUES (:tipo, :capacidad, :estado)`,
    { tipo, capacidad, estado },
    { autoCommit: true }
  );
  await connection.close();
  return { message: 'Transporte creado correctamente' };
};

exports.updateTransporte = async (id, data) => {
  const { tipo, capacidad, estado } = data;

  const connection = await getConnection();
  await connection.execute(
    `UPDATE TRANSPORTE SET TIPO = :tipo, CAPACIDAD = :capacidad, ESTADO = :estado 
    WHERE ID_TRANSPORTE = :id`,
    { tipo, capacidad, estado, id },
    { autoCommit: true }
  );
  await connection.close();
  return { message: 'Transporte actualizado correctamente' };
};

exports.deleteTransporte = async (id) => {
  const connection = await getConnection();
  await connection.execute(
    `DELETE FROM TRANSPORTE WHERE ID_TRANSPORTE = :id`,
    [id],
    { autoCommit: true }
  );
  await connection.close();
  return { message: 'Transporte eliminado correctamente' };
};
