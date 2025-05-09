const oracledb = require('oracledb');
const { getConnection } = require('../../config/db');

// Obtener todas las simulaciones de flujo con bloqueo seguro
exports.getAllSimulacionesFlujo = async () => {
  const conn = await getConnection();
  const result = await conn.execute(
    `SELECT * FROM SIMULACION_FLUJO_PASAJEROS ORDER BY FECHA_SIMULACION FOR UPDATE SKIP LOCKED`
  );
  await conn.close();
  return result.rows;
};

// Obtener simulación de flujo por ID con bloqueo seguro
exports.getSimulacionFlujoById = async (id) => {
  const conn = await getConnection();
  const result = await conn.execute(
    `SELECT * FROM SIMULACION_FLUJO_PASAJEROS WHERE ID_SIMULACION = :id FOR UPDATE NOWAIT`,
    [id]
  );
  await conn.close();
  return result.rows[0];
};

// Crear una nueva simulación de flujo con validaciones y auditoría
exports.createSimulacionFlujo = async (data) => {
  const { id_aeropuerto, fecha_simulacion, capacidad_terminal, tiempo_espera_estimado, congestion_predicha } = data;
  const conn = await getConnection();

  // Validar que el aeropuerto existe
  const aeropuertoExistente = await conn.execute(
    `SELECT COUNT(*) AS total FROM AEROPUERTOS WHERE ID_AEROPUERTO = :id_aeropuerto`,
    [id_aeropuerto]
  );

  if (aeropuertoExistente.rows[0].TOTAL === 0) {
    throw new Error('El aeropuerto especificado no existe.');
  }

  try {
    await conn.execute('BEGIN');

    await conn.execute(
      `INSERT INTO SIMULACION_FLUJO_PASAJEROS (ID_SIMULACION, ID_AEROPUERTO, FECHA_SIMULACION, CAPACIDAD_TERMINAL, TIEMPO_ESPERA_ESTIMADO, CONGESTION_PREDICHA, VERSION)
       VALUES (seq_simulacion_flujo.NEXTVAL, :id_aeropuerto, :fecha_simulacion, :capacidad_terminal, :tiempo_espera_estimado, :congestion_predicha, 1)`,
      { id_aeropuerto, fecha_simulacion, capacidad_terminal, tiempo_espera_estimado, congestion_predicha }
    );

    // Auditoría de creación
    await conn.execute(
      `INSERT INTO AUDITORIA_SIMULACION_FLUJO (ID_SIMULACION, ID_AEROPUERTO, FECHA_CAMBIO, ACCION)
       VALUES (seq_simulacion_flujo.CURRVAL, :id_aeropuerto, SYSDATE, 'Creación')`,
      { id_aeropuerto }
    );

    await conn.execute('COMMIT');
  } catch (err) {
    await conn.execute('ROLLBACK');
    throw err;
  }

  await conn.close();
  return { message: 'Simulación de flujo de pasajeros creada correctamente' };
};

// Actualizar simulación de flujo con manejo de versiones y auditoría
exports.updateSimulacionFlujo = async (id, data, version_actual) => {
  const conn = await getConnection();

  try {
    await conn.execute('BEGIN');

    const result = await conn.execute(
      `UPDATE SIMULACION_FLUJO_PASAJEROS SET CONGESTION_PREDICHA = :congestion_predicha, VERSION = VERSION + 1 
       WHERE ID_SIMULACION = :id AND VERSION = :version_actual`,
      { congestion_predicha: data.congestion_predicha, id, version_actual }
    );

    if (result.rowsAffected === 0) {
      throw new Error('Otro usuario ya modificó esta simulación. Recarga la página e intenta nuevamente.');
    }

    // Auditoría de actualización
    await conn.execute(
      `INSERT INTO AUDITORIA_SIMULACION_FLUJO (ID_SIMULACION, ID_AEROPUERTO, FECHA_CAMBIO, ACCION)
       VALUES (:id, (SELECT ID_AEROPUERTO FROM SIMULACION_FLUJO_PASAJEROS WHERE ID_SIMULACION = :id), SYSDATE, 'Actualización')`,
      { id }
    );

    await conn.execute('COMMIT');
  } catch (err) {
    await conn.execute('ROLLBACK');
    throw err;
  }

  await conn.close();
  return { message: 'Simulación de flujo de pasajeros actualizada correctamente' };
};

// Eliminar simulación de flujo con auditoría
exports.deleteSimulacionFlujo = async (id) => {
  const conn = await getConnection();

  try {
    await conn.execute('BEGIN');

    await conn.execute(
      `DELETE FROM SIMULACION_FLUJO_PASAJEROS WHERE ID_SIMULACION = :id`,
      [id]
    );

    // Auditoría de eliminación
    await conn.execute(
      `INSERT INTO AUDITORIA_SIMULACION_FLUJO (ID_SIMULACION, FECHA_CAMBIO, ACCION)
       VALUES (:id, SYSDATE, 'Eliminación')`,
      { id }
    );

    await conn.execute('COMMIT');
  } catch (err) {
    await conn.execute('ROLLBACK');
    throw err;
  }

  await conn.close();
  return { message: 'Simulación de flujo de pasajeros eliminada correctamente' };
};