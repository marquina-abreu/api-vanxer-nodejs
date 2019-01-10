'use strict'

var mongoose= require('mongoose');
var app= require("./app");
var  port =  process.env.PORT || 5100;

//conectar base de datos

mongoose.connect('mongodb://localhost:27017/vanxerapp', { useNewUrlParser: true })
	.then(() => {
			console.log("CONEXION EXITOSA");

			app.listen(port, ()=>{
				console.log("EL SERVIDOR DE VANXER ESTA ONFIRE!");
			})
		})
	.catch((err) =>{ 
		console.log("ERROR AL CONECTAR LA BASE DE DATOS",err);
		}
	);