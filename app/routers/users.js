const jwt = require('jsonwebtoken');
const config = require('../configs/config');
const UsersSchema = require('../models/users');
const UsersController = require('../controllers/users');

module.exports = {
    beforeMiddleware: function(router) {
        router.route('/user/register')
            .post(function(req, res) {
                UsersController.register(req, res);
            })

        router.route('/user/login')
            .post(function(req, res) {
                UsersController.login(req, res);
            })
    },
    middleware: function(router) {
        router.use(function (req, res, next) {
            // check header or url parameters or post parameters for token
            var token = req.body.token || req.query.token || req.headers['x-access-token'];
            if (token) {
                // verifies secret and checks exp
                jwt.verify(token, config.secretToken, function (err, decoded) {
                    if (err) {
                        return res.json({success: false, message: 'Failed to authenticate token.'});
                    } else {
                        if (!decoded) {
                            return res.status(403).send({
                                success: false,
                                message: 'Token is not valid'
                            });
                        }
                        req.decoded = decoded;
                        next();
                    }
                });
            } else {
                return res.status(403).send({
                    success: false,
                    message: 'No token provided.'
                });
            }
        });
    },
    afterMiddleware: function(router) {
        router.route('/users')
            .get(function(req, res) {
                UsersController.get(req, res);
            });

        router.route('/user')
            .put(function(req, res) {
                UsersController.edit(req, res);
            });
    }
}



