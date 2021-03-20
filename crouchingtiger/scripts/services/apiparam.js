(function () {
    var ap = angular.module("api-param", []);

	/**
	 * Provides the default API data that most web services use
	 * an example usage would be to first inject ApiParam into your web service component, then use
	 *
	 *  return $http.get(ApiParam.baseURL() + "/v1/orgUnit/level/" + ouId, ApiParam.headerConfig());
	*/
	ap.factory("ApiParam", ["$window", "$rootScope", function ($window, $rootScope) {
		var ApiParam = {};

		ApiParam.headerConfig = function() {
			var config = {
				headers: {
					'content-type':  'application/json',
					'Authorization': 'bearer ' + $window.sessionStorage.token
				}
			};
			return config;
		};

		ApiParam.baseURL = function() {
			return $rootScope.url + ":" + $rootScope.port;
		};

		ApiParam.socketURL = function() {
			return $rootScope.socketUrl + ":" + $rootScope.port;
		};

		return ApiParam;
	}]);
}());