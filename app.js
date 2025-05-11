const express = require('express');
const app = express();
const errorHandler = require('./usuarios/middlewares/errorHandler'); // Middleware global de errores
require("dotenv").config();
console.log("🔍 API Key cargada:", process.env.MAILGUN_API_KEY);
console.log("🔍 Dominio Mailgun:", process.env.MAILGUN_DOMAIN);

// Importación de rutas
const usuariosRoutes = require('./usuarios/routes/usuariosRoutes');
const programaVueloRoutes = require('./programas_vuelo/routes/programaVueloRoutes');
const aerolineasRoutes = require('./aerolineas/routes/aerolineasRoutes');
const vuelosRoutes = require('./vuelos/routes/vuelosRoutes');
const aeropuertosRoutes = require('./aeropuertos/routes/aeropuertosRoutes');
const avionesRoutes = require('./aviones/routes/avionesRoutes');
const gestionInformacionRoutes = require('./gestion_informacion/routes/gestionInformacionRoutes');
const horariosVuelosRoutes = require('./horarios_vuelos/routes/horariosVuelosRoutes'); 
const programacionEstacionalRoutes = require('./programacion_estacional/routes/programacionEstacionalRoutes');
const arrestosRoutes = require('./arrestos/routes/arrestosRoutes');
const programacionMundialRoutes = require('./programacion_mundial/routes/programacionMundialRoutes');
const simulacionTraficoAereoRoutes = require('./simulacion_trafico_aereo/routes/simulacionTraficoAereoRoutes');
const operacionAereaRoutes = require('./operaciones_aereas/routes/operacionAereaRoutes');
const simulacionFlujoPasajerosRoutes = require('./simulacion_flujo_pasajeros/routes/simulacionFlujoPasajerosRoutes');
const simulacionImpactoFinancieroRoutes = require('./simulacion_impacto_financiero/routes/simulacionImpactoFinancieroRoutes');
const objetoPerdidoRoutes = require('./objetos_perdidos/routes/objetoPerdidoRoutes');
const operacionTerrestreRoutes = require('./operaciones_terrestres/routes/operacionTerrestreRoutes');
const mantenimientoRoutes = require('./mantenimiento/routes/mantenimientoRoutes');
const facturacionRoutes = require('./facturacion/routes/facturacionRoutes');
const pagoRoutes = require('./pagos/routes/pagoRoutes');
const reservaRoutes = require('./reservas/routes/reservaRoutes');
const equipajesRoutes = require('./equipajes/routes/equipajesRoutes');
const mercanciaRoutes = require('./mercancias/routes/mercanciaRoutes');
const escalasTecnicasRoutes = require('./escalas_tecnicas/routes/escalasTecnicasRoutes');
const personalRoutes = require('./personal/routes/personalRoutes');



const cuentaRoutes = require('./cuentas/routes/cuentaRoutes');
const licenciaRoutes = require('./licencias/routes/licenciaRoutes');
const pistaRoutes = require('./pistas/routes/pistaRoutes');
const mantenimientoPistaRoutes = require('./mantenimiento_pistas/routes/mantenimientoPistaRoutes');
const carroRoutes = require('./carros/routes/carroRoutes');
const transporteRoutes = require('./transporte/routes/transporteRoutes');
const checkInRoutes = require('./checkin/routes/checkinRoutes');
const portalRoutes = require('./portales/routes/portalRoutes');
const visaRoutes = require('./visas/routes/visaRoutes');




// Middleware global
app.use(express.json());

// Registro de rutas con `app.use`
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/programas-vuelo', programaVueloRoutes);
app.use('/api/aerolineas', aerolineasRoutes);
app.use('/api/vuelos', vuelosRoutes);
app.use('/api/aeropuertos', aeropuertosRoutes);
app.use('/api/aviones', avionesRoutes);
app.use('/api/gestion_informacion', gestionInformacionRoutes);
app.use('/api/horarios-vuelos', horariosVuelosRoutes); 
app.use('/api/programacion-estacional', programacionEstacionalRoutes);
app.use('/api/arrestos', arrestosRoutes);
app.use('/api/programacion-mundial', programacionMundialRoutes);
app.use('/api/simulacion-trafico-aereo', simulacionTraficoAereoRoutes);
app.use('/api/operaciones-aereas', operacionAereaRoutes);
app.use('/api/simulacion-flujo-pasajeros', simulacionFlujoPasajerosRoutes);
app.use('/api/simulacion-impacto-financiero', simulacionImpactoFinancieroRoutes);
app.use('/api/objetos-perdidos', objetoPerdidoRoutes);
app.use('/api/operaciones-terrestres', operacionTerrestreRoutes);
app.use('/api/mercancias', mercanciaRoutes);
app.use('/api/facturacion', facturacionRoutes);
app.use('/api/pagos', pagoRoutes);
app.use('/api/reservas', reservaRoutes);
app.use('/api/equipajes', equipajesRoutes);
app.use('/api/escalas-tecnicas', escalasTecnicasRoutes);
app.use('/api/mantenimiento', mantenimientoRoutes);
app.use('/api/personal', personalRoutes);



app.use('/api/cuentas', cuentaRoutes);
app.use('/api/licencias', licenciaRoutes);
app.use('/api/pistas', pistaRoutes);
app.use('/api/mantenimiento-pistas', mantenimientoPistaRoutes);
app.use('/api/carros', carroRoutes);
app.use('/api/transporte', transporteRoutes);
app.use('/api/checkin', checkInRoutes);
app.use('/api/portales', portalRoutes);
app.use('/api/visas', visaRoutes);


// Manejo de errores global
app.use(errorHandler);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

module.exports = app;



//para levantar el proyecto es node server.js