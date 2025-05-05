//servicio para la gestion de .....
const db = require('../../config/db');

const getAllPersonal = async () => {
  return await db.query('SELECT * FROM Personal');
};

const getPersonalById = async (id) => {
  return await db.query('SELECT * FROM Personal WHERE id_personal = ?', [id]);
};

const createPersonal = async (data) => {
  return await db.query('INSERT INTO Personal (nombre, cargo, contacto) VALUES (?, ?, ?)', 
  [data.nombre, data.cargo, data.contacto]);
};

const updatePersonal = async (id, data) => {
  return await db.query('UPDATE Personal SET nombre = ?, cargo = ?, contacto = ? WHERE id_personal = ?', 
  [data.nombre, data.cargo, data.contacto, id]);
};

const deletePersonal = async (id) => {
  return await db.query('DELETE FROM Personal WHERE id_personal = ?', [id]);
};

module.exports = { getAllPersonal, getPersonalById, createPersonal, updatePersonal, deletePersonal };