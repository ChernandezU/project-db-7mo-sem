//Aquí se recibe la petición del usuario y se llama a los servicios. Controlas qué se envía como respuesta.
const express = require('express');
const router = express.Router();
const equipajesController = require('../controllers/equipajesController');

router.get('/', equipajesController.getAllEquipajes);
router.get('/:id', equipajesController.getEquipajeById);
router.post('/', equipajesController.createEquipaje);
router.delete('/:id', equipajesController.deleteEquipaje);

module.exports = router;
