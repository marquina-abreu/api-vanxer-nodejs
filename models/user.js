'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema= Schema({
	user: { type:String, required:true},
	password: { type:String, required:true},
	image: {type: String },
	createdAt : { type:Date, default: Date.now, required:true},
	role: { type:String }
});

module.exports = mongoose.model('User',UserSchema);