var jwt = require('express-jwt');
var secret = require('../config').secret;

function getJWTToken(req){
	if(req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token'){
	return req.headers.authorization.split(' ')[1];
	}

  return null;
}

var auth = {
	required: jwt({
	  secret:secret,
	  userProperty: 'Load',
	  getToken: getJWTToken
	}),
	optional: jwt({
	  secret:secret,
	  userProperty: 'Load',
	  credentialRequired:false,
	  getToken:getJWTToken
	})
};

module.export = auth;