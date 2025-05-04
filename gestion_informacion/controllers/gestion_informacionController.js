//aquí está la logica de cada endpoint
const gestionInformacionService = require('../services/gestionInformacionService');

const getAllGestionInformacion = async (req, res) => {
  const gestion = await gestionInformacionService.getAllGestionInformacion();
  res.json(gestion);
};

const getGestionInformacionById = async (req, res) => {
  const gestion = await gestionInformacionService.getGestionInformacionById(req.params.id);
  res.json(gestion || { message: "Registro no encontrado" });
};

const createGestionInformacion = async (req, res) => {
  const nuevoRegistro = await gestionInformacionService.createGestionInformacion(req.body);
  res.json(nuevoRegistro);
};
const updateGestionInformacion = async (req, res) => {
    const actualizado = await gestionInformacionService.updateGestionInformacion(req.params.id, req.body);
    res.json(actualizado ? { message: "Registro actualizado" } : { message: "Error al actualizar" });
  };
  
  const deleteGestionInformacion = async (req, res) => {
    await gestionInformacionService.deleteGestionInformacion(req.params.id);
    res.json({ message: "Registro eliminado" });
  };
  
  module.exports = { getAllGestionInformacion, getGestionInformacionById, createGestionInformacion, updateGestionInformacion, deleteGestionInformacion };
  