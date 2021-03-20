/**
 * Created by bschermerhorn on 10/7/15.
 */

describe("Webhook Web Service", function () {
	var $rootScope, $window, $httpBackend, $http, WebhookService, ApiParam;

	beforeEach(module("webhook"));

	beforeEach(inject(function($injector){
		$rootScope   = $injector.get('$rootScope');
		$rootScope.url = "http://test123";
		$rootScope.port = "8000";

		WebhookService = $injector.get('WebhookService');
		$window      = $injector.get('$window');
		$httpBackend = $injector.get('$httpBackend');
		$http        = $injector.get('$http');
	}));

	var baseUrl, mockResponse, headerCallback, httpMock, returnedData;
	beforeEach(function(){
		$window.sessionStorage.token = 'abc123';
		baseUrl                      = $rootScope.url +":"+ $rootScope.port;
		mockResponse                     = {'mockResponse': true};
		headerCallback               = function(headers){
			return (headers.Authorization === 'bearer ' + $window.sessionStorage.token);
		};

		httpMock = function(method, theUrl, jsonArg) {
			$httpBackend.when(method, theUrl, (jsonArg || {}), headerCallback).respond(mockResponse);
		};
	});


	describe("Webhook Web Service functions", function () {
		it("methods are present", function () {
			["list", "addHook", "upHook", "getWebhook", "addMap", "updateMap", "dropMap", "dropMap", "dropWebhook", "testWebHook"].forEach(function (methodName) {
				expect(typeof WebhookService[methodName]).toEqual("function");
			});
		});

		it(".list() makes get to /v1/webhook/list/ with an ouid -> " + baseUrl, function () {
			httpMock('GET', baseUrl + "/v1/webhook/list/" + 1);
			WebhookService.list(1).then(function (data) { returnedData = data; });
			$httpBackend.flush();
			expect(returnedData.data).toEqual(mockResponse);
		});


		it(".addHook makes POST request to /v1/webhook with hook data", function () {
		    httpMock("POST", baseUrl+"/v1/webhook", {a:1});
			WebhookService.addHook({a:1}).then(function (data) { returnedData = data; });
			$httpBackend.flush();
			expect(returnedData.data).toEqual(mockResponse);
		});


		it(".upHook makes PUT request to /v1/webhook with hook data", function () {
		    httpMock("PUT", baseUrl+"/v1/webhook", {a:1});
			WebhookService.upHook({a:1}).then(function (data) { returnedData = data; });
			$httpBackend.flush();
			expect(returnedData.data).toEqual(mockResponse);
		});


		it(".getWebhook makes GET request to /v1/webhook with webhook id", function () {
		    httpMock("GET", baseUrl+"/v1/webhook/" + 1);
			WebhookService.getWebhook(1).then(function (data) { returnedData = data; });
			$httpBackend.flush();
			expect(returnedData.data).toEqual(mockResponse);
		});


		it(".addMap makes POST request to /v1/webhook/map with map json", function () {
		    httpMock("POST", baseUrl+"/v1/webhook/map", {a:1});
			WebhookService.addMap({a:1}).then(function (data) { returnedData = data; });
			$httpBackend.flush();
			expect(returnedData.data).toEqual(mockResponse);
		});


		it(".updateMap makes PUT request to /v1/webhook/map with map json", function () {
		    httpMock("PUT", baseUrl+"/v1/webhook/map", {a:1});
			WebhookService.updateMap({a:1}).then(function (data) { returnedData = data; });
			$httpBackend.flush();
			expect(returnedData.data).toEqual(mockResponse);
		});


		it(".updateMap makes PUT request to /v1/webhook/map with map json", function () {
		    httpMock("PUT", baseUrl+"/v1/webhook/map", {a:1});
			WebhookService.updateMap({a:1}).then(function (data) { returnedData = data; });
			$httpBackend.flush();
			expect(returnedData.data).toEqual(mockResponse);
		});


		it(".dropMap makes PUT request to /v1/webhook/map with map id", function () {
		    httpMock("DELETE", baseUrl+"/v1/webhook/map/" + 1);
			WebhookService.dropMap(1).then(function (data) {
				returnedData = data;
			});
			$httpBackend.flush();
			expect(returnedData.data).toEqual(mockResponse);
		});


		it(".dropWebhook makes DELETE request to /v1/webhook/map with map id", function () {
		    httpMock("DELETE", baseUrl+"/v1/webhook/" + 1);
			WebhookService.dropWebhook(1).then(function (data) { returnedData = data; });
			$httpBackend.flush();
			expect(returnedData.data).toEqual(mockResponse);
		});


		it(".testWebHook makes POST request to /v1/webhook/map with map id", function () {
		    httpMock("POST", baseUrl+"/v1/webhook/test", {a:1});
			WebhookService.testWebHook({a:1}).then(function (data) { returnedData = data; });
			$httpBackend.flush();
			expect(returnedData.data).toEqual(mockResponse);
		});
	});
});
