(function() {
    /* jshint expr: true */
	angular.module('scheduled_plans', ['scheduled_report_webservices', 'distribution_list_webservices', 'static-include', 'isteven-multi-select'])
        .filter('capitalize', function() {
            return function(input) {
                return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
            };
        })
        .filter('unit', function($filter) {
            var dayNames = ['Sun', 'Mon', 'Tues', 'Wed', 'Thu', 'Fri', 'Sat'];
            var suffixes = ["th", "st", "nd", "rd"];
            return function(row) {
                if (row.freq_unit === 'weekly') {
                    return '(' + dayNames[row.freq_value] + ')';
                } else if (row.freq_unit === 'monthly') {
                    var relevantDigits = (row.freq_value < 30) ? row.freq_value % 20 : row.freq_value % 30;
                    var suffix = (relevantDigits <= 3) ? suffixes[relevantDigits] : suffixes[0];
                    return '(' + row.freq_value + suffix + ')';
                }
                return '';
            };
        })
				.factory('ScheduledPlanWebService', function ($q, $timeout, $http, $window, $rootScope, $upload, pinesNotifications, ApiParam) {
		        'use strict';
		        var ScheduledPlanWebService = {};
						ScheduledPlanWebService.getScheduledplansByUser = function(){
							$http.defaults.useXDomain = true;
	            var url = ApiParam.baseURL() +
	                "/v1/schedule/";
	            return $http.get(url, ApiParam.headerConfig());
						};
						ScheduledPlanWebService.sendScheduledplan = function (scheduledplan) {
		            return $http.post(ApiParam.baseURL() + "/v1/schedule", scheduledplan, ApiParam.headerConfig());
		        };
		        ScheduledPlanWebService.deleteScheduledplan = function (scheduledplan) {
		            return $http.put(ApiParam.baseURL() + "/v1/schedule", scheduledplan, ApiParam.headerConfig());


		        };
		        return ScheduledPlanWebService;
		    })
.controller('ScheduledPlansController', ['$scope', 'ScheduledPlanWebService', 'pinesNotifications', '$rootScope', '$location', '$uibModal', '$window', '$q', '$bootbox',
    function($scope, ScheduledPlanWebService, pinesNotifications, $rootScope, $location, $uibModal, $window, $q, $bootbox) {
				$scope.scheduleList= [];
        		$scope.isLoadingApi = true;
				//$scope.loadSchedule = true;
				$scope.SchedusleNotFound = false;
				$scope.isDelete = false;
				$scope.setScheduleHeaders = ['Schedule Name', 'Report Name', 'Creator', 'Created Date', 'Recipients', 'Frequency', 'Format', 'Status'];
		$scope.actionHeader = ['Actions'];
		
				ScheduledPlanWebService.getScheduledplansByUser().then(function (result) {
						if (result.data.result === "success") {
							$scope.scheduleList = result.data.json;
							if($scope.scheduleList.length > 0){
								$scope.SchedusleNotFound = false;
							}else{
								$scope.SchedusleNotFound = true;
							}
							$scope.isLoadingApi = false;
						}else{
							$scope.isLoadingApi = false;
							$scope.SchedusleNotFound = true;
							}
						});

					$scope.sendNow = function(row){
						var schedule = {
							"schedulePlanId" : row.schedule_id
						};
							ScheduledPlanWebService.sendScheduledplan(schedule).then(function (result) {
									if (result.data.result === '') {
										pinesNotifications.notify({
												title: 'Schedule Reports',
												text:  'Successfully Schedule Report',
												type:  'success'
										});
										return;
									}
							});
					};

				$scope.delete = function(row, index){
					$bootbox.confirm("Are you sure you want to delete this scheduled report?", function(clickedOK) {
							if (clickedOK) {
								$scope.isDelete = true;
								var scheduleDelete = {
									"schedulePlanId" : row.schedule_id
								};
									ScheduledPlanWebService.deleteScheduledplan(scheduleDelete).then(function(response) {
											if (response.data.result === 'success') {
													$scope.scheduleList = _.reject($scope.scheduleList, function(list) {
															return list.schedule_id == row.schedule_id;
													});
													pinesNotifications.notify({
															title: 'Schedule Reports',
															text: 'Successfully deleted the scheduled report',
															type: 'success'
													});
													$scope.isDelete = false;
													return;
											} else {
													pinesNotifications.notify({
															title: 'Schedule Report',
															text: response.data.err,
															type: 'error'
													});
													return;
											}
									});
							}
					});
			};
	}
]);
}());
