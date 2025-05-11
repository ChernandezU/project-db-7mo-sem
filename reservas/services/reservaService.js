const oracledb = require('oracledb');
const { getConnection } = require('../../config/db');

// Obtener todas las reservas con concurrencia optimizada
exports.getAllReservas = async () => {
  const connection = await getConnection();
  const result = await connection.execute(
    `SELECT * FROM RESERVAS ORDER BY FECHA_RESERVA FOR UPDATE SKIP LOCKED`
  );
  await connection.close();
  return result.rows;
};

// Obtener una reserva específica con bloqueo seguro
exports.getReservaById = async (id) => {
  const connection = await getConnection();
  const result = await connection.execute(
    `SELECT * FROM RESERVAS WHERE ID_RESERVA = :id FOR UPDATE NOWAIT`,
    [id]
  );
  await connection.close();
  return result.rows[0];
};

// Crear reserva asegurando validaciones y evitando ventas en vuelos cancelados
exports.createReserva = async (data) => {
  const { id_usuario, id_vuelo, asiento, modalidad_venta, id_portal, id_visa, pasaporte, estado_reserva, fecha_reserva } = data;
  const connection = await getConnection();

  const estadoVuelo = await connection.execute(
    `SELECT estado FROM VUELOS WHERE ID_VUELO = :id_vuelo`,
    [id_vuelo]
  );

  if (estadoVuelo.rows[0].ESTADO === 'cancelado') {
    throw new Error('No se puede reservar en un vuelo cancelado.');
  }

  const reservaExistente = await connection.execute(
    `SELECT COUNT(*) AS total FROM RESERVAS WHERE ID_USUARIO = :id_usuario AND ID_VUELO = :id_vuelo`,
    { id_usuario, id_vuelo }
  );

  if (reservaExistente.rows[0].TOTAL > 0) {
    throw new Error('No puedes reservar más de un asiento en el mismo vuelo.');
  }

  try {
    await connection.execute(
      `INSERT INTO RESERVAS (ID_RESERVA, ID_USUARIO, ID_VUELO, ASIENTO, ESTADO_RESERVA, FECHA_RESERVA, MODALIDAD_VENTA, ID_PORTAL, ID_VISA, PASAPORTE, CHECKIN_STATUS)
       VALUES (seq_reservas.NEXTVAL, :id_usuario, :id_vuelo, :asiento, :estado_reserva, :fecha_reserva, :modalidad_venta, :id_portal, :id_visa, :pasaporte, 'pendiente')`,
      { id_usuario, id_vuelo, asiento, estado_reserva, fecha_reserva, modalidad_venta, id_portal, id_visa, pasaporte }
    );

    await connection.execute('COMMIT');
  } catch (err) {
    await connection.execute('ROLLBACK');
    throw err;
  }

  await connection.close();
  return { message: 'Reserva creada correctamente' };
};

// Actualizar reserva con validaciones de check-in
exports.updateReserva = async (id, data) => {
  const connection = await getConnection();

  try {
    await connection.execute('BEGIN');

    const result = await connection.execute(
      `UPDATE RESERVAS SET ASIENTO = :asiento, CHECKIN_STATUS = :checkin_status
       WHERE ID_RESERVA = :id`,
      { asiento: data.asiento, checkin_status: data.checkin_status, id }
    );

    if (result.rowsAffected === 0) {
      throw new Error('La reserva no pudo actualizarse. Verifica los datos e intenta nuevamente.');
    }

    await connection.execute('COMMIT');
  } catch (err) {
    await connection.execute('ROLLBACK');
    throw err;
  }

  await connection.close();
  return { message: 'Reserva actualizada correctamente' };
};

// Eliminar reserva asegurando control transaccional
exports.deleteReserva = async (id) => {
  const connection = await getConnection();

  try {
    await connection.execute('BEGIN');
    await connection.execute(`DELETE FROM RESERVAS WHERE ID_RESERVA = :id`, [id]);
    await connection.execute('COMMIT');
  } catch (err) {
    await connection.execute('ROLLBACK');
    throw err;
  }

  await connection.close();
  return { message: 'Reserva eliminada correctamente' };
};