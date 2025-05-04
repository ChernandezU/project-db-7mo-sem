// Configuración de la base de datos
const oracledb = require('oracledb');

const dbConfig = {
  user: 'AEROPUERTO',
  password: '1234',
  connectString: '192.168.0.44:1521/orcl' // IP:PUERTO/SID corregido
};

async function getConnection() {
  try {
    const connection = await oracledb.getConnection(dbConfig);
    console.log('Conexión exitosa a Oracle DB');
    return connection;
  } catch (err) {
    console.error('Error al conectar a Oracle DB:', err);
    throw err;
  }
}

// Exportando la función para reutilización
module.exports = { getConnection };