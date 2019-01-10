'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TurnoSchema= Schema({
	name_tur: { type:String, required:true},
	hora_ini: { type:String, required:true},
	hora_fin: { type: String, required:true}
});

module.exports = mongoose.model('Turno',TurnoSchema);