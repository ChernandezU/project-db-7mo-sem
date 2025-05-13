const { getConnection } = require('../../config/db');

exports.getAllAerolineas = async () => {                       //
  const connection = await getConnection();
  const result = await connection.execute('SELECT * FROM Aerolineas');
  await connection.close();
  return result.rows;
};

exports.getAerolineaById = async (id) => {
  const connection = await getConnection();
  const result = await connection.execute('SELECT * FROM Aerolineas WHERE ID_AEROLINEA = :id', [id]);
  await connection.close();
  return result.rows[0];
};

// ✅ `createAerolinea` corregido sin ID manual
exports.createAerolinea = async (data) => {
  const connection = await getConnection();
  const sql = `
    INSERT INTO Aerolineas (nombre, estado)
    VALUES (:nombre, :estado)
  `;
  await connection.execute(sql, data, { autoCommit: true });
  await connection.close();
  return { message: 'Aerolínea creada exitosamente' };
};

// ✅ `updateAerolinea` con verificación previa
exports.updateAerolinea = async (id, cambios) => {
  const connection = await getConnection();
  
  const existe = await connection.execute('SELECT COUNT(*) AS total FROM Aerolineas WHERE ID_AEROLINEA = :id', [id]);
  if (existe.rows[0].TOTAL === 0) {
    await connection.close();
    throw new Error('La aerolínea especificada no existe.');
  }

  await connection.execute(
    `UPDATE Aerolineas SET nombre = :nombre, estado = :estado WHERE ID_AEROLINEA = :id`,
    { nombre: cambios.nombre, estado: cambios.estado, id },
    { autoCommit: true }
  );
  
  await connection.close();
  return { message: 'Aerolínea actualizada correctamente' };
};

// ✅ `deleteAerolinea` con verificación previa
exports.deleteAerolinea = async (id) => {
  const connection = await getConnection();

  const existe = await connection.execute('SELECT COUNT(*) AS total FROM Aerolineas WHERE ID_AEROLINEA = :id', [id]);
  if (existe.rows[0].TOTAL === 0) {
    await connection.close();
    throw new Error('La aerolínea especificada no existe.');
  }

  await connection.execute('DELETE FROM Aerolineas WHERE ID_AEROLINEA = :id', [id], { autoCommit: true });
  await connection.close();
  
  return { message: 'Aerolínea eliminada correctamente' };
};