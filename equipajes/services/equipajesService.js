//servicio para la gestion de .....
const oracledb = require('oracledb');
const { getConnection } = require('../../config/db');

// Obtener todos los equipajes con bloqueo seguro
exports.getAllEquipajes = async () => {
  const connection = await getConnection();
  const result = await connection.execute(
    `SELECT * FROM EQUIPAJES ORDER BY ID_EQUIPAJE FOR UPDATE SKIP LOCKED`
  );
  await connection.close();
  return result.rows;
};

// Obtener equipaje por ID con bloqueo seguro
exports.getEquipajeById = async (id) => {
  const connection = await getConnection();
  const result = await connection.execute(
    `SELECT * FROM EQUIPAJES WHERE ID_EQUIPAJE = :id FOR UPDATE NOWAIT`,
    [id]
  );
  await connection.close();
  return result.rows[0];
};

// Crear un nuevo equipaje con validaciones y auditoría
exports.createEquipaje = async (data) => {
  const { id_reserva, tipo_equipaje, peso_kg, dimensiones, descripcion, estado, num_vuelo_asociado } = data;
  const connection = await getConnection();

  // Validar que la reserva exista
  const reserva = await connection.execute(
    `SELECT COUNT(*) AS total FROM RESERVAS WHERE ID_RESERVA = :id_reserva`,
    [id_reserva]
  );

  if (reserva.rows[0].TOTAL === 0) {
    throw new Error('La reserva especificada no existe.');
  }

  try {
    await connection.execute('BEGIN');

    await connection.execute(
      `INSERT INTO EQUIPAJES (ID_EQUIPAJE, ID_RESERVA, TIPO_EQUIPAJE, PESO_KG, DIMENSIONES, DESCRIPCION, ESTADO, NUM_VUELO_ASOCIADO, VERSION)
       VALUES (seq_equipajes.NEXTVAL, :id_reserva, :tipo_equipaje, :peso_kg, :dimensiones, :descripcion, :estado, :num_vuelo_asociado, 1)`,
      { id_reserva, tipo_equipaje, peso_kg, dimensiones, descripcion, estado, num_vuelo_asociado }
    );

    // Auditoría de creación
    await connection.execute(
      `INSERT INTO AUDITORIA_EQUIPAJES (ID_EQUIPAJE, ID_RESERVA, FECHA_CAMBIO, ACCION)
       VALUES (seq_equipajes.CURRVAL, :id_reserva, SYSDATE, 'Creación')`,
      { id_reserva }
    );

    await connection.execute('COMMIT');
  } catch (err) {
    await connection.execute('ROLLBACK');
    throw err;
  }

  await connection.close();
  return { message: 'Equipaje registrado correctamente' };
};

// Actualizar equipaje con manejo de versiones y auditoría
exports.updateEquipaje = async (id, data, version_actual) => {
  const connection = await getConnection();

  try {
    await connection.execute('BEGIN');

    const result = await connection.execute(
      `UPDATE EQUIPAJES SET TIPO_EQUIPAJE = :tipo_equipaje, PESO_KG = :peso_kg, VERSION = VERSION + 1 
       WHERE ID_EQUIPAJE = :id AND VERSION = :version_actual`,
      { tipo_equipaje: data.tipo_equipaje, peso_kg: data.peso_kg, id, version_actual }
    );

    if (result.rowsAffected === 0) {
      throw new Error('Otro usuario ya modificó este equipaje. Recarga la página e intenta nuevamente.');
    }

    // Auditoría de actualización
    await connection.execute(
      `INSERT INTO AUDITORIA_EQUIPAJES (ID_EQUIPAJE, ID_RESERVA, FECHA_CAMBIO, ACCION)
       VALUES (:id, (SELECT ID_RESERVA FROM EQUIPAJES WHERE ID_EQUIPAJE = :id), SYSDATE, 'Actualización')`,
      { id }
    );

    await connection.execute('COMMIT');
  } catch (err) {
    await connection.execute('ROLLBACK');
    throw err;
  }

  await connection.close();
  return { message: 'Equipaje actualizado correctamente' };
};

// Eliminar equipaje con auditoría
exports.deleteEquipaje = async (id) => {
  const connection = await getConnection();

  try {
    await connection.execute('BEGIN');

    await connection.execute(
      `DELETE FROM EQUIPAJES WHERE ID_EQUIPAJE = :id`,
      [id]
    );

    // Auditoría de eliminación
    await connection.execute(
      `INSERT INTO AUDITORIA_EQUIPAJES (ID_EQUIPAJE, FECHA_CAMBIO, ACCION)
       VALUES (:id, SYSDATE, 'Eliminación')`,
      { id }
    );

    await connection.execute('COMMIT');
  } catch (err) {
    await connection.execute('ROLLBACK');
    throw err;
  }

  await connection.close();
  return { message: 'Equipaje eliminado correctamente' };
};