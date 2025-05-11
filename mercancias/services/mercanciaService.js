const oracledb = require('oracledb');
const { getConnection } = require('../../config/db');

// Obtener todas las mercancías
exports.getAllMercancias = async () => {
  const connection = await getConnection();
  const result = await connection.execute(`SELECT * FROM MERCANCIAS`);
  await connection.close();
  return result.rows;
};

// Obtener mercancía por ID
exports.getMercanciaById = async (id) => {
  const connection = await getConnection();
  const result = await connection.execute(
    `SELECT * FROM MERCANCIAS WHERE ID_MERCANCIA = :id`,
    [id]
  );
  await connection.close();
  return result.rows[0];
};

// Crear una nueva mercancía con validaciones y auditoría
exports.createMercancia = async (data) => {
  const { descripcion, peso, id_reserva, tipo_envio, estado_envio } = data;
  const connection = await getConnection();

  // Validar que la reserva existe
  const reservaExistente = await connection.execute(
    `SELECT COUNT(*) AS total FROM RESERVAS WHERE ID_RESERVA = :id_reserva`,
    [id_reserva]
  );

  if (reservaExistente.rows[0].TOTAL === 0) {
    throw new Error('La reserva especificada no existe.');
  }

  // Validar tipo de envío
  if (!['comercial', 'equipaje especial'].includes(tipo_envio)) {
    throw new Error("Tipo de envío inválido. Debe ser 'comercial' o 'equipaje especial'.");
  }

  // Validar estado de envío
  if (!['Pendiente', 'En tránsito', 'Entregado', 'Cancelado'].includes(estado_envio)) {
    throw new Error("Estado inválido. Debe ser 'Pendiente', 'En tránsito', 'Entregado' o 'Cancelado'.");
  }

  try {
    await connection.execute('BEGIN');

    await connection.execute(
      `INSERT INTO MERCANCIAS (DESCRIPCION, PESO, ID_RESERVA, TIPO_ENVIO, ESTADO_ENVIO)
       VALUES (:descripcion, :peso, :id_reserva, :tipo_envio, :estado_envio)`,
      { descripcion, peso, id_reserva, tipo_envio, estado_envio }
    );

    // Auditoría de creación
    await connection.execute(
      `INSERT INTO AUDITORIA_MERCANCIAS (ID_MERCANCIA, ID_RESERVA, FECHA_CAMBIO, ACCION)
       VALUES (seq_mercancias.CURRVAL, :id_reserva, SYSDATE, 'Creación')`,
      { id_reserva }
    );

    await connection.execute('COMMIT');
  } catch (err) {
    await connection.execute('ROLLBACK');
    throw err;
  }

  await connection.close();
  return { message: 'Mercancía creada correctamente' };
};

// Actualizar mercancía con validaciones
exports.updateMercancia = async (id, data) => {
  const connection = await getConnection();

  try {
    await connection.execute('BEGIN');

    const result = await connection.execute(
      `UPDATE MERCANCIAS SET DESCRIPCION = :descripcion, PESO = :peso, ID_RESERVA = :id_reserva, ESTADO_ENVIO = :estado_envio
       WHERE ID_MERCANCIA = :id`,
      { descripcion: data.descripcion, peso: data.peso, id_reserva: data.id_reserva, estado_envio: data.estado_envio, id }
    );

    if (result.rowsAffected === 0) {
      throw new Error('La actualización no se realizó. Verifica los datos e intenta nuevamente.');
    }

    // Auditoría de actualización
    await connection.execute(
      `INSERT INTO AUDITORIA_MERCANCIAS (ID_MERCANCIA, ID_RESERVA, FECHA_CAMBIO, ACCION)
       VALUES (:id, (SELECT ID_RESERVA FROM MERCANCIAS WHERE ID_MERCANCIA = :id), SYSDATE, 'Actualización')`,
      { id }
    );

    await connection.execute('COMMIT');
  } catch (err) {
    await connection.execute('ROLLBACK');
    throw err;
  }

  await connection.close();
  return { message: 'Mercancía actualizada correctamente' };
};

// Eliminar mercancía con auditoría
exports.deleteMercancia = async (id) => {
  const connection = await getConnection();

  try {
    await connection.execute('BEGIN');

    await connection.execute(`DELETE FROM MERCANCIAS WHERE ID_MERCANCIA = :id`, [id]);

    // Auditoría de eliminación
    await connection.execute(
      `INSERT INTO AUDITORIA_MERCANCIAS (ID_MERCANCIA, FECHA_CAMBIO, ACCION)
       VALUES (:id, SYSDATE, 'Eliminación')`,
      { id }
    );

    await connection.execute('COMMIT');
  } catch (err) {
    await connection.execute('ROLLBACK');
    throw err;
  }

  await connection.close();
  return { message: 'Mercancía eliminada correctamente' };
};