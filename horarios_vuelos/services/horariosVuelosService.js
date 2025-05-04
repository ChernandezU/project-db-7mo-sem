//servicio para la gestion de .....
const db = require('../../config/db');

// Obtener todos los horarios de vuelo
const getAllHorariosVuelos = async () => {
  const connection = await db.getConnection();
  const result = await connection.execute('SELECT * FROM horarios_vuelos');
  return result.rows;
};

// Obtener un horario de vuelo por ID
const getHorarioVueloById = async (id) => {
  const connection = await db.getConnection();
  const result = await connection.execute('SELECT * FROM horarios_vuelos WHERE id = :id', [id]);
  return result.rows[0]; // Retornamos la primera fila
};

// Crear un nuevo horario de vuelo
const createHorarioVuelo = async (nuevoHorario) => {
  const { vuelo_id, aeropuerto_salida_id, aeropuerto_llegada_id, fecha_salida, fecha_llegada, estado } = nuevoHorario;
  const connection = await db.getConnection();
  const sql = `
    INSERT INTO horarios_vuelos (vuelo_id, aeropuerto_salida_id, aeropuerto_llegada_id, fecha_salida, fecha_llegada, estado)
    VALUES (:vuelo_id, :aeropuerto_salida_id, :aeropuerto_llegada_id, :fecha_salida, :fecha_llegada, :estado)
  `;
  const result = await connection.execute(sql, [vuelo_id, aeropuerto_salida_id, aeropuerto_llegada_id, fecha_salida, fecha_llegada, estado]);
  await connection.commit(); // Commit para guardar los cambios
  return { message: 'Horario de vuelo creado', id: result.lastRowid };
};

// Actualizar un horario de vuelo
const updateHorarioVuelo = async (id, horarioActualizado) => {
  const { vuelo_id, aeropuerto_salida_id, aeropuerto_llegada_id, fecha_salida, fecha_llegada, estado } = horarioActualizado;
  const connection = await db.getConnection();
  const sql = `
    UPDATE horarios_vuelos
    SET vuelo_id = :vuelo_id, aeropuerto_salida_id = :aeropuerto_salida_id, aeropuerto_llegada_id = :aeropuerto_llegada_id,
        fecha_salida = :fecha_salida, fecha_llegada = :fecha_llegada, estado = :estado
    WHERE id = :id
  `;
  const result = await connection.execute(sql, [vuelo_id, aeropuerto_salida_id, aeropuerto_llegada_id, fecha_salida, fecha_llegada, estado, id]);
  await connection.commit();
  return result.rowsAffected > 0 ? { message: 'Horario de vuelo actualizado' } : null;
};

// Eliminar un horario de vuelo
const deleteHorarioVuelo = async (id) => {
  const connection = await db.getConnection();
  const result = await connection.execute('DELETE FROM horarios_vuelos WHERE id = :id', [id]);
  await connection.commit();
  return result.rowsAffected > 0;
};

module.exports = {
  getAllHorariosVuelos,
  getHorarioVueloById,
  createHorarioVuelo,
  updateHorarioVuelo,
  deleteHorarioVuelo
};
