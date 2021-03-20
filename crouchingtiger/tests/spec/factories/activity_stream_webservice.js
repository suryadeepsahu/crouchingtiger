/**
 * Created by bschermerhorn on 9/29/15.
 */
describe("Activity Stream Web Service", function () {
	var $rootScope, $window, $httpBackend, $http, ActivityStreamWebService, ApiParam;

	beforeEach( module("activitystream-builder") );

	beforeEach(inject(function($injector){
		$rootScope   = $injector.get('$rootScope');
		$rootScope.url = "http://test123";
		$rootScope.port = "8000";

		ApiParam     = $injector.get('ApiParam');
		$window      = $injector.get('$window');
		$httpBackend = $injector.get('$httpBackend');
		$http        = $injector.get('$http');
		ActivityStreamWebService    = $injector.get('ActivityStreamWebService');
	}));

	var baseUrl, mockData, headerCallback, getConfig, httpMock, returnedData;
	beforeEach(function(){
		$window.sessionStorage.token = 'abc123';
		baseUrl                      = $rootScope.url +":"+ $rootScope.port;
		mockData                     = {'mock data': true};
		headerCallback               = function(headers){
			return (headers.Authorization === 'bearer ' + $window.sessionStorage.token);
		};

		getConfig = function() {
			var config =  {
				headers: {
					'content-type':  'application/json',
					'Authorization': 'bearer ' + $window.sessionStorage.token
				}
			};
			return config;
		};

		httpMock = function(method, theUrl) {
			$httpBackend.when(method, theUrl, {}, headerCallback).respond(mockData);
		};
	});


	describe("stuff", function () {
		it("methods are functions", function () {
			["notify", "stream", "userList"].forEach(function (methodName) {
				expect(typeof ActivityStreamWebService[methodName]).toEqual("function");
			});
		});


		it(".stream() makes post to /v1/logactivity/stream with data", function () {
			httpMock('POST', baseUrl + "/v1/logactivity/stream");
			ActivityStreamWebService.stream().then(function (data) {
				returnedData = data;
			});
			$httpBackend.flush();
			expect(returnedData.data).toEqual(mockData);
		});

		it(".userList() makes post to /v1/orgunit/userList/ with an ouid", function () {
			httpMock('GET', baseUrl + "/v1/orgunit/userList/"+123);
			ActivityStreamWebService.userList(123).then(function (data) {
				returnedData = data;
			});
			$httpBackend.flush();
			expect(returnedData.data).toEqual(mockData);
		});

	});









});