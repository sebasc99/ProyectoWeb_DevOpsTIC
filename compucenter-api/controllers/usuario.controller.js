'use strict'
const Usuario = require('../models/Usuario.model.js')
 
function getUsuarios(req, res){
    Usuario.find({}, (error, usuarios)=>{
        //En caso de que haya habido un error
        if(error) return res.status(500).send({
            message: `Error al realiza la consulta de los usuarios
           ${error}`
        });
 
        //En caso que no haya productos
        if(!usuarios) return res.status(404).send({
            message: `No hay usuarios registrados`
        });
 
        //En caso que todo vaya bien
        res.status(200).send({ usuarios });
    })
}
 
function registrarUsuario(req, res){
    console.log('POST /api/usuario');
    console.log(req.body);
 
    //Primero buscamos el producto en la abse de datos
    Usuario.findOne({id: req.body.id}, (err, usuarioEnBaseDeDatos)=>{
        if(!usuarioEnBaseDeDatos){
            //Si no se encuentra el producto, se guarda
            let usuarioTemp = {
                id : req.body.id,
                usuario: req.body.usuario,
                rol: req.body.rol,
                estado: req.body.estado
            }
       
            let usuarioARegistrar = new Usuario(usuarioTemp);
       
            usuarioARegistrar.save((error, usuarioRegistrado)=>{
                if(!error){
                    res.status(200).send({
                        message: 'Usuario registrado',
                        usuarioRegistrado
                    })
                }else{
                    res.status(500).send({
                        message: `Error al guardar nuevo usuario en la base de datos: ${err}`
                    });
                }
            })
 
           
        }else{
            //Si se encuenra el usuario sacamos un error
            res.status(400).send({
                message: `El usuario con id ${req.body.id} ya se encuentra registrado`
            })
        }
    });
 
}
function actualizarUsuario(req, res){
 
      const id = req.params.id;
    
      Usuario.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
          if (!data) {
            res.status(404).send({
              message: `No se pudo actualizar el usuario con id= ${id}.`
            });
          } else res.send({ message: `El usuario con id ${id} fue actualizado exitosamente.` });
        })
        .catch(err => {
          res.status(500).send({
            message: "Error actualizando el usuario con id= " + id
          });
        });
}

module.exports = {
    getUsuarios,
    registrarUsuario,
    actualizarUsuario
}
 
 
