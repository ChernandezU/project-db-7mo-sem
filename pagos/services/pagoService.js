//servicio para la gestion de .....
const oracledb = require('oracledb');
const { getConnection } = require('../../config/db');

exports.getAllPagos = async () => {
  const connection = await getConnection();
  const result = await connection.execute(`SELECT * FROM PAGOS`);
  await connection.close();
  return result.rows;
};

exports.getPagoById = async (id) => {
  const connection = await getConnection();
  const result = await connection.execute(
    `SELECT * FROM PAGOS WHERE ID_PAGO = :id`,
    [id]
  );
  await connection.close();
  return result.rows[0];
};

exports.createPago = async (data) => {
  const { id_factura, metodo_pago, monto_pagado, fecha_pago } = data;

  const connection = await getConnection();
  await connection.execute(
    `INSERT INTO PAGOS (
      ID_FACTURA, METODO_PAGO, MONTO_PAGADO, FECHA_PAGO
    ) VALUES (
      :id_factura, :metodo_pago, :monto_pagado, :fecha_pago
    )`,
    { id_factura, metodo_pago, monto_pagado, fecha_pago },
    { autoCommit: true }
  );
  await connection.close();
  return { message: 'Pago registrado correctamente' };
};

exports.updatePago = async (id, data) => {
  const { id_factura, metodo_pago, monto_pagado, fecha_pago } = data;

  const connection = await getConnection();
  await connection.execute(
    `UPDATE PAGOS SET
      ID_FACTURA = :id_factura,
      METODO_PAGO = :metodo_pago,
      MONTO_PAGADO = :monto_pagado,
      FECHA_PAGO = :fecha_pago
    WHERE ID_PAGO = :id`,
    { id_factura, metodo_pago, monto_pagado, fecha_pago, id },
    { autoCommit: true }
  );
  await connection.close();
  return { message: 'Pago actualizado correctamente' };
};

exports.deletePago = async (id) => {
  const connection = await getConnection();
  await connection.execute(
    `DELETE FROM PAGOS WHERE ID_PAGO = :id`,
    [id],
    { autoCommit: true }
  );
  await connection.close();
  return { message: 'Pago eliminado correctamente' };
};
