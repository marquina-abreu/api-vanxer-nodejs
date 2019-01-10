'use strict'


var jwt= require('jwt-simple');
var moment= require('moment');
//clave secreta para generar el token
var c_secret= "webmasterstation";

exports.createToken = function(user){
	var payload= {
		sub: user._id,
		email: user.email,
		role: user.role,
		image: user.image,
		iat: moment().unix(), //fecha de expedición del token
		exp: moment().add(1,'days').unix //fecha de expiracion del token
	};

	return jwt.encode(payload, c_secret);
}