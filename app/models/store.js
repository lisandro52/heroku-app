var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
	
var storeSchema = new Schema({	
	name: String,
	associatedTags: [String]	
});

//var Store = mongoose.model('Store', storeSchema);

module.exports = mongoose.model('Store', storeSchema);