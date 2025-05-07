const oracledb = require('oracledb');
const { getConnection } = require('../../config/db');

exports.getAllVuelos = async () => {
  const connection = await getConnection();
  const result = await connection.execute(`SELECT * FROM VUELOS`);
  await connection.close();
  return result.rows;
};

exports.getVueloById = async (id) => {
  const connection = await getConnection();
  const result = await connection.execute(
    `SELECT * FROM VUELOS WHERE ID_VUELO = :id`,
    [id]
  );
  await connection.close();
  return result.rows[0];
};

exports.createVuelo = async (data) => {
  const {
    ID_AVION,
    ORIGEN,
    DESTINO,
    FECHA_SALIDA,
    FECHA_LLEGADA,
    HORA_SALIDA,
    HORA_LLEGADA,
    ESTADO
  } = data;

  const connection = await getConnection();
  await connection.execute(
    `INSERT INTO VUELOS (
      ID_AVION, ORIGEN, DESTINO, FECHA_SALIDA, FECHA_LLEGADA,
      HORA_SALIDA, HORA_LLEGADA, ESTADO
    ) VALUES (
      :ID_AVION, :ORIGEN, :DESTINO, :FECHA_SALIDA, :FECHA_LLEGADA,
      :HORA_SALIDA, :HORA_LLEGADA, :ESTADO
    )`,
    {
      ID_AVION,
      ORIGEN,
      DESTINO,
      FECHA_SALIDA,
      FECHA_LLEGADA,
      HORA_SALIDA,
      HORA_LLEGADA,
      ESTADO
    },
    { autoCommit: true }
  );
  await connection.close();
  return { message: 'Vuelo creado correctamente' };
};

exports.updateVuelo = async (id, data) => {
  const connection = await getConnection();
  await connection.execute(
    `UPDATE VUELOS SET
      ID_AVION = :ID_AVION,
      ORIGEN = :ORIGEN,
      DESTINO = :DESTINO,
      FECHA_SALIDA = :FECHA_SALIDA,
      FECHA_LLEGADA = :FECHA_LLEGADA,
      HORA_SALIDA = :HORA_SALIDA,
      HORA_LLEGADA = :HORA_LLEGADA,
      ESTADO = :ESTADO
    WHERE ID_VUELO = :ID_VUELO`,
    { ...data, ID_VUELO: id },
    { autoCommit: true }
  );
  await connection.close();
  return { message: 'Vuelo actualizado correctamente' };
};

exports.deleteVuelo = async (id) => {
  const connection = await getConnection();
  await connection.execute(
    `DELETE FROM VUELOS WHERE ID_VUELO = :id`,
    [id],
    { autoCommit: true }
  );
  await connection.close();
  return { message: 'Vuelo eliminado correctamente' };
};
