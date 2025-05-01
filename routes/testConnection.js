const express = require('express');
const router = express.Router();
const { getConnection } = require('../config/db');

router.get('/', async (req, res) => {
  try {
    const connection = await getConnection();
    const result = await connection.execute('SELECT 1 FROM DUAL');
    await connection.close();
    res.json({ status: 'Conexión exitosa', result: result.rows });
  } catch (err) {
    res.status(500).json({ error: 'Error al conectar con Oracle', details: err.message });
  }
});

module.exports = router;

// Este archivo es para probar la conexión a la base de datos Oracle.