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

// Crear un nuevo mantenimiento incluyendo tipo de revisión y validaciones
exports.createMantenimiento = async (data) => {
  const { id_avion, fecha_inicio, fecha_fin, descripcion, tipo_mantenimiento, tipo_revision, estado } = data;
  const connection = await getConnection();

  // Validar que el avión existe
  const avionExistente = await connection.execute(
    `SELECT COUNT(*) AS total FROM AVIONES WHERE ID_AVION = :id_avion`,
    [id_avion]
  );

  if (avionExistente.rows[0].TOTAL === 0) {
    throw new Error('El avión especificado no existe.');
  }

  // Validar estado
  if (!['Pendiente', 'En proceso', 'Finalizado'].includes(estado)) {
    throw new Error("Estado inválido. Debe ser 'Pendiente', 'En proceso' o 'Finalizado'.");
  }

  // Validar tipo de revisión
  if (!['preventivo', 'correctivo'].includes(tipo_revision)) {
    throw new Error("Tipo de revisión inválido. Debe ser 'preventivo' o 'correctivo'.");
  }

  try {
    await connection.execute('BEGIN');

    await connection.execute(
      `INSERT INTO MANTENIMIENTO (ID_MANTENIMIENTO, ID_AVION, FECHA_INICIO, FECHA_FIN, DESCRIPCION, TIPO_MANTENIMIENTO, TIPO_REVISION, ESTADO)
       VALUES (seq_mantenimiento.NEXTVAL, :id_avion, :fecha_inicio, :fecha_fin, :descripcion, :tipo_mantenimiento, :tipo_revision, :estado)`,
      { id_avion, fecha_inicio, fecha_fin, descripcion, tipo_mantenimiento, tipo_revision, estado }
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

// Actualizar mantenimiento con validaciones
exports.updateMantenimiento = async (id, data) => {
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
      `UPDATE MANTENIMIENTO SET DESCRIPCION = :descripcion, TIPO_REVISION = :tipo_revision
       WHERE ID_MANTENIMIENTO = :id`,
      { descripcion: data.descripcion, tipo_revision: data.tipo_revision, id }
    );

    if (result.rowsAffected === 0) {
      throw new Error('La actualización no se realizó. Verifica los datos e intenta nuevamente.');
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

    await connection.execute(`DELETE FROM MANTENIMIENTO WHERE ID_MANTENIMIENTO = :id`, [id]);

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