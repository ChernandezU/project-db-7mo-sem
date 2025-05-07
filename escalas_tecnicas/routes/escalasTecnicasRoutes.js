const express = require('express');
const router = express.Router();
const controller = require('../controllers/escalasTecnicasController');

router.get('/', controller.getAllEscalas);
router.get('/:id', controller.getEscalaById);
router.post('/', controller.createEscala);
router.put('/:id', controller.updateEscala);
router.delete('/:id', controller.deleteEscala);

module.exports = router;
