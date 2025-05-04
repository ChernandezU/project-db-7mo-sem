//servicio para la gestion de .....
const Arresto = require('../models/Arresto');

const getAllArrestos = async () => {
  return await Arresto.findAll();
};

const getArrestoById = async (id) => {
  return await Arresto.findByPk(id);
};

const createArresto = async (data) => {
  return await Arresto.create(data);
};

const updateArresto = async (id, data) => {
  return await Arresto.update(data, { where: { id_arresto: id } });
};

const deleteArresto = async (id) => {
  return await Arresto.destroy({ where: { id_arresto: id } });
};

module.exports = { getAllArrestos, getArrestoById, createArresto, updateArresto, deleteArresto };