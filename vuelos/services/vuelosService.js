//Aquí se recibe la petición del usuario y se llama a los servicios. Controlas qué se envía como respuesta.
const db = require('../../config/db'); // Suponiendo que tienes una conexión a DB configurada

// Servicio para obtener todos los programas de vuelo
exports.getAllProgramas = async () => {
    const query = 'SELECT * FROM programas_vuelo'; // Ejemplo de consulta
    try {
        const result = await db.query(query);
        return result.rows;
    } catch (error) {
        throw new Error('Error obteniendo programas de vuelo: ' + error.message);
    }
};

// Servicio para obtener un programa de vuelo por ID
exports.getProgramaById = async (id) => {
    const query = 'SELECT * FROM programas_vuelo WHERE id = $1';
    try {
        const result = await db.query(query, [id]);
        return result.rows[0];
    } catch (error) {
        throw new Error('Error obteniendo el programa de vuelo: ' + error.message);
    }
};
