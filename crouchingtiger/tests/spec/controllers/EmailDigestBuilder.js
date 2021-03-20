describe('Unit: controller EmailDigestBuilderController', function() {

	var ctrl, scope, global, compile,model,modalOptions,$modal, $modalInstance ,window,location, $httpBackend, $http,$rootScope;

	beforeEach( module('themesApp') );
	// Inject required dependancies for the controller
	beforeEach(function(){
		module('email-digest-builder');
		inject(function($injector){
			scope          = $injector.get('$rootScope').$new();
			$rootScope     = $injector.get('$rootScope');
			modal          = $injector.get('$modal');
			modalInstance = { 	// Create a mock object using spies
		        close: jasmine.createSpy('modalInstance.close'),
		        dismiss: jasmine.createSpy('modalInstance.dismiss'),
		        result: {
		          then: jasmine.createSpy('modalInstance.result.then')
		        }
		      };

			ctrl           = $injector.get('$controller')('EmailDigestBuilderController', {$scope: scope,$modal: modal});
			global         = $injector.get('$global');
			compile        = $injector.get('$compile');
			window         = $injector.get('$window');
			location       = $injector.get('$location');
			$httpBackend   = $injector.get('$httpBackend');
			$http          = $injector.get('$http');
			ctrlModal      = $injector.get('$controller')('captainModalInstanceCtrl', {$scope: scope,$modalInstance : modalInstance, selectedTitle: 'test', boxWidth: 'lg'});

			modalOptions = {
				scope: scope,
	            templateUrl: '/addWidgetModal.html',
	            controller: 'captainModalInstanceCtrl',
	            size: 'lg'
		    };

			// Create spy element for modal open function.
			spyOn(modal, 'open').and.returnValue(modalOptions);
			// element for ngSparkline directive
			element ='<p ng-sparkline></p>';
		});
	});

	// check after each test for outstanding http request
//	afterEach(function() {
//		$httpBackend.verifyNoOutstandingExpectation();
//		$httpBackend.verifyNoOutstandingRequest();
//	});
//
//	// Test case to check to see controller to be defined in the model.
//	describe('should validate EmailDigestBuilderController', function(){
//		it('should have a EmailDigestBuilderController controller', function() {
//			expect(ctrl).not.toBeUndefined();
//		});
//
//		// Test case to check to see open method to be defined in the modal.
//		it('should have open method', function(){
//			expect(scope['open']).not.toBeUndefined();
//		});
//
//		// test case for modal open function
//		it('should open modal', function () {
//			// Create spy element for modal open function.
//		    spyOn(scope, 'open').and.returnValue(modalOptions);
//		    scope.open('lg');
//		    expect(scope.open).toHaveBeenCalled();
//	    });
//	});
//// End of add widget modal
//
//// Test cases for other defined functions out of controller.
//	describe('Test other methods', function() {
//		it('should have addBox method', function(){
//			expect(addBox).not.toBeUndefined();
//		});
//
//		it('should have delBox method', function(){
//			expect(delBox).not.toBeUndefined();
//		});
//
//		it('should have addElement method', function(){
//			expect(addElement).not.toBeUndefined();
//		});
//
//		// Test case to check functions working correctly.
//		it('should call addElement method', function(){
//			var addElement = jasmine.createSpy('Hello');
//			addElement('Hello');
//			expect(addElement).toHaveBeenCalledWith('Hello');
//		});
//
//		it('should call addBox method', function(){
//			var addBox = jasmine.createSpy('Hello, sm');
//			addBox('Hello','lg');
//			expect(addBox).toHaveBeenCalledWith('Hello','lg');
//		});
//
//		it('should call delBox method', function(){
//			var delBox = jasmine.createSpy('1');
//			delBox(1);
//			expect(delBox).toHaveBeenCalledWith(1);
//		});
//
//	});
//
//	// Test case for ngSparkline directive
//	describe('ngSparkline', function() {
//		it('should have addElement method', function(){
//	    	element = compile(element)(scope); // // compile element with scope
//    		scope.$digest();
//			expect(element.find('div').attr('class')).toBe('sparkline');
//		});
//	});
//
//	// Test cases for modal instance
//	describe('Testing captainModalInstanceCtrl',function() {
//	    it('should check existence of scope variables and functions when created', function() {
//	    	expect(ctrlModal).not.toBeUndefined();
//	    });
//
//	    it('should check modal cancel functionality working ', function() {
//	    	spyOn(scope, 'open').and.returnValue(modalOptions);
//	    	scope.open('lg');
//	    	scope.cancel();
//	    	expect(modalInstance.dismiss).toHaveBeenCalledWith('cancel');
//	    });
//
//
//	    /*it('should check modal ok functionality working ', function() {
//	    	spyOn(scope, 'open').and.returnValue(modalOptions);
//	    	scope.open('lg');
//	    	scope.ok();
//	    	expect(modalInstance.close).toHaveBeenCalled();
//	    });*/
//	});
});
