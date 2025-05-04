//servicio para la gestion de .....
const SimulacionImpactoFinanciero = require('../models/SimulacionImpactoFinanciero');

const getAllSimulacionImpactoFinanciero = async () => {
  return await SimulacionImpactoFinanciero.findAll();
};

const getSimulacionImpactoFinancieroById = async (id) => {
  return await SimulacionImpactoFinanciero.findByPk(id);
};

const createSimulacionImpactoFinanciero = async (data) => {
  return await SimulacionImpactoFinanciero.create(data);
};

const updateSimulacionImpactoFinanciero = async (id, data) => {
  return await SimulacionImpactoFinanciero.update(data, { where: { id_simulacion: id } });
};

const deleteSimulacionImpactoFinanciero = async (id) => {
  return await SimulacionImpactoFinanciero.destroy({ where: { id_simulacion: id } });
};

module.exports = { getAllSimulacionImpactoFinanciero, getSimulacionImpactoFinancieroById, createSimulacionImpactoFinanciero, updateSimulacionImpactoFinanciero, deleteSimulacionImpactoFinanciero };