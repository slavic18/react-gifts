var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const languages = ['en', 'ru', 'ro'];
const defaultLanguage = 'en';

let TranslatedField = new Schema({
	lang: String,
  text: String
});

TranslatedField.pre('save', function(next) {
  let field = this;

  if (typeof field.lang == 'undefined' || !field.lang || languages.indexOf(field.lang) == -1) {
  	this.lang = defaultLanguage;
  }

  if (!field.text) {
  	let err = {
  		success: false,
  		error: 'Text is not provided'
  	};
  	return next(err);
  }
  next();
});

// Remove version from result.
TranslatedField.set('toJSON', {
  transform: function(doc, ret, options) {
      delete ret.__v;
      return ret;
  }
});

module.exports = TranslatedField;
