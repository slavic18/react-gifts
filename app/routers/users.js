const jwt = require('jsonwebtoken');

module.exports = {
    beforeMiddleware: function(router) {

    },
    middleware: function(router) {
        router.use(function (req, res, next) {
            // check header or url parameters or post parameters for token
            var token = req.body.token || req.query.token || req.headers['x-access-token'];
            if (token) {
                // verifies secret and checks exp
                jwt.verify(token, appConfig.secretToken, function (err, decoded) {
                    if (err) {
                        return res.json({success: false, message: 'Failed to authenticate token.'});
                    } else {
                        if (!decoded._doc) {
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

    }
}



