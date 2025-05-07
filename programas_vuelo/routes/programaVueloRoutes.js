const express = require('express');
const router = express.Router();
const controller = require('../controllers/programaVueloController');

router.get('/', controller.getAllProgramasVuelo);
router.get('/:id', controller.getProgramaVueloById);
router.post('/', controller.createProgramaVuelo);
router.put('/:id', controller.updateProgramaVuelo);
router.delete('/:id', controller.deleteProgramaVuelo);

module.exports = router;
