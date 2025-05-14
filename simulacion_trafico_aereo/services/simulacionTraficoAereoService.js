const oracledb = require('oracledb');
const { getConnection } = require('../../config/db');

// ✅ Obtener todas las simulaciones de tráfico aéreo
exports.getAllSimulacionesTrafico = async () => {
  const connection = await getConnection();
  console.log('📌 Ejecutando consulta: SELECT ID_SIMULACION, ID_VUELO, CONDICIONES_CLIMATICAS, TRAFICO_ESTIMADO, IMPACTO_OPERACIONAL FROM SIMULACION_TRAFICO_AEREO');

  const result = await connection.execute(
    `SELECT ID_SIMULACION, ID_VUELO, CONDICIONES_CLIMATICAS, TRAFICO_ESTIMADO, IMPACTO_OPERACIONAL 
     FROM SIMULACION_TRAFICO_AEREO 
     ORDER BY ID_SIMULACION ASC`
  );

  console.log('📌 Resultados obtenidos:', result.rows); // 🔎 Depuración
  await connection.close();
  return result.rows;
};