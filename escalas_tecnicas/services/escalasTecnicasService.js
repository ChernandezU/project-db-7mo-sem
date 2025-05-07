//servicio para la gestion de .....
const oracledb = require('oracledb');
const { getConnection } = require('../../config/db');

exports.getAllEscalas = async () => {
  const connection = await getConnection();
  const result = await connection.execute(`SELECT * FROM ESCALAS_TECNICAS`);
  await connection.close();
  return result.rows;
};

exports.getEscalaById = async (id) => {
  const connection = await getConnection();
  const result = await connection.execute(
    `SELECT * FROM ESCALAS_TECNICAS WHERE ID_ESCALA = :id`,
    [id]
  );
  await connection.close();
  return result.rows[0];
};

exports.createEscala = async (data) => {
  const {
    NUM_VUELO, PAIS, CIUDAD, AEROPUERTO,
    FECHA_HORA_LLEGADA, FECHA_HORA_SALIDA,
    DURACION_ESTIMADA, OBSERVACIONES
  } = data;

  const connection = await getConnection();
  await connection.execute(
    `INSERT INTO ESCALAS_TECNICAS (
      NUM_VUELO, PAIS, CIUDAD, AEROPUERTO,
      FECHA_HORA_LLEGADA, FECHA_HORA_SALIDA,
      DURACION_ESTIMADA, OBSERVACIONES
    ) VALUES (
      :NUM_VUELO, :PAIS, :CIUDAD, :AEROPUERTO,
      :FECHA_HORA_LLEGADA, :FECHA_HORA_SALIDA,
      :DURACION_ESTIMADA, :OBSERVACIONES
    )`,
    {
      NUM_VUELO, PAIS, CIUDAD, AEROPUERTO,
      FECHA_HORA_LLEGADA, FECHA_HORA_SALIDA,
      DURACION_ESTIMADA, OBSERVACIONES
    },
    { autoCommit: true }
  );
  await connection.close();
  return { message: 'Escala técnica creada correctamente' };
};

exports.updateEscala = async (id, data) => {
  const connection = await getConnection();
  await connection.execute(
    `UPDATE ESCALAS_TECNICAS SET
      NUM_VUELO = :NUM_VUELO,
      PAIS = :PAIS,
      CIUDAD = :CIUDAD,
      AEROPUERTO = :AEROPUERTO,
      FECHA_HORA_LLEGADA = :FECHA_HORA_LLEGADA,
      FECHA_HORA_SALIDA = :FECHA_HORA_SALIDA,
      DURACION_ESTIMADA = :DURACION_ESTIMADA,
      OBSERVACIONES = :OBSERVACIONES
    WHERE ID_ESCALA = :ID_ESCALA`,
    {
      ...data,
      ID_ESCALA: id
    },
    { autoCommit: true }
  );
  await connection.close();
  return { message: 'Escala técnica actualizada correctamente' };
};

exports.deleteEscala = async (id) => {
  const connection = await getConnection();
  await connection.execute(
    `DELETE FROM ESCALAS_TECNICAS WHERE ID_ESCALA = :id`,
    [id],
    { autoCommit: true }
  );
  await connection.close();
  return { message: 'Escala técnica eliminada correctamente' };
};
