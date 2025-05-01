//servicio para la gestion de .....
const { getConnection } = require('../../config/db');

const getProgramas = async () => {
  const conn = await getConnection();
  const result = await conn.execute(`SELECT * FROM Programas_Vuelo`);
  await conn.close();
  return result.rows;
};

const getProgramaById = async (id) => {
  const conn = await getConnection();
  const result = await conn.execute(
    `SELECT * FROM Programas_Vuelo WHERE id_programa = :id`,
    [id]
  );
  await conn.close();
  return result.rows[0];
};

const createPrograma = async ({ numero_vuelo, id_aerolinea, dias_semana, id_aeropuerto_origen, id_aeropuerto_destino }) => {
  const conn = await getConnection();
  await conn.execute(
    `INSERT INTO Programas_Vuelo (numero_vuelo, id_aerolinea, dias_semana, id_aeropuerto_origen, id_aeropuerto_destino)
     VALUES (:numero_vuelo, :id_aerolinea, :dias_semana, :id_aeropuerto_origen, :id_aeropuerto_destino)`,
    { numero_vuelo, id_aerolinea, dias_semana, id_aeropuerto_origen, id_aeropuerto_destino },
    { autoCommit: true }
  );
  await conn.close();
  return { message: 'Programa creado correctamente' };
};

const updatePrograma = async (id, { numero_vuelo, id_aerolinea, dias_semana, id_aeropuerto_origen, id_aeropuerto_destino }) => {
  const conn = await getConnection();
  await conn.execute(
    `UPDATE Programas_Vuelo
     SET numero_vuelo = :numero_vuelo,
         id_aerolinea = :id_aerolinea,
         dias_semana = :dias_semana,
         id_aeropuerto_origen = :id_aeropuerto_origen,
         id_aeropuerto_destino = :id_aeropuerto_destino
     WHERE id_programa = :id`,
    { numero_vuelo, id_aerolinea, dias_semana, id_aeropuerto_origen, id_aeropuerto_destino, id },
    { autoCommit: true }
  );
  await conn.close();
  return { message: 'Programa actualizado correctamente' };
};

const deletePrograma = async (id) => {
  const conn = await getConnection();
  await conn.execute(
    `DELETE FROM Programas_Vuelo WHERE id_programa = :id`,
    { id },
    { autoCommit: true }
  );
  await conn.close();
  return { message: 'Programa eliminado correctamente' };
};

module.exports = {
  getProgramas,
  getProgramaById,
  createPrograma,
  updatePrograma,
  deletePrograma
};
