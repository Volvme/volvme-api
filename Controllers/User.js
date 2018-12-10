const mongoose = require('mongoose');
const User = require('../Models/User');
const UserProfile = require('../Models/UserProfile');

exports.signup = function(req, res, next) {

	const new_user = new User({
		_id: mongoose.Types.ObjectId(),
		name: req.body.name,
		email: req.body.email,
		//phone: req.body.phone,
		//location: req.body.location
	})
	.setPassword()
	.save(function(err, new_user){
    	if (err) return next(err);
    	const new_profile = new UserProfile({
    		_id: new_user._id,
    		name: new_user.name,
    		email: new_user.email
    	})
    	let token = new_user.generateJWT();
    	return res.status(200).json(new_user.toAuthJSON());
    })
};

exports.login = function(req, res) {

	User.findOne({email: req.body.email}, function(err, user) {
			if (err) return res.status(500).json(err);
			if (!user) return res.status(500).json("message": "User Not Found");
			if (!user.validPassword(req.body.password)) return res.status(401).json("message": "Invalid Password");
			let token = user.generateJWT();
			return res.status(200).send(user.toAuthJSON());
		})
};