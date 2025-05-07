//servicio para la gestion de .....
const oracledb = require('oracledb');
const { getConnection } = require('../../config/db');

exports.getAllProgramacionesEstacionales = async () => {
  const connection = await getConnection();
  const result = await connection.execute(`SELECT * FROM PROGRAMACION_ESTACIONAL`);
  await connection.close();
  return result.rows;
};

exports.getProgramacionEstacionalById = async (id) => {
  const connection = await getConnection();
  const result = await connection.execute(
    `SELECT * FROM PROGRAMACION_ESTACIONAL WHERE ID_PROGRAMACION = :id`,
    [id]
  );
  await connection.close();
  return result.rows[0];
};

exports.createProgramacionEstacional = async (data) => {
  const { id_programa, temporada, descripcion } = data;

  const connection = await getConnection();
  await connection.execute(
    `INSERT INTO PROGRAMACION_ESTACIONAL (
      ID_PROGRAMA, TEMPORADA, DESCRIPCION
    ) VALUES (
      :id_programa, :temporada, :descripcion
    )`,
    { id_programa, temporada, descripcion },
    { autoCommit: true }
  );
  await connection.close();
  return { message: 'Programación estacional creada correctamente' };
};

exports.updateProgramacionEstacional = async (id, data) => {
  const { id_programa, temporada, descripcion } = data;

  const connection = await getConnection();
  await connection.execute(
    `UPDATE PROGRAMACION_ESTACIONAL SET
      ID_PROGRAMA = :id_programa,
      TEMPORADA = :temporada,
      DESCRIPCION = :descripcion
    WHERE ID_PROGRAMACION = :id`,
    { id_programa, temporada, descripcion, id },
    { autoCommit: true }
  );
  await connection.close();
  return { message: 'Programación estacional actualizada correctamente' };
};

exports.deleteProgramacionEstacional = async (id) => {
  const connection = await getConnection();
  await connection.execute(
    `DELETE FROM PROGRAMACION_ESTACIONAL WHERE ID_PROGRAMACION = :id`,
    [id],
    { autoCommit: true }
  );
  await connection.close();
  return { message: 'Programación estacional eliminada correctamente' };
};
