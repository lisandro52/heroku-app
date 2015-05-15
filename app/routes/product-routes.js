var productRepo = require('../models/product');

module.export = function (app, express) {
	
	var apiRouter = express.Router();
	
	//on routes that end in /product
	apiRouter.route('/')
	
	.post(function(req, res) {
		
		productRepo.createProduct(
			req.body.partNumber,
			req.body.link,
			req.body.name,
			req.body.mainType,
			req.body.compatibilityTags, function(err) {
				if(err) res.send(err);
				productRepo.getAllProducts(function(err, prods) {
					if(err) res.send(err);
					res.json(prods);
				});
			});
	})
	
	.get(function(req, res) {
		productRepo.getAllProducts(function(err, prods) {
			if(err) res.send(err);
			res.json(prods);
		});
	});
	
	apiRouter.route('/search/:search_param')
	.get(function(req, res) {
		
	});
};