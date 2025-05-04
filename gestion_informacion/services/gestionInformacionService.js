//servicio para la gestion de .....
const { getConnection } = require('../../config/db');

exports.obtenerInformacion = async () => {
  const connection = await getConnection();
  try {
    const result = await connection.execute(
      `SELECT * FROM GESTION_INFORMACION`,
      [],
      { outFormat: require('oracledb').OUT_FORMAT_OBJECT }
    );
    return result.rows;
  } finally {
    await connection.close();
  }
};

exports.crearInformacion = async (info) => {
  const { ID_INFORMACION, TIPO, DESCRIPCION, FECHA_REGISTRO } = info;
  const connection = await getConnection();
  try {
    await connection.execute(
      `INSERT INTO GESTION_INFORMACION (ID_INFORMACION, TIPO, DESCRIPCION, FECHA_REGISTRO)
       VALUES (:ID_INFORMACION, :TIPO, :DESCRIPCION, :FECHA_REGISTRO)`,
      { ID_INFORMACION, TIPO, DESCRIPCION, FECHA_REGISTRO },
      { autoCommit: true }
    );
    return { mensaje: 'Información registrada exitosamente' };
  } finally {
    await connection.close();
  }
};

exports.actualizarInformacion = async (id, datos) => {
  const { TIPO, DESCRIPCION, FECHA_REGISTRO } = datos;
  const connection = await getConnection();
  try {
    await connection.execute(
      `UPDATE GESTION_INFORMACION
       SET TIPO = :TIPO,
           DESCRIPCION = :DESCRIPCION,
           FECHA_REGISTRO = :FECHA_REGISTRO
       WHERE ID_INFORMACION = :ID_INFORMACION`,
      { TIPO, DESCRIPCION, FECHA_REGISTRO, ID_INFORMACION: id },
      { autoCommit: true }
    );
    return { mensaje: 'Información actualizada exitosamente' };
  } finally {
    await connection.close();
  }
};

exports.eliminarInformacion = async (id) => {
  const connection = await getConnection();
  try {
    await connection.execute(
      `DELETE FROM GESTION_INFORMACION WHERE ID_INFORMACION = :id`,
      [id],
      { autoCommit: true }
    );
  } finally {
    await connection.close();
  }
};
