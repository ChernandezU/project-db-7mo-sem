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
  const { id_vuelo, orden, id_aeropuerto_intermedio, hora_escala } = data;
  const connection = await getConnection();

  console.log('📌 Datos recibidos:', JSON.stringify(data, null, 2));

  try {
    await connection.execute('BEGIN');

    // 🔎 Validar que el vuelo existe antes de insertar
    const vueloExistente = await connection.execute(
      `SELECT COUNT(*) AS total FROM VUELOS WHERE ID_VUELO = :id_vuelo`,
      { id_vuelo }
    );

    if (vueloExistente.rows[0].TOTAL === 0) {
      throw new Error('El vuelo especificado no existe.');
    }

    // ✅ Convertimos `hora_escala` en `YYYY-MM-DD HH24:MI:SS` antes de enviarlo
    let horaEscalaValue = null;
    if (hora_escala && typeof hora_escala === 'string' && hora_escala.trim() !== '') {
      const fecha = new Date(hora_escala);
      horaEscalaValue = `${fecha.getFullYear()}-${String(fecha.getMonth() + 1).padStart(2, '0')}-${String(fecha.getDate()).padStart(2, '0')} ${String(fecha.getHours()).padStart(2, '0')}:${String(fecha.getMinutes()).padStart(2, '0')}:${String(fecha.getSeconds()).padStart(2, '0')}`;
    }

    console.log('📌 Tipo de hora_escala:', typeof horaEscalaValue);
    console.log('📌 Valor de hora_escala después de conversión:', horaEscalaValue);

    // ✅ Ajustamos el `INSERT`, asegurando que `hora_escala` pase correctamente a `TO_TIMESTAMP()`
    const sqlQuery = `
      INSERT INTO ESCALAS_TECNICAS (ID_VUELO, ORDEN, ID_AEROPUERTO_INTERMEDIO, HORA_ESCALA) 
      VALUES (:id_vuelo, :orden, :id_aeropuerto_intermedio, ${horaEscalaValue ? "TO_TIMESTAMP(:hora_escala, 'YYYY-MM-DD HH24:MI:SS')" : "NULL"})`;

    const result = await connection.execute(sqlQuery, {
      id_vuelo,
      orden,
      id_aeropuerto_intermedio,
      hora_escala: horaEscalaValue || null
    }, { autoCommit: true });

    console.log('✔ Escala técnica insertada correctamente:', result);

    await connection.close();
    return { message: 'Escala técnica creada correctamente.', success: true };
  } catch (error) {
    console.error('🚨 Error en la inserción:', error.stack);
    await connection.close();
    return { error: `Error al crear la escala técnica: ${error.message}`, success: false };
  }
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