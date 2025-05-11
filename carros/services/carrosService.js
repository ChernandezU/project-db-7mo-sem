//servicio para la gestion de .....
const oracledb = require('oracledb');
const { getConnection } = require('../../config/db');

exports.getAllCarros = async () => {
  const connection = await getConnection();
  const result = await connection.execute(`SELECT * FROM CARROS`);
  await connection.close();
  return result.rows;
};

exports.getCarroById = async (id) => {
  const connection = await getConnection();
  const result = await connection.execute(
    `SELECT * FROM CARROS WHERE ID_CARRO = :id`,
    [id]
  );
  await connection.close();
  return result.rows[0];
};

exports.createCarro = async (data) => {
  const { modelo, estado, descripcion } = data;

  const connection = await getConnection();
  await connection.execute(
    `INSERT INTO CARROS (MODELO, ESTADO, DESCRIPCION) 
    VALUES (:modelo, :estado, :descripcion)`,
    { modelo, estado, descripcion },
    { autoCommit: true }
  );
  await connection.close();
  return { message: 'Carro creado correctamente' };
};

exports.updateCarro = async (id, data) => {
  const { modelo, estado, descripcion } = data;

  const connection = await getConnection();
  await connection.execute(
    `UPDATE CARROS SET MODELO = :modelo, ESTADO = :estado, DESCRIPCION = :descripcion 
    WHERE ID_CARRO = :id`,
    { modelo, estado, descripcion, id },
    { autoCommit: true }
  );
  await connection.close();
  return { message: 'Carro actualizado correctamente' };
};

exports.deleteCarro = async (id) => {
  const connection = await getConnection();
  await connection.execute(
    `DELETE FROM CARROS WHERE ID_CARRO = :id`,
    [id],
    { autoCommit: true }
  );
  await connection.close();
  return { message: 'Carro eliminado correctamente' };
};
