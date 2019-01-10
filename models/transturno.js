'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TransturnoSchema= Schema({
	turno: { type: Schema.ObjectId, ref: 'Turno'},
	transportista: { type: Schema.ObjectId, ref: 'Transportista'},
});

module.exports = mongoose.model('Transturno',TransturnoSchema);