'use strict'
 
const express = require ('express');
 
const apiVentas = require('./routes/venta.routes');
const apiProductos = require('./routes/producto.routes');
const apiUsuarios = require('./routes/usuario.routes');
const app = express();
 
app.use(express.urlencoded({extended:false}));
app.use(express.json());
 
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/api', apiVentas);
app.use('/api', apiProductos);
app.use('/api', apiUsuarios);
 
module.exports=app
