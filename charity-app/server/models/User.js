var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var secret = require('../config').secret;

var UserSchema = new mongoose.Schema({
	username: String,
	email:String,
	description: String,
	objective: String,
	address: String,
	initiatives:[String],
	org:Boolean,
	hash:String,
	salt:String
},{timestamps: true});

UserSchema.methods.setPassword = function(password){
	this.salt = crypto.randomBytes(16).toString('hex');
	this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 512, 'sha512').toString('hex');
};

UserSchema.methods.validatePassword = function(password){
	var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 512,'sha512').toString('hex');
	return this.hash === hash;
};

UserSchema.methods.generateJWT = function(){
    var tdate = new Date();
    var exp = new Date(tdate);
    exp.setDate(tdate.getDate() + 90);
    return jwt.sign({
    	id: this._id,
    	username:this.username,
    	exp:parseInt(exp.getTime()/1000),
    }, secret)
};

UserSchema.methods.toJSON = function(){
	return {
		username: this.username,
		email:this.email,
		org:this.org,
		description:this.description,
		objective:this.objective,
		address:this.address,
		initiatives:this.initiatives,
		token:this.generateJWT(),
	};
};

UserSchema.methods.toProfile = function(){
	return{
		username:this.username,
		email:this.email,
		org:this.org,
		description:this.description,
		objective:this.objective,
		address:this.address,
        initiatives:this.initiatives,
	};
};
mongoose.model('User',UserSchema);