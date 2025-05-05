const express = require('express');
const app = express();
<<<<<<< HEAD
const errorHandler = require('./usuarios/middlewares/errorHandler'); // Middleware global de errores

// Importación de rutas
const usuariosRoutes = require('./usuarios/routes/usuariosRoutes');
const programasVueloRoutes = require('./programas_vuelo/routes/programasVueloRoutes');
const aerolineasRoutes = require('./aerolineas/routes/aerolineasRoutes');
const vuelosRoutes = require('./vuelos/routes/vuelosRoutes');
const aeropuertosRoutes = require('./aeropuertos/routes/aeropuertosRoutes');
const avionesRoutes = require('./aviones/routes/avionesRoutes');
const gestionInformacionRoutes = require('./gestion_informacion/routes/gestionInformacionRoutes');
const horariosVuelosRoutes = require('./horarios_vuelos/routes/horariosVuelosRoutes'); // Aquí agregas las rutas de horarios_vuelos
const programacionEstacionalRoutes = require('./programacion_estacional/routes/programacionEstacionalRoutes');
const arrestosRoutes = require('./arrestos/routes/arrestosRoutes');
const programacionMundialRoutes = require('./programacion_mundial/routes/programacionMundialRoutes');
const simulacionTraficoAereoRoutes = require('./simulacion_trafico_aereo/routes/simulacionTraficoAereoRoutes');
const operacionesAereasRoutes = require('./operaciones_aereas/routes/operacionesAereasRoutes');
const simulacionFlujoPasajerosRoutes = require('./simulacion_flujo_pasajeros/routes/simulacionFlujoPasajerosRoutes');
const simulacionImpactoFinancieroRoutes = require('./simulacion_impacto_financiero/routes/simulacionImpactoFinancieroRoutes');
//douglas
const objetosPerdidosRoutes = require('./objetos_perdidos/routes/objetos_perdidosRoutes');
const operacionesTerrestresRoutes = require('./operaciones_terrestres/routes/operaciones_TerrestresRoutes');
const mercanciasRoutes = require('./mercancias/routes/mercanciasRoutes');
const facturacionRoutes = require('./facturacion/routes/facturacionRoutes');
const pagosRoutes = require('./pagos/routes/pagosRoutes');
=======
const errorHandler = require('./BD_PROYECTO/vuelos/middlewares/errorHandler'); // Middleware global de errores

// Importación de rutas
const usuariosRoutes = require('./usuarios/routes/usuariosRoutes');
//const programasVueloRoutes = require('./programas_vuelo/routes/programas_vuelosRoutes');
//const aerolineasRoutes = require('./aerolineas/routes/aerolineasRoutes');
//const aeropuertosRoutes = require('./aeropuertos/routes/aeropuertosRoutes');
//const avionesRoutes = require('./aviones/routes/avionesRoutes');
//const gestionInformacionRoutes = require('./gestion_informacion/routes/gestionInformacionRoutes');
//const horariosVuelosRoutes = require('./horarios_vuelos/routes/horariosVuelosRoutes');
//const programacionEstacionalRoutes = require('./programacion_estacional/routes/programacionEstacionalRoutes');
// const vuelosRoutes = require('./vuelos/routes/vuelosRoutes'); // Descomentar cuando se implemente
//const arrestosRoutes = require('./arrestos/routes/arrestosRoutes');
//const programacionMundialRoutes = require('./programacion_mundial/routes/programacionMundialRoutes');
//const simulacionTraficoAereoRoutes = require('./simulacion_trafico_aereo/routes/simulacionTraficoAereoRoutes');
//const operacionesAereasRoutes = require('./operaciones_aereas/routes/operacionesAereasRoutes');
//const simulacionFlujoPasajerosRoutes = require('./simulacion_flujo_pasajeros/routes/simulacionFlujoPasajerosRoutes');
//const simulacionImpactoFinancieroRoutes = require('./simulacion_impacto_financiero/routes/simulacionImpactoFinancieroRoutes');
//const reservasRoutes = require('./reservas/routes/reservasRoutes');
//const equipajesRoutes = require('./equipajes/routes/equipajesRoutes');
//const escalasTecnicasRoutes = require('./escalas_tecnicas/routes/escalasTecnicasRoutes');
//const mantenimientoRoutes = require('./mantenimiento/routes/mantenimientoRoutes');
//const personalRoutes = require('./personal/routes/personalRoutes');




>>>>>>> origin/desarrollo/sheyla
// Middleware global
app.use(express.json());

// Registro de rutas con `app.use`
app.use('/api/usuarios', usuariosRoutes);
<<<<<<< HEAD
app.use('/api/programas-vuelo', programasVueloRoutes);
app.use('/api/aerolineas', aerolineasRoutes);
app.use('/api/vuelos', vuelosRoutes);
app.use('/api/aeropuertos', aeropuertosRoutes);
app.use('/api/aviones', avionesRoutes);
app.use('/api/gestion-informacion', gestionInformacionRoutes);
app.use('/api/horarios-vuelos', horariosVuelosRoutes); 
app.use('/api/programacion-estacional', programacionEstacionalRoutes);
app.use('/api/arrestos', arrestosRoutes);
app.use('/api/programacion-mundial', programacionMundialRoutes);
app.use('/api/simulacion-trafico-aereo', simulacionTraficoAereoRoutes);
app.use('/api/operaciones_aereas', operacionesAereasRoutes);
app.use('/api/simulacion-flujo-pasajeros', simulacionFlujoPasajerosRoutes);
app.use('/api/simulacion-impacto-financiero', simulacionImpactoFinancieroRoutes);
app.use('/api/simulacion_impacto_financiero', simulacionImpactoFinancieroRoutes);
//douglas
app.use('/api/objetos-perdidos', objetosPerdidosRoutes);
app.use('/api/operaciones-terrestres', operacionesTerrestresRoutes);
app.use('/api/mercancias', mercanciasRoutes);
app.use('/api/facturacion', facturacionRoutes);
app.use('/api/pagos', pagosRoutes);
=======
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
//app.use('/api/reservas', reservasRoutes);
//app.use('/api/equipajes', equipajesRoutes);
//app.use('/api/escalas-tecnicas', escalasTecnicasRoutes);
//app.use('/api/mantenimiento', mantenimientoRoutes);
//app.use('/api/personal', personalRoutes);


>>>>>>> origin/desarrollo/sheyla

//para levantar el proyecto es node server.js


<<<<<<< HEAD




=======
>>>>>>> origin/desarrollo/sheyla
// Manejo de errores global
app.use(errorHandler);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

module.exports = app;
