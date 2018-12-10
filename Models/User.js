'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validateUnique = require('mongoose-unique-validator');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const secret = require('../config/secret').secret;

const User = new Schema({

	_id: Schema.Types.ObjectId,
	name: {
		type: String,
		index: true,
		required: [true, "Don't be shy! We need to know your name to sign you up :)"],
		description: "Preferably your real name, but whatever name you go by will work for us :)",
		example: "John Doe or 5oz. Woozy"
	},
	email: {
		type: String,
		index: true,
		required: [true, "An email is required for signup"],
		lowercase: true,
		unique: true,
		uniqueCaseInsensitive: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
        description: "A valid email address",
        example: "username@mail.com or user.name@email.org"
    },
	phone: {
	    type: String,
	    //required: [true, "A phone number required for signup!"],
	    unique: true,
	    match: /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/,
	    description: "7-Digit Phone Number",
	    example: "123-456-7890 or (123)-456-7890"
    },
    location: {
    	type: String,
    	//required: [true, "Location Required for Signup!"],
    	match: /^\d{5}$/,
    	description: "5-Digit zipcode",
    	example: "78704"
    },
    image: {
    	type: String,
    	description: "The image source for a users profile image"
    },
    bio: {
    	type: String,
    	description: "User Biographical Information"
    },
    projects: [{
    	type: Schema.Types.ObjectId,
    	ref: 'Project'
    }],
    groups: [{
    	type: Schema.Types.ObjectId,
    	ref: 'Group'
    }],
    friends: [{
    	type: Schema.Types.ObjectId,
    	ref: 'User'
    }],
    auth: {
    	hash: {
			type: String, 
			required: true,
			description: "The hash(password) stored for privacy"
		},
		salt: {
			type: String,
			required: true,
			description: "The salt used to hash the password"
		}
    }
}, {timestamps: true}).plugin(validateUnique, {message: 'This {PATH} is already associated with a Volvme User!'});

User.methods.setPassword = function(password){
	this.salt = crypto.randomBytes(16).toString('hex');
	this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

User.methods.validPassword = function(password) {
	let hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
	return this.hash === hash;
};

User.methods.generateJWT = function() {

	let today = new Date();
	let exp = new Date(today);
	exp.setDate(today.getDate() + 60);

	return jwt.sign({
		id: this._id,
		name: this.name,
		email: this.email,
		exp: parseInt(exp.getTime() / 1000),
	}, secret );
};

User.methods.toAuthJSON = function() {

	return {
		name: this.name,
		email: this.email,
		token: this.generateJWT(),
		phone: this.phone,
		location: this.location,
		bio: this.bio,
		image: this.image
	}
};

User.methods.profile = function() {
	this.remove('auth');
};

module.exports = mongoose.model('User', User);