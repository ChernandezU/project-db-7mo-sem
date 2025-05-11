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

// Crear un nuevo equipaje sin estado
exports.createEquipaje = async (data) => {
  const { id_reserva, tipo_equipaje, peso, dimensiones, descripcion, id_vuelo } = data;
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
      `INSERT INTO EQUIPAJES (ID_EQUIPAJE, ID_RESERVA, TIPO_EQUIPAJE, PESO, DIMENSIONES, DESCRIPCION, ID_VUELO)
       VALUES (seq_equipajes.NEXTVAL, :id_reserva, :tipo_equipaje, :peso, :dimensiones, :descripcion, :id_vuelo)`,
      { id_reserva, tipo_equipaje, peso, dimensiones, descripcion, id_vuelo }
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

// Actualizar equipaje sin estado
exports.updateEquipaje = async (id, data) => {
  const connection = await getConnection();

  try {
    await connection.execute('BEGIN');

    const result = await connection.execute(
      `UPDATE EQUIPAJES SET TIPO_EQUIPAJE = :tipo_equipaje, PESO = :peso
       WHERE ID_EQUIPAJE = :id`,
      { tipo_equipaje: data.tipo_equipaje, peso: data.peso, id }
    );

    if (result.rowsAffected === 0) {
      throw new Error('La actualización no se realizó. Verifica los datos e intenta nuevamente.');
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

    await connection.execute(`DELETE FROM EQUIPAJES WHERE ID_EQUIPAJE = :id`, [id]);

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