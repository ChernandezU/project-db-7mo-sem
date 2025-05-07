//servicio para la gestion de .....
const oracledb = require('oracledb');
const { getConnection } = require('../../config/db');

exports.getAllOperaciones = async () => {
  const connection = await getConnection();
  const result = await connection.execute(`SELECT * FROM OPERACIONES_TERRESTRES`);
  await connection.close();
  return result.rows;
};

exports.getOperacionById = async (id) => {
  const connection = await getConnection();
  const result = await connection.execute(
    `SELECT * FROM OPERACIONES_TERRESTRES WHERE ID_OPERACION_TERRESTRE = :id`,
    [id]
  );
  await connection.close();
  return result.rows[0];
};

exports.createOperacion = async (data) => {
  const { id_aeropuerto, descripcion, fecha_operacion } = data;

  const connection = await getConnection();
  await connection.execute(
    `INSERT INTO OPERACIONES_TERRESTRES (
      ID_AEROPUERTO, DESCRIPCION, FECHA_OPERACION
    ) VALUES (
      :id_aeropuerto, :descripcion, :fecha_operacion
    )`,
    { id_aeropuerto, descripcion, fecha_operacion },
    { autoCommit: true }
  );
  await connection.close();
  return { message: 'Operación terrestre registrada correctamente' };
};

exports.updateOperacion = async (id, data) => {
  const { id_aeropuerto, descripcion, fecha_operacion } = data;

  const connection = await getConnection();
  await connection.execute(
    `UPDATE OPERACIONES_TERRESTRES SET
      ID_AEROPUERTO = :id_aeropuerto,
      DESCRIPCION = :descripcion,
      FECHA_OPERACION = :fecha_operacion
    WHERE ID_OPERACION_TERRESTRE = :id`,
    { id_aeropuerto, descripcion, fecha_operacion, id },
    { autoCommit: true }
  );
  await connection.close();
  return { message: 'Operación terrestre actualizada correctamente' };
};

exports.deleteOperacion = async (id) => {
  const connection = await getConnection();
  await connection.execute(
    `DELETE FROM OPERACIONES_TERRESTRES WHERE ID_OPERACION_TERRESTRE = :id`,
    [id],
    { autoCommit: true }
  );
  await connection.close();
  return { message: 'Operación terrestre eliminada correctamente' };
};
