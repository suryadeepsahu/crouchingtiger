(function () {
    var ap = angular.module("report-param", []);

	/**
	 * Allows us to preserve and share report parameters between reports
	 *
	*/
	ap.factory("ReportParam", ["$window", "$rootScope",function ($window, $rootScope) {
		var ReportParam = {};
		ReportParam.getParams = function(key) {
			return $window.sessionStorage[key];
		};

		ReportParam.setParams = function(key, value) {
			$window.sessionStorage[key] = value;
			return 'saved';
		};
		return ReportParam;
	}]);
}());