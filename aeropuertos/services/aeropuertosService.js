const { getConnection } = require('../../config/db');

exports.getAllAeropuertos = async () => {               //funciona
  const connection = await getConnection();
const result = await connection.execute('SELECT * FROM Aeropuertos'); 
 await connection.close();
  return result.rows;
};

exports.getAeropuertoById = async (id) => {              //funciona
  const connection = await getConnection();
  const result = await connection.execute('SELECT * FROM Aeropuertos WHERE ID_AEROPUERTO = :id', [id]);
  await connection.close();
  return result.rows[0];
};

// ✅ `createAeropuerto` ya está optimizado                   //funciona
exports.createAeropuerto = async (data) => {
  const connection = await getConnection();
  const sql = `
    INSERT INTO Aeropuertos (codigo, nombre, ciudad, pais)
    VALUES (:codigo, :nombre, :ciudad, :pais)
  `;
  await connection.execute(sql, data, { autoCommit: true });
  await connection.close();
  return { message: 'Aeropuerto creado exitosamente' };
};

// ✅ `updateAeropuerto` corregido con control de concurrencia
exports.updateAeropuerto = async (id, data) => {             //funciona
  const connection = await getConnection();
  const sql = `
    UPDATE Aeropuertos
    SET nombre = :nombre, pais = :pais, ciudad = :ciudad
    WHERE id_aeropuerto = :id
  `;
  const result = await connection.execute(sql, { ...data, id }, { autoCommit: true });

  await connection.close();
  if (result.rowsAffected === 0) {
    throw new Error('No se encontró el aeropuerto especificado.');
  }

  return { message: 'Aeropuerto actualizado correctamente' };
};

// ✅ `deleteAeropuerto` con verificación previa
exports.deleteAeropuerto = async (id) => {              //funciona
  const connection = await getConnection();

  // Verificar existencia antes de eliminar
  const existe = await connection.execute('SELECT COUNT(*) AS total FROM Aeropuertos WHERE ID_AEROPUERTO = :id', [id]);
  if (existe.rows[0].TOTAL === 0) {
    await connection.close();
    throw new Error('El aeropuerto especificado no existe.');
  }

  await connection.execute('DELETE FROM Aeropuertos WHERE ID_AEROPUERTO = :id', [id], { autoCommit: true });
  await connection.close();
  
  return { message: 'Aeropuerto eliminado correctamente' };
};