const oracledb = require('oracledb');
const { getConnection } = require('../../config/db');

// ✅ Obtener solo los aviones que están en mantenimiento
exports.getAvionesEnMantenimiento = async () => {
  const connection = await getConnection();
  const result = await connection.execute(
    `SELECT ID_AVION, FECHA_MANTENIMIENTO, ESTADO, DESCRIPCION 
     FROM MANTENIMIENTO 
     WHERE ESTADO IN ('En proceso', 'Programado')
     ORDER BY FECHA_MANTENIMIENTO DESC`
  );

  console.log('📌 Resultados obtenidos:', result.rows); // 🔎 Depuración
  await connection.close();
  return result.rows;
};

// ✅ Obtener un mantenimiento por ID de avión
exports.getMantenimientoByAvionId = async (id_avion) => {
  const connection = await getConnection();
  const result = await connection.execute(
    `SELECT ID_AVION, FECHA_MANTENIMIENTO, ESTADO, DESCRIPCION 
     FROM MANTENIMIENTO 
     WHERE ID_AVION = :id_avion`,
    { id_avion }
  );
  await connection.close();
  return result.rows[0];
};



exports.deleteMantenimientoByAvionId = async (id_avion) => {
  const connection = await getConnection();

  try {
    console.log('📌 Eliminando mantenimiento para ID_AVION:', id_avion);

    const result = await connection.execute(
      `DELETE FROM MANTENIMIENTO WHERE ID_AVION = :id_avion`,
      { id_avion },
      { autoCommit: true } // 🔥 Asegurar que Oracle no requiera `COMMIT` manualmente
    );

    console.log('📌 Filas eliminadas:', result.rowsAffected);

    if (result.rowsAffected === 0) {
      throw new Error('No se encontró mantenimiento para eliminar.');
    }

  } catch (err) {
    throw err;
  } finally {
    await connection.close();
  }

  return { message: 'Mantenimiento eliminado correctamente' };
};