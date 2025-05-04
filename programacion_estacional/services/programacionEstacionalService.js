//servicio para la gestion de .....
const { getConnection } = require('../../config/db');

// Obtener todas las programaciones estacionales
async function getAllProgramaciones() {
  const connection = await getConnection();
  const result = await connection.execute(
    `SELECT ID_PROG_ESTACIONAL, DESCRIPCION, FECHA_INICIO, FECHA_FIN FROM PROGRAMACION_ESTACIONAL`,
    [],
    { outFormat: require('oracledb').OUT_FORMAT_OBJECT }
  );
  await connection.close();
  return result.rows;
}

// Obtener una programación por ID
async function getProgramacionById(id) {
  const connection = await getConnection();
  const result = await connection.execute(
    `SELECT ID_PROG_ESTACIONAL, DESCRIPCION, FECHA_INICIO, FECHA_FIN FROM PROGRAMACION_ESTACIONAL WHERE ID_PROG_ESTACIONAL = :id`,
    [id],
    { outFormat: require('oracledb').OUT_FORMAT_OBJECT }
  );
  await connection.close();
  return result.rows[0];
}

// Crear nueva programación
async function createProgramacion(data) {
  const { DESCRIPCION, FECHA_INICIO, FECHA_FIN } = data;
  const connection = await getConnection();
  const result = await connection.execute(
    `INSERT INTO PROGRAMACION_ESTACIONAL (ID_PROG_ESTACIONAL, DESCRIPCION, FECHA_INICIO, FECHA_FIN)
     VALUES (SEQ_PROG_ESTACIONAL.NEXTVAL, :descripcion, TO_DATE(:fechaInicio, 'YYYY-MM-DD'), TO_DATE(:fechaFin, 'YYYY-MM-DD'))
     RETURNING ID_PROG_ESTACIONAL INTO :id`,
    {
      descripcion: DESCRIPCION,
      fechaInicio: FECHA_INICIO,
      fechaFin: FECHA_FIN,
      id: { dir: require('oracledb').BIND_OUT, type: require('oracledb').NUMBER }
    }
  );
  await connection.commit();
  await connection.close();
  return result.outBinds.id[0];
}

// Actualizar programación por ID
async function updateProgramacion(id, data) {
  const { DESCRIPCION, FECHA_INICIO, FECHA_FIN } = data;
  const connection = await getConnection();
  await connection.execute(
    `UPDATE PROGRAMACION_ESTACIONAL
     SET DESCRIPCION = :descripcion,
         FECHA_INICIO = TO_DATE(:fechaInicio, 'YYYY-MM-DD'),
         FECHA_FIN = TO_DATE(:fechaFin, 'YYYY-MM-DD')
     WHERE ID_PROG_ESTACIONAL = :id`,
    {
      descripcion: DESCRIPCION,
      fechaInicio: FECHA_INICIO,
      fechaFin: FECHA_FIN,
      id
    }
  );
  await connection.commit();
  await connection.close();
}

// Eliminar programación por ID
async function deleteProgramacion(id) {
  const connection = await getConnection();
  await connection.execute(
    `DELETE FROM PROGRAMACION_ESTACIONAL WHERE ID_PROG_ESTACIONAL = :id`,
    [id]
  );
  await connection.commit();
  await connection.close();
}

module.exports = {
  getAllProgramaciones,
  getProgramacionById,
  createProgramacion,
  updateProgramacion,
  deleteProgramacion
};
