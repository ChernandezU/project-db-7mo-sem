//servicio para la gestion de .....
const oracledb = require('oracledb');
const { getConnection } = require('../../config/db');

exports.getAllMercancias = async () => {
  const connection = await getConnection();
  const result = await connection.execute(`SELECT * FROM MERCANCIAS`);
  await connection.close();
  return result.rows;
};

exports.getMercanciaById = async (id) => {
  const connection = await getConnection();
  const result = await connection.execute(
    `SELECT * FROM MERCANCIAS WHERE ID_MERCANCIA = :id`,
    [id]
  );
  await connection.close();
  return result.rows[0];
};

exports.createMercancia = async (data) => {
  const { descripcion, peso, id_reserva } = data;

  const connection = await getConnection();
  await connection.execute(
    `INSERT INTO MERCANCIAS (
      DESCRIPCION, PESO, ID_RESERVA
    ) VALUES (
      :descripcion, :peso, :id_reserva
    )`,
    { descripcion, peso, id_reserva },
    { autoCommit: true }
  );
  await connection.close();
  return { message: 'Mercancía creada correctamente' };
};

exports.updateMercancia = async (id, data) => {
  const { descripcion, peso, id_reserva } = data;

  const connection = await getConnection();
  await connection.execute(
    `UPDATE MERCANCIAS SET
      DESCRIPCION = :descripcion,
      PESO = :peso,
      ID_RESERVA = :id_reserva
    WHERE ID_MERCANCIA = :id`,
    { descripcion, peso, id_reserva, id },
    { autoCommit: true }
  );
  await connection.close();
  return { message: 'Mercancía actualizada correctamente' };
};

exports.deleteMercancia = async (id) => {
  const connection = await getConnection();
  await connection.execute(
    `DELETE FROM MERCANCIAS WHERE ID_MERCANCIA = :id`,
    [id],
    { autoCommit: true }
  );
  await connection.close();
  return { message: 'Mercancía eliminada correctamente' };
};
