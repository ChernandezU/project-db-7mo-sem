//configuración de la base de datos de Cristian para pruebas
const oracledb = require('oracledb');

const dbConfig = {
  user: 'VNSB30',
  password: 'Umg$2025',
  connectString: '181.114.16.49:1521/oracle' // IP:PUERTO/SID corregido
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



/*
// Configuración de la base de datos de walter
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
*/