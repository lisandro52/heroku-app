angular.module('mainCtrl', [])

.controller('mainController', function($rootScope, $location) {
	
	var vm = this;
	
	
	//do this on every request
	$rootScope.$on('$routeChangeStart', function() {
		//nothing for now
	});
	
	//function to handle login form
	vm.doLogin = function() {
		
	};
	
	vm.doLogout = function() {
		
	};
	
});