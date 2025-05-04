//servicio para la gestion de .....
const { getConnection } = require('../../config/db');

// Obtener todas las simulaciones
exports.getAllSimulaciones = async () => {
  let connection;
  try {
    connection = await getConnection();
    const result = await connection.execute('SELECT * FROM SIMULACION_IMPACTO_FINANCIERO');
    return result.rows;
  } catch (error) {
    throw new Error('Error al obtener las simulaciones de impacto financiero: ' + error.message);
  } finally {
    if (connection) await connection.close();
  }
};

// Obtener simulación por ID
exports.getSimulacionById = async (id) => {
  let connection;
  try {
    connection = await getConnection();
    const result = await connection.execute(
      'SELECT * FROM SIMULACION_IMPACTO_FINANCIERO WHERE ID = :id',
      [id]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error('Error al obtener la simulación: ' + error.message);
  } finally {
    if (connection) await connection.close();
  }
};

// Crear nueva simulación
exports.createSimulacion = async (simulacion) => {
  let connection;
  try {
    connection = await getConnection();
    const { descripcion, fecha_simulacion, impacto_estimado } = simulacion;
    const result = await connection.execute(
      `INSERT INTO SIMULACION_IMPACTO_FINANCIERO (DESCRIPCION, FECHA_SIMULACION, IMPACTO_ESTIMADO)
       VALUES (:descripcion, :fecha_simulacion, :impacto_estimado)
       RETURNING ID INTO :id`,
      {
        descripcion,
        fecha_simulacion,
        impacto_estimado,
        id: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER }
      },
      { autoCommit: true }
    );
    return result.outBinds.id[0];
  } catch (error) {
    throw new Error('Error al crear simulación: ' + error.message);
  } finally {
    if (connection) await connection.close();
  }
};

// Actualizar simulación
exports.updateSimulacion = async (id, cambios) => {
  let connection;
  try {
    connection = await getConnection();
    const { descripcion, fecha_simulacion, impacto_estimado } = cambios;
    await connection.execute(
      `UPDATE SIMULACION_IMPACTO_FINANCIERO
       SET DESCRIPCION = :descripcion,
           FECHA_SIMULACION = :fecha_simulacion,
           IMPACTO_ESTIMADO = :impacto_estimado
       WHERE ID = :id`,
      [descripcion, fecha_simulacion, impacto_estimado, id],
      { autoCommit: true }
    );
  } catch (error) {
    throw new Error('Error al actualizar simulación: ' + error.message);
  } finally {
    if (connection) await connection.close();
  }
};

// Eliminar simulación
exports.deleteSimulacion = async (id) => {
  let connection;
  try {
    connection = await getConnection();
    await connection.execute(
      'DELETE FROM SIMULACION_IMPACTO_FINANCIERO WHERE ID = :id',
      [id],
      { autoCommit: true }
    );
  } catch (error) {
    throw new Error('Error al eliminar simulación: ' + error.message);
  } finally {
    if (connection) await connection.close();
  }
};
