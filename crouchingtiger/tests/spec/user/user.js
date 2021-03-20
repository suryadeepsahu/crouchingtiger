describe('users-builder module', function(){
	var UserWebService, pinesNotifications,scope;
	var userTableController,rootScope, UserWebService,pinesNotifications,scope,ctrl,bootbox,rowform;

	beforeEach( function(){
		module('xeditable');
		module('users-builder');
		module('theme.services');
		module('ngRoute');
		module('ui.bootstrap');
		module("api-param");
		inject(function($injector){
			rootScope          = $injector.get('$rootScope');
			UserWebService     = $injector.get('UserWebService');
			pinesNotifications = $injector.get('pinesNotifications');
			bootbox            = $injector.get('$bootbox');
			pinesNotifications = $injector.get('pinesNotifications');
			scope              = $injector.get('$rootScope').$new();
			ctrl               = $injector.get('$controller')('UsersTableController', {$scope: scope});
		});
		rowform = {$cancel : function(){}};
	});

	describe('UsersTableController', function(){
		it('should load module successfully', function(){
			expect(UserWebService).toBeDefined();
			expect(pinesNotifications).not.toBeUndefined();
		})
	});

	describe("$scope.cancelAdd", function () {
        it("is a function", function () {
            expect(typeof scope.cancelAdd === "function").toBe(true);
        });
        
        it("$scope.realUsers is defined", function () {
        	expect(scope.realUsers).not.toBeUndefined();
        });

        it("cancel update user", function () {
        	spyOn(scope,'cancelAdd');
        	scope.cancelAdd(1, 24, rowform);
        	expect(scope.cancelAdd).toHaveBeenCalled();
        });
         
        it("cancel create user ", function () {
        	spyOn(scope,'cancelAdd');
        	scope.cancelAdd(1, null, rowform);
        	expect(scope.cancelAdd).toHaveBeenCalled();
        });
    });
})
