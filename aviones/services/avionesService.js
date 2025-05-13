const { getConnection } = require('../../config/db');

exports.getAllAviones = async () => {
  const connection = await getConnection();
  const result = await connection.execute('SELECT * FROM Aviones');
  await connection.close();
  return result.rows;
};

exports.getAvionById = async (id) => {
  const connection = await getConnection();
  const result = await connection.execute('SELECT * FROM Aviones WHERE ID_AVION = :id', [id]);
  await connection.close();
  return result.rows[0];
};

// ✅ `createAvion` corregido sin ID manual y con validación de aerolínea
exports.createAvion = async (data) => {
  const connection = await getConnection();

  // Verificar existencia de aerolínea antes de insertar
  const existeAerolinea = await connection.execute(
    'SELECT COUNT(*) AS total FROM Aerolineas WHERE ID_AEROLINEA = :id_aerolinea',
    [data.id_aerolinea]
  );

  if (existeAerolinea.rows[0].TOTAL === 0) {
    await connection.close();
    throw new Error('La aerolínea especificada no existe.');
  }

  const sql = `
    INSERT INTO Aviones (modelo, capacidad, estado_mantenimiento, id_aerolinea)
    VALUES (:modelo, :capacidad, :estado_mantenimiento, :id_aerolinea)
  `;
  await connection.execute(sql, data, { autoCommit: true });
  await connection.close();

  return { message: 'Avión creado exitosamente' };
};

// ✅ `updateAvion` con validación previa
exports.updateAvion = async (id, data) => {
  const connection = await getConnection();

  const existe = await connection.execute('SELECT COUNT(*) AS total FROM Aviones WHERE ID_AVION = :id', [id]);
  if (existe.rows[0].TOTAL === 0) {
    await connection.close();
    throw new Error('El avión especificado no existe.');
  }

  await connection.execute(
    `UPDATE Aviones SET modelo = :modelo, capacidad = :capacidad, estado_mantenimiento = :estado_mantenimiento WHERE ID_AVION = :id`,
    { modelo: data.modelo, capacidad: data.capacidad, estado_mantenimiento: data.estado_mantenimiento, id },
    { autoCommit: true }
  );

  await connection.close();
  return { message: 'Avión actualizado correctamente' };
};

// ✅ `deleteAvion` con verificación previa
exports.deleteAvion = async (id) => {
  const connection = await getConnection();

  const existe = await connection.execute('SELECT COUNT(*) AS total FROM Aviones WHERE ID_AVION = :id', [id]);
  if (existe.rows[0].TOTAL === 0) {
    await connection.close();
    throw new Error('El avión especificado no existe.');
  }

  await connection.execute('DELETE FROM Aviones WHERE ID_AVION = :id', [id], { autoCommit: true });
  await connection.close();

  return { message: 'Avión eliminado correctamente' };
};