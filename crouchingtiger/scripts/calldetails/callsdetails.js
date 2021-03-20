angular.module('theme.callsdetails', ['ui.select2', 'angularUtils.directives.dirPagination', "api-param"])
    .service('cfilter', ['$http', function($http) {
        'use strict';

        var cfobj = {};
        cfobj.cf = crossfilter([]);
        var ndx, all;
        $http.get('assets/demo/call_flow.json')
            .success(function(data) {
                if (data.json !== undefined) {
                    cfobj.data = data.json;
                    cfobj.ndx = cfobj.cf.add(cfobj.data);
                    cfobj.all = cfobj.ndx.groupAll();
                }
            })
            .error(function(data) {
                alert("error loading config.json");
            });

        return cfobj;
        //var idDim = cf.dimension(function(d) {
        //  return d.id;
        //});
    }])
    .factory('CallsDetailsWebService', function($q, $timeout, $http, $window, $rootScope, ApiParam) {
        'use strict';
        var CallsDetailsWebService = {};

        CallsDetailsWebService.getBaseURL = function() {
            return $rootScope.url + ":" + $rootScope.port;
        };

        CallsDetailsWebService.getJsonConfig = function() {
            var config = {
                headers: {
                    'content-type': 'application/json',
                    'Authorization': 'bearer ' + $window.sessionStorage.token
                }
            };
            return config;
        };

        CallsDetailsWebService.getCallsSummaryList = function(qryStr) {
            $http.defaults.useXDomain = true;
            //if (report === 'calls-callback') { report = 'call_back'; }
            return $http.get(ApiParam.baseURL() + "/v1/report/callDetail?" + qryStr + "&count=true", ApiParam.headerConfig());
        };

        CallsDetailsWebService.getCallsDetailsList = function(qryStr) {
            $http.defaults.useXDomain = true;
            //if (report === 'calls-callback') { report = 'call_back'; }
            return $http.get(ApiParam.baseURL() + "/v1/report/callDetail?" + qryStr, ApiParam.headerConfig());
        };

        CallsDetailsWebService.getCallsDetailsInfo = function(report, userID, callID) {
            $http.defaults.useXDomain = true;
            return $http.get(ApiParam.baseURL() + "/v1/call/Info/" + callID + "/?report=" + report + "&user_id=" + userID, ApiParam.headerConfig());
        };

        CallsDetailsWebService.getCallsComments = function(report, userID, callID) {
            $http.defaults.useXDomain = true;
            return $http.get(ApiParam.baseURL() + "/v1/call/Comment/" + callID + "/?report=" + report + "&user_id=" + userID + "&timezone=" + encodeURIComponent($rootScope.timezone), ApiParam.headerConfig());
        };

        CallsDetailsWebService.setCallsComments = function(report, commentdata, userID) {
            var req = {
                method: 'POST',
                url: ApiParam.baseURL() + "/v1/call/Comment/" + "?report=" + report + "&user_id=" + userID,
                headers: ApiParam.headerConfig().headers,
                data: commentdata
            };
            return $http(req);
        };

        CallsDetailsWebService.deleteCallsComments = function(report, commentID, userID) {
            return $http.delete(ApiParam.baseURL() + "/v1/call/Comment/" + commentID + "/?report=" + report + "&user_id=" + userID, ApiParam.headerConfig());
        };

        CallsDetailsWebService.getCallsTags = function(report, userID, callID) {
            $http.defaults.useXDomain = true;
            return $http.get($rootScope.url + ":" + $rootScope.port + "/v1/call/Tag/" + callID + "/?report=" + report + "&user_id=" + userID, this.getJsonConfig());
        };

        CallsDetailsWebService.getTags = function(report, userID, callID) {
            $http.defaults.useXDomain = true;
            return $http.get($rootScope.url + ":" + $rootScope.port + "/v1/tag/ouid/" + $rootScope.currentOUId + "/userAccess/" + $rootScope.userAccess.tag + "/?report=" + report, this.getJsonConfig());
        };

        CallsDetailsWebService.setCallsTags = function(calltagdata, userID) {
            var req = {
                method: 'POST',
                url: $rootScope.url + ":" + $rootScope.port + "/v1/call/Tag/" + "?user_id=" + userID,
                headers: {
                    'content-type': 'application/json',
                    'Authorization': 'bearer ' + $window.sessionStorage.token
                },
                data: calltagdata
            };
            return $http(req);
        };

        CallsDetailsWebService.getCallBlacklist = function() {
        // CallsDetailsWebService.getCallBlacklist = function(report, ouID, userID) {
            // $http.defaults.useXDomain = true;
            // return $http.get($rootScope.url + ":" + $rootScope.port + "/v1/blacklist/ouid/" + ouID + "/" + "?report=" + report + "&user_id=" + userID, this.getJsonConfig());
            var req = {
                method: 'GET',
                url: ApiParam.baseURL() + "/v1/blacklist/"+ "?page=allNumbers",
                headers: ApiParam.headerConfig().headers
            };
            var res = $http(req);
            return res;


        };

        CallsDetailsWebService.getAllTopOuUsers = function(orgUnitId) {
            $http.defaults.useXDomain = true;
            console.log(ApiParam.baseURL());
            return $http.get(ApiParam.baseURL() + "/v1/user/groups/" + orgUnitId, this.getJsonConfig());
            //return $http.get("http://localhost:8181" + "/v1/user/groups/" + orgUnitId, this.getJsonConfig());
            // return $http.get($rootScope.url + ":" + $rootScope.port + "/v1/user/groups/" + orgUnitId, this.getJsonConfig());
        };

        CallsDetailsWebService.setCallBlacklist = function(blacklist) {
            // var blacklistjson = {
            //     "blacklist": {
            //         "org_unit_id": ouID,
            //         "source": callSourceID,
            //         "encrypted_source": encryptedSource,
            //         "numbers": blockedCalls
            //     }
            // };
            var req = {
                method: 'POST',
                url: ApiParam.baseURL() + "/v1/blacklist/bulk",
                headers: ApiParam.headerConfig().headers,
                data: blacklist
            };
            var res = $http(req);
            return res;
            // var req = {
            //     method: 'POST',
            //     url: $rootScope.url + ":" + $rootScope.port + "/v1/blacklist/append",
            //     headers: {
            //         'content-type': 'application/json',
            //         'Authorization': 'bearer ' + $window.sessionStorage.token
            //     },
            //     data: blacklistjson
            // };
            // return $http(req);
        };

        CallsDetailsWebService.unsetCallBlacklist = function(callSourceID) {
            // var blacklistjson = {
            //     "blacklist": {
            //         "org_unit_id": ouID,
            //         "encrypted_source": encryptedSource,
            //         "source": callSourceID,
            //         "numbers": blockedCalls
            //     }
            // };
            callSourceID = parseInt(callSourceID,10);
            var unblockNumber=[{'id':callSourceID}];            
            var req = {
                method: 'DELETE',
                url: ApiParam.baseURL() + "/v1/blacklist/",
                headers: ApiParam.headerConfig().headers,
                data: unblockNumber
            };
            var res = $http(req);
            return res;

            // var req = {
            //     method: 'PUT',
            //     url: $rootScope.url + ":" + $rootScope.port + "/v1/blacklist/delete",
            //     headers: {
            //         'content-type': 'application/json',
            //         'Authorization': 'bearer ' + $window.sessionStorage.token
            //     },
            //     data: blacklistjson
            // };
            // return $http(req);
        };

        CallsDetailsWebService.emailRecording = function(emailData) {
            var req = {
                method: 'POST',
                url: $rootScope.url + ":" + $rootScope.port + "/v1/call/email",
                headers: {
                    'content-type': 'application/json',
                    'Authorization': 'bearer ' + $window.sessionStorage.token
                },
                data: emailData
            };
            return $http(req);
        };

        CallsDetailsWebService.saveAgentToCall = function(agentItemSelected) {
            var req = {
                method: 'POST',
                url: $rootScope.url + ":" + $rootScope.port + "/v1/calldetail/agent",
                headers: {
                    'content-type': 'application/json',
                    'Authorization': 'bearer ' + $window.sessionStorage.token
                },
                data: agentItemSelected
            };
            return $http(req);
        };

        CallsDetailsWebService.checkIfUserValid = function (ct_user_id,callGroup) {
            $http.defaults.useXDomain = true;
            return $http.get(ApiParam.baseURL() + "/v1/scoreCardCall/checkifuservalid/userid/"+ct_user_id+"/callgroup/"+callGroup, ApiParam.headerConfig());
        };
        return CallsDetailsWebService;
    })

//The dynamicUrl directive is calling from calls-details.html and calls-callback.html page, this is created for ading the source url the audio tag
.directive('dynamicUrl', function() {
        return {
            restrict: 'A',
            link: function postLink(scope, element, attrs) {
                element.attr('src', attrs.ngId);
                //increase the count
                scope.increaseAudioInitializationCount();
                //We need to initialize the medeelements only after loding all the rows thats why here I checking the length
                // if(parseInt(scope.items.length) === parseInt(scope.audioInitializationCount)) {
                //     console.log("last element found.....");
                //     scope.loadMediaElement();
                // }
                scope.loadMediaElement();
            }
        };
    })
    .controller('CallsDetailsController', ['$scope', '$http', '$window', '$rootScope', '$routeParams', 'CallsDetailsWebService', 'pinesNotifications', '$timeout', '$compile', '$q', '$bootbox', '$uibModal', '$location', 'advFilSrvc', 'progressLoader',
        function($scope, $http, $window, $rootScope, $routeParams, CallsDetailsWebService, pinesNotifications, $timeout, $compile, $q, $bootbox, $uibModal, $location, advFilSrvc, progressLoader) {
            var download_audio_setting = $window.localStorage.download_audio_enabled;
            download_audio_setting = (typeof download_audio_setting === "boolean") ? download_audio_setting : (download_audio_setting ==undefined || download_audio_setting =='undefined' || $window.localStorage.download_audio_enabled.toLowerCase() === 'true');
            if($rootScope.download_audio_enabled!==download_audio_setting){
                $rootScope.download_audio_enabled=download_audio_setting;
                $rootScope.$broadcast('download_audio_setting_changed');
            }
            $scope.audioInitializationCount = 0;
            $scope.isLoadingApi=true;
            $scope.simpleSearchFilter = "";
            $scope.filterApplied = false;
            $scope.horsemanFlag = false;
            $scope.hideDataTable = false;
            $scope.hidePaginationControls = false;
            $scope.roleId = $rootScope.roleId;
            $scope.currentPage = 1;
            $scope.report = ($location.search().report ? $location.search().report : 'call_detail');
            $scope.pageSize = 100;
            $scope.showme = [];
            $scope.actionHeader = ['Actions'];
            $scope.callbackHeader = ['Date/Time', 'Group Name', 'Campaign', 'Ad Source', 'Custom source 1', 'Custom source 2', 'Custom source 3', 'Custom source 4', 'Custom source 5', 'Caller ID', 'Tracking Number', 'Destination Name | No.', 'Duration', 'Voicemail'];
            $scope.callDetailsHeader = ['Date/Time', 'Group Name', 'Campaign', 'Ad Source', 'Custom source 1', 'Custom source 2', 'Custom source 3', 'Custom source 4', 'Custom source 5', 'Caller ID', 'Tracking Number', 'Destination Name | No.', 'Duration', 'Voicemail'];
            $scope.pagination = { current: ($routeParams.page ? $routeParams.page : 1) };
            var csVisible = false;
            $scope.username = null;
            $scope.IdentifiedAgentData = [];
            $scope.agentItemSelected = {};
            $rootScope.isSafari = $window.sessionStorage.isSafari = /constructor/i.test(window.HTMLElement) || (function(p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window.safari || safari.pushNotification);
            $scope.preview = ($location.search().preview ? $location.search().preview : false);
            $scope.isFromReportEngine = ($location.search().isFromReportEngine ? $location.search().isFromReportEngine : false);
            if ($scope.preview || $scope.isFromReportEngine) { csVisible = true; }
            advFilSrvc.getAllCustomSources();
            // They keys here map to what gets set on $scope.items inside the function loadReportBasedOnQueryString. The DOM then determines whether to show the column based on
            // if it's visibile attribute is true.
			$scope.access_audio = $rootScope.access_audio;
		
			$scope.audioAccessPermission = true;

			if ($scope.access_audio === false || $scope.access_audio === 'false'){
				$scope.audioAccessPermission = false;
			}
            if($rootScope.is_migrated === true || $rootScope.is_migrated === 'true' ){
                $scope.isMigated = true;
            }else{
                $scope.isMigated = false;
            }  
            $scope.callDetailsColumnMapping = [
                { label: "Date/Time", key: "call_started", visible: true, disabled: false, show: true },
                { label: "Group Name", key: "org_unit_name", visible: true, disabled: false, show: true },
                { label: "Campaign", key: "campaign_name", visible: true, disabled: false, show: true },
                { label: "Ad Source", key: ["category", ":", "sub_category"], visible: true, disabled: false, show: true },
                { label: "Custom Source 1", key: "custom_source1", visible: csVisible, disabled: false, show: true },
                { label: "Custom Source 2", key: "custom_source2", visible: csVisible, disabled: false, show: true },
                { label: "Custom Source 3", key: "custom_source3", visible: csVisible, disabled: false, show: true },
                { label: "Custom Source 4", key: "custom_source4", visible: csVisible, disabled: false, show: true },
                { label: "Custom Source 5", key: "custom_source5", visible: csVisible, disabled: false, show: true },

                { label: "Caller ID", key: "source", visible: true, disabled: false, show: true },
                { label: "Tracking Number", key: "tracking", visible: true, disabled: false, show: true },
                { label: "Hunt Type", key: "hunt_type", visible: csVisible, disabled: false, show: $scope.is_migrated },
                { label: "Number Type", key: "tracking_type", visible: csVisible, disabled: false, show: $scope.isMigated },
                { label: "Destination Name | No.", key: ["ring_to_name", " | ", "ring_to"], visible: true, disabled: false, show: true },
                { label: "Duration", key: "duration", visible: true, disabled: false, show: true },
                { label: "Caller Name", key: "caller_name", visible: false, disabled: false, show: true },
                { label: "Company Name", key: "company_name", visible: false, disabled: false, show: true },
                { label: "Address", key: "address", visible: false, disabled: false, show: true },
                { label: "City", key: "city", visible: false, disabled: false, show: true },
                { label: "State/Province", key: "state", visible: false, disabled: false, show: true },
                { label: "Zip/Postal Code", key: "zip", visible: false, disabled: false, show: true },
                { label: "Instant Insights", key: "instant_insights", visible: false, disabled: false, show: $scope.is_migrated },
                { label: "Instant Insights Config", key: "instant_insights_config", visible: false, disabled: false, show: $scope.is_migrated },
                { label: "Disposition", key: "disposition", visible: true, disabled: false, show: true },
                { label: "Line Type", key: "line_type", visible: true, disabled: false, show: true },
                { label: "Agent", key: "agent", visible: true, disabled: false, show: true },
                { label: "Actions", visible: true, disabled: false, show: true },
                
            ];
            if($scope.isMigated){
                var index = _.findIndex($scope.callDetailsColumnMapping, { key: 'line_type' });
                $scope.callDetailsColumnMapping.splice(index+1,0,{ label: "Sent to Voicemail", key: "is_voicemail", visible: false, disabled: false, show: true });
            }
            $scope.routeTypes = {
                SimpleRoute: "Simple",
                IvrRoute2:    "IVR",
                PercentageBasedRoute: "Percentage",
                GeoRoute:    "GeoRoute",
                OutboundRoute:     "Outbound",
                ScheduleRoute: "Schedule",
                VoicemailRoute : "Voicemail"
            };
            $scope.callDetailsColumnToggle = function(ele) {
                setTimeout(function() {

                    $("#cdr_table").floatingScroll("update");
                }, 100);
			};

            if ($location.search().preview) {
                $("#wrap").append('<div id="previewBlock">&nbsp;</div>');
            }

            console.log('REPORT', $scope.report);

            $scope.drp_options = {
                ranges: {
                    'Today': [moment().startOf('day'), moment().endOf('day')],
                    'Yesterday': [moment().subtract(1, 'days').startOf('day'), moment().subtract(1, 'days').endOf('day')],
                    'Last 7 Days': [moment().subtract(6, 'days').startOf('day'), moment().subtract(0, 'days').endOf('day')],
                    'Last 30 Days': [moment().subtract(29, 'days').startOf('day'), moment().subtract(0, 'days').endOf('day')],
                    'This Month': [moment().startOf('month').startOf('day'), moment().endOf('month').endOf('day')],
                    'Last Month': [moment().subtract(1, 'month').startOf('month').startOf('day'), moment().subtract(1, 'month').endOf('month').endOf('day')]
                },
                opens: 'left',
                startDate: moment().subtract(7, 'days').startOf('day'),
                endDate: moment().subtract(1, 'days').endOf('day')
            };

            // Set datepicker on load
            if ($window.sessionStorage.report_start_date) {
                $scope.drp_start = moment($window.sessionStorage.report_start_date).format('MMMM D, YYYY');
            } else {
                $scope.drp_start = $scope.drp_options.ranges['Last 7 Days'][0].format('MMMM D, YYYY');
            }
            if ($window.sessionStorage.report_end_date) {
                $scope.drp_end = moment($window.sessionStorage.report_end_date).format('MMMM D, YYYY');
            } else {
                $scope.drp_end = $scope.drp_options.ranges['Last 7 Days'][1].format('MMMM D, YYYY');
            }
            $scope.drp_options.startDate = moment($scope.drp_start);
            $scope.drp_options.endDate = moment($scope.drp_end);
            console.log('DRP_OPTIONS', $scope.drp_options);

            $scope.paginateHeaderTemp = null;
            $scope.summaryItemsTemp = null;
            $scope.showAgent = false;

            if ((parseInt($scope.roleId) === 2 && ($rootScope.score_call === "false" || $rootScope.score_call === false)) || (parseInt($scope.roleId) === 1 && ($rootScope.score_call === "false" || $rootScope.score_call === false))) {
                $scope.showAgent = false;
            }

            $scope.disableAgent = function(scorecard_call_status) {
                if($scope.userAccess && ($scope.userAccess.manualscorecard === undefined || $scope.userAccess.manualscorecard <= 4)){
                    $scope.showAgent = true;
                    return false;
                }else{
                    if(scorecard_call_status === 'needs_scorecard' || scorecard_call_status === "unscored"){
                        $scope.showAgent = true;
                        return false;
                    }else{
                        return true;
                    }
                }
            };

            $scope.loadReportBasedOnQueryString = function() {
                if($rootScope.download_audio_enabled === false){
                    return;
                }
                $scope.hideDataTable = true;
                $scope.hidePaginationControls = true;
                $scope.isLoadingApi = true;
                console.log('INSIDE loadReportBasedOnQueryString IN callsdetails.js: Loading report with urlParams:', $scope.urlParams);
                $scope.paginateHeader = 'Loading Data...';
                var tmp = "";
                if ($scope.urlParams.filtertype == "s"){
                   
                    if (typeof($scope.urlParams.filter == "string")){
                        tmp = $scope.urlParams.filter;
                        var hashIndex = $scope.urlParams.filter.indexOf("`");
                        if (hashIndex > -1){
                            comIndex = $scope.urlParams.filter;
                            tmp = comIndex.replace(/`/g,",");
                        }
                    }
                    $scope.simpleSearchFilter = tmp;
                    
                }
                CallsDetailsWebService.getCallsSummaryList($.param($scope.urlParams)).then(function(result) {
                    $scope.urlParams.filter = tmp;
                    if (result.data.json !== undefined) {
                        console.log('INSIDE CallsDetailsWebService.getCallsSummaryList IN callsdetails.js: Data found', result.data.json);
                        if(result.data.json[0].total_count_calls === 0){
                             $scope.paginateHeader = 'No Data found.';
                        }
                        
                        if (result.data.json.length > 0) {

                            var dataSet = result.data.json;
                            _.each(dataSet, function(data) {
                                data.singlerec = 1;
                                data.average_durationHHMMSS = moment.utc(parseInt(data.average_duration_calls) * 1000);
                                data.total_durationHHMMSS = moment.utc(parseInt(data.total_duration_calls) * 1000);
                                data.average_durationHH = data.average_durationHHMMSS.hours();
                                data.average_durationMM = data.average_durationHHMMSS.minutes();
                                data.average_durationSS = data.average_durationHHMMSS.seconds();
                                data.total_durationHH = data.total_durationHHMMSS.hours();
                                data.total_durationMM = data.total_durationHHMMSS.minutes();
                                data.total_durationSS = data.total_durationHHMMSS.seconds();
                            });
                            $scope.summaryItemsTemp = dataSet;
                            var headerString = 'Showing ';
                            if ($scope.pagination.current > 1) {
                                headerString = headerString + ' ' + (($scope.pageSize * ($scope.pagination.current - 1)) + 1) + ' - ';
                            } else {
                                headerString = headerString + ' ' + $scope.pagination.current + ' - ';
                            }
                            if (($scope.pageSize * $scope.pagination.current) > $scope.summaryItemsTemp[0].total_count_calls) {
                                headerString = headerString + ' ' + $scope.summaryItemsTemp[0].total_count_calls + ' of ' + $scope.summaryItemsTemp[0].total_count_calls;
                            } else {
                                headerString = headerString + ' ' + ($scope.pageSize * $scope.pagination.current) + ' of ' + $scope.summaryItemsTemp[0].total_count_calls;
                            }
                            if ($scope.summaryItemsTemp[0].total_count_calls > 0) {
                                $scope.paginateHeaderTemp = headerString;
                            } else {
                                $scope.paginateHeaderTemp = 'No Data Found';
                            }
                        } else {
                            $scope.paginateHeaderTemp = 'No Data Found';
                            console.log('No returned result data');
                        }
                    } else {
                        $scope.paginateHeaderTemp = 'No Result';
                        console.log('No result data');
                    }
                });

                console.log('INSIDE loadReportBasedOnQueryString IN callsdetails.js: About to fire getCallsDetailsList');
                
                CallsDetailsWebService.getCallsDetailsList($.param($scope.urlParams)).then(function(result) {
                    $scope.isLoadingApi = true;
                    $scope.horsemanFlag = true;
                    if (result.data.json === undefined) {
                        console.log('INSIDE CallsDetailsWebService.getCallsDetailsList IN callsdetails.js: Returning false');
                        $scope.isLoadingApi = false;
                        return false;
                    } else if (result.data.json.length > 0 && result.data.json[0].callList.length > 0) {
                        $scope.isLoadingApi = false;
                         setTimeout(function() {
                            $("#cdr_table").floatingScroll("update");
                        }, 100);
                        var dataSet = result.data.json[0].callList;
                        var timeFormat2 = d3.time.format('%Y-%m-%dT%H:%M:%S.%LZ');
                        if(result.data.json[0].agents !== undefined && result.data.json[0].agents.length > 0){
                            $scope.IdentifiedAgentData = result.data.json[0].agents;
                        }
                        _.each(dataSet, function(data) {
                            data.ring_to_name  = (data.ring_to_name === "") ? " " :  data.ring_to_name ;                            
                            if($rootScope.is_migrated === false || $rootScope.is_migrated === 'false' ) {
                                if (data.disposition) {
                                    data.disposition = data.disposition.charAt(0).toUpperCase() + data.disposition.slice(1).toLowerCase();
                                }
                            }
                            data.is_voicemail = (data.is_voicemail === true) ? 'Yes' : 'No';
                            data.instant_insights = (data.instant_insights === true) ? 'Yes' : 'No';
                            data.instant_insights_config = (data.instant_insights_config ) ? data.instant_insights_config  : ' ';

                            
                            if(data.tracking_type && data.tracking_type !== "NULL"){
                                if(data.tracking_type =="GeoRoute_Npa")
                                {
                                    data.tracking_type = "GeoRoute - Caller Area Code Proximity";
                                }else if (data.tracking_type =="GeoRoute_claimedState"){
                                    data.tracking_type = "GeoRoute - Claimed State";
                                }else if (data.tracking_type =="GeoRoute_Claimed"){
                                    data.tracking_type ="GeoRoute - Claimed Zip-code";
                                }else if (data.tracking_type =="GeoRoute_Zipcode"){
                                    data.tracking_type ="GeoRoute - Zip-code Proximity";
                                }
                                if($scope.routeTypes[data.tracking_type])
                                    data.tracking_type = $scope.routeTypes[data.tracking_type];
                            }else{
                                data.tracking_type = ' ';
                            }
                            if(data.call_data && data.cdr_source == 'API'){
                                data.call_data = (data.call_data !== "NoInfo" && typeof(data.call_data) !== "object") ? JSON.parse(data.call_data) : data.call_data;
                                data.line_type = data.call_data.line_type ? data.call_data.line_type : " ";
                                if(data.call_data.belongs_to && data.call_data.belongs_to[0]){
                                    data.caller_name = (data.call_data.belongs_to[0].name) ? data.call_data.belongs_to[0].name : " ";
                                    data.company_name = (data.call_data.carrier) ? data.call_data.carrier : " ";
                                }else{
                                    data.caller_name = " ";
                                    data.company_name = " ";
                                }
                                if (data.call_data.current_addresses && data.call_data.current_addresses[0]) {
                                    data.address = (data.call_data.current_addresses[0].street_line_1) ? data.call_data.current_addresses[0].street_line_1 : " ";
                                    data.state = (data.call_data.current_addresses[0].state_code) ? data.call_data.current_addresses[0].state_code : " ";
                                    data.city = (data.call_data.current_addresses[0].city) ? data.call_data.current_addresses[0].city : " ";
                                    data.zip = (data.call_data.current_addresses[0].zip4) ? data.call_data.current_addresses[0].zip4 : " ";
                                }else{
                                    data.address = " ";
                                    data.state = " ";
                                    data.city = " ";
                                    data.zip = " ";
                                }
                            }else if (data.call_data) {
                                data.call_data = (data.call_data !== "NoInfo" && typeof(data.call_data) !== "object") ? JSON.parse(data.call_data) : data.call_data;
                                data.line_type = data.call_data.line_type ? data.call_data.line_type : " ";
                                if (data.call_data.belongs_to && data.call_data.belongs_to[0] && data.call_data.belongs_to[0].type === "Person") {
                                    data.caller_name = (data.call_data.belongs_to[0].name) ? data.call_data.belongs_to[0].name : " ";
                                    data.company_name = " ";
                                } else if (data.call_data.belongs_to && data.call_data.belongs_to[0] && data.call_data.belongs_to[0].type !== "Person") {
                                    data.company_name = (data.call_data.belongs_to[0].name) ? data.call_data.belongs_to[0].name : " ";
                                    data.caller_name = " ";
                                } else {
                                    data.caller_name = " ";
                                    data.company_name = " ";
                                }
                                if (data.call_data.current_addresses && data.call_data.current_addresses[0]) {
                                    data.address = (data.call_data.current_addresses[0].street_line_1) ? data.call_data.current_addresses[0].street_line_1 : " ";
                                    data.state = (data.call_data.current_addresses[0].state_code) ? data.call_data.current_addresses[0].state_code : " ";
                                    data.city = (data.call_data.current_addresses[0].city) ? data.call_data.current_addresses[0].city : " ";
                                    data.zip = (data.call_data.current_addresses[0].postal_code) ? data.call_data.current_addresses[0].postal_code : " ";
                                } else {
                                    data.address = " ";
                                    data.state = " ";
                                    data.city = " ";
                                    data.zip = " ";
                                }
                            } else if (!data.call_data) {
                                data.company_name = " ";
                                data.caller_name = " ";
                                data.address = " ";
                                data.state = " ";
                                data.city = " ";
                                data.zip = " ";
                                data.line_type = " ";
                            }
                            data.d3_date = timeFormat2.parse(data.call_started);
                            //data.call_start_date = moment(data.call_started, "YYYY-MM-DD").format("MM-DD-YYYY h:mm:ss a");
                            data.call_started = moment.utc(data.call_started).format("MM-DD-YYYY h:mm:ss a");
                            data.singlerec = 1;
                            data.blocktext = "Block";
                            data.blockclass = 'btn-danger';
                            data.showinfo = false;
                            data.noRecording = false;
                            data.listenLabel = "Listen to call";
                            data.callAgentList = angular.copy($scope.IdentifiedAgentData);
                            if(data.ct_user_id){
                                var assignedUser = _.findWhere(data.callAgentList, {ct_user_id: data.ct_user_id});
                                if(assignedUser){
                                    data.agent = assignedUser;
                                }
                                else if(data.score_card_call_status === "scored" || data.score_card_call_status === "reviewed" ){
                                    data.callAgentList.push({
                                        ct_user_id: data.ct_user_id,
                                        username: data.username
                                        });
                                        data.agent = _.findWhere(data.callAgentList, {ct_user_id: data.ct_user_id});
                                }else{
                                    data.agent = {};
                                }
                            }
                            else{
                                data.agent = {};
                            }

                            // if(!$scope.showAgent)
                            //     data.agent = {};
                            if (data.disposition == "REFERRAL") {
                                data.noRecording = true;
                                data.listenLabel = "No recording for this call";
                            }
                            data.callAgentList.shift();
                            data.callAgentList = _.sortBy(data.callAgentList, 'username');
                            data.callAgentList.unshift({
                                "username": "Unassign",
                                "ct_user_id": "unassigned"
                            });
                        });

                        console.log('@@@@@@@@@ INSIDE CallsDetailsWebService.getCallsDetailsList IN callsdetails.js: Setting items', dataSet);
                        $scope.items = dataSet;
                        $scope.xf1 = crossfilter(dataSet);
                        $scope.dc1 = dc;
                        for (var i = 0; i < dataSet.length; i++) {
                            $scope.showme[i] = false;
                        }

                    CallsDetailsWebService.getCallBlacklist().then(function(result) {
                        if(result.data.json && result.data.json.blacklistNumbers && result.data.json.blacklistNumbers.length>0){
                            dataSet = result.data.json.blacklistNumbers;
                            var provisioned_route_ids = [];
                            if (dataSet !== undefined ) {
                                var number = [];
                                var encrypted = [];
                                //provisioned_route_ids = dataSet[0].provisioned_route_ids;
                                // angular.forEach(dataSet, function(item,index) {
                                //     number.push(item[index].number);
                                    //encrypted.push(item.encrypted_source);
                                // });
                                for(var k=0;k<dataSet.length;k++){
                                    number.push(dataSet[k].number);
                                }
                                $scope.blocked_calls = number.join(",");
                                $scope.encrypted_source = encrypted.join(",");
                            }

                            if ($scope.blocked_calls !== undefined) {
                                _.each($scope.items, function(data) {
                                    var isBlocked = -1;

                                    //test for valid caller id 'source'
                                    if (data.source.length > 1 && data.source !== "0") {
                                        isBlocked = (($scope.blocked_calls.search(data.source) > -1 || $scope.encrypted_source.search(data.encrypted_source) > -1));
                                    }
                                    //found
                                    if (isBlocked) { //Currently Blocked
                                        data.blocktext = "Unblock";
                                        data.blockclass = 'btn-danger-alt';
                                    } else { //not found - Currently Unblocked
                                        data.blocktext = "Block";
                                        data.blockclass = 'btn-danger';
                                    }
                                }, $scope.blocked_calls, $scope.encrypted_source, provisioned_route_ids);
                            }
                        // });
                        }
                    });
                        $scope.isLoadingApi = false;
                    } else {
                        console.log('INSIDE CallsDetailsWebService.getCallsDetailsList IN callsdetails.js: The length of the results is 0.');
                        $scope.items = [];
                        $scope.isLoadingApi = false;
                    }


                    $scope.hideDataTable = false;
                    $scope.hidePaginationControls = false;
                    $scope.summaryitems = $scope.summaryItemsTemp;
                    if($scope.paginateHeaderTemp)
                        $scope.paginateHeader = $scope.paginateHeaderTemp;
                    // setTimeout(function() {
                    //     $scope.horsemanFlag = true;
                    // }, 1000);

                    if ($scope.showAdvFilter === true && $scope.advFilterDefinitions.length > 0) {
                        if ($scope.advFilterDefinitions[0].user_input || $scope.advFilterDefinitions[0].user_input === 0) {
                            $scope.filterApplied = true;
                        }
                    } else if ($scope.simpleSearchFilter.length > 0) {
                        $scope.filterApplied = true;
                    }
                });
            };

            //Save selected agent
            $scope.changedValue = function(item, call_id, org_unit_id, ct_user_id) {
                if(item.agent.ct_user_id !== "unassigned" ){
                    CallsDetailsWebService.checkIfUserValid(item.agent.ct_user_id, org_unit_id).then(function(result) {
                        if(result.data.json.length > 0){
                            $scope.saveAgentToCallRecord(item.agent, call_id);
                            item.agent = _.findWhere(item.callAgentList, {ct_user_id: item.agent.ct_user_id});
                        }else{
                            $bootbox.confirm("The agent you are identifying on the call is not a part of the group the call belongs to. Are you sure you want to proceed?", function (clickedOK) {
                                if (clickedOK) {                      
                                    $scope.saveAgentToCallRecord(item.agent, call_id);
                                }else{
                                    if(ct_user_id === null){
                                        item.agent = [];
                                    }else{
                                        item.agent = _.findWhere(item.callAgentList, {ct_user_id: ct_user_id});
                                    }
                                }
                              }); 
                            }
                        }); 
                  }else{
                    $scope.saveAgentToCallRecord(item.agent, call_id);
                  }                                   
            };

            $scope.saveAgentToCallRecord = function(item, call_id) {
                if(item !== null &&  item.ct_user_id){
                    var agentItemSelected = {
                        "ct_user_id": item.ct_user_id,
                        "call_id": parseInt(call_id)
                    };
                    CallsDetailsWebService.saveAgentToCall(agentItemSelected)
                        .then(function(result) {
                            if (result.data.result === 'error') {
                                pinesNotifications.notify({
                                    title: 'Call Details Update',
                                    text: result.data.err,
                                    type: 'error'
                                });
                            } else {
                                pinesNotifications.notify({
                                    title: 'Call Details Update',
                                    text: "Successfully assigned agent to call.",
                                    type: 'success'

                                });
                            }
                        });
                } 
            };
            // Send scope to advanced filter directive
            /*$scope.$on('request_scope', function() {
                console.log("INSIDE 'request_scope' IN callsdetails.js: Broadcasting 'receive_scope'");
                $rootScope.$broadcast('receive_scope', $scope);
            });

            // return from determineReportQueryParams
            $scope.$on('return_url_params', function(e, urlParams) {
                console.log('INSIDE return_url_params IN callsdetails.js: Received filter params:', urlParams);
                $scope.urlParams = urlParams.vars;
                delete urlParams.vars;
                angular.extend($scope, urlParams);
            });
            */

            $scope.redirectScheduledEditor = function(whichReport) {
                $scope.applyFilterParams();
                $scope.loadReportBasedOnQueryString();
                //determineReportQueryParams();
                //$location.url($location.path()+'?'+$.param($scope.urlParams));
            };

            $scope.pageChanged = function(newPage) {
                console.log('PAGE CHANGED');
                $scope.offset = ($scope.pageSize * ($scope.pagination.current - 1));
                $scope.applyFilter();
            };

            $scope.noPulse = function() {
                if (document.getElementsByClassName('pulse').length !== 0) {
                    document.getElementsByClassName('pulse')[0].classList.remove('pulse');
                }
            };

            $scope.resizeWindow = function() {
                setTimeout(function() {
                    $(window).trigger('resize');
                }, 100);
            };

            $("[data-collapse-group='audioShow']").click(function() {
                var $this = $(this);
                $("[data-collapse-group='audioShow']:not([data-target='" + $this.data("target") + "'])").each(function() {
                    $($(this).data("target"))
                        .removeClass("in")
                        .addClass('collapse');
                });
            });
            $("[data-collapse-group='infoShow']").click(function() {
                var $this = $(this);
                $("[data-collapse-group='infoShow']:not([data-target='" + $this.data("target") + "'])").each(function() {
                    $($(this).data("target"))
                        .removeClass("in")
                        .addClass('collapse');
                });
            });

            $scope.call_report = $window.document.URL.split("/");
            $scope.call_report = $scope.call_report[$scope.call_report.length - 1];
            $scope.call_report = $scope.call_report.split("?")[0];

            if ($scope.call_report === "calls-details") {
                $scope.call_report = 'call_detail';
            } else if ($scope.call_report === "calls-callback") {
                $scope.call_report = 'call_back';
            } else {
                console.log('Bad call_report value for $scope.call_report');
            }
            // console.log('CALL_REPORT', $scope.call_report);

            $scope.comment = {};
            $scope.comment.text = [];

            $scope.isReadonly = false;
            $scope.isTagAccess = true;
            $scope.isClick = true;

            if ($scope.userAccess && ($scope.userAccess.campaign === undefined || $scope.userAccess.campaign < 5)) {
                $scope.isReadonly = true;
            }
            // if ($scope.userAccess && ($scope.userAccess.tag < 5 || $scope.userAccess.tag === undefined)) {
            //     $scope.isTagAccess = false;
            // }

            $scope.getCSVData = function(formate) {
                var urlParams = determineReportQueryParams();
                console.log("==================================PARSMS",$scope.urlParams);
                // $scope.urlParams.exportData = true;
                 $scope.urlParams.limit = 100000;
                // $scope.urlParams.offset = 0;
                // $scope.csvHeaderNames = ["Call ID", "Date/Time", "Group Name", "Campaign", "Ad Source", "Caller ID", "Tracking No.", "Destination Name | No.", "Duration"];
                $scope.csvHeaderNames = ['Call ID'];
                $scope.csvKeys = ['call_id'];
                $scope.customSourceMapping = ['Custom Source 1', 'Custom Source 2', 'Custom Source 3', 'Custom Source 4', 'Custom Source 5'];
                $scope.callDetailsColumnMapping.forEach(function(ele) {
                    if (ele.label !== 'Actions') {
                        if ($scope.customSourceMapping.indexOf(ele.label) !== -1) {
                            $scope.csvHeaderNames.push(ele.label);
                            $scope.csvKeys.push(ele.key);
                        } else if (ele.visible) {
                            $scope.csvHeaderNames.push(ele.label);
                            $scope.csvKeys.push(ele.key);
                        }
                    }
                });
                console.log('csvHeaderNames', $scope.csvHeaderNames);
                console.log('csvKeys', $scope.csvKeys);
                var calldetailsData = [];
                if ($scope.summaryitems && $scope.summaryitems[0].total_count_calls > 100000) {
                    $bootbox.alert("Your export will be capped at the maximum number of 100,000 records.");
                    $scope.urlParams.limit = 100000;
                }
                var deferred = $q.defer(); //promise

                CallsDetailsWebService.getCallsDetailsList($.param($scope.urlParams)).then(function(result) {
                    if (result.data.json.length > 0 && result.data.json[0].callList.length > 0) {
                        var dataSet = result.data.json[0].callList;
                        console.log('EXPORT CSV DATASET', dataSet);
                        var timeFormat2 = d3.time.format('%Y-%m-%dT%H:%M:%S.%LZ');
                        $scope.isLoadingApi = false;
                        var exportData = {};
                        $scope.csvKeys.forEach(function(ele) {
                            if (Array.isArray(ele)) {
                                exportData[ele[0]] = true;
                                exportData[ele[2]] = true;
                            } else {
                                exportData[ele] = true;
                            }
                        });

                        var dataAppend;

                        // console.log('EXPORT DATA', exportData);

                        for (var i = 0; i < dataSet.length; i++) {
                            if(dataSet[i].is_voicemail){
                                dataSet[i].is_voicemail = 'Yes';
                            }else{
                                dataSet[i].is_voicemail = 'No';
                            }
                            if(dataSet[i].instant_insights == true){
                                dataSet[i].instant_insights = 'Yes';
                            }else{
                                dataSet[i].instant_insights = 'No';
                            }
                            if(dataSet[i].tracking_type && dataSet[i].tracking_type !== "NULL"){
                                if(dataSet[i].tracking_type =="GeoRoute_Npa")
                                {
                                    dataSet[i].tracking_type = "GeoRoute - Caller Area Code Proximity";
                                }else if (dataSet[i].tracking_type =="GeoRoute_claimedState"){
                                    dataSet[i].tracking_type = "GeoRoute - Claimed State";
                                }else if (dataSet[i].tracking_type =="GeoRoute_Claimed"){
                                    dataSet[i].tracking_type ="GeoRoute - Claimed Zip-code";
                                }else if (dataSet[i].tracking_type =="GeoRoute_Zipcode"){
                                    dataSet[i].tracking_type ="GeoRoute - Zip-code Proximity";
                                }
                                if($scope.routeTypes[dataSet[i].tracking_type])
                                dataSet[i].tracking_type = $scope.routeTypes[dataSet[i].tracking_type];
                            }else{
                                dataSet[i].tracking_type = ' ';
                            }
                            //(dataSet[i].is_voicemail) ? dataSet[i].is_voicemail = 'Yes' : dataSet[i].is_voicemail = 'No';
                            var temp = {};
                            dataAppend = (dataSet[i].call_data !== null && dataSet[i].call_data !== "NoInfo" && typeof(dataSet[i].call_data) !== "object") ? JSON.parse(dataSet[i].call_data) : dataSet[i].call_data;
                            for (var j in exportData) {
                                switch (j) {
                                    case 'call_started':
                                        temp[j] = moment(dataSet[i][j]).format("MM-DD-YYYY h:mm:ss a");
                                        break;
                                    case 'disposition':
                                        temp[j] = dataSet[i][j].charAt(0).toUpperCase() + dataSet[i][j].slice(1).toLowerCase();
                                        break;
                                    case 'category':
                                        temp[j] = dataSet[i][j] + ":" + dataSet[i].sub_category;
                                        break;
                                    case 'ring_to_name':
                                        temp.destination = dataSet[i][j] + " | " + dataSet[i].ring_to;
                                        break;
                                    case 'caller_name':
                                        temp.caller_name = (dataAppend && dataAppend !== "NoInfo" && dataAppend.belongs_to && dataAppend.belongs_to[0] && dataAppend.belongs_to[0].name && dataAppend.belongs_to[0].type === "Person") ? dataAppend.belongs_to[0].name : "";
                                        break;
                                    case 'company_name':
                                        if(dataSet[i].cdr_source != 'API'){
                                            temp.company_name = (dataAppend && dataAppend !== "NoInfo" && dataAppend.belongs_to && dataAppend.belongs_to[0] && dataAppend.belongs_to[0].name && dataAppend.belongs_to[0].type !== "Person") ? dataAppend.belongs_to[0].name : "";
                                        }else{
                                            temp.company_name = (dataAppend && dataAppend !== "NoInfo" && dataAppend.carrier) ? dataAppend.carrier : "";
                                        }
                                        break;
                                    case 'address':
                                        temp[j] = (dataAppend && dataAppend !== "NoInfo" && dataAppend.current_addresses && dataAppend.current_addresses[0] && dataAppend.current_addresses[0].street_line_1) ? dataAppend.current_addresses[0].street_line_1 : "";
                                        break;
                                    case 'city':
                                        temp[j] = (dataAppend && dataAppend !== "NoInfo" && dataAppend.current_addresses && dataAppend.current_addresses[0] && dataAppend.current_addresses[0].city) ? dataAppend.current_addresses[0].city : "";
                                        break;
                                    case 'state':
                                        temp[j] = (dataAppend && dataAppend !== "NoInfo" && dataAppend.current_addresses && dataAppend.current_addresses[0] && dataAppend.current_addresses[0].state_code) ? dataAppend.current_addresses[0].state_code : "";
                                        break;
                                    case 'zip':
                                        temp[j] = (dataAppend && dataAppend !== "NoInfo" && dataAppend.current_addresses && dataAppend.current_addresses[0] && dataAppend.current_addresses[0].postal_code) ? dataAppend.current_addresses[0].postal_code : "";
                                        break;
                                    case 'agent':
                                        temp[j] = dataSet[i].username;
                                        break;
                                    case 'line_type':
                                        temp[j] = (dataAppend && dataAppend !== "NoInfo" && dataAppend.line_type) ? dataAppend.line_type : "";
                                        break;
                                    default:
                                        if (j !== "sub_category" && j !== "ring_to") {
                                            temp[j] = dataSet[i][j];
                                        }
                                }
                            }

                            // console.log(temp);
                            calldetailsData.push(temp);
                        }
                    }
                    deferred.resolve(calldetailsData);
                    if ($rootScope.isSafari) {
                        var reportName = "csv_calls";
                        if (formate === 'tsv') { reportName = "tsv_calls"; }
                        deferred.resolve(JSONToCSVConvertor(calldetailsData, reportName, true, formate));
                    }
                });
                if (!$rootScope.isSafari) {
                    return deferred.promise;
                }
            };

            $scope.getCSVDataReports = function() {
                var urlParams = determineReportQueryParams();
                // $scope.urlParams.exportData = true;
                // $scope.urlParams.limit = 50000;
                $scope.urlParams.limit = 100000;
                if($rootScope.is_migrated === true || $rootScope.is_migrated === 'true'){
                    $scope.csvHeaderNames = ["Call ID", "Date/Time", "Group Name", "Campaign", "Ad Source", "Custom Source 1", "Custom Source 2", "Custom Source 3", "Custom Source 4", "Custom Source 5", "Caller ID", "Tracking Number", "Hunt Type", "Destination Name | No.", "Duration", "Caller Name", "Company Name", "Address", "City", "State/Province", "Zip/Postal Code", "Instant Insights", "Instant Insights Config", "Disposition", "Line Type", "Agent", "Audio File","Voicemail"];
                }else{
                    $scope.csvHeaderNames = ["Call ID", "Date/Time", "Group Name", "Campaign", "Ad Source", "Custom Source 1", "Custom Source 2", "Custom Source 3", "Custom Source 4", "Custom Source 5", "Caller ID", "Tracking Number", "Destination Name | No.", "Duration", "Caller Name", "Company Name", "Address", "City", "State/Province", "Zip/Postal Code", "Disposition", "Line Type", "Agent", "Audio File"];
                }

                var calldetailsDataReport = [];
                // if ($scope.summaryitems[0].total_count_calls > 50000) {
                //     $bootbox.alert("Your export will be capped at the maximum number of 100,000 records.");
                //     $scope.urlParams.limit = 50000;
                // }
                var deferred = $q.defer(); //promise

                CallsDetailsWebService.getCallsDetailsList($.param($scope.urlParams)).then(function(result) {
                    $scope.isLoadingApi = true;
                    if (result.data.json.length > 0 && result.data.json[0].callList.length > 0) {
                        $scope.isLoadingApi = false;
                        var dataSet = result.data.json[0].callList;
                        for (var i = 0; i < dataSet.length; i++) {

                            var dataAppend = (dataSet[i].call_data !== null && dataSet[i].call_data !== "NoInfo" && typeof(dataSet[i].call_data) !== "object") ? JSON.parse(dataSet[i].call_data) : dataSet[i].call_data;
                            var dest = dataSet[i].ring_to_name + " | " + dataSet[i].ring_to;
                            var company = (dataSet[i].cdr_source == 'API') ? ((dataAppend && dataAppend !== "NoInfo" && dataAppend.belongs_to && dataAppend.belongs_to.length > 0 ) ? dataAppend.carrier : " ") : (dataAppend && dataAppend !== "NoInfo" && dataAppend.belongs_to && dataAppend.belongs_to.length > 0 && dataAppend.belongs_to[0].name && dataAppend.belongs_to[0].type && dataAppend.belongs_to[0].type !== "Person") ? dataAppend.belongs_to[0].name : " ";
                            
                             if($scope.isMigated === true || $scope.isMigated === 'true'){
                                calldetailsDataReport.push({
                                    "Call ID": dataSet[i].call_id ? dataSet[i].call_id : " ",
                                    "Date/Time": dataSet[i].call_started ? moment.utc(dataSet[i].call_started).format("MM-DD-YYYY h:mm:ss a") : " ",
                                    "Group Name": dataSet[i].org_unit_name ? dataSet[i].org_unit_name.replace(',', " ") : " ",
                                    "Campaign": dataSet[i].campaign_name ? dataSet[i].campaign_name : " ",
                                    "Ad Source": dataSet[i].category + ":" + dataSet[i].sub_category,
                                    "Custom Source 1": dataSet[i].custom_source1 ? dataSet[i].custom_source1 : " ",
                                    "Custom Source 2": dataSet[i].custom_source2 ? dataSet[i].custom_source2 : " ",
                                    "Custom Source 3": dataSet[i].custom_source3 ? dataSet[i].custom_source3 : " ",
                                    "Custom Source 4": dataSet[i].custom_source4 ? dataSet[i].custom_source4 : " ",
                                    "Custom Source 5": dataSet[i].custom_source5 ? dataSet[i].custom_source5 : " ",
                                    "Caller ID": dataSet[i].source ? dataSet[i].source : " ",
                                    "Tracking Number": dataSet[i].tracking ? dataSet[i].tracking : " ",
                                    "Hunt Type": (dataSet[i].hunt_type && dataSet[i].hunt_type !== undefined && dataSet[i].hunt_type !== " " ) ? dataSet[i].hunt_type : " ",
                                    "Destination Name | No.": dest.replace(',', " "),
                                    "Duration": dataSet[i].duration,
                                    "Caller Name": (dataSet[i].cdr_source == 'API') ? ((dataAppend && dataAppend !== "NoInfo" && dataAppend.belongs_to && dataAppend.belongs_to.length > 0 ) ? dataAppend.belongs_to[0].name : " ") : (dataAppend && dataAppend !== "NoInfo" && dataAppend.belongs_to && dataAppend.belongs_to.length > 0 && dataAppend.belongs_to[0].name && dataAppend.belongs_to[0].type && dataAppend.belongs_to[0].type === "Person") ? dataAppend.belongs_to[0].name : " ",
                                    "Company Name": (dataSet[i].cdr_source == 'API') ? ((dataAppend && dataAppend !== "NoInfo" && dataAppend.belongs_to && dataAppend.belongs_to.length > 0 ) ? dataAppend.carrier : " ") : (dataAppend && dataAppend !== "NoInfo" && dataAppend.belongs_to && dataAppend.belongs_to.length > 0 && dataAppend.belongs_to[0].name && dataAppend.belongs_to[0].type && dataAppend.belongs_to[0].type !== "Person") ? dataAppend.belongs_to[0].name : " ",
                                    "Address": (dataAppend && dataAppend !== "NoInfo" && dataAppend.current_addresses && dataAppend.current_addresses.length > 0 && dataAppend.current_addresses[0].street_line_1) ? dataAppend.current_addresses[0].street_line_1 : " ",
                                    "City": (dataAppend && dataAppend !== "NoInfo" && dataAppend.current_addresses && dataAppend.current_addresses.length > 0 && dataAppend.current_addresses[0].city) ? dataAppend.current_addresses[0].city : " ",
                                    "State/Province": (dataAppend && dataAppend !== "NoInfo" && dataAppend.current_addresses && dataAppend.current_addresses.length > 0 && dataAppend.current_addresses[0].state_code) ? dataAppend.current_addresses[0].state_code : " ",
                                    "Zip/Postal Code": (dataAppend && dataAppend !== "NoInfo" && dataAppend.current_addresses && dataAppend.current_addresses.length > 0 && dataAppend.current_addresses[0].postal_code) ? dataAppend.current_addresses[0].postal_code : " ",
                                    "Instant Insights": dataSet[i].instant_insights === true ? 'Yes' : 'No',
                                    "Instant Insights Config": dataSet[i].instant_insights_config ? dataSet[i].instant_insights_config : '',
                                    "Disposition": dataSet[i].disposition.charAt(0).toUpperCase() + dataSet[i].disposition.slice(1).toLowerCase(),
                                    "Line Type": (dataAppend && dataAppend.line_type) ? dataAppend.line_type : " ",
                                    "Agent": dataSet[i].username,
                                    "Audio File": dataSet[i].s3URL ? dataSet[i].s3URL : " ",
                                    "Voicemail": (dataSet[i].is_voicemail) ? 'Yes' : 'No'
                                });
                            }else{
                                if (dataSet[i].disposition) {
                                    dataSet[i].disposition = dataSet[i].disposition.charAt(0).toUpperCase() + dataSet[i].disposition.slice(1).toLowerCase();
                                }
                                 calldetailsDataReport.push({
                                    "Call ID": dataSet[i].call_id ? dataSet[i].call_id : " ",
                                    "Date/Time": dataSet[i].call_started ? moment.utc(dataSet[i].call_started).format("MM-DD-YYYY h:mm:ss a") : " ",
                                    "Group Name": dataSet[i].org_unit_name ? dataSet[i].org_unit_name.replace(',', " ") : " ",
                                    "Campaign": dataSet[i].campaign_name ? dataSet[i].campaign_name : " ",
                                    "Ad Source": dataSet[i].category + ":" + dataSet[i].sub_category,
                                    "Custom Source 1": dataSet[i].custom_source1 ? dataSet[i].custom_source1 : " ",
                                    "Custom Source 2": dataSet[i].custom_source2 ? dataSet[i].custom_source2 : " ",
                                    "Custom Source 3": dataSet[i].custom_source3 ? dataSet[i].custom_source3 : " ",
                                    "Custom Source 4": dataSet[i].custom_source4 ? dataSet[i].custom_source4 : " ",
                                    "Custom Source 5": dataSet[i].custom_source5 ? dataSet[i].custom_source5 : " ",
                                    "Caller ID": dataSet[i].source ? dataSet[i].source : " ",
                                    "Tracking Number": dataSet[i].tracking ? dataSet[i].tracking : " ",
                                    "Destination Name | No.": dest.replace(',', " "),
                                    "Duration": dataSet[i].duration,
                                    "Caller Name": (dataAppend && dataAppend !== "NoInfo" && dataAppend.belongs_to && dataAppend.belongs_to.length > 0 && dataAppend.belongs_to[0].name && dataAppend.belongs_to[0].type && dataAppend.belongs_to[0].type === "Person") ? dataAppend.belongs_to[0].name : " ",
                                    "Company Name": (dataSet[i].cdr_source == 'API') ? ((dataAppend && dataAppend !== "NoInfo" && dataAppend.belongs_to && dataAppend.belongs_to.length > 0 ) ? dataAppend.carrier : " ") : (dataAppend && dataAppend !== "NoInfo" && dataAppend.belongs_to && dataAppend.belongs_to.length > 0 && dataAppend.belongs_to[0].name && dataAppend.belongs_to[0].type && dataAppend.belongs_to[0].type !== "Person") ? dataAppend.belongs_to[0].name : " ",
                                    "Address": (dataAppend && dataAppend !== "NoInfo" && dataAppend.current_addresses && dataAppend.current_addresses.length > 0 && dataAppend.current_addresses[0].street_line_1) ? dataAppend.current_addresses[0].street_line_1 : " ",
                                    "City": (dataAppend && dataAppend !== "NoInfo" && dataAppend.current_addresses && dataAppend.current_addresses.length > 0 && dataAppend.current_addresses[0].city) ? dataAppend.current_addresses[0].city : " ",
                                    "State/Province": (dataAppend && dataAppend !== "NoInfo" && dataAppend.current_addresses && dataAppend.current_addresses.length > 0 && dataAppend.current_addresses[0].state_code) ? dataAppend.current_addresses[0].state_code : " ",
                                    "Zip/Postal Code": (dataAppend && dataAppend !== "NoInfo" && dataAppend.current_addresses && dataAppend.current_addresses.length > 0 && dataAppend.current_addresses[0].postal_code) ? dataAppend.current_addresses[0].postal_code : " ",
                                    "Disposition": dataSet[i].disposition.charAt(0).toUpperCase() + dataSet[i].disposition.slice(1).toLowerCase(),
                                    "Line Type": (dataAppend && dataAppend.line_type) ? dataAppend.line_type : " ",
                                    "Agent": dataSet[i].username,
                                    "Audio File": dataSet[i].s3URL ? dataSet[i].s3URL : " "
                                });
                            }    
                            // console.log('csvDataScheduleReport dataSet', dataSet[i], 'csvDataScheduleReport dataAppend', dataAppend);
                        }
                    }
                    deferred.resolve(calldetailsDataReport);
                    $scope.csvDataScheduleReport = calldetailsDataReport;
                });

                return deferred.promise;
            };

            $scope.exportPDF = function() {
                progressLoader.start();
                var deferred = $q.defer();
                pinesNotifications.notify({
                    title: 'Export Call details',
                    text: "Download is in process, it will be completed in few minutes",
                    type: 'info'
                });
                var tempCustomSource = [];
                $scope.customSourceMapping = ['Custom Source 1', 'Custom Source 2', 'Custom Source 3', 'Custom Source 4', 'Custom Source 5'];
                $scope.callDetailsColumnMapping.forEach(function(ele) {
                    if ($scope.customSourceMapping.indexOf(ele.label) !== -1) {
                        var obj = {
                            label: ele.label,
                            visible: ele.visible
                        };
                        tempCustomSource.push(obj);
                        ele.visible = true;
                    }
                    if(ele.label == "Actions"){
                        ele.visible = false;
                    }
                });
                $scope.element = document.getElementById('callsData');
                var opt = {
                    margin:       0,
                    filename:     'calls-details.pdf',
                    image:        { type: 'jpeg', quality: 1 },
                    html2canvas:  { scale: 2 },
                    jsPDF:        { unit: 'pt', format: 'tabloid', orientation: 'l' }
                };
                progressLoader.set(50);                
                var worker = html2pdf().from($scope.element).set(opt).save();
                $scope.callDetailsColumnMapping.forEach(function(ele) {
                    tempCustomSource.forEach(function(obj) {
                            if (ele.label === obj.label) {
                            ele.visible = obj.visible;
                            }
                        });
                    if(ele.label == "Actions"){
                        ele.visible = false;
                    }
                    });
                deferred.resolve(worker);
                progressLoader.end();
                return deferred.promise;
            };

            $scope.call_tags = [];
            $scope.selCallTags = {};
            $scope.call_tagslength = [];

            var internalMappedNames = {};

            // reference keys on the aggregated data objects
            internalMappedNames.aggregate_property_keys = {
                call_id: "call_id",
                date_time: "call_started",
                group_name: "org_unit_name",
                campaign: "campaign_name",
                channel: "category",
                custom_source1: "custom_source1",
                custom_source2: "custom_source2",
                custom_source3: "custom_source3",
                custom_source4: "custom_source4",
                custom_source5: "custom_source5",
                subchannel: "sub_category",
                caller_id: "caller_id",
                tracking_nbr: "tracking",
                dest_name: "ring_to_name",
                dest_nbr: "ring_to",
                duration: "duration",
                is_voicemail: "is_voicemail"
            };

            // values displayed at top of columns
            internalMappedNames.dataTableHeaderValues = {
                call_id: "Call ID",
                date_time: "Date/Time",
                group_name: "Group Name",
                campaign: "Campaign",
                channel: "Ad Source",
                custom_source1: "custom_source1",
                custom_source2: "custom_source2",
                custom_source3: "custom_source3",
                custom_source4: "custom_source4",
                custom_source5: "custom_source5",
                subchannel: "Sub Channel",
                caller_id: "Caller ID",
                tracking_nbr: "Tracking Number",
                dest_name: "Destination Name",
                dest_nbr: "No.",
                duration: "Duration",
                is_voicemail: "Voicemail"
            };

            function createHeaderValueToAggKeyName() {
                var headerValues = internalMappedNames.dataTableHeaderValues;
                var aggKeyNames = internalMappedNames.aggregate_property_keys;


                var headerValueToAggKeyName = {};
                headerValueToAggKeyName[headerValues.call_id] = aggKeyNames.call_id;
                headerValueToAggKeyName[headerValues.date_time] = aggKeyNames.date_time;
                headerValueToAggKeyName[headerValues.group_name] = aggKeyNames.group_name;
                headerValueToAggKeyName[headerValues.campaign] = aggKeyNames.campaign;
                headerValueToAggKeyName[headerValues.channel] = aggKeyNames.channel;
                headerValueToAggKeyName[headerValues.custom_source1] = aggKeyNames.custom_source1;
                headerValueToAggKeyName[headerValues.custom_source2] = aggKeyNames.custom_source2;
                headerValueToAggKeyName[headerValues.custom_source3] = aggKeyNames.custom_source3;
                headerValueToAggKeyName[headerValues.custom_source4] = aggKeyNames.custom_source4;
                headerValueToAggKeyName[headerValues.custom_source5] = aggKeyNames.custom_source5;
                headerValueToAggKeyName[headerValues.subchannel] = aggKeyNames.subchannel;
                headerValueToAggKeyName[headerValues.caller_id] = aggKeyNames.caller_id;
                headerValueToAggKeyName[headerValues.tracking_nbr] = aggKeyNames.tracking_nbr;
                headerValueToAggKeyName[headerValues.dest_name] = aggKeyNames.dest_name;
                headerValueToAggKeyName[headerValues.dest_nbr] = aggKeyNames.dest_nbr;
                headerValueToAggKeyName[headerValues.duration] = aggKeyNames.duration;
                headerValueToAggKeyName[headerValues.is_voicemail] = aggKeyNames.is_voicemail;

                return headerValueToAggKeyName;
            }

            function getDataGridHeaderValues() {
                var dataTableHVs = internalMappedNames.dataTableHeaderValues;

                var valuesToDisplayInDataGridHeaders = [

                    // These can be manually added in since they're static
                    dataTableHVs.call_id,
                    dataTableHVs.date_time,
                    dataTableHVs.group_name,
                    dataTableHVs.campaign,
                    dataTableHVs.channel,
                    dataTableHVs.custom_source1,
                    dataTableHVs.custom_source2,
                    dataTableHVs.custom_source3,
                    dataTableHVs.custom_source4,
                    dataTableHVs.custom_source5,
                    dataTableHVs.caller_id,
                    dataTableHVs.tracking_nbr,
                    dataTableHVs.dest_name + "|" + dataTableHVs.dest_nbr,
                    dataTableHVs.duration,
                    dataTableHVs.is_voicemail
                ];

                // array of string names of the header values that go at the top of the data grid
                return valuesToDisplayInDataGridHeaders;
            }

            //$scope.advFiltersAreApplied = false;
            $scope.simpleSearchApplied = true;
            $scope.simpleSearchPlaceholder = '';

            function determineReportQueryParams() {
                $scope.applyFilterParams();
                //$scope.urlParams = {};
                //$rootScope.$broadcast('start_url_assembly', 'blank');

                // Update pagination header -- DON'T STOMP ME
                setTimeout(function() {
                    var offset = ($location.search().offset !== undefined) ? parseInt($location.search().offset) : 0;
                    $scope.pagination.current = (parseInt(offset / 100) + 1);
                    return $scope.urlParams;
                }, 1000);
            }

            // Scope methods used when user uses filter that requires a new data-set from backend
            $scope.changeDateRange = function() {
               $scope.isLoadingApi = true;
                $scope.filterReset();
                $window.sessionStorage.report_start_date = $scope.drp_start;
                $window.sessionStorage.report_end_date = $scope.drp_end;
                $scope.offset = 0;
                $scope.pagination.current = 1;
                $scope.horsemanFlag = false;
                $scope.filterApplied = false;
                $scope.applyFilter();
            };

            $scope.changeReportParams = function(paramTypeToChange) {
                $scope.applyFilterParams();
                //determineReportQueryParams();
            };

            $scope.call_commentslength = [];
            $scope.call_comments = [];
            $scope.getcallcomments = function(userID, callID) {

                CallsDetailsWebService.getCallsComments($scope.call_report, userID, callID).then(function(result) {
                    var dataSet = result.data.json;

                    _.each(dataSet, function(data) {

                        data.comment_created_formatted = moment(data.comment_created).format("MM-DD-YYYY h:mm:ss a");
                        data.singlerec = 1;
                    });
                    $scope.call_id = callID;
                    $scope.call_comments[callID] = _.filter(dataSet, function(data) {
                        return data.comment_parent_id === null;
                    });
                    $scope.call_commentslength[callID] = ($scope.call_comments[callID] !== undefined) ? $scope.call_comments[callID].length : 0;

                    $scope.call_responses = _.filter(dataSet, function(data) {
                        return data.comment_parent_id !== null;
                    });
                    $scope.call_responseslength = ($scope.call_responses !== undefined) ? $scope.call_responses.length : 0;
                });
            };

            $scope.getcalltags = function(userID, callID) {

                CallsDetailsWebService.getCallsTags($scope.call_report, $rootScope.userId, callID).then(function(result) {

                    var dataSet = result.data.json;
                    var selectedCallTags = [];

                    if (dataSet !== undefined) {
                        _.each(dataSet, function(data) {
                            data.singlerec = 1;
                            var o = {};
                            o.id = data.tag_id;
                            o.text = data.tag_name;
                            selectedCallTags.push(o.id);
                            if (data.permission > $scope.userAccess.tag) {
                                data.locked = 'locked';
                            }
                        });
                        $scope.selCallTags[callID] = selectedCallTags;
                        $scope.call_id = callID;
                        $scope.call_tagslength[callID] = dataSet.length;
                        $scope.call_tags[callID] = dataSet;
                    }
                    CallsDetailsWebService.getTags($scope.call_report, $rootScope.userId, callID).then(function(result) {
                        var dataSet = result.data.json;
                        //console.log(dataSet);
                        $scope.selTags = [];
                        if (dataSet !== undefined) {
                            _.each(dataSet, function(data) {
                                data.singlerec = 1;
                                $scope.selTags.push(data.tag_id);
                                //replacing line below that assigns dataSet to $scope.tags.
                                $('#calltagselect' + callID).append('<option value="' + data.tag_id + '" >' + data.tag_name + '</option>');
                            });
                            $scope.call_id = callID;
                            $scope.tagslength = dataSet.length;

                            $scope.tags = dataSet; //way too slow to assign this much data to a scope variable that is being used in an ngrepeat
                        }
                    });
                });
            };
            $scope.ind_scores = [];
            $scope.dnidata = [];
            $scope.caller_info = [];
            $scope.getinfodetails = function(index, callID, showStatus) {
                if (showStatus) {
                    //$scope.hasExtendedData = false;
                    CallsDetailsWebService.getCallsDetailsInfo($scope.call_report, $rootScope.userId, callID).then(function(result) {
                        var dataSet = result.data.json;
                        //console.log(dataSet);
                        var dni = dataSet[0].dni;
                        var dnilength = dni.length;

                        var source_data = dataSet[0].source_data;
                        var source_datalength = source_data.length;

                        var indicator_scores = dataSet[0].indicator_scores;

                        var indicator_scoreslength = indicator_scores.length;

                        _.each(dataSet, function(data) {
                            data.singlerec = 1;
                        });
                        if (dataSet[0] !== undefined) {
                            if (source_datalength > 0) {
                                $scope.hasExtendedData = true;
                                if (source_data[0].call_data != "NoInfo") {
                                    source_data[0].call_data = (typeof(source_data[0].call_data) !== "object") ? JSON.parse(source_data[0].call_data) : source_data[0].call_data;
                                }
                                if (source_data[0].call_data === 'NoInfo') {
                                    $scope.caller_info[index] = {
                                        'consumer1': {
                                            'first_name': 'No Information'
                                        }
                                    };
                                } else {
                                    $scope.caller_info[index] = !source_data[0].call_data.reverse_phone_append ? source_data[0].call_data : source_data[0].call_data.reverse_phone_append;
                                    $scope.caller_info[index].source = !source_data[0].call_data.reverse_phone_append ? "white pages" : "acxiom";
                                }
                            } else {
                                $scope.hasExtendedData = true;
                            }
                            if (indicator_scoreslength > 0) {
                                //console.log(indicator_scores);

                                $scope.ind_scores[index] = [];
                                //create array of ind scores keyed by indicator name
                                //console.log('index: '+index);
                                for (var key in indicator_scores) {
                                    $scope.ind_scores[index][indicator_scores[key].indicator_name] = indicator_scores[key].score_value;
                                }

                                //console.log($scope.ind_scores);
                            }
                            if (dnilength > 0) {
                                if (dni[0] !== undefined) {
                                    $scope.dnidata[index] = dataSet[0].dni[0];

                                    // Base URL regex since referring is a messy long link with all its query strings attached
                                    var baseUrl = $scope.dnidata[index].referring.match(new RegExp(".+?[^\/:](?=[?\/]|$)"));

                                    // Javascript RE will return null if no matches, otherwise it's an array of grouping matches
                                    if (baseUrl !== null) {
                                        $scope.dnidata[index].referring = baseUrl[0];
                                    }
                                }
                            }
                        }

                    });

                    //Get the Call Comments
                    $scope.getcallcomments($rootScope.userId, callID);

                    //Get the Call Tags
                    $scope.call_tagslength[callID] = '';
                    $scope.call_tags[callID] = [];
                    $scope.getcalltags($rootScope.userId, callID);
                } else {
                    $scope.comment.text = [];
                }

            };

            $scope.tagoptiontemplate = function(actionId) {
                var options = {
                    formatNoMatches: function(term) {
                        $scope.actionId = actionId;
                        //console.log($scope);
                        var message = "";
                        //term = term.trim();
                        if (term !== '') {
                            message = '<a ng-href="#" ng-click="postcalltag($index, item.call_id, false);">Add tag:"' + term.trim() + '"</a>';
                            if (!$scope.$$phase) {
                                $scope.$apply(function() {
                                    $scope.noResultsTag = term;
                                });
                            }
                        } else {
                            message = "";
                        }
                        return message;
                    },
                    //handle for prepending an option on keyup
                    sortResults: function(results, container, query) {
                        var found = false;

                        var Uniqresults = _.uniq(results, function(tag){
                            return tag.text.trim();
                        });

                        query.term = query.term.trim();
                        if (query.term.length > 0) {
                            for (var x in Uniqresults) {
                                //console.log('Term:'+query.term+'--Result:'+results[x].text);
                                if (query.term.trim().toLowerCase() == Uniqresults[x].text.trim().toLowerCase()) {
                                    found = true;
                                    break;
                                }
                            }
                            //add option to top of the list of results
                            if (!found) $('.select2-results').prepend('<li class="select2-no-results"><a ng-href="#" ng-click="postcalltag($index, item.call_id, false);">Add tag:"' + query.term + '"</a></li>');
                            //compile the new html in angular to get it to evaluate the new ng-click
                            if (!$scope.$$phase) {
                                $scope.$apply(function() {
                                    $scope.noResultsTag = query.term;
                                });
                            }
                        }
                        //return list unchanged
                        return Uniqresults;
                    },
                    simple_tags: true,
                    allowClear: true
                };
                return options;
            };

            $scope.newtagvalue = $scope.oldtagvalue = '';
            $scope.postcalltag = function(index, callID, multiple) {
                var calltagjson = {};
                var calltags = [];
                calltagjson.addmultiple = multiple;
                calltagjson.call_id = $scope.call_id;
                calltagjson.ct_user_id = $rootScope.userId;
                calltagjson.currentOUId = $rootScope.currentOUId;

                if (multiple) {
                    // Add multiple tags
                    currentTags = $('#calltagselect' + callID).select2("data");

                    _.each(currentTags, function(tagdata, index) {
                        calltags.push({
                            "tag": {
                                "call_id": $scope.call_id,
                                "ct_user_id": $rootScope.userId,
                                "org_unit_id": $rootScope.currentOUId,
                                "tag_id": parseInt(currentTags[index].id),
                                "tag_text": currentTags[index].text.trim(),
                                "tag_created": null
                            }
                        });
                    });

                    calltagjson.calltags = calltags;

                    CallsDetailsWebService.setCallsTags(calltagjson, $rootScope.userId).then(function(result) {
                        var dataSet = result.data.json;
                        if (result.data.err === '') {
                            pinesNotifications.notify({
                                title: 'Update Call Tags',
                                text: 'Successfully updated call tags',
                                type: 'success'
                            });

                            $scope.call_tagslength[callID] = calltags.length;
                            // $scope.getcalltags($rootScope.userId, result.config.data.call_id);

                        } else {
                            pinesNotifications.notify({
                                title: 'Update Call Tags',
                                text: result.data.err,
                                type: 'error'
                            });
                        }
                        return;
                    });
                } else {
                    var arraytags = _.pluck($scope.tags , 'tag_name');
                    arraytags = arraytags.map(function(tag){ return tag.toLowerCase(); });
                    var duplicateTags = _.filter(arraytags, function(tag){
                        return tag == $scope.noResultsTag.trim().toLowerCase();
                    });

                    if ($scope.newtagvalue === '') {
                        $scope.oldtagvalue = '';
                    } else {
                        $scope.oldtagvalue = $scope.newtagvalue;
                    }
                    $scope.newtagvalue = $scope.noResultsTag.trim();

                    if ($scope.newtagvalue === $scope.oldtagvalue) {
                        return;
                    }

                    if (duplicateTags.length > 0) {
                        pinesNotifications.notify({
                            title: 'Update Call Tags',
                            text: 'This Tag already exists',
                            type: 'error'
                        });
                        return false;
                    }
                    calltags.push({
                        "tag": {
                            "call_id": $scope.call_id,
                            "ct_user_id": $rootScope.userId,
                            "org_unit_id": $rootScope.currentOUId,
                            "tag_id": null,
                            "tag_text": $scope.noResultsTag.trim(),
                            "tag_created": null
                        }
                    });

                    calltagjson.calltags = calltags;

                    CallsDetailsWebService.setCallsTags(calltagjson, $rootScope.userId).then(function(result) {
                        var dataSet = result.data.json;
                        if (result.data.err === '') {
                            pinesNotifications.notify({
                                title: 'Update Call Tags',
                                text: 'Successfully added call tag',
                                type: 'success'
                            });
                            //Get the Call Tags
                            currentTags = $('#calltagselect' + $scope.call_id).select2("data");
                            var selectedCallTags = [];
                            var calTagDataSet = [];
                            _.each(currentTags, function(data) {
                                data.singlerec = 1;
                                selectedCallTags.push(data.id);
                                calTagDataSet.push({
                                    "call_id": $scope.call_id,
                                    "tag_id": data.id,
                                    "tag_name": data.text,
                                    "locked": (data.locked ? "locked" : "unlocked")
                                });
                            });
                            selectedCallTags.push(dataSet.tag_id);
                            calTagDataSet.push({
                                "call_id": $scope.call_id,
                                "tag_id": dataSet.tag_id,
                                "tag_name": dataSet.tag_name,
                                "locked": false
                            });

                            $scope.selCallTags[$scope.call_id] = selectedCallTags;
                            $scope.call_tagslength[$scope.call_id] = calTagDataSet.length;
                            $scope.call_tags[$scope.call_id] = calTagDataSet;

                            //$scope.getcalltags($rootScope.userId, result.config.data.call_id);
                        } else {
                            pinesNotifications.notify({
                                title: 'Update Comments',
                                text: result.data.err,
                                type: 'error'
                            });
                        }
                        return;
                    });
                }
            };

            $scope.$watch('call_tags[$scope.call_id]', function(newVal, oldVal) {
                $timeout(function() {
                    //console.log("selCallTags: " + JSON.stringify($scope.selCallTags));
                    if (!angular.isUndefined($scope.selCallTags[$scope.call_id]) && $scope.call_tags[$scope.call_id].length > 0) {
                        var noResultsLink = $('.select2-drop');
                        noResultsLink.hide();
                        var testthis = $('select2-container .select2-choices');
                        testthis.append('<li class="select2-search-choice"><div>' + $scope.call_tags[$scope.call_id][$scope.call_tags[$scope.call_id].length - 1].tag_name.toString() + '<div><a href="#" class="select2-search-choice-close" tabindex="-1"></a></li>');
                    }
                });
            }, true);

            $scope.$watch('noResultsTag', function(newVal, oldVal) {
                if (newVal && newVal !== oldVal) {
                    $timeout(function() {
                        var noResultsLink = $('.select2-no-results');
                        // console.log(noResultsLink.contents());
                        $compile(noResultsLink.contents())($scope);
                    });
                }
            }, true);

            $scope.postcomment = function(index, callid) {
                var callcommentjson = {
                    "comment": {
                        "call_id": callid,
                        "ct_user_id": $rootScope.userId,
                        "comment_text": $scope.comment.text[callid],
                        "comment_created": null,
                        "is_from_report": true,
                        "comment_modified": null,
                        "comment_parent_id": null,
                        "comment_active": true
                    }
                };

                CallsDetailsWebService.setCallsComments($scope.call_report, callcommentjson, $rootScope.userId).then(function(result) {
                    var dataSet = result.data.json;
                    if (result.data.err === '') {
                        pinesNotifications.notify({
                            title: 'Update Comments',
                            text: 'Successfully added comment',
                            type: 'success'
                        });

                        //Get the Call Comments
                        $scope.comment.text[callid] = "";
                        $scope.getcallcomments($rootScope.userId, callid);

                    } else {
                        pinesNotifications.notify({
                            title: 'Update Comments',
                            text: result.data.err,
                            type: 'error'
                        });
                    }
                    return;
                });
            };


            $scope.userCanDeleteComment = function(comment_user_id) {
                if (!$scope.isReadonly) {
                    return true;
                } else {
                    // if they are a readonly user, then only allow user to delete comment if it is his/her own
                    return parseInt($rootScope.userId) === comment_user_id;
                }
            };

            $scope.deletecomment = function(index, commentid, callID) {

                CallsDetailsWebService.deleteCallsComments($scope.call_report, commentid, $rootScope.userId).then(function(result) {
                    var dataSet = result.data.json;
                    if (result.data.err === '') {
                        pinesNotifications.notify({
                            title: 'Delete Comments',
                            text: 'Successfully deleted comment',
                            type: 'success'
                        });

                        //Get the Call Comments
                        $scope.getcallcomments($rootScope.userId, callID);

                    } else {
                        pinesNotifications.notify({
                            title: 'Delete Comments',
                            text: result.data.err,
                            type: 'error'
                        });
                    }
                    return;
                });
            };

            $scope.blocknumber = function(index, callId, callsourceid, encryptedSource) {
                if (callsourceid !== "0" && callsourceid !== "" && callsourceid !== "0000000000") {
                    $scope.isClick = false;
                    // CallsDetailsWebService.getCallBlacklist().then(function(result) {
                        // var dataSet = result.data.json;
                        // if (dataSet === undefined) {
                        //     pinesNotifications.notify({
                        //         title: 'Block Number',
                        //         text: 'Unable to blacklist Caller ID',
                        //         type: 'error'
                        //     });
                        //     $scope.items[index].blockme = false;
                        //     $scope.isClick = true;
                        //     return;
                        // }
                        // if (dataSet.length > 0) {
                        //     var number = [];
                        //     angular.forEach(dataSet, function(item) {
                        //         number.push(item.number);
                        //     });
                        //     $scope.blocked_calls = number.join(",");
                        // } else {
                        //     $scope.blocked_calls = "";
                        // }

                        // var blockedcalls = $scope.blocked_calls;
                        // var n = blockedcalls.search(callsourceid);

                        if ($scope.items[index].blocktext === "Block") {
                            //Blacklist the number
                            //need to add to blacklist
                            // check if there is no number in blacklist, prevent from sending invalid number.
                            // if(blockedcalls !== "" && blockedcalls !== undefined){
                            var blacklistedNumber={'caller_id':callsourceid,'org_unit_id': $rootScope.currentOUId};
                            CallsDetailsWebService.setCallBlacklist(blacklistedNumber).then(function(result) {
                                if (result.data.err === '') {
                                    _.each($scope.items, function(data) {
                                        if ((data.encrypted_source === callsourceid || data.source === callsourceid)) {
                                            data.blocktext = "Unblock";
                                            data.blockclass = "btn-danger-alt";
                                            data.blockme = false;
                                        }
                                        $scope.items[index].blockme = false;
                                    }, callsourceid, encryptedSource);
                                    pinesNotifications.notify({
                                        title: 'Block Number',
                                        text: 'Successfully blacklisted Caller ID',
                                        type: 'success'
                                    });
                                } else {
                                    pinesNotifications.notify({
                                        title: 'Block Number',
                                        text: result.data.err,
                                        type: 'fail'
                                    });
                                    $scope.items[index].blockme = false;
                                }
                            });
                            $scope.isClick = true;
                            return true;
                            // }
                        } else {
                            //Remove the number from Blacklist
                            //need to remove from blacklist;
                            CallsDetailsWebService.unsetCallBlacklist(callsourceid).then(function(result) {
                                if (result.data.err === '') {
                                    _.each($scope.items, function(data) {
                                        if ((data.encrypted_source === callsourceid || data.source === callsourceid)) {
                                            data.blocktext = "Block";
                                            data.blockclass = "btn-danger";
                                            data.blockme = false;
                                        }
                                        $scope.items[index].blockme = false;
                                    }, callsourceid);

                                    pinesNotifications.notify({
                                        title: 'Unblock Number',
                                        text: 'Successfully removed Caller ID from blacklist',
                                        type: 'success'
                                    });
                                } else {
                                    pinesNotifications.notify({
                                        title: 'Unblock Number',
                                        text: result.data.err[0].blacklist[0].errors[0],
                                        type: 'fail'
                                    });
                                    $scope.items[index].blockme = false;
                                }
                            });
                            $scope.isClick = true;
                            return true;
                        }
                    // });
                } else {
                    $scope.items[index].blockme = false;
                    pinesNotifications.notify({
                        title: 'Block Number',
                        text: callsourceid + ' is not a valid number',
                        type: 'fail'
                    });
                }
            };

            /////////////////////////
            //Filter Section
            /////////////////////////
            $scope.updateSimpleFilter = function(cleanUpDS) {
                //if adv filters are applied, always update $scope.dataTableValues with dcfilters && advFilters
                // otherwise, only update the $scope.dataTableValues with dcfilters
                // Using adv filter to update DS
                $scope.advFiltersAreApplied = false;


                if ($scope.simpleSearchFilter !== undefined) {
                    $scope.filter = $scope.simpleSearchFilter;
                    $scope.filtertype = 's';
                } else {
                    $scope.filter = '';
                    $scope.filtertype = 'a';
                }
                $scope.offset = 0;
                $scope.pagination.current = 1;
                $scope.applyFilterParams();

                return;
            };

            /* NOTE: these functions should not be necessary anymore
            $scope.applySimpleFilter = _.debounce($scope.updateSimpleFilter, 1200);

            $scope.validateSimpleTextFilter = function(simpleFilterText) {
                console.log("inside validate simple text");
                if (simpleFilterText === undefined) {
                    $scope.simpleSearchApplied = false;
                    return;
                }

                $scope.simpleSearchApplied = true;
                $scope.simpleSearchFilter = simpleFilterText;
                $scope.applySimpleFilter();
            };

            $scope.resetFilters = function(closeAdvancedFilter) {
                $scope.clearSimpleFilterText();
                //$scope.emptyAdvFilterDefinitions();
            };

            $scope.clearSimpleFilterText = function() {
                if ($scope.simpleSearchApplied) {
                    $scope.simpleSearchApplied = false;
                }
                if ($scope.filter !== null) {
                    $scope.filter = '';
                    $scope.offset = 0;
                    $scope.pagination.current = 1;
                    $scope.simpleSearchFilter = '';
                    $scope.simpleSearchPlaceholder = '';
                    $scope.changeReportParams();

                    // need to use jquery bnecause it wont allow $digest to update the textbox in time
                    // jQuery("#simpleChart").val('Search');
                }
            };
            */

            $scope.mappedHeaderValues = createHeaderValueToAggKeyName();
            $scope.headerNames = getDataGridHeaderValues();

            $scope.toggleFilterUsed = function() {
                $scope.advFiltersAreApplied = !$scope.advFiltersAreApplied;
                $scope.simpleSearchApplied = !$scope.simpleSearchApplied;

                $scope.initializeAdvFilterDefinitions();
                $scope.updateAdvancedFilter(true);
                $scope.applyFilterParams();
            };

            $scope.disableButton = function(index) {
                if ($scope.audio !== undefined && $scope.audio[index] !== undefined && !isNaN($scope.audio[index].duration)) {
                    return false;
                }
                return true;
            };

            /*$scope.playvoiceaudio = function(index, s3URL, control) {
                $scope.index = index;

                if ($scope.audio === undefined) {
                    $scope.audio = [];
                }

                if ($scope.audio[index] === undefined) {
                    $scope.audio[index] = new Audio(s3URL);
                    //add event listener for end of audio to close player when done playing
                    $scope.audio[index].addEventListener('ended', function() {
                        $scope.showme[index] = false;
                    });
                }
                var playtime;
                //pause and collapase other recordings
                for (var x in $scope.audio) {
                    //  var x = parseInt(pl);
                    if (x != index) {
                        $scope.audio[x].pause();
                        $scope.audio[x].currentTime = 0;
                        $scope.showme[x] = false;
                    }
                }
                switch (control) {

                    case 'play':
                        $scope.audio[index].play();
                        break;

                    case 'pause':
                        $scope.audio[index].pause();
                        break;

                    case 'rewind':
                        $scope.audio[index].pause();
                        playtime = $scope.audio[index].currentTime;
                        $scope.audio[index].currentTime = playtime - 10;
                        setTimeout(function() {
                            if ($scope.audio[index].currentTime < $scope.audio[index].duration)
                                $scope.audio[index].play();
                        }, 300);
                        break;

                    case 'forward':
                        $scope.audio[index].pause();
                        playtime = $scope.audio[index].currentTime;
                        $scope.audio[index].currentTime = playtime + 10;
                        setTimeout(function() {
                            if ($scope.audio[index].currentTime < $scope.audio[index].duration)
                                $scope.audio[index].play();
                        }, 300);
                        break;

                    default:
                }
            };*/

            //Stop all audio playback when leaving page AND destroy all event listeners.
            /*$scope.$on("$destroy", function() {
                for (var x in $scope.audio) {
                    $scope.audio[x].pause();
                }

                // Kill all event listeners on leave
                var importantListeners = ['$destroy', '$locationChangeStart', '$locationChangeSuccess'];
                for(var i in $rootScope.$$listeners) {
                    if(importantListeners.indexOf(i) === -1) {
                        delete $rootScope.$$listeners[i];
                    }
                }
            });
            */

            $scope.openEmail = function(size, s3URL) {
                $scope.s3URL = s3URL;
                var modalInstance = $uibModal.open({
                    animation: $scope.animationsEnabled,
                    templateUrl: 'assets/partials/emailCall.html',
                    controller: 'ModalInstanceCtrl',
                    size: size,
                    resolve: {
                        s3URL: function() {
                            return s3URL;
                        }
                    }
                });

                modalInstance.result.then(function(selectedItem) {
                    $scope.selected = selectedItem;
                }, function() {

                });
            };

            // ***** begin NECESSARY CODE FOR ADV FILTER TO WORK *******************
            $scope.preloading = false;
            $scope.showAdvFilter = false;
            $scope.advancedFilterConfig = { maxQuantity: 5 };

            $scope.extendUrlParams = function(urlParams) {
                if (urlParams.vars.filtertype === 's') {
                    $scope.simpleSearchFilter = urlParams.vars.filter;
                }
                $scope.urlParams = urlParams.vars;
                $scope.drp_start = moment($scope.urlParams.start_date, 'YYYY-MM-DD').format('MMMM DD, YYYY');
                $scope.drp_end = moment($scope.urlParams.end_date, 'YYYY-MM-DD').format('MMMM DD, YYYY');
                angular.extend($scope, urlParams.vars);
                delete urlParams.vars;
                angular.extend($scope, urlParams);
            };

            $scope.getInitialUrlParams = function() {
                advFilSrvc.determineInitializationMethod($scope).then(function(r) {
                    console.log('INSIDE getInitialUrlParams IN callsdetails.js: Returned urlParams:', r);
                    $scope.advFilterDefinitions = advFilSrvc.getAdvFilterDefinitions();
                    if ($scope.advFilterDefinitions.length > 0 && $scope.advFilterDefinitions[0].selected_column !== undefined) {
                        $scope.showAdvFilter = true;
                    }
                    $scope.extendUrlParams(r);
                    $scope.loadReportBasedOnQueryString();
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
                for (var x in $scope.audio) {
                    $scope.audio[x].pause();
                }

                // Kill all event listeners on leave
                var importantListeners = ['$destroy', '$locationChangeStart', '$locationChangeSuccess'];
                for (var i in $rootScope.$$listeners) {
                    if (importantListeners.indexOf(i) === -1) {
                        delete $rootScope.$$listeners[i];
                    }
                }
                $scope.audio = undefined;
                if (noErrors) {
                    $scope.loadReportBasedOnQueryString();
                }
            };

            $scope.filterReset = function() {
                if ($routeParams && $routeParams.filtertype) {
                    $location.search({ 'report': 'call_detail' });
                }
                advFilSrvc.resetAdvFilter();
                $scope.advFilterDefinitions = advFilSrvc.getAdvFilterDefinitions();
                $scope.showAdvFilter = false;
                $scope.simpleFilterText = '';
                $scope.filtertype = 's';
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
            $scope.increaseAudioInitializationCount = function() {
                ++$scope.audioInitializationCount;
            };

            $scope.loadMediaElement = function() {
                console.log("Initialize Media Elements");
                $scope.audioInitializationCount = 0;
                $('audio').mediaelementplayer({
                    //pluginPath: '../build/',
                    features: ['playpause', 'progress', 'current', 'duration', 'tracks'],
                    success: function(media) {
                        var renderer = $('#' + media.id + '-rendername');
                        console.log("media id:", media.id);
                        media.addEventListener('loadedmetadata', function(e) {
                            console.log("playing....... ");
                        }, false);

                        media.addEventListener('error', function(e) {
                            renderer.find('.error').html('<strong>Error</strong>: ' + e.message);
                        }, false);
                    }
                });
            };

            $scope.playPause = function(mediaId) {
                console.log("Pausing all audios..");
                $('audio').trigger('pause');
            };
            // ***** end NECESSRY CODE FOR ADV FILTER TO WORK ***************
        }
    ])
    .controller('ModalInstanceCtrl', function($scope, CallsDetailsWebService, $uibModalInstance, s3URL, pinesNotifications, $rootScope) {
        $scope.email = {
            "to": null,
            "from": "no-reply@messages.services",
            "message": null,
            "name": $rootScope.fullName,
            "s3URL": s3URL
        };

        $scope.sendEmail = function() {

            // $scope.playvoiceaudio = function(index, s3URL, control){
            //     $scope.index = index;
            //
            //     if ($scope.audio === undefined) {
            //         $scope.audio = [];
            //     }

            var emailData = {
                "email": $scope.email
            };
            //validate data
            var re = /^[_a-zA-Z0-9]+(\.[_a-zA-Z0-9]+)*@[a-zA-Z0-9-]+(\.a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,4})$/;
            var valid = true;
            if (!$scope.email.to || !re.test($scope.email.to)) {
                pinesNotifications.notify({
                    title: 'Email Call Form',
                    text: 'You must enter a valid To email address',
                    type: 'error'
                });
                valid = false;
            }
            //console.log(re.test($scope.email.from));
            var re2 = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;
            if (!$scope.email.from || !re2.test($scope.email.from)) {
                pinesNotifications.notify({
                    title: 'Email Call Form',
                    text: 'You must enter a valid From email address',
                    type: 'error'
                });
                valid = false;

                //             var playtime;
                // 			//pause and collapase other recordings
                // 			for(var x in $scope.audio) {
                //                   //  var x = parseInt(pl);
                //                 if(x != index) {
                // 					$scope.audio[x].pause();
                // 					$scope.audio[x].currentTime = 0;
                // 					$scope.showme[x] = false;
                // 				}
                // 			}
                //             switch(control) {
                //
                //                 case 'play':
                //                     $scope.audio[index].play();
                //                     break;
                //
                //                 case 'pause':
                //                     $scope.audio[index].pause();
                //                     break;
                //
                //                 case 'rewind':
                //                     $scope.audio[index].pause();
                //                     playtime = $scope.audio[index].currentTime;
                //                     $scope.audio[index].currentTime = playtime - 10;
                //                     setTimeout(function () {
                //                        if($scope.audio[index].currentTime < $scope.audio[index].duration)
                //                             $scope.audio[index].play();
                //                     }, 300);
                //                     break;
                //
                //                 case 'forward':
                //                     $scope.audio[index].pause();
                //                     playtime = $scope.audio[index].currentTime;
                //                     $scope.audio[index].currentTime = playtime + 10;
                //                     setTimeout(function () {
                //                        if($scope.audio[index].currentTime < $scope.audio[index].duration)
                //                             $scope.audio[index].play();
                //                     }, 300);
                //                     break;
                //
                //                 default:

            }
            //console.log(emailData.email.message);
            if (valid) {
                CallsDetailsWebService.emailRecording(emailData).then(function(result) {
                    //var dataSet = result.data.json;
                    //console.log(result);
                    if (result.data.err === '') {
                        pinesNotifications.notify({
                            title: 'Email Call',
                            text: 'Successfully emailed call',
                            type: 'success'
                        });
                        $uibModalInstance.close($scope.email);

                    } else {
                        pinesNotifications.notify({
                            title: 'Email Call',
                            text: 'Failed to email call',
                            type: 'error'
                        });
                    }
                });
            }
        };

        $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };
    });
