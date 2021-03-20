describe('campaigns-builder module', function(){
	var CampaignWebService, pinesNotifications, scope, rootScope, ctrl;
	beforeEach( function(){
		module('campaigns-builder');
		module('theme.services');
		module('ngRoute');
		module('ui.bootstrap');
		inject(function($injector){
			rootScope          = $injector.get('$rootScope');
			CampaignWebService = $injector.get('CampaignWebService');
			pinesNotifications = $injector.get('pinesNotifications');
			scope              = $injector.get('$rootScope').$new();
			ctrl               = $injector.get('$controller')('BlacklistController', {$scope: scope});
			scope.search	   = {
                number: ""
            }
		})
	});

	describe('BlacklistController', function() {
		it('should load module successfully', function() {
			expect(CampaignWebService).toBeDefined();
			expect(pinesNotifications).not.toBeUndefined();
		})
	});

	describe("$scope.saveBlacklist", function () {
        it("saveBlacklist should be a function", function () {
            expect(typeof scope.saveBlacklist === "function").toBe(true);
        });

        it("validateBlaclistNumbers should be a function", function () {
            expect(typeof scope.validateBlaclistNumbers === "function").toBe(true);
        });

        it("it should call saveBlacklist function", function () {
        	spyOn(scope,'saveBlacklist');
        	scope.search.number = "1234567890, 4545454454";
        	scope.saveBlacklist();
        	expect(scope.saveBlacklist).toHaveBeenCalled();
        });

        it("it should validate Blaclist Numbers", function () {
        	scope.search.number = "1234567890, 4545454454";
        	expect(scope.validateBlaclistNumbers()).toBe(false);
        });

        it("it should validate Blaclist Numbers", function () {
        	scope.search.number = "abc4567890";
        	expect(scope.validateBlaclistNumbers()).toBe(true);
        });
    });
})
