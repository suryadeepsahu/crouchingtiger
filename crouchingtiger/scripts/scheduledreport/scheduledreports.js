(function() {
    /* jshint expr: true */
	angular.module('scheduled_reports', ['scheduled_report_webservices', 'distribution_list_webservices', 'static-include', 'isteven-multi-select',"theme.form-directives"])
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
        .controller('ScheduledReportsController', ['$scope', '$rootScope', '$uibModal', 'ScheduledReportWebService', 'pinesNotifications', 'distributionListWebservices', 'DateRangeFiller', '$bootbox', '$q', '$timeout', '$location', 'ScheldueUrlFormatter', '$window', 'ReportParam', '$routeParams', '$filter', 'advFilSrvc',
            function($scope, $rootScope, $uibModal, ScheduledReportWebService, pinesNotifications, distributionListWebservices, DateRangeFiller, $bootbox, $q, $timeout, $location, ScheldueUrlFormatter, $window, ReportParam, $routeParams, $filter, advFilSrvc) {
                var download_audio_setting = (typeof $window.localStorage.download_audio_enabled === "boolean") ? $window.localStorage.download_audio_enabled : ($window.localStorage.download_audio_enabled.toLowerCase() === 'true');
                if($rootScope.download_audio_enabled!==download_audio_setting){
                    $rootScope.download_audio_enabled=download_audio_setting;
                    $rootScope.$broadcast('download_audio_setting_changed');
                }
                $scope.disableSave = false;
                $scope.IdentifiedAgentData = [];
                var dataRange = ScheduledReportWebService.getDateRange();

                if($location.search().schedrptid && dataRange.schedrptid !== undefined && $location.search().schedrptid.split('-')[1] == dataRange.schedrptid && dataRange.drp_start !==undefined && dataRange.drp_end !==undefined){
                  $scope.drp_start = moment(dataRange.drp_start).format('MMMM DD, YYYY');
                  $scope.drp_end = moment(dataRange.drp_end).format('MMMM DD, YYYY');
                }else if($location.search().isNew && $window.sessionStorage.report_start_date && $window.sessionStorage.report_end_date ){
                  $scope.drp_start = moment($window.sessionStorage.report_start_date).format('MMMM DD, YYYY');
                  $scope.drp_end = moment($window.sessionStorage.report_end_date).format('MMMM DD, YYYY');
                }else{
                  $scope.drp_start = moment().subtract(6, 'days').format('MMMM DD, YYYY');
                  $scope.drp_end = moment().subtract(0, 'days').endOf('day').format('MMMM DD, YYYY');
                }

                $scope.preview = ($location.search().preview ? $location.search().preview : false);

                advFilSrvc.getAllCustomSources();

                // Set options for the date range picker
                $scope.drp_options = {
                    ranges:    {
                        'Today':        [moment().startOf('day'),                                       moment().endOf('day')],
                        'Yesterday':    [moment().subtract(1, 'days').startOf('day'),                   moment().subtract(1, 'days').endOf('day')],
                        'Last 7 Days':  [moment().subtract(6, 'days').startOf('day'),                   moment().subtract(0, 'days').endOf('day')],
                        'Last 30 Days': [moment().subtract(29, 'days').startOf('day'),                  moment().subtract(0, 'days').endOf('day')],
                        'This Month':   [moment().startOf('month').startOf('day'),                      moment().endOf('month').endOf('day')],
                        'Last Month':   [moment().subtract(1, 'month').startOf('month').startOf('day'), moment().subtract(1, 'month').endOf('month').endOf('day')]
                    },
                    opens:     'left',
                    startDate: moment($scope.drp_start),
                    endDate: moment($scope.drp_end)
                };

                $scope.simpleSearchFilter = '';
                $scope.filterData = {};
                $scope.scheduleData = {};
                $scope.reportData = {};
                $scope.campaignAndAssignedUsers = ['test'];
                $scope.reportActive = true;
                $scope.reportStatus = "active";
                $scope.clickedSaveAsBtn = false;
                $scope.reportName = "";
                $scope.reportDesc = "";
                var internalMappedNames = {};
                $scope.isNewReport = false;
                $scope.setDistHeaders = ['Name', 'Usage'];
                $scope.setDistBuildHeaders = ['Name', 'Frequency', 'Format'];
                $scope.actionHeader = ['Actions'];
                $scope.showScheduleForm = false;
                $scope.scheduleListData = [];
                $scope.isInEditMode = false;
                // if there's no report_id then set to new report
                $scope.whichScheduleReport = $location.search().report;
                $scope.selectedGroup;
                $scope.getSelectedGroup = function() {
                    return ($scope.selectedGroup !== undefined ? $scope.selectedGroup : "Secondary Group");
                };


                $scope.selectedReport;
                $scope.getSelectedReport = function() {
                    return ($scope.selectedReport !== undefined ? $scope.selectedReport : "Report Type");
                };

                $scope.uiReportName = [
										{label: "Call Details", value: 'call_detail'},
										{label: "Group Activity", value: 'group_activity'},
                ];
                if (parseInt($rootScope.roleId) === 1 || parseInt($rootScope.roleId) >= 4) {
                    $scope.uiReportName.push({label: "Tracking Number Settings", value: 'callflow_setting'});
                }
								$scope.reportsWithSecondaryGroups = ['group_activity'];
                $scope.enableSecondaryGroup = false;

				$scope.setSecondaryGroupOptions = function(report) {
					if($scope.reportsWithSecondaryGroups.indexOf(report) !== -1) {
                        switch(report) {
													case 'group_activity':
													 $scope.secondaryGroupSelectOptions = [
														 { label: 'None', value: 'none' }, { label: 'Tracking Number', value: 'call_flow'},
														 { label: 'Campaign', value: 'campaign'}
													 ];
													 break;
                        }
                        $scope.filterData.secondary_group = 'none';
                        $scope.enableSecondaryGroup = true;
					}
				};

                $scope.reportSelected = function(report) {
                    // $rootScope.$broadcast('schedule_builder_report_changed', report);
					$scope.report = report;
					$scope.showAdvFilter = false;
                    advFilSrvc.getAllCustomSources();
					if (report === 'call_detail') {
						$scope.attachmentList = ['CSV', 'HTML'];
					} else {
						$scope.attachmentList = ['CSV', 'PDF', 'HTML'];
					}

                    // console.log('Report Selected', report);
                    if ($scope.reportsWithSecondaryGroups.indexOf(report) === -1) {
                      // console.log('REPORT CHOSEN DOESNT HAVE A SECONDARY GROUP');
                      $scope.filterData.secondary_group = '';
                      $scope.enableSecondaryGroup = false;
                    } else {
						$scope.setSecondaryGroupOptions(report);
                    }
                    $scope.secondary = "none";
                    $scope.filterReset();
                    $scope.advFilterDefinitions = advFilSrvc.getAdvFilterDefinitions();
                };

                $scope.tags = [];

                var scheduleReportViewFile = {
                    campaign: "views/acq-call-flows4.html",
                    tracking_number: "views/acq-call-flows4.html",
                    keyword: "views/acq-call-flows4.html",
                    group: "views/acq-call-flows4.html",
                    source: "views/acq-call-flows4.html",
                    calls_detail: "views/calls-details.html",
                    calls_callback: "views/calls-callback.html",
                    group_activity: "views/activity-group.html",
                    callflow_setting: "views/settings-call-flow.html"
                };
                $scope.scheduleReportViewFile = scheduleReportViewFile[$scope.whichScheduleReport];

                // When page loads check for a schedule report ID
                if ($location.search().schedrptid) {
                    var scheduleReport = ($location.search()).schedrptid.split('-');
                    var scheduleReportObject = {
                        type: scheduleReport[0],
                        id: scheduleReport[1]
                    };
                    var err;
                    // check authorization of report
                    var chk = {};
                    if (scheduleReportObject.type === 's') {
                        chk.schedule_id = scheduleReportObject.id;
                    } else {
                        chk.report_id = scheduleReportObject.id;
                    }
                    ScheduledReportWebService.getAuthorization(chk).then(function(response) {
                        var auth = false;
                        console.log('authorization response', response);
                        if (response.data.result === 'success') {
                            if (response.data.json === 'authorized') {
                                auth = true;
                            }
                        }

                        if (!auth) { // failed authentication
                            pinesNotifications.notify({
                                title: 'Report Authorization',
                                text: 'User is not authorized to view specified report',
                                type: 'error'
                            });
                            //redirect to schedule listing page
                            location.href = '#/set-scheduled';
                        } else {
                            if (scheduleReportObject.type === 's') {
                                ScheduledReportWebService.getScheduleReport(scheduleReportObject.id).then(function (response) {
                                    if (response.data.result === 'success') {
                                        var retData = advFilSrvc.sanitizeDbFilterData(response.data.json);
                                        $scope.preloadReportDetails(retData);
                                    } else {
                                        err = 'Failed to retrieve scheduled report data. '+response.data.err;
                                    }
                                });
                            } else if (scheduleReportObject.type === 'r') {
                                ScheduledReportWebService.getReport(scheduleReportObject.id).then(function (response) {
                                    if (response.data.result === 'success') {
                                        console.log('REPORT INFROMATION FOUND:', response.data.json);
                                        $scope.reportStatus = response.data.json.report.report_status;
                                        var retData = advFilSrvc.sanitizeDbFilterData(response.data.json);
                                        $scope.preloadReportDetails(retData);
                                    } else {
                                        err = 'Failed to retrieve scheduled report data. '+response.data.err;
                                    }
                                });
                            } else {
                                err = "Invalid schedule report identifier";
                            }
                        }
                    });
			  	}

	            // Handles plugging in the loaded data into the scope
				$scope.preloadReportDetails = function(data) {
					console.log('INSIDE preloadReportDetails IN schedulereports.js: Extending into scope:', data);
					if (data.advFilterDefinitions !== undefined) { $scope.advFilterDefinitions = data.filterRule; }
					if (data.filterData !== undefined) { $scope.filterData = data.filterData; }
					if (data.reportData !== undefined) { $scope.reportData = data.reportData; }
					if (data.scheduleData !== undefined) { $scope.scheduleListData = data.scheduleData; }
					setTimeout(function() {
						$(window).trigger('resize');
					}, 200);
					_.extend($scope, data.vars);
					if($scope.filtertype !== undefined && $scope.filtertype === 's') { $scope.simpleSearchFilter = $scope.filter; }
					console.log('report data', $scope.reportData);
					console.log('filter data', $scope.filterData);
					// console.log('schedule data', $scope.scheduleListData);
					// console.log('filter rules (advFilterDefinitions)', data.filterRule);
					// console.log('variables imported into scope', data.vars);
					$scope.showdist = true;
					$scope.isNewReport = true;
					$scope.initializeScheduleDistribution();
                    $scope.setSecondaryGroupOptions($scope.filterData.report_used);
                    $scope.filterData.secondary_group = data.vars.secondary;
                    $scope.changeSecondaryGrouping($scope.filterData.secondary_group, false);
					// Set datepicker range and highlight selected choice
                    console.log('START', data.vars.start_date, 'END', data.vars.end_date);
					$scope.drp_start = moment(data.vars.start_date).format('MMMM DD, YYYY');
					$scope.drp_end = moment(data.vars.end_date).format('MMMM DD, YYYY');
					//$scope.drp_options.startDate = moment($scope.drp_start).startOf('day');
					//$scope.drp_options.endDate = moment($scope.drp_end).endOf('day'); //+' 23:59:59', 'YYYY-MM-DD HH:mm:ss');
					$scope.drp_options.startDate = moment($scope.drp_start); //data.vars.start_date;
					$scope.drp_options.endDate = moment($scope.drp_end); //data.vars.end_date; //+' 23:59:59', 'YYYY-MM-DD HH:mm:ss');
                    // console.log('@@@@@@@@@ NEW DRP OPTIONS @@@@@@@@@', $scope.drp_options, $scope);
                    console.log('DRP_OPTIONS', $scope.drp_options);

					// Populate advanced filter with columns based on chosen report
					advFilSrvc.determineInitializationMethod($scope).then(function(r) {
						$scope.advFilterDefinitions = advFilSrvc.getAdvFilterDefinitions();
						if ($scope.advFilterDefinitions[0].selected_column) {
							$scope.showAdvFilter = true;
						}
					});

					// Set edit report id to scope
					$scope.editReportID = $scope.reportData.report_id;


					if ($scope.filterData.report_used === 'call_detail') {
						$scope.attachmentList = ['CSV', 'HTML'];
					}

					// Show active
					if ($scope.reportData.report_status === 'inactive') { $scope.reportActive = false; }

					// console.log('Pre-loaded schedule data:', $scope.scheduleListData);
				};

                $scope.goBack = function() {
                    var backurl = '';
                    if ($scope.Id !== undefined) {
                        backurl = '#/set-scheduled';
                    } else {
                        var backPageUrl = {
                            campaign: "#/acq-call-flows4",
                            call_flow: "#/acq-call-flows4",
                            keyword: "#/acq-call-flows4",
                            group: "#/acq-call-flows4",
                            source: "#/acq-call-flows4",
                            calls_detail: "#/calls-details",
                            calls_callback: "#/calls-callback",
                            group_activity: "#/activity-group",
                            callflow_setting: "#/settings-call-flow"
                        };
                        backurl = backPageUrl[$scope.whichScheduleReport];
                        var queryParam = ($location.url()).split('?');
                        backurl += '?' + queryParam[1];
                    }
                    $window.location.href = backurl;
                };

                // Format report/filter data to send to /v1/report. Display errors if there are any.
                $scope.saveScheduleReport = function() {
                    console.log('@@@@@@@@@ SAVE SCHEDULE REPORT FIRED @@@@@@@@@');
                    var reportType = $scope.filterData.report_used;
                    var arrRequired = [];
                    var deferredObj = $q.defer();
					var saveError = false;

                    if ($scope.reportData.report_name === undefined || $scope.reportData.report_name.trim() === "") {
                        arrRequired.push('Scheduled Report Name');
                    }
                    if (reportType === undefined || reportType.trim() === "") {
                        arrRequired.push('Report Type');
                    }
                    if (arrRequired.length > 0) {
                        messageText = 'field is required.';
                        if (arrRequired.length > 1) {
                            messageText = 'fields are required.';
                        }
                        pinesNotifications.notify({
                            title: 'Scheduler form',
                            text: '\'' + arrRequired.join(', ') + '\' ' + messageText,
                            type: 'error'
                        });
						saveError = true;
						deferredObj.resolve(false);
                    }
                    $scope.disableSaveButton = true;

                    // *** FORMAT FILTER RULES *** //
                    var filter_rule = [];

                    // Check to see if basic filter is being used or advanced filter
                    if ($scope.simpleSearchFilter && $scope.simpleSearchFilter.length !== 0) {
                    	console.log('Simple Search Value:', $scope.simpleSearchFilter);
                    	filter_rule.push({
                			"filter_key": 'filter',
                        	"comparator": '=',
                        	"filter_value": $scope.simpleSearchFilter,
                        	"filter_join": 'NONE',
                        	"filter_type": 'basic_filter'
                      	});
                    	// console.log('@@@@@@@@@ BASIC FILTER USED. SAVING DEFINITIONS @@@@@@@@@', filter_rule);
                    } else if ($scope.advFilterDefinitions && $scope.advFilterDefinitions.length > 0 && $scope.advFilterDefinitions[0].selected_column) {
						advFilSrvc.updateGlobalReportScope($scope);
					  	var validated = advFilSrvc.validateFilters();
					  	if (validated === true) {
							console.log('@@@@@@@@@ ADVANCED FILTER USED. SAVING DEFINITIONS @@@@@@@@@', filter_rule);
						  	var sanitizedDefinitions = advFilSrvc.sanitizeFilters();
						  	filter_rule = filter_rule.concat(sanitizedDefinitions);
					  	} else {
							pinesNotifications.notify({
								title: validated.title,
							  	text: validated.text,
							  	type: 'error'
						  	});
						  	saveError = true;
					  	}
                    }

                    // Timezone
                    filter_rule.push({
                    	"filter_key": "timezone",
                    	"comparator": "=",
                    	"filter_value": $rootScope.timezone,
                    	"filter_join": 'NONE',
                    	"filter_type": "variable"
                    });

                    // If group_activity report was selected, include which one was selected
                    if ($scope.reportsWithSecondaryGroups.indexOf($scope.filterData.report_used) !== -1) {
						console.log('SECONDARY GROUP USED:', $scope.filterData.secondary_group);
	                    filter_rule.push({
	                    	"filter_key": 'secondary',
	                    	"comparator": '=',
	                      	"filter_value": $scope.filterData.secondary_group,
	                      	"filter_join": 'NONE',
	                      	"filter_type": 'variable'
	                    });
                    }
                    // *** FORMAT FILTER RULES *** //

                    // *** DETERMINE AND FORMAT DATE RANGE *** //
                    // Format dates to determine if a custom range or pre-determined range was used
                    //console.log('Using DRP_OPTIONS', $scope.drp_options);
                    var ranges = {
                    	today:          [ moment($scope.drp_options.ranges.Today[0]).format('ddd MMM DD YYYY'),           	moment($scope.drp_options.ranges.Today[1]).format('ddd MMM DD YYYY') ],
                      	yesterday:      [ moment($scope.drp_options.ranges.Yesterday[0]).format('ddd MMM DD YYYY'),       	moment($scope.drp_options.ranges.Yesterday[1]).format('ddd MMM DD YYYY') ],
                      	last_7:         [ moment($scope.drp_options.ranges['Last 7 Days'][0]).format('ddd MMM DD YYYY'),	moment($scope.drp_options.ranges['Last 7 Days'][1]).format('ddd MMM DD YYYY') ],
                      	last_30:        [ moment($scope.drp_options.ranges['Last 30 Days'][0]).format('ddd MMM DD YYYY'), 	moment($scope.drp_options.ranges['Last 30 Days'][1]).format('ddd MMM DD YYYY') ],
                      	this_month:     [ moment($scope.drp_options.ranges['This Month'][0]).format('ddd MMM DD YYYY'),   	moment($scope.drp_options.ranges['This Month'][1]).format('ddd MMM DD YYYY') ],
                      	last_month:     [ moment($scope.drp_options.ranges['Last Month'][0]).format('ddd MMM DD YYYY'),   	moment($scope.drp_options.ranges['Last Month'][1]).format('ddd MMM DD YYYY') ],
                      	user_selected:  [ moment($scope.drp_start).format('ddd MMM DD YYYY'),                             	moment($scope.drp_end).format('ddd MMM DD YYYY')]
                    };

                    // Compare start and end dates to match one of the pre-defined date ranges
                    var filter_start = null,
                        filter_end = null,
                        filter_range = null;

                    if (ranges.user_selected[0] === ranges.today[0] && ranges.user_selected[1] === ranges.today[1]) {
                    	filter_range = 'today';
                    } else if (ranges.user_selected[0] === ranges.yesterday[0] && ranges.user_selected[1] === ranges.yesterday[1]) {
                      	filter_range = 'yesterday';
                    } else if (ranges.user_selected[0] === ranges.last_7[0] && ranges.user_selected[1] === ranges.last_7[1]) {
                      	filter_range = 'last_week';
                    } else if (ranges.user_selected[0] === ranges.last_30[0] && ranges.user_selected[1] === ranges.last_30[1]) {
                      	filter_range = 'last_30';
                    } else if (ranges.user_selected[0] === ranges.this_month[0] && ranges.user_selected[1] === ranges.this_month[1]) {
                      	filter_range = 'this_month';
                    } else if (ranges.user_selected[0] === ranges.last_month[0] && ranges.user_selected[1] === ranges.last_month[1]) {
                      	filter_range = 'last_month';
                    } else {
                    	// Dates chosen did not match any pre-defined date ranges. Using custom range.
                      	console.log('SETTING CUSTOM RANGE');
                      	filter_start = moment(ranges.user_selected[0]).format('YYYY-MM-DD');
                      	filter_end = moment(ranges.user_selected[1]).format('YYYY-MM-DD');
					  	filter_range = null;
                    }
                    // *** DETERMINE AND FORMAT DATE RANGE *** //

                    // *** Glue data together into builderData *** //
                    var builderData = {
                        "report": {
                        	"ct_user_id": $rootScope.userId,
                          	"org_unit_id": $rootScope.currentOUId,
                          	"report_name": $scope.reportData.report_name,
                          	"report_desc": $scope.reportData.report_desc,
                          	"report_status": ($scope.reportActive === true ? 'active' : 'inactive')
                        },
                        // Filter start/end is for a custom range ONLY, otherwise use filter_range
                        "filter": {
                        	"report_used": $scope.filterData.report_used,
                          	"filter_start": filter_start,
                          	"filter_end": filter_end,
                          	"filter_range": filter_range
                        },
                        "filter_rule": filter_rule
                    };
                    // *** Glue data together into builderData *** //

                    // editReportID is only created if editing an already created report
                    if ($scope.editReportID) { builderData.report.report_id = $scope.editReportID; }
                    if ($scope.filter_id) { builderData.filter.filter_id = $scope.filter_id; }
                    console.log('Builder Data', builderData);
                    builderData.report.update_scheldule_status = false;
                    //to update the schelduler Status if we are changing the report status
                    if($scope.editReportID && $scope.reportStatus !== ($scope.reportActive === true ? 'active' : 'inactive'))
                         builderData.report.update_scheldule_status = true;

					if(!saveError) {
						// *** Send data to /v1/report to be created *** //
						ScheduledReportWebService.createScheduleReport(builderData).then(function(r) {
							console.log('REPORT DATA SAVED:', r);
							if (r.data.result === 'success') {
								// New report was created. Required to create schedule on new reports.
								if (!$location.search().schedrptid) {
                                    $scope.createdReportID = r.data.json.report.report_id;
                                    pinesNotifications.notify({
                                        title: 'Success',
                                        text: 'Report successfully created and saved.',
                                        type: 'success'
                                    });
                                } else {
                                    pinesNotifications.notify({
                                        title: 'Success',
                                        text: 'Report successfully updated and saved.',
                                        type: 'success'
                                    });
                                }

                                console.log("response",r.data.json.filter.filter_id);
                                $scope.filter_id = r.data.json.filter.filter_id;
								$scope.editReportID = r.data.json.report.report_id;
                                $scope.reportStatus = ($scope.reportActive === true ? 'active' : 'inactive');
								$scope.showdist = true;
								$scope.initializeScheduleDistribution();

								$scope.disableSaveButton = false;
                                deferredObj.resolve(true);
							} else {
								$scope.disableSaveButton = false;
								if ($scope.filter_id) {
									pinesNotifications.notify({
										title: 'Error',
										text: 'Report unsuccessfully updated.',
										type: 'error'
									});
								} else {
									pinesNotifications.notify({
										title: 'Error',
										text: 'Report unsuccessfully created.',
										type: 'error'
									});
								}
                                deferredObj.resolve(false);
							}
						});
						// *** Send data to /v1/report to be created *** //
					} else {
						$scope.disableSaveButton = false;
                        deferredObj.resolve(false);
					}

                    return deferredObj.promise;
                };

                // TODO change to new edit with changed view
                $scope.editSchedule = function(data) {
                  $scope.isInEditMode = true;
                    var scheduleData = {
                        "schedule_id": data.schedule_id,
                        "report_id": data.report_id,
                        "schedule_name": data.schedule_name,
                        "schedule_status": data.schedule_status,
                        "freq_unit": data.freq_unit,
                        "freq_value": data.freq_value,
                        "format": data.format.split(","),
                        "list_id": data.list_id,
                        "message": data.message,
                        "from_label": data.from_label,
                        "list_name": data.list_name
                    };
                    $scope.scheduleData = scheduleData;
                    $scope.showScheduleForm = true;
                    $scope.showCampaignUsers = false;
                    $scope.scheduleFormHeader = "Editing Distribution List";
                    scrollDownToDistributionForm();
                };

                //$scope.showSchedule is written here because schedule form is out of the schedule distrubution lust div
                $scope.showSchedule=function(){
                    $scope.scheduleFormHeader = "Adding Distribution List";
                    $scope.scheduleData = {};
                    $scope.scheduler.$setPristine();
                    $scope.showScheduleForm=true;
                    $scope.showCampaignUsers = false;
                    $scope.isInEditMode = false;
                    scrollDownToDistributionForm();
                };

                $scope.cancelSchedule = function() {
                    $scope.scheduleData = {};
                    $scope.scheduler.$setPristine();
                    $scope.showScheduleForm = false;
                    $scope.showCampaignUsers = false;
                    $scope.isInEditMode = false;
                    scrollDownToDistributionForm();
                };

                $scope.deleteSchedule = function(data, index) {
                    $bootbox.confirm("Are you sure you want to delete this scheduled report?", function(clickedOK) {
                        if (clickedOK) {
                            ScheduledReportWebService.deleteSchedule(data.schedule_id).then(function(response) {
                                if (response.data.result === 'success') {
                                    $scope.scheduleListData.splice(index, 1);
                                    pinesNotifications.notify({
                                        title: 'Schedule Report',
                                        text: 'Successfully deleted the scheduler',
                                        type: 'success'
                                    });
                                } else {
                                    pinesNotifications.notify({
                                        title: 'Schedule Report',
                                        text: response.data.err,
                                        type: 'error'
                                    });
                                }
                            });
                        }
                    });
                };

                // ADDING STUFF FROM MODAL controller
                $scope.frequencyType = ['daily', 'weekly', 'monthly'];
                $scope.frequencyTypeWeekly = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
                $scope.clearAll = false;
                $scope.showme = false;

                // $scope.frequencyTypeMonthly = ['1st','2nd','3rd','4th','5th','6th','7th','8th','9th','10th','11th','12th','13th','14th','15th','16th','17th','18th','19th','20th','21st','22nd','23rd','24th','25th','26th','27th','28th'];
                $scope.frequencyTypeMonthly = [{'key': 1, 'value': '1st'}, {'key': 2, 'value': '2nd' },    {'key': 3, 'value': '3rd' },    {'key': 4, 'value': '4th' },    {'key': 5, 'value': '5th' },    {'key': 6, 'value': '6th' },    {'key': 7, 'value': '7th' },    {'key': 8, 'value': '8th' },    {'key': 9, 'value': '9th' }, {'key': 10, 'value': '10th' }, { 'key': 11, 'value': '11th' }, { 'key': 12, 'value': '12th' }, { 'key': 13, 'value': '13th' }, { 'key': 14, 'value': '14th' }, { 'key': 15, 'value': '15th' }, { 'key': 16, 'value': '16th' }, { 'key': 17, 'value': '17th' }, { 'key': 18, 'value': '18th' }, { 'key': 19, 'value': '19th' }, { 'key': 20, 'value': '20th' }, { 'key': 21, 'value': '21st' }, { 'key': 22, 'value': '22nd' }, { 'key': 23, 'value': '23rd' }, { 'key': 24, 'value': '24th' }, { 'key': 25, 'value': '25th' }, { 'key': 26, 'value': '26th' }, { 'key': 27, 'value': '27th' }, { 'key': 28, 'value': '28th'} ];
                $scope.attachmentList = ['CSV', 'PDF', 'HTML'];

                $scope.saveScheduleData = function() {
                    //var data = $scope.listData;
					console.log('@@@@@@@@@ SAVING SCHEDULE DATA @@@@@@@@@');
                    $scope.disableSave = true;
                    console.log('Schedule Data:', $scope.scheduleData);
                    var messageText = "";
                    var arrRequired = [];
                    if ($scope.scheduleData.format === undefined || $scope.scheduleData.format.join()==="") {
                            arrRequired.push("Attachment");
                    }

                    if ($scope.scheduleData.freq_unit === "weekly" &&  ($scope.scheduleData.freq_value === undefined || $scope.scheduleData.freq_value === "")) {
                        arrRequired.push("Day of the Week");
                    }

                    if (arrRequired.length) {
                        messageText = 'field is required.';
                        if (arrRequired.length > 1) {
                            messageText = 'fields are required.';
                        }
                        pinesNotifications.notify({
                            title: 'Scheduler form',
                            text: '\'' + arrRequired.join(', ') + '\' ' + messageText,
                            type: 'error'
                        });
						$scope.disableSave = false;
                        return false;
                    }

                    if ($scope.scheduleData.freq_unit === 'daily') {
                        $scope.scheduleData.freq_value = '9';
                    }
                    console.log("$scope.reportStatu");
                    console.log($scope.reportStatus);
                    var scheduleData = {
                        "schedule": {
                            "schedule_name": "null",
                            "schedule_status": $scope.reportStatus,
                            "freq_unit": $scope.scheduleData.freq_unit,
                            "freq_value": $scope.scheduleData.freq_value,
                            "format": $scope.scheduleData.format,
                            "list_id": $scope.scheduleData.list_id,
                            "message": $scope.scheduleData.message,
                            "from_label": $scope.scheduleData.from_label
                        }
                    };

                    console.log('FORMATTED SCHEDULE DATA', scheduleData);

                    if($scope.createdReportID) {
                      // New report
                      scheduleData.schedule.report_id = $scope.createdReportID;
                    } else {
                      // Editing report
                      scheduleData.schedule.report_id = $scope.reportData.report_id;
                    }

                    if ($scope.scheduleData.schedule_id) {
                      scheduleData.schedule.schedule_id = $scope.scheduleData.schedule_id;
                    }

                    ScheduledReportWebService.createNewSchedule(scheduleData).then(function(response) {
                        if (response.data.result === 'error') {
                            pinesNotifications.notify({
                                title: 'Scheduled Report',
                                text: response.data.err,
                                type: 'error'
                            });
                        } else {
                            pinesNotifications.notify({
                                title: 'Scheduled Report',
                                text: 'Scheduled report saved Successfully.',
                                type: 'success'
                            });
                            //Hide schedule form
                            $scope.showScheduleForm=false;
                            $scope.isNewReport=true;
                            //update the distribution list name from the list view
                            var found = $filter('filter')($scope.distributionListData, {list_id: scheduleData.schedule.list_id}, true);
                            if(found.length > 0)
                                scheduleData.schedule.list_name = found[0].list_name;

                            scheduleData.schedule.format = $scope.scheduleData.format.join();
                            //if user is adding new schedule then push the newly added schedule in the scheduleListData
                            //else update the new data with the old data from the list view
                            //I am doing this here because we can add the newly added/updated schedule in list view instied reload the page
                            if ($scope.scheduleData.schedule_id === undefined || $scope.scheduleData.schedule_id === null || $scope.scheduleData.schedule_id === "")
                            {
                                scheduleData.schedule.schedule_id = response.data.json.schedule.schedule_id;
                                $scope.scheduleListData.push(scheduleData.schedule);
                            } else {
                                var schedule = _.find($scope.scheduleListData,function(rw){ return rw.schedule_id ==  scheduleData.schedule.schedule_id; });
                                schedule.list_name  = scheduleData.schedule.list_name;
                                schedule.freq_unit  = scheduleData.schedule.freq_unit;
                                schedule.freq_value = scheduleData.schedule.freq_value;
                                schedule.format     = scheduleData.schedule.format;
                                schedule.list_id    = scheduleData.schedule.list_id;
                                schedule.message    = scheduleData.schedule.message;
                                schedule.from_label = scheduleData.schedule.from_label;
                            }
                            $scope.isInEditMode = false;
                        }
                        $scope.disableSave = false;
                    });
                };

                // NOT TOO SURE ABOUT THE UX WITH THIS ONE
                function scrollDownToDistributionForm() {
                    angular.element('html, body').animate({
                        scrollTop: angular.element("footer").offset().top
                    }, 500, 'easeOutExpo');
                }

                $scope.distributionMultiselect = [];
                $scope.disableCreateNew = false;
                $scope.initializeScheduleDistribution = function() {
                // console.log("initializeScheduleDistribution called...");
                  distributionListWebservices.getDistributionList().then(function(response) {
                      $scope.distributionListData = response.data.json;
                  });
                  // distributionListWebservices.getcampaignAndAssignedUser().then(function(response) {
                  //     $scope.getUsersAndCampaigns(response.data.json);
                  //     $scope.disableCreateNew = false;
                  // });
                };

                $scope.clearDistributionFormData = function(falg) {
                    $scope.clearAll = true;
                    $timeout(function() {
                        $scope.scheduleData.listName = "";
                        $scope.scheduleData.additionalEmails = "";
                        angular.element("#listName").addClass('ng-pristine');
                        angular.element("#listName").removeClass('ng-dirty');
                        angular.element("#additionalEmails").removeClass('ng-dirty');
                        $scope.showCampaignUsers=falg;
                    }, 0);
                };

                $scope.getUsersAndCampaigns = function(data) {
                    $scope.campaignUsers = [];
                    $scope.campaignAndAssignedUsersList = getDropdownOptions(data);
                };

                function getDropdownOptions(campaignAndAssignedUsers) {
                    var allOptions = [{
                        name: '<strong>Campaigns</strong>',
                        msGroup: true
                    }];

                    if (campaignAndAssignedUsers !== undefined && campaignAndAssignedUsers.campList !== undefined) {
                        _.each(campaignAndAssignedUsers.campList, function(data) {
                            var tempHash = {
                                icon: '',
                                name: data.campaign_name,
                                type: data.type,
                                ticked: false,
                                id: data.id,
                                isCampaign: true,
                                class:''
                            };
                            if (data.campaign_name !== null && data.campaign_name !== undefined && data.campaign_name.trim() !== "")
                                allOptions.push(tempHash);
                        });
                    }

                    allOptions.push({
                        msGroup: false
                    });
                    allOptions.push({
                        name: '<strong>Users</strong>',
                        msGroup: true
                    });

                    if (campaignAndAssignedUsers !== undefined && campaignAndAssignedUsers.userList !== undefined) {
                        _.each(campaignAndAssignedUsers.userList, function(data) {
                            var tempHash = {
                                icon: '',
                                name: data.user_name + " - " + data.email,
                                type: data.type,
                                ticked: false,
                                id: data.id,
                                isCampaign: false,
                                class:''
                            };
                            if (data.user_name !== null && data.user_name !== undefined && data.user_name.trim() !== "")
                                allOptions.push(tempHash);

                        });
                    }
                    allOptions.push({msGroup: false});
                    return allOptions;
                  }
                $scope.scheduleData = {};
                $scope.saveDistributionList = function(flagSelect, distributionMultiselect) {

                    var arrRequired = [];
                    if ($scope.scheduleData.listName === undefined || $scope.scheduleData.listName.trim() === "") {
                        arrRequired.push('Distribution List Name');
                    }
                    if ($scope.scheduleData.from_label === undefined || $scope.scheduleData.from_label.trim() === "") {
                        arrRequired.push('From Label');
                    }
                    if (arrRequired.length > 0) {
                        messageText = 'field is required.';
                        if (arrRequired.length > 1) {
                            messageText = 'fields are required.';
                        }
                        pinesNotifications.notify({
                            title: 'Scheduler form',
                            text: '\'' + arrRequired.join(', ') + '\' ' + messageText,
                            type: 'error'
                        });
                        return false;
                    }

                    var saveData = {
                        distributionlist: {
                            org_unit_id: $rootScope.currentOUId,
                            list_name: $scope.scheduleData.listName,
                            from_label: $scope.scheduleData.from_label,
                            recipientlist: [],
                            additionalemails: $scope.scheduleData.additionalEmails
                        }
                    };

                    if (distributionMultiselect.length <= 0 && ($scope.scheduleData.additionalEmails === undefined || $scope.scheduleData.additionalEmails === '')) {
                        pinesNotifications.notify({
                            title: 'Distribution List',
                            text: 'Please enter Emails.',
                            type: 'error'
                        });
                        return;
                    }

                    _.each(distributionMultiselect, function(list) {
                        saveData.distributionlist.recipientlist.push({
                            recipientType: list.type,
                            recipientTypeValue: list.id.toString()
                        });
                    });

                    $scope.clearAll = true;
                    $timeout(function() {
                        $scope.clearAll = false;
                    }, 0);

                    distributionListWebservices.addDistributionList(saveData).then(function(response) {
                        if (response.data.status == 'error') {
                            pinesNotifications.notify({
                                title: 'Distribution List',
                                text: response.data.err,
                                type: 'error'
                            });
                        } else {
                            pinesNotifications.notify({
                                title: 'Distribution List',
                                text: 'Distribution List is saved Successfully',
                                type: 'success'
                            });
                            var insertedData = response.data.json;
                            $scope.distributionListData.push({
                                list_id: insertedData.list_id,
                                list_name: insertedData.list_name
                            });
                            //keep selected distribution list if clicked on Save & Select
                            if (flagSelect === true)
                                $scope.scheduleData.list_id = insertedData.list_id;
                            $scope.clearDistributionFormData(false);
                        }

                    });
                };

				// *** NECESSARY CODE FOR ADV FILTER TO WORK
				$scope.preloading = false;
				$scope.showAdvFilter = false;
				$scope.advancedFilterConfig = { maxQuantity: 5 };

				$scope.toggleAdvFilter = function() {
					console.log($scope.filterData.report_used);
					if (!$scope.filterData.report_used) {
						pinesNotifications.notify({
							title: 'Report Details',
							text: 'Please select a report type.',
							type: 'error'
						});
					} else {
						$scope.showAdvFilter = true;
					}
				};

                $scope.getInitialUrlParams = function() {
                    console.log("Inside all agents");
                    advFilSrvc.determineInitializationMethod($scope).then(function(r) {
                        console.log('INSIDE getInitialUrlParams IN callsdetails.js: Returned urlParams:', r);
                        $scope.advFilterDefinitions = advFilSrvc.getAdvFilterDefinitions();
                        if ($scope.advFilterDefinitions.length > 0 && $scope.advFilterDefinitions[0].selected_column !== undefined) {
                            $scope.showAdvFilter = true;
                        }
                        $scope.extendUrlParams(r);
                        ScheduledReportWebService.getAllTopOuUsers($rootScope.currentOUId).then(function(result) {
                            if (result.data.status === "success") {
                                var data = result.data.json;
                                if (data.length > 0) {
                                    $scope.IdentifiedAgentData = data;
                                }
                            }
    
                        });
                       
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

				if (!$location.search().schedrptid) {
					advFilSrvc.determineInitializationMethod($scope).then(function(r) {
						$scope.advFilterDefinitions = advFilSrvc.advFilterDefinitions;
					});
				}

	            $scope.filterReset = function() {
					advFilSrvc.resetAdvFilter();
					$scope.advFilterDefinitions = advFilSrvc.getAdvFilterDefinitions();
					$scope.showAdvFilter = false;
	                $scope.simpleFilterText = '';
	                $scope.filtertype = 's';
	                $scope.showAdvFilter = false;
	            };

                $scope.extendUrlParams = function(urlParams) {
                    $scope.urlParams = urlParams.vars;
                    // Load filter_id's dates
                    $scope.drp_start = moment($scope.urlParams.start_date, 'YYYY-MM-DD').format('MMMM DD, YYYY');
                    $scope.drp_end = moment($scope.urlParams.end_date, 'YYYY-MM-DD').format('MMMM DD, YYYY');
                    angular.extend($scope, urlParams.vars);
                    delete urlParams.vars;
                    angular.extend($scope, urlParams);
                };

                $scope.applyFilterParams = function() {
                    var urlParams = advFilSrvc.applyFilter($scope);
                    $scope.extendUrlParams(urlParams);
                };

				$scope.removeFilterDefinition = function(i) {
					advFilSrvc.removeFilterDefinition(i);
					$scope.advFilterDefinitions = advFilSrvc.getAdvFilterDefinitions();
				};

				$scope.validateInput = function(e) {
					advFilSrvc.validateInput(e);
				};

                $scope.previewReport = function() {
					if ($scope.filterData.report_used && $scope.reportData.report_name) {
						var newTab = $window.open();
					}

                    $scope.saveScheduleReport().then(function(saved) {
						var reportPageMap = {
							acq_group           : 'acq-call-flows4',
							acq_campaign        : 'acq-call-flows4',
							acq_callflow        : 'acq-call-flows4',
							acq_keyword         : 'acq-call-flows4',
							acq_source          : 'acq-call-flows4',
							call_detail         : 'calls-details',
							call_back           : 'calls-callback',
							activity_stream     : 'activity-stream',
							group_activity      : 'activity-group',
							callflow_setting    : 'settings-call-flow'
						};

						var template = reportPageMap[$scope.report]+'?report='+$scope.report+'&filter_id='+$scope.filter_id+'&preview=true';

						if (saved) {
							newTab.location.href = $window.location.origin + '/#/' + template;
						}
					});
                };

                $scope.changeSecondaryGrouping = function(secondaryGroupingValue, callFromUI) {
                    if(secondaryGroupingValue !== undefined){
                        $scope.secondary = secondaryGroupingValue;
                    }
                    if(callFromUI)
                        $scope.filterReset();
                    else{
                        advFilSrvc.setSelectOptions();
                        advFilSrvc.addFilterDefinition(true);
                    }
                    $scope.advFilterDefinitions = advFilSrvc.getAdvFilterDefinitions();
                };
            }
        ])
    .controller('ScheduledReportsTableController', ['$scope', 'ScheduledReportWebService', 'pinesNotifications', '$rootScope', '$location', '$uibModal', 'ScheldueUrlFormatter', '$window', '$q', '$bootbox', '$filter',
        function($scope, ScheduledReportWebService, pinesNotifications, $rootScope, $location, $uibModal, ScheldueUrlFormatter, $window, $q, $bootbox, $filter) {
            var download_audio_setting = (typeof $window.localStorage.download_audio_enabled === "boolean") ? $window.localStorage.download_audio_enabled : ($window.localStorage.download_audio_enabled.toLowerCase() === 'true');
            if($rootScope.download_audio_enabled!==download_audio_setting){
                $rootScope.download_audio_enabled=download_audio_setting;
                $rootScope.$broadcast('download_audio_setting_changed');
            }
            $scope.currentPage = 1;
			$scope.isNotLegacy = false;
            $scope.isLoadingApi = true;
            if($rootScope.download_audio_enabled === false){
                return;
            }
            ScheduledReportWebService.getDataTableInfo().then(function(response) {
                $scope.scheduleList = response.data.json;
                console.log('TABLE DATA', $scope.scheduleList);
                $scope.isLoadingApi = false;
                $scope.totalscheduleListRows=$scope.scheduleList.length;
            });
            $scope.setScheduleHeaders = ['Name', 'Report', 'Creator', 'Dist List', 'Freq', 'Format', 'Status'];
            $scope.actionHeader = ['Actions'];

	    $rootScope.isSafari= $window.sessionStorage.isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window.safari || safari.pushNotification);

            $scope.uiReportName = {
                acq_campaign: "Acq / Campaign",
                acq_callflow: "Acq / Callflow",
                acq_keyword: "Acq / Keyword",
                acq_group: "Acq / Group",
                acq_source: "Acq / Source",
                call_detail: "Call Detail",
                call_back: "Call Back",
                group_activity: "Group Activity",
                callflow_setting: "Callflow Setting"
            };

            $scope.edit = function(row) {
                console.log('INSIDE EDIT');
                var schedrptid = '';
                 if (row.schedule_id !== undefined && row.schedule_id !== null) {
                     schedrptid = 's-'+row.schedule_id;
                 } else {
                     schedrptid = 'r-'+row.report_id;
                 }

                 if(row !== undefined){
                   var date= $scope.dateRangeConvert(row);
                   ScheduledReportWebService.setDateRange(date);
                 }


                 var baseUrl = $window.location.protocol+'//'+$window.location.hostname+'/#/set-schedule-builder?schedrptid='+schedrptid;
                 $window.location.href = baseUrl;
             };

             // data is the return data from the API that contains the 'filter' object and 'filter_rule' array of objects
           $scope.dateRangeConvert = function (row) {
             var ret = { };
             ret.schedrptid = row.report_id;
             if (row.filter_range !== null) {
               // set the start time
               ret.range = row.filter_range;
               if (row.filter_range === 'today') {
                   ret.drp_start = moment().startOf('day');
                   ret.drp_end = moment().startOf('day');
               } else if (row.filter_range === 'yesterday') {
                 ret.drp_start = moment().subtract(1, 'days').startOf('day');
                 ret.drp_end = moment().subtract(1, 'days').endOf('day');
               } else if (row.filter_range === 'last_week') {
                 ret.drp_start = moment().subtract(6, 'days').startOf('day');
                 ret.drp_end = moment().subtract(0, 'days').endOf('day');

               } else if (row.filter_range === 'last_30') {
                 ret.drp_start = moment().subtract(29, 'days').startOf('day');
                 ret.drp_end = moment().subtract(0, 'days').endOf('day');

               } else if (row.filter_range === 'this_month') {
                 ret.drp_start = moment().startOf('month').startOf('day');
                 ret.drp_end = moment().endOf('month').endOf('day');
               } else if (row.filter_range === 'last_month') {
                 ret.drp_start = moment().subtract(1, 'month').startOf('month').startOf('day');
                 ret.drp_end = moment().subtract(1, 'month').endOf('month').endOf('day');
               }
             } else if(row.filter_start !== null && row.filter_end !== null) {
               ret.drp_start = moment(row.filter_start);
               ret.drp_end = moment(row.filter_end);
             } else {
               ret.drp_start = moment().subtract(7, 'days').startOf('day');
               ret.drp_end = moment().startOf('day');
             }
             return ret;
           };


            $scope.delete = function(row, index) {
                $bootbox.confirm("Are you sure you want to delete this scheduled report?", function(clickedOK) {
                    if (clickedOK) {
						// console.log('USER CLICKED OK, DELETEING REPORT:', row);
                        ScheduledReportWebService.deleteReport(row.report_id).then(function(response) {
							// console.log('DELETE FINISHED:', response);
                            if (response.data.result === 'success') {
                                $scope.scheduleList = _.reject($scope.scheduleList, function(list) {
                                    return list.report_id == row.report_id;
                                });
                                pinesNotifications.notify({
                                    title: 'Schedule Report',
                                    text: 'Successfully deleted the scheduled report',
                                    type: 'success'
                                });
                            } else {
                                // console.log(response);
                                pinesNotifications.notify({
                                    title: 'Schedule Report',
                                    text: response.data.err,
                                    type: 'error'
                                });
                            }
                        });
                    }
                });
            };

            $scope.sendNow = function(report_id) {
                ScheduledReportWebService.sendNow(report_id).then(function(response) {
                    if (response.data.result === 'success') {
                        pinesNotifications.notify({
                            title: 'Schedule Report',
                            text: 'Your report is being processed.',
                            type: 'success'
                        });
                    } else {
                        pinesNotifications.notify({
                            title: 'Schedule Report',
                            text: response.data.err,
                            type: 'error'
                        });
                    }
                });
            };

            $scope.getCSVData = function(formate) {
                var rowsOfData = [];
                $scope.headerNames = ["Name", "Report", "Creator", "Dist List", "Freq", "Format", "Status"];

                var deferred = $q.defer();
                rowsOfData = finalizaDataToExport($scope.scheduleList);
                deferred.resolve(rowsOfData);
		if($rootScope.isSafari){
		    var reportName = "csv_schedule_report";
		    if(formate === 'tsv'){ reportName = "tsv_schedule_report";}
		    deferred.resolve(JSONToCSVConvertor(rowsOfData,reportName,true,formate));
		  }
		if(!$rootScope.isSafari){
			    return deferred.promise;
		}
            };

            $scope.getExcelData = function() {
                var rowsOfData = [];
                $scope.headerNames = ["Name", "Report", "Creator", "Dist List", "Freq", "Format", "Status"];

                var deferred = $q.defer();
                rowsOfData = finalizaDataToExport($scope.scheduleList);
                alasql('SELECT * INTO XLSX("xls_schedule_report.xlsx",{sheetid:"Sheet name",headers:true}) FROM ?', [rowsOfData]);

                deferred.resolve(rowsOfData);

                return deferred.promise;
            };

            function finalizaDataToExport(rawData) {
                var rowsOfData = [];
                _.each(rawData, function(row) {
                    rowsOfData.push({
                        "Name": row.report_name,
                        "Report": $scope.uiReportName[row.report_used],
                        "Creator": row.first_name + row.last_name,
                        "Dist List": row.list_name,
                        "Freq": $filter('capitalize')(row.freq_unit) + $filter('unit')(row),
                        "Format": row.format,
                        "Status": $filter('capitalize')(row.report_status)
                    });
                });
                return rowsOfData;
            }
        }
    ]);
}());
