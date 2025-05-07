const express = require('express');
const router = express.Router();
const controller = require('../controllers/programacionMundialController');

router.get('/', controller.getAllProgramacionesMundiales);
router.get('/:id', controller.getProgramacionMundialById);
router.post('/', controller.createProgramacionMundial);
router.put('/:id', controller.updateProgramacionMundial);
router.delete('/:id', controller.deleteProgramacionMundial);

module.exports = router;
