var express = require('express'),
    app = express(),
    server = require('http').Server(app),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    appConfig = require('./app/configs/config'), //we load the db location from the JSON files
    striptags = require('striptags'),
    port = process.env.PORT || 9000,
    mongoose = require('mongoose');

mongoose.connect(appConfig.DBHost, options); // connect to our database
// configure app
app.use(morgan('dev')); // log requests to the console
// configure body parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//don't show the log when it is test
if (config.util.getEnv('NODE_ENV') !== 'test') {
    //use morgan to log at command line
    app.use(morgan('combined')); //'combined' outputs the Apache style LOGs
}
// controllers
var CategoriesController = require('./app/controllers/categories');
var GiftsController = require('./app/controllers/gifts');

// ROUTES FOR OUR API

// create our router
var router = express.Router();

// Categories
router.route('/categories/create')
    .post(function (req, res) {
        CategoriesController.create(req, res);
    });

router.route('/categories/get')
    .post(function (req, res) {
        CategoriesController.get(req, res);
    });



// Categories
router.route('/gifts/create')
    .post(function (req, res) {
        GiftsController.create(req, res);
    });

router.route('/gifts/get')
    .post(function (req, res) {
        GiftsController.get(req, res);
    });


// token dependent routes
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

                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });
    } else {
        // if there is no token return an error
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }
});

// REGISTER OUR ROUTES -------------------------------
app.use('/api', router);

// START THE SERVER
// =============================================================================
server.listen(port);
console.log('Magic happens on port ' + port);

module.exports = app; // for testing
