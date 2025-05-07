
// Aquí se maneja la lógica de interacción con la base de datos
const oracledb = require('oracledb');
const { getConnection } = require('../../config/db');

exports.getAllOperaciones = async () => {
  const connection = await getConnection();
  const result = await connection.execute(`SELECT * FROM OPERACIONES_AEREAS`);
  await connection.close();
  return result.rows;
};

exports.getOperacionById = async (id) => {
  const connection = await getConnection();
  const result = await connection.execute(
    `SELECT * FROM OPERACIONES_AEREAS WHERE ID_OPERACION_AEREA = :id`,
    [id]
  );
  await connection.close();
  return result.rows[0];
};

exports.createOperacion = async (data) => {
  const { id_vuelo, descripcion, fecha_operacion } = data;

  const connection = await getConnection();
  await connection.execute(
    `INSERT INTO OPERACIONES_AEREAS (
      ID_VUELO, DESCRIPCION, FECHA_OPERACION
    ) VALUES (
      :id_vuelo, :descripcion, :fecha_operacion
    )`,
    { id_vuelo, descripcion, fecha_operacion },
    { autoCommit: true }
  );
  await connection.close();
  return { message: 'Operación aérea registrada correctamente' };
};

exports.updateOperacion = async (id, data) => {
  const { id_vuelo, descripcion, fecha_operacion } = data;

  const connection = await getConnection();
  await connection.execute(
    `UPDATE OPERACIONES_AEREAS SET
      ID_VUELO = :id_vuelo,
      DESCRIPCION = :descripcion,
      FECHA_OPERACION = :fecha_operacion
    WHERE ID_OPERACION_AEREA = :id`,
    { id_vuelo, descripcion, fecha_operacion, id },
    { autoCommit: true }
  );
  await connection.close();
  return { message: 'Operación aérea actualizada correctamente' };
};

exports.deleteOperacion = async (id) => {
  const connection = await getConnection();
  await connection.execute(
    `DELETE FROM OPERACIONES_AEREAS WHERE ID_OPERACION_AEREA = :id`,
    [id],
    { autoCommit: true }
  );
  await connection.close();
  return { message: 'Operación aérea eliminada correctamente' };
};
