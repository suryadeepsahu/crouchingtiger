/**
 * Created by bschermerhorn on 1/21/16.
 */

(function () {

	// display should just be what's visible to user
	// fieldName should be what the database uses for its name
	// filterType determines the compartive operators available to the user as well as the type of input/dropdown they get to use
	// options is an optional key/value type only dropdownMisc
	function Column(display, fieldName, filterType, options) {
		this.display    = display;
		this.fieldName  = fieldName;
		this.filterType = filterType;
		this.options    = options;
	} // end Column constructor

	function ComparativeOperator(operatorShorthand, displayValue) {
		this.operator = operatorShorthand;
		this.display  = displayValue;
	}// end ComparativeOperator constructor

	var app = angular.module("call-flow-settings", ["report-components", "angularUtils.directives.dirPagination", "callflow-report-settings-webservices"]);

	// added filter for first letter capital
	app.filter('ucfirst', function() {
		return function(input) {
		  return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
		};
	});

	app.controller("CallFlowSettingsController", ['$scope', 'CallFlowSettingsReportWebService','pinesNotifications','$q','progressLoader','$window','filterHelper','$location', '$rootScope', 'advFilSrvc','$compile',
	function CallFlowSettingsController ($scope, CallFlowSettingsReportWebService, pinesNotifications,$q,progressLoader,$window,filterHelper,$location,$rootScope, advFilSrvc,$compile) {
		var download_audio_setting = $window.localStorage.download_audio_enabled;
		download_audio_setting = (typeof download_audio_setting === "boolean") ? download_audio_setting : (download_audio_setting ==undefined || download_audio_setting =='undefined' || $window.localStorage.download_audio_enabled.toLowerCase() === 'true');
		if($rootScope.download_audio_enabled!==download_audio_setting){
			$rootScope.download_audio_enabled=download_audio_setting;
			$rootScope.$broadcast('download_audio_setting_changed');
		}
		if($rootScope.is_migrated === true || $rootScope.is_migrated === 'true'){
			$scope.is_migrated = true;
	}else{
			$scope.is_migrated = false;
	}

		$scope.currentPaginationId = "pgCallFlow";
		$scope.simpleSearchFilter = "";
		$scope.filterApplied = false;
		$scope.horsemanFlag = false;
		$scope.report = $location.search().report;
		$scope.currentPage         = 1;
		$scope.pageSize            = 100;
		// get total data count here to update in the pagination
		$scope.totalDataRows       = 0;
		$scope.total_dataset_count = undefined;
		$scope.limit               = 100;
		$scope.offset              = 0;
		$scope.filter              = '';
		$scope.filtertype          = 's';
		$scope.filterDef           = [];
		$scope.exportData          = false;
		$scope.stopPagechanged     = false;
		$scope.showActualEportLink = false;
		$scope.showExportErrorLink = true;
		$scope.ouList              = [];
		var blkstr                 = {};
		//$scope.is_migrated = $rootScope.is_migrated ;

		$rootScope.isSafari= $window.sessionStorage.isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window.safari || safari.pushNotification);
		advFilSrvc.getAllCustomSources();
		$scope.preview             = ($location.search().preview ? $location.search().preview : false);
		$scope.isFromReportEngine  = ($location.search().isFromReportEngine ? $location.search().isFromReportEngine : false);

		if ($location.search().preview) {
			$("#wrap").append('<div id="previewBlock">&nbsp;</div>');
		}
		var csVisible = false;
		if($scope.preview || $scope.isFromReportEngine){ csVisible = ( $rootScope.is_migrated ==="true" ? true : false); $scope.horsemanFlag = true;}
		$scope.resizeWindow = function () {
			setTimeout(function() {
				$(window).trigger('resize');
			}, 100);
		};

		CallFlowSettingsReportWebService.getAllOus().then(function (response) {
			if (response.data.result != 'error') {
			   //var a = JSON.stringify(response.data.json);
			   _.each(response.data.json,function(ous){
					var tempHash = {};
					tempHash.key = ous.org_unit_id;
					tempHash.value = ous.org_unit_name;
					$scope.ouList.push(tempHash);
			   });
			} else {
				return console.log("Error in ", "CallFlowSettingsReportWebService.getAllOus SUCCESS callback");
			}
		});

		$scope.$watch('ouList', function(newVal) {
			if(newVal) {
				 $scope.columnDefinitions[7].options = $scope.ouList;
			}
		},true);

		// NOTE: this method shouldn't be actively used
		$scope.redirectScheduledEditor = function(){
			var start_date = moment().subtract('days', 7).format('YYYY-MM-DD');
			var end_date = moment().format('YYYY-MM-DD');
			var scheldueAdvFilterDefinitions;
			if ($scope.filter !== undefined && $scope.filtertype === "a") {
				scheldueAdvFilterDefinitions = $scope.filterDef;
			}
			$window.location.href = filterHelper.createBaseUrl(start_date, end_date, "none", $scope.filterDef, $scope.simpleSearchFilter , "callflow_setting", $scope.limit, $scope.offset);
		};

		$scope.pageChanged = function(newPage) {
			//progressLoader.start();
			$scope.horsemanFlag = false;
			$scope.urlParams.offset = ($scope.pageSize * (newPage - 1));
			// $scope.offset used for paginateHeader
			$scope.offset = $scope.urlParams.offset;
			console.log('URL PARAMS OFFSET', $scope.urlParams.offset);
			window.scrollTo(0, 0);
			$scope.loadReportData();
			$scope.stopPagechanged = false;
		};

		$scope.showNoRecordsError = function () {
			pinesNotifications.notify({
					title: 'Export',
					text:  'There is no data to export report.',
					type:  'error'
				});
		};

		$scope.objectURL = function() {
			var obj = {
				filter: $scope.filter,
				filtertype: $scope.filtertype,
				limit: $scope.limit,
				offset: $scope.offset
			};
		};

		$scope.getUrlParams = function() {
			$scope.urlParams = {};
			$scope.applyFilterParams();
			//$rootScope.$broadcast('start_url_assembly', 'blank');

			return $scope.urlParams;
		};

		$scope.loadReportData = function() {
			if($rootScope.download_audio_enabled === false){
                return;
            }
			progressLoader.set( 75 );
			$scope.paginateHeader = "Loading Data...";
			$scope.isLoadingApi = true; 
			console.log('INSIDE LOAD REPORT DATA, $scope.urlParams:', $scope.urlParams);
			if ($scope.filtertype !== undefined) { $scope.stopPagechanged = true; }
			var tmp = "";
                if ($scope.urlParams.filtertype == "s"){
                   
                    if (typeof($scope.urlParams.filter == "string")){
                        tmp = $scope.urlParams.filter;
                        var hashIndex = $scope.urlParams.filter.indexOf("`");
                        if (hashIndex > -1){
                            //comIndex = $scope.urlParams.filter;
                            tmp = $scope.urlParams.filter.replace(/`/g,",");
                        }
                    }
                    $scope.simpleSearchFilter = tmp;
                    
                }

			CallFlowSettingsReportWebService.getDataTableInfo($scope.urlParams).then(function(res) { //.success(success).error(error);
				console.log('GOT TABLE INFO', res.data);
				if (res.data.result !== "success") {
					return console.log("Error in ", "CallFlowSettingsReportWebService.getDataTableInfo SUCCESS callback");
				} else {
					var json = res.data.json;
					console.log(json);
					if ($scope.offset === 0) {
						$scope.totalDataRows = $scope.total_dataset_count = json.totalcnt;
						if ($scope.totalDataRows > 100 &&  $scope.stopPagechanged === true) {
							$scope.currentPage = 1;
							// $scope.pageChanged(1);
						}
					}

					$scope.huntingOptions = {
						"rollover" : "Rollover",
						"simultaneous" : "Simultaneous Ring",
						"overflow" :"Overflow"
					};
					for(var i=0;i<json.dataset.length;i++)
					{
						if(json.dataset[i].routable_type === "VoicemailRoute")
						{
							json.dataset[i].vm_enabled = '';
						}
						if(json.dataset[i].hunt_type){
							json.dataset[i].hunt_type = $scope.huntingOptions[json.dataset[i].hunt_type];
						}
					}
					$scope.dataTableValues = json.dataset;
					$scope.dataTableTotalCount = json.totalcnt;
					$scope.horsemanFlag = true;
					$scope.paginateHeader = "Showing " + parseInt($scope.offset + 1) + " - " + parseInt($scope.offset + $scope.dataTableValues.length) + " of " + $scope.dataTableTotalCount;
					progressLoader.end();
					$scope.isLoadingApi = false;
					if ($scope.dataTableValues.length > 0) {
						$scope.showActualEportLink = true;
						$scope.showExportErrorLink = false;
					} else {
						$scope.showActualEportLink = false;
						$scope.showExportErrorLink = true;
						$scope.paginateHeader = "No data Found";
						$scope.isLoadingApi = false;
					}

					if ($scope.showAdvFilter === true && $scope.advFilterDefinitions.length > 0) {
						if ($scope.advFilterDefinitions[0].user_input || $scope.advFilterDefinitions[0].user_input === 0) {
							$scope.filterApplied = true;
						}
					} else if ($scope.simpleSearchFilter.length > 0) {
						$scope.filterApplied = true;
					}
				}
				if (res.error) {
					console.log("Error in ", "CallFlowSettingsReportWebService.getDataTableInfo ERROR callback");
				}

				$scope.resizeWindow();
				window.scrollTo(0, 0);
			});
		};

		// database field names (doing a hardcoded mapping right now since Davey doesn't know what the field names will be for the data that comes from the backend)
            $scope.dbfn = {
				id               : "provisioned_route_id",
				call_flow_name   : "provisioned_route_name",
				phone_number     : "number",
				type             : "routable_type",
				strategy         : "strategy",
				hunt_type        : "hunt_type",
				//pool_quantity: "pool_quantity",
				ring_to          : "default_ringto", // default_ringto
				ad_source        : "cat_combo",
				custom_source1   : "Custom Source 1",
				custom_source2   : "Custom Source 2",
				custom_source3   : "Custom Source 3",
				custom_source4   : "Custom Source 4",
				custom_source5   : "Custom Source 5",
				active           : "provisioned_route_status",
				group_name       : "org_unit_name",
				group_id         : "org_unit_id",
				ou_level         : "level",
				billing_id           : "billing_id",
				parent_id                : "org_unit_parent_id",
				campaign_id      : "campaign_id",
				campaign_name    : "campaign_name",
				dni              : "dni_type",
				instant_insights : "instant_insights",
				instant_insights_config : "instant_insights_config",
				host_domain      : "destination_url",
				referring_website: "referrer",
				html_class       : "dni_element",
				custom_params    : "custom_params",
				rc               : "record_until",
				pd               : "play_disclaimer",
				vp               : "message_enabled",
				wm               : "whisper_enabled",
				webhook_name     : "webhook_name", 
				voicemail        :  "vm_enabled"
				//ca:"ca",
			};
		
		$scope.routeTypes = {
			SimpleRoute: "Simple",
			IvrRoute2:    "IVR",
			PercentageBasedRoute: "Percentage",
			GeoRoute:    "Geo Route",
			OutboundRoute:     "Outbound",
			ScheduleRoute: "Schedule",
			VoicemailRoute : "Voicemail"
		};
		
		if($rootScope.is_migrated === false || $rootScope.is_migrated === 'false'){
            $scope.routeTypes.SimpleRoute = 'SimpleRoute';
        }
            $scope.geoTypes = {
                "claimedState" : "Claimed State",
                "Claimed" : "Claimed Zip-code",
                "Npa" : "Caller Area Code Proximity",
                "Zipcode": "Zip-code Proximity"
            };
       
		
		// Check for visible coulmns after adding subdata for ivr and prcentage based route type.
		// added watch expression so that it reflect on coulmns checked or unchecked live.
		$scope.checkVisible = function() {
			$scope.$watch('visibleColumns', function () {
				var columnsToHide = _.filter($scope.visibleColumns, function (vc) { return vc.visible === false; });
				var columnsToShow = _.filter($scope.visibleColumns, function (vc) { return vc.visible; });
				_.each(columnsToHide, function(data) {
					if(!angular.isObject(data.col)) {
						$(".subrows_"+data.col).hide();
					}
				});

				_.each(columnsToShow, function(dataShow) {
					if(!angular.isObject(dataShow.col)) {
						$(".subrows_"+dataShow.col).show();
					}
				});
			}, true);
		};
		$scope.showScheduleData = function(scheduleData,index, index1){
			if($(".subrows"+index+"_"+index1).length > 0) {
				$(".subrows"+index+"_"+index1).remove();
				return false;
			}
			var schData = scheduleData;
			schData.schedules.push({
				'activateVoicemail': schData.vm_enabled,
				'ringTo': schData.default_ringto
			});
			$scope.schedulerows = '';
			schData.schedules.forEach(function (schData) {
				var hunt_type = '';
				if(schData.overflowNumbers && schData.overflowNumbers[0].overflowNumber && schData.overflowNumbers.length > 0 && schData.simultaneousRings === true) {
					hunt_type = 'Simultaneous';
				}
				if(schData.overflowNumbers && schData.overflowNumbers[0].overflowNumber && schData.overflowNumbers.length == 1 && schData.simultaneousRings === false) {
					hunt_type = 'Overflow';
				}

				if(schData.overflowNumbers && schData.overflowNumbers[0].overflowNumber && schData.overflowNumbers.length > 1 && schData.simultaneousRings === false) {
					hunt_type = 'Rollover';
				}

				var schDay = '';
				if(schData.days !== undefined && schData.fromTime!== undefined && schData.toTime!== undefined){
					schDay = schData.days[0].id+" "+schData.fromTime+" To "+schData.toTime;
				}
				var voicemail = schData.activateVoicemail === true ? 'Yes' : 'No';
				$scope.schedulerows += "<tr class='subrows"+index+"_"+index1+" datapoint1_"+index+"'>"+
											"<td class='subrows_"+$scope.dbfn.id+"' ></td>"+
											"<td class='subrows_"+$scope.dbfn.call_flow_name+"'> </td>"+
											"<td class='subrows_"+$scope.dbfn.phone_number+"'></td>"+
											"<td class='subrows_"+$scope.dbfn.type+"'>"+schDay+"</td>"+
											"<td class='subrows_"+$scope.dbfn.hunt_type+"'>"+hunt_type+"</td>"+
											"<td class='subrows_"+$scope.dbfn.ring_to+"'>"+schData.ringTo+"</td>"+
											"<td class='subrows_"+$scope.dbfn.ad_source+"'></td> "+
											"<td class='subrows_"+$scope.dbfn.custom_source1+"'></td> "+
											"<td class='subrows_"+$scope.dbfn.custom_source2+"'></td> "+
											"<td class='subrows_"+$scope.dbfn.custom_source3+"'></td> "+
											"<td class='subrows_"+$scope.dbfn.custom_source4+"'></td> "+
											"<td class='subrows_"+$scope.dbfn.custom_source5+"'></td> "+
											"<td class='subrows_"+$scope.dbfn.active+"'></td> "+
											"<td class='subrows_"+$scope.dbfn.group_name+"'></td> "+
											"<td class='subrows_"+$scope.dbfn.campaign_name+"'></td>"+
											"<td class='subrows_"+$scope.dbfn.dni+"'></td> "+
											"<td class='subrows_"+$scope.dbfn.host_domain+"'></td> "+
											"<td class='subrows_"+$scope.dbfn.referring_website+"'></td> "+
											"<td class='subrows_"+$scope.dbfn.html_class+"'></td>"+
											"<td class='subrows_"+$scope.dbfn.custom_params+"'></td>"+
											"<td class='subrows_"+$scope.dbfn.rc+"'></td>"+
											"<td class='subrows_"+$scope.dbfn.pd+"'></td>"+
											"<td class='subrows_"+$scope.dbfn.vp+"'></td>"+
											"<td class='subrows_"+$scope.dbfn.wm+"'></td>"+
											"<td class='subrows_"+$scope.dbfn.webhook_name+"'></td>"+
											//"<td class='subrows_"+$scope.dbfn.simultaneous_ring+"'></td>"+
											"<td class='subrows_"+$scope.dbfn.voicemail+"'>"+voicemail+"</td></tr>";
			});
			$("#rowdata_"+index+"_"+index1).after($compile($scope.schedulerows)($scope));
			$scope.checkVisible();
		};
		$scope.showSubData = function (index, routeableId, type) {
			if($(".subrows"+index).length > 0) {
				$(".subrows"+index).remove();
				if($(".datapoint1_"+index).length > 0) {
					$(".datapoint1_"+index).remove();
				}
				return false;
			}
			console.log(index, routeableId, type);
			$scope.subrows = '';

			if($scope.requestSent && $scope.old_routable_id === routeableId) {
				return false;
			}

			$scope.requestSent = true;
			$scope.old_routable_id = routeableId;
			CallFlowSettingsReportWebService.ivrSettings(routeableId).then(function (res) {
				function jsonIvrOption(arr) {
					var tree = [],
						mappedArr = {},
						arrElem,
						mappedElem;
					keypressArray = [];
					for (var i = 0, len = arr.length; i < len; i++) {
						arrElem = arr[i];
						mappedArr[arrElem.id] = arrElem;
						mappedArr[arrElem.id].keyPath = arrElem.key_press;
						mappedArr[arrElem.id].ivrActions = [];
					}
					for (var id in mappedArr) {
						if (mappedArr.hasOwnProperty(id)) {
							mappedElem = mappedArr[id];
							if (mappedElem.parentid) {
								mappedArr[mappedElem.parentid].ivrActions.push(mappedElem);
								mappedArr[mappedElem.parentid].keyPath = mappedArr[mappedElem.parentid].keyPath + ">" + mappedElem.key_press;
							}
							else {
								tree.push(mappedElem);
							}
						}
					}
					return tree;
				}
				$scope.requestSent = false;
				if (res.data.err === null || res.data.err === '') {
					if(type === 'IvrRoute2' && res.data.json.ivrs !== undefined) {
						res.data.json.ivrs.sort(function(a, b) {
							return a.value - b.value;
						});
						var data = jsonIvrOption(res.data.json.ivrs);
						data = _.sortBy(data, 'action_order');
						var ivrData = [];
                            for (var j = 0; j < data.length; j++) {
                                if (data[j].ivrActions.length > 0)
                                    for (var i = 0; i < data[j].ivrActions.length; i++) {
										var firstLevel = data[j].keyPath.split(">");
                                        if (data[j].ivrActions[i].ivrActions.length) {
                                            for (var k = 0; k < data[j].ivrActions[i].ivrActions.length; k++) {
												var ivrLevelData3 = {};						
												ivrLevelData3.isSchedule = false;
												var keyPathArray = data[j].ivrActions[i].keyPath.split(">");
                                                keyPathArray[0] = firstLevel[0] + ">" + keyPathArray[0] + ">" + data[j].ivrActions[i].ivrActions[k].keyPath;
												ivrLevelData3.keyPress = keyPathArray[0];
												ivrLevelData3.record_enabled = data[j].ivrActions[i].ivrActions[k].record_enabled === true ? 'Yes' : 'No';
												ivrLevelData3.message = (data[j].ivrActions[i].ivrActions[k].message && data[j].ivrActions[i].ivrActions[k].message.length > 1) ? 'Yes' : 'No';
												ivrLevelData3.simultaneousRings = data[j].ivrActions[i].ivrActions[k].simultaneous_ring === 1 ? 'Simultaneous Ring' : 'Hunting Rollover';
												ivrLevelData3.playDisclaimer = (ivrLevelData3.record_enabled === 'Yes') ? data[j].ivrActions[i].ivrActions[k].play_disclaimer : '';
												var ring_to_number3 = (data[j].ivrActions[i].ivrActions[k].target_did !== null && (data[j].ivrActions[i].ivrActions[k].target_did).indexOf('geo_route') > -1) ? res.data.json.call_flow.default_ringto : data[j].ivrActions[i].ivrActions[k].target_did;
												ivrLevelData3.ringToNumber =  (ring_to_number3 === 'hangup') ? 'Hang Up' : ring_to_number3;
												ivrLevelData3.voicemail = data[j].ivrActions[i].ivrActions[k].vm_enabled === true ? 'Yes' : 'No';
												if((data[j].ivrActions[i].ivrActions[k].target_did).indexOf('schedule_route') > -1){
													ivrLevelData3.scheduleRoute = JSON.stringify(data[j].ivrActions[i].ivrActions[k].scheduleRoute);
													ivrLevelData3.isSchedule = true;
													ivrLevelData3.voicemail = '';
												}
												ivrData.push(ivrLevelData3);
											}
                                        }else {
											var ivrLevelData2 = {};
											ivrLevelData2.isSchedule = false;
                                            firstLevel[0] = firstLevel[0] + ">" + data[j].ivrActions[i].keyPath;
											ivrLevelData2.keyPress = firstLevel[0];
											ivrLevelData2.record_enabled = data[j].ivrActions[i].record_enabled === true ? 'Yes' : 'No';
											ivrLevelData2.message = (data[j].ivrActions[i].message && data[j].ivrActions[i].message.length > 1) ? 'Yes' : 'No';
											ivrLevelData2.simultaneousRings = data[j].ivrActions[i].simultaneous_ring === 1 ? 'Simultaneous Ring' : 'Hunting Rollover';
											ivrLevelData2.playDisclaimer = (ivrLevelData2.record_enabled === 'Yes') ? data[j].ivrActions[i].play_disclaimer : '';
											var ring_to_number2 = (data[j].ivrActions[i].target_did !== null && (data[j].ivrActions[i].target_did).indexOf('geo_route') > -1) ? res.data.json.call_flow.default_ringto : data[j].ivrActions[i].target_did;
											ivrLevelData2.ringToNumber =  (ring_to_number2 === 'hangup') ? 'Hang Up' : ring_to_number2;
											ivrLevelData2.voicemail = data[j].ivrActions[i].vm_enabled === true ? 'Yes' : 'No';
											if((data[j].ivrActions[i].target_did).indexOf('schedule_route') > -1){
												ivrLevelData2.scheduleRoute = JSON.stringify(data[j].ivrActions[i].scheduleRoute);
												ivrLevelData2.isSchedule = true;
												ivrLevelData2.voicemail = '';
											}
											ivrData.push(ivrLevelData2);
										}
                                    }
                                else {
									var ivrLevelData1 = {};
									ivrLevelData1.isSchedule = false;
                                    var keyPathArray1 ;
									if (data[j].keyPath == undefined){
										keyPathArray1 = data[j].value;
										}else{
										keyPathArray1 = data[j].keyPath;
										}
									ivrLevelData1.keyPress = keyPathArray1;
									ivrLevelData1.record_enabled = data[j].record_enabled === true ? 'Yes' : 'No';
									ivrLevelData1.message = (data[j].message && data[j].message.length > 1) ? 'Yes' : 'No';
									ivrLevelData1.simultaneousRings = data[j].simultaneous_ring === 1 ? 'Simultaneous Ring' : 'Hunting Rollover';
									ivrLevelData1.playDisclaimer = (ivrLevelData1.record_enabled === 'Yes') ? data[j].play_disclaimer : '';
									var ring_to_number1 = (data[j].target_did !== null && (data[j].target_did).indexOf('geo_route') > -1) ? res.data.json.call_flow.default_ringto : data[j].target_did;
									ivrLevelData1.ringToNumber =  (ring_to_number1 === 'hangup') ? 'Hang Up' : ring_to_number1;
									ivrLevelData1.voicemail = data[j].vm_enabled === true ? 'Yes' : 'No';
									if((data[j].target_did).indexOf('schedule_route') > -1){
										ivrLevelData1.scheduleRoute = JSON.stringify(data[j].scheduleRoute);
										ivrLevelData1.isSchedule = true;
										ivrLevelData1.voicemail = '';
									}
									ivrData.push(ivrLevelData1);
                                }
							}
						ivrData.forEach(function (sbdata, index1) {
						$scope.subrows += "<tr class='subrows"+index+"' id='rowdata_"+index+"_"+index1+"'>"+
											"<td class='subrows_"+$scope.dbfn.id+"' ></td>"+
											"<td class='subrows_"+$scope.dbfn.call_flow_name+"'> </td>"+
											"<td class='subrows_"+$scope.dbfn.phone_number+"'></td>"+
											"<td class='subrows_"+$scope.dbfn.type+"'> Keypress: "+ sbdata.keyPress +" </td>"+
											"<td class='subrows_"+$scope.dbfn.hunt_type+"'></td>"+
											"<td class='subrows_"+$scope.dbfn.ring_to+"' ng-if='"+sbdata.isSchedule+" != true'>"+sbdata.ringToNumber+"</td>"+
											"<td class='subrows_"+$scope.dbfn.ring_to+"' ng-if='"+sbdata.isSchedule+" == true'><a ng-click='showScheduleData("+sbdata.scheduleRoute+","+index+","+index1+")'> View All </a></td>"+
											"<td class='subrows_"+$scope.dbfn.ad_source+"'></td> "+
											"<td class='subrows_"+$scope.dbfn.custom_source1+"'></td> "+
											"<td class='subrows_"+$scope.dbfn.custom_source2+"'></td> "+
											"<td class='subrows_"+$scope.dbfn.custom_source3+"'></td> "+
											"<td class='subrows_"+$scope.dbfn.custom_source4+"'></td> "+
											"<td class='subrows_"+$scope.dbfn.custom_source5+"'></td> "+
											"<td class='subrows_"+$scope.dbfn.active+"'></td> "+
											"<td class='subrows_"+$scope.dbfn.group_name+"'></td> "+
											"<td class='subrows_"+$scope.dbfn.campaign_name+"'></td>"+
											"<td class='subrows_"+$scope.dbfn.dni+"'></td> "+
											"<td class='subrows_"+$scope.dbfn.host_domain+"'></td> "+
											"<td class='subrows_"+$scope.dbfn.referring_website+"'></td> "+
											"<td class='subrows_"+$scope.dbfn.html_class+"'></td>"+
											"<td class='subrows_"+$scope.dbfn.custom_params+"'></td>"+
											"<td class='subrows_"+$scope.dbfn.rc+"'>"+ sbdata.record_enabled +"</td>"+
											"<td class='subrows_"+$scope.dbfn.pd+"'>"+ sbdata.playDisclaimer +"</td>"+
											"<td class='subrows_"+$scope.dbfn.vp+"'>"+ sbdata.message +"</td>"+
											"<td class='subrows_"+$scope.dbfn.wm+"'></td>"+
											"<td class='subrows_"+$scope.dbfn.webhook_name+"'></td>"+
											//"<td class='subrows_"+$scope.dbfn.simultaneous_ring+"'></td>"+
											"<td class='subrows_"+$scope.dbfn.voicemail+"'>"+sbdata.voicemail+"</td></tr>";
						});
					} else if(type === 'PercentageBasedRoute' && res.data.json.ringto_percentage !== undefined) {
						var ringToData = res.data.json.ringto_percentage;
						ringToData = _.sortBy(ringToData,'route_order');
						ringToData.forEach(function (sbdata) {
							var hunt_type = '';									
							if(sbdata.overflowNumbers && sbdata.overflowNumbers.length > 0 && sbdata.isSimultaneousRing === true) {
								hunt_type = 'Simultaneous';
							}
							if(sbdata.overflowNumbers && sbdata.overflowNumbers.length > 1 && sbdata.isSimultaneousRing === false) {
								hunt_type = 'Rollover';
							}

							if(sbdata.overflowNumbers && sbdata.overflowNumbers.length == 1 && sbdata.isSimultaneousRing === false) {
								hunt_type = 'Overflow';
							}
							var voicemail2 = sbdata.activateVoicemail === true ? 'Yes' : 'No';
						 $scope.subrows += "<tr class='subrows"+index+"'>"+
											"<td class='subrows_"+$scope.dbfn.id+"' ></td>"+
											"<td class='subrows_"+$scope.dbfn.call_flow_name+"'> </td>"+
											"<td class='subrows_"+$scope.dbfn.phone_number+"'></td>"+
											"<td class='subrows_"+$scope.dbfn.type+"'>"+sbdata.percentage+" % </td>"+
											"<td class='subrows_"+$scope.dbfn.hunt_type+"'>"+hunt_type+"</td>"+
											"<td class='subrows_"+$scope.dbfn.ring_to+"'>"+sbdata.ringToNum+"</td>"+
											"<td class='subrows_"+$scope.dbfn.ad_source+"'></td> "+
											"<td class='subrows_"+$scope.dbfn.custom_source1+"'></td> "+
											"<td class='subrows_"+$scope.dbfn.custom_source2+"'></td> "+
											"<td class='subrows_"+$scope.dbfn.custom_source3+"'></td> "+
											"<td class='subrows_"+$scope.dbfn.custom_source4+"'></td> "+
											"<td class='subrows_"+$scope.dbfn.custom_source5+"'></td> "+
											"<td class='subrows_"+$scope.dbfn.active+"'></td> "+
											"<td class='subrows_"+$scope.dbfn.group_name+"'></td> "+
											"<td class='subrows_"+$scope.dbfn.campaign_name+"'></td>"+
											"<td class='subrows_"+$scope.dbfn.dni+"'></td> "+
											"<td class='subrows_"+$scope.dbfn.host_domain+"'></td> "+
											"<td class='subrows_"+$scope.dbfn.referring_website+"'></td> "+
											"<td class='subrows_"+$scope.dbfn.html_class+"'></td>"+
											"<td class='subrows_"+$scope.dbfn.custom_params+"'></td>"+
											"<td class='subrows_"+$scope.dbfn.rc+"'></td>"+
											"<td class='subrows_"+$scope.dbfn.pd+"'></td>"+
											"<td class='subrows_"+$scope.dbfn.vp+"'></td>"+
											"<td class='subrows_"+$scope.dbfn.wm+"'></td>"+
											"<td class='subrows_"+$scope.dbfn.webhook_name+"'></td>"+
											//"<td class='subrows_"+$scope.dbfn.simultaneous_ring+"'></td>"+
											"<td class='subrows_"+$scope.dbfn.voicemail+"'>"+voicemail2+"</td></tr>";
											
						});
					} else if(type === 'ScheduleRoute' && res.data.json.schedule !== undefined) {
						var schData = res.data.json.schedule;
						var default_ringtonum = res.data.json.schedule.default_ringto;
						var default_vm = res.data.json.schedule.vm_enabled;
							schData.schedule.push({
								'activateVoicemail': default_vm,
								'ringTo': default_ringtonum
							});

							

						schData.schedule.forEach(function (schData) {
							var hunt_type = '';									
							if(schData.overflowNumbers && schData.overflowNumbers[0].overflowNumber && schData.overflowNumbers.length > 0 && schData.simultaneousRings === true) {
								hunt_type = 'Simultaneous';
							}
							if(schData.overflowNumbers && schData.overflowNumbers[0].overflowNumber && schData.overflowNumbers.length == 1 && schData.simultaneousRings === false) {
								hunt_type = 'Overflow';
							}

							if(schData.overflowNumbers && schData.overflowNumbers[0].overflowNumber && schData.overflowNumbers.length > 1 && schData.simultaneousRings === false) {
								hunt_type = 'Rollover';
							}

							var schDay = '';
							if(schData.days !== undefined && schData.fromTime!== undefined && schData.toTime!== undefined){
								schDay = schData.days[0].id+" "+schData.fromTime+" To "+schData.toTime;
							}
							var voicemail1 = schData.activateVoicemail === true ? 'Yes' : 'No'; 
						 $scope.subrows += "<tr class='subrows"+index+"'>"+
											"<td class='subrows_"+$scope.dbfn.id+"' ></td>"+
											"<td class='subrows_"+$scope.dbfn.call_flow_name+"'> </td>"+
											"<td class='subrows_"+$scope.dbfn.phone_number+"'></td>"+
											"<td class='subrows_"+$scope.dbfn.type+"'>"+schDay+"</td>"+
											"<td class='subrows_"+$scope.dbfn.hunt_type+"'>"+hunt_type+"</td>"+
											"<td class='subrows_"+$scope.dbfn.ring_to+"'>"+schData.ringTo+"</td>"+
											"<td class='subrows_"+$scope.dbfn.ad_source+"'></td> "+
											"<td class='subrows_"+$scope.dbfn.custom_source1+"'></td> "+
											"<td class='subrows_"+$scope.dbfn.custom_source2+"'></td> "+
											"<td class='subrows_"+$scope.dbfn.custom_source3+"'></td> "+
											"<td class='subrows_"+$scope.dbfn.custom_source4+"'></td> "+
											"<td class='subrows_"+$scope.dbfn.custom_source5+"'></td> "+
											"<td class='subrows_"+$scope.dbfn.active+"'></td> "+
											"<td class='subrows_"+$scope.dbfn.group_name+"'></td> "+
											"<td class='subrows_"+$scope.dbfn.campaign_name+"'></td>"+
											"<td class='subrows_"+$scope.dbfn.dni+"'></td> "+
											"<td class='subrows_"+$scope.dbfn.host_domain+"'></td> "+
											"<td class='subrows_"+$scope.dbfn.referring_website+"'></td> "+
											"<td class='subrows_"+$scope.dbfn.html_class+"'></td>"+
											"<td class='subrows_"+$scope.dbfn.custom_params+"'></td>"+
											"<td class='subrows_"+$scope.dbfn.rc+"'></td>"+
											"<td class='subrows_"+$scope.dbfn.pd+"'></td>"+
											"<td class='subrows_"+$scope.dbfn.vp+"'></td>"+
											"<td class='subrows_"+$scope.dbfn.wm+"'></td>"+
											"<td class='subrows_"+$scope.dbfn.webhook_name+"'></td>"+
											//"<td class='subrows_"+$scope.dbfn.simultaneous_ring+"'></td>"+
											"<td class='subrows_"+$scope.dbfn.voicemail+"'>"+voicemail1+"</td></tr>";
											
						});
					}else {
						$scope.subrows += "<tr class='subrows"+index+"'><td colspan='18'> No data found</td></tr>";
					}
				}
				$("#rowdataitem"+index).after($compile($scope.subrows)($scope));
				$scope.checkVisible();
			});
		};


		// the indices order of these is important to the call_flow_settings_table.html directive template
		//so it can efficiently check if a column is supposed to be visible
		$scope.visibleColumnsIndicies = {};
		$scope.visibleColumnsIndicies[$scope.dbfn.id] = 0;
		$scope.visibleColumnsIndicies[$scope.dbfn.call_flow_name] = 1 ;
		$scope.visibleColumnsIndicies[$scope.dbfn.phone_number] = 2;
		$scope.visibleColumnsIndicies[$scope.dbfn.type] = 3;
		$scope.visibleColumnsIndicies[$scope.dbfn.hunt_type] = 4;
		$scope.visibleColumnsIndicies[$scope.dbfn.ring_to] = 5 ;
		$scope.visibleColumnsIndicies[$scope.dbfn.ad_source] = 6 ;
		$scope.visibleColumnsIndicies[$scope.dbfn.custom_source1] = 7 ;
		$scope.visibleColumnsIndicies[$scope.dbfn.custom_source2] = 8 ;
		$scope.visibleColumnsIndicies[$scope.dbfn.custom_source3] = 9 ;
		$scope.visibleColumnsIndicies[$scope.dbfn.custom_source4] = 10 ;
		$scope.visibleColumnsIndicies[$scope.dbfn.custom_source5] = 11 ;
		$scope.visibleColumnsIndicies[$scope.dbfn.active] = 12;
		$scope.visibleColumnsIndicies[$scope.dbfn.group_name] = 13 ;
		$scope.visibleColumnsIndicies[$scope.dbfn.campaign_name] = 14 ;
		$scope.visibleColumnsIndicies[$scope.dbfn.dni] = 15;
		$scope.visibleColumnsIndicies[$scope.dbfn.instant_insights] = 16;
		$scope.visibleColumnsIndicies[$scope.dbfn.instant_insights_config] = 17;
		$scope.visibleColumnsIndicies[$scope.dbfn.host_domain] = 18 ;
		$scope.visibleColumnsIndicies[$scope.dbfn.referring_website] = 19 ;
		$scope.visibleColumnsIndicies[$scope.dbfn.html_class] = 20;
		$scope.visibleColumnsIndicies[$scope.dbfn.custom_params] = 21;
		$scope.visibleColumnsIndicies[$scope.dbfn.rc] = 22;
		$scope.visibleColumnsIndicies[$scope.dbfn.pd] = 23;
		$scope.visibleColumnsIndicies[$scope.dbfn.vp] = 24;
		$scope.visibleColumnsIndicies[$scope.dbfn.wm] = 25;
		$scope.visibleColumnsIndicies[$scope.dbfn.webhook_name] = 26;
		$scope.visibleColumnsIndicies[$scope.dbfn.voicemail] = 27;
		//$scope.visibleColumnsIndicies[$scope.dbfn.simultaneous_ring] = 24;

		//$scope.visibleColumnsIndicies[$scope.dbfn.ca] = 18;

		// if an object is used to place these values it will not maintain order
		// in the directive table. Therefore an array is necessary
		// but to check the visible value efficiently a supplementary array was necessary
		// to check visibility (using $scope.visibleColumnsIndicies)
		// could be using Array.push here, but because the index is important, it's easier to not be confused later if we
		// manually set it to the index
		$scope.visibleColumns = [];
		$scope.visibleColumns[$scope.visibleColumnsIndicies[$scope.dbfn.id]]                = { truncate:false, visible: true, label: "ID",                    col: $scope.dbfn.id, show: true };
		$scope.visibleColumns[$scope.visibleColumnsIndicies[$scope.dbfn.call_flow_name]]    = { truncate:false, visible: true, label: "Tracking Number Name" ,       col: $scope.dbfn.call_flow_name, show: true };
		$scope.visibleColumns[$scope.visibleColumnsIndicies[$scope.dbfn.phone_number]]      = { truncate:false, visible: true, label: "Tracking Number" ,         col: $scope.dbfn.phone_number, show: true };
		$scope.visibleColumns[$scope.visibleColumnsIndicies[$scope.dbfn.type]]              = { truncate:false, visible: true, label: "Type" ,                 col: $scope.dbfn.type, show: true};
		$scope.visibleColumns[$scope.visibleColumnsIndicies[$scope.dbfn.hunt_type]]         = { truncate:false, visible: csVisible, label: "Hunt Type" ,       col: $scope.dbfn.hunt_type, show: ($rootScope.is_migrated ==='true' || $rootScope.is_migrated ===true) ? true : false};
		$scope.visibleColumns[$scope.visibleColumnsIndicies[$scope.dbfn.ring_to]]           = { truncate:false, visible: true, label: "Ring-to Phone Number" ,              col: $scope.dbfn.ring_to, show: true };
		$scope.visibleColumns[$scope.visibleColumnsIndicies[$scope.dbfn.ad_source]]         = { truncate:false, visible: true, label: "Ad Source" ,            col: $scope.dbfn.ad_source, show: true };
		$scope.visibleColumns[$scope.visibleColumnsIndicies[$scope.dbfn.custom_source1]]     = { truncate:false, visible: csVisible, label: "Custom Source 1" ,        col: $scope.dbfn.custom_source1, show: true };
		$scope.visibleColumns[$scope.visibleColumnsIndicies[$scope.dbfn.custom_source2]]     = { truncate:false, visible: csVisible, label: "Custom Source 2" ,        col: $scope.dbfn.custom_source2, show: true };
		$scope.visibleColumns[$scope.visibleColumnsIndicies[$scope.dbfn.custom_source3]]     = { truncate:false, visible: csVisible, label: "Custom Source 3" ,        col: $scope.dbfn.custom_source3, show: true };
		$scope.visibleColumns[$scope.visibleColumnsIndicies[$scope.dbfn.custom_source4]]     = { truncate:false, visible: csVisible, label: "Custom Source 4" ,        col: $scope.dbfn.custom_source4, show: true };
		$scope.visibleColumns[$scope.visibleColumnsIndicies[$scope.dbfn.custom_source5]]     = { truncate:false, visible: csVisible, label: "Custom Source 5" ,        col: $scope.dbfn.custom_source5, show: true };

		$scope.visibleColumns[$scope.visibleColumnsIndicies[$scope.dbfn.active]]            = { truncate:false, visible: true, label: "Status",                col: $scope.dbfn.active, show: true };
		$scope.visibleColumns[$scope.visibleColumnsIndicies[$scope.dbfn.group_name]]        = { truncate:false, visible: true, label: "Group Name",            col: $scope.dbfn.group_name, show: true };
		$scope.visibleColumns[$scope.visibleColumnsIndicies[$scope.dbfn.campaign_name]]     = { truncate:false, visible: true, label: "Campaign name",         col: $scope.dbfn.campaign_name, show: true };
		$scope.visibleColumns[$scope.visibleColumnsIndicies[$scope.dbfn.dni]]               = { truncate:false, visible: true, label: "DNI",                   col: $scope.dbfn.dni, show: true };
		$scope.visibleColumns[$scope.visibleColumnsIndicies[$scope.dbfn.instant_insights]]  = { truncate:false, visible: false, label: "Instant Insights",         col: $scope.dbfn.instant_insights, show: ($rootScope.is_migrated ==='true' || $rootScope.is_migrated ===true) ? true : false};
		$scope.visibleColumns[$scope.visibleColumnsIndicies[$scope.dbfn.instant_insights_config]]  = { truncate:false, visible: false, label: "Instant Insights Config",         col: $scope.dbfn.instant_insights_config, show: ($rootScope.is_migrated ==='true' || $rootScope.is_migrated ===true) ? true : false};
		$scope.visibleColumns[$scope.visibleColumnsIndicies[$scope.dbfn.host_domain]]       = { truncate:false, visible: false, label: "Host Domain",           col: $scope.dbfn.host_domain, show: true };
		$scope.visibleColumns[$scope.visibleColumnsIndicies[$scope.dbfn.referring_website]] = { truncate:false, visible: false, label: "Referring Website",     col: $scope.dbfn.referring_website, show: true };
		$scope.visibleColumns[$scope.visibleColumnsIndicies[$scope.dbfn.html_class]]        = { truncate:false, visible: false, label: "HTML Class",            col: $scope.dbfn.html_class, show: true };
		$scope.visibleColumns[$scope.visibleColumnsIndicies[$scope.dbfn.custom_params]]     = { truncate:false, visible: false, label: "Custom Params",         col: $scope.dbfn.custom_params, show: true };
		$scope.visibleColumns[$scope.visibleColumnsIndicies[$scope.dbfn.rc]]                = { truncate:true, visible: true, label: "Record Call",            col: $scope.dbfn.rc, show: true };
		$scope.visibleColumns[$scope.visibleColumnsIndicies[$scope.dbfn.pd]]                = { truncate:true, visible: true, label: "Play Disclaimer",        col: $scope.dbfn.pd, show: true };
		$scope.visibleColumns[$scope.visibleColumnsIndicies[$scope.dbfn.vp]]                = { truncate:true, visible: true, label: "Voice Prompt",           col: $scope.dbfn.vp, show: true };
		$scope.visibleColumns[$scope.visibleColumnsIndicies[$scope.dbfn.wm]]                = { truncate:true, visible: true, label: "Whisper Message",        col: $scope.dbfn.wm, show: true };
		$scope.visibleColumns[$scope.visibleColumnsIndicies[$scope.dbfn.webhook_name]]      = { truncate:true, visible: csVisible, label: "Pre-Call Webhook",  col: $scope.dbfn.webhook_name, show: true };
		$scope.visibleColumns[$scope.visibleColumnsIndicies[$scope.dbfn.voicemail]]         = { truncate:true, visible: csVisible, label: "Voicemail",         col: $scope.dbfn.voicemail, show: ($rootScope.is_migrated ==='true' || $rootScope.is_migrated ===true) ? true : false};
		//$scope.visibleColumns[$scope.visibleColumnsIndicies[$scope.dbfn.simultaneous_ring]]                = { truncate:true, visible: csVisible, label: "Hunt Types",        col: $scope.dbfn.simultaneous_ring };
		//$scope.visibleColumns[$scope.visibleColumnsIndicies[$scope.dbfn.ca]]                = { truncate:false, visible: true,  label: "CA" ,               col: $scope.dbfn.ca };




		// it helps when all of the first ones are "eq
		$scope.filterTypes = {
			inputNumber:     { comparativeOperators: [new ComparativeOperator("eq", filterHelper.comparitiveOperatorsHash.eq), new ComparativeOperator("gt", filterHelper.comparitiveOperatorsHash.gt), new ComparativeOperator("lt", filterHelper.comparitiveOperatorsHash.lt)], fieldType: "input" },
			inputText:       { comparativeOperators: [new ComparativeOperator("eq", filterHelper.comparitiveOperatorsHash.eq), new ComparativeOperator("contains", filterHelper.comparitiveOperatorsHash.contains)], fieldType: "input" },
			inputTextNumber: { comparativeOperators: [new ComparativeOperator("eq", filterHelper.comparitiveOperatorsHash.eq), new ComparativeOperator("contains", filterHelper.comparitiveOperatorsHash.contains)], fieldType: "input" },
			dropdown:        { comparativeOperators: [new ComparativeOperator("eq", filterHelper.comparitiveOperatorsHash.eq)], fieldType: "dropdown"},
		};


		$scope.columnDefinitions = [
			new Column("ID",                $scope.dbfn.id,                "inputNumber"),
			new Column("Tracking Number Name",    $scope.dbfn.call_flow_name,    "inputText"),
			new Column("Tracking Number",      $scope.dbfn.phone_number,      "inputText"),
			new Column("Type",              $scope.dbfn.type,              "dropdown", convertHashIntoAssArray({"SimpleRoute":"Simple", "tollfree":"TollFree", "Geo Route":"Geo Route", "IvrRoute2":"IVR", "PercentageBasedRoute":"Percentage","ScheduleRoute":"Schedule", "hangup":"Hang Up", "number_pool":"Number Pool" , "OutboundRoute":"Outbound"})),
			new Column("Hunt Type",          $scope.dbfn.hunt_type,        "dropdown", convertHashIntoAssArray({"simultaneous":"Hunt: Simultaneous Ring", "rollover":"Hunt: Rollover","overflow":"Hunt: Overflow"})),
			//new Column("Pool Qty",          dbfn.pool_quantity,     "inputNumber"), // removed
			new Column("Ring-to Phone Number",           $scope.dbfn.ring_to,           "inputTextNumber"),
			new Column("Ad Source",         $scope.dbfn.ad_source,         "inputText"),
			new Column("Custom Source 1",     $scope.dbfn.custom_source1,     "inputText"),
			new Column("Custom Source 2",     $scope.dbfn.custom_source2,     "inputText"),
			new Column("Custom Source 3",     $scope.dbfn.custom_source3,     "inputText"),
			new Column("Custom Source 4",     $scope.dbfn.custom_source4,     "inputText"),
			new Column("Custom Source 5",     $scope.dbfn.custom_source5,     "inputText"),
			new Column("Status",            $scope.dbfn.active,            "dropdown", convertHashIntoAssArray({"active":"Active", "inactive":"Inactive"})),
			// new Column("Group Name",        $scope.dbfn.group_name,        "inputText"),
			new Column("Group Name",        $scope.dbfn.group_id,        "dropdown", {}),
			new Column("Campaign Name",     $scope.dbfn.campaign_name,     "inputText"),
			new Column("DNI",               $scope.dbfn.dni,               "dropdown", convertHashIntoAssArray({"source":"source", "session":"session","url":"url"})),
			new Column("Instant Insights",  $scope.dbfn.instant_insights,  "inputText"),
			new Column("Instant Insights Config",  $scope.dbfn.instant_insights_config,  "inputText"),
			new Column("Host Domain",       $scope.dbfn.host_domain,       "inputText"),
			new Column("Referring Website", $scope.dbfn.referring_website, "inputText"),
			new Column("HTML Class",        $scope.dbfn.html_class,        "inputText"),
			new Column("Custom Parameters", $scope.dbfn.custom_params,     "inputText"),
			new Column("RC",                $scope.dbfn.rc,                "dropdown", convertHashIntoAssArray({"1":"Yes", "0":"No"})),
			new Column("PD",                $scope.dbfn.pd,                "dropdown", convertHashIntoAssArray({"before":"Before", "never":"Never", "after":"After"})),
			new Column("VP",                $scope.dbfn.vp,                "dropdown", convertHashIntoAssArray({"1":"Yes", "0":"No"})),
			new Column("WM",                $scope.dbfn.wm,                "dropdown", convertHashIntoAssArray({"1":"Yes", "0":"No"})),
			new Column("Pre-Call Webhook",     $scope.dbfn.webhook_name,     "inputText"),
			new Column("Voicemail",         $scope.dbfn.voicemail,         "dropdown", convertHashIntoAssArray({"1":"Yes", "0":"No"}))
			//new Column("CA",                dbfn.ca,                "dropdown", ["yes", "no"]), // removed
		];

		function convertHashIntoAssArray(hash) {
			var assArray = [];
			_.map(hash, function(val,key){
				var tHash = {};
				tHash.key = key;
				tHash.value = val;
				assArray.push(tHash);
			});
			return assArray;
		}
		// returns - array of error messages, returns an empty array if no errors
		$scope.validateAdvFilters = function (advFilters) {
			var errorMessages = [];
			// Make sure number types are numbers, and dropbox values match a value according to their dropboxes
			var numberTypesAreNumbers = _.every(advFilters, function (af) {
				var columnDefinition = _.find($scope.columnDefinitions, function (cd) {
					return cd.fieldName === af.column;
				});
				// added new filter for id as id is integer type and cannot be more than 4 byte.
				if(columnDefinition.display === 'ID' && parseInt(af.text) > 9999) {
					errorMessages.push("Please enter valid ID.");
				}

				if (columnDefinition.filterType === "inputNumber" || columnDefinition.filterType === "inputTextNumber") {
					// isNaN thinks null is a valid number type, so we have to check against that
					// separately, as well as check against array types, which it also thinks is a number
					return !isNaN(af.text) && af.text !== null && !Array.isArray(af.text);
				} else {
					return true;
				}

			});
			if (!numberTypesAreNumbers) {
				errorMessages.push("You're giving a non-numerical input to a field that requires a number.");
			}
			return errorMessages;
		};


		/*checkForFilterID(function(filterIdCheck){
			if(filterHelper.reportSpecficAdvancedFilter($scope.filterData).length > 0){
				$scope.getErrorsAndAdvFilters("", filterHelper.reportSpecficAdvancedFilter($scope.filterData));
			}else if(filterHelper.reportSpecficBasicFilter($scope.filterData).length > 0){
				$scope.simpleSearchFilter = filterHelper.reportSpecficBasicFilter($scope.filterData);
				$scope.validateSimpleTextFilter();
			}else{
				$scope.loadReportData($scope.filter);
			}
		});
		/*
		* headerNames will be whats at the headers in the CSV/TSV, however
		* the headerNames dont need to match up to the key value pairs in the
		* array of objects returned. However, the order in which key values
		 * are set to need to align with the indices of the headerNames
		 *
		*
		* */
		$scope.getCSVData = function (formate) {
			var filter = $scope.filter;
			$scope.urlParams.limit = 50000;
			$scope.urlParams.exportData = true;
			var rowsOfData = [];
			if($scope.is_migrated === true || $scope.is_migrated === 'true'){
				$scope.headerNames = ["ID", "Tracking Number Name", "Tracking Number", "Type", "Keypress","Day And Time","%","Ring-to","Source", "Custom Source 1", "Custom Source 2", "Custom Source 3", "Custom Source 4", "Custom Source 5", "Medium", "Status", "Group Name", "Campaign Name", "DNI Type", "Instant Insights", "Instant Insight Config", "Host Domain", "Referring Website", "HTML Class", "Custom Parameters", "RC", "PD", "VP", "WM", "Pre-Call Webhook", "Hunt Type", "Voicemail"];
			}else{
				$scope.headerNames = ["ID", "Tracking Number Name", "Tracking Number", "Type", "Keypress","Day And Time","%","Ring-to","Source", "Custom Source 1", "Custom Source 2", "Custom Source 3", "Custom Source 4", "Custom Source 5", "Medium", "Status", "Group Name", "Campaign Name", "DNI Type", "Host Domain", "Referring Website", "HTML Class", "Custom Parameters", "RC", "PD", "VP", "WM", "Pre-Call Webhook"];
			}
			//$scope.headerNames = ["'ID", "Tracking Number Name", "Tracking Number", "Type", "Keypress","Day And Time","%","Ring-to","Source", "Custom Source 1", "Custom Source 2", "Custom Source 3", "Custom Source 4", "Custom Source 5", "Medium", "Status", "Group Name", "Campaign Name", "DNI", "Host Domain", "Referring Website", "HTML Class", "Custom Parameters", "RC", "PD", "VP", "WM", "Pre-Call Webhook", "Hunt Type", "Voicemail"];

			var deferred = $q.defer();
			CallFlowSettingsReportWebService.getDataTableInfo($scope.urlParams).success(success).error(error);
			function success(res) {
				if (res.result !== "success") {
					console.log("Error in ", "CallFlowSettingsReportWebService.getDataTableInfo SUCCESS callback");
				}
				rowsOfData = finalizaDataToExport(res.json.dataset);

				// Only use columns which are visible
				// New array objects with keys set in same order of $scope.headerNames label values (it doesnt matter if the key
				// values actually match. Just the order of being set)
				/*_.each(rowsOfData, function (row, index, arr) {
					var newRow = {};
					// look at row object. return a new object with correct ordering of keys
					_.each(columnsToUse, function (ctu) {
						newRow[ctu.label] = row[ctu.col];
					});
					arr[index] = newRow;
					//console.log("newRow:",newRow);
				});*/
					deferred.resolve(rowsOfData);
					if($rootScope.isSafari){
					 var reportName = "csv_callflowSettingsReport";
					 if(formate === 'tsv'){ reportName = "tsv_callflowSettingsReport";}
					 deferred.resolve(JSONToCSVConvertor(rowsOfData,reportName,true,formate));
				 }
			}
			function error(res) {
				if (res.data.error) {
					console.log("Error in ", "CallFlowSettingsReportWebService.getDataTableInfo ERROR callback");
				}
			}

			if(!$rootScope.isSafari){
			    return deferred.promise;
			}
		};

		$scope.getCSVDataReports = function () {
			var filter = $scope.filter;
			var rowsOfData = [];
			if($scope.is_migrated === true || $scope.is_migrated === 'true'){
				$scope.csvHeaderNames = ["ID", "Tracking Number Name", "Tracking Number", "Type", "Keypress","Day And Time","%","Ring-to","Source", "Custom Source 1", "Custom Source 2", "Custom Source 3", "Custom Source 4", "Custom Source 5", "Medium", "Status", "Group Name", "Campaign Name", "DNI", "Instant Insights", "Instant Insights Config", "Host Domain", "Referring Website", "HTML Class", "Custom Parameters", "RC", "PD", "VP", "WM", "Pre-Call Webhook", "Hunt Type", "Voicemail"];
			}else{
				$scope.csvHeaderNames = ["ID", "Tracking Number Name", "Tracking Number", "Type", "Keypress","Day And Time","%","Ring-to","Source", "Custom Source 1", "Custom Source 2", "Custom Source 3", "Custom Source 4", "Custom Source 5", "Medium", "Status", "Group Name", "Campaign Name", "DNI", "Host Domain", "Referring Website", "HTML Class", "Custom Parameters", "RC", "PD", "VP", "WM", "Pre-Call Webhook"];
			}
			

			$scope.urlParams.limit = 50000;
			$scope.urlParams.exportData = true;
			var deferred = $q.defer();
			CallFlowSettingsReportWebService.getDataTableInfo($scope.urlParams).success(success).error(error);
			function success(res) {
				if (res.result !== "success") {
					console.log("Error in ", "CallFlowSettingsReportWebService.getDataTableInfo SUCCESS callback");
				}
				rowsOfData = finalizaDataToExport(res.json.dataset);
				deferred.resolve(rowsOfData);
				$scope.csvDataScheduleReport = rowsOfData;

			}
			function error(res) {
				if (res.error) {
					console.log("Error in ", "CallFlowSettingsReportWebService.getDataTableInfo ERROR callback");
				}
			}

			return deferred.promise;
		};
		$scope.getExcelData = function () {
			$scope.limit = 100000;
			$scope.applyFilterParams();
			var filter = $scope.filter;
			$scope.exportData = true;
			var rowsOfData = [];
			if($scope.is_migrated === true || $scope.is_migrated === 'true'){
				$scope.headerNames = ["ID", "Tracking Number Name", "Tracking Number", "Type", "Keypress","Day And Time","%","Ring-to","Source", "Custom Source 1", "Custom Source 2", "Custom Source 3", "Custom Source 4", "Custom Source 5", "Medium", "Status", "Group Name", "Campaign Name", "DNI", "Instant Insights", "Instant Insights Config", "Host Domain", "Referring Website", "HTML Class", "Custom Parameters", "RC", "PD", "VP", "WM", "Pre-Call Webhook", "Hunt Type", "Voicemail"];
			}else{
				$scope.headerNames = ["ID", "Tracking Number Name", "Tracking Number", "Type", "Keypress","Day And Time","%","Ring-to","Source", "Custom Source 1", "Custom Source 2", "Custom Source 3", "Custom Source 4", "Custom Source 5", "Medium", "Status", "Group Name", "Campaign Name", "DNI", "Host Domain", "Referring Website", "HTML Class", "Custom Parameters", "RC", "PD", "VP", "WM", "Pre-Call Webhook"];
			}
		//	$scope.headerNames = ["ID", "Tracking Number Name", "Tracking Number", "Type", "Keypress","Day And Time","%","Ring-to","Source", "Custom Source 1","Custom Source 2","Custom Source 3","Custom Source 4","Custom Source 5", "Medium", "Status", "Group Name", "Campaign Name", "DNI", "Host Domain", "Referring Website", "HTML Class", "Custom Parameters", "RC", "PD", "VP", "WM", "Pre-Call Webhook", "Hunt Type", "Voicemail"];

			var deferred = $q.defer();
			CallFlowSettingsReportWebService.getDataTableInfo($scope.urlParams).success(success).error(error);
			function success(res) {
				if (res.result !== "success") {
					console.log("Error in ", "CallFlowSettingsReportWebService.getDataTableInfo SUCCESS callback");
				}
				rowsOfData = finalizaDataToExport(res.json.dataset);

				alasql('SELECT * INTO XLSX("xls_data_table.xlsx",{sheetid:"Sheet name",headers:true}) FROM ?',[rowsOfData]);
				deferred.resolve();
			}
			function error(res) {
				if (res.data.error) {
					console.log("Error in ", "CallFlowSettingsReportWebService.getDataTableInfo ERROR callback");
				}
			}
		   return deferred.promise;
		};

		$scope.getCSVData_old = function () {
			// TODO - remove this mock data and use data from backend when it's available
			var rowsOfData =  [{}, {}, {}];
			rowsOfData[0][$scope.dbfn.id] = 1;
			rowsOfData[0][$scope.dbfn.call_flow_name] = "Happy Bar and Grill";
			rowsOfData[0][$scope.dbfn.phone_number] = "123-123-1234";
			rowsOfData[0][$scope.dbfn.type] = "IRA";
		    rowsOfData[0][$scope.dbfn.ring_to] = "VIEW ALL LINK"; // is ring to numnber going to be an array of numbers?
			rowsOfData[0][$scope.dbfn.ad_source] = "Chipotle";
			rowsOfData[0][$scope.dbfn.active] = 1; // 0 false, 1 true
			rowsOfData[0][$scope.dbfn.group_name] = "Hannibal Lecter";
			rowsOfData[0][$scope.dbfn.campaign_name] = "Fish and Pastries";
			rowsOfData[0][$scope.dbfn.dni] = "what goes here?";
			rowsOfData[0][$scope.dbfn.host_domain] = "google.com";
			rowsOfData[0][$scope.dbfn.referring_website] = "www.bing.com/porkchops";
			rowsOfData[0][$scope.dbfn.html_class] = "right_hurr";
			rowsOfData[0][$scope.dbfn.custom_params] = "q=10,aaa=56"; // what goes here?
			rowsOfData[0][$scope.dbfn.rc] = "happy day what!?"; // what goes here?
			rowsOfData[0][$scope.dbfn.pd] = "happy day what!?"; // what goes here?
			rowsOfData[0][$scope.dbfn.vp] = 0; // what goes here?
			rowsOfData[0][$scope.dbfn.wm] = 1; // what goes here?
			//rowsOfData[0][$scope.dbfn.ca] = "var"; // what goes here?

			rowsOfData[1][$scope.dbfn.id] = 22;
			rowsOfData[1][$scope.dbfn.call_flow_name] = "Happy Bar and Grill22";
			rowsOfData[1][$scope.dbfn.phone_number] = "123-123-1234";
			rowsOfData[1][$scope.dbfn.type] = "IVR22";
			rowsOfData[1][$scope.dbfn.ring_to] = "VIEW22 ALL LINK2"; // is ring to numnber going to be an array of numbers?
			rowsOfData[1][$scope.dbfn.ad_source] = "Chip22otle22";
			rowsOfData[1][$scope.dbfn.active] = 1; // 0 false, 1 true
			rowsOfData[1][$scope.dbfn.group_name] = "Hannib22al Lecterzz2";
			rowsOfData[1][$scope.dbfn.campaign_name] = "Fi22sh and GAGAH";
			rowsOfData[1][$scope.dbfn.dni] = "what goes here?";
			rowsOfData[1][$scope.dbfn.host_domain] = "google.com";
			rowsOfData[1][$scope.dbfn.referring_website] = "www.bing.com/porkchops";
			rowsOfData[1][$scope.dbfn.html_class] = "right_hurr";
			rowsOfData[1][$scope.dbfn.custom_params] = "q=10,aaa=56"; // what goes here?
			rowsOfData[1][$scope.dbfn.rc] = "happy 22day what!?"; // what goes here?
			rowsOfData[1][$scope.dbfn.pd] = "happy 22day what!?"; // what goes here?
			rowsOfData[1][$scope.dbfn.vp] = 1; // what goes here?
			rowsOfData[1][$scope.dbfn.wm] = 0; // what goes here?
			//rowsOfData[1][$scope.dbfn.ca] = 1; // what goes here?


			var columnsToUse = _.filter($scope.visibleColumns, function (vc) { return vc.visible; }) ;// Keep visible column objects
			$scope.headerNames = _.map(columnsToUse, function (ctu) { return ctu.label; }); // Grab visible columns' labels

			// Only use columns which are visible
			// New array objects with keys set in same order of $scope.headerNames label values (it doesnt matter if the key
			// values actually match. Just the order of being set)
			_.each(rowsOfData, function (row, index, arr) {
				var newRow = {};
				// look at row object. return a new object with correct ordering of keys
				_.each(columnsToUse, function (ctu) {
					newRow[ctu.label] = row[ctu.col];
				});
				arr[index] = newRow;
			});

			console.log(rowsOfData);
			return rowsOfData;
		};
		finalizaDataToExport = function(rawData) {
			console.log("datata:",rawData);
			var rowsOfData = [];
			var provisioned_route_ids = [];
			var schedule_target_did = [];
			if($rootScope.is_migrated === true || $rootScope.is_migrated === 'true'){
				$scope.is_migrated = true;
		}else{
				$scope.is_migrated = false;
		}
			_.each(rawData, function (data) {
				var addSource = [null, null];
				if(data.cat_combo !== '' && data.cat_combo && data.cat_combo) {
					addSource = data.cat_combo.split(":");
				}
				if(data.instant_insights == true){
					data.instant_insights = 'Yes';
				}else{
					data.instant_insights = 'No';
				}
				var rc = (data.record_call == 'Yes') ? 'Yes' : 'No';
				var pd = data.play_disclaimer;
				var vp = (data.message_enabled) ? 'Yes' : 'No';
				var custom_param = '';
				if(data.dni_type) {
					custom_param = data.custom_params;
				}
				var number = data.number;
				if(!data.number) {
					number = "Number Pool";
				}
				var dayAndTime = ' ';
				var ring_to_number = data.default_ringto;
				if(data.target_did && data.routable_type === "PercentageBasedRoute") {
					ring_to_number = data.target_did;
					vm_enabled = data.percentage_vm_enabled;
				} else if(data.ivr_target_did && data.routable_type === "IvrRoute2") {
					ring_to_number = data.ivr_target_did;
				}else if(data.schedule_target_did && data.routable_type === "ScheduleRoute") {
					ring_to_number = data.schedule_target_did;
					var fromTime = data.from_time;
					var toTime = data.to_time;
					var FromH = +fromTime.substr(0, 2);
					var toH = +toTime.substr(0, 2);
					var h1 = FromH % 12 || 12;
					var h2 = toH % 12 || 12;
					var from_ampm = (FromH < 12 || FromH === 24) ? "AM" : "PM";
					var to_ampm = (toH < 12 || toH === 24) ? "AM" : "PM";
					fromTime = h1 + fromTime.substr(2, 3) + from_ampm;
					toTime = h2 + toTime.substr(2, 3) + to_ampm;
					dayAndTime = data.days+" "+fromTime+" To "+toTime;
					vm_enabled = data.schedule_vm_enabled;
					
				}
				if(ring_to_number && ring_to_number.indexOf('geo_route') > -1) {
					ring_to_number = data.default_ringto;
				}
				
				var obj = {
					"ID" : data.provisioned_route_id,
					"Tracking Number Name" : data.provisioned_route_name,
					"Tracking Number" : number,
					"Type" : $scope.routeTypes[data.routable_type] ? $scope.routeTypes[data.routable_type] : data.routable_type,
					"Keypress" : data.ivr_value,
					"Day And Time" : dayAndTime,
					"%" : data.percentage,
				    "Ring-to" : ring_to_number, // is ring to numnber going to be an array of numbers?
					"Source" : addSource[0],
					"Custom Source 1" : data['Custom Source 1'],
					"Custom Source 2" : data['Custom Source 2'],
					"Custom Source 3" : data['Custom Source 3'],
					"Custom Source 4" : data['Custom Source 4'],
					"Custom Source 5" : data['Custom Source 5'],
					"Medium" : addSource[1], // 0 false, 1 true
					"Status" : data.provisioned_route_status, // 0 false, 1 true
					"Group Name" : data.org_unit_name,
					"Campaign Name" : data.campaign_name,
					"DNI" : data.dni_type,//"what goes here?",
					"Instant Insight" : data.instant_insights,
					"Instant Insight Config" : (data.instant_insights_config) ? data.instant_insights_config :' ',
					"Host Domain" : data.destination_url,
					"Referring Website" : data.referrer,
					"HTML Class" : data.dni_element,
					"Custom Parameters" : custom_param, // what goes here?
					"RC" : (data.routable_type === 'IvrRoute2') ? ' ' : rc,
					"PD" : (data.routable_type === 'IvrRoute2') ? ' ' : pd,//data.play_disclaimer,//"happy day what!?", // what goes here?
					"VP" : (data.routable_type === 'IvrRoute2') ? ' ' : vp,//0, // what goes here?
					"WM" : (data.routable_type === 'IvrRoute2') ? ' ' : (data.whisper_enabled && data.routable_type !== 'IvrRoute2' && data.default_ringto !== 'hangup') ? "Yes" : "No",//1 // what goes here?,
					"Pre-Call Webhook" : data.webhook_name,
					//"Hunt Type" : ($scope.is_migrated && data.hunt_type) ? data.hunt_type : '-',
					//"Voicemail" : (data.vm_enabled) ? 'Yes' : 'No'
				};
				if($rootScope.is_migrated === true || $rootScope.is_migrated === 'true'){
						obj["Hunt Type"] =  (data.hunt_type) ? data.hunt_type : ' ';
						//obj.Voicemail =  data.routable_type === 'PercentageBasedRoute' ? ((data.percentage_vm_enabled)? 'Yes' : 'No') : ((data.vm_enabled) ? 'Yes' : 'No');
						if(data.routable_type === 'PercentageBasedRoute'){
							obj.Voicemail = (data.percentage_vm_enabled)? 'Yes' : 'No';
						}else if(data.routable_type == 'ScheduleRoute'){
							obj.Voicemail = (data.schedule_vm_enabled)? 'Yes' : 'No';
						}else{
							obj.Voicemail = (data.vm_enabled) ? 'Yes' : 'No';
						}
				}else{
					if(obj.Type !== null){
						if(obj.Type.startsWith("GeoRoute")){
							obj.Type = 'Geo Route';
						}
					}
				}
				rowsOfData.push(obj);

				if(provisioned_route_ids.indexOf(data.provisioned_route_id) === -1 && data.sch_ringto && data.routable_type == 'ScheduleRoute'){
			 		var tempSecondHash = {};
					Object.keys(obj).forEach(function(key) {
					     tempSecondHash[ key ] = obj[ key ];
					}); 
					 
					tempSecondHash['Ring-to'] = data.sch_ringto;
					tempSecondHash['Day And Time'] = "";
					tempSecondHash.Voicemail = data.sch_enabled === true ? 'Yes' : 'No';
					schedule_target_did.push(data.sch_ringto);
					tempSecondHash['Hunt Type'] = '';
					rowsOfData.push(tempSecondHash);
				}
				provisioned_route_ids.push(data.provisioned_route_id);
			});
			return rowsOfData;
		};

		// ***** begin NECESSARY CODE FOR ADV FILTER TO WORK *******************
		$scope.preloading = false;
		$scope.showAdvFilter = false;
		$scope.advancedFilterConfig = { maxQuantity: 5 };

		$scope.extendUrlParams = function(urlParams) {
			progressLoader.set( 50 );
			if (urlParams.vars.filtertype === 's') {
				$scope.simpleSearchFilter = urlParams.vars.filter;
			}
			$scope.urlParams = urlParams.vars;
			angular.extend($scope, urlParams.vars);
			delete urlParams.vars;
			angular.extend($scope, urlParams);
		};

		$scope.getInitialUrlParams = function() {
			progressLoader.start();
			advFilSrvc.determineInitializationMethod($scope).then(function(r) {
				progressLoader.set( 25 );
				$scope.advFilterDefinitions = advFilSrvc.getAdvFilterDefinitions();
				if ($scope.advFilterDefinitions.length > 0 && $scope.advFilterDefinitions[0].selected_column) {
					$scope.showAdvFilter = true;
				}
				$scope.extendUrlParams(r);
				$scope.loadReportData();
			});
		}();

		$scope.addFilterDefinition = function() {
			advFilSrvc.addFilterDefinition(false);
			$scope.advFilterDefinitions = advFilSrvc.getAdvFilterDefinitions();
		};

		$scope.updateOperators = function(preloading, af, $index) {
			advFilSrvc.updateOperators(preloading, af, $index);
			$scope.advFilterDefinitions = advFilSrvc.getAdvFilterDefinitions();
		};

		$scope.applyFilterParams = function() {
			progressLoader.set( 25 );
			var urlParams = advFilSrvc.applyFilter($scope);
			if (urlParams) {
				$scope.extendUrlParams(urlParams);
				return true;
			}

			return false;
		};

		$scope.applyFilter = function() {
			$scope.horsemanFlag = false;
			var noErrors = $scope.applyFilterParams();
			if (noErrors) {
				$scope.loadReportData();
			}
		};

		$scope.filterReset = function() {
			advFilSrvc.resetAdvFilter();
			$scope.advFilterDefinitions = advFilSrvc.getAdvFilterDefinitions();
			$scope.simpleFilterText = '';
			$scope.filtertype = 's';
			$scope.showAdvFilter = false;
			$scope.filter = '';
			if ($scope.filterApplied) {
				$scope.applyFilter();
				$scope.filterApplied = false;
			}
		};

		$scope.removeFilterDefinition = function(i) {
			advFilSrvc.removeFilterDefinition(i);
			$scope.advFilterDefinitions = advFilSrvc.getAdvFilterDefinitions();
		};

		$scope.validateInput = function(e) {
			advFilSrvc.validateInput(e);
		};
		// ***** end NECESSRY CODE FOR ADV FILTER TO WORK ***************
	}]);
}());
