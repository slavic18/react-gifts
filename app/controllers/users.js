const config = require('../configs/config');
const _h = require('mongoose-api-helper');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const UsersSchema = require('../models/users');
const UsersModel = mongoose.model('User', UsersSchema);

let UsersController = {
  // create new user.
  _updatedFields : function (body) {
    const availableFields = ['email', 'password', 'name'];
    let result = {};
    for (item in body) {
      if (body.hasOwnProperty(item)) {
        if (availableFields.indexOf(item) != -1) {
          result[item] = body[item];
        }
      }
    }
    return result;
  },
  register : function (req, res) {
    let newUser = new UsersModel();
    newUser = _h.fill(req, newUser);

    newUser.save(function(err) {
      if (err) res.send(err);
      res.json({success: true, message: 'User created!', user: newUser });
    });
  },
  // get list of all users.
  get : function (req, res) {
    UsersModel.find().sort({_id: 'descending'}).find(function(err, users) {
      users = (!users) ? [] : users;
      if (err) res.send(err);
      res.json(users);
    });
  },
  // edit user.
  edit : function (req, res) {
    let user_id = req.decoded._id;
    let updatedFields = this._updatedFields(req.body);
    UsersModel.findByIdAndUpdate( user_id , { $set: updatedFields }, function(err, user) {
      if (err) res.send(err);
      if (!user) {
        res.json({success: false, message: 'Incorect User token' });
      } else {
        res.json({success: true, message: 'Your profile has been updated!', user: user });
      }
    });
  },
  // user login.
  login : function (req, res) {
    let email = req.body.email;
    if (!email) {
      res.json({success: false, message: 'Email is not specified' });
      return;
    }
    let password = req.body.password;
    if (!password) {
      res.json({success: false, message: 'Password is not specified' });
      return;
    }

    UsersModel.findOne({ email: email }, function(err, user) {
      if (err) throw err;
      if (user === null) {
        res.json({success: false, message: 'User does not exist' });
        return;
      }

      user.comparePassword(password, function(err, isMatch) {
          if (err) throw err;
          if (isMatch) {
            let userObject = user.toObject();
            userObject = {
              _id : userObject._id,
              role : userObject.role
            };
            // if user is found and password is right create a token
            let token = jwt.sign(userObject, config.secretToken, {
              expiresIn: '1 day' // expires in 24 hours
            });
            res.json({
              success: true,
              message: 'Successfull login',
              user: user,
              token : token
            });
          } else {
            res.json({success: false, message: 'Password incorrect' });
          }
      });

    });
  }
  // todo : update method with token validation.
  // https://scotch.io/tutorials/authenticate-a-node-js-api-with-json-web-tokens
}

module.exports = UsersController;
