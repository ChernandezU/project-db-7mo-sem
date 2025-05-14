const oracledb = require('oracledb');
const { getConnection } = require('../../config/db');

// ✅ Obtener todas las programaciones estacionales
exports.getAllProgramacionesEstacionales = async () => {
  const connection = await getConnection();
  console.log('📌 Ejecutando consulta: SELECT * FROM PROGRAMACION_ESTACIONAL');

  const result = await connection.execute(
    `SELECT ID_PROGRAMACION, ID_PROGRAMA, TEMPORADA, DESCRIPCION 
     FROM PROGRAMACION_ESTACIONAL 
     ORDER BY ID_PROGRAMACION ASC`
  );

  console.log('📌 Resultados obtenidos:', result.rows); // 🔎 Depuración
  await connection.close();
  return result.rows;
};