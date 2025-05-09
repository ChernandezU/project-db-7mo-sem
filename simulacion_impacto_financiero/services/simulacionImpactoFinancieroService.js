const oracledb = require('oracledb');
const { getConnection } = require('../../config/db');

// Obtener todas las simulaciones financieras con bloqueo seguro
exports.getAllSimulacionesFinancieras = async () => {
  const connection = await getConnection();
  const result = await connection.execute(
    `SELECT * FROM SIMULACION_IMPACTO_FINANCIERO ORDER BY FECHA_SIMULACION FOR UPDATE SKIP LOCKED`
  );
  await connection.close();
  return result.rows;
};

// Obtener simulación financiera por ID con bloqueo seguro
exports.getSimulacionFinancieraById = async (id) => {
  const connection = await getConnection();
  const result = await connection.execute(
    `SELECT * FROM SIMULACION_IMPACTO_FINANCIERO WHERE ID_SIMULACION = :id FOR UPDATE NOWAIT`,
    [id]
  );
  await connection.close();
  return result.rows[0];
};

// Crear una nueva simulación financiera con validaciones y auditoría
exports.createSimulacionFinanciera = async (data) => {
  const { id_factura, fecha_simulacion, impacto_monetario, descripcion } = data;
  const connection = await getConnection();

  // Validar que la factura existe
  const facturaExistente = await connection.execute(
    `SELECT COUNT(*) AS total FROM FACTURACION WHERE ID_FACTURA = :id_factura`,
    [id_factura]
  );

  if (facturaExistente.rows[0].TOTAL === 0) {
    throw new Error('La factura especificada no existe.');
  }

  try {
    await connection.execute('BEGIN');

    await connection.execute(
      `INSERT INTO SIMULACION_IMPACTO_FINANCIERO (ID_SIMULACION, ID_FACTURA, FECHA_SIMULACION, IMPACTO_MONETARIO, DESCRIPCION, VERSION)
       VALUES (seq_simulacion_financiero.NEXTVAL, :id_factura, :fecha_simulacion, :impacto_monetario, :descripcion, 1)`,
      { id_factura, fecha_simulacion, impacto_monetario, descripcion }
    );

    // Auditoría de creación
    await connection.execute(
      `INSERT INTO AUDITORIA_SIMULACION_FINANCIERO (ID_SIMULACION, ID_FACTURA, FECHA_CAMBIO, ACCION)
       VALUES (seq_simulacion_financiero.CURRVAL, :id_factura, SYSDATE, 'Creación')`,
      { id_factura }
    );

    await connection.execute('COMMIT');
  } catch (err) {
    await connection.execute('ROLLBACK');
    throw err;
  }

  await connection.close();
  return { message: 'Simulación financiera creada correctamente' };
};

// Actualizar simulación financiera con manejo de versiones y auditoría
exports.updateSimulacionFinanciera = async (id, data, version_actual) => {
  const connection = await getConnection();

  try {
    await connection.execute('BEGIN');

    const result = await connection.execute(
      `UPDATE SIMULACION_IMPACTO_FINANCIERO SET IMPACTO_MONETARIO = :impacto_monetario, VERSION = VERSION + 1 
       WHERE ID_SIMULACION = :id AND VERSION = :version_actual`,
      { impacto_monetario: data.impacto_monetario, id, version_actual }
    );

    if (result.rowsAffected === 0) {
      throw new Error('Otro usuario ya modificó esta simulación. Recarga la página e intenta nuevamente.');
    }

    // Auditoría de actualización
    await connection.execute(
      `INSERT INTO AUDITORIA_SIMULACION_FINANCIERO (ID_SIMULACION, ID_FACTURA, FECHA_CAMBIO, ACCION)
       VALUES (:id, (SELECT ID_FACTURA FROM SIMULACION_IMPACTO_FINANCIERO WHERE ID_SIMULACION = :id), SYSDATE, 'Actualización')`,
      { id }
    );

    await connection.execute('COMMIT');
  } catch (err) {
    await connection.execute('ROLLBACK');
    throw err;
  }

  await connection.close();
  return { message: 'Simulación financiera actualizada correctamente' };
};

// Eliminar simulación financiera con auditoría
exports.deleteSimulacionFinanciera = async (id) => {
  const connection = await getConnection();

  try {
    await connection.execute('BEGIN');

    await connection.execute(
      `DELETE FROM SIMULACION_IMPACTO_FINANCIERO WHERE ID_SIMULACION = :id`,
      [id]
    );

    // Auditoría de eliminación
    await connection.execute(
      `INSERT INTO AUDITORIA_SIMULACION_FINANCIERO (ID_SIMULACION, FECHA_CAMBIO, ACCION)
       VALUES (:id, SYSDATE, 'Eliminación')`,
      { id }
    );

    await connection.execute('COMMIT');
  } catch (err) {
    await connection.execute('ROLLBACK');
    throw err;
  }

  await connection.close();
  return { message: 'Simulación financiera eliminada correctamente' };
};