const oracledb = require('oracledb');
const { getConnection } = require('../../config/db');

// Obtener todos los horarios de vuelo con bloqueo seguro
exports.getAllHorariosVuelos = async () => {
  const connection = await getConnection();
  const result = await connection.execute(
    `SELECT * FROM HORARIOS_VUELOS ORDER BY HORA_SALIDA FOR UPDATE SKIP LOCKED`
  );
  await connection.close();
  return result.rows;
};

// Obtener horario de vuelo por ID con bloqueo seguro
exports.getHorarioVueloById = async (id) => {
  const connection = await getConnection();
  const result = await connection.execute(
    `SELECT * FROM HORARIOS_VUELOS WHERE ID_HORARIO = :id FOR UPDATE NOWAIT`,
    [id]
  );
  await connection.close();
  return result.rows[0];
};

// Crear un nuevo horario de vuelo con validaciones y auditoría
exports.createHorarioVuelo = async (data) => {
  const { id_vuelo, hora_salida, hora_llegada, zona_horaria, estado } = data;
  const connection = await getConnection();

  // Validar que el vuelo existe
  const vueloExistente = await connection.execute(
    `SELECT COUNT(*) AS total FROM VUELOS WHERE ID_VUELO = :id_vuelo`,
    [id_vuelo]
  );

  if (vueloExistente.rows[0].TOTAL === 0) {
    throw new Error('El vuelo especificado no existe.');
  }

  // Validar estado
  if (!['Programado', 'Confirmado', 'Cancelado', 'Demorado'].includes(estado)) {
    throw new Error("Estado inválido. Debe ser 'Programado', 'Confirmado', 'Cancelado' o 'Demorado'.");
  }

  // Validar que no haya solapamiento de horarios
  const conflictoHorarios = await connection.execute(
    `SELECT COUNT(*) AS total FROM HORARIOS_VUELOS
     WHERE ID_VUELO = :id_vuelo AND ZONA_HORARIA = :zona_horaria AND
           (hora_salida BETWEEN :hora_salida AND :hora_llegada
           OR hora_llegada BETWEEN :hora_salida AND :hora_llegada)`,
    { id_vuelo, zona_horaria, hora_salida, hora_llegada }
  );

  if (conflictoHorarios.rows[0].TOTAL > 0) {
    throw new Error('Este vuelo ya tiene un horario que se solapa.');
  }

  try {
    await connection.execute('BEGIN');

    await connection.execute(
      `INSERT INTO HORARIOS_VUELOS (ID_HORARIO, ID_VUELO, HORA_SALIDA, HORA_LLEGADA, ZONA_HORARIA, ESTADO)
       VALUES (seq_horarios_vuelos.NEXTVAL, :id_vuelo, :hora_salida, :hora_llegada, :zona_horaria, :estado)`,
      { id_vuelo, hora_salida, hora_llegada, zona_horaria, estado }
    );

    // Auditoría de creación
    await connection.execute(
      `INSERT INTO AUDITORIA_HORARIOS_VUELOS (ID_HORARIO, ID_VUELO, FECHA_CAMBIO, ACCION)
       VALUES (seq_horarios_vuelos.CURRVAL, :id_vuelo, SYSDATE, 'Creación')`,
      { id_vuelo }
    );

    await connection.execute('COMMIT');
  } catch (err) {
    await connection.execute('ROLLBACK');
    throw err;
  }

  await connection.close();
  return { message: 'Horario de vuelo creado correctamente' };
};

// Actualizar horario de vuelo con validaciones
exports.updateHorarioVuelo = async (id, data) => {
  const connection = await getConnection();

  try {
    await connection.execute('BEGIN');

    const result = await connection.execute(
      `UPDATE HORARIOS_VUELOS SET ESTADO = :estado, ZONA_HORARIA = :zona_horaria
       WHERE ID_HORARIO = :id`,
      { estado: data.estado, zona_horaria: data.zona_horaria, id }
    );

    if (result.rowsAffected === 0) {
      throw new Error('La actualización no se realizó. Verifica los datos e intenta nuevamente.');
    }

    // Auditoría de actualización
    await connection.execute(
      `INSERT INTO AUDITORIA_HORARIOS_VUELOS (ID_HORARIO, ID_VUELO, FECHA_CAMBIO, ACCION)
       VALUES (:id, (SELECT ID_VUELO FROM HORARIOS_VUELOS WHERE ID_HORARIO = :id), SYSDATE, 'Actualización')`,
      { id }
    );

    await connection.execute('COMMIT');
  } catch (err) {
    await connection.execute('ROLLBACK');
    throw err;
  }

  await connection.close();
  return { message: 'Horario actualizado correctamente' };
};

// Eliminar horario con auditoría
exports.deleteHorarioVuelo = async (id) => {
  const connection = await getConnection();

  try {
    await connection.execute('BEGIN');

    await connection.execute(`DELETE FROM HORARIOS_VUELOS WHERE ID_HORARIO = :id`, [id]);

    // Auditoría de eliminación
    await connection.execute(
      `INSERT INTO AUDITORIA_HORARIOS_VUELOS (ID_HORARIO, FECHA_CAMBIO, ACCION)
       VALUES (:id, SYSDATE, 'Eliminación')`,
      { id }
    );

    await connection.execute('COMMIT');
  } catch (err) {
    await connection.execute('ROLLBACK');
    throw err;
  }

  await connection.close();
  return { message: 'Horario eliminado correctamente' };
};