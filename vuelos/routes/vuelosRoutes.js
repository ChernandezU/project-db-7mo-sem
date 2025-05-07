const express = require('express');
const router = express.Router();
const controller = require('../controllers/vuelosController');

router.get('/', controller.getAllVuelos);
router.get('/:id', controller.getVueloById);
router.post('/', controller.createVuelo);
router.put('/:id', controller.updateVuelo);
router.delete('/:id', controller.deleteVuelo);

module.exports = router;
