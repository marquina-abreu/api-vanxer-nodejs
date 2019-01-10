'use strict'

var jwt= require('jwt-simple');
var moment= require('moment');
//clave secreta para generar el token
var c_secret= "webmasterstation";

//middleware

exports.ensureAuth = function (req,res,next) {
	if (!req.headers.authorization) {//si en la cabecera no hay un header llamado authorizacion ..
		return res.status(403).send({message: 'La petición no tiene la cabecera Autorizacion'});

	}

	var token = req.headers.authorization.replace(/['"]+/g,'');

	try{
		//Intento decodificar el token q esta logeado
		var payload = jwt.decode(token, c_secret);

		//chequeo si ese token esta expirado..

		if (payload.exp <= moment().unix()) {
			return res.status(401).send({message: "El token ha expirado"});

		}
	}catch(ex){
		return res.status(404).send({message: "El token no es Valido"});

	}

	//crear un req, llamado user, con el valor de payload, para saber la info de el, en cualquier controlador q use este middleware
	req.user= payload;

	next();	
}