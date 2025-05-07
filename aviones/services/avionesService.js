const { getConnection } = require('../../config/db');

exports.getAllAviones = async () => {
  const connection = await getConnection();
  const result = await connection.execute('SELECT * FROM AVION');
  return result.rows;
};

exports.getAvionById = async (id) => {
  const connection = await getConnection();
  const result = await connection.execute('SELECT * FROM AVION WHERE ID_AVION = :id', [id]);
  return result.rows[0];
};

exports.createAvion = async (data) => {
  const connection = await getConnection();
  const sql = `
    INSERT INTO AVION (ID_AVION, TIPO, ESTADO, ASIENTOS_OCUPADOS, ASIENTOS_LIBRES)
    VALUES (:id, :tipo, :estado, :ocupados, :libres)
  `;
  await connection.execute(sql, data, { autoCommit: true });
  return { message: 'Avión creado exitosamente' };
};

exports.updateAvion = async (id, data) => {
  const connection = await getConnection();
  const sql = `
    UPDATE AVION
    SET TIPO = :tipo, ESTADO = :estado, ASIENTOS_OCUPADOS = :ocupados, ASIENTOS_LIBRES = :libres
    WHERE ID_AVION = :id
  `;
  await connection.execute(sql, { ...data, id }, { autoCommit: true });
  return { message: 'Avión actualizado correctamente' };
};

exports.deleteAvion = async (id) => {
  const connection = await getConnection();
  await connection.execute('DELETE FROM AVION WHERE ID_AVION = :id', [id], { autoCommit: true });
  return { message: 'Avión eliminado correctamente' };
};
