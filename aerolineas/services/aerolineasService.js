//servicio para la gestion de .....
<<<<<<< HEAD
const oracledb = require('oracledb');
const { getConnection } = require('../../config/db');

exports.getAllAerolineas = async () => {
  const connection = await getConnection();
  const result = await connection.execute(`SELECT * FROM AEROLINEAS`);
  await connection.close();
  return result.rows;
};

exports.getAerolineaById = async (id) => {
  const connection = await getConnection();
  const result = await connection.execute(
    `SELECT * FROM AEROLINEAS WHERE ID_AEROLINEA = :id`,
    [id]
  );
  await connection.close();
  return result.rows[0];
};

exports.createAerolinea = async (aerolinea) => {
  const connection = await getConnection();
  const result = await connection.execute(
    `INSERT INTO AEROLINEAS (ID_AEROLINEA, NOMBRE, PAIS_ORIGEN)
     VALUES (:id, :nombre, :pais_origen)`,
    {
      id: aerolinea.ID_AEROLINEA,
      nombre: aerolinea.NOMBRE,
      pais_origen: aerolinea.PAIS_ORIGEN
    },
    { autoCommit: true }
  );
  await connection.close();
  return aerolinea.ID_AEROLINEA;
};

exports.updateAerolinea = async (id, cambios) => {
  const connection = await getConnection();
  await connection.execute(
    `UPDATE AEROLINEAS SET NOMBRE = :nombre, PAIS_ORIGEN = :pais_origen WHERE ID_AEROLINEA = :id`,
    {
      id,
      nombre: cambios.NOMBRE,
      pais_origen: cambios.PAIS_ORIGEN
    },
    { autoCommit: true }
  );
  await connection.close();
};

exports.deleteAerolinea = async (id) => {
  const connection = await getConnection();
  await connection.execute(
    `DELETE FROM AEROLINEAS WHERE ID_AEROLINEA = :id`,
    [id],
    { autoCommit: true }
  );
  await connection.close();
};
=======
const db = require('../../config/db'); // Ajustar según configuración de conexión

const getAllAerolineas = async () => {
  return await db.query('SELECT * FROM Aerolineas');
};

const getAerolineaById = async (id) => {
  return await db.query('SELECT * FROM Aerolineas WHERE id_aerolinea = ?', [id]);
};

const createAerolinea = async (data) => {
  return await db.query('INSERT INTO Aerolineas (nombre, estado) VALUES (?, ?)', [data.nombre, data.estado]);
};

const updateAerolinea = async (id, data) => {
  return await db.query('UPDATE Aerolineas SET nombre = ?, estado = ? WHERE id_aerolinea = ?', [data.nombre, data.estado, id]);
};

const deleteAerolinea = async (id) => {
  return await db.query('DELETE FROM Aerolineas WHERE id_aerolinea = ?', [id]);
};

module.exports = { getAllAerolineas, getAerolineaById, createAerolinea, updateAerolinea, deleteAerolinea };
>>>>>>> origin/desarrollo/sheyla
