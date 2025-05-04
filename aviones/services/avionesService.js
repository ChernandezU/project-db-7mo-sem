//servicio para la gestion de .....
const Avion = require('../models/Avion');

const getAllAviones = async () => {
  return await Avion.findAll();
};

const getAvionById = async (id) => {
  return await Avion.findByPk(id);
};

const createAvion = async (data) => {
  return await Avion.create(data);
};

const updateAvion = async (id, data) => {
  return await Avion.update(data, { where: { id_avion: id } });
};

const deleteAvion = async (id) => {
  return await Avion.destroy({ where: { id_avion: id } });
};

module.exports = { getAllAviones, getAvionById, createAvion, updateAvion, deleteAvion };