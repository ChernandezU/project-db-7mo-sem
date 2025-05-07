//servicio para la gestion de .....
// Aquí se maneja la lógica de interacción con la base de datos
const oracledb = require('oracledb');
const { getConnection } = require('../../config/db');

exports.getAllSimulacionesTrafico = async () => {
  const connection = await getConnection();
  const result = await connection.execute(`SELECT * FROM SIMULACION_TRAFICO_AEREO`);
  await connection.close();
  return result.rows;
};

exports.getSimulacionTraficoById = async (id) => {
  const connection = await getConnection();
  const result = await connection.execute(
    `SELECT * FROM SIMULACION_TRAFICO_AEREO WHERE ID_SIMULACION = :id`,
    [id]
  );
  await connection.close();
  return result.rows[0];
};

exports.createSimulacionTrafico = async (data) => {
  const { fecha_simulacion, total_vuelos, vuelos_retrasados, vuelos_cancelados, observaciones } = data;

  const connection = await getConnection();
  await connection.execute(
    `INSERT INTO SIMULACION_TRAFICO_AEREO (
      FECHA_SIMULACION, TOTAL_VUELOS, VUELOS_RETRASADOS, VUELOS_CANCELADOS, OBSERVACIONES
    ) VALUES (
      :fecha_simulacion, :total_vuelos, :vuelos_retrasados, :vuelos_cancelados, :observaciones
    )`,
    { fecha_simulacion, total_vuelos, vuelos_retrasados, vuelos_cancelados, observaciones },
    { autoCommit: true }
  );
  await connection.close();
  return { message: 'Simulación de tráfico aéreo creada correctamente' };
};

exports.updateSimulacionTrafico = async (id, data) => {
  const { fecha_simulacion, total_vuelos, vuelos_retrasados, vuelos_cancelados, observaciones } = data;

  const connection = await getConnection();
  await connection.execute(
    `UPDATE SIMULACION_TRAFICO_AEREO SET
      FECHA_SIMULACION = :fecha_simulacion,
      TOTAL_VUELOS = :total_vuelos,
      VUELOS_RETRASADOS = :vuelos_retrasados,
      VUELOS_CANCELADOS = :vuelos_cancelados,
      OBSERVACIONES = :observaciones
    WHERE ID_SIMULACION = :id`,
    { fecha_simulacion, total_vuelos, vuelos_retrasados, vuelos_cancelados, observaciones, id },
    { autoCommit: true }
  );
  await connection.close();
  return { message: 'Simulación de tráfico aéreo actualizada correctamente' };
};

exports.deleteSimulacionTrafico = async (id) => {
  const connection = await getConnection();
  await connection.execute(
    `DELETE FROM SIMULACION_TRAFICO_AEREO WHERE ID_SIMULACION = :id`,
    [id],
    { autoCommit: true }
  );
  await connection.close();
  return { message: 'Simulación de tráfico aéreo eliminada correctamente' };
};
