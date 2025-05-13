const { getConnection } = require('../../config/db');

exports.getAllProgramasVuelo = async () => {
  const connection = await getConnection();
  const result = await connection.execute('SELECT * FROM Programas_Vuelo');
  await connection.close();
  return result.rows;
};

exports.getProgramaVueloById = async (id) => {
  const connection = await getConnection();
  const result = await connection.execute('SELECT * FROM Programas_Vuelo WHERE ID_PROGRAMA = :id', [id]);
  await connection.close();
  return result.rows[0];
};

// ✅ `createProgramaVuelo` con validación de aerolínea y aeropuerto
exports.createProgramaVuelo = async (data) => {
  const connection = await getConnection();

  try {
    // Validar existencia de aerolínea
    const existeAerolinea = await connection.execute(
      'SELECT 1 FROM Aerolineas WHERE ID_AEROLINEA = :id_aerolinea',
      [data.id_aerolinea]
    );
    if (existeAerolinea.rows.length === 0) {
      throw new Error('La aerolínea especificada no existe.');
    }

    // Validar existencia de aeropuertos
    const existeAeropuertoOrigen = await connection.execute(
      'SELECT 1 FROM Aeropuertos WHERE ID_AEROPUERTO = :id_aeropuerto_origen',
      [data.id_aeropuerto_origen]
    );
    const existeAeropuertoDestino = await connection.execute(
      'SELECT 1 FROM Aeropuertos WHERE ID_AEROPUERTO = :id_aeropuerto_destino',
      [data.id_aeropuerto_destino]
    );

    if (existeAeropuertoOrigen.rows.length === 0 || existeAeropuertoDestino.rows.length === 0) {
      throw new Error('Uno o ambos aeropuertos no existen.');
    }

    // Insertar el nuevo programa de vuelo
    await connection.execute(
      `INSERT INTO Programas_Vuelo (numero_vuelo, id_aerolinea, dias_semana, id_aeropuerto_origen, id_aeropuerto_destino)
       VALUES (:numero_vuelo, :id_aerolinea, :dias_semana, :id_aeropuerto_origen, :id_aeropuerto_destino)`,
      data,
      { autoCommit: true }
    );

    await connection.close();
    return { message: 'Programa de vuelo creado correctamente' };

  } catch (error) {
  console.error('Error SQL:', error);
  await connection.close();
  return { error: 'Error en la inserción: ' + error.message };
}
};

// ✅ `updateProgramaVuelo` con validación previa
exports.updateProgramaVuelo = async (id, data) => {
  const connection = await getConnection();

  try {
    const existe = await connection.execute(
      'SELECT 1 FROM Programas_Vuelo WHERE ID_PROGRAMA = :id',
      [id]
    );
    if (existe.rows.length === 0) {
      throw new Error('El programa de vuelo especificado no existe.');
    }

    await connection.execute(
      `UPDATE Programas_Vuelo SET numero_vuelo = :numero_vuelo, id_aerolinea = :id_aerolinea, dias_semana = :dias_semana,
       id_aeropuerto_origen = :id_aeropuerto_origen, id_aeropuerto_destino = :id_aeropuerto_destino
       WHERE ID_PROGRAMA = :id`,
      { ...data, id },
      { autoCommit: true }
    );

    await connection.close();
    return { message: 'Programa de vuelo actualizado correctamente' };
  
  } catch (error) {
    console.error('Error SQL:', error.message);
    await connection.close();
    return { error: 'Error en la actualización: ' + error.message };
  }
};

// ✅ `deleteProgramaVuelo` con verificación previa
exports.deleteProgramaVuelo = async (id) => {
  const connection = await getConnection();

  try {
    const existe = await connection.execute(
      'SELECT 1 FROM Programas_Vuelo WHERE ID_PROGRAMA = :id',
      [id]
    );
    if (existe.rows.length === 0) {
      throw new Error('El programa de vuelo especificado no existe.');
    }

    await connection.execute('DELETE FROM Programas_Vuelo WHERE ID_PROGRAMA = :id', [id], { autoCommit: true });
    await connection.close();

    return { message: 'Programa de vuelo eliminado correctamente' };

  } catch (error) {
    console.error('Error SQL:', error.message);
    await connection.close();
    return { error: 'Error al eliminar: ' + error.message };
  }
};