/**
 * Created by davey on 11/17/15.
 */
describe('Factory LoginWebService', function() {
	var LoginWebService, $httpBackend, $rootScope, $window, $http, baseUrl, mockData,
	    headerCallback, returnedData, httpMock, $q, $timeout;

	beforeEach(function() {
		module('theme.pages-controllers');
		inject(function ($injector) {
			$rootScope = $injector.get('$rootScope');
			$window = $injector.get('$window');
			$httpBackend = $injector.get('$httpBackend');
			$http = $injector.get('$http');
			LoginWebService = $injector.get('LoginWebService');
			$q = $injector.get('$q');
			$timeout = $injector.get('$timeout');
		});

		$window.sessionStorage.token = 'abc123';
		$rootScope.url               = 'https://api2.convirza.js';
		$rootScope.port              = '443';
		baseUrl                      = $rootScope.url +":"+ $rootScope.port;
		mockData                     = {'mock data': true};
		headerCallback               = function(headers) {
			return (headers["content-type"] ===  'application/json');
			//return (headers.Authorization === 'bearer ' + $window.sessionStorage.token);
		};

		httpMock = function(method, theUrl, json) {
			$httpBackend.when(method, theUrl, (json || {}), headerCallback).respond(mockData);
		};
	});

	describe('LoginWebService methods', function() {
		//it ('its methods exist', function() {
		//	['getToken', 'recover', 'reset', 'resetCheck', 'logout'].forEach(function(methodName){
		//		expect(LoginWebService[methodName]).not.toBeUndefined();
		//	});
		//});

		/*it ('getConfig', function() {
			expect(LoginWebService.getConfig()).toEqual(getConfig());
		});
		*/

		it ('getToken', function() {
			var cred = {
				"grant_type":"password",
				"client_id": "system",
				"client_secret": "f558ba166258089b2ef322c340554c",
				"username":"lmcsuper@logmycalls.com",
				"password":"JeffIsDaMan"
			};
			httpMock('POST', baseUrl + '/oauth/token', cred);

			LoginWebService.getToken(cred)
				.then(function(data) {
					returnedData = data;
				});
			$httpBackend.flush();
			expect(returnedData.data).toEqual(mockData);
		});

		it ('recover', function() {
			var email = {
				"username":"lmcsuper@logmycalls.com"
			};
			httpMock('POST', baseUrl + '/login/recover', email);

			LoginWebService.recover(email)
				.then(function(data) {
					returnedData = data;
				});
			$httpBackend.flush();
			expect(returnedData.data).toEqual(mockData);
		});

		it ('reset', function() {
			var conf = {
				"username":"dwalbeck@convirza.com",
				"token":"1e52eb69556ddd4e19502993b28c0f414cb82c0d337daa68ea263c7384ee6b532cd5ed6d2e0d56496d2514e2650df875b9baa5b7dcc09d019f01b2908c972c07",
				"password":"123456"
			};
			httpMock('POST', baseUrl + '/login/reset', conf);

			LoginWebService.reset(conf)
				.then(function(data) {
					returnedData = data;
				});
			$httpBackend.flush();
			expect(returnedData.data).toEqual(mockData);
		});

		//it ('logout', function() {
		//	var conf = {
		//		"access_token":"432868e8f3aa4ec1d6a5e27b32abfc4e6e44d3d20b5e6ebef8776c6759463720a3e7152a86a01ccd64de69a2e38267f52381b8fa45498fbcc8e6e76f71133349"
		//	};
		//	httpMock('POST', baseUrl + '/login/logout', conf);
        //
		//	LoginWebService.logout(conf)
		//		.then(function(data) {
		//			returnedData = data;
		//		});
		//	$httpBackend.flush();
		//	expect(returnedData.data).toEqual(mockData);
		//});

	});
});
