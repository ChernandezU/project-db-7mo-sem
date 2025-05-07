//servicio para la gestion de .....
const oracledb = require('oracledb');
const { getConnection } = require('../../config/db');

exports.getAllObjetos = async () => {
  const connection = await getConnection();
  const result = await connection.execute(`SELECT * FROM OBJETOS_PERDIDOS`);
  await connection.close();
  return result.rows;
};

exports.getObjetoById = async (id) => {
  const connection = await getConnection();
  const result = await connection.execute(
    `SELECT * FROM OBJETOS_PERDIDOS WHERE ID_OBJETO = :id`,
    [id]
  );
  await connection.close();
  return result.rows[0];
};

exports.createObjeto = async (data) => {
  const { descripcion, fecha_encontrado, estado } = data;

  const connection = await getConnection();
  await connection.execute(
    `INSERT INTO OBJETOS_PERDIDOS (
      DESCRIPCION, FECHA_ENCONTRADO, ESTADO
    ) VALUES (
      :descripcion, :fecha_encontrado, :estado
    )`,
    { descripcion, fecha_encontrado, estado },
    { autoCommit: true }
  );
  await connection.close();
  return { message: 'Objeto perdido registrado correctamente' };
};

exports.updateObjeto = async (id, data) => {
  const { descripcion, fecha_encontrado, estado } = data;

  const connection = await getConnection();
  await connection.execute(
    `UPDATE OBJETOS_PERDIDOS SET
      DESCRIPCION = :descripcion,
      FECHA_ENCONTRADO = :fecha_encontrado,
      ESTADO = :estado
    WHERE ID_OBJETO = :id`,
    { descripcion, fecha_encontrado, estado, id },
    { autoCommit: true }
  );
  await connection.close();
  return { message: 'Objeto perdido actualizado correctamente' };
};

exports.deleteObjeto = async (id) => {
  const connection = await getConnection();
  await connection.execute(
    `DELETE FROM OBJETOS_PERDIDOS WHERE ID_OBJETO = :id`,
    [id],
    { autoCommit: true }
  );
  await connection.close();
  return { message: 'Objeto perdido eliminado correctamente' };
};
