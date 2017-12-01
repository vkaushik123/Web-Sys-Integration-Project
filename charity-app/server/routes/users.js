var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var User = mongoose.model('User');
var auth = require('./auth');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/users', function(req,res,next){
    if(!req.body.user.email){
        return res.status(422).json({errors:{email:"cannot be Null"}});
    }

    if(!req.body.user.password){
        return res.status(422).json({errors:{password:"cannot be Null"}});
    }
    User.findOne({email:req.body.user.email}).then(function(user){
    	if(user){
    	return res.status(422).json({errors:{email:"User already exists"}});
        }
        else{
            var user = new User();
            user.username = req.body.user.username;
            user.ngoname = req.body.user.ngoname;
            user.email = req.body.user.email;
            user.org = req.body.user.org;
            user.objective = req.body.user.objective;
            user.initiatives = req.body.user.initiatives;
            user.address = req.body.user.address;
            user.setPassword(req.body.user.password);
            user.description = req.body.user.description;
            user.save().then(function(){
                return res.json({user: user.toJSON()});
            }).catch(next);
		}
    });
});

router.get('/user', function(req, res) {
    User.find({org:true}, function(err, users) {
        var userMap = [];
        users.forEach(function(user) {
        	userMap.push({ngoObj:user});
        });
        res.contentType('application/json');
        res.send(JSON.stringify(userMap));
    });
});

router.post('/users/login', function(req,res,next){
	if(!req.body.user.email){
		return res.status(422).json({errors:{email:"cannot be Null"}});
	}

	if(!req.body.user.password){
		return res.status(422).json({errors:{password:"cannot be Null"}});
	}

	passport.authenticate('local',{session:false},function(err,user,info){
		if(err){return next(err);}

		if(user){
			user.token = user.generateJWT();
			return res.json({user: user.toJSON()});
		}
		else {
			return res.status(422).json(info);
		}
	})(req,res,next);
});



module.exports = router;
