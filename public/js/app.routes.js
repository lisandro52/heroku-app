angular.module('app.routes', ['ngRoute'])

.config(function($routeProvider, $locationProvider) {
	
	$routeProvider
		//home page route
		.when('/', {
			templateUrl: 'views/templates/mainHome.html'
		})
		
		//login page
		.when('/login', {
			templateUrl: 'app/views/pages/login.html',
			controller: 'mainController',
			controllerAs: 'login'
		})
		
		//show all users
		.when('/config', {
			templateUrl: 'views/templates/configAll.html',
			controller: 'configController',
			controllerAs: 'config'
		})
		
		//form to create a new user
		//same view as edit page
		.when('/users/create', {
			templateUrl: 'app/views/pages/users/single.html',
			controller: 'userCreateController',
			controllerAs: 'user'
		})
		
		//page to edit a user
		.when('/users/:user_id', {
			templateUrl: 'app/views/pages/users/single.html',
			controller: 'userEditController',
			controllerAs: 'user'
		});
		
	$locationProvider.html5Mode(true);
});