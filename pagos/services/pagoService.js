//servicio para la gestion de .....
const oracledb = require('oracledb');
const { getConnection } = require('../../config/db');

// Obtener todos los pagos
exports.getAllPagos = async () => {
  const connection = await getConnection();
  const result = await connection.execute(
    `SELECT * FROM PAGOS ORDER BY FECHA_PAGO FOR UPDATE SKIP LOCKED`
  );
  await connection.close();
  return result.rows;
};

// Obtener pago por ID con bloqueo seguro
exports.getPagoById = async (id) => {
  const connection = await getConnection();
  const result = await connection.execute(
    `SELECT * FROM PAGOS WHERE ID_PAGO = :id FOR UPDATE NOWAIT`,
    [id]
  );
  await connection.close();
  return result.rows[0];
};

// Crear un nuevo pago con validaciones
exports.createPago = async (data) => {
  const { id_factura, metodo_pago, monto_pagado } = data;
  const connection = await getConnection();

  // Validar que la factura exista
  const factura = await connection.execute(
    `SELECT monto FROM FACTURACION WHERE ID_FACTURA = :id_factura`,
    [id_factura]
  );

  if (!factura.rows.length) {
    throw new Error('La factura especificada no existe.');
  }

  const monto_factura = factura.rows[0].MONTO;

  // Verificar que los pagos previos no excedan el monto de la factura
  const totalPagado = await connection.execute(
    `SELECT COALESCE(SUM(MONTO_PAGADO), 0) AS total FROM PAGOS WHERE ID_FACTURA = :id_factura`,
    [id_factura]
  );

  if (totalPagado.rows[0].TOTAL + monto_pagado > monto_factura) {
    throw new Error('El pago excede el monto total de la factura.');
  }

  try {
    await connection.execute('BEGIN');

    await connection.execute(
      `INSERT INTO PAGOS (ID_PAGO, ID_FACTURA, METODO_PAGO, MONTO_PAGADO, FECHA_PAGO)
       VALUES (seq_pagos.NEXTVAL, :id_factura, :metodo_pago, :monto_pagado, SYSDATE)`,
      { id_factura, metodo_pago, monto_pagado }
    );

    // Auditoría de pago
    await connection.execute(
      `INSERT INTO AUDITORIA_PAGOS (ID_PAGO, ID_FACTURA, MONTO, METODO_PAGO, FECHA_CAMBIO, ACCION)
       VALUES (seq_pagos.CURRVAL, :id_factura, :monto_pagado, :metodo_pago, SYSDATE, 'Creación')`,
      { id_factura, monto_pagado, metodo_pago }
    );

    await connection.execute('COMMIT');
  } catch (err) {
    await connection.execute('ROLLBACK');
    throw err;
  }

  await connection.close();
  return { message: 'Pago registrado correctamente' };
};

// Actualizar pago con auditoría
exports.updatePago = async (id, data) => {
  const { metodo_pago, monto_pagado } = data;
  const connection = await getConnection();

  try {
    await connection.execute('BEGIN');

    const result = await connection.execute(
      `UPDATE PAGOS SET METODO_PAGO = :metodo_pago, MONTO_PAGADO = :monto_pagado
       WHERE ID_PAGO = :id`,
      { metodo_pago, monto_pagado, id }
    );

    if (result.rowsAffected === 0) {
      throw new Error('No se encontró el pago especificado.');
    }

    // Auditoría de actualización
    await connection.execute(
      `INSERT INTO AUDITORIA_PAGOS (ID_PAGO, ID_FACTURA, MONTO, METODO_PAGO, FECHA_CAMBIO, ACCION)
       VALUES (:id, (SELECT ID_FACTURA FROM PAGOS WHERE ID_PAGO = :id), :monto_pagado, :metodo_pago, SYSDATE, 'Actualización')`,
      { id, monto_pagado, metodo_pago }
    );

    await connection.execute('COMMIT');
  } catch (err) {
    await connection.execute('ROLLBACK');
    throw err;
  }

  await connection.close();
  return { message: 'Pago actualizado correctamente' };
};

// Eliminar pago con auditoría
exports.deletePago = async (id) => {
  const connection = await getConnection();

  try {
    await connection.execute('BEGIN');

    await connection.execute(
      `DELETE FROM PAGOS WHERE ID_PAGO = :id`,
      [id]
    );

    // Auditoría de eliminación
    await connection.execute(
      `INSERT INTO AUDITORIA_PAGOS (ID_PAGO, FECHA_CAMBIO, ACCION)
       VALUES (:id, SYSDATE, 'Eliminación')`,
      { id }
    );

    await connection.execute('COMMIT');
  } catch (err) {
    await connection.execute('ROLLBACK');
    throw err;
  }

  await connection.close();
  return { message: 'Pago eliminado correctamente' };
};