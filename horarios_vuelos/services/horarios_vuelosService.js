//servicio para la gestion de .....
const HorariosVuelos = require('../models/HorariosVuelos');

const getAllHorariosVuelos = async () => {
  return await HorariosVuelos.findAll();
};

const getHorariosVuelosById = async (id) => {
  return await HorariosVuelos.findByPk(id);
};

const createHorariosVuelos = async (data) => {
  return await HorariosVuelos.create(data);
};

const updateHorariosVuelos = async (id, data) => {
  return await HorariosVuelos.update(data, { where: { id_horario: id } });
};

const deleteHorariosVuelos = async (id) => {
  return await HorariosVuelos.destroy({ where: { id_horario: id } });
};

module.exports = { getAllHorariosVuelos, getHorariosVuelosById, createHorariosVuelos, updateHorariosVuelos, deleteHorariosVuelos };