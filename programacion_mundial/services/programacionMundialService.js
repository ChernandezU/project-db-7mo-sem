// Aquí se maneja la lógica de interacción con la base de datos
const oracledb = require('oracledb');
const { getConnection } = require('../../config/db');

exports.getAllProgramacionesMundiales = async () => {
  const connection = await getConnection();
  const result = await connection.execute(`SELECT * FROM PROGRAMACION_MUNDIAL`);
  await connection.close();
  return result.rows;
};

exports.getProgramacionMundialById = async (id) => {
  const connection = await getConnection();
  const result = await connection.execute(
    `SELECT * FROM PROGRAMACION_MUNDIAL WHERE ID_PROGRAMACION = :id`,
    [id]
  );
  await connection.close();
  return result.rows[0];
};

exports.createProgramacionMundial = async (data) => {
  const { id_programa, region, descripcion } = data;

  const connection = await getConnection();
  await connection.execute(
    `INSERT INTO PROGRAMACION_MUNDIAL (
      ID_PROGRAMA, REGION, DESCRIPCION
    ) VALUES (
      :id_programa, :region, :descripcion
    )`,
    { id_programa, region, descripcion },
    { autoCommit: true }
  );
  await connection.close();
  return { message: 'Programación mundial creada correctamente' };
};

exports.updateProgramacionMundial = async (id, data) => {
  const { id_programa, region, descripcion } = data;

  const connection = await getConnection();
  await connection.execute(
    `UPDATE PROGRAMACION_MUNDIAL SET
      ID_PROGRAMA = :id_programa,
      REGION = :region,
      DESCRIPCION = :descripcion
    WHERE ID_PROGRAMACION = :id`,
    { id_programa, region, descripcion, id },
    { autoCommit: true }
  );
  await connection.close();
  return { message: 'Programación mundial actualizada correctamente' };
};

exports.deleteProgramacionMundial = async (id) => {
  const connection = await getConnection();
  await connection.execute(
    `DELETE FROM PROGRAMACION_MUNDIAL WHERE ID_PROGRAMACION = :id`,
    [id],
    { autoCommit: true }
  );
  await connection.close();
  return { message: 'Programación mundial eliminada correctamente' };
};
