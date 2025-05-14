// Aquí se maneja la lógica de interacción con la base de datos
const oracledb = require('oracledb');
const { getConnection } = require('../../config/db');

exports.getAllProgramacionesMundiales = async () => {
  const connection = await getConnection();
  const result = await connection.execute(`SELECT * FROM PROGRAMACION_MUNDIAL`);
  await connection.close();
  return result.rows;
};
