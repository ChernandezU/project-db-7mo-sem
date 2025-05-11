//Aquí se recibe la petición del usuario y se llama a los controladores. Controlas qué se envía como respuesta.
const express = require('express');
const router = express.Router();
const controller = require('../controllers/cuentaController');

router.get('/', controller.getAllCuentas);
router.get('/:id', controller.getCuentaById);
router.post('/', controller.createCuenta);
router.put('/:id', controller.updateCuenta);
router.delete('/:id', controller.deleteCuenta);

module.exports = router;
