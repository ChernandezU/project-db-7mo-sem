const oracledb = require('oracledb');
const { getConnection } = require('../../config/db');

exports.getAllProgramasVuelo = async () => {
  const connection = await getConnection();
  const result = await connection.execute(`SELECT * FROM PROGRAMAS_VUELO`);
  await connection.close();
  return result.rows;
};

exports.getProgramaVueloById = async (id) => {
  const connection = await getConnection();
  const result = await connection.execute(
    `SELECT * FROM PROGRAMAS_VUELO WHERE ID_PROGRAMA = :id`,
    [id]
  );
  await connection.close();
  return result.rows[0];
};

exports.createProgramaVuelo = async (data) => {
  const { numero_vuelo, id_aerolinea, dias_semana, id_aeropuerto_origen, id_aeropuerto_destino } = data;

  const connection = await getConnection();
  await connection.execute(
    `INSERT INTO PROGRAMAS_VUELO (
      NUMERO_VUELO, ID_AEROLINEA, DIAS_SEMANA, ID_AEROPUERTO_ORIGEN, ID_AEROPUERTO_DESTINO
    ) VALUES (
      :numero_vuelo, :id_aerolinea, :dias_semana, :id_aeropuerto_origen, :id_aeropuerto_destino
    )`,
    { numero_vuelo, id_aerolinea, dias_semana, id_aeropuerto_origen, id_aeropuerto_destino },
    { autoCommit: true }
  );
  await connection.close();
  return { message: 'Programa de vuelo creado correctamente' };
};

exports.updateProgramaVuelo = async (id, data) => {
  const { numero_vuelo, id_aerolinea, dias_semana, id_aeropuerto_origen, id_aeropuerto_destino } = data;

  const connection = await getConnection();
  await connection.execute(
    `UPDATE PROGRAMAS_VUELO SET
      NUMERO_VUELO = :numero_vuelo,
      ID_AEROLINEA = :id_aerolinea,
      DIAS_SEMANA = :dias_semana,
      ID_AEROPUERTO_ORIGEN = :id_aeropuerto_origen,
      ID_AEROPUERTO_DESTINO = :id_aeropuerto_destino
    WHERE ID_PROGRAMA = :id`,
    { numero_vuelo, id_aerolinea, dias_semana, id_aeropuerto_origen, id_aeropuerto_destino, id },
    { autoCommit: true }
  );
  await connection.close();
  return { message: 'Programa de vuelo actualizado correctamente' };
};

exports.deleteProgramaVuelo = async (id) => {
  const connection = await getConnection();
  await connection.execute(
    `DELETE FROM PROGRAMAS_VUELO WHERE ID_PROGRAMA = :id`,
    [id],
    { autoCommit: true }
  );
  await connection.close();
  return { message: 'Programa de vuelo eliminado correctamente' };
};
