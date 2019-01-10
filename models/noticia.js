'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NoticiaSchema= Schema({
	title: { type: String, required:true},
	description :{ type: String, required:true },
	content: { type: String, required:true },
	date_created: {type: Date, default: Date.now, required:true}
	transportista: { type: Schema.ObjectId, ref: 'Transportista'}
});

module.exports = mongoose.model('Noticia',NoticiaSchema);