const oracledb = require('oracledb');
const { getConnection } = require('../../config/db');

// ✅ Obtener todas las visas
exports.getAllVisas = async () => {
  const connection = await getConnection();
  console.log('📌 Ejecutando consulta: SELECT ID_VISA, ID_USUARIO, NUMERO_VISA, TIPO_VISA, FECHA_EMISION, FECHA_VENCIMIENTO, ESTADO FROM VISAS');

  const result = await connection.execute(
    `SELECT ID_VISA, ID_USUARIO, NUMERO_VISA, TIPO_VISA, FECHA_EMISION, FECHA_VENCIMIENTO, ESTADO 
     FROM VISAS 
     ORDER BY ID_VISA ASC`
  );

  console.log('📌 Resultados obtenidos:', result.rows); // 🔎 Depuración
  await connection.close();
  return result.rows;
};

// ✅ Obtener visa por ID con validación previa
exports.getVisaById = async (id_visa) => {
  const connection = await getConnection();

  console.log('📌 Buscando visa con ID_VISA:', id_visa);

  const exists = await connection.execute(
    `SELECT COUNT(*) AS total FROM VISAS WHERE ID_VISA = :id_visa`,
    { id_visa }
  );

  if (exists.rows[0].TOTAL === 0) {
    throw new Error(`No se encontró visa con ID_VISA ${id_visa}`);
  }

  const result = await connection.execute(
    `SELECT ID_VISA, ID_USUARIO, NUMERO_VISA, TIPO_VISA, FECHA_EMISION, FECHA_VENCIMIENTO, ESTADO 
     FROM VISAS 
     WHERE ID_VISA = :id_visa`,
    { id_visa }
  );
  await connection.close();
  return result.rows[0];
};

// ✅ Crear una nueva visa con validaciones
exports.createVisa = async (data) => {
  const { id_usuario, numero_visa, tipo_visa, fecha_emision, fecha_vencimiento, estado } = data;
  const connection = await getConnection();

  console.log('📌 Insertando visa:', { id_usuario, numero_visa, tipo_visa, fecha_emision, fecha_vencimiento, estado });

  // 🔎 Validar que ID_USUARIO existe
  const usuarioExistente = await connection.execute(
    `SELECT COUNT(*) AS total FROM USUARIOS WHERE ID_USUARIO = :id_usuario`,
    { id_usuario }
  );

  if (usuarioExistente.rows[0].TOTAL === 0) {
    throw new Error(`No se encontró usuario con ID_USUARIO ${id_usuario}`);
  }

  // 🔎 Validar tipo_visa y estado según las restricciones de SQL
  const valoresTipoVisaValidos = ['turista', 'trabajo', 'estudiante', 'otros'];
  if (!valoresTipoVisaValidos.includes(tipo_visa.toLowerCase())) {
    throw new Error(`Tipo de visa inválido. Debe ser uno de: ${valoresTipoVisaValidos.join(', ')}`);
  }

  const valoresEstadoValidos = ['pendiente', 'validado', 'rechazado'];
  if (!valoresEstadoValidos.includes(estado.toLowerCase())) {
    throw new Error(`Estado inválido. Debe ser uno de: ${valoresEstadoValidos.join(', ')}`);
  }

  await connection.execute(
    `INSERT INTO VISAS (ID_USUARIO, NUMERO_VISA, TIPO_VISA, FECHA_EMISION, FECHA_VENCIMIENTO, ESTADO) 
     VALUES (:id_usuario, :numero_visa, :tipo_visa, TO_DATE(:fecha_emision, 'YYYY-MM-DD'), 
             TO_DATE(:fecha_vencimiento, 'YYYY-MM-DD'), :estado)`,
    { id_usuario, numero_visa, tipo_visa: tipo_visa.toLowerCase(), fecha_emision, fecha_vencimiento, estado: estado.toLowerCase() },
    { autoCommit: true }
  );

  await connection.close();
  return { message: 'Visa creada correctamente' };
};

// ✅ Actualizar visa con validación previa
exports.updateVisa = async (id_visa, data) => {
  const connection = await getConnection();

  console.log('📌 Actualizando visa con ID_VISA:', id_visa);

  const result = await connection.execute(
    `UPDATE VISAS SET NUMERO_VISA = :numero_visa, 
                      TIPO_VISA = :tipo_visa, 
                      FECHA_EMISION = TO_DATE(:fecha_emision, 'YYYY-MM-DD'), 
                      FECHA_VENCIMIENTO = TO_DATE(:fecha_vencimiento, 'YYYY-MM-DD'), 
                      ESTADO = :estado 
     WHERE ID_VISA = :id_visa`,
    { numero_visa: data.numero_visa, tipo_visa: data.tipo_visa, fecha_emision: data.fecha_emision, fecha_vencimiento: data.fecha_vencimiento, estado: data.estado, id_visa },
    { autoCommit: true }
  );

  if (result.rowsAffected === 0) {
    throw new Error(`No se encontró visa con ID_VISA ${id_visa} para actualizar.`);
  }

  await connection.close();
  return { message: 'Visa actualizada correctamente' };
};
