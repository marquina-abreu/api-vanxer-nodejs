'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CodigoSchema= Schema({
	codigo: { type: String, required:true},
	date_created : { type: Date, default: Date.now, required:true},
	transportista: { type: Schema.ObjectId, ref: 'Transportista'},
	solicitud: { type: Schema.ObjectId, ref: 'Solicitud'}
});

module.exports = mongoose.model('Codigo',CodigoSchema);