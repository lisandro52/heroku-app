var gameronScraper = require('../scrapers/gameron-scraper');
//var Product = require('../models/product');
var categories = require('../models/category');
var async = require('async');


var ProductsGetter = function() {};

ProductsGetter.prototype.updateProducts = function(callback) {
	
	var asyncCalls = [];
	
	categories.forEach(function(item) {
		asyncCalls.push(function(callback) {
			gameronScraper.getScrapeFromUrl(
				item.link,
				item.category,
				callback
			);
		});
	});
	
	async.parallel(
		asyncCalls,
		function callback(err, results) {
			if(err) throw err;
			callback(err, results);
		}
	);	
};

ProductsGetter.prototype.getProductsFromSites = function(callbackServer) {
	
	var asyncCalls = [];
	
	categories.forEach(function(item) {
		asyncCalls.push(function(callback) {
			gameronScraper.getScrapeFromUrl(
				item.link,
				item.category,
				callback
			);
		});
	});
	
	async.parallel(
		asyncCalls,
		function callback(err, results) {
			if(err) throw err;
			console.log('Ready to return results');
			callbackServer(err, results);
		}
	);	
};

module.exports = new ProductsGetter();