angular
	.module('googleanalytics', ['toggle-switch','theme.form-directives'])

	.factory('GoogleAnalyticsService', function($q, $timeout, $http, $window, $rootScope, $upload) {
		'use strict';
		var GoogleAnalyticsService = {};
		GoogleAnalyticsService.notify = function (args) {
            PNotify.removeAll();
            var notification = new PNotify(args);
            notification.notify = notification.update;
            return notification;
        };
		GoogleAnalyticsService.createAnalytics = function(ga){
			var req = {
				method: 'POST',
				url: $rootScope.url + ":" + $rootScope.port + "/v1/analytic",
				headers: {
					'content-type': 'application/json',
					'Authorization': 'bearer ' + $window.sessionStorage.token
				},
				data: ga
			};
			return $http(req);
		};
		GoogleAnalyticsService.updateAnalytics = function(ga){
			var req = {
				method: 'PUT',
				url: $rootScope.url + ":" + $rootScope.port + "/v1/analytic",
				headers: {
					'content-type': 'application/json',
					'Authorization': 'bearer ' + $window.sessionStorage.token
				},
				data: ga
			};
			return $http(req);
		};
		GoogleAnalyticsService.getAnalytics = function() {
			var config = {
				headers: {
					'content-type': 'application/json',
					'Authorization': 'bearer ' + $window.sessionStorage.token
				}
			};
			$http.defaults.useXDomain = true;
			return $http.get($rootScope.url + ":" + $rootScope.port + "/v1/analytic/ouid/" + $rootScope.currentOUId + "/includeParentAnalytics/" + false, config);

		};
		return GoogleAnalyticsService;
	})
	.controller('GoogleAnalyticsController', ['$scope','$http', '$filter','$location', '$window', '$routeParams','$rootScope','GoogleAnalyticsService',
		function ($scope, $http, $filter, $location, $window, $routeParams, $rootScope,GoogleAnalyticsService, DoubleClickService) {
			'use strict';

			if (!$rootScope.userAccess.googleua) { location.href = '#/access-denied'; return; }
        	$scope.isLoadingApi = true;
			$scope.ga ={};
			$scope.canModify = true;
			var allRoutes;
			var allcalls = null;
			$scope.id = null;
			GoogleAnalyticsService.getAnalytics().then(function(result) {
				if (result.data.status != 'error') {
					if(result.data.json.length > 0) {
						$scope.ga.tracking  = result.data.json[0].tracking_id;
						$scope.ga.duration  = result.data.json[0].duration;
						$scope.ga.sendCalls = (result.data.json[0].all_calls) ? 'allCalls' : 'uniqueCalls';
						$scope.ga.route     = (result.data.json[0].all_routes) ? 'allCallFlows' : 'indCallFlows';
						if(!result.data.json[0].all_routes){
							$scope.ga.sendCalls = 'allCalls';
							$scope.ga.duration = undefined;
						}
						$scope.ga.gaStatus  = (result.data.json[0].analytic_status === 'active') ? true : false;
						$scope.id           = result.data.json[0].tracking_id;
					}else{
						$scope.ga.sendCalls = 'allCalls';
					}
        		$scope.isLoadingApi = false;
				} else {
					GoogleAnalyticsService.notify({
						title: 'Google Analytics',
						text:  result.data.err,
						type:  'error'
					});
				}
			});

			$scope.saveAnalytics = function() {
				if($scope.gaForm.$invalid) {
					return;
				}
				if($scope.ga.sendCalls === 'allCalls') {
					allcalls = true;
				} else if($scope.ga.sendCalls === 'uniqueCalls') {
					allcalls = false;

				}
				if($scope.ga.route === 'allCallFlows') {
					allRoutes = true;
				} else if($scope.ga.route === 'indCallFlows') {
					allRoutes = false;
					$scope.ga.duration = 0;
					allcalls           = false;
				}
				var daStatus = ($scope.ga.gaStatus) ? 'active':'inactive';
				var analytics = {"analytic" : 
					{
						"org_unit_id" : $rootScope.currentOUId,
						"duration"    : $scope.ga.duration,
						"tracking_id" : $scope.ga.tracking,
						"all_routes"  : allRoutes,
						"all_calls"   : allcalls,
						"status"      : daStatus
					}
				};
				if($scope.id) {
					analytics.analytic.id = $rootScope.currentOUId;
					GoogleAnalyticsService.updateAnalytics(analytics).then(function(result) {
						console.log(result);
						if (result.data.err === '') {
							GoogleAnalyticsService.notify({
								title: 'Google Analytics',
								text: 'Successfully updated Google Analytics',
								type: 'success'
							});
							if($scope.ga.route === 'indCallFlows') $scope.ga.duration = undefined;
							$location.path('/set-ga');
							return;
						} else {
							GoogleAnalyticsService.notify({
								title: 'Google Analytics',
								text:  result.data.err,
								type:  'error'
							});
						}
					});
				} else {
					console.log(analytics);	
					GoogleAnalyticsService.createAnalytics(analytics).then(function(result) {
						console.log(result);
						if (result.data.err === '') {
							GoogleAnalyticsService.notify({
								title: 'Google Analytics',
								text: 'Successfully saved Google Analytics',
								type: 'success'
							});
							if($scope.ga.route === 'indCallFlows') $scope.ga.duration = undefined;
							$location.path('/set-ga');
							return;
						} else {
							GoogleAnalyticsService.notify({
								title: 'Save Google Analytics',
								text:  result.data.err,
								type:  'error'
							});
						}
					});
				}
			};

	}]);	