'use strict'

//modelos
var User = require('../models/user');// !!! METO A USER PORQ SE NECESESITA OBLIGADO PARA EL 'populate'
var Transportista = require('../models/transportista');
var Cliente = require('../models/cliente');


//acciones
function pruebaCli(req, res) {

	Cliente.find({}).populate({path:'user'}).exec((err,clientes)=>{
		if (err) {
			console.log("Error al listar clientes",err);
			res.status(500).send({message: "Error en la petición"});
		}else{
			if (!clientes) {
				res.status(404).send({message: "Error, no se encontraron clientes"});
				console.log("Error, no se encontraron clientes");
			}else{
				res.status(200).json({clientes});
				console.log("Lista de clientes: \n", clientes);
			}
		}
	});
}

module.exports = {
	pruebaCli
};