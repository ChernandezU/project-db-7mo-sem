const express = require('express');
const vuelosRoutes = require('./routes/vuelosRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
app.use(express.json());

app.use('/api/vuelos', vuelosRoutes);
app.use(errorHandler);

module.exports = app;
