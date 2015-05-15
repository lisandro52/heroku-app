var express = require('express');
var getter  = require('./app/routes/products-getter');
var async = require('async');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var Config = require('./app/models/config');

var path = require('path');


var app = express();

// APP CONFIGURATION
//use body parser so we can grab information from POST requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//configura our app to handle CORS requests
app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
	next();
});

//Connect to local mongo database
mongoose.connect('mongodb://localhost/midori');

//log all requests to the console
app.use(morgan('dev'));

//set static files location
// used for requests that our frontend will make
app.use(express.static(__dirname + '/public'));

var configRoutes = require('./app/routes/config-routes')(app, express);
app.use('/config', configRoutes);

// Main catch-all route
// Send users to frontend
// has to be registered after API ROUTES
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/views/index.html'));
});


app.listen(3000);
console.log('Connect to port 3000');