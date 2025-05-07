//servicio para la gestion de .....
const oracledb = require('oracledb');
const { getConnection } = require('../../config/db');

exports.getAllSimulacionesFinancieras = async () => {
  const connection = await getConnection();
  const result = await connection.execute(`SELECT * FROM SIMULACION_IMPACTO_FINANCIERO`);
  await connection.close();
  return result.rows;
};

exports.getSimulacionFinancieraById = async (id) => {
  const connection = await getConnection();
  const result = await connection.execute(
    `SELECT * FROM SIMULACION_IMPACTO_FINANCIERO WHERE ID_SIMULACION = :id`,
    [id]
  );
  await connection.close();
  return result.rows[0];
};

exports.createSimulacionFinanciera = async (data) => {
  const { fecha_simulacion, ingresos_estimados, gastos_estimados, observaciones } = data;

  const connection = await getConnection();
  await connection.execute(
    `INSERT INTO SIMULACION_IMPACTO_FINANCIERO (
      FECHA_SIMULACION, INGRESOS_ESTIMADOS, GASTOS_ESTIMADOS, OBSERVACIONES
    ) VALUES (
      :fecha_simulacion, :ingresos_estimados, :gastos_estimados, :observaciones
    )`,
    { fecha_simulacion, ingresos_estimados, gastos_estimados, observaciones },
    { autoCommit: true }
  );
  await connection.close();
  return { message: 'Simulación financiera creada correctamente' };
};

exports.updateSimulacionFinanciera = async (id, data) => {
  const { fecha_simulacion, ingresos_estimados, gastos_estimados, observaciones } = data;

  const connection = await getConnection();
  await connection.execute(
    `UPDATE SIMULACION_IMPACTO_FINANCIERO SET
      FECHA_SIMULACION = :fecha_simulacion,
      INGRESOS_ESTIMADOS = :ingresos_estimados,
      GASTOS_ESTIMADOS = :gastos_estimados,
      OBSERVACIONES = :observaciones
    WHERE ID_SIMULACION = :id`,
    { fecha_simulacion, ingresos_estimados, gastos_estimados, observaciones, id },
    { autoCommit: true }
  );
  await connection.close();
  return { message: 'Simulación financiera actualizada correctamente' };
};

exports.deleteSimulacionFinanciera = async (id) => {
  const connection = await getConnection();
  await connection.execute(
    `DELETE FROM SIMULACION_IMPACTO_FINANCIERO WHERE ID_SIMULACION = :id`,
    [id],
    { autoCommit: true }
  );
  await connection.close();
  return { message: 'Simulación financiera eliminada correctamente' };
};
