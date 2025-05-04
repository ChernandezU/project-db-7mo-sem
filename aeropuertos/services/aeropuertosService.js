//servicio para la gestion de .....
const Aeropuerto = require('../models/Aeropuerto');

const getAllAeropuertos = async () => {
  return await Aeropuerto.findAll();
};

const getAeropuertoById = async (id) => {
  return await Aeropuerto.findByPk(id);
};

const createAeropuerto = async (data) => {
  return await Aeropuerto.create(data);
};

const updateAeropuerto = async (id, data) => {
  return await Aeropuerto.update(data, { where: { id_aeropuerto: id } });
};

const deleteAeropuerto = async (id) => {
  return await Aeropuerto.destroy({ where: { id_aeropuerto: id } });
};

module.exports = { getAllAeropuertos, getAeropuertoById, createAeropuerto, updateAeropuerto, deleteAeropuerto };