//servicio para la gestion de .....
const { getConnection } = require('../../config/db');

const getPagos = async () => {
  const conn = await getConnection();
  const result = await conn.execute(`
    SELECT id_pago, id_usuario, monto, fecha_pago, metodo_pago, estado FROM Pagos
  `);
  await conn.close();
  return result.rows;
};

const getPagoById = async (id) => {
  const conn = await getConnection();
  const result = await conn.execute(`
    SELECT id_pago, id_usuario, monto, fecha_pago, metodo_pago, estado FROM Pagos WHERE id_pago = :id
  `, [id]);
  await conn.close();
  return result.rows[0];
};

const createPago = async ({ id_usuario, monto, fecha_pago, metodo_pago, estado }) => {
  const conn = await getConnection();
  await conn.execute(`
    INSERT INTO Pagos (id_usuario, monto, fecha_pago, metodo_pago, estado)
    VALUES (:id_usuario, :monto, TO_DATE(:fecha_pago, 'YYYY-MM-DD'), :metodo_pago, :estado)
  `, { id_usuario, monto, fecha_pago, metodo_pago, estado }, { autoCommit: true });
  await conn.close();
  return { message: 'Pago registrado exitosamente' };
};

const updatePago = async (id, { id_usuario, monto, fecha_pago, metodo_pago, estado }) => {
  const conn = await getConnection();
  await conn.execute(`
    UPDATE Pagos
    SET id_usuario = :id_usuario,
        monto = :monto,
        fecha_pago = TO_DATE(:fecha_pago, 'YYYY-MM-DD'),
        metodo_pago = :metodo_pago,
        estado = :estado
    WHERE id_pago = :id
  `, { id_usuario, monto, fecha_pago, metodo_pago, estado, id }, { autoCommit: true });
  await conn.close();
  return { message: 'Pago actualizado correctamente' };
};

const deletePago = async (id) => {
  const conn = await getConnection();
  await conn.execute(`
    DELETE FROM Pagos WHERE id_pago = :id
  `, { id }, { autoCommit: true });
  await conn.close();
  return { message: 'Pago eliminado exitosamente' };
};

module.exports = {
  getPagos,
  getPagoById,
  createPago,
  updatePago,
  deletePago
};
