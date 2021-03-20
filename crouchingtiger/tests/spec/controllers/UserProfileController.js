describe('users-builder module', function(){
	var UserWebService, pinesNotifications,scope,rootScope,ctrl,window,$httpBackend,baseUrl,mockData,headerCallback;

	beforeEach( function(){
		module('users-builder');
		module('theme.services');
		module('ngRoute');
		module('xeditable');
		module("api-param");
		module("config");
		module("admin-session");
		module("org-unit");
		inject(function($injector){
			rootScope          = $injector.get('$rootScope');
			UserWebService     = $injector.get('UserWebService');
			pinesNotifications = $injector.get('pinesNotifications');
			scope              = $injector.get('$rootScope').$new();
			window                      = $injector.get('$window');
            $httpBackend                      = $injector.get('$httpBackend');
            window.sessionStorage.token = 'abc123';
            rootScope.url               = 'http://localhost';
            rootScope.port              = '8000';
            rootScope.currentOUId       = 8;
            baseUrl                     = rootScope.url +":"+ rootScope.port;
            mockData                    = 'mock data';
            headerCallback              = function(headers){
                return (headers['x-access-token'] === window.sessionStorage.token);
            };
			ctrl               = $injector.get('$controller')('UserProfileController', {$scope: scope});
		});
	});

	describe('UserProfileController', function(){
		it('should load module successfully', function(){
			expect(UserWebService).toBeDefined();
			expect(pinesNotifications).not.toBeUndefined();
		})
	});

	describe("$scope.updateUser", function () {
        it("shouild be a function", function () {
            expect(typeof scope.updateUser === "function").toBe(true);
        });
        
        it("should call updateUser function successfully", function () {
        	spyOn(scope,'updateUser');
        	scope.updateUser();
        	expect(scope.updateUser).toHaveBeenCalled();
        });

        it("should change full name on update", function () {
        	rootScope.fullname = "";
        	scope.userForm = {$valid: true};
        	scope.user = {
				ct_user_id : 1,
                first_name : "test",
                last_name : "test",
                username : "test@test.com",
                primary_phone : "",
                user_ext_id : "",
                timezone : {value:'arizona'}
			};

			var saveData = {
				"user": {
                    "ct_user_id"   : scope.user.ct_user_id,
                    "first_name"   : scope.user.first_name,
                    "last_name"    : scope.user.last_name,
                    "username"     : scope.user.username,
                    "primary_phone": scope.user.primary_phone,
                    "user_ext_id"  : scope.user.user_ext_id === "" ? "n/a" : scope.user.user_ext_id,
                    "timezone"     : scope.user.timezone.value
				}
			};
            apiUrl         = baseUrl + "/v1/user";
        	$httpBackend.when('PUT', apiUrl, saveData).respond(rootScope.fullname = scope.user.first_name+' '+scope.user.last_name);
        	scope.updateUser();           
        	expect(rootScope.fullname).toEqual('test test');
        });
    });
})