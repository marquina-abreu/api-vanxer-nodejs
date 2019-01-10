'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SolicitudSchema= Schema({
	name: { type: String, required: true},
	surname : { type: String, required: true},
	phone: { type: String, required: true},
	email: { type: String, required: true},
	commentary:{ type: String },
	zona: { type: Schema.ObjectId, ref: 'Zona'},
	turno: { type: Schema.ObjectId, ref: 'Turno'},
	transportista: { type: Schema.ObjectId, ref: 'Transportista'}
});

module.exports = mongoose.model('Solicitud',SolicitudSchema);