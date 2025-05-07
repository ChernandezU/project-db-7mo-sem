//servicio para la gestion de .....
const oracledb = require('oracledb');
const { getConnection } = require('../../config/db');

exports.getAllInformacion = async () => {
  const connection = await getConnection();
  const result = await connection.execute(`SELECT * FROM GESTION_INFORMACION`);
  await connection.close();
  return result.rows;
};

exports.getInformacionById = async (id) => {
  const connection = await getConnection();
  const result = await connection.execute(
    `SELECT * FROM GESTION_INFORMACION WHERE ID_INFO = :id`,
    [id]
  );
  await connection.close();
  return result.rows[0];
};

exports.createInformacion = async (data) => {
  const { ID_USUARIO, TIPO_INFO, DESCRIPCION, FECHA_REGISTRO, ESTADO } = data;

  const connection = await getConnection();
  await connection.execute(
    `INSERT INTO GESTION_INFORMACION (
      ID_USUARIO, TIPO_INFO, DESCRIPCION, FECHA_REGISTRO, ESTADO
    ) VALUES (
      :ID_USUARIO, :TIPO_INFO, :DESCRIPCION, :FECHA_REGISTRO, :ESTADO
    )`,
    { ID_USUARIO, TIPO_INFO, DESCRIPCION, FECHA_REGISTRO, ESTADO },
    { autoCommit: true }
  );
  await connection.close();
  return { message: 'Información registrada correctamente' };
};

exports.updateInformacion = async (id, data) => {
  const connection = await getConnection();
  await connection.execute(
    `UPDATE GESTION_INFORMACION SET
      ID_USUARIO = :ID_USUARIO,
      TIPO_INFO = :TIPO_INFO,
      DESCRIPCION = :DESCRIPCION,
      FECHA_REGISTRO = :FECHA_REGISTRO,
      ESTADO = :ESTADO
    WHERE ID_INFO = :ID_INFO`,
    { ...data, ID_INFO: id },
    { autoCommit: true }
  );
  await connection.close();
  return { message: 'Información actualizada correctamente' };
};

exports.deleteInformacion = async (id) => {
  const connection = await getConnection();
  await connection.execute(
    `DELETE FROM GESTION_INFORMACION WHERE ID_INFO = :id`,
    [id],
    { autoCommit: true }
  );
  await connection.close();
  return { message: 'Información eliminada correctamente' };
};
