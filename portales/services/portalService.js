//servicio para la gestion de .....
const oracledb = require('oracledb');
const { getConnection } = require('../../config/db');

// ✅ Obtener todos los portales
exports.getAllPortales = async () => {
  const connection = await getConnection();
  console.log('📌 Ejecutando consulta: SELECT ID_PORTAL, NOMBRE, URL, ACTIVO FROM PORTALES');

  const result = await connection.execute(
    `SELECT ID_PORTAL, NOMBRE, URL, ACTIVO 
     FROM PORTALES 
     ORDER BY ID_PORTAL ASC`
  );

  console.log('📌 Resultados obtenidos:', result.rows); // 🔎 Depuración
  await connection.close();
  return result.rows;
};
