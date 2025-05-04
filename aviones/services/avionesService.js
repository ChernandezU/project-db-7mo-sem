const { getConnection } = require('../../config/db');

exports.obtenerAviones = async () => {
  const connection = await getConnection();
  try {
    const result = await connection.execute(
      `SELECT * FROM AVIONES`,
      [],
      { outFormat: require('oracledb').OUT_FORMAT_OBJECT }
    );
    return result.rows;
  } finally {
    await connection.close();
  }
};

exports.crearAvion = async (avion) => {
  const { COD_AVION, MODELO, ESTADO_MANTENIMIENTO, TOTAL_ASIENTOS, OCUPADOS, LIBRES } = avion;
  const connection = await getConnection();
  try {
    await connection.execute(
      `INSERT INTO AVIONES (COD_AVION, MODELO, ESTADO_MANTENIMIENTO, TOTAL_ASIENTOS, OCUPADOS, LIBRES)
       VALUES (:COD_AVION, :MODELO, :ESTADO_MANTENIMIENTO, :TOTAL_ASIENTOS, :OCUPADOS, :LIBRES)`,
      { COD_AVION, MODELO, ESTADO_MANTENIMIENTO, TOTAL_ASIENTOS, OCUPADOS, LIBRES },
      { autoCommit: true }
    );
    return { mensaje: 'Avión creado exitosamente' };
  } finally {
    await connection.close();
  }
};

exports.actualizarAvion = async (id, datos) => {
  const { MODELO, ESTADO_MANTENIMIENTO, TOTAL_ASIENTOS, OCUPADOS, LIBRES } = datos;
  const connection = await getConnection();
  try {
    await connection.execute(
      `UPDATE AVIONES
       SET MODELO = :MODELO,
           ESTADO_MANTENIMIENTO = :ESTADO_MANTENIMIENTO,
           TOTAL_ASIENTOS = :TOTAL_ASIENTOS,
           OCUPADOS = :OCUPADOS,
           LIBRES = :LIBRES
       WHERE COD_AVION = :COD_AVION`,
      { MODELO, ESTADO_MANTENIMIENTO, TOTAL_ASIENTOS, OCUPADOS, LIBRES, COD_AVION: id },
      { autoCommit: true }
    );
    return { mensaje: 'Avión actualizado exitosamente' };
  } finally {
    await connection.close();
  }
};

exports.eliminarAvion = async (id) => {
  const connection = await getConnection();
  try {
    await connection.execute(
      `DELETE FROM AVIONES WHERE COD_AVION = :id`,
      [id],
      { autoCommit: true }
    );
  } finally {
    await connection.close();
  }
};
