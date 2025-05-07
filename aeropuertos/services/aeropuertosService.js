const { getConnection } = require('../../config/db');

exports.getAllAeropuertos = async () => {
  const connection = await getConnection();
  const result = await connection.execute('SELECT * FROM AEROPUERTO');
  return result.rows;
};

exports.getAeropuertoById = async (id) => {
  const connection = await getConnection();
  const result = await connection.execute('SELECT * FROM AEROPUERTO WHERE ID_AEROPUERTO = :id', [id]);
  return result.rows[0];
};

exports.createAeropuerto = async (data) => {
  const connection = await getConnection();
  const sql = `
    INSERT INTO AEROPUERTO (ID_AEROPUERTO, NOMBRE, PAIS, CIUDAD)
    VALUES (:id, :nombre, :pais, :ciudad)
  `;
  await connection.execute(sql, data, { autoCommit: true });
  return { message: 'Aeropuerto creado exitosamente' };
};

exports.updateAeropuerto = async (id, data) => {
  const connection = await getConnection();
  const sql = `
    UPDATE AEROPUERTO
    SET NOMBRE = :nombre, PAIS = :pais, CIUDAD = :ciudad
    WHERE ID_AEROPUERTO = :id
  `;
  await connection.execute(sql, { ...data, id }, { autoCommit: true });
  return { message: 'Aeropuerto actualizado correctamente' };
};

exports.deleteAeropuerto = async (id) => {
  const connection = await getConnection();
  await connection.execute('DELETE FROM AEROPUERTO WHERE ID_AEROPUERTO = :id', [id], { autoCommit: true });
  return { message: 'Aeropuerto eliminado correctamente' };
};
