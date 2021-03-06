const mongoose = require("mongoose")
const Schema = mongoose.Schema

// Define BlogPost schema
const BlogPost = new Schema({
	title: {
		type: String,
		required: true
	},
	create_date: {
		type: Date,
		required: true
	},
	modified_date: {
		type: Date,
		required: true
	},
	username: {
		type: String,
		required: true
	},
	content: {
		type: String,
		required: true
	},
	category: String
},
	{collection: 'blogposts'}
)

module.exports = mongoose.model("BlogPost", BlogPost)