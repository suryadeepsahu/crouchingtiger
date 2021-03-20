/**
 * Created by bschermerhorn on 11/10/15.
 */
(function (angular) {
	var app = angular.module("white-label-directives", []);
	// <font-selector fontSelections="" ng-model=""></font-selector>
	app.directive("fontSelector", function () {
		var templ = [
			'<select class="form-control" ng-model="selectedFont">',
			'<option value="" ng-selected="true" ng-disabled="true"> --Select--</option> ',
			'<option ng-repeat="fs in fontSelections" style="font-family: \'{{fs.cssFontFamily}}\'">',
			"{{fs.displayText}}",
			"</option>",
			"</select>"
		].join("");

		return {
			restrict: "E",
			require: "ngModel",
			template: templ,
			scope: {
				selectedFont: "=ngModel",
				fontSelections: "="
			}
		};
	});
}(angular));