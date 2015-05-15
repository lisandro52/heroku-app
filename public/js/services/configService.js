
angular.module('configService', [])

.factory('Config', function($http){
	
	var configFactory = {};
	
	//get a single user
	configFactory.get = function(id) {
		return $http.get('/api/users/' + id);
	};
	
	//get all tags
	configFactory.all = function() {
		return $http.get('/config');
	};
	
	//create a parameter
	configFactory.create = function(configData) {
		return $http.post('/config/', configData);
	};
	
	//update a parameter
	configFactory.update = function(id, configData) {
		return $http.put('/config/' + id, configData);
	};
	
	//delete a parameter
	configFactory.delete = function(id) {
		return $http.delete('/config/' + id);
	};
	
	return configFactory;
	
});