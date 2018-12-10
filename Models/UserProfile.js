'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserProfile = new Schema({

	_id: {
        type: Schema.Types.ObjectId, 
        ref: "User"
    },
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
    favoriteGenre: String,
    favoriteLocalVenue: String,
    favoriteLocalBands: [String],
    cityOfResidence: String,
    willTravel: Boolean,
});

module.exports = mongoose.model("UserProfile", UserProfile);