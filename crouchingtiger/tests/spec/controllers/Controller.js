//describe('Unit: Factories LoginController', function() {
//
//	var ctrl, scope, global,timeout, element, compiled, $remember, compile, OrgUnitLocal, window, myWebService,loggerService,location, values, $httpBackend, $http, baseUrl, mockData, headerCallback,$rootScope;
//	beforeEach( module('themesApp') );
//
//	// Inject required dependancies for the controller
//	beforeEach(function(){
//		module('theme.pages-controllers');
//		inject(function($injector){
//			scope        = $injector.get('$rootScope');
//			$rootScope   = $injector.get('$rootScope');
//			ctrl         = $injector.get('$controller')('LoginController', {$scope: scope});
//			global       = $injector.get('$global');
//			compile      = $injector.get('$compile');
//			window       = $injector.get('$window');
//			myWebService = $injector.get('myWebService');
//			remember     = $injector.get('$remember');
//			timeout      = $injector.get('$timeout');
//			location     = $injector.get('$location');
//			$httpBackend = $injector.get('$httpBackend');
//			$http        = $injector.get('$http');
//			loggerService = $injector.get('loggerService');
//			OrgUnitLocal  = $injector.get('OrgUnitLocal');
//		});
//
//	});
//
//	// check after each test for outstanding http request
//	afterEach(function() {
//		$httpBackend.verifyNoOutstandingExpectation();
//		$httpBackend.verifyNoOutstandingRequest();
//	});
//
//	// Test case to check to see controller to be defined in the model.
//	describe('LoginController', function(){
//		it('should have a LoginController controller', function() {
//			expect(ctrl).not.toBeUndefined();
//		});
//	});
//
//	describe('check myWebService works', function(){
//		it('getToken methods exist check', function(){
//			['getToken'].forEach(function(methodName){
//				expect(myWebService[methodName]).not.toBeUndefined();
//			});
//		});
//	});
//
//	describe('check remember works', function(){
//		it('remember exist check', function(){
//			expect(remember).not.toBeUndefined();
//		});
//	});
//
//	describe('scope methods', function(){
//		// initalization for http mock request.
//		beforeEach(function(){
//			window.sessionStorage.token = 'abc123';
//			$rootScope.url               = 'http://dev.restapi01.logmycalls.com';
//			$rootScope.port              = '8000';
//			baseUrl                      = $rootScope.url +":"+ $rootScope.port;
//			headerCallback              = function(headers){
//				return (headers['x-access-token'] === window.sessionStorage.token);
//			};
//			window.sessionStorage.currentOUName = 'abc123';
//		});
//
//		it('scope logIn method exist', function(){
//			expect($rootScope['logIn']).not.toBeUndefined();
//		});
//
//		it('fullscreen method works', function(){
//			global.set('fullscreen', true);
//			expect(global.get('fullscreen')).toBe(true);
//		});
//
//		it('fullscreen method works', function(){
//			global.set('fullscreen', false);
//			expect(global.get('fullscreen')).toBe(false);
//		});
//
//		it('fullscreen method works', function(){
//			expect(scope.remember).toBe(false);
//		});
//
//		it('check remember values', function(){
//			expect(scope.remember).toBe(false);
//		});
//
//		it("should check for undefined values", function() {
//			expect(scope.remember).not.toBeUndefined();
//		});
//
//		it('should set fullscreen to false after destroy funcion called', function() {
//			scope.$destroy();
//			expect(global.get('fullscreen')).toBe(false);
//		});
//
//		// check login for error data.
//		/*it('should get remember provided credentials', function() {
//			var returnedData, apiUrl, newCamp;
//			scope.remember = false;
//			scope.name     = '';
//			scope.password = '';
//			mockData       = '{"status":"error","token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE0MjQ2OTAyNDEzMTUsInVzZXJpZCI6MSwib3VpZCI6MX0.KhXCT2cZ17AWRDkK1fGP3ypgg8qC1iOAc_uDo_EbDmI","expires":1424690241315,"user":{}}';
//			apiUrl         = baseUrl + "/v1/login";
//			newCamp        = {username:'' ,password:''};
//
//			// http get mock request for login.
//			$httpBackend.when('POST', apiUrl, newCamp).respond(mockData);
//			scope.logIn();
//			// flush pending http request.
//			$httpBackend.flush();
//			mockData = JSON.parse(mockData);
//			expect(mockData.status).toEqual('error');
//			expect(scope.error).toEqual('Invalid email or password');
//		});
//
//		// check login for success data.
//		it('should get remember provided credentials', function() {
//			expect(global.get('fullscreen')).toBe(true);
//			scope.remember = true;
//			scope.name     = 'abc123';
//			scope.password = 'abc123';
//			var name       = 'abc123';
//			var password   ='abc123';
//
//			var returnedData, apiUrl, newCamp;
//			mockData = '{"status":"success","token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE0MjQ2OTAyNDEzMTUsInVzZXJpZCI6MSwib3VpZCI6MX0.KhXCT2cZ17AWRDkK1fGP3ypgg8qC1iOAc_uDo_EbDmI","expires":1424690241315,"user":{}}';
//			apiUrl   = baseUrl + "/v1/login";
//			newCamp  = {username:'abc123' ,password:'abc123'};
//
//			$httpBackend.when('POST', apiUrl, newCamp).respond(mockData);
//			scope.logIn();
//
//			$httpBackend.flush();
//			mockData = JSON.parse(mockData);
//			expect(remember('name')).toEqual('abc123');
//			expect(remember('password')).toEqual('abc123');
//			expect(scope.isLoggedIn).toBeTruthy();
//		});*/
//
//		// check for remeber with object type data.
//		it('should get remember cache expire and path', function() {
//			scope.remember = true;
//			scope.testObject     = {'value':{'test':'test'},'expires':1,'path':'/temp','secure':'secure','name':'abc123'};
//			remember('testObject',scope.testObject);
//			expect(remember('testObject')).toBeNull();
//		});
//
//		it('should get check if values is not an object', function() {
//			scope.remember = true;
//			scope.testObject     = {'value':'test','session':'asdads'};
//			remember('testObject',scope.testObject);
//			expect(remember('testObject')).toEqual('test');
//		});
//	});
//
//	// test case for myWebService function.
//	describe('myWebService', function(){
//		beforeEach(function(){
//			window.sessionStorage.token = 'abc123';
//			$rootScope.url               = 'http://dev.restapi01.logmycalls.com';
//			$rootScope.port              = '8000';
//			baseUrl                      = $rootScope.url +":"+ $rootScope.port;
//			mockData                    = 'mock data';
//			headerCallback              = function(headers){
//				return (headers['x-access-token'] === window.sessionStorage.token);
//			};
//		});
//
//		// Test case for  login request.
//		describe('getToken', function(){
//			it('api responds with data', function(){
//				var returnedData, apiUrl, newCamp;
//				apiUrl       = baseUrl + "/v1/login";
//				newCamp      = {username:'abc123' ,password:'abc123'};
//				var name     = 'abc123';
//				var password ='abc123';
//
//				$httpBackend.when('POST', apiUrl, newCamp).respond(mockData);
//
//				myWebService.getToken(name,password)
//				.then(function(data){
//					returnedData = data;
//				});
//				$httpBackend.flush();
//				expect(returnedData.data).toEqual(mockData);
//			});
//		});
//
//	});
//
//}); // end of Unit: LoginController
//
//describe('Unit: Factories SignupPageController', function() {
//	var ctrl, scope, global, element, compiled, $remember, compile, window;
//	beforeEach( module('themesApp') );
//
//	beforeEach(function(){
//		module('theme.pages-controllers');
//		inject(function($injector){
//			scope        = $injector.get('$rootScope').$new();
//			ctrl         = $injector.get('$controller')('SignupPageController', {$scope: scope});
//			global       = $injector.get('$global');
//			compile      = $injector.get('$compile');
//			window       = $injector.get('$window');
//		});
//	});
//
//	describe('SignupPageController', function(){
//		it('should have a SignupPageController controller', function() {
//			expect(ctrl).not.toBeUndefined();
//		});
//
//		it('destroy funcion check', function() {
//			scope.$destroy();
//			expect(global.get('fullscreen')).toBe(false);
//		});
//	});
//});
//
//
//describe('Unit: Factories RegistrationPageController', function() {
//	var ctrl, scope, global, element, compiled, $remember, compile, window,timeout;
//	beforeEach( module('themesApp') );
//
//	beforeEach(function(){
//		module('theme.pages-controllers');
//		inject(function($injector){
//			scope        = $injector.get('$rootScope').$new();
//			ctrl         = $injector.get('$controller')('RegistrationPageController', {$scope: scope});
//			global       = $injector.get('$global');
//			compile      = $injector.get('$compile');
//			window       = $injector.get('$window');
//			timeout      = $injector.get('$timeout');
//		});
//	});
//
//	describe('RegistrationPageController', function(){
//		// test data for directive
//		dirElement = angular.element('<ng-form name="reg_form"><input type="text" ng-minlength="3" ng-model="username" name="username">'+
//			'<p ng-show="checking"></p>'+
//			'<p ng-show="checked && username.length">username is available!</p>'+
//			'<buttn class="btn-link" ng-click="checkAvailability()">Check Availability</a></ng-form>');
//
//		it('should have a RegistrationPageController controller', function() {
//			expect(ctrl).not.toBeUndefined();
//		});
//
//		it('should be have checkAvailability', function() {
//			expect(scope['checkAvailability']).not.toBeUndefined();
//		});
//
//		it('should be have defined variables', function() {
//			expect(scope['checking']).toBeFalsy();
//			expect(scope['checked']).toBeFalsy();
//		});
//
//		it('Should return false for blank input value', function () {
//			compile(dirElement)(scope);
//			scope.$digest();
//			var dirElementInput = dirElement.find('input');
//			scope.$apply();
//			expect(scope.checkAvailability()).toBeFalsy();
//		});
//
//		it('Should return true for valid input value', function() {
//			compile(dirElement)(scope); // compile directory elements with scope.
//			scope.$digest();
//			var dirElementInput = dirElement.find('input');
//			dirElementInput.val('test').trigger('input');
//			scope.$apply(); // apply elements to the scope
//			scope.checkAvailability();
//			scope.$broadcast(timeout); // event dispatcher for timeout.
//            timeout.flush(); // flush timeout broadcast event
//			expect(scope.checking).toBeFalsy();
//		});
//	});
//});
//
//describe('Unit: Factories ChatRoomController', function() {
//	var ctrl, scope, global, element, compiled,compile, window, timeout,elementScope;
//	beforeEach( module('themesApp') );
//
//	beforeEach(function(){
//		module('theme.pages-controllers');
//		inject(function($injector){
//			scope        = $injector.get('$rootScope');
//			ctrl         = $injector.get('$controller')('ChatRoomController', {$scope: scope});
//			global       = $injector.get('$global');
//			compile      = $injector.get('$compile');
//			window       = $injector.get('$window');
//			timeout      = $injector.get('$timeout');
// 		});
//	});
//
//	describe('ChatRoomController', function(){
//		it('should have a ChatRoomController controller', function() {
//			expect(ctrl).not.toBeUndefined();
//		});
//
//		it('should be have sendMessage', function() {
//			expect(scope['sendMessage']).not.toBeUndefined();
//		});
//
//		it('should be have 0 messages', function() {
//			expect(scope.messages.length).toEqual(0);
//		});
//
//		it('should be have elizaTyping to be false', function() {
//			expect(scope.elizaTyping).toBeFalsy();
//		});
//
//		it('should be have default avatar johansson.png', function() {
//			expect(scope.elizaAvatar).toEqual('johansson.png');
//		});
//
//		it('should add message in messages', function() {
//			scope.sendMessage('Hello');
//			expect(scope.messages.length).toEqual(1);
//		});
//
//		it('should remove userText', function() {
//			scope.sendMessage('Hello');
//			expect(scope.userText).toEqual('');
//			scope.$broadcast(timeout);
//            timeout.flush();
//		});
//
//		it('should add values in im', function() {
//			scope.sendMessage('Hello');
//			expect(scope.userText).toEqual('');
//		});
//	});
//});
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
