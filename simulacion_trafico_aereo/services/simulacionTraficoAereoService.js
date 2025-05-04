//servicio para la gestion de .....
// Aquí se maneja la lógica de interacción con la base de datos
const { getConnection } = require('../../config/db');

// Obtener todas las simulaciones de tráfico aéreo
exports.getAllSimulaciones = async () => {
  let connection;
  try {
    connection = await getConnection();
    const result = await connection.execute('SELECT * FROM SIMULACION_TRAFICO_AEREO');
    return result.rows;
  } catch (error) {
    throw new Error('Error al obtener las simulaciones de tráfico aéreo: ' + error.message);
  } finally {
    if (connection) {
      await connection.close();
    }
  }
};

// Obtener simulación de tráfico aéreo por ID
exports.getSimulacionById = async (id) => {
  let connection;
  try {
    connection = await getConnection();
    const result = await connection.execute(
      'SELECT * FROM SIMULACION_TRAFICO_AEREO WHERE ID = :id',
      [id]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error('Error al obtener la simulación de tráfico aéreo: ' + error.message);
  } finally {
    if (connection) {
      await connection.close();
    }
  }
};

// Crear nueva simulación de tráfico aéreo
exports.createSimulacion = async (simulacion) => {
  let connection;
  try {
    connection = await getConnection();
    const { descripcion, fecha_simulacion, trafico_estimado } = simulacion;
    const result = await connection.execute(
      'INSERT INTO SIMULACION_TRAFICO_AEREO (DESCRIPCION, FECHA_SIMULACION, TRAFICO_ESTIMADO) VALUES (:descripcion, :fecha_simulacion, :trafico_estimado) RETURNING ID INTO :id',
      [descripcion, fecha_simulacion, trafico_estimado],
      { outFormat: oracledb.OUT_FORMAT_OBJECT, autoCommit: true }
    );
    return result.outBinds.id[0]; // Retorna el ID de la nueva simulación creada
  } catch (error) {
    throw new Error('Error al crear la simulación de tráfico aéreo: ' + error.message);
  } finally {
    if (connection) {
      await connection.close();
    }
  }
};

// Actualizar simulación de tráfico aéreo por ID
exports.updateSimulacion = async (id, cambios) => {
  let connection;
  try {
    connection = await getConnection();
    const { descripcion, fecha_simulacion, trafico_estimado } = cambios;
    await connection.execute(
      'UPDATE SIMULACION_TRAFICO_AEREO SET DESCRIPCION = :descripcion, FECHA_SIMULACION = :fecha_simulacion, TRAFICO_ESTIMADO = :trafico_estimado WHERE ID = :id',
      [descripcion, fecha_simulacion, trafico_estimado, id],
      { autoCommit: true }
    );
  } catch (error) {
    throw new Error('Error al actualizar la simulación de tráfico aéreo: ' + error.message);
  } finally {
    if (connection) {
      await connection.close();
    }
  }
};

// Eliminar simulación de tráfico aéreo por ID
exports.deleteSimulacion = async (id) => {
  let connection;
  try {
    connection = await getConnection();
    await connection.execute(
      'DELETE FROM SIMULACION_TRAFICO_AEREO WHERE ID = :id',
      [id],
      { autoCommit: true }
    );
  } catch (error) {
    throw new Error('Error al eliminar la simulación de tráfico aéreo: ' + error.message);
  } finally {
    if (connection) {
      await connection.close();
    }
  }
};
