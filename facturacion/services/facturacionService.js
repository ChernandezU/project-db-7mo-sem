//servicio para la gestion de .....
const oracledb = require('oracledb');
const { getConnection } = require('../../config/db');

exports.getAllFacturas = async () => {
  const connection = await getConnection();
  const result = await connection.execute(`SELECT * FROM FACTURACION`);
  await connection.close();
  return result.rows;
};

exports.getFacturaById = async (id) => {
  const connection = await getConnection();
  const result = await connection.execute(
    `SELECT * FROM FACTURACION WHERE ID_FACTURA = :id`,
    [id]
  );
  await connection.close();
  return result.rows[0];
};

exports.createFactura = async (data) => {
  const {
    ID_PASAJERO, NUM_VUELO, FECHA_FACTURA,
    MONTO_TOTAL, METODO_PAGO, DETALLE
  } = data;

  const connection = await getConnection();
  await connection.execute(
    `INSERT INTO FACTURACION (
      ID_PASAJERO, NUM_VUELO, FECHA_FACTURA,
      MONTO_TOTAL, METODO_PAGO, DETALLE
    ) VALUES (
      :ID_PASAJERO, :NUM_VUELO, :FECHA_FACTURA,
      :MONTO_TOTAL, :METODO_PAGO, :DETALLE
    )`,
    {
      ID_PASAJERO, NUM_VUELO, FECHA_FACTURA,
      MONTO_TOTAL, METODO_PAGO, DETALLE
    },
    { autoCommit: true }
  );
  await connection.close();
  return { message: 'Factura creada correctamente' };
};

exports.updateFactura = async (id, data) => {
  const connection = await getConnection();
  await connection.execute(
    `UPDATE FACTURACION SET
      ID_PASAJERO = :ID_PASAJERO,
      NUM_VUELO = :NUM_VUELO,
      FECHA_FACTURA = :FECHA_FACTURA,
      MONTO_TOTAL = :MONTO_TOTAL,
      METODO_PAGO = :METODO_PAGO,
      DETALLE = :DETALLE
    WHERE ID_FACTURA = :ID_FACTURA`,
    {
      ...data,
      ID_FACTURA: id
    },
    { autoCommit: true }
  );
  await connection.close();
  return { message: 'Factura actualizada correctamente' };
};

exports.deleteFactura = async (id) => {
  const connection = await getConnection();
  await connection.execute(
    `DELETE FROM FACTURACION WHERE ID_FACTURA = :id`,
    [id],
    { autoCommit: true }
  );
  await connection.close();
  return { message: 'Factura eliminada correctamente' };
};
