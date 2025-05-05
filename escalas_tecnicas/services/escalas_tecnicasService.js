//servicio para la gestion de .....
const db = require('../../config/db');

const getAllEscalasTecnicas = async () => {
  return await db.query('SELECT * FROM Escalas_Tecnicas');
};

const getEscalaTecnicaById = async (id) => {
  return await db.query('SELECT * FROM Escalas_Tecnicas WHERE id_escala = ?', [id]);
};

const createEscalaTecnica = async (data) => {
  return await db.query('INSERT INTO Escalas_Tecnicas (id_vuelo, orden, id_aeropuerto_intermedio, hora_escala) VALUES (?, ?, ?, ?)', 
  [data.id_vuelo, data.orden, data.id_aeropuerto_intermedio, data.hora_escala]);
};

const updateEscalaTecnica = async (id, data) => {
  return await db.query('UPDATE Escalas_Tecnicas SET id_vuelo = ?, orden = ?, id_aeropuerto_intermedio = ?, hora_escala = ? WHERE id_escala = ?', 
  [data.id_vuelo, data.orden, data.id_aeropuerto_intermedio, data.hora_escala, id]);
};

const deleteEscalaTecnica = async (id) => {
  return await db.query('DELETE FROM Escalas_Tecnicas WHERE id_escala = ?', [id]);
};

module.exports = { getAllEscalasTecnicas, getEscalaTecnicaById, createEscalaTecnica, updateEscalaTecnica, deleteEscalaTecnica };