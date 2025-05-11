//servicio para la gestion de .....
const oracledb = require('oracledb');
const { getConnection } = require('../../config/db');

exports.getAllVisas = async () => {
  const connection = await getConnection();
  const result = await connection.execute(`SELECT * FROM VISAS`);
  await connection.close();
  return result.rows;
};

exports.getVisaById = async (id) => {
  const connection = await getConnection();
  const result = await connection.execute(
    `SELECT * FROM VISAS WHERE ID_VISA = :id`,
    [id]
  );
  await connection.close();
  return result.rows[0];
};

exports.createVisa = async (data) => {
  const { id_usuario, numero_visa, tipo_visa, fecha_emision, fecha_vencimiento, estado } = data;

  const connection = await getConnection();
  await connection.execute(
    `INSERT INTO VISAS (ID_USUARIO, NUMERO_VISA, TIPO_VISA, FECHA_EMISION, FECHA_VENCIMIENTO, ESTADO) 
    VALUES (:id_usuario, :numero_visa, :tipo_visa, :fecha_emision, :fecha_vencimiento, :estado)`,
    { id_usuario, numero_visa, tipo_visa, fecha_emision, fecha_vencimiento, estado },
    { autoCommit: true }
  );
  await connection.close();
  return { message: 'Visa creada correctamente' };
};

exports.updateVisa = async (id, data) => {
  const { id_usuario, numero_visa, tipo_visa, fecha_emision, fecha_vencimiento, estado } = data;

  const connection = await getConnection();
  await connection.execute(
    `UPDATE VISAS SET ID_USUARIO = :id_usuario, NUMERO_VISA = :numero_visa, 
    TIPO_VISA = :tipo_visa, FECHA_EMISION = :fecha_emision, 
    FECHA_VENCIMIENTO = :fecha_vencimiento, ESTADO = :estado 
    WHERE ID_VISA = :id`,
    { id_usuario, numero_visa, tipo_visa, fecha_emision, fecha_vencimiento, estado, id },
    { autoCommit: true }
  );
  await connection.close();
  return { message: 'Visa actualizada correctamente' };
};

exports.deleteVisa = async (id) => {
  const connection = await getConnection();
  await connection.execute(
    `DELETE FROM VISAS WHERE ID_VISA = :id`,
    [id],
    { autoCommit: true }
  );
  await connection.close();
  return { message: 'Visa eliminada correctamente' };
};
