//servicio para la gestion de .....
const { getConnection } = require('../../config/db');

const getObjetos = async () => {
  const conn = await getConnection();
  const result = await conn.execute(`SELECT * FROM OBJETOS_PERDIDOS`);
  await conn.close();
  return result.rows;
};

const getObjetoById = async (id) => {
  const conn = await getConnection();
  const result = await conn.execute(
    `SELECT * FROM OBJETOS_PERDIDOS WHERE ID_OBJETO = :id`,
    [id]
  );
  await conn.close();
  return result.rows[0];
};

const createObjeto = async ({ descripcion, fecha_encontrado, lugar_encontrado, estado, usuario_registro }) => {
  const conn = await getConnection();
  await conn.execute(
    `INSERT INTO OBJETOS_PERDIDOS (DESCRIPCION, FECHA_ENCONTRADO, LUGAR_ENCONTRADO, ESTADO, USUARIO_REGISTRO)
     VALUES (:descripcion, :fecha_encontrado, :lugar_encontrado, :estado, :usuario_registro)`,
    { descripcion, fecha_encontrado, lugar_encontrado, estado, usuario_registro },
    { autoCommit: true }
  );
  await conn.close();
  return { message: 'Objeto registrado exitosamente' };
};

const updateObjeto = async (id, { descripcion, fecha_encontrado, lugar_encontrado, estado, usuario_registro }) => {
  const conn = await getConnection();
  await conn.execute(
    `UPDATE OBJETOS_PERDIDOS
     SET DESCRIPCION = :descripcion,
         FECHA_ENCONTRADO = :fecha_encontrado,
         LUGAR_ENCONTRADO = :lugar_encontrado,
         ESTADO = :estado,
         USUARIO_REGISTRO = :usuario_registro
     WHERE ID_OBJETO = :id`,
    { descripcion, fecha_encontrado, lugar_encontrado, estado, usuario_registro, id },
    { autoCommit: true }
  );
  await conn.close();
  return { message: 'Objeto actualizado correctamente' };
};

const deleteObjeto = async (id) => {
  const conn = await getConnection();
  await conn.execute(
    `DELETE FROM OBJETOS_PERDIDOS WHERE ID_OBJETO = :id`,
    { id },
    { autoCommit: true }
  );
  await conn.close();
  return { message: 'Objeto eliminado correctamente' };
};

module.exports = {
  getObjetos,
  getObjetoById,
  createObjeto,
  updateObjeto,
  deleteObjeto
};
