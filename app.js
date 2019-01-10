'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app= express();

//configurar cabecera y cors

app.use((req,res,next)=>{
	res.setHeader('Access-Control-Allow-Origin', '*')
	res.setHeader('Access-Control-Allow-Headers','Origin, X-Request-With,Content-Type, Accept')
	res.setHeader('Access-Control-Allow-Methods','POST, GET, PATCH, DELETE, OPTIONS, PUT')

	next()

});

//cargar rutas (aqui cargare el archivo donde estan todas mis rutas)
var user_routes = require('./routes/user');
var cliente_routes = require('./routes/cliente');
var solicitud_routes = require('./routes/solicitud');



//middlewares de body-parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());



//ruta base (la ruta por defecto, si la quiero en blanco '/' o usar un prefijo)
app.use('/api/auth',user_routes);
app.use('/api/cliente',cliente_routes);
app.use('/api/solicitud',solicitud_routes);

module.exports = app;