//aquí está la logica de cada endpoint
<<<<<<< HEAD
=======
const escalasTecnicasService = require('../services/escalasTecnicasService');

const getAllEscalasTecnicas = async (req, res) => {
  const escalas = await escalasTecnicasService.getAllEscalasTecnicas();
  res.json(escalas);
};

const getEscalaTecnicaById = async (req, res) => {
  const escala = await escalasTecnicasService.getEscalaTecnicaById(req.params.id);
  res.json(escala || { message: "Escala técnica no encontrada" });
};

const createEscalaTecnica = async (req, res) => {
  const nuevaEscala = await escalasTecnicasService.createEscalaTecnica(req.body);
  res.json(nuevaEscala);
};

const updateEscalaTecnica = async (req, res) => {
  const actualizado = await escalasTecnicasService.updateEscalaTecnica(req.params.id, req.body);
  res.json(actualizado ? { message: "Escala técnica actualizada" } : { message: "Error al actualizar" });
};

const deleteEscalaTecnica = async (req, res) => {
  await escalasTecnicasService.deleteEscalaTecnica(req.params.id);
  res.json({ message: "Escala técnica eliminada" });
};

module.exports = { getAllEscalasTecnicas, getEscalaTecnicaById, createEscalaTecnica, updateEscalaTecnica, deleteEscalaTecnica };
>>>>>>> origin/desarrollo/sheyla
