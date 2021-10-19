'use strict'
const Producto = require('../models/Producto.model.js')
 
function getProductos(req, res){
    Producto.find({}, (error, productos)=>{
        //En caso de que haya habido un error
        if(error) return res.status(500).send({
            message: `Error al realiza la consula de los productos
: ${error}`
        });
 
        //En caso que no haya productos
        if(!productos) return res.status(404).send({
            message: `No hay productos registrados`
        });
 
        //En caso que todo vaya bien
        res.status(200).send({ productos });
    })
}
 
function registrarProducto(req, res){
    console.log('POST /api/producto');
    console.log(req.body);
 
    //Primero buscamos el producto en la base de datos
    Producto.findOne({id: req.body.id}, (err, productoEnBaseDeDatos)=>{
        if(!productoEnBaseDeDatos){
            //Si no se encuentra el producto, se guarda
            let productoTemp = {
                id : req.body.id,
                nombre: req.body.nombre,
                descripcion: req.body.descripcion,
                cantidad: req.body.cantidad,
                estado: req.body.estado,
                categoria: req.body.categoria,
            }
       
            let productoARegistrar = new Producto(productoTemp);
            
            productoARegistrar.save((error, productoRegistrado)=>{
                if(!error){
                    res.status(200).send({
                        message: 'Producto registrado',
                        productoRegistrado
                    })
                }else{
                    res.status(500).send({
                        message: `Error al guardar el nuevo producto en la base de datos: ${err}`
                    });
                }
            })
 
           
        }else{
            //Si se encuentra el producto sacamos un error
            res.status(400).send({
                message: `El producto con id ${req.body.id} ya se encuentra registrado`
            })
        }
    });
}

function actualizarProducto(req, res){
	const id = req.params.id;

	Producto.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
		.then(data => {
			if (!data) {
				res.status(404).send({
					message: `No se pudo actualizar el registro con id= ${id}.`
				});
			} else res.send({ message: `El registro con id ${id} fue actualizado exitosamente.` });
		})
		.catch(err => {
			res.status(500).send({
				message: "Error actualizando el registro con id= " + id
			});
		});
}
 
module.exports = {
    getProductos,
    registrarProducto,
    actualizarProducto,
}
