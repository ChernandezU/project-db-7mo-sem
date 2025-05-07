//servicio para la gestion de .....
// Aquí se maneja la lógica de interacción con la base de datos
const oracledb = require('oracledb');
const { getConnection } = require('../../config/db');

exports.getAllSimulacionesFlujo = async () => {
  const conn = await getConnection();
  const result = await conn.execute(`SELECT * FROM SIMULACION_FLUJO_PASAJEROS`);
  await conn.close();
  return result.rows;
};

exports.getSimulacionFlujoById = async (id) => {
  const conn = await getConnection();
  const result = await conn.execute(
    `SELECT * FROM SIMULACION_FLUJO_PASAJEROS WHERE ID_SIMULACION = :id`,
    [id]
  );
  await conn.close();
  return result.rows[0];
};

exports.createSimulacionFlujo = async ({ fecha_simulacion, total_pasajeros, observaciones }) => {
  const conn = await getConnection();
  await conn.execute(
    `INSERT INTO SIMULACION_FLUJO_PASAJEROS (FECHA_SIMULACION, TOTAL_PASAJEROS, OBSERVACIONES)
     VALUES (:fecha_simulacion, :total_pasajeros, :observaciones)`,
    { fecha_simulacion, total_pasajeros, observaciones },
    { autoCommit: true }
  );
  await conn.close();
  return { message: 'Simulación de flujo creada correctamente' };
};

exports.updateSimulacionFlujo = async (id, { fecha_simulacion, total_pasajeros, observaciones }) => {
  const conn = await getConnection();
  await conn.execute(
    `UPDATE SIMULACION_FLUJO_PASAJEROS SET
     FECHA_SIMULACION = :fecha_simulacion,
     TOTAL_PASAJEROS = :total_pasajeros,
     OBSERVACIONES = :observaciones
     WHERE ID_SIMULACION = :id`,
    { fecha_simulacion, total_pasajeros, observaciones, id },
    { autoCommit: true }
  );
  await conn.close();
  return { message: 'Simulación de flujo actualizada correctamente' };
};

exports.deleteSimulacionFlujo = async (id) => {
  const conn = await getConnection();
  await conn.execute(`DELETE FROM SIMULACION_FLUJO_PASAJEROS WHERE ID_SIMULACION = :id`, [id], { autoCommit: true });
  await conn.close();
  return { message: 'Simulación de flujo eliminada correctamente' };
};
