const oracledb = require('oracledb');
const { getConnection } = require('../../config/db');

// Obtener todas las simulaciones de tráfico aéreo con bloqueo seguro
exports.getAllSimulacionesTrafico = async () => {
  const connection = await getConnection();
  const result = await connection.execute(
    `SELECT * FROM SIMULACION_TRAFICO_AEREO ORDER BY FECHA_SIMULACION FOR UPDATE SKIP LOCKED`
  );
  await connection.close();
  return result.rows;
};

// Obtener simulación de tráfico aéreo por ID con bloqueo seguro
exports.getSimulacionTraficoById = async (id) => {
  const connection = await getConnection();
  const result = await connection.execute(
    `SELECT * FROM SIMULACION_TRAFICO_AEREO WHERE ID_SIMULACION = :id FOR UPDATE NOWAIT`,
    [id]
  );
  await connection.close();
  return result.rows[0];
};

// Crear una nueva simulación de tráfico con validaciones y auditoría
exports.createSimulacionTrafico = async (data) => {
  const { id_vuelo, fecha_simulacion, condiciones_climaticas, trafico_estimado, impacto_operacional } = data;
  const connection = await getConnection();

  // Validar que el vuelo existe
  const vueloExistente = await connection.execute(
    `SELECT COUNT(*) AS total FROM VUELOS WHERE ID_VUELO = :id_vuelo`,
    [id_vuelo]
  );

  if (vueloExistente.rows[0].TOTAL === 0) {
    throw new Error('El vuelo especificado no existe.');
  }

  try {
    await connection.execute('BEGIN');

    await connection.execute(
      `INSERT INTO SIMULACION_TRAFICO_AEREO (ID_SIMULACION, ID_VUELO, FECHA_SIMULACION, CONDICIONES_CLIMATICAS, TRAFICO_ESTIMADO, IMPACTO_OPERACIONAL, VERSION)
       VALUES (seq_simulacion_trafico.NEXTVAL, :id_vuelo, :fecha_simulacion, :condiciones_climaticas, :trafico_estimado, :impacto_operacional, 1)`,
      { id_vuelo, fecha_simulacion, condiciones_climaticas, trafico_estimado, impacto_operacional }
    );

    // Auditoría de creación
    await connection.execute(
      `INSERT INTO AUDITORIA_SIMULACION_TRAFICO (ID_SIMULACION, ID_VUELO, FECHA_CAMBIO, ACCION)
       VALUES (seq_simulacion_trafico.CURRVAL, :id_vuelo, SYSDATE, 'Creación')`,
      { id_vuelo }
    );

    await connection.execute('COMMIT');
  } catch (err) {
    await connection.execute('ROLLBACK');
    throw err;
  }

  await connection.close();
  return { message: 'Simulación de tráfico aéreo creada correctamente' };
};

// Actualizar simulación de tráfico aéreo con manejo de versiones y auditoría
exports.updateSimulacionTrafico = async (id, data, version_actual) => {
  const connection = await getConnection();

  try {
    await connection.execute('BEGIN');

    const result = await connection.execute(
      `UPDATE SIMULACION_TRAFICO_AEREO SET IMPACTO_OPERACIONAL = :impacto_operacional, VERSION = VERSION + 1 
       WHERE ID_SIMULACION = :id AND VERSION = :version_actual`,
      { impacto_operacional: data.impacto_operacional, id, version_actual }
    );

    if (result.rowsAffected === 0) {
      throw new Error('Otro usuario ya modificó esta simulación. Recarga la página e intenta nuevamente.');
    }

    // Auditoría de actualización
    await connection.execute(
      `INSERT INTO AUDITORIA_SIMULACION_TRAFICO (ID_SIMULACION, ID_VUELO, FECHA_CAMBIO, ACCION)
       VALUES (:id, (SELECT ID_VUELO FROM SIMULACION_TRAFICO_AEREO WHERE ID_SIMULACION = :id), SYSDATE, 'Actualización')`,
      { id }
    );

    await connection.execute('COMMIT');
  } catch (err) {
    await connection.execute('ROLLBACK');
    throw err;
  }

  await connection.close();
  return { message: 'Simulación de tráfico aéreo actualizada correctamente' };
};

// Eliminar simulación de tráfico aéreo con auditoría
exports.deleteSimulacionTrafico = async (id) => {
  const connection = await getConnection();

  try {
    await connection.execute('BEGIN');

    await connection.execute(
      `DELETE FROM SIMULACION_TRAFICO_AEREO WHERE ID_SIMULACION = :id`,
      [id]
    );

    // Auditoría de eliminación
    await connection.execute(
      `INSERT INTO AUDITORIA_SIMULACION_TRAFICO (ID_SIMULACION, FECHA_CAMBIO, ACCION)
       VALUES (:id, SYSDATE, 'Eliminación')`,
      { id }
    );

    await connection.execute('COMMIT');
  } catch (err) {
    await connection.execute('ROLLBACK');
    throw err;
  }

  await connection.close();
  return { message: 'Simulación de tráfico aéreo eliminada correctamente' };
};