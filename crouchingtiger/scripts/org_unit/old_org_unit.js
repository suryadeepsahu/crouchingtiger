//jshint ignore:start
angular
    .module('old-org-unit', ['disableAll', 'theme.services', 'ui.bootstrap', "breadcrumb", "whitelabel", 'ui.select2', 'campaigns-builder', 'ngTagsInput'])
    .factory('OldOrgUnitWebService', function($q, $rootScope, $http, $window, $location) {
        'use strict';
        var OldOrgUnitWebService = {};

        /*  Helper function for getting default config object  */
        OldOrgUnitWebService.getJsonConfig = function() {
            var config = {
                headers: {
                    'content-type': 'application/json',
                    'Authorization': 'bearer ' + $window.sessionStorage.token
                }
            };
            return config;
        };

        //  Export functionality start
        OldOrgUnitWebService.getGroupsExportReport = function(userAccess, ouId) {
            return $http.get(this.getBaseURL() + "/v1/orgunit/groups/ouId/" + ouId + "/userAccess/" + userAccess, this.getJsonConfig());
        };

        OldOrgUnitWebService.getUsersExportReport = function(userAccess, ouId) {
            return $http.get(this.getBaseURL() + "/v1/user/users/ouId/" + ouId + "/userAccess/" + userAccess, this.getJsonConfig());
        };

        // Export functionality End
        OldOrgUnitWebService.getBaseURL = function() {
            return $rootScope.url + ":" + $rootScope.port;
        };

        OldOrgUnitWebService.getOULevel = function(ouId) {
            return $http.get(this.getBaseURL() + "/v1/orgUnit/level/" + ouId, this.getJsonConfig());
        };

        OldOrgUnitWebService.getconversationalanalytics = function(orgUnitId) {
            return $http.get(this.getBaseURL() + "/v1/defgroupsetting/CAStatus/" + orgUnitId, this.getJsonConfig());
        };

        OldOrgUnitWebService.getFeatureSettings = function(orgUnitId) {
            return $http.get(this.getBaseURL() + "/v1/defgroupsetting/feature/" + orgUnitId, this.getJsonConfig());
        };

        OldOrgUnitWebService.getDefaultCustomParams = function(orgUnitId) {
            // return $http.get(this.getBaseURL() + "/v1/defgroupsetting/feature/customParams/" + orgUnitId, this.getJsonConfig());
            return $http.get(this.getBaseURL() + "/v1/defgroupsetting/CallFlow/customParams/" + orgUnitId, this.getJsonConfig());

        };

        OldOrgUnitWebService.getspamguard = function(orgUnitId) {
            return $http.get(this.getBaseURL() + '/v1/defgroupsetting/spamguard/' + orgUnitId, this.getJsonConfig());
        };

        OldOrgUnitWebService.getrecordcall = function(orgUnitId) {
            return $http.get(this.getBaseURL() + '/v1//', +orgUnitId, this.getJsonConfig());
        };

        OldOrgUnitWebService.getvoicepromts = function(orgUnitId) {
            return $http.get(this.getBaseURL() + "/v1/callflowrecording/" + orgUnitId + "/prompt", this.getJsonConfig());
        };

        OldOrgUnitWebService.getwhisper = function(orgUnitId) {
            return $http.get(this.getBaseURL() + "/v1/callflowrecording/" + orgUnitId + "/whisper", this.getJsonConfig());
        };

        OldOrgUnitWebService.getcustomsource = function(orgUnitId) {
            return $http.get(this.getBaseURL() + '/v1/customSource/' + orgUnitId, this.getJsonConfig());
        };

        OldOrgUnitWebService.getCallFlow = function(orgUnitId) {
            return $http.get(this.getBaseURL() + "/v1/defgroupsetting/callFlow/" + orgUnitId, this.getJsonConfig());
        };

        OldOrgUnitWebService.getCallActions = function(orgUnitId) {
            return $http.get(this.getBaseURL() + "/v1/defgroupsetting/callAction/" + orgUnitId, this.getJsonConfig());
        };

        OldOrgUnitWebService.getcallActionByActionId = function(id) {
            return $http.get(this.getBaseURL() + "/v1/defgroupsetting/callAction/action/" + id, this.getJsonConfig());
        };



        OldOrgUnitWebService.getWebhooks = function(currentOUId) {
            return $http.get(this.getBaseURL() + "/v1/webhook/list/" + currentOUId, this.getJsonConfig());
        };

        OldOrgUnitWebService.removecallActions = function(id, ou_id) {
            var req = {
                method: 'DELETE',
                url: this.getBaseURL() + "/v1/defgroupsetting/callAction/" + id + "/" + ou_id,
                headers: {
                    'content-type': 'application/json',
                    'Authorization': 'bearer ' + $window.sessionStorage.token
                },
            };
            return $http(req);
        };

        OldOrgUnitWebService.createDefaultCustomParams = function(nc) {
            var req = {
                method: 'POST',
                url: $rootScope.url + ':' + $rootScope.port + '/v1/defgroupsetting/CallFlow/customParams/',
                // url: $rootScope.url + ':' + $rootScope.port + '/v1/defgroupsetting/feature/customParams/',

                headers: {
                    'content-type': 'application/json',
                    'Authorization': 'bearer ' + $window.sessionStorage.token
                },
                data: nc
            };
            return $http(req);
        };

        OldOrgUnitWebService.getStyle = function(ouid) {
            return $http.get(this.getBaseURL() + "/v1/useraccess/styleou/" + ouid, this.getJsonConfig());
        };

        OldOrgUnitWebService.getChildrenOUs = function(id) {

            $http.defaults.useXDomain = true;
            return $http.get($rootScope.url + ':' + $rootScope.port + '/v1/orgUnit?org_unit_parent_id=' + id,
                this.getJsonConfig());
        };

        OldOrgUnitWebService.validateDniData = function(data, show) {
            var errorsArrHash = {};
            var arrRequired = [];
            var arrInvalid = [];
            var arrInvalidMessage = [];
            var REF_REGEX = new RegExp(/^([a-z0-9]+|\*)([\-\.]{1}[a-z0-9]+)*\.([a-z]{1,5}|\*)(:[0-9]{1,5})?(\/.*)?$/i);

            if (data.destination_url.length === 0) {
                arrRequired.push("Host Domain is required");
            }

            if (data.dni_element.length === 0) {
                arrRequired.push("HTML Class is required");
            }

            if (((data.destination_url).indexOf('*') > -1) && ((data.destination_url).charAt(0) != '*' || (data.destination_url).charAt(1) != '.')) {
                arrInvalid.push('Host Domain');
                arrInvalidMessage.push("When using a wildcard at the beginning of a Host Domain, *.domain format is required. Example: *.logmycalls.com");
            }

            if (data.referrer && show) {
                if (!REF_REGEX.test(data.referrer)) {
                    arrInvalid.push('Referring Website');
                    arrInvalidMessage.push("Wrong domain format for Referring Website.");
                } else {
                    var tmp = (data.referrer).split('.');
                    if (tmp.length == 2) {
                        if (((tmp[0] == '*') && (tmp[1] != '*'))) {
                            arrInvalid.push('Referring Website');
                            arrInvalidMessage.push("Wrong domain format for Referring Website.");
                        }
                    }
                }
            } else if (!data.referrer) {
                arrInvalidMessage.push("Referring Website field is required.");
            }

            if (data.dni_element) {
                if (data.dni_element == "lmc_track" && (data.dni_type == "session" || data.dni_type == "source")) {
                    arrInvalid.push('Class');
                    arrInvalidMessage.push("The HTML Class ID 'lmc_track' is only allowed for URL-based DNI.");
                }
                if (data.dni_element != "lmc_track" && data.dni_type == "url") {
                    arrInvalid.push('Class');
                    arrInvalidMessage.push("The HTML Class ID 'lmc_track' is required for URL-based DNI.");
                }

                if (data.dni_element.indexOf(" ") > -1) {
                    arrInvalid.push('Class');
                    arrInvalidMessage.push("The HTML ID Class must not contain spaces.");
                }
            }
            var tempCombination = {
                "destination_url": data.destination_url,
                "referrer": data.referrer + "|" + data.referrer_type,
                "element": data.dni_element
            };

            /*if(_.filter(referrerElementCombinations, function(combination){ return (combination.destination_url === tempCombination.destination_url && combination.referrer === tempCombination.referrer && combination.element === tempCombination.element)}).length > 0)
                arrInvalidMessage.push("Referrer-HTML Class ID combination is currently in use for that Host Domain. A unique combination is required.");
            */
            errorsArrHash.arrInvalidMessage = arrInvalidMessage;
            errorsArrHash.arrRequired = arrRequired;
            return errorsArrHash;
        };

        // Before deleting an OU, the user is reminded of quantities of correlated data/sub-data that would
        // be deleted as a result of deleting this OU
        OldOrgUnitWebService.infoAboutOuAndChildren = function(ouId) {
            return $http.get(this.getBaseURL() + "/v1/orgUnit/linked/" + ouId, this.getJsonConfig());
        };

        /* Makes sure this Ou can be deleted (shouldnt be a top node OU), and if it can it flags all
         * correlated data as deleted, then returns the parent OU data for the client to update its global
         * current OU to switch to since the current OU is being deleted */
        OldOrgUnitWebService.deleteOU = function(idOfOUtoDelete) {
            return $http.delete(this.getBaseURL() + '/v1/orgUnit/' + idOfOUtoDelete + '/' + $rootScope.currentOUId,
                this.getJsonConfig());
        };

        OldOrgUnitWebService.getOrgUnitById = function(orgUnitId) {
            return $http.get(this.getBaseURL() + '/v1/orgUnit/' + orgUnitId, this.getJsonConfig());
        };

        /*  Used at least in the org unit add/edit page for the drop down list  */
        OldOrgUnitWebService.getIndustries = function() {
            return $http.get(this.getBaseURL() + '/v1/industry', this.getJsonConfig());
        };

        OldOrgUnitWebService.getTTS = function(TextToSpeech) {
            //console.log($window.sessionStorage.token);
            //$http.defaults.useXDomain = true;
            return $http.get(this.getBaseURL() + "/v1/callflow/getmedia/" + encodeURIComponent(TextToSpeech), this.getJsonConfig());
        };

        /*  This should probably be parsed on the backend, but the format the data gets retrieved in
         is not correct for putting into the dropdown box and needs to be parsed to the correct
         format first  */
        OldOrgUnitWebService.parseIndustries = function(industryArray) {

            var organizedIndustries = {};
            var industryCategory, industrySpecific, industryOtherId, industryOtherCategory;
            _.each(industryArray, function(industryObj) {
                industryCategory = industryObj.industry_group;
                industrySpecific = industryObj.industry_name;

                if (organizedIndustries[industryCategory] === undefined) {
                    organizedIndustries[industryCategory] = {
                        'name': industryCategory,
                        specific: []
                    };
                }

                if (industryCategory !== 'Other') {
                    organizedIndustries[industryCategory].specific.push({
                        'name': industrySpecific,
                        'id': industryObj.industry_id
                    });
                } else {
                    industryOtherId = industryObj.industry_id;
                    industryOtherCategory = industryCategory;
                }
            });
            //add 'Other' object last so it appears last in the ng-repeat
            organizedIndustries.Other = {
                'name': industryOtherCategory,
                specific: []
            };
            organizedIndustries.Other.specific.push({
                'name': 'Other',
                'id': industryOtherId
            });
            return organizedIndustries;
        };

        // OldOrgUnitWebService.getOrgGroupsLike = function(orgUnitChars){
        //  return $http.get($rootScope.url +':'+ $rootScope.port + '/v1/orgUnit/' + orgUnitChars, this.getJsonConfig());
        // };

        // OldOrgUnitWebService.getSession = function(){
        //  return $http.get($rootScope.url +':'+ $rootScope.port + '/v1/session', this.getJsonConfig);
        // };

        // OldOrgUnitWebService.getOrganization = function(orgid) {
        //      // response data should contain company name, id, parentcompany, assigned sales rep,
        //      // industry, timezone, phone, city, state, zip
        //  return $http.get($rootScope.url +':'+ $rootScope.port +'/v1/orgUnit/'+ orgid, this.getJsonConfig());
        // };

        OldOrgUnitWebService.updateOrgUnit = function(orgData) {
            var req = {
                method: 'PUT',
                url: $rootScope.url + ':' + $rootScope.port + '/v1/orgUnit/',
                headers: {
                    'content-type': 'application/json',
                    'Authorization': 'bearer ' + $window.sessionStorage.token
                },
                data: orgData
            };
            return $http(req);
        };

        /*  Parameters: orgData -> OU data  */
        OldOrgUnitWebService.createOrgUnit = function(orgData, ouParentId) {
            //does not send ID of org, because hasn't been created yet
            var req = {
                method: 'POST',
                url: this.getBaseURL() + '/v1/orgUnit/',
                headers: {
                    'content-type': 'application/json',
                    'Authorization': 'bearer ' + $window.sessionStorage.token
                },
                data: orgData
            };
            return $http(req);
        };

        OldOrgUnitWebService.updateCallActions = function(ca) {
            var req = {
                method: 'PUT',
                url: this.getBaseURL() + "/v1/defgroupsetting/callAction",
                headers: {
                    'content-type': 'application/json',
                    'Authorization': 'bearer ' + $window.sessionStorage.token
                },
                data: ca
            };
            return $http(req);
        };

        //Update CA status On/Off
        OldOrgUnitWebService.enableconversationalanalytics = function(enableConvData) {
            //does not send ID of org, because hasn't been created yet
            var req = {
                method: 'PUT',
                url: this.getBaseURL() + '/v1/defgroupsetting/CAStatus/',
                headers: {
                    'content-type': 'application/json',
                    'Authorization': 'bearer ' + $window.sessionStorage.token
                },
                data: enableConvData
            };
            return $http(req);
        };


        OldOrgUnitWebService.savedefCustomSource = function(orgData, ouParentId) {
            //does not send ID of org, because hasn't been created yet
            var req = {
                method: 'POST',
                url: this.getBaseURL() + '/v1//',
                headers: {
                    'content-type': 'application/json',
                    'Authorization': 'bearer ' + $window.sessionStorage.token
                },
                data: orgData
            };
            return $http(req);
        };


        OldOrgUnitWebService.enableSpamguard = function(orgData, ouParentId) {
            //does not send ID of org, because hasn't been created yet
            var req = {
                method: 'POST',
                url: this.getBaseURL() + '/v1//',
                headers: {
                    'content-type': 'application/json',
                    'Authorization': 'bearer ' + $window.sessionStorage.token
                },
                data: orgData
            };
            return $http(req);
        };

        OldOrgUnitWebService.saveDefaultGroupSetting = function(orgData) {
            //does not send ID of org, because hasn't been created yet
            var req = {
                method: 'POST',
                url: this.getBaseURL() + '/v1/defgroupsetting/feature/',
                headers: {
                    'content-type': 'application/json',
                    'Authorization': 'bearer ' + $window.sessionStorage.token
                },
                data: orgData
            };
            return $http(req);
        };

        //Insert new Call Flow
        OldOrgUnitWebService.defaultCreateCallFlow = function(callFlowData) {
            var req = {
                method: 'POST',
                url: this.getBaseURL() + '/v1/defgroupsetting/CallFlow',
                headers: {
                    'content-type': 'application/json',
                    'Authorization': 'bearer ' + $window.sessionStorage.token
                },
                data: callFlowData
            };
            return $http(req);
        };

        //Update Call flow
        OldOrgUnitWebService.defaultUpdateCallFlow = function(callFlowData) {
            var req = {
                method: 'PUT',
                url: this.getBaseURL() + '/v1/defgroupsetting/CallFlow',
                headers: {
                    'content-type': 'application/json',
                    'Authorization': 'bearer ' + $window.sessionStorage.token
                },
                data: callFlowData
            };
            return $http(req);
        };

        OldOrgUnitWebService.recordcall = function(orgData, ouParentId) {
            //does not send ID of org, because hasn't been created yet
            var req = {
                method: 'POST',
                url: this.getBaseURL() + '/v1//',
                headers: {
                    'content-type': 'application/json',
                    'Authorization': 'bearer ' + $window.sessionStorage.token
                },
                data: orgData
            };
            return $http(req);
        };

        OldOrgUnitWebService.playvoicepromt = function(orgData, ouParentId) {
            //does not send ID of org, because hasn't been created yet
            var req = {
                method: 'POST',
                url: this.getBaseURL() + '/v1//',
                headers: {
                    'content-type': 'application/json',
                    'Authorization': 'bearer ' + $window.sessionStorage.token
                },
                data: orgData
            };
            return $http(req);
        };

        OldOrgUnitWebService.playwhispermsg = function(orgData, ouParentId) {
            //does not send ID of org, because hasn't been created yet
            var req = {
                method: 'POST',
                url: this.getBaseURL() + '/v1//',
                headers: {
                    'content-type': 'application/json',
                    'Authorization': 'bearer ' + $window.sessionStorage.token
                },
                data: orgData
            };
            return $http(req);
        };

        OldOrgUnitWebService.customSource = function(customData) {
            //does not send ID of org, because hasn't been created yet
            var req = {
                method: 'POST',
                url: this.getBaseURL() + '/v1/customSource',
                headers: {
                    'content-type': 'application/json',
                    'Authorization': 'bearer ' + $window.sessionStorage.token
                },
                data: customData
            };
            return $http(req);
        };

        OldOrgUnitWebService.saveCallActions = function(ca) {
            var req = {
                method: 'POST',
                url: this.getBaseURL() + "/v1/defgroupsetting/callAction",
                headers: {
                    'content-type': 'application/json',
                    'Authorization': 'bearer ' + $window.sessionStorage.token
                },
                data: ca
            };
            return $http(req);
        };

        //--delete Custome source
        OldOrgUnitWebService.multiDeleteCustomSource = function(customsourceIds) {
            //does not send ID of org, because hasn't been created yet
            var req = {
                method: 'DELETE',
                url: this.getBaseURL() + '/v1/orgUnit/customsources', // need to change here
                headers: {
                    'content-type': 'application/json',
                    'Authorization': 'bearer ' + $window.sessionStorage.token
                },
                data: customsourceIds
            };
            return $http(req);
        };

        return OldOrgUnitWebService;
    })
      


.controller('OldOrgUnitController', ['$scope', 'OldOrgUnitWebService', 'UserWebService', 'VoicePromptService', '$rootScope', '$routeParams', '$http', 'pinesNotifications', '$timeout', "$q", '$compile', 'LogoutService', 'OrgUnitLocal', '$bootbox', '$uibModal',
    "$route", "$location","$window", "BreadcrumbWebService", "DNIWebService", "CampaignWebService", "TagWebService", "WhisperMessageService", "progressLoader", '$filter', 
    function($scope, OldOrgUnitWebService, UserWebService, voicepromptService, $rootScope, $routeParams, $http, pinesNotifications, $timeout, $q, $compile, LogoutService,OrgUnitLocal, $bootbox, $uibModal,
        $route, $location,$window, BreadcrumbWebService, DNIWebService, CampaignWebService, TagWebService, whispermessageService, progressLoader, $filter) {
        'use strict';

        // Check If CallAction As component
        if ($scope.userAccess.callaction === undefined || $scope.userAccess.callaction < 4) {
            $scope.callActionComponent = true;
        } else {
            $scope.callActionComponent = false;
        }
        // Check If DNI As component
        if ($scope.userAccess.dni === undefined || $scope.userAccess.dni < 4) {
            $scope.dniComponent = true;
        } else {
            $scope.dniComponent = false;
        }
        console.log("ia m old Path is ", $location.path());
        if($rootScope.is_migrated == true || $rootScope.is_migrated == 'true' ){
            console.log("Path is ", $location.path());
            if($location.path() == '/set-group'){
                location.href = '#/set-legacy-group';
            }else{
                $location.path('/set-group');
                // $location.search('id',$rootScope.editClickId);
            }
        }

        $scope.triggerBoth = false;
        $scope.noResultsTag = null;
        $scope.dniReferrer = [
            { value: 'new', text: "Add New" },
            { value: '*.*|null', text: "Any" },
            { value: '*.bing.com|null', text: "Bing" },
            { value: '*.google.*|paid', text: "Google (Paid)" },
            { value: '*.google.*|organic', text: "Google (Organic)" },
            { value: '*.yahoo.com|paid', text: "Yahoo (Paid)" },
            { value: '*.yahoo.com|organic', text: "Yahoo (Organic)" }
        ];
        if($window.sessionStorage.userAccess === undefined){
            
            //$scope.isLoggedIn = false;
                LogoutService.logout();  
        } 
        
        $scope.CurrentOUName = $rootScope.currentOUName;

        $scope.showSpamButton = false;
        $scope.showCaButton = false;
        $scope.enableSpam = true;
        $scope.isAdmin = true;
        $scope.enableConvAna = true;
        $scope.scoreAccess = false;

        if ($scope.userAccess && $scope.userAccess.manualscorecard) {
            $scope.scoreAccess = true;
        }

        if ($scope.userAccess && $scope.userAccess.spamguard) {
            $scope.showSpambutton = true;
            $scope.enableSpam = true;
        }

        if ($scope.userAccess && $scope.userAccess.ca) {
            $scope.showCaButton = true;
            $scope.enableConvAna = true;
        }

        if ($rootScope.roleId == 1 || $rootScope.roleId == 4)
            $scope.isAdmin = false;

        $scope.isDeleteClicked = false;
        $scope.shareDni = false;
        $scope.recordcheck = true;
        $scope.voicepromt = true;
        $scope.whisperpromt = true;

        $scope.destination_url = '*.*';
        $scope.referrer = '*.*|null';
        $scope.dni_element = 'CVZ';
        $scope.dni_ttl1 = 'Select';
        $scope.dni_type = '';
        $scope.custom_params = '';

        $scope.dniSettingPresent = false;
        $scope.spamSettingPresent = false;
        $scope.CASettingPresent = false;
        $scope.callflowSettingPresent = true;
        $scope.CSSettingPresent = true;
        $scope.playDisclaimer = 'before';
        $scope.recordCall = true;
        $scope.voicePrompt1 = false;
        $scope.whisperPrompt1 = false;
        $scope.voicePromptTTSText = '';
        $scope.whisperTTSText = '';
        $scope.promptAudio = undefined;
        $scope.customSource_1 = 'custom source';
        $scope.customsource = [];
        $scope.customsource = '';
        $scope.ringto = '';
        $scope.oneAtATime = false;
        $scope.rinterval = 72;
        $scope.callbackid = -1;

        var groupsReportName = $rootScope.currentOUName + " " + "groups" + " " + moment().format('YYYY-MM-DD');
        var usersReportName = $rootScope.currentOUName + " " + "users" + " " + moment().format('YYYY-MM-DD');
        $scope.disable_share_dni = false;

        $scope.callActions = [];
        var customsourceArray = ['CS1', 'CS2', 'CS3', 'CS4', 'CS5'];
        $scope.names = '';
        $scope.canModify = true;
        $scope.CS1 = null;
        $scope.CS2 = null;
        $scope.CS3 = null;
        $scope.CS4 = null;
        $scope.CS5 = null;
        $scope.isGroupDetailsOpen = true;
        var pinesText = '';
        $scope.TTSSelected = true;
        $scope.TTSWhisperSelected = true;
        //----- new code
        $scope.customSourceModel = [];
        $scope.customSourceSettings = {
                enableSearch: true,
                showCheckAll: false,
                showUncheckAll: false,
                dynamicTitle: false,
                scrollable: true,
                scrollableHeight: 200,
                searchField: "custom_source_name"
            }
            //---- end of new code 
            // $scope.random6DigitNumber;
            // $scope.lastRandom;

        // $scope.dni_section = true;
        // $scope.load_dni_section = function(){
        //     OldOrgUnitWebService.getDNIdata($rootScope.currentOUId).then(function(result) {
        //         var data = result.data.json;
        //         if (data.dniSettingData[0].org_unit_id != undefined) {
        //             $scope.dni_section = false;
        //             $scope.dniSettingPresent = true;
        //             $scope.destination_url = data.dniSettingData[0].destination_url;
        //             $scope.dni_type = data.dniSettingData[0].dni_type;
        //             $scope.dni_element = data.dniSettingData[0].dni_element;
        //             $scope.tempReferrer = data.dniSettingData[0].referrer;
        //             $scope.referrer_type = data.dniSettingData[0].referrer_type;
        //             $scope.shareDni = data.dniSettingData[0].share_with_subgroup
        //             if (data.caData[0].conversation_analytics_status === "false") {
        //                 $scope.enableConvAna = false;
        //             } else {
        //                 $scope.enableConvAna = true;
        //             }

        $scope.showFeatureControl = false;
        $scope.dniTypeList = [
            { id: "url", text: "URL" },
            { id: "source", text: "Source" }
            // { id: "session", text: "Session" }
        ];

        $scope.dniParams = function(size) {
            var modalInstance = $uibModal.open({
                templateUrl: 'assets/partials/dniParams.html',
                controller: 'DNIModelController',
                size: size,
                resolve: {
                    canModify: function() {
                        return $scope.canModify === true ? true : false;
                    },
                    callingController: function() {
                        // return $rootScope.currentOUName;
                        return;
                    }
                }
            });
        };

        //             if (data.caData[0].spam_guard_status === "false") {
        //                 $scope.enableSpam = false;

        $scope.showFeatureControl = false;
        $scope.openFeatureSection = function(open) {
            if (open) {
                OldOrgUnitWebService.getFeatureSettings($rootScope.currentOUId).then(function(result) {
                    $scope.showFeatureControl = true;
                    if (result.data.status === "success") {
                        var data = result.data.json;

                        if (data.defaultData.length > 0) {
                            $scope.enableConvAna = data.defaultData[0].conversation_analytics_status;
                            $scope.enableSpam = data.defaultData[0].spam_guard_status;
                            $scope.shareDni = data.defaultData[0].share_with_subgroup;
                            $scope.disable_share_dni = data.defaultData[0].disable_share_dni;
                            $scope.share_group_name = data.defaultData[0].share_group_name;
                            $scope.location_level_ou = data.defaultData[0].location_level_ou;

                            // if ($scope.disable_share_dni) {
                            //     $scope.shareDni = false;
                            // }

                            if (!$scope.showSpambutton) {
                                $scope.enableSpam = false;
                            }

                            if (!$scope.showCaButton) {
                                $scope.enableConvAna = false;
                            }
                        } else {
                            if (!$scope.showSpambutton) {
                                $scope.enableSpam = false;
                            }

                            if (!$scope.showCaButton) {
                                $scope.enableConvAna = false;
                            }
                        }
                    }
                });
            }
        };

        // ========== Export Functionality Start============


        $scope.getGroupsHeader = function() { return ["Account", "Account OUID", "Account External ID", "Parent Group", "Parent Group OUID", "Parent Group External ID", "Group", "Group OUID", "Group External ID", "Industry", "Phone", "City", "State/Province", "Zip/Postal Code", "Enable Conversation Analytics", "Enable Spam Guard", "Share DNI Settings", "Host Domain", "Referring Website", "HTML Class", "Repeat Interval (in hours)", "Custom Source 1", "Custom Source 2", "Custom Source 3", "Custom Source 4", "Custom Source 5", "Record Call", "Call Recording Disclaimer", "Voice Prompt", "Whisper Message", "Ring-to Phone Number", "Call Actions"]; };

        $scope.getCSVGroupData = function(formate, option) {
            var heading = "Export Groups";
            if (formate === 'csv' && option === 'both') {
                $scope.triggerBoth = true;
                $("#userCSVExport").trigger('click');
                heading = "Export Groups & Users";
            }
            // if (formate === 'tsv' && option === 'both') { $("#userTSVExport").trigger('click'); }
            pinesNotifications.notify({
                title: heading,
                text: "Download is in process, it will be completed in few minutes",
                type: 'info'
            });
            $scope.groupsReportFileName = groupsReportName + "." + formate;

            progressLoader.start();
            var groupsExportData = {};
            var deferred = $q.defer();
            var response = OldOrgUnitWebService.getGroupsExportReport($scope.userAccess.orgunit, $rootScope.currentOUId);
            response.then(function(result) {
                if (result.data.json != 'error') {
                    groupsExportData = result.data.json;
                    var groupsData = [];
                    for (var i = 0; i < groupsExportData.length; i++) {
                        var phone = groupsExportData[i].phone;
                        if (phone !== null) {
                            phone = phone.replace("(", "").replace(")", "").replace(" ", "").replace("-", "").trim();
                        }

                        if (groupsExportData[i].record_call === false) {
                            groupsExportData[i].call_recording_disclaimer = '';
                        }
                        groupsData.push({
                            a: groupsExportData[i].account,
                            b: groupsExportData[i].account_ouid,
                            c: groupsExportData[i].account_external_id,
                            d: groupsExportData[i].parent_group,
                            e: groupsExportData[i].parent_group_ouid,
                            f: groupsExportData[i].parent_group_external_id,
                            g: groupsExportData[i].group,
                            h: groupsExportData[i].group_ouid,
                            i: groupsExportData[i].group_external_id,
                            j: groupsExportData[i].industry,
                            k: phone,
                            l: groupsExportData[i].city,
                            m: groupsExportData[i].state_province,
                            n: groupsExportData[i].zip_postal_code,
                            o: groupsExportData[i].enable_conversation_analytics,
                            p: groupsExportData[i].enable_spam_guard,
                            q: groupsExportData[i].share_dni_settings,
                            r: groupsExportData[i].host_domain,
                            s: groupsExportData[i].referring_website,
                            t: groupsExportData[i].html_class,
                            u: groupsExportData[i].repeat_interval,
                            v: groupsExportData[i].custom_source_name1,
                            w: groupsExportData[i].custom_source_name2,
                            x: groupsExportData[i].custom_source_name3,
                            y: groupsExportData[i].custom_source_name4,
                            z: groupsExportData[i].custom_source_name5,
                            aa: groupsExportData[i].record_call,
                            ab: groupsExportData[i].call_recording_disclaimer,
                            ac: groupsExportData[i].voice_prompt,
                            ad: groupsExportData[i].whisper_message,
                            ae: groupsExportData[i].ring_to_number,
                            af: groupsExportData[i].call_action
                        });
                    }
                    progressLoader.set(50);
                    deferred.resolve(groupsData);

                    if ($rootScope.isSafari) {
                        deferred.resolve(JSONToCSVConvertor(groupsData, $scope.groupsReportFileName, true, formate));
                    } else {
                        progressLoader.end();
                        return deferred.promise;
                    }
                }
            });
            if (!$rootScope.isSafari) {
                progressLoader.end();
                return deferred.promise;
            }
        };
        $rootScope.$on('$locationChangeSuccess', function(){
            stopAudio();
        });
        $scope.getUsersHeader = function() { return ["Account", "Account OUID", "Account External ID", "Parent Group", "Parent Group OUID", "Parent Group External ID", "Group", "Group OUID", "Group External ID", "First Name", "Last Name", "Email", "External Id", "Agent Ring-to", "Agent ID", "Role", "Status", "Access Audio", "Score Calls", "Reporting Access", "Group Access"]; };

        $scope.getCSVUserData = function(formate, option) {
            console.log($scope.triggerBoth);
            if (!$scope.triggerBoth)
                pinesNotifications.notify({
                    title: 'Export Users',
                    text: "Download is in process, it will be completed in few minutes",
                    type: 'info'
                });
            $scope.triggerBoth = false;
            $scope.usersReportFileName = usersReportName + "." + formate;
            progressLoader.start();
            var usersExportData = {};
            var deferred = $q.defer();

            var response = OldOrgUnitWebService.getUsersExportReport($scope.userAccess.orgunit, $rootScope.currentOUId);
            response.then(function(result) {
                if (result.data.json != 'error') {
                    usersExportData = result.data.json;
                    var usersData = [];

                    for (var i = 0; i < usersExportData.length; i++) {
                        usersData.push({
                            a: usersExportData[i].account,
                            b: usersExportData[i].account_ouid,
                            c: usersExportData[i].account_external_id,
                            d: usersExportData[i].parent_group,
                            e: usersExportData[i].parent_group_ouid,
                            f: usersExportData[i].parent_group_external_id,
                            g: usersExportData[i].group,
                            h: usersExportData[i].group_ouid,
                            i: usersExportData[i].group_external_id,
                            j: usersExportData[i].first_name,
                            k: usersExportData[i].last_name,
                            l: usersExportData[i].email,
                            m: usersExportData[i].user_ext_id,
                            n: usersExportData[i].agent_ring_to,
                            o: usersExportData[i].agent_id,
                            p: usersExportData[i].role,
                            q: usersExportData[i].status,
                            r: usersExportData[i].access_audio,
                            s: usersExportData[i].score_call,
                            t: usersExportData[i].report_access,
                            u: usersExportData[i].group_access
                        });
                    }
                    progressLoader.set(50);
                    deferred.resolve(usersData);

                    if ($rootScope.isSafari) {
                        deferred.resolve(JSONToCSVConvertor(usersData, usersReportFileName, true, formate));
                    } else {
                        progressLoader.end();
                        return deferred.promise;
                    }
                }
            });
            if (!$rootScope.isSafari) {
                progressLoader.end();
                return deferred.promise;
            }
        };

        // ========== Export Functionality End============


        $scope.saveDefaultGroupSetting = function() {
            //Split dni referrer and type
            // var temp = $scope.referrer.split("|");
            // $scope.tempReferrer = temp[0];
            // $scope.referrer_type = temp[1];
            // if (!$scope.referrer_type) $scope.referrer_type = null;
            if (!$scope.showSpambutton) {
                $scope.enableSpam = false;
            }

            if (!$scope.showCaButton) {
                $scope.enableConvAna = false;
            }

            var data = {
                // dniSettingData: {
                //     "org_unit_id": $scope.currentOUId,
                //     "destination_url": $scope.destination_url,
                //     "dni_type": $scope.dni_type,
                //     "dni_element": $scope.dni_element,
                //     "referrer": $scope.tempReferrer,
                //     "referrer_type": $scope.referrer_type,
                //     "share_with_subgroup": $scope.shareDni,
                //     "ttl": $scope.dni_ttl,
                //     //"custom_params": custom_param
                // },
                defaultData: {
                    "org_unit_id": $scope.currentOUId,
                    "conversation_analytics_status": $scope.enableConvAna,
                    "spam_guard_status": $scope.enableSpam,
                    "share_with_subgroup": $scope.shareDni
                }
            };


            // var errorsArrHash = OldOrgUnitWebService.validateDniData(data.dniSettingData, $scope.showReferrerTextBox);
            // if (errorsArrHash.arrRequired.length) {
            //     $scope.showSaveButton();
            //     pinesNotifications.notify({
            //         title: 'Default Feature Settings',
            //         text: '\'' + _.uniq(errorsArrHash.arrRequired).join(','),
            //         type: 'error'
            //     });
            //     return;
            // } else if (errorsArrHash.arrInvalidMessage.length) {
            //     $scope.showSaveButton();
            //     pinesNotifications.notify({
            //         title: 'Default Feature Settings',
            //         text: '\'' + _.uniq(errorsArrHash.arrInvalidMessage).join(','),
            //         type: 'error'
            //     });
            //     return;
            // } else {
            OldOrgUnitWebService.saveDefaultGroupSetting(data)
                .then(function(result) {
                    if (result.data.result === 'error') {
                        pinesNotifications.notify({
                            title: 'Default Feature Settings',
                            text: result.data.err,
                            type: 'error'
                        });
                    } else {
                        pinesNotifications.notify({
                            title: 'Default Feature Settings',
                            text: "Successfully Saved The Feature Settings",
                            type: 'success'

                        });
                    }
                });

            // }

        };

        //Call Action releated Methods

        $scope.enableSave = function(actionId) {
            if ($scope.addCallAction.actionOptions[actionId] === "tag_call") {
                if (!$scope.callActionLoaded) {
                    $scope.addCallAction.callActionFormSubmitted[actionId] = false;
                }
                $scope.callActionLoaded = false;
            }
        };

        $scope.showRemoveRule = function(rules) {
            var count = 0;
            $.each(rules, function(index, rule) {
                if (!isEmpty(rule)) {
                    count = count + 1;
                }
            });
            if (count > 1)
                return true;
            else
                return false;
        };

        $scope.sizeOf = function(obj) {
            return Object.keys(obj).length;
        };


        $scope.setDefaultCallAction = function(actionId) {
            $scope.addCallAction.actionOptions[actionId] = "action0";
            var target = Object.assign({}, $scope.names.fields);
            delete target['Ring to Phone Number'];
            $scope.ruleDropDown[actionId] = {
                0: {
                    "fields": Object.keys(target)
                }
            };
            $scope.addCallAction.rule[actionId] = {
                0: {
                    "fields": "",
                    "operators": "",
                    "enum": "",
                    "join_type": ""
                }
            };

            $scope.addCallAction.email[actionId] = [];
            $scope.addCallAction.remainingText[actionId] = 1024 + " characters are remaining";
            $scope.addCallAction.phone[actionId] = [];
            $scope.addCallAction.tagList[actionId] = [];
            $scope.addCallAction.postEvent[actionId] = [];
            $scope.addCallAction.webhook[actionId] = [];
            // var operator = "";
            // var string = "";
            // var addedAction = {};
            // var tag_id = 1;
            // console.log($scope.addCallAction.action_id[actionId]);
            // if($scope.addCallAction.action_id[actionId] !== undefined){
            //     OldOrgUnitWebService.getcallActionByActionId($scope.addCallAction.action_id[actionId]).then(function(result) {
            //         if (result.data.result != 'error' && result.data.json.length > 0 && result.data.json[0].rules.length > 0) {
            //             result.data.json.forEach(function(r) {
            //                 var string = "";
            //                 r.rules.forEach(function(rule, index) {
            //                     if (findKey($scope.names.fields, rule.data_field) == "duration") {
            //                         if (rule.operator == "=") {
            //                             operator = "=";
            //                         } else if (rule.operator == "!=") {
            //                             operator = "!=";
            //                         } else {
            //                             operator = findKey($scope.names.Ct_operators_based_on_fields, rule.operator);
            //                         }
            //                     } else {
            //                         operator = findKey($scope.names.Ct_operators_based_on_fields, rule.operator);
            //                     }
            //                     if (rule.join_type == "NONE") {
            //                         rule.join_type = "";
            //                     }

            //                     if (rule.operator === "contains" || rule.operator === "does not contain" ||
            //                         rule.operator === "begins with" || rule.operator === "ends with") {
            //                         operator = rule.operator;
            //                     }
            //                     $scope.ruleDropDown[r.action_order][index].fields = Object.keys($scope.names.fields);
            //                     $scope.ruleDropDown[r.action_order][index].operators = $scope.names.operators[findKey($scope.names.fields, rule.data_field)];
            //                     $scope.ruleDropDown[r.action_order][index].enum = $scope.names.enum[findKey($scope.names.fields, rule.data_field)];
            //                     $scope.ruleDropDown[r.action_order][index].join_type = ["AND", "OR"];

            //                     $scope.addCallAction.rule[r.action_order][index].fields = findKey($scope.names.fields, rule.data_field);
            //                     $scope.addCallAction.rule[r.action_order][index].operators = operator;
            //                     $scope.addCallAction.rule[r.action_order][index].enum = rule.comparator.replace(/%/g, '');
            //                     $scope.addCallAction.rule[r.action_order][index].join_type = rule.join_type;
            //                     $scope.addCallAction.rule[r.action_order][parseInt(index) + 1].join_type = "";

            //                 });



            //                 switch (r.action) {
            //                      case 'email_alert':
            //                         var callActionsEmail = [];
            //                         var callActionTarget = r.action_target.split(",");
            //                         for (var i = 0; i < callActionTarget.length; i++) {
            //                             var tempHash = {
            //                                 id: tag_id,
            //                                 text: callActionTarget[i]
            //                             };
            //                             callActionsEmail.push(tempHash);

            //                             tag_id ++;
            //                         } 


            //                         var emailText =  r.action_target.replace(/,/g,'');
            //                         emailText = emailText.replace(/ /g,''); 

            //                         $scope.addCallAction.remainingText[r.action_order] = (1024 - emailText.length) + " characters are remaining";
            //                         $scope.addCallAction.email[r.action_order] = callActionsEmail;
            //                         break;
            //                     case 'sms_alert':
            //                         $scope.addCallAction.phone[r.action_order] = r.action_target;
            //                         break;
            //                     case 'tag_call':
            //                         var selectedTags = [];
            //                         r.action_target = r.action_target.split(',');
            //                         angular.forEach(r.action_target, function(value, key) {
            //                             var val = value.trim();
            //                             selectedTags.push(val);
            //                         });
            //                         $scope.addCallAction.tagList[r.action_order] = selectedTags;
            //                         break;
            //                     case 'post_event':
            //                         $scope.addCallAction.postEvent[r.action_order] = r.action_target;
            //                         break;
            //                     case 'webhook':
            //                         $scope.addCallAction.webhook[r.action_order] = r.action_target;
            //                         break;
            //                     case 'post_detail':
            //                         $scope.addCallAction.sendCallDetails[r.action_order] = r.action_target;
            //                         break;
            //                     case 'callback':
            //                         $scope.addCallAction.callbackFlag[r.action_order] = r.action_target;
            //                         break;
            //                 }
            //                 $scope.addCallAction.action_id[r.action_order] = r.default_action_id;
            //                 $scope.addCallAction.actionOptions[r.action_order] = r.action;
            //                 if (r.action === 'doubleclick' && $scope.dcSetting === false) {
            //                     $scope.addCallAction.actionOptions[r.action_order] = "";
            //                 }
            //                 console.log($scope.addCallAction);

            //             });
            //         }
            //     });
            // }else{
            //     $scope.addCallAction.actionOptions[actionId] = "action0";
            //     $scope.ruleDropDown[actionId] = {
            //         0: {
            //             "fields": Object.keys($scope.names.fields)
            //         }
            //     };
            //     $scope.addCallAction.rule[actionId] = {
            //         0: {
            //             "fields": "",
            //             "operators": "",
            //             "enum": "",
            //             "join_type": ""
            //         }
            //     };

            //     $scope.addCallAction.email[actionId] = [];
            //     $scope.addCallAction.remainingText[actionId] = 1024 + " characters are remaining";
            //     $scope.addCallAction.phone[actionId] = [];
            //     $scope.addCallAction.tagList[actionId] = [];
            //     $scope.addCallAction.postEvent[actionId] = [];
            //     $scope.addCallAction.webhook[actionId] = [];
            // }
        };


        $scope.removeSelectedWhisperAudio = function() {
            // remove the text from the text field
            if ($scope.whisperAudio !== undefined)
                $scope.whisperAudio.pause();
            $scope.whisperAudio = undefined;
            $scope.whisperURL = undefined;
            $scope.whisperTTSText = "";
            $scope.TTSWhisperSelected = true;
            $scope.hasValidWhisperURL = false;
        };

        $scope.loadCallActionSection = function(isOpen) {
            if (isOpen) {
                var operator = "";
                var tag_id = 1;
                var string = "";
                var addedAction = {};
                OldOrgUnitWebService.getCallActions($scope.currentOUId).then(function(result) {
                    $scope.callActionLoaded = true;
                    if (result.data.result != 'error' && result.data.json.length > 0 && result.data.json[0].rules.length > 0) {
                        $scope.callActions = [];
                        result.data.json.forEach(function(r) {
                            var string = "";
                            $scope.addCallAction.rule[r.action_order] = {};
                            $scope.ruleDropDown[r.action_order] = {};
                            var target = Object.assign({}, $scope.names.fields);
                            delete target['Ring to Phone Number'];
                            r.rules.forEach(function(rule, index) {
                                if (findKey(target, rule.data_field) == "duration") {
                                    if (rule.operator == "=") {
                                        operator = "=";
                                    } else if (rule.operator == "!=") {
                                        operator = "!=";
                                    } else {
                                        operator = findKey($scope.names.Ct_operators_based_on_fields, rule.operator);
                                    }
                                } else {
                                    operator = findKey($scope.names.Ct_operators_based_on_fields, rule.operator);
                                }
                                if (rule.join_type == "NONE") {
                                    rule.join_type = "";
                                }

                                if (rule.operator === "contains" || rule.operator === "does not contain" ||
                                    rule.operator === "begins with" || rule.operator === "ends with") {
                                    operator = rule.operator;
                                }

                                $scope.addCallAction.rule[r.action_order][index] = {};
                                $scope.ruleDropDown[r.action_order][index] = {};
                                $scope.addCallAction.rule[r.action_order][parseInt(index) + 1] = {};
                                $scope.ruleDropDown[r.action_order][parseInt(index) + 1] = {};

                                $scope.ruleDropDown[r.action_order][index].fields = Object.keys(target);
                                $scope.ruleDropDown[r.action_order][index].operators = $scope.names.operators[findKey(target, rule.data_field)];
                                $scope.ruleDropDown[r.action_order][index].enum = $scope.names.enum[findKey(target, rule.data_field)];
                                $scope.ruleDropDown[r.action_order][index].join_type = ["AND", "OR"];

                                $scope.ruleDropDown[r.action_order][parseInt(index) + 1].join_type = ["AND", "OR"];
                                $scope.addCallAction.rule[r.action_order][index].fields = findKey(target, rule.data_field);
                                $scope.addCallAction.rule[r.action_order][index].operators = operator;
                                $scope.addCallAction.rule[r.action_order][index].enum = rule.comparator.replace(/%/g, '');
                                $scope.addCallAction.rule[r.action_order][index].join_type = rule.join_type;
                                $scope.addCallAction.rule[r.action_order][parseInt(index) + 1].join_type = "";

                            });

                            addedAction = { id: (r.action_order) };

                            switch (r.action) {
                                case 'email_alert':
                                    var callActionsEmail = [];
                                    var callActionTarget = r.action_target.split(",");
                                    for (var i = 0; i < callActionTarget.length; i++) {
                                        var tempHash = {
                                            id: tag_id,
                                            text: callActionTarget[i]
                                        };
                                        callActionsEmail.push(tempHash);

                                        tag_id++;
                                    }

                                    var emailText = r.action_target.replace(/,/g, '');
                                    emailText = emailText.replace(/ /g, '');

                                    $scope.addCallAction.remainingText[r.action_order] = (1024 - emailText.length) + " characters are remaining";

                                    // $scope.addCallAction.remainingText.push(tempRemainingText);
                                    $scope.addCallAction.email[r.action_order] = callActionsEmail;
                                    break;
                                case 'sms_alert':
                                    $scope.addCallAction.phone[r.action_order] = r.action_target;
                                    break;
                                case 'tag_call':
                                    var selectedTags = [];
                                    r.action_target = r.action_target.split(',');
                                    angular.forEach(r.action_target, function(value, key) {
                                        var val = value.trim();
                                        selectedTags.push(val);
                                    });
                                    $scope.addCallAction.tagList[r.action_order] = selectedTags;
                                    break;
                                case 'post_event':
                                    $scope.addCallAction.postEvent[r.action_order] = r.action_target;
                                    break;
                                case 'webhook':
                                    $scope.addCallAction.webhook[r.action_order] = r.action_target;
                                    break;
                                case 'post_detail':
                                    $scope.addCallAction.sendCallDetails[r.action_order] = r.action_target;
                                    break;
                                case 'callback':
                                    $scope.addCallAction.callbackFlag[r.action_order] = r.action_target;
                                    break;
                            }
                            $scope.addCallAction.action_id[r.action_order] = r.default_action_id;
                            $scope.addCallAction.actionOptions[r.action_order] = r.action;
                            if (r.action === 'doubleclick' && $scope.dcSetting === false) {
                                $scope.addCallAction.actionOptions[r.action_order] = "";
                            }
                            $scope.addCallAction.callActionFormSubmitted[r.action_order] = true;

                            $scope.callActions.push(addedAction);
                        });
                    }
                    if (isEmpty($scope.addCallAction.actionOptions)) {
                        $scope.addCallAction.actionOptions[1] = "action0";
                        $scope.addCallAction.callActionFormSubmitted[1] = false;
                        var target = Object.assign({}, $scope.names.fields);
                        delete target['Ring to Phone Number'];
                        $scope.ruleDropDown[1] = {
                            0: {
                                "fields": Object.keys(target)
                            }
                        };
                        $scope.addCallAction.email[1] = [];
                        $scope.addCallAction.remainingText[1] = 1024 + " characters are remaining";
                        $scope.addCallAction.rule[1] = {
                            0: {
                                "fields": "",
                                "operators": "",
                                "enum": "",
                                "join_type": ""
                            }
                        };
                    }

                });
            }
        };

        $scope.loadCallActions = function(org_unit_id) {
            $scope.addNewStep = true;
            if ($scope.promptAudio !== undefined)
                $scope.promptAudio.pause();
            if ($scope.ivrAudio !== undefined)
                $scope.ivrAudio.pause();
            if ($scope.whisperAudio !== undefined)
                $scope.whisperAudio.pause();

            $scope.showCallActions = true;
            var string = "";
            var addedAction = {};
            var operator = "";
            $scope.callActions = [];
            $scope.callActions.push({
                "id": 1
            });
            $scope.addCallAction = {};
            $scope.addCallAction.cfname = "Test";
            $scope.addCallAction.rule = {};
            $scope.addCallAction.action_id = {};
            $scope.addCallAction.actionOptions = {};
            $scope.addCallAction.email = {};
            $scope.addCallAction.phone = {};
            $scope.addCallAction.tagList = {};
            $scope.addCallAction.postEvent = {};
            $scope.addCallAction.webhook = {};
            $scope.addCallAction.sendCallDetails = {};
            $scope.addCallAction.callbackFlag = {};
            $scope.addCallAction.callActionFormSubmitted = {};
            $scope.addCallAction.remainingText = {};
            $scope.callActionTaggingOptions = [];
            $scope.customsources = {};
            $scope.callActionWebhookOptions = [];
            $scope.ruleDropDown = {};
            // $scope.addCallAction.provisioned_route_id = passedPnumber.id;
            //$scope.addCallAction.phoneid = passedPnumber.phoneid;
            $scope.callActionLoaded = false;
            // Load webhooks


            // OldOrgUnitWebService.getcustomsource($scope.currentOUId).then(function(result) {
            //     var customsourcedata = result.data.json;
            //     _.each(customsourcedata, function(data) {
            //         if ($scope.customsources[data.custom_source_type] === undefined) {
            //             $scope.customsources[data.custom_source_type] = [];
            //         }
            //         $scope.customsources[data.custom_source_type].push({
            //             id: data.custom_source_id,
            //             name: data.custom_source_name
            //         });
            //     });
            // });


            OldOrgUnitWebService.getWebhooks($rootScope.currentOUId).then(function(result) {
                if (result.data.err === null || result.data.err === '') {
                    var webhookArr = [];
                    for (var i = 0; i < result.data.json.length; i++) {
                        if (result.data.json[i].webhook_status === 'active') {
                            webhookArr.push(result.data.json[i]);
                        }
                    }
                    $scope.callActionWebhookOptions = webhookArr;
                }
            });

            TagWebService.getTags().then(function(result) {
                console.log('tags:', result);
                if (result.data.err === '') {
                    $scope.callActionTaggingOptionsWatch = false;
                    $scope.callActionTaggingOptions = result.data.json;

                    for (var i = 0; i < result.data.json.length; i++) {
                        if (result.data.json[i].tag_name === 'callback')
                            $scope.callbackid = result.data.json[i].tag_id;
                    }
                    if ($scope.callbackid < 0) {
                        var tag = {
                            "tag": {
                                "tag_name": 'callback',
                                "org_unit_id": $rootScope.currentOUId

                            }

                        };
                        CampaignWebService.createTag(tag).then(function(result) {
                            console.log(result);

                        });
                    }
                }
            });

            $scope.gaSetting = true;
            CampaignWebService.getAnalytics().then(function(result) {
                if (result.data.err === '' && result.data.json.length > 0) {
                    if (result.data.json[0].all_routes || result.data.json[0].analytic_status === 'inactive') {

                        $scope.gaSetting = false;
                    }
                }
            });

            $scope.dcSetting = false;
            CampaignWebService.callActionDC($rootScope.currentOUId).then(function(result) {
                if (result.data.result === 'success') {
                    if (result.data.json.dc_enabled) {
                        console.log('Setting dcSetting to true');
                        $scope.doubleclick_id = result.data.json.doubleclick_id;
                        $scope.dcSetting = true;
                    }
                }
            });
            // var result = [{"phone_number":"8019964134","action_order":1, "action_id":1,"rules":[{"field_reference":"repeat_call","operator":"=","value":"false","join_type":""}],"action":"sms_alert","action_target":"magarwal516@gmail.com"},{"phone_number":"8019964134","action_order":2, "action_id":2,"rules":[{"field_reference":"data[:disposition]","operator":"=","value":"NO ANSWER","join_type":""}],"action":"email_alert"}]

        };

        $scope.select2OptionsCS1 = {
            formatNoMatches: function(term) {
                $scope.formatNoMatchesType = "CS1";
                console.log("Term: " + term);
                var message = '<a ng-click="addCustomSource()">Add Custom source:"' + term + '"</a>';
                if (!$scope.$$phase) {
                    $scope.$apply(function() {
                        $scope.noResultsTag = term;
                    });
                }
                return message;
            }
        };

        $scope.select2OptionsCS2 = {
            formatNoMatches: function(term) {
                $scope.formatNoMatchesType = "CS2";
                var message = '<a ng-click="addCustomSource()">Add Custom source:"' + term + '"</a>';
                if (!$scope.$$phase) {
                    $scope.$apply(function() {
                        $scope.noResultsTag = term;
                    });
                }
                return message;
            }
        };

        $scope.select2OptionsCS3 = {
            formatNoMatches: function(term) {
                $scope.formatNoMatchesType = "CS3";
                console.log("Term: " + term);
                var message = '<a ng-click="addCustomSource()">Add Custom source:"' + term + '"</a>';
                if (!$scope.$$phase) {
                    $scope.$apply(function() {
                        $scope.noResultsTag = term;
                    });
                }
                return message;
            }
        };

        $scope.select2OptionsCS4 = {
            formatNoMatches: function(term) {
                $scope.formatNoMatchesType = "CS4";
                console.log("Term: " + term);
                var message = '<a ng-click="addCustomSource()">Add Custom source:"' + term + '"</a>';
                if (!$scope.$$phase) {
                    $scope.$apply(function() {
                        $scope.noResultsTag = term;
                    });
                }
                return message;
            }
        };

        $scope.select2OptionsCS5 = {
            formatNoMatches: function(term) {
                $scope.formatNoMatchesType = "CS5";
                console.log("Term: " + term);
                var message = '<a ng-click="addCustomSource()">Add Custom source:"' + term + '"</a>';
                if (!$scope.$$phase) {
                    $scope.$apply(function() {
                        $scope.noResultsTag = term;
                    });
                }
                return message;
            }
        };


        // $scope.addCustomSource = function() {
        //     var customsource = {
        //         customSource: {
        //             custom_source_name: $scope.noResultsTag,
        //             org_unit_id: $scope.currentOUId,
        //             custom_source_type: $scope.formatNoMatchesType
        //         }
        //     };

        //     OldOrgUnitWebService.customSource(customsource).then(function(result) {
        //         var dataSet = result.data.json;
        //         if (result.data.err === '') {
        //             pinesNotifications.notify({
        //                 title: 'Default Tracking Number Settings',
        //                 text: 'Successfully Updated Custom Source',
        //                 type: 'success'
        //             });
        //             if ($scope.customsources[$scope.formatNoMatchesType] === undefined)
        //                 $scope.customsources[$scope.formatNoMatchesType] = [];
        //             $scope.customsources[$scope.formatNoMatchesType].push({
        //                 id: result.data.json.custom_source_id,
        //                 name: $scope.noResultsTag
        //             });
        //             //$scope.customsource.push();

        //         } else {
        //             pinesNotifications.notify({
        //                 title: 'Update custom source',
        //                 text: result.data.err,
        //                 type: 'error'
        //             });
        //         }
        //         return;
        //     });
        // };

        $scope.saveDefaultCallFlowSetting = function() {
            // $scope.ringtoErrorMsg = false;
            angular.element("#rinterval").removeClass("ng-invalid ng-dirty");
            angular.element("#rinterval").addClass("ng-valid");

            angular.element("#ringtonumber").removeClass("ng-invalid ng-dirty");
            angular.element("#ringtonumber").addClass("ng-valid");
            OldOrgUnitWebService.getDefaultCustomParams($rootScope.currentOUId)
                .then(function(result) {
                    if (result.data.status === "success") {
                        $scope.custom_params = result.data.json[0].custom_params;
                        console.log("Custom Param Source", $scope.custom_params);
                    }
                });
            var customsourceIds = [];
            var message, whisperMessage, errorMsg = false,
                voicePromptURL = '',
                whisperPromptURL = '',
                voicepromptId = null,
                whisperId = null,
                promptMessageName = '',
                whisperMessageName = '';

            if ($scope.TTSSelected) {
                message = $scope.voicePromptTTSText;
            } else {
                var audio = $filter('filter')($scope.prompts, function (d) {return d.id ===  $scope.voicePromptId;})[0];
                message = "file://" + audio.filename;
                promptMessageName = audio.name;
                voicePromptURL = audio.url;
                voicepromptId = $scope.voicePromptId;
            }

            if ($scope.TTSWhisperSelected) {
                whisperMessage = $scope.whisperTTSText;
            } else {
                var audio = $filter('filter')($scope.whispers, function (d) {return d.id ===  $scope.whisperId;})[0];
                whisperMessage = "file://" + audio.filename;
                whisperMessageName = audio.name;
                whisperPromptURL = audio.url;
                whisperId = $scope.whisperId;
            }
            whisperMessage = whisperMessage === undefined ? "" : whisperMessage;
            _.each(customsourceArray, function(cs) {
                // console.log($scope[cs]);
                if ($scope[cs] !== null && $scope[cs].length > 0) {
                    customsourceIds.push(parseInt($scope[cs]));
                }
            });

            //Split dni referrer and type
            var temp = $scope.referrer.split("|");
            $scope.tempReferrer = temp[0];
            $scope.referrer_type = temp[1];
            if (!$scope.referrer_type) $scope.referrer_type = null;
            var saveData = {
                callFlowData: {
                    org_unit_id: $scope.currentOUId,
                    recordcall: $scope.recordCall,
                    play_voice_prompt: $scope.voicePrompt1,
                    play_whisper_message: $scope.whisperPrompt1,
                    prompt_message: message,
                    whisper_message: whisperMessage,
                    play_disclaimer: $scope.playDisclaimer,
                    repeat_interval_call: $scope.rinterval,
                    voice_prompt_url: voicePromptURL,
                    whisper_message_url: whisperPromptURL,
                    whisper_id: whisperId,
                    voice_prompt_id: voicepromptId,
                    whisper_message_name: whisperMessageName,
                    prompt_message_name: promptMessageName,
                },
                dniSettingData: {
                    "org_unit_id": $scope.currentOUId,
                    "destination_url": $scope.destination_url,
                    "dni_type": $scope.dni_type,
                    "dni_element": $scope.dni_element,
                    "referrer": $scope.tempReferrer,
                    "referrer_type": $scope.referrer_type,
                    "ttl": $scope.dni_ttl,
                    "custom_params": $scope.custom_params
                }
            };

            console.log("saveData=", saveData.dniSettingData.custom_params);
            if ($scope.ringtoNum) {
                saveData.callFlowData.ringto = UserWebService.unMaskData($scope.ringtoNum.toString());
            }
            console.log("saveData.callFlowData.ringto", saveData.callFlowData.ringto)

            if (saveData.callFlowData.repeat_interval_call !== undefined && (saveData.callFlowData.repeat_interval_call > 8760 || saveData.callFlowData.repeat_interval_call === 0)) {
                errorMsg = true;
                angular.element("#rinterval").addClass("ng-invalid ng-dirty");
                angular.element("#rinterval").removeClass("ng-valid");
                pinesNotifications.notify({
                    title: 'Tracking Number Settings',
                    text: "Repeat Interval is invalid",
                    type: 'error'
                });
            }

            if (saveData.callFlowData.ringto === undefined) {
                errorMsg = false;
            } else {
                if (saveData.callFlowData.ringto.length <= 9) {
                    errorMsg = true;
                    // $scope.ringtoErrorMsg = true;
                    angular.element("#ringtonumber").addClass("ng-invalid ng-dirty");
                    angular.element("#ringtonumber").removeClass("ng-valid");
                    pinesNotifications.notify({
                        title: 'Tracking Number Settings',
                        text: "Ring-to Phone Number is invalid",
                        type: 'error'
                    });
                }
            }


            if (customsourceIds.length > 0) {
                saveData.customSourceData = { ids: customsourceIds };
            }
            //Create default call flow setting

            if ($scope.voicePrompt1 && !message) {
                errorMsg = true;
                pinesNotifications.notify({
                    title: 'Tracking Number Settings',
                    text: "Voice Prompt field is required",
                    type: 'error'
                });
            }

            if ($scope.whisperPrompt1 && !whisperMessage) {
                errorMsg = true;
                pinesNotifications.notify({
                    title: 'Tracking Number Settings',
                    text: "Whisper Message field is required",
                    type: 'error'
                });
            }
            var errorsArrHash = OldOrgUnitWebService.validateDniData(saveData.dniSettingData, $scope.showReferrerTextBox);
            if (errorsArrHash.arrRequired.length) {
                $scope.showSaveButton();
                pinesNotifications.notify({
                    title: 'Default Tracking Number Settings',
                    text: '\'' + _.uniq(errorsArrHash.arrRequired).join(','),
                    type: 'error'
                });
                return;
            } else if (errorsArrHash.arrInvalidMessage.length) {
                $scope.showSaveButton();
                pinesNotifications.notify({
                    title: 'Default Tracking Number Settings',
                    text: '\'' + _.uniq(errorsArrHash.arrInvalidMessage).join(','),
                    type: 'error'
                });
                return;
            } else {
                if (!errorMsg) {
                    OldOrgUnitWebService.defaultCreateCallFlow(saveData)
                        .then(function(result) {
                            $scope.custom_params = saveData.dniSettingData.custom_params;
                            if (result.data.result === 'error') {
                                pinesNotifications.notify({
                                    title: 'Default Tracking Number Settings',
                                    text: result.data.err,
                                    type: 'error'
                                });
                            } else {
                                pinesNotifications.notify({
                                    title: 'Default Tracking Number Settings',
                                    text: 'Successfully Saved The Tracking Number Settings',
                                    type: 'success'

                                });
                            }

                        });
                }
            }
        };
        $scope.openTrackingNumberSection = function(open) {
            var dnielement = '';
            $scope.random6DigitNumber = Math.floor(Math.random() * 900000 + 100000);
            console.log("RandomNumber: ", $scope.random6DigitNumber);
            if (open) {

                OldOrgUnitWebService.getCallFlow($rootScope.currentOUId).then(function(result) {
                    if (result.data.status === 'success') {
                        if (result.data.json.callFlowData.length > 0) {
                            var val = result.data.json.callFlowData[0];
                            var message = result.data.json.callFlowData[0].play_voice_prompt_first_text;
                            var substring = message.substring(0, 7);
                            if (substring == "file://") {
                                $scope.TTSSelected = false;
                                $scope.hasValidVoiceURL = true;
                                $scope.voicePromptText = val.prompt_message_name;
                                $scope.voiceURL = val.voice_prompt_url;
                                $scope.voicePromptId = val.voice_prompt_id;
                            } else {
                                $scope.TTSSelected = true;
                                $scope.voicePromptTTSText = message;
                            }


                            var whisperMessage = result.data.json.callFlowData[0].play_whisper_message_text;
                            var whisperSubstring = whisperMessage.substring(0, 7);
                            if (whisperSubstring == "file://") {
                                $scope.TTSWhisperSelected = false;
                                $scope.whisperText = val.whisper_message_name;
                                $scope.whisperURL = val.whisper_message_url;
                                $scope.hasValidWhisperURL = true;
                                $scope.whisperId = val.whisper_id;
                            } else {
                                $scope.TTSWhisperSelected = true;
                                $scope.whisperTTSText = whisperMessage;
                            }

                            $scope.recordCall = result.data.json.callFlowData[0].record_call;
                            $scope.voicePrompt1 = result.data.json.callFlowData[0].play_voice_prompt_first;
                            $scope.whisperPrompt1 = result.data.json.callFlowData[0].play_whisper_message;
                            // $scope.voicePromptTTSText = result.data.json.callFlowData[0].play_voice_prompt_first_text;
                            // $scope.whisperTTSText = result.data.json.callFlowData[0].play_whisper_message_text;
                            $scope.ringtoNum = result.data.json.callFlowData[0].ring_to_number;
                            $scope.playDisclaimer = result.data.json.callFlowData[0].play_disclaimer;
                            $scope.rinterval = result.data.json.callFlowData[0].repeat_interval_call;
                        }


                        if (result.data.json.customSourceData.length > 0) {
                            _.each(result.data.json.customSourceData, function(cs) {
                                $scope[cs.custom_source_type] = cs.custom_source_id.toString();
                            });
                        }

                        console.log(result.data.json);
                        if (result.data.json.dniSettingData.length > 0) {

                            var temp_dni_referrer = result.data.json.dniSettingData[0].referrer;
                            if (result.data.json.dniSettingData[0].referrer_type) temp_dni_referrer += "|" + result.data.json.dniSettingData[0].referrer_type;

                            var found = $filter('filter')($scope.dniReferrer, temp_dni_referrer, true);
                            if (found.length < 1) $scope.dniReferrer.push({ value: temp_dni_referrer, text: result.data.json.dniSettingData[0].referrer });


                            var temp_referrer = result.data.json.dniSettingData[0].referrer;
                            if (result.data.json.dniSettingData[0].referrer_type)
                                temp_referrer += "|" + result.data.json.dniSettingData[0].referrer_type;
                            $scope.dni_section = false;
                            $scope.dniSettingPresent = true;
                            $scope.destination_url = result.data.json.dniSettingData[0].destination_url;
                            $scope.dni_type = result.data.json.dniSettingData[0].dni_type;
                            $scope.dni_element = result.data.json.dniSettingData[0].dni_element;
                            $scope.referrer = temp_referrer;
                            $scope.referrer_type = result.data.json.dniSettingData[0].referrer_type;
                            $scope.dni_ttl = result.data.json.dniSettingData[0].ttl;
                            $scope.custom_params = result.data.json.dniSettingData[0].custom_params;
                            //$scope.showReferrerTextBox = false;
                        } else {
                            console.log($scope.dni_element);
                            console.log("RandomNumber: ", $scope.random6DigitNumber);
                            if ($scope.random6DigitNumber !== $scope.lastRandom) {
                                dnielement = $scope.dni_element;
                                console.log(dnielement);
                                if (dnielement === 'CVZ')
                                    dnielement += "_" + $scope.random6DigitNumber;
                            }
                            $scope.dni_element = dnielement;
                            console.log("Dni Element: ", $scope.dni_element);
                            $scope.lastRandom = $scope.random6DigitNumber;
                            console.log("Last Random: ", $scope.lastRandom);

                        }
                    }
                });
            }
        };
        //---new code
        $scope.openCustomeSourceSection = function(open) {
            if (open) {
                OldOrgUnitWebService.getcustomsource($scope.currentOUId).then(function(result) {
                    var customsourcedata = result.data.json;
                    console.log("customSourceData==", customsourcedata)
                    for (var data in customsourcedata) {
                        if (customsourcedata[data].org_unit_id == $scope.currentOUId) {
                            customsourcedata[data].disabled = false;
                        } else {
                            customsourcedata[data].disabled = true;
                        }
                    }
                    customsourcedata = _.groupBy(customsourcedata, function(student) { return student.custom_source_type })
                    console.log("customSourceData== CS1--", customsourcedata)
                    $scope.CS1Options = customsourcedata.CS1
                    $scope.CS2Options = customsourcedata.CS2
                    $scope.CS3Options = customsourcedata.CS3
                    $scope.CS4Options = customsourcedata.CS4
                    $scope.CS5Options = customsourcedata.CS5
                });
            }
        }
        $scope.multipleDelete = function() {

            console.log("inside multipleDelete custom_source_id")

            console.log("$scope.customSourceModel", $scope.customSourceModel)
            var deleCustId = _.pluck($scope.customSourceModel, 'id')
            var message = '';
            // message += ($scope.users[indexToRemove].list_ids !== "" ? 'This user is assigned to distribution list. ' : '');
            message += 'Custom Source is associated with a tracking number. Are you sure you want to delete this Custom Source?';
            $bootbox.confirm(message, function(clickedOK) {
                if (clickedOK) {
                    OldOrgUnitWebService.multiDeleteCustomSource({ custom_sources: deleCustId })
                        .then(function(result) {
                            console.log("delete result", result)
                            pinesNotifications.notify({
                                title: 'Default Custom Source Settings',
                                text: 'Successfully deleted the custom source',
                                type: 'success'
                            });
                            OldOrgUnitWebService.getcustomsource($scope.currentOUId).then(function(result) {
                                var customsourcedata = result.data.json;
                                console.log("customSourceData==", customsourcedata)
                                for (var data in customsourcedata) {
                                    if (customsourcedata[data].org_unit_id == $scope.currentOUId) {
                                        customsourcedata[data].disabled = false;
                                    } else {
                                        customsourcedata[data].disabled = true;
                                    }
                                }
                                customsourcedata = _.groupBy(customsourcedata, function(student) { return student.custom_source_type })

                                console.log("customSourceData== CS1--", customsourcedata)
                                $scope.CS1Options = customsourcedata.CS1
                                $scope.CS2Options = customsourcedata.CS2
                                $scope.CS3Options = customsourcedata.CS3
                                $scope.CS4Options = customsourcedata.CS4
                                $scope.CS5Options = customsourcedata.CS5



                                var customsourcedata = result.data.json;
                                console.log("customSourceData==", customsourcedata)
                                customsourcedata = _.groupBy(customsourcedata, function(student) { return student.custom_source_type })
                                console.log("customSourceData== CS1--", customsourcedata)
                                $scope.CS1Options = customsourcedata.CS1
                                $scope.CS2Options = customsourcedata.CS2
                                $scope.CS3Options = customsourcedata.CS3
                                $scope.CS4Options = customsourcedata.CS4
                                $scope.CS5Options = customsourcedata.CS5
                            });
                        })
                    $scope.customSourceModel = [];
                }

            });
        }
        $scope.clearCustomSources = function() {
            //console.log("inside clearCustomSources...");
            $scope.customSourceModel = [];
        }

        _.each(customsourceArray, function(cs) {
            var CsScopevariable = "customSourceMethods" + cs;
            $scope[CsScopevariable] = {
                onAddItem: function(term) {
                    $scope.addCustomSource(term, cs)
                }
            }
        });

        $scope.addCustomSource = function(term, cs) {
            var customsource = {
                customSource: {
                    custom_source_name: term,
                    org_unit_id: $scope.currentOUId,
                    custom_source_type: cs
                }
            };
            OldOrgUnitWebService.customSource(customsource).then(function(result) {
                var dataSet = result.data.json;
                if (result.data.err === '') {
                    pinesNotifications.notify({
                        title: 'Default Custom Source Settings',
                        text: 'Successfully Created Custom Source',
                        type: 'success'
                    });
                    if ($scope.customsources[$scope.formatNoMatchesType] === undefined)
                        $scope.customsources[$scope.formatNoMatchesType] = [];
                    $scope.customsources[$scope.formatNoMatchesType].push({
                        id: result.data.json.custom_source_id,
                        name: $scope.noResultsTag
                    });

                    OldOrgUnitWebService.getcustomsource($scope.currentOUId).then(function(result) {
                        var customsourcedata = result.data.json;
                        console.log("customSourceData==", customsourcedata)
                        for (var data in customsourcedata) {
                            if (customsourcedata[data].org_unit_id == $scope.currentOUId) {
                                customsourcedata[data].disabled = false;
                            } else {
                                customsourcedata[data].disabled = true;
                            }
                        }
                        customsourcedata = _.groupBy(customsourcedata, function(student) { return student.custom_source_type })

                        console.log("customSourceData== CS1--", customsourcedata)
                        $scope.CS1Options = customsourcedata.CS1
                        $scope.CS2Options = customsourcedata.CS2
                        $scope.CS3Options = customsourcedata.CS3
                        $scope.CS4Options = customsourcedata.CS4
                        $scope.CS5Options = customsourcedata.CS5
                    });
                } else {
                    pinesNotifications.notify({
                        title: 'Update custom source',
                        text: result.data.err,
                        type: 'error'
                    });
                }
                return;
            });
        };

        // end of new code

        $scope.resetFeatureSetting = function() {
            $scope.enableConvAna = true;
            $scope.enableSpam = true;
            $scope.shareDni = false;

            if (!$scope.showSpambutton) {
                $scope.enableSpam = false;
            }

            if (!$scope.showCaButton) {
                $scope.enableConvAna = false;
            }

            if ($scope.disable_share_dni || $scope.location_level_ou) {
                $scope.shareDni = false;
            }

            // if ($scope.currentDNI === true && $scope.topLevelOUId !== $scope.currentOUId) {
            //     $scope.shareDni = true;
            // } else {
            //     $scope.shareDni = false;
            // }
        };

        $scope.resetCallFlowSetting = function(argument) {
            $scope.rinterval = 72;
            $scope.CS1 = null;
            $scope.CS2 = null;
            $scope.CS3 = null;
            $scope.CS4 = null;
            $scope.CS5 = null;
            $scope.playDisclaimer = 'before';
            $scope.recordCall = true;
            $scope.voicePrompt1 = false;
            $scope.whisperPrompt1 = false;
            $scope.ringtoNum = null;
            $scope.voicePromptTTSText = '';
            $scope.whisperTTSText = '';
            $scope.TTSSelected = true;
            $scope.TTSWhisperSelected = true;
            $scope.destination_url = '*.*';
            $scope.referrer = '*.*|null';
            console.log("Previous:", $scope.dni_element);
            $scope.dni_element = 'CVZ_' + $scope.random6DigitNumber;
            console.log("Current:", $scope.dni_element);
            $scope.dni_ttl = 'Select';
            $scope.dni_type = '';
            $scope.custom_params = '';
            $scope.showReferrerTextBox = false;


        };
        $scope.loadNextValue = function(oldVal, newVal, callActionIndex, key) {
            if (newVal == "fields") {
                $scope.ruleDropDown[callActionIndex][key][newVal] = Object.keys($scope.names.fields);
            } else if (newVal !== "join_type") {
                $scope.ruleDropDown[callActionIndex][key][newVal] = $scope.names[newVal][$scope.addCallAction.rule[callActionIndex][key][oldVal]];
                if (newVal === "operators") {
                    $scope.addCallAction.rule[callActionIndex][key].operators = "";
                    delete $scope.ruleDropDown[callActionIndex][key].enum;
                    $scope.addCallAction.rule[callActionIndex][key].enum = "";
                }
            }

            if (newVal == "join_type" && angular.isUndefined($scope.ruleDropDown[callActionIndex][parseInt(key) + 1]) && angular.isUndefined($scope.addCallAction.rule[callActionIndex][parseInt(key) + 1])) {
                $scope.ruleDropDown[callActionIndex][parseInt(key) + 1] = {};
                $scope.ruleDropDown[callActionIndex][parseInt(key) + 1].join_type = ["AND", "OR"];
                $scope.addCallAction.rule[callActionIndex][parseInt(key) + 1] = {};
                $scope.addCallAction.rule[callActionIndex][parseInt(key) + 1].join_type = "";
            }
        };

        $scope.removeRule = function(key, callActionIndex) {
            var lastRule;
            var keys = Object.keys($scope.addCallAction.rule[callActionIndex]).map(function(key) {
                return key;
            });
            if (keys.indexOf(key) === keys.length - 1) {
                lastRule = true;
            } else {
                lastRule = false;
            }

            $scope.addCallAction.callActionFormSubmitted[callActionIndex] = false;
            delete $scope.ruleDropDown[callActionIndex][key];
            delete $scope.addCallAction.rule[callActionIndex][key];

            var ruleDropDownKeys = Object.keys($scope.ruleDropDown[callActionIndex]).map(function(key) {
                return key;
            });

            var rulesKeys = Object.keys($scope.ruleDropDown[callActionIndex][ruleDropDownKeys[0]]).map(function(key) {
                return key;
            });

            if (rulesKeys[0] === "join_type") {
                $scope.addCallAction.rule[callActionIndex][ruleDropDownKeys[0]].join_type = "";
                delete $scope.ruleDropDown[callActionIndex][ruleDropDownKeys[0]].join_type;

                if ($scope.ruleDropDown[callActionIndex][ruleDropDownKeys[0]].fields === undefined) {
                    var target = Object.assign({}, $scope.names.fields);
                    delete target['Ring to Phone Number'];
                    $scope.ruleDropDown[callActionIndex] = {
                        0: {
                            "fields": Object.keys(target)
                        }
                    };
                    $scope.addCallAction.rule[callActionIndex] = {
                        0: {
                            "fields": "",
                            "operators": "",
                            "enum": "",
                            "join_type": ""
                        }
                    };
                }
            } else if ($scope.addCallAction.rule[callActionIndex][ruleDropDownKeys[0]].join_type !== "") {
                $scope.addCallAction.rule[callActionIndex][ruleDropDownKeys[0]].join_type = "";
                delete $scope.ruleDropDown[callActionIndex][ruleDropDownKeys[0]].join_type;
            }

            if (lastRule) {
                $scope.addCallAction.rule[callActionIndex][key] = {};
                $scope.ruleDropDown[callActionIndex][key] = {};
                $scope.addCallAction.rule[callActionIndex][key].join_type = "";
                $scope.ruleDropDown[callActionIndex][key].join_type = ["AND", "OR"];
            }
        };
        $scope.select2Options = function(actionId) {
            var options = {
                formatNoMatches: function(term) {
                    $scope.actionId = actionId;
                    var message = "";
                    if (term !== '') {
                        message = '<a ng-click="addTag(term)">Add tag:"' + term.trim() + '"</a>';
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
                    query.term = query.term.trim();
                    if (query.term.length > 0) {
                        for (var x in results) {
                            //console.log('Term:'+query.term+'--Result:'+results[x].text);
                            if (query.term.trim() == results[x].text.trim()) {
                                found = true;
                                break;
                            }
                        }
                        //add option to top of the list of results
                        if (!found) $('.select2-results').prepend('<li class="select2-no-results"><a ng-href="#" ng-click="addTag(term);">Add tag:"' + query.term + '"</a></li>');
                        //compile the new html in angular to get it to evaluate the new ng-click
                        if (!$scope.$$phase) {
                            $scope.$apply(function() {
                                $scope.noResultsTag = query.term;
                            });
                        }
                    }
                    //return list unchanged
                    return results;
                },
                simple_tags: true,
                allowClear: true
            };
            return options;
        };

        $scope.addTag = function(term) {
            var duplicateTags = _.where($scope.callActionTaggingOptions, { tag_name: (this.noResultsTag).trim() });
            if (duplicateTags.length > 0) {
                pinesNotifications.notify({
                    title: 'Update Tags',
                    text: 'This Tag already exists',
                    type: 'error'
                });
                return false;
            }
            var tag = {
                "tag": {
                    "tag_name": $scope.noResultsTag.trim(),
                    "org_unit_id": $rootScope.currentOUId
                }
            };
            var noResultsLink = $('.select2-drop');
            noResultsLink.hide();
            CampaignWebService.createTag(tag).then(function(result) {
                $scope.callActionTaggingOptionsWatch = true;
                if (result.data.err === '') {
                    pinesNotifications.notify({
                        title: 'Create Tags',
                        text: 'Successfully added the tag',
                        type: 'success'
                    });
                    $scope.callActionTaggingOptions.push({
                        tag_id: result.data.json.tag_id,
                        tag_name: $scope.noResultsTag.trim(),
                        org_unit_id: $rootScope.currentOUId
                    });
                }
            });
        };

        $scope.$watch('callActionTaggingOptions', function(newVal, oldVal) {
            if ($scope.callActionTaggingOptionsWatch)
                $timeout(function() {

                    if (!angular.isUndefined($scope.addCallAction.tagList[parseInt($scope.actionId)])) {
                        $scope.addCallAction.tagList[parseInt($scope.actionId)].push($scope.callActionTaggingOptions[$scope.callActionTaggingOptions.length - 1].tag_id.toString());
                        $scope.addCallAction.callActionFormSubmitted[parseInt($scope.actionId)] = false;
                        var noResultsLink = $('.select2-drop');
                        noResultsLink.hide();
                    } else {
                        $scope.addCallAction.tagList[parseInt($scope.actionId)] = [];
                        $scope.addCallAction.tagList[parseInt($scope.actionId)].push($scope.callActionTaggingOptions[$scope.callActionTaggingOptions.length - 1].tag_id.toString());
                        $scope.addCallAction.callActionFormSubmitted[parseInt($scope.actionId)] = false;
                        var noResultsLink = $('.select2-drop');
                        noResultsLink.hide();
                    }

                });
        }, true);

        $scope.countElement = function(id, $event) {
            var sNextActionEmail = [];
            var sNextAction = $scope.addCallAction.email[id];
            if (sNextAction !== undefined) {
                for (var i = 0; i < sNextAction.length; i++) {
                    sNextActionEmail.push(sNextAction[i].text);
                }

                var emailText = sNextActionEmail.join(",");
                emailText = emailText.replace(/,/g, '').replace(/ /g, '');
                $scope.addCallAction.remainingText[id] = (1024 - emailText.length) + " characters are remaining";
                $scope.addCallAction.callActionFormSubmitted[id] = false;
            }
        };

        $scope.saveCallAction = function(callActionIndex, addNewRow) {
            //var objSaveCallAction = [];
            var arrInvalid = [];
            var arrRequired = [];
            var sNextAction = {};
            var count = 1;
            var ruleCount = 1;
            $scope.errorEmail = '';
            $scope.invalidNumber = false;
            $scope.errors = {};
            $scope.errors[callActionIndex] = {};
            $scope.invalidEmailIds = [];
            callActionIndex = parseInt(callActionIndex);
            var addedAction = {
                id: (callActionIndex + 1)
            };
            switch ($scope.addCallAction.actionOptions[callActionIndex]) {
                case 'email_alert':
                    var sNextActionEmail = [];
                    sNextAction = $scope.addCallAction.email[callActionIndex];
                    if (sNextAction === undefined)
                        sNextAction = [];
                    for (var i = 0; i < sNextAction.length; i++) {
                        // var EMAIL_REGEXP = /^[_a-zA-Z0-9]*['a-zA-Z0-9]*[-a-zA-Z0-9]*[\.a-zA-Z0-9]*@[a-zA-Z0-9-]+(\.a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,4})*(\.[a-zA-Z]{2,4})/;
                        // var EMAIL_REGEXP = /^[\w-]+(\.[\w-]+)*@([a-z0-9-]+(\.[a-z0-9-]+)*?\.[a-z]{2,6}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/;

                        // new added which is taken from github
                        var EMAIL_REGEXP = /^[_a-zA-Z0-9]*['a-zA-Z0-9]*[-a-zA-Z0-9]*[\.a-zA-Z0-9]*@[a-zA-Z0-9-]+(\.a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,4})*(\.[a-zA-Z]{2,4})/;

                        if (!angular.isUndefined(sNextAction[i].text) && sNextAction[i].text.length && !EMAIL_REGEXP.test(sNextAction[i].text.trim())) {
                            arrInvalid.push(sNextAction[i].text);
                            $scope.invalidEmailIds.push(sNextAction[i].text);
                        }
                        sNextActionEmail.push(sNextAction[i].text.trim());
                    }

                    var emailText = _.uniq(sNextActionEmail).join(",");
                    emailText = emailText.replace(/,/g, '');
                    if (emailText.length > 1024) {
                        $scope.errorEmail = "No of characters should not be greater than 1024";
                    }

                    sNextAction = _.uniq(sNextActionEmail);
                    $scope.addCallAction.email[callActionIndex] = [];
                    var randomNumber = Math.floor(1000 + Math.random() * 9000);
                    for (var j = 0; j < sNextAction.length; j++) {
                        var tempHash = {
                            id: j + 1 + randomNumber,
                            text: sNextAction[j]
                        };
                        $scope.addCallAction.email[callActionIndex].push(tempHash);
                    }
                    // var emailText = _.uniq(sNextActionEmail).join(",");
                    // emailText = emailText.replace(/,/g,'');

                    $scope.addCallAction.remainingText[callActionIndex] = (1024 - emailText.length) + " characters are remaining";

                    break;
                case 'sms_alert':
                    var val = angular.copy($scope.addCallAction.phone[callActionIndex]);
                    if (val) {
                        var newVal = val.replace(/[()_\-\s]/gi, '');
                        if (newVal.length != 10) {
                            $scope.invalidNumber = true;
                            arrInvalid.push('Phone Number');
                        }
                    }
                    sNextAction = $scope.addCallAction.phone[callActionIndex];
                    break;
                case 'tag_call':
                    sNextAction = $scope.addCallAction.tagList[callActionIndex];
                    break;
                case 'post_event':
                    sNextAction = $scope.addCallAction.postEvent[callActionIndex];
                    break;
                case 'webhook':
                    sNextAction = $scope.addCallAction.webhook[callActionIndex];
                    break;
                case 'post_detail':
                    sNextAction = $scope.addCallAction.sendCallDetails[callActionIndex];
                    break;
                case 'callback':
                    sNextAction = $scope.callbackid.toString();
                    break;
                case 'doubleclick':
                    sNextAction = $scope.doubleclick_id !== undefined ? $scope.doubleclick_id : null;
                    break;
                case 'analytic':
                    sNextAction = null;
                    break;


            }

            if (angular.isArray(sNextAction)) {
                sNextAction = sNextAction.join(', ');
            }
            if (isEmpty($scope.addCallAction.rule[callActionIndex])) {
                if (ruleCount === 1) {
                    arrRequired.push("Rule");
                    ruleCount = ruleCount + 1;
                }
            }

            _.each($scope.addCallAction.rule[callActionIndex], function(v, k) {
                if ((!isEmpty(v) && v.fields !== undefined) || (!isEmpty(v) && !isEmpty(v.join_type))) {
                    if (isEmpty(v.fields) || isEmpty(v.enum) || isEmpty(v.operators)) {
                        if (isEmpty(v.enum)) {
                            $scope.errors[callActionIndex][k] = true;
                        }
                        if (ruleCount === 1) {
                            arrRequired.push("Rule");
                            ruleCount = ruleCount + 1;
                        }
                    }

                    if (!isEmpty(v.enum)) {
                        if (v.fields == 'referring source' && (v.operators == 'contains' || v.operators == 'does not contain')) {
                            if (v.enum.startsWith("*.") || v.enum.endsWith(".*")) {
                                if (count === 1) {
                                    arrInvalid.push("WildCard only Support With is/is not for referring source.");
                                    count = count + 1;
                                }
                                $scope.errors[callActionIndex][k] = true;
                            }
                        }
                    }


                    if (!isEmpty(v.enum)) {
                        if ((v.fields == 'duration' && !checkNumber(v.enum)) || (v.fields == 'caller id' && (!checkNumber(v.enum) || v.enum.length > 10))) {
                            if (count === 1) {
                                arrInvalid.push("Rule Value");
                                count = count + 1;
                            }
                            $scope.errors[callActionIndex][k] = true;
                        }
                    }
                }
            });

            if (angular.isArray(sNextAction)) {
                if (isEmpty(sNextAction)) {
                    arrRequired.push("Action");
                }
            } else if (sNextAction === '' || sNextAction === undefined) {
                arrRequired.push("Action");
            }

            if ($scope.addCallAction.actionOptions[callActionIndex] == "action0") {
                arrRequired.push("Action Target");
            }

            if (arrRequired.length || arrInvalid.length || $scope.errorEmail.length) {
                var messageText;

                if (arrRequired.length) {
                    messageText = 'Field Is Required.';
                    if (arrRequired.length > 1) {
                        messageText = 'Fields Are Required.';
                    }
                    pinesNotifications.notify({
                        title: 'Default Call Action Settings',
                        text: '\'' + arrRequired.join(', ') + '\' ' + messageText,
                        type: 'error'
                    });
                }

                if ($scope.errorEmail.length > 0) {
                    pinesNotifications.notify({
                        title: 'Default Call Action Settings',
                        text: $scope.errorEmail,
                        type: 'error'
                    });
                }

                if ($scope.invalidEmailIds.length > 0) {
                    messageText = 'Invalid email address entered. Please fix highlighted errors and re-save';
                    pinesNotifications.notify({
                        title: 'Default Call Action Settings',
                        text: '\'' + $scope.invalidEmailIds.join(', ') + '\' ' + messageText,
                        type: 'error'
                    });
                } else if (arrInvalid.length) {
                    messageText = 'Field Is Invalid.';
                    if (arrInvalid.length > 1) {
                        messageText = 'Fields Are Invalid.';
                    }
                    pinesNotifications.notify({
                        title: 'Default Call Action Settings',
                        text: '\'' + arrInvalid.join(', ') + '\' ' + messageText,
                        type: 'error'
                    });
                }


                $(".invalidTag").closest('li').addClass('invalidList');

                arrInvalid = [];
                arrRequired = [];

                return false;
            } else {
                var objSaveCallAction = {
                    "provisioned_route_id": $scope.addCallAction.provisioned_route_id,
                    "default_action_id": $scope.addCallAction.action_id[callActionIndex],
                    "action_order": callActionIndex,
                    "rules": joinCallAction($scope.addCallAction.rule[callActionIndex]),
                    "action": $scope.addCallAction.actionOptions[callActionIndex],
                    "action_target": sNextAction,
                    "org_unit_id": $scope.currentOUId
                };
                $scope.addNewStep = false;

                if (objSaveCallAction.default_action_id === undefined) {
                    OldOrgUnitWebService.saveCallActions(objSaveCallAction).then(function(result) {
                        $scope.addNewStep = true;
                        if (result.data.status === 'success') {
                            $scope.addCallAction.callActionFormSubmitted[callActionIndex] = true;
                            pinesNotifications.notify({
                                title: 'Default Call Action Settings',
                                text: 'Successfully Saved Call Action Settings',
                                type: 'success'
                            });
                            $scope.addCallAction.action_id[callActionIndex] = result.data.json.insertId;
                            if (addNewRow) {
                                $scope.callActions.push(addedAction);
                                $scope.addCallAction.actionOptions[addedAction.id] = "action0";
                                var target = Object.assign({}, $scope.names.fields);
                                delete target['Ring to Phone Number'];
                                $scope.ruleDropDown[callActionIndex + 1] = {
                                    0: {
                                        "fields": Object.keys(target)
                                    }
                                };
                                $scope.addCallAction.email[callActionIndex + 1] = [];
                                $scope.addCallAction.rule[callActionIndex + 1] = {
                                    0: {
                                        "fields": "",
                                        "operators": "",
                                        "enum": "",
                                        "join_type": ""
                                    }
                                };
                            }
                        } else {
                            pinesNotifications.notify({
                                title: 'Default Call Action Settings',
                                text: result.data.err.data,
                                type: 'error'
                            });
                        }
                    });
                } else {
                    OldOrgUnitWebService.updateCallActions(objSaveCallAction).then(function(result) {
                        $scope.addNewStep = true;
                        if (result.data.status === 'success') {
                            $scope.addCallAction.callActionFormSubmitted[callActionIndex] = true;
                            pinesNotifications.notify({
                                title: 'Update Call Action Settings',
                                text: 'Successfully Updated Call Action Settings',
                                type: 'success'
                            });

                            if (addNewRow) {
                                $scope.callActions.push(addedAction);
                                $scope.addCallAction.actionOptions[addedAction.id] = "action0";
                                var target = Object.assign({}, $scope.names.fields);
                                delete target['Ring to Phone Number'];
                                $scope.ruleDropDown[callActionIndex + 1] = {
                                    0: {
                                        "fields": Object.keys(target)
                                    }
                                };
                                $scope.addCallAction.rule[callActionIndex + 1] = {
                                    0: {
                                        "fields": "",
                                        "operators": "",
                                        "enum": "",
                                        "join_type": ""
                                    }
                                };
                            }

                        } else {
                            pinesNotifications.notify({
                                title: 'Update Call Action Settings',
                                text: result.data.err.data,
                                type: 'error'
                            });
                        }
                    });
                }
            }
        };

        $http.get('assets/demo/old_call_actions.json').then(function(res) {
            $scope.names = res.data;
            $scope.loadCallActions($scope.currentOUId);
        });


        $scope.tagAdded = function(id, $tag) {
            var currentId = 1;
            if ($scope.addCallAction.email[id] !== undefined) {
                if ($scope.addCallAction.email[id].length > 1) {
                    var previousTagIdx = $scope.addCallAction.email[id].indexOf($tag) - 1;
                    var previousTag = $scope.addCallAction.email[id][previousTagIdx];
                    currentId = previousTag.id + 1;
                }
            }
            $tag.id = currentId;
        };

        $scope.addNewCallAction = function(cActionId) {
            var addedAction;
            cActionId = parseInt(cActionId);
            addedAction = {
                id: (cActionId + 1)
            };

            if (!$scope.addCallAction.callActionFormSubmitted[cActionId]) {
                $scope.saveCallAction(cActionId, true);
            } else {
                $scope.addCallAction.remainingText[cActionId + 1] = 1024 + " characters are remaining";
                $scope.callActions.push(addedAction);
                $scope.addCallAction.actionOptions[cActionId + 1] = "action0";
                var target = Object.assign({}, $scope.names.fields);
                delete target['Ring to Phone Number'];
                $scope.ruleDropDown[cActionId + 1] = {
                    0: {
                        "fields": Object.keys(target)
                    }
                };
                $scope.addCallAction.email[cActionId + 1] = [];
                $scope.addCallAction.rule[cActionId + 1] = {
                    0: {
                        "fields": "",
                        "operators": "",
                        "enum": "",
                        "join_type": ""
                    }
                };
            }
        };
        $scope.addAction = function() {
            var addedAction;
            if ($scope.ivrActions.length >= 10) {
                pinesNotifications.notify({
                    title: 'IVR call flows',
                    text: 'only 10 actions are allowed',
                    type: 'error'
                });
                return;
            } else {
                var idnum;
                if ($scope.ivrActions.length === 9)
                    idnum = 0;
                else
                    idnum = $scope.ivrActions.length + 1;

                addedAction = {
                   action_order: idnum,
                    action: "",
                    value: "",
                    voiceprompt: false,
                    whisper: false,
                    webhook: false,
                    recordCall: true,
                    playDisclaimer: 'before',
                    voicepromptURL: '',
                    voicepromptId: '',
                    name: 'Forward to phone number',
                    ringtonum: ""
                };
                $scope.ivrActions.push(addedAction);
            }
        };
        $scope.changeReferrer = function() {
            if ($scope.referrer === "new") {
                $scope.showReferrerTextBox = true;
                $scope.referrer = '';

            } else if ($scope.referrer === '' || $scope.referrer === undefined) {
                $scope.showReferrerTextBox = false;
                $scope.referrer = '';
            }
        };

        $scope.removeCallAction = function(actionId) {
            var keepLooking = true;
            $.each($scope.callActions, function(index, callAction) {
                if (keepLooking && callAction.id === actionId) {
                    if (!angular.isUndefined($scope.addCallAction.action_id[actionId])) {
                        $bootbox.confirm("Are you sure you want to delete this Call Action?", function(clickedOK) {
                            if (clickedOK) {
                                OldOrgUnitWebService.removecallActions($scope.addCallAction.action_id[actionId], $scope.currentOUId).then(function(result) {
                                    if (result.data.result !== 'error') {
                                        pinesNotifications.notify({
                                            title: 'Default Call Action Settings',
                                            text: 'Successfully Deleted Call Action',
                                            type: 'success'
                                        });
                                        $scope.callActions.splice(index, 1);
                                        deleteCallActionsValue(callAction.id);
                                        keepLooking = false;
                                    } else {
                                        pinesNotifications.notify({
                                            title: 'Default Call Action Settings',
                                            text: 'Error In Deleting Call Action',
                                            type: 'success'
                                        });
                                    }
                                });
                            }
                        });
                    } else {
                        $scope.callActions.splice(index, 1);
                        deleteCallActionsValue(callAction.id);
                        keepLooking = false;
                    }
                }
            });
        };

        function deleteCallActionsValue(callActionIndex) {
            delete $scope.ruleDropDown[callActionIndex.toString()];
            delete $scope.addCallAction.callActionFormSubmitted[callActionIndex.toString()];
            console.log($scope.addCallAction);
            $.each($scope.addCallAction, function(index, action) {
                console.log(index, action)
                if (!angular.isUndefined(action) && !isEmpty(action[(callActionIndex).toString()]) && typeof(action) != "string") {
                    delete action[(callActionIndex).toString()];
                }
            });

            delete $scope.addCallAction.action_id[callActionIndex];
            if ($scope.callActions.length === 0) {
                $scope.callActions = [];
                $scope.callActions.push({
                    "id": 1
                });
                $scope.addCallAction.email[1] = [];
                $scope.addCallAction.actionOptions[1] = "action0";
                $scope.addCallAction.callActionFormSubmitted[1] = false;
                var target = Object.assign({}, $scope.names.fields);
                delete target['Ring to Phone Number'];
                $scope.ruleDropDown[1] = {
                    0: {
                        "fields": Object.keys(target)
                    }
                };
                $scope.addCallAction.rule[1] = {
                    0: {
                        "fields": "",
                        "operators": "",
                        "enum": "",
                        "join_type": ""
                    }
                };
            }
        }

        function findKey(obj, value) {
            var key;

            _.each(obj, function(v, k) {
                if (v === value) {
                    key = k;
                }
            });

            return key;
        }

        function isEmpty(map) {
            for (var key in map) {
                if (map.hasOwnProperty(key)) {
                    return false;
                }
            }
            return true;
        }

        function checkNumber(value) {
            var NUMBER_REGEXP = /^[0-9]+$/;
            if (!NUMBER_REGEXP.test(value)) {
                return false;
            }
            return true;
        }

        function joinCallAction(actionsArray) {

            var rules = [];
            var join_type = "";
            for (var key in actionsArray) {
                var comparator = "";
                // if(actionsArray[key]["operators"] === "contains" || actionsArray[key]["operators"] === "does not contain"){
                //  comparator = actionsArray[key]["enum"] ;
                // }else if(actionsArray[key]["operators"] === "begins with"){
                //  comparator = actionsArray[key]["enum"];
                // }else if(actionsArray[key]["operators"] === "ends with"){
                //  comparator = actionsArray[key]["enum"] ;
                var operator = "";
                if (actionsArray[key].operators === "contains" || actionsArray[key].operators === "does not contain" ||
                    actionsArray[key].operators === "begins with" || actionsArray[key].operators === "ends with") {
                    operator = actionsArray[key].operators;
                } else {
                    //comparator = actionsArray[key]["enum"]
                    operator = $scope.names.Ct_operators[actionsArray[key].operators];
                }

                join_type = "NONE";
                if (actionsArray[key].join_type.length)
                    join_type = actionsArray[key].join_type;

                if (actionsArray[key].fields)
                    rules.push({
                        "data_field": $scope.names.fields[actionsArray[key].fields],
                        //   "operator"   : $scope.names["Ct_operators"][actionsArray[key]["operators"]],
                        //  "comparator" : comparator,
                        //  "operator"   : operator,
                        "operator": $scope.names.Ct_operators[actionsArray[key].operators],
                        "comparator": actionsArray[key].enum,
                        "join_type": join_type
                    });
            }
            return rules;
        }





        //     OldOrgUnitWebService.getCallFlow($rootScope.currentOUId).then(function(result) {
        //           var callflowdata = result.data.json[0];
        //           if (callflowdata.org_unit_id != undefined) {
        //            $scope.callflowSettingPresent =true;
        //               $scope.recordcall = callflowdata.recordcall;
        //               $scope.play_voice_prompt = callflowdata.play_voice_prompt;
        //               $scope.play_wisper_message = callflowdata.play_wisper_message;
        //               $scope.play_disclaimer = callflowdata.play_disclaimer;
        //               $scope.ringto = callflowdata.ringto;
        //           } else {
        //               pinesNotifications.notify({
        //                   title: 'Call Flow Details',
        //                   text: result.data.err,
        //                   type: 'error'
        //               });
        //           }
        //       });

        //       

        //       OldOrgUnitWebService.getwhisper($rootScope.currentOUId).then(function(result) {
        //           if (result.data.result != 'error') {
        //               $scope.whisperMessages = result.data.json;
        //               if ($scope.whisperMessages) {
        //                   for (var i = 0; i < $scope.whisperMessages.length; i++) {
        //                       $scope.whisperMessages.selectedprompt = false;
        //                   }
        //               }
        //           }
        //       });

        OldOrgUnitWebService.getIndustries().then(function(result) {
            var industryList;
            try {
                industryList = result.data.json;
            } catch (e) {
                industryList = [];
            }

            $scope.industryList = OldOrgUnitWebService.parseIndustries(industryList);
        });


        $scope.user = {
            name: 'awesome user'
        };
        $scope.removeSelectedVoiceAudio = function() {
            // remove the text from the text field
            if ($scope.promptAudio !== undefined)
                $scope.promptAudio.pause();
            $scope.promptAudio = undefined;
            $scope.voiceURL = undefined;
            $scope.voicePromptTTSText = "";
            $scope.TTSSelected = true;
            $scope.hasValidVoiceURL = false;
            //$scope.voicetextChanged = false;
        };

        $scope.showVoiceModal = function(size) {
                stopAudio();
            var modalInstance = $uibModal.open({
                templateUrl: 'assets/partials/assignPrompt.html',
                    controller: 'oldVoiceModal',
                size: size,
                backdrop: 'static',
                keyboard: false
            });

            modalInstance.result.then(function() {
                    for (var i = 0; i < $rootScope.prompts.length; i++) {
                        if ($rootScope.prompts[i].selectedprompt === true) {
                            $scope.voicePromptText = $rootScope.prompts[i].name;
                            $scope.voicePromptFileName = $rootScope.prompts[i].filename;
                            $scope.voicePromptId = $rootScope.prompts[i].id;
                            $scope.voiceURL = $rootScope.prompts[i].url;
                        $scope.hasValidVoiceURL = true;
                        $scope.TTSSelected = true;
                        $scope.promptAudio = undefined;
                    }
                }
                    $scope.prompts = $rootScope.prompts;
                $scope.TTSSelected = false;
                $scope.hasValidVoiceURL = true;
                $scope.voicePromptTTSText = '';
            }, function() {
                console.log('Modal dismissed at: ' + new Date());
            });

        };


        // Reset fuctionality for Enable CA,Enable DNI,Enable Spamgura
        $scope.showWhisperModal = function(size) {
                stopAudio();
            var modalInstance = $uibModal.open({
                templateUrl: 'assets/partials/assignWhisper.html',
                    controller: 'oldWhisperModal',
                size: size,
                backdrop: 'static',
                keyboard: false
            });

            modalInstance.result.then(function() {
                    for (var i = 0; i < $rootScope.whispers.length; i++) {
                        if ($rootScope.whispers[i].selectedwhisper === true) {
                            $scope.whisperText = $rootScope.whispers[i].name;
                            $scope.whisperFileName = $rootScope.whispers[i].filename;
                            $scope.whisperId = $rootScope.whispers[i].id;
                            $scope.whisperURL = $rootScope.whispers[i].url;
                        $scope.whisperAudio = undefined;
                        $scope.hasValidWhisperURL = true;
                        $scope.TTSWhisperSelected = true;
                    }
                }
                    $scope.whispers = $rootScope.whispers;
                $scope.TTSWhisperSelected = false;
                $scope.hasValidWhisperURL = true;
                $scope.whisperTTSText = '';
            }, function() {
                console.log('Modal dismissed at: ' + new Date());
            });

        };

        $scope.playVoiceAudio = function(url) {

            if ($scope.promptAudio !== undefined && !$scope.promptAudio.paused) {
                $scope.promptAudio.pause();
            } else if ($scope.promptAudio !== undefined && $scope.promptAudio.paused) {
                $scope.promptAudio.play();
            } else {

                if ($scope.voicePromptTTSText !== undefined && $scope.voicePromptTTSText.length > 0) {
                    $scope.promptAudio = new Audio();
                    $scope.onTTS_VP_Request = true;
                    OldOrgUnitWebService.getTTS($scope.voicePromptTTSText).then(function(result) {
                        if (result.data) {
                            var TTSData = result.data.json;
                            var source = "data:audio/mp3;base64," + TTSData;
                            $scope.promptAudio.src = source;
                            if ($scope.promptAudio.paused) {
                                $scope.promptAudio.play();
                            } else {
                                $scope.promptAudio.pause();
                            }
                        }
                        $scope.onTTS_VP_Request = undefined;
                    });

                } else {
                    $scope.promptAudio = new Audio(url);
                    $scope.promptAudio.play();
                }
            }
            //http://s3.amazonaws.com/LogMyCalls/call_recordings/0000000000_2193810696_5555555555_20150303-205023-API~KxjvV.mp3?AWSAccessKeyId=AKIAI437X62OCWJK2EYQ&Expires=1426802444&Signature=1UYFUP77q0cjQkSkIY3tzc1%2F5tg%3D
        };
        $scope.playWhisperAudio = function(url) {



            if ($scope.whisperAudio !== undefined && !$scope.whisperAudio.paused) {
                $scope.whisperAudio.pause();
            } else if ($scope.whisperAudio !== undefined && $scope.whisperAudio.paused) {
                $scope.whisperAudio.play();
            } else {
                if ($scope.whisperTTSText !== undefined && $scope.whisperTTSText.length > 0) {
                    // create the HTML5 audio element
                    $scope.whisperAudio = new Audio();
                    $scope.onTTS_WH_Request = true;
                    // get the TTS data
                    OldOrgUnitWebService.getTTS($scope.whisperTTSText).then(function(result) {
                        if (result.data) {
                            var TTSData = result.data.json;
                            var source = "data:audio/mp3;base64," + TTSData;
                            $scope.whisperAudio.src = source;
                            $scope.whisperAudio.play(); // some no
                        }
                        $scope.onTTS_WH_Request = undefined;
                    });
                } else {
                    $scope.whisperAudio = new Audio(url);
                    $scope.whisperAudio.play();
                }
            }
            //http://s3.amazonaws.com/LogMyCalls/call_recordings/0000000000_2193810696_5555555555_20150303-205023-API~KxjvV.mp3?AWSAccessKeyId=AKIAI437X62OCWJK2EYQ&Expires=1426802444&Signature=1UYFUP77q0cjQkSkIY3tzc1%2F5tg%3D
        };
        $scope.chkSpclChar = function (text, prompt, cb){
            var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|<>\/?]/;
            if(format.test(text)){
                pinesNotifications.notify({
                    title: prompt,
                    text: 'Special characters are not allowed',
                    type: 'error'
                });
                cb(text.replace(format, "")) ;
            }else{
                cb(text) ;
            }
        }
        $scope.voiceTextChange = function() {
            $scope.promptAudio = undefined;
            if ($scope.voicePromptTTSText === undefined || $scope.voicePromptTTSText.length === 0) {
                $scope.hasValidVoiceURL = false;
                $scope.TTSSelected = true;
            } else {
                $scope.chkSpclChar($scope.voicePromptTTSText, 'Voice Prompt', function(t){
                    $scope.voicePromptTTSText = t; 
                    $scope.hasValidVoiceURL = true;
                    $scope.TTSSelected = true;  
                })
            }
        };

        $scope.whisperTextChange = function() {
            console.log("canModify", $scope.canModify);
            console.log("$scope.hasValidWhisperURL", $scope.hasValidWhisperURL);
            $scope.whisperAudio = undefined;
            if ($scope.whisperTTSText === undefined || $scope.whisperTTSText.length === 0) {
                $scope.hasValidWhisperURL = false;
                $scope.TTSWhisperSelected = true;
            } else {
                $scope.chkSpclChar($scope.whisperTTSText, 'Whisper Message', function(t){
                    $scope.whisperTTSText = t;
                    $scope.hasValidWhisperURL = true;
                    $scope.TTSWhisperSelected = true;    
                })
            }
        };


        $scope.audioIsPlaying = function(origin) {
            if (origin != 'whisper' && $scope.whisperAudio !== undefined && !$scope.whisperAudio.paused && !$scope.whisperAudio.ended)
                return true;
            if (origin != 'prompt' && $scope.promptAudio !== undefined && !$scope.promptAudio.paused && !$scope.promptAudio.ended)
                return true;
            if (origin != 'ivr' && $scope.ivrAudio !== undefined && !$scope.ivrAudio.paused && !$scope.ivrAudio.ended)
                return true;
            return false;
        };

        var stopAudio = function() {
            if ($scope.whisperAudio !== undefined) {
                $scope.whisperAudio.pause();
                $scope.whisperAudio = undefined;
            }
            if ($scope.promptAudio !== undefined) {
                $scope.promptAudio.pause();
                $scope.promptAudio = undefined;
            }
            if ($scope.ivrAudio !== undefined) {
                $scope.ivrAudio.pause();
                $scope.ivrAudio = undefined;
            }
        };

        $scope.audioIsDownloading = function() {
            if ($scope.whisperAudio !== undefined && $scope.onTTS_WH_Request !== undefined)
                return true;
            if ($scope.promptAudio !== undefined && $scope.onTTS_VP_Request !== undefined)
                return true;
            if ($scope.ivrAudio !== undefined && $scope.onTTS_IVR_Request !== undefined)
                return true;
            return false;
        };




        $scope.$watch('noResultsTag', function(newVal, oldVal) {
            if (newVal && newVal !== oldVal) {
                $timeout(function() {
                    var noResultsLink = $('.select2-no-results');
                    console.log(noResultsLink.contents());
                    $compile(noResultsLink.contents())($scope);
                });
            }
        }, true);


        $scope.customoptiontemplate = {
            formatNoMatches: function(term) {
                console.log("Term: " + term);
                var message = '<a ng-click="postcallcustom()">Add tag:"' + term + '"</a>';
                if (!$scope.$$phase) {
                    $scope.$apply(function() {
                        $scope.noResultsTag = term;
                    });
                }
                return message;
            }
        };




        $scope.inactive = true;
        $scope.changeStatus = function() {
            $scope.inactive = !$scope.inactive;
        };

        $scope.determineDisabilityDeleteBtn = function() {
            // If we are not on the top level OU
            // AND
            // If user has ReadWriteExecute access for orgunit
            $scope.canDeleteOU = false;
            if ((parseInt($rootScope.currentOUId) !== parseInt($rootScope.topLevelOUId)) &&
                ($rootScope.userAccess.orgunit === 7)) {
                $scope.canDeleteOU = true;
            }
        };

        $scope.determineDisabilityDeleteBtn();

        $scope.deleteThisOU = function() {
            $scope.isDeleteClicked = true;
            var promptWarningStr, res;

            // Make sure user has permission to proceed
            if ($rootScope.userAccess.orgunit !== 7) {
                pinesNotifications.notify({
                    title: "Permissions",
                    text: "You dont have permission to delete a Group", // Err I mean an Org Unit
                    type: "error"
                });

                return;
            }

            // User shouldn't be able to delete the OU if they're viewing the highest OU in tree
            if ($rootScope.currentOUId === $rootScope.highestOUId) {
                pinesNotifications.notify({
                    title: "Permissions",
                    text: "You can't delete a top level Group", // Err I mean an Org Unit
                    type: "error"
                });
                return;
            }

            OldOrgUnitWebService.infoAboutOuAndChildren($rootScope.currentOUId).then(function(result) {
                $scope.isDeleteClicked = false;
                if (result.status === "error") {
                    console.log("error getting info about OU and its children");
                    return;
                }

                // Build message to display out of meta data retrieved
                var promptInfo = result.data.json;
                console.log("Second=======================================", promptInfo);

                promptWarningStr = [
                    "Deleting this Group will delete <br>",
                    "(", promptInfo.userCount, ") Users, <br>",
                    "(", promptInfo.orgUnitCount, ") Groups, <br>",
                    "(", promptInfo.campaignCount, ") Campaigns, <br>",
                    "(", promptInfo.callFlowCount, ") Call Flows, <br>",
                    "(", promptInfo.webhookCount, ") Webhooks, <br>",
                    "(", promptInfo.dniCount, ") Dni Settings, <br>",
                    "(", promptInfo.tagCount, ") Tags, <br>",
                    "(", promptInfo.reservedCount, ") Reserve Numbers, <br>",
                    "(", promptInfo.reservedPremiumCount, ") Premium Reserve Numbers, <br>",
                    "and any integrations associated with this group and all sub-groups. ",
                    "All active phone numbers associated with this group will be released from ",
                    "your account. Are you sure you want to proceed? Type 'yes' to proceed."

                ].join("");

                $bootbox.prompt(promptWarningStr, function(userResponse) {
                    // User must type out "yes" in text box prompt to delete

                    // empty string so it doesn't break on .toLowerCase()
                    //console.log(userResponse.toLowerCase());
                    userResponse = (userResponse === null) ? "" : userResponse;
                    if (userResponse.toLowerCase() != "yes") {
                        pinesNotifications.notify({
                            title: "Delete Group",
                            text: "User didn't respond 'yes', so no Group was deleted.",
                            type: "info"
                        });
                        return;
                    }

                    // User has typed yes and wants to delete

                    // - Verify current OU is not a top level OU
                    // - get parent OU meta data so client side can update its global variables to
                    //        adjust context of page viewing
                    var parentOuInfo;
                    OldOrgUnitWebService.deleteOU($rootScope.currentOUId).then(function(resp) {

                        if (resp.data.err === "can't delete top level ou") {
                            pinesNotifications.notify({
                                title: "Delete Group",
                                text: "Attempt to delete top level Group not permitted.",
                                type: "error"
                            });
                            return;
                        } else if (resp.data.err) {
                            pinesNotifications.notify({
                                title: "Delete Group",
                                text: "Server error in attempt to delete OU",
                                type: "error"
                            });
                            return;
                        }

                        pinesNotifications.notify({
                            title: "Group",
                            text: $rootScope.currentOUName + " deleted.", // Err I mean an Org Unit
                            type: "info"
                        });

                        parentOuInfo = resp.data.json;

                        if (!parentOuInfo) {
                            pinesNotifications.notify({
                                title: "Delete Group",
                                text: "No parent data supplied by server.",
                                type: "error"
                            });
                            return;
                        }

                        return OldOrgUnitWebService.getOULevel(parentOuInfo.org_unit_id);

                    }).then(function(ouLevelData) {
                        if (!ouLevelData || !ouLevelData.data.json || !ouLevelData.data.json.ouLevel) {
                            pinesNotifications.notify({
                                title: "Delete Group",
                                text: "Error getting Group's level.",
                                type: "error"
                            });
                            return;
                        }
                        parentOuInfo.ouLevel = ouLevelData.data.json.ouLevel;
                        $rootScope.bc_ous[$rootScope.currentOULevel].id = null;
                        $rootScope.bc_ous[$rootScope.currentOULevel].name = null;
                        OrgUnitLocal.updateSessData(parentOuInfo.org_unit_id, parentOuInfo.org_unit_name,
                            ($rootScope.currentOULevel - 1));

                        $rootScope.currentOULevel = parentOuInfo.ouLevel;
                        var level = (parseInt($rootScope.currentOULevel) + 1);
                        BreadcrumbWebService.getOUData(parentOuInfo.org_unit_id)
                            .success(function(result) {
                                $rootScope.selectedOU = {
                                    "id": parentOuInfo.org_unit_id,
                                    "level": parentOuInfo.ouLevel
                                };
                                if (parentOuInfo.ouLevel == 1) {
                                    BreadcrumbWebService.loadLevel1(
                                        $rootScope.highestOUId);
                                }
                                if (parentOuInfo.ouLevel == 2) {
                                    BreadcrumbWebService.loadLevel2(
                                        $rootScope.currentOUId);
                                }
                                $rootScope.selectedOU = {
                                    "id": parentOuInfo.org_unit_id,
                                    "level": parentOuInfo.ouLevel
                                };
                                $route.reload();
                            });
                    });
                }); // end $bootbox.prompt
            }); // end OldOrgUnitWebService.infoAboutOuAndChildren()
        };


        //if($scope.userAccess.orgunit === 4) {
        //    $scope.isReadOnly = true;
        //}

        $scope.formSubmit = false;
        /*  Defaults for drop down regardess of create new or adding  */

        /* Since saveOrg() is used for updating and adding, use URL 'add' parameter
         for deciding context for this function  */
        var orgUnitSaveMethod = $routeParams.add ? 'add' : 'update';

        /* If we're updating the current OU, we need to fill in the blank fields
         with its pertaining data  */
        //if (orgUnitSaveMethod === 'update') {
        // console.log('root scope id here->> ' + $rootScope.currentOUId);
        OldOrgUnitWebService.getOrgUnitById($rootScope.currentOUId)
            .then(function(result) {
                //console.log('ORG UNIT BY ID---- SUCCESS!!!');
                setTimeout(function() {
                    var ou = result.data.json[0];
                    $scope.companyName = ou.org_unit_name;
                    $scope.orgIdExternal = ou.org_unit_ext_id;
                    $scope.phone = ou.phone_number;
                    $scope.city = ou.city;
                    $scope.industry = ou.industry_id;
                    $scope.zip = ou.zip;
                    $scope.parentCompany = ou.parent_id;
                    $scope.state = ou.state;
                }, 500);
            });
        //}

        //CREATES AND UPDATES
        //console.log($scope.industryList);
        $scope.saveOrg = function() {

            if ($scope.ouForm.$valid) {

            } else {
                //console.log('not valid');
                pinesNotifications.notify({
                    title: 'Company Details',
                    text: 'Please fix invalid fields before saving organization details.',
                    type: 'error'
                });
                return;
            }
            /*  Generic ouData for either add or update  */
            var ouData = {
                orgUnit: {
                    org_unit_name: $scope.companyName,
                    org_unit_ext_id: $scope.orgIdExternal,
                    phone_number: $scope.phone,
                    city: $scope.city,
                    industry_id: $scope.industry,
                    zip: $scope.zip,
                    state: $scope.state,
                    billing_id: $window.sessionStorage.billingId
                }
            };

            if ((orgUnitSaveMethod === 'add') && $scope.ouForm.$valid) {
                ouData.orgUnit.org_unit_parent_id = $rootScope.currentOUId;
                OldOrgUnitWebService.createOrgUnit(ouData)
                    .then(function(result) {
                        $scope.formSubmit = false;
                        var text =
                            //console.log('createOrgUnit response');
                            pinesNotifications.notify({
                                title: 'Company Details',
                                text: ouData.orgUnit.org_unit_name + ' created under ' +
                                    $rootScope.currentOUName,
                                type: 'success'
                            });
                    });
            }

            //console.log('ouData \\/');
            // console.log(ouData);

            // Adding an OU as a child of a different OU


            // Updating the currently viewed OU
            else if ((orgUnitSaveMethod === 'update') && $scope.ouForm.$valid) {
                ouData.orgUnit.org_unit_id = $rootScope.currentOUId;
                if ($rootScope.currentOUName === ouData.orgUnit.org_unit_name) {
                    pinesText = ouData.orgUnit.org_unit_name + ' updated.';
                } else {
                    pinesText = $rootScope.currentOUName + '  (now ' + ouData.orgUnit.org_unit_name +
                        ') updated.';
                    //need to call memcache to update its current name
                    //OrgUnitLocal.setCurrentViewingOU($rootScope.currentOUId, ouData.orgUnit.org_unit_name);

                }
                OldOrgUnitWebService.updateOrgUnit(ouData)
                    .then(function(result) {
                        $scope.formSubmit = false;
                        console.log(result);
                        if (result.data.result === 'error') {
                            pinesNotifications.notify({
                                title: 'Company Details',
                                text: result.data.err,
                                type: 'error'
                            });
                        } else {
                            pinesNotifications.notify({
                                title: 'Company Details',
                                text: pinesText,
                                type: 'success'
                            });
                        }
                    });
            }
        }; //end $scope.saveOrg()

        //save default group setting

        $scope.showSubmit = function() {
            setTimeout(function() {
                $scope.submitted1 = false;
            }, 100);
        };

        $scope.showSaveButton = function() {
            setTimeout(function() {
                $scope.formSubmit1 = false;
            }, 100);
        };

    }
])


.controller('OldSubOrgUnitController', ['$scope', 'OldOrgUnitWebService', '$rootScope', '$routeParams', 'pinesNotifications', 'OrgUnitLocal', '$bootbox',
    "$route", "$filter", "BreadcrumbWebService", "$window", 'DynamicCssInsertion', 'paginationService',
    function($scope, OldOrgUnitWebService, $rootScope, $routeParams, pinesNotifications, OrgUnitLocal, $bootbox,
        $route, $filter, BreadcrumbWebService, $window, DynamicCssInsertion, paginationService) {
        $scope.isReadonly = false;
        //console.log($scope.userAccess);
        if ($scope.userAccess && $scope.userAccess.orgunit < 7) {
            $scope.isReadonly = true;
        }
        //check to see if user can add subgrups based on current ou level
        $scope.canAddSub = false;
        $rootScope.userOULevel = parseInt($rootScope.userOULevel);
        $rootScope.currentOULevel = parseInt($rootScope.currentOULevel);
        if ($rootScope.userOULevel === 0 && $rootScope.currentOULevel < 2) {
            $scope.canAddSub = true;
        } else if ($rootScope.userOULevel == 1 && $rootScope.currentOULevel < 1) {
            $scope.canAddSub = true;
        }
        $scope.subgroups = [];
        $scope.currentPage = 1;
        $scope.pageSize = 100;
        $scope.locNewRow = 0;
        // $scope.addSubgroupInProcess = false;

        $scope.arrRequired = [];
        $scope.arrInvalid = [];
        $scope.specificErrors = [];
        $scope.actionHeader = ['Actions'];
        $scope.subUserHeaders = ['OUID', 'Group Name', 'External ID', 'Industry', 'Phone', 'City', 'State/Province', 'Zip/Postal Code'];
        $scope.isDeleteClicked = false;
        $scope.isSubGroupOpen = true;
        $scope.addsubgroupInProcess = false;

        OldOrgUnitWebService.getChildrenOUs($rootScope.currentOUId)
            .success(function(result) {
                //console.log(result);
                for (var x in result.json) {
                    $scope.subgroups.push(result.json[x]);
                    //console.log(ou)
                }
            })
            .error(function(err) {
                console.log('err fetching children');
                console.log(err);
            });

        $scope.industries = [];

        //get list of industires
        OldOrgUnitWebService.getIndustries().then(function(result) {
            //console.log(result.data.json);
            for (var x in result.data.json) {
                $scope.industries.push({
                    value: result.data.json[x].industry_id,
                    text: result.data.json[x].industry_group + ": " + result.data.json[x].industry_name
                });
            }
        });

        //set industry value
        $scope.showIndustry = function(subgroup) {
            if (subgroup.industry_id) {
                if ($scope.industries.length) {
                    var selected = $filter('filter')($scope.industries, { value: subgroup.industry_id }, true);
                    //console.log(selected[0].text);
                    return selected.length ? selected[0].text : 'Not set';
                } else {
                    return subgroup.industry_id || 'Not set';
                }
            }
        };

        $scope.showState = function(subgroup) {
            if (subgroup.state) {
                if ($scope.states.length) {
                    var selected = $filter('filter')($scope.states, { value: subgroup.state });
                    //console.log(selected[0].text);
                    return selected.length ? selected[0].text : 'Not set';
                } else {
                    return subgroup.state || 'Not set';
                }
            }
        };

        $scope.cancelAdd = function(index, id, rowform) {
            if (!id) {
                var currentPage = paginationService.getCurrentPage('pg-subgroups');
                if (currentPage > 1) {
                    index = ((currentPage - 1) * 100) + index;
                }
                $scope.subgroups.splice(index, 1);
                $scope.locNewRow = 0;
            } else {
                rowform.$cancel();
            }
            $scope.locNewRow = 0;
        };

        $scope.deleteOU = function(index, ouid) {
            $scope.isDeleteClicked = true;
            console.log(index);
            console.log(ouid);
            var promptWarningStr, res;

            // Make sure user has permission to proceed
            if ($rootScope.userAccess.orgunit !== 7) {
                pinesNotifications.notify({
                    title: "Permissions",
                    text: "You dont have permission to delete a Group", // Err I mean an Org Unit
                    type: "error"
                });

                return;
            }

            // User shouldn't be able to delete the OU if they're viewing the highest OU in tree
            if (ouid === $rootScope.highestOUId) {
                pinesNotifications.notify({
                    title: "Permissions",
                    text: "You can't delete a top level Group", // Err I mean an Org Unit
                    type: "error"
                });
                return;
            }

            OldOrgUnitWebService.infoAboutOuAndChildren(ouid).then(function(result) {
                if (result.status === "error") {
                    console.log("error getting info about OU and its children");
                    return;
                }

                // Build message to display out of meta data retrieved
                var promptInfo = result.data.json;
                console.log("First=======================================", promptInfo);

                promptWarningStr = [
                    "Deleting this Group will delete <br>",
                    "(", promptInfo.userCount, ") Users, <br>",
                    "(", promptInfo.orgUnitCount, ") Groups, <br>",
                    "(", promptInfo.campaignCount, ") Campaigns, <br>",
                    "(", promptInfo.callFlowCount, ") Tracking Numbers, <br>",
                    "(", promptInfo.webhookCount, ") Webhooks, <br>",
                    "(", promptInfo.dniCount, ") Dni Settings, <br>",
                    "(", promptInfo.tagCount, ") Tags, <br>",
                    "(", promptInfo.reservedCount, ") Reserve Numbers, <br>",
                    "(", promptInfo.reservedPremiumCount, ") Premium Reserve Numbers, <br>",
                    "(", promptInfo.scoreCardCount, ") Scorecards<br>",
                    "and any integrations associated with this group and all sub-groups. ",
                    "All active phone numbers associated with this group will be released from ",
                    "your account. Are you sure you want to proceed? Type 'yes' to proceed."

                ].join("");

                $bootbox.prompt(promptWarningStr, function(userResponse) {
                    $scope.isDeleteClicked = false;
                    // User must type out "yes" in text box prompt to delete

                    // empty string so it doesn't break on .toLowerCase()
                    userResponse = (userResponse === null) ? "" : userResponse;
                    if (userResponse.toLowerCase() != "yes") {
                        pinesNotifications.notify({
                            title: "Delete Group",
                            text: "User didn't respond 'yes', so no Group was deleted.",
                            type: "info"
                        });
                        return;
                    }

                    // User has typed yes and wants to delete

                    // - Verify current OU is not a top level OU
                    // - get parent OU meta data so client side can update its global variables to
                    //        adjust context of page viewing
                    var parentOuInfo;
                    OldOrgUnitWebService.deleteOU(ouid).then(function(resp) {

                        if (resp.data.err === "can't delete top level ou") {
                            pinesNotifications.notify({
                                title: "Delete Group",
                                text: "Attempt to delete top level Group not permitted.",
                                type: "error"
                            });
                            return;
                        } else if (resp.data.err) {
                            pinesNotifications.notify({
                                title: "Delete Group",
                                text: "Server error in attempt to delete OU",
                                type: "error"
                            });
                            return;
                        }

                        pinesNotifications.notify({
                            title: "Group",
                            text: "Group deleted.", // Err I mean an Org Unit
                            type: "info"
                        });
                        var currentPage = paginationService.getCurrentPage('pg-subgroups');
                        if (currentPage > 1) {
                            index = ((currentPage - 1) * 100) + index;
                        }
                        $scope.subgroups.splice(index, 1);

                        parentOuInfo = resp.data.json;

                        if (!parentOuInfo) {
                            pinesNotifications.notify({
                                title: "Delete Group",
                                text: "No parent data supplied by server.",
                                type: "error"
                            });
                            return;
                        }

                        return OldOrgUnitWebService.getOULevel(parentOuInfo.org_unit_id);

                    }).then(function(ouLevelData) {
                        if (!ouLevelData || !ouLevelData.data.json || !ouLevelData.data.json.ouLevel) {
                            pinesNotifications.notify({
                                title: "Delete Group",
                                text: "Error getting Group's level.",
                                type: "error"
                            });
                            return;
                        }
                        //parentOuInfo.ouLevel = ouLevelData.data.json.ouLevel;

                        // OrgUnitLocal.updateSessData(parentOuInfo.org_unit_id, parentOuInfo.org_unit_name, parentOuInfo.ouLevel);

                    });
                }); // end $bootbox.prompt
            }); // end OldOrgUnitWebService.infoAboutOuAndChildren()
        };

        $scope.addSubgroup = function() {
            $scope.addsubgroupInProcess = true;

            // check last inserted value. if it doesn't have an org_unit_name property, then the last added user hasn't been saved yet
            if ($scope.subgroups.length) {
                var lastAddedSubgroup;
                if ($scope.locNewRow > 0) {
                    lastAddedSubgroup = $scope.subgroups[$scope.locNewRow];
                } else {
                    lastAddedSubgroup = $scope.subgroups[$scope.subgroups.length - 1];
                }
                if (!lastAddedSubgroup.org_unit_name && !lastAddedSubgroup.org_unit_id) {
                    pinesNotifications.notify({
                        title: "Subgroups",
                        text: "Save currently added subgroup before adding another.",
                        type: "info"
                    });
                    return;
                }
            }

            $scope.inserted = {
                org_unit_name: '',
                org_unit_ext_id: '',
                industry_id: '',
                phone_number: '',
                city: '',
                state: '',
                zip: ''
            };
            if ($scope.subgroups.length > 99) {
                var currentPage = paginationService.getCurrentPage('pg-subgroups');
                $scope.locNewRow = (currentPage * 100) - 1;
                if ($scope.subgroups.length <= $scope.locNewRow) {
                    $scope.locNewRow = $scope.subgroups.length;
                }
                $scope.subgroups.splice($scope.locNewRow, 0, $scope.inserted);
            } else {
                $scope.subgroups.push($scope.inserted);
            }
        };

        $scope.saveSubgroup = function(data, ouid, rowform, index) {
            data.org_unit_name = data.org_unit_name.trim()
            //console.log(data);
            //var selected = $filter('filter')($scope.industries, {value: subgroup.industry_id});
            var saveData = {
                orgUnit: {
                    org_unit_name: data.org_unit_name,
                    org_unit_ext_id: data.org_unit_ext_id,
                    phone_number: data.phone_number,
                    city: data.city,
                    industry_id: data.industry_id,
                    zip: data.zip,
                    state: data.state,
                    billing_id: $window.sessionStorage.billingId
                }
            };
            //console.log(id);
            if (ouid) { //edit existing subgroup
                saveData.orgUnit.org_unit_id = ouid;
                saveData.orgUnit.org_unit_parent_id = $rootScope.currentOUId;
                $scope.isReadonly = true;
                OldOrgUnitWebService.updateOrgUnit(saveData).then(function(result) {
                    //$scope.addsubgroupInProcess = false;
                    $scope.isReadonly = false;
                    if (result.data.result === 'success') {
                        //angular.extend(data, {id: id});
                        pinesNotifications.notify({
                            title: "Sub-groups",
                            text: "Sub-group " + saveData.orgUnit.org_unit_name + " was updated successfully.",
                            type: "success"
                        });
                    } else {
                        $scope.error = result;
                        pinesNotifications.notify({
                            title: "Sub-groups",
                            text: result.data.err,
                            type: "error"
                        });
                        setTimeout(function() {
                            rowform.$show();
                        }, 100);
                    }
                });
            } else { //new subgroup
                //console.log(saveData);
                $scope.isReadonly = true;
                saveData.orgUnit.org_unit_parent_id = $rootScope.currentOUId;
                OldOrgUnitWebService.createOrgUnit(saveData).then(function(result) {
                    console.log(result);
                    $scope.isReadonly = false;
                    $scope.addsubgroupInProcess = false;
                    if (result.data.status === 'success') {
                        //angular.extend(data, {id: result.data.json.insertId});
                        rowform.$cancel();
                        var group = {
                            "id": parseInt(result.data.json.insertId),
                            "name": data.org_unit_name,
                            "tName": data.org_unit_name.substr(0, 30),
                            "parent": parseInt($rootScope.currentOUId),
                            "checked": false
                        };
                        $rootScope.groupInfo.push(group);
                        var currentPage = paginationService.getCurrentPage('pg-subgroups');
                        if (currentPage > 1) {
                            index = ((currentPage - 1) * 100) + index;
                        }
                        $scope.subgroups[index].org_unit_id = result.data.json.insertId;

                        pinesNotifications.notify({
                            title: "Sub-groups",
                            text: "Sub-group " + saveData.orgUnit.org_unit_name + " was created successfully.",
                            type: "success"
                        });
                    } else {
                        $scope.error = result;
                        pinesNotifications.notify({
                            title: "Sub-groups",
                            text: result.data.err,
                            type: "error"
                        });
                        setTimeout(function() {
                            rowform.$show();
                        }, 100);
                    }
                });
            }

            // return $http.post('/saveUser', data);
        };

        //validate blank data before save.
        $scope.validateData = function(data, name, id) {

            //console.log(id);
            var NAME_REGEXP = /^[a-zA-Z0-9_ -]+$/;
            var messageText;
            if (typeof(data) == 'string') {
                data = data.trim();
            }
            name = name.trim();
            if (name === "Group Name") {
                // if (data.indexOf(',') > -1) {
                //     $scope.arrInvalid.push(name);
                //     return '   ';
                // }
            }
            if (!data && name != 'Zip' && name != 'Phone') {
                $scope.arrRequired.push(name);

                if (name != 'Industry') {
                    return '   ';
                }
            }

            var zip_regex = /^[a-z0-9 ]+$/i;
            if (name == 'Zip' && data) {
                if (!zip_regex.test(data)) {
                    pinesNotifications.notify({
                        title: 'Sub-groups',
                        text: 'Zip is invalid',
                        type: 'error'
                    });
                    return '   ';
                }
            }
            var phone_regex = /^[0-9-() ]{14}$/;
            if (name == 'Phone' && data) {
                if (!phone_regex.test(data)) {
                    pinesNotifications.notify({
                        title: 'Sub-groups',
                        text: 'Phone is invalid',
                        type: 'error'
                    });
                    return '   ';
                }
            }
            if (name == 'Industry') {
                if ($scope.arrRequired.length) {
                    messageText = 'field is required.';
                    if ($scope.arrRequired.length > 1) {
                        messageText = 'fields are required.';
                    }
                    pinesNotifications.notify({
                        title: 'Sub-groups',
                        text: '\'' + $scope.arrRequired.join(', ') + '\' ' + messageText,
                        type: 'error'
                    });
                    var roleExist = $scope.arrRequired.indexOf("Industry");
                    $scope.arrInvalid = [];
                    $scope.arrRequired = [];
                    if (roleExist > -1) {
                        return '   ';
                    } else {
                        return '';
                    }
                }

                if ($scope.arrInvalid.length) {
                    messageText = 'field is invalid.';
                    if ($scope.arrInvalid.length > 1) {
                        messageText = 'fields are invalid.';
                    }
                    pinesNotifications.notify({
                        title: 'Sub-groups',
                        text: '\'' + $scope.arrInvalid.join(', ') + '\' ' + messageText,
                        type: 'error'
                    });
                    //var res = $scope.specificErrors.join(', ');
                    if ($scope.specificErrors.length) {
                        pinesNotifications.notify({
                            title: 'Sub-groups',
                            text: '\'' + $scope.specificErrors.join(', ') + '\'',
                            type: 'error'
                        });
                    }

                    $scope.arrRequired = [];
                    $scope.arrInvalid = [];
                    $scope.specificErrors = [];
                    return '';
                }
            }
        };

        $scope.scrollToTop = function() {
            $window.scrollTo(0, 0);
        };

        $scope.setCurrentOU = function(id, name) {
            //check to see if they are allowed to change to this ou
            //note: levels start at 0
            //console.log($scope.bc_ous);
            // console.log($scope.selectedOU.level);
            var level = (parseInt($rootScope.currentOULevel) + 1);
            BreadcrumbWebService.getOUData(id)
                .success(function(result) {
                    //console.log(level);
                    //console.log($rootScope.bc_ous);
                    $rootScope.bc_ous[level] = { id: id, name: name };
                    $rootScope.selectedOU = { "id": id, "level": level };
                    if (level == 1) {
                        BreadcrumbWebService.loadLevel1($rootScope.highestOUId);
                    }
                    if (level == 2) {
                        BreadcrumbWebService.loadLevel2($rootScope.currentOUId);
                    }
                    $rootScope.selectedOU = { "id": id, "level": level };

                    // retrieve the White Label styling
                    OldOrgUnitWebService.getStyle(id).then(function(result) {
                        if (result.data.result === 'success') {
                            // set the support and chat settings

                            $rootScope.chatURL = $window.sessionStorage.chatURL = "https://support.convirza.com/customer/portal/chats/new";
                            if (Object.keys(result.data.json).length > 0) {
                                $rootScope.white_label_active = $window.sessionStorage.white_label_active = result.data.json.white_label_active;
                                // $rootScope.supportURL = $window.sessionStorage.supportURL = result.data.json.support_url;
                                $rootScope.chatActive = $window.sessionStorage.chatActive = result.data.json.chat_active;
                            } else {
                                $rootScope.white_label_active = $window.sessionStorage.white_label_active = false;
                                $rootScope.chatActive = $window.sessionStorage.chatActive = true;
                            }

                            $rootScope.feedbackURL = window.sessionStorage.feedbackURL = "https://convirza.uservoice.com?sso=" + window.sessionStorage.uservoiceSSO;
                            $rootScope.supportURL = $window.sessionStorage.supportURL = "https://knowledgebase.convirza.com";
                            // dynamically inject the custom CSS styling into the document
                            DynamicCssInsertion.whiteLabelCSSInject(result.data.json.white_label_css, result.data.json.org_logo, result.data.json.org_logo, false);
                        }
                    });

                    //update session
                    $rootScope.currentOUId = $window.sessionStorage.currentOUId = id;
                    $rootScope.currentOUName = $window.sessionStorage.currentOUName = name;
                    $rootScope.currentOULevel = $window.sessionStorage.currentOULevel = level;
                    $route.reload();
                })
                .error(function(err) {
                    console.log('err fetching Org');
                    console.log(err);
                });
        };

        $scope.states = [
            { subgroup: "US", value: "AK", text: "Alaska" },
            { subgroup: "US", value: "HI", text: "Hawaii" },
            { subgroup: "US", value: "CA", text: "California" },
            { subgroup: "US", value: "NV", text: "Nevada" },
            { subgroup: "US", value: "OR", text: "Oregon" },
            { subgroup: "US", value: "WA", text: "Washington" },
            { subgroup: "US", value: "AZ", text: "Arizona" },
            { subgroup: "US", value: "CO", text: "Colorado" },
            { subgroup: "US", value: "ID", text: "Idaho" },
            { subgroup: "US", value: "MT", text: "Montana" },
            { subgroup: "US", value: "NE", text: "Nebraska" },
            { subgroup: "US", value: "NM", text: "New Mexico" },
            { subgroup: "US", value: "ND", text: "North Dakota" },
            { subgroup: "US", value: "UT", text: "Utah" },
            { subgroup: "US", value: "WY", text: "Wyoming" },
            { subgroup: "US", value: "AL", text: "Alabama" },
            { subgroup: "US", value: "AR", text: "Arkansas" },
            { subgroup: "US", value: "IL", text: "Illinois" },
            { subgroup: "US", value: "IA", text: "Iowa" },
            { subgroup: "US", value: "KS", text: "Kansas" },
            { subgroup: "US", value: "KY", text: "Kentucky" },
            { subgroup: "US", value: "LA", text: "Louisiana" },
            { subgroup: "US", value: "MN", text: "Minnesota" },
            { subgroup: "US", value: "MS", text: "Mississippi" },
            { subgroup: "US", value: "MO", text: "Missouri" },
            { subgroup: "US", value: "OK", text: "Oklahoma" },
            { subgroup: "US", value: "SD", text: "South Dakota" },
            { subgroup: "US", value: "TX", text: "Texas" },
            { subgroup: "US", value: "TN", text: "Tennessee" },
            { subgroup: "US", value: "WI", text: "Wisconsin" },
            { subgroup: "US", value: "CT", text: "Connecticut" },
            { subgroup: "US", value: "DE", text: "Delaware" },
            { subgroup: "US", value: "FL", text: "Florida" },
            { subgroup: "US", value: "GA", text: "Georgia" },
            { subgroup: "US", value: "IN", text: "Indiana" },
            { subgroup: "US", value: "ME", text: "Maine" },
            { subgroup: "US", value: "MD", text: "Maryland" },
            { subgroup: "US", value: "MA", text: "Massachusetts" },
            { subgroup: "US", value: "MI", text: "Michigan" },
            { subgroup: "US", value: "NH", text: "New Hampshire" },
            { subgroup: "US", value: "NJ", text: "New Jersey" },
            { subgroup: "US", value: "NY", text: "New York" },
            { subgroup: "US", value: "NC", text: "North Carolina" },
            { subgroup: "US", value: "OH", text: "Ohio" },
            { subgroup: "US", value: "PA", text: "Pennsylvania" },
            { subgroup: "US", value: "RI", text: "Rhode Island" },
            { subgroup: "US", value: "SC", text: "South Carolina" },
            { subgroup: "US", value: "VT", text: "Vermont" },
            { subgroup: "US", value: "VA", text: "Virginia" },
            { subgroup: "US", value: "WV", text: "West Virginia" },
            { subgroup: "Canada", value: "AB", text: "Alberta" },
            { subgroup: "Canada", value: "BC", text: "British Columbia" },
            { subgroup: "Canada", value: "MB", text: "Manitoba" },
            { subgroup: "Canada", value: "NB", text: "New Brunswick" },
            { subgroup: "Canada", value: "NF", text: "Newfoundland" },
            { subgroup: "Canada", value: "NT", text: "Northwest Territories" },
            { subgroup: "Canada", value: "NS", text: "Nova Scotia" },
            { subgroup: "Canada", value: "ON", text: "Ontario" },
            { subgroup: "Canada", value: "PE", text: "Prince Edward Island" },
            { subgroup: "Canada", value: "QC", text: "Quebec" },
            { subgroup: "Canada", value: "SK", text: "Saskatchewan" },
            { subgroup: "Canada", value: "YT", text: "Yukon" }
        ];


        $(window).scroll(function() {
            var yoda = window.pageYOffset;
            var scroll_position = 5000;

            if (yoda > scroll_position) {
                $(window).trigger('resize');
            }
        });

        $(window).scroll(function() {
            var vader = window.pageYOffset;
            var scroll_position = 6000;

            if (vader > scroll_position) {
                $('button').css({ height: "34px" });
            } else {
                $('button').css({ height: "34px" });
            }
        });

    }
]);
