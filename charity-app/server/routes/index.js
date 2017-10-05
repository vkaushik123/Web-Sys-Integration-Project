var express = require('express');
var router = express.Router();

router.use('/', require('./users'));
/* GET home page. */
router.get('/', function(req, res, next) {
	console.log('index.js');
  res.render('index', { title: 'Express' });
});

router.use(function(err,req,res,next){
	if(err.name === 'ValidationError'){
		return res.status(422).json({
			errors: Object.keys(err.errors).reduce(function(errors,key){
				errors[key] = err.errors[key].message;

				return errors;
			}, {})
		});
	}
	return next(err);
})

module.exports = router;
