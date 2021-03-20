/**
 * Created by bschermerhorn on 11/11/15.
 */


/*
* Validate form fields for valid Hexcode values
* example
* #FFF
* or
* #FFFFFF
* */
//<form>
// <input type="text" hexcode />
//</form>

(function () {
	var app = angular.module("white-label-directives");

	app.directive("hexcode", function () {
		function link(scope, elem, attrs, ctrl) {
            // this block works for more recent versions of Angular
			//ctrl.$validators.hexcode = function (modelValue, viewValue) {
			//	console.log("YES IM HERE");
			//	if (ctrl.$isEmpty(modelValue)) { return true; }
			//	return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(viewValue);
			//};

			ctrl.$parsers.unshift(function (viewValue) {
				if (/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(viewValue)) {
					ctrl.$setValidity("hexcode", true);
					return viewValue;
				}
				else {
					ctrl.$setValidity("hexcode", false);
					return;
				}
			});

		}

		return {
			require: "ngModel",
			link: link
		};
	});
}());
