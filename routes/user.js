'use strict'

var express = require('express');
//cargar router de express
var api = express.Router();

//Middlewares
var md_auth = require('../middlewares/authenticated');
//var md_admin = require('../middlewares/is_admin');

var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './uploads/users'}); //aqui se guardaran los archivos

//cargar controladores
var UserController = require('../controllers/user');

api.get('/pruebas', UserController.pruebas);

api.post('/login', UserController.login);

//api.get('/pruebas-del-controlador',md_auth.ensureAuth, UserController.pruebas);


// api.post('/upload-image-user/:id', [md_auth.ensureAuth, md_upload], UserController.uploadImage);

// api.get('/get-image-file/:imageFile', UserController.getImageFile);


module.exports= api;