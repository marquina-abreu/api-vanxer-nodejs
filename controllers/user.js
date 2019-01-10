'use strict'
//modulos
var bcrypt = require('bcrypt-nodejs');
var fs = require('fs'); // libreria de node js , para trabajar con ficheros, la llamo para poder eliminar la imagenes cargadas
var path = require('path'); // esta variable la cree cuando hice lo de para traer la imagen guardada. Esto es para acceder a rutas de nuestro sistema de archivos

//servicio jwt

var jwt = require('../services/jwt');
var User = require('../models/user');

//acciones
function pruebas(req, res) {

	User.find({}).exec((err,users)=>{
		if (err) {
			console.log("Error al listar usuarios",err);
			res.status(500).send({message: "Error en la petición"});
		}else{
			if (!users) {
				res.status(404).send({message: "Error, no se encontraron usuarios"});
				console.log("Error, no se encontraron usuarios");
			}else{
				res.status(200).json({users});
				console.log("Lista de animales: \n", users);
			}
		}
	});
}

function login(req,res) {

	var params = req.body;

	var usuario = params.user;
	var password = params.password;

	User.findOne({user:usuario}, (err, user_buscado)=>{
			if (err) {
				res.status(500).send({message:'Error user ya registrado'});
			}else{
				if (user_buscado) {
					//chequear clave si coincide
					bcrypt.compare(password,user_buscado.password, (err, check)=>{
						//si coinciden, entonces q me de la info del usuario q se logea
						if (check) {
							//no enviar la password al front end
							user_buscado.password='';

							//comprobar si hay un parametro llamado 'gettoken' en true y asi generar el token del usuario
							if (params.gettoken) {
								//devolver token jwt
								res.status(200).send({token:jwt.createToken(user_buscado)})
							}else{
								//sino entonces traer el usuario sin token
								res.status(200).send({user:user_buscado});
							}

						}else{
							res.status(404).send({message:"Usuario o contraseña invalidos"});
						}

					});
				}else{
					res.status(404).send({message:"El usuario no esta registrado, no existe"});
				}
			}

		});
}


module.exports = {
	pruebas,login
};