'use strict'
const Venta = require('../models/Venta.model.js')
 
function getVentas(req, res){
    Venta.find({}, (error, ventas)=>{
        //En caso de que haya habido un error
        if(error) return res.status(500).send({
            message: `Error al realiza la consula de las ventas
: ${error}`
        });
 
        //En caso que no haya ventas
        if(!ventas) return res.status(404).send({
            message: `No hay ventas registradas`
        });
 
        //En caso que todo vaya bien
        res.status(200).send({ ventas });
    })
}
 
function registrarVenta(req, res){
    console.log('POST /api/venta');
    console.log(req.body);
 
    //Primero buscamos la venta en la base de datos
    Venta.findOne({id: req.body.id}, (err, ventaEnBaseDeDatos)=>{
        if(!ventaEnBaseDeDatos){
            //Si no se encuentra el producto, se guarda
            let ventaTemp = {
                id : req.body.id,
                idCliente: req.body.idCliente,
                nombreCliente: req.body.nombreCliente,
                nombreVendedor: req.body.nombreVendedor,
                idProducto: req.body.idProducto,
                precioUnitario: req.body.precioUnitario,
                cantidad: req.body.cantidad,
                valor: req.body.valor,
                fecha: req.body.fecha,
            }
       
            let ventaARegistrar = new Venta(ventaTemp);
            
            ventaARegistrar.save((error, ventaRegistrado)=>{
                if(!error){
                    res.status(200).send({
                        message: 'Venta registrada',
                        ventaRegistrado
                    })
                }else{
                    res.status(500).send({
                        message: `Error al guardar la nueva venta en la base de datos: ${err}`
                    });
                }
            })
 
           
        }else{
            //Si se encuentra la venta sacamos un error
            res.status(400).send({
                message: `La venta con id ${req.body.id} ya se encuentra registrada`
            })
        }
    });
}

function actualizarVenta(req, res){
	const id = req.params.id;

	Venta.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
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
    getVentas,
    registrarVenta,
    actualizarVenta,
}
