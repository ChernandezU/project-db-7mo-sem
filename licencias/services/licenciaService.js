//servicio para la gestion de .....
const oracledb = require('oracledb');
const { getConnection } = require('../../config/db');

exports.getAllLicencias = async () => {
  const connection = await getConnection();
  const result = await connection.execute(`SELECT * FROM LICENCIAS`);
  await connection.close();
  return result.rows;
};

exports.getLicenciaById = async (id) => {
  const connection = await getConnection();
  const result = await connection.execute(
    `SELECT * FROM LICENCIAS WHERE ID_LICENCIA = :id`,
    [id]
  );
  await connection.close();
  return result.rows[0];
};

exports.createLicencia = async (data) => {
  const { id_cuenta, descripcion, fecha_inicio, fecha_fin, pagada, monto } = data;

  const connection = await getConnection();
  await connection.execute(
    `INSERT INTO LICENCIAS (ID_CUENTA, DESCRIPCION, FECHA_INICIO, FECHA_FIN, PAGADA, MONTO) 
    VALUES (:id_cuenta, :descripcion, :fecha_inicio, :fecha_fin, :pagada, :monto)`,
    { id_cuenta, descripcion, fecha_inicio, fecha_fin, pagada, monto },
    { autoCommit: true }
  );
  await connection.close();
  return { message: 'Licencia creada correctamente' };
};

exports.updateLicencia = async (id, data) => {
  const { id_cuenta, descripcion, fecha_inicio, fecha_fin, pagada, monto } = data;

  const connection = await getConnection();
  await connection.execute(
    `UPDATE LICENCIAS SET ID_CUENTA = :id_cuenta, DESCRIPCION = :descripcion, 
    FECHA_INICIO = :fecha_inicio, FECHA_FIN = :fecha_fin, PAGADA = :pagada, MONTO = :monto 
    WHERE ID_LICENCIA = :id`,
    { id_cuenta, descripcion, fecha_inicio, fecha_fin, pagada, monto, id },
    { autoCommit: true }
  );
  await connection.close();
  return { message: 'Licencia actualizada correctamente' };
};

exports.deleteLicencia = async (id) => {
  const connection = await getConnection();
  await connection.execute(
    `DELETE FROM LICENCIAS WHERE ID_LICENCIA = :id`,
    [id],
    { autoCommit: true }
  );
  await connection.close();
  return { message: 'Licencia eliminada correctamente' };
};
