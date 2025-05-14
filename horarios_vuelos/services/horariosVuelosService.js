const oracledb = require('oracledb');
const { getConnection } = require('../../config/db');

// ✅ Obtener todos los horarios de vuelo
exports.getAllHorariosVuelos = async () => {
  const connection = await getConnection();
  const result = await connection.execute(
    `SELECT ID_HORARIO, ID_VUELO, HORA_SALIDA, HORA_LLEGADA, ESTADO 
     FROM HORARIOS_VUELOS 
     ORDER BY HORA_SALIDA DESC`
  );
  await connection.close();
  return result.rows;
};

// ✅ Obtener horario de vuelo por ID con validación previa
exports.getHorarioVueloById = async (id_horario) => {
  const connection = await getConnection();

  console.log('📌 Buscando horario de vuelo con ID_HORARIO:', id_horario);

  const exists = await connection.execute(
    `SELECT COUNT(*) AS total FROM HORARIOS_VUELOS WHERE ID_HORARIO = :id_horario`,
    { id_horario }
  );

  if (exists.rows[0].TOTAL === 0) {
    throw new Error(`No se encontró horario de vuelo con ID_HORARIO ${id_horario}`);
  }

  const result = await connection.execute(
    `SELECT ID_HORARIO, ID_VUELO, HORA_SALIDA, HORA_LLEGADA, ESTADO 
     FROM HORARIOS_VUELOS 
     WHERE ID_HORARIO = :id_horario`,
    { id_horario }
  );
  await connection.close();
  return result.rows[0];
};

// ✅ Crear un nuevo horario de vuelo con validaciones
exports.createHorarioVuelo = async (data) => {
  const { id_vuelo, hora_salida, hora_llegada, estado } = data;
  const connection = await getConnection();

  console.log('📌 Insertando horario de vuelo:', { id_vuelo, hora_salida, hora_llegada, estado });

  // 🔎 Validar que ID_VUELO existe antes de insertar
  const vueloExistente = await connection.execute(
    `SELECT COUNT(*) AS total FROM VUELOS WHERE ID_VUELO = :id_vuelo`,
    { id_vuelo }
  );

  if (vueloExistente.rows[0].TOTAL === 0) {
    throw new Error(`No se encontró vuelo con ID_VUELO ${id_vuelo}`);
  }

  await connection.execute(
    `INSERT INTO HORARIOS_VUELOS (ID_VUELO, HORA_SALIDA, HORA_LLEGADA, ESTADO) 
     VALUES (:id_vuelo, TO_TIMESTAMP(:hora_salida, 'YYYY-MM-DD HH24:MI:SS'), 
             TO_TIMESTAMP(:hora_llegada, 'YYYY-MM-DD HH24:MI:SS'), :estado)`,
    { id_vuelo, hora_salida, hora_llegada, estado },
    { autoCommit: true }
  );

  await connection.close();
  return { message: 'Horario de vuelo creado correctamente' };
};

// ✅ Eliminar horario de vuelo con validación previa
exports.deleteHorarioVuelo = async (id_horario) => {
  const connection = await getConnection();

  console.log('📌 Eliminando horario de vuelo con ID_HORARIO:', id_horario);

  const exists = await connection.execute(
    `SELECT COUNT(*) AS total FROM HORARIOS_VUELOS WHERE ID_HORARIO = :id_horario`,
    { id_horario }
  );

  if (exists.rows[0].TOTAL === 0) {
    throw new Error(`No se encontró horario de vuelo con ID_HORARIO ${id_horario} para eliminar.`);
  }

  await connection.execute(
    `DELETE FROM HORARIOS_VUELOS WHERE ID_HORARIO = :id_horario`,
    { id_horario },
    { autoCommit: true }
  );

  await connection.close();
  return { message: 'Horario de vuelo eliminado correctamente' };
};