//servicio para la gestion de .....
// Aquí se maneja la lógica de interacción con la base de datos
const { getConnection } = require('../../config/db');

// Obtener todas las operaciones aéreas
exports.getAllOperaciones = async () => {
  let connection;
  try {
    connection = await getConnection();
    const result = await connection.execute('SELECT * FROM OPERACIONES_AEREAS');
    return result.rows;
  } catch (error) {
    throw new Error('Error al obtener las operaciones aéreas: ' + error.message);
  } finally {
    if (connection) {
      await connection.close();
    }
  }
};

// Obtener operación aérea por ID
exports.getOperacionById = async (id) => {
  let connection;
  try {
    connection = await getConnection();
    const result = await connection.execute(
      'SELECT * FROM OPERACIONES_AEREAS WHERE ID = :id',
      [id]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error('Error al obtener la operación aérea: ' + error.message);
  } finally {
    if (connection) {
      await connection.close();
    }
  }
};

// Crear nueva operación aérea
exports.createOperacion = async (operacion) => {
  let connection;
  try {
    connection = await getConnection();
    const { descripcion, fecha_operacion, tipo_operacion } = operacion;
    const result = await connection.execute(
      'INSERT INTO OPERACIONES_AEREAS (DESCRIPCION, FECHA_OPERACION, TIPO_OPERACION) VALUES (:descripcion, :fecha_operacion, :tipo_operacion) RETURNING ID INTO :id',
      [descripcion, fecha_operacion, tipo_operacion],
      { outFormat: oracledb.OUT_FORMAT_OBJECT, autoCommit: true }
    );
    return result.outBinds.id[0]; // Retorna el ID de la nueva operación creada
  } catch (error) {
    throw new Error('Error al crear la operación aérea: ' + error.message);
  } finally {
    if (connection) {
      await connection.close();
    }
  }
};

// Actualizar operación aérea por ID
exports.updateOperacion = async (id, cambios) => {
  let connection;
  try {
    connection = await getConnection();
    const { descripcion, fecha_operacion, tipo_operacion } = cambios;
    await connection.execute(
      'UPDATE OPERACIONES_AEREAS SET DESCRIPCION = :descripcion, FECHA_OPERACION = :fecha_operacion, TIPO_OPERACION = :tipo_operacion WHERE ID = :id',
      [descripcion, fecha_operacion, tipo_operacion, id],
      { autoCommit: true }
    );
  } catch (error) {
    throw new Error('Error al actualizar la operación aérea: ' + error.message);
  } finally {
    if (connection) {
      await connection.close();
    }
  }
};

// Eliminar operación aérea por ID
exports.deleteOperacion = async (id) => {
  let connection;
  try {
    connection = await getConnection();
    await connection.execute(
      'DELETE FROM OPERACIONES_AEREAS WHERE ID = :id',
      [id],
      { autoCommit: true }
    );
  } catch (error) {
    throw new Error('Error al eliminar la operación aérea: ' + error.message);
  } finally {
    if (connection) {
      await connection.close();
    }
  }
};
