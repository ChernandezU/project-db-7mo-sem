//servicio para la gestion de .....
const SimulacionTraficoAereo = require('../models/SimulacionTraficoAereo');

const getAllSimulacionTraficoAereo = async () => {
  return await SimulacionTraficoAereo.findAll();
};

const getSimulacionTraficoAereoById = async (id) => {
  return await SimulacionTraficoAereo.findByPk(id);
};

const createSimulacionTraficoAereo = async (data) => {
  return await SimulacionTraficoAereo.create(data);
};

const updateSimulacionTraficoAereo = async (id, data) => {
  return await SimulacionTraficoAereo.update(data, { where: { id_simulacion: id } });
};

const deleteSimulacionTraficoAereo = async (id) => {
  return await SimulacionTraficoAereo.destroy({ where: { id_simulacion: id } });
};

module.exports = { getAllSimulacionTraficoAereo, getSimulacionTraficoAereoById, createSimulacionTraficoAereo, updateSimulacionTraficoAereo, deleteSimulacionTraficoAereo };