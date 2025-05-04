//servicio para la gestion de .....
const Aerolinea = require('../models/Aerolinea');

const getAllAerolineas = async () => {
  return await Aerolinea.findAll();
};

const getAerolineaById = async (id) => {
  return await Aerolinea.findByPk(id);
};

const createAerolinea = async (data) => {
  return await Aerolinea.create(data);
};

const updateAerolinea = async (id, data) => {
  return await Aerolinea.update(data, { where: { id_aerolinea: id } });
};

const deleteAerolinea = async (id) => {
  return await Aerolinea.destroy({ where: { id_aerolinea: id } });
};

module.exports = { getAllAerolineas, getAerolineaById, createAerolinea, updateAerolinea, deleteAerolinea };