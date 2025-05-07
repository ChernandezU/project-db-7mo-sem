const express = require('express');
const router = express.Router();
const avionesController = require('../controllers/avionesController');

router.get('/all', avionesController.getAllAviones);
router.get('/:id', avionesController.getAvionById);
router.post('/', avionesController.createAvion);
router.put('/:id', avionesController.updateAvion);
router.delete('/:id', avionesController.deleteAvion);

module.exports = router;
