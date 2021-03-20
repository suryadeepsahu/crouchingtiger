/**
 * Created by bschermerhorn on 9/29/15.
 */
describe('Unit: org unit factories', function() {
	var CampaignWebService, $httpBackend, $rootScope, $window, $http, baseUrl, mockData,
		headerCallback, getConfig, returnedData, httpMock;


	beforeEach( module('campaigns-builder') );

	beforeEach(inject(function($injector){
		$rootScope           = $injector.get('$rootScope');
		$window              = $injector.get('$window');

		$window.sessionStorage.token = 'abc123';
		$rootScope.url  = 'http://test123';
		$rootScope.port = '8000';

		$httpBackend = $injector.get('$httpBackend');
		$http = $injector.get('$http');
		CampaignWebService = $injector.get('CampaignWebService');


		baseUrl = $rootScope.url +":"+ $rootScope.port;
		mockData = {'mock data': true};
		headerCallback = function(headers){
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

		httpMock = function(method, theUrl, jsonBody) {
			$httpBackend.when(method, theUrl, (jsonBody || {}), headerCallback).respond(mockData);
		};
	}));

	beforeEach(function(){

	});

	describe('CampaignWebService methods', function(){

		it('its methods exist', function() {
			["getCampaigns", "getCampaign", "createCampaign", "createNumberPool",
				"updateNumberPool", "updateCampaign", "setCampaignStatus",
				"getPhoneNumbers", "getPhoneNumber", "createCallFlow",
				"saveCallFlow", "getGeoCity", "getGeoZip", "getGeoArea",
				"getCompUsers", "getCampOwners", "getChannels", "getprovRouteCallFlow",
				"getVoicePrompts", "getWhispers", "getTags", "getWebhooks", "createTag",
				"uploadVoicePrompt"
			].forEach(function(methodName){
				expect(typeof CampaignWebService[methodName]).toEqual("function");
			});
		});


		it('getCampaigns passing useraccess', function() {
			$rootScope.currentOUId = 123;
			$rootScope.timezone = "MST";
			httpMock('GET', baseUrl + "/v1/campaign/ouid/" + 123 + "/userAccess/" + 7 + "/" + encodeURIComponent("MST"));

			CampaignWebService.getCampaigns(7).then(function(data) {
				returnedData = data;
			});
			$httpBackend.flush();
			expect(returnedData.data).toEqual(mockData);
		});


		it('getCampaign passing id', function() {
			$rootScope.timezone = "MST";
			httpMock('GET', baseUrl + "/v1/campaign/" + 1 + "/" + encodeURIComponent("MST"));

			CampaignWebService.getCampaign(1).then(function(data) {
				returnedData = data;
			});
			$httpBackend.flush();
			expect(returnedData.data).toEqual(mockData);
		});


		it('CampaignWebService.createCampaign', function() {
			httpMock("POST", baseUrl + "/v1/campaign", {a:"abc"});
			CampaignWebService.createCampaign({a:"abc"}).then(function(data) {
				returnedData = data;
			});
			$httpBackend.flush();
			expect(returnedData.data).toEqual(mockData);
		});


		it('CampaignWebService.createNumberPool', function() {
			httpMock("POST", baseUrl + "/v1/numberpool", {a: "abc"});
			// EVEN THOUGH IT NEEDS INPUT, THE HTTPMOCK WONT WORK IF YOU PASS A VALUE INTO A GET
			CampaignWebService.createNumberPool({a: "abc"}).then(function(data) {
				returnedData = data;
			});
			$httpBackend.flush();
			expect(returnedData.data).toEqual(mockData);
		});


		it('CampaignWebService.updateNumberPool', function() {
			httpMock('PUT', baseUrl + "/v1/numberpool/" + 1, {a: "abc"});
			CampaignWebService.updateNumberPool({a: "abc"}, 1).then(function(data) {
				returnedData = data;
			});

			$httpBackend.flush();
			expect(returnedData.data).toEqual(mockData);
		});


		it('CampaignWebService.updateCampaign', function() {
			httpMock('PUT', baseUrl + "/v1/campaign/", {a: "abc"});
			CampaignWebService.updateCampaign({a: "abc"}).then(function(data) {
				returnedData = data;
			});

			$httpBackend.flush();
			expect(returnedData.data).toEqual(mockData);
		});


		it('CampaignWebService.setCampaignStatus', function() {
			httpMock('PUT', baseUrl + "/v1/campaign/status", {a: "abc"});
			CampaignWebService.setCampaignStatus({a: "abc"}).then(function(data) {
				returnedData = data;
			});

			$httpBackend.flush();
			expect(returnedData.data).toEqual(mockData);
		});


		it('CampaignWebService.getPhoneNumbers', function() {
			httpMock('GET', baseUrl + "/v1/phonenumber/city/slc/state/ut/npa/1");
			CampaignWebService.getPhoneNumbers("slc", "ut", 1).then(function(data) {
				returnedData = data;
			});

			$httpBackend.flush();
			expect(returnedData.data).toEqual(mockData);
		});


		it('CampaignWebService.getPhoneNumber', function() {
			httpMock('GET', baseUrl + "/v1/phonenumber/number/5551231234");
			CampaignWebService.getPhoneNumber("5551231234").then(function(data) {
				returnedData = data;
			});

			$httpBackend.flush();
			expect(returnedData.data).toEqual(mockData);
		});


		it('CampaignWebService.createCallFlow', function() {
			httpMock('POST', baseUrl + "/v1/provisionedroute", {a: "abc"});
			CampaignWebService.createCallFlow({a: "abc"}).then(function(data) {
				returnedData = data;
			});

			$httpBackend.flush();
			expect(returnedData.data).toEqual(mockData);
		});


		it('CampaignWebService.saveCallFlow', function() {
			httpMock('PUT', baseUrl + "/v1/provisionedroute", {a: "abc"});
			CampaignWebService.saveCallFlow({a: "abc"}).then(function(data) {
				returnedData = data;
			});

			$httpBackend.flush();
			expect(returnedData.data).toEqual(mockData);
		});


		it('CampaignWebService.getGeoZip', function() {
			httpMock('GET', baseUrl + "/v1/phonenumber/zip/" + 90120);
			CampaignWebService.getGeoZip(90120).then(function(data) {
				returnedData = data;
			});

			$httpBackend.flush();
			expect(returnedData.data).toEqual(mockData);
		});


		it('CampaignWebService.getGeoArea', function() {
			httpMock('GET', baseUrl + "/v1/phonenumber/npa/" + "blah");
			CampaignWebService.getGeoArea("blah").then(function(data) {
				returnedData = data;
			});

			$httpBackend.flush();
			expect(returnedData.data).toEqual(mockData);
		});


		it('CampaignWebService.getCompUsers', function() {
			httpMock('GET', baseUrl + "/v1/user/campaignUser/" + 1);
			CampaignWebService.getCompUsers(1).then(function(data) {
				returnedData = data;
			});

			$httpBackend.flush();
			expect(returnedData.data).toEqual(mockData);
		});


		it('CampaignWebService.getCampOwners', function() {
			httpMock('GET', baseUrl + "/v1/user/campaignOwner/" + $rootScope.currentOUId + "/" + 1);
			CampaignWebService.getCampOwners(null, 1).then(function(data) {
				returnedData = data;
			});

			$httpBackend.flush();
			expect(returnedData.data).toEqual(mockData);
		});


		it('CampaignWebService.getChannels', function() {
			httpMock('GET', baseUrl + "/v1/channel");
			CampaignWebService.getChannels().then(function(data) {
				returnedData = data;
			});

			$httpBackend.flush();
			expect(returnedData.data).toEqual(mockData);
		});


		it('CampaignWebService.getprovRouteCallFlow', function() {
			httpMock('GET', baseUrl + "/v1/callflow/provisionedroute/" + 1);
			CampaignWebService.getprovRouteCallFlow(1).then(function(data) {
				returnedData = data;
			});

			$httpBackend.flush();
			expect(returnedData.data).toEqual(mockData);
		});


		it('CampaignWebService.getVoicePrompts', function() {
			httpMock('GET', baseUrl + "/v1/callflowrecording/" + $rootScope.currentOUId + "/prompt");
			CampaignWebService.getVoicePrompts(null).then(function(data) {
				returnedData = data;
			});

			$httpBackend.flush();
			expect(returnedData.data).toEqual(mockData);
		});


		it('CampaignWebService.getWhispers', function() {
			httpMock('GET', baseUrl + "/v1/callflowrecording/" + 1 + "/whisper");
			CampaignWebService.getWhispers(1).then(function(data) {
				returnedData = data;
			});

			$httpBackend.flush();
			expect(returnedData.data).toEqual(mockData);
		});


		it('CampaignWebService.getTags', function() {
			httpMock('GET', baseUrl + "/v1/tag/" + $rootScope.currentOUId);
			CampaignWebService.getTags(1).then(function(data) {
				returnedData = data;
			});

			$httpBackend.flush();
			expect(returnedData.data).toEqual(mockData);
		});


		it('CampaignWebService.getWebhooks', function() {
			httpMock('GET', baseUrl + "/v1/webhook/list/" + $rootScope.currentOUId);
			CampaignWebService.getWebhooks(1).then(function(data) {
				returnedData = data;
			});

			$httpBackend.flush();
			expect(returnedData.data).toEqual(mockData);
		});


	});

});






























