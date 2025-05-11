const oracledb = require('oracledb');
const { getConnection } = require('../../config/db');

// Obtener todas las escalas técnicas con bloqueo seguro
exports.getAllEscalas = async () => {
  const connection = await getConnection();
  const result = await connection.execute(
    `SELECT * FROM ESCALAS_TECNICAS ORDER BY FECHA_HORA_LLEGADA FOR UPDATE SKIP LOCKED`
  );
  await connection.close();
  return result.rows;
};

// Obtener escala técnica por ID con bloqueo seguro
exports.getEscalaById = async (id) => {
  const connection = await getConnection();
  const result = await connection.execute(
    `SELECT * FROM ESCALAS_TECNICAS WHERE ID_ESCALA = :id FOR UPDATE NOWAIT`,
    [id]
  );
  await connection.close();
  return result.rows[0];
};

// Crear una nueva escala técnica con validaciones y auditoría
exports.createEscala = async (data) => {
  const { id_vuelo, pais, ciudad, aeropuerto, codigo_iata_aeropuerto, fecha_hora_llegada, fecha_hora_salida, duracion_estimada, duracion_real, estado_escala, observaciones } = data;
  const connection = await getConnection();

  // Validar que el vuelo existe
  const vueloExistente = await connection.execute(
    `SELECT COUNT(*) AS total FROM VUELOS WHERE ID_VUELO = :id_vuelo`,
    [id_vuelo]
  );

  if (vueloExistente.rows[0].TOTAL === 0) {
    throw new Error('El vuelo especificado no existe.');
  }

  // Validar estado de escala
  if (!['Pendiente', 'Completada', 'Cancelada'].includes(estado_escala)) {
    throw new Error("Estado inválido. Debe ser 'Pendiente', 'Completada' o 'Cancelada'.");
  }

  try {
    await connection.execute('BEGIN');

    await connection.execute(
      `INSERT INTO ESCALAS_TECNICAS (ID_ESCALA, ID_VUELO, PAIS, CIUDAD, AEROPUERTO, CODIGO_IATA_AEROPUERTO, FECHA_HORA_LLEGADA, FECHA_HORA_SALIDA, DURACION_ESTIMADA, DURACION_REAL, ESTADO_ESCALA, OBSERVACIONES)
       VALUES (seq_escalas_tecnicas.NEXTVAL, :id_vuelo, :pais, :ciudad, :aeropuerto, :codigo_iata_aeropuerto, :fecha_hora_llegada, :fecha_hora_salida, :duracion_estimada, :duracion_real, :estado_escala, :observaciones)`,
      { id_vuelo, pais, ciudad, aeropuerto, codigo_iata_aeropuerto, fecha_hora_llegada, fecha_hora_salida, duracion_estimada, duracion_real, estado_escala, observaciones }
    );

    // Auditoría de creación
    await connection.execute(
      `INSERT INTO AUDITORIA_ESCALAS_TECNICAS (ID_ESCALA, ID_VUELO, FECHA_CAMBIO, ACCION)
       VALUES (seq_escalas_tecnicas.CURRVAL, :id_vuelo, SYSDATE, 'Creación')`,
      { id_vuelo }
    );

    await connection.execute('COMMIT');
  } catch (err) {
    await connection.execute('ROLLBACK');
    throw err;
  }

  await connection.close();
  return { message: 'Escala técnica creada correctamente' };
};

// Actualizar escala técnica con validaciones
exports.updateEscala = async (id, data) => {
  const connection = await getConnection();

  try {
    await connection.execute('BEGIN');

    const result = await connection.execute(
      `UPDATE ESCALAS_TECNICAS SET OBSERVACIONES = :observaciones, ESTADO_ESCALA = :estado_escala, DURACION_REAL = :duracion_real
       WHERE ID_ESCALA = :id`,
      { observaciones: data.observaciones, estado_escala: data.estado_escala, duracion_real: data.duracion_real, id }
    );

    if (result.rowsAffected === 0) {
      throw new Error('La actualización no se realizó. Verifica los datos e intenta nuevamente.');
    }

    // Auditoría de actualización
    await connection.execute(
      `INSERT INTO AUDITORIA_ESCALAS_TECNICAS (ID_ESCALA, ID_VUELO, FECHA_CAMBIO, ACCION)
       VALUES (:id, (SELECT ID_VUELO FROM ESCALAS_TECNICAS WHERE ID_ESCALA = :id), SYSDATE, 'Actualización')`,
      { id }
    );

    await connection.execute('COMMIT');
  } catch (err) {
    await connection.execute('ROLLBACK');
    throw err;
  }

  await connection.close();
  return { message: 'Escala técnica actualizada correctamente' };
};

// Eliminar escala técnica con auditoría
exports.deleteEscala = async (id) => {
  const connection = await getConnection();

  try {
    await connection.execute('BEGIN');

    await connection.execute(`DELETE FROM ESCALAS_TECNICAS WHERE ID_ESCALA = :id`, [id]);

    // Auditoría de eliminación
    await connection.execute(
      `INSERT INTO AUDITORIA_ESCALAS_TECNICAS (ID_ESCALA, FECHA_CAMBIO, ACCION)
       VALUES (:id, SYSDATE, 'Eliminación')`,
      { id }
    );

    await connection.execute('COMMIT');
  } catch (err) {
    await connection.execute('ROLLBACK');
    throw err;
  }

  await connection.close();
  return { message: 'Escala técnica eliminada correctamente' };
};