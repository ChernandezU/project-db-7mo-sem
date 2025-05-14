const oracledb = require('oracledb');
const { getConnection } = require('../../config/db');

// ✅ Obtener todos los pagos
exports.getAllPagos = async () => {
  const connection = await getConnection();
  const result = await connection.execute(
    `SELECT ID_PAGO, ID_FACTURA, METODO_PAGO, MONTO_PAGADO, MONTO_EQUIPAJE, DETALLE_PAGO, FECHA_PAGO 
     FROM PAGOS 
     ORDER BY FECHA_PAGO DESC`
  );
  await connection.close();
  return result.rows;
};

// ✅ Obtener pago por ID con validación previa
exports.getPagoById = async (id_pago) => {
  const connection = await getConnection();

  console.log('📌 Buscando pago con ID_PAGO:', id_pago);

  const exists = await connection.execute(
    `SELECT COUNT(*) AS total FROM PAGOS WHERE ID_PAGO = :id_pago`,
    { id_pago }
  );

  if (exists.rows[0].TOTAL === 0) {
    throw new Error(`No se encontró pago con ID_PAGO ${id_pago}`);
  }

  const result = await connection.execute(
    `SELECT ID_PAGO, ID_FACTURA, METODO_PAGO, MONTO_PAGADO, MONTO_EQUIPAJE, DETALLE_PAGO, FECHA_PAGO 
     FROM PAGOS 
     WHERE ID_PAGO = :id_pago`,
    { id_pago }
  );
  await connection.close();
  return result.rows[0];
};

// ✅ Crear un nuevo pago con validaciones
exports.createPago = async (data) => {
  const { id_factura, metodo_pago, monto_pagado, monto_equipaje, detalle_pago } = data;
  const connection = await getConnection();

  console.log('📌 Insertando pago:', { id_factura, metodo_pago, monto_pagado, monto_equipaje, detalle_pago });

  // 🔎 Validar que ID_FACTURA existe antes de insertar
  const facturaExistente = await connection.execute(
    `SELECT COUNT(*) AS total FROM FACTURACION WHERE ID_FACTURA = :id_factura`,
    { id_factura }
  );

  if (facturaExistente.rows[0].TOTAL === 0) {
    throw new Error(`No se encontró factura con ID_FACTURA ${id_factura}`);
  }

  await connection.execute(
    `INSERT INTO PAGOS (ID_FACTURA, METODO_PAGO, MONTO_PAGADO, MONTO_EQUIPAJE, DETALLE_PAGO, FECHA_PAGO) 
     VALUES (:id_factura, :metodo_pago, :monto_pagado, :monto_equipaje, :detalle_pago, SYSDATE)`,
    { id_factura, metodo_pago, monto_pagado, monto_equipaje, detalle_pago },
    { autoCommit: true }
  );

  await connection.close();
  return { message: 'Pago registrado correctamente' };
};

// ✅ Eliminar pago con validación previa
exports.deletePago = async (id_pago) => {
  const connection = await getConnection();

  console.log('📌 Eliminando pago con ID_PAGO:', id_pago);

  const exists = await connection.execute(
    `SELECT COUNT(*) AS total FROM PAGOS WHERE ID_PAGO = :id_pago`,
    { id_pago }
  );

  if (exists.rows[0].TOTAL === 0) {
    throw new Error(`No se encontró pago con ID_PAGO ${id_pago} para eliminar.`);
  }

  await connection.execute(
    `DELETE FROM PAGOS WHERE ID_PAGO = :id_pago`,
    { id_pago },
    { autoCommit: true }
  );

  await connection.close();
  return { message: 'Pago eliminado correctamente' };
};