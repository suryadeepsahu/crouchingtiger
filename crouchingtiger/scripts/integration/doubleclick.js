/**
 * Created by davey on 4/24/15.
 */
angular
	.module('doubleclick', ['disableAll'])
	.filter('capitalize', function() {
		return function(input) {
		  return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
		};
	})
	.factory('DoubleClickService', function($q, $timeout, $http, $window, $rootScope) {
		'use strict';
		var DoubleClickService = {};

		DoubleClickService.notify = function(args) {
			PNotify.removeAll();
			var notification = new PNotify(args);
			notification.notify = notification.update;
			return notification;
		};

		DoubleClickService.getProfile = function(ouid) {
			var req = {
				method :'GET',
				url    :$rootScope.url + ":" + $rootScope.port + "/v1/doubleclick/" + ouid,
				headers:{
					'content-type'  :'application/json',
					'Authorization':'bearer ' + $window.sessionStorage.token
				}
			};
			return $http(req);
		};

		DoubleClickService.varList = function() {
			var req = {
				method :'GET',
				url    :$rootScope.url + ":" + $rootScope.port + "/v1/doubleclick/list",
				headers:{
					'content-type'  :'application/json',
					'Authorization':'bearer ' + $window.sessionStorage.token
				}
			};
			return $http(req);
		};

		DoubleClickService.save = function(dc) {
			var req = {
				method :'POST',
				url    :$rootScope.url + ":" + $rootScope.port + "/v1/doubleclick",
				headers:{
					'content-type'  :'application/json',
					'Authorization':'bearer ' + $window.sessionStorage.token
				},
				data: dc
			};
			return $http(req);
		};

		DoubleClickService.update = function(dc) {
			var req = {
				method :'PUT',
				url    :$rootScope.url + ":" + $rootScope.port + "/v1/doubleclick",
				headers:{
					'content-type'  :'application/json',
					'Authorization':'bearer ' + $window.sessionStorage.token
				},
				data: dc
			};
			return $http(req);
		};

		DoubleClickService.saveMap = function(dc) {
			var req = {
				method :'POST',
				url    :$rootScope.url + ":" + $rootScope.port + "/v1/doubleclick/map",
				headers:{
					'content-type'  :'application/json',
					'Authorization':'bearer ' + $window.sessionStorage.token
				},
				data: dc
			};
			return $http(req);
		};

		DoubleClickService.updateMap = function(dc) {
			var req = {
				method :'PUT',
				url    :$rootScope.url + ":" + $rootScope.port + "/v1/doubleclick/map",
				headers:{
					'content-type'  :'application/json',
					'Authorization':'bearer ' + $window.sessionStorage.token
				},
				data: dc
			};
			return $http(req);
		};

		DoubleClickService.deleteMap = function(dc) {
			var req = {
				method :'DELETE',
				url    :$rootScope.url + ":" + $rootScope.port + "/v1/doubleclick/map",
				headers:{
					'content-type'  :'application/json',
					'Authorization':'bearer ' + $window.sessionStorage.token
				},
				data: dc
			};
			return $http(req);
		};

		return DoubleClickService;
	})
	.controller('DoubleClickController', ['$scope', '$filter','TagWebService','$location', '$bootbox', '$window', '$routeParams','$rootScope','DoubleClickService','pinesNotifications',
		function ($scope, $filter, TagWebService, $location, $bootbox, $window, $routeParams, $rootScope, DoubleClickService, pinesNotifications) {

			'use strict';
         	$scope.isLoadingApi = true;
			console.log('DOUBLECLICK');
			if (!$rootScope.userAccess.doubleclick) { location.href = '#/access-denied'; return; }
			$scope.canAddEdit = false;
			if($rootScope.roleId == 1) { //if it is admin then only he can add.edit/delete dc setting
				$scope.canAddEdit = true;
			}
			$scope.threshold_above = true;
			$scope.currency = "USD";
			$scope.metrics = [];
			$scope.master_used = [];
			$scope.mapping = [];
			$scope.master_metrics = [];
			$scope.master_metrics_ui = [];
			$scope.master_metrics_mapping = ["All Conversion","Appointment Set","Commitment to Buy","Initial Purchase","Payment Language","Request for Info","Reservation Made","Set Phone Appointment"];
			//$scope.master_metrics = {'metric':[], 'dimension':[]};
			$scope.doubleClickHeaders = ['Floodlight Variable', 'Type', 'DCM Type'];
			$scope.actionHeader = ['Actions'];
			$scope.all_call = 'true';
			$scope.dc_active = false;
			$scope.conversion_type = 'action';
			$scope.currency = 'USD';
			$scope.threshold_above =true;
			// $scope.isalltrackingClicked = false;

				$scope.showHide = function () {
               			$scope.variableSaved = $scope.variableSaved ?  false : true;
           						};

			// retrieve the current profile (if set)
			DoubleClickService.getProfile($rootScope.currentOUId).then(function(result) {
				if (result.data.result === 'success' && result.data.json.length !== 0) {
					angular.extend( $scope, result.data.json[0] );
					$scope.dc = result.data.json[0];
					$scope.all_call = ($scope.dc.all_call ? 'true' : 'false');
				}
			}).finally(function() {
				// get the list of metrics available
				DoubleClickService.varList().then(function(result) {
					if (result.data.result === 'success') {
						_.each(result.data.json,function (metr) {
							$scope.master_metrics.push(metr);
							if(_.indexOf($scope.master_metrics_mapping, metr.metric_display) !== -1)
								$scope.master_metrics_ui.push(metr);
							$scope.metrics.push(metr);
						});

						// $scope.master_metrics = result.data.json;
						if($scope.dc !== undefined && $scope.dc.indicator_id !== undefined){
							$scope.indicator_id = $scope.master_metrics_ui[_.findLastIndex($scope.master_metrics_ui, { indicator_id: $scope.dc.indicator_id })];
							console.log($scope.indicator_id);
						}

						// remove all used metrics from selection list
						if ($scope.mapping.length > 0) { // make sure we have a list to remove against
							_.each($scope.mapping, function (map) {
								for (var x in $scope.metrics) {
									if (map.map_id === $scope.metrics[x].map_id) {
										$scope.metrics.splice(x, 1); // remove entry from available list
									}
								}
							});
						}
					}
					$scope.isLoadingApi = false;

				});
			});


			$scope.setProfile = function() {
				var newdata = {
					"org_unit_id"       : $rootScope.currentOUId,
					"conversion_type"   : $scope.conversion_type,
					"default_floodlight": $scope.default_floodlight,
					"currency"          : $scope.currency,
					"dc_active"         : $scope.dc_active,
					"all_call"          : $scope.all_call,
					"metric_threshold"  : null,
					"indicator_id"      : null,
					"threshold_above"   : $scope.threshold_above,
					"min_call_duration" : $scope.min_call_duration
				};
				console.log($scope.indicator_id  !== null);
				// if ($scope.indicator_id === null){ $scope.indicator_id = '';	}
				if ($scope.metric_threshold && $scope.indicator_id  !== null ) { newdata.metric_threshold = $scope.metric_threshold; }
				if ($scope.indicator_id && $scope.indicator_id !== null ) { newdata.indicator_id = $scope.indicator_id.indicator_id; }
				if ($scope.threshold_above && $scope.indicator_id !== null ) { newdata.threshold_above = $scope.threshold_above; }

				if(!$scope.canAddEdit) {
					pinesNotifications.notify({						
						title:'DoubleClick Details',
						text :'Permission denied',
						type :'danger'
					});
				} else if ($scope.doubleclick_id && $scope.canAddEdit) {
					newdata.doubleclick_id = $scope.doubleclick_id;
					DoubleClickService.update(newdata).then(function(result) {
						$scope.formSubmit = false;
						if (result.data.result === 'success') {
							pinesNotifications.notify({
								title:'DoubleClick Details',
								text :'Successfully updated your DoubleClick profile',
								type :'success'
							});
						} else {
							pinesNotifications.notify({
								title:'DoubleClick Details',
								text :'Failed while updating your DoubleClick profile. ' + result.data.err,
								type :'danger'
							});
						}
					});
				} else {
					DoubleClickService.save(newdata).then(function (result) {
						$scope.formSubmit = false;
						if (result.data.result === 'success') {
							$scope.doubleclick_id = result.data.json.insertId;
							pinesNotifications.notify({
								title:'DoubleClick Details',
								text :'Successfully created your DoubleClick profile',
								type :'success'
							});
						} else {
							pinesNotifications.notify({
								title:'DoubleClick Details',
								text :'Failed while creating your DoubleClick profile. ' + result.data.err,
								type :'danger'
							});
						}
					});
				}
			};


    		$scope.upadatealltracking = function() {
                console.log("hello........upadatealltracking",$scope.all_call);
                if ($scope.all_call == 'true' ) {
                	var promptWarningStr="Changing these settings will remove conditions from all the Call Actions related to Double Click which are applied for individual Tracking Numbers. Are you sure you want to proceed?";
                   $bootbox.confirm(promptWarningStr, function(userResponse) {
                    });
    
                }
            };

			$scope.saveMap = function(data, dcmapid) {
				if(!$scope.canAddEdit) {
					pinesNotifications.notify({						
						title:'DoubleClick Details',
						text :'Permission denied',
						type :'danger'
					});
					return;
				}
				if(dcmapid) {
					var selected = $filter('filter')($scope.mapping, {dc_map_id: dcmapid});
					if(selected.length > 1) {
						// $scope.error = 'Cannot insert Duplicate record.';
						// $scope.static_fail = true;
						pinesNotifications.notify({
							title: 'Double Click Message',
							text:  'Cannot insert Duplicate record.',
							type:  'error'
						});
						$scope.mapping.pop(); // remove the unsuccessful row
						return;
					}
				}
				if (!$scope.doubleclick_id) {
					alert('You need to create and save your DoubleClick profile first');
					return;
				}
				var saveData = {
					"map" :{
						"floodlight_var":data.floodlight_var,
						"doubleclick_id":$scope.doubleclick_id,
						"map_id"        :data.map_id
					}
				};
				$scope.disabled = true;
				if (dcmapid) { //edit existing mapping
					saveData.map.dc_map_id = dcmapid;
					DoubleClickService.updateMap(saveData).then(function (result) {
						$scope.disabled = false;
						if (result.data.result === 'success') {
							$scope.disableAdd = false;
							$scope.static_success = true;
						} else {
							// $scope.static_fail = true;
							// $scope.error = result.data.err;
							pinesNotifications.notify({
								title: 'Double Click Message',
								text:  result.data.err,
								type:  'error'
							});
						}
					});
				} else {
					DoubleClickService.saveMap(saveData).then(function (result) {
						$scope.disabled = false;
						$scope.disableAdd = false;
						if (result.data.result === 'success') {
							angular.extend(data, {id:result.data.json.insertId});

							// remove from metrics list
							/*for (var x in $scope.metrics) {
								if ($scope.metrics[x].map_id === data.map_id) {
									$scope.metrics.splice(x, 1);
								}
							}*/

							// set the value for 'dc_map_id' from the result
							for (var x in $scope.mapping) {
								if ($scope.mapping[x].map_id === data.map_id) {
									$scope.mapping[x].dc_map_id = result.data.json.insertId;
									pinesNotifications.notify({
										title: 'Double Click Message',
										text:  'Floodlight Variables saved successfully',
										type:  'success'
									});
									// $scope.static_success = true;
								}
							}
						} else {
							// $scope.error = result.data.err;
							$scope.disableAdd = false;
							$scope.disabled = false;
							// $scope.static_fail = true;
							pinesNotifications.notify({
								title: 'Double Click Message',
								text:  result.data.err,
								type:  'error'
							});
							$scope.mapping.pop(); // remove the unsuccessful row
						}
					});
				}
			};

			$scope.removeMap = function(data, dcmapid, doubleclickid, map_id) {
				console.log('vars', dcmapid, doubleclickid, map_id);
				var newdata = {
					"map" :{
						"dc_map_id"     :dcmapid,
						"doubleclick_id":doubleclickid
					}
				};
				$bootbox.confirm("Are you sure you want to delete this Floodlight Variable?", function (clickedOK) {
					if (clickedOK) {
				DoubleClickService.deleteMap(newdata).then(function(result) {
					if (result.data.result === 'success') {
						// $scope.static_success = true;

						pinesNotifications.notify({
							title: 'Double Click Message',
							text:  'Floodlight Variables deleted successfully',
							type:  'success'
						});

						// add back into metrics list
						for (var x in $scope.master_metrics) {
							if ($scope.master_metrics[x].map_id == dcmapid) {
								$scope.metrics.push({ "map_id":map_id, "map_type":$scope.master_metrics[x].map_type, "metric_display":$scope.master_metrics[x].metric_display });
							}
						}

						// remove from mapping
						for (x in $scope.mapping) {
							if (($scope.mapping[x].map_id === map_id) && ($scope.mapping[x].dc_map_id === dcmapid)) {
								$scope.mapping.splice(x, 1); // remove from mapping
							}
						}

						// remove all used metrics from selection list
						$scope.metrics = [];
						_.each($scope.master_metrics,function (metr) {
							$scope.metrics.push(metr);
						});

						if ($scope.mapping.length > 0) { // make sure we have a list to remove against
							_.each($scope.mapping, function (map) {
								for (var x in $scope.metrics) {
									if (map.map_id === $scope.metrics[x].map_id) {
										$scope.metrics.splice(x, 1); // remove entry from available list
									}
								}
							});
						}

					} else {
						// $scope.error = result.data.err;
						// $scope.static_fail = true;
						pinesNotifications.notify({
							title: 'Double Click Message',
							text:  result.data.err,
							type:  'error'
						});
					}
				});
					}
				});
			};

			$scope.cancelAdd = function (id, rowform,index) {
				$scope.disableAdd = false;
				if (!id) {
					$scope.mapping.splice(index, 1);
				}
				else
					rowform.$cancel();
			};

			// used to create a new variable row that is not selected yet
			$scope.addMapping = function() {
				var lastAddedUser = $scope.mapping[$scope.mapping.length - 1];
				if(lastAddedUser) {
				if(!lastAddedUser.dc_map_id && !lastAddedUser.map_id) {
					$scope.error = 'Save currently added floodlight variable before adding another.';
					$scope.static_fail = true;
					return;
					}
				}
				if (!$scope.doubleclick_id) {
					alert('You must first save your DoubleClick profile before adding variables');
					return;
				}

				// $scope.metrics = [];
				// _.each($scope.master_metrics,function (metr) {
				// 	$scope.metrics.push(metr);
				// });

				if ($scope.mapping.length > 0) { // make sure we have a list to remove against
					_.each($scope.mapping, function (map) {
						for (var x in $scope.metrics) {
							if (map.map_id === $scope.metrics[x].map_id ) {
									$scope.metrics.splice(x, 1); // remove entry from available list
							}
						}
					});
				}

				$scope.inserted = {
					dc_map_id       : '',
					map_id          : '',
					map_type        : '',
					metric_display  : '',
					floodlight_var  : ''
				};

				$scope.mapping.push($scope.inserted);
				$scope.disableAdd = true;
			};

			$scope.removeMetric = function(data) {
				// add back into metrics
				for (var x in $scope.master_metrics) {
					if ($scope.master_metrics[x].map_id === data.map_id) {
						$scope.metrics.push({ "map_id":data.map_id, "map_type":data.map_type, "metric_display":$scope.master_metrics[x].metric_display });
					}
				}

				// remove from mapping
				for (x in $scope.mapping) {
					if ($scope.mapping[x].map_id === data.map_id) {
						$scope.mapping.splice(x, 1); // remove from mapping
					}
				}


			};

			$scope.showMetrics = function(map) {
				if ($scope.master_metrics && map.map_id && map.map_type) {
					if($scope.master_metrics.length) {
						var selected = $filter('filter')($scope.master_metrics, {map_id: map.map_id});
						return selected.length ? selected[0].metric_display : 'Not set';
					} else {
						return map.map_type || 'Not mapped';
					}
				}
			};

			$scope.setRow = function(map, map_id) {
				$scope.variableSaved =true;
				map.map_id = map_id;
				for (var x in $scope.master_metrics) {
					if ($scope.master_metrics[x].map_id === map_id) {
						map.map_type = $scope.master_metrics[x].map_type;
						map.metric_display = $scope.master_metrics[x].metric_display;
					}
				}
			};

			$scope.closeFail = function() {
				$scope.static_fail = false;
			};

			$scope.closeSuccess = function() {
				$scope.static_success = false;
			};

			$(document).ready(function() {
				setTimeout(function() {
					$(window).trigger('resize');
				}, 3000);
			});

	}]);
