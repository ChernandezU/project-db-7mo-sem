const oracledb = require('oracledb');
const { getConnection } = require('../../config/db');

// Obtener todos los vuelos
exports.getAllVuelos = async () => {
  const connection = await getConnection();
  const result = await connection.execute(`SELECT * FROM VUELOS`);
  await connection.close();
  return result.rows;
};

// Obtener vuelo por ID
exports.getVueloById = async (id) => {
  const connection = await getConnection();
  const result = await connection.execute(
    `SELECT * FROM VUELOS WHERE ID_VUELO = :id`,
    [id]
  );
  await connection.close();
  return result.rows[0];
};

// Crear un nuevo vuelo incluyendo capacidad y tipo de vuelo
exports.createVuelo = async (data) => {
  const {
    ID_AVION,
    ORIGEN,
    DESTINO,
    FECHA_SALIDA,
    FECHA_LLEGADA,
    HORA_SALIDA,
    HORA_LLEGADA,
    ESTADO,
    CAPACIDAD_MAXIMA,
    TIPO_VUELO
  } = data;

  // Validar estado del vuelo
  if (!['activo', 'cancelado', 'finalizado', 'demorado'].includes(ESTADO)) {
    throw new Error("Estado de vuelo inválido. Debe ser 'activo', 'cancelado', 'finalizado' o 'demorado'.");
  }

  // Validar tipo de vuelo
  if (!['nacional', 'internacional'].includes(TIPO_VUELO)) {
    throw new Error("Tipo de vuelo inválido. Debe ser 'nacional' o 'internacional'.");
  }

  const connection = await getConnection();
  await connection.execute(
    `INSERT INTO VUELOS (
      ID_AVION, ORIGEN, DESTINO, FECHA_SALIDA, FECHA_LLEGADA,
      HORA_SALIDA, HORA_LLEGADA, ESTADO, CAPACIDAD_MAXIMA, TIPO_VUELO
    ) VALUES (
      :ID_AVION, :ORIGEN, :DESTINO, :FECHA_SALIDA, :FECHA_LLEGADA,
      :HORA_SALIDA, :HORA_LLEGADA, :ESTADO, :CAPACIDAD_MAXIMA, :TIPO_VUELO
    )`,
    {
      ID_AVION,
      ORIGEN,
      DESTINO,
      FECHA_SALIDA,
      FECHA_LLEGADA,
      HORA_SALIDA,
      HORA_LLEGADA,
      ESTADO,
      CAPACIDAD_MAXIMA,
      TIPO_VUELO
    },
    { autoCommit: true }
  );
  await connection.close();
  return { message: 'Vuelo creado correctamente' };
};

// Actualizar vuelo con capacidad y tipo de vuelo
exports.updateVuelo = async (id, data) => {
  const connection = await getConnection();
  await connection.execute(
    `UPDATE VUELOS SET
      ID_AVION = :ID_AVION,
      ORIGEN = :ORIGEN,
      DESTINO = :DESTINO,
      FECHA_SALIDA = :FECHA_SALIDA,
      FECHA_LLEGADA = :FECHA_LLEGADA,
      HORA_SALIDA = :HORA_SALIDA,
      HORA_LLEGADA = :HORA_LLEGADA,
      ESTADO = :ESTADO,
      CAPACIDAD_MAXIMA = :CAPACIDAD_MAXIMA,
      TIPO_VUELO = :TIPO_VUELO
    WHERE ID_VUELO = :ID_VUELO`,
    { ...data, ID_VUELO: id },
    { autoCommit: true }
  );
  await connection.close();
  return { message: 'Vuelo actualizado correctamente' };
};

// Eliminar vuelo
exports.deleteVuelo = async (id) => {
  const connection = await getConnection();
  await connection.execute(
    `DELETE FROM VUELOS WHERE ID_VUELO = :id`,
    [id],
    { autoCommit: true }
  );
  await connection.close();
  return { message: 'Vuelo eliminado correctamente' };
};