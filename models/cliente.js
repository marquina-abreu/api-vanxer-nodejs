'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ClienteSchema= Schema({
	name_cli: {type: String, required:true},
	surname_cli: { type: String, required:true},
	email: { type: String, required:true },
	location: { type: String},
	phone: { type:String, required:true},
	date_created: {type: Date, default: Date.now, required:true},
	zona: { type: Schema.ObjectId, ref: 'Zona'},
	user: { type: Schema.ObjectId, ref: 'User'}, // aqui estoy relacionando este atributo con el modelo User
	transportista: { type: Schema.ObjectId, ref: 'Transportista'} // aqui estoy relacionando este atributo con el modelo User

});

module.exports = mongoose.model('Cliente',ClienteSchema);

