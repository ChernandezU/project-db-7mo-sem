//Aquí se recibe la petición del usuario y se llama a los servicios. Controlas qué se envía como respuesta.
const oracledb = require('oracledb');
const { getConnection } = require('../../config/db');

const getAllVuelos = async () => {
    const connection = await getConnection();
  
    const result = await connection.execute(
      `BEGIN :cursor := pkg_reporteria.get_all_vuelos(); END;`,
      {
        cursor: { dir: oracledb.BIND_OUT, type: oracledb.CURSOR }
      }
    );
  
    const resultSet = result.outBinds.cursor;
    const rows = await resultSet.getRows(); // puedes usar getRows(n) para limitar
    await resultSet.close();
    await connection.close();
  
    return rows;
  };

const createVuelo = async (vuelo) => {
  const connection = await getConnection();
  await connection.execute(
    `BEGIN pkg_reporteria.insert_vuelo(:origen, :destino, :fecha_salida, :hora_salida, :duracion); END;`,
    {
      origen: vuelo.origen,
      destino: vuelo.destino,
      fecha_salida: vuelo.fecha_salida,
      hora_salida: vuelo.hora_salida,
      duracion: vuelo.duracion
    }
  );
  await connection.commit();
  await connection.close();
  return { message: 'Vuelo creado exitosamente' };
};

const updateVuelo = async (id, vuelo) => {
  const connection = await getConnection();
  await connection.execute(
    `BEGIN pkg_reporteria.update_vuelo(:id, :origen, :destino, :fecha_salida, :hora_salida, :duracion); END;`,
    {
      id: id,
      origen: vuelo.origen,
      destino: vuelo.destino,
      fecha_salida: vuelo.fecha_salida,
      hora_salida: vuelo.hora_salida,
      duracion: vuelo.duracion
    }
  );
  await connection.commit();
  await connection.close();
  return { message: 'Vuelo actualizado correctamente' };
};

const deleteVuelo = async (id) => {
  const connection = await getConnection();
  await connection.execute(
    `BEGIN pkg_reporteria.delete_vuelo(:id); END;`,
    { id: id }
  );
  await connection.commit();
  await connection.close();
  return { message: 'Vuelo eliminado exitosamente' };
};

module.exports = {
  getAllVuelos,
  createVuelo,
  updateVuelo,
  deleteVuelo
};
