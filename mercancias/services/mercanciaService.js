const oracledb = require('oracledb');
const { getConnection } = require('../../config/db');

// ✅ Obtener todas las mercancías
exports.getAllMercancias = async () => {
  const connection = await getConnection();
  const result = await connection.execute(
    `SELECT ID_MERCANCIA, DESCRIPCION, PESO, ID_RESERVA FROM MERCANCIAS ORDER BY ID_MERCANCIA ASC`
  );
  await connection.close();
  return result.rows;
};

// ✅ Obtener mercancía por ID con validación previa
exports.getMercanciaById = async (id_mercancia) => {
  const connection = await getConnection();

  console.log('📌 Buscando mercancía con ID_MERCANCIA:', id_mercancia);

  const result = await connection.execute(
    `SELECT ID_MERCANCIA, DESCRIPCION, PESO, ID_RESERVA FROM MERCANCIAS WHERE ID_MERCANCIA = :id_mercancia`,
    { id_mercancia }
  );

  await connection.close();

  if (result.rows.length === 0) {
    throw new Error(`No se encontró mercancía con ID_MERCANCIA ${id_mercancia}`);
  }

  return result.rows[0];
};

// eliminar mercancía por ID con validación previa
exports.deleteMercancia = async (id_mercancia) => {
  const connection = await getConnection();

  console.log('📌 Eliminando mercancía con ID_MERCANCIA:', id_mercancia);

  const result = await connection.execute(
    `DELETE FROM MERCANCIAS WHERE ID_MERCANCIA = :id_mercancia`,
    { id_mercancia },
    { autoCommit: true }
  );

  if (result.rowsAffected === 0) {
    throw new Error(`No se encontró mercancía con ID_MERCANCIA ${id_mercancia} para eliminar.`);
  }

  await connection.close();
  return { message: 'Mercancía eliminada correctamente' };
};

// ✅ Crear una nueva mercancía con validaciones
exports.createMercancia = async (data) => {
  const { descripcion, peso, id_reserva } = data;
  const connection = await getConnection();

  console.log('📌 Insertando mercancía:', { descripcion, peso, id_reserva });

  // 🔎 Validar que ID_RESERVA existe antes de insertar
  const reservaExistente = await connection.execute(
    `SELECT COUNT(*) AS total FROM RESERVAS WHERE ID_RESERVA = :id_reserva`,
    { id_reserva }
  );

  if (reservaExistente.rows[0].TOTAL === 0) {
    throw new Error(`No se encontró reserva con ID_RESERVA ${id_reserva}`);
  }

  await connection.execute(
    `INSERT INTO MERCANCIAS (DESCRIPCION, PESO, ID_RESERVA) 
     VALUES (:descripcion, :peso, :id_reserva)`,
    { descripcion, peso, id_reserva },
    { autoCommit: true }
  );

  await connection.close();
  return { message: 'Mercancía creada correctamente' };
};

// ✅ Eliminar mercancía con validación previa
