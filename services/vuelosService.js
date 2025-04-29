//aquí se verán los procedimientos de pl/sql

const db = require('../config/db');

exports.obtenerVuelos = async () => {
  const conn = await db.getConnection();
  const result = await conn.execute(`SELECT * FROM VUELOS`);
  await conn.close();
  return result.rows;
};
