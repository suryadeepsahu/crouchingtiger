/**
 * Created by davey on 11/17/15.
 */
describe('Unit: OrgUnitLocal', function() {
	var OrgUnitWebService, $httpBackend, $rootScope, $window, $http, baseUrl, mockData,
	    headerCallback, getConfig, returnedData, httpMock, OrgUnitLocal, BreadcrumbWebService;

	beforeEach(function() {
		module('org-unit');
		inject(function($injector) {
			$rootScope           = $injector.get('$rootScope');
			$window              = $injector.get('$window');
			$httpBackend         = $injector.get('$httpBackend');
			$http                = $injector.get('$http');
			OrgUnitWebService    = $injector.get('OrgUnitWebService');
			OrgUnitLocal         = $injector.get('OrgUnitLocal');
			BreadcrumbWebService = $injector.get('BreadcrumbWebService');
		});

		$window.sessionStorage.token = 'abc123';
		$rootScope.url               = 'https://api2.convirza.js';
		$rootScope.port              = '443';
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

	describe('OrgUnitLocal methods', function() {

		it('methods exist', function () {
			['getBaseURL', 'getJsonConfig', 'getUserHighestOrgUnit', 'getSessDataFromBackend', 'getUserAccess',
				'getSessDataFromLocal', 'updateSessData', 'getSessData', 'getUserHighestOrgUnit']
				.forEach(function (methodName) {
					expect(OrgUnitLocal[methodName]).not.toBeUndefined();
				});
		});

		it('getSessDataFromBackend', function () {
			var mock = {
				'result':'success',
				'err'   :'',
				'json'  :{
					'access_token':'1234',
					'session'     :{
						'ou_id'        :'8',
						'ou_name'      :'Test',
						'tl_id'        :'8',
						'user_ou_level':'1',
						'user_id'      :'1',
						'first_name'   :'Test',
						'last_name'    :'Tester',
						'timezone'     :'America/New_York',
						'billing_id'   :'1',
						'role_id'      :'1',
						'style'        :{
							'support_url':'http://support.convirza.com',
							'chat_url'   :'http://mychat.com',
							'chat_active':true,
							//'white_label_css': {

							//}
						}
					},
					"scope"       :{
						"edigest"    :7,
						"campaign"   :"7:271:99999999",
						"user"       :"7:240:99999999",
						"report"     :7,
						"callrec"    :7,
						"callflow"   :7,
						"dni"        :7,
						"callaction" :"7:131:9999999",
						"webhook"    :6,
						"api"        :6,
						"googleua"   :6,
						"doubleclick":6,
						"marin"      :6,
						"orgunit"    :7,
						"advrouting" :7,
						"number"     :"7:169:3000",
						"ca"         :7,
						"menu"       :7,
						"tag"        :7,
						"billing"    :7
					}
				}
			};
			$httpBackend.when('GET', baseUrl + '/v1/session', {}, headerCallback).respond(mock);
			OrgUnitLocal.getSessDataFromBackend();
			$httpBackend.flush();

			expect($rootScope.currentOUId).toEqual(mock.json.session.ou_id);
			expect($rootScope.currentOUName).toEqual(mock.json.session.ou_name);
			expect($rootScope.currentOULevel).toEqual(0);
			expect($rootScope.topLevelOUId).toEqual(mock.json.session.tl_id);
			expect($rootScope.userOULevel).toEqual(mock.json.session.user_ou_level);
			expect($rootScope.highestOUId).toEqual(mock.json.session.ou_id);
			expect($rootScope.highestOUName).toEqual(mock.json.session.ou_name);
			expect($rootScope.userId).toEqual(mock.json.session.user_id);
			expect($rootScope.fullName).toEqual(mock.json.session.first_name + ' ' + mock.json.session.last_name);
			expect($rootScope.timezone).toEqual(mock.json.session.timezone);
			expect($rootScope.billingId).toEqual(mock.json.session.billing_id);
		});

		it('getSessDataFromLocal', function () {
			OrgUnitLocal.getSessDataFromLocal();

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
			//expect($rootScope.billingId).toEqual($window.sessionStorage.billing_id);
		});
	});
});
