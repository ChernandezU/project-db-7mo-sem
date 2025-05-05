//servicio para la gestion de .....
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