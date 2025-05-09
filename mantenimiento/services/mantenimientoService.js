const oracledb = require('oracledb');
const { getConnection } = require('../../config/db');

// Obtener todos los mantenimientos con bloqueo seguro
exports.getAllMantenimientos = async () => {
  const connection = await getConnection();
  const result = await connection.execute(
    `SELECT * FROM MANTENIMIENTO ORDER BY FECHA_INICIO FOR UPDATE SKIP LOCKED`
  );
  await connection.close();
  return result.rows;
};

// Obtener mantenimiento por ID con bloqueo seguro
exports.getMantenimientoById = async (id) => {
  const connection = await getConnection();
  const result = await connection.execute(
    `SELECT * FROM MANTENIMIENTO WHERE ID_MANTENIMIENTO = :id FOR UPDATE NOWAIT`,
    [id]
  );
  await connection.close();
  return result.rows[0];
};

// Crear un nuevo mantenimiento con validaciones y auditoría
exports.createMantenimiento = async (data) => {
  const { id_avion, fecha_inicio, fecha_fin, descripcion, tipo_mantenimiento, estado } = data;
  const connection = await getConnection();

  // Validar que el avión existe
  const avionExistente = await connection.execute(
    `SELECT COUNT(*) AS total FROM AVIONES WHERE ID_AVION = :id_avion`,
    [id_avion]
  );

  if (avionExistente.rows[0].TOTAL === 0) {
    throw new Error('El avión especificado no existe.');
  }

  try {
    await connection.execute('BEGIN');

    await connection.execute(
      `INSERT INTO MANTENIMIENTO (ID_MANTENIMIENTO, ID_AVION, FECHA_INICIO, FECHA_FIN, DESCRIPCION, TIPO_MANTENIMIENTO, ESTADO, VERSION)
       VALUES (seq_mantenimiento.NEXTVAL, :id_avion, :fecha_inicio, :fecha_fin, :descripcion, :tipo_mantenimiento, :estado, 1)`,
      { id_avion, fecha_inicio, fecha_fin, descripcion, tipo_mantenimiento, estado }
    );

    // Auditoría de creación
    await connection.execute(
      `INSERT INTO AUDITORIA_MANTENIMIENTO (ID_MANTENIMIENTO, ID_AVION, FECHA_CAMBIO, ACCION)
       VALUES (seq_mantenimiento.CURRVAL, :id_avion, SYSDATE, 'Creación')`,
      { id_avion }
    );

    await connection.execute('COMMIT');
  } catch (err) {
    await connection.execute('ROLLBACK');
    throw err;
  }

  await connection.close();
  return { message: 'Mantenimiento creado correctamente' };
};

// Actualizar mantenimiento con manejo de versiones y auditoría
exports.updateMantenimiento = async (id, data, version_actual) => {
  const connection = await getConnection();

  // Verificar si el mantenimiento ya está finalizado
  const mantenimientoExistente = await connection.execute(
    `SELECT ESTADO FROM MANTENIMIENTO WHERE ID_MANTENIMIENTO = :id`,
    [id]
  );

  if (mantenimientoExistente.rows[0].ESTADO === 'Finalizado') {
    throw new Error('No se puede modificar un mantenimiento que ya está finalizado.');
  }

  try {
    await connection.execute('BEGIN');

    const result = await connection.execute(
      `UPDATE MANTENIMIENTO SET DESCRIPCION = :descripcion, VERSION = VERSION + 1 
       WHERE ID_MANTENIMIENTO = :id AND VERSION = :version_actual`,
      { descripcion: data.descripcion, id, version_actual }
    );

    if (result.rowsAffected === 0) {
      throw new Error('Otro usuario ya modificó este mantenimiento. Recarga la página e intenta nuevamente.');
    }

    // Auditoría de actualización
    await connection.execute(
      `INSERT INTO AUDITORIA_MANTENIMIENTO (ID_MANTENIMIENTO, ID_AVION, FECHA_CAMBIO, ACCION)
       VALUES (:id, (SELECT ID_AVION FROM MANTENIMIENTO WHERE ID_MANTENIMIENTO = :id), SYSDATE, 'Actualización')`,
      { id }
    );

    await connection.execute('COMMIT');
  } catch (err) {
    await connection.execute('ROLLBACK');
    throw err;
  }

  await connection.close();
  return { message: 'Mantenimiento actualizado correctamente' };
};

// Eliminar mantenimiento con auditoría
exports.deleteMantenimiento = async (id) => {
  const connection = await getConnection();

  try {
    await connection.execute('BEGIN');

    await connection.execute(
      `DELETE FROM MANTENIMIENTO WHERE ID_MANTENIMIENTO = :id`,
      [id]
    );

    // Auditoría de eliminación
    await connection.execute(
      `INSERT INTO AUDITORIA_MANTENIMIENTO (ID_MANTENIMIENTO, FECHA_CAMBIO, ACCION)
       VALUES (:id, SYSDATE, 'Eliminación')`,
      { id }
    );

    await connection.execute('COMMIT');
  } catch (err) {
    await connection.execute('ROLLBACK');
    throw err;
  }

  await connection.close();
  return { message: 'Mantenimiento eliminado correctamente' };
};