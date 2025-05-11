//servicio para la gestion de .....
const oracledb = require('oracledb');
const { getConnection } = require('../../config/db');

exports.getAllCuentas = async () => {
  const connection = await getConnection();
  const result = await connection.execute(`SELECT * FROM CUENTAS`);
  await connection.close();
  return result.rows;
};

exports.getCuentaById = async (id) => {
  const connection = await getConnection();
  const result = await connection.execute(
    `SELECT * FROM CUENTAS WHERE ID_CUENTA = :id`,
    [id]
  );
  await connection.close();
  return result.rows[0];
};

exports.createCuenta = async (data) => {
  const { id_usuario, tipo_cuenta, saldo, estado } = data;

  const connection = await getConnection();
  await connection.execute(
    `INSERT INTO CUENTAS (ID_USUARIO, TIPO_CUENTA, SALDO, ESTADO) 
    VALUES (:id_usuario, :tipo_cuenta, :saldo, :estado)`,
    { id_usuario, tipo_cuenta, saldo, estado },
    { autoCommit: true }
  );
  await connection.close();
  return { message: 'Cuenta creada correctamente' };
};

exports.updateCuenta = async (id, data) => {
  const { id_usuario, tipo_cuenta, saldo, estado } = data;

  const connection = await getConnection();
  await connection.execute(
    `UPDATE CUENTAS SET ID_USUARIO = :id_usuario, TIPO_CUENTA = :tipo_cuenta, 
    SALDO = :saldo, ESTADO = :estado 
    WHERE ID_CUENTA = :id`,
    { id_usuario, tipo_cuenta, saldo, estado, id },
    { autoCommit: true }
  );
  await connection.close();
  return { message: 'Cuenta actualizada correctamente' };
};

exports.deleteCuenta = async (id) => {
  const connection = await getConnection();
  await connection.execute(
    `DELETE FROM CUENTAS WHERE ID_CUENTA = :id`,
    [id],
    { autoCommit: true }
  );
  await connection.close();
  return { message: 'Cuenta eliminada correctamente' };
};
