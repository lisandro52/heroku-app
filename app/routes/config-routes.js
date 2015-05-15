var configRepo = require('../models/config');

module.exports = function (app, express) {

    //get an instance of the express router
    var apiRouter = express.Router();

    //on routes that end in /config
    apiRouter.route('/')

        .post(function (req, res) {
			
			configRepo.createConfig(req.body.parameterName, function(err) {
				if(err) res.send(err);
				configRepo.getAllConfigs(function(err, configs) {
					if (err) res.send(err);
					res.json(configs);
				});
			});
           
        })
        
        .get(function (req, res) {
            configRepo.getAllConfigs(function(err, configs) {
				if (err) res.send(err);
				res.json(configs);
		});
	});

    
    //on routes that end in /config/:config_id
    apiRouter.route('/:config_id')

        .put(function (req, res) {			
			configRepo.updateConfig(req.params.config_id, req.body.valueList, function(err) {
				if(err) res.send(err);
			});
			
    	})

        .delete(function (req, res) {
			configRepo.removeConfig(req.params.config_id, function(err) {
				if (err) res.send(err);
				configRepo.getAllConfigs(function(err, configs) {
					if (err) res.send(err);
					res.json(configs);
				});
			});
    });
	
	//testing GET route for search
	//GET: /search/qwerty
	apiRouter.route('/search/:search_param')
	.get(function(req,res) {
		console.log(req.params.search_param);
		configRepo.getAllConfigsLike(req.params.search_param, function(err, configs) {
			if (err) res.send(err);
			res.json(configs);
		});	
	});
    
    return apiRouter;

};