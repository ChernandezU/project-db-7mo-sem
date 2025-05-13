const oracledb = require('oracledb');
const { getConnection } = require('../../config/db');

// Obtener todas las facturas con concurrencia optimizada
exports.getAllFacturas = async () => {
  const connection = await getConnection();
  const result = await connection.execute(
    `SELECT * FROM FACTURACION ORDER BY FECHA_FACTURA FOR UPDATE SKIP LOCKED`
  );
  await connection.close();
  return result.rows;
};

// Obtener factura por ID con bloqueo seguro
exports.getFacturaById = async (id) => {
  const connection = await getConnection();
  const result = await connection.execute(
    `SELECT * FROM FACTURACION WHERE ID_FACTURA = :id FOR UPDATE NOWAIT`,
    [id]
  );
  await connection.close();
  return result.rows[0];
};

// Crear factura con secuencia y auditoría
exports.createFactura = async (data) => {
  const { id_reserva, monto } = data;
  const connection = await getConnection();

  // Validar existencia de reserva
  const reserva = await connection.execute(
    `SELECT COUNT(*) AS total FROM RESERVAS WHERE ID_RESERVA = :id_reserva`,
    [id_reserva]
  );

  if (reserva.rows[0].TOTAL === 0) {
    throw new Error('La reserva especificada no existe.');
  }

  // Obtener monto total incluyendo equipaje
  const montoEquipaje = await connection.execute(
    `SELECT NVL(SUM(monto_equipaje), 0) AS monto_equipaje FROM PAGOS WHERE ID_FACTURA = (SELECT ID_FACTURA FROM FACTURACION WHERE ID_RESERVA = :id_reserva)`,
    [id_reserva]
  );

  const totalFactura = monto + montoEquipaje.rows[0].MONTO_EQUIPAJE;

  try {
    await connection.execute('BEGIN');

    await connection.execute(
      `INSERT INTO FACTURACION (ID_RESERVA, MONTO, FECHA_FACTURA, VERSION)
       VALUES (:id_reserva, :totalFactura, SYSDATE, 1)`,
      { id_reserva, totalFactura }
    );

    // Auditoría de creación de factura
    await connection.execute(
      `INSERT INTO AUDITORIA_FACTURACION (ID_FACTURA, ID_RESERVA, MONTO, FECHA_CAMBIO, ACCION)
       VALUES (seq_facturacion.CURRVAL, :id_reserva, :totalFactura, SYSDATE, 'Creación')`,
      { id_reserva, totalFactura }
    );

    await connection.execute('COMMIT');
  } catch (err) {
    await connection.execute('ROLLBACK');
    throw err;
  }

  await connection.close();
  return { message: 'Factura creada correctamente' };
};

// Actualizar factura con control de concurrencia
exports.updateFactura = async (id, data) => {
  const connection = await getConnection();

  try {
    await connection.execute('BEGIN');

    const result = await connection.execute(
      `UPDATE FACTURACION SET MONTO = :monto, VERSION = VERSION + 1 
       WHERE ID_FACTURA = :id AND VERSION = :version_actual`,
      { monto: data.monto, id, version_actual: data.version }
    );

    if (result.rowsAffected === 0) {
      throw new Error('Otro usuario ya modificó esta factura. Recarga la página e intenta nuevamente.');
    }

    // Auditoría de actualización
    await connection.execute(
      `INSERT INTO AUDITORIA_FACTURACION (ID_FACTURA, ID_RESERVA, MONTO, FECHA_CAMBIO, ACCION)
       VALUES (:id, (SELECT ID_RESERVA FROM FACTURACION WHERE ID_FACTURA = :id), :monto, SYSDATE, 'Actualización')`,
      { id, monto: data.monto }
    );

    await connection.execute('COMMIT');
  } catch (err) {
    await connection.execute('ROLLBACK');
    throw err;
  }

  await connection.close();
  return { message: 'Factura actualizada correctamente' };
};

// Eliminar factura con auditoría
exports.deleteFactura = async (id) => {
  const connection = await getConnection();

  try {
    await connection.execute('BEGIN');

    await connection.execute(`DELETE FROM FACTURACION WHERE ID_FACTURA = :id`, [id]);

    // Auditoría de eliminación
    await connection.execute(
      `INSERT INTO AUDITORIA_FACTURACION (ID_FACTURA, FECHA_CAMBIO, ACCION)
       VALUES (:id, SYSDATE, 'Eliminación')`,
      { id }
    );

    await connection.execute('COMMIT');
  } catch (err) {
    await connection.execute('ROLLBACK');
    throw err;
  }

  await connection.close();
  return { message: 'Factura eliminada correctamente' };
};