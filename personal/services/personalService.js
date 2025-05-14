//servicio para la gestion de .....
const oracledb = require('oracledb');
const { getConnection } = require('../../config/db');

// ✅ Obtener todo el personal
exports.getAllPersonal = async () => {
  const connection = await getConnection();
  const result = await connection.execute(`SELECT * FROM PERSONAL ORDER BY ID_PERSONAL ASC`);
  await connection.close();
  return result.rows;
};

// ✅ Obtener personal por ID con validación previa
exports.getPersonalById = async (id) => {
  const connection = await getConnection();

  // 🔎 Verificar si el ID existe antes de consultarlo
  const exists = await connection.execute(`SELECT COUNT(*) AS total FROM PERSONAL WHERE ID_PERSONAL = :id`, { id });

  if (exists.rows[0].TOTAL === 0) {
    throw new Error(`No se encontró personal con ID ${id}`);
  }

  const result = await connection.execute(`SELECT * FROM PERSONAL WHERE ID_PERSONAL = :id`, { id });
  await connection.close();
  return result.rows[0];
};

// ✅ Crear un nuevo registro de personal con validaciones
exports.createPersonal = async (data) => {
  const { nombre, cargo, contacto } = data;
  const connection = await getConnection();

  console.log('📌 Insertando personal:', { nombre, cargo, contacto });

  await connection.execute(
    `INSERT INTO PERSONAL (NOMBRE, CARGO, CONTACTO) VALUES (:nombre, :cargo, :contacto)`,
    { nombre, cargo, contacto },
    { autoCommit: true }
  );

  await connection.close();
  return { message: 'Personal creado correctamente' };
};

// ✅ Actualizar información de personal con validaciones
exports.updatePersonal = async (id, data) => {
  const { nombre, cargo, contacto } = data;
  const connection = await getConnection();

  console.log('📌 Actualizando personal:', { id, nombre, cargo, contacto });

  const result = await connection.execute(
    `UPDATE PERSONAL SET NOMBRE = :nombre, CARGO = :cargo, CONTACTO = :contacto WHERE ID_PERSONAL = :id`,
    { nombre, cargo, contacto, id },
    { autoCommit: true }
  );

  if (result.rowsAffected === 0) {
    throw new Error(`No se encontró personal con ID ${id} para actualizar.`);
  }

  await connection.close();
  return { message: 'Personal actualizado correctamente' };
};

// ✅ Eliminar personal por ID con validación previa
exports.deletePersonal = async (id) => {
  const connection = await getConnection();

  console.log('📌 Eliminando personal con ID:', id);

  // 🔎 Verificar si el ID existe antes de eliminar
  const exists = await connection.execute(`SELECT COUNT(*) AS total FROM PERSONAL WHERE ID_PERSONAL = :id`, { id });

  if (exists.rows[0].TOTAL === 0) {
    throw new Error(`No se encontró personal con ID ${id} para eliminar.`);
  }

  const result = await connection.execute(
    `DELETE FROM PERSONAL WHERE ID_PERSONAL = :id`,
    { id },
    { autoCommit: true }
  );

  await connection.close();
  return { message: 'Personal eliminado correctamente' };
};