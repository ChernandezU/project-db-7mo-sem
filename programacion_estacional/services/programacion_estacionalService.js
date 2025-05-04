//servicio para la gestion de .....
const ProgramacionEstacional = require('../models/ProgramacionEstacional');

const getAllProgramacionEstacional = async () => {
  return await ProgramacionEstacional.findAll();
};

const getProgramacionEstacionalById = async (id) => {
  return await ProgramacionEstacional.findByPk(id);
};

const createProgramacionEstacional = async (data) => {
  return await ProgramacionEstacional.create(data);
};

const updateProgramacionEstacional = async (id, data) => {
  return await ProgramacionEstacional.update(data, { where: { id_programacion: id } });
};

const deleteProgramacionEstacional = async (id) => {
  return await ProgramacionEstacional.destroy({ where: { id_programacion: id } });
};

module.exports = { getAllProgramacionEstacional, getProgramacionEstacionalById, createProgramacionEstacional, updateProgramacionEstacional, deleteProgramacionEstacional };