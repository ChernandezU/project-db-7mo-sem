//servicio para la gestion de .....
<<<<<<< HEAD
=======
const db = require('../../config/db');

const getAllReservas = async () => {
  return await db.query('SELECT * FROM Reservas');
};

const getReservaById = async (id) => {
  return await db.query('SELECT * FROM Reservas WHERE id_reserva = ?', [id]);
};

const createReserva = async (data) => {
  return await db.query(`
    INSERT INTO Reservas (id_reserva, id_usuario, id_vuelo, asiento, estado_reserva, fecha_reserva, version) 
    VALUES (?, ?, ?, ?, ?, ?, ?)`, 
  [data.id_reserva, data.id_usuario, data.id_vuelo, data.asiento, data.estado_reserva, data.fecha_reserva, data.version]);
};

const updateReserva = async (id, data) => {
  return await db.query(`
    UPDATE Reservas 
    SET id_usuario = ?, id_vuelo = ?, asiento = ?, estado_reserva = ?, fecha_reserva = ?, version = version + 1
    WHERE id_reserva = ? AND version = ?`, 
  [data.id_usuario, data.id_vuelo, data.asiento, data.estado_reserva, data.fecha_reserva, id, data.version]);
};

const deleteReserva = async (id) => {
  return await db.query('DELETE FROM Reservas WHERE id_reserva = ?', [id]);
};

module.exports = { getAllReservas, getReservaById, createReserva, updateReserva, deleteReserva };
>>>>>>> origin/desarrollo/sheyla
