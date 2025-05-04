//servicio para la gestion de .....
const { getConnection } = require('../../config/db');

const getFacturas = async () => {
  const conn = await getConnection();
  const result = await conn.execute(`
    SELECT id_factura, id_usuario, fecha_emision, total, metodo_pago, estado FROM Facturacion
  `);
  await conn.close();
  return result.rows;
};

const getFacturaById = async (id) => {
  const conn = await getConnection();
  const result = await conn.execute(`
    SELECT id_factura, id_usuario, fecha_emision, total, metodo_pago, estado FROM Facturacion
    WHERE id_factura = :id
  `, [id]);
  await conn.close();
  return result.rows[0];
};

const createFactura = async ({ id_usuario, fecha_emision, total, metodo_pago, estado }) => {
  const conn = await getConnection();
  await conn.execute(`
    INSERT INTO Facturacion (id_usuario, fecha_emision, total, metodo_pago, estado)
    VALUES (:id_usuario, TO_DATE(:fecha_emision, 'YYYY-MM-DD'), :total, :metodo_pago, :estado)
  `, { id_usuario, fecha_emision, total, metodo_pago, estado }, { autoCommit: true });
  await conn.close();
  return { message: 'Factura creada exitosamente' };
};

const updateFactura = async (id, { id_usuario, fecha_emision, total, metodo_pago, estado }) => {
  const conn = await getConnection();
  await conn.execute(`
    UPDATE Facturacion
    SET id_usuario = :id_usuario,
        fecha_emision = TO_DATE(:fecha_emision, 'YYYY-MM-DD'),
        total = :total,
        metodo_pago = :metodo_pago,
        estado = :estado
    WHERE id_factura = :id
  `, { id_usuario, fecha_emision, total, metodo_pago, estado, id }, { autoCommit: true });
  await conn.close();
  return { message: 'Factura actualizada correctamente' };
};

const deleteFactura = async (id) => {
  const conn = await getConnection();
  await conn.execute(`
    DELETE FROM Facturacion WHERE id_factura = :id
  `, { id }, { autoCommit: true });
  await conn.close();
  return { message: 'Factura eliminada exitosamente' };
};

module.exports = {
  getFacturas,
  getFacturaById,
  createFactura,
  updateFactura,
  deleteFactura
};
