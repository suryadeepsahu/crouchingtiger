//jshint ignore:start
angular
    .module('org-unit', ['disableAll', 'theme.services', 'ui.bootstrap', "breadcrumb", "whitelabel", 'ui.select2', 'campaigns-builder', 'ngTagsInput'])
    .directive('tooltip', function() {
        return {
            
            link: function(scope, el, attrs,element) {
				if (element !== undefined){
					element.hover(function(){
						// on mouseenter
						element.tooltip('show');
					}, function(){
						// on mouseleave
						element.tooltip('hide');
					});
				}
             
            }
        };
    })
    .factory('OrgUnitWebService', function($q, $rootScope, $http, $window, $location) {
        'use strict';
        var OrgUnitWebService = {};

        /*  Helper function for getting default config object  */
        OrgUnitWebService.getJsonConfig = function() {
            var config = {
                headers: {
                    'content-type': 'application/json',
                    'Authorization': 'bearer ' + $window.sessionStorage.token
                }
            };
            return config;
        };

        //  Export functionality start
        OrgUnitWebService.getGroupsExportReport = function(userAccess, ouId) {
            return $http.get(this.getBaseURL() + "/v1/orgunit/groups/ouId/" + ouId + "/userAccess/" + userAccess, this.getJsonConfig());
        };

        OrgUnitWebService.getUsersExportReport = function(userAccess, ouId) {
            return $http.get(this.getBaseURL() + "/v1/user/users/ouId/" + ouId + "/userAccess/" + userAccess, this.getJsonConfig());
        };

        // Export functionality End
        OrgUnitWebService.getBaseURL = function() {
            return $rootScope.url + ":" + $rootScope.port;
        };

        OrgUnitWebService.getOULevel = function(ouId) {
            return $http.get(this.getBaseURL() + "/v1/orgUnit/level/" + ouId, this.getJsonConfig());
        };

        OrgUnitWebService.getconversationalanalytics = function(orgUnitId) {
            return $http.get(this.getBaseURL() + "/v1/defgroupsetting/CAStatus/" + orgUnitId, this.getJsonConfig());
        };

        OrgUnitWebService.getFeatureSettings = function(orgUnitId) {
            return $http.get(this.getBaseURL() + "/v1/defgroupsetting/feature/" + orgUnitId, this.getJsonConfig());
        };

        OrgUnitWebService.getDefaultCustomParams = function(orgUnitId) {
            // return $http.get(this.getBaseURL() + "/v1/defgroupsetting/feature/customParams/" + orgUnitId, this.getJsonConfig());
            return $http.get(this.getBaseURL() + "/v1/defgroupsetting/CallFlow/customParams/" + orgUnitId, this.getJsonConfig());

        };

        OrgUnitWebService.getspamguard = function(orgUnitId) {
            return $http.get(this.getBaseURL() + '/v1/defgroupsetting/spamguard/' + orgUnitId, this.getJsonConfig());
        };

        OrgUnitWebService.getrecordcall = function(orgUnitId) {
            return $http.get(this.getBaseURL() + '/v1//', +orgUnitId, this.getJsonConfig());
        };

        OrgUnitWebService.getvoicepromts = function(orgUnitId) {
            return $http.get(this.getBaseURL() + "/v1/callflowrecording/" + orgUnitId + "/prompt", this.getJsonConfig());
        };

        OrgUnitWebService.getwhisper = function(orgUnitId) {
            return $http.get(this.getBaseURL() + "/v1/callflowrecording/" + orgUnitId + "/whisper", this.getJsonConfig());
        };

        OrgUnitWebService.getcustomsource = function(orgUnitId) {
            return $http.get(this.getBaseURL() + '/v1/customSource/' + orgUnitId, this.getJsonConfig());
        };

        OrgUnitWebService.getCallFlow = function(orgUnitId) {
            return $http.get(this.getBaseURL() + "/v1/defgroupsetting/callFlow/" + orgUnitId, this.getJsonConfig());
        };

        OrgUnitWebService.getCallActions = function(orgUnitId) {
            return $http.get(this.getBaseURL() + "/v1/defgroupsetting/callAction/" + orgUnitId, this.getJsonConfig());
        };

        OrgUnitWebService.getcallActionByActionId = function(id) {
            return $http.get(this.getBaseURL() + "/v1/defgroupsetting/callAction/action/" + id, this.getJsonConfig());
        };



        OrgUnitWebService.getWebhooks = function(currentOUId) {
            return $http.get(this.getBaseURL() + "/v1/webhook/list/" + currentOUId, this.getJsonConfig());
        };

        OrgUnitWebService.removecallActions = function(id, ou_id) {
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

        OrgUnitWebService.createDefaultCustomParams = function(nc) {
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

        OrgUnitWebService.getStyle = function(ouid) {
            return $http.get(this.getBaseURL() + "/v1/useraccess/styleou/" + ouid, this.getJsonConfig());
        };

        OrgUnitWebService.getChildrenOUs = function(id) {

            $http.defaults.useXDomain = true;
            return $http.get($rootScope.url + ':' + $rootScope.port + '/v1/orgUnit?org_unit_parent_id=' + id,
                this.getJsonConfig());
        };

        OrgUnitWebService.validateDniData = function(data, dni_status, show) {
            var errorsArrHash = {};
            var arrRequired = [];
            var arrInvalid = [];
            var arrInvalidMessage = [];
            var REF_REGEX = new RegExp(/^([a-z0-9]+|\*)([\-\.]{1}[a-z0-9]+)*\.([a-z]{1,5}|\*)(:[0-9]{1,5})?(\/.*)?$/i);

            if (data.destination_url.length === 0 && dni_status) {
                arrRequired.push("Host Domain is required");
            }

            if (data.dni_element.length === 0 && dni_status) {
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
            } else if (!data.referrer && dni_status) {
                arrInvalidMessage.push("Referring Website field is required.");
            }
            if (data.dni_element && dni_status) {
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
        OrgUnitWebService.infoAboutOuAndChildren = function(ouId) {
            return $http.get(this.getBaseURL() + "/v1/orgUnit/linked/" + ouId, this.getJsonConfig());
        };

        /* Makes sure this Ou can be deleted (shouldnt be a top node OU), and if it can it flags all
         * correlated data as deleted, then returns the parent OU data for the client to update its global
         * current OU to switch to since the current OU is being deleted */
        OrgUnitWebService.deleteOU = function(idOfOUtoDelete) {
            return $http.delete(this.getBaseURL() + '/v1/orgUnit/' + idOfOUtoDelete + '/' + $rootScope.currentOUId,
                this.getJsonConfig());
        };

        OrgUnitWebService.getOrgUnitById = function(orgUnitId) {
            return $http.get(this.getBaseURL() + '/v1/orgUnit/' + orgUnitId, this.getJsonConfig());
        };

        /*  Used at least in the org unit add/edit page for the drop down list  */
        OrgUnitWebService.getIndustries = function() {
            return $http.get(this.getBaseURL() + '/v1/industry', this.getJsonConfig());
        };

        OrgUnitWebService.getTTS = function(TextToSpeech) {
            //console.log($window.sessionStorage.token);
            //$http.defaults.useXDomain = true;
            return $http.get(this.getBaseURL() + "/v1/callflow/getmedia/" + encodeURIComponent(TextToSpeech), this.getJsonConfig());
        };

        /*  This should probably be parsed on the backend, but the format the data gets retrieved in
         is not correct for putting into the dropdown box and needs to be parsed to the correct
         format first  */
        OrgUnitWebService.parseIndustries = function(industryArray) {

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

        // OrgUnitWebService.getOrgGroupsLike = function(orgUnitChars){
        //  return $http.get($rootScope.url +':'+ $rootScope.port + '/v1/orgUnit/' + orgUnitChars, this.getJsonConfig());
        // };

        // OrgUnitWebService.getSession = function(){
        //  return $http.get($rootScope.url +':'+ $rootScope.port + '/v1/session', this.getJsonConfig);
        // };

        // OrgUnitWebService.getOrganization = function(orgid) {
        //      // response data should contain company name, id, parentcompany, assigned sales rep,
        //      // industry, timezone, phone, city, state, zip
        //  return $http.get($rootScope.url +':'+ $rootScope.port +'/v1/orgUnit/'+ orgid, this.getJsonConfig());
        // };

        OrgUnitWebService.updateOrgUnit = function(orgData) {
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
        OrgUnitWebService.createOrgUnit = function(orgData, ouParentId) {
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

        OrgUnitWebService.updateCallActions = function(ca) {
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
        OrgUnitWebService.enableconversationalanalytics = function(enableConvData) {
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


        OrgUnitWebService.savedefCustomSource = function(orgData, ouParentId) {
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


        OrgUnitWebService.enableSpamguard = function(orgData, ouParentId) {
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

        OrgUnitWebService.saveDefaultGroupSetting = function(orgData) {
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
        OrgUnitWebService.defaultCreateCallFlow = function(callFlowData) {
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
        OrgUnitWebService.defaultUpdateCallFlow = function(callFlowData) {
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

        OrgUnitWebService.recordcall = function(orgData, ouParentId) {
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

        OrgUnitWebService.playvoicepromt = function(orgData, ouParentId) {
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

        OrgUnitWebService.playwhispermsg = function(orgData, ouParentId) {
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

        OrgUnitWebService.customSource = function(customData) {
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

        OrgUnitWebService.saveCallActions = function(ca) {
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
        OrgUnitWebService.multiDeleteCustomSource = function(customsourceIds) {
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

        return OrgUnitWebService;
    })

    .factory('deleteAudioService', function() {
        'use strict';
        var audios = {};
        var service = {
            setValues:setValues,
            getValues:getValues
        };
        return service;
        
        function getValues(){
            return audios;   
        }

        function setValues(key,value){
            audios[key]= value;    

        }
        
    })     

.factory('OrgUnitLocal', function($q, $rootScope, $http, $window, $location, DynamicCssInsertion) {
    'use strict';
    var OrgUnitLocal = {};

    OrgUnitLocal.getBaseURL = function() {
        return $rootScope.url + ":" + $rootScope.port;
    };

    OrgUnitLocal.getJsonConfig = function() {
        var config = {
            headers: {
                'content-type': 'application/json',
                'Authorization': 'bearer ' + $window.sessionStorage.token
            }
        };
        return config;
    };

    /*  With no parameter passed in, getUserHighestOrgUnit retrieves
     current org unit data,
     highest org unit data (the highest the user is associated with)
     user data

     With the resetCurrentOUBoolean, this tells the backend to reset current
     org unit data to whatever the highest org unit info is before it
     sends all the data it usually sends  */
    OrgUnitLocal.getUserHighestOrgUnit = function(resetCurrentOUBoolean) {
        var apiRoute = this.getBaseURL() + '/v1/session/' + ((resetCurrentOUBoolean) ? 'resetOu' : '');
        return $http.get(apiRoute, this.getJsonConfig());
    };

    OrgUnitLocal.getSessDataFromBackend = function() {
        console.log('running getSessDataFromBackend');
        var apiRoute = this.getBaseURL() + '/v1/session';
        $http.get(apiRoute, this.getJsonConfig())
            .then(function(result) {
                if (result.data.result === 'success') {
                    console.log('ORG UNIT RESULT', result.data);
                    var data = result.data.json;
                    $window.sessionStorage.token = data.access_token;
                    $rootScope.levelOneOus = data.session.levelOneOus;
                    $window.sessionStorage.levelOneOus = JSON.stringify(data.session.levelOneOus);
                    $rootScope.currentOUId = $window.sessionStorage.currentOUId = data.session.ou_id;
                    $rootScope.currentOUName = $window.sessionStorage.currentOUName = data.session.ou_name;
                    $rootScope.currentOULevel = $window.sessionStorage.currentOULevel = 0;
                    $rootScope.topLevelOUId = $window.sessionStorage.topLevelOUId = data.session.tl_id;
                    $rootScope.userOULevel = $window.sessionStorage.userOULevel = data.session.user_ou_level;
                    $rootScope.highestOUId = $window.sessionStorage.highestOUId = data.session.ou_id;
                    $rootScope.highestOUName = $window.sessionStorage.highestOUName = data.session.ou_name;
                    $rootScope.userId = $window.sessionStorage.userId = data.session.user_id;
                    $rootScope.fullName = $window.sessionStorage.fullName = data.session.first_name + ' ' + data.session.last_name;
                    $rootScope.timezone = $window.sessionStorage.timezone = data.session.timezone;
                    $rootScope.billingId = $window.sessionStorage.billingId = data.session.billing_id;
                    $rootScope.billingOu = $window.sessionStorage.billingOu = data.session.billing_ou;
                    $rootScope.userEmail = $window.sessionStorage.userEmail = data.session.email;
                    $rootScope.score_call = $window.sessionStorage.score_call = data.session.score_call;
                    $rootScope.access_audio = $window.sessionStorage.access_audio = data.session.access_audio;
                    $rootScope.is_migrated = $window.sessionStorage.is_migrated = data.session.is_migrated;
                    $rootScope.download_audio_enabled = $window.localStorage.download_audio_enabled = data.session.download_audio_enabled;
                    $rootScope.roleId = $window.sessionStorage.roleId = data.session.role_id;
                    $rootScope.protect_caller_id = $window.sessionStorage.protect_caller_id = data.session.protect_caller_id;
                    $rootScope.orglist = $window.sessionStorage.orglist = data.session.orglist;
                    $rootScope.reports = data.session.reports;
                    $window.sessionStorage.reports = JSON.stringify(data.session.reports);
                    $rootScope.prompts = data.session.prompts;
                    $rootScope.voicemails = data.session.voicemails;
                    $rootScope.whispers = data.session.whispers;
                    $window.sessionStorage.prompts = JSON.stringify(data.session.prompts);
                    $window.sessionStorage.voicemails = JSON.stringify(data.session.voicemails);
                    $window.sessionStorage.whispers = JSON.stringify(data.session.whispers);
                    if(data.session.badge && data.session.badge > 0){
                        $rootScope.activeConversation = data.session.badge;
                    }
                    $rootScope.isSafari = $window.sessionStorage.isSafari = /constructor/i.test(window.HTMLElement) || (function(p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window.safari || safari.pushNotification);
                    $rootScope.bc_ous = [
                        { "id": $rootScope.highestOUId, "name": $rootScope.highestOUName },
                        { "id": null, "name": null },
                        { "id": null, "name": null }
                    ];

                    // only set when used by a support admin
                    if (data.session.support_token !== undefined) {
                        $rootScope.supportToken = $window.sessionStorage.supportToken = data.session.support_token;
                    }

                    if (Object.keys(data.session.style).length > 0) {
                        // $rootScope.supportURL = $window.sessionStorage.supportURL = data.session.style.support_url;
                        $rootScope.chatURL = $window.sessionStorage.chatURL = "https://support.convirza.com/customer/portal/chats/new"; //data.session.style.chat_url;
                        $rootScope.chatActive = $window.sessionStorage.chatActive = data.session.style.chat_active;
                        if(!data.session.style.support_url && !data.session.style.domain_name){
                            $rootScope.supportURL = $window.sessionStorage.supportURL = "https://knowledgebase.convirza.com";
                        }else{
                            $rootScope.supportURL = $window.sessionStorage.supportURL = data.session.style.support_url;
                        }
                    } else {
                        $rootScope.chatURL = $window.sessionStorage.chatURL = "https://support.convirza.com/customer/portal/chats/new";
                        $rootScope.supportURL = $window.sessionStorage.supportURL = "https://knowledgebase.convirza.com";
                        $rootScope.chatActive = $window.sessionStorage.chatActive = true;
                    }
                    $rootScope.feedbackURL = $window.sessionStorage.feedbackURL = "https://convirza.uservoice.com?sso=" + $window.sessionStorage.uservoiceSSO;
                    // set the user access list
                    if(data.scope){
                        $rootScope.scope = data.scope;
                        $window.sessionStorage.scope = JSON.stringify(data.scope);
                        OrgUnitLocal.getUserAccess(data.scope);
                    }
                    console.log("Is pendo loaded 3: ", $window.sessionStorage.loadedPendoScript);
                    if($window.sessionStorage.loadedPendoScript && $window.sessionStorage.loadedPendoScript === 'YES'){
                        if(!$rootScope.white_label_active){
                            console.log("Pendo Loading");
                            pendoInitializeOnLogin();
                        }else if($rootScope.white_label_active && !data.session.style.domain_name){
                            pendoInitializeOnLogin();
                        }
                    }
                    // dynamically inject the custom CSS styling into the document
                    if (data.session.style.white_label_css !== undefined &&
                        Object.keys(data.session.style.white_label_css).length > 0) {
                        DynamicCssInsertion.whiteLabelCSSInject(data.session.style.white_label_css,
                            data.session.style.org_logo, data.session.style.org_logo, false);
                        //var css = (data.session.style.org_logo ? ".navbar-brand { background:url('" + data.session.style.org_logo + "') no-repeat 0 0; }\n" +
                        //    ".login-logo { background:url('" + data.session.style.org_logo + "') no-repeat center center; }\n" : '');
                        //_.each(data.session.style.white_label_css, function (group) {
                        //    _.each(group, function(elem) {
                        //        css += elem.css + "\n";
                        //    });
                        //});
                        //var node = document.createElement('style');
                        //node.innerHTML = css;
                        //document.body.appendChild(node);
                    } else {
                        DynamicCssInsertion.whiteLabelCSSInject(null, null, null, false);
                    }
                    $window.sessionStorage.style = JSON.stringify(data.session.style);
                    localStorage.setItem("sessionStorageData", JSON.stringify($window.sessionStorage));

                } else { // failed to retrieve session data - re-login
                    $location.path('login');
                }
                return;
            });
    };

    OrgUnitLocal.getSessDataForReportEngine = function() {
        console.log('running getSessDataFromBackend');
        var apiRoute = this.getBaseURL() + '/v1/session';
        $http.get(apiRoute, this.getJsonConfig())
            .then(function(result) {
                if (result.data.result === 'success') {
                    console.log('ORG UNIT RESULT', result.data);
                    var data = result.data.json;
                    $window.sessionStorage.token = data.access_token;
                    $rootScope.levelOneOus = data.session.levelOneOus;
                    $window.sessionStorage.levelOneOus = JSON.stringify(data.session.levelOneOus);
                    $rootScope.currentOUId = $window.sessionStorage.currentOUId = data.session.ou_id;
                    $rootScope.currentOUName = $window.sessionStorage.currentOUName = data.session.ou_name;
                    $rootScope.currentOULevel = $window.sessionStorage.currentOULevel = 0;
                    $rootScope.topLevelOUId = $window.sessionStorage.topLevelOUId = data.session.tl_id;
                    $rootScope.userOULevel = $window.sessionStorage.userOULevel = data.session.user_ou_level;
                    $rootScope.highestOUId = $window.sessionStorage.highestOUId = data.session.ou_id;
                    $rootScope.highestOUName = $window.sessionStorage.highestOUName = data.session.ou_name;
                    $rootScope.userId = $window.sessionStorage.userId = data.session.user_id;
                    $rootScope.fullName = $window.sessionStorage.fullName = data.session.first_name + ' ' + data.session.last_name;
                    $rootScope.timezone = $window.sessionStorage.timezone = data.session.timezone;
                    $rootScope.billingId = $window.sessionStorage.billingId = data.session.billing_id;
                    $rootScope.billingOu = $window.sessionStorage.billingOu = data.session.billing_ou;
                } else {
                    $location.path('login');
                }
                return;
            });
    };

    OrgUnitLocal.getUserAccess = function(result) {
        console.log(result);
        //sdds
        var userAccess = {};
        var value;

        $.each(result, function(key, val) {
            value = val;
            if (isNaN(val)) { // not a numeric value - is either per record method or over threshold
                var parts = val.split(':');
                value = parts[0];

                if (parts.length !== 3) { // invalid number of parts received
                } else if (!isNaN(parts[1]) && !isNaN(parts[2])) { // is a threshold entry
                    userAccess[key + '_total'] = parts[1];
                    userAccess[key + '_threshold'] = parts[2];
                } else { // is a per record entry - lookup allowed records
                    userAccess[key + '_record_list'] = [];
                    /*var apiRoute = $rootScope.url + ':' + $rootScope.port + '/v1/recordlist/' + parts[1] + '/' + parts[2] + '/' + $rootScope.userId;
                     $http.get(apiRoute, this.getJsonConfig())
                     .then(function (result) {
                     var recordList = data.json;
                     userAccess[ key + '_record_list' ] = recordList; // set the record list
                     });
                     */
                }
            }
            userAccess[key] = value;
        });
        $window.sessionStorage.userAccess = JSON.stringify(userAccess);
        $rootScope.userAccess = userAccess;
        if(!$rootScope.targetURL){
            $rootScope.targetURL = window.location.href;
        }
		//check to see if the user was trying to get to a specific page and redirect there if so
		var urlParts = $rootScope.targetURL.split("#");
        if($rootScope.targetURL != '' && urlParts[1] != '' && urlParts[1] != '/login') window.location.href = $rootScope.targetURL;
        else $location.path("/");
    };

    OrgUnitLocal.getSessDataFromLocal = function() {
        if (!angular.isDefined($window.sessionStorage.currentOUId)) {
            return;
        }
        $rootScope.currentOUId = $window.sessionStorage.currentOUId;
        $rootScope.currentOUName = $window.sessionStorage.currentOUName;
        $rootScope.currentOULevel = $window.sessionStorage.currentOULevel;
        $rootScope.highestOUId = $window.sessionStorage.highestOUId;
        $rootScope.highestOUName = $window.sessionStorage.highestOUName;
        $rootScope.topLevelOUId = $window.sessionStorage.topLevelOUId;
        $rootScope.topLevelOUName = $window.sessionStorage.topLevelOUName;
        $rootScope.fullName = $window.sessionStorage.fullName;
        $rootScope.userOULevel = $window.sessionStorage.userOULevel;
        $rootScope.userAccess = ($window.sessionStorage.userAccess) ? JSON.parse($window.sessionStorage.userAccess): [];
        $rootScope.userId = $window.sessionStorage.userId;
        $rootScope.timezone = $window.sessionStorage.timezone;
        $rootScope.billingId = $window.sessionStorage.billingId;
        $rootScope.billingOu = $window.sessionStorage.billingOu;
        $rootScope.userEmail = $window.sessionStorage.userEmail;
        $rootScope.score_call = $window.sessionStorage.score_call;
        $rootScope.access_audio = $window.sessionStorage.access_audio ;
        $rootScope.is_migrated = $window.sessionStorage.is_migrated ;
        $rootScope.download_audio_enabled = (typeof $window.localStorage.download_audio_enabled === "boolean") ? $window.localStorage.download_audio_enabled : ($window.localStorage.download_audio_enabled.toLowerCase() === 'true');
        $rootScope.roleId = $window.sessionStorage.roleId;
        $rootScope.protect_caller_id = $window.sessionStorage.protect_caller_id;
        $rootScope.orglist = $window.sessionStorage.orglist;
        $rootScope.reports = ($window.sessionStorage.reports) ? JSON.parse($window.sessionStorage.reports) : [];
        $rootScope.levelOneOus = ($window.sessionStorage.levelOneOus) ? JSON.parse($window.sessionStorage.levelOneOus) : [];
        $rootScope.prompts = ($window.sessionStorage.prompts && $window.sessionStorage.prompts != 'undefined') ? JSON.parse($window.sessionStorage.prompts) : [];
        $rootScope.voicemails = ($window.sessionStorage.voicemails && $window.sessionStorage.voicemails != 'undefined') ? JSON.parse($window.sessionStorage.voicemails) : [];
        $rootScope.whispers = ($window.sessionStorage.whispers && $window.sessionStorage.whispers != 'undefined') ? JSON.parse($window.sessionStorage.whispers) : [];

        if($window.sessionStorage.activeConversation && $window.sessionStorage.activeConversation > 0){
            $rootScope.activeConversation = $window.sessionStorage.activeConversation;
        }
        if($window.sessionStorage.bc_ous){
            $rootScope.bc_ous = JSON.parse($window.sessionStorage.bc_ous);
        }else{
            $rootScope.bc_ous = [
                { "id": $rootScope.highestOUId, "name": $rootScope.highestOUName },
                { "id": null, "name": null },
                { "id": null, "name": null }
            ];
            $window.sessionStorage.bc_ous = JSON.stringify($rootScope.bc_ous);
        }
        // only set when used by a support admin
        if ($window.sessionStorage.supportToken !== undefined) {
            $rootScope.supportToken = $window.sessionStorage.supportToken;
        }
        
        if($window.sessionStorage.scope){
            OrgUnitLocal.getUserAccess(JSON.parse($window.sessionStorage.scope));
            $rootScope.scope = JSON.parse($window.sessionStorage.scope);
        }

        var apiRoute = this.getBaseURL() + '/v1/session/style/' + $rootScope.currentOUId;
        $http.get(apiRoute, this.getJsonConfig()).then(function(result) {
            if (result.data.result === 'success') {
                // set the support and chat settings
                $rootScope.white_label_active = result.data.json.white_label_active;
                if (Object.keys(result.data.json).length > 0) {
                    // $rootScope.supportURL = $window.sessionStorage.supportURL = result.data.json.support_url;
                    if(!result.data.json.support_url && !result.data.json.domain_name){
                        $rootScope.supportURL = $window.sessionStorage.supportURL = "https://knowledgebase.convirza.com";
                    }else{
                        $rootScope.supportURL = $window.sessionStorage.supportURL = result.data.json.support_url;
                    }
                    $rootScope.chatURL = $window.sessionStorage.chatURL = "https://support.convirza.com/customer/portal/chats/new"; //result.data.json.chat_url;
                    $rootScope.chatActive = $window.sessionStorage.chatActive = result.data.json.chat_active;
                } else {
                    $rootScope.chatURL = $window.sessionStorage.chatURL = "https://support.convirza.com/customer/portal/chats/new";
                    $rootScope.chatActive = $window.sessionStorage.chatActive = true;
                    $rootScope.supportURL = $window.sessionStorage.supportURL = "https://knowledgebase.convirza.com";
                }
                console.log("Is pendo loaded 4: ", $window.sessionStorage.loadedPendoScript);
                if($window.sessionStorage.loadedPendoScript && $window.sessionStorage.loadedPendoScript === 'YES'){
                    if(!$rootScope.white_label_active){
                        console.log("Pendo Loading");
                        pendoInitializeOnLogin();
                    }else if($rootScope.white_label_active && !result.data.json.domain_name){
                        pendoInitializeOnLogin();
                    }
                }
                $rootScope.feedbackURL = window.sessionStorage.feedbackURL = "https://convirza.uservoice.com?sso=" + window.sessionStorage.uservoiceSSO;
                // dynamically inject the custom CSS styling into the document
                if (!!result.data.json.white_label_css &&
                    Object.keys(result.data.json.white_label_css).length > 0) {
                    DynamicCssInsertion.whiteLabelCSSInject(result.data.json.white_label_css,
                        result.data.json.org_logo, result.data.json.org_logo, false);
                } else {
                    DynamicCssInsertion.whiteLabelCSSInject(null, null, null, false);
                }
            }
        });
    };
    OrgUnitLocal.getSessDataFromLocalStorage = function(sessionStorageData) {
        console.log('running getSessDataFromLocalStorage');
        var data = sessionStorageData;
        if(data && data.token && data.currentOUId && data.userId){
            $window.sessionStorage.token = data.token;
            $rootScope.levelOneOus = JSON.parse(data.levelOneOus);
            $window.sessionStorage.levelOneOus = JSON.stringify(data.levelOneOus);
            $rootScope.currentOUId = $window.sessionStorage.currentOUId = data.currentOUId;
            $rootScope.currentOUName = $window.sessionStorage.currentOUName = data.currentOUName;
            $rootScope.currentOULevel = $window.sessionStorage.currentOULevel = data.currentOULevel;
            $rootScope.topLevelOUId = $window.sessionStorage.topLevelOUId = data.topLevelOUId;
            $rootScope.userOULevel = $window.sessionStorage.userOULevel = data.userOULevel;
            $rootScope.highestOUId = $window.sessionStorage.highestOUId = data.highestOUId;
            $rootScope.highestOUName = $window.sessionStorage.highestOUName = data.highestOUName;
            $rootScope.userId = $window.sessionStorage.userId = data.userId;
            $rootScope.fullName = $window.sessionStorage.fullName = data.fullName;
            $rootScope.timezone = $window.sessionStorage.timezone = data.timezone;
            $rootScope.billingId = $window.sessionStorage.billingId = data.billingId;
            $rootScope.billingOu = $window.sessionStorage.billingOu = data.billingOu;
            $rootScope.userEmail = $window.sessionStorage.userEmail = data.userEmail;
            $rootScope.score_call = $window.sessionStorage.score_call = data.score_call;
            $rootScope.access_audio = $window.sessionStorage.access_audio = data.access_audio;
            $rootScope.is_migrated = $window.sessionStorage.is_migrated = data.is_migrated;
            $rootScope.download_audio_enabled = $window.localStorage.download_audio_enabled = data.download_audio_enabled;
            $rootScope.roleId = $window.sessionStorage.roleId = data.roleId;
            $rootScope.protect_caller_id = $window.sessionStorage.protect_caller_id = data.protect_caller_id;
            $rootScope.orglist = $window.sessionStorage.orglist = data.orglist;
            $window.sessionStorage.prompts = data.prompts;
            $window.sessionStorage.voicemails = data.voicemails;
            $window.sessionStorage.whispers = data.whispers;
            $rootScope.prompts = JSON.parse(data.prompts);
            $rootScope.voicemails = JSON.parse(data.voicemails);
            $rootScope.whispers = JSON.parse(data.whispers);
            $rootScope.reports = JSON.parse(data.reports);
            $window.sessionStorage.reports = JSON.stringify(data.reports);
            if(data.activeConversation && data.activeConversation > 0){
                $rootScope.activeConversation = $window.sessionStorage.activeConversation = data.activeConversation;
            }
            $rootScope.isSafari = $window.sessionStorage.isSafari = /constructor/i.test(window.HTMLElement) || (function(p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window.safari || safari.pushNotification);
            if(data.bc_ous){
                $rootScope.bc_ous = JSON.parse(data.bc_ous);
                $window.sessionStorage.bc_ous = data.bc_ous;
            }else{
                $rootScope.bc_ous = [
                    { "id": $rootScope.highestOUId, "name": $rootScope.highestOUName },
                    { "id": null, "name": null },
                    { "id": null, "name": null }
                ];
                $window.sessionStorage.bc_ous = JSON.stringify($rootScope.bc_ous);
            }

            
            // only set when used by a support admin
            if (data.supportToken !== undefined) {
                $rootScope.supportToken = $window.sessionStorage.supportToken = data.supportToken;
            }
            if(data.style){
                data.style = JSON.parse(data.style);
            }else{
                data.style = {};
            }
            
            if (data.style && Object.keys(data.style).length > 0) {
                // $rootScope.supportURL = $window.sessionStorage.supportURL = data.style.support_url;
                $rootScope.chatURL = $window.sessionStorage.chatURL = "https://support.convirza.com/customer/portal/chats/new"; //data.style.chat_url;
                $rootScope.chatActive = $window.sessionStorage.chatActive = data.style.chat_active;
            } else {
                $rootScope.chatURL = $window.sessionStorage.chatURL = "https://support.convirza.com/customer/portal/chats/new";
                $rootScope.chatActive = $window.sessionStorage.chatActive = true;
            }

            $rootScope.feedbackURL = $window.sessionStorage.feedbackURL = "https://convirza.uservoice.com?sso=" + $window.sessionStorage.uservoiceSSO;
            $rootScope.supportURL = $window.sessionStorage.supportURL = "https://knowledgebase.convirza.com";
            // set the user access list            
            if(data.scope){
                OrgUnitLocal.getUserAccess(JSON.parse(data.scope));
                $rootScope.scope = JSON.parse(data.scope);
            }
            // dynamically inject the custom CSS styling into the document
            if (data.style && data.style.white_label_css !== undefined &&
                Object.keys(data.style.white_label_css).length > 0) {
                DynamicCssInsertion.whiteLabelCSSInject(data.style.white_label_css,
                    data.style.org_logo, data.style.org_logo, false);
            } else {
                DynamicCssInsertion.whiteLabelCSSInject(null, null, null, false);
            }
        }else{
            $location.path('login');
        }
        
    };
    OrgUnitLocal.updateSessData = function(orgUnitId, orgUnitName, orgUnitLevel) {
        $rootScope.currentOUId = $window.sessionStorage.currentOUId = orgUnitId;
        $rootScope.currentOUName = $window.sessionStorage.currentOUName = orgUnitName;
        $rootScope.currentOULevel = $window.sessionStorage.currentOULevel = orgUnitLevel;
    };

    OrgUnitLocal.getSessData = function() {
        var sessionStorageData  = JSON.parse(localStorage.getItem("sessionStorageData"));        
        var is_from_phantom = $window.sessionStorage.is_from_phantom;
        if(is_from_phantom === 'true'){
            is_from_phantom = true;
        }else{
            is_from_phantom = false;
        }
        console.log("IS FROM PHANTOM : ", is_from_phantom);
        if (!angular.isDefined($window.sessionStorage.token)) { 
            $location.path('login');
        }
        if (angular.isDefined($window.sessionStorage.currentOUId) && !angular.isDefined($rootScope.currentOUId) && !is_from_phantom) {
            this.getSessDataFromLocal();
        } else if (!angular.isDefined($window.sessionStorage.currentOUId) && angular.isDefined($window.sessionStorage.token) && sessionStorageData !== null && angular.isDefined(sessionStorageData.currentOUId) && !is_from_phantom) {
            this.getSessDataFromLocalStorage(sessionStorageData);
        }else if (angular.isDefined($window.sessionStorage.token) && !angular.isDefined($window.sessionStorage.currentOUId) && sessionStorageData == null &&  !is_from_phantom) {
            this.getSessDataFromBackend();
        }else if(angular.isDefined($window.sessionStorage.token) && is_from_phantom){
            console.log("Logged in app as support admin");
            this.getSessDataForReportEngine();
        }
    };

    OrgUnitLocal.getLoggedInSessData = function() {
        var sessionStorageData  = JSON.parse(localStorage.getItem("sessionStorageData"));
        var is_from_phantom = $window.sessionStorage.is_from_phantom;
        if(is_from_phantom === 'true'){
            is_from_phantom = true;
        }else{
            is_from_phantom = false;
        }
        console.log("IS FROM PHANTOM : ", is_from_phantom);
        if (!angular.isDefined($window.sessionStorage.token)) { return; }
        if (angular.isDefined($window.sessionStorage.currentOUId) && !angular.isDefined($rootScope.currentOUId) && !is_from_phantom) {
            this.getSessDataFromLocal();
        } else if (angular.isDefined($window.sessionStorage.token) && sessionStorageData !== null && angular.isDefined(sessionStorageData.currentOUId) && !is_from_phantom) {
            this.getSessDataFromLocalStorage(sessionStorageData);
        }else if (angular.isDefined($window.sessionStorage.token) && !angular.isDefined($window.sessionStorage.currentOUId) && !is_from_phantom) {
            this.getSessDataFromBackend();
        } else if(angular.isDefined($window.sessionStorage.token) && is_from_phantom){
            console.log("Logged in app as support admin");
            this.getSessDataForReportEngine();
        }
        if($rootScope.loginState == 'loggedin'){
            location.href = '#/';
        }
    };
    return OrgUnitLocal;
})

.controller('OrgUnitController', ['$scope', 'OrgUnitWebService', 'UserWebService', 'VoicePromptService', '$rootScope', '$routeParams', '$http', 'pinesNotifications', '$timeout', "$q", '$compile', 'OrgUnitLocal', '$bootbox', '$uibModal',
    "$route","$location", "$window", "BreadcrumbWebService", "DNIWebService", "CampaignWebService", "TagWebService", "WhisperMessageService", "voicemailPromptService", "progressLoader", '$filter',
    function($scope, OrgUnitWebService, UserWebService, VoicePromptService, $rootScope, $routeParams, $http, pinesNotifications, $timeout, $q, $compile, OrgUnitLocal, $bootbox, $uibModal,
        $route, $location,$window, BreadcrumbWebService, DNIWebService, CampaignWebService, TagWebService, whisperMessageService, voicemailPromptService, progressLoader, $filter) {
        'use strict';

        // Check If CallAction As component Added
        if ($scope.userAccess.callaction === undefined || $scope.userAccess.callaction < 4) {
            $scope.callActionComponent = true;
        } else {
            $scope.callActionComponent = false;
        }
        // Check If DNI As component Added
        if ($scope.userAccess.dni === undefined || $scope.userAccess.dni < 4) {
            $scope.dniComponent = false;
			$scope.dni_status = false;
			$scope.shareDni = false
        } else {
            $scope.dniComponent = true;
            $scope.dni_status = true;
		}
		// Check If Voicemail As component Added
		if ($scope.userAccess.voicemail === undefined || $scope.userAccess.voicemail < 4) {
            $scope.voicemailComponent = false;
        } else {
            $scope.voicemailComponent = true;
		}
		console.log("ia m new Path is ", $location.path());
        if($rootScope.is_migrated == false || $rootScope.is_migrated == 'false'){
            console.log("Path is ", $location.path());
            if($location.path() == '/set-legacy-group'){
                location.href = '#/set-group';
            }else{
                $location.path('/set-legacy-group');
                //$location.search('id',$rootScope.editClickId);
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
        $scope.CurrentOUName = $rootScope.currentOUName;

        $scope.showSpamButton = false;
        $scope.showCaButton = false;
        $scope.enableSpam = true;
        $scope.isAdmin = true;
        $scope.enableConvAna = true;
        $scope.scoreAccess = false;
        $scope.postCallIVR = false;

        if ($scope.userAccess && $scope.userAccess.manualscorecard) {
            $scope.scoreAccess = true;
        }

        if ($scope.userAccess && $scope.userAccess.spamguard) {
            $scope.showSpambutton = true;
            $scope.enableSpam = true;
        }

        if ($scope.userAccess && $scope.userAccess.postcallivr > 4) {
            $scope.postIvrAccess = true;
        }else{
            $scope.postIvrAccess = false;
        }

        if ($scope.userAccess && $scope.userAccess.ca && !$scope.userAccess.blocked_recording) {
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
        if($rootScope.currentOUName.length > 50){
            var groupsReportName = $rootScope.currentOUName.slice(0,50) + " " + "groups" + " " + moment().format('YYYY-MM-DD');
            var usersReportName = $rootScope.currentOUName.slice(0,50) + " " + "users" + " " + moment().format('YYYY-MM-DD');
        }else{
        var groupsReportName = $rootScope.currentOUName + " " + "groups" + " " + moment().format('YYYY-MM-DD');
        var usersReportName = $rootScope.currentOUName + " " + "users" + " " + moment().format('YYYY-MM-DD');
        }
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
		
		$scope.TTSAgentIDVoicePromptSelected = true;
		$scope.TTSoutComePromtSelected = true;
		$scope.TTSsalesAmountVoiceSelected = true;
		$scope.TTSvoicemailGreetingsSelected = true;
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
                OrgUnitWebService.getFeatureSettings($rootScope.currentOUId).then(function(result) {
                    $scope.showFeatureControl = true;
                    if (result.data.status === "success") {
                        var data = result.data.json;

                        if (data.defaultData.length > 0) {
                            $scope.enableConvAna = data.defaultData[0].conversation_analytics_status;
							$scope.enableSpam = data.defaultData[0].spam_guard_status;
							if ($scope.dniComponent === true) {
								$scope.shareDni = data.defaultData[0].share_with_subgroup;
							}							
							else{
								$scope.shareDni = false
							}
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

                        
                        }
                         $(".featureSettingProgressLoader").hide();
                         $("#featureSettingProgressLoader").css("opacity","1");
                    }
                });
            }
        };

        // ========== Export Functionality Start============


        $scope.getGroupsHeader = function() { return ["Account", "Account OUID", "Account External ID", "Parent Group", "Parent Group OUID", "Parent Group External ID", "Group", "Group OUID", "Group External ID", "Industry", "Phone", "City", "State/Province", "Zip/Postal Code", "Enable Conversation Analytics", "Enable Spam Guard", "Share DNI Settings", "Host Domain", "Referring Website", "HTML Class", "Repeat Interval (in hours)", "Call Value", "Activate Voicemail", "Voicemail number of rings", "Overflow number of rings", "Custom Source 1", "Custom Source 2", "Custom Source 3", "Custom Source 4", "Custom Source 5", "Record Call", "Call Recording Disclaimer", "Voice Prompt", "Whisper Message", "Ring-to Phone Number", "Instant Insights", "Instant Insights Configuration", "Call Actions"]; };

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
			var response = OrgUnitWebService.getGroupsExportReport($scope.userAccess.orgunit, $rootScope.currentOUId);
			
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
							r: groupsExportData[i].share_dni_settings,
							rr: groupsExportData[i].host_domain ,
                            s: groupsExportData[i].referring_website,
                            t: groupsExportData[i].html_class,
							u: groupsExportData[i].repeat_interval,
							
							v: groupsExportData[i].call_value,
							w: groupsExportData[i].activate_voicemail,
							x: groupsExportData[i].voicemail_rings,
							y: groupsExportData[i].overflow_rings,
							
                        	z: groupsExportData[i].custom_source_name1,
                            aa: groupsExportData[i].custom_source_name2,
                            ab: groupsExportData[i].custom_source_name3,
                            ac: groupsExportData[i].custom_source_name4,
                            ad: groupsExportData[i].custom_source_name5,
                            ae: groupsExportData[i].record_call,
                            af: groupsExportData[i].call_recording_disclaimer,
                            ag: groupsExportData[i].voice_prompt,
                            ah: groupsExportData[i].whisper_message,
							ai: groupsExportData[i].ring_to_number,							
							aj: groupsExportData[i].is_post_call_ivr_enabled,
							ak: groupsExportData[i].post_call_ivr_option,
                            al: groupsExportData[i].call_action
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

        $scope.getUsersHeader = function() { return ["Account", "Account OUID", "Account External ID", "Parent Group", "Parent Group OUID", "Parent Group External ID", "Group", "Group OUID", "Group External ID", "First Name", "Last Name", "Email", "External Id", "Agent Ring-to", "Agent ID", "Role", "Status", "Access Audio", "Score Calls", "Group Access" , "Reporting Access"]; };

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

            var response = OrgUnitWebService.getUsersExportReport($scope.userAccess.orgunit, $rootScope.currentOUId);
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
                            t: usersExportData[i].group_access,
                            u: usersExportData[i].report_access
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

        $rootScope.$on('$locationChangeSuccess', function(){
            stopAudio();
        });
        
        $scope.saveDefaultGroupSetting = function() {
            if (!$scope.showSpambutton) {
                $scope.enableSpam = false;
            }

            if (!$scope.showCaButton) {
                $scope.enableConvAna = false;
            }

            var data = {
                defaultData: {
                    "org_unit_id": $scope.currentOUId,
                    "conversation_analytics_status": $scope.enableConvAna,
                    "spam_guard_status": $scope.enableSpam,
                    "share_with_subgroup": $scope.shareDni
                }
            };

            OrgUnitWebService.saveDefaultGroupSetting(data)
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
                OrgUnitWebService.getCallActions($scope.currentOUId).then(function(result) {
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
                       console.log("target",target);
                        $scope.ruleDropDown[1] = {
                            0: {
                                "fields": Object.keys(target)
                            }
                        };
                        console.log(" $scope.ruleDropDown[1]",$scope.ruleDropDown[1]);
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
                    $(".callActionSectionProgressLoader").hide();
                    $("#callActionSectionProgressLoader").css("opacity","1");
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


            // OrgUnitWebService.getcustomsource($scope.currentOUId).then(function(result) {
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


            OrgUnitWebService.getWebhooks($rootScope.currentOUId).then(function(result) {
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

		$scope.postCallIVR_status = '';
		$scope.outComePromtTTSText = ''
		$scope.salesAmountVoiceTTSText = ''
		$scope.call_Value = "3"; 
		$scope.activate_voicemail_status = false;
		$scope.dni_status = false;
		$scope.voicemailGreetingsTTSText = '';
		$scope.voicemail_rings_count = '3';
		$scope.overflow_rings_count = '3';
		$scope.AgentIDVoicePromptTTSText = '';
		//$scope.lengthOfAgentId = '3';

		$scope.postIVRTypes = [
			{
				name : 'Call Outcome (Conversion type)',
				value: 1
			},
			{
				name : 'Agent ID',
				value: 2
			},
			{
				name : 'Call Outcome and Agent ID',
				value: 3
			}
		];
		$scope.postIVRType = $scope.postIVRTypes[0].value;


        $scope.dniChange = function(){
            if(!$scope.dni_status){
                $scope.destination_url = '*.*';
                $scope.dni_element = 'CVZ_' + $scope.random6DigitNumber;
                $scope.dni_ttl = 'Select';
                $scope.dni_type = '';
            }
        } 

        $scope.saveDefaultCallFlowSetting = function() {			
            // $scope.ringtoErrorMsg = false;
            angular.element("#rinterval").removeClass("ng-invalid ng-dirty");
            angular.element("#rinterval").addClass("ng-valid");

            angular.element("#ringtonumber").removeClass("ng-invalid ng-dirty");
            angular.element("#ringtonumber").addClass("ng-valid");
            OrgUnitWebService.getDefaultCustomParams($rootScope.currentOUId)
                .then(function(result) {
                    if (result.data.status === "success") {
                        $scope.custom_params = result.data.json[0].custom_params;
                        console.log("Custom Param Source", $scope.custom_params);
                    }
                });
            var customsourceIds = [];
			var message, whisperMessage, errorMsg = false,
				voicePromptURL = '', whisperPromptURL = '',
				voicepromptId = null, whisperId = null,	
				promptMessageName = '', whisperMessageName = '';


			if ($scope.TTSSelected) {
                message = $scope.voicePromptTTSText;
            } else {
                message = "file://" + $scope.voicePromptFileName;
                promptMessageName = $scope.voicePromptText;
                voicePromptURL = $scope.voiceURL;
                voicepromptId = $scope.voicePromptId;
            }

            if ($scope.TTSWhisperSelected) {
                whisperMessage = $scope.whisperTTSText;
            } else {
                whisperMessage = "file://" + $scope.whisperFileName;
                whisperMessageName = $scope.whisperText;
                whisperPromptURL = $scope.whisperURL;
                whisperId = $scope.whisperId;
            }
            whisperMessage = whisperMessage === undefined ? "" : whisperMessage;
            _.each(customsourceArray, function(cs) {
                // console.log($scope[cs]);
                if ($scope[cs] !== null && $scope[cs].length > 0) {
                    customsourceIds.push(parseInt($scope[cs]));
                }
			});
			
			var voicemail_greeting_message = '';
			
			if($scope.TTSvoicemailGreetingsSelected){
				voicemail_greeting_message = $scope.voicemailGreetingsTTSText;
			}
			else{
				voicemail_greeting_message = "file://" + $scope.voicemailsFileName;
			}
			var postCallIVROject = preparePostCallIvrValue();

            //Split dni referrer and type
            if($scope.referrer){
                var temp = $scope.referrer.split("|");
                $scope.tempReferrer = temp[0];
                $scope.referrer_type = temp[1];
            }else{
                $scope.tempReferrer = '';
            }

            if (!$scope.referrer_type) $scope.referrer_type = null;
            var saveData = {
                callFlowData: {
					org_unit_id: $scope.currentOUId,
					// New Fields
					call_Value: $scope.call_Value,
					activate_voicemail_status: $scope.activate_voicemail_status,
					voicemail_rings_count: $scope.voicemail_rings_count,
					voicemail_greeting_message: voicemail_greeting_message,
					overflow_rings_count: $scope.overflow_rings_count,
					dni_status: $scope.dni_status,
					call_flow_recording_id: null,
					// New Fields end
                    recordcall: $scope.recordCall,
                    play_voice_prompt: $scope.voicePrompt1,
                    play_whisper_message: $scope.whisperPrompt1,
                    prompt_message: message,
                    whisper_message: whisperMessage,
                    play_disclaimer: ($scope.recordCall === true) ? $scope.playDisclaimer:'before',
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
				},
				postCallIvrValue: $scope.postIVRData
			
			};
            if ($scope.ringtoNum) {
                saveData.callFlowData.ringto = UserWebService.unMaskData($scope.ringtoNum.toString());
            }

            if (saveData.callFlowData.repeat_interval_call !== undefined && (saveData.callFlowData.repeat_interval_call > 8760 || saveData.callFlowData.repeat_interval_call === 0)) {
                errorMsg = true;
                // angular.element("#rinterval").addClass("ng-invalid ng-dirty");
                // angular.element("#rinterval").removeClass("ng-valid");
                    pinesNotifications.notify({
                    title: 'Tracking Number Settings',
                    text: "Repeat Interval is invalid",
                    type: 'error'
                });
            }

            if (saveData.callFlowData.ringto && saveData.callFlowData.ringto.length <= 9) {
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
            var errorsArrHash = OrgUnitWebService.validateDniData(saveData.dniSettingData, $scope.dni_status, $scope.showReferrerTextBox);
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
                    OrgUnitWebService.defaultCreateCallFlow(saveData)
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
                                    text: 'Successfully Saved Tracking Number Settings',
                                    type: 'success'

                                });
                            }

                        });
                }
            }
		};
		

		function preparePostCallIvrValue(){
			var keyPressMsgtype = 'text';
			var recordASaleMsgtype = 'text';
			var agentVoicePromtMsgtype = 'text';

			var keyPressMsg = $scope.outComePromtTTSText;
			var recordASaleMsg = $scope.salesAmountVoiceTTSText;
			var agentVoicePromtMsg = $scope.AgentIDVoicePromptTTSText;

			var noOfDigits = $scope.lengthOfAgentId;
			if(!$scope.TTSoutComePromtSelected){
				keyPressMsgtype = 'file';
				keyPressMsg = "file://" + $scope.outComePromtFileName;
			}

			if(!$scope.TTSsalesAmountVoiceSelected){
				recordASaleMsgtype = 'file';
				recordASaleMsg = "file://" + $scope.salesAmountVoicePromptFileName; 
			}
			
			if(!$scope.TTSAgentIDVoicePromptSelected){
				agentVoicePromtMsgtype = 'file';
				agentVoicePromtMsg = "file://" + $scope.AgentIDVoicePromptFileName;
			}

			switch($scope.postIVRType){
			case 1:                        
				$scope.postIVRData = {
					postCallIvrEnable: $scope.postCallIVR,
					type: "conversion",
					post_call_ivr_id: 1,
					prompts : [{
						type:'record_call_outcome',
						msgType: keyPressMsgtype,
						promt: keyPressMsg
					},
					{   type: 'record_a_sale',
						msgType: recordASaleMsgtype,
						promt: recordASaleMsg
					}]
				};
				break;
			case 2:
				$scope.postIVRData = {
					postCallIvrEnable: $scope.postCallIVR,
					type: "agentID",
					post_call_ivr_id: 2,                            
					prompts : [{
						type: 'record_agent_id',
						msgType: agentVoicePromtMsgtype,
						noOfDigits: noOfDigits,
						promt: agentVoicePromtMsg
					}]                            
				};
				break;
			case 3:
			$scope.postIVRData = {
				postCallIvrEnable: $scope.postCallIVR,
				type: "conversionAgentID",
				post_call_ivr_id: 3,
				prompts : [{
					type: 'record_agent_id',
					msgType: agentVoicePromtMsgtype,
					noOfDigits: noOfDigits,
					promt: agentVoicePromtMsg
				},
				{
					type:'record_call_outcome',
					msgType: keyPressMsgtype,
					promt: keyPressMsg
				},
				{   type: 'record_a_sale',
					msgType: recordASaleMsgtype,
					promt: recordASaleMsg
				}
				]
			};
			break;
			}
		}

        $scope.openTrackingNumberSection = function(open) {

            var dnielement = '';
            $scope.random6DigitNumber = Math.floor(Math.random() * 900000 + 100000);
            console.log("RandomNumber: ", $scope.random6DigitNumber);
            if (open) {

                OrgUnitWebService.getCallFlow($rootScope.currentOUId).then(function(result) {
                    if (result.data.status === 'success') {
                        if (result.data.json.callFlowData.length > 0) {

                            var val = result.data.json.callFlowData[0];
                            var message = result.data.json.callFlowData[0].play_voice_prompt_first_text;
                            var substring = message.substring(0, 7);

                            $scope.prompts = [];
                            for(var i=0;i<$rootScope.prompts.length;i++){
                                if($rootScope.prompts[i].active == true){
                                    $scope.prompts.push($rootScope.prompts[i]);
                                }
                            }
                            $scope.voicePrompt1 = val.play_voice_prompt_first;
                            if (substring == "file://") {
								var selectedprompt = ''
								message = message.substring(message.lastIndexOf("/") + 1, message.length)
								for (var j = 0; j < $rootScope.prompts.length; j++) {
								    var filename = $rootScope.prompts[j].filename;
								    if(filename == message){
                                        selectedprompt = $rootScope.prompts[j];
                                        $scope.TTSSelected = false;
                                        $scope.hasValidVoiceURL = true;
                                    }
											
								}
								$scope.voicePromptText = selectedprompt.name;
								$scope.voiceURL = selectedprompt.url;
								$scope.voicePromptFileName = selectedprompt.filename;

								$scope.voicePromptId = selectedprompt.id;
							}else {
                                    $scope.voicePromptTTSText = message;
                                    $scope.TTSSelected = true;
                            }
                            
                            var whisperMessage = result.data.json.callFlowData[0].play_whisper_message_text;
                            var whisperSubstring = whisperMessage.substring(0, 7);

                            $scope.whispers = [];
                            for(var i=0;i<$rootScope.whispers.length;i++){
                                if($rootScope.whispers[i].active == true){
                                    $scope.whispers.push($rootScope.whispers[i]);
                                }
                            }
                            
                            $scope.whisperPrompt1 = val.play_whisper_message;
                            if (whisperSubstring == "file://") {
                                var selectedwhisper = ''
                                whisperMessage = whisperMessage.substring(whisperMessage.lastIndexOf("/") + 1, whisperMessage.length)
                                for (var j = 0; j < $rootScope.whispers.length; j++) {
                                     var filename = $rootScope.whispers[j].filename;
                                     if(filename == whisperMessage){
                                        selectedwhisper = $rootScope.whispers[j];
                                        $scope.TTSWhisperSelected = false;
                                        $scope.hasValidWhisperURL = true;
                                        }
                                                                    
                                  }
                                    $scope.whisperText = selectedwhisper.name;
                                    $scope.whisperURL = selectedwhisper.url;
                                    $scope.whisperFileName = selectedwhisper.filename;

                                    $scope.whisperId = selectedwhisper.id;
                            }else {
                                $scope.TTSWhisperSelected = true;
                                
                                $scope.whisperTTSText = whisperMessage;
                            }
                    
							
								// Code for Voicemail new fields
							// *********************************************************************************************************
                            var voicemailMessage = (result.data.json.callFlowData[0].voicemail_greeting_message)?result.data.json.callFlowData[0].voicemail_greeting_message:"";	
                            var voicemailSubstring = voicemailMessage.substring(0, 7);
                            $scope.voicemails = [];
                            for(var i=0;i<$rootScope.voicemails.length;i++){
                                if($rootScope.voicemails[i].active == true){
                                    $scope.voicemails.push($rootScope.voicemails[i]);
                                }
                            }
							if($scope.voicemailComponent === true && $scope.voicemails.length > 0 && voicemailMessage !== null){
									
									var message = voicemailMessage.split("//")
									var file = message[1];
									var f_name = '';
									var url = '';
                                    if (voicemailSubstring == "file://") {
										for (var j = 0; j < $rootScope.voicemails.length; j++) {
											var filename = $rootScope.voicemails[j].filename;
											if(filename == file){
												filename = $rootScope.voicemails[j].filename;
												f_name = $rootScope.voicemails[j].name;
                                                url = $rootScope.voicemails[j].url;
                                                $scope.TTSvoicemailGreetingsSelected = false;
                                                $scope.hasValidVoicemailURL = true;
										    }
										}
										$scope.voicemailsTTSText = f_name;
										$scope.voicemailsFileName = file;
										$scope.voicemailurl = url;
										$scope.voicemailsId = val.ce_call_flow_recording_id;
									} else {
                                        $scope.TTSvoicemailGreetingsSelected = true;
                                        $scope.voicemailGreetingsTTSText = voicemailMessage;
                                    }
								}
								else{
									$scope.activate_voicemail_status = false;
                                    $scope.TTSvoicemailGreetingsSelected = true;
                                    if(voicemailSubstring != "file://"){
                                        $scope.voicemailGreetingsTTSText = result.data.json.callFlowData && ( result.data.json.callFlowData[0].voicemail_greeting_message === null || result.data.json.callFlowData[0].voicemail_greeting_message === undefined) ? '': result.data.json.callFlowData[0].voicemail_greeting_message ;
									}
									$scope.voicemail_rings_count = '3';
								}
								$scope.call_Value = result.data.json.callFlowData[0].call_value;				
								//$scope.activate_voicemail_status = result.data.json.callFlowData[0].activate_voicemail;
								// $scope.voicemail_rings_count = JSON.stringify(result.data.json.callFlowData[0].voicemail_rings);
								// $scope.overflow_rings_count = JSON.stringify(result.data.json.callFlowData[0].overflow_rings);



								if(result.data.json.callFlowData[0].activate_voicemail)
                                    $scope.activate_voicemail_status  = $scope.voicemailComponent == false ? false : result.data.json.callFlowData[0].activate_voicemail;
									//$scope.activate_voicemail_status  = result.data.json.callFlowData[0].activate_voicemail;
								else
									$scope.activate_voicemail_status = false;

								if(result.data.json.callFlowData[0].voicemail_rings)
									$scope.voicemail_rings_count  = result.data.json.callFlowData[0].voicemail_rings.toString();
								else
									$scope.voicemail_rings_count = '3';

								if(result.data.json.callFlowData[0].overflow_rings)
									$scope.overflow_rings_count  = result.data.json.callFlowData[0].overflow_rings.toString();
								else
									$scope.overflow_rings_count = '3';
 
                                if($scope.dniComponent === true){
                                    $scope.dni_status = result.data.json.defOrgComponentStatus[0].dni_status;
                                }else{
                                    $scope.dni_status = false;
                                }

                                if($scope.userAccess.postcallivr !== undefined && $scope.userAccess.postcallivr > 4){
                                    $scope.postCallIVR = result.data.json.defOrgComponentStatus[0].postcallivr_status;
                                }else{
                                    $scope.postCallIVR = false;
                                }
							// *********************************************************************************************************


                            $scope.recordCall = result.data.json.callFlowData[0].record_call;
							//$scope.voicePrompt1 = result.data.json.callFlowData[0].play_voice_prompt_first;
							//$scope.whisperPrompt1 = result.data.json.callFlowData[0].play_whisper_message;
                            // $scope.voicePromptTTSText = result.data.json.callFlowData[0].play_voice_prompt_first_text;
                            // $scope.whisperTTSText = result.data.json.callFlowData[0].play_whisper_message_text;
                            $scope.ringtoNum = result.data.json.callFlowData[0].ring_to_number;
                            $scope.playDisclaimer = result.data.json.callFlowData[0].play_disclaimer;
                            $scope.rinterval = result.data.json.callFlowData[0].repeat_interval_call;
                        }

						

						if ($scope.userAccess.postcallivr !== undefined && $scope.userAccess.postcallivr > 4 && result.data.json.postCallIVR && result.data.json.postCallIVR.length > 0) {
							var postCallIVRData = result.data.json.postCallIVR;
							$scope.postIVRType = result.data.json.postCallIVR[0].post_call_ivr_option_id;
							 for (var i = 0; i < postCallIVRData.length; i++) {
								switch (postCallIVRData[i].voice_prompt) {
									case 'record_call_outcome':
										var message = postCallIVRData[i].voice_prompt_value;
										var substring = message.substring(0, 7);
                                        $scope.TTSoutComePromtSelected = true;
										if (substring == "file://") {
											var selectedprompt = ''
											 message = message.substring(message.lastIndexOf("/") + 1, message.length)
											for (var j = 0; j < $rootScope.prompts.length; j++) {
												var filename = $rootScope.prompts[j].filename;
												if(filename == message){
                                                    selectedprompt = $rootScope.prompts[j];
                                                    $scope.TTSoutComePromtSelected = false;
                                                    $scope.hasValidoutComePromtURL = true;
                                                }
                                                    
											
											
											}
											$scope.outComePromtText = selectedprompt.name;
											$scope.outComePromtURL = selectedprompt.url;
											$scope.outComePromtFileName = selectedprompt.filename;

											$scope.outComePromtId = selectedprompt.id;
										} else {
											$scope.TTSoutComePromtSelected = true;
											// $scope.outComePromtTTSText = message.substring(6, message.length);
											$scope.outComePromtTTSText = message;

										}
										break;
									case 'record_a_sale':
										var message = postCallIVRData[i].voice_prompt_value;
                                        var substring = message.substring(0, 7);
                                        $scope.TTSsalesAmountVoiceSelected = true;

										if (substring == "file://") {
											var selectedprompt = ''
											message = message.substring(message.lastIndexOf("/") + 1, message.length)
											for (var j = 0; j < $rootScope.prompts.length; j++) {
												var filename = $rootScope.prompts[j].filename;
												if(filename == message){
                                                    selectedprompt = $rootScope.prompts[j];
                                                    $scope.hasValidsalesAmountVoiceURL = true;
                                                    $scope.TTSsalesAmountVoiceSelected = false;
                                                }
                                                    
											}
											
											$scope.salesAmountVoicePromptText = selectedprompt.name;
											$scope.salesAmountVoiceURL = selectedprompt.url;
											$scope.salesAmountVoicePromptFileName = selectedprompt.filename;

											
											$scope.salesAmountVoiceId = selectedprompt.id;
										} else {
											$scope.TTSsalesAmountVoiceSelected = true;
											// $scope.e = message.substring(6, message.length);
											$scope.salesAmountVoiceTTSText = message;

										}
										break; 
									case 'record_agent_id':
										var message = postCallIVRData[i].voice_prompt_value;
										$scope.lengthOfAgentId = JSON.stringify(postCallIVRData[i].number_of_digits);

                                        var substring = message.substring(0, 7);
                                        $scope.TTSAgentIDVoicePromptSelected = true;
                                        if (substring == "file://") {
											var selectedprompt = ''
											message = message.substring(message.lastIndexOf("/") + 1, message.length)
											for (var j = 0; j < $rootScope.prompts.length; j++) {
												var filename = $rootScope.prompts[j].filename;
												if(filename == message){
                                                    selectedprompt = $rootScope.prompts[j];
                                                    $scope.TTSAgentIDVoicePromptSelected = false;
                                                    $scope.hasValidAgentIDVoicePromptURL = true;
                                                }
                                                    
											
											}
											$scope.AgentIDVoicePromptText = selectedprompt.name;
											$scope.AgentIDVoicePromptURL = selectedprompt.url;
											$scope.AgentIDVoicePromptFileName = message;
											// $scope.salesAmountVoiceFileName = selectedprompt.filename;
											
											// $scope.salesAmountVoiceId = selectedprompt.id;
										} else {
											$scope.TTSAgentIDVoicePromptSelected = true;
											// $scope.AgentIDVoicePromptTTSText = message.substring(6, message.length);
											$scope.AgentIDVoicePromptTTSText = message;

										}
										break; 
										
									}
							}    

						} else{
							$scope.postIVRType = 1;

							$scope.TTSoutComePromtSelected = true;
							$scope.outComePromtTTSText = '';

							$scope.TTSsalesAmountVoiceSelected = true;
							$scope.salesAmountVoiceTTSText = '';

							$scope.TTSAgentIDVoicePromptSelected = true;
							$scope.AgentIDVoicePromptTTSText = '';
							$scope.lengthOfAgentId = '3';
						}
												

                        if (result.data.json.customSourceData.length > 0) {
                            _.each(result.data.json.customSourceData, function(cs) {
                                $scope[cs.custom_source_type] = cs.custom_source_id.toString();
                            });
                        }

                        if (result.data.json.dniSettingData.length > 0) {
							// $scope.dni_status = result.data.json.dniSettingData[0].dni_active;

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
                        $(".trackingNumberProgressLoader").hide();
                        $("#trackingNumberProgressLoader").css("opacity","1");
                    }
                });
            }
        };
        //---new code
        $scope.openCustomeSourceSection = function(open) {
            if (open) {
                OrgUnitWebService.getcustomsource($scope.currentOUId).then(function(result) {
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
                    $(".coustomSourceProgressLoader").hide();
                    $("#coustomSourceProgressLoader").css("opacity","1");
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
                    OrgUnitWebService.multiDeleteCustomSource({ custom_sources: deleCustId })
                        .then(function(result) {
                            console.log("delete result", result)
                            pinesNotifications.notify({
                                title: 'Default Custom Source Settings',
                                text: 'Successfully deleted the custom source',
                                type: 'success'
                            });
                            OrgUnitWebService.getcustomsource($scope.currentOUId).then(function(result) {
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
            OrgUnitWebService.customSource(customsource).then(function(result) {
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

                    OrgUnitWebService.getcustomsource($scope.currentOUId).then(function(result) {
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
            angular.element("#ringtonumber").removeClass("ng-invalid ng-dirty");
            $scope.voicePromptTTSText = '';
            $scope.whisperTTSText = '';
            $scope.TTSSelected = true;
            $scope.TTSWhipserSelected = true;
            $scope.destination_url = '*.*';
            $scope.referrer = '*.*|null';
            console.log("Previous:", $scope.dni_element);
            $scope.dni_element = 'CVZ_' + $scope.random6DigitNumber;
            console.log("Current:", $scope.dni_element);
            $scope.dni_ttl = 'Select';
            $scope.dni_type = '';
            $scope.custom_params = '';
			$scope.showReferrerTextBox = false;

			// New telephony Fields
			$scope.call_Value = null;
			$scope.activate_voicemail_status = false;
			$scope.voicemail_rings_count = '3';
			$scope.voicemailGreetingsTTSText = '';
			$scope.overflow_rings_count = '3';
			$scope.dni_status = false;
			$scope.postCallIVR = false;
			$scope.postIVRType = 1;

			$scope.outComePromtTTSText = '';
			$scope.salesAmountVoiceTTSText = '';
			$scope.AgentIDVoicePromptTTSText = '';
			$scope.lengthOfAgentId = '';

			$scope.outComePromtAudio = undefined;
			$scope.outComePromtText = '';
			$scope.outComePromtURL = undefined;                                    
			$scope.TTSoutComePromtSelected = true;
			$scope.hasValidoutComePromtURL = false;

			$scope.salesAmountVoiceAudio = undefined;
			$scope.salesAmountVoicePromptText = '';
			$scope.salesAmountVoiceURL = undefined;                                    
			$scope.TTSsalesAmountVoiceSelected = true;
			$scope.hasValidsalesAmountVoiceURL = false;

            		$scope.AgentIDVoicePromptAudio = undefined;
			$scope.AgentIDVoicePromptText = '';
			$scope.AgentIDVoicePromptURL = undefined;                                    
			$scope.TTSAgentIDVoicePromptSelected = true;
			$scope.hasValidAgentIDVoicePromptURL = false;
            
            		$scope.greetingAudio = undefined;
            		$scope.voicemailGreetingsTTSText = '';
            		$scope.voicemailurl = undefined;                                
			$scope.TTSvoicemailGreetingsSelected = true;
			$scope.hasValidVoicemailURL = false;
        };
        $scope.loadNextValue = function(oldVal, newVal, callActionIndex, key) {
            if (newVal == "fields") {
                var target = Object.assign({}, $scope.names.fields);
                delete target['Ring to Phone Number'];
                $scope.ruleDropDown[callActionIndex][key][newVal] = Object.keys(target);
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
                    OrgUnitWebService.saveCallActions(objSaveCallAction).then(function(result) {
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
                    OrgUnitWebService.updateCallActions(objSaveCallAction).then(function(result) {
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

        $http.get('assets/demo/call_actions.json').then(function(res) {
            $scope.names = res.data;
            console.log("$scope.names",$scope.names);
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

        $scope.addNewCallAction = function(cactionId) {
            var addedAction;
            cactionId = parseInt(cactionId);
            addedAction = {
                id: (cactionId + 1)
            };

            if (!$scope.addCallAction.callActionFormSubmitted[cactionId]) {
                $scope.saveCallAction(cactionId, true);
            } else {
                $scope.addCallAction.remainingText[cactionId + 1] = 1024 + " characters are remaining";
                $scope.callActions.push(addedAction);
                $scope.addCallAction.actionOptions[cactionId + 1] = "action0";
                var target = Object.assign({}, $scope.names.fields);
                delete target['Ring to Phone Number'];
                $scope.ruleDropDown[cactionId + 1] = {
                    0: {
                        "fields": Object.keys(target)
                    }
                };
                $scope.addCallAction.email[cactionId + 1] = [];
                $scope.addCallAction.rule[cactionId + 1] = {
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
                                OrgUnitWebService.removecallActions($scope.addCallAction.action_id[actionId], $scope.currentOUId).then(function(result) {
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





        //     OrgUnitWebService.getCallFlow($rootScope.currentOUId).then(function(result) {
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

        //       OrgUnitWebService.getwhisper($rootScope.currentOUId).then(function(result) {
        //           if (result.data.result != 'error') {
        //               $scope.whisperMessages = result.data.json;
        //               if ($scope.whisperMessages) {
        //                   for (var i = 0; i < $scope.whisperMessages.length; i++) {
        //                       $scope.whisperMessages.selectedprompt = false;
        //                   }
        //               }
        //           }
        //       });

        OrgUnitWebService.getIndustries().then(function(result) {
            var industryList;
            try {
                industryList = result.data.json;
            } catch (e) {
                industryList = [];
            }

            $scope.industryList = OrgUnitWebService.parseIndustries(industryList);
        });


        $scope.user = {
            name: 'awesome user'
        };
        // $scope.removeSelectedVoiceAudio = function() {
        //     // remove the text from the text field
        //     if ($scope.promptAudio !== undefined)
        //         $scope.promptAudio.pause();
        //     $scope.promptAudio = undefined;
        //     $scope.voiceURL = undefined;
        //     $scope.voicePromptTTSText = "";
        //     $scope.TTSSelected = true;
        //     $scope.hasValidVoiceURL = false;
        //     //$scope.voicetextChanged = false;
		// };
		
		$scope.removeSelectedVoiceAudio = function(element) {
			// remove the text from the text field
			switch(element){
				case 'voicePromt':
					if($scope.promptAudio !== undefined)
						$scope.promptAudio.pause();
					$scope.promptAudio = undefined;
					$scope.voiceURL = undefined;
					$scope.voicePromptTTSText = "";
					$scope.TTSSelected = true;
					$scope.hasValidVoiceURL = false;
				
					break;
				case 'voicemailGreetings':
					if($scope.greetingAudio !== undefined)
						$scope.greetingAudio.pause();
					$scope.greetingAudio = undefined;
					$scope.voicemailGreetingsText = '';
					$scope.VoiceMailGreetingURL = undefined;                                    
					$scope.TTSvoicemailGreetingsSelected = true;
                    $scope.hasValidvoicemailGreetingsURL = false;
                    $scope.hasValidVoicemailURL = false;
					break;
				case 'outComePromt':
					if($scope.outComePromtAudio !== undefined)
						$scope.outComePromtAudio.pause();
					$scope.outComePromtAudio = undefined;
					$scope.outComePromtText = '';
					$scope.outComePromtURL = undefined;                                    
					$scope.TTSoutComePromtSelected = true;
					$scope.hasValidoutComePromtURL = false;
					break;
				case 'salesAmountVoice':
				 if($scope.salesAmountVoiceAudio !== undefined)
						$scope.salesAmountVoiceAudio.pause();
					$scope.salesAmountVoiceAudio = undefined;
					$scope.salesAmountVoicePromptText = '';
					$scope.salesAmountVoiceURL = undefined;                                    
					$scope.TTSsalesAmountVoiceSelected = true;
					$scope.hasValidsalesAmountVoiceURL = false;
					break;
				case 'AgentIDVoicePrompt':
				 if($scope.AgentIDVoicePromptAudio !== undefined)
						$scope.AgentIDVoicePromptAudio.pause();
					$scope.AgentIDVoicePromptAudio = undefined;
					$scope.AgentIDVoicePromptText = '';
					$scope.AgentIDVoicePromptURL = undefined;                                    
					$scope.TTSAgentIDVoicePromptSelected = true;
					$scope.hasValidAgentIDVoicePromptURL = false;
					break;
			}

			
		};

        $scope.isVoiceModalOpen = false;
        $scope.disableVoiceClick = function() {
            $scope.isVoiceModalOpen = true;
        }
        $scope.showVoiceModal = function(event) {
			$scope.promtElement = event;
			var modalInstance = $uibModal.open({
				templateUrl: 'assets/partials/assignPrompt.html',
				controller: 'voiceModal',
				size: 'lg',
				backdrop: 'static',
				keyboard: false
			});
	
			modalInstance.result.then(function() {
				$scope.isVoiceModalOpen = false;
				//var prompts = VoicePromptService.getPrompts();
				for (var i = 0; i < VoicePromptService.prompts.length; i++) {
					if (VoicePromptService.prompts[i].selectedprompt === true) {
						switch($scope.promtElement){
							case 'voicePromt':
								$scope.voicePromptText = VoicePromptService.prompts[i].name;
								$scope.voicePromptFileName = VoicePromptService.prompts[i].filename;
								$scope.voicePromptId = VoicePromptService.prompts[i].id;
								$scope.voiceURL = VoicePromptService.prompts[i].url;
								$scope.promptAudio = undefined;
								$scope.prompts = VoicePromptService.prompts;
                                $scope.TTSSelected = false;

                                $scope.hasValidVoiceURL = true;
								$scope.voicePromptTTSText = '';
								break;
							// case 'voicemailGreetings':
							//     $scope.voicemailGreetingsText = VoicePromptService.prompts[i].name;
							//     $scope.voicemailGreetingsFileName = VoicePromptService.prompts[i].filename;
							//     $scope.voicemailGreetingsPromptId = VoicePromptService.prompts[i].id;
							//     $scope.VoiceMainGreetingURL = VoicePromptService.prompts[i].url;                                    
							//     $scope.voicemailGreetingspromptAudio = undefined;
	
							//     $scope.prompts = VoicePromptService.prompts;
							//     $scope.TTSvoicemailGreetingsSelected = false;
							//     $scope.hasValidvoicemailGreetingsURL = true;
							//     $scope.voicemailGreetingsTTSText = '';
							//     break;
							case 'outComePromt':
								$scope.outComePromtText = VoicePromptService.prompts[i].name;
								$scope.outComePromtFileName = VoicePromptService.prompts[i].filename;
								$scope.outComePromtId = VoicePromptService.prompts[i].id;
								$scope.outComePromtURL = VoicePromptService.prompts[i].url;                                                             
                                $scope.outComePromtAudio = undefined;
                                
                                $scope.prompts = VoicePromptService.prompts;
                                $scope.TTSoutComePromtSelected = false;
                                $scope.hasValidoutComePromtURL = true;
								$scope.outComePromtTTSText = '';
	
								break;
							case 'salesAmountVoice':
								$scope.salesAmountVoicePromptText = VoicePromptService.prompts[i].name;
								$scope.salesAmountVoicePromptFileName = VoicePromptService.prompts[i].filename;
								$scope.salesAmountVoicePromptId = VoicePromptService.prompts[i].id;
								$scope.salesAmountVoiceURL = VoicePromptService.prompts[i].url;                                    
								$scope.salesAmountVoiceAudio = undefined;
                                
                                $scope.prompts = VoicePromptService.prompts;
								$scope.hasValidsalesAmountVoiceURL = true;
                                $scope.TTSsalesAmountVoiceSelected = false;
                                $scope.salesAmountVoiceTTSText = '';
	
								break;
							case 'AgentIDVoicePrompt':
								$scope.AgentIDVoicePromptText = VoicePromptService.prompts[i].name;
								$scope.AgentIDVoicePromptFileName = VoicePromptService.prompts[i].filename;
								$scope.AgentIDVoicePromptId = VoicePromptService.prompts[i].id;
								$scope.AgentIDVoicePromptURL = VoicePromptService.prompts[i].url;                                   
                                $scope.AgentIDVoicePromptAudio = undefined;
                                
                                $scope.prompts = VoicePromptService.prompts;
                                $scope.hasValidAgentIDVoicePromptURL = true;
                                $scope.TTSAgentIDVoicePromptSelected = false;
								$scope.AgentIDVoicePromptTTSText = '';
								break;
						}
						
					}
				}
	
				// $scope.prompt = prompt;
				// $scope.TTSSelected = false;
				// $scope.hasValidVoiceURL = true;
				// $scope.voicePromptTTSText = '';
			}, function() {
				$scope.isVoiceModalOpen = false;
				console.log('Modal dismissed at: ' + new Date());
			});
	
		};

        // Reset fuctionality for Enable CA,Enable DNI,Enable Spamgura
        $scope.isWhisperModalOpen = false;
        $scope.disableWhisperClick = function() {
            $scope.isWhisperModalOpen = true;
        }
        $scope.showWhisperModal = function(size) {
            var modalInstance = $uibModal.open({
                templateUrl: 'assets/partials/assignWhisper.html',
                controller: 'whisperModal',
                size: size,
                backdrop: 'static',
                keyboard: false
            });

            modalInstance.result.then(function() {
                $scope.isWhisperModalOpen = false;
                var whispers = $rootScope.whispers;
                for (var i = 0; i < whispers.length; i++) {
                    if (whispers[i].selectedwhisper === true) {
                        $scope.whisperText = whispers[i].name;
                        $scope.whisperFileName = whispers[i].filename;
                        $scope.whisperId = whispers[i].id;
                        $scope.whisperURL = whispers[i].url;
                        $scope.whisperAudio = undefined;
                        $scope.hasValidWhisperURL = true;
                        $scope.TTSWhisperSelected = true;
                    }
                }

                $scope.whispers = whisperMessageService.whispers;
                $scope.TTSWhisperSelected = false;
                $scope.hasValidWhisperURL = true;
                $scope.whisperTTSText = '';
            }, function() {
                $scope.isWhisperModalOpen = false;
                console.log('Modal dismissed at: ' + new Date());
            });

		};


		$scope.showVoicemailModal = function(event) {
			$scope.voicemailElement = event;
			stopAudio();
			var modalInstance = $uibModal.open({
				templateUrl: 'assets/partials/assignVoicemail.html',
				controller: 'voicemailModel',
				size: 'lg',
				backdrop: 'static',
				keyboard: false
			});

			modalInstance.result.then(function() {
				for (var i = 0; i < voicemailPromptService.voicemails.length; i++) {
					if (voicemailPromptService.voicemails[i].selectedvoicemail === true) {
						$scope.voicemailsTTSText = voicemailPromptService.voicemails[i].name;
						$scope.voicemailsFileName = voicemailPromptService.voicemails[i].filename;
						$scope.voicemailsId = voicemailPromptService.voicemails[i].id;
						$scope.voicemailurl = voicemailPromptService.voicemails[i].url;
						$scope.hasValidVoiceURL = true;
						$scope.TTSvoicemailGreetingsSelected = true;
						$scope.promptAudio = undefined;
					}
				}
				$scope.voicemails = voicemailPromptService.voicemails;
				$scope.TTSvoicemailGreetingsSelected = false;
				$scope.hasValidVoicemailURL = true;
				$scope.voicemailGreetingsTTSText = '';
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
                    OrgUnitWebService.getTTS($scope.voicePromptTTSText).then(function(result) {
                        if (result.data.json.length > 1) {
                            var TTSData = result.data.json;
                            var source = "data:audio/mp3;base64," + TTSData;
                            $scope.promptAudio.src = source;
                            if ($scope.promptAudio.paused) {
                                $scope.promptAudio.play();
                            } else {
                                $scope.promptAudio.pause();
                            }
                            $scope.promptAudio.play();
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

        $scope.playVoiceAudioPromt = function(url,element) {
            switch (element) {
               case 'voicemailGreetings':
                     if ($scope.greetingAudio !== undefined && !$scope.greetingAudio.paused) {
						   $scope.greetingAudio.pause();
                       } else if ($scope.greetingAudio !== undefined && $scope.greetingAudio.paused) {
						   $scope.greetingAudio.play();
						   
                       } else {
                           if ($scope.voicemailGreetingsTTSText !== undefined && $scope.voicemailGreetingsTTSText.length > 0) {
                               $scope.greetingAudio = new Audio();
                               $scope.onTTS_VP_Request = true;
                               CampaignWebService.getTTS($scope.voicemailGreetingsTTSText).then(function(result) {
                                   if (result.data.json.length > 1) {
                                       var TTSData = result.data.json;
                                       var source = "data:audio/mp3;base64," + TTSData;
                                       $scope.greetingAudio.src = source;
                                       if ($scope.greetingAudio.paused) {
                                           $scope.greetingAudio.play();
                                       } else {
                                           $scope.greetingAudio.pause();
                                       }
                                   }
                                    $scope.onTTS_VP_Request = undefined;
                               });

                           } else {
                               $scope.greetingAudio = new Audio(url);
                               $scope.greetingAudio.play();
                           }
                       }

               break;

                 case 'outComePromt':
                     if ($scope.outComePromtAudio !== undefined && !$scope.outComePromtAudio.paused) {
                           $scope.outComePromtAudio.pause();
                       } else if ($scope.outComePromtAudio !== undefined && $scope.outComePromtAudio.paused) {
                           $scope.outComePromtAudio.play();
                       } else {

                           if ($scope.outComePromtTTSText !== undefined && $scope.outComePromtTTSText.length > 0) {
                               $scope.outComePromtAudio = new Audio();
                               $scope.onTTS_VP_Request = true;
                               CampaignWebService.getTTS($scope.outComePromtTTSText).then(function(result) {
                                   if (result.data.json.length > 1) {
                                       var TTSData = result.data.json;
                                       var source = "data:audio/mp3;base64," + TTSData;
                                       $scope.outComePromtAudio.src = source;
                                       if ($scope.outComePromtAudio.paused) {
                                           $scope.outComePromtAudio.play();
                                       } else {
                                           $scope.outComePromtAudio.pause();
                                       }
                                   }
                                    $scope.onTTS_VP_Request = undefined;
                               });

                           } else {
                               $scope.outComePromtAudio = new Audio(url);
                               $scope.outComePromtAudio.play();
                           }
                       }

               break;

                 case 'salesAmountVoice':
                     if ($scope.salesAmountVoiceAudio !== undefined && !$scope.salesAmountVoiceAudio.paused) {
                           $scope.salesAmountVoiceAudio.pause();
                       } else if ($scope.salesAmountVoiceAudio !== undefined && $scope.salesAmountVoiceAudio.paused) {
                           $scope.salesAmountVoiceAudio.play();
                       } else {

                           if ($scope.salesAmountVoiceTTSText !== undefined && $scope.salesAmountVoiceTTSText.length > 0) {
                               $scope.salesAmountVoiceAudio = new Audio();
                               $scope.onTTS_VP_Request = true;
                               CampaignWebService.getTTS($scope.salesAmountVoiceTTSText).then(function(result) {
                                   if (result.data.json.length > 1) {
                                       var TTSData = result.data.json;
                                       var source = "data:audio/mp3;base64," + TTSData;
                                       $scope.salesAmountVoiceAudio.src = source;
                                       if ($scope.salesAmountVoiceAudio.paused) {
                                           $scope.salesAmountVoiceAudio.play();
                                       } else {
                                           $scope.salesAmountVoiceAudio.pause();
                                       }
                                   }
                                    $scope.onTTS_VP_Request = undefined;
                               });

                           } else {
                               $scope.salesAmountVoiceAudio = new Audio(url);
                               $scope.salesAmountVoiceAudio.play();
                           }
                       }

               break;
                 case 'AgentIDVoicePrompt':
                     if ($scope.AgentIDVoicePromptAudio !== undefined && !$scope.AgentIDVoicePromptAudio.paused) {
                           $scope.AgentIDVoicePromptAudio.pause();
                       } else if ($scope.AgentIDVoicePromptAudio !== undefined && $scope.AgentIDVoicePromptAudio.paused) {
                           $scope.AgentIDVoicePromptAudio.play();
                       } else {

                           if ($scope.AgentIDVoicePromptTTSText !== undefined && $scope.AgentIDVoicePromptTTSText.length > 0) {
                               $scope.AgentIDVoicePromptAudio = new Audio();
                               $scope.onTTS_VP_Request = true;
                               CampaignWebService.getTTS($scope.AgentIDVoicePromptTTSText).then(function(result) {
                                   if (result.data.json.length > 1) {
                                       var TTSData = result.data.json;
                                       var source = "data:audio/mp3;base64," + TTSData;
                                       $scope.AgentIDVoicePromptAudio.src = source;
                                       if ($scope.AgentIDVoicePromptAudio.paused) {
                                           $scope.AgentIDVoicePromptAudio.play();
                                       } else {
                                           $scope.AgentIDVoicePromptAudio.pause();
                                       }
                                   }
                                    $scope.onTTS_VP_Request = undefined;
                                });

                           } else {
                               $scope.AgentIDVoicePromptAudio = new Audio(url);
                               $scope.AgentIDVoicePromptAudio.play();
                           }
                       }

               break;

       }             
       
        };

        $scope.playWhisperAudio = function(url) {



            if ($scope.whisperAudio !== undefined && !$scope.whisperAudio.paused) {
                $scope.whisperAudio.pause();
            } else if ($scope.whisperAudio !== undefined && $scope.whisperAudio.paused) {
                $scope.whisperAudio.play();
            } else {
                if ($scope.whisperTTSText !== undefined && $scope.whisperTTSText.length > 0) {
                    $scope.whisperAudio = new Audio();
                    $scope.onTTS_WH_Request = true;
                    OrgUnitWebService.getTTS($scope.whisperTTSText).then(function(result) {
                        if (result.data.json.length > 1) {
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

		$scope.voiceTextChange = function(event) {               
			$scope.promtElement = event;
			 switch($scope.promtElement){
				case 'voicePromt':
						$scope.promptAudio = undefined;
						if ($scope.voicePromptTTSText === undefined || $scope.voicePromptTTSText.length === 0) {
							$scope.hasValidVoiceURL = false;
							$scope.TTSSelected = true;
						} else {
                            $scope.chkSpclChar($scope.voicePromptTTSText, 'Voice Prompt', function(t){
                                $scope.voicePromptTTSText = t;
                                $scope.hasValidVoiceURL = true;
                                $scope.TTSSelected = true;
                            });
                        }
                        break;
                    case 'voicemailGreetings':
                        $scope.greetingAudio = undefined;
                            if ($scope.voicemailGreetingsTTSText === undefined || $scope.voicemailGreetingsTTSText.length === 0) {
                                $scope.hasValidvoicemailGreetingsURL = false;
                                $scope.TTSvoicemailGreetingsSelected = true;
                            } else {
                                $scope.chkSpclChar($scope.voicemailGreetingsTTSText, 'Voicemail Greetings', function(t){
                                    $scope.voicemailGreetingsTTSText = t;
                                    $scope.hasValidvoicemailGreetingsURL = true;
                                    $scope.TTSvoicemailGreetingsSelected = true;
                                });
                            }
                        break;
                    case 'outComePromt':
						$scope.outComePromtAudio = undefined;
						if ($scope.outComePromtTTSText === undefined || $scope.outComePromtTTSText.length === 0) {
							$scope.hasValidoutComePromtURL = false;
							$scope.TTSoutComePromtSelected = true;
						} else {
                            $scope.chkSpclChar($scope.outComePromtTTSText, 'Voice prompt for Call outcome', function(t){
                                $scope.outComePromtTTSText = t;
                                $scope.hasValidoutComePromtURL = true;
							    $scope.TTSoutComePromtSelected = true;
                            });
                        }
					break;
					 case 'salesAmountVoice':
						$scope.salesAmountVoiceAudio = undefined;
						if ($scope.salesAmountVoiceTTSText === undefined || $scope.salesAmountVoiceTTSText.length === 0) {
							$scope.hasValidsalesAmountVoiceURL = false;
							$scope.TTSsalesAmountVoiceSelected = true;
						} else {
                            $scope.chkSpclChar($scope.salesAmountVoiceTTSText, 'Sale amount voice prompt', function(t){
                                $scope.salesAmountVoiceTTSText = t;
                                $scope.hasValidsalesAmountVoiceURL = true;
							    $scope.TTSsalesAmountVoiceSelected = true;
                            });
                        }
					break;
					 case 'AgentIDVoicePrompt':
				   $scope.AgentIDVoicePromptAudio = undefined;
						if ($scope.AgentIDVoicePromptTTSText === undefined || $scope.AgentIDVoicePromptTTSText.length === 0) {
							$scope.hasValidAgentIDVoicePromptURL = false;
							$scope.TTSAgentIDVoicePromptSelected = true;
						} else {
                            $scope.chkSpclChar($scope.AgentIDVoicePromptTTSText, 'Agent ID voice prompt', function(t){
                                $scope.AgentIDVoicePromptTTSText = t;
                                $scope.hasValidAgentIDVoicePromptURL = true;
							    $scope.TTSAgentIDVoicePromptSelected = true;
                            });
                        }
					break;
				}
		};

        $scope.whisperTextChange = function() {
            $scope.whisperAudio = undefined;
            if ($scope.whisperTTSText === undefined || $scope.whisperTTSText.length === 0) {
                $scope.hasValidWhisperURL = false;
                $scope.TTSWhisperSelected = true;
            } else {
                $scope.chkSpclChar($scope.whisperTTSText, 'Whisper Message', function(t){
                    $scope.whisperTTSText = t;
                    $scope.hasValidWhisperURL = true;
                    $scope.TTSWhisperSelected = true;
                });
            }
        };


        $scope.audioIsPlaying = function(origin) {
			if (origin != 'whisper' && $scope.whisperAudio !== undefined && !$scope.whisperAudio.paused && !$scope.whisperAudio.ended)
				return true;
			if (origin != 'prompt' && $scope.promptAudio !== undefined && !$scope.promptAudio.paused && !$scope.promptAudio.ended)
				return true;
			if (origin != 'ivr' && $scope.ivrAudio !== undefined && !$scope.ivrAudio.paused && !$scope.ivrAudio.ended)
				return true;
			if (origin != 'greeting' && $scope.greetingAudio !== undefined && !$scope.greetingAudio.paused && !$scope.greetingAudio.ended)
				return true;
			if (origin != 'calloutcome' && $scope.outComePromtAudio !== undefined && !$scope.outComePromtAudio.paused && !$scope.outComePromtAudio.ended)
				return true;
			if (origin != 'agentid' && $scope.AgentIDVoicePromptAudio !== undefined && !$scope.AgentIDVoicePromptAudio.paused && !$scope.AgentIDVoicePromptAudio.ended)
				return true;
			if (origin != 'sale' && $scope.salesAmountVoiceAudio !== undefined && !$scope.salesAmountVoiceAudio.paused && !$scope.salesAmountVoiceAudio.ended)
				return true;
			return false;
		}

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
                (parseInt($rootScope.userAccess.orgunit) === 7)) {
                $scope.canDeleteOU = true;
            }
        };

        $scope.determineDisabilityDeleteBtn();

        $scope.deleteThisOU = function() {
            $scope.isDeleteClicked = true;
            var promptWarningStr, res;

            // Make sure user has permission to proceed
            if (parseInt($rootScope.userAccess.orgunit) !== 7) {
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

            OrgUnitWebService.infoAboutOuAndChildren($rootScope.currentOUId).then(function(result) {
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
                    "(", promptInfo.scoreCardCount, ") Scorecards<br>",
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
                    OrgUnitWebService.deleteOU($rootScope.currentOUId).then(function(resp) {

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

                        return OrgUnitWebService.getOULevel(parentOuInfo.org_unit_id);

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
            }); // end OrgUnitWebService.infoAboutOuAndChildren()
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
        OrgUnitWebService.getOrgUnitById($rootScope.currentOUId)
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
                    $(".groupDetailsProgressLoader").hide();
                    $("#groupDetailsProgressLoader").css("opacity","1");
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
            $scope.companyName = $scope.companyName.trim()
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
                OrgUnitWebService.createOrgUnit(ouData)
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
                if($rootScope.currentOUName === $rootScope.highestOUName){
                    $rootScope.highestOUName = $rootScope.currentOUName = ouData.orgUnit.org_unit_name;
                    $rootScope.levelOneOus[0].name = $rootScope.currentOUName;
                }
                if ($rootScope.currentOUName === ouData.orgUnit.org_unit_name) {
                    pinesText = ouData.orgUnit.org_unit_name + ' updated.';
                } else {
                    pinesText = $rootScope.currentOUName + '  (now ' + ouData.orgUnit.org_unit_name +
                        ') updated.';
                    $rootScope.currentOUName = ouData.orgUnit.org_unit_name;
                    //need to call memcache to update its current name
                    //OrgUnitLocal.setCurrentViewingOU($rootScope.currentOUId, ouData.orgUnit.org_unit_name);

                }
                OrgUnitWebService.updateOrgUnit(ouData)
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
                            $rootScope.$emit('current-ou-updated', {
                                'id': parseInt($rootScope.currentOUId),
                                'level': parseInt($rootScope.currentOULevel),
                                'billing_id': parseInt($rootScope.billing_id),
                                'parent_id': parseInt($rootScope.parent_id)
                            });
                            var locStorageData = JSON.parse(localStorage.getItem("sessionStorageData"));
                            locStorageData.currentOUName = $rootScope.currentOUName;
                            locStorageData.highestOUName = $rootScope.highestOUName;
                            locStorageData.levelOneOus = JSON.parse(locStorageData.levelOneOus);
                            locStorageData.levelOneOus[0].name = $rootScope.currentOUName;
                            locStorageData.levelOneOus = JSON.stringify(locStorageData.levelOneOus);
                            localStorage.setItem("sessionStorageData", JSON.stringify(locStorageData));
                            pinesNotifications.notify({
                                title: 'Company Details',
                                text: pinesText,
                                type: 'success'
                            });
                            var groupObject={
                                org_unit_id: ouData.orgUnit.org_unit_id,
                                org_unit_name:ouData.orgUnit.org_unit_name,
                                type:'group'
                            }
                            $scope.$emit('campaignOrGroupUpdateSms', {campaignOrGroupObject: groupObject});
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


.controller('SubOrgUnitController', ['$scope', 'OrgUnitWebService', '$rootScope', '$routeParams', 'pinesNotifications', 'OrgUnitLocal', '$bootbox',
    "$route", "$filter", "BreadcrumbWebService", "$window", 'DynamicCssInsertion', 'paginationService',
    function($scope, OrgUnitWebService, $rootScope, $routeParams, pinesNotifications, OrgUnitLocal, $bootbox,
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

        OrgUnitWebService.getChildrenOUs($rootScope.currentOUId)
            .success(function(result) {
                //console.log(result);
                for (var x in result.json) {
                    $scope.subgroups.push(result.json[x]);
                    //console.log(ou)
                }
                $scope.totalSubGroupsRows=$scope.subgroups.length;
                $(".subGroupProgressLoader").hide();
                $("#subGroupProgressLoader").css("opacity","1");
                $(".table>tbody>tr>td").css("border-top","1px solid #e9ecf0");
            })
            .error(function(err) {
                console.log('err fetching children');
                console.log(err);
            });

        $scope.industries = [];

        //get list of industires
        OrgUnitWebService.getIndustries().then(function(result) {
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
            if (parseInt($rootScope.userAccess.orgunit) !== 7) {
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

            OrgUnitWebService.infoAboutOuAndChildren(ouid).then(function(result) {
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
                    OrgUnitWebService.deleteOU(ouid).then(function(resp) {

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
                        $scope.totalSubGroupsRows=$scope.subgroups.length;
                        if (!parentOuInfo) {
                            pinesNotifications.notify({
                                title: "Delete Group",
                                text: "No parent data supplied by server.",
                                type: "error"
                            });
                            return;
                        }

                        return OrgUnitWebService.getOULevel(parentOuInfo.org_unit_id);

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
            }); // end OrgUnitWebService.infoAboutOuAndChildren()
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
                OrgUnitWebService.updateOrgUnit(saveData).then(function(result) {
                    //$scope.addsubgroupInProcess = false;
                    $scope.isReadonly = false;
                    if (result.data.result === 'success') {
                        //angular.extend(data, {id: id});
                        pinesNotifications.notify({
                            title: "Sub-groups",
                            text: "Sub-group " + saveData.orgUnit.org_unit_name + " is updated successfully.",
                            type: "success"
                        });
                        var groupObject={
                            org_unit_id: saveData.orgUnit.org_unit_id,
                            org_unit_name:saveData.orgUnit.org_unit_name,
                            type:'group'
                        }
                        $scope.$emit('campaignOrGroupUpdateSms', {campaignOrGroupObject: groupObject});

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
                OrgUnitWebService.createOrgUnit(saveData).then(function(result) {
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
                            text: "Sub-group " + saveData.orgUnit.org_unit_name + " is created successfully.",
                            type: "success"
                        });
                        $scope.totalSubGroupsRows=$scope.subgroups.length;
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
                    OrgUnitWebService.getStyle(id).then(function(result) {
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
