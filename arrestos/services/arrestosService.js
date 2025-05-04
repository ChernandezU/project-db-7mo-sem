//servicio para la gestion de .....
// Aquí se maneja la lógica de interacción con la base de datos
const { getConnection } = require('../../config/db');

// Obtener todos los arrestos
exports.getAllArrestos = async () => {
  let connection;
  try {
    connection = await getConnection();
    const result = await connection.execute('SELECT * FROM ARRESTOS');
    return result.rows;
  } catch (error) {
    throw new Error('Error al obtener los arrestos: ' + error.message);
  } finally {
    if (connection) {
      await connection.close();
    }
  }
};

// Obtener arresto por ID
exports.getArrestoById = async (id) => {
  let connection;
  try {
    connection = await getConnection();
    const result = await connection.execute(
      'SELECT * FROM ARRESTOS WHERE ID = :id',
      [id]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error('Error al obtener el arresto: ' + error.message);
  } finally {
    if (connection) {
      await connection.close();
    }
  }
};

// Crear nuevo arresto
exports.createArresto = async (arresto) => {
  let connection;
  try {
    connection = await getConnection();
    const { nombre, fecha, lugar } = arresto;
    const result = await connection.execute(
      'INSERT INTO ARRESTOS (NOMBRE, FECHA, LUGAR) VALUES (:nombre, :fecha, :lugar) RETURNING ID INTO :id',
      [nombre, fecha, lugar],
      { outFormat: oracledb.OUT_FORMAT_OBJECT, autoCommit: true }
    );
    return result.outBinds.id[0]; // Retorna el ID del nuevo arresto creado
  } catch (error) {
    throw new Error('Error al crear el arresto: ' + error.message);
  } finally {
    if (connection) {
      await connection.close();
    }
  }
};

// Actualizar arresto por ID
exports.updateArresto = async (id, cambios) => {
  let connection;
  try {
    connection = await getConnection();
    const { nombre, fecha, lugar } = cambios;
    await connection.execute(
      'UPDATE ARRESTOS SET NOMBRE = :nombre, FECHA = :fecha, LUGAR = :lugar WHERE ID = :id',
      [nombre, fecha, lugar, id],
      { autoCommit: true }
    );
  } catch (error) {
    throw new Error('Error al actualizar el arresto: ' + error.message);
  } finally {
    if (connection) {
      await connection.close();
    }
  }
};

// Eliminar arresto por ID
exports.deleteArresto = async (id) => {
  let connection;
  try {
    connection = await getConnection();
    await connection.execute(
      'DELETE FROM ARRESTOS WHERE ID = :id',
      [id],
      { autoCommit: true }
    );
  } catch (error) {
    throw new Error('Error al eliminar el arresto: ' + error.message);
  } finally {
    if (connection) {
      await connection.close();
    }
  }
};
