// Aquí se maneja la lógica de interacción con la base de datos
const { getConnection } = require('../../config/db');

// Obtener todas las programaciones mundiales
exports.getAllProgramacionesMundiales = async () => {
  let connection;
  try {
    connection = await getConnection();
    const result = await connection.execute('SELECT * FROM PROGRAMACION_MUNDIAL');
    return result.rows;
  } catch (error) {
    throw new Error('Error al obtener las programaciones mundiales: ' + error.message);
  } finally {
    if (connection) {
      await connection.close();
    }
  }
};

// Obtener programación mundial por ID
exports.getProgramacionMundialById = async (id) => {
  let connection;
  try {
    connection = await getConnection();
    const result = await connection.execute(
      'SELECT * FROM PROGRAMACION_MUNDIAL WHERE ID = :id',
      [id]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error('Error al obtener la programación mundial: ' + error.message);
  } finally {
    if (connection) {
      await connection.close();
    }
  }
};

// Crear nueva programación mundial
exports.createProgramacionMundial = async (programacionMundial) => {
  let connection;
  try {
    connection = await getConnection();
    const { evento, fecha, hora, lugar } = programacionMundial;
    const result = await connection.execute(
      'INSERT INTO PROGRAMACION_MUNDIAL (EVENTO, FECHA, HORA, LUGAR) VALUES (:evento, :fecha, :hora, :lugar) RETURNING ID INTO :id',
      [evento, fecha, hora, lugar],
      { outFormat: oracledb.OUT_FORMAT_OBJECT, autoCommit: true }
    );
    return result.outBinds.id[0]; // Retorna el ID de la nueva programación mundial creada
  } catch (error) {
    throw new Error('Error al crear la programación mundial: ' + error.message);
  } finally {
    if (connection) {
      await connection.close();
    }
  }
};

// Actualizar programación mundial por ID
exports.updateProgramacionMundial = async (id, cambios) => {
  let connection;
  try {
    connection = await getConnection();
    const { evento, fecha, hora, lugar } = cambios;
    await connection.execute(
      'UPDATE PROGRAMACION_MUNDIAL SET EVENTO = :evento, FECHA = :fecha, HORA = :hora, LUGAR = :lugar WHERE ID = :id',
      [evento, fecha, hora, lugar, id],
      { autoCommit: true }
    );
  } catch (error) {
    throw new Error('Error al actualizar la programación mundial: ' + error.message);
  } finally {
    if (connection) {
      await connection.close();
    }
  }
};

// Eliminar programación mundial por ID
exports.deleteProgramacionMundial = async (id) => {
  let connection;
  try {
    connection = await getConnection();
    await connection.execute(
      'DELETE FROM PROGRAMACION_MUNDIAL WHERE ID = :id',
      [id],
      { autoCommit: true }
    );
  } catch (error) {
    throw new Error('Error al eliminar la programación mundial: ' + error.message);
  } finally {
    if (connection) {
      await connection.close();
    }
  }
};
