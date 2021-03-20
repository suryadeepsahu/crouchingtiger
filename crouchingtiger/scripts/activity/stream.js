angular
    .module('activitystream-builder', ["api-param"])

	.factory('ActivityStreamWebService', function(ApiParam, $q, $timeout, $http) {
	    'use strict';
	    var ActivityStreamWebService = {};

	    ActivityStreamWebService.notify = function (args) {
	        PNotify.removeAll();
	        var notification = new PNotify(args);
	        notification.notify = notification.update;
	        return notification;
	    };

	    ActivityStreamWebService.stream = function(al) {
			var req = {
				method: 'POST',
				url: ApiParam.baseURL() + "/v1/logactivity/stream",
				headers: ApiParam.headerConfig().headers,
				data: al
			};
			return $http(req);
		};

		ActivityStreamWebService.userList = function(ouid) {
			var req = {
				method: 'GET',
				url: ApiParam.baseURL() + "/v1/orgunit/userList/" + ouid,
				headers: ApiParam.headerConfig().headers
			};
			return $http(req);
		};

		return ActivityStreamWebService;
	})

	.controller('ActivityStreamController', ['$scope', '$filter','TagWebService','$location', '$routeParams','$rootScope','ActivityStreamWebService', 'pinesNotifications',
		function ($scope, $filter, TagWebService, $location, $routeParams, $rootScope, ActivityStreamWebService, pinesNotifications) {
		    'use strict';

			// set scope variables
			$scope.drp_options = {
				ranges:    {
					'Today':        [moment(),                                       moment().endOf('day')],
					'Yesterday':    [moment().subtract(1, 'days'),                   moment().subtract(1, 'days').endOf('day')],
					'Last 7 Days':  [moment().subtract(7, 'days'),                   moment().subtract(1, 'days').endOf('day')],
					'Last 30 Days': [moment().subtract(30, 'days'),                  moment().subtract(1, 'days').endOf('day')],
					'This Month':   [moment().startOf('month'),                      moment().endOf('month').endOf('day')],
					'Last Month':   [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month').endOf('day')]
				},
				opens:     'left',
				startDate: moment().subtract(7, 'days'),
				endDate:   moment().subtract(1, 'days').endOf('day')
			};
			$scope.drp_start  = moment().subtract('days', 10).format("MMMM D, YYYY");
			$scope.drp_end    = moment().format("MMMM D, YYYY");
			$scope.logs       = [];
			$scope.user_list  = [];
			$scope.log_name   = '';
			$scope.ct_user_id = '';
			$scope.view       = false;
			$scope.isReqSent  = false;
			var limit         = 25;
			var pg            = 0;
			var last_date     = '';
			$scope.preview = ($location.search().preview ? $location.search().preview : false);
			if ($location.search().preview) {
				$("#wrap").append('<div id="previewBlock">&nbsp;</div>');
			}

			$scope.log_list = [
				{'log':'log_billing',       'text':'Billing'},
				{'log':'log_call_action',   'text':'Call Actions'},
				{'log':'log_call_flow',     'text':'Tracking Number'},
				{'log':'log_campaign',      'text':'Campaign'},
				{'log':'log_integration',   'text':'Integrations'},
				{'log':'log_ivr',           'text':'IVR Routes'},
				{'log':'log_tag',           'text':'Tags'},
				{'log':'log_user',          'text':'User/Group'},
				{'log':'log_webhook',       'text':'Webhooks'},
				{'log':'log_distribution_list','text':'Distribution List'},
				{'log':'log_schedule','text':'Scheduler'}
			];

			// mapping for setting the correct icon for the 'source' or type of record
			var iconmap = {
				'log_billing'       :'fa fa-money',
				'log_call_action'   :'fa fa-bolt',
				'log_call_flow'     :'fa fa-phone',
				'log_campaign'      :'fa fa-gear',
				'log_integration'   :'fa-cloud',
				'log_ivr'           :'fa fa-wrench',
				'log_tag'           :'fa fa-tags',
				'log_user'          :'fa fa-user',
				'log_webhook'       :'fa fa-info',
				'log_distribution_list':'fa fa-info',
				'log_schedule':'fa fa-info'
			};
			/* fa-key fa-gears fa-thumb-tack fa-bookmark-o fa-paperclip fa-star fa-edit */

			// more user friendly wording mapping to be used
			var actionmap = {
				'insert':'added',
				'delete':'removed',
				'update':'modified',
				'login':'login for',
				'logout':'logout for'
			};

			// maping for setting the CSS color styling of the main container per 'source' or type of record
			var colormap = {
				'log_billing'       :'activity-indigo',
				'log_call_action'   :'activity-midnightblue',
				'log_call_flow'     :'activity-green',
				'log_campaign'      :'activity-success',
				'log_integration'   :'activity-magenta',
				'log_ivr'           :'activity-green',
				'log_user'          :'activity-primary',
				'log_tag'           :'activity-sky',
				'log_webhook'       :'activity-orange',
				'log_distribution_list':'activity-orange',
				'log_schedule':'activity-brown',
			};
			/*  activity-primary activity-warning activity-danger activity-success activity-info activity-inverse
				activity-brown */

			// make the call to popluate the user drop list
			/* TODO:  while this isn't currently in use - it is ready to go and work with the drop lists for filtering
			ActivityStreamWebService.userList($rootScope.currentOUId).then(function (result) {
				if (result.data.result !== 'error') {
					$scope.user_list = result.data.json;
				}
			});

			*/

			// this is the main function that handles the retrieval and placement of additional activity log records
			$scope.getLogs = function(num) {
				$scope.isReqSent = true; // set lock from calling method again
				if (pg === 'end') {
					$scope.loading = false;
					pinesNotifications.notify({
						title: 'No more log records',
						text:  'There are no more records in the system to retrieve for display',
						type:  'info'
					});
					return;
				}
				var reqdata = {
					'org_unit_id': $rootScope.currentOUId,
					'start_date' : $scope.drp_start + " 00:00:00",
					'end_date'   : $scope.drp_end + " 23:59:59",
					'timezone'   : $rootScope.timezone,
					'limit'      : num,
					'last_date'  : last_date,
					'offset'     : (pg * num)
				};
				if ($scope.log_name) { reqdata.log = $scope.log_name; }
				if ($scope.ct_user_id) { reqdata.ct_user_id = $scope.ct_user_id; }

				ActivityStreamWebService.stream(reqdata).then(function (result) {
					$scope.isReqSent = false;
					if (result.data.result !== 'error') {
						if((result.data.json).length) {
						$.each(result.data.json, function (key, row) {
							// row.log_name = row.log_name.substring(4);
							// row.timezone = row.timezone;
							row.log_date = moment(row.timezone, 'YYYY-MM-DD hh:mm:ss A').format("dddd, MMMM DD, YYYY h:mm:ss A");
							row.iconcss  = (iconmap[row.log_name] ? iconmap[row.log_name] : iconmap.user);
							row.divcss   = (colormap[row.log_name] ? colormap[row.log_name] : colormap.user);
							row.action   = actionmap[ row.log_data.action ];
                            if(row.log_name == "log_tag" && row.ct_user_id === null && row.log_data.fields.data.call_id){
                                row.username =  'Call Action (null)' ;
                            }else{
                                row.username =  row.first_name + ' ' + row.last_name + ' (' + row.username + ')' ;
                            }
							_.each($scope.log_list, function(log) {
								if (log.log === row.log_name) { row.log_name = log.text; }
							});
							$scope.logs.push(row);
							$scope.loading = false;
						});
						if($scope.logs.length > 0) {
							last_date = $scope.logs[$scope.logs.length - 1].timezone;
							last_date = new Date(last_date).getTime();
						}
						// $scope.logs[]
						pg++; // increment for next page offset
					} else {
							$scope.loading = false;
							pg             = 'end';
						}
					} else {
						pg = 'end';
						pinesNotifications.notify({
							title: 'Log Retrieval Failure',
							text:  'An error occurred. '+result.data.error,
							type:  'error'
						});
					}
				});
			};
			// $scope.getLogs(limit); // make the initial call to display log records on page load

			// triggered by a date selection change to get new logs
			$scope.changeDateRange = function() {
				pg          = 0;
				$scope.logs = []; // reset the logs data array
				$scope.getLogs(limit);
			};

			$scope.setUser = function(userid) {
				//console.log('username', userid);
				userid            = parseInt(userid);
				$scope.ct_user_id = userid;
				pg                = 0;
				$scope.logs       = []; // reset the logs data array
				$scope.getLogs(limit);
				$scope.view       = (userid ? true : ($scope.log_name ? true : false));

				_.each($scope.user_list, function(row) {
					if (row.ct_user_id === userid) {
						console.log('matched user', row.name);
						$scope.user = row.name; }
				});
			};

			$scope.setLog = function(logname) {
				//console.log('log name', logname);
				$scope.log_name = logname;
				pg              = 0;
				$scope.logs     = []; // reset the logs data array
				$scope.getLogs(limit);
				$scope.view     = (logname ? true : ($scope.ct_user_id ? true : false));

				_.each($scope.log_list, function(row) {
					if (row.log === logname) { $scope.section = row.text; }
				});
			};

			// used for the infinite scroll feature of logs
			$scope.moreLogs = function() {
				$scope.loading = true;
				if($scope.isReqSent === false) { 
					$scope.getLogs(limit);
				}
			};
		}
    ]);
