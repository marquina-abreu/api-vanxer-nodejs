'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TransportistaSchema= Schema({
	name_tra: { type: String ,required:true },
	surname_tra: { type: String, required:true },
	email: { type: String, required:true },
	phone: { type: String, required:true },
	modelo_car: { type: String, required:true },
	image_car: { type: String, required:true },
	capacity: { type: Number, required:true },
	date_created: { type: Date,default: Date.now, required:true },
	user: { type: Schema.ObjectId, ref: 'User'}, // aqui estoy relacionando este atributo con el modelo User
	zona: { type: Schema.ObjectId, ref: 'Zona'}
});

module.exports = mongoose.model('Transportista',TransportistaSchema);