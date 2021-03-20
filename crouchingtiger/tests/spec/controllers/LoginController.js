describe('Unit: LoginController', function() {
	var $scope, $global, $http, $location, LoginWebService, $cookies, $remember, $window, OrgUnitLocal, ENV, ctrl, $httpBackend;

	// Inject required dependancies for the controller
	beforeEach(function() {
		module('theme.pages-controllers', 'org-unit', 'config');
		inject(function($injector) {
			$scope          = $injector.get('$rootScope').$new();
			//$global         = $injector.get('$global');
			$http           = $injector.get('$http');
			$location       = $injector.get('$location');
			LoginWebService = $injector.get('LoginWebService');
			$cookies        = $injector.get('$cookies');
			$remember       = $injector.get('$remember');
			$window         = $injector.get('$window');
			OrgUnitLocal    = $injector.get('OrgUnitLocal');
			ENV             = $injector.get('ENV');
			$rootScope      = $injector.get('$rootScope');

			//ctrl            = $injector.get('$controller')('LoginController', {$scope: scope});
			$httpBackend    = $injector.get('$httpBackend');
		});
	});

	describe('logIn', function() {
		//$scope.email = 'lmcsuper@logmycalls.com';
		//$scope.password = 'JeffIsDaMan';
		//$scope.forever = true;

		//$scope.logIn();
		/*
		expect($rootScope.currentOUId).toEqual($window.sessionStorage.currentOUId);
		expect($rootScope.currentOUName).toEqual($window.sessionStorage.currentOUName);
		expect($rootScope.currentOULevel).toEqual($window.sessionStorage.currentOULevel);
		expect($rootScope.topLevelOUId).toEqual($window.sessionStorage.topLevelOUId);
		expect($rootScope.highestOUName).toEqual($window.sessionStorage.highestOUName);
		expect($rootScope.highestOUId).toEqual($window.sessionStorage.highestOUId);
		expect($rootScope.userOULevel).toEqual($window.sessionStorage.userOULevel);
		expect($rootScope.fullName).toEqual($window.sessionStorage.fullName);
		expect($rootScope.userAccess).toEqual(JSON.parse($window.sessionStorage.userAccess));
		expect($rootScope.userId).toEqual($window.sessionStorage.userId);
		expect($rootScope.timezone).toEqual($window.sessionStorage.timezone);
		expect($rootScope.billingId).toEqual($window.sessionStorage.billing_id);
		*/
	});

});