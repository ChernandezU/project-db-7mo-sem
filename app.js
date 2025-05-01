const express = require('express');
const app = express();
const errorHandler = require('./vuelos/middlewares/errorHandler'); // o usa uno común si lo deseas
const usuariosRoutes = require('./usuarios/routes/usuariosRoutes');
const programasVueloRoutes = require('./programasVuelo/routes/programasVueloRoutes');
//const vuelosRoutes = require('./vuelos/routes/vuelosRoutes');


// agrega aquí más rutas según tu estructura
app.use(express.json());
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/programas-vuelo', programasVueloRoutes);
//app.use('/api/vuelos', vuelosRoutes);


app.use(errorHandler); // error handler común
module.exports = app;

