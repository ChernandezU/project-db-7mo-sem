<<<<<<< HEAD
const aeropuertosService = require('../services/aeropuertosService');

exports.obtenerAeropuertos = async (req, res, next) => {
  try {
    const aeropuertos = await aeropuertosService.obtenerAeropuertos();
    res.status(200).json(aeropuertos);
  } catch (error) {
    next(error);
  }
};

exports.crearAeropuerto = async (req, res, next) => {
  try {
    const nuevoAeropuerto = await aeropuertosService.crearAeropuerto(req.body);
    res.status(201).json(nuevoAeropuerto);
  } catch (error) {
    next(error);
  }
};

exports.actualizarAeropuerto = async (req, res, next) => {
  try {
    const aeropuertoActualizado = await aeropuertosService.actualizarAeropuerto(req.params.id, req.body);
    res.status(200).json(aeropuertoActualizado);
  } catch (error) {
    next(error);
  }
};

exports.eliminarAeropuerto = async (req, res, next) => {
  try {
    await aeropuertosService.eliminarAeropuerto(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
=======
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
>>>>>>> origin/desarrollo/sheyla
