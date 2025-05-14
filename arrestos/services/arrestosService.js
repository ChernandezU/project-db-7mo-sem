const oracledb = require('oracledb');
const { getConnection } = require('../../config/db');

// ✅ Obtener todos los arrestos
exports.getAllArrestos = async () => {
  const connection = await getConnection();
  const result = await connection.execute(
    `SELECT ID_ARRESTO, ID_PERSONAL, DETALLE, FECHA_ARRESTO FROM ARRESTOS ORDER BY FECHA_ARRESTO DESC`
  );
  await connection.close();
  return result.rows;
};

// ✅ Obtener un arresto por ID con validación previa
exports.getArrestoById = async (id_arresto) => {
  const connection = await getConnection();

  console.log('📌 Buscando arresto con ID_ARRESTO:', id_arresto);

  // 🔎 Verificar si el ID_ARRESTO existe antes de consultarlo
  const exists = await connection.execute(
    `SELECT COUNT(*) AS total FROM ARRESTOS WHERE ID_ARRESTO = :id_arresto`,
    { id_arresto }
  );

  if (exists.rows[0].TOTAL === 0) {
    throw new Error(`No se encontró arresto con ID_ARRESTO ${id_arresto}`);
  }

  const result = await connection.execute(
    `SELECT ID_ARRESTO, ID_PERSONAL, DETALLE, FECHA_ARRESTO FROM ARRESTOS WHERE ID_ARRESTO = :id_arresto`,
    { id_arresto }
  );
  await connection.close();
  return result.rows[0];
};
// ✅ Eliminar un arresto con validación previa
exports.deleteArresto = async (id_arresto) => {
  const connection = await getConnection();

  console.log('📌 Eliminando arresto con ID_ARRESTO:', id_arresto);

  // 🔎 Verificar si el ID_ARRESTO existe antes de eliminar
  const exists = await connection.execute(
    `SELECT COUNT(*) AS total FROM ARRESTOS WHERE ID_ARRESTO = :id_arresto`,
    { id_arresto }
  );

  if (exists.rows[0].TOTAL === 0) {
    throw new Error(`No se encontró arresto con ID_ARRESTO ${id_arresto} para eliminar.`);
  }

  await connection.execute(
    `DELETE FROM ARRESTOS WHERE ID_ARRESTO = :id_arresto`,
    { id_arresto },
    { autoCommit: true }
  );

  await connection.close();
  return { message: 'Arresto eliminado correctamente' };
};