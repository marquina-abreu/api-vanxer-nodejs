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
var SolicitudController = require('../controllers/solicitud');

api.get('/lista-zonas', SolicitudController.listZonas);
api.get('/lista-turnos', SolicitudController.listTurnos);
api.get('/lista-trans/:idz/:idt', SolicitudController.listTrans);
api.get('/imagen-trans/:id', SolicitudController.findImagenTrans);
api.get('/get-image-van/:imageFile', SolicitudController.getImageFile);

//Listar solicitudes de clientes hechas a transportistas

api.get('/listar-solicitudes/:idt', SolicitudController.listSolicitudes);

api.post('/save',SolicitudController.saveSolicitud);






module.exports= api;