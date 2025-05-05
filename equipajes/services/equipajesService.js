//servicio para la gestion de .....
<<<<<<< HEAD
=======
const db = require('../../config/db');

const getAllEquipajes = async () => {
  return await db.query('SELECT * FROM Equipajes');
};

const getEquipajeById = async (id) => {
  return await db.query('SELECT * FROM Equipajes WHERE id_equipaje = ?', [id]);
};

const createEquipaje = async (data) => {
  return await db.query('INSERT INTO Equipajes (id_reserva, peso, dimensiones, estado) VALUES (?, ?, ?, ?)', 
  [data.id_reserva, data.peso, data.dimensiones, data.estado]);
};

const updateEquipaje = async (id, data) => {
  return await db.query('UPDATE Equipajes SET id_reserva = ?, peso = ?, dimensiones = ?, estado = ? WHERE id_equipaje = ?', 
  [data.id_reserva, data.peso, data.dimensiones, data.estado, id]);
};

const deleteEquipaje = async (id) => {
  return await db.query('DELETE FROM Equipajes WHERE id_equipaje = ?', [id]);
};

module.exports = { getAllEquipajes, getEquipajeById, createEquipaje, updateEquipaje, deleteEquipaje };
>>>>>>> origin/desarrollo/sheyla
