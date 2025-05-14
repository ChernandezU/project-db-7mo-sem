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




// ✅ Crear un nuevo objeto perdido con validaciones
exports.createObjeto = async (data) => {
  const { descripcion, fecha_encontrado, estado } = data;
  const connection = await getConnection();

  console.log('📌 Insertando objeto perdido:', { descripcion, fecha_encontrado, estado });

  // 🔎 Validar que los campos obligatorios están presentes
  if (!descripcion || !estado) {
    throw new Error('Los campos "descripcion" y "estado" son obligatorios.');
  }

  // ✅ Convertir `fecha_encontrado` al formato correcto
  const fechaFormatted = fecha_encontrado ? fecha_encontrado.split('T')[0] : null;

  await connection.execute(
    `INSERT INTO OBJETOS_PERDIDOS (DESCRIPCION, FECHA_ENCONTRADO, ESTADO) 
     VALUES (:descripcion, TO_DATE(:fecha_encontrado, 'YYYY-MM-DD'), :estado)`,
    { descripcion, fecha_encontrado: fechaFormatted, estado },
    { autoCommit: true }
  );

  await connection.close();
  return { message: 'Objeto perdido registrado correctamente' };
};


//
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
