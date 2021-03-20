/**
 * Created by bschermerhorn on 11/10/15.
 */

describe('directive: font-selector', function () {
	var element, scope;

	beforeEach(module('white-label-directives'));

	beforeEach(inject(function ($rootScope, $compile) {
		scope = $rootScope.$new();

		element = '<font-selector ng-model="myFont" font-selections="fonts"></font-selector>';

		scope.fonts = [
			{cssFontFamily: "Arial", displayText: "Arial"},
			{cssFontFamily: "Trebuchet MS", displayText: "Trebuchet"}
		];


		element = $compile(element)(scope);
		scope.$digest();
	}));

	describe('font selector', function () {
		it("should compute the size to create other values", function () {
			var isolated = element.isolateScope();
			expect(isolated.fontSelections.length).toBe(2);
			expect(isolated.fontSelections[0].cssFontFamily).toBe("Arial");
			expect(isolated.fontSelections[1].cssFontFamily).toBe("Trebuchet MS");
		});

		it("should contain a svg tag with proper size", function () {
			expect(element.find("option")[1]).not.toBe(undefined);
			expect(element.find("option")[2]).not.toBe(undefined);
		});


	});


});
