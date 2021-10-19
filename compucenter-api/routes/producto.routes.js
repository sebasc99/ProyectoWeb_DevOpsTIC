'use strict'
const express = require('express');
const api = express.Router();
const cors = require('cors');
 
const ProductoCtrl = require('../controllers/producto.controller');

api.use(cors());
api.get('/producto', ProductoCtrl.getProductos);
api.post('/producto', ProductoCtrl.registrarProducto);
api.put('/producto/:id', ProductoCtrl.actualizarProducto);
 
module.exports = api;