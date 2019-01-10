'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ZonaSchema= Schema({
	name: { type: String },
	direction: { type: String },
	parroquia : { type: String }
});

module.exports = mongoose.model('Zona',ZonaSchema);