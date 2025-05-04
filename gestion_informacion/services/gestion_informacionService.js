//servicio para la gestion de .....
const GestionInformacion = require('../models/GestionInformacion');

const getAllGestionInformacion = async () => {
  return await GestionInformacion.findAll();
};

const getGestionInformacionById = async (id) => {
  return await GestionInformacion.findByPk(id);
};

const createGestionInformacion = async (data) => {
  return await GestionInformacion.create(data);
};

const updateGestionInformacion = async (id, data) => {
  return await GestionInformacion.update(data, { where: { id_gestion: id } });
};

const deleteGestionInformacion = async (id) => {
  return await GestionInformacion.destroy({ where: { id_gestion: id } });
};

module.exports = { getAllGestionInformacion, getGestionInformacionById, createGestionInformacion, updateGestionInformacion, deleteGestionInformacion };
