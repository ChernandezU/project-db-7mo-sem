//servicio para la gestion de .....
const oracledb = require('oracledb');
const { getConnection } = require('../../config/db');

exports.getAllEquipajes = async () => {
  const connection = await getConnection();
  const result = await connection.execute(`SELECT * FROM EQUIPAJES`);
  await connection.close();
  return result.rows;
};

exports.getEquipajeById = async (id) => {
  const connection = await getConnection();
  const result = await connection.execute(
    `SELECT * FROM EQUIPAJES WHERE ID_EQUIPAJE = :id`,
    [id]
  );
  await connection.close();
  return result.rows[0];
};

exports.createEquipaje = async (data) => {
  const {
    ID_PASAJERO, TIPO_EQUIPAJE, PESO_KG, DIMENSIONES,
    DESCRIPCION, ESTADO, NUM_VUELO_ASOCIADO
  } = data;

  const connection = await getConnection();
  await connection.execute(
    `INSERT INTO EQUIPAJES (
      ID_PASAJERO, TIPO_EQUIPAJE, PESO_KG, DIMENSIONES,
      DESCRIPCION, ESTADO, NUM_VUELO_ASOCIADO
    ) VALUES (
      :ID_PASAJERO, :TIPO_EQUIPAJE, :PESO_KG, :DIMENSIONES,
      :DESCRIPCION, :ESTADO, :NUM_VUELO_ASOCIADO
    )`,
    {
      ID_PASAJERO, TIPO_EQUIPAJE, PESO_KG, DIMENSIONES,
      DESCRIPCION, ESTADO, NUM_VUELO_ASOCIADO
    },
    { autoCommit: true }
  );
  await connection.close();
  return { message: 'Equipaje registrado correctamente' };
};

exports.updateEquipaje = async (id, data) => {
  const connection = await getConnection();
  await connection.execute(
    `UPDATE EQUIPAJES SET
      ID_PASAJERO = :ID_PASAJERO,
      TIPO_EQUIPAJE = :TIPO_EQUIPAJE,
      PESO_KG = :PESO_KG,
      DIMENSIONES = :DIMENSIONES,
      DESCRIPCION = :DESCRIPCION,
      ESTADO = :ESTADO,
      NUM_VUELO_ASOCIADO = :NUM_VUELO_ASOCIADO
    WHERE ID_EQUIPAJE = :ID_EQUIPAJE`,
    {
      ...data,
      ID_EQUIPAJE: id
    },
    { autoCommit: true }
  );
  await connection.close();
  return { message: 'Equipaje actualizado correctamente' };
};

exports.deleteEquipaje = async (id) => {
  const connection = await getConnection();
  await connection.execute(
    `DELETE FROM EQUIPAJES WHERE ID_EQUIPAJE = :id`,
    [id],
    { autoCommit: true }
  );
  await connection.close();
  return { message: 'Equipaje eliminado correctamente' };
};
