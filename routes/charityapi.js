var express = require('express'),
	router = express.Router(),

	CharityModel = require('../models/charityinfo.js');


router.get('/',function(req, res){
	CharityModel.find({},'',function(err,charity){
		if (err) console.error('Error getting', err);
		res.json(charity);
	});
});

router.post('/',function(req, res){
	var charityInfo = {
		userId: req.user.sub,
		charity: req.body.charityName,
		email: req.body.email,
		address: req.body.address,
		state: req.body.state,
		zip: req.body.zip,
		dropoff: req.body.dropoff,
		cause: req.body.cause,
		needs: req.body.needs,
		limitations: req.body.limitations,
		instructions: req.body.instructions


	};

	var newCharity = new ChairtyModel(charityInfo);

	newCharity.save(function(err,success){
		res.json(success);
	});
});

router.put('/',function(req, res){
	var id = req.body.id;
	var updateInfo = {
		userId: req.user.sub,
		charity: req.body.charityName,
		email: req.body.email,
		address: req.body.address,
		city: req.body.city,
		state: req.body.state,
		zip: req.body.zip,
		dropoff: req.body.dropoff,
		cause: req.body.cause,
		needs: req.body.needs,
		limitations: req.body.limitations,
		instructions: req.body.instructions
	};
	CharityModel.findByIdAndUpdate(id, updateInfo, function(err,post){
		if (err) console.error(err);
		res.send('SUCCESS!');
	});


});

router.delete('/',function(req, res){
	var id = req.body.id;

	CharityModel.findByIdAndRemove(id,function(err,post){
		if (err) console.error(err);
		res.send('SUCCESS!');
	});


});


module.exports = router;
