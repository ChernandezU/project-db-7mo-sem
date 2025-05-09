//servicio para la gestion de .....
const oracledb = require('oracledb');
const { getConnection } = require('../../config/db');

// Obtener todas las reservas con bloqueo de lectura (evita problemas de concurrencia)
exports.getAllReservas = async () => {
  const connection = await getConnection();
  const result = await connection.execute(
    `SELECT * FROM RESERVAS ORDER BY FECHA_RESERVA FOR UPDATE SKIP LOCKED`
  );
  await connection.close();
  return result.rows;
};

// Obtener reserva por ID con bloqueo seguro
exports.getReservaById = async (id) => {
  const connection = await getConnection();
  const result = await connection.execute(
    `SELECT * FROM RESERVAS WHERE ID_RESERVA = :id FOR UPDATE NOWAIT`,
    [id]
  );
  await connection.close();
  return result.rows[0];
};

// Crear nueva reserva con validación de estado de vuelo y previniendo duplicados
exports.createReserva = async (data) => {
  const { id_usuario, id_vuelo, asiento, estado_reserva, fecha_reserva } = data;

  const connection = await getConnection();

  // Validar que el vuelo no esté cancelado
  const estadoVuelo = await connection.execute(
    `SELECT estado FROM VUELOS WHERE ID_VUELO = :id_vuelo`,
    [id_vuelo]
  );

  if (estadoVuelo.rows[0].ESTADO === 'cancelado') {
    throw new Error('No se puede reservar en un vuelo cancelado.');
  }

  // Validar que el usuario no tenga ya una reserva en este vuelo
  const reservaExistente = await connection.execute(
    `SELECT COUNT(*) AS total FROM RESERVAS WHERE ID_USUARIO = :id_usuario AND ID_VUELO = :id_vuelo`,
    { id_usuario, id_vuelo }
  );

  if (reservaExistente.rows[0].TOTAL > 0) {
    throw new Error('No puedes reservar más de un asiento en el mismo vuelo.');
  }

  try {
    await connection.execute('BEGIN');

    await connection.execute(
      `INSERT INTO RESERVAS (ID_RESERVA, ID_USUARIO, ID_VUELO, ASIENTO, ESTADO_RESERVA, FECHA_RESERVA, VERSION)
       VALUES (seq_reservas.NEXTVAL, :id_usuario, :id_vuelo, :asiento, :estado_reserva, :fecha_reserva, 1)`,
      { id_usuario, id_vuelo, asiento, estado_reserva, fecha_reserva }
    );

    // Auditoría de creación de reserva
    await connection.execute(
      `INSERT INTO AUDITORIA_RESERVAS (ID_RESERVA, ID_USUARIO, FECHA_CAMBIO, ACCION) 
       VALUES (seq_reservas.CURRVAL, :id_usuario, SYSDATE, 'Creación')`,
      { id_usuario }
    );

    await connection.execute('COMMIT');
  } catch (err) {
    await connection.execute('ROLLBACK');
    throw err;
  }

  await connection.close();
  return { message: 'Reserva creada correctamente' };
};

// Actualizar reserva con manejo de versiones y auditoría
exports.updateReserva = async (id, data, version_actual) => {
  const connection = await getConnection();

  try {
    await connection.execute('BEGIN');

    const result = await connection.execute(
      `UPDATE RESERVAS SET ASIENTO = :asiento, VERSION = VERSION + 1 
       WHERE ID_RESERVA = :id AND VERSION = :version_actual`,
      { asiento: data.asiento, id, version_actual }
    );

    if (result.rowsAffected === 0) {
      throw new Error('Otro usuario ya modificó esta reserva. Recarga la página e intenta nuevamente.');
    }

    // Auditoría de actualización
    await connection.execute(
      `INSERT INTO AUDITORIA_RESERVAS (ID_RESERVA, ID_USUARIO, FECHA_CAMBIO, ACCION) 
       VALUES (:id, :id_usuario, SYSDATE, 'Actualización')`,
      { id, id_usuario: data.id_usuario }
    );

    await connection.execute('COMMIT');
  } catch (err) {
    await connection.execute('ROLLBACK');
    throw err;
  }

  await connection.close();
  return { message: 'Reserva actualizada correctamente' };
};

// Eliminar reserva con auditoría
exports.deleteReserva = async (id, id_usuario) => {
  const connection = await getConnection();

  try {
    await connection.execute('BEGIN');

    await connection.execute(
      `DELETE FROM RESERVAS WHERE ID_RESERVA = :id`,
      [id]
    );

    // Auditoría de eliminación
    await connection.execute(
      `INSERT INTO AUDITORIA_RESERVAS (ID_RESERVA, ID_USUARIO, FECHA_CAMBIO, ACCION) 
       VALUES (:id, :id_usuario, SYSDATE, 'Eliminación')`,
      { id, id_usuario }
    );

    await connection.execute('COMMIT');
  } catch (err) {
    await connection.execute('ROLLBACK');
    throw err;
  }

  await connection.close();
  return { message: 'Reserva eliminada correctamente' };
};