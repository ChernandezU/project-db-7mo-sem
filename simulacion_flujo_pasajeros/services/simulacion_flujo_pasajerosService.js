//servicio para la gestion de .....
const SimulacionFlujoPasajeros = require('../models/SimulacionFlujoPasajeros');

const getAllSimulacionFlujoPasajeros = async () => {
  return await SimulacionFlujoPasajeros.findAll();
};

const getSimulacionFlujoPasajerosById = async (id) => {
  return await SimulacionFlujoPasajeros.findByPk(id);
};

const createSimulacionFlujoPasajeros = async (data) => {
  return await SimulacionFlujoPasajeros.create(data);
};

const updateSimulacionFlujoPasajeros = async (id, data) => {
  return await SimulacionFlujoPasajeros.update(data, { where: { id_simulacion: id } });
};

const deleteSimulacionFlujoPasajeros = async (id) => {
  return await SimulacionFlujoPasajeros.destroy({ where: { id_simulacion: id } });
};

module.exports = { getAllSimulacionFlujoPasajeros, getSimulacionFlujoPasajerosById, createSimulacionFlujoPasajeros, updateSimulacionFlujoPasajeros, deleteSimulacionFlujoPasajeros };