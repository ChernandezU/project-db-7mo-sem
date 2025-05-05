const express = require('express');
const router = express.Router();
const aeropuertoService = require('../services/aeropuertosService');

// Definición de funciones de controlador
const getAeropuertos = async (req, res, next) => {
  try {
    const data = await aeropuertoService.getAeropuertos();
    res.json(data);
  } catch (err) {
    next(err);
  }
};

const getAeropuertoById = async (req, res, next) => {
  try {
    const data = await aeropuertoService.getAeropuertoById(req.params.id);
    if (!data) return res.status(404).json({ error: 'Aeropuerto no encontrado' });
    res.json(data);
  } catch (err) {
    next(err);
  }
};

const createAeropuerto = async (req, res, next) => {
  try {
    const data = await aeropuertoService.createAeropuerto(req.body);
    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
};

const updateAeropuerto = async (req, res, next) => {
  try {
    const data = await aeropuertoService.updateAeropuerto(req.params.id, req.body);
    res.json(data ? { message: "Aeropuerto actualizado" } : { error: "Error al actualizar" });
  } catch (err) {
    next(err);
  }
};

const deleteAeropuerto = async (req, res, next) => {
  try {
    await aeropuertoService.deleteAeropuerto(req.params.id);
    res.json({ message: "Aeropuerto eliminado" });
  } catch (err) {
    next(err);
  }
};

// Exportando funciones correctamente
module.exports = { getAeropuertos, getAeropuertoById, createAeropuerto, updateAeropuerto, deleteAeropuerto };
