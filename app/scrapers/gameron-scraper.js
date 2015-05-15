//var xray = require('x-ray');
//var async = require('async');
var genericScraper = require('./generic-scraper');

var Scrape = function () {};

Scrape.prototype.saveScrapeToFile = function (url, outputFile) {
		
	genericScraper.saveScrapeToFile(
		url,
		'.p-item',
		'.s_title_block a[title]',
		'.s_title_block a[href]',
		'.product_desc a[title] | lineBreakClean',
		'.price',
		outputFile
	);
};

//Function to scrape a Gameron URL asynchronously. Needs a callback function to return execution when it's done.
Scrape.prototype.getScrapeFromUrl = function (url, categoryName, callback) {
			
	genericScraper.getScrapeFromUrl(
		url,
		categoryName,
		'.p-item',
		'.s_title_block a[title]',
		'.s_title_block a[href]',
		'.product_desc a[title] | lineBreakClean',
		'.price',
		callback
	);
};

module.exports = new Scrape();