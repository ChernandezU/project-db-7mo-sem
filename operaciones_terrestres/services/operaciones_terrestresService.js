//servicio para la gestion de .....
const { getConnection } = require('../../config/db');

const getOperaciones = async () => {
  const conn = await getConnection();
  const result = await conn.execute(`
    SELECT id_operacion, tipo_operacion, descripcion, fecha, id_personal, id_vehiculo
    FROM Operaciones_Terrestres
  `);
  await conn.close();
  return result.rows;
};

const getOperacionById = async (id) => {
  const conn = await getConnection();
  const result = await conn.execute(`
    SELECT id_operacion, tipo_operacion, descripcion, fecha, id_personal, id_vehiculo
    FROM Operaciones_Terrestres
    WHERE id_operacion = :id
  `, [id]);
  await conn.close();
  return result.rows[0];
};

const createOperacion = async ({ tipo_operacion, descripcion, fecha, id_personal, id_vehiculo }) => {
  const conn = await getConnection();
  await conn.execute(`
    INSERT INTO Operaciones_Terrestres (tipo_operacion, descripcion, fecha, id_personal, id_vehiculo)
    VALUES (:tipo_operacion, :descripcion, TO_DATE(:fecha, 'YYYY-MM-DD'), :id_personal, :id_vehiculo)
  `, { tipo_operacion, descripcion, fecha, id_personal, id_vehiculo }, { autoCommit: true });
  await conn.close();
  return { message: 'Operación terrestre creada exitosamente' };
};

const updateOperacion = async (id, { tipo_operacion, descripcion, fecha, id_personal, id_vehiculo }) => {
  const conn = await getConnection();
  await conn.execute(`
    UPDATE Operaciones_Terrestres
    SET tipo_operacion = :tipo_operacion,
        descripcion = :descripcion,
        fecha = TO_DATE(:fecha, 'YYYY-MM-DD'),
        id_personal = :id_personal,
        id_vehiculo = :id_vehiculo
    WHERE id_operacion = :id
  `, { tipo_operacion, descripcion, fecha, id_personal, id_vehiculo, id }, { autoCommit: true });
  await conn.close();
  return { message: 'Operación terrestre actualizada correctamente' };
};

const deleteOperacion = async (id) => {
  const conn = await getConnection();
  await conn.execute(`
    DELETE FROM Operaciones_Terrestres WHERE id_operacion = :id
  `, { id }, { autoCommit: true });
  await conn.close();
  return { message: 'Operación terrestre eliminada exitosamente' };
};

module.exports = {
  getOperaciones,
  getOperacionById,
  createOperacion,
  updateOperacion,
  deleteOperacion
};
