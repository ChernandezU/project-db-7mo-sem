//servicio para la gestion de .....
const oracledb = require('oracledb');
const { getConnection } = require('../../config/db');

exports.getAllMantenimientos = async () => {
  const connection = await getConnection();
  const result = await connection.execute(`SELECT * FROM MANTENIMIENTO`);
  await connection.close();
  return result.rows;
};

exports.getMantenimientoById = async (id) => {
  const connection = await getConnection();
  const result = await connection.execute(
    `SELECT * FROM MANTENIMIENTO WHERE ID_MANTENIMIENTO = :id`,
    [id]
  );
  await connection.close();
  return result.rows[0];
};

exports.createMantenimiento = async (data) => {
  const {
    ID_AVION,
    FECHA_INICIO,
    FECHA_FIN,
    DESCRIPCION,
    TIPO_MANTENIMIENTO,
    ESTADO
  } = data;

  const connection = await getConnection();
  await connection.execute(
    `INSERT INTO MANTENIMIENTO (
      ID_AVION, FECHA_INICIO, FECHA_FIN, DESCRIPCION, TIPO_MANTENIMIENTO, ESTADO
    ) VALUES (
      :ID_AVION, :FECHA_INICIO, :FECHA_FIN, :DESCRIPCION, :TIPO_MANTENIMIENTO, :ESTADO
    )`,
    {
      ID_AVION,
      FECHA_INICIO,
      FECHA_FIN,
      DESCRIPCION,
      TIPO_MANTENIMIENTO,
      ESTADO
    },
    { autoCommit: true }
  );
  await connection.close();
  return { message: 'Mantenimiento creado correctamente' };
};

exports.updateMantenimiento = async (id, data) => {
  const connection = await getConnection();
  await connection.execute(
    `UPDATE MANTENIMIENTO SET
      ID_AVION = :ID_AVION,
      FECHA_INICIO = :FECHA_INICIO,
      FECHA_FIN = :FECHA_FIN,
      DESCRIPCION = :DESCRIPCION,
      TIPO_MANTENIMIENTO = :TIPO_MANTENIMIENTO,
      ESTADO = :ESTADO
    WHERE ID_MANTENIMIENTO = :ID_MANTENIMIENTO`,
    { ...data, ID_MANTENIMIENTO: id },
    { autoCommit: true }
  );
  await connection.close();
  return { message: 'Mantenimiento actualizado correctamente' };
};

exports.deleteMantenimiento = async (id) => {
  const connection = await getConnection();
  await connection.execute(
    `DELETE FROM MANTENIMIENTO WHERE ID_MANTENIMIENTO = :id`,
    [id],
    { autoCommit: true }
  );
  await connection.close();
  return { message: 'Mantenimiento eliminado correctamente' };
};
