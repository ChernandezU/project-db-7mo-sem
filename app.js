const express = require('express');
const app = express();
const errorHandler = require('./BD_PROYECTO/vuelos/middlewares/errorHandler'); // Middleware global de errores

// Importación de rutas
const usuariosRoutes = require('./usuarios/routes/usuariosRoutes');
//const programasVueloRoutes = require('./BD_PROYECTO/programas_vuelo/routes/programas_vuelosRoutes');
//const aerolineasRoutes = require('./BD_PROYECTO/aerolineas/routes/aerolineasRoutes');
//const aeropuertosRoutes = require('./BD_PROYECTO/aeropuertos/routes/aeropuertosRoutes');
//const avionesRoutes = require('./BD_PROYECTO/aviones/routes/avionesRoutes');
//const gestionInformacionRoutes = require('./BD_PROYECTO/gestion_informacion/routes/gestionInformacionRoutes');
//const horariosVuelosRoutes = require('./BD_PROYECTO/horarios_vuelos/routes/horariosVuelosRoutes');
//const programacionEstacionalRoutes = require('./BD_PROYECTO/programacion_estacional/routes/programacionEstacionalRoutes');
// const vuelosRoutes = require('./Backend_DB_U/vuelos/routes/vuelosRoutes'); // Descomentar cuando se implemente
//const arrestosRoutes = require('./BD_PROYECTO/arrestos/routes/arrestosRoutes');
//const programacionMundialRoutes = require('./BD PROYECTO/programacion_mundial/routes/programacionMundialRoutes');
//const simulacionTraficoAereoRoutes = require('./BD PROYECTO/simulacion_trafico_aereo/routes/simulacionTraficoAereoRoutes');
//const operacionesAereasRoutes = require('./BD_PROYECTO/operaciones_aereas/routes/operacionesAereasRoutes');
//const simulacionFlujoPasajerosRoutes = require('./BD_PROYECTO/simulacion_flujo_pasajeros/routes/simulacionFlujoPasajerosRoutes');
//const simulacionImpactoFinancieroRoutes = require('./BD_PROYECTO/simulacion_impacto_financiero/routes/simulacionImpactoFinancieroRoutes');



// Middleware global
app.use(express.json());

// Registro de rutas con `app.use`
app.use('/api/usuarios', usuariosRoutes);
//app.use('/api/programas-vuelo', programasVueloRoutes);
//app.use('/api/aerolineas', aerolineasRoutes);
//app.use('/api/aeropuertos', aeropuertosRoutes);
//app.use('/api/aviones', avionesRoutes);
//app.use('/api/gestion-informacion', gestionInformacionRoutes);
//app.use('/api/horarios-vuelos', horariosVuelosRoutes);
//app.use('/api/programacion-estacional', programacionEstacionalRoutes);
//app.use('/api/arrestos', arrestosRoutes);
//app.use('/api/programacion-mundial', programacionMundialRoutes);
//app.use('/api/simulacion-trafico-aereo', simulacionTraficoAereoRoutes);
//app.use('/api/operaciones-aereas', operacionesAereasRoutes);
//app.use('/api/simulacion-flujo-pasajeros', simulacionFlujoPasajerosRoutes);
//app.use('/api/simulacion-impacto-financiero', simulacionImpactoFinancieroRoutes);



<<<<<<< HEAD
//para levantar el proyecto es node server.js
=======

// Manejo de errores global
app.use(errorHandler);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

module.exports = app;
>>>>>>> 96a565c3f0b8b728cace02e6a4c5a21424055f39
