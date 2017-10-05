var passport = require('passport');
var localstrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');

passport.use(new localstrategy({
	usernameField: 'user[email]',
	passwordField: 'user[password]'
}, function(email,password,done){
	User.findOne({email:email}).then(function(user){
	if(!user || !user.validatePassword(password)){
	 return done(null, false, {errors:{'email or password' : 'is Invalid'}});
	}
	return done(null,user);
	}).catch(done);
}));