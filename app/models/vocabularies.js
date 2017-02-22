const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VocabulariesSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	description: {
		type: String
	},
	order: {
		type: Number,
		min: 1,
		default: 1
	},
});

module.exports = VocabulariesSchema;
