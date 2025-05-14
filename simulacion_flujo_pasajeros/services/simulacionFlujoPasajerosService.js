const oracledb = require('oracledb');
const { getConnection } = require('../../config/db');


exports.getAllSimulacionesFlujo = async () => {
  const connection = await getConnection();
  console.log('📌 Ejecutando consulta: SELECT ID_SIMULACION, ID_AEROPUERTO, CAPACIDAD_TERMINAL, TIEMPO_ESPERA_ESTIMADO, CONGESTION_PREDICHA FROM SIMULACION_FLUJO_PASAJEROS');

  const result = await connection.execute(
    `SELECT ID_SIMULACION, ID_AEROPUERTO, CAPACIDAD_TERMINAL, TIEMPO_ESPERA_ESTIMADO, CONGESTION_PREDICHA 
     FROM SIMULACION_FLUJO_PASAJEROS 
     ORDER BY ID_SIMULACION ASC`
  );

  console.log('📌 Resultados obtenidos:', result.rows); // 🔎 Depuración
  await connection.close();
  return result.rows;
};
