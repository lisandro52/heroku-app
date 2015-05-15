var xray = require('x-ray');
var async = require('async');

var GenericScraper = function () {};

//Javascript object to help prepare the output information
var prepare = {
	lineBreakClean: function (str) {
		return str.replace(/(\r\n|\n|\r)/gm," ");
	}
};

GenericScraper.prototype.saveScrapeToFile = 

	function (url, rootClass, itemNameClass, linkClass, descriptionClass, priceClass, outputFile) {
		
		xray(url)
			.prepare(prepare)
			.select([{
				$root: rootClass,
				itemName: itemNameClass,
				link: linkClass,
				description: descriptionClass,
				price: priceClass
			}])
			.write(outputFile);
};

//Function to scrape an URL asynchronously. Needs a callback function to return execution when it's done.
GenericScraper.prototype.getScrapeFromUrl = 

	function (url, categoryName, rootClass, itemNameClass, linkClass, descriptionClass, priceClass, callback) {
		
		xray(url)
			.prepare(prepare)
			.select([{
				$root: rootClass,
				itemName: itemNameClass,
				link: linkClass,
				description: descriptionClass,
				price: priceClass
			}])
			.run(function(err, json) {
				if (err) callback(err, null);
				callback(null, {
					category: categoryName,
					parts: json
				});
			});
};

module.exports = new GenericScraper();