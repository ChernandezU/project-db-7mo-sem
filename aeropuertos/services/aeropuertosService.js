const { getConnection } = require('../../config/db');

exports.obtenerAeropuertos = async () => {
  const connection = await getConnection();
  try {
    const result = await connection.execute(
      `SELECT * FROM AEROPUERTOS`,
      [],
      { outFormat: require('oracledb').OUT_FORMAT_OBJECT }
    );
    return result.rows;
  } finally {
    await connection.close();
  }
};

exports.crearAeropuerto = async (aeropuerto) => {
  const { COD_AEROPUERTO, NOMBRE, PAIS, CIUDAD } = aeropuerto;
  const connection = await getConnection();
  try {
    await connection.execute(
      `INSERT INTO AEROPUERTOS (COD_AEROPUERTO, NOMBRE, PAIS, CIUDAD)
       VALUES (:COD_AEROPUERTO, :NOMBRE, :PAIS, :CIUDAD)`,
      { COD_AEROPUERTO, NOMBRE, PAIS, CIUDAD },
      { autoCommit: true }
    );
    return { mensaje: 'Aeropuerto creado exitosamente' };
  } finally {
    await connection.close();
  }
};

exports.actualizarAeropuerto = async (id, datos) => {
  const { NOMBRE, PAIS, CIUDAD } = datos;
  const connection = await getConnection();
  try {
    await connection.execute(
      `UPDATE AEROPUERTOS
       SET NOMBRE = :NOMBRE,
           PAIS = :PAIS,
           CIUDAD = :CIUDAD
       WHERE COD_AEROPUERTO = :COD_AEROPUERTO`,
      { NOMBRE, PAIS, CIUDAD, COD_AEROPUERTO: id },
      { autoCommit: true }
    );
    return { mensaje: 'Aeropuerto actualizado exitosamente' };
  } finally {
    await connection.close();
  }
};

exports.eliminarAeropuerto = async (id) => {
  const connection = await getConnection();
  try {
    await connection.execute(
      `DELETE FROM AEROPUERTOS WHERE COD_AEROPUERTO = :id`,
      [id],
      { autoCommit: true }
    );
  } finally {
    await connection.close();
  }
};
