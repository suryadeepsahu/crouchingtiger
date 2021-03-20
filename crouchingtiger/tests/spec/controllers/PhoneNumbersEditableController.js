describe('campaigns-builder module', function(){
	var UserWebService, CampaignWebService, scope, rootScope, ctrl, compile, formElement;
	beforeEach( function(){
		
		module('theme.form-directives');
		module('campaigns-builder');
        module('users-builder');
        module('xeditable');
        module("api-param");
        module('tag-builder');
        module('ui.bootstrap');
        module('theme.services');
        module('ngRoute');
        module('theme.ui-tables-basic');
        module('dni');
     
        inject(function($injector){
			rootScope                = $injector.get('$rootScope');
            CampaignWebService       = $injector.get('CampaignWebService');
            UserWebService           = $injector.get('UserWebService');            
            compile                  = $injector.get('$compile');
            scope                    = $injector.get('$rootScope').$new();  
		});
        formElement = angular.element('<a class="btn btn-inverse pull-left" ng-disabled ="!canModify || !addNewStep"  >Add Action</a>');
	});

	describe('PhoneNumbersEditableController', function() {
		it('should load module successfully', function() {
            expect(UserWebService).toBeDefined();
			expect(CampaignWebService).toBeDefined();
		});

        

        it('Should get disabled defined for canModify true and addNewStep false', function () {
            scope.canModify = true; 
            scope.addNewStep = false;            
            var element = compile(formElement)(scope);
            scope.$digest();
            button = formElement.attr('disabled');
            expect(button).toEqual('disabled');
        });

        it('Should get disabled defined for canModify false and addNewStep true', function () {
            scope.canModify = false; 
            scope.addNewStep = true;            
            var element = compile(formElement)(scope);
            scope.$digest();
            button = formElement.attr('disabled');
            expect(button).toEqual('disabled');
        });

        it('Should get disabled defined for canModify and addNewStep values false', function () {
            scope.canModify = false; 
            scope.addNewStep = false;            
            var element = compile(formElement)(scope);
            scope.$digest();
            button = formElement.attr('disabled');
            expect(button).toEqual('disabled');
        });

        it('Should get disabled defined for canModify and addNewStep values undefined', function () {
            scope.canModify = undefined; 
            scope.addNewStep = undefined;            
            var element = compile(formElement)(scope);
            scope.$digest();
            button = formElement.attr('disabled');
            expect(button).toEqual('disabled');
        });

        it('Should get disabled undefined for canModify and addNewStep values true', function () {
            scope.canModify = true; 
            scope.addNewStep = true;            
            var element = compile(formElement)(scope);
            scope.$digest();
            button = formElement.attr('disabled');            
            expect(button).toEqual(undefined);
        });

        it('Should get disabled defined for canModify and addNewStep values undefined', function () {           
            var element = compile(formElement)(scope);
            scope.$digest();
            button = formElement.attr('disabled');            
            expect(button).toEqual('disabled');
        });
	});
});
