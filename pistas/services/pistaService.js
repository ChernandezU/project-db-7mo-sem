//servicio para la gestion de .....
const oracledb = require('oracledb');
const { getConnection } = require('../../config/db');


// ✅ Obtener todas las pistas
exports.getAllPistas = async () => {
  const connection = await getConnection();
  console.log('📌 Ejecutando consulta: SELECT ID_PISTA, NOMBRE, ESTADO, LONGITUD, ANCHO FROM PISTAS');

  const result = await connection.execute(
    `SELECT ID_PISTA, NOMBRE, ESTADO, LONGITUD, ANCHO 
     FROM PISTAS 
     ORDER BY ID_PISTA ASC`
  );

  console.log('📌 Resultados obtenidos:', result.rows); // 🔎 Depuración
  await connection.close();
  return result.rows;
};