//servicio para la gestion de .....
const ProgramacionMundial = require('../models/ProgramacionMundial');

const getAllProgramacionMundial = async () => {
  return await ProgramacionMundial.findAll();
};

const getProgramacionMundialById = async (id) => {
  return await ProgramacionMundial.findByPk(id);
};

const createProgramacionMundial = async (data) => {
  return await ProgramacionMundial.create(data);
};

const updateProgramacionMundial = async (id, data) => {
  return await ProgramacionMundial.update(data, { where: { id_programacion: id } });
};

const deleteProgramacionMundial = async (id) => {
  return await ProgramacionMundial.destroy({ where: { id_programacion: id } });
};

module.exports = { getAllProgramacionMundial, getProgramacionMundialById, createProgramacionMundial, updateProgramacionMundial, deleteProgramacionMundial };