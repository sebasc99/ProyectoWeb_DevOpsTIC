'use strict'
const express = require('express');
const api = express.Router();
const cors = require('cors');
 
const VentaCtrl = require('../controllers/venta.controller');

api.use(cors());
api.get('/venta', VentaCtrl.getVentas);
api.post('/venta', VentaCtrl.registrarVenta);
api.put('/venta/:id', VentaCtrl.actualizarVenta);
 
module.exports = api;