'use strict'

var express = require('express');
//cargar router de express
var api = express.Router();

//Middlewares
var md_auth = require('../middlewares/authenticated');
//var md_admin = require('../middlewares/is_admin');

var multipart = require('connect-multiparty');
//var md_upload = multipart({ uploadDir: './uploads/users'}); //aqui se guardaran los archivos

//cargar controladores
var ClienteController = require('../controllers/cliente');

api.get('/prueba-cli', ClienteController.pruebaCli);

//api.get('/pruebas-del-controlador',md_auth.ensureAuth, UserController.pruebas);




module.exports= api;