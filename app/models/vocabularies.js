const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TranslatedField = require('./translations');

const VocabulariesSchema = new Schema({
	name: {
		type: [TranslatedField],
		required: true
	},
	description: {
		type: [TranslatedField]
	},
	order: {
		type: Number,
		min: 1,
		default: 1
	},
});

// Remove version from result.
VocabulariesSchema.set('toJSON', {
  transform: function(doc, ret, options) {
      delete ret.__v;
      return ret;
  }
});

module.exports = VocabulariesSchema;
