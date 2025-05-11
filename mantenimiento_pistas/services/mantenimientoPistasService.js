//servicio para la gestion de .....
const oracledb = require('oracledb');
const { getConnection } = require('../../config/db');

exports.getAllMantenimientosPistas = async () => {
  const connection = await getConnection();
  const result = await connection.execute(`SELECT * FROM MANTENIMIENTO_PISTAS`);
  await connection.close();
  return result.rows;
};

exports.getMantenimientoPistaById = async (id) => {
  const connection = await getConnection();
  const result = await connection.execute(
    `SELECT * FROM MANTENIMIENTO_PISTAS WHERE ID_MANTENIMIENTO_PISTA = :id`,
    [id]
  );
  await connection.close();
  return result.rows[0];
};

exports.createMantenimientoPista = async (data) => {
  const { id_pista, fecha_mantenimiento, descripcion, estado } = data;

  const connection = await getConnection();
  await connection.execute(
    `INSERT INTO MANTENIMIENTO_PISTAS (ID_PISTA, FECHA_MANTENIMIENTO, DESCRIPCION, ESTADO) 
    VALUES (:id_pista, :fecha_mantenimiento, :descripcion, :estado)`,
    { id_pista, fecha_mantenimiento, descripcion, estado },
    { autoCommit: true }
  );
  await connection.close();
  return { message: 'Mantenimiento de pista creado correctamente' };
};

exports.updateMantenimientoPista = async (id, data) => {
  const { id_pista, fecha_mantenimiento, descripcion, estado } = data;

  const connection = await getConnection();
  await connection.execute(
    `UPDATE MANTENIMIENTO_PISTAS SET ID_PISTA = :id_pista, FECHA_MANTENIMIENTO = :fecha_mantenimiento, 
    DESCRIPCION = :descripcion, ESTADO = :estado 
    WHERE ID_MANTENIMIENTO_PISTA = :id`,
    { id_pista, fecha_mantenimiento, descripcion, estado, id },
    { autoCommit: true }
  );
  await connection.close();
  return { message: 'Mantenimiento de pista actualizado correctamente' };
};

exports.deleteMantenimientoPista = async (id) => {
  const connection = await getConnection();
  await connection.execute(
    `DELETE FROM MANTENIMIENTO_PISTAS WHERE ID_MANTENIMIENTO_PISTA = :id`,
    [id],
    { autoCommit: true }
  );
  await connection.close();
  return { message: 'Mantenimiento de pista eliminado correctamente' };
};
