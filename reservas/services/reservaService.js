const { getConnection } = require('../../config/db');

exports.getAllReservas = async () => {
  const connection = await getConnection();
  const result = await connection.execute(
    `SELECT * FROM RESERVAS ORDER BY FECHA_RESERVA FOR UPDATE SKIP LOCKED`
  );
  await connection.close();
  return result.rows;
};

exports.getReservaById = async (id) => {
  const connection = await getConnection();
  const result = await connection.execute(
    `SELECT * FROM RESERVAS WHERE ID_RESERVA = :id FOR UPDATE NOWAIT`,
    { id }
  );
  await connection.close();
  return result.rows[0];
};


// ✅ `createReserva` corregido 

exports.createReserva = async (data) => {
  const connection = await getConnection();

  try {
    console.log('Datos recibidos:', JSON.stringify(data, null, 2));

    let { id_usuario, id_vuelo, asiento, modalidad_venta, id_portal, id_visa, pasaporte, estado_reserva, fecha_reserva } = data;

    // 🔎 Validaciones de datos
    if (!['online', 'aeropuerto'].includes(modalidad_venta)) {
      throw new Error("Modalidad de venta inválida. Debe ser 'online' o 'aeropuerto'.");
    }

    if (modalidad_venta === 'aeropuerto' && !pasaporte) {
      throw new Error("Debes proporcionar un número de pasaporte para ventas en aeropuerto.");
    }

    if (!['pendiente', 'confirmada', 'cancelada'].includes(estado_reserva)) {
      throw new Error(`Estado de reserva inválido: '${estado_reserva}'.`);
    }

    // 🔎 Verificar existencia de clave foránea `ID_PORTAL`
    if (id_portal !== null) {
      const existePortal = await connection.execute(
        'SELECT ID_PORTAL FROM PORTALES WHERE ID_PORTAL = :id_portal',
        { id_portal }
      );

      if (existePortal.rows.length === 0) {
        throw new Error(`El portal con ID ${id_portal} no existe.`);
      }
    }

    // 🚀 Insertar reserva con datos validados
    await connection.execute(
      `INSERT INTO RESERVAS (ID_RESERVA, ID_USUARIO, ID_VUELO, ASIENTO, ESTADO_RESERVA, FECHA_RESERVA, MODALIDAD_VENTA, ID_PORTAL, ID_VISA, PASAPORTE, CHECKIN_STATUS, VERSION)
       VALUES (seq_reservas.NEXTVAL, :id_usuario, :id_vuelo, :asiento, :estado_reserva, TO_DATE(:fecha_reserva, 'YYYY-MM-DD'), :modalidad_venta, :id_portal, :id_visa, :pasaporte, 'pendiente', 1)`,
      { id_usuario, id_vuelo, asiento, estado_reserva, fecha_reserva, modalidad_venta, id_portal, id_visa, pasaporte }
    );

    await connection.execute('COMMIT');
    await connection.close();
    return { message: 'Reserva creada correctamente' };

  } catch (error) {
    console.error('Error SQL:', error.stack);
    await connection.execute('ROLLBACK');
    await connection.close();
    return { error: `Error en la inserción: ${error.message}`, debug: error.stack };
  }
};

