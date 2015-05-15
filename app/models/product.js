var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	Store = require('./store');

var productSchema = new Schema({
	
	partNumber: { type: String, index: true },
	link: String,
	name: String,
	mainType: { type: String, index: true},
	compatibilityTags: { type: [String], index: true},
	stores: [{
		id: { type: Schema.Types.ObjectId, ref: 'Store'},
		price: Number,
		stock: Number,
		lastUpdated: {type: Date, default: Date.now }
	}]
});

var db = mongoose.model('Product', productSchema);

var ProductsRepo = function () {};

ProductsRepo.prototype.getAllProducts = function(callback) {
	db.find()
	.sort({ name: 'asc' })
	.exec(function(err, prods) {
		callback(err, prods);
	});
};

ProductsRepo.prototype.createProduct = function(partNumber, link, name, maintType, compatibilityTags, callback) {
	var prod = new db();
	
	prod.partNumber = partNumber;
	prod.link = link;
	prod.name = name;
	prod.mainType = maintType;
	prod.compatibilityTags = compatibilityTags;
	prod.stores = [];
	
	prod.save(function(err) {
		callback(err);
	});
};

ProductsRepo.prototype.updateProduct = function(prod_id, partNumber, link, name, maintType, compatibilityTags, stores, callback) {
	db.findById(prod_id, function(err, prod) {
		if(err) callback(err);
		
		prod.partNumber = partNumber;
		prod.link = link;
		prod.name = name;
		prod.mainType = maintType;
		prod.compatibilityTags = compatibilityTags;
		prod.stores = stores;
		prod.markModified('compatibilityTags');
		prod.markModified('stores');
		prod.save(function(err) {
			callback(err);
		});
	});
};

ProductsRepo.prototype.removeProduct = function(prod_id, callback) {
	db.remove({ _id : prod_id }, function(err) {
		callback(err);
	});
};

module.exports = new ProductsRepo();

