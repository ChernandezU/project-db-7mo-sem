//servicio para la gestion de .....
const { getConnection } = require('../../config/db');

const getMercancias = async () => {
  const conn = await getConnection();
  const result = await conn.execute(`
    SELECT id_mercancia, nombre, descripcion, cantidad, precio_unitario, fecha_ingreso FROM Mercancias
  `);
  await conn.close();
  return result.rows;
};

const getMercanciaById = async (id) => {
  const conn = await getConnection();
  const result = await conn.execute(`
    SELECT id_mercancia, nombre, descripcion, cantidad, precio_unitario, fecha_ingreso FROM Mercancias
    WHERE id_mercancia = :id
  `, [id]);
  await conn.close();
  return result.rows[0];
};

const createMercancia = async ({ nombre, descripcion, cantidad, precio_unitario, fecha_ingreso }) => {
  const conn = await getConnection();
  await conn.execute(`
    INSERT INTO Mercancias (nombre, descripcion, cantidad, precio_unitario, fecha_ingreso)
    VALUES (:nombre, :descripcion, :cantidad, :precio_unitario, TO_DATE(:fecha_ingreso, 'YYYY-MM-DD'))
  `, { nombre, descripcion, cantidad, precio_unitario, fecha_ingreso }, { autoCommit: true });
  await conn.close();
  return { message: 'Mercancía creada exitosamente' };
};

const updateMercancia = async (id, { nombre, descripcion, cantidad, precio_unitario, fecha_ingreso }) => {
  const conn = await getConnection();
  await conn.execute(`
    UPDATE Mercancias
    SET nombre = :nombre,
        descripcion = :descripcion,
        cantidad = :cantidad,
        precio_unitario = :precio_unitario,
        fecha_ingreso = TO_DATE(:fecha_ingreso, 'YYYY-MM-DD')
    WHERE id_mercancia = :id
  `, { nombre, descripcion, cantidad, precio_unitario, fecha_ingreso, id }, { autoCommit: true });
  await conn.close();
  return { message: 'Mercancía actualizada correctamente' };
};

const deleteMercancia = async (id) => {
  const conn = await getConnection();
  await conn.execute(`
    DELETE FROM Mercancias WHERE id_mercancia = :id
  `, { id }, { autoCommit: true });
  await conn.close();
  return { message: 'Mercancía eliminada exitosamente' };
};

module.exports = {
  getMercancias,
  getMercanciaById,
  createMercancia,
  updateMercancia,
  deleteMercancia
};
