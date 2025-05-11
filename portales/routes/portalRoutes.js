//Aquí se recibe la petición del usuario y se llama a los controladores. Controlas qué se envía como respuesta.
const express = require('express');
const router = express.Router();
const controller = require('../controllers/portalController');

router.get('/', controller.getAllPortales);
router.get('/:id', controller.getPortalById);
router.post('/', controller.createPortal);
router.put('/:id', controller.updatePortal);
router.delete('/:id', controller.deletePortal);

module.exports = router;
