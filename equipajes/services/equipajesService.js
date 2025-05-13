const oracledb = require('oracledb');
const { getConnection } = require('../../config/db');

// Obtener todos los equipajes con concurrencia optimizada
exports.getAllEquipajes = async () => {
  const connection = await getConnection();

  try {
    console.log('🔍 Obteniendo todos los equipajes...');
    const result = await connection.execute(`SELECT * FROM EQUIPAJES ORDER BY ID_EQUIPAJE`);
    await connection.close();
    
    return { success: true, data: result.rows };
  } catch (error) {
    console.error('🚨 Error en la consulta:', error.stack);
    await connection.close();
    return { error: `Error al obtener equipajes: ${error.message}`, success: false };
  }
};


// Crear equipaje con validaciones y auditoría
exports.createEquipaje = async (data) => {
  const { id_reserva, peso, dimensiones, estado } = data;
  const connection = await getConnection();

  console.log('Datos recibidos para crear equipaje:', JSON.stringify(data, null, 2));

  // 🔎 Validar existencia de reserva antes de insertar
  const reservaExistente = await connection.execute(
    `SELECT COUNT(*) AS total FROM RESERVAS WHERE ID_RESERVA = :id_reserva`,
    { id_reserva }
  );

  if (reservaExistente.rows[0].TOTAL === 0) {
    throw new Error('La reserva especificada no existe.');
  }

  try {
    console.log('Ejecutando INSERT sin transacción...');
    
    const result = await connection.execute(
      `INSERT INTO EQUIPAJES (ID_EQUIPAJE, ID_RESERVA, PESO, DIMENSIONES, ESTADO)
       VALUES (seq_equipajes.NEXTVAL, :id_reserva, :peso, :dimensiones, :estado)`,
      { id_reserva, peso, dimensiones, estado }
    );

    console.log('Resultado de la inserción:', result);

    if (result.rowsAffected > 0) {
      console.log('✔ Equipaje insertado con éxito.');
      
      // 🟢 Asegurar que la inserción se guarde permanentemente
      await connection.execute('COMMIT');

      await connection.close();
      return { message: 'Equipaje registrado correctamente', success: true };
    } else {
      console.log('❌ No se afectó ninguna fila.');
      await connection.close();
      return { error: 'No se pudo insertar el equipaje.', success: false };
    }

  } catch (error) {
    console.error('🚨 Error SQL:', error.stack);
    await connection.close();
    return { error: `Error en la creación: ${error.message}`, debug: error.stack, success: false };
  }
};

// Actualizar equipaje con control de concurrencia
exports.getEquipajeById = async (id) => {
  const connection = await getConnection();

  try {
    console.log(`🔍 Obteniendo equipaje con ID: ${id}`);
    const result = await connection.execute(`SELECT * FROM EQUIPAJES WHERE ID_EQUIPAJE = :id`, { id });

    await connection.close();

    if (result.rows.length === 0) {
      return { error: 'Equipaje no encontrado.', success: false };
    }
    return { success: true, data: result.rows[0] };
  } catch (error) {
    console.error('🚨 Error en la consulta:', error.stack);
    await connection.close();
    return { error: `Error al obtener equipaje: ${error.message}`, success: false };
  }
};

// 🗑️ Eliminar equipaje con auditoría
exports.deleteEquipaje = async (id) => {
  const connection = await getConnection();

  try {
    console.log(`🗑️ Eliminando equipaje con ID: ${id}`);
    const result = await connection.execute(`DELETE FROM EQUIPAJES WHERE ID_EQUIPAJE = :id`, { id });

    if (result.rowsAffected === 0) {
      return { error: 'Equipaje no encontrado.', success: false };
    }

    await connection.execute('COMMIT');
    await connection.close();

    return { message: 'Equipaje eliminado correctamente.', success: true };
  } catch (error) {
    console.error('🚨 Error SQL:', error.stack);
    await connection.close();
    return { error: `Error al eliminar: ${error.message}`, success: false };
  }
};
