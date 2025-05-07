//servicio para la gestion de .....
const oracledb = require('oracledb');
const { getConnection } = require('../../config/db');

exports.getAllPersonal = async () => {
  const connection = await getConnection();
  const result = await connection.execute(`SELECT * FROM PERSONAL`);
  await connection.close();
  return result.rows;
};

exports.getPersonalById = async (id) => {
  const connection = await getConnection();
  const result = await connection.execute(
    `SELECT * FROM PERSONAL WHERE ID_PERSONAL = :id`,
    [id]
  );
  await connection.close();
  return result.rows[0];
};

exports.createPersonal = async (data) => {
  const { nombre, cargo, contacto } = data;

  const connection = await getConnection();
  await connection.execute(
    `INSERT INTO PERSONAL (
      NOMBRE, CARGO, CONTACTO
    ) VALUES (
      :nombre, :cargo, :contacto
    )`,
    { nombre, cargo, contacto },
    { autoCommit: true }
  );
  await connection.close();
  return { message: 'Personal creado correctamente' };
};

exports.updatePersonal = async (id, data) => {
  const { nombre, cargo, contacto } = data;

  const connection = await getConnection();
  await connection.execute(
    `UPDATE PERSONAL SET
      NOMBRE = :nombre,
      CARGO = :cargo,
      CONTACTO = :contacto
    WHERE ID_PERSONAL = :id`,
    { nombre, cargo, contacto, id },
    { autoCommit: true }
  );
  await connection.close();
  return { message: 'Personal actualizado correctamente' };
};

exports.deletePersonal = async (id) => {
  const connection = await getConnection();
  await connection.execute(
    `DELETE FROM PERSONAL WHERE ID_PERSONAL = :id`,
    [id],
    { autoCommit: true }
  );
  await connection.close();
  return { message: 'Personal eliminado correctamente' };
};
