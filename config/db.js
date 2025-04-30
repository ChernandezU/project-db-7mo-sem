//configuración de la base de datos
const oracledb = require('oracledb');

const dbConfig = {
  user: 'VNSB30',
  password: 'Umg$2025',
  connectString: '181.114.16.49:1521/oracle' // IP:PUERTO/SID
};

async function getConnection() {
  try {
    return await oracledb.getConnection(dbConfig);
  } catch (err) {
    console.error('Error al conectar a Oracle DB:', err);
    throw err;
  }
}

module.exports = { getConnection };
