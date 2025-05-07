//servicio para la gestion de .....
const oracledb = require('oracledb');
const { getConnection } = require('../../config/db');

exports.getAllReservas = async () => {
  const connection = await getConnection();
  const result = await connection.execute(`SELECT * FROM RESERVAS`);
  await connection.close();
  return result.rows;
};

exports.getReservaById = async (id) => {
  const connection = await getConnection();
  const result = await connection.execute(
    `SELECT * FROM RESERVAS WHERE ID_RESERVA = :id`,
    [id]
  );
  await connection.close();
  return result.rows[0];
};

exports.createReserva = async (data) => {
  const { id_usuario, id_vuelo, asiento, estado_reserva, fecha_reserva } = data;

  const connection = await getConnection();
  await connection.execute(
    `INSERT INTO RESERVAS (
      ID_USUARIO, ID_VUELO, ASIENTO, ESTADO_RESERVA, FECHA_RESERVA
    ) VALUES (
      :id_usuario, :id_vuelo, :asiento, :estado_reserva, :fecha_reserva
    )`,
    { id_usuario, id_vuelo, asiento, estado_reserva, fecha_reserva },
    { autoCommit: true }
  );
  await connection.close();
  return { message: 'Reserva creada correctamente' };
};

exports.updateReserva = async (id, data) => {
  const { id_usuario, id_vuelo, asiento, estado_reserva, fecha_reserva } = data;

  const connection = await getConnection();
  await connection.execute(
    `UPDATE RESERVAS SET
      ID_USUARIO = :id_usuario,
      ID_VUELO = :id_vuelo,
      ASIENTO = :asiento,
      ESTADO_RESERVA = :estado_reserva,
      FECHA_RESERVA = :fecha_reserva
    WHERE ID_RESERVA = :id`,
    { id_usuario, id_vuelo, asiento, estado_reserva, fecha_reserva, id },
    { autoCommit: true }
  );
  await connection.close();
  return { message: 'Reserva actualizada correctamente' };
};

exports.deleteReserva = async (id) => {
  const connection = await getConnection();
  await connection.execute(
    `DELETE FROM RESERVAS WHERE ID_RESERVA = :id`,
    [id],
    { autoCommit: true }
  );
  await connection.close();
  return { message: 'Reserva eliminada correctamente' };
};
