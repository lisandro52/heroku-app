var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/myTestDB');

var db = mongoose.connection;

db.on('error', function(err) {
	console.log('connection error ', err);
});

db.on('open', function() {
	console.log('connected');
});


var Schema = mongoose.Schema;

var userSchema = new Schema({
	
	name: String,
	age: Number,
	DOB: Date,
	isAlive: Boolean
});

var User = mongoose.model('User', userSchema);

var arvind = new User({
	name: 'Arvind',
	age: 99,
	DOB: '01/01/1915',
	isAlive: true
});

arvind.save(function(err, data) {
	if(err) console.log(err);
	else console.log('Saved: ', data);
});