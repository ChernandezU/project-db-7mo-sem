const oracledb = require('oracledb');
const { getConnection } = require('../../config/db');

// ✅ Obtener todos los check-ins
exports.getAllCheckIns = async () => {
  const connection = await getConnection();
  console.log('📌 Ejecutando consulta: SELECT ID_CHECKIN, ID_RESERVA, PASAPORTE, FECHA_CHECKIN, TERMINAL FROM CHECKIN');

  const result = await connection.execute(
    `SELECT ID_CHECKIN, ID_RESERVA, PASAPORTE, FECHA_CHECKIN, TERMINAL 
     FROM CHECKIN 
     ORDER BY FECHA_CHECKIN DESC`
  );

  console.log('📌 Resultados obtenidos:', result.rows); // 🔎 Depuración
  await connection.close();
  return result.rows;
};

// ✅ Crear un nuevo check-in con validaciones
exports.createCheckIn = async (data) => {
  const { id_reserva, pasaporte, fecha_checkin, terminal } = data;
  const connection = await getConnection();

  console.log('📌 Insertando check-in:', { id_reserva, pasaporte, fecha_checkin, terminal });

  // 🔎 Validar que ID_RESERVA existe antes de insertar
  const reservaExistente = await connection.execute(
    `SELECT COUNT(*) AS total FROM RESERVAS WHERE ID_RESERVA = :id_reserva`,
    { id_reserva }
  );

  if (reservaExistente.rows[0].TOTAL === 0) {
    throw new Error(`No se encontró reserva con ID_RESERVA ${id_reserva}`);
  }

  await connection.execute(
    `INSERT INTO CHECKIN (ID_RESERVA, PASAPORTE, FECHA_CHECKIN, TERMINAL) 
     VALUES (:id_reserva, :pasaporte, TO_DATE(:fecha_checkin, 'YYYY-MM-DD'), :terminal)`,
    { id_reserva, pasaporte, fecha_checkin, terminal },
    { autoCommit: true }
  );

  await connection.close();
  return { message: 'Check-in creado correctamente' };
};

// ✅ Eliminar check-in con validación previa
exports.deleteCheckIn = async (id_checkin) => {
  const connection = await getConnection();

  console.log('📌 Eliminando check-in con ID_CHECKIN:', id_checkin);

  const exists = await connection.execute(
    `SELECT COUNT(*) AS total FROM CHECKIN WHERE ID_CHECKIN = :id_checkin`,
    { id_checkin }
  );

  if (exists.rows[0].TOTAL === 0) {
    throw new Error(`No se encontró check-in con ID_CHECKIN ${id_checkin} para eliminar.`);
  }

  await connection.execute(
    `DELETE FROM CHECKIN WHERE ID_CHECKIN = :id_checkin`,
    { id_checkin },
    { autoCommit: true }
  );

  await connection.close();
  return { message: 'Check-in eliminado correctamente' };
};