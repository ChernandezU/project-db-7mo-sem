//configuración de la base de datos

require('dotenv').config();
const oracledb = require('oracledb');

exports.getConnection = async () => {
  return await oracledb.getConnection({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    connectionString: process.env.DB_CONNECTION
  });
};
