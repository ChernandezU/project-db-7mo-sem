//aquí validaremos errores y excepciones
const errorHandler = (err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Error interno del servidor' });
  };
  
  module.exports = errorHandler;
  