const oracledb = require('oracledb');
const { getConnection } = require('../../config/db');

// ✅ Obtener todas las facturas
exports.getAllFacturas = async () => {
  const connection = await getConnection();
  const result = await connection.execute(
    `SELECT ID_FACTURA, ID_RESERVA, MONTO, FECHA_FACTURA FROM FACTURACION ORDER BY FECHA_FACTURA DESC`
  );
  await connection.close();
  return result.rows;
};

// ✅ Obtener factura por ID con validación previa
exports.getFacturaById = async (id_factura) => {
  if (!id_factura) {
    throw new Error('ID_FACTURA es obligatorio.');
  }

  const connection = await getConnection();
  console.log('📌 Buscando factura con ID_FACTURA:', id_factura);

  const result = await connection.execute(
    `SELECT ID_FACTURA, ID_RESERVA, MONTO, FECHA_FACTURA FROM FACTURACION WHERE ID_FACTURA = :id_factura`,
    { id_factura }
  );

  await connection.close();

  if (!result.rows.length) {
    throw new Error(`No se encontró factura con ID_FACTURA ${id_factura}`);
  }

  return result.rows[0];
};

// ✅ Crear una nueva factura con validaciones
exports.createFactura = async (data) => {
  const { id_reserva, monto } = data;
  const connection = await getConnection();

  console.log('📌 Insertando factura:', { id_reserva, monto });

  // 🔎 Validar que ID_RESERVA existe antes de insertar
  const reservaExistente = await connection.execute(
    `SELECT COUNT(*) AS total FROM RESERVAS WHERE ID_RESERVA = :id_reserva`,
    { id_reserva }
  );

  if (reservaExistente.rows[0].TOTAL === 0) {
    throw new Error(`No se encontró reserva con ID_RESERVA ${id_reserva}`);
  }

  await connection.execute(
    `INSERT INTO FACTURACION (ID_RESERVA, MONTO, FECHA_FACTURA) 
     VALUES (:id_reserva, :monto, SYSDATE)`,
    { id_reserva, monto },
    { autoCommit: true }
  );

  await connection.close();
  return { message: 'Factura creada correctamente' };
};

// ✅ Eliminar factura con validación previa
exports.deleteFactura = async (id_factura) => {
  const connection = await getConnection();

  console.log('📌 Eliminando factura con ID_FACTURA:', id_factura);

  const exists = await connection.execute(
    `SELECT COUNT(*) AS total FROM FACTURACION WHERE ID_FACTURA = :id_factura`,
    { id_factura }
  );

  if (exists.rows[0].TOTAL === 0) {
    throw new Error(`No se encontró factura con ID_FACTURA ${id_factura} para eliminar.`);
  }

  await connection.execute(
    `DELETE FROM FACTURACION WHERE ID_FACTURA = :id_factura`,
    { id_factura },
    { autoCommit: true }
  );

  await connection.close();
  return { message: 'Factura eliminada correctamente' };
};