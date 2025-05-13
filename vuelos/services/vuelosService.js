const { getConnection } = require('../../config/db');

exports.getAllVuelos = async () => {
  const connection = await getConnection();
  const result = await connection.execute('SELECT * FROM Vuelos');
  await connection.close();
  return result.rows;
};

exports.getVueloById = async (id) => {
  const connection = await getConnection();
  const result = await connection.execute('SELECT * FROM Vuelos WHERE ID_VUELO = :id', [id]);
  await connection.close();
  return result.rows[0];
};
console.log('Tipo de id_programa:', typeof id_programa);


// ✅ `createVuelo` con validación de datos
exports.createVuelo = async (data) => {
  const connection = await getConnection();

  try {
    console.log('Datos recibidos:', JSON.stringify(data, null, 2));

    let { id_programa, fecha, plazas_disponibles, id_avion, estado } = data;

    // 🔎 Convertir id_programa a número de manera explícita
    id_programa = parseInt(id_programa, 10);
    console.log('ID Programa procesado como número:', id_programa);

    // 🔎 Validar existencia de programa de vuelo con corrección en bindParams
    const existePrograma = await connection.execute(
      'SELECT ID_PROGRAMA FROM Programas_Vuelo WHERE ID_PROGRAMA = :id_programa',
      { id_programa }
    );

    console.log('Resultado consulta Programas_Vuelo:', JSON.stringify(existePrograma.rows, null, 2));

    if (existePrograma.rows.length === 0) {
      throw new Error(`El programa de vuelo con ID ${id_programa} no existe.`);
    }

    // 🔎 Validar existencia de avión
    const existeAvion = await connection.execute(
      'SELECT 1 FROM Aviones WHERE ID_AVION = :id_avion',
      { id_avion }
    );

    if (existeAvion.rows.length === 0) {
      throw new Error(`El avión con ID ${id_avion} no existe.`);
    }

    // 🔎 Validar estado de vuelo con limpieza de espacios
    estado = estado.trim();
    if (!['activo', 'cancelado', 'finalizado'].includes(estado)) {
      throw new Error(`Estado de vuelo inválido: '${estado}'. Debe ser 'activo', 'cancelado' o 'finalizado'.`);
    }

    // 🔎 Validar formato de fecha antes de insertar
    console.log('Fecha recibida:', fecha);
    const fechaValida = await connection.execute(`SELECT TO_DATE(:fecha, 'YYYY-MM-DD') FROM dual`, { fecha });

    if (!fechaValida) {
      throw new Error(`Formato de fecha inválido: ${fecha}. Debe ser YYYY-MM-DD.`);
    }

    // 🚀 Insertar vuelo con datos validados
    await connection.execute(
      `INSERT INTO Vuelos (id_programa, fecha, plazas_disponibles, id_avion, estado)
       VALUES (:id_programa, TO_DATE(:fecha, 'YYYY-MM-DD'), :plazas_disponibles, :id_avion, :estado)`,
      { id_programa, fecha, plazas_disponibles, id_avion, estado },
      { autoCommit: true }
    );

    console.log('Vuelo creado exitosamente.');
    await connection.close();
    return { message: 'Vuelo creado correctamente' };

  } catch (error) {
    console.error('Error SQL:', error.stack);
    await connection.close();
    return { error: `Error en la inserción: ${error.message}`, debug: error.stack };
  }
};


// ✅ `updateVuelo` con validación previa
exports.updateVuelo = async (id, data) => {
  const connection = await getConnection();

  try {
    const existe = await connection.execute(
      'SELECT 1 FROM Vuelos WHERE ID_VUELO = :id',
      [id]
    );
    if (existe.rows.length === 0) {
      throw new Error('El vuelo especificado no existe.');
    }

    await connection.execute(
      `UPDATE Vuelos SET id_programa = :id_programa, fecha = TO_DATE(:fecha, 'YYYY-MM-DD'), plazas_disponibles = :plazas_disponibles,
       id_avion = :id_avion, estado = :estado WHERE ID_VUELO = :id`,
      { ...data, id },
      { autoCommit: true }
    );

    await connection.close();
    return { message: 'Vuelo actualizado correctamente' };

  } catch (error) {
    console.error('Error SQL:', error.message);
    await connection.close();
    return { error: 'Error en la actualización: ' + error.message };
  }
};

// ✅ `deleteVuelo` con verificación previa
exports.deleteVuelo = async (id) => {
  const connection = await getConnection();

  try {
    const existe = await connection.execute(
      'SELECT 1 FROM Vuelos WHERE ID_VUELO = :id',
      [id]
    );
    if (existe.rows.length === 0) {
      throw new Error('El vuelo especificado no existe.');
    }

    await connection.execute('DELETE FROM Vuelos WHERE ID_VUELO = :id', [id], { autoCommit: true });
    await connection.close();

    return { message: 'Vuelo eliminado correctamente' };

  } catch (error) {
    console.error('Error SQL:', error.message);
    await connection.close();
    return { error: 'Error al eliminar: ' + error.message };
  }
};