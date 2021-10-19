'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
const VentaSchema = Schema({
    id: String,
    idCliente: String,
    nombreCliente: String,
    nombreVendedor: String,
    idProducto: String,
    precioUnitario: Number,
    cantidad: Number,
    valor: Number,
    fecha: Date,
});
 
module.exports = mongoose.model('Venta', VentaSchema);