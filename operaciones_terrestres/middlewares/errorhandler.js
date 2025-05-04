//aquí es donde se definen errores
module.exports = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: 'Algo salió mal, por favor intente nuevamente.' });
};
