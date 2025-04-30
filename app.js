const express = require('express');
const app = express();
const vuelosRoutes = require('./routes/vuelosRoutes');
const errorHandler = require('./middlewares/errorHandler');
const testConnection = require('./routes/testConnection');


app.use('/api/test-db', testConnection);
app.use(express.json());
app.use('/api/vuelos', vuelosRoutes);
app.use(errorHandler);


module.exports = app;

