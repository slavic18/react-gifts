const mongoose = require('mongoose');
const idvalidator = require('mongoose-id-validator');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

let UsersSchema = new Schema({
  email: {
    type: String,
    tolowercase: true,
    unique: true,
    validate: {
      validator: function(v) {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(v);
      }
    },
    required: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String
  },
  role: {
    type: [String],
    default: 'registered'
  }
});

UsersSchema.pre('save', function(next) {
  let user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  bcrypt.hash(user.password, SALT_WORK_FACTOR, function(err, hash) {
    if (err) return next(err);
    user.password = hash;
    next();
  });
});

UsersSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

// Remove version from result.
UsersSchema.set('toJSON', {
  transform: function(doc, ret, options) {
      delete ret.__v;
      return ret;
  }
});

module.exports = UsersSchema;
