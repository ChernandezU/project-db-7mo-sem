//servicio para la gestion de .....
const db = require('../../config/db');

const getAllMantenimientos = async () => {
  return await db.query('SELECT * FROM Mantenimiento');
};

const getMantenimientoById = async (id) => {
  return await db.query('SELECT * FROM Mantenimiento WHERE id_mantenimiento = ?', [id]);
};

const createMantenimiento = async (data) => {
  return await db.query('INSERT INTO Mantenimiento (id_avion, fecha_mantenimiento, descripcion, estado) VALUES (?, ?, ?, ?)', 
  [data.id_avion, data.fecha_mantenimiento, data.descripcion, data.estado]);
};

const updateMantenimiento = async (id, data) => {
  return await db.query('UPDATE Mantenimiento SET id_avion = ?, fecha_mantenimiento = ?, descripcion = ?, estado = ? WHERE id_mantenimiento = ?', 
  [data.id_avion, data.fecha_mantenimiento, data.descripcion, data.estado, id]);
};

const deleteMantenimiento = async (id) => {
  return await db.query('DELETE FROM Mantenimiento WHERE id_mantenimiento = ?', [id]);
};

module.exports = { getAllMantenimientos, getMantenimientoById, createMantenimiento, updateMantenimiento, deleteMantenimiento };