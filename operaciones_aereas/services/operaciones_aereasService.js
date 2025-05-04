//servicio para la gestion de .....
const OperacionAerea = require('../models/OperacionAerea');

const getAllOperacionesAereas = async () => {
  return await OperacionAerea.findAll();
};

const getOperacionAereaById = async (id) => {
  return await OperacionAerea.findByPk(id);
};

const createOperacionAerea = async (data) => {
  return await OperacionAerea.create(data);
};

const updateOperacionAerea = async (id, data) => {
  return await OperacionAerea.update(data, { where: { id_operacion_aerea: id } });
};

const deleteOperacionAerea = async (id) => {
  return await OperacionAerea.destroy({ where: { id_operacion_aerea: id } });
};

module.exports = { getAllOperacionesAereas, getOperacionAereaById, createOperacionAerea, updateOperacionAerea, deleteOperacionAerea };