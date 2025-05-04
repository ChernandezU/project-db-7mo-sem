const oracledb = require('oracledb');
const db = require('../../config/db');

const getAllProgramasVuelo = async () => {
  const connection = await db();
  const result = await connection.execute(`SELECT * FROM PROGRAMAS_VUELO`);
  await connection.close();
  return result.rows;
};

const getProgramaVueloById = async (id) => {
  const connection = await db();
  const result = await connection.execute(
    `SELECT * FROM PROGRAMAS_VUELO WHERE ID_PROGRAMA_VUELO = :id`,
    [id]
  );
  await connection.close();
  return result.rows[0];
};

const createProgramaVuelo = async (data) => {
  const connection = await db();
  const result = await connection.execute(
    `INSERT INTO PROGRAMAS_VUELO (ID_PROGRAMA_VUELO, ID_VUELO, FECHA_HORA_PROGRAMADA, ESTADO)
     VALUES (:id, :idVuelo, :fechaHora, :estado)`,
    [data.id, data.id_vuelo, data.fecha_hora_programada, data.estado],
    { autoCommit: true }
  );
  await connection.close();
  return result;
};

const updateProgramaVuelo = async (id, data) => {
  const connection = await db();
  const result = await connection.execute(
    `UPDATE PROGRAMAS_VUELO
     SET ID_VUELO = :idVuelo, FECHA_HORA_PROGRAMADA = :fechaHora, ESTADO = :estado
     WHERE ID_PROGRAMA_VUELO = :id`,
    [data.id_vuelo, data.fecha_hora_programada, data.estado, id],
    { autoCommit: true }
  );
  await connection.close();
  return result;
};

const deleteProgramaVuelo = async (id) => {
  const connection = await db();
  const result = await connection.execute(
    `DELETE FROM PROGRAMAS_VUELO WHERE ID_PROGRAMA_VUELO = :id`,
    [id],
    { autoCommit: true }
  );
  await connection.close();
  return result;
};

module.exports = {
  getAllProgramasVuelo,
  getProgramaVueloById,
  createProgramaVuelo,
  updateProgramaVuelo,
  deleteProgramaVuelo,
};
