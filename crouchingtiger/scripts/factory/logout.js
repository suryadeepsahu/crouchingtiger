/**
 * Created by davey on 7/22/15.
 */
angular.module('logout', [])
.factory('LogoutService', function($q, $timeout, $http, $window, $cookies, $rootScope, pinesNotifications, $location) {
	'use strict';
		var LogoutService = {};

		LogoutService.logoutAPI = function(info) {
			var req = {
				method: 'POST',
				url: $rootScope.url + ":" + $rootScope.port + "/login/logout",
				headers: {
					'content-type': 'application/json'
				},
				data: info
			};
			return $http(req);
		};

		LogoutService.logout = function() {
			var data = { 'access_token' : $window.sessionStorage.token };
			LogoutService.logoutAPI(data).then(function(result) {
				if (result.data.result === 'success') {
					delete $window.sessionStorage.component;
					delete $window.sessionStorage.token;
					delete $window.sessionStorage.currentOUId;
					delete $window.sessionStorage.currentOUName;
					delete $window.sessionStorage.currentOULevel;
					delete $window.sessionStorage.topLevelOUId;
					delete $window.sessionStorage.userOULevel;
					delete $window.sessionStorage.highestOUId;
					delete $window.sessionStorage.highestOUName;
					delete $window.sessionStorage.userId;
					delete $window.sessionStorage.fullName;
					delete $window.sessionStorage.userAccess;
					delete $window.sessionStorage.timezone;
					delete $window.sessionStorage.billingId;
					delete $window.sessionStorage.protect_caller_id;
					delete $window.sessionStorage.report_end_date;
					delete $window.sessionStorage.report_start_date;
					delete $window.sessionStorage.uservoiceSSO;
					delete $window.sessionStorage.supportURL;
					delete $window.sessionStorage.feedbackURL;
					delete $window.sessionStorage.levelOneOus;
					delete $window.sessionStorage.orglist;
					delete $window.sessionStorage.reports;
					$window.sessionStorage.clear();
					//delete $window.sessionStorage;
					delete $rootScope.component;
					delete $rootScope.currentOUId;
					delete $rootScope.currentOUName;
					delete $rootScope.currentOULevel;
					delete $rootScope.topLevelOUId;
					delete $rootScope.activeConversation;
					delete $rootScope.userOULevel;
					delete $rootScope.highestOUId;
					delete $rootScope.highestOUName;
					delete $rootScope.userId;
					delete $rootScope.fullName;
					delete $rootScope.timezone;
					delete $rootScope.userAccess;
					delete $rootScope.billingId;
					delete $rootScope.protect_caller_id;
					delete $rootScope.uservoiceSSO;
					delete $rootScope.supportURL;
					delete $rootScope.feedbackURL;
					delete $rootScope.levelOneOus;
					delete $rootScope.orglist;
					delete $rootScope.reports;
					delete $rootScope.bc_ous;
					delete $rootScope.supportToken;
					//$scope.isLoggedIn = false;
					localStorage.clear();
					$cookies.remove('ct_token');
					// Remove the SSO token so a logged out user logs out of single sign on as well
					// window.UserVoice.setSSO(null);

					document.location = window.location.protocol + '//' + window.location.hostname;

				} else {
					console.log("failed to logout on backend");
					pinesNotifications.notify({
						title: 'Failed to logout',
						text:  'An error occurred during the logout process: '+result.data.err,
						type:  'error'
					});
				}
			});
		};

		return LogoutService;
})
.controller('LogoutController', ['$scope', '$global', '$http', '$location', 'LogoutService', '$window', '$rootScope',
	function($scope, $global, $http, $location, LogoutService, $window, $rootScope) {
		'use strict';

		$scope.logOut = function() {
			$scope.$emit('logout');
			LogoutService.logout();
		};
	}
]);
