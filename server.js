const config = require('config');
const express = require('express');
const app = express();
const server = require('http').Server(app);
const bodyParser = require('body-parser');
const morgan = require('morgan');
const striptags = require('striptags');
const port = process.env.PORT || 9000;
const mongoose = require('mongoose');
const appRouter = require('./app/routers/main');
const multer  = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        crypto.pseudoRandomBytes(16, function (err, raw) {
            cb(null, raw.toString('hex') + Date.now() + '.' + mime.extension(file.mimetype));
        });
    }
});
var upload = multer({ dest: 'uploads/' });

const options = {
    server: {socketOptions: {keepAlive: 1, connectTimeoutMS: 30000}},
    replset: {socketOptions: {keepAlive: 1, connectTimeoutMS: 30000}}
};
mongoose.connect(config.DBHost, options); // connect to our database
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});





app.post('/fileUpload',upload.single('thumbnail'),  function(req, res, next) {
    console.log(req.file);

    // Uploaded files:
    // res.end(req.file);
    res.send('File uploaded!');
});



// configure body parser
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.json());




//don't show the log when it is test
if (config.util.getEnv('NODE_ENV') !== 'test') {
    app.use(morgan('dev'));
}

// REGISTER OUR ROUTES
let router = appRouter.init(express);
app.use('/api', router);

// START THE SERVER
server.listen(port);
console.log('Magic happens on port ' + port);

module.exports = app;
