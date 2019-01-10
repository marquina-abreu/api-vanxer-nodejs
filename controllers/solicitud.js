'use strict'
var fs = require('fs');
var path = require('path');
//modelos
var Solicitud = require('../models/solicitud');
var Transportista = require('../models/transportista');
var Zona = require('../models/zona');
var Turno = require('../models/turno');
var Transturno = require('../models/transturno');


function saveSolicitud(req,res){

	var solicitud= new Solicitud();

	var params = req.body;

	if (params.email) {
		solicitud.name= params.name;
		solicitud.surname = params.surname;
		solicitud.phone = params.phone;
		solicitud.email = params.email;
		solicitud.commentary = params.commentary;
		solicitud.zona = params.zona;
		solicitud.turno = params.turno;
		solicitud.transportista = params.transportista;

		solicitud.save((err,solicitudStored)=>{
			if (err) {
				res.status(500).send({message: "Error en el servidor"});
			}else{
				if (!solicitudStored) {
					res.status(404).send({message: "No se pudo guardar la solicitud"});
				}else{
					res.status(200).send({solicitud:solicitudStored});
					console.log("Se guardo el registro exitosamente");
				}
			}

		})
	}else {
		res.status(200).send({message: "El email es obligatorio"});
	}

}


function listZonas(req,res){
	Zona.find({}).exec((err,zonas)=>{
		if (err) {
			console.log("Error al listar zonas",err);
			res.status(500).send({message: "Error en la petición"});
		}else{
			if (!zonas) {
				res.status(404).send({message: "Error, no se encontraron zonas"});
				console.log("Error, no se encontraron zonas");
			}else{
				res.status(200).json({zonas});
				//console.log("Lista de zonas \n",zonas);
			}
		}
	})

}

function listTurnos(req,res){
	Turno.find({}).exec((err,turnos)=>{
		if (err) {
			console.log("Error al listar turnos",err);
			res.status(500).send({message: "Error en la petición"});
		}else{
			if (!turnos) {
				res.status(404).send({message: "Error, no se encontraron turnos"});
				console.log("Error, no se encontraron turnos");
			}else{
				res.status(200).json({turnos});
				//console.log("Lista de zonas \n",zonas);
			}
		}
	})

}

function listSolicitudes(req,res){

	let id_user = req.params.idt; //tomado del localstorage segun la sesion del transportista

	if(id_user){
		//buscar id del transportista con el id de su user..
		Transportista.findOne({'user':id_user},{'_id':1}).exec((err,idtranspor)=>{
			if(err){
				console.log("Error ");
				
			}else{
				if(!idtranspor){
					console.log("errorr")
				}else{
					
					let idtrans = idtranspor._id;
					console.log("ID del Transportista, success! \n",idtrans);
					//Buscar solicitudes segun id del transportista
					Solicitud.find({}).where('transportista').equals(idtrans).exec((err,solicitudes)=>{
						if(err){
							console.log("Error a listar solicitudes");
							res.status(500).send({message: "Error en la petición"});
						}else{
							if(!solicitudes){
								res.status(404).send({message: "Error, este transportista no tiene solicitudes"});
							}else{
								res.status(200).json({solicitudes});
								console.log("Pack de solicitudes, success! \n",solicitudes);
							}
						}
					})
				}
			}
		})

	}
	
}

//acciones
function listTrans(req, res) {

	//zona elegida--> id
	let zona_id = req.params.idz;
	let turno_id = req.params.idt;

	if(zona_id && turno_id){
		Transturno.find({}).populate({path:'transportista'}).where('turno').equals(turno_id).exec((err,transportistas)=>{
			if (err) {
				console.log("Error al listar transportistas de trans turno",err);
				res.status(500).send({message: "Error en la petición"});
			}else{
				if (!transportistas) {
					res.status(404).send({message: "Error, no se encontraron transportistas en trans turno"});
					console.log("Error, no se encontraron transportistas trans turno");
				}else{
					let transportistas_now= []; 
					transportistas.forEach((transportista) => { //RECORRO TODOS LOS TRANS Q TIENEN SUS DICHOS TURNOS Y REVISO Y SOLO DEJO LOS Q COICIDAN CON EL ID DE LA ZONA TRAIDA
						if(transportista.transportista.zona == zona_id){
							transportistas_now.push(
								transportista.transportista //y hago el push.
							)
						}
					});
					res.status(200).json({transportistas:transportistas_now}); // le doy el valor del nuevo array de trans segun la zona y turno
					// console.log("Lista de transportistas: \n", transportistas_now);
					
				}
			}
		});
	}

	// if (zona_id) {
	// 	Transportista.find({}).populate({path:'user'}).where('zona').equals(zona_id).exec((err,transportistas)=>{
	// 	if (err) {
	// 		console.log("Error al listar transportistas",err);
	// 		res.status(500).send({message: "Error en la petición"});
	// 	}else{
	// 		if (!transportistas) {
	// 			res.status(404).send({message: "Error, no se encontraron transportistas"});
	// 			console.log("Error, no se encontraron transportistas");
	// 		}else{
	// 			res.status(200).json({transportistas});
	// 			console.log("Lista de transportistas: \n", transportistas);
	// 		}
	// 	}
	// });
	// }

}
//traer imagen de la van con el id del trans
function findImagenTrans(req,res){
	var idtrans = req.params.id;

	if(idtrans){
		Transportista.findOne({}).where('_id').equals(idtrans).exec((err,imagen)=>{
		if (err) {
			console.log("Error al buscar la imagen del trans",err);
			res.status(500).send({message: "Error en la petición"});
		}else{
			if (!imagen) {
				res.status(404).send({message: "Error, no se encontro imagen del trans"});
				console.log("Error, no se encontro imagen del trans");
			}else{
				res.status(200).json({imagen});
				// console.log("imagen del transportista: \n", imagen);
			}
		}
	});

	}

}

//traer imagen de la van
function getImageFile(req,res){
	var imageFile = req.params.imageFile;
	var path_file = "./uploads/vanes/"+imageFile;

	//verificar si el archivo (file) existe..
	fs.exists(path_file, (exists)=>{
		if (exists) {

			res.sendFile(path.resolve(path_file));//con esto envio la imagen q esta guardada en dicha ruta1
		}else{
			res.status(404).send({message:"La imagen no existe"});
		}

	});

}


module.exports = {
	saveSolicitud,
	listZonas,
	listTurnos,
	listTrans,
	findImagenTrans,
	getImageFile,
	listSolicitudes
};