//aquí está la logica de cada endpoint
const personalService = require('../services/personalService');

const getAllPersonal = async (req, res) => {
  const personal = await personalService.getAllPersonal();
  res.json(personal);
};

const getPersonalById = async (req, res) => {
  const persona = await personalService.getPersonalById(req.params.id);
  res.json(persona || { message: "Personal no encontrado" });
};

const createPersonal = async (req, res) => {
  const nuevaPersona = await personalService.createPersonal(req.body);
  res.json(nuevaPersona);
};

const updatePersonal = async (req, res) => {
  const actualizado = await personalService.updatePersonal(req.params.id, req.body);
  res.json(actualizado ? { message: "Personal actualizado" } : { message: "Error al actualizar" });
};

const deletePersonal = async (req, res) => {
  await personalService.deletePersonal(req.params.id);
  res.json({ message: "Personal eliminado" });
};

module.exports = { getAllPersonal, getPersonalById, createPersonal, updatePersonal, deletePersonal };