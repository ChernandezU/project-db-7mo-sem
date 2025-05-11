//servicio para la gestion de .....
const oracledb = require('oracledb');
const { getConnection } = require('../../config/db');

exports.getAllCheckIns = async () => {
  const connection = await getConnection();
  const result = await connection.execute(`SELECT * FROM CHECKIN`);
  await connection.close();
  return result.rows;
};

exports.getCheckInById = async (id) => {
  const connection = await getConnection();
  const result = await connection.execute(
    `SELECT * FROM CHECKIN WHERE ID_CHECKIN = :id`,
    [id]
  );
  await connection.close();
  return result.rows[0];
};

exports.createCheckIn = async (data) => {
  const { id_reserva, pasaporte, fecha_checkin, terminal } = data;

  const connection = await getConnection();
  await connection.execute(
    `INSERT INTO CHECKIN (ID_RESERVA, PASAPORTE, FECHA_CHECKIN, TERMINAL) 
    VALUES (:id_reserva, :pasaporte, :fecha_checkin, :terminal)`,
    { id_reserva, pasaporte, fecha_checkin, terminal },
    { autoCommit: true }
  );
  await connection.close();
  return { message: 'Check-in creado correctamente' };
};

exports.updateCheckIn = async (id, data) => {
  const { id_reserva, pasaporte, fecha_checkin, terminal } = data;

  const connection = await getConnection();
  await connection.execute(
    `UPDATE CHECKIN SET ID_RESERVA = :id_reserva, PASAPORTE = :pasaporte, 
    FECHA_CHECKIN = :fecha_checkin, TERMINAL = :terminal 
    WHERE ID_CHECKIN = :id`,
    { id_reserva, pasaporte, fecha_checkin, terminal, id },
    { autoCommit: true }
  );
  await connection.close();
  return { message: 'Check-in actualizado correctamente' };
};

exports.deleteCheckIn = async (id) => {
  const connection = await getConnection();
  await connection.execute(
    `DELETE FROM CHECKIN WHERE ID_CHECKIN = :id`,
    [id],
    { autoCommit: true }
  );
  await connection.close();
  return { message: 'Check-in eliminado correctamente' };
};