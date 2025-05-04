const { getConnection } = require('../../config/db');

// Obtener todos los vuelos
exports.obtenerVuelos = async () => {
  const connection = await getConnection();
  try {
    const result = await connection.execute(`SELECT * FROM VUELOS`, [], { outFormat: require('oracledb').OUT_FORMAT_OBJECT });
    return result.rows;
  } finally {
    await connection.close();
  }
};

// Crear un nuevo vuelo
exports.crearVuelo = async (vuelo) => {
  const { COD_VUELO, COD_AVION, COD_AEROLINEA, COD_AEROPUERTO_ORIGEN, COD_AEROPUERTO_DESTINO, FECHA_SALIDA, FECHA_LLEGADA } = vuelo;
  const connection = await getConnection();
  try {
    await connection.execute(
      `INSERT INTO VUELOS (COD_VUELO, COD_AVION, COD_AEROLINEA, COD_AEROPUERTO_ORIGEN, COD_AEROPUERTO_DESTINO, FECHA_SALIDA, FECHA_LLEGADA)
       VALUES (:COD_VUELO, :COD_AVION, :COD_AEROLINEA, :COD_AEROPUERTO_ORIGEN, :COD_AEROPUERTO_DESTINO, TO_DATE(:FECHA_SALIDA, 'YYYY-MM-DD'), TO_DATE(:FECHA_LLEGADA, 'YYYY-MM-DD'))`,
      { COD_VUELO, COD_AVION, COD_AEROLINEA, COD_AEROPUERTO_ORIGEN, COD_AEROPUERTO_DESTINO, FECHA_SALIDA, FECHA_LLEGADA },
      { autoCommit: true }
    );
    return { mensaje: 'Vuelo creado exitosamente' };
  } finally {
    await connection.close();
  }
};

// Actualizar un vuelo
exports.actualizarVuelo = async (id, datos) => {
  const { COD_AVION, COD_AEROLINEA, COD_AEROPUERTO_ORIGEN, COD_AEROPUERTO_DESTINO, FECHA_SALIDA, FECHA_LLEGADA } = datos;
  const connection = await getConnection();
  try {
    await connection.execute(
      `UPDATE VUELOS
       SET COD_AVION = :COD_AVION,
           COD_AEROLINEA = :COD_AEROLINEA,
           COD_AEROPUERTO_ORIGEN = :COD_AEROPUERTO_ORIGEN,
           COD_AEROPUERTO_DESTINO = :COD_AEROPUERTO_DESTINO,
           FECHA_SALIDA = TO_DATE(:FECHA_SALIDA, 'YYYY-MM-DD'),
           FECHA_LLEGADA = TO_DATE(:FECHA_LLEGADA, 'YYYY-MM-DD')
       WHERE COD_VUELO = :COD_VUELO`,
      { COD_AVION, COD_AEROLINEA, COD_AEROPUERTO_ORIGEN, COD_AEROPUERTO_DESTINO, FECHA_SALIDA, FECHA_LLEGADA, COD_VUELO: id },
      { autoCommit: true }
    );
    return { mensaje: 'Vuelo actualizado exitosamente' };
  } finally {
    await connection.close();
  }
};

// Eliminar un vuelo
exports.eliminarVuelo = async (id) => {
  const connection = await getConnection();
  try {
    await connection.execute(`DELETE FROM VUELOS WHERE COD_VUELO = :id`, [id], { autoCommit: true });
  } finally {
    await connection.close();
  }
};
