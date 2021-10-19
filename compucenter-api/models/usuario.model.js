'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
const UsuarioSchema = Schema({
    id: String,
    usuario: String,
    rol: String,
    estado: String
});
 
module.exports = mongoose.model('Usuario', UsuarioSchema);