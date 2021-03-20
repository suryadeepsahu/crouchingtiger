//jshint ignore:start
//Branch created for CT-22017
angular
    .module('campaigns-builder', ['angularFileUpload', 'kendo.directives', 'ui.select2', 'toggle-switch', 'angularUtils.directives.dirPagination', "api-param", "report-components" ,"datetime-timezoned", "ngTagsInput","theme.form-directives"])
    .directive('file','tooltip', function() {
        return {
            scope: {
                file: '='
            },
            link: function(scope, el, attrs,element) {
                el.bind('change', function(event) {
                    var files = event.target.files;
                    var file = files[0];
                    scope.file = file ? file.name : undefined;
                    scope.$apply();
                });
                element.hover(function(){
                    // on mouseenter
                    element.tooltip('show');
                }, function(){
                    // on mouseleave
                    element.tooltip('hide');
                });
            }
        };
    })
    .factory('CampaignWebService', function($q, $timeout, $http, $window, $rootScope, $upload, ApiParam) {
        'use strict';
        var CampaignWebService = {};
        CampaignWebService.getCampaigns = function(userAccess, pageSize) {
            $http.defaults.useXDomain = true;
            return $http.get(ApiParam.baseURL() + "/v1/campaign/ouid/" + $rootScope.currentOUId + "/userAccess/" + userAccess + "/" + encodeURIComponent($rootScope.timezone) + "/pageSize/" + pageSize, ApiParam.headerConfig());

        };

        CampaignWebService.getCampaign = function(id, page) {
            $http.defaults.useXDomain = true;
            return $http.get(ApiParam.baseURL() + "/v1/campaign/" + id + "/" + encodeURIComponent($rootScope.timezone) + "?page=" + page , ApiParam.headerConfig());
        };
        //SP campaigndata for report
        CampaignWebService.getCampaignsReport = function(userAccess, pageSize) {
            $http.defaults.useXDomain = true;
            return $http.get(ApiParam.baseURL() + "/v1/campaign/reportData/ouid/" + $rootScope.currentOUId + "/userAccess/" + userAccess + "/" + encodeURIComponent($rootScope.timezone), ApiParam.headerConfig());

        };

        CampaignWebService.saveBulkCallActions = function(ca) {
            var req = {
                method: 'POST',
                url: ApiParam.baseURL() + "/v1/callAction/bulk",
                headers: ApiParam.headerConfig().headers,
                data: ca
            };
            return $http(req);
        };
        //SP campaign Tracking Number details

        CampaignWebService.getCampaignsCallFlowReport = function(userAccess, campId) {
            $http.defaults.useXDomain = true;
            if(campId){
                return $http.get(ApiParam.baseURL() + "/v1/campaign/reportData/ouid/" + $rootScope.currentOUId + "/userAccess/" + userAccess + "/" + encodeURIComponent($rootScope.timezone) + "?camp_id=" + campId, ApiParam.headerConfig());
                
            }else{
               return $http.get(ApiParam.baseURL() + "/v1/campaign/reportData/ouid/" + $rootScope.currentOUId + "/userAccess/" + userAccess + "/" + encodeURIComponent($rootScope.timezone), ApiParam.headerConfig());
            }
        };
        //SPservice
        CampaignWebService.getCampaignCallflows = function(campaignIds) {
            var req = {
                method: 'POST',
                url: ApiParam.baseURL() + "/v1/campaignCallflow",
                headers: ApiParam.headerConfig().headers,
                data: campaignIds
            };
            return $http(req);
        };

        CampaignWebService.showCall = function(camo) {
            var req = {
                method: 'POST',
                url: ApiParam.baseURL() + "/v1/campaign",
                headers: ApiParam.headerConfig().headers,
                data: nc
            };
            return $http(req);
        };

        CampaignWebService.createCampaign = function(nc) {
            var req = {
                method: 'POST',
                url: ApiParam.baseURL() + "/v1/campaign",
                headers: ApiParam.headerConfig().headers,
                data: nc
            };
            return $http(req);
        };

        CampaignWebService.createNumberPool = function(numberPool) {
            var req = {
                method: 'POST',
                url: ApiParam.baseURL() + "/v1/numberpool",
                headers: ApiParam.headerConfig().headers,
                data: numberPool
            };
            return $http(req);
        };

        CampaignWebService.updateNumberPool = function(numberPool, pool_id) {
            var req = {
                method: 'PUT',
                url: ApiParam.baseURL() + "/v1/numberpool/" + pool_id,
                headers: ApiParam.headerConfig().headers,
                data: numberPool
            };
            return $http(req);
        };

        CampaignWebService.updateCampaign = function(campaignData) {
            var req = {
                method: 'PUT',
                url: ApiParam.baseURL() + "/v1/campaign/",
                headers: ApiParam.headerConfig().headers,
                data: campaignData
            };
            return $http(req);
        };

        CampaignWebService.setCampaignStatus = function(nc) {
            var req = {
                method: 'PUT',
                url: ApiParam.baseURL() + "/v1/campaign/status",
                headers: ApiParam.headerConfig().headers,
                data: nc
            };
            return $http(req);
        };

        CampaignWebService.getPhoneNumbers = function(city, state, npa) {
            $http.defaults.useXDomain = true;
            return $http.get(ApiParam.baseURL() + "/v1/phonenumber/city/" + city + "/state/" + state + "/npa/" + npa, ApiParam.headerConfig());

        };

        CampaignWebService.getReservedNumbers = function() {
            $http.defaults.useXDomain = true;
            return $http.get(ApiParam.baseURL() + "/v1/phonenumber/reserved/" + $rootScope.currentOUId, ApiParam.headerConfig());
        };

        CampaignWebService.getPhoneNumber = function(number) {
            $http.defaults.useXDomain = true;
            return $http.get(ApiParam.baseURL() + "/v1/phonenumber/number/" + number, ApiParam.headerConfig());

        };

        CampaignWebService.createCallFlow = function(cf) {
            var req = {
                method: 'POST',
                url: ApiParam.baseURL() + "/v1/provisionedroute",
                headers: ApiParam.headerConfig().headers,
                data: cf
            };
            return $http(req);
        };

        CampaignWebService.saveCallFlow = function(cf) {
            var req = {
                method: 'PUT',
                url: ApiParam.baseURL() + "/v1/provisionedroute",
                headers: ApiParam.headerConfig().headers,
                data: cf
            };
            return $http(req);
        };

        CampaignWebService.getGeoCity = function(val) {
            $http.defaults.useXDomain = true;
            return $http.get(ApiParam.baseURL() + "/v1/geolookup/cities/" + val, ApiParam.headerConfig());
        };

        CampaignWebService.getGeoZip = function(val) {
            $http.defaults.useXDomain = true;
            return $http.get(ApiParam.baseURL() + "/v1/phonenumber/zip/" + val, ApiParam.headerConfig());

        };

        CampaignWebService.getDefaultData = function(ouid) {
            $http.defaults.useXDomain = true;
            return $http.get(ApiParam.baseURL() + "/v1/defgroupsetting/populatecallflow/" + ouid, ApiParam.headerConfig());

        };

        CampaignWebService.getGeoArea = function(val) {
            $http.defaults.useXDomain = true;
            return $http.get(ApiParam.baseURL() + "/v1/phonenumber/npa/" + val, ApiParam.headerConfig());
        };

        CampaignWebService.getCompUsers = function(id) {
            $http.defaults.useXDomain = true;
            return $http.get(ApiParam.baseURL() + "/v1/user/campaignUser/" + id, ApiParam.headerConfig());
        };

        CampaignWebService.getCampOwners = function(id, campId) {
            $http.defaults.useXDomain = true;
            return $http.get(ApiParam.baseURL() + "/v1/user/campaignOwner/" + $rootScope.currentOUId + "/" + campId, ApiParam.headerConfig());
        };

        CampaignWebService.getChannels = function() {
            $http.defaults.useXDomain = true;
            return $http.get(ApiParam.baseURL() + "/v1/channel", ApiParam.headerConfig());
        };

        CampaignWebService.getprovRouteCallFlow = function(id) {
            $http.defaults.useXDomain = true;
            return $http.get(ApiParam.baseURL() + "/v1/callflow/provisionedroute/" + id, ApiParam.headerConfig());
        };

        CampaignWebService.getAllAudios = function(id) {
            $http.defaults.useXDomain = true;
            return $http.get(ApiParam.baseURL() + "/v1/callflowrecording/" + id , ApiParam.headerConfig());
        };


        CampaignWebService.getVoicemails = function(id) {
            $http.defaults.useXDomain = true;
            return $http.get(ApiParam.baseURL() + "/v1/callflowrecording/" + id + "/voicemail", ApiParam.headerConfig());
        };
        
        CampaignWebService.getVoicePrompts = function(id) {
            var id1 = $rootScope.currentOUId;
            $http.defaults.useXDomain = true;
            return $http.get(ApiParam.baseURL() + "/v1/callflowrecording/" + id1 + "/prompt", ApiParam.headerConfig());
        };

        CampaignWebService.getWhispers = function(id) {
            var id1 = 1;
            $http.defaults.useXDomain = true;
            return $http.get(ApiParam.baseURL() + "/v1/callflowrecording/" + id + "/whisper", ApiParam.headerConfig());
        };

        CampaignWebService.getTags = function() {
            // $http.defaults.useXDomain = true;
            return $http.get(ApiParam.baseURL() + "/v1/tag/" + $rootScope.currentOUId, ApiParam.headerConfig());
        };

        CampaignWebService.getCustomSources = function() {
            // $http.defaults.useXDomain = true;
            return $http.get(ApiParam.baseURL() + "/v1/customsource/ouid/" + $rootScope.currentOUId + "/userAccess/" + $rootScope.userAccess.campaign, ApiParam.headerConfig());
        };

        CampaignWebService.getWebhooks = function() {
            var id1 = $rootScope.currentOUId;
            // $http.defaults.useXDomain = true;
            return $http.get(ApiParam.baseURL() + "/v1/webhook/list/" + id1, ApiParam.headerConfig());
        };

        CampaignWebService.createTag = function(tag) {
            var req = {
                method: 'POST',
                url: ApiParam.baseURL() + "/v1/tag",
                headers: ApiParam.headerConfig().headers,
                data: tag
            };
            return $http(req);
        };

        CampaignWebService.createCustomSource = function(customSource) {
            var req = {
                method: 'POST',
                url: ApiParam.baseURL() + "/v1/customsource",
                headers: ApiParam.headerConfig().headers,
                data: customSource
            };
            return $http(req);
        };

        CampaignWebService.uploadVoicePrompt = function(files) {
            var result, req;
            $rootScope.percentage = 0;
            if (files && files.length) {
                for (var i = 0; i < files.length; i++) {
                    var file = files[i];
                    req = $upload.upload({
                        url: ApiParam.baseURL() + "/v1/provisionedroute/prompt",
                        headers: {
                            'Authorization': ApiParam.headerConfig().headers.Authorization
                        },
                        fields: {
                            'name': file.name,
                            'org_unit_id': $rootScope.currentOUId
                        }, //"org_unit_id" : $rootScope.currentOUId,
                        file: file
                    }).progress(function(evt) {
                        // get upload percentage
                        console.log($rootScope);
                        $rootScope.percentage = parseInt(100.0 * evt.loaded / evt.total);
                        console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
                    });
                }
            }

            return req;
        };

        CampaignWebService.uploadWhisper = function(files) {
            var result, req;
            $rootScope.percentage = 0;
            if (files && files.length) {
                for (var i = 0; i < files.length; i++) {
                    var file = files[i];
                    req = $upload.upload({
                        url: ApiParam.baseURL() + "/v1/provisionedroute/whisper",
                        headers: {
                            'Authorization': ApiParam.headerConfig().headers.Authorization
                        },
                        fields: {
                            'name': file.name,
                            'org_unit_id': $rootScope.currentOUId
                        }, //"org_unit_id" : $rootScope.currentOUId,
                        file: file
                    }).progress(function(evt) {
                        // get upload percentage
                        console.log($rootScope);
                        $rootScope.percentage = parseInt(100.0 * evt.loaded / evt.total);
                        console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
                    });
                }
            }

            return req;
        };

        //callflowrecording/upload
        CampaignWebService.uploadAudio = function(files, message) {
            var result, req;
            $rootScope.percentage = 0;
            if (files && files.length) {
                for (var i = 0; i < files.length; i++) {
                    var file = files[i];
                    req = $upload.upload({
                        url: ApiParam.baseURL() + "/v1/callflowrecording/upload",
                        headers: {
                            'Authorization': ApiParam.headerConfig().headers.Authorization
                        },
                        fields: {
                            'org_unit_id': $rootScope.currentOUId,
                            'message_type': message
                        }, //"org_unit_id" : $rootScope.currentOUId,
                        file: file
                    }).progress(function(evt) {
                        // get upload percentage
                        console.log($rootScope);
                        $rootScope.percentage = parseInt(100.0 * evt.loaded / evt.total);
                        console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
                    });
                }
            }

            return req;
        };

        // Save call actions for tracking number CT-56
        CampaignWebService.saveCallActions = function(ca) {
            var req = {
                method: 'POST',
                url: ApiParam.baseURL() + "/v1/callAction",
                headers: ApiParam.headerConfig().headers,
                data: ca
            };
            return $http(req);
        };

        CampaignWebService.updateCallActions = function(ca) {
            var req = {
                method: 'PUT',
                url: ApiParam.baseURL() + "/v1/callAction",
                headers: ApiParam.headerConfig().headers,
                data: ca
            };
            return $http(req);
        };

        CampaignWebService.getcallActions = function(id) {
            $http.defaults.useXDomain = true;
            return $http.get(ApiParam.baseURL() + "/v1/callAction/byRoute/" + id, ApiParam.headerConfig());
        };

        CampaignWebService.removecallActions = function(id) {
            var req = {
                method: 'DELETE',
                url: ApiParam.baseURL() + "/v1/callAction/" + id,
                headers: ApiParam.headerConfig().headers
            };
            return $http(req);
        };

        CampaignWebService.callActionDC = function(id) {
            $http.defaults.useXDomain = true;
            return $http.get(ApiParam.baseURL() + "/v1/doubleclick/callAction/" + id, ApiParam.headerConfig());
        };

        /*
         * Call third party url for numbers
         * @param: state, rc
         * @return: json array
         */
        CampaignWebService.getThirdPartyNumbers = function(state, rc) {
            var req = {
                method: 'GET',
                url: ApiParam.baseURL() + "/v1/shoutpoint/rcState/" + encodeURIComponent(rc) + "/" + state,
                headers: ApiParam.headerConfig().headers
            };
            return $http(req);
        };
        CampaignWebService.removeCallFlow = function(pnumber) {
            var req = {
                method: 'PUT',
                url: ApiParam.baseURL() + "/v1/provisionedroute/delete",
                headers: ApiParam.headerConfig().headers,
                data: pnumber
            };
            return $http(req);
        };
        //saveBlackList
        CampaignWebService.saveBlackList = function(bl) {
            var req = {
                method: 'POST',
                url: ApiParam.baseURL() + "/v1/blacklist",
                headers: ApiParam.headerConfig().headers,
                data: bl
            };
            return $http(req);
        };
        CampaignWebService.getBlackList = function(id) {
            var req = {
                method: 'GET',
                url: ApiParam.baseURL() + "/v1/blacklist/ouid/" + id,
                headers: ApiParam.headerConfig().headers
            };
            return $http(req);
        };
        CampaignWebService.deleteAudioFile = function(data) {
            var req = {
                method: 'PUT',
                url: ApiParam.baseURL() + "/v1/callflowrecording/delete",
                headers: ApiParam.headerConfig().headers,
                data: data
            };
            return $http(req);
        };

        CampaignWebService.getGeoLocations = function() {
            //console.log($window.sessionStorage.token);
            $http.defaults.useXDomain = true;
            return $http.get(ApiParam.baseURL() + "/v1/location/ouid/" + $rootScope.currentOUId + "/" + encodeURIComponent($rootScope.timezone), ApiParam.headerConfig());

        };
        CampaignWebService.getTTS = function(TextToSpeech) {
            //console.log($window.sessionStorage.token);
            $http.defaults.useXDomain = true;
            return $http.get(ApiParam.baseURL() + "/v1/callflow/getmedia/" + encodeURIComponent(TextToSpeech), ApiParam.headerConfig());
        };

        CampaignWebService.getAnalytics = function() {
            $http.defaults.useXDomain = true;
            return $http.get(ApiParam.baseURL() + "/v1/analytic/ouid/" + $rootScope.currentOUId + "/includeParentAnalytics/" + true, ApiParam.headerConfig());
        };

        /*call set caller id webservice*/
        CampaignWebService.getSetCallerId = function(data, show) {
            $http.defaults.useXDomain = true;
            return $http.get(ApiParam.baseURL() + "/v1/callflow/provisionedroutecallerIDs", ApiParam.headerConfig());
        
        }
        CampaignWebService.validateDniData = function(data, show) {
            var arrInvalid = [];
            var arrInvalidMessage = [];
            var REF_REGEX = new RegExp(/^([a-z0-9]+|\*)([\-\.]{1}[a-z0-9]+)*\.([a-z]{1,5}|\*)(:[0-9]{1,5})?(\/.*)?$/i);
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
            return arrInvalidMessage;
        };

        CampaignWebService.checkOutboundCallerId =function(tracking_number){
            $http.defaults.useXDomain = true;
            return $http.get(ApiParam.baseURL() + "/v1/provisionedroute/"+tracking_number, ApiParam.headerConfig());

        };
        CampaignWebService.checkOutboundCallerIdByCampaignID =function(campaign_id){
             $http.defaults.useXDomain = true;
            return $http.get(ApiParam.baseURL() + "/v1/provisionedroute/checkOutboundCallerIdByCampaignID/campaignID/"+campaign_id, ApiParam.headerConfig());
        };

        CampaignWebService.checkLDM = function(body) {
            var req = {
                method: 'POST',
                url: ApiParam.baseURL() + "/v1/ldm",
                headers: ApiParam.headerConfig().headers,
                data: body
            };
            return $http(req);
        };
       
        return CampaignWebService;
    })
    // *************************************************************************************************************************
        
    .factory('voicemailPromptService', ['$rootScope', 'CampaignWebService', function($rootScope, CampaignWebService) {
        'use strict';
        var voicemails = [];
        if(!$rootScope.voicemails || ($rootScope.voicemails && $rootScope.voicemails.length < 1)){
            CampaignWebService.getVoicemails($rootScope.currentOUId).then(function(result) {
                if (result.data.result != 'error') {
                    voicemails = result.data.json;
                    if (voicemails.length) {
                        for (var i = 0; i < voicemails.length; i++) {
                            voicemails[i].selectedvoicemail = false;
                        }
                    }
                }
            });
        }else{
            voicemails = $rootScope.voicemails;
            if (voicemails.length) {
                for (var i = 0; i < voicemails.length; i++) {
                    voicemails[i].selectedvoicemail = false;
                }
            }
        }
        return {
            getvoicemails: function() {
                return voicemails;
            },
            setvoicemails: function(voicemail) {
                voicemails = voicemail;
            }
        };
    }])
    .controller('voicemailModel', ['$scope', '$rootScope', '$window', '$uibModalInstance', 'voicemailPromptService', 'CampaignWebService', 'pinesNotifications', '$bootbox',
    function($scope, $rootScope, $window, $uibModalInstance, voicemailPromptService, CampaignWebService, pinesNotifications, $bootbox) {
        var filecontrol = $("#filecontrol");
        $scope.upload = {};
        $scope.upload.showme = [];
        
        $scope.voicemails =[];
        
        if((JSON.parse($window.sessionStorage.voicemails)).length > 0){
            var voicemails = JSON.parse($window.sessionStorage.voicemails);
            for(var i=0; i < voicemails.length;i++){
                if(voicemails[i].active == true){
                    $scope.voicemails.push(voicemails[i]);
                    $rootScope.voicemails.push(voicemails[i]);
                }
            }
        }else{
            $rootScope.voicemails = '';
        }

        $scope.isFileSelected = function() {
            if (!$scope.upload.files)
                return false;
            else
                return true;
        };
        $scope.useSelectedvoicemail = function(data) {
            //console.log("inside useSelectedvoicemail");
            // captainModalInstanceCtrl.ok();

        };
        $scope.savevoicemail = function(data, id) {
            //$scope.user not updated yet
            angular.extend(data, {
                id: id
            });
            // return $http.post('/saveUser', data);
        };
        $scope.addvoicemail = function() {
            $scope.inserted = {
                id: $scope.voicemails.length + 1,
                name: '',
                status: null,
                group: null
            };
            $scope.voicemails.push($scope.inserted);
        };
        $scope.removevoicemail = function(index) {
            var whispFile = {
                id: $scope.voicemails[index].id
            };
            $scope.playvoiceaudio(index, $scope.voicemails[index].url, 'pause');
            $bootbox.confirm("Are you sure you want to delete this Voicemail Message?", function(clickedOK) {
                if (clickedOK) {
                    CampaignWebService.deleteAudioFile(whispFile).then(function(response) {
                        /*Reason of adding this manual css is that after closing the bootbox confirm popup it is
                            *removing the modal-open class from the body which is making the modal popup inactive i.e we
                            * are not able to scroll the modal popup
                            */
                        $("body").addClass("modal-open");
                        if (response.data.result != 'error') {
                            var voicemails = JSON.parse($window.sessionStorage.voicemails);
                            for(var i=0;i<voicemails.length;i++){
                                if(voicemails[i].id == whispFile.id){
                                    voicemails[i].active = false;
                                }
                            }
                            $window.sessionStorage.voicemails = JSON.stringify(voicemails);
                            $rootScope.voicemails = voicemails;
                              
                            pinesNotifications.notify({
                                title: 'voicemail Message',
                                text: 'voicemail Message deleted successfully',
                                type: 'success'
                            });
                            $scope.voicemails.splice(index, 1);
                            $scope.upload.showme[index] = false;
                        } else {
                            pinesNotifications.notify({
                                title: 'voicemail Message',
                                text: 'Error Deleting voicemail Message',
                                type: 'error'
                            });
                            return;
                        }

                    });
                } else {
                    /*Reason of adding this manual css is that after closing the bootbox confirm popup it is
                        *removing the modal-open class from the body which is making the modal popup inactive i.e we
                        * are not able to scroll the modal popup
                        */
                    setTimeout(function() {
                        $("body").addClass("modal-open");
                    }, 100);
                }
            });
        };
        $scope.uploadFile = function() {
            var fd = $scope.upload.files;
            $scope.fileIsUploading = true;
            fileExtension = fd[0].name.substr((Math.max(0, fd[0].name.lastIndexOf(".")) || Infinity) + 1);
            if (fileExtension == 'mp3' || fileExtension == 'wav' || fileExtension == 'mp4') {
                CampaignWebService.uploadAudio(fd, 'voicemail').then(function(response) {
                    $scope.fileIsUploading = false;
                    if (response.data.result != 'error') {
                        $scope.inserted = {
                            id: $scope.voicemails.length + 1,
                            name: response.data.json.call_flow_recording.url.filename,
                            url: response.data.json.call_flow_recording.url.url,
                            status: null,
                            group: null
                        };
                        $scope.upload.files = null;
                        CampaignWebService.getVoicemails($rootScope.currentOUId).then(function(result) {
                            if (result.data.result != 'error') {
                                $scope.voicemails = result.data.json;
                                
                                var voicemails = JSON.parse($window.sessionStorage.voicemails);
                                var uploaded = $scope.voicemails[$scope.voicemails.length-1];
                                uploaded['active'] = true;
                                voicemails.push(uploaded);
                                    
                                $window.sessionStorage.voicemails = JSON.stringify(voicemails);
                                $rootScope.voicemails = voicemails;


                                if ($scope.voicemails) {
                                    for (var i = 0; i < $scope.voicemails.length; i++) {
                                        $scope.voicemails[i].selectedvoicemail = false;
                                    }
                                }
                            }
                        });
                        // $scope.voicemails.push($scope.inserted);
                        $scope.param = null;
                        filecontrol.replaceWith(filecontrol = filecontrol.clone(true));
                    } else {
                        $scope.error = "Invalid email or password";
                    }

                });
            } else {
                $scope.fileIsUploading = false;
                pinesNotifications.notify({
                    title: 'Voicemail Upload Message',
                    text: 'Invalid file type.',
                    type: 'error'
                });
                return false;
            }
        };
        $scope.removeotherchecks = function(index) {
            for (var i = 0; i < $scope.voicemails.length; i++) {
                if (i !== index) {
                    $scope.voicemails[i].selectedvoicemail = false;
                }

            }
            voicemailPromptService.voicemails = $scope.voicemails;
            //console.log('$scope.voicemails:' + $scope.voicemails);
        };
        $scope.playvoiceaudio = function(index, s3URL, control) {
            if ($scope.audio === undefined) {
                $scope.audio = [];
            }

            if ($scope.audio[index] === undefined) {
                $scope.audio[index] = new Audio(s3URL);
                $scope.audio[index].addEventListener('ended', function() {
                    $scope.upload.showme[index] = false;
                });
            }
            var playtime;
            for (var x in $scope.audio) {
                //console.log('x:',x);
                if (x != index) {
                    $scope.audio[x].pause();
                    if ($scope.audio[x].currentTime) {
                        $scope.audio[x].currentTime = 0;
                    }
                    $scope.upload.showme[x] = false;
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
                    if ($scope.audio[x].currentTime) {
                        $scope.audio[index].currentTime = playtime - 5;
                        $scope.audio[index].play();
                    }
                    break;

                case 'forward':
                    $scope.audio[index].pause();
                    if ($scope.audio[x].currentTime) {
                        playtime = $scope.audio[index].currentTime;
                        $scope.audio[index].currentTime = $scope.audio[index].currentTime + 5;
                        $scope.audio[index].play();
                    }
                    
                    break;

                default:
            }
        };
        $scope.ok = function() {
            var isOneSelected = false;
            var i;
            if ($scope.voicemails) {
                for (i = 0; i < $scope.voicemails.length; i++) {
                    if ($scope.voicemails[i].selectedvoicemail) {
                        isOneSelected = true;
                    }

                }
            }
            if (!isOneSelected) {
                pinesNotifications.notify({
                    title: 'voicemail Message',
                    text: 'Please select a voicemail Message',
                    type: 'error'
                });
                return;
            }
            if ($scope.audio) {
                for (i = 0; i < $scope.audio.length; i++) {
                    if ($scope.audio[i] !== undefined)
                        $scope.audio[i].pause();

                }
            }
            $uibModalInstance.close();
        };
        $scope.cancel = function() {
            if ($scope.audio) {
                for (i = 0; i < $scope.audio.length; i++) {
                    if ($scope.audio[i] !== undefined)
                        $scope.audio[i].pause();

                }
            }
            $uibModalInstance.dismiss('cancel');
        };

    }
])

    // *************************************************************************************************************************
    .factory('VoicePromptService', ['$rootScope', 'CampaignWebService',
        function($rootScope, CampaignWebService) {
            'use strict';
            var prompts = [];
            if(!$rootScope.prompts || ($rootScope.prompts && $rootScope.prompts.length < 1)){
                CampaignWebService.getVoicePrompts($rootScope.currentOUId).then(function(result) {
                    if (result.data.result != 'error') {
                        prompts = result.data.json;
                        if (prompts.length) {
                            for (var i = 0; i < prompts.length; i++) {
                                prompts[i].selectedprompt = false;
                            }
                        }
                    }
                });
            }else{
                prompts = $rootScope.prompts;
                if (prompts.length) {
                    for (var i = 0; i < prompts.length; i++) {
                        prompts[i].selectedprompt = false;
                    }
                }
            }          
            return {
                getPrompts: function() {
                    return prompts;
                },
                setPrompts: function(prompt) {
                    prompts = prompt;
                }
            };
        }
    ])
    .factory('WhisperMessageService', ['$rootScope', 'CampaignWebService', function($rootScope, CampaignWebService) {
        'use strict';
        var whispers = [];
        if(!$rootScope.whispers || ($rootScope.whispers && $rootScope.whispers.length < 1)){
            CampaignWebService.getWhispers($rootScope.currentOUId).then(function(result) {
                //console.log(result);
                if (result.data.result != 'error') {
                    whispers = result.data.json;
                    if (whispers.length) {
                        for (var i = 0; i < whispers.length; i++) {
                            whispers[i].selectedwhisper = false;
                        }
                    }
                }
            });
        }else{
            whispers = $rootScope.whispers;
            if (whispers.length) {
                for (var i = 0; i < whispers.length; i++) {
                    whispers[i].selectedwhisper = false;
                }
            }
        }        
        return {
            getWhispers: function() {
                return whispers;
            },
            setWhispers: function(whisper) {
                whispers = whisper;
            }
        };
    }])
    .controller('voiceModal', ['$scope', '$rootScope', '$window', '$uibModalInstance', 'VoicePromptService', 'CampaignWebService', 'OrgUnitWebService', 'pinesNotifications', '$bootbox',
        function($scope, $rootScope, $window, $uibModalInstance, voicepromptService, CampaignWebService, OrgUnitWebService, pinesNotifications, $bootbox) {
            var filecontrol = $("#filecontrol");
            $scope.upload = {};
            $scope.upload.showme = [];
            $scope.prompts = [];

	        if((JSON.parse($window.sessionStorage.prompts)).length > 0){
                var prompts = JSON.parse($window.sessionStorage.prompts);
                for(var i=0;i<prompts.length;i++){
                    if(prompts[i].active == true){
                        $scope.prompts.push(prompts[i]);
                        $rootScope.prompts.push(prompts[i]);
                    }
                }
            }else{
                $rootScope.prompts = [];
            }

            $scope.isFileSelected = function() {
                if (!$scope.upload.files)
                    return false;
                else
                    return true;
            };
            $scope.useSelectedPrompt = function(data) {
                //console.log("inside useSelectedPrompt");
                // captainModalInstanceCtrl.ok();

            };
            $scope.savePrompt = function(data, id) {
                //$scope.user not updated yet
                angular.extend(data, {
                    id: id
                });
                // return $http.post('/saveUser', data);
            };
            $scope.addPrompt = function() {
                $scope.inserted = {
                    id: $scope.prompts.length + 1,
                    name: '',
                    status: null,
                    group: null
                };
                $scope.prompts.push($scope.inserted);
            };
            $scope.removePrompt = function(index) {
                var promtFile = {
                    id: $scope.prompts[index].id
                };
                $scope.playvoiceaudio(index, $scope.prompts[index].url, 'pause');
                $bootbox.confirm("Are you sure you want to delete this Prompt Message?", function(clickedOK) {
                    if (clickedOK) {
                        CampaignWebService.deleteAudioFile(promtFile).then(function(response) {
                            /*Reason of adding this manual css is that after closing the bootbox confirm popup it is
                             *removing the modal-open class from the body which is making the modal popup inactive i.e we
                             * are not able to scroll the modal popup
                             */
                            $("body").addClass("modal-open");
                            if (response.data.result != 'error') {
                                var prompts = JSON.parse($window.sessionStorage.prompts);
                                for(var i=0;i<prompts.length;i++){
                                    if(prompts[i].id == promtFile.id){
                                        prompts[i].active = false;
                                    }
                                }
                                $window.sessionStorage.prompts = JSON.stringify(prompts);
                                $rootScope.prompts = prompts;

                                $scope.prompts.splice(index, 1);
                                pinesNotifications.notify({
                                    title: 'Voice Prompt Message',
                                    text: 'Voice Prompt Message deleted successfully',
                                    type: 'success'
                                });
                                
                                $scope.upload.showme[index] = false;
                                
                            } else {
                                pinesNotifications.notify({
                                    title: 'Voice Prompt Message',
                                    text: 'Error Deleting Voice Prompt Message',
                                    type: 'error'
                                });
                                return;
                            }

                        });
                    } else {
                        /*Reason of adding this manual css is that after closing the bootbox confirm popup it is
                         *removing the modal-open class from the body which is making the modal popup inactive i.e we
                         * are not able to scroll the modal popup
                         */
                        setTimeout(function() {
                            $("body").addClass("modal-open");
                        }, 100);
                    }
                });
                // $scope.prompts.splice(index, 1);
            };
            $scope.uploadFile = function() {
                var fd = $scope.upload.files;
                $scope.fileIsUploading = true;
                fileExtension = fd[0].name.substr((Math.max(0, fd[0].name.lastIndexOf(".")) || Infinity) + 1);
                if (fileExtension == 'mp3' || fileExtension == 'wav' || fileExtension == 'mp4') {
                    CampaignWebService.uploadAudio(fd, 'prompt').then(function(response) {
                        $scope.fileIsUploading = false;
                        if (response.data.status != 'error') {
                            if($scope.prompts===undefined || $scope.prompts===null || $scope.prompts===""){
                                $scope.prompts=[]
                            }
                            $scope.inserted = {
                                id: $scope.prompts.length + 1,
                                name: response.data.json.call_flow_recording.url.filename,
                                url: response.data.json.call_flow_recording.url.url,
                                status: null,
                                group: null
                            };
                            $scope.upload.files = null;
                            // $scope.prompts.push($scope.inserted);
                            CampaignWebService.getVoicePrompts($rootScope.currentOUId).then(function(result) {
                                if (result.data.result != 'error') {
                                    $scope.prompts = result.data.json;
                                    

                                    var prompts = JSON.parse($window.sessionStorage.prompts);
                                    var uploaded = $scope.prompts[$scope.prompts.length-1];
                                    uploaded['active'] = true;
                                    prompts.push(uploaded);
                                    

                                    $window.sessionStorage.prompts = JSON.stringify(prompts);
                                    $rootScope.voicemails = prompts;
                                    voicepromptService.setPrompts($scope.prompts);
                                    if ($scope.prompts) {
                                        for (var i = 0; i < $scope.prompts.length; i++) {
                                            $scope.prompts[i].selectedprompt = false;
                                        }
                                    }
                                }
                            });
                            $scope.param = null;
                            filecontrol.replaceWith(filecontrol = filecontrol.clone(true));
                        } else {
                            $scope.error = "Invalid email or password";
                        }

                    });
                } else {
                    $scope.fileIsUploading = false;
                    pinesNotifications.notify({
                        title: 'Voice Prompt Upload',
                        text: 'Invalid File Type',
                        type: 'error'
                    });
                    return false;
                }
            };
            $scope.removeotherchecks = function(index) {
                for (var i = 0; i < $scope.prompts.length; i++) {
                    if (i !== index) {
                        $scope.prompts[i].selectedprompt = false;
                    }

                }
                voicepromptService.prompts = $scope.prompts;
                //console.log('$scope.prompts:' + $scope.prompts);

            };
            $scope.playvoiceaudio = function(index, s3URL, control) {
                if ($scope.audio === undefined) {
                    $scope.audio = [];
                }

                if ($scope.audio[index] === undefined) {
                    $scope.audio[index] = new Audio(s3URL);
                    $scope.audio[index].addEventListener('ended', function() {
                        $scope.upload.showme[index] = false;
                    });
                }
                var playtime;
                for (var x in $scope.audio) {
                    if (x != index) {
                        $scope.audio[x].pause();
                        if ($scope.audio[x].currentTime) {
                            $scope.audio[x].currentTime = 0;
                        }
                        $scope.upload.showme[x] = false;
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
                        if ($scope.audio[x].currentTime) {
                            playtime = $scope.audio[index].currentTime;
                            $scope.audio[index].currentTime = playtime - 5;
                            $scope.audio[index].play();
                        }
                        
                        break;

                    case 'forward':
                        $scope.audio[index].pause();
                        if ($scope.audio[x].currentTime) {
                            playtime = $scope.audio[index].currentTime;
                            $scope.audio[index].currentTime = playtime + 5;
                            $scope.audio[index].play();
                        }
                        
                        break;

                    default:
                }
            };

            $scope.ok = function() {
                var isOneSelected = false;
                for (var i = 0; i < $scope.prompts.length; i++) {
                    if ($scope.prompts[i].selectedprompt) {
                        isOneSelected = true;
                    }

                }
                if (!isOneSelected) {
                    pinesNotifications.notify({
                        title: 'Voice Prompt Message',
                        text: 'Please select a Voice Prompt Message',
                        type: 'error'
                    });
                    return;
                }
                if ($scope.audio) {
                    for (i = 0; i < $scope.audio.length; i++) {
                        if ($scope.audio[i] !== undefined)
                            $scope.audio[i].pause();

                    }
                }
                $uibModalInstance.close();
            };

            $scope.cancel = function() {
                if ($scope.audio) {
                    for (i = 0; i < $scope.audio.length; i++) {
                        if ($scope.audio[i] !== undefined)
                            $scope.audio[i].pause();

                    }
                }
                $uibModalInstance.dismiss('cancel');
            };

        }
    ])
    .controller('whisperModal', ['$scope', '$rootScope', '$window', '$uibModalInstance', 'WhisperMessageService', 'CampaignWebService', 'pinesNotifications', '$bootbox',
        function($scope, $rootScope, $window, $uibModalInstance, whispermessageService, CampaignWebService, pinesNotifications, $bootbox) {
            var filecontrol = $("#filecontrol");
            $scope.upload = {};
            $scope.upload.showme = [];
            $scope.whispers = [];

            if((JSON.parse($window.sessionStorage.whispers)).length > 0){
                var whispers = JSON.parse($window.sessionStorage.whispers);
                for(var i=0;i<whispers.length;i++){
                    if(whispers[i].active == true){
                        $scope.whispers.push(whispers[i]);
                        $rootScope.whispers.push(whispers[i]);
                    }
                }
            }else{
                $rootScope.whispers = '';
            }

            $scope.isFileSelected = function() {
                if (!$scope.upload.files)
                    return false;
                else
                    return true;
            };
            $scope.useSelectedWhisper = function(data) {
                //console.log("inside useSelectedWhisper");
                // captainModalInstanceCtrl.ok();

            };
            $scope.saveWhisper = function(data, id) {
                //$scope.user not updated yet
                angular.extend(data, {
                    id: id
                });
                // return $http.post('/saveUser', data);
            };
            $scope.addWhisper = function() {
                $scope.inserted = {
                    id: $scope.whispers.length + 1,
                    name: '',
                    status: null,
                    group: null
                };
                $scope.whispers.push($scope.inserted);
            };
            $scope.removeWhisper = function(index) {
                var whispFile = {
                    id: $scope.whispers[index].id
                };
                $scope.playvoiceaudio(index, $scope.whispers[index].url, 'pause');
                $bootbox.confirm("Are you sure you want to delete this Whisper Message?", function(clickedOK) {
                    if (clickedOK) {
                        CampaignWebService.deleteAudioFile(whispFile).then(function(response) {
                            /*Reason of adding this manual css is that after closing the bootbox confirm popup it is
                             *removing the modal-open class from the body which is making the modal popup inactive i.e we
                             * are not able to scroll the modal popup
                             */
                            $("body").addClass("modal-open");
                            if (response.data.result != 'error') {
                                var whispers = JSON.parse($window.sessionStorage.whispers);
                                for(var i=0;i<whispers.length;i++){
                                    if(whispers[i].id == whispFile.id){
                                        whispers[i].active = false;
                                    }
                                }
                                $window.sessionStorage.whispers = JSON.stringify(whispers);
                                $rootScope.whispers = whispers;

                                pinesNotifications.notify({
                                    title: 'Whisper Message',
                                    text: 'Whisper Message deleted successfully',
                                    type: 'success'
                                });
                                $scope.whispers.splice(index, 1);
                                $scope.upload.showme[index] = false;
                            } else {
                                pinesNotifications.notify({
                                    title: 'Whisper Message',
                                    text: 'Error Deleting Whisper Message',
                                    type: 'error'
                                });
                                return;
                            }

                        });
                    } else {
                        /*Reason of adding this manual css is that after closing the bootbox confirm popup it is
                         *removing the modal-open class from the body which is making the modal popup inactive i.e we
                         * are not able to scroll the modal popup
                         */
                        setTimeout(function() {
                            $("body").addClass("modal-open");
                        }, 100);
                    }
                });
            };
            $scope.uploadFile = function() {
                var fd = $scope.upload.files;
                $scope.fileIsUploading = true;
                fileExtension = fd[0].name.substr((Math.max(0, fd[0].name.lastIndexOf(".")) || Infinity) + 1);
                if (fileExtension == 'mp3' || fileExtension == 'wav' || fileExtension == 'mp4') {
                    CampaignWebService.uploadAudio(fd, 'whisper').then(function(response) {
                        $scope.fileIsUploading = false;
                        if (response.data.result != 'error') {
                            $scope.inserted = {
                                id: $scope.whispers.length + 1,
                                name: response.data.json.call_flow_recording.url.filename,
                                url: response.data.json.call_flow_recording.url.url,
                                status: null,
                                group: null
                            };
                            $scope.upload.files = null;
                            CampaignWebService.getWhispers($rootScope.currentOUId).then(function(result) {
                                if (result.data.result != 'error') {
                                    $scope.whispers = result.data.json;
                                    

                                    var whispers = JSON.parse($window.sessionStorage.whispers);
                                    var uploaded = $scope.whispers[$scope.whispers.length-1];
                                    uploaded['active'] = true;
                                    whispers.push(uploaded);
                                    

                                    $window.sessionStorage.whispers = JSON.stringify(whispers);
                                    $rootScope.whispers = whispers;
                                    if ($scope.whispers) {
                                        for (var i = 0; i < $scope.whispers.length; i++) {
                                            $scope.whispers[i].selectedwhisper = false;
                                        }
                                    }
                                }
                            });
                            // $scope.whispers.push($scope.inserted);
                            $scope.param = null;
                            filecontrol.replaceWith(filecontrol = filecontrol.clone(true));
                        } else {
                            $scope.error = "Invalid email or password";
                        }

                    });
                } else {
                    $scope.fileIsUploading = false;
                    pinesNotifications.notify({
                        title: 'Voice Prompt Upload',
                        text: 'Invalid file type.',
                        type: 'error'
                    });
                    return false;
                }
            };
            $scope.removeotherchecks = function(index) {
                for (var i = 0; i < $scope.whispers.length; i++) {
                    if (i !== index) {
                        $scope.whispers[i].selectedwhisper = false;
                    }

                }
                whispermessageService.whispers = $scope.whispers;
                //console.log('$scope.whispers:' + $scope.whispers);
            };
            $scope.playvoiceaudio = function(index, s3URL, control) {
                if ($scope.audio === undefined) {
                    $scope.audio = [];
                }

                if ($scope.audio[index] === undefined) {
                    $scope.audio[index] = new Audio(s3URL);
                    $scope.audio[index].addEventListener('ended', function() {
                        $scope.upload.showme[index] = false;
                    });
                }
                var playtime;
                for (var x in $scope.audio) {
                    //console.log('x:',x);
                    if (x != index) {
                        $scope.audio[x].pause();
                        if ($scope.audio[x].currentTime) {
                            $scope.audio[x].currentTime = 0;
                        }
                        $scope.upload.showme[x] = false;
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
                        if ($scope.audio[x].currentTime) {
                            $scope.audio[index].currentTime = playtime - 5;
                            $scope.audio[index].play();
                        }
                        break;

                    case 'forward':
                        $scope.audio[index].pause();
                        if ($scope.audio[x].currentTime) {
                            playtime = $scope.audio[index].currentTime;
                            $scope.audio[index].currentTime = playtime + 5;
                            $scope.audio[index].play();
                            
                            
                        }
                        
                        break;

                    default:
                }
            };

            $scope.ok = function() {
                var isOneSelected = false;
                var i;
                if ($scope.whispers) {
                    for (i = 0; i < $scope.whispers.length; i++) {
                        if ($scope.whispers[i].selectedwhisper) {
                            isOneSelected = true;
                        }
                    }
                }
                if (!isOneSelected) {
                    pinesNotifications.notify({
                        title: 'Whisper Message',
                        text: 'Please select a Whisper Message',
                        type: 'error'
                    });
                    return;
                }
                if ($scope.audio) {
                    for (i = 0; i < $scope.audio.length; i++) {
                        if ($scope.audio[i] !== undefined)
                            $scope.audio[i].pause();
                    }
                }
                $uibModalInstance.close();
            };

            $scope.cancel = function() {
                if ($scope.audio) {
                    for (i = 0; i < $scope.audio.length; i++) {
                        if ($scope.audio[i] !== undefined)
                            $scope.audio[i].pause();
                    }
                }
                $uibModalInstance.dismiss('cancel');
            };
        }
    ])
    .factory('SelectedCampaign', function() {
        'use strict';
        var data = {
            Id: ''
        };
        return {
            getId: function() {
                return data.Id;
            },
            setId: function(Id) {
                data.Id = Id;
            }
        };
    })
    .factory('PhoneList', function() {
        'use strict';
        var pList = [];
        return {
            addtoList: function(item) {
                pList.push(item);

            },
            getList: function() {
                return pList;
            },
            clearList: function() {
                pList = [];
            }

        };
    })
    .controller('CampaignsTableController', ['$scope', '$rootScope', '$filter', 'CampaignWebService', 'SelectedCampaign', '$location', '$window', '$q', '$bootbox', 'pinesNotifications', 'ApiParam',
        function($scope, $rootScope, $filter, CampaignWebService, SelectedCampaign, $location, $window, $q, $bootbox, pinesNotifications, ApiParam) {
            'use strict';
            $scope.isLoadingApi = true;
            var retData;
            var campData = {
                "total": 0,
                "data": []
            }
            $scope.campReportData;
            $scope.campaignIds = [];
            $scope.showCampaign = false;
            $scope.showCampaignlist = false;
            $scope.currentPage = 1;
            $scope.pageSize = 100;
            $scope.CurrentOUName = $rootScope.currentOUName;
            if($scope.CurrentOUName.length > 50){
                $scope.CurrentOUNameCSV = $scope.CurrentOUName.slice(0,50) + ".csv";
            }else{
                $scope.CurrentOUNameCSV = $scope.CurrentOUName + ".csv";
            }
            $scope.campaginCallFlowHeader = ['Name', 'Campaign Start', 'Campaign End', 'Tracking Numbers', 'Status'];
            $scope.actionHeader = ['Actions'];
            $scope.userId = parseInt($rootScope.userId);
            $rootScope.isSafari = $window.sessionStorage.isSafari = /constructor/i.test(window.HTMLElement) || (function(p) {
                return p.toString() === "[object SafariRemoteNotification]";
            })(!window.safari || safari.pushNotification);

            $scope.pageNumber = 1;
            var token = 'bearer ' + $window.sessionStorage.token;
            $scope.collapse = false;
            $scope.mainGridOptions = {
                dataSource: {
                    type: "json",
                    transport: {
                        read: {
                            url: ApiParam.baseURL() + "/v1/campaign/ouid/" + $rootScope.currentOUId + "/userAccess/" + $scope.userAccess.campaign + "/" + encodeURIComponent($rootScope.timezone),
                            beforeSend: function(request) {
                                request.setRequestHeader('content-type', 'application/json');
                                request.setRequestHeader('Authorization', token);
                            },
                            complete: function(e) {
                            },
                            dataType: "json"
                        },
                    },
                    schema: {
                        data: function(data) {
                            return data.json.campaigns;
                        },
                        total: function(data) {
                                return data.json.total
                            }
                    },
                    pageSize: 30,
                    serverPaging: true,
                    serverSorting: true,
                    serverFiltering: true,
                },
                //sortable: true,  
                pageable: true,
                resizable: true,
                columnMenu: true,
                filterable: {
                    extra: false,
                    operators: {
                        string: {
                            startswith: "Starts with",
                            eq: "Is equal to",
                            neq: "Is not equal to"
                        }
                    }
                },
                dataBound: function(e) {
                    this.expandRow(this.tbody.find("tr.k-master-row").first());
                    this.collapseRow(this.tbody.find("tr.k-master-row").first());
                    var items = e.sender.items();
                    items.each(function() {
                        var row = $(this);
                        var dataItem = e.sender.dataItem(row);
                        if (dataItem.quantity === 0) {
                            row.find(".k-hierarchy-cell").html();
                            $(row).addClass('ready');
                            row.find(".k-hierarchy-cell").html("");
                        }

                    })
                },
                columns: [{
                    field: "",
                    headerTemplate: '<a class="k-icon k-i-expand" id="masterExpand" ng-click="masterexpand()"  aria-label="Expand" tabindex="-1"></a>',
                    width: "50px"
                }, {
                    field: "organizational_unit_id",
                    title: "OUID",
                    filterable: false,
                    width: "120px"
                }, {
                    field: "organization_unit_name",
                    title: "Group Name",
                    filterable: false,
                    width: "120px"
                }, {
                    field: "name",
                    title: "Campaign Name",
                    width: "120px"
                }, {
                    field: "start_date",
                    title: "Campaign Start",
                    filterable: false,
                    width: "120px"
                }, {
                    field: "end_date",
                    title: "Campaign End",
                    filterable: false,
                    width: "120px"
                }, {
                    field: "quantity",
                    title: "Tracking Number Quantity",
                    filterable: false,
                    width: "120px"
                }, {
                    field: "status",
                    title: "Campaign Status",
                    filterable: false,
                    width: "120px",
                    template: "<span class='status'>#= status#</span>",
                    //template:"<span class='status'>inactive</span>"


                }, {
                    field: "campaign_id",
                    title: "Actions",
                    filterable: false,
                    sortable: false,
                    //width:"150px",
                    template: "<button class=\"btn btn-sm btn-primary\" ng-click=\"editCampaign(dataItem)\">Edit </button>&nbsp;<button class=\"btn btn-sm btn-danger\" ng-click=\"archiveCampaign(dataItem)\" >Archive</button>"
                }]
            };



            function kendoFilter(element) {
                element.kendoDropDownList({
                    dataSource: Name,
                    optionLabel: "--Select Value--"
                });
            }



            $scope.detailGridOptions = function(dataItem) {
                return {
                    dataSource: {
                        type: "json",
                        transport: {
                            read: {
                                url: ApiParam.baseURL() + "/v1/campaignCallflow?campaign_id=" + dataItem.campaign_id,
                                beforeSend: function(request) {
                                    request.setRequestHeader('content-type', 'application/json');
                                    request.setRequestHeader('Authorization', token);
                                },
                                complete: function(e) {
                                    console.log(e.responseText)
                                },
                                dataType: "json"
                            },
                        },
                        schema: {
                            //--------------------------------------------------------------
                            //Show the data & count on the grid (otherwise it'll throw the error - "Unable to get __count of undefined or null...."
                            data: function(data) {
                                return data.json;
                            },
                            total: function(data) {
                                    return data.json.total
                                        //NEED TO KNOW HOW TO RETURN TOTAL?
                                }
                                //--------------------------------------------------------------
                        },
                        pageSize: 50,

                        serverPaging: true,
                        serverSorting: true,
                        filter: {
                            field: "campaign_id",
                            operator: "eq",
                            value: dataItem.campaign_id
                        }
                    },
                    scrollable: false,
                    sortable: true,
                    pageable: true,
                    columns: [{
                            field: "tracking_number",
                            title: "Tracking Number"
                        },
                        {
                            field: "callFlow_name",
                            title: "Name"
                        },
                        {
                            field: "ring_to_number",
                            title: "RingToNumber"
                        },
                        {
                            field: "spam_guard_status",
                            title: "Spam Guard Protection",
                            template: "# if(spam_guard_status) { #<img src='assets/img/spam.jpg' class='spam_gurad' alt='Spam'>#} #"
                        },
                        {
                            field: "Ad_Source",
                            title: "Ad Source"
                        },
                        {
                            field: "status",
                            title: "Status",
                            template: "<span class='status'>#= status#</span>"
                        },
                        {
                            field: "tracking_number",
                            title: "Actions",
                            template: "<button class=\"btn btn-sm btn-primary\" ng-click=\"editCampaign(dataItem)\">Edit </button>&nbsp;<button class=\"btn btn-sm btn-danger\" ng-click=\"removeCallFlow(dataItem)\" >Delete</button>",
                        }

                    ]
                };
            };

            $scope.masterexpand = function() {
                var grid = $("#grid").data("kendoGrid");
                if ($scope.collapse == false) {
                    // var grid = $("#grid").data("kendoGrid");    
                    $(".k-master-row").each(function(index) {
                        grid.expandRow(this);
                    });
                    $("#masterExpand").attr('class', 'k-icon k-i-collapse');
                    $scope.collapse = true;

                } else {
                    // var grid = $("#grid").data("kendoGrid");
                    $(".k-master-row").each(function(index) {
                        grid.collapseRow(this);
                    });
                    $("#masterExpand").attr('class', 'k-icon k-i-expand');
                    $scope.collapse = false;
                }
            }


            $scope.removeCallFlow = function(dataItem) {
                var pr = {
                    "provisioned_route": {
                        "ids": [dataItem.call_flow_id]
                    }
                };

                $bootbox.confirm("Are you sure you want to delete this Tracking Number?", function(clickedOK) {
                    if (clickedOK) {
                        CampaignWebService.removeCallFlow(pr).then(function(result) {
                            if (result.data.err === '') {
                                pinesNotifications.notify({
                                    title: 'Remove Tracking Number',
                                    text: 'Tracking Number removed successfully.',
                                    type: 'success'
                                });

                                $route.reload();
                                // $location.path('/setup-campaign-builder2');
                            } else {
                                pinesNotifications.notify({
                                    title: 'Remove Tracking Number',
                                    text: result.data.err.data,
                                    type: 'error'
                                });

                            }
                        });
                    }
                });
            }




            SelectedCampaign.Id = null;
            //open('/setup-campaign-builder2')
            $scope.editCampaign = function(dataItem) {
                $location.path('/set-campaign-builder');
                $location.search('id', dataItem.campaign_id);

            };
            $scope.archiveCampaign = function(dataItem) {
                console.log(camp_id);
                var campaignName = dataItem.name,
                    camp_id = dataItem.campaign_id;
                var saveData = {
                    "campaign": {
                        "id": camp_id,
                        "status": 'deleted',
                        "org_unit_id": $rootScope.currentOUId
                    }
                };


                var message = '';
                //message += (list_ids != "" ? 'This campaign is assigned to distribution list. ' : '');
                message += 'Are you sure you want to archive campaign - ' + campaignName + '?'
                $bootbox.confirm(message, function(clickedOK) {
                    if (clickedOK) {
                        CampaignWebService.setCampaignStatus(saveData).then(function(result) {
                            if (result.data.status === 'success') {
                                var indexToRemove = _.findIndex($scope.data.rows, function(u) {
                                    return u[0] === index[0];
                                });
                                $scope.data.rows.splice(indexToRemove, 1);
                                pinesNotifications.notify({
                                    title: 'Campaign',
                                    text: campaignName + " has been archived.",
                                    type: 'success'
                                });
                            } else {
                                $scope.error = result;
                            }
                        });
                    }
                });
            };
            $scope.locate = {
                locationheadings: ['Id', 'Location', 'Address', 'City', 'State', 'Zip', 'Phone', 'Actions'],
                locations: [
                    ['1', 'LogMyCalls', '1664 S. Dixie Dr.', 'Saint George', 'UT', '84770', '6809909123', 'Delete'],
                    ['2', 'Blue Moon Inn', '25 Willow Ln.', 'Port Costa', 'CA', '94569', '9259465638', 'Delete'],
                    ['3', 'Walnut Creek branch', '2705 Main St.', 'Walnut Creek', 'CA', '94598', '9255126685', 'Delete'],
                    ['4', 'Ocean Gate Shop', '321 Mall Dr.', 'St. George', 'UT', '84790', '4356746700', 'Delete'],
                    ['5', 'South Kings branch', '3110 S. Kings Hwy', 'Nob Hill', 'CA', '94518', '9255126225', 'Delete']
                ]
            };
            $scope.getHeader = function() {
                return ["Account Name", "Account ID", "Group Name", "Group ID", "Group External ID", "Group Status", "Campaign Name", "Campaign ID", "Campaign External ID", "Campaign Start", "Campaign End", "Campaign Status", "Tracking Number Name", "Tracking Number ID", "Tracking Number", "Ring-to Phone Number", "DNI", "Ad Source", "Custom Source 1", "Custom Source 2", "Custom Source 3", "Custom Source 4", "Custom Source 5", "Spam Guard Status"];
            };
            $scope.getCSVData = function(formate) {

                var campIdReport = {};
                var campaignIdsRport = [];
                var campReportData = {};
                var callFlowData = {};
                var getCallFlowReport = {};
                var deferred = $q.defer();
                var response = CampaignWebService.getCampaignsCallFlowReport($scope.userAccess.campaign);
                response.then(function(result) {
                    if (result.data.json != 'error') {
                        campReportData = result.data.json;
                        var campaignData = [];
                        for (var i = 0; i < campReportData.length; i++) {

                            campaignData.push({
                                a: campReportData[i].account_name,
                                b: campReportData[i].account_id,
                                c: campReportData[i].group_name,
                                d: campReportData[i].group_id,
                                e: campReportData[i].group_external_id,
                                f: campReportData[i].group_status,
                                g: campReportData[i].campaign_name,
                                h: campReportData[i].campaign_id,
                                i: campReportData[i].campaign_external_id,
                                j: campReportData[i].start_date,
                                k: campReportData[i].end_date,
                                l: campReportData[i].campaign_status,
                                m: campReportData[i].tracking_name,
                                n: campReportData[i].tracking_id,
                                o: campReportData[i].tracking_number,
                                p: campReportData[i].ring_to_number,
                                q: campReportData[i].dni,
                                r: campReportData[i].ad_source,
                                s: campReportData[i].custom_source_name1,
                                t: campReportData[i].custom_source_name2,
                                u: campReportData[i].custom_source_name3,
                                v: campReportData[i].custom_source_name4,
                                x: campReportData[i].custom_source_name5,
                                y: campReportData[i].spam_guard,
                            });




                        }
                        console.log(campaignData);
                        deferred.resolve(campaignData);
                        if ($rootScope.isSafari) {
                            var reportName = $scope.CurrentOUName;
                            deferred.resolve(JSONToCSVConvertor(campaignData, reportName, true, formate));
                        } else {
                            return deferred.promise;
                        }
                    }
                });
                if (!$rootScope.isSafari) {
                    return deferred.promise;
                }
            };
            $scope.exportPDF = function() {
                // Hide the drop down for Export so it doesnt appear in the PDF
                $(".buttons").hide();

                // If we don't temporarily set this field to empty string, then it will
                // appear as text inside the box, sometimes "undefined"
                //   var temp = $scope.secondaryGrouping;
                //   $scope.secondaryGrouping = "";

                var pdf = new jsPDF('p', 'pt', 'a4');

                //pdf.addHTML(document.body, function () {
                //    var string = pdf.output('datauristring');
                //    //$('.preview-pane').attr('src', string);
                //});
                pdf.addHTML($("#campData"), function() {
                    var string = pdf.output('datauristring');
                    //$('.preview-pane').attr('src', string);
                });

                setTimeout(function() {
                    pdf.save($scope.CurrentOUName + '.pdf');
                    $(".buttons").show();
                }, 5000);
            };

        }
    ])
    .controller('CampaignFormController', ['$scope', '$timeout', '$http', '$uibModal', '$location', 'CampaignWebService', 'SelectedCampaign', 'PhoneList', '$window', '$rootScope', 'pinesNotifications', '$route', 'DNIWebService', 'smDateTimePicker','$q','$bootbox',
        function($scope, $timeout, $http, $uibModal, $location, CampaignWebService, SelectedCampaign, PhoneList, $window, $rootScope, pinesNotifications, $route, DNIWebService, smDateTimePicker, $q, $bootbox) {
            'use strict';

            // CT-15371 - James Lemire
            if ($scope.userAccess.voicemail === undefined || $scope.userAccess.voicemail < 4) {
                $scope.voicemailComponent = false;
            } else {
                $scope.voicemailComponent = true;
            }
            
            if ($rootScope.timezone) {
                var rootScopeTimeZones = ['America/Halifax', 'America/New_York', 'America/Chicago', 'America/Denver', 'America/Phoenix', 'America/Los_Angeles'];
                var uiTimeZoneStrings = ['AT', 'ET', 'CT', 'MT', 'MT', 'PT'];
                $scope.timezoneString = uiTimeZoneStrings[rootScopeTimeZones.indexOf($rootScope.timezone)];
                // An invaild timezone value was saved to $rootScope.timezone, defaulting to Eastern.
                if (!$scope.timezoneString) {
                    $rootScope.timezone = 'America/New_York';
                    $scope.timezoneString = 'ET';
                }
            } else {
                $rootScope.timezone = 'America/New_York'
                $scope.timezoneString = 'ET'
            }
            if($rootScope.is_migrated == false || $rootScope.is_migrated == 'false'){
                var path = $location.url().split('?');
                if($location.path() == '/set-legacy-campaign-builder'){
                    location.href = '#/set-campaign-builder?'+ path[1];
                }else{
                    $location.path('/set-legacy-campaign-builder');
                    if($rootScope.editClickId != undefined){
                        $location.search('id',$rootScope.editClickId);
                    }
                }
            }
            $scope.isCampaignDetailsOpen = true;
            $scope.ownersPickList ={}; 
            $scope.isTrackingNumbersOpen = true;
            //$scope.isAdvancedTrackingNumbersOpen = true;
            $scope.panelHeading=$rootScope.currentOUName;
            $scope.dateTime = {};
            $scope.dateTime.startDate = {};
            $scope.universalNow = moment.tz($rootScope.timezone);
            $scope.dateTime.startDate.minDate = moment.tz($rootScope.timezone);
            $scope.dateTime.startDate.opened = false;
            $scope.dateTime.startDate.isMeridian = true;
            $scope.startOnLoad = true;

            $scope.dateTime.endDate = {};
            $scope.dateTime.endDate.minDate = moment.tz($rootScope.timezone);
            $scope.dateTime.endDate.date = undefined;
            $scope.dateTime.endDate.opened = false;
            $scope.dateTime.endDate.isMeridian = true;
            $scope.postCallIVR = false;
            $scope.isLoadingApi = true;

            if ($scope.userAccess.referral && $scope.userAccess.referral > 4) {
                $scope.referralSubscription = true;
            } else {
                $scope.referralSubscription = false;
            }

            $scope.referralNumber = null;
            $scope.showReferral = false;
            $scope.disableReferral = false;
            $scope.savingCampaign = false;
            $scope.initiatedAsReferral = false;
            $scope.referralChecked = false;

            $scope.toggleReferralCheckbox = function() {
                if (!$scope.disableReferral) {
                    $scope.referralChecked = !$scope.referralChecked;
                    $scope.referralNumber = null;
                }
            }

            $scope.referralClick = function() {
                $scope.referralNumber = null;
            }

            // Call this function with true as the first parameter to enable and set the opacticy to 100%
            // Call this function without a parameter to disable and set the opacity to 50%
            $scope.toggleReferralContainer = function(show) {
                if ($scope.showReferral) {
                    var referralCheckbox = document.getElementsByClassName('icheckbox_minimal-blue')[0];

                    if (show) {
                        document.getElementById("referral-container").style.opacity = "1";
                        //document.getElementById("referral-label").style.cursor = "pointer";
                        referralCheckbox.style.cursor = "pointer";

                        $scope.disableReferral = false;
                    } else {
                        document.getElementById("referral-container").style.opacity = "0.5";
                        //document.getElementById("referral-label").style.cursor = "not-allowed";
                        referralCheckbox.style.cursor = "not-allowed";

                        $scope.disableReferral = true;
                    }
                }
            }

            $scope.updateCallFlows = function() {
                    CampaignWebService.getCampaign($scope.Id, $scope.currentPage).then(function(result) {
                        var campaignData = result.data.json.campaigns[0];
                        console.log('INSIDE updateCallFlows IN campaign.js: Updating $scope.phoneNumbers with:', campaignData);
                        $scope.phoneNumbers = [];
                          var provisionedrouteIds = [];
                        campaignData.status === "inactive" ? $scope.campActive = false : $scope.campActive = true;
                        campaignData.provisioned_routes.forEach(function(provRoute) {
                            if (provRoute.phone_numbers.length > 0) {
                                var provCategory = '';
                                var provSubCategory = '';
                                var provChannelId = '';
                                var showButtons = false;

                                var f = (provRoute.status).charAt(0).toUpperCase();
                                provRoute.status = f + (provRoute.status).substr(1);

                                if(provisionedrouteIds.length === 0){
                                    provisionedrouteIds.push(provRoute.id);
                                    showButtons = true;
                                }
                                else if(provisionedrouteIds.indexOf(provRoute.id) === -1){
                                    showButtons = true;
                                    provisionedrouteIds.push(provRoute.id);
                                }
                                if (provRoute.channels[0]) {
                                    provCategory = provRoute.channels[0].category;
                                    provSubCategory = provRoute.channels[0].sub_category;
                                    provChannelId = provRoute.channels[0].id;
                                }
                                if (provRoute.phone_numbers[0].number) {
                                    if (angular.isUndefined(provRoute.pool)) {
                                        $scope.phoneNumbers.push({
                                            id: provRoute.id,
                                            phoneid: provRoute.phone_numbers[0].id,
                                            phone: provRoute.phone_numbers[0].number,
                                            phonep: provRoute.phone_numbers[0].pretty_number,
                                            name: provRoute.name,
                                            channels: provCategory + ":" + provSubCategory,
                                            channelId: provChannelId,
                                            status: provRoute.status,
                                            value: provRoute.call_value,
                                            rinterval: provRoute.repeat_interval,
                                            status2: provRoute.status,
                                            group: 4,
                                            groupName: 'admin',
                                            vendor_id: provRoute.phone_numbers[0].vendor_id,
                                            end_date: moment.utc(provRoute.referral_end_date).format('MM/DD/YYYY'),
                                            route_type: provRoute.route_type,
                                            ringto: provRoute.ringto,
                                            spam_guard: provRoute.spam_filter_enabled,
                                            sms_enabled: provRoute.sms_enabled ? provRoute.sms_enabled : false,
                                            showButtons : showButtons
                                        });
                                    } else {
                                        $scope.phoneNumbers.push({
                                            id: provRoute.id,
                                            phonep: provRoute.name,
                                            pooId: provRoute.pool[0].pool_id,
                                            quantity: provRoute.pool[0].quantity,
                                            state: provRoute.state,
                                            rate_center: provRoute.rate_center,
                                            pool_npa: provRoute.poolNPA,
                                            pool_nxx: provRoute.poolNXX,
                                            name: provRoute.name,
                                            channels: provCategory + ":" + provSubCategory,
                                            channelId: provChannelId,
                                            status: provRoute.status,
                                            value: provRoute.call_value,
                                            rinterval: provRoute.repeat_interval,
                                            status2: provRoute.status,
                                            group: 4,
                                            groupName: 'admin',
                                            vendor_id: provRoute.phone_numbers[0].vendor_id,
                                            end_date: moment.utc(provRoute.referral_end_date).format('MM/DD/YYYY'),
                                            route_type: provRoute.route_type,
                                            ringto: provRoute.ringto,
                                            spam_guard: provRoute.spam_filter_enabled,
                                            sms_enabled: provRoute.sms_enabled ? provRoute.sms_enabled : false,
                                            showButtons : showButtons
                                        });
                                    }
                                } else {
                                    if (angular.isUndefined(provRoute.pool)) {
                                        $scope.phoneNumbers.push({
                                            id: provRoute.id,
                                            phoneid: provRoute.phone_numbers[0].id,
                                            phone: provRoute.phone_numbers[0].number,
                                            phonep: provRoute.phone_numbers[0].pretty_number,
                                            name: provRoute.name,
                                            channels: provCategory + ":" + provSubCategory,
                                            channelId: provChannelId,
                                            status: provRoute.status,
                                            value: provRoute.call_value,
                                            rinterval: provRoute.repeat_interval,
                                            status2: provRoute.status,
                                            group: 4,
                                            groupName: 'admin',
                                            vendor_id: provRoute.phone_numbers[0].vendor_id,
                                            end_date: moment.utc(provRoute.referral_end_date).format('MM/DD/YYYY'),
                                            route_type: provRoute.route_type,
                                            ringto: provRoute.ringto,
                                            spam_guard: provRoute.spam_filter_enabled,
                                            sms_enabled: provRoute.sms_enabled ? provRoute.sms_enabled : false,
                                            showButtons : showButtons
                                        });
                                    } else {
                                        $scope.phoneNumbers.push({
                                            id: provRoute.id,
                                            phonep: provRoute.name,
                                            pooId: provRoute.pool[0].pool_id,
                                            quantity: provRoute.pool[0].quantity,
                                            state: provRoute.state,
                                            rate_center: provRoute.rate_center,
                                            pool_npa: provRoute.poolNPA,
                                            pool_nxx: provRoute.poolNXX,
                                            name: provRoute.name,
                                            channels: provCategory + ":" + provSubCategory,
                                            channelId: provChannelId,
                                            status: provRoute.status,
                                            value: provRoute.call_value,
                                            rinterval: provRoute.repeat_interval,
                                            status2: provRoute.status,
                                            group: 4,
                                            groupName: 'admin',
                                            vendor_id: provRoute.phone_numbers[0].vendor_id,
                                            end_date: moment.utc(provRoute.referral_end_date).format('MM/DD/YYYY'),
                                            route_type: provRoute.route_type,
                                            ringto: provRoute.ringto,
                                            spam_guard: provRoute.spam_filter_enabled,
                                            sms_enabled: provRoute.sms_enabled ? provRoute.sms_enabled : false,
                                            showButtons : showButtons
                                        });
                                    }
                                }
                            }
                        });
                    });
            }

            $scope.getGroupsHeader = function() {
                return ["Account", "Account OUID","Account External ID","Parent Group","Parent Group OUID","Parent Group External ID" ,"Group", "Group OUID", "Group External ID", "Campaign ",  "Campaign External ID", "Tracking Number",  "Tracking Number Name","Ring-to Phone Number", "Tracking Number Type", "Tracking Number Status", "Call Value", "Ad Source", "Repeat Interval (in Hours)", "Spam Guard", "SMS", "Play Disclaimer","Pre-call Webhook","Instant Insights","Instant Insights Configuration","Record Call", "Custom Source 1", "Custom Source 2", "Custom Source 3", "Custom Source 4", "Custom Source 5", "DNI","Host Domain","Referring Website","HTML Class","DNI Type","Custom Parameters","Voicemail","Voice Prompt","Whisper Message","Hunt Type"];
            };

            $scope.getCSVGroupData = function(){
               $scope.groupsReportFileName = $scope.name +"_Tracking Number Details_" + moment().format('YYYY-MM-DD') + ".csv";
                var campIdReport = {};
                var campaignIdsRport = [];
                var campReportData = {};
                var callFlowData = {};
                var getCallFlowReport = {};
                var deferred = $q.defer();
                var response = CampaignWebService.getCampaignsCallFlowReport($scope.userAccess.campaign,  $scope.campId);
                response.then(function(result) {
                    if (result.data.json != 'error') {
                        campReportData = result.data.json;
                        var campaignData = [];
                        for (var i = 0; i < campReportData.length; i++) {
                            var route = campReportData[i].tracking_number_type;
                            campaignData.push({
                                a: campReportData[i].account_name,
                                b: campReportData[i].account_id,
                                c: campReportData[i].account_exid,
                                d: campReportData[i].parent_group_name,
                                e: campReportData[i].parent_group_id,
                                f: campReportData[i].parent_group_external_id,
                                g: campReportData[i].group_name,
                                h: campReportData[i].group_id,
                                i: campReportData[i].group_external_id,
                                j: campReportData[i].campaign_name,
                                k: campReportData[i].campaign_external_id,
                                l: campReportData[i].tracking_number,
                                m: campReportData[i].tracking_name,
                                t5: (route ==  'Outbound' || route == 'Voicemail') ? ' ' : (campReportData[i].ring_to_number),
                                n: campReportData[i].tracking_number_type,
                                o: campReportData[i].tracking_number_status,
                                p: (route ==  'Outbound' || route == 'Voicemail') ? ' ' : campReportData[i].call_value,
                                q: campReportData[i].ad_source,
                                r: (route ==  'Outbound') ? ' ' : campReportData[i].repeat_interval,
                                s: campReportData[i].spam_guard,
                                s1: campReportData[i].sms_enabled,
                                t: route == 'Voicemail' ? ' ' : campReportData[i].play_disclaimer,
                                u: route == 'Voicemail' ? ' ' : campReportData[i].pre_call_webhook,
                                y16: route == 'Voicemail' ? ' ' :campReportData[i].post_call_ivr_status,
                                zq : route == 'Voicemail' ? ' ' : campReportData[i].post_call_ivr,
                                v: route == 'Voicemail' ? ' ' : campReportData[i].record_call,
                                w: campReportData[i].custom_source_name1,
                                x: campReportData[i].custom_source_name2,
                                y: campReportData[i].custom_source_name3,
                                z: campReportData[i].custom_source_name4,
                                x1: campReportData[i].custom_source_name5,
                                q2: (route ==  'Outbound' || route == 'Voicemail') ? ' ' : campReportData[i].dni,
                                y3: (route ==  'Outbound' || route == 'Voicemail') ? ' ' : campReportData[i].host_domain,
                                y4: (route ==  'Outbound' || route == 'Voicemail') ? ' ' : campReportData[i].referring_website,
                                y5: (route ==  'Outbound' || route == 'Voicemail') ? ' ' : campReportData[i].html_class,
                                y6d: (route ==  'Outbound' || route == 'Voicemail') ? ' ' : campReportData[i].dni_type,
                                y7r: (route ==  'Outbound' || route == 'Voicemail') ? ' ' : campReportData[i].custom_parameters,
                                g5: route == 'Voicemail' ? ' ' : $scope.voicemailComponent == true ? campReportData[i].voicemail : ' ',
                                y8: campReportData[i].voice_prompt,
                                y9: campReportData[i].whisper_message,
                                yu4: (route ==  'Outbound' || route == 'Voicemail') ? ' ' :campReportData[i].hunt_type,

                            });
                     }
                        console.log(campaignData);
                        deferred.resolve(campaignData);
                        if ($rootScope.isSafari) {
                           // var reportName = $scope.CurrentOUName;
                            deferred.resolve(JSONToCSVConvertor(campaignData, reportName, true, formate));
                        } else {
                            return deferred.promise;
                        }
                    }
                });
                if (!$rootScope.isSafari) {
                    return deferred.promise;
                }
            }

            $scope.dniParams = function(size) {
                var modalInstance = $uibModal.open({
                    templateUrl: 'assets/partials/dniParams.html',
                    controller: 'DNIModelController',
                    size: size,
                    resolve: {
                        canModify: function() {
                            return $scope.canModify == true ? true : false;
                        },
                        callingController: function() {
                            return 'campaign';
                        }
                    }
                });
            };

            $scope.editBlacklist = function(size) {
                var modalInstance = $uibModal.open({
                    templateUrl: 'assets/partials/editBlacklist.html',
                    controller: 'BlacklistModalController',
                    size: size
                });
            };

            var selCampOwner = null;
            $scope.timeManual = false;
            $scope.dateIsNotEditable = false;
            $scope.endDateIsNotEditable = false;
            $scope.endDateIsNotEditable2 = true;
            $scope.switchStatus = 1;
            $scope.switchStatus2 = 1;
            $scope.switchStatus3 = 1;
            $scope.switchStatus4 = 1;
            $scope.switchStatus5 = 1;
            $scope.switchStatus6 = 1;
            $scope.currentPage = 1;
            //$scope.campStart;
            //$scope.campEnd;
            $scope.phoneNumbers = [];
            $scope.Id = ($location.search()).id;
            var ou_id = ($location.search()).ou_id;
            var level = ($location.search()).level;
            var billing_id = ($location.search()).billing_id;
            var parent_id = ($location.search()).parent_id;

            if (ou_id !== undefined && !angular.isNumber(ou_id)) {
                $rootScope.currentOUId = ou_id;
                $rootScope.$emit('current-ou-updated', {
                    'id': parseInt(ou_id),
                    'level': parseInt(level),
                    'billing_id': parseInt(billing_id),
                    'parent_id': parseInt(parent_id)
                });
            }

            $scope.status = false;
            $scope.selectedChannels = [];
            var initialStatus;
            $scope.iStatus = true;
            PhoneList.clearList();
            // $scope.name = "New Campaign";
            $scope.campId = "";
            // $scope.startDate;
            $scope.selUsers = [];
            $scope.assSalesRep = [];
            if ($scope.Id) {
                $scope.isNewCamp = false;
            } else {
                $scope.isNewCamp = true;
                $scope.dateTime.startDate.date = moment.tz($rootScope.timezone);
            }

            $scope.pageChanged = function(newPage) {
                $scope.currentPage = newPage;
            };

            $scope.checkCallFlowIdUrl = function(pnumber) {
                    $rootScope.$emit("loadCallFlowReceiver", pnumber);
            }
                //$scope.callFlowActive = true;
            CampaignWebService.getCampOwners($rootScope.currentOUId, $scope.Id).then(function(result) {
                if (result.data.result != 'error') {
                    var campaignOwners = {},
                        ouName,
                        userName,
                        userId;
                    var userData = result.data.json;
                    userData.forEach(function(userWithOu) {
                        ouName = userWithOu.org_unit_name;
                        userName = userWithOu.username;
                        userId = userWithOu.ct_user_id;
                        if (campaignOwners[ouName] === undefined) {
                            campaignOwners[ouName] = {
                                'ouName': ouName,
                                'userList': [{
                                    id: userId,
                                    name: userName
                                }]
                            };
                        } else {
                            campaignOwners[ouName].userList.push({
                                id: userId,
                                name: userName
                            });
                        }
                    });
                    $scope.ownersPickList = campaignOwners;
                }
            });
            // CampaignWebService.getCompUsers needs to be called before getCampaign does in order for
            // Assign Users to correctly fill in previously selected users
            CampaignWebService.getCompUsers($rootScope.currentOUId).then(function(result) {
                    if (result.data.result != 'error') {
                        var assignedUsers = {},
                            seletedUsers = [],
                            ouName,
                            userName,
                            userId,
                            addToCampaigns;
                        var userData = result.data.json.all_users;
                        userData.forEach(function(userWithOu) {
                            ouName = userWithOu.org_unit_name;
                            userName = userWithOu.username;
                            userId = userWithOu.ct_user_id;
                            // addToCampaigns = userWithOu.add_to_campaigns;
                            if (assignedUsers[ouName] === undefined) {
                                assignedUsers[ouName] = {
                                    'ouName': ouName,
                                    'userList': [{
                                        id: userId,
                                        name: userName
                                    }]
                                };
                            } else {
                                assignedUsers[ouName].userList.push({
                                    id: userId,
                                    name: userName
                                });
                            }

                        });
                        if (!$scope.Id && result.data.json.added_users[0].users_list !== null) {
                            seletedUsers = (result.data.json.added_users[0].users_list).split(',');
                        }

                        $scope.assUserPickList = assignedUsers;
                        if ($scope.Id) {
                            return CampaignWebService.getCampaign($scope.Id, $scope.currentPage);
                        } else {
                            $scope.campActive = true;
                            $scope.isLoadingApi = false;
                            $scope.iStatus = true;
                            if($window.sessionStorage && $window.sessionStorage.roleId !== "4" && !$rootScope.partnerConvirzaAdmin){
                                $scope.assSalesRep = $window.sessionStorage.userId;
                            }
                            $scope.canModify = true;
                            $timeout(function() {
                                $scope.selUsers = seletedUsers;
                            }, 100);
                        }
                    }
                })
                //Notice the web service call up above a few lines for CampaignWebService.getCampaign($scope.Id);
                .then(function(result) {
                    if (result) {
                        $scope.isLoadingApi = false
                        if (result.data.result === 'error') {
                            pinesNotifications.notify({
                                title: 'Campaign',
                                text: result.data.err,
                                type: 'error'
                            });
                            return false;
                        }
                        if (result.data.result !== 'error') {
                            console.log('Loading in Campaign', result.data.json);

                            var campaignData = result.data.json.campaigns[0];

                            var provisionedrouteIds = [];
                            var pool_ids = [];
                            $scope.name = campaignData.name;
                            $scope.campId = campaignData.campaign_id;
                            $scope.campExtId = campaignData.campaign_ext_id;
                            initialStatus = campaignData.status;
                            $scope.totalDataRows = campaignData.totalRows;

                            if (initialStatus === null || initialStatus === "inactive" || initialStatus === "referral") {
								$scope.campActive = false;
								$scope.origCampStatus = false;
                                $scope.iStatus = false;
                                $scope.endDateIsNotEditable = true;
                            } else {
								$scope.campActive = true;
								$scope.origCampStatus = true;
                                $scope.iStatus = true;
                            }

                            // CT-15371 - James Lemire
                            if (campaignData.referral_number) {
                                $scope.showReferral = true;
                                $scope.loadingInCampaign = true;
                                $scope.referralNumber = campaignData.referral_number;
                                $scope.referralChecked = true;
                            }

                            // CT-15371 - James Lemire

                            $scope.dateTime.startDate.date = moment(campaignData.start_date);
                            $scope.dateTime.startDate.minDate = moment(campaignData.start_date);

                            if (campaignData.end_date == null) {
                                $scope.dateTime.endDate.date = undefined;
                                $scope.endDateIsNotEditable2 = true;
                            } else {
                                $scope.dateTime.endDate.date = moment(campaignData.end_date);
                                $scope.dateTime.endDate.minDate = moment.tz($rootScope.timezone);
                                // console.log('campaignData.end_date', moment.utc(campaignData.end_date));
                            }

                            // console.log('End date minimum date', timezoneBasedDateTime());
                            $scope.campEnd = campaignData.end_date;
                            // console.log('campaign end date', campEnd);
                            $scope.editOnLoad = true;

                            if ($scope.dateTime.startDate.date.isBefore(moment.tz($rootScope.timezone)))
                                $scope.dateIsNotEditable = true;

                            campaignData.users.forEach(function(user) {
                                $scope.selUsers.push(user.id);
                            });
                            // console.log('INSIDE CampaignWebService.getCampaign IN campaign.js: selUsers:', $scope.selUsers);
                            var idPresent = '';
                            _.each($scope.ownersPickList, function(owners) {
                                if (idPresent.length === 0) {
                                    idPresent = _.where(owners.userList, {
                                        id: campaignData.owner_user_id
                                    });
                                }
                            });

                            if (idPresent.length > 0) {
                                $scope.assSalesRep = campaignData.owner_user_id;
                            }
                            if (campaignData.owner_user_id == $window.sessionStorage.userId || $scope.userAccess.campaign > 6)
                                $scope.canModify = true;
                            
                            var itemsProcessed = 0;
                            campaignData.provisioned_routes.forEach(function(provRoute) {
                                if (provRoute.phone_numbers.length > 0) {
                                    var provCategory = '';
                                    var provSubCategory = '';
                                    var provChannelId = '';
                                    var showButtons = false;
                                    if(provRoute.status){
                                        var f = (provRoute.status).charAt(0).toUpperCase();
                                        provRoute.status = f + (provRoute.status).substr(1);
                                    }
                                    if (provRoute.channels[0]) {
                                        provCategory = provRoute.channels[0].category;
                                        provSubCategory = provRoute.channels[0].sub_category;
                                        provChannelId = provRoute.channels[0].id;
                                    }

                                    // provRoute.phone_numbers.forEach(pnumber){

                                    // })

                                    if(provisionedrouteIds.length === 0){
                                        provisionedrouteIds.push(provRoute.id);
                                        showButtons = true;
                                    }
                                    else if(provisionedrouteIds.indexOf(provRoute.id) === -1){
                                        showButtons = true;
                                        provisionedrouteIds.push(provRoute.id);
                                    }
                                    if (provRoute.phone_numbers[0].number) {
                                        if (angular.isUndefined(provRoute.pool)) {
                                            $scope.phoneNumbers.push({
                                                id: provRoute.id,
                                                phoneid: provRoute.phone_numbers[0].id,
                                                phone: provRoute.phone_numbers[0].number,
                                                phonep: provRoute.phone_numbers[0].pretty_number,
                                                name: provRoute.name,
                                                channels: provCategory + ":" + provSubCategory,
                                                channelId: provChannelId,
                                                status: provRoute.status,
                                                value: provRoute.call_value,
                                                rinterval: provRoute.repeat_interval,
                                                status2: provRoute.status,
                                                group: 4,
                                                groupName: 'admin',
                                                vendor_id: provRoute.phone_numbers[0].vendor_id,
                                                end_date: moment.utc(provRoute.referral_end_date).format('MM/DD/YYYY'),
                                                webhook_id: provRoute.webhook_id,
                                                route_type: provRoute.route_type,
                                                ringto: provRoute.ringto,
                                                spam_guard: provRoute.spam_filter_enabled,
                                                sms_enabled: provRoute.sms_enabled ? provRoute.sms_enabled : false,
                                                showButtons : showButtons
                                            });
                                        } else {
                                            $scope.phoneNumbers.push({
                                                id: provRoute.id,
                                                phonep: provRoute.name,
                                                pooId: provRoute.pool[0].pool_id,
                                                quantity: provRoute.pool[0].quantity,
                                                state: provRoute.state,
                                                rate_center: provRoute.rate_center,
                                                pool_npa: provRoute.poolNPA,
                                                pool_nxx: provRoute.poolNXX,
                                                name: provRoute.name,
                                                channels: provCategory + ":" + provSubCategory,
                                                channelId: provChannelId,
                                                status: provRoute.status,
                                                value: provRoute.call_value,
                                                rinterval: provRoute.repeat_interval,
                                                status2: provRoute.status,
                                                group: 4,
                                                groupName: 'admin',
                                                vendor_id: provRoute.phone_numbers[0].vendor_id,
                                                end_date: moment.utc(provRoute.referral_end_date).format('MM/DD/YYYY'),
                                                webhook_id: provRoute.webhook_id,
                                                route_type: provRoute.route_type,
                                                ringto: provRoute.ringto,
                                                spam_guard: provRoute.spam_filter_enabled,
                                                sms_enabled: provRoute.sms_enabled ? provRoute.sms_enabled : false,
                                                showButtons : showButtons
                                            });
                                        }
                                    } else{
                                        if(provRoute.route_type=='Schedule' || provRoute.route_type=='Percentage'){
                                            if (provRoute.pool !== undefined &&  provRoute.pool.length > 0 && pool_ids.indexOf(provRoute.pool[0].pool_id) === -1) {
                                                pool_ids.push(provRoute.pool[0].pool_id);
                                                $scope.phoneNumbers.push({
                                                    id: provRoute.id,
                                                    phonep: provRoute.name,
                                                    pooId: provRoute.pool[0].pool_id,
                                                    quantity: provRoute.pool[0].quantity,
                                                    state: provRoute.state,
                                                    rate_center: provRoute.rate_center,
                                                    pool_npa: provRoute.poolNPA,
                                                    pool_nxx: provRoute.poolNXX,
                                                    name: provRoute.name,
                                                    channels: provCategory + ":" + provSubCategory,
                                                    channelId: provChannelId,
                                                    status: provRoute.status,
                                                    value: provRoute.call_value,
                                                    rinterval: provRoute.repeat_interval,
                                                    status2: provRoute.status,
                                                    group: 4,
                                                    groupName: 'admin',
                                                    vendor_id: provRoute.phone_numbers[0].vendor_id,
                                                    end_date: moment.utc(provRoute.referral_end_date).format('MM/DD/YYYY'),
                                                    webhook_id: provRoute.webhook_id,
                                                      route_type: provRoute.route_type,
                                                    ringto: provRoute.ringto,
                                                    spam_guard: provRoute.spam_filter_enabled,
                                                    sms_enabled: provRoute.sms_enabled ? provRoute.sms_enabled : false,
                                                    showButtons : showButtons
                                                });
                                            }else{
                                                    $scope.phoneNumbers.push({
                                                    id: provRoute.id,
                                                    phonep: provRoute.name,
                                                    name: provRoute.name,
                                                    channels: provCategory + ":" + provSubCategory,
                                                    channelId: provChannelId,
                                                    status: provRoute.status,
                                                    value: provRoute.call_value,
                                                    rinterval: provRoute.repeat_interval,
                                                    status2: provRoute.status,
                                                    group: 4,
                                                    groupName: 'admin',
                                                    vendor_id: provRoute.phone_numbers[0].vendor_id,
                                                    end_date: moment.utc(provRoute.referral_end_date).format('MM/DD/YYYY'),
                                                    webhook_id: provRoute.webhook_id,
                                                    route_type: provRoute.route_type,
                                                    ringto: provRoute.ringto,
                                                    spam_guard: provRoute.spam_filter_enabled,
                                                    sms_enabled: provRoute.sms_enabled ? provRoute.sms_enabled : false,
                                                    showButtons : showButtons
                                                });
                                            }
                                        }else{
                                            if (provRoute.pool !== undefined &&  provRoute.pool.length > 0) {
                                                pool_ids.push(provRoute.pool[0].pool_id);
                                                $scope.phoneNumbers.push({
                                                    id: provRoute.id,
                                                    phonep: provRoute.name,
                                                    pooId: provRoute.pool[0].pool_id,
                                                    quantity: provRoute.pool[0].quantity,
                                                    state: provRoute.state,
                                                    rate_center: provRoute.rate_center,
                                                    pool_npa: provRoute.poolNPA,
                                                    pool_nxx: provRoute.poolNXX,
                                                    name: provRoute.name,
                                                    channels: provCategory + ":" + provSubCategory,
                                                    channelId: provChannelId,
                                                    status: provRoute.status,
                                                    value: provRoute.call_value,
                                                    rinterval: provRoute.repeat_interval,
                                                    status2: provRoute.status,
                                                    group: 4,
                                                    groupName: 'admin',
                                                    vendor_id: provRoute.phone_numbers[0].vendor_id,
                                                    end_date: moment.utc(provRoute.referral_end_date).format('MM/DD/YYYY'),
                                                    webhook_id: provRoute.webhook_id,
                                                      route_type: provRoute.route_type,
                                                    ringto: provRoute.ringto,
                                                    spam_guard: provRoute.spam_filter_enabled,
                                                    sms_enabled: provRoute.sms_enabled ? provRoute.sms_enabled : false,
                                                    showButtons : showButtons
                                                });
                                            }
                                        }
                                    }
                                }
                                itemsProcessed ++;
                                if(itemsProcessed == campaignData.provisioned_routes.length){
                                    if($route.current.params.prov_id){
                                        var provId = parseInt($route.current.params.prov_id);
                                        var cf = _.find($scope.phoneNumbers,function(rep){
                                            return ( provId === rep.id);
                                         });
                                         $rootScope.$emit("loadCallFlowReceiver", cf);
                                            setTimeout(function() {
                                            window.scrollTo(0,document.body.scrollHeight);
                                        }, 150);
                                    }
                                }
                            });

                            $scope.loadingInCampaign = false;
                            $scope.cfid = $location.search().cfid;
                            if ($scope.cfid) {
                                var campIndex = _.findLastIndex($scope.phoneNumbers, {
                                    id: parseInt($scope.cfid)
                                });
                                if (campIndex > -1) {
                                    $scope.checkCallFlowIdUrl($scope.phoneNumbers[campIndex]);
                                }
                            }

                        } else if (result.data.result === 'error') {
                            console.log('ERROR getCampaign CWS');
                        }
                    }
                });

            // CT-15371 - James Lemire
            $scope.saveCampaign = function() {
                $scope.savingCampaign = true;
                // var now = moment.tz($rootScope.timezone);
                // console.log('INSIDE saveCampaign IN campaign.js: ***UserPickList:', $scope.assUserPickList);
                // console.log('INSIDE saveCampaign IN campaign.js: selUsers:', $scope.selUsers);
                // console.log('INSIDE saveCampaign IN campaign.js: ***SalesRep:', $scope.assSalesRep);

                // Validation
                // console.log('INSIDE saveCampaign IN campaign.js: Is the form valid?', $scope.campForm);
                // console.log('INSIDE saveCampaign IN campaign.js: Assigned Users', $scope.selUsers);

                if (!$scope.name) {
                    pinesNotifications.notify({
                        title: 'Campaign Details',
                        text: 'Campaign name should not be empty.',
                        type: 'error'
                    });

                    $scope.savingCampaign = false;
                    return;
                }

                if (!$scope.assSalesRep || !$scope.assSalesRep.toString().length) {
                    pinesNotifications.notify({
                        title: 'Campaign Details',
                        text: 'Campaign owner should not be empty.',
                        type: 'error'
                    });

                    $scope.savingCampaign = false;
                    return;
                }

                if ($scope.dateTime.endDate.date && moment($scope.dateTime.startDate.date).isAfter($scope.dateTime.endDate.date)) {
                    pinesNotifications.notify({
                        title: 'Campaign Details',
                        text: 'Campaign end date should not be before campaign start date.',
                        type: 'error'
                    });

                    $scope.savingCampaign = false;
                    return;
                }

                if (moment($scope.dateTime.startDate.date).isBefore($scope.universalNow.format('DD-MMMM-YYYY hh:mm A')) && !$scope.dateIsNotEditable) {
                    pinesNotifications.notify({
                        title: 'Campaign Details',
                        text: 'Campaign start date should not be before current time: ' + $scope.universalNow.format('DD-MMMM-YYYY hh:mm A') + ' (' + $scope.timezoneString + ' )',
                        type: 'error'
                    })

                    $scope.savingCampaign = false;
                    return;
                }

                if ($scope.dateTime.endDate.date && moment($scope.dateTime.endDate.date).isBefore($scope.universalNow.format('DD-MMMM-YYYY hh:mm A')) && !$scope.endDateIsNotEditable) {
                    $scope.dateTime.endDate.date = $scope.universalNow;
                }

                if ($scope.showReferral && $scope.referralChecked) {
                    if ($scope.referralNumber) {
                        var referralNumber = $scope.referralNumber.replace(/\D/g, "");
                        if (referralNumber.length !== 10) {
                            angular.element("#referralNumber").addClass("ng-invalid ng-dirty");
                            angular.element("#referralNumber").removeClass("ng-valid");
                            pinesNotifications.notify({
                                title: 'Referral Phone Number',
                                text: 'The referral phone number specified is not a valid phone number. Please try again.',
                                type: 'error'
                            });

                            $scope.savingCampaign = false;
                            return;
                        }
                    } else {
                        angular.element("#referralNumber").addClass("ng-invalid ng-dirty");
                        angular.element("#referralNumber").removeClass("ng-valid");
                        pinesNotifications.notify({
                            title: 'Referral Phone Number',
                            text: 'Referral phone number is not a valid phone number.',
                            type: 'error'
                        });
                        $scope.savingCampaign = false;
                        return;
                    }
                }
                // Validation

                var status;
                if ($scope.campActive) {
                    status = "active";
                } else {
                    status = "inactive";
                }

                var campaignData = {
                    "campaign": {
                        "name": $scope.name,
                        "org_unit_id": parseInt($rootScope.currentOUId),
                        "external_id": $scope.campExtId ? $scope.campExtId : '',
                        "status": status,
                        "start_date": $scope.dateTime.startDate.date ? moment($scope.dateTime.startDate.date).format('YYYY-MM-DD HH:mm') : null,
                        "end_date": $scope.dateTime.endDate.date ? moment($scope.dateTime.endDate.date).format('YYYY-MM-DD HH:mm') : null,
                        "timezone": $rootScope.timezone,
                        "owner_user_id": $scope.assSalesRep
                    },
                    "referral": {
                        pnumber: null
                    }
                };

                if ($scope.showReferral) {
                    if ($scope.referralChecked && $scope.referralSubscription) {
                        campaignData.referral.pnumber = referralNumber;
                    }
                }
                if ($scope.Id) {
                    campaignData.campaign.id = parseInt($scope.Id);
                    if(!$scope.campActive){
                        CampaignWebService.checkOutboundCallerIdByCampaignID($scope.Id).then(function(result) {
						if($scope.origCampStatus == true ) {
							if( parseInt(result.data.json[0].count) > 0 ){								
								var msg ="Are you sure you want to deactivate this Campaign as its tracking number/s are selected as a Caller ID in outbound route?";
							} else {
								var msg ="Are you sure you want to deactivate this Campaign ?";
							}
							$bootbox.confirm(msg, function(clickedOK) {
                                if (clickedOK) {
                                    $scope.origCampStatus = false;
                                     CampaignWebService.updateCampaign(campaignData).then(function(result) {
                                        console.log("updateCampaign .result= ", result)
                                        $scope.formSubmit = false;
                                        console.log("INSIDE saveCampaign IN campaign.js: Result of update:", result);

                                        if (result.data.err === '') {
                                            $scope.Id = result.data.json.campaign.id;
                                            // $route.reload();
                                            pinesNotifications.notify({
                                                title: 'Update Campaign',
                                                text: 'Campaign updated successfully.',
                                                type: 'success'
                                            });

                                            console.log('CALLING UPDATE Tracking Numbers');
                                            $scope.updateCallFlows();
                                            var campaignObject={
                                                campaign_id:campaignData.campaign.id,
                                                campaign_name:campaignData.campaign.name,
                                                type:'campaign'
                                            }
                                            $scope.$emit('campaignOrGroupUpdateSms', {campaignOrGroupObject: campaignObject});
                                        } else {
                                            pinesNotifications.notify({
                                                title: 'Update Campaign',
                                                text: result.data.err,
                                                type: 'error'
                                            });
                                        }
                                        $scope.savingCampaign = false;
                                    });
                                }else{
                                    $scope.savingCampaign =false;
                                }
                            });

						} else{
							CampaignWebService.updateCampaign(campaignData).then(function(result) {
								console.log("updateCampaign .result= ", result)
								$scope.formSubmit = false;
								console.log("INSIDE saveCampaign IN campaign.js: Result of update:", result);
		
								if (result.data.err === '') {
									$scope.Id = result.data.json.campaign.id;
									// $route.reload();
									pinesNotifications.notify({
										title: 'Update Campaign',
										text: 'Campaign updated successfully.',
										type: 'success'
									});
		
									console.log('CALLING UPDATE Tracking Numbers');
                                    $scope.updateCallFlows();
                                    var campaignObject={
                                        campaign_id:campaignData.campaign.id,
                                        campaign_name:campaignData.campaign.name,
                                        type:'campaign'
                                    }
                                    $scope.$emit('campaignOrGroupUpdateSms', {campaignOrGroupObject: campaignObject});
								} else {
									pinesNotifications.notify({
										title: 'Update Campaign',
										text: result.data.err,
										type: 'error'
									});
								}
								$scope.savingCampaign = false;
							});
                               // return msg=null;
						}
							
                            
						});
						
                    }else{
						
                    CampaignWebService.updateCampaign(campaignData).then(function(result) {
                        console.log("updateCampaign .result= ", result)
                        $scope.formSubmit = false;
                        console.log("INSIDE saveCampaign IN campaign.js: Result of update:", result);

                        if (result.data.err === '') {
                            $scope.Id = result.data.json.campaign.id;
                            // $route.reload();
                            pinesNotifications.notify({
                                title: 'Update Campaign',
                                text: 'Campaign updated successfully.',
                                type: 'success'
                            });

                            console.log('CALLING UPDATE Tracking Numbers');
                            $scope.updateCallFlows();
                            var campaignObject={
                                campaign_id:campaignData.campaign.id,
                                campaign_name:campaignData.campaign.name,
                                type:'campaign'
                            }
                            $scope.$emit('campaignOrGroupUpdateSms', {campaignOrGroupObject: campaignObject});
                        } else {
                            pinesNotifications.notify({
                                title: 'Update Campaign',
                                text: result.data.err,
                                type: 'error'
                            });
                        }
                        $scope.savingCampaign = false;
                    });
                    }
                } else {
                    console.log("INSIDE saveCampaign IN campaign.js: Creating campaign with:", campaignData);
                    CampaignWebService.createCampaign(campaignData).then(function(result) {
                        console.log("INSIDE saveCampaign IN campaign.js: Result of creation:", result);
                        if (result.data.err === '') {
                            SelectedCampaign.Id = result.data.json.campaign.campaign_id;
                            $location.search('id', SelectedCampaign.Id);
                            $scope.Id = SelectedCampaign.Id;
                            pinesNotifications.notify({
                                title: 'Create Campaign',
                                text: 'Campaign created successfully.',
                                type: 'success'
                            });
                        } else {
                            pinesNotifications.notify({
                                title: 'Create Campaign',
                                text: result.data.err,
                                type: 'error'
                            });
                        }
                        $scope.savingCampaign = false;
                    });
                }
            };
            // CT-15371 - James Lemire

            $scope.colorPicked = '#fa4d4d';

            $scope.select2RemoteOptions = {
                placeholder: "Search for a movie",
                minimumInputLength: 3,
                width: 'resolve',
                ajax: {
                    url: "http://api.rottentomatoes.com/api/public/v1.0/movies.json",
                    dataType: 'jsonp',
                    quietMillis: 100,
                    data: function(term, page) { // page is the one-based page number tracked by Select2
                        return {
                            q: term, //search term
                            page_limit: 10, // page size
                            page: page, // page number
                            apikey: "8vzys3eka2s9hpvkh7wwzp7e" // please do not use so this example keeps working
                        };
                    },
                    results: function(data, page) {
                        var more = (page * 10) < data.total; // whether or not there are more results available

                        // notice we return the value of more so Select2 knows if more results can be loaded
                        return {
                            results: data.movies,
                            more: more
                        };
                    }
                },
                formatResult: function(movie) {
                    var markup = "<table class='movie-result'><tr>";
                    if (movie.posters !== undefined && movie.posters.thumbnail !== undefined) {
                        markup += "<td class='movie-image'><img src='" + movie.posters.thumbnail + "'/></td>";
                    }
                    markup += "<td class='movie-info'><div class='movie-title'>" + movie.title + "</div>";
                    if (movie.critics_consensus !== undefined) {
                        markup += "<div class='movie-synopsis'>" + movie.critics_consensus + "</div>";
                    } else if (movie.synopsis !== undefined) {
                        markup += "<div class='movie-synopsis'>" + movie.synopsis + "</div>";
                    }
                    markup += "</td></tr></table>";
                    return markup;
                },
                formatSelection: function(movie) {
                    return movie.title;
                },
                dropdownCssClass: "bigdrop", // apply css that makes the dropdown taller
                escapeMarkup: function(m) {
                        return m;
                    } // we do not want to escape markup since we are displaying html in results
            };


            $scope.select2 = {
                'multiple': true,
                'allowClear': true
                    // 'simple_tags': true,
                    // 'tags': ['tag1', 'tag2', 'tag3', 'tag4'] // Can be empty list.
            };

            $scope.multiSelect1 = [];
            $scope.multiSelect2 = [];
			
			$scope.toggleCallFlow = function() {
				if ($scope.cfactive) {
					$scope.originalcfactive = false;
				} else {
					$scope.originalcfactive = true;
				}
			}

            // CT-15371 - James Lemire
            $scope.activeToggle = function() {
                if ($scope.campActive) {
                    $scope.dateTime.startDate.minDate = moment.tz($rootScope.timezone);
                    $scope.dateTime.startDate.date = moment.tz($rootScope.timezone);
                    $scope.dateIsNotEditable = false;
                    $scope.endDateIsNotEditable = false;
                    $scope.dateTime.endDate.minDate = moment.tz($rootScope.timezone);
                    $scope.dateTime.endDate.date = null;
                    angular.element('#end-date-picker md-input-container').removeClass('md-input-has-value');
                    $scope.referralChecked = false;
					$scope.referralNumber = null;
					$scope.origCampStatus = false;
                } else {
                    $scope.ignoreEndDateWatch = true;
                    $scope.dateTime.endDate.minDate = moment.tz($rootScope.timezone);
                    console.log('ACTIVE TOGGLE END DATE');
                    $scope.dateTime.endDate.date = moment.tz($rootScope.timezone);
                    $scope.endDateIsNotEditable = true;
                    $scope.dateIsNotEditable = true;
                    $scope.referralChecked = false;
					$scope.referralNumber = null;
					$scope.origCampStatus = true;
				}
				
            };
            // CT-15371 - James Lemire

            $scope.$watch('dateTime.startDate.date', function(newValue, oldValue) {
                $scope.formSubmit = false;
                $scope.submitted = false;

                /*if (moment($scope.dateTime.startDate.date).isAfter(moment.tz($rootScope.timezone).format('DD-MMMM-YYYY hh:mm A'))) {
                        $scope.campActive = false;
                }*/
            });

            $scope.$watch('dateTime.endDate.date', function(newValue, oldValue) {
                if ($scope.dateTime.endDate.date) {
                    angular.element('#end-date-picker md-input-container').addClass('md-input-has-value');
                }
                if (!$scope.loadingInCampaign) {
                    if ($scope.dateTime.endDate.date && $scope.referralSubscription) {
                        $scope.showReferral = true;
                        if (moment($scope.dateTime.endDate.date).isBefore(moment.tz($rootScope.timezone).format('DD-MMMM-YYYY hh:mm A')) && !$scope.ignoreEndDateWatch) {
                            if ($scope.campActive) {
                                $scope.toggleReferralContainer();
                            }
                        } else {
                            $scope.toggleReferralContainer(true);
                        }
                    } else if (!$scope.dateTime.endDate.date && $scope.referralSubscription) {
                        $scope.showReferral = false;
                    }
                }

                if ($scope.ignoreEndDateWatch) {
                    $scope.ignoreEndDateWatch = false;
                }
                // CT-15371 - James Lemire

                $scope.formSubmit = false;
                $scope.submitted = false;
                if (!$scope.dateTime.endDate.date) {
                    $scope.endDateIsNotEditable2 = true;
                } else {
                    $scope.endDateIsNotEditable2 = false;
                }
            });

            $scope.dateTime.dateOptions = {
                formatYear: 'yy',
                startingDay: 1
            };
            $scope.dateTime.format = 'dd-MMMM-yyyy';
            $scope.dateTime.timeStepH = 1;
            $scope.dateTime.timeStepM = 30;
            $scope.dateTime.timeOptions = {
                hstep: [1, 2, 3],
                mstep: [1, 5, 10, 15, 25, 30]
            };

            $scope.dateTime.today = function(date) {
                date = new Date();
            };
            $scope.dateTime.clear = function(date) {
                date = null;
            };
            $scope.dateTime.toggleMinDate = function(minDate) {
                minDate = minDate ? null : new Date();
            };
            $scope.dateTime.toggleMeridian = function(merid) {
                merid = !merid;
            };
            $scope.dateTime.open = function($event, dateObj) {
                $event.preventDefault();
                $event.stopPropagation();
                dateObj.opened = true;

            };
        }
    ])    
    .controller('DNIModelController', ['$scope', '$http', '$uibModalInstance', '$location', 'CampaignWebService', 'OrgUnitWebService', 'SelectedCampaign', 'PhoneList', '$window', '$rootScope', 'pinesNotifications', '$route', 'DNIWebService', 'canModify', 'callingController',
        function($scope, $http, $uibModalInstance, $location, CampaignWebService, OrgUnitWebService, SelectedCampaign, PhoneList, $window, $rootScope, pinesNotifications, $route, DNIWebService, canModify, callingController) {
            'use strict';
            $scope.dni = {};
            $scope.canModify = canModify;
            $scope.callingController = callingController;

            if (callingController === 'campaign')
                DNIWebService.getDniCustomParameters($rootScope.currentOUId).then(function(result) {
                    $scope.dni.dni_org_unit_id = null;
                    if (result.data.json[0].custom_params) {
                        $scope.dni.custom_params = result.data.json[0].custom_params;
                        $scope.dni.dniOuId = result.data.json[0].dni_org_unit[0].org_unit_id;
                        $scope.dni.dni_org_unit_id = result.data.json[0].dni_org_unit[0].dni_org_unit_id;
                    } else {
                        var dniOrgUnitData = {
                            dniOrgUnit: {
                                org_unit_id: $rootScope.currentOUId
                            }
                        };
                        DNIWebService.createDniOUData(dniOrgUnitData).then(function(result) {
                            $scope.dni.dni_org_unit_id = result.data.json.insertId;
                        });
                    }
                });
            else {
                OrgUnitWebService.getDefaultCustomParams($rootScope.currentOUId).then(function(result) {
                    if (result.data.json[0].custom_params) {
                        $scope.dni.custom_params = result.data.json[0].custom_params;
                    }
                });
            }

            $scope.cancel = function() {
                $uibModalInstance.dismiss('cancel');
            };

            $scope.saveParams = function() {
                var custom_param = $scope.dni.custom_params;
                if (custom_param == undefined) {
                    custom_param = "";
                } else {
                    custom_param = custom_param.replace(/\s/g, '');
                    custom_param = custom_param.split(',');
                    custom_param = custom_param.filter(function(v) {
                        return v !== '';
                    });
                    custom_param = custom_param.join(',');
                }
                var dniOrgUnitData = {
                    dniOrgUnit: {
                        custom_params: custom_param,
                        org_unit_id: $rootScope.currentOUId
                    }
                };
                if (callingController === 'campaign')
                    DNIWebService.updateDniOUData(dniOrgUnitData)
                    .then(function(result) {
                        $scope.dni.custom_params = custom_param;
                        pinesNotifications.notify({
                            title: 'Saved Custom URL Parameters',
                            text: 'Custom URL parameters have been saved. ',
                            type: 'success'
                        });
                    });
                else
                    OrgUnitWebService.createDefaultCustomParams(dniOrgUnitData)
                    .then(function(result) {
                        $scope.dni.custom_params = custom_param;
                        pinesNotifications.notify({
                            title: 'Saved Custom URL Parameters',
                            text: 'Custom URL parameters have been saved. ',
                            type: 'success'
                        });
                    });
                $uibModalInstance.close();
            };
        }
    ])
    .controller('BlacklistModalController', ['$scope', '$http', '$uibModalInstance', '$location', 'CampaignWebService', 'SelectedCampaign', 'PhoneList', '$window', '$rootScope', 'pinesNotifications', '$route',
        function($scope, $http, $uibModalInstance, $location, CampaignWebService, SelectedCampaign, PhoneList, $window, $rootScope, pinesNotifications, $route) {
            'use strict';
            CampaignWebService.getBlackList($rootScope.currentOUId).then(function(result) {
                console.log(result);
                if (result.data.result != 'error') {
                    $scope.search = {
                        number: result.data.json
                    };
                }
            });

            $scope.option = {
                words: ['1234567890'],
                color: 'yellow'
            };

            $scope.highlightString = function() {
                $('#txtNumber').highlightTextarea('destroy');
                var highlightText = [$scope.search.text];
                $('#txtNumber').highlightTextarea({
                    words: highlightText
                });
            };

            $scope.cancel = function() {
                $uibModalInstance.dismiss('cancel');
            };

            $scope.validateModalBlaclistNumbers = function() {
                var blacklistNumbers = $scope.search.number;
                var arrNumbers;
                if (blacklistNumbers !== '' && blacklistNumbers !== undefined)
                    arrNumbers = blacklistNumbers.split(',');
                var flag = false;
                var arrInvalid = [];
                if (angular.isArray(arrNumbers)) {
                    arrNumbers.forEach(function(number) {
                        if (number.length < 10 || isNaN(number) || number.length > 10) {
                            arrInvalid.push(number);
                        }
                    });

                    if (arrInvalid.length) {
                        flag = true;
                        var messageText = 'is invalid Phone Number.';

                        if (arrInvalid.length > 1) {
                            messageText = 'are invalid Phone Number.';
                        }
                        pinesNotifications.notify({
                            title: 'Blacklist Phone Number',
                            text: '\'' + arrInvalid.join(', ') + '\' ' + messageText,
                            type: 'error'
                        });
                    }
                }
                return flag;
            };

            $scope.saveBlacklist = function() {
                var blacklistNumbers = $scope.search.number;
                var blacklistjson = {
                    "blacklist": {
                        "org_unit_id": $rootScope.currentOUId,
                        "numbers": blacklistNumbers
                    }
                };

                if (!$scope.validateModalBlaclistNumbers()) {
                    CampaignWebService.saveBlackList(blacklistjson).then(function(result) {
                        console.log(result);
                        if (result.data.result != 'error') {
                            pinesNotifications.notify({
                                title: 'Blacklist Phone Number',
                                text: 'Successfully Saved BlackList',
                                type: 'success'
                            });
                            $uibModalInstance.close();
                        }
                    });
                }
            };
        }
    ])
    .controller('PhoneNumbersEditableController', ['$scope', 'UserWebService', 'TagWebService', '$filter', '$http', 'PhoneList', 'CampaignWebService', 'WebhookService', '$location', '$route', 'SelectedCampaign', '$rootScope', 'pinesNotifications', 'locationWebService', '$window', 'voicemailPromptService', 'VoicePromptService', 'WhisperMessageService', '$uibModal', '$timeout', 'DNIWebService', '$compile', '$bootbox', "DateTimeTimeZoned", "$q", "OrgUnitWebService",
        function($scope, UserWebService, TagWebService, $filter, $http, PhoneList, CampaignWebService, WebhookService, $location, $route, SelectedCampaign, $rootScope, pinesNotifications, locationWebService, $window, voicemailPromptService, voicepromptService, whispermessageService, $uibModal, $timeout, DNIWebService, $compile, $bootbox, DateTimeTimeZoned, $q, OrgUnitWebService) {
            'use strict';
            // $( "html" ).addClass("hideScroll");
            $( "body" ).addClass("showScroll");
            $scope.showSpamButton = false;
            $scope.disableSaveForSchedule = {
                levelOne:false,
                levelTwo:false,
                levelThird:false
            };
            $scope.overflowValidationHeader ="Tracking Number Details";
            if ($scope.userAccess && $scope.userAccess.spamguard) {
                $scope.showSpambutton = true
            }

            if($rootScope.userAccess.sms && (parseInt($rootScope.userAccess.sms) === 7)){
                $scope.showSMSbutton = true;
            }

            // Voicemail Component
            if ($scope.userAccess.voicemail === undefined || $scope.userAccess.voicemail < 4) {
                $scope.voicemailComponent = false;
            } else {
                $scope.voicemailComponent = true;
            }
            if($scope.userAccess.dni === undefined || $scope.userAccess.dni < 4){
                $scope.dniComponent = false;
            }else{
                $scope.dniComponent = true;
            }
            
            // $('.playpadding').click(function(){ 
            //     var allBtn = $('.playpadding').not(this);
            //     var clickedBtn = $(this).find(".fa");
            //     var checkClass = setInterval(function(){ 
            //         var elm = clickedBtn.hasClass('fa-pause');
            //             if(elm){
            //                 allBtn.each(function(i, obj) {
            //                     if (obj.disabled == false){
            //                         obj.classList.add("customDisabled");
            //                     }
            //                 });
            //             }else{
            //                 allBtn.removeClass("customDisabled");
            //                 clickedBtn.addClass("fa-play");
            //                 clearInterval(checkClass);
            //             }
            //         }, 100);
            //     });
            var defaultCfData = '';
            $scope.disablePlayBtn = function($event){
                var allBtn = $('.playpadding');
                var voicemail = angular.element( document.querySelector( '#voicemail' ) );
                var thisElm = $event.currentTarget;
                var icon = thisElm.children[0];
                icon.classList.add("fa-pause");
                var checkClass = setInterval(function(){ 
                    var elm = icon.classList.contains("fa-pause");
                    //thisElm.classList.contains('fa-pause');
                    if(elm){
                            allBtn.each(function(i, obj) {
                                if (obj.disabled == false){
                                    obj.classList.add("customDisabled");
                                }
                            });
                            thisElm.classList.remove("customDisabled");
                            voicemail.removeClass("customDisabled");
                        }else{
                            allBtn.removeClass("customDisabled");
                            voicemail.removeClass("customDisabled");
                            clearInterval(checkClass);
                        }
                    }, 100);
        };
        $scope.pauseCurrentPlayingAudio = function(){
            $rootScope.$emit("stopIvrAudios", {});
        };

        $rootScope.$on("stopIvrAudios", function(){
            if($scope.ivrAudio){
                $scope.ivrAudio.pause();  
            }
            if($scope.ivrAudio1)
            {
                $scope.ivrAudio1.pause();
            }
            if($scope.whisperAudio){
                $scope.whisperAudio.pause();
            }
         });
            $scope.shownotification=false;
            $scope.invalidSchedules = 0;
            $scope.$watch('shownotification',function() {
                if($scope.shownotification){
                    $scope.shownotification = false; 
                    pinesNotifications.notify({
                        title: 'Overflow Number Message',
                        text: 'Overflow Number  Deleted Successfully',
                        type: 'success'
                    });
                }

            })
            //$scope.scheduledDays =[];
            
             $scope.isAdvancedTrackingNumbersOpen = true;
             $scope.isAddTrackingNumbersOpen = true; 
             $scope.isCallActionsOpen = true;   
            $scope.days = [];
            $scope.scheduleInfo = [];
              $scope.scheduleEvents = {
                onItemCustomSelect: function(schData) { $scope.checkCurrentSchedule(schData)}
            }
          
            $scope.schedule = [];
            $scope.overflow = '3';
            $scope.showAddSchedule = true;
            $scope.showAddOverflow = function(id){
                if(UserWebService.unMaskData($scope.scheduleInfo[id].ringTo) !== undefined && UserWebService.unMaskData($scope.scheduleInfo[id].ringTo).length == 10){
                    $scope.scheduleInfo[id].isAddOverflow = false;
                    //$scope.showAddSchedule = false;
                   $scope.checkCurrentSchedule(id);
                }else{
                    $scope.scheduleInfo[id].isAddOverflow = true; 
                    $scope.showAddSchedule = true;  
                }
            }

            $scope.checkCurrentSchedule = function(id){
                _.each($scope.scheduleInfo ,function(scheduleData){
                    if(scheduleData.days.length !== 0 && scheduleData.fromTime !== '' && scheduleData.toTime !=="" && UserWebService.unMaskData(scheduleData.ringTo) !== undefined  ){ 
                        $scope.showAddSchedule = false;
                    }else{
                        $scope.showAddSchedule = true ; 
                    }
                });
                if(validateSchedule(id)){
                    $scope.showAddSchedule = true;
                    $scope.submitted1 = true;
                    $scope.formSubmit1 = true;
                    $scope.invalidSchedules++;
                    var scid = $scope.duplicateSchelduleID + 1;
                    if(scid == 1){
                        scid = scid + "st"
                    }
                    else if(scid == 2){
                        scid = scid + "nd"
                    }
                    else if(scid == 3){
                        scid = scid + "rd"
                    }
                    else if(scid >= 4){
                        scid = scid + "th"
                    }
                   pinesNotifications.notify({
                         title: 'Following a schedule',
                         text: 'Check for Overlaping Schedule For ' + scid + " Schedule",
                         type: 'error'
                     });
                }else{
                    $scope.submitted1 = false;
                    $scope.formSubmit1 = false;
                }
            }
            var validateSchedule = function(id){
                $scope.duplicateScheldule = false;
                $scope.duplicateSchelduleID = -1;
                $scope.scheduleTimeSlots.push("End of Day");
                var lastSchedule = '';
                var currentIndex = '';
                if($scope.scheduleInfo[0].schedule < 1 ){
                    return false;
                }
                if(id == 9999){
                     lastSchedule = $scope.scheduleInfo[$scope.scheduleInfo.length - 1];
                     currentIndex = $scope.scheduleInfo.length - 1;
                }else{
                    lastSchedule = $scope.scheduleInfo[id];
                    currentIndex = id;

                }
                if($scope.scheduleInfo.length > 1){
                    for(var i=0; i < $scope.scheduleInfo.length ;i++){
                        if($scope.scheduleInfo[i].days && $scope.scheduleInfo[i].days.length > 0){
                            for (var j = 0; j < $scope.scheduleInfo[i].days.length; j++) {
                                for (var k = 0; k < lastSchedule.days.length; k++) {
                                    if($scope.extendScheduleDays[$scope.scheduleInfo[i].days[j].id].indexOf(lastSchedule.days[k].id) > -1){
                                        var schFromTime = $scope.scheduleTimeSlots.indexOf($scope.scheduleInfo[i].fromTime);
                                        var schToTime = $scope.scheduleTimeSlots.indexOf($scope.scheduleInfo[i].toTime);
                                        var matchedFromTime = $scope.scheduleTimeSlots.indexOf(lastSchedule.fromTime);
                                        var matchedToTime = $scope.scheduleTimeSlots.indexOf(lastSchedule.toTime);

                                        if(i !== currentIndex && (( matchedFromTime < schToTime && matchedToTime > schFromTime)||( matchedFromTime < schToTime && matchedFromTime >= schFromTime)||(matchedToTime <= schToTime &&  matchedToTime > schFromTime))){ 
                                           $scope.duplicateScheldule = true;
                                           $scope.duplicateSchelduleID = i;
                                           
                                        }
                                    }

                                    if($scope.extendScheduleDays[lastSchedule.days[k].id].indexOf($scope.scheduleInfo[i].days[j].id) > -1){
                                        var schFromTime = $scope.scheduleTimeSlots.indexOf($scope.scheduleInfo[i].fromTime);
                                        var schToTime = $scope.scheduleTimeSlots.indexOf($scope.scheduleInfo[i].toTime);
                                        var matchedFromTime = $scope.scheduleTimeSlots.indexOf(lastSchedule.fromTime);
                                        var matchedToTime = $scope.scheduleTimeSlots.indexOf(lastSchedule.toTime);

                                        if(i !== currentIndex && (( matchedFromTime < schToTime && matchedToTime > schFromTime)||( matchedFromTime < schToTime && matchedFromTime >= schFromTime)||(matchedToTime <= schToTime &&  matchedToTime > schFromTime))){ 
                                           $scope.duplicateScheldule = true;
                                           $scope.duplicateSchelduleID = i;
                                          
                                        }
                                    }
                                }
                            }
                        }
                    }
                }else{
                    $scope.scheduleTimeSlots.splice(-1,1);
                    return false;

                }
                $scope.scheduleTimeSlots.splice(-1,1);
                if($scope.duplicateScheldule){
                    $scope.scheduleInfo[currentIndex].invalid = true
                }else if(currentIndex !== undefined){
                   $scope.scheduleInfo[currentIndex].invalid = false 
                }
                return $scope.duplicateScheldule;
            }
            $scope.checkCurrentIVRSchedule = function(id,scheduleInfo,level){
                var isOverlappingSchedules =false;
                _.each(scheduleInfo ,function(scheduleData){
                    if(scheduleData.days.length !== 0 && scheduleData.fromTime !== '' && scheduleData.toTime !=="" && UserWebService.unMaskData(scheduleData.ringTo) !== undefined  ){
                        $scope.showAddSchedule = false;
                    }else{
                        $scope.showAddSchedule = true ;
                    }
                });
                if(validateIVRSchedule(id,scheduleInfo,level)){
                    $scope.showAddSchedule = true;
                    $scope.submitted1 = true;
                    $scope.formSubmit1 = true;
                    $scope.invalidSchedules++;
                    var scid = $scope.duplicateSchelduleID + 1;
                    if(level == 1){
                        level+='st';
                    }else if(level == 2){
                        level+='nd';
                    }else{
                        level+='rd';
                    }

                    if(scid == 1){
                        scid = scid + "st"
                    }
                    else if(scid == 2){
                        scid = scid + "nd"
                    }
                    else if(scid == 3){
                        scid = scid + "rd"
                    }
                    else if(scid >= 4){
                        scid = scid + "th"
                    }
                   pinesNotifications.notify({
                         title: level+' level IVR Form',
                         text: 'Check for Overlaping Schedule For ' + scid + " Schedule",
                         type: 'error'
                     });
                    if(level === '1st'){
                        $scope.isOverlappingSchedules.levelOne = true;
                    }else if(level === '2nd'){
                        $scope.isOverlappingSchedules.levelTwo = true;
                    }else{
                        $scope.isOverlappingSchedules.levelThird = true;
                    }
                }else{
                    //$scope.submitted1 = false;
                    //$scope.formSubmit1 = false;
                    if(level === '1st'){
                        $scope.isOverlappingSchedules.levelOne = false;
                    }else if(level === '2nd'){
                        $scope.isOverlappingSchedules.levelTwo = false;
                    }else{
                        $scope.isOverlappingSchedules.levelThird = false;
                    }
                }
                //return isOverlappingSchedules;
            }
            var validateIVRSchedule = function(id,scheduleInfo,level){
                $scope.duplicateScheldule = false;
                $scope.duplicateSchelduleID = -1;
                $scope.scheduleTimeSlots.push("End of Day");
                var lastSchedule = '';
                var currentIndex = '';
                if(scheduleInfo.length < 1 ){
                    return false;
                }
                if(id == 9999){
                     lastSchedule = scheduleInfo[scheduleInfo.length - 1];
                     currentIndex = scheduleInfo.length - 1;
                }else{
                    lastSchedule = scheduleInfo[id];
                    currentIndex = id;

                }
                if(scheduleInfo.length > 1){
                    for(var i=0; i < scheduleInfo.length ;i++){
                        if(scheduleInfo[i].days && scheduleInfo[i].days.length > 0){
                            for (var j = 0; j < scheduleInfo[i].days.length; j++) {
                                for (var k = 0; k < lastSchedule.days.length; k++) {
                                    if($scope.extendScheduleDays[scheduleInfo[i].days[j].id].indexOf(lastSchedule.days[k].id) > -1){
                                        var schFromTime = $scope.scheduleTimeSlots.indexOf(scheduleInfo[i].fromTime);
                                        var schToTime = $scope.scheduleTimeSlots.indexOf(scheduleInfo[i].toTime);
                                        var matchedFromTime = $scope.scheduleTimeSlots.indexOf(lastSchedule.fromTime);
                                        var matchedToTime = $scope.scheduleTimeSlots.indexOf(lastSchedule.toTime);

                                        if(i !== currentIndex && (( matchedFromTime < schToTime && matchedToTime > schFromTime)||( matchedFromTime < schToTime && matchedFromTime >= schFromTime)||(matchedToTime <= schToTime &&  matchedToTime > schFromTime))){
                                           $scope.duplicateScheldule = true;
                                           $scope.duplicateSchelduleID = i;
                                        }
                                    }

                                    if($scope.extendScheduleDays[lastSchedule.days[k].id].indexOf(scheduleInfo[i].days[j].id) > -1){
                                        var schFromTime = $scope.scheduleTimeSlots.indexOf(scheduleInfo[i].fromTime);
                                        var schToTime = $scope.scheduleTimeSlots.indexOf(scheduleInfo[i].toTime);
                                        var matchedFromTime = $scope.scheduleTimeSlots.indexOf(lastSchedule.fromTime);
                                        var matchedToTime = $scope.scheduleTimeSlots.indexOf(lastSchedule.toTime);

                                        if(i !== currentIndex && (( matchedFromTime < schToTime && matchedToTime > schFromTime)||( matchedFromTime < schToTime && matchedFromTime >= schFromTime)||(matchedToTime <= schToTime &&  matchedToTime > schFromTime))){
                                           $scope.duplicateScheldule = true;
                                           $scope.duplicateSchelduleID = i;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }else{
                    $scope.scheduleTimeSlots.splice(-1,1);
                    return false;

                }
                $scope.scheduleTimeSlots.splice(-1,1);
                if($scope.duplicateScheldule){
                    scheduleInfo[currentIndex].invalid = true;
                }else if(currentIndex !== undefined){
                   scheduleInfo[currentIndex].invalid = false;
                }
                return $scope.duplicateScheldule;
            }
            
            $scope.checkForValidSchedules = function(){
                var invalid = 0;
                for (var i = $scope.scheduleInfo.length - 1; i >= 0; i--) {
                    validateSchedule(i);
                }
                _.each($scope.scheduleInfo ,function(scheduleData){
                    if((scheduleData.invalid || scheduleData.days.length === 0) && $scope.scheduleInfo.length > 1){
                        invalid++
                    }
                });
                return invalid;
            }
            $scope.addSchedule=function(){
                $scope.showAddSchedule = true ;
                var error = false;
                _.each($scope.scheduleInfo ,function(scheduleData){

                    if(scheduleData.days.length !== 0 && scheduleData.fromTime !== '' && scheduleData.toTime !=="" && UserWebService.unMaskData(scheduleData.ringTo) !== undefined ){ 
                        error = false;
                    }else{
                        error = true;
                    }
                });
                if(!error){
                    $scope.scheduleInfo.push({id:undefined,scheduleId:$scope.scheduleInfo.length,days:[],fromTime:'',toTime:'',ringTo:'', isAddOverflow:true,overflowNumbers:[{overflowNumber:'',rings: $scope.defaultsRings,overflow_order: 1}],simultaneousRings :false,activateVoicemail:false})
                }else{

                    var invalid = $scope.checkForValidSchedules();
                    if(invalid !== 0){
                        pinesNotifications.notify({
                            title: 'Following a schedule',
                            text: 'Please check for invalid schedule',
                            type: 'error'
                        });
                        
                //     }
                // if($scope.showAddSchedule || scheduleData.days.length == 0){
                //     //console.log($scope.duplicateSchelduleID);
                //     return;
                    }
                }
            }

            $scope.formationscheduleTimeSlots = function(id){
                $scope.scheduleInfo[id].scheduleEndTimeSlots = $scope.scheduleTimeSlots.slice($scope.scheduleTimeSlots.indexOf($scope.scheduleInfo[id].fromTime) + 1, $scope.scheduleTimeSlots.length);
                $scope.scheduleInfo[id].scheduleEndTimeSlots.push("End of Day");

            }
            $scope.checkRingToNumberSchedule = function(ringtonum){
                if(ringtonum){
                    var str = UserWebService.unMaskData(ringtonum);
                    if(str.charAt(0) == '0'){
                        return true;
                    }
                    if( UserWebService.unMaskData(ringtonum).length == 10){
                        return false;
                    }else{
                        return true;
                    }
                }else{
                    return true;
                }
            }
            $scope.removeSchedule = function(id) {
                    $bootbox.confirm("Are you sure you want to delete this Schedule?", function(clickedOK) {
                        // if (clickedOK) {
                        //     $scope.scheduleInfo.splice(id, 1);
                        //     $scope.showAddSchedule = true;
                        // }


                        if(validateSchedule(id)){
                           $scope.invalidSchedules--;
                        }

                        if (clickedOK) {
                            $scope.scheduleInfo.splice(id, 1);
                            angular.forEach($scope.scheduleInfo,function(value){
                                $scope.disableRC = false;
                                if(value.activateVoicemail == true){
                                    $scope.disableRC = true;
                                    $scope.selectedCallFlow.recordCall = true;
                                }
                                if($scope.selectedCallFlow.activateVoicemail == true){
                                    $scope.disableRC = true;  
                                }
                            });
                            // $scope.showAddSchedule = true;
                        }
                        var invalid = $scope.checkForValidSchedules();
                        if( invalid === 0){
                            $scope.showAddSchedule = false;
                            $scope.submitted1 = false;
                            $scope.formSubmit1 = false;
                        }else{
                            pinesNotifications.notify({
                                title: 'Following a schedule',
                                text: 'Please check for invalid schedule',
                                type: 'error'
                            });
                            $scope.showAddSchedule = true;
                            $scope.submitted1 = true;
                            $scope.formSubmit1 = true;
                        }
                    });
            }


            /*$scope.scheduleEvents = {
                onItemCustomSelect: function(schData) { $scope.checkCurrentSchedule(schData)}
            }
          
            $scope.schedule = [];
            $scope.overflow = '3';
            $scope.showAddSchedule = true;
            $scope.showAddOverflow = function(id){
                if(UserWebService.unMaskData($scope.scheduleInfo[id].ringTo) !== undefined && UserWebService.unMaskData($scope.scheduleInfo[id].ringTo).length == 10){
                    $scope.scheduleInfo[id].isAddOverflow = false;
                     $scope.showAddSchedule = false;
                }else{
                    $scope.scheduleInfo[id].isAddOverflow = true; 
                     $scope.showAddSchedule = true;  
                }
            }

            $scope.checkCurrentSchedule = function(id){
                _.each($scope.scheduleInfo ,function(scheduleData){
                    if(scheduleData.days.length !== 0 && scheduleData.fromTime !== '' && scheduleData.toTime !=="" && UserWebService.unMaskData(scheduleData.ringTo) !== undefined  ){ 
                        $scope.showAddSchedule = true;
                    }else{
                        $scope.showAddSchedule = false ; 
                    }
                });
                if(validateSchedule(id)){
                    $scope.showAddSchedule = true;
                    $scope.submitted1 = true;
                    $scope.formSubmit1 = true;
                    pinesNotifications.notify({
                         title: 'Following a schedule',
                         text: 'Check for Overlaping Schedule For ' + ($scope.duplicateSchelduleID + 1) + " Schedule",
                         type: 'error'
                     });
                }else{
                    $scope.submitted1 = false;
                    $scope.formSubmit1 = false;
                }
            }
            var validateSchedule = function(id){
                $scope.duplicateScheldule = false;
                $scope.duplicateSchelduleID = -1;
                $scope.scheduleTimeSlots.push("End of Day");
                var lastSchedule = '';
                var currentIndex = '';
                if($scope.scheduleInfo[0].schedule < 1 ){
                    return false;
                }
                if(id == 9999){
                     lastSchedule = $scope.scheduleInfo[$scope.scheduleInfo.length - 1];
                     currentIndex = $scope.scheduleInfo.length - 1;
                }else{
                    lastSchedule = $scope.scheduleInfo[id];
                    currentIndex = id;

                }
                if($scope.scheduleInfo.length > 0){
                    for(var i=0; i < $scope.scheduleInfo.length ;i++){
                        if($scope.scheduleInfo[i].days && $scope.scheduleInfo[i].days.length > 0){
                            for (var j = 0; j < $scope.scheduleInfo[i].days.length; j++) {
                                for (var k = 0; k < lastSchedule.days.length; k++) {
                                    if($scope.extendScheduleDays[$scope.scheduleInfo[i].days[j].id].indexOf(lastSchedule.days[k].id) > -1){
                                        var schFromTime = $scope.scheduleTimeSlots.indexOf($scope.scheduleInfo[i].fromTime);
                                        var schToTime = $scope.scheduleTimeSlots.indexOf($scope.scheduleInfo[i].toTime);
                                        var matchedFromTime = $scope.scheduleTimeSlots.indexOf(lastSchedule.fromTime);
                                        var matchedToTime = $scope.scheduleTimeSlots.indexOf(lastSchedule.toTime);

                                        if(i !== currentIndex && ( matchedFromTime < schToTime && matchedFromTime >= schFromTime)||(matchedToTime < schToTime &&  matchedToTime > schFromTime)){ 
                                           $scope.duplicateScheldule = true;
                                           $scope.duplicateSchelduleID = i;
                                        }
                                    }

                                    if($scope.extendScheduleDays[lastSchedule.days[k].id].indexOf($scope.scheduleInfo[i].days[j].id) > -1){
                                        var schFromTime = $scope.scheduleTimeSlots.indexOf($scope.scheduleInfo[i].fromTime);
                                        var schToTime = $scope.scheduleTimeSlots.indexOf($scope.scheduleInfo[i].toTime);
                                        var matchedFromTime = $scope.scheduleTimeSlots.indexOf(lastSchedule.fromTime);
                                        var matchedToTime = $scope.scheduleTimeSlots.indexOf(lastSchedule.toTime);

                                        if(i !== currentIndex && ( matchedFromTime < schToTime && matchedFromTime >= schFromTime)||(matchedToTime < schToTime &&  matchedToTime > schFromTime)){ 
                                           $scope.duplicateScheldule = true;
                                           $scope.duplicateSchelduleID = i;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }else{
                    return false
                }
                $scope.scheduleTimeSlots.splice(-1,1);
                return $scope.duplicateScheldule;
            }
               
            $scope.addSchedule=function(){
                if($scope.selectedCallFlow.route_type == 'schedule' ){
                   var error = 0;
                    _.each($scope.scheduleInfo ,function(scheduleData){
                        if(scheduleData.days.length !== 0 && scheduleData.fromTime !== '' && scheduleData.toTime !=="" && UserWebService.unMaskData(scheduleData.ringTo) !== undefined ){ 
                            error ++;
                          // $scope.showAddSchedule = true ;
                        }else{
                            error = 0;
                           $scope.showAddSchedule = false;
                            pinesNotifications.notify({
                                title: 'Following a schedule',
                                text: 'Please enter days for schedule' ,
                                type: 'error'
                            });
                            //break;
                        }
                        
                    });
                    if(!error){
                        $scope.scheduleInfo.push({id:undefined,scheduleId:$scope.scheduleInfo.length,days:[],fromTime:'',toTime:'',ringTo:'', isAddOverflow:true,overflowNumbers:[{overflowNumber:'',rings: $scope.defaultsRings,overflow_order: 1}],simultaneousRings :false,activateVoicemail:false})
                        $scope.showAddSchedule = false;
                    }
                    return $scope.showAddSchedule; 
                }else{
                    return false;
                }
            }

            $scope.formationscheduleTimeSlots = function(id){
                $scope.scheduleInfo[id].scheduleEndTimeSlots = $scope.scheduleTimeSlots.slice($scope.scheduleTimeSlots.indexOf($scope.scheduleInfo[id].fromTime) + 1, $scope.scheduleTimeSlots.length);
                if($scope.scheduleInfo[id].fromTime !== "12:00 AM")
                    $scope.scheduleInfo[id].scheduleEndTimeSlots.push("End of Day");

            }
            $scope.removeSchedule = function(id) {
                    $bootbox.confirm("Are you sure you want to delete this Schedule?", function(clickedOK) {
                        if(validateSchedule(id)){
                            $scope.showAddSchedule = true;
                            $scope.submitted1 = false;
                            $scope.formSubmit1 = false;
                        }
                        if (clickedOK) {
                            $scope.scheduleInfo.splice(id, 1);
                            // $scope.showAddSchedule = true;
                        }
                    });
            }
*/

              $scope.settings = {
                enableSearch: false,
                //$scope.onGoingRequests = [];
                scrollable: true,
                scrollableHeight: 200,
                smartButtonMaxItems:5,
                showCheckAll : false,
                showUncheckAll : false
               };
               $scope.scheduleInfo = [{scheduleId:0,days:[],fromTime:'',toTime:'',ringTo:'',isAddOverflow:false,overflowNumbers:[{overflowNumber:'',rings: $scope.defaultsRings,overflow_order: 1}],simultaneousRings :false,activateVoicemail:false}]
            $scope.percentInfo = [{'percentage':'','ringToNum':'',overflowNumbers:[{overflowNumber:'',rings: $scope.overflow ,overflow_order: 1}], simultaneousRings :false, route_order:1, activateVoicemail:false}];
            $scope.showCallFlow = false;
            $scope.showCallActions = false;
            $scope.showMultiPass = false;
            $scope.selectedCallFlow = {};
            $scope.postCallIVR = false;
            $scope.postIVRTypes = [
                {
                    name : 'Call Outcome (Conversion type)',
                    value: 'conversion'
                },
                {
                    name : 'Agent ID',
                    value: 'agentID'
                },
                {
                    name : 'Call Outcome and Agent ID',
                    value: 'conversionAgentID'
                }
            ];
            
            $scope.postIVRType = $scope.postIVRTypes[0].value;
            $scope.selectedCallFlow.showDNI = true;
            $scope.browserAgentName = '';
            //$scope.selChannel;
            $scope.addCallAction = {};
            $scope.addCallAction.rule = {};
            $scope.addCallAction.action_id = {};
            $scope.addCallAction.actionOptions = {};
            $scope.addCallAction.email = {

            };
            $scope.addCallAction.phone = {};
            $scope.addCallAction.tagList = {};
            $scope.addCallAction.remainingText = {};
            $scope.selectedCallFlow.customSourceList_1 = '';
            $scope.selectedCallFlow.customSourceList_2 = '';
            $scope.selectedCallFlow.customSourceList_3 = '';
            $scope.selectedCallFlow.customSourceList_4 = '';
            $scope.selectedCallFlow.customSourceList_5 = '';
            $scope.voicemail = "1";
            $scope.overflow = "3";
            $scope.customsourcesArray = {
                "CS1" : [],
                "CS2" : [],
                "CS3" : [],
                "CS4" : [],
                "CS5" : []
            };
            $scope.selectedCallFlow.spamActive = false;
            $scope.selectedCallFlow.smsActive = false;
            $scope.selectedCallFlow.smsFeature = false;
            $scope.addCallAction.postEvent = {};
            $scope.addCallAction.webhook = {};
            $scope.addCallAction.sendCallDetails = {};
            $scope.addCallAction.callbackFlag = {};
            $scope.TTSSelected = true;
            $scope.TTSWhisperSelected = true;
            $scope.multlevelivr = {
                ivr : {
                    // ivr : {
                    //     ivr : {}
                    // }
                }
            }

            $scope.TTSvoicemailGreetingsSelected = true;
            $scope.TTSoutComePromtSelected = true;
            $scope.TTSsalesAmountVoiceSelected = true;
            $scope.TTSAgentIDVoicePromptSelected = true;
      
            $scope.TTSIVRSelected = true;
            $scope.voicetextIVRChanged = false;
            $scope.hasValidTTSVoiceURL = false;
            $scope.hasValidVoiceURL = false;
            $scope.hadValidWhisperURL = false;

            $scope.hasValidvoicemailGreetingsURL = false;
            $scope.hasValidoutComePromtURL = false;
            $scope.hasValidsalesAmountVoiceURL = false;
            $scope.hasValidAgentIDVoicePromptURL = false;

            $scope.TTGeoloLocationPromptSelected = true;
            $scope.hasValidGeoloLocationPromptURL = false;


            $scope.qCallFlow = '';
            $scope.multiSelectedChannels = [];
            $scope.formSubmit = false;
            $scope.formSubmit1 = false;
            $scope.selectedCallFlow = {
                rinterval: 72
            };
            $scope.callActionWebhookOptions = [];
            $scope.callActionTaggingOptions = [];

            $scope.locations = locationWebService.getLocations();
            $scope.IsVisible = false;
            $scope.customSourceType = '';
            $scope.customSourceRow = '';
            $scope.customSourceFrom = '';
            $scope.selectedCallFlow.webhook = '';
            $scope.isNumberPool = false;
            $scope.selectedCallFlow.Overflow = '3';
            $scope.overflowNumbers=[{overflowNumber:'',rings: $scope.selectedCallFlow.Overflow ,overflow_order : 1}];
            $scope.openOverflowBox = false;
            $scope.hunt_option ;
            $scope.selectedCallFlow.activateVoicemail = false;
            $scope.isSimultaneousRing = false;
            $scope.disableRC = false;
        
            $scope.addPercentRow = function(remainingPercent){
                $scope.percentInfo.push({'percentage':remainingPercent,
                                    'ringToNum':'',overflowNumbers:[{overflowNumber:'',rings: 3,overflow_order : 1}], isSimultaneousRing :false, openOverflowBox:false , route_order : $scope.percentInfo[$scope.percentInfo.length - 1].route_order+1,activateVoicemail:false});
                                    
            }
            $scope.setOverflowRings= function(){
                _.map($scope.overflowNumbers,function(item){
                    item['rings'] = $scope.selectedCallFlow.Overflow;
                });
            }
            $scope.ShowHide = function() {
                $scope.IsVisible = $scope.IsVisible ? false : true;
            };
            $scope.disableRecordCall = function(index){
                if($scope.selectedCallFlow.routetype === 'PercentageBasedRoute'){
                    $scope.selectedCallFlow.playDisclaimer = $scope.selectedCallFlow.playDisclaimer !== undefined ? $scope.selectedCallFlow.playDisclaimer:"before";
                    if($scope.percentInfo !==undefined ){
                        var activatedVMs = [];
                        $scope.disableRC = false;
                        $scope.selectedCallFlow.playDisclaimer = $scope.selectedCallFlow.playDisclaimer !== undefined ? $scope.selectedCallFlow.playDisclaimer:"before";
                        $scope.percentInfo[index].activateVoicemail = !$scope.percentInfo[index].activateVoicemail;
                        var percentVms = _.pluck($scope.percentInfo,'activateVoicemail')
                        var trueVm = _.filter(percentVms.concat(percentVms), function(avm){ return avm  === true; })
                        if(trueVm.length > 0){
                            $scope.disableRC = true;
                            $scope.selectedCallFlow.recordCall = true;
                        }
                        $scope.percentInfo[index].activateVoicemail = !$scope.percentInfo[index].activateVoicemail;

                    }
                } else if($scope.selectedCallFlow.routetype === 'schedule'){
                    var activatedVMs = [];
                    $scope.disableRC = false;
                    $scope.selectedCallFlow.playDisclaimer = $scope.selectedCallFlow.playDisclaimer !== undefined ? $scope.selectedCallFlow.playDisclaimer:"before";
                    
                   
                    if($scope.scheduleInfo[index])
                        $scope.scheduleInfo[index].activateVoicemail = !$scope.scheduleInfo[index].activateVoicemail;
                    else
                        $scope.selectedCallFlow.activateVoicemail = !$scope.selectedCallFlow.activateVoicemail;  
                    
                    activatedVMs.push($scope.selectedCallFlow.activateVoicemail);
                    var scheduleVms = _.pluck($scope.scheduleInfo,'activateVoicemail')
                    var trueVm = _.filter(scheduleVms.concat(activatedVMs), function(avm){ return avm  === true; })
                    if(trueVm.length > 0){
                        $scope.disableRC = true;
                        $scope.selectedCallFlow.recordCall = true;
                    }
                    if($scope.scheduleInfo[index])
                        $scope.scheduleInfo[index].activateVoicemail = !$scope.scheduleInfo[index].activateVoicemail;
                    else
                        $scope.selectedCallFlow.activateVoicemail = !$scope.selectedCallFlow.activateVoicemail;
                }else{
                    $scope.selectedCallFlow.playDisclaimer = $scope.selectedCallFlow.playDisclaimer !== undefined ? $scope.selectedCallFlow.playDisclaimer:"before";
                    $scope.disableRC = false;
                    if(!$scope.selectedCallFlow.activateVoicemail){
                        $scope.disableRC = true;
                        $scope.selectedCallFlow.recordCall = true;
                    }
                }
              }
            

            $scope.checkRingToNumberPercent = function(ringtonum){
                if(ringtonum){
                    var str = UserWebService.unMaskData(ringtonum);
                    if(str.charAt(0) == '0'){
                        return true;
                    }
                    if( UserWebService.unMaskData(ringtonum).length == 10){
                        return false;
                    }else{
                        return true;
                    }
                }else{
                    return true;
                }
            }
            
            $scope.disableNumberPool = function() {
                //$scope.isNumberPool = true;
                $scope.selectedCallFlow.quantity = $scope.selectedCallFlow.numberPool;
                if ($scope.selectedCallFlow.quantity > 1) {
                    pinesNotifications.notify({
                        title: 'Number pool',
                        text: 'To make changes to number pool, please contact Customer Support at 855-889-3939 or email at support@convirza.com',
                        type: 'error'
                    });
                    $scope.selectedCallFlow.numberPool = $scope.selectedCallFlow.quantity = 1;
                }
            }

            var locations = locationWebService.getLocations();
            $scope.locations = locations;
            $scope.showAddloc = true;
            $scope.callbackid = -1;
            $scope.campaignBuilderHeader = ['Tracking Number', 'Name', 'Ring-to Phone Number', 'Tracking Number Type','Ad Source', 'Spam Guard', 'SMS', 'Status'];
            $scope.multipleNumbersHeader = ['Tracking Number', 'Name', 'Ad Source', 'Custom Source 1', 'Custom Source 2', 'Custom Source 3', 'Custom Source 4', 'Custom Source 5', 'Call Value', 'Repeat Interval (hours)', 'Ring to', 'Record Call'];
            
            if($rootScope.is_migrated == false || $rootScope.is_migrated == 'false'){
                $scope.campaignBuilderHeader = ['Tracking Number', 'Name', 'Ring-to Phone Number', 'Tracking Number Type','Ad Source', 'Spam Guard', 'Status'];
            }

            if($scope.userAccess && $scope.userAccess.blocked_recording){
                $scope.multipleNumbersHeader.pop()
            }
            $scope.actionHeader = ['Actions'];
            $scope.customTaggingOptions = [];
            $scope.callActionTaggingOptions = [];
            $scope.setCallerIdList =[];

            $(document).ready(function() {
                setTimeout(function() {
                    $(window).trigger('resize');
                }, 2000);
            });

            $(document).ready(function() {
                setTimeout(function() {
                    $(window).trigger('resize');
                }, 5000);
            });

            $scope.multipleCallsStickyHeader = function() {
                setTimeout(function() {
                    $(window).trigger('resize');
                }, 200);
            }

            $scope.sizeOf = function(obj) {
                return Object.keys(obj).length;
            };

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
            }


            $scope.emailText = '';


            $scope.countElement = function(id, $event) {
                var sNextActionEmail = [];
                var sNextAction = $scope.addCallAction.email[id];
                if (sNextAction !== undefined) {
                    for (var i = 0; i < sNextAction.length; i++) {
                        sNextActionEmail.push(sNextAction[i].text);
                    }
                    $scope.emailText = sNextActionEmail.join(",");
                    $scope.emailText = $scope.emailText.replace(/,/g, '').replace(/ /g, '');
                    $scope.addCallAction.remainingText[id] = (1024 - $scope.emailText.length) + " characters are remaining";

                    // var tempCount = $scope.addCallAction.remainingText[id].split(" ")[0];

                    // if (parseInt(tempCount) === $scope.emailText.length)
                    //     $scope.addCallAction.remainingText[id] = (1024 - $scope.emailText.length) + " characters are remaining";

                    $scope.addCallAction.callActionFormSubmitted[id] = false;
                }
            };


            WebhookService.webhookList($rootScope.currentOUId).then(function(result) {
                $scope.webhook = [];
                if (result.data.json.length > 0) {
                    $scope.webhook = result.data.json;
                }
            });

            OrgUnitWebService.getcustomsource($scope.currentOUId).then(function(result) {
                var customsourcedata = result.data.json;
                _.each(customsourcedata, function(data) {
                    if ($scope.customsourcesArray[data.custom_source_type] === undefined) {
                        $scope.customsourcesArray[data.custom_source_type] = [];
                    }
                    $scope.customsourcesArray[data.custom_source_type].push({
                        id: data.custom_source_id,
                        name: data.custom_source_name
                    });
                });
            });

            $scope.selectCustomOptions = function(csRow, csType, csFrom) {
                var options = {
                    formatNoMatches: function(term) {
                        $scope.customSourceType = csType;
                        $scope.customSourceRow = csRow;
                        $scope.customSourceFrom = csFrom;
                        var message = "";
                        if (term.trim() !== '') {
                            message = '<a ng-class="{disabled:disableAddCustom}" ng-click="addCustomSource(term)">Add Custom Source :"' + term.trim() + '"</a>';
                            if (!$scope.$$phase) {
                                $scope.$apply(function() {
                                    $scope.noResultsCustomeSource = term;
                                });
                            }
                        } else {
                            message = "Can not add empty!";
                        }
                        return message;
                        console.log("textcount called");
                    },
                    //handle for prepending an option on keyup
                    sortResults: function(results, container, query) {
                        var found = false;
                        query.term = query.term.trim();
                        if (query.term.length > 0) {
                            for (var x in results) {
                                //console.log('Term:'+query.term+'--Result:'+results[x].text);
                                if (query.term.toLowerCase().trim() == results[x].text.toLowerCase().trim()) {
                                    found = true;
                                    break;
                                }
                            }
                            //add option to top of the list of results
                            if (!found) $('.select2-results').prepend('<li class="select2-no-results"><a ng-href="#" ng-class="{disabled:disableAddCustom}" ng-click="addCustomSource(term);">Add Custom Source:"' + query.term + '"</a></li>');
                            //compile the new html in angular to get it to evaluate the new ng-click
                            if (!$scope.$$phase) {
                                $scope.$apply(function() {
                                    $scope.noResultsCustomeSource = query.term;
                                });
                            }
                            console.log("textcount called");
                        }
                        //return list unchanged
                        return results;
                    },
                    simple_tags: true,
                    allowClear: true
                };
                return options;
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

            $scope.addCustomSource = function(term) {
                var csType = "CS" + $scope.customSourceType;
                $scope.disableAddCustom = true;
                var duplicateTags = _.where($scope.customsourcesArray[csType], {
                    custom_source_name: (this.noResultsCustomeSource).trim()
                });
                if (duplicateTags.length > 0) {
                    pinesNotifications.notify({
                        title: 'Update Custom Source',
                        text: 'This Custom Source already exists',
                        type: 'error'
                    });
                    $scope.disableAddCustom = false;
                    return false;
                }
                var customSource = {
                    "customSource": {
                        "custom_source_name": $scope.noResultsCustomeSource,
                        "org_unit_id": $rootScope.currentOUId,
                        "custom_source_type": csType
                    }
                };

                if ($scope.noResultsCustomeSource.length > 50) {
                    pinesNotifications.notify({
                        title: 'Custom Source',
                        text: 'Not allowed more than 50 characters',
                        type: 'error'
                    });
                    $scope.disableAddCustom = false;
                    return false;
                }

                var noResultsLink = $('.select2-drop');
                noResultsLink.hide();

                 OrgUnitWebService.customSource(customSource).then(function(result) {
                    $scope.customTaggingOptionsWatch = true;
                    if (result.data.err === '') {
                        pinesNotifications.notify({
                            title: 'Create Custom Source',
                            text: 'Successfully added the custom source',
                            type: 'success'
                        });
                        $scope.disableAddCustom = false;
                        $scope.customsourcesArray[csType].push({
                            id: result.data.json.custom_source_id,
                            name: $scope.noResultsCustomeSource.trim()
                        });
                        $scope.customTaggingOptions.push({
                            custom_source_id: result.data.json.custom_source_id,
                            custom_source_name: $scope.noResultsCustomeSource.trim(),
                            org_unit_id: $rootScope.currentOUId
                        });
                    }
                });
            };

            $scope.addTag = function(term) {
                var duplicateTags = _.where($scope.callActionTaggingOptions, {
                    tag_name: (this.noResultsTag).trim()
                });
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
                        }else{
                            $scope.addCallAction.tagList[parseInt($scope.actionId)] = [];
                            $scope.addCallAction.tagList[parseInt($scope.actionId)].push($scope.callActionTaggingOptions[$scope.callActionTaggingOptions.length - 1].tag_id.toString());
                            $scope.addCallAction.callActionFormSubmitted[parseInt($scope.actionId)] = false;
                            var noResultsLink = $('.select2-drop');
                            noResultsLink.hide();
                        }
                    });
            }, true);

            $scope.$watch('addCallAction.email', function(newVal, oldVal) {
                for (var id in $scope.addCallAction.email) {
                    if ($scope.addCallAction.email.hasOwnProperty(id)) {
                        var sNextActionEmail = [];
                        var tempTextLength = 0;
                        var sNextAction = $scope.addCallAction.email[id];
                        for (var index = 0; index < sNextAction.length; index++) {
                            var tempText = sNextAction[index].text.replace(/,/g, '').replace(/ /g, '');
                            tempTextLength += tempText.length;
                        }
                        $scope.addCallAction.remainingText[id] = (1024 - tempTextLength) + " characters are remaining";
                    }
                }
            }, true);


            $scope.$watch('noResultsTag', function(newVal, oldVal) {
                if (newVal && newVal !== oldVal) {
                    $timeout(function() {
                        var noResultsLink = $('.select2-no-results');
                        //console.log(noResultsLink.contents());
                        $compile(noResultsLink.contents())($scope);
                    });
                }
            }, true);

            $scope.$watch('noResultsCustomeSource', function(newVal, oldVal) {
                if (newVal && newVal !== oldVal) {
                    $timeout(function() {
                        var noResultsLink = $('.select2-no-results');
                        //console.log(noResultsLink.contents());
                        $compile(noResultsLink.contents())($scope);
                    });
                }
            }, true);

            $scope.$watch('callActionTaggingOptions', function(newVal, oldVal) {
                if ($scope.callActionTaggingOptionsWatch)
                    $timeout(function() {
                        if (!angular.isUndefined($scope.addCallAction.tagList[parseInt($scope.actionId)])) {
                            $scope.addCallAction.tagList[parseInt($scope.actionId)].push($scope.callActionTaggingOptions[$scope.callActionTaggingOptions.length - 1].tag_id.toString());
                            $scope.addCallAction.callActionFormSubmitted[parseInt($scope.actionId)] = false;
                            var noResultsLink = $('.select2-drop');
                            noResultsLink.hide();
                        }else{
                            $scope.addCallAction.tagList[parseInt($scope.actionId)] = [];
                            $scope.addCallAction.tagList[parseInt($scope.actionId)].push($scope.callActionTaggingOptions[$scope.callActionTaggingOptions.length - 1].tag_id.toString());
                            $scope.addCallAction.callActionFormSubmitted[parseInt($scope.actionId)] = false;
                            var noResultsLink = $('.select2-drop');
                            noResultsLink.hide();
                        }
                    });
            }, true);

            $scope.$watch('customTaggingOptions', function(newVal, oldVal, index) {
                if ($scope.customTaggingOptionsWatch)
                    $timeout(function() {
                        if ($scope.customSourceRow === 1 && $scope.customSourceFrom === "single") {
                            if ($scope.customSourceType === 1) {
                                $scope.selectedCallFlow.customSourceList_1 = $scope.customTaggingOptions[$scope.customTaggingOptions.length - 1].custom_source_id.toString();
                            } else if ($scope.customSourceType === 2) {
                                $scope.selectedCallFlow.customSourceList_2 = $scope.customTaggingOptions[$scope.customTaggingOptions.length - 1].custom_source_id.toString();
                            } else if ($scope.customSourceType === 3) {
                                $scope.selectedCallFlow.customSourceList_3 = $scope.customTaggingOptions[$scope.customTaggingOptions.length - 1].custom_source_id.toString();
                            } else if ($scope.customSourceType === 4) {
                                $scope.selectedCallFlow.customSourceList_4 = $scope.customTaggingOptions[$scope.customTaggingOptions.length - 1].custom_source_id.toString();
                            } else if ($scope.customSourceType === 5) {
                                $scope.selectedCallFlow.customSourceList_5 = $scope.customTaggingOptions[$scope.customTaggingOptions.length - 1].custom_source_id.toString();
                            }
                        } else if ($scope.customSourceFrom === "multiple") {
                            for (var i = 1; i <= $scope.selectedCallFlow.count; i++) {
                                if ($scope.customSourceRow === i) {
                                    if ($scope.customSourceType === 1) {
                                        $scope.MultCallFlowList[$scope.customSourceRow - 1].customSourceList_1 = $scope.customTaggingOptions[$scope.customTaggingOptions.length - 1].custom_source_id.toString();
                                    } else if ($scope.customSourceType === 2) {
                                        $scope.MultCallFlowList[$scope.customSourceRow - 1].customSourceList_2 = $scope.customTaggingOptions[$scope.customTaggingOptions.length - 1].custom_source_id.toString();
                                    } else if ($scope.customSourceType === 3) {
                                        $scope.MultCallFlowList[$scope.customSourceRow - 1].customSourceList_3 = $scope.customTaggingOptions[$scope.customTaggingOptions.length - 1].custom_source_id.toString();
                                    } else if ($scope.customSourceType === 4) {
                                        $scope.MultCallFlowList[$scope.customSourceRow - 1].customSourceList_4 = $scope.customTaggingOptions[$scope.customTaggingOptions.length - 1].custom_source_id.toString();
                                    } else if ($scope.customSourceType === 5) {
                                        $scope.MultCallFlowList[$scope.customSourceRow - 1].customSourceList_5 = $scope.customTaggingOptions[$scope.customTaggingOptions.length - 1].custom_source_id.toString();
                                    }
                                }
                            }
                        }
                        var noResultsLink = $('.select2-drop');
                        noResultsLink.hide();
                    });
            }, true);
            $http.get('assets/demo/call_actions.json').then(function(res) {
                $scope.names = res.data;
            });

            $http.get('assets/demo/schedule_data.json').then(function(res) {
                $scope.timeZones = res.data.timeZones;
                $scope.extendScheduleDays = res.data.extendScheduleDays;
                $scope.scheduledDays = res.data.scheduledDays;
                $scope.scheduleTimeSlots = res.data.scheduleTimeSlots;
                $scope.extendScheduleDays = res.data.extendScheduleDays;
            });

            $scope.addLocationVisible = function() {
                $scope.showAddloc = false;
            };
            $scope.chkSpclChar = function (text, prompt, cb){
                var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|<>\/?]/;
                if(format.test(text)){
                    pinesNotifications.notify({
                        title: prompt,
                        text: 'Special characters are not allowed',
                        type: 'error'
                    });
                   // d = new Date();
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
                            if ($scope.selectedCallFlow.voicePromptTTSText === undefined || $scope.selectedCallFlow.voicePromptTTSText.length === 0) {
                                $scope.hasValidVoiceURL = false;
                                $scope.TTSSelected = true;
                            } else {
                                $scope.chkSpclChar($scope.selectedCallFlow.voicePromptTTSText, 'Voice Prompt',function(t){
                                    $scope.selectedCallFlow.voicePromptTTSText = t; 
                                    $scope.hasValidVoiceURL = true;
                                    $scope.TTSSelected = true;
                                });
                            }
                        break;
                    case 'voicemailGreetings':
                       $scope.greetingAudio = undefined;
                            if ($scope.selectedCallFlow.voicemailGreetingsTTSText === undefined || $scope.selectedCallFlow.voicemailGreetingsTTSText.length === 0) {
                                $scope.hasValidvoicemailGreetingsURL = false;
                                $scope.TTSvoicemailGreetingsSelected = true;
                            } else {
                                $scope.chkSpclChar($scope.selectedCallFlow.voicemailGreetingsTTSText, 'Voicemail Greetings', function(t){
                                    $scope.selectedCallFlow.voicemailGreetingsTTSText = t;
                                    $scope.hasValidvoicemailGreetingsURL = true;
                                    $scope.TTSvoicemailGreetingsSelected = true;
                                });
                            }
                        break;
                         case 'outComePromt':
                            $scope.outComePromtAudio = undefined;
                            if ($scope.selectedCallFlow.outComePromtTTSText === undefined || $scope.selectedCallFlow.outComePromtTTSText.length === 0) {
                                $scope.hasValidoutComePromtURL = false;
                                $scope.TTSoutComePromtSelected = true;
                            } else {
                                $scope.chkSpclChar($scope.selectedCallFlow.outComePromtTTSText, 'Voice prompt for Call outcome',function(t){
                                    $scope.selectedCallFlow.outComePromtTTSText = t;
                                    $scope.hasValidoutComePromtURL = true;
                                    $scope.TTSoutComePromtSelected = true;
                                });
                                
                            }
                        break;
                         case 'salesAmountVoice':
                         if($scope.selectedCallFlow.salesAmountVoicePromptText){
                            $scope.TTSsalesAmountVoiceSelected = false;
                         }else{
                            $scope.salesAmountVoiceAudio = undefined;
                            if ($scope.selectedCallFlow.salesAmountVoiceTTSText === undefined || $scope.selectedCallFlow.salesAmountVoiceTTSText.length === 0) {
                                $scope.hasValidsalesAmountVoiceURL = false;
                                $scope.TTSsalesAmountVoiceSelected = true;
                            } else {
                                $scope.chkSpclChar($scope.selectedCallFlow.salesAmountVoiceTTSText, 'Sale amount voice prompt', function(t){
                                    $scope.selectedCallFlow.salesAmountVoiceTTSText = t;
                                    $scope.hasValidsalesAmountVoiceURL = true;
                                    $scope.TTSsalesAmountVoiceSelected = true;
                                });
                            }
                        }
                        break;
                         case 'AgentIDVoicePrompt':
                            $scope.AgentIDVoicePromptAudio = undefined;
                            if ($scope.selectedCallFlow.AgentIDVoicePromptTTSText === undefined || $scope.selectedCallFlow.AgentIDVoicePromptTTSText.length === 0) {
                                $scope.hasValidAgentIDVoicePromptURL = false;
                                $scope.TTSAgentIDVoicePromptSelected = true;
                            } else {
                                $scope.chkSpclChar($scope.selectedCallFlow.AgentIDVoicePromptTTSText, 'Agent ID voice prompt', function(t){
                                    $scope.selectedCallFlow.AgentIDVoicePromptTTSText = t;
                                    $scope.hasValidAgentIDVoicePromptURL = true;
                                    $scope.TTSAgentIDVoicePromptSelected = true;
                                });
                                
                            }
                        break;
                    }
            };

            $scope.whisperTextChange = function() {
                $scope.whisperAudio = undefined;
                if ($scope.selectedCallFlow.whisperTTSText === undefined || $scope.selectedCallFlow.whisperTTSText.length === 0) {
                    $scope.hasValidWhisperURL = false;
                    $scope.TTSWhisperSelected = true;
                } else {
                    $scope.chkSpclChar($scope.selectedCallFlow.whisperTTSText, 'Whisper Message', function(t){
                        $scope.selectedCallFlow.whisperTTSText = t;  
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
                if (origin != 'geolocation' && $scope.geoLocationAudio !== undefined && !$scope.geoLocationAudio.paused && !$scope.geoLocationAudio.ended)
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
                if ($scope.ivrAudio1 !== undefined) {
                    $scope.ivrAudio1.pause();
                    $scope.ivrAudio1 = undefined;
                }
                 if ($scope.greetingAudio !== undefined) {
                    $scope.greetingAudio.pause();
                    $scope.greetingAudio = undefined;
                }
                if ($scope.calloutcomeAudio !== undefined) {
                    $scope.calloutcomeAudio.pause();
                    $scope.calloutcomeAudio = undefined;
                }
                if ($scope.agentidAudio !== undefined) {
                    $scope.agentidAudio.pause();
                    $scope.agentidAudio = undefined;
                }
                 if ($scope.saleAudio !== undefined) {
                    $scope.saleAudio.pause();
                    $scope.saleAudio = undefined;
                }
                if ($scope.leadAudio !== undefined) {
                    $scope.leadAudio.pause();
                    $scope.leadAudio = undefined;
                }
                if ($scope.geoLocationAudio !== undefined) {
                    $scope.geoLocationAudio.pause();
                    $scope.geoLocationAudio = undefined;
                }
            }

            $scope.audioIsDownloading = function() {
                if ($scope.whisperAudio !== undefined && $scope.onTTS_WH_Request !== undefined)
                    return true;
                if ($scope.promptAudio !== undefined && $scope.onTTS_VP_Request !== undefined)
                    return true;
                if ($scope.ivrAudio !== undefined && $scope.onTTS_IVR_Request !== undefined)
                    return true; 
                if ($scope.greetingAudio !== undefined && $scope.onTTS_WH_Request !== undefined)
                    return true;
                if ($scope.calloutcomeAudio !== undefined && $scope.onTTS_VP_Request !== undefined)
                    return true;
                if ($scope.agentidAudio !== undefined && $scope.onTTS_IVR_Request !== undefined)
                    return true;
                if ($scope.saleAudio !== undefined && $scope.onTTS_VP_Request !== undefined)
                    return true;
                if ($scope.leadAudio !== undefined && $scope.onTTS_IVR_Request !== undefined)
                    return true;
                if ($scope.geoLocationAudio !== undefined && $scope.onTTS_IVR_Request !== undefined)
                    return true;
                return false;
            }

            $scope.addLocation = function() {
                $scope.inserted = {
                    id: $scope.locations.length + 1,
                    name: '',
                    status: null,
                    group: null
                };
                $scope.locations.push($scope.inserted);
            };
            $scope.prompts = voicepromptService.prompts;
            $scope.whispers = whispermessageService.whispers;
            $scope.voicemails = voicemailPromptService.voicemails;

            $scope.isVoiceOpen = false;
            $scope.disableClickOnVoice = function() {
                $scope.isVoiceOpen = true;
            }

            $scope.showVoiceModal = function(event) {
                $scope.promtElement = event;
                stopAudio();
                var modalInstance = $uibModal.open({
                    templateUrl: 'assets/partials/assignPrompt.html',
                    controller: 'voiceModal',
                    size: 'lg',
                    backdrop: 'static',
                    keyboard: false
                });

                modalInstance.result.then(function() {
                    $scope.isVoiceOpen = false;
                    for (var i = 0; i < voicepromptService.prompts.length; i++) {
                        if (voicepromptService.prompts[i].selectedprompt === true) {
                            switch($scope.promtElement){
                                case 'voicePromt':
                                    $scope.selectedCallFlow.voicePromptText = voicepromptService.prompts[i].name;
                                    $scope.selectedCallFlow.voicePromptFileName = voicepromptService.prompts[i].filename;
                                    $scope.selectedCallFlow.voicePromptId = voicepromptService.prompts[i].id;
                                    $scope.selectedCallFlow.voiceURL = voicepromptService.prompts[i].url;
                                    $scope.selectedCallFlow.promptAudio = undefined;

                                    $scope.prompts = voicepromptService.prompts;
                                    $scope.TTSSelected = false;
                                    $scope.hasValidVoiceURL = true;
                                    $scope.selectedCallFlow.voicePromptTTSText = '';
                                    break;
                                case 'outComePromt':
                                    $scope.selectedCallFlow.outComePromtText = voicepromptService.prompts[i].name;
                                    $scope.selectedCallFlow.outComePromtFileName = voicepromptService.prompts[i].filename;
                                    $scope.selectedCallFlow.outComePromtId = voicepromptService.prompts[i].id;
                                    $scope.selectedCallFlow.outComePromtURL = voicepromptService.prompts[i].url;                                                             
                                    $scope.selectedCallFlow.outComePromtAudio = undefined;
                                    $scope.outComePromtAudio = undefined;

                                    $scope.prompts = voicepromptService.prompts;
                                    $scope.TTSoutComePromtSelected = false;
                                    $scope.hasValidoutComePromtURL = true;
                                    $scope.selectedCallFlow.outComePromtTTSText = '';

                                    break;
                                case 'salesAmountVoice':
                                    $scope.selectedCallFlow.salesAmountVoicePromptText = voicepromptService.prompts[i].name;
                                    $scope.selectedCallFlow.salesAmountVoicePromptFileName = voicepromptService.prompts[i].filename;
                                    $scope.selectedCallFlow.salesAmountVoicePromptId = voicepromptService.prompts[i].id;
                                    $scope.selectedCallFlow.salesAmountVoiceURL = voicepromptService.prompts[i].url;                                    
                                    $scope.selectedCallFlow.salesAmountVoiceAudio = undefined;
                                    $scope.salesAmountVoiceAudio = undefined;
                                    $scope.selectedCallFlow.salesAmountVoiceFileName = voicepromptService.prompts[i].filename;

                                    $scope.prompts = voicepromptService.prompts;
                                    $scope.hasValidsalesAmountVoiceURL = true;
                                    $scope.TTSsalesAmountVoiceSelected = false;
                                    $scope.selectedCallFlow.salesAmountVoicePromptTTSText = '';
                                    $scope.selectedCallFlow.salesAmountVoiceTTSText = '';

                                    break;
                                case 'AgentIDVoicePrompt':
                                    $scope.selectedCallFlow.AgentIDVoicePromptText = voicepromptService.prompts[i].name;
                                    $scope.selectedCallFlow.AgentIDVoicePromptFileName = voicepromptService.prompts[i].filename;
                                    $scope.selectedCallFlow.AgentIDVoicePromptId = voicepromptService.prompts[i].id;
                                    $scope.selectedCallFlow.AgentIDVoicePromptURL = voicepromptService.prompts[i].url;                                   
                                    $scope.selectedCallFlow.AgentIDVoicePromptAudio = undefined;
                                    $scope.AgentIDVoicePromptAudio = undefined;

                                    $scope.prompts = voicepromptService.prompts;
                                    $scope.hasValidAgentIDVoicePromptURL = true;
                                    $scope.TTSAgentIDVoicePromptSelected = false;
                                    $scope.selectedCallFlow.AgentIDVoicePromptTTSText = '';
                                    break;
                            }
                            
                        }
                    }
                    
                }, function() {
                    $scope.isVoiceOpen = false;
                    console.log('Modal dismissed at: ' + new Date());
                });

            };

            $scope.totPercent = 0;
            //$scope.numPer = 0;
        //Function used to calcualte total current percentage for percent based route and add another row if needed
            $scope.percentageCount = function(index) {
                var percentageCount = 0;
        //loop over all ring to numbers to calculate total ringto percent
                for (var i = 0; i < $scope.percentInfo.length; i++) {                   
                    percentageCount = percentageCount + $scope.percentInfo[i].percentage;
                }
                $scope.totPercent = percentageCount;
        //Let the user know if they go over 100%
                if ($scope.totPercent > 100) {
                    pinesNotifications.notify({
                        title: 'Percentage Call Route',
                        text: 'Percentage is greater than 100 ',
                        type: 'error'
                    });
                    return;
                }

                for (var i = 0; i < $scope.percentInfo.length; i++) {
                    if($scope.percentInfo[i].percentage == '' || $scope.percentInfo[i].percentage == null || isNaN($scope.percentInfo[i].percentage)){
                        return;      
                    }
                }
                //if total is still less than 100% add another row 
                if (index < 9 && $scope.totPercent < 100 && $scope.percentInfo.length < 10) {
                    for (var i = 0; i < $scope.percentInfo.length; i++) {
                         if((100 - percentageCount) > 0){
                            var remainingPercent = (100 - percentageCount);
                                $scope.addPercentRow(remainingPercent);
                                break;
                            }
                    }
                }
            };

            $scope.removePercentNumber = function(index) {
                bootbox.confirm("Are you sure you want to delete this percentage route ring to Number?", function(clickedOK) {
                    if (clickedOK) {
                        $scope.percentInfo.splice(index,1);
                        angular.forEach($scope.percentInfo,function(value){
                            $scope.disableRC = false;
                            if(value.activateVoicemail == true){
                                $scope.disableRC = true;
                                $scope.selectedCallFlow.recordCall = true;
                            }
                        });
                    }
                });
            };

        // ****************************************************************************************************************************
        $scope.isVoicemailOpen = false;
        $scope.disableClickOnVoicemail = function() {
            $scope.isVoicemailOpen = true;
        }

        $scope.showVoicemailModal = function(size) {
                stopAudio();
                var modalInstance = $uibModal.open({
                    templateUrl: 'assets/partials/assignVoicemail.html',
                    controller: 'voicemailModel',
                    size: size,
                    backdrop: 'static',
                    keyboard: false
                });

                modalInstance.result.then(function() {
                    $scope.isVoicemailOpen = false;
                    for (var i = 0; i < voicemailPromptService.voicemails.length; i++) {
                        if (voicemailPromptService.voicemails[i].selectedvoicemail === true) {
                            $scope.selectedCallFlow.voicemailGreetingsText = voicemailPromptService.voicemails[i].name;
                            $scope.selectedCallFlow.voicemailGreetingsFileName = voicemailPromptService.voicemails[i].filename;
                            $scope.selectedCallFlow.voicemailGreetingsPromptId = voicemailPromptService.voicemails[i].id;
                            $scope.selectedCallFlow.VoiceMainGreetingURL = voicemailPromptService.voicemails[i].url;                                    
                            $scope.selectedCallFlow.voicemailGreetingspromptAudio = undefined;
                        }
                    }
                    $scope.voicemails = voicemailPromptService.voicemails;
                    $scope.TTSvoicemailGreetingsSelected = false;
                    $scope.hasValidvoicemailGreetingsURL = true;
                    $scope.selectedCallFlow.voicemailGreetingsTTSText = '';
                }, function() {
                    $scope.isVoicemailOpen = false;
                    console.log('Modal dismissed at: ' + new Date());
                });

            };
            // ****************************************************************************************************************************
            $scope.isWhisperOpen = false;
            $scope.disableClickOnWhisper = function() {
                $scope.isWhisperOpen = true;
            }
            $scope.showWhisperModal = function(size) {
                stopAudio();
                var modalInstance = $uibModal.open({
                    templateUrl: 'assets/partials/assignWhisper.html',
                    controller: 'whisperModal',
                    size: 'lg',
                    backdrop: 'static',
                    keyboard: false
                });

                modalInstance.result.then(function() {
                    $scope.isWhisperOpen = false;
                    for (var i = 0; i < whispermessageService.whispers.length; i++) {
                        if (whispermessageService.whispers[i].selectedwhisper === true) {
                            $scope.selectedCallFlow.whisperText = whispermessageService.whispers[i].name;
                            $scope.selectedCallFlow.whisperFileName = whispermessageService.whispers[i].filename;
                            $scope.selectedCallFlow.whisperId = whispermessageService.whispers[i].id;
                            $scope.selectedCallFlow.whisperURL = whispermessageService.whispers[i].url;
                            $scope.selectedCallFlow.whisperAudio = undefined;
                            $scope.selectedCallFlow.hasValidWhisperURL = true;
                            $scope.selectedCallFlow.TTSWhisperSelected = true;
                        }
                    }
                    console.log(whispermessageService.whispers);
                    $scope.whispers = whispermessageService.whispers;
                    $scope.TTSWhisperSelected = false;
                    $scope.hasValidWhisperURL = true;
                    $scope.selectedCallFlow.whisperTTSText = '';
                }, function() {
                    $scope.isWhisperOpen = false;
                    console.log('Modal dismissed at: ' + new Date());
                });

            };

            $scope.saveLocation = function(data, id) {
                console.log("SAVING");
                //       console.log(locationWebService.getLocations());
                //          var saveData = {
                //  "location":   data.location,
                //  "address": data.address,
                //  "city":  data.city,
                //  "state":   data.state,
                //  "zip":   data.zip,
                //  "phone":   UserWebService.unMaskData(data.phone)
                // };
                // if(id) { //edit existing location

                // }
                //     else { //new location
                //         locationWebService.saveLocations(saveData)
                //       }
            };

            $scope.removeLocation = function(index) {
                $scope.locations.splice(index, 1);
            };

            $scope.savedlocations = [];
            $scope.savedlocations.push({
                id: '0',
                location: 'Create Location',
                address: '1664 S. Dixie Dr.',
                city: 'Saint George',
                state: 'UT',
                zip: '84770',
                phone: '6809909123',
                action: 'Delete'
            });
            $scope.savedlocations.push({
                id: '1',
                location: 'LogMyCalls',
                address: '1664 S. Dixie Dr.',
                city: 'Saint George',
                state: 'UT',
                zip: '84770',
                phone: '6809909123',
                action: 'Delete'
            });
            $scope.savedlocations.push({
                id: '2',
                location: 'Blue Moon Inn',
                address: '25 Willow Ln.',
                city: 'Port Costa',
                state: 'CA',
                zip: '94569',
                phone: '9259465638',
                action: 'Delete'
            });
            $scope.savedlocations.push({
                id: '3',
                location: 'Walnut Creek branch',
                address: '2705 Main St.',
                city: 'Walnut Creek',
                state: 'CA',
                zip: '94598',
                phone: '9255126685',
                action: 'Delete'
            });
            $scope.savedlocations.push({
                id: '4',
                location: 'Ocean Gate Shop',
                address: '321 Mall Dr.',
                city: 'St. George',
                state: 'UT',
                zip: '84790',
                phone: '4356746700',
                action: 'Delete'
            });
            $scope.savedlocations.push({
                id: '5',
                location: 'South Kings branch',
                address: '3110 S. Kings Hwy',
                city: 'Nob Hill',
                state: 'CA',
                zip: '94518',
                phone: '9255126225',
                action: 'Delete'
            });

            $scope.getLocation = function(val) {
                var city;
                var state;
                var addr;
                $scope.rc = [];
                if (val) {
                    if (val.length > 2) {
                        var addresses = [];

                        var stsarr = val.split(/,|-/);
                        return CampaignWebService.getGeoCity(stsarr[0]).then(function(res) {
                            if (res.data.result != 'error') {

                                //res.data.json[0];
                                angular.forEach(res.data.json.json, function(item) {
                                    addresses.push(item.npa + "-" + item.city + "," + item.state);
                                    var addr = item.npa + "-" + item.city + "," + item.state;
                                    $scope.rc.push({
                                        'address': addr,
                                        'rc': item.rc,
                                        'state': item.state
                                    });
                                    city = item.city;
                                    state = item.state;
                                });
                                addresses = _.uniq(addresses);
                                $scope.rc = _.uniq($scope.rc);
                                var filterAddresses = $filter('filter')(addresses, val);
                                return filterAddresses;

                            } else {
                                return addresses;
                            }
                        });
                    } else {
                        return "";
                    }
                }
            };
            $scope.getNum = function(passedPnumber) {
                console.log(passedPnumber);
            };

            $scope.showSubmit = function() {
                if(this.selectedCallFlow.name && this.selectedCallFlow.name !== ''){
                    this.selectedCallFlow.callflowlabel = 'For '+this.selectedCallFlow.name;
                }else{
                    this.selectedCallFlow.callflowlabel = ''; 
                }

                setTimeout(function() {
                    $scope.submitted1 = false;
                }, 100);
            };
            $scope.showConfirmationPopup = function(){
                var isDirty = $scope.singlecallForm.$dirty;
                        if(isDirty){
                            var tagMsg = "You are leaving the IVR creation pane. If you continue you will lose any IVR configuration settings that have been set. Press 'Ok' to continue and discard all IVR settings, or press 'Back' to continue editing IVR settings.";
                            //if form is dirty then cancel
                            $bootbox.confirm(tagMsg, function (clickedOK) {
                                if (clickedOK) {
                                    $scope.routeChange();
                                } else{
                                   $scope.selectedCallFlow.routetype = 'ivr';
                                }
                            });
                        }else{
                            $scope.$dismiss();
                        }
                
            }
            $scope.showConfirmationPopupOnCancel = function(){
                var isDirty = $scope.singlecallForm.$dirty;
                        if(isDirty){
                            var tagMsg = "You are leaving the IVR creation pane. If you continue you will lose any IVR configuration settings that have been set. Press 'Ok' to continue and discard all IVR settings, or press 'Back' to continue editing IVR settings.";
                            //if form is dirty then cancel
                            $bootbox.confirm(tagMsg, function (clickedOK) {
                                if (clickedOK) {
                                    $route.reload();
                                } else{
                                   $scope.selectedCallFlow.routetype = 'ivr';
                                }
                            });
                        }else{
                            $scope.$dismiss();
                        }
                
            }
            $scope.$watch('selectedCallFlow.routetype', function(newValue, oldValue) {
                console.log(oldValue,newValue)
              if(oldValue && (oldValue === 'hangup' || oldValue === 'voicemail')){
                $scope.routeChange();
              }
              if(oldValue && (oldValue === 'outbound')){
                $scope.routeChange();
                $scope.phoneNumbers.push({
                rinterval: 0,
                })

              }

              if(newValue && oldValue !== undefined && (newValue === 'hangup' || newValue === 'voicemail')){
                $scope.routeChange();
              }
              if(newValue && oldValue !== undefined && newValue === 'outbound'){
                $scope.routeChange();
                $scope.phoneNumbers.push({
                    rinterval: 0,
                    })
              }
            if(oldValue && (oldValue === 'ivr' && newValue !== 'ivr')){
                      $scope.showConfirmationPopup();  
            }
              if(oldValue && (oldValue === 'PercentageBasedRoute' || oldValue === 'schedule')){
                $scope.disableRC = false;
              }

              if(newValue && (newValue == 'PercentageBasedRoute' || newValue == 'schedule' || newValue == 'geo' || newValue == 'simple')){
                        
                            $scope.disableRC = false;
                            if(newValue == 'simple'){
                                if($scope.selectedCallFlow.activateVoicemail){
                                    $scope.disableRC = true;
                                    $scope.selectedCallFlow.recordCall = true;
                                }     
                            }
                            if(newValue == 'geo'){
                                if($scope.selectedCallFlow.activateVoicemail){
                                    $scope.disableRC = true;
                                    $scope.selectedCallFlow.recordCall = true;
                                }     
                            }
                            if(newValue == 'schedule'){
                                if($scope.selectedCallFlow.ringtoNum == undefined || $scope.selectedCallFlow.ringtoNum ==""){
                                    $scope.activatevm = false;
                                    $scope.selectedCallFlow.activateVoicemail  = false;
                                }else{
                                    $scope.activatevm = true;
                                    if($scope.selectedCallFlow.activateVoicemail){
                                        $scope.disableRC = true;
                                        $scope.selectedCallFlow.recordCall = true;
                                    }
                                }
                                angular.forEach($scope.scheduleInfo, function(value) {
                                    if(value.activateVoicemail == true){
                                        $scope.disableRC = true;  
                                    } 
                                });
                            }
                            if(newValue == 'PercentageBasedRoute'){
                                angular.forEach($scope.percentInfo, function(value) {
                                    if(value.activateVoicemail == true){
                                        $scope.disableRC = true; 
                                        $scope.selectedCallFlow.recordCall = true; 
                                    } 
                                });
                            }
                        
                        
                        
              }

              if(newValue && oldValue !== undefined && (newValue == 'geo' || newValue == 'simple')){
                if($scope.openOverflowBox){
                    $scope.overflowNumbers.length = 1;
                    _.each($scope.overflowNumbers, function(number){
                        number.overflowNumber = '';
                        number.rings = $scope.defaultsRings;
                    });
                    $scope.isSimultaneousRing=false;
                    $scope.openOverflowBox = false;
                }
              }

            });
            $scope.routeChange = function(){
                if($scope.selectedCallFlow.routetype === 'PercentageBasedRoute'){
                    $scope.selectedCallFlow.ringtoNum = '';
                    $scope.selectedCallFlow.voicemail_rings_count = '3';
                    if($scope.openOverflowBox){
                        $scope.overflowNumbers.length = 1;
                        _.each($scope.overflowNumbers, function(number){
                            number.overflowNumber = "";
                            number.rings = 3;
                        });
                        $scope.isSimultaneousRing=false;
                        $scope.openOverflowBox = false;
                    }
                    if($scope.isNew && defaultCfData.callFlowData.length > 0){
                        $scope.defaultData = defaultCfData.callFlowData[0];
                        if($scope.defaultData.play_whisper_message !== undefined && $scope.defaultData.play_whisper_message == true){
                            $scope.selectedCallFlow.whisperPrompt1 = true;
                        }
                        setDefaultData($scope.defaultSetting, true);
                    }
                } 
                else if($scope.selectedCallFlow.routetype === 'simple'){
                    $scope.selectedCallFlow.playDisclaimer = "before";
                    $scope.selectedCallFlow.dnis_as_cid = "caller_id";
                    $scope.selectedCallFlow.ringtoNum = '';
                    if($scope.openOverflowBox){
                        $scope.overflowNumbers.length = 1;
                        _.each($scope.overflowNumbers, function(number){
                            number.overflowNumber = '';
                            number.rings = '3';
                        });
                        $scope.isSimultaneousRing=false;
                        $scope.openOverflowBox = false;
                    }
                    $scope.selectedCallFlow.voicemail_rings_count = '3';
                    if($scope.isNew && defaultCfData.callFlowData.length > 0){
                        $scope.defaultData = defaultCfData.callFlowData[0];
                        if($scope.defaultData.play_whisper_message !== undefined && $scope.defaultData.play_whisper_message == true){
                            $scope.selectedCallFlow.whisperPrompt1 = true;    
                        }
                        setDefaultData($scope.defaultSetting, true);
                    }
                }
                else if($scope.selectedCallFlow.routetype === 'ivr'){
                    if($scope.isNew && defaultCfData.callFlowData.length > 0){
                        $scope.defaultData = defaultCfData.callFlowData[0];
                        if($scope.defaultData.play_voice_prompt_first !== undefined && $scope.defaultData.play_voice_prompt_first == true){
                            $scope.ivrAudio1 = undefined;
                            $scope.selectedCallFlow.voicepromptTTSText = '';
                            var message = $scope.defaultData.play_voice_prompt_first_text;
                            var substring = message.substring(0, 7);
                            if (substring == "file://") {
                                $scope.TTSIVRSelected = false;
                                $scope.hasValidTTSVoiceURL = true;
                                $scope.selectedCallFlow.voicepromptText = $scope.defaultData.prompt_message_name;
                                $scope.selectedCallFlow.voicepromptFileName = message.replace("file://", '');
                                $scope.selectedCallFlow.voicepromptURL = $scope.defaultData.voice_prompt_url;
                                $scope.selectedCallFlow.voicepromptId = $scope.defaultData.voice_prompt_id;
                            } else {
                                $scope.TTSIVRSelected = true;
                                $scope.selectedCallFlow.voicepromptTTSText = message;
                                $scope.selectedCallFlow.voicepromptFileName = message;
                            }
                        }
                        setDefaultData($scope.defaultSetting, true);
                    }else{
                        $scope.defaultData = '';
                        $scope.selectedCallFlow.voicemail_rings_count = '3';
                    }
                }    
                else if($scope.selectedCallFlow.routetype === 'geo'){
                    $scope.selectedCallFlow.ringtoNum = '';
                    $scope.selectedCallFlow.voicemail_rings_count = '3';
                    $scope.selectedCallFlow.playDisclaimer = "before";
                    if($scope.openOverflowBox){
                        $scope.overflowNumbers.length = 1;
                        _.each($scope.overflowNumbers, function(number){
                            number.overflowNumber = '';
                            number.rings = '3';
                        });
                        $scope.isSimultaneousRing=false;
                        $scope.openOverflowBox = false;
                    }
                    if($scope.isNew && defaultCfData.callFlowData.length > 0){
                        $scope.defaultData = defaultCfData.callFlowData[0];
                        if($scope.defaultData.play_whisper_message !== undefined && $scope.defaultData.play_whisper_message == true){
                            $scope.selectedCallFlow.whisperPrompt1 = true;    
                        }
                        setDefaultData($scope.defaultSetting, true);

                    }
                }
                else if($scope.selectedCallFlow.routetype === 'hangup'){
                    $scope.selectedCallFlow.preCallWebhook = false;
                    $scope.selectedCallFlow.activateVoicemail = false;
                    $scope.disableRC = false;
                    $scope.selectedCallFlow.whisperPrompt1 = false; 
                    $scope.selectedCallFlow.voicemail_rings_count = null;
                    $scope.selectedCallFlow.caller_id = '';
                    $scope.selectedCallFlow.spamActive = false;
                    // fields other than outbound
                    $scope.postCallIVR = false;
                    $scope.selectedCallFlow.voicemailGreetingsTTSText = '';
                    $scope.selectedCallFlow.AgentIDVoicePromptTTSText = '';
                    $scope.selectedCallFlow.lengthOfAgentId = '';
                    $scope.selectedCallFlow.outComePromtTTSText = '';
                    $scope.selectedCallFlow.salesAmountVoiceTTSText = '';
                    $scope.selectedCallFlow.recordCall = true;
                    $scope.selectedCallFlow.playDisclaimer = "before";
                    if($scope.isNew && defaultCfData.callFlowData.length > 0){
                        $scope.defaultData = defaultCfData.callFlowData[0];
                        $scope.selectedCallFlow.recordCall = $scope.defaultData.record_call;
                        $scope.selectedCallFlow.playDisclaimer = $scope.defaultData.play_disclaimer;
                        $scope.selectedCallFlow.voicePrompt1 = $scope.defaultData.play_voice_prompt_first;
                        $scope.selectedCallFlow.voicePromptTTSText = $scope.defaultData.play_voice_prompt_first_text;
                        if ($scope.userAccess.dni !== undefined && $scope.userAccess.dni > 4 && defaultCfData.dniSettingData.length > 0 ) {
                            $scope.selectedCallFlow.showDNI = defaultCfData.defOrgComponentStatus[0].dni_status;
                            var val = defaultCfData.dniSettingData[0];
        
                            var temp_dni_referrer = val.referrer;
                            if (val.referrer_type) temp_dni_referrer += "|" + val.referrer_type;
                           
                            var found = $filter('filter')($scope.dniReferrer, temp_dni_referrer, true);
                            if (found.length < 1) $scope.dniReferrer.push({value: temp_dni_referrer, text: val.referrer});
        
                            var temp_referrer = val.referrer;
                            if (val.referrer_type) temp_referrer += "|" + val.referrer_type;
        
                            $scope.selectedCallFlow.dni_setting_id = val.dni_setting_id;
                            $scope.selectedCallFlow.destination_url = val.destination_url;
                            $scope.selectedCallFlow.dniType = val.dni_type;
                            $scope.populatedDniType = val.dni_type;
                            if($scope.selectedCallFlow.showDNI){
                            $scope.selectedCallFlow.referrer = temp_referrer;
                            $scope.selectedCallFlow.dni_element = val.dni_element;
                            }
                            $scope.selectedCallFlow.dni_ttl = val.ttl;
                        }
                    }
                }
                else if($scope.selectedCallFlow.routetype === 'voicemail'){
                    $scope.selectedCallFlow.activateVoicemail = false;
                    $scope.selectedCallFlow.showDNI = false;
                    $scope.selectedCallFlow.whisperPrompt1 = false; 
                    $scope.selectedCallFlow.value = null;
                  
                    $scope.selectedCallFlow.voicemail_rings_count = null;
                    $scope.selectedCallFlow.caller_id = '';
                    $scope.selectedCallFlow.spamActive = false;
                    $scope.selectedCallFlow.destination_url = '*.*';
                    $scope.selectedCallFlow.dniType = '';
                    $scope.selectedCallFlow.dni_element = '';
                    $scope.selectedCallFlow.referrer = '';
                    $scope.selectedCallFlow.preCallWebhook = false;
                    $scope.selectedCallFlow.webhook = '';
                    // fields other than outbound
                    $scope.selectedCallFlow.recordCall = true;
                    $scope.selectedCallFlow.voicePrompt1 = false;
                    $scope.selectedCallFlow.playDisclaimer = "never";
                    $scope.selectedCallFlow.voicePromptTTSText = '';
                    $scope.postCallIVR = false;
                    $scope.selectedCallFlow.AgentIDVoicePromptTTSText = '';
                    $scope.selectedCallFlow.lengthOfAgentId = '';
                    $scope.selectedCallFlow.outComePromtTTSText = '';
                    $scope.selectedCallFlow.salesAmountVoiceTTSText = '';
                    $scope.selectedCallFlow.customSourceList_1 = '';
                    $scope.selectedCallFlow.customSourceList_2 = '';
                    $scope.selectedCallFlow.customSourceList_3 = '';
                    $scope.selectedCallFlow.customSourceList_4 = '';
                    $scope.selectedCallFlow.customSourceList_5 = '';
                }else if($scope.selectedCallFlow.routetype === 'outbound'){
                    $scope.selectedCallFlow.preCallWebhook = false;
                    $scope.selectedCallFlow.activateVoicemail = false;
                    $scope.disableRC = false;
                    $scope.selectedCallFlow.showDNI = false;
                    $scope.postCallIVR = false;
                    $scope.selectedCallFlow.AgentIDVoicePromptTTSText = '';
                    $scope.selectedCallFlow.lengthOfAgentId = '';
                    $scope.selectedCallFlow.outComePromtTTSText = '';
                    $scope.selectedCallFlow.salesAmountVoiceTTSText = '';
                    $scope.selectedCallFlow.whisperPrompt1 = false; 
                    this.selectedCallFlow.value = '';
                    this.selectedCallFlow.rinterval = '';
                    $scope.selectedCallFlow.voicemail_rings_count = null;
                    $scope.selectedCallFlow.voicemailGreetingsTTSText = '';
                    $scope.selectedCallFlow.caller_id = 'CALLER_NUMBER';
                    $scope.selectedCallFlow.spamActive = false;
                    $scope.selectedCallFlow.smsActive = false;
                    $scope.selectedCallFlow.smsFeature = false;
                    $scope.selectedCallFlow.destination_url = '*.*';
                    $scope.selectedCallFlow.dniType = '';
                    $scope.selectedCallFlow.dni_element = '';
                    $scope.selectedCallFlow.referrer = '';
                    $scope.selectedCallFlow.webhook = '';
                    $scope.selectedCallFlow.recordCall = true;
                    $scope.selectedCallFlow.playDisclaimer = "before";
                    if($scope.isNew && defaultCfData.callFlowData.length > 0){
                        $scope.defaultData = defaultCfData.callFlowData[0];
                        $scope.selectedCallFlow.recordCall = $scope.defaultData.record_call;
                        $scope.selectedCallFlow.playDisclaimer = $scope.defaultData.play_disclaimer;
                        $scope.selectedCallFlow.voicePrompt1 = $scope.defaultData.play_voice_prompt_first;
                        $scope.selectedCallFlow.voicePromptTTSText = $scope.defaultData.play_voice_prompt_first_text;
                    }
                }else if($scope.selectedCallFlow.routetype === 'schedule'){
                    $scope.selectedCallFlow.ringtoNum = "";
                    $scope.showAddSchedule = true;
                    $scope.selectedCallFlow.activateVoicemail = false;
                    $scope.disableRC = false;
                    $scope.scheduleInfo = [{scheduleId:0,days:[],fromTime:'',toTime:'',ringTo:'',isAddOverflow:false,overflowNumbers:[{overflowNumber:'',rings: $scope.defaultsRings,overflow_order: 1}],simultaneousRings :false,activateVoicemail:false}]
                    $scope.selectedCallFlow.voicemail_rings_count = '3';
                    if($scope.isNew && defaultCfData.callFlowData.length > 0){
                        $scope.defaultData = defaultCfData.callFlowData[0];
                        $scope.selectedCallFlow.activateVoicemail = false;
                        $scope.disableRC = false;
                        $scope.selectedCallFlow.recordCall = false;
                        if($scope.defaultData.play_whisper_message == true){
                            $scope.selectedCallFlow.whisperPrompt1 = true;    
                        }
                        setDefaultData($scope.defaultSetting, true);
                    }
                } else if($scope.isNew && defaultCfData.callFlowData.length > 0){
                    setDefaultData($scope.defaultSetting, true);
                }
                // else if($scope.basicRoute && $scope.basicRoute === 'outbound'){
                //     $scope.selectedCallFlow.dnis_as_cid = "caller_id";
                //     $scope.selectedCallFlow.voicemail_rings_count = 3;
                // }else{
                //     $scope.selectedCallFlow.dnis_as_cid = "caller_id";
                // }

                // if($scope.basicRoute && $scope.basicRoute === 'outbound'){
                //     $scope.isAdvancedTrackingNumbersOpen = true;
                // }
            }

            $scope.activatevm = true;
            $scope.activateVoicemailSchedule = function(){
                var num = UserWebService.unMaskData($scope.selectedCallFlow.ringtoNum);
                if($scope.selectedCallFlow.ringtoNum && UserWebService.unMaskData($scope.selectedCallFlow.ringtoNum).length == 10){
                    $scope.activatevm = true;
                    if($scope.isNew){
                        $scope.selectedCallFlow.activateVoicemail = $scope.defaultData.activate_voicemail;
                    }
                }
                else{
                    $scope.selectedCallFlow.activateVoicemail = false;
                    $scope.activatevm = false;
                }
            }

            $scope.showSaveButton = function() {
                setTimeout(function() {
                    $scope.formSubmit1 = false;
                }, 100);
            };
            $scope.showSaveButtonOverflow = function() {
                $scope.showSaveButton();
                $scope.showSubmit();
            };
            
            $scope.resNumChange = function() {
                if($scope.selectedCallFlow.callflowOption == "reservedNumber"){
                    $scope.loadResNum = true;
                    $("#loadResNum").show();
                    CampaignWebService.getReservedNumbers().then(function(result) {
                        if (result.data.result != 'error') {
                            $scope.loadResNum = false;
                            $("#loadResNum").hide();
                            $scope.resNumList = result.data.json;
                            if($scope.resNumList.length == 0){
                                $scope.resNumList.push({
                                    number: "Numbers not available",
                                    number_id: "",
                                    pretty_number: "Numbers not available",
                                    source: "",
                                    vendor_id: ""
                                });
                            }
                        }
                    });
                }

                if($scope.selectedCallFlow.callflowOption != "singleNumber" && $scope.selectedCallFlow.callflowOption != "reservedNumber"){
                    $scope.selectedCallFlow.smsActive = false;
                }
            }

            $scope.onReservedNumberFocus = function() {
                CampaignWebService.getReservedNumbers().then(function(result) {
                    if (result.data.result != 'error') {
                        $scope.resNumList = result.data.json;
                    }
                });
            };
            var oldAddress = '';
            $scope.onFocus = function(address) {
                if (address && address != oldAddress) {
                    oldAddress = address;
                    $scope.numList = [];
                    var stsarr = address.split(',');
                    var st_npa_city = stsarr[0].split('-');
                    var st_npa = st_npa_city.shift();
                    var st_city = st_npa_city.join('-');
                    var st_state = stsarr.pop();
                    if (st_city != '' && st_npa != '') {
                        if (st_city === 'TOLLFREE') {
                            st_state = "XX";
                        }
                        if (st_state != '') {
                            CampaignWebService.getPhoneNumbers(st_city, st_state, st_npa).then(function(result) {
                                if (result.data.result != 'error') {
                                    $scope.numList = result.data.json;
                                    if (!($scope.numList instanceof Array)) {
                                        $scope.numList = [];
                                    }
                                    //JAW CT-7264: updated phone_number_id as number_id
                                    if (st_city !== 'TOLLFREE') {
                                        $scope.numList.push({
                                            "number": "more",
                                            "number_id": 0
                                            // "pretty_number": "More"
                                        });
                                        $scope.removeNo = result.data.json.length -1;
                                        _.forEach($scope.numList,function(num){
                                            if(num.number === 'more'){
                                                $scope.setNewNumber(num,address);
                                                
                                            }
                                            
                                        });
                                    }
                                    
                                } else {
                                    $scope.numList = [];
                                }
                            });
                            if ($scope.showMultiPass === true) {
                                console.log($scope.selectedCallFlow.count);
                            }
                        } else {
                            $scope.numList = [];
                        }
                    } else {
                        $scope.numList = [];
                    }
                } else {
                    // $scope.numList = [];
                }
                    
            };
            
            var rateCenterAddress = document.getElementById("rateCenterAddress");
            rateCenterAddress.addEventListener("keydown", function (e) {
                if (e.keyCode === 13) {  //checks whether the pressed key is "Enter"
                    var fn = setTimeout(function(){
                        $scope.onFocus($scope.selectedCallFlow.address);
                        return true;
                    }, 400);
                    
                }

            });

            $scope.lostFocus = function(address) {
                if (!address) {
                    $scope.numList = [];
                    $scope.selectedCallFlow.num = '';
                }
            };
            
            $scope.setNewNumber = function(num, address) {
                var rc = [];
                var state = '';
                var flag = 0;
                var totalRc;
                var counter=0;
                $scope.LoadTrackingNumber = true;
                $("#LoadTrackingNumber").show();
                console.log("$scope.LoadTrackingNumber ****",$scope.LoadTrackingNumber);
                if (num  && num.number === 'more' && address !== '') {
                    $scope.numList.pop();
                    $.each($scope.rc, function(key, value) {
                        if (value.address === address) {
                            if (rc.indexOf(value.rc) === -1 && value.rc !== undefined) {
                                counter++;
                                if(counter==1)
                                {
                                    rc.push((value.rc).trim());
                                    state = (value.state).trim();
                                }
                            }
                        }
                    });

                    // get third party numbers
                    if (rc.length > 0) {
                        totalRc = rc.length;
                        for (var i = 0; i < rc.length && flag == 0; i++) {
                            if (rc[i] !== null || rc[i] !== '') {
                                CampaignWebService.getThirdPartyNumbers(state, rc[i]).then(function(result) {
                                    totalRc = totalRc - 1;
                                    if (result.data.result !== 'error') {
                                        if (result.data.json[0] !== 'fail') {
                                            flag = 1;
                                            if(parseInt($scope.removeNo) >0){
                                                result.data.json.splice(0,parseInt($scope.removeNo));
                                            }
                                            angular.forEach(result.data.json, function(number) {
                                                $scope.numList.push(number);
                                            });

                                            var sortAscInv = [];
                                            var sortAscSp = [];

                                            for(var i=0;i<$scope.numList.length;i++){
                                                if($scope.numList[i].source == 'inventory'){
                                                    sortAscInv.push($scope.numList[i].number);
                                                }
                                                if($scope.numList[i].source == 'shoutpoint'){
                                                    sortAscSp.push($scope.numList[i].number);
                                                }   
                                                
                                            }
                                            
                                            var sorted = [];
                                            if(sortAscInv.length > 0){
                                                sortAscInv.sort(function(a, b){return a-b});
                                                for(var i=0;i<sortAscInv.length;i++){
                                                    for(var j=0;j<$scope.numList.length;j++){
                                                        if(sortAscInv[i] == $scope.numList[j].number && $scope.numList[j].source == 'inventory'){
                                                            sorted.push($scope.numList[j]);
                                                        }
                                                    }
                                                }
                                            }
                                            if(sortAscSp.length > 0){
                                                sortAscSp.sort(function(a, b){return a-b});
                                                for(var i=0;i<sortAscSp.length;i++){
                                                    for(var j=0;j<$scope.numList.length;j++){
                                                        if(sortAscSp[i] == $scope.numList[j].number && $scope.numList[j].source == 'shoutpoint'){
                                                            sorted.push($scope.numList[j]);
                                                        }
                                                    }
                                                }
                                            }
                                            
                                            $scope.numList = sorted;
                                            $scope.LoadTrackingNumber = false; 
                                            $("#LoadTrackingNumber").hide();

                                        } else {
                                            $scope.numList.push({
                                                number: "Numbers not available",
                                                number_id: "",
                                                pretty_number: "Numbers not available",
                                                source: "",
                                                vendor_id: ""
                                            });
                                            console.log('No data found');
                                            $scope.LoadTrackingNumber = false;
                                            $("#LoadTrackingNumber").hide(); 

                                        }
                                    }else{
                                        var sortAscInv = [];
                                        for(var i=0;i<$scope.numList.length;i++){
                                            if($scope.numList[i].source == 'inventory'){
                                                sortAscInv.push($scope.numList[i].number);
                                            }
                                        } 
                                        var sorted = [];
                                            if(sortAscInv.length > 0){
                                                sortAscInv.sort(function(a, b){return a-b});
                                                for(var i=0;i<sortAscInv.length;i++){
                                                    for(var j=0;j<$scope.numList.length;j++){
                                                        if(sortAscInv[i] == $scope.numList[j].number && $scope.numList[j].source == 'inventory'){
                                                            sorted.push($scope.numList[j]);
                                                        }
                                                    }
                                                }
                                            } 
                                        $scope.numList = sorted;  
                                        $scope.LoadTrackingNumber = false; 
                                        $("#LoadTrackingNumber").hide();
                                    }
                                    if($scope.numList.length > 25){
                                        $scope.numList = $scope.numList.slice(0,25);
                                    }
                                    if($scope.numList.length == 0 && totalRc === 0){
                                        $scope.numList.push({
                                            number: "Numbers not available",
                                            number_id: "",
                                            pretty_number: "Numbers not available",
                                            source: "",
                                            vendor_id: ""
                                        });
                                    }
                                });
                            }
                        }
                    }else{
                        $scope.LoadTrackingNumber = false; 
                        $("#LoadTrackingNumber").hide();
                    }
                }else{
                    $scope.LoadTrackingNumber = false; 
                    $("#LoadTrackingNumber").hide();
                }
                // setTimeout(function() {
                //     $scope.LoadTrackingNumber = false; 
                //     console.log("$scope.LoadTrackingNumber",$scope.LoadTrackingNumber);
                // }, 3000);
            };

            $scope.updateqCall = function() {
                $scope.qcf = this.qcf;
            };

           

            function setDefaultData(result, isChangedtype) {
                $scope.populatedDniType = '';
                $scope.selectedCallFlow.voicemail_rings_count = 3;
                var prompts = $scope.prompts;
				var whispers = $scope.whispers;
				if ($scope.dniComponent === true && result.data.json.callFlowData.defOrgComponentStatus.length > 0){
					$scope.selectedCallFlow.showDNI = result.data.json.callFlowData.defOrgComponentStatus[0].dni_status;
				}else{
					$scope.selectedCallFlow.showDNI = false
				}
                if ($scope.userAccess.dni !== undefined && $scope.userAccess.dni > 4 &&  $scope.selectedCallFlow.showDNI && result.data.json.callFlowData.dniSettingData.length > 0 ) {
                    // $scope.selectedCallFlow.showDNI = true;
                    var val = result.data.json.callFlowData.dniSettingData[0];

                    var temp_dni_referrer = val.referrer;
                    if (val.referrer_type) temp_dni_referrer += "|" + val.referrer_type;
                   
                    var found = $filter('filter')($scope.dniReferrer, temp_dni_referrer, true);
                    if (found.length < 1) $scope.dniReferrer.push({value: temp_dni_referrer, text: val.referrer});

                    var temp_referrer = val.referrer;
                    if (val.referrer_type) temp_referrer += "|" + val.referrer_type;

                    $scope.selectedCallFlow.dni_setting_id = val.dni_setting_id;
                    $scope.selectedCallFlow.destination_url = val.destination_url;
                    $scope.selectedCallFlow.referrer = temp_referrer;
                    $scope.selectedCallFlow.dniType = val.dni_type;
                    $scope.populatedDniType = val.dni_type;
                    $scope.selectedCallFlow.dni_element = val.dni_element;
                    $scope.selectedCallFlow.dni_ttl = val.ttl;
                    // $scope.selectedCallFlow.showDNI = val.share_with_subgroup;
                }else{
					$scope.selectedCallFlow.showDNI = false;
					$scope.selectedCallFlow.destination_url = '*.*';
					$scope.selectedCallFlow.dniType = '';
                    $scope.selectedCallFlow.dni_element = '';
                    $scope.selectedCallFlow.referrer = '';
                }
                if($scope.userAccess.postcallivr !== undefined && $scope.userAccess.postcallivr > 4){
                    if (result.data.json.callFlowData.postCallIVR && result.data.json.callFlowData.postCallIVR.length > 0) {
                        var postCallIVRData = result.data.json.callFlowData.postCallIVR;
                        $scope.postCallIVR = result.data.json.callFlowData.defOrgComponentStatus[0].postcallivr_status;
                        $scope.postIVRType = $scope.postIVRTypes[postCallIVRData[0].post_call_ivr_option_id - 1].value;
                        
                        $scope.prompts = [];
                        for(var i=0;i<$rootScope.prompts.length;i++){
                            if($rootScope.prompts[i].active == true){
                                $scope.prompts.push($rootScope.prompts[i]);
                            }
                        }
                        

                        $scope.TTSoutComePromtSelected = true;
                        $scope.TTSsalesAmountVoiceSelected = true;
                        $scope.TTSAgentIDVoicePromptSelected = true;

                         for (var i = 0; i < postCallIVRData.length; i++) {
                            switch (postCallIVRData[i].voice_prompt) {
                                case 'record_call_outcome':
                                    var message = postCallIVRData[i].voice_prompt_value;
                                    var substring = message.substring(0, 7);
                                    $scope.hasValidoutComePromtURL = false;
                                    if (substring == "file://") {
                                        var selectedprompt = ''
                                         message = message.substring(message.lastIndexOf("/") + 1, message.length)
                                        if($rootScope.prompts ){
                                            for (var j = 0; j < $rootScope.prompts.length; j++) {
                                                var filename = $rootScope.prompts[j].filename;
                                                if(filename == message){
                                                    selectedprompt = $rootScope.prompts[j];
                                                    $scope.TTSoutComePromtSelected = false;
                                                    $scope.hasValidoutComePromtURL = true;
                                        
                                                }
                                            }
                                        }
                                        $scope.selectedCallFlow.outComePromtText = selectedprompt.name;
                                        $scope.selectedCallFlow.outComePromtURL = selectedprompt.url;
                                        $scope.selectedCallFlow.outComePromtFileName = selectedprompt.filename;
    
                                        $scope.selectedCallFlow.outComePromtId = selectedprompt.id;
                                    } else {
                                        $scope.TTSoutComePromtSelected = true;
                                        $scope.selectedCallFlow.outComePromtTTSText = message
                                    }
                                    break;
                                case 'record_a_sale':
                                    var message = postCallIVRData[i].voice_prompt_value;
                                    var substring = message.substring(0, 7);                                  
                                    if (substring == "file://") {
                                        var selectedprompt = ''
                                        message = message.substring(message.lastIndexOf("/") + 1, message.length)
                                        if($rootScope.prompts){
                                            for (var j = 0; j < $rootScope.prompts.length; j++) {
                                                var filename = $rootScope.prompts[j].filename;
                                                if(filename == message){
                                                    selectedprompt = $rootScope.prompts[j];
                                                    $scope.TTSsalesAmountVoiceSelected = false;
                                                    $scope.hasValidsalesAmountVoiceURL = true;
                                                }
                                            }
                                        }
                                        $scope.selectedCallFlow.salesAmountVoicePromptText = selectedprompt.name;
                                        $scope.selectedCallFlow.salesAmountVoiceURL = selectedprompt.url;
                                        $scope.selectedCallFlow.salesAmountVoiceFileName = selectedprompt.filename;
    
                                        $scope.selectedCallFlow.salesAmountVoiceId = selectedprompt.id;
                                    } else {
                                        $scope.TTSsalesAmountVoiceSelected = true;
                                        $scope.selectedCallFlow.salesAmountVoiceTTSText = message
                                    }
                                    break;     
                                case 'record_agent_id':
                                    var message = postCallIVRData[i].voice_prompt_value;
                                    var substring = message.substring(0, 7);
                                    $scope.selectedCallFlow.lengthOfAgentId = postCallIVRData[i].number_of_digits;
                                    if (substring == "file://") {
                                        var selectedprompt = ''
                                        message = message.substring(message.lastIndexOf("/") + 1, message.length)
                                        if($rootScope.prompts){
                                            for (var j = 0; j < $rootScope.prompts.length; j++) {
                                                var filename = $rootScope.prompts[j].filename;
                                                if(filename == message){
                                                    selectedprompt = $rootScope.prompts[j];
                                                    $scope.TTSAgentIDVoicePromptSelected = false;
                                                    $scope.hasValidAgentIDVoicePromptURL = true;
                                                }
                                            }
                                        }
                                        $scope.selectedCallFlow.AgentIDVoicePromptText = selectedprompt.name;
                                        $scope.selectedCallFlow.AgentIDVoicePromptURL = selectedprompt.url;
                                        $scope.selectedCallFlow.AgentIDVoicePromptFileName = selectedprompt.filename;
    
                                        $scope.selectedCallFlow.AgentIDVoicePromptId = selectedprompt.id;
                                    } else {
                                        $scope.TTSAgentIDVoicePromptSelected = true;
                                        $scope.selectedCallFlow.AgentIDVoicePromptTTSText = message
                                    }
                                    break;  
                                }
                        }    
    
                    }
                }
                else{
                    $scope.postCallIVR = false;
                } 

                if (result.data.json.callFlowData.customSourceData.length > 0) {
                    var val = result.data.json.callFlowData.customSourceData;
                    var csMapping = {
                        "CS1": "customSourceList_1",
                        "CS2": "customSourceList_2",
                        "CS3": "customSourceList_3",
                        "CS4": "customSourceList_4",
                        "CS5": "customSourceList_5"
                    }
                    _.each(val, function(cs) {
                        $scope.selectedCallFlow[csMapping[cs.custom_source_type]] = cs.custom_source_id;
                    });
                }

                if (result.data.json.callFlowData.callFlowData.length > 0) {
                    var val = result.data.json.callFlowData.callFlowData[0];
                    $scope.selectedCallFlow.activateVoicemail = $scope.voicemailComponent == false ? $scope.selectedCallFlow.activateVoicemail = false : result.data.json.callFlowData.callFlowData[0].activate_voicemail;
                    $scope.hasValidVoiceURL = false;
                    var message = val.play_voice_prompt_first_text;
                    var substring = message.substring(0, 7);
                    
                    $scope.prompts = [];
                    $rootScope.prompts = JSON.parse($window.sessionStorage.prompts);
                    for(var i=0;i<$rootScope.prompts.length;i++){
                        if($rootScope.prompts[i].active == true){
                            $scope.prompts.push($rootScope.prompts[i]);   
                        }
                    }
                    
                    if (substring == "file://") {
                        $scope.TTSSelected = false;
                        $scope.hasValidVoiceURL = true;
                        $scope.selectedCallFlow.voicePromptText = val.prompt_message_name;
                        $scope.selectedCallFlow.voicePromptFileName = message.replace("file://", '');
                        $scope.selectedCallFlow.voiceURL = val.voice_prompt_url;
                        $scope.selectedCallFlow.voicePromptId = val.voice_prompt_id;
                        $scope.hasValidVoiceURL = true;
                        $scope.selectedCallFlow.voicePrompt1 = true;
                    }else {
                        $scope.TTSSelected = true;
                        $scope.selectedCallFlow.voicePromptTTSText = message;
                        $scope.selectedCallFlow.voicePromptFileName = message;
                        $scope.selectedCallFlow.voicePrompt1 = true;
                    } 
                    var whisperMessage = val.play_whisper_message_text;
                    var whisperSubstring = whisperMessage.substring(0, 7);
                    $rootScope.whispers = JSON.parse($window.sessionStorage.whispers);
                    $scope.hasValidWhisperURL = false;
                    $scope.whispers = [];
                    for(var i=0;i<$rootScope.whispers.length;i++){
                        if($rootScope.whispers[i].active == true){
                            $scope.whispers.push($rootScope.whispers[i]);
                        }
                    }
                    
                    if (whisperSubstring == "file://") {
                        $scope.TTSWhisperSelected = false;
                        $scope.selectedCallFlow.whisperText = val.whisper_message_name;
                        $scope.selectedCallFlow.whisperFileName = whisperMessage.replace("file://", '');
                        $scope.selectedCallFlow.whisperURL = val.whisper_message_url;
                        $scope.selectedCallFlow.whisperId = val.whisper_id;
                        $scope.hasValidWhisperURL = true;
                        $scope.selectedCallFlow.whisperPrompt1 = true;
                    }else {
                        $scope.TTSWhisperSelected = true;
                        $scope.selectedCallFlow.whisperTTSText = whisperMessage;
                        $scope.selectedCallFlow.whisperFileName = whisperMessage;
                        $scope.selectedCallFlow.whisperPrompt1 = true;
                    } 
                    if($scope.voicemailComponent && val.voicemail_greeting_message !== null && val.voicemail_greeting_message !== undefined ){
                        var voicemailMessage =  val.voicemail_greeting_message;  
                        var voicemailSubstring = voicemailMessage.substring(0, 7);
                        var message = voicemailMessage.split("//")
                        var file = message[1];
                        var f_name = '';
                        var url = '';

                        $scope.voicemails = [];
                        $rootScope.voicemails = JSON.parse($window.sessionStorage.voicemails);
                        for(var i=0;i<$rootScope.voicemails.length;i++){
                            if($rootScope.voicemails[i].active == true){
                                $scope.voicemails.push($rootScope.voicemails[i]);   
                            }
                        }
                        
                        if (voicemailSubstring == "file://") {
                                if($rootScope.voicemails){
                                    for (var j = 0; j < $rootScope.voicemails.length; j++) {
                                        var filename = $rootScope.voicemails[j].filename;
                                        if(filename == file){
                                        filename = $rootScope.voicemails[j].filename;
                                        f_name = $rootScope.voicemails[j].name;
                                        url = $rootScope.voicemails[j].url;
                                        $scope.hasValidvoicemailGreetingsURL = true;
                                        $scope.TTSvoicemailGreetingsSelected = false;
                                        $scope.selectedCallFlow.voicemailGreetingsTTSText = "";
                                    }
                                }
                            }
                            
                            $scope.selectedCallFlow.voicemailGreetingsText = f_name;
                            $scope.selectedCallFlow.VoiceMainGreetingURL = url;
                            $scope.selectedCallFlow.voicemailGreetingsFileName = file;
                        } else {
                            $scope.TTSvoicemailGreetingsSelected = true;
                            $scope.selectedCallFlow.voicemailGreetingsTTSText = voicemailMessage;
                        }
                    }
                    if(!isChangedtype){
                        $scope.selectedCallFlow.routetype = "simple";
                    }                    
                    $scope.selectedCallFlow.recordCall = val.record_call;
                    $scope.selectedCallFlow.ringtoNum = val.ring_to_number;
                    $scope.selectedCallFlow.voicePrompt1 = val.play_voice_prompt_first;
                    $scope.selectedCallFlow.whisperPrompt1 = val.play_whisper_message;
                    $scope.selectedCallFlow.rinterval = val.repeat_interval_call;
                    $scope.selectedCallFlow.playDisclaimer = val.play_disclaimer;
                    
                    $scope.oldVoicePromptFileName = $scope.selectedCallFlow.voicePromptFileName;
                    $scope.oldVoicePromptTTSText = $scope.selectedCallFlow.voicePromptTTSText;
                    $scope.oldVoicePrompt1 = $scope.selectedCallFlow.voicePrompt1;
                    $scope.oldHasValidVoiceURL = $scope.hasValidVoiceURL;
                    $scope.oldVoicePromptText = $scope.selectedCallFlow.voicePromptText;
                    $scope.selectedCallFlow.value = val.call_value;
                    if(!val.voicemail_rings || val.voicemail_rings == "" || val.voicemail_rings == "undefined"){val.voicemail_rings = 3};
                    $scope.selectedCallFlow.voicemail_rings_count = val.voicemail_rings;
                    $scope.selectedCallFlow.Overflow = val.overflow_rings;
                    if(val.overflow_rings){
                        $scope.defaultsRings = val.overflow_rings;
                    }
                    $scope.ivrActions[0].overflowNumbers = [{overflowNumber:'', rings: $scope.defaultsRings === undefined ? 3:$scope.defaultsRings, overflow_order: 1}];
                }
                else{
                    $scope.selectedCallFlow.routetype = "simple"; 
                }
                                
                $scope.overflowNumbers = [{overflowNumber:'', rings: $scope.selectedCallFlow.Overflow === undefined ? 3:$scope.selectedCallFlow.Overflow, overflow_order : 1}];
                $scope.currentOverFlowNumber = $scope.overflowNumbers[0];
                
                $scope.percentInfo = [{'percentage':'','ringToNum':'',overflowNumbers:[{overflowNumber:'',rings: $scope.selectedCallFlow.Overflow === undefined ? 3:$scope.selectedCallFlow.Overflow,overflow_order : 1}], isSimultaneousRing :false, openOverflowBox:false, route_order:1, activateVoicemail:false}];
                if (result.data.json.featureData.defaultData.length > 0) {
                    var val = result.data.json.featureData.defaultData[0];
                    $scope.selectedCallFlow.spamActive = val.spam_guard_status;
                }
                

                $scope.isAdvancedTrackingNumbersOpen = true;
                $scope.selectedCallFlow.dnis_as_cid = "caller_id";
                $(".addTrackingNumbersProgressLoader").hide();
                $("#addTrackingNumbersProgressLoader").css("opacity","1");

            }

            $rootScope.$on("loadCallFlowReceiver", function(event, passedPnumber) {
                if(passedPnumber.name){$scope.flowname = passedPnumber.name;}
                $scope.loadCallFlow(passedPnumber);
            });

            $scope.hideDniOptions = function (dni_type, callflow_type) {
               if (callflow_type === "singleNumber" || callflow_type === "reservedNumber") {
                        // if($scope.populatedDniType !== undefined && $scope.populatedDniType.length > 0){
                        //     $scope.selectedCallFlow.dniType = $scope.populatedDniType;
                        // }
                        if(dni_type !== 'session')
                            return false;
                        else
                            return true;
                        //$scope.selectedCallFlow.dniType = 'source';
                    } else {
                        //$scope.selectedCallFlow.dniType = '';
                        if(dni_type !== 'session')
                            return true;
                        else
                            return false;
                    }
            }
            $scope.changeLocId = function (locObj) {
                if(locObj != undefined){
                    $scope.selectedCallFlow.geoList = locObj.id;
                }
            };
            // $scope.qCallFlowList = []
            $scope.loadCallFlow = function(passedPnumber) {
                $(".addTrackingNumbersProgressLoader").show();
                $scope.isAddTrackingNumbersOpen = true;
                $scope.disableSaveForSchedule.levelOne = false;
                $scope.disableSaveForSchedule.levelTwo = false;
                $scope.disableSaveForSchedule.levelThird = false;
                $scope.hideCallAction =true;
                $scope.openOverflowBox = false;
                $scope.referrerClassCombinations = [];
                $scope.showReferrerTextBox = false;
                $scope.showWebHookTextBox = false;
                $scope.oldVoicePromptTTSText = '';
                $scope.oldVoicePrompt1 = false;
               // $scope.defaultsRings = 3;
                $scope.TTSIVRSelected = true;
                if(passedPnumber){
                    $scope.prompts = JSON.parse($window.sessionStorage.prompts);
                    $scope.whispers = JSON.parse($window.sessionStorage.whispers);
                    $scope.voicemails = JSON.parse($window.sessionStorage.voicemails); 
                }
                $scope.selectedCallFlow.activateVoiceMail = false;
                var message_type = "";
                var message = "";
                if ($scope.promptAudio !== undefined)
                    $scope.promptAudio.pause();
                    $scope.promptAudio = undefined;
                if ($scope.ivrAudio !== undefined)
                    $scope.ivrAudio.pause();
                    $scope.ivrAudio = undefined;
                if ($scope.ivrAudio1 !== undefined)
                    $scope.ivrAudio1.pause();
                    $scope.ivrAudio1 = undefined;   
                if ($scope.whisperAudio !== undefined)
                    $scope.whisperAudio.pause();
                    $scope.whisperAudio = undefined;
                if ($scope.greetingAudio !== undefined)
                    $scope.greetingAudio.pause();
                    $scope.greetingAudio = undefined;
                if ($scope.calloutcomeAudio !== undefined)
                    $scope.calloutcomeAudio.pause();
                    $scope.calloutcomeAudio = undefined;
                if ($scope.agentidAudio !== undefined)
                    $scope.agentidAudio.pause();
                    $scope.agentidAudio = undefined;
                if ($scope.saleAudio !== undefined)
                    $scope.saleAudio.pause();
                if ($scope.leadAudio !== undefined)
                    $scope.leadAudio.pause();
                    $scope.leadAudio = undefined;

                  $scope.changeReferrer = function() {
                    if ($scope.selectedCallFlow.referrer === "new") {
                        $scope.showReferrerTextBox = true;
                        $scope.selectedCallFlow.referrer = '';

                    } else if ($scope.selectedCallFlow.referrer === '' || $scope.selectedCallFlow.referrer === undefined) {
                        $scope.showReferrerTextBox = false;
                        $scope.selectedCallFlow.referrer = '';
                    }
                };

                if ($scope.singlecallForm !== undefined){
                    $scope.singlecallForm.$setPristine();
                }
                $scope.ivrActions = [];
                $scope.ivrActions = [{
                    id: 1,
                    action_order: 1,
                    voicepromptText : "",
                    voicepromptFileName : "",
                    voicepromptURL : "",
                    voicepromptId : "",
                    TTSIVRSelected : true,
                    hasValidTTSVoiceURL : "",
                    voicepromptTTSText : "",
                    action: 'simple',
                    message_type: message_type,
                    message:message,
                    ringtonum: "",
                    recordCall: false,
                    activateVoiceMail: false,
                    playDisclaimer: 'before',
                    overflowNumbers :[{overflowNumber:'',rings: $scope.overflow, overflow_order: 1}],
                    openOverflowBox :false,
                    isSimultaneousRing :false,
                    geoRoute: {
                        routeBy:"",
                        geoList:"",
                        radius:""
                    },
                    scheduleRoute: {
                        timezone:'',
                        default_ringto:'',
                        activate_voicemail:false,
                        recordCall: false,
                        playDisclaimer: 'before'
                    },
                    back_press:"",
                    whisperPrompt : false,
                    TTSWhisperSelected: true,
                    whisperTTSText: '',
                    hasValidWhisperURL: '',
                    whisperURL:''
                }];
                $scope.scheduleInfo = [{scheduleId:0,days:[],fromTime:'',toTime:'',ringTo:'',isAddOverflow:false,overflowNumbers:[{overflowNumber:'',rings: $scope.defaultsRings,overflow_order: 1}],simultaneousRings :false,activateVoicemail:false}]
                //alert(passedPnumber.id);
                //$scope.selectedCallFlow = passedPnumber;
                $scope.showCallFlow = true;
                $scope.showMultiPass = false;
                $scope.numList = [];
                $scope.bCreateAnother = false;

                $scope.qCallFlowList = [{
                    name: 'Forward to phone number',
                    id: 1,
                    value: 'qSimple',
                    action: 'qSimple',
                    whisper: false,
                    webhook: false,
                    ringtonum: '',
                    voicepromptText: '',
                    voicepromptURL: '',
                    voicepromptId: '',
                    voiceprompt: ''
                }, {
                    name: 'Geo Route',
                    id: 2,
                    value: 'qGeo',
                    action: 'qGeo',
                    whisper: false,
                    webhook: false,
                    ringtonum: '',
                    voicepromptText: '',
                    voicepromptURL: '',
                    voicepromptId: '',
                    voiceprompt: ''
                }, {
                    name: 'Hang up',
                    id: 8,
                    value: 'qHangup',
                    action: 'qHangup',
                    whisper: false,
                    webhook: false,
                    ringtonum: '',
                    voicepromptText: '',
                    voicepromptURL: '',
                    voicepromptId: '',
                    voiceprompt: ''
                }];
                /*call set caller id webservice*/
                CampaignWebService.getSetCallerId().then(function(result){
                    if (result.data.result != 'error') {
                        for(var i=0;i<result.data.json.length;i++){
                            if($scope.selectedCallFlow.num !== undefined && result.data.json[i].value == $scope.selectedCallFlow.num.number){
                                result.data.json.splice(i,1);
                            }
                        }
                        $scope.setCallerIdList = result.data.json;
                        // $scope.setCallerIdList.push({key:"Caller Number",value:"Caller_Number"})
                        // $scope.setCallerIdList.push({key:"(123) 4567 890",value:"1234567890"})
                    }
                })
                
                CampaignWebService.getChannels().then(function(result) {
                    if (result.data.result != 'error') {
                        $scope.channels = result.data.json; //[];
                        angular.forEach($scope.channels, function(value) {
                            value.category = (value.category).trim();
                            value.sub_category = value.category + ':' + value.sub_category;
                            if (passedPnumber) {
                                if (passedPnumber.channelId == value.channel_id) {
                                    $scope.selectedCallFlow.channel = value;
                                }
                            } 
                        });
                    }
                });
                var provisionedrouteId;
                if (passedPnumber) {
                    $scope.provisionedrouteId = passedPnumber.id;
                    provisionedrouteId = passedPnumber.id;
                    if ($scope.addCallAction.provisioned_route_id) {
                        if (passedPnumber.id !== $scope.addCallAction.provisioned_route_id) {
                            $scope.showCallActions = false;
                        }
                    }
                }

                DNIWebService.getDniSettings($rootScope.currentOUId)
                .then(function (result) {
                    if(result.data.json[0].dni_org_unit.length > 0) {
                    $.each(result.data.json[0].dni_settings, function (key, val) {
                        var temp_referrer = val.referrer;
                        if (val.referrer_type) temp_referrer += "|" + val.referrer_type;
                        var num = (val.number) ? "(" + val.number.slice(0, 3) + ") " + val.number.slice(3, 6) + "-" + val.number.slice(6, 10) : '';
                       /* if(val.dni_type !== "url")
                            $scope.referrerClassCombinations.push({
                                "destination_url" : val.destination_url,
                                "referrer" : val.referrer + "|" + val.referrer_type,
                                "element" : val.dni_element
                            })*/
                        //check to see if there are any custom referrers and add them to the pick list.
                        var found = $filter('filter')($scope.dniReferrer, temp_referrer, true);
                        if (found.length < 1) $scope.dniReferrer.push({value: temp_referrer, text: val.referrer});
                    });

                    } else {
                            var dniOrgUnitData = {dniOrgUnit: {org_unit_id: $rootScope.currentOUId}};
                             DNIWebService.createDniOUData(dniOrgUnitData).then(function (result) {});
                        }
                });

                if (passedPnumber) {
                    $scope.isAdvancedTrackingNumbersOpen = false;
                    DNIWebService.getDniSettings($rootScope.currentOUId, provisionedrouteId).then(function(result) {

                        if (result.data.json[0].dni_settings.length > 0) {
                            if ($scope.dniComponent === true){
                                $scope.selectedCallFlow.showDNI = true
                            }else{
                                $scope.selectedCallFlow.showDNI = false
                            }
                            $.each(result.data.json[0].dni_settings, function(key, val) {
                                var temp_referrer = val.referrer;
                                if (val.referrer_type) temp_referrer += "|" + val.referrer_type;

                                $scope.selectedCallFlow.dni_setting_id = val.dni_setting_id;
                                $scope.selectedCallFlow.destination_url = val.destination_url;
                                $scope.selectedCallFlow.referrer = temp_referrer;
                                $scope.selectedCallFlow.dniType = val.dni_type;
                                $scope.selectedCallFlow.dni_element = val.dni_element;
                                $scope.selectedCallFlow.dni_ttl = val.keep_alive_mins;

                            });
                        }
                    });
                    //populate custom params if they exist
                }
                if (!passedPnumber) {
                    $scope.isAddTrackingNumbersOpen = true;
                    $scope.isAdvancedTrackingNumbersOpen = false;//true
                    $scope.basicRoute = 'newRoute';
                    $scope.isNew = true;
                    $scope.scheduleInfo = [{scheduleId:0,days:[],fromTime:'',toTime:'',ringTo:'',isAddOverflow:false,overflowNumbers:[{overflowNumber:'',rings: $scope.defaultsRings,overflow_order: 1}],simultaneousRings :false,activateVoicemail:false}]
                    $scope.selectedCallFlow = {
                        rinterval: 72,
                        callflowOption: "singleNumber"
                    }; // ,routetype:'action0'
                    $scope.selectedCallFlow.recordCall = true;


                    $scope.selectedCallFlow.spamActive = false;
                    $scope.selectedCallFlow.smsActive = false;
                    $scope.selectedCallFlow.smsFeature = false;
                    $scope.selectedCallFlow.oldSmsActive = false;

                    if($scope.showSpambutton)
                        $scope.selectedCallFlow.spamActive = true;

                    $scope.selectedCallFlow.showDNI = true;
                    $scope.selectedCallFlow.showWebhook = true;
                    $scope.selectedCallFlow.playDisclaimer = "before";
                    $scope.TTSSelected = true;
                    $scope.TTSWhisperSelected = true;
                    $scope.hasValidVoiceURL = true;
                    $scope.hasValidWhisperURL = true;
                    $scope.selectedCallFlow.address = null;
                    $scope.selectedCallFlow.voicePromptText = 'hh';
                    $scope.selectedCallFlow.whisperText = 'hh';
                    $scope.addresses = [];
                    $scope.selectedCallFlow.geoRouteId = null;
                    $scope.cfactive = true;
                    $scope.selectedCallFlow.customSourceList_1 = '';
                    $scope.selectedCallFlow.customSourceList_2 = '';
                    $scope.selectedCallFlow.customSourceList_3 = '';
                    $scope.selectedCallFlow.customSourceList_4 = '';
                    $scope.selectedCallFlow.customSourceList_5 = '';
                    $scope.locObj = "";
                    if (!$scope.campActive) {
                        $scope.cfactive = false;
                    }
                    $scope.callActions = [];
                    $scope.ivrActions = [];
                    $scope.ivrActions = [{
                        id: 1,
                        action_order: 1,
                        voicepromptText : "",
                        voicepromptFileName : "",
                        voicepromptURL : "",
                        voicepromptId : "",
                        TTSIVRSelected : true,
                        hasValidTTSVoiceURL : "",
                        voicepromptTTSText : "",
                        action: 'simple',
                        message_type: message_type,
                        message:message,
                        ringtonum: "",
                        recordCall: false,
                        activateVoiceMail: false,
                        playDisclaimer: 'before',
                        overflowNumbers :[{overflowNumber:'', rings: $scope.selectedCallFlow.Overflow === undefined ?3:$scope.selectedCallFlow.Overflow, overflow_order: 1}],
                        openOverflowBox :false,
                        isSimultaneousRing :false,
                        geoRoute: {
                            routeBy:"",
                            geoList:"",
                            radius:""
                        },
                        scheduleRoute: {
                            timezone:'',
                            default_ringto:'',
                            activate_voicemail:false,
                            recordCall: false,
                            playDisclaimer: 'before'
                        },
                        back_press:"",
                        whisperPrompt : false,
                        TTSWhisperSelected: true,
                        whisperTTSText: '',
                        hasValidWhisperURL: '',
                        whisperURL:''
                    }];

                    CampaignWebService.getDefaultData($scope.currentOUId).then(function(result) {
                        $scope.defaultSetting = result;
                        defaultCfData = result.data.json.callFlowData;
                        $scope.defaultData = defaultCfData.callFlowData[0];
                        setDefaultData(result, false);
                    });
                    
                } else {
                    $scope.numList.push({
                        "id": passedPnumber.id,
                        "number": passedPnumber.phone,
                        "pretty_number": passedPnumber.phonep,
                        "numberid": passedPnumber.phoneid,
                        "vendor_id": passedPnumber.vendor_id,
                    });
                    $scope.oldQuantity = passedPnumber.quantity;                    
                    $scope.isNew = false;
                    $scope.selectedCallFlow = passedPnumber;
                    $scope.selectedCallFlow.callflowlabel = "For "+passedPnumber.name;
                    $scope.selectedCallFlow.num = $scope.numList[0];
                    $scope.selectedCallFlow.numberPool = passedPnumber.quantity;
                    $scope.selectedCallFlow.rate_center = passedPnumber.rate_center;
                    $scope.pool_state = passedPnumber.state;
                    $scope.rate_center = passedPnumber.rate_center;
                    $scope.pool_id = passedPnumber.pooId;
                    
                    if (passedPnumber.phone) {
                        $scope.selectedCallFlow.callflowOption = "singleNumber" || "reservedNumber";
                    } else {
                        $scope.selectedCallFlow.callflowOption = "numberPool";
                    }
                    $scope.selectedCallFlow.showWebhook = true;
                    if (passedPnumber.webhook_id) {
                        $scope.selectedCallFlow.webhook = passedPnumber.webhook_id;
                        if($scope.selectedCallFlow.webhook){
                             $scope.selectedCallFlow.preCallWebhook = true;
                        }
                    }
                    $scope.selectedCallFlowEdit = true;
                    if (passedPnumber.status2 == "Active") {
                        $scope.cfactive = true;
                    } else {
                        $scope.cfactive = false;
                    }
                    //need to get the callflow data of the provisionedroute
                    CampaignWebService.getprovRouteCallFlow(passedPnumber.id).then(function(result) {
                        var j;
                        if (result.data.status != 'error') {
                            if (result.data.json.call_flow.spam_active !== undefined){
                                $scope.selectedCallFlow.spamActive = result.data.json.call_flow.spam_active;
                            }

                            if (result.data.json.call_flow.sms_enabled !== undefined){
                                $scope.selectedCallFlow.smsActive = result.data.json.call_flow.sms_enabled;
                                $scope.selectedCallFlow.oldSmsActive = result.data.json.call_flow.sms_enabled;
                            }

                            if (result.data.json.call_flow.sms_feature !== undefined){
                                $scope.selectedCallFlow.smsFeature = result.data.json.call_flow.sms_feature;
                            }

                            $scope.postCallIVR = result.data.json.call_flow.post_call_ivr_enabled;
                            $scope.selectedCallFlow.customSourceList_1 = '';
                            $scope.selectedCallFlow.customSourceList_2 = '';
                            $scope.selectedCallFlow.customSourceList_3 = '';
                            $scope.selectedCallFlow.customSourceList_4 = '';
                            $scope.selectedCallFlow.customSourceList_5 = '';
                            $scope.selectedCallFlow.routetype =  result.data.json.call_flow.routable_type;
                            $scope.callFlowId = result.data.json.call_flow.id;
                            $scope.selectedCallFlow.ringtoNum = result.data.json.call_flow.default_ringto;
                            $scope.selectedCallFlow.org_unit_id = result.data.json.call_flow.org_unit_id;
                            
                            $scope.selectedCallFlow.activateVoicemail =  $scope.selectedCallFlow.routetype == 'VoicemailRoute' ? false : $scope.voicemailComponent == false ? false : result.data.json.call_flow.vm_enabled;
                            
                            if(result.data.json.call_flow.voicemail_rings){
                                $scope.selectedCallFlow.voicemail_rings_count = result.data.json.call_flow.voicemail_rings;
                            }else{
                                $scope.selectedCallFlow.voicemail_rings_count = 3;
                            }
                            // whisper section
                            if($scope.userAccess.postcallivr !== undefined && $scope.userAccess.postcallivr > 4 && $scope.selectedCallFlow.ringtoNum !== 'hangup'){
                                if (result.data.json.post_call_ivr && result.data.json.post_call_ivr.length > 0) {
                                    var postCallIVRData = result.data.json.post_call_ivr;
                                    $scope.selectedCallFlow.post_call_ivr_id = postCallIVRData[0].post_call_ivr_id;
    
                                    $scope.postIVRType = _.find($scope.postIVRTypes, function(type){ return type.name === postCallIVRData[0].post_call_ivr_option_name}).value;
                                     for (i = 0; i < postCallIVRData.length; i++) {
                                        switch (postCallIVRData[i].voice_prompt) {
                                            case 'record_call_outcome':
                                                var message = postCallIVRData[i].voice_prompt_value;
                                                var substring = message.substring(0, 7);
    
                                                if (substring == "file://") {
                                                    var selectedprompt = ''
                                                     message = message.substring(message.lastIndexOf("/") + 1, message.length)
                                                    if($scope.prompts){
                                                        for (var j = 0; j < $scope.prompts.length; j++) {
                                                            var filename = $scope.prompts[j].filename + ".wav";
                                                            if(filename == message)
                                                                selectedprompt = $scope.prompts[j];
                                                        }
                                                    }
    
                                                    $scope.TTSoutComePromtSelected = false;
                                                    $scope.selectedCallFlow.outComePromtText = selectedprompt.name;
                                                    $scope.selectedCallFlow.outComePromtURL = selectedprompt.url;
                                                    $scope.selectedCallFlow.outComePromtFileName = selectedprompt.filename;
    
                                                    $scope.hasValidoutComePromtURL = true;
                                                    $scope.selectedCallFlow.outComePromtId = selectedprompt.id;
                                                } else {
                                                    $scope.TTSoutComePromtSelected = true;
                                                    $scope.selectedCallFlow.outComePromtTTSText = message.substring(6, message.length);
                                                }
                                                break;
                                            case 'record_a_sale':
                                                var message = postCallIVRData[i].voice_prompt_value;
                                                var substring = message.substring(0, 7);
    
                                                if (substring == "file://") {
                                                    var selectedprompt = ''
                                                    message = message.substring(message.lastIndexOf("/") + 1, message.length)
                                                    if($scope.prompts){
                                                        for (var j = 0; j < $scope.prompts.length; j++) {
                                                            var filename = $scope.prompts[j].filename + ".wav";
                                                            if(filename == message)
                                                                selectedprompt = $scope.prompts[j];
                                                        }
                                                    }
                                                    $scope.TTSsalesAmountVoiceSelected = false;
                                                    $scope.selectedCallFlow.salesAmountVoicePromptText = selectedprompt.name;
                                                    $scope.selectedCallFlow.salesAmountVoiceURL = selectedprompt.url;
                                                    $scope.selectedCallFlow.salesAmountVoiceFileName = selectedprompt.filename;
    
                                                    $scope.hasValidsalesAmountVoiceURL = true;
                                                    $scope.selectedCallFlow.salesAmountVoiceId = selectedprompt.id;
                                                } else {
                                                    $scope.TTSsalesAmountVoiceSelected = true;
                                                    $scope.selectedCallFlow.salesAmountVoiceTTSText = message.substring(6, message.length);
                                                }
                                                break;  
                                            case 'record_agent_id':
                                                var message = postCallIVRData[i].voice_prompt_value;
                                                var substring = message.substring(0, 7);
                                                $scope.selectedCallFlow.lengthOfAgentId = postCallIVRData[i].number_of_digits
    
                                                if (substring == "file://") {
                                                    var selectedprompt = ''
                                                    message = message.substring(message.lastIndexOf("/") + 1, message.length)
                                                    if($scope.prompts){
                                                        for (var j = 0; j < $scope.prompts.length; j++) {
                                                            var filename = $scope.prompts[j].filename + ".wav";
                                                            if(filename == message)
                                                                selectedprompt = $scope.prompts[j];
                                                        }
                                                    }
    
                                                    $scope.TTSAgentIDVoicePromptSelected = false;
                                                    $scope.selectedCallFlow.AgentIDVoicePromptText = selectedprompt.name;
                                                    $scope.selectedCallFlow.AgentIDVoicePromptURL = selectedprompt.url;
                                                    $scope.selectedCallFlow.AgentIDVoicePromptFileName = selectedprompt.filename;
    
                                                    $scope.hasValidAgentIDVoicePromptURL = true;
                                                    $scope.selectedCallFlow.AgentIDVoicePromptId = selectedprompt.id;
                                                } else {
                                                    $scope.TTSAgentIDVoicePromptSelected = true;
                                                    $scope.selectedCallFlow.AgentIDVoicePromptTTSText = message.substring(6, message.length);
                                                }
                                                break; 
    
                                            }
                                    }    
    
                                }
                            }
                            else{
                                $scope.postCallIVR = false; 
                            }
                           
                            if(result.data.json.call_flow.routable_type === 'SimpleRoute'){
                                if(result.data.json.call_flow.dnis_as_cid)
                                    $scope.selectedCallFlow.dnis_as_cid = "tracking_number";
                                else
                                    $scope.selectedCallFlow.dnis_as_cid = "caller_id";
                            }
                            else{
                                $scope.selectedCallFlow.dnis_as_cid = "caller_id"; 
                            }
                            if (result.data.json.hunt_options && result.data.json.hunt_options.length > 0 && result.data.json.hunt_options[0].target_did) {
                                $scope.openOverflowBox = true;
                                $scope.overflowNumbers = [];
                                if(result.data.json.hunt_options[0].hunt_type == 'Simultaneous Ring' || result.data.json.hunt_options[0].hunt_type.toLowerCase() =="simultaneous"){
                                        $scope.isSimultaneousRing = true;
                                    }
                                    else{
                                        $scope.isSimultaneousRing = false;
                                    }
                                for (i = 0; i < result.data.json.hunt_options.length; i++) {
                                    $scope.overflowNumbers.push({
                                        overflowNumber: result.data.json.hunt_options[i].target_did,
                                        rings: result.data.json.hunt_options[i].ring_delay / 6,
                                        overflow_order : result.data.json.hunt_options[i].overflow_order
                                    });
                                    $scope.hunt_option =result.data.json.hunt_options[i].hunt_route_id;
                                }    
                                $scope.currentOverFlowNumber = $scope.overflowNumbers[$scope.overflowNumbers.length - 1];
                            }
                            else {
                                $scope.overflowNumbers = [{overflowNumber:'', rings: 3, overflow_order: 1}];
                            }

                            if (result.data.json.custom_sources && result.data.json.custom_sources !== undefined) {
                                //  $scope.selectedCallFlow.customSourceList = result.data.json.custom_sources;
                                for (i = 0; i < result.data.json.custom_sources.length; i++) {
                                    if (result.data.json.custom_sources[i].custom_source_type === 'CS1') {
                                        $scope.selectedCallFlow.customSourceList_1 = result.data.json.custom_sources[i].custom_source_id;
                                    } else if (result.data.json.custom_sources[i].custom_source_type === 'CS2') {
                                        $scope.selectedCallFlow.customSourceList_2 = result.data.json.custom_sources[i].custom_source_id;
                                    } else if (result.data.json.custom_sources[i].custom_source_type === 'CS3') {
                                        $scope.selectedCallFlow.customSourceList_3 = result.data.json.custom_sources[i].custom_source_id;
                                    } else if (result.data.json.custom_sources[i].custom_source_type === 'CS4') {
                                        $scope.selectedCallFlow.customSourceList_4 = result.data.json.custom_sources[i].custom_source_id;
                                    } else if (result.data.json.custom_sources[i].custom_source_type === 'CS5') {
                                        $scope.selectedCallFlow.customSourceList_5 = result.data.json.custom_sources[i].custom_source_id;
                                    }
                                }
                            }

                        }
                        if (result.data.json.call_flow.webhook_id != undefined && result.data.json.call_flow.webhook_id != '') {
                            $scope.selectedCallFlow.showWebhook = true;
                            $scope.selectedCallFlow.webhook = result.data.json.call_flow.webhook_id;
                        }

                        if (result.data.json.call_flow.whisper_enabled && result.data.json.call_flow.whisper_message !== null) {
                            $scope.selectedCallFlow.whisperPrompt1 = true;
                            var message = result.data.json.call_flow.whisper_message.substring(result.data.json.call_flow.whisper_message.lastIndexOf("/") + 1, result.data.json.call_flow.whisper_message.length);
                            if (result.data.json.call_flow.whisper_type == 'file') {
                                if($scope.whispers && $scope.whispers !==undefined && $scope.whispers !==null){
                                    for (j = 0; j < $scope.whispers.length; j++) {
                                        var filename = $scope.whispers[j].filename;
                                        if(message == filename){
                                            $scope.selectedCallFlow.whisperText = $scope.whispers[j].name;
                                            $scope.selectedCallFlow.whisperURL = $scope.whispers[j].url;
                                            $scope.selectedCallFlow.whisperId = $scope.whispers[j].id;
                                            $scope.selectedCallFlow.whisperFileName = filename;
                                            $scope.TTSWhisperSelected = false;
                                            $scope.hasValidWhisperURL = true;
                                            $scope.selectedCallFlow.whisperTTSText = '';
                                        }
                                    }
                                }
                            } else {
                                $scope.selectedCallFlow.whisperTTSText = result.data.json.call_flow.whisper_message;
                                $scope.TTSWhisperSelected = true;
                                $scope.hasValidWhisperURL = true;
                                $scope.selectedCallFlow.whisperText = 'hh';
                                //$scope.whispertextChanged = true;
                            }
                        } else
                            $scope.selectedCallFlow.whisperPrompt1 = false;
                        // voice prompt section
                        if (result.data.json.call_flow.message_enabled && result.data.json.call_flow.message !== null) {
                            var message = result.data.json.call_flow.message.substring(result.data.json.call_flow.message.lastIndexOf("/") + 1, result.data.json.call_flow.message.length);
                            $scope.selectedCallFlow.voicePrompt1 = true;
                            if (result.data.json.call_flow.message_type == 'file') {
                                if($scope.prompts && $scope.prompts !==undefined && $scope.prompts !==null){
                                    for (j = 0; j < $scope.prompts.length; j++) {
                                        var filename = $scope.prompts[j].filename;
                                        if(message == filename){
                                            $scope.selectedCallFlow.voicePromptText = $scope.prompts[j].name;
                                            $scope.selectedCallFlow.voiceURL = $scope.prompts[j].url;
                                            $scope.selectedCallFlow.voicePromptId = $scope.prompts[j].id;
                                            $scope.TTSSelected = false;
                                            $scope.hasValidVoiceURL = true;
                                            $scope.selectedCallFlow.voicePromptFileName = $scope.prompts[j].filename;
                                            $scope.selectedCallFlow.voicePromptTTSText = '';
    
                                            $scope.oldVoicePromptFileName = $scope.selectedCallFlow.voicePromptFileName;
                                            $scope.oldVoicePromptTTSText = $scope.selectedCallFlow.voicePromptTTSText;
                                            $scope.oldVoicePrompt1 = $scope.selectedCallFlow.voicePrompt1;
                                            $scope.oldHasValidVoiceURL = $scope.hasValidVoiceURL;
                                            $scope.oldVoicePromptText = $scope.selectedCallFlow.voicePromptText;
                                        }
                                    }
                                }
                            } else {
                                $scope.selectedCallFlow.voicePromptTTSText = result.data.json.call_flow.message;
                                $scope.TTSSelected = true;
                                $scope.hasValidVoiceURL = true;
                                $scope.selectedCallFlow.voicePromptText = 'hh';
                            }

                        } else {
                            $scope.selectedCallFlow.voicePrompt1 = false;
                        }
                           
                            
                        // Voicemail
                        var voicemailMessage = result.data.json.call_flow.vm_message;
                        var voicemailType   =  result.data.json.call_flow.vm_type;
                        if ($scope.voicemailComponent === true){
                            
                            var voicemail_message_url = '';
                            if (voicemailType === 'file' && $scope.voicemails) {
                                var selectedprompt = ''
                                for (var j = 0; j < $scope.voicemails.length; j++) {
                                    var filename = $scope.voicemails[j].filename;
                                    if(filename == voicemailMessage){
                                        selectedprompt        = $scope.voicemails[j]
                                    }
                                }


                                $scope.TTSvoicemailGreetingsSelected = false;
                                if(selectedprompt){
                                   // $scope.hasValidvoicemailGreetingsURL = true;
                                    $scope.selectedCallFlow.voicemailGreetingsText = selectedprompt.name;
                                    $scope.selectedCallFlow.VoiceMainGreetingURL = selectedprompt.url;
                                    $scope.selectedCallFlow.voicemailGreetingsFileName = selectedprompt.filename;                                  
                                }else{
                                    $scope.selectedCallFlow.voicemailGreetingsText = "";
                                    $scope.selectedCallFlow.VoiceMainGreetingURL = "";
                                }
                                $scope.selectedCallFlow.voicemailGreetingsTTSText = '';
                                $scope.hasValidvoicemailGreetingsURL = true;
                            }else if(voicemailMessage !== null && voicemailMessage !== "undefined"){
                                $scope.TTSvoicemailGreetingsSelected = true;
                                $scope.selectedCallFlow.voicemailGreetingsTTSText =voicemailMessage;
                                
                            }else{
                                $scope.TTSvoicemailGreetingsSelected = true;
                                //$scope.selectedCallFlow.activateVoicemail = false;
                                $scope.selectedCallFlow.voicemailGreetingsText = '';
                            }
                        }else{
                            $scope.selectedCallFlow.activateVoicemail = false ;

                        }

                        if (result.data.json.call_flow.record_call == 1 || result.data.json.call_flow.record_call === true) {
                            $scope.selectedCallFlow.playDisclaimer = result.data.json.call_flow.play_disclaimer;
                            $scope.selectedCallFlow.recordCall = true;
                        } else{
                            $scope.selectedCallFlow.recordCall = false;
                            $scope.selectedCallFlow.playDisclaimer = 'before';
                        }
                        $scope.basicRoute = result.data.json.call_flow.routable_type;
                        switch (result.data.json.call_flow.routable_type) {
                            case 'SimpleRoute':
                                if (result.data.json.call_flow.default_ringto === "hangup"){
                                    $scope.selectedCallFlow.routetype = 'hangup';
                                    $scope.selectedCallFlow.overflowNumbers = '';
                                }
                                else{
                                    if(result.data.json.call_flow.vm_enabled === true && (result.data.json.call_flow.record_call == 1 || result.data.json.call_flow.record_call == true )){
                                        $scope.disableRC = true;
                                        $scope.selectedCallFlow.recordCall = true;
                                    }else{
                                        if(result.data.json.call_flow.record_call == 1 || result.data.json.call_flow.record_call == true ){
                                            $scope.selectedCallFlow.recordCall = true;   
                                            $scope.disableRC = false;
                                        }else{
                                            $scope.selectedCallFlow.recordCall = false;
                                            $scope.disableRC = false;
                                        }
                                        
                                        
                                    }
                                    $scope.selectedCallFlow.routetype = 'simple';
                                }
                                
                                    
                                break;
                            case 'GeoRoute':
                                $scope.selectedCallFlow.routetype = 'geo';
                                $scope.selectedCallFlow.routeBy = result.data.json.geo_route[0].strategy;
                                $scope.selectedCallFlow.geoRouteId = result.data.json.geo_route[0].id;
                                $scope.selectedCallFlow.geoList = result.data.json.geo_route[0].location_id;
                                $scope.selectedCallFlow.ringtoNum = result.data.json.geo_route[0].default_ringto;
                                if($scope.selectedCallFlow.geoList && $scope.selectedCallFlow.geoList !== undefined && $scope.selectedCallFlow.geoList !== "" && $scope.selectedCallFlow.geoList !== null){
                                    $scope.georoutelocations.forEach(function(loc) {
                                        if(loc.id === parseInt($scope.selectedCallFlow.geoList)){
                                            $scope.locObj=loc;
                                        }
                                    });
                                }else{
                                    $scope.locObj={id:'',name:'',routes:[]};
                                }

                                if (result.data.json.geo_route[0].strategy === 'Npa' || result.data.json.geo_route[0].strategy === 'Zipcode'){
                                    $scope.selectedCallFlow.radius = result.data.json.geo_route[0].radius.toString();
                                }
                                    
                                if(result.data.json.call_flow.vm_enabled === true && (result.data.json.call_flow.record_call == 1 || result.data.json.call_flow.record_call == true )){
                                    $scope.disableRC = true;
                                    $scope.selectedCallFlow.recordCall = true;
                                }else{
                                    if(result.data.json.call_flow.record_call == 1 || result.data.json.call_flow.record_call == true ){
                                        $scope.selectedCallFlow.recordCall = true;   
                                        $scope.disableRC = false;
                                    }else{
                                        $scope.selectedCallFlow.recordCall = false;
                                        $scope.disableRC = false;
                                    }
                                }
                                if(result.data.json.geo_route[0].strategy !== 'claimedState' && result.data.json.geo_route[0].strategy !== 'Npa' && result.data.json.geo_route[0].message_enabled && result.data.json.geo_route[0].message && result.data.json.geo_route[0].message.length > 0){
                                    $scope.selectedCallFlow.playGeoLocationPrompt = true;
                                    var m_type = 'file';
                                    if(result.data.json.geo_route[0].message && result.data.json.geo_route[0].message.substring(0, 4) != 'file'){
                                        m_type = 'text';
                                    }
                                    prompt_message = result.data.json.geo_route[0].message.substring(result.data.json.geo_route[0].message.lastIndexOf("/") + 1, result.data.json.geo_route[0].message.length)
                                    if(m_type == 'file'){                                    
                                        if($scope.prompts){
                                            for (var j = 0; j < $scope.prompts.length; j++) {
                                                var filename = $scope.prompts[j].filename + '.wav';
                                                if(filename == prompt_message){
                                                    selectedprompt = $scope.prompts[j];
                                                    $scope.selectedCallFlow.geoLocationPromptURL = selectedprompt.url;
                                                    $scope.selectedCallFlow.geoLocationPromptText = selectedprompt.name;
                                                    $scope.selectedCallFlow.geoLocationPromptName = selectedprompt.filename;
                                                    $scope.TTGeoloLocationPromptSelected = false;
                                                    $scope.hasValidGeoloLocationPromptURL = true;
                                                }
                                            }
                                        }else{
                                            $scope.TTGeoloLocationPromptSelected = true;
                                            $scope.selectedCallFlow.geoLocationPromptTTSText = prompt_message;
                                            $scope.hasValidTTSVoiceURL = false;
                                        }
                                    }else{
                                        $scope.TTGeoloLocationPromptSelected = true;
                                        $scope.selectedCallFlow.geoLocationPromptTTSText = prompt_message;
                                        $scope.hasValidTTSVoiceURL = false;
                                    }
                                }else{
                                    $scope.selectedCallFlow.playGeoLocationPrompt = false;
                                    $scope.selectedCallFlow.geoLocationPromptText = '';
                                    $scope.selectedCallFlow.geoLocationPromptTTSText = '';
                                }

                                break;
                            case 'PercentageBasedRoute':
                                $scope.percentInfo = [];
                                $scope.selectedCallFlow.routetype = 'PercentageBasedRoute';
                                var percentageCount = 0;
                                var i;
                                $scope.percentInfo = _.sortBy(result.data.json.ringto_percentage,'route_order');
                                _.map($scope.percentInfo, function(routePercent){
                                    if(routePercent.overflowNumbers.length < 1){
                                        routePercent.overflowNumbers.push({
                                            overflowNumber :'',
                                            rings:3,
                                            overflow_order: 1
                                        });
                                    }
                                    routePercent.activateVoicemail = $scope.voicemailComponent == false ? false : routePercent.activateVoicemail;
                                    
                                })
                                break;

                            case 'IvrRoute2':
                            var prompt_message = '';
                            prompt_message = result.data.json.call_flow.message;
                                if(result.data.json.call_flow.message_type == 'file'){                                    
                                    prompt_message = prompt_message.substring(prompt_message.lastIndexOf("/") + 1, prompt_message.length)
                                        if($scope.prompts){
                                            for (var j = 0; j < $scope.prompts.length; j++) {
                                                var filename = $scope.prompts[j].filename;
                                                if(filename == prompt_message){
                                                    selectedprompt = $scope.prompts[j];
                                                    $scope.selectedCallFlow.voicepromptURL = selectedprompt.url;
                                                    $scope.voicepromptId = selectedprompt.id;
                                                    $scope.selectedCallFlow.voicepromptText = selectedprompt.name;
                                                    $scope.selectedCallFlow.voicepromptFileName = selectedprompt.filename;
                                                    $scope.TTSIVRSelected = false;
                                                    $scope.hasValidTTSVoiceURL = true;
                                                }
                                            }
                                        }
                                }else{
                                    $scope.TTSIVRSelected = true;
                                    prompt_message = prompt_message;
                                    $scope.selectedCallFlow.voicepromptTTSText = prompt_message;
                                    $scope.hasValidTTSVoiceURL = false;
                                }
                                var multiIvrs = [];
                                _.each(result.data.json.ivrs, function(ivr){
                                    var message_type = 'file';
                                    var whisper_type = 'file';
                                    var message = ivr.message;
                                    var whisper_message = ivr.whisper_message;
                                    var whisper_enabled = ivr.whisper_enabled;
                                    var isSimultaneousRing = false;
                                    var overflowNumbers = [];
                                    var openOverflowBox  = false;
                                    var selectedprompt = {};
                                    var TTSIVRSelected = false;
                                    var voicepromptURL = '';
                                    var voicepromptTTSText = '';
                                    var voicepromptId ='';
                                    var voicepromptText = '';
                                    var hasValidTTSVoiceURL = true;
                                    var voicepromptFileName = '';
                                    var whisperPrompt = '';
                                    var whisperText ='';
                                    var whisperTTSText= '';
                                    var whisperURL ='';
                                    var whisperId ='';
                                    var whisperFileName ='';
                                    var TTSWhisperSelected = false;
                                    var hasValidWhisperURL = false;
                                    if(ivr.message && ivr.message.substring(0, 4) != 'file'){
                                        message_type = 'text';
                                    }
                                    if(ivr.whisper_message && ivr.whisper_message.substring(0, 4) != 'file'){
                                        whisper_type = 'text';
                                    }
                                    if (message_type == "file") {
                                        message = message.substring(message.lastIndexOf("/") + 1, message.length)
                                        if($scope.prompts){
                                            for (var j = 0; j < $scope.prompts.length; j++) {
                                                var filename = $scope.prompts[j].filename + ".wav";
                                                if(filename == message)
                                                    selectedprompt = $scope.prompts[j];
                                                    voicepromptURL = selectedprompt.url;
                                                    voicepromptId = selectedprompt.id;
                                                    voicepromptText = selectedprompt.name;
                                                    voicepromptFileName = selectedprompt.filename;
                                                    TTSIVRSelected = false;
                                                    hasValidTTSVoiceURL = true;
                                            }
                                        }
                                    } else {
                                        TTSIVRSelected = true;
                                        if(message == "blank://")
                                        {
                                            message = '';
                                        }else{
                                            message = message.substring(6, message.length);
                                        }
                                        voicepromptTTSText = message;
                                        hasValidTTSVoiceURL = false;
                                    }
                                    if(whisper_enabled){
                                        if (whisper_type == "file") {
                                            whisper_message = whisper_message.substring(whisper_message.lastIndexOf("/") + 1, whisper_message.length)
                                            if($scope.whispers){
                                                for (var j = 0; j < $scope.whispers.length; j++) {
                                                    var filename = $scope.whispers[j].filename + ".wav";
                                                    if(filename == whisper_message){
                                                        whisperPrompt = $scope.whispers[j];
                                                        whisperText = whisperPrompt.name;
                                                        whisperURL = whisperPrompt.url;
                                                        whisperId = whisperPrompt.id;
                                                        whisperFileName = whisperPrompt.filename
                                                        TTSWhisperSelected = false;
                                                        hasValidWhisperURL = true;
                                                    }
                                                }
                                            }
                                        } else {
                                            TTSWhisperSelected = true;
                                            whisper_message = whisper_message.substring(6, whisper_message.length);
                                            whisperTTSText = whisper_message;
                                            hasValidWhisperURL = false;
                                        }
                                    }else{
                                        TTSWhisperSelected = true;
                                    }
                                    _.each(ivr.overflowNumbers, function(num){
                                        var number ={
                                            "overflowNumber": num.target_did,
                                            "rings": num.ring_delay/6,
                                            "overflow_order": num.overflow_order
                                        }
                                        if(num.hunt_type === 'Simultaneous'){
                                            isSimultaneousRing = true;
                                        }
                                        overflowNumbers.push(number);
                                    });
                                    if(overflowNumbers.length){
                                        openOverflowBox = true;
                                    }else{
                                        overflowNumbers = [{overflowNumber:'', rings: 3, overflow_order: 1}];
                                    }
                                    if(ivr.target_did === 'hangup'){
                                        ivr.ivr_option_type = 'hangup';
                                    }
                                    if(ivr.location_id)
                                    {
                                        ivr.location_id = ivr.location_id.toString();
                                    }
                                    var scheduleRoute = {};
                                    if(ivr.scheduleRoute){
                                        scheduleRoute  = ivr.scheduleRoute;
                                    }
                                    $.each($scope.timeZones, function (key, val) {
                                        if (val.value == scheduleRoute.timezone) {
                                            scheduleRoute.timezone  = $scope.timeZones[key];
                                        }
                                    });
                                    var obj={
                                        'action': ivr.ivr_option_type,
                                        'action_order': ivr.action_order,
                                        'activateVoiceMail' : ivr.vm_enabled,
                                        'destination' : ivr.destination,
                                        'id' :ivr.id,
                                        'level' : ivr.level,
                                        'parentid' : ivr.parentid,
                                        'previousmenu' : ivr.back_press,
                                        'message':message,
                                        'keypress':ivr.key_press,
                                        'message_type' : message_type,
                                        'ringtoNum': ivr.ivr_option_type === 'schedule' ? '' : ivr.target_did,
                                        'overflowNumbers': overflowNumbers,
                                        'openOverflowBox': openOverflowBox,
                                        'isSimultaneousRing':isSimultaneousRing,
                                        'back_press':ivr.back_press,
                                        'voicepromptURL': voicepromptURL,
                                        'voicepromptId': voicepromptId,
                                        'voicepromptText': voicepromptText,
                                        'recordCall': ivr.record_enabled,
                                        'playDisclaimer': ivr.play_disclaimer === 'true' ? 'before' : ivr.play_disclaimer,
                                        'voicepromptTTSText': voicepromptTTSText,
                                        'TTSIVRSelected': TTSIVRSelected,
                                        'hasValidTTSVoiceURL': hasValidTTSVoiceURL,
                                        'voicepromptFileName': voicepromptFileName,
                                        'whisperPrompt' : whisper_enabled,
                                        'TTSWhisperSelected': TTSWhisperSelected,
                                        'whisperTTSText': whisperTTSText,
                                        'hasValidWhisperURL': hasValidWhisperURL,
                                        'whisperText' : whisperText,
                                        'whisperURL':whisperURL,
                                        'whisperFileName': whisperFileName,
                                        'geoRoute': {
                                            'routeBy': ivr.strategy,
                                            'radius': ivr.radius,
                                            'geoList': ivr.location_id
                                        },
                                        'scheduleRoute': {
                                            'recordCall': ivr.record_enabled,
                                            'playDisclaimer': ivr.play_disclaimer === 'true' ? 'before' : ivr.play_disclaimer,
                                            'timezone': scheduleRoute.timezone,
                                            'default_ringto':scheduleRoute.default_ringto,
                                            'scheduleInfo': scheduleRoute.schedules,
                                            'activate_voicemail': scheduleRoute.vm_enabled,
                                        },
                                        'disableRC' : (ivr.vm_enabled) ? true : false
                                    }
                                    multiIvrs.push(obj);
                                });

                                $scope.ivrActions = jsonIvrOption(multiIvrs);
                                $scope.ivrActions = _.sortBy($scope.ivrActions, 'action_order');
                                if(i<$scope.ivrActions.length && $scope.ivrActions[i].ivrActions && $scope.ivrActions[i].ivrActions.length > 0){
                                    for(var i=0;i<$scope.ivrActions.length;i++){
                                        $scope.ivrActions[i].ivrActions = _.sortBy($scope.ivrActions[i].ivrActions, 'action_order');
                                        if($scope.ivrActions[i].ivrActions && $scope.ivrActions[i].ivrActions.length > 0){
                                            for(var j=0; j< $scope.ivrActions[i].ivrActions.length;j++){
                                                $scope.ivrActions[i].ivrActions[j].ivrActions = _.sortBy($scope.ivrActions[i].ivrActions[j].ivrActions, 'action_order');
                                            }   
                                        }
                                        
                                    }
                                }
                                $scope.selectedCallFlow.routetype = 'ivr';
                                break;
                            case 'OutboundRoute':
                                if(result.data.json.outbound_Data[0].callerid === "default"){
                                    result.data.json.outbound_Data[0].callerid = "CALLER_NUMBER";
                                }
                                $scope.selectedCallFlow.routetype = 'outbound';
                                $scope.selectedCallFlow.pin = result.data.json.outbound_Data[0].pin;
                                $scope.selectedCallFlow.caller_id = result.data.json.outbound_Data[0].callerid;
                                $scope.selectedCallFlow.showDNI = false;
                                $scope.selectedCallFlow.whisperPrompt1 = false; 
                                $scope.selectedCallFlow.value = '';
                                $scope.selectedCallFlow.rinterval = '';
                                $scope.selectedCallFlow.voicemail_rings_count = null;
                                $scope.selectedCallFlow.voicemailGreetingsTTSText = '';
                                $scope.selectedCallFlow.destination_url = '';
                                $scope.selectedCallFlow.dniType = '';
                                $scope.selectedCallFlow.dni_element = '';
                                $scope.selectedCallFlow.referrer = '';
                                $scope.selectedCallFlow.overflowNumbers = '';
                                break;
                            case 'VoicemailRoute':
                                    $scope.selectedCallFlow.routetype = 'voicemail';
                                break;
                            case 'ScheduleRoute':
                                    $scope.selectedCallFlow.routetype = 'schedule';
                                    $.each($scope.timeZones, function (key, val) {
                                        if (val.value == result.data.json.schedule.timezone) {
                                            $scope.selectedCallFlow.timezone  = $scope.timeZones[key];
                                        }
                                    });
                                    
                                    $scope.showAddSchedule = false;
									$scope.scheduleInfo = result.data.json.schedule.schedule;
									$scope.selectedCallFlow.activateVoicemail = result.data.json.schedule.vm_enabled;
									$scope.selectedCallFlow.ringtoNum = result.data.json.schedule.default_ringto;
                                    $.each(result.data.json.schedule.schedule, function (key, val) {
                                       $scope.formationscheduleTimeSlots(key);
                                       val.activateVoicemail = $scope.voicemailComponent == false ? false : val.activateVoicemail;
                                       if(val.activateVoicemail == true){
                                            $scope.disableRC = true;    
                                        }
                                    });
                                    
                                    if($scope.selectedCallFlow.activateVoicemail){
                                        $scope.disableRC = true;
                                    }    
                                    if($scope.selectedCallFlow.ringtoNum == undefined || $scope.selectedCallFlow.ringtoNum == ""){
                                        $scope.activatevm = false;
                                    }else{
                                        $scope.activatevm = true;   
                                    }
                                    
                                    
                                break;
                        }
                        if(result.data.json.call_flow.routable_type !== 'PercentageBasedRoute'){
                            $scope.percentInfo = [{'percentage':'','ringToNum':'',overflowNumbers:[{overflowNumber:'',rings: $scope.selectedCallFlow.Overflow === undefined ? 3:$scope.selectedCallFlow.Overflow,overflow_order : 1}], isSimultaneousRing :false, openOverflowBox:false, route_order:1, activateVoicemail:false}];
                        }
                        $(".addTrackingNumbersProgressLoader").hide();
                        $("#addTrackingNumbersProgressLoader").css("opacity","1");
                    });
                    //$scope.callFlowChannels = $scope.channels[passedPnumber.channelId];
                }
                if($route.current.params.id){
                    setTimeout(function() {
                            $('html, body').animate({
                                scrollTop: ($("#callFlow").offset().top) - 50
                            }, 1000);
                        }, 100);
				}
				$scope.originalcfactive = $scope.cfactive;
            };

            $scope.enableSave = function(actionId) {
                if ($scope.addCallAction.actionOptions[actionId] === "tag_call") {
                    if (!$scope.callActionLoaded) {
                        $scope.addCallAction.callActionFormSubmitted[actionId] = false;
                    }
                    $scope.callActionLoaded = false;
                }
            };
        function jsonIvrOption(arr){
            var tree = [],
                mappedArr = {},
                arrElem,
                mappedElem;
        
            // First map the nodes of the array to an object -> create a hash table.
            for(var i = 0, len = arr.length; i < len; i++) {
                arrElem = arr[i];
                mappedArr[arrElem.id] = arrElem;
                mappedArr[arrElem.id]['ivrActions'] = [];
                    }
                    for (var id in mappedArr) {
                if (mappedArr.hasOwnProperty(id)) {
                mappedElem = mappedArr[id];
                // If the element is not at the root level, add it to its parent array of children.
                if (mappedElem.parentid) {
                    mappedArr[mappedElem['parentid']]['ivrActions'].push(mappedElem);
                }
                // If the element is at the root level, add it to first level elements array.
                else {
                    tree.push(mappedElem);
                }
                }
            }
            return tree;
        }
            $scope.loadCallActionsTemplate = function(result) {
                $scope.callActions = [];
                var string = "";
                var addedAction = {};
                var tag_id = 1;
                var operator = "";
                result.data.json.forEach(function(r) {
                    var string = "";
                    $scope.addCallAction.rule[r.action_order] = {};
                    $scope.ruleDropDown[r.action_order] = {};
                     if( $scope.addCallAction.route_type == 'IVR'){
                        var target = Object.assign({}, $scope.names.fields);
                        r.rules.forEach(function(rule, index) {
                            if (findKey( target, rule.data_field) == "duration") {
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
                            $scope.ruleDropDown[r.action_order][index].enum = $scope.names.enum[findKey( target, rule.data_field)];
                            $scope.ruleDropDown[r.action_order][index].join_type = ["AND", "OR"];
    
                            $scope.ruleDropDown[r.action_order][parseInt(index) + 1].join_type = ["AND", "OR"];
                            $scope.addCallAction.rule[r.action_order][index].fields = findKey(target, rule.data_field);
                            $scope.addCallAction.rule[r.action_order][index].operators = operator;
                            $scope.addCallAction.rule[r.action_order][index].enum = rule.comparator.replace(/%/g, '');
                            $scope.addCallAction.rule[r.action_order][index].join_type = rule.join_type;
                            $scope.addCallAction.rule[r.action_order][parseInt(index) + 1].join_type = "";
                        });
                     }else{
                        var target1 = Object.assign({}, $scope.names.fields);
                        delete target1['Ring to Phone Number'];
                        r.rules.forEach(function(rule, index) {
                            if (findKey(target1, rule.data_field) == "duration") {
                                console.log("rule.data_field",rule.data_field)
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
    
                            $scope.ruleDropDown[r.action_order][index].fields = Object.keys(target1);
                            $scope.ruleDropDown[r.action_order][index].operators = $scope.names.operators[findKey(target1, rule.data_field)];
                            $scope.ruleDropDown[r.action_order][index].enum = $scope.names.enum[findKey(target1, rule.data_field)];
                            $scope.ruleDropDown[r.action_order][index].join_type = ["AND", "OR"];
    
                            $scope.ruleDropDown[r.action_order][parseInt(index) + 1].join_type = ["AND", "OR"];
                            $scope.addCallAction.rule[r.action_order][index].fields = findKey(target1, rule.data_field);
                            
                            $scope.addCallAction.rule[r.action_order][index].operators = operator;
                            $scope.addCallAction.rule[r.action_order][index].enum = rule.comparator.replace(/%/g, '');
                            $scope.addCallAction.rule[r.action_order][index].join_type = rule.join_type;
                            $scope.addCallAction.rule[r.action_order][parseInt(index) + 1].join_type = "";
                        });
                     }
                    addedAction = {
                        id: (r.action_order)
                    };

                    switch (r.action) {
                        case 'email_alert':
                            var callActionsEmail = [];
                            var callActionTarget = r.action_target.split(",");
                            for (var i = 0; i < callActionTarget.length; i++) {
                                var tempHash = {
                                    id: tag_id,
                                    text: callActionTarget[i]
                                }
                                callActionsEmail.push(tempHash);

                                tag_id++;
                            }


                            var emailText = r.action_target.replace(/,/g, '');
                            emailText = emailText.replace(/ /g, '');
                            //$scope.addCallAction.email[1] = [];
                            $scope.addCallAction.remainingText[r.action_order] = (1024 - emailText.length) + " characters are remaining";
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

                    $scope.addCallAction.action_id[r.action_order] = r.action_id;
                    $scope.addCallAction.actionOptions[r.action_order] = r.action;
                    if (r.action === 'doubleclick' && $scope.dcSetting === false) {
                        $scope.addCallAction.actionOptions[r.action_order] = "";
                    }
                    $scope.addCallAction.callActionFormSubmitted[r.action_order] = true;

                    $scope.callActions.push(addedAction);
                });
                if($scope.addCallAction.route_type == 'IVR'){
                    if (isEmpty($scope.addCallAction.actionOptions)) {
                        $scope.addCallAction.actionOptions[1] = "action0";
                        $scope.addCallAction.callActionFormSubmitted[1] = false;
                        $scope.ruleDropDown[1] = {
                             0: {
                                 "fields": Object.keys($scope.names.fields)
                                 }
                        };
                         $scope.addCallAction.remainingText[0] = 1024 + " characters are remaining"
                         $scope.addCallAction.email[1] = []
                         $scope.addCallAction.rule[1] = {
                          0: {
                             "fields": "",
                             "operators": "",
                              "enum": "",
                             "join_type": ""
                            }
                        };
                    }
                }else{
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
                         $scope.addCallAction.remainingText[0] = 1024 + " characters are remaining"
                         $scope.addCallAction.email[1] = []
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
                    
            }


            CampaignWebService.getWebhooks().then(function(result) {
                if (result.data.err == null || result.data.err == '') {
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
                    if (result.data.json !== undefined && result.data.json.dc_enabled) {
                        console.log('Setting dcSetting to true');
                        $scope.doubleclick_id = result.data.json.doubleclick_id;
                        $scope.dcSetting = true;
                    }
                }
            });
            $scope.loadCallActions = function(passedPnumber) {
                $scope.addNewStep = true;
                $scope.hideCallAction = false;
                if ($scope.promptAudio !== undefined)
                    $scope.promptAudio.pause();
                if ($scope.ivrAudio !== undefined)
                    $scope.ivrAudio.pause();
                if ($scope.whisperAudio !== undefined)
                    $scope.whisperAudio.pause();
                if ($scope.greetingAudio !== undefined)
                    $scope.greetingAudio.pause();
                if ($scope.calloutcomeAudio !== undefined)
                    $scope.calloutcomeAudio.pause();
                if ($scope.agentidAudio !== undefined)
                    $scope.agentidAudio.pause();
                if ($scope.saleAudio !== undefined)
                    $scope.saleAudio.pause();
                if ($scope.leadAudio !== undefined)
                    $scope.leadAudio.pause();

              
                $scope.showCallActions = true;
                var string = "";
                var addedAction = {};
                var operator = "";
                $scope.callActions = [];
                $scope.callActions.push({
                    "id": 1
                });
                $scope.addCallAction = {};
                $scope.addCallAction.cfname = passedPnumber.name;
                $scope.addCallAction.route_type = passedPnumber.route_type;
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

                $scope.selectedCallFlow.customSourceList_1 = '';
                $scope.selectedCallFlow.customSourceList_2 = '';
                $scope.selectedCallFlow.customSourceList_3 = '';
                $scope.selectedCallFlow.customSourceList_4 = '';
                $scope.selectedCallFlow.customSourceList_5 = '';

                $scope.ruleDropDown = {};
                $scope.addCallAction.provisioned_route_id = passedPnumber.id;
                $scope.addCallAction.phoneid = passedPnumber.phoneid;
                $scope.callActionLoaded = false;
                // Load webhooks

                CampaignWebService.getcallActions(passedPnumber.id).then(function(result) {
                    $scope.callActionLoaded = true;
                    console.log("routee",passedPnumber.route_type);
                        if (result.data.result != 'error' && result.data.json.length && result.data.json[0].rules.length > 0) {
                            $scope.loadCallActionsTemplate(result,passedPnumber);
                        } else if (result.data.result != 'error' && result.data.json.length === 0) {
                            OrgUnitWebService.getCallActions($scope.currentOUId).then(function(result) {
                                if (result.data.result != 'error' && result.data.json.length && result.data.json[0].rules.length > 0) {
                                    $scope.loadCallActionsTemplate(result,passedPnumber);
                                }
                            })
                        }
                        if( $scope.addCallAction.route_type == 'IVR'){
                            if (isEmpty($scope.addCallAction.actionOptions)) {
                                $scope.addCallAction.actionOptions[1] = "action0";
                                $scope.addCallAction.callActionFormSubmitted[1] = false;
                                $scope.addCallAction.remainingText[1] = 1024 + " characters are remaining";
                                $scope.ruleDropDown[1] = {
                                    0: {
                                        "fields": Object.keys($scope.names.fields)
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
                        }else{
                            if (isEmpty($scope.addCallAction.actionOptions)) {
                                $scope.addCallAction.actionOptions[1] = "action0";
                                $scope.addCallAction.callActionFormSubmitted[1] = false;
                                $scope.addCallAction.remainingText[1] = 1024 + " characters are remaining";
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
                
                });
                 

                // $scope.addCallAction.remainingText[2] = 1024 + " characters are remaining"

                // var result = [{"phone_number":"8019964134","action_order":1, "action_id":1,"rules":[{"field_reference":"repeat_call","operator":"=","value":"false","join_type":""}],"action":"sms_alert","action_target":"magarwal516@gmail.com"},{"phone_number":"8019964134","action_order":2, "action_id":2,"rules":[{"field_reference":"data[:disposition]","operator":"=","value":"NO ANSWER","join_type":""}],"action":"email_alert"}]

                if ($scope.callFlowId) {
                    if (passedPnumber.id !== $scope.provisionedrouteId) {
                        $scope.showCallFlow = false;
                    }
                }
                setTimeout(function() {
                    $('html, body').animate({
                        scrollTop: ($("#callActions").offset().top) - 50
                    }, 1000);
                }, 100);
            };

            // function joinCallActions(argument) {

            // };
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

            $scope.loadMultiPass = function() {
                $scope.showMultiPass = true;
                $scope.showCallFlow = false;
                $scope.selectedCallFlow = [];
                $scope.selectedCallFlow.address = null;
                $scope.MultCallFlowList = [];
                // $scope.multiChannels = [];
                $timeout(function() {
                    $scope.numList = [];
                }, 1000);
                //$scope.numList =[];
                // MultCallFlowList
                $scope.selectedCallFlow.count = 0;
                // $scope.apply();

                CampaignWebService.getChannels().then(function(result) {
                    if (result.data.result != 'error') {
                        $scope.channels = result.data.json;
                        angular.forEach(result.data.json, function(value) {
                            value.category = (value.category).trim();
                            value.sub_category = value.category + ':' + value.sub_category;
                        });
                    }

                });

                setTimeout(function() {
                    $('html, body').animate({
                        scrollTop: ($("#multiPass").offset().top) - 50
                    }, 1000);
                }, 100);
            };
            $scope.cancel=function(){
                
               if($scope.selectedCallFlow.routetype === 'ivr'){
                     $scope.showConfirmationPopupOnCancel();  
               }else{
                      $scope.showCallFlow = false;
                 setTimeout(function() {
                    $('html, body').animate({
                        scrollTop: ($("#page-heading").offset().top) - 50
                    }, 1000);
                }, 100);
                 $route.reload();
                }
               
            };
            $scope.addNewCallAction = function(cactionId) {
              if($scope.addCallAction.route_type == 'IVR'){
                var addedAction;

                cactionId = parseInt(cactionId);
                addedAction = {
                    id: (cactionId + 1)
                };

                // if (!$scope.addCallAction.callActionFormSubmitted[cActionId]) {
                //     $scope.saveCallAction(cActionId, true);
                // }
                // else {

                $scope.callActions.push(addedAction);
                // $scope.addCallAction.email[1] = [];
                $scope.addCallAction.remainingText[cactionId + 1] = 1024 + " characters are remaining"
                $scope.addCallAction.actionOptions[cactionId + 1] = "action0";
                $scope.ruleDropDown[cactionId + 1] = {
                    0: {
                        "fields": Object.keys($scope.names.fields)
                    }
                };
                $scope.addCallAction.email[cactionId + 1] = []
                $scope.addCallAction.rule[cactionId + 1] = {
                    0: {
                        "fields": "",
                        "operators": "",
                        "enum": "",
                        "join_type": ""
                    }
                };
                //}
                }else{
                var addedAction;

                cactionId = parseInt(cactionId);
                addedAction = {
                    id: (cactionId + 1)
                };

                // if (!$scope.addCallAction.callActionFormSubmitted[cActionId]) {
                //     $scope.saveCallAction(cActionId, true);
                // }
                // else {

                $scope.callActions.push(addedAction);
                // $scope.addCallAction.email[1] = [];
                $scope.addCallAction.remainingText[cactionId + 1] = 1024 + " characters are remaining"
                $scope.addCallAction.actionOptions[cactionId + 1] = "action0";
                var target = Object.assign({}, $scope.names.fields);
                delete target['Ring to Phone Number'];
                $scope.ruleDropDown[cactionId + 1] = {
                    0: {
                        "fields": Object.keys(target)
                    }
                };
                $scope.addCallAction.email[cactionId + 1] = []
                $scope.addCallAction.rule[cactionId + 1] = {
                    0: {
                        "fields": "",
                        "operators": "",
                        "enum": "",
                        "join_type": ""
                    }
                  };
               }
            }


            $scope.removeCallAction = function(actionId) {
                var keepLooking = true;
                $.each($scope.callActions, function(index, callAction) {
                    if (keepLooking && callAction.id === actionId) {
                        if (!angular.isUndefined($scope.addCallAction.action_id[actionId])) {
                            $bootbox.confirm("Are you sure you want to delete this Call Action?", function(clickedOK) {
                                if (clickedOK) {
                                    CampaignWebService.removecallActions($scope.addCallAction.action_id[actionId]).then(function(result) {
                                        if (result.data.result !== 'error') {
                                            pinesNotifications.notify({
                                                title: 'Call Action',
                                                text: 'Call Action deleted successfully',
                                                type: 'success'
                                            });
                                            $scope.callActions.splice(index, 1);
                                            deleteCallActionsValue(callAction.id);
                                            keepLooking = false;
                                        } else {
                                            pinesNotifications.notify({
                                                title: 'Call Action',
                                                text: 'Error in Deleting in Call Action',
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
                $.each($scope.addCallAction, function(index, action) {
                    if (!angular.isUndefined(action) && !isEmpty(action[(callActionIndex).toString()]) && typeof(action) != "string") {
                        delete action[(callActionIndex).toString()];
                    }
                });
            if($scope.addCallAction.route_type == 'IVR'){
                if ($scope.callActions.length === 0) {
                    $scope.callActions = [];
                    $scope.callActions.push({
                        "id": 1
                    });
                    $scope.addCallAction.actionOptions[1] = "action0";
                    $scope.addCallAction.email[1] = [];
                    $scope.addCallAction.callActionFormSubmitted[1] = false;
                    $scope.ruleDropDown[1] = {
                        0: {
                            "fields": Object.keys($scope.names.fields)
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
            }else{
                if ($scope.callActions.length === 0) {
                    $scope.callActions = [];
                    $scope.callActions.push({
                        "id": 1
                    });
                    $scope.addCallAction.actionOptions[1] = "action0";
                    $scope.addCallAction.email[1] = [];
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
            };

            $scope.addMultCalls = function() {
                $scope.isEditable = true;
                $scope.MultCallFlowList = [];
                var myregex = /\d{3}-[a-z]/i;
                console.log("add mult numbers clicked:" + $scope.selectedCallFlow.count);
                if (!myregex.test($scope.selectedCallFlow.address)) {
                    pinesNotifications.notify({
                        title: 'Multiple Tracking Numbers',
                        text: 'invalid location',
                        type: 'error'
                    });
                    return;

                } else if ($scope.selectedCallFlow.count > 100) {
                    pinesNotifications.notify({
                        title: 'Multiple Tracking Numbers',
                        text: 'You can add 100 Tracking Numbers at once.',
                        type: 'error'
                    });
                    return;
                }
                // if num is less than the numbers we have for the city/areacode
                if ($scope.numList) {
                    // get new numbers from third party api if local inventory numbers are less than required.
                    if ($scope.selectedCallFlow.count >= $scope.numList.length) {
                        // var num = {number: 'more'};
                        var rc = [];
                        var state = '';
                        var flag = 0;
                        $scope.numList.pop();
                        $.each($scope.rc, function(key, value) {
                            if (value.address === $scope.selectedCallFlow.address) {
                                if (rc.indexOf(value.rc) === -1 && value.rc !== undefined) {
                                    rc.push((value.rc).trim());
                                    state = (value.state).trim();
                                }
                            }
                        });

                        // get third party numbers
                        if (rc.length > 0) {
                            for (var i = 0; i < rc.length && flag == 0; i++) {
                                if (rc[i] !== null || rc[i] !== '') {
                                    var deferred = $q.defer();
                                    CampaignWebService.getThirdPartyNumbers(state, rc[i]).then(function(result) {
                                        console.log(result);
                                        if (result.data.result !== 'error' && result.data.json[0] !== 'fail') {
                                            flag = 1;
                                            angular.forEach(result.data.json, function(number) {
                                                $scope.numList.push(number);
                                            });
                                            // JAW CT-7264: updated
                                            //"numberid":      $scope.numList[i].phone_number_id,
                                            // as
                                            // "numberid":      $scope.numList[i].number_id,

                                            CampaignWebService.getDefaultData($scope.currentOUId).then(function(result) {
                                                console.log("Hello:---------", result);
                                                if ($scope.selectedCallFlow.count <= $scope.numList.length) {
                                                    for (var i = 0; i < $scope.selectedCallFlow.count; i++) {
                                                        var tempHash = {
                                                            "number": $scope.numList[i].number,
                                                            "source": $scope.numList[i].source,
                                                            "pretty_number": $scope.numList[i].pretty_number,
                                                            "numberid": $scope.numList[i].number_id,
                                                            "vendor_id": $scope.numList[i].vendor_id,
                                                            "name": "",
                                                            "value": "",
                                                            "channel": "",
                                                            "repeatint": 72,
                                                            "ringto": ($scope.selectedCallFlow.routetype =='outbound' || $scope.selectedCallFlow.routetype =='voicemail') ? '': $scope.selectedCallFlow.ringtoNum,
                                                            "recordcall": "yes",
                                                            "customTaggingOptions": $scope.customTaggingOptions,
                                                            "selectCustomOptions": $scope.selectCustomOptions
                                                        }
                                                        if (result.data.json.callFlowData.callFlowData.length > 0) {
                                                            var val = result.data.json.callFlowData.callFlowData[0];
                                                            tempHash.repeatint = val.repeat_interval_call;
                                                            tempHash.ringto = val.ring_to_number;
                                                            tempHash.recordcall = val.record_call === true ? 'yes' : 'no';
                                                        }
                                                        $scope.MultCallFlowList.push(tempHash);
                                                    }
                                                    deferred.resolve();


                                                } else {
                                                    pinesNotifications.notify({
                                                        title: 'Multiple Tracking Numbers',
                                                        text: 'Not enough numbers in the inventory. Please contact customer support or the account manager to get the numbers.',
                                                        type: 'error'
                                                    });
                                                    return;
                                                }
                                            });
                                        } else {
                                            pinesNotifications.notify({
                                                title: 'Multiple Tracking Number',
                                                text: 'Not enough numbers in the inventory. Please contact customer support or the account manager to get the numbers.',
                                                type: 'error'
                                            });
                                        }
                                    });
                                    return deferred.promise;
                                }
                            }
                        }
                    } else {
                        if ($scope.selectedCallFlow.count <= $scope.numList.length) {
                            // for (var i = 0; i < $scope.selectedCallFlow.count; i++) {
                            //     // JAW CT-7264:updated phone_number_id as number_id
                            //     $scope.MultCallFlowList.push({
                            //         "number": $scope.numList[i].number,
                            //         "source": $scope.numList[i].source,
                            //         "pretty_number": $scope.numList[i].pretty_number,
                            //         "numberid": $scope.numList[i].number_id,
                            //         "vendor_id": $scope.numList[i].vendor_id,
                            //         "name": "",
                            //         "value": "",
                            //         "channel": "",
                            //         "repeatint": 72,
                            //         "ringto": "",
                            //         "recordcall": "yes",
                            //         "customTaggingOptions": $scope.customTaggingOptions,
                            //         "selectCustomOptions": $scope.selectCustomOptions
                            //     });

                            CampaignWebService.getDefaultData($scope.currentOUId).then(function(result) {
                                for (var i = 0; i < $scope.selectedCallFlow.count; i++) {
                                    var tempHash = {
                                        "number": $scope.numList[i].number,
                                        "source": $scope.numList[i].source,
                                        "pretty_number": $scope.numList[i].pretty_number,
                                        "numberid": $scope.numList[i].number_id,
                                        "vendor_id": $scope.numList[i].vendor_id,
                                        "name": "",
                                        "value": "",
                                        "channel": "",
                                        "repeatint": 72,
                                        "ringto": ($scope.selectedCallFlow.routetype =='outbound' || $scope.selectedCallFlow.routetype =='voicemail') ? '': $scope.selectedCallFlow.ringtoNum,
                                        "recordcall": "yes",
                                        "customTaggingOptions": $scope.customTaggingOptions,
                                        "selectCustomOptions": $scope.selectCustomOptions
                                    }
                                    if (result.data.json.callFlowData.callFlowData.length > 0) {
                                        var val = result.data.json.callFlowData.callFlowData[0];
                                        tempHash.repeatint = val.repeat_interval_call;
                                        tempHash.ringto = val.ring_to_number;
                                        tempHash.recordcall = val.record_call === true ? 'yes' : 'no';
                                    }
                                    $scope.MultCallFlowList.push(tempHash);
                                }
                            });
                            //}
                        } else {
                            pinesNotifications.notify({
                                title: 'Multiple Tracking Numbers',
                                text: 'Not enough numbers in the inventory. Please contact customer support or the account manager to get the numbers.',
                                type: 'error'
                            });
                            return;
                        }
                    }
                } else {
                    pinesNotifications.notify({
                        title: 'Multiple Tracking Numbers',
                        text: 'Not enough numbers in the inventory. Please contact customer support or the account manager to get the numbers.',
                        type: 'error'
                    });
                    return;
                }
            };
            $scope.recordoptions = [{
                    id: 1,
                    text: 'yes'
                },
                {
                    id: 2,
                    text: 'no'
                }
            ];

            $scope.showRecordOptions = function(callflowitem) {
                if (callflowitem.recordcall && $scope.recordoptions.length) {
                    var selected = $filter('filter')($scope.recordoptions, {
                        text: callflowitem.recordcall
                    });
                    return selected.length ? selected[0].text : 'yes';
                } else {
                    return callflowitem.recordcall || 'yes';
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

            $scope.showNumber = function(actionNumber) {
                if (actionNumber === 1) return 'First';
                else if (actionNumber === 2) return 'Second';
                else if (actionNumber === 3) return 'Third';
                else if (actionNumber === 4) return 'Fourth';
                else if (actionNumber === 5) return 'Fifth';
                else if (actionNumber === 6) return 'Sixth';
                else if (actionNumber === 7) return 'Seventh';
                else if (actionNumber === 8) return 'Eighth';
                else if (actionNumber === 9) return 'Ninth';
                else if (actionNumber === 10) return 'Tenth';
                else return '';
            };
            // $scope.phoneNumbers = PhoneList.getList();
            // $scope.phoneNumbers = [
            // {id: 1, phone: '435-715-2543', name: 'Mailer 4', channel: 1, status: false, value: '$65.00', rinterval: '120', status2: 'inactive', group: 4, groupName: 'admin'},
            // {id: 2, phone: '435-673-4967', name: 'Mailer 1a', channel: 2, status: true, value: '$10.00', rinterval: '60', status2: 'active', group: 4, groupName: 'admin'},
            // {id: 3, phone: '866-111-9999', name: 'Retargeting', channel: 7, status: true, value: '$6.00', rinterval: '3245', status2: 'active', group: 3, groupName: 'vip'},
            // {id: 4, phone: 'Session Pool 2', name: 'Website DNI2', channel: 8, status: true, value: '$94.00', rinterval: '40', status2: 'active', group: 3, groupName: 'vip'}
            // ];
            $scope.selectedCallFlow.voicePrompt1 = true;
            $scope.selectedCallFlow.voicePromptTTSText = '';
            $scope.TTSSelected = true;
            $scope.ivrActions = [{
                id: 1,
                action_order: 1,
                voicepromptText : "",
                voicepromptFileName : "",
                voicepromptURL : "",
                voicepromptId : "",
                TTSIVRSelected : true,
                hasValidTTSVoiceURL : "",
                voicepromptTTSText : "",
                action: 'simple',
                ringtonum: "",
                recordCall: false,
                activateVoiceMail: false,
                playDisclaimer: 'before',
                overflowNumbers :[{overflowNumber:'',rings: $scope.selectedCallFlow.Overflow === undefined ?3:$scope.selectedCallFlow.Overflow, overflow_order: 1}],
                openOverflowBox :false,
                isSimultaneousRing :false,
                geoRoute: {
                    routeBy:"",
                    geoList:"",
                    radius:""
                },
                scheduleRoute: {
                    timezone:'',
                    default_ringto:'',
                    activate_voicemail:false,
                    recordCall: false,
                    playDisclaimer: 'before'
                },
                TTSWhisperSelected: true,
                whisperPrompt : false,
                whisperTTSText: '',
                hasValidWhisperURL: '',
                whisperURL:'',
                back_press:""
            }];

            $scope.channels = [{
                value: 1,
                text: 'Online: Paid Search'
            }, {
                value: 2,
                text: 'Online: Organic Search'
            }, {
                value: 3,
                text: 'Online: Display'
            }, {
                value: 4,
                text: 'Online: Email'
            }, {
                value: 5,
                text: 'Offline: Direct Mail'
            }, {
                value: 6,
                text: 'Offline: Magazine'
            }, {
                value: 7,
                text: 'Mobile: Paid Search'
            }, {
                value: 8,
                text: 'Mobile: Organic Search'
            }];

            $scope.groups = [{
                    id: 1,
                    text: 'active'
                },
                {
                    id: 2,
                    text: 'inactive'
                }
            ];
            
            CampaignWebService.getVoicemails($rootScope.currentOUId).then(function(result) {
                // console.log('INSIDE CampaignWebService.voicemails IN campaign.js: Voicemails :', result.data.json);
                if (result.data.result != 'error') {
                    $scope.voicemails = result.data.json;
                    if ($scope.voicemails) {
                        for (var i = 0; i < $scope.voicemails.length; i++) {
                            $scope.voicemails[i].selectedvoicemail = false;
                        }
                    }
                } else {
                    //alert("Failed to update campaign");
                }
            });

            CampaignWebService.getVoicePrompts($rootScope.currentOUId).then(function(result) {
                // console.log('INSIDE CampaignWebService.getVoicePrompts IN campaign.js: Voice prompts:', result.data.json);
                if (result.data.result != 'error') {
                    $scope.prompts = result.data.json;
                    if ($scope.prompts) {
                        for (var i = 0; i < $scope.prompts.length; i++) {
                            $scope.prompts[i].selectedprompt = false;
                        }
                    }
                } else {
                    //alert("Failed to update campaign");
                }
            });
            $scope.georoutelocations = [];
            CampaignWebService.getWhispers($rootScope.currentOUId).then(function(result) {
                // console.log('INSIDE CampaignWebService.getWhispers IN campaign.js: Whispers:', result.data.json);
                if (result.data.result != 'error') {
                    $scope.whispers = result.data.json;
                    if ($scope.whispers) {
                        for (var i = 0; i < $scope.whispers.length; i++) {
                            $scope.whispers[i].selectedwhisper = false;
                        }
                    }
                } else {
                    //alert("Failed to update campaign");
                }
            });
            // CampaignWebService.getGeoLocations().then(function(result) {
            //     if (result.data.result != 'error') {
            //         var locationData = result.data.json.locations;
            //         locationData.forEach(function(loc) {
            //             if (loc.count > 0) {
            //                 $scope.georoutelocations.push({
            //                     id: loc.id,
            //                     name: loc.name
            //                 });
            //             }
            //         });
            //     }

            // });
            TagWebService.getTags().then(function(result) {
                // console.log('INSIDE TabWebService.getTags IN campaign.js: Tags:', result.data.json);
                if (result.data.err === '') {
                    //  $scope.callActionTaggingOptions = result.data.json;
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

            var filecontrol = $("#filecontrol");
            // $scope.isFileSelected= function(){
            //  if(!$scope.files)
            //      return false;
            //  else
            //      return true;
            // }
            $scope.$on("$destroy", function() {
                $rootScope.$emit("stopIvrAudios", {});
                if ($scope.promptAudio !== undefined)
                    $scope.promptAudio.pause();
                if($scope.outComePromtAudio != undefined)
                    $scope.outComePromtAudio.pause();
                if($scope.salesAmountVoiceAudio !== undefined)
                    $scope.salesAmountVoiceAudio.pause();  
                if($scope.AgentIDVoicePromptAudio != undefined)
                    $scope.AgentIDVoicePromptAudio.pause();          
                if ($scope.ivrAudio !== undefined)
                    $scope.ivrAudio.pause();
                if ($scope.ivrAudio1 !== undefined)
                    $scope.ivrAudio1.pause();    
                if ($scope.whisperAudio !== undefined)
                    $scope.whisperAudio.pause();
                 if ($scope.greetingAudio !== undefined)
                    $scope.greetingAudio.pause();
                if ($scope.calloutcomeAudio !== undefined)
                    $scope.calloutcomeAudio.pause();
                if ($scope.agentidAudio !== undefined)
                    $scope.agentidAudio.pause();
                 if ($scope.saleAudio !== undefined)
                    $scope.saleAudio.pause();
                if ($scope.leadAudio !== undefined)
                    $scope.leadAudio.pause();
                    // $( "html" ).removeClass("hideScroll");
                    $( "body" ).removeClass("showScroll");
            });

            $scope.removeSelectedVoiceAudio = function(element) {
                // remove the text from the text field
              

                switch(element){
                    case 'voicePromt':
                        if($scope.promptAudio !== undefined)
                            $scope.promptAudio.pause();
                        $scope.promptAudio = undefined;
                        $scope.selectedCallFlow.voiceURL = undefined;
                        $scope.selectedCallFlow.voicePromptTTSText = "";
                        $scope.TTSSelected = true;
                        $scope.hasValidVoiceURL = false;
                    
                        break;
                    case 'voicemailGreetings':
                        if($scope.greetingAudio !== undefined)
                            $scope.greetingAudio.pause();
                        $scope.greetingAudio = undefined;
                        $scope.selectedCallFlow.voicemailGreetingsText = '';
                        $scope.selectedCallFlow.voicemailGreetingsTTSText = '';
                        $scope.selectedCallFlow.VoiceMainGreetingURL = undefined;                                    
                        $scope.TTSvoicemailGreetingsSelected = true;
                        $scope.hasValidvoicemailGreetingsURL = false;
                        break;
                    case 'outComePromt':
                        if($scope.outComePromtAudio !== undefined)
                            $scope.outComePromtAudio.pause();
                        $scope.outComePromtAudio = undefined;
                        $scope.selectedCallFlow.outComePromtText = '';
                        $scope.selectedCallFlow.outComePromtURL = undefined;                                    
                        $scope.TTSoutComePromtSelected = true;
                        $scope.hasValidoutComePromtURL = false;
                        break;
                    case 'salesAmountVoice':
                     if($scope.salesAmountVoiceAudio !== undefined)
                            $scope.salesAmountVoiceAudio.pause();
                        $scope.salesAmountVoiceAudio = undefined;
                        $scope.selectedCallFlow.salesAmountVoicePromptText = '';
                        $scope.selectedCallFlow.salesAmountVoiceURL = undefined;                                    
                        $scope.TTSsalesAmountVoiceSelected = true;
                        $scope.hasValidsalesAmountVoiceURL = false;
                        break;
                    case 'AgentIDVoicePrompt':
                     if($scope.AgentIDVoicePromptAudio !== undefined)
                            $scope.AgentIDVoicePromptAudio.pause();
                        $scope.AgentIDVoicePromptAudio = undefined;
                        $scope.selectedCallFlow.AgentIDVoicePromptText = '';
                        $scope.selectedCallFlow.AgentIDVoicePromptURL = undefined;                                    
                        $scope.TTSAgentIDVoicePromptSelected = true;
                        $scope.hasValidAgentIDVoicePromptURL = false;
                        break;
                }

            };
            
            


           
            
            $scope.playTtsVoiceAudio = function(cAction) {
                if ($scope.ivrAudio !== undefined && !$scope.ivrAudio.paused) {
                    $scope.ivrAudio.pause();
                } else if ($scope.ivrAudio !== undefined && $scope.ivrAudio.paused) {
                    $scope.ivrAudio.play();
                } else {
                    if (cAction.voicepromptTTSText.length > 0) {
                        $scope.ivrAudio = new Audio();
                        $scope.onTTS_IVR_Request = true;
                        CampaignWebService.getTTS(cAction.voicepromptTTSText).then(function(result) {
                            if (result.data.json.length > 1) {
                                var TTSData = result.data.json;
                                var source = "data:audio/mp3;base64," + TTSData;
                                $scope.ivrAudio.src = source;
                                if ($scope.ivrAudio.paused) {
                                    $scope.ivrAudio.play();
                                } else {
                                    $scope.ivrAudio.pause();
                                }
                            }
                             $scope.onTTS_IVR_Request = undefined;
                        });
                    } else {
                        $scope.ivrAudio = new Audio(cAction.voicepromptURL);
                        $scope.ivrAudio.play();
                    }
                }
            };

            $scope.removeSelectedIvrVoiceAudio = function(cAction) {   
                if ($scope.ivrAudio !== undefined)
                    $scope.ivrAudio.pause();
                $scope.ivrAudio = undefined;
                cAction.voicepromptURL = undefined;    
                cAction.voicepromptTTSText = "";   
                cAction.TTSIVRSelected = true; 
                cAction.hasValidTTSVoiceURL = false;   
            };

            $scope.showIVRVoiceModal = function(size) {
                $scope.disableBtn = true;
                stopAudio();
                var modalInstance = $uibModal.open({
                    templateUrl: 'assets/partials/assignPrompt.html',
                    controller: 'oldVoiceModal',
                    size: size
                });

                modalInstance.result.then(function() {
                    for (var i = 0; i < voicepromptService.prompts.length; i++) {
                        if (voicepromptService.prompts[i].selectedprompt === true) {
                            $scope.selectedCallFlow.voicepromptText = voicepromptService.prompts[i].name;
                            $scope.selectedCallFlow.voicepromptFileName = voicepromptService.prompts[i].filename;
                            $scope.selectedCallFlow.voicepromptURL = voicepromptService.prompts[i].url;
                            $scope.selectedCallFlow.voicepromptId = voicepromptService.prompts[i].id;
                        }
                    }
                    console.log(voicepromptService.prompts);
                    $scope.prompts = voicepromptService.prompts;
                    $scope.TTSIVRSelected = false;
                    $scope.hasValidTTSVoiceURL = true;
                    $scope.selectedCallFlow.voicepromptTTSText = '';
                    $scope.disableBtn = false;
                }, function() {
                    console.log('Modal dismissed at: ' + new Date());
                    $scope.disableBtn = false;
                });
            };

            $scope.voiceTextIVRChange = function() {
                $scope.ivrAudio1 = undefined;
                if ($scope.selectedCallFlow.voicepromptTTSText === undefined || $scope.selectedCallFlow.voicepromptTTSText.length === 0) {
                    console.log($scope.selectedCallFlow.voicepromptTTSText,"voicepromptTTSText");
                    $scope.hasValidTTSVoiceURL = false;
                    $scope.TTSIVRSelected = true;
                } else {
                    $scope.chkSpclChar($scope.selectedCallFlow.voicepromptTTSText, 'Voice Prompt', function(t){
                        $scope.selectedCallFlow.voicepromptTTSText = t;
                        $scope.hasValidTTSVoiceURL = true;
                        $scope.TTSIVRSelected = true;
                    });
                }
            };

            $scope.removeSelectedIVRVoiceAudio = function() {
                if ($scope.ivrAudio1 !== undefined)
                $scope.ivrAudio1.pause();
                $scope.ivrAudio1 = undefined;
                $scope.selectedCallFlow.voicepromptURL = undefined;
                $scope.selectedCallFlow.voicepromptTTSText = "";
                $scope.TTSIVRSelected = true;
                $scope.hasValidTTSVoiceURL = false;
            };           

            $scope.playTTSVoiceAudio = function(url) {
                if($scope.selectedCallFlow.voicepromptTTSText == undefined){
                    $scope.selectedCallFlow.voicepromptTTSText = "";
                }
                if ($scope.ivrAudio1 !== undefined && !$scope.ivrAudio1.paused) {
                    $scope.ivrAudio1.pause();
                } else if ($scope.ivrAudio1 !== undefined && $scope.ivrAudio1.paused) {
                    $scope.ivrAudio1.play();
                } else {
                    if ($scope.selectedCallFlow.voicepromptTTSText.length > 0) {
                        $scope.ivrAudio1 = new Audio();
                        $scope.onTTS_IVR_Request = true;
                        CampaignWebService.getTTS($scope.selectedCallFlow.voicepromptTTSText).then(function(result) {
                            if (result.data.json.length > 1) {
                                var TTSData = result.data.json;
                                var source = "data:audio/mp3;base64," + TTSData;
                                $scope.ivrAudio1.src = source;
                                if ($scope.ivrAudio1.paused) {
                                    $scope.ivrAudio1.play();
                                } else {
                                    $scope.ivrAudio1.pause();
                                }
                            }
                            $scope.onTTS_IVR_Request = undefined;
                        });
                    } else {
                        $scope.ivrAudio1 = new Audio($scope.selectedCallFlow.voicepromptURL);
                        $scope.ivrAudio1.play();
                    }
                }
            };

            $scope.showGeLocationVoiceModal = function(size) {
                $scope.disableBtn = true;
                stopAudio();
                var modalInstance = $uibModal.open({
                    templateUrl: 'assets/partials/assignPrompt.html',
                    controller: 'oldVoiceModal',
                    size: size
                });
                modalInstance.result.then(function() {
                    for (var i = 0; i < voicepromptService.prompts.length; i++) {
                        if (voicepromptService.prompts[i].selectedprompt === true) {
                            $scope.selectedCallFlow.geoLocationPromptText = voicepromptService.prompts[i].name;
                            $scope.selectedCallFlow.geoLocationPromptName = voicepromptService.prompts[i].filename;
                            $scope.selectedCallFlow.geoLocationPromptURL = voicepromptService.prompts[i].url;
                            $scope.selectedCallFlow.geoLocationPromptId = voicepromptService.prompts[i].id;
                        }
                    }
                    $scope.prompts = voicepromptService.prompts;
                    $scope.TTGeoloLocationPromptSelected = false;
                    $scope.hasValidGeoloLocationPromptURL = true;
                    $scope.selectedCallFlow.geoLocationPromptTTSText = '';
                    $scope.disableBtn = false;
                }, function() {
                    console.log('Modal dismissed at: ' + new Date());
                    $scope.disableBtn = false;
                });
            };

            $scope.voiceTextGeoLocationPromptChange = function() {
                $scope.geoLocationAudio = undefined;
                if ($scope.selectedCallFlow.geoLocationPromptTTSText === undefined || $scope.selectedCallFlow.geoLocationPromptTTSText.length === 0) {
                    $scope.hasValidGeoloLocationPromptURL = false;
                    $scope.TTGeoloLocationPromptSelected = true;
                } else {
                    $scope.chkSpclChar($scope.selectedCallFlow.geoLocationPromptTTSText, 'Voice Prompt', function(t){
                        $scope.selectedCallFlow.geoLocationPromptTTSText = t;
                        $scope.hasValidGeoloLocationPromptURL = true;
                        $scope.TTGeoloLocationPromptSelected = true;
                    });
                }
            };

            $scope.playGeoLocationVoiceAudio = function(url) {
                if($scope.selectedCallFlow.geoLocationPromptTTSText == undefined){
                    $scope.selectedCallFlow.geoLocationPromptTTSText = "";
                }
                if ($scope.geoLocationAudio !== undefined && !$scope.geoLocationAudio.paused) {
                    $scope.geoLocationAudio.pause();
                } else if ($scope.geoLocationAudio !== undefined && $scope.geoLocationAudio.paused) {
                    $scope.geoLocationAudio.play();
                } else {
                    if ($scope.selectedCallFlow.geoLocationPromptTTSText.length > 0) {
                        $scope.geoLocationAudio = new Audio();
                        $scope.onTTS_IVR_Request = true;
                        CampaignWebService.getTTS($scope.selectedCallFlow.geoLocationPromptTTSText).then(function(result) {
                            if (result.data.json.length > 1) {
                                var TTSData = result.data.json;
                                var source = "data:audio/mp3;base64," + TTSData;
                                $scope.geoLocationAudio.src = source;
                                if ($scope.geoLocationAudio.paused) {
                                    $scope.geoLocationAudio.play();
                                } else {
                                    $scope.geoLocationAudio.pause();
                                }
                            }
                            $scope.onTTS_IVR_Request = undefined;
                        });
                    } else {
                        $scope.geoLocationAudio = new Audio($scope.selectedCallFlow.geoLocationPromptURL);
                        $scope.geoLocationAudio.play();
                    }
                }
            };

            $scope.removeSelectedGeoloLocationPrompt = function() {   
                if ($scope.geoLocationAudio !== undefined)
                    $scope.geoLocationAudio.pause();
                $scope.geoLocationAudio = undefined;
                $scope.selectedCallFlow.geoLocationPromptURL = undefined;    
                $scope.selectedCallFlow.geoLocationPromptTTSText = "";   
                $scope.TTGeoloLocationPromptSelected = true; 
                $scope.hasValidGeoloLocationPromptURL = false;   
            };

            $scope.removeSelectedWhisperAudio = function() {
                // remove the text from the text field
                if ($scope.whisperAudio !== undefined)
                    $scope.whisperAudio.pause();
                $scope.whisperAudio = undefined;
                $scope.selectedCallFlow.whisperURL = undefined;
                $scope.selectedCallFlow.whisperTTSText = "";
                $scope.TTSWhisperSelected = true;
                $scope.hasValidWhisperURL = false;
            };

            $scope.playVoiceAudio = function(url) {

                if ($scope.promptAudio !== undefined && !$scope.promptAudio.paused) {
                    $scope.promptAudio.pause();
                } else if ($scope.promptAudio !== undefined && $scope.promptAudio.paused) {
                    $scope.promptAudio.play();
                } else {

                    if ($scope.selectedCallFlow.voicePromptTTSText !== undefined && $scope.selectedCallFlow.voicePromptTTSText.length > 0) {
                        $scope.promptAudio = new Audio();
                        $scope.onTTS_VP_Request = true;
                        CampaignWebService.getTTS($scope.selectedCallFlow.voicePromptTTSText).then(function(result) {
                            if (result.data.json.length > 1) {
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
            };

            $scope.playVoiceAudioPromt = function(url,element) {
                     switch (element) {
                        case 'voicemailGreetings':
                              if ($scope.greetingAudio !== undefined && !$scope.greetingAudio.paused) {
                                    $scope.greetingAudio.pause();
                                } else if ($scope.greetingAudio !== undefined && $scope.greetingAudio.paused) {
                                    $scope.greetingAudio.play();
                                } else {
                                    if ($scope.selectedCallFlow.voicemailGreetingsTTSText !== undefined && $scope.selectedCallFlow.voicemailGreetingsTTSText.length > 0 && $scope.selectedCallFlow.voicemailGreetingsTTSText != " ") {
                                        $scope.greetingAudio = new Audio();
                                        $scope.onTTS_VP_Request = true;
                                        CampaignWebService.getTTS($scope.selectedCallFlow.voicemailGreetingsTTSText).then(function(result) {
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

                                    if ($scope.selectedCallFlow.outComePromtTTSText !== undefined && $scope.selectedCallFlow.outComePromtTTSText.length > 0) {
                                        $scope.outComePromtAudio = new Audio();
                                        $scope.onTTS_VP_Request = true;
                                        CampaignWebService.getTTS($scope.selectedCallFlow.outComePromtTTSText).then(function(result) {
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

                                    if ($scope.selectedCallFlow.salesAmountVoiceTTSText !== undefined && $scope.selectedCallFlow.salesAmountVoiceTTSText.length > 0) {
                                        $scope.salesAmountVoiceAudio = new Audio();
                                        $scope.onTTS_VP_Request = true;
                                        CampaignWebService.getTTS($scope.selectedCallFlow.salesAmountVoiceTTSText).then(function(result) {
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

                                    if ($scope.selectedCallFlow.AgentIDVoicePromptTTSText !== undefined && $scope.selectedCallFlow.AgentIDVoicePromptTTSText.length > 0) {
                                        $scope.AgentIDVoicePromptAudio = new Audio();
                                        $scope.onTTS_VP_Request = true;
                                        CampaignWebService.getTTS($scope.selectedCallFlow.AgentIDVoicePromptTTSText).then(function(result) {
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
                   // $scope.whisperAudio = new Audio(url);
                       $scope.whisperAudio.play();
                } else {
                    if ($scope.selectedCallFlow.whisperTTSText !== undefined && $scope.selectedCallFlow.whisperTTSText.length > 0) {
                        // create the HTML5 audio element
                        $scope.whisperAudio = new Audio();
                        $scope.onTTS_WH_Request = true;
                        CampaignWebService.getTTS($scope.selectedCallFlow.whisperTTSText).then(function(result) {
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
                //http://s3.amazonaws.com/LogMyCalls/call_recordings/0000000000_2193810696_5555555555_20150303-205023-API~KxjvV.mp3?AWSAccessKeyId=AKIAI437X62OCWJK2EYQ&Expires=1426802444&Signature=1UYFUP77q0cjQkSkIY3tzc1%2F5tg%3D
            };

            $scope.showChannel = function(channelId) {
                var selected = [];
                if (channelId) {
                    selected = $filter('filter')($scope.channels, {
                        channel_id: channelId
                    });
                }
                return selected.length ? selected[0].sub_category : '--Select--';
            };
            $scope.saveUser = function(data, id) {
                //$scope.user not updated yet
                angular.extend(data, {
                    id: id
                });
                // return $http.post('/saveUser', data);
            };

            // remove user
            $scope.removeNumber = function(pnumber) {
                if ($scope.promptAudio !== undefined)
                    $scope.promptAudio.pause();
                if ($scope.ivrAudio !== undefined)
                    $scope.ivrAudio.pause();
                if ($scope.whisperAudio !== undefined)
                    $scope.whisperAudio.pause();
                if ($scope.greetingAudio !== undefined)
                    $scope.greetingAudio.pause();
                if ($scope.calloutcomeAudio !== undefined)
                    $scope.calloutcomeAudio.pause();
                if ($scope.agentidAudio !== undefined)
                    $scope.agentidAudio.pause();
                if ($scope.saleAudio !== undefined)
                    $scope.saleAudio.pause();
                if ($scope.leadAudio !== undefined)
                    $scope.leadAudio.pause();
              
                var pr = {};
                pr = {
                    "provisioned_route": {
                        "ids": [pnumber.id]
                    }
                };
                CampaignWebService.checkOutboundCallerId(pnumber.phone).then(function(result) {
                    if (result.data.status === "success") {
                        if(parseInt(result.data.json[0].count) > 0){
                            msg = "Are you sure you want to delete this Tracking Number as it is selected as a Caller ID in outbound route?"
                        }else{
                              var msg = "Are you sure you want to delete this Tracking Number?";
                        }
                        $bootbox.confirm(msg, function(clickedOK) {
                    if (clickedOK) {
                        CampaignWebService.removeCallFlow(pr).then(function(result) {
                            if (result.data.err === '') {
                                pinesNotifications.notify({
                                    title: 'Remove Tracking Number',
                                    text: 'Tracking Number removed successfully.',
                                    type: 'success'
                                });

                                $route.reload();
                                // $location.path('/setup-campaign-builder2');
                            } else {
                                pinesNotifications.notify({
                                    title: 'Remove Tracking Number',
                                    text: result.data.err.data ? result.data.err.data :result.data.err,
                                    type: 'error'
                                });

                            }
                        });
                    }
                });
                    }
                 })
            };

            $scope.arrRequired = [];
            $scope.validateData = function(data, name) {
                if (!data) {
                    return '   ';
                }
            };


            $scope.isCampaignInReferralStage = false;
            $scope.proceedToSaveTable = function(tableform) {
                $scope.isCampaignInReferralStage = false;
                if ($scope.campActive !== true && $scope.dateTime.endDate.date !== undefined && $scope.showReferral && $scope.referralChecked) {
                    var referralNumber = $scope.referralNumber.replace(/\D/g, "");
                    if (moment($scope.dateTime.endDate.date).isBefore(moment.tz($rootScope.timezone).format('DD-MMMM-YYYY hh:mm A')) && referralNumber.length === 10) {
                        $scope.isCampaignInReferralStage = true;
                    }
                }
                $scope.date_changed = false;
                if ($scope.campActive !== true && $scope.isCampaignInReferralStage === false) {
                    $bootbox.confirm("Activating Tracking Number will also activate campaign, do you want to continue?", function(clickedOK) {
                        if (clickedOK) {
                            if (moment($scope.dateTime.startDate.date).isBefore(moment.tz($rootScope.timezone).format('DD-MM-YYYY hh:mm A'))) {
                                $scope.dateTime.startDate.date = moment.tz($rootScope.timezone).format('DD-MM-YYYY hh:mm A');
                            }
                            $scope.dateTime.endDate.date = null;
                            $scope.date_changed = true;
                            $scope.campActive = true;
                            $scope.saveTable(tableform);
                        } else {
                            $scope.showSubmit();
                            $scope.showSaveButton();
                        }
                    });
                } else {
                    $scope.saveTable(tableform);
                }
            };
            $scope.saveTable = function(tableform) {
                if (tableform.$invalid) {
                    setTimeout(function() {
                        tableform.$show();
                    }, 50);
                    return false;
                }

                var results = [];
                var nameArr = [];
                var pr;
                var status = ($scope.campActive !== true ? 'inactive' : 'active');
                var campaignStatus = ($scope.campActive !== true ? 'inactive' : 'active');
                if ($scope.isCampaignInReferralStage === true) {
                    status = "referral";
                }
                for (var i = $scope.MultCallFlowList.length; i--;) {
                    var customSources = [{
                            custom_source_id: $scope.MultCallFlowList[i].customSourceList_1,
                            custom_source_type: 'CS1'
                        },
                        {
                            custom_source_id: $scope.MultCallFlowList[i].customSourceList_2,
                            custom_source_type: 'CS2'
                        },
                        {
                            custom_source_id: $scope.MultCallFlowList[i].customSourceList_3,
                            custom_source_type: 'CS3'
                        },
                        {
                            custom_source_id: $scope.MultCallFlowList[i].customSourceList_4,
                            custom_source_type: 'CS4'
                        },
                        {
                            custom_source_id: $scope.MultCallFlowList[i].customSourceList_5,
                            custom_source_type: 'CS5'
                        }
                    ];

                    nameArr.push($scope.MultCallFlowList[i].name);
                    $scope.MultCallFlowList[i].ringto = UserWebService.unMaskData($scope.MultCallFlowList[i].ringto);
                    console.log($scope.MultCallFlowList[i]);
                    var record_until;
                    if ($scope.MultCallFlowList[i].recordcall === 'yes') {
                        record_until = '';
                    } else {
                        record_until = '2015-02-24 00:00:00'; //past date (today)
                    }

                    pr = {
                        "provisioned_route": {
                            "route_type": "simple",
                            "name": $scope.MultCallFlowList[i].name,
                            "org_unit_id": $rootScope.currentOUId,
                            "repeat_interval": $scope.MultCallFlowList[i].repeatint,
                            "call_value": $scope.MultCallFlowList[i].value
                        },
                        "call_flow": {
                            "tracking_number": $scope.MultCallFlowList[i].number,
                            "organizational_unit_id": $rootScope.currentOUId,
                            "ringto": ($scope.selectedCallFlow.routetype =='outbound' || $scope.selectedCallFlow.routetype =='voicemail') ? '': $scope.MultCallFlowList[i].ringto,
                            "route_type": "simple",
                            "play_disclaimer": 'before',
                            "record_until": record_until,
                            "whisper_enabled": "0",
                            "whisper_type": "text",
                            "whisper_message": " ",
                            "message_enabled": "0",
                            "message_type": "text",
                            "message": " ",
                            "status": status,
                            "customSourceList": customSources
                        },
                        "channel": {
                            "id": $scope.MultCallFlowList[i].channel
                        }
                    };

                    // Added code for third party numbers vendor id
                    if ($scope.MultCallFlowList[i].source === 'inventory') {
                        pr.phone_number = {
                            "id": $scope.MultCallFlowList[i].numberid,
                            "vendor_id": $scope.MultCallFlowList[i].vendor_id,
                            "source": $scope.MultCallFlowList[i].source,
                            "number_ou_id": $scope.MultCallFlowList[i].number_ou_id == undefined ? $rootScope.currentOUId : $scope.MultCallFlowList[i].number_ou_id
                        };
                    } else {
                        pr.phone_number = {
                            "number": $scope.MultCallFlowList[i].numberid,
                            "vendor_id": $scope.MultCallFlowList[i].vendor_id,
                            "source": $scope.MultCallFlowList[i].source,
                            "number_ou_id": $scope.MultCallFlowList[i].number_ou_id == undefined ? $rootScope.currentOUId : $scope.MultCallFlowList[i].number_ou_id
                        };
                    }

                    results.push(pr);
                }
                var totNames = nameArr;
                var uniqNames = _.uniq(nameArr);
                if (uniqNames.length !== totNames.length) {
                    pinesNotifications.notify({
                        title: 'Multiple Tracking Numbers',
                        text: 'Duplicate Tracking Number names are not allowed to save.',
                        type: 'error'
                    });
                    setTimeout(function() {
                        tableform.$show();
                    }, 50);
                    return false;
                }
                pinesNotifications.notify({
                    title: 'Save Tracking Number',
                    text: 'Saving....',
                    type: 'success'
                });
                if ($scope.Id) {
                    // we have an id so so just add the provisioned route
                    pr = {
                        "campaign": {
                            "id": $scope.Id,
                            "start_date": $scope.dateTime.startDate.date,
                            "end_date": $scope.dateTime.endDate.date,
                            "date_changed": $scope.date_changed,
                            "campaign_status": campaignStatus,
                            "timezone": $rootScope.timezone
                        },
                        "call_flows": results
                    };


                    console.log(pr);
                    CampaignWebService.createCallFlow(pr).then(function(result) {
                        if (result.data.err === '') {
                            pinesNotifications.notify({
                                title: 'Multiple Tracking Numbers',
                                text: 'Tracking Number created successfully.',
                                type: 'success'
                            });
                            $scope.selectedCallFlow.name = '';
                            $scope.selectedCallFlow.callflowlabel = '';
                            $route.reload();
                        } else {
                            pinesNotifications.notify({
                                title: 'Save Tracking Number',
                                text: result.data.err,
                                type: 'error'
                            });
                        }
                    });

                } else {
                    var cf = {
                        "campaign": {
                            "name": $scope.name,
                            "org_unit_id": $rootScope.currentOUId,
                            "external_id": $scope.campExtId ? $scope.campExtId : '',
                            "start_date": $scope.dateTime.startDate.date,
                            "end_date": $scope.dateTime.endDate.date,
                            "status": $scope.campaignStatus,
                            "timezone": $rootScope.timezone
                        },
                        "call_flows": results
                    };
                    console.log(JSON.stringify(cf));
                    CampaignWebService.createCampaign(cf).then(function(result) {
                        $scope.formSubmit = false;
                        console.log(result);
                        if (result.data.err === '') {
                            //PhoneList.addtoList({id: result.data.json.campaigns[0].provisioned_routes[i].id,phone:result.data.json.campaigns[0].provisioned_routes[i].phone_numbers[0].number, phonep:result.data.json.campaigns[0].provisioned_routes[i].phone_numbers[0].pretty_number, name: result.data.json.campaigns[0].provisioned_routes[i].name, channel: result.data.json.campaigns[0].provisioned_routes[i].channel, status: result.data.json.campaigns[0].provisioned_routes[i].status, value: result.data.json.campaigns[0].provisioned_routes[i].call_value, rinterval: result.data.json.campaigns[0].provisioned_routes[i].repeat_interval, status2: result.data.json.campaigns[0].provisioned_routes[i].status, group: 4, groupName: 'admin'});

                            pinesNotifications.notify({
                                title: 'Create Campaign',
                                text: 'Campaign created successfully.',
                                type: 'success'
                            });
                            SelectedCampaign.Id = result.data.json.campaign.campaign_id;
                            $location.search('id', SelectedCampaign.Id);
                            $scope.Id = result.data.json.campaign.campaign_id;
                            $route.reload();
                            // $location.path('/setup-campaigns');
                        } else {
                            pinesNotifications.notify({
                                title: 'Create Campaign',
                                text: result.data.err,
                                type: 'error'
                            });
                        }
                    });

                }

                // send on server
                //results.push($http.post('/saveUser', user));
            };

            /*
             * Save Call Action
             */
            $scope.loadNextValue = function(oldVal, newVal, callActionIndex, key) {
                if($scope.addCallAction.route_type == 'IVR'){
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
                }else{
                    var target = Object.assign({}, $scope.names.fields);
                    delete target['Ring to Phone Number'];
                    if (newVal == "fields") {
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
                
                if($scope.addCallAction.route_type == 'IVR'){
                    if (rulesKeys[0] === "join_type") {
                        $scope.addCallAction.rule[callActionIndex][ruleDropDownKeys[0]].join_type = "";
                        delete $scope.ruleDropDown[callActionIndex][ruleDropDownKeys[0]].join_type;
                        if ($scope.ruleDropDown[callActionIndex][ruleDropDownKeys[0]].fields === undefined) {
                            $scope.ruleDropDown[callActionIndex] = {
                                0: {
                                    "fields": Object.keys($scope.names.fields)
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
                    }
                }else{
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
                    }
                }

                if (lastRule) {
                    $scope.addCallAction.rule[callActionIndex][key] = {};
                    $scope.ruleDropDown[callActionIndex][key] = {};
                    $scope.addCallAction.rule[callActionIndex][key].join_type = "";
                    $scope.ruleDropDown[callActionIndex][key].join_type = ["AND", "OR"];
                }
            };
            $scope.getTagClass = function(tagName) {
                console.log(tagName);
            }
            $scope.getGeoLocationList = function(){
                CampaignWebService.getGeoLocations().then(function(result) {
                    if (result.data.status != 'error') {
                        $scope.georoutelocations = [];
                        var locationData = result.data.json.locations;
                        locationData.forEach(function(loc) {
                            if (loc.count > 0) {
                                $scope.georoutelocations.push({
                                    id: loc.id,
                                    name: loc.name,
                                    routes: loc.routes
                                });
                            }
                        });
                        
                    }
                });
            };

            $scope.saveCallAction = function(callActionIndex, addNewRow) {
				$scope.disableSaveButton = true;
                var objSaveCallAction = [];
                var saveCallActionObject = [];
                var arrInvalid = [];
                var arrRequired = [];
                var sNextAction = {};
                $scope.invalidNumber = false;
                var isAnyError = false;
                callActionIndex = parseInt(callActionIndex);
                var addedAction = {
                    id: (callActionIndex + 1)
                };
                _.each($scope.callActions, function(callAction) {
                    $scope.errorEmail = '';
                    var count = 1;
                    var ruleCount = 1;
                    $scope.invalidNumber = false;
                    $scope.invalidEmailIds = [];
                    $scope.errors = {};
                    callActionIndex = callAction.id;
                    $scope.errors[callActionIndex] = {};
                    switch ($scope.addCallAction.actionOptions[callActionIndex]) {
                        case 'email_alert':
                            var sNextActionEmail = [];
                            sNextAction = $scope.addCallAction.email[callActionIndex];
                            if (sNextAction === undefined)
                                sNextAction = [];
                            for (var i = 0; i < sNextAction.length; i++) {
                                // var EMAIL_REGEXP = /^[_a-zA-Z0-9]+['a-zA-Z0-9]+[-a-zA-Z0-9]+[-a-zA-Z0-9]+['a-zA-Z0-9]*@[a-zA-Z0-9-]+(\.a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,4})*(\.[a-zA-Z]{2,2})/;
                                //var EMAIL_REGEXP = /^[\w-]+(\.[\w-]+)*@([a-z0-9-]+(\.[a-z0-9-]+)*?\.[a-z]{2,6}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/;
                                
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
                            for (var i = 0; i < sNextAction.length; i++) {
                                var tempHash = {
                                    id: i + 1 + randomNumber,
                                    text: sNextAction[i]
                                }
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
                        isAnyError = true;

                        if (arrRequired.length) {
                            messageText = 'field is required.';
                            if (arrRequired.length > 1) {
                                messageText = 'fields are required.';
                            }
                            pinesNotifications.notify({
                                title: 'Call Action',
                                text: '\'' + arrRequired.join(', ') + '\' ' + messageText,
                                type: 'error'
                            });
                            $scope.disableSaveButton = false;
                        }

                        if ($scope.errorEmail.length > 0) {
                            pinesNotifications.notify({
                                title: 'Call Action',
                                text: $scope.errorEmail,
                                type: 'error'
                            });
                            $scope.disableSaveButton = false;
                        }

                        if ($scope.invalidEmailIds.length > 0) {
                            messageText = 'Invalid email address entered. Please fix highlighted errors and re-save';
                            pinesNotifications.notify({
                                title: 'Call Action',
                                text: '\'' + $scope.invalidEmailIds.join(', ') + '\' ' + messageText,
                                type: 'error'
                            });
                            $scope.disableSaveButton = false;
                        } else if (arrInvalid.length) {
                            messageText = 'field is invalid.';
                            if (arrInvalid.length > 1) {
                                messageText = 'fields are invalid.';
                            }
                            pinesNotifications.notify({
                                title: 'Call Action',
                                text: '\'' + arrInvalid.join(', ') + '\' ' + messageText,
                                type: 'error'
                            });
                            $scope.disableSaveButton = false;
                        }


                        $(".invalidList").css({
                            "background-color": "red",
                            "border": "1px solid red"
                        });

                        arrInvalid = [];
                        arrRequired = [];

                        return false;
                    } else {
                        var objSaveCallAction = {
                            "provisioned_route_id": $scope.addCallAction.provisioned_route_id,
                            "action_id": $scope.addCallAction.action_id[callActionIndex],
                            "action_order": callActionIndex,
                            "rules": joinCallAction($scope.addCallAction.rule[callActionIndex]),
                            "action": $scope.addCallAction.actionOptions[callActionIndex],
                            "action_target": sNextAction
                        }
                        saveCallActionObject.push(objSaveCallAction);
                    }
                });

                if (!isAnyError) {
                    CampaignWebService.saveBulkCallActions(saveCallActionObject).then(function(result) {
                        $scope.addNewStep = true;
                        if (result.data.result === 'success') {
                            // $scope.addCallAction.callActionFormSubmitted[callActionIndex] = true;
                            pinesNotifications.notify({
                                title: 'Save Call Action',
                                text: 'Successfully saved Call Actions',
                                type: 'success'
                            });
							$scope.disableSaveButton = false;
                            $scope.addCallAction.action_id[callActionIndex] = result.data.json.insertId;
                            $route.reload();
                        } else {
                            pinesNotifications.notify({
                                title: 'Save Call Action',
                                text: result.data.err.data,
                                type: 'error'
                            });
                            $scope.disableSaveButton = false;
                        }
                    });
                } else {
                    return false;
                }
            };

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
                    if($scope.addCallAction.route_type == 'IVR'){
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
                    }else{
                        var target = Object.assign({}, $scope.names.fields);
                        delete target['Ring to Phone Number'];
                        if (actionsArray[key].fields)
                        rules.push({
                            "data_field": target[actionsArray[key].fields],
                        //   "operator"   : $scope.names["Ct_operators"][actionsArray[key]["operators"]],
                        //  "comparator" : comparator,
                        //  "operator"   : operator,
                            "operator": $scope.names.Ct_operators[actionsArray[key].operators],
                            "comparator": actionsArray[key].enum,
                            "join_type": join_type
                        });
                    }
                        
                }
                return rules;
            };

            /*$scope.setCFAct = function () {
                    //$scope.cfactive != $scope.cfactive;
                    $scope.cfactive = !$scope.cfactive;
            };*/
            $scope.setCreateAnother = function() {
                $scope.totalDataRows = parseInt($scope.totalDataRows) + 1 ;
                $scope.bCreateAnother = true;
            };

            $scope.getCallFlowList = function(campaignId) {
                CampaignWebService.getCampaign(campaignId, $scope.currentPage).then(function(result) {
                    if (result) {
                        if (result.data.result !== 'error') {
                            $scope.phoneNumbers = [];
                            $scope.isNew = true;
                            var campaignData = result.data.json.campaigns[0];
                            $scope.selectedCallFlow.name = "";
                            $scope.selectedCallFlow.callflowlabel = "";
                            $scope.selectedCallFlow.num = "";
                            var provisionedrouteIds = [];
                            var pool_ids = [];
                            // $scope.selectedCallFlow.channel = "";
                            $scope.bCreateAnother = false;
                            if ($scope.selectedCallFlow.id) {
                                $scope.selectedCallFlow.id = null;
                            }
                            if ($scope.selectedCallFlow.callflowOption === "numberPool") {
                                $scope.selectedCallFlow.numberPool = '';
                            }
                            campaignData.provisioned_routes.forEach(function(provRoute) {
                                if (provRoute.phone_numbers.length > 0) {
                                    var provCategory = '';
                                    var provSubCategory = '';
                                    var provChannelId = '';
                                    var showButtons = false;
                                    var f = (provRoute.status).charAt(0).toUpperCase();
                                    provRoute.status = f + (provRoute.status).substr(1);
                                    if (provRoute.channels[0]) {
                                        provCategory = provRoute.channels[0].category;
                                        provSubCategory = provRoute.channels[0].sub_category;
                                        provChannelId = provRoute.channels[0].id;
                                    }
                                     if(provisionedrouteIds.length === 0){
                                        provisionedrouteIds.push(provRoute.id);
                                        showButtons = true;
                                    }
                                    else if(provisionedrouteIds.indexOf(provRoute.id) === -1){
                                        showButtons = true;
                                        provisionedrouteIds.push(provRoute.id);
                                    }

                                    if (provRoute.phone_numbers[0].number) {
                                        if (angular.isUndefined(provRoute.pool)) {
                                            $scope.phoneNumbers.push({
                                                id: provRoute.id,
                                                phoneid: provRoute.phone_numbers[0].id,
                                                phone: provRoute.phone_numbers[0].number,
                                                phonep: provRoute.phone_numbers[0].pretty_number,
                                                name: provRoute.name,
                                                channels: provCategory + ":" + provSubCategory,
                                                channelId: provChannelId,
                                                status: provRoute.status,
                                                value: provRoute.call_value,
                                                rinterval: provRoute.repeat_interval,
                                                status2: provRoute.status,
                                                group: 4,
                                                groupName: 'admin',
                                                vendor_id: provRoute.phone_numbers[0].vendor_id,
                                                end_date: moment.utc(provRoute.referral_end_date).format('MM/DD/YYYY'),
                                                route_type: provRoute.route_type,
                                                ringto: provRoute.ringto,
                                                spam_guard: provRoute.spam_filter_enabled,
                                                sms_enabled: provRoute.sms_enabled ? provRoute.sms_enabled : false,
                                                showButtons : showButtons
                                            });
                                        } else {
                                            $scope.phoneNumbers.push({
                                                id: provRoute.id,
                                                phonep: provRoute.name,
                                                pooId: provRoute.pool[0].pool_id,
                                                quantity: provRoute.pool[0].quantity,
                                                state: provRoute.state,
                                                rate_center: provRoute.rate_center,
                                                pool_npa: provRoute.poolNPA,
                                                pool_nxx: provRoute.poolNXX,
                                                name: provRoute.name,
                                                channels: provCategory + ":" + provSubCategory,
                                                channelId: provChannelId,
                                                status: provRoute.status,
                                                value: provRoute.call_value,
                                                rinterval: provRoute.repeat_interval,
                                                status2: provRoute.status,
                                                group: 4,
                                                groupName: 'admin',
                                                vendor_id: provRoute.phone_numbers[0].vendor_id,
                                                end_date: moment.utc(provRoute.referral_end_date).format('MM/DD/YYYY'),
                                                route_type: provRoute.route_type,
                                                ringto: provRoute.ringto,
                                                spam_guard: provRoute.spam_filter_enabled,
                                                sms_enabled: provRoute.sms_enabled ? provRoute.sms_enabled : false,
                                                showButtons : showButtons
                                            });
                                        }
                                    } else {
                                        if (provRoute.pool !== undefined && provRoute.pool.length > 0 && pool_ids.indexOf(provRoute.pool[0].pool_id) === -1) {
                                            pool_ids.push(provRoute.pool[0].pool_id);
                                                $scope.phoneNumbers.push({
                                                    id: provRoute.id,
                                                    phonep: provRoute.name,
                                                    pooId: provRoute.pool[0].pool_id,
                                                    quantity: provRoute.pool[0].quantity,
                                                    state: provRoute.state,
                                                    rate_center: provRoute.rate_center,
                                                    pool_npa: provRoute.poolNPA,
                                                    pool_nxx: provRoute.poolNXX,
                                                    name: provRoute.name,
                                                    channels: provCategory + ":" + provSubCategory,
                                                    channelId: provChannelId,
                                                    status: provRoute.status,
                                                    value: provRoute.call_value,
                                                    rinterval: provRoute.repeat_interval,
                                                    status2: provRoute.status,
                                                    group: 4,
                                                    groupName: 'admin',
                                                    vendor_id: provRoute.phone_numbers[0].vendor_id,
                                                    end_date: moment.utc(provRoute.referral_end_date).format('MM/DD/YYYY'),
                                                    route_type: provRoute.route_type,
                                                    ringto: provRoute.ringto,
                                                    spam_guard: provRoute.spam_filter_enabled,
                                                    sms_enabled: provRoute.sms_enabled ? provRoute.sms_enabled : false,
                                                    showButtons : showButtons
                                                });
                                        } 
                                    }

                                    /* $scope.phoneNumbers.push({
                                             id:        provRoute.id,
                                             phoneid:   provRoute.phone_numbers[0].id,
                                             phone:     provRoute.phone_numbers[0].number,
                                             phonep:    provRoute.phone_numbers[0].pretty_number,
                                             name:      provRoute.name,
                                             channels:  provCategory + ":" + provSubCategory,
                                             channelId: provChannelId,
                                             status:    provRoute.status,
                                             value:     provRoute.call_value,
                                             rinterval: provRoute.repeat_interval,
                                             status2:   provRoute.status,
                                             group:     4,
                                             groupName: 'admin'
                                     })*/
                                }
                            });
                            $scope.singlecallForm.$setPristine();
                            $scope.showSubmit();
                            console.log('LOADED IN PHONE NUMBERS', $scope.phoneNumbers);
                        } else if (result.data.result === 'error') {
                            console.log('ERROR getCampaign CWS');
                        }
                    }
                });

                /*   CampaignWebService.getChannels().then(function (result) {
                                        if (result.data.result != 'error') {
                                                $scope.channels = result.data.json;
                                        }
                                });
                        */
                $scope.selectedCallFlow.address = '';
                $scope.onFocus($scope.selectedCallFlow.address);
            };

            $scope.proceedToCallFlowUpdate = function() {
                var dniRequiredFields =[];
                var dniInvalidFields =[];
                var requiredMessage;
                var invalidMessage;
                var HOST_REGEX = new RegExp(/^[a-z0-9\*]+([\-\.]{1}[a-z0-9\*]+)*\.[a-z\*]{1,5}(:[0-9]{1,5})?(\/.*)?$/i);
                var TTL_REGEX = new RegExp(/^[0-9]+$/);
                if($scope.selectedCallFlow.showDNI){
                    if(!HOST_REGEX.test($scope.selectedCallFlow.destination_url)){
                        dniInvalidFields.push('Host Domain');
                    }
                    if($scope.selectedCallFlow.dniType == 'session' && !TTL_REGEX.test($scope.selectedCallFlow.dni_ttl)){
                        dniInvalidFields.push('TTL');
                    }
                    if($scope.selectedCallFlow.destination_url == "" || $scope.selectedCallFlow.destination_url == undefined){
                        dniRequiredFields.push('Host Domain');
                    }
                    if($scope.selectedCallFlow.referrer == "" || $scope.selectedCallFlow.referrer == undefined){
                        dniRequiredFields.push('Referring Website');
                    }
                    if($scope.selectedCallFlow.dniType == "" || $scope.selectedCallFlow.dniType == undefined){
                        dniRequiredFields.push('DNI Type');
                    }
                    if($scope.selectedCallFlow.dni_element == "" || $scope.selectedCallFlow.dni_element == undefined){
                        dniRequiredFields.push('HTML Class');
                    }
                    if($scope.selectedCallFlow.dniType == 'session' && ($scope.selectedCallFlow.dni_ttl == "" || $scope.selectedCallFlow.dni_ttl == undefined)){
                        dniRequiredFields.push('TTL');
                    }
                }
                if(dniRequiredFields.length){
                    requiredMessage = 'field is required.';
                    if (dniRequiredFields.length > 1) {
                        requiredMessage = 'fields are required.';
                    }
                    $scope.showSubmit();
                    $scope.showSaveButton();
                    pinesNotifications.notify({
                        title: 'Tracking Number Details Form',
                        text: '\'' + dniRequiredFields.join(', ') + '\' ' + requiredMessage,
                        type: 'error'
                    });
                    return;
                }
                if(dniInvalidFields.length){
                    invalidMessage = 'field is invalid.';
                    if (dniInvalidFields.length > 1) {
                        invalidMessage = 'fields are invalid.';
                    }
                    $scope.showSubmit();
                    $scope.showSaveButton();
                    pinesNotifications.notify({
                        title: 'Tracking Number Details Form',
                        text: '\'' + dniInvalidFields.join(', ') + '\' ' + invalidMessage,
                        type: 'error'
                    });
                    return;
                }
                $scope.date_changed = false;
                if ($scope.cfactive === true && $scope.campActive !== true) {
                    $bootbox.confirm("Activating Tracking Number will also activate campaign, do you want to continue?", function(clickedOK) {
                        if (clickedOK) {
                            if (moment($scope.dateTime.startDate.date).isBefore(moment.tz($rootScope.timezone).format('DD-MM-YYYY hh:mm A'))) {
                                $scope.dateTime.startDate.date = moment.tz($rootScope.timezone).format('DD-MM-YYYY hh:mm A');
                            }
                            $scope.dateTime.endDate.date = null;
                            $scope.date_changed = true;
                            $scope.saveCallFlow();
                        } else {
                            $scope.showSubmit();
                            $scope.showSaveButton();
                        }
                    });
                } else {
						if(!$scope.isNewCamp && $scope.cfactive!==true)  {
                        var tracking_number= $scope.selectedCallFlow.phonep != undefined ? ($scope.selectedCallFlow.phonep).replace(/[&\/\\#,+()$~%'":*?<>{}|-]/g, '').replace(/ +/g, "").toString():$scope.selectedCallFlow.phonep;
                        CampaignWebService.checkOutboundCallerId(tracking_number).then(function(result) {
                            if (result.data.status === "success") {
								if($scope.originalcfactive == true ) {
								     if(parseInt(result.data.json[0].count) > 0){
                                       var  msg = "Are you sure you want to deactivate this Tracking Number as it is selected as a Caller ID in outbound route?"
                                    }else{
                                          msg = "Are you sure you want to deactivate this Tracking Number?";
									}
									$bootbox.confirm(msg, function(clickedOK) {
                                        if (clickedOK) {
                                                $scope.saveCallFlow();
                                            } else {
                                                $scope.showSubmit();
                                                $scope.showSaveButton();
                                            }
                                        
                                    });
                           
								}else{
									$scope.saveCallFlow();
								}
							}
                        });

                   }else{
                        $scope.saveCallFlow();
                   }
                }
            };

            function validateRingToNum(percentInfo){
                var errors = false;
                var invalidnum = []
                _.each(percentInfo.overflowNumbers,function(number){
                    if(percentInfo.openOverflowBox){
                        if(!number.overflowNumber || UserWebService.unMaskData(number.overflowNumber).length !== 10){
                            invalidnum.push(number.overflowNumber);
                            errors = true;
                        }
                    }                    
                })
                return errors;
            }

            function validateOverFlow(overflowNumbers, ring_to_number,phone,simultaneous){
                var indvalidNumbers = [];
                var unmaskOfNumbers=[];
                var ringToNumberarr=[];
                var overFlownumberArr = [];
                var overflowTrackingRingtoArr=[]
                var errors = false;
                if(!$scope.openOverflowBox)
                    return false;
                    _.each(overflowNumbers, function(number){
                        if($scope.openOverflowBox){
                        if(number.overflowNumber==''){
                            pinesNotifications.notify({
                            title: 'Tracking Number Details Form',
                            text: 'Please enter the Overflow Number!',
                            type: 'error'
                        });
                        errors = true;
                        return true;
                        }else{
                            number.overflowNumber = UserWebService.unMaskData(number.overflowNumber);

                            if(number.overflowNumber.length !== 10 || number.overflowNumber.slice(0, 1) === "0"){
                            indvalidNumbers.push(number.overflowNumber);
                            }
                            
                            if((number.overflowNumber === ring_to_number) && (number.overflowNumber === phone)){
                                overflowTrackingRingtoArr.push(number.overflowNumber);
                            }else{
                                if(number.overflowNumber === ring_to_number){
                                    ringToNumberarr.push(number.overflowNumber);
                                }
                                if(number.overflowNumber === phone){
                                    overFlownumberArr.push(number.overflowNumber);    
                                }
                            }
                            
                        }
                    }
                    });
                    _.each(overflowNumbers,function(number){
                        var overflowNum = UserWebService.unMaskData(number.overflowNumber);
                        unmaskOfNumbers.push({'overflowNumber' :number.overflowNumber, 'unmaskNumber' : overflowNum, 'rings':number.rings});   
                     });

                     if(!_.isEmpty(overflowTrackingRingtoArr))
                     {
                         pinesNotifications.notify({
                             title: 'Simple Call Route',
                             text: 'Overflow Numbers and Ring To Number can not be same as Tracking Number',
                             type: 'error'
                              });
                             errors = true;
                     }else{
                        if(ring_to_number === phone){
                            pinesNotifications.notify({
                                title: 'Simple Call Route',
                                text: 'Ring To number can not be same as tracking number',
                                type: 'error'
                            });
                            errors = true;
                        }

                        if(!_.isEmpty(overFlownumberArr))
                       {
                           pinesNotifications.notify({
                               title: 'Simple Call Route',
                               text: 'Overflow can not be same as tracking number',
                               type: 'error'
                               });
                               errors = true;
                       }
                       if(!_.isEmpty(ringToNumberarr) && simultaneous === true){
                        pinesNotifications.notify({
                            title: 'Simple Call Route',
                            text: 'Overflow Number can not be same as Ring to Phone Number in simultaneous',
                            type: 'error'
                            });
                            errors = true;
                       }
                     }
                     if((unmaskOfNumbers.length != _.uniq(unmaskOfNumbers, 'overflowNumber').length) && simultaneous === true){
                        pinesNotifications.notify({
                           title: 'Simple Call Route',
                           text: 'Duplicate Overflow Numbers are not allowed in simultaneous',
                           type: 'error'
                       });
                        errors = true;
                       }
                    if(indvalidNumbers.length > 0){
                        pinesNotifications.notify({
                            title: 'Simple Call Route',
                            text: 'Overflow Numbers are not valid',
                            type: 'error'
                        });
                        errors = true;
                    }
                return errors;
            }
            var GeoRte = function(geoData){
                var ovrFlowNumbs = [];
                var defaultNumber = null;
                _.forEach(geoData.overflowNumbers,function(num){
                    if(num.overflowNumber !== '' && num.overflowNumber !== undefined){
                        var overflowNumber = UserWebService.unMaskData(num.overflowNumber);
                        if(!overflowNumber || overflowNumber.length < 10){
                            isOverflowNumbersValid = true;
                        }
                        ovrFlowNumbs.push({'unmaskNumber' :overflowNumber, 'overflowNumber':num.overflowNumber,'rings':num.rings,'overflow_order':num.overflow_order});
                    }
                });
                geoData.overflowNumbers = ovrFlowNumbs;
                if(geoData.ringtoNum){
                    defaultNumber = UserWebService.unMaskData(geoData.ringtoNum);
                }
                var geoDataIvr = {
                    openOverflowBox: geoData.openOverflowBox,
                    overflowNumbers: geoData.overflowNumbers,
                    isSimultaneousRing: geoData.isSimultaneousRing,
                    geo_rt : {
                        strategy: geoData.geoRoute.routeBy                        
                    },
                    geo_opt : {
                        location_ids: geoData.geoRoute.geoList,
                        default_ringto: defaultNumber
                    },
                  };
                  if (geoData.geoRoute.routeBy !== "Claimed" && geoData.geoRoute.routeBy !== "claimedState") {
                    var radius = geoData.geoRoute.radius;
                    geoDataIvr.geo_rt.radius = radius;
                }
                return geoDataIvr;
            }

            var ScheduleRte = function(scheduleData){
                var scheduleOptions = [];
                _.forEach(scheduleData, function(schedule){
                    var ovrFlowNumbs = [];
                    _.forEach(schedule.overflowNumbers, function(num){
                        if(num.overflowNumber !== '' && num.overflowNumber !== undefined){
                            var overflowNumber = UserWebService.unMaskData(num.overflowNumber);
                            if(!overflowNumber || overflowNumber.length < 10){
                                isOverflowNumbersValid = true;
                            }
                            ovrFlowNumbs.push({'unmaskNumber' :overflowNumber, 'overflowNumber':num.overflowNumber,'rings':num.rings,'overflow_order':num.overflow_order});
                        }
					});

                    var days = [];
                    _.forEach(schedule.days, function(day){
		                if(day.id !== '' && day.id !== undefined){
		                    days.push({'id' :day.id});
		                }
                    });
                    var option = {
                        "scheduleId" : schedule.scheduleId,
                        "days":days,
                        "fromTime" : schedule.fromTime,
                        "toTime" : schedule.toTime,
                        "overflowNumbers" : ovrFlowNumbs,
                        "simultaneousRings" : schedule.simultaneousRings,
                        "activateVoicemail" : schedule.activateVoicemail,
                        "openOverflowBox" : schedule.openOverflowBox
                    }
                    if(schedule.ringTo){
                        option.ringTo = UserWebService.unMaskData(schedule.ringTo);
                    }
                    scheduleOptions.push(option);
                });

                return scheduleOptions;
            }
            var SimpleRte = function(ivrs){
                var ovrFlowNumbs = [];
                _.forEach(ivrs.overflowNumbers,function(num){
                    if(num.overflowNumber !== '' && num.overflowNumber !== undefined){
                        var overflowNumber = UserWebService.unMaskData(num.overflowNumber);
                        if(!overflowNumber || overflowNumber.length < 10){
                            isOverflowNumbersValid = true;
                        }
                        ovrFlowNumbs.push({'unmaskNumber' :overflowNumber, 'overflowNumber':num.overflowNumber,'rings':num.rings,'overflow_order':num.overflow_order});
                    }
                });
                ivrs.overflowNumbers = ovrFlowNumbs;
                var simpleData = {
                    openOverflowBox: ivrs.openOverflowBox,
                    overflowNumbers: ivrs.overflowNumbers,
                    ringtoNum: UserWebService.unMaskData(ivrs.ringtoNum),
                    isSimultaneousRing: ivrs.isSimultaneousRing 
                };
                return simpleData;
            }
            var HungupRte = function(ivrs){
                var HungupData = {
                    ringtoNum: 'hangup'
                };
                return HungupData;
            }
            var IVRte = function(ivrs){
                return jsonFormationIvr(ivrs.ivrActions);
            }

            var jsonFormationIvr = function(ivrs){ 
                var Dataarray = [];
                _.each(ivrs, function(ivr){
                    if(ivr.TTSIVRSelected == true){
                        ivr.message_type = "text";
                        ivr.message = ivr.voicepromptTTSText;
                    }else{
                        ivr.message_type = "file"
                        ivr.message = ivr.voicepromptFileName;
                    }

                    if(ivr.TTSWhisperSelected == true){
                        ivr.whisper_message_type = "text";
                        ivr.whisper_message = ivr.whisperTTSText;
                    }else{
                        ivr.whisper_message_type = "file"
                        ivr.whisper_message = ivr.whisperFileName;
                    }

                    var objData = {
                        action :  ivr.action,
                        action_order : ivr.action_order,
                        activateVoiceMail: ivr.activateVoiceMail,
                        destination: ivr.destination,
                        id:ivr.id ,
                        ouid: $rootScope.currentOUId,
                        level: ivr.level,
                        record_enabled: ivr.recordCall,
                        back_press:ivr.previousmenu,
                        keypress: ivr.keypress,
                        message: ivr.message,
                        message_type: ivr.message_type
                    }

                    if(ivr.action == 'simple' || ivr.action == 'geo' || ivr.action == 'hangup' || ivr.action == 'schedule'){
                        objData.whisper_message = ivr.whisper_message;
                        objData.whisper_message_type =  ivr.whisper_message_type;
                        objData.whisper_enabled = ivr.whisperPrompt;
                        objData.record_enabled = ivr.recordCall;
                        objData.play_disclaimer = ivr.playDisclaimer;
                        if(ivr.action == 'schedule'){
                            objData.record_enabled = ivr.scheduleRoute.recordCall;
                            objData.play_disclaimer = ivr.scheduleRoute.playDisclaimer;
                        }
                    }else{
                        objData.whisper_message = '';
                        objData.whisper_message_type =  'text';
                        objData.whisper_enabled = false;
                    }

                    if(ivr.action == 'interactiveVoice'){
                            var ivrData = IVRte(ivr);
                            objData.ivrData = ivrData;
                    }
                    else if(ivr.action == 'simple'){
                            var ringToData = SimpleRte(ivr);
                            objData.ringToData = ringToData;
                    }
                    else if(ivr.action == 'geo'){
                            var geoData = GeoRte(ivr);
                            objData.geoData = geoData;
                    }else if(ivr.action == 'schedule'){
                        var scheduleRoute = {};
                        scheduleRoute.timezone = ivr.scheduleRoute.timezone.value;
                        if(ivr.scheduleRoute.default_ringto){
                            scheduleRoute.default_ringto = UserWebService.unMaskData(ivr.scheduleRoute.default_ringto);
                        }
                        scheduleRoute.activate_voicemail = ivr.scheduleRoute.activate_voicemail;
                        scheduleRoute.schedules = ScheduleRte(ivr.scheduleRoute.scheduleInfo);
                        objData.scheduleRoute = scheduleRoute;
                    }else if(ivr.action == 'hangup'){
                        var hungupData = HungupRte(ivr);
                        objData.ringToData = hungupData;
                    }
                    Dataarray.push(objData);
                });
                return Dataarray;
            };
            $scope.keycheck =false;
            $scope.isOverlappingSchedules ={
                levelOne: false,
                levelTwo: false,
                levelThird: false
            }
            var validateIVR = function(cActions ,level){
                var invalidFields =[];
                var scheduleInvalidFields = [];
                //for level =1             
                for (var i = cActions.length - 1; i >= 0; i--) {
                    if( cActions[i].keypress === '' || cActions[i].keypress === undefined || cActions[i].keypress === null){
                        invalidFields.push('Keypress');
                        }
                    if( cActions[i].destination === '' || cActions[i].destination === undefined){
                        invalidFields.push('Destination');
                        }
                    if((cActions[i].voicepromptTTSText ==='' || cActions[i].voicepromptTTSText === undefined) && (cActions[i].voicepromptURL === '' || cActions[i].voicepromptURL === undefined) && cActions[i].action === "interactiveVoice"){
                        invalidFields.push('Voice Prompt');
                    }
                    if(i ===  cActions.length - 1){
                        if( level !== 1 && (cActions[i].previousmenu  === "" ||   cActions[i].previousmenu === undefined || cActions[i].previousmenu  === null)){
                            invalidFields.push('Go Back to the previous menu');
                        }
                    }
                     if( cActions[i].action !== "interactiveVoice"){
                     // Rote type = simple and geo
                        if(  cActions[i].recordCall){
                            if(cActions[i].playDisclaimer === "true" || cActions[i].playDisclaimer === "" || cActions[i].playDisclaimer === undefined){
                                invalidFields.push('Play call recording disclaimer');
                            }
                       }
                       if(cActions[i].whisperPrompt){
                         if( (cActions[i].whisperTTSText === undefined || cActions[i].whisperTTSText === "" ) && ( cActions[i].whisperURL === '' || cActions[i].whisperURL === undefined)){
                            invalidFields.push('Play whisper message before connecting');
                         } 
                       }
                       // Rote type =simple
                        if( cActions[i].action === 'simple'){
                            if(  cActions[i].ringtoNum === undefined || cActions[i].ringtoNum === '' ||  cActions[i].ringtoNum.replace(/[^0-9]+/g, '').length !== 10){
                                invalidFields.push('Ring to Phone Number');
                            }
                           
                        }
                           // Rote type =geo
                        if( cActions[i].action === "geo"){
                            //Route By
                            if( cActions[i].geoRoute.routeBy === '' || cActions[i].geoRoute.routeBy === undefined){
                                invalidFields.push('Route By');
                            }
                            //Location List
                             if( cActions[i].geoRoute.geoList === '' || cActions[i].geoRoute.geoList === undefined){
                                invalidFields.push('Location List');
                            }
                            if( cActions[i].ringtoNum === undefined || cActions[i].ringtoNum === '' ||  cActions[i].ringtoNum.replace(/[^0-9]+/g, '').length !== 10){
                            invalidFields.push('Default Number');
                            }
                            if((cActions[i].geoRoute.routeBy === 'Zipcode' || cActions[i].geoRoute.routeBy === 'Npa') && (cActions[i].geoRoute.radius === null ||cActions[i].geoRoute.radius === '' || cActions[i].geoRoute.radius === undefined)){
                                invalidFields.push('Proximity Limit');    
                            }
                          
                        }
                        // Route type = schedule
                        if( cActions[i].action === "schedule"){
                            if(cActions[i].scheduleRoute.isValid){
                            //     if(cActions[i].scheduleRoute.error && (cActions[i].scheduleRoute.error !== undefined || cActions[i].scheduleRoute.error != '')){
                            //         scheduleInvalidFields.push(cActions[i].scheduleRoute.error);
                            //     }
                                if(level === 1){
                                    $scope.isOverlappingSchedules.levelOne = false;
                                }else if(level === 2){
                                    $scope.isOverlappingSchedules.levelTwo = false;
                                }else{
                                    $scope.isOverlappingSchedules.levelThird = false;
                                }
                            }
                            if( cActions[i].scheduleRoute.timezone ==='' || cActions[i].scheduleRoute.timezone === undefined || cActions[i].scheduleRoute.timezone === null){
                                invalidFields.push('Time Zone');
                            }
                            var j=0;
                            _.each(cActions[i].scheduleRoute.scheduleInfo,function(scheduleInfo){
                                if(scheduleInfo.fromTime === '' || scheduleInfo.fromTime === undefined || scheduleInfo.fromTime === null){
                                    invalidFields.push('FromTime');
                                }
                                if(scheduleInfo.toTime === '' || scheduleInfo.toTime === undefined || scheduleInfo.toTime === null){
                                    invalidFields.push('ToTime');
                                }
                                if(scheduleInfo.days.length === 0){
                                    invalidFields.push('Days');
                                }
                                if(scheduleInfo.ringTo === '' || scheduleInfo.ringTo === undefined || scheduleInfo.ringTo === null || scheduleInfo.ringTo.replace(/[^0-9]+/g, '').length !== 10){
                                    invalidFields.push('Ring to Phone Number');
                                }
                               _.each(scheduleInfo.overflowNumbers, function (overFlowNumber) {
                                    if(scheduleInfo.openOverflowBox && (overFlowNumber.overflowNumber === ""|| overFlowNumber.overflowNumber === undefined || overFlowNumber.overflowNumber === null || overFlowNumber.overflowNumber.replace(/[^0-9]+/g, '').length !== 10)){
                                        invalidFields.push('Overflow Ring to Phone Number');
                                    }
                                });
                                if($scope.isOverlappingSchedules.levelOne || $scope.isOverlappingSchedules.levelTwo || $scope.isOverlappingSchedules.levelThird) {
                                    return false;
                                }
                                $scope.checkCurrentIVRSchedule(j,cActions[i].scheduleRoute.scheduleInfo,level);
                                j+=1;
                            });
                        }
                    }else{ 
                        var newLevel = level +1;
                         validateIVR(cActions[i].ivrActions ,newLevel)
                    }
                  
                }
                for(var j = 0; j< cActions.length; j++){
                    if( cActions[j].keypress===cActions[j].previousmenu)
                    {
                        if(level==2){
                            pinesNotifications.notify({
                                title: '2nd Level IVR',
                                text: 'keypress and backpress value should not be same',
                                type: 'error'
                            });
                        }
                            if(level==3){
                                    pinesNotifications.notify({
                                        title: '3rd Level IVR',
                                        text: 'keypress and backpress value should not be same',
                                        type: 'error'
                                    });
                                }
                            $scope.keycheck=true;
                        }
                     }
                    if(invalidFields.length > 0 || scheduleInvalidFields.length > 0){
                        i = 0;
                       return showMsg(invalidFields,scheduleInvalidFields, level);
                    }
            }
            function findDuplicates(arra1) {
                var object = {};
                var result = [];                    
                arra1.forEach(function (item) {
                  if(!object[item])
                    object[item] = 0;
                    object[item] += 1;
                })                    
                for (var prop in object) {
                   if(object[prop] >= 2) {
                       result.push(prop);
                   }
                }                    
                return result;
            }
            var showMsg = function(invalidFields,scheduleInvalidFields, level){
                var duplicatesinvalidFields = findDuplicates(invalidFields);
                if(invalidFields.length > 0){
                    var msglastpart = (invalidFields.length === 1 && duplicatesinvalidFields.length === 0) ? ' field is required.':' fields are required.';
                    invalidFields = _.uniq(invalidFields);
                    $scope.IVRInvalidFields.push(invalidFields);
                    var  msg = level == 1 ? '1st' : (level === 2 ? "2nd" : "3rd" );
                    pinesNotifications.notify({
                        title: msg +' level IVR Form',
                        text: invalidFields.toString()+ msglastpart,
                        type: 'error'
                    });
                    return false;
                }
                if(scheduleInvalidFields.length > 0){
                    var  msg = level == 1 ? '1st' : (level === 2 ? "2nd" : "3rd" );
                    scheduleInvalidFields = _.uniq(scheduleInvalidFields);
                    $scope.scheduleInvalidFields.push(scheduleInvalidFields);
                    pinesNotifications.notify({
                        title: msg +' level IVR Form',
                        text: scheduleInvalidFields.toString(),
                        type: 'error'
                    });
                    return false;
                }
            };

            $scope.checkSMSFeature = function(cb){
                var showSmsBootbox = false;
                var smsPrompt = "SMS feature will be enabled on the Tracking Number in 4-5 business days";
                if($scope.isNew && $scope.selectedCallFlow.smsActive){
                    showSmsBootbox = true;
                    smsPrompt = "SMS feature will be enabled on the Tracking Number in 4-5 business days";
                }else if($scope.selectedCallFlow.id && ($scope.selectedCallFlow.smsActive !== $scope.selectedCallFlow.oldSmsActive)){
                    showSmsBootbox = true;
                    if($scope.selectedCallFlow.smsActive){
                        smsPrompt = "SMS feature will be enabled on the Tracking Number in 4-5 business days";
                    }else{
                        smsPrompt = "SMS feature will be disabled from the Tracking Number in 4-5 business days";
                    }
                }else{
                    showSmsBootbox = false
                }

                if(showSmsBootbox){
                    $bootbox.confirm(smsPrompt, function(clickedOK) {
                        if (clickedOK) {
                            cb(clickedOK);
                        } else {
                            cb(false);
                        }
                    });
                }else{
                    cb(true);
                }
            }

            $scope.checkLDM = function(cb) {
                var body = { };

                body.trackingNumber = '';
                body.ringToNumbers = [];

                if($scope.isNew) {
                    if($scope.selectedCallFlow.callflowOption === "reservedNumber") {
                        body.trackingNumber  = $scope.selectedCallFlow.num.number.toString();
                    } else {
                        body.trackingNumber = $scope.selectedCallFlow.address.substring(0, 3);
                    }
                } else {
                    body.trackingNumber = $scope.selectedCallFlow.phonep.replace(/[^0-9]+/g, '').toString();
                }

                switch ($scope.selectedCallFlow.routetype) {
                    case "PercentageBasedRoute":
                        $scope.percentInfo.forEach(function(overflowNumber__){
                            body.ringToNumbers.push(overflowNumber__.ringToNum.replace(/[^0-9]+/g, '').substring(0, 3));
                            overflowNumber__.overflowNumbers.forEach(function(childOverflow__){
                                body.ringToNumbers.push(childOverflow__.overflowNumber.replace(/[^0-9]+/g, '').substring(0, 3));
                            });
                        });
                        break;
                    case "outbound": 
                        break;    
                    case "voicemail":
                    case "hangup":    
                        //these dont have not have ring to number, so do nothing
                        cb(true)
                        return;
                    case "schedule":
                        for (var i = 0; i < $scope.scheduleInfo.length; i++) {
                            var ringToNumbers = [];

                            ringToNumbers = _.map($scope.scheduleInfo[i].overflowNumbers, 'overflowNumber');
                            ringToNumbers.push($scope.scheduleInfo[i].ringTo);
                            ringToNumbers.push($scope.selectedCallFlow.ringtoNum);
                            ringToNumbers = _.compact(ringToNumbers);

                            ringToNumbers.forEach(function(ringToNum__) {
                                body.ringToNumbers.push(ringToNum__.replace(/[^0-9]+/g, '').substring(0, 3));
                            });
                        }
                        break;    
                    case "ivr":
                        var ivrActions = _.sortBy($scope.ivrActions, 'action_order');


                        if(_.filter(ivrActions, function(ivrAction__) { return ivrAction__.action  === 'hangup'; })
                        .length === ivrActions.length) {
                            cb(true);
                            return;
                        }
                       
                        _.each(ivrActions,function(item){
                            if(item.ringtoNum) {
                                body.ringToNumbers.push(item.ringtoNum.replace(/[^0-9]+/g, '').substring(0, 3));
                            }

                            if(item.overflowNumbers) {
                                item.overflowNumbers.forEach( function(overflowNumber__) {
                                    body.ringToNumbers.push(overflowNumber__.overflowNumber.replace(/[^0-9]+/g, '').substring(0, 3));
                                });
                            }
                            if(item.scheduleRoute.scheduleInfo && item.action == 'schedule'){
                                for (var i = 0; i < item.scheduleRoute.scheduleInfo.length; i++) {
                                    var ringToNumbers = [];
                                    ringToNumbers = _.map(item.scheduleRoute.scheduleInfo[i].overflowNumbers, 'overflowNumber');
                                    ringToNumbers.push(item.scheduleRoute.scheduleInfo[i].ringTo);
                                    ringToNumbers.push(item.scheduleRoute.default_ringto);
                                    ringToNumbers = _.compact(ringToNumbers);
                                    ringToNumbers.forEach(function(ringToNum__) {
                                        body.ringToNumbers.push(ringToNum__.replace(/[^0-9]+/g, '').substring(0, 3));
                                    });
                                }
                            }
                            if(item.ivrActions.length > 0){
                                _.each(item.ivrActions,function(item1){
                                    if(item1.ringtoNum){
                                        body.ringToNumbers.push(item1.ringtoNum.replace(/[^0-9]+/g, '').substring(0, 3));
                                    }

                                    if(item1.overflowNumbers) {
                                        item1.overflowNumbers.forEach(function (overflowNumber__) {
                                            body.ringToNumbers.push(overflowNumber__.overflowNumber.replace(/[^0-9]+/g, '').substring(0, 3));
                                        });
                                    }
                                    if(item1.scheduleRoute.scheduleInfo && item1.action == 'schedule'){
                                        for (var i = 0; i < item1.scheduleRoute.scheduleInfo.length; i++) {
                                            var ringToNumbers = [];
                                            ringToNumbers = _.map(item1.scheduleRoute.scheduleInfo[i].overflowNumbers, 'overflowNumber');
                                            ringToNumbers.push(item1.scheduleRoute.scheduleInfo[i].ringTo);
                                            ringToNumbers.push(item1.scheduleRoute.default_ringto);
                                            ringToNumbers = _.compact(ringToNumbers);
                                            ringToNumbers.forEach(function(ringToNum__) {
                                                body.ringToNumbers.push(ringToNum__.replace(/[^0-9]+/g, '').substring(0, 3));
                                            });
                                        }
                                    }
                                    if(item1.ivrActions && item1.ivrActions.length > 0){
                                        _.each(item1.ivrActions,function(item2){ 
                                            body.ringToNumbers.push(item2.ringtoNum.replace(/[^0-9]+/g, '').substring(0, 3)); 

                                            if(item2.overflowNumbers) {
                                                item2.overflowNumbers.forEach(function (overflowNumber__) {
                                                    body.ringToNumbers.push(overflowNumber__.overflowNumber.replace(/[^0-9]+/g, '').substring(0, 3));
                                                });
                                            }
                                            if(item2.scheduleRoute.scheduleInfo && item2.action == 'schedule'){
                                                for (var i = 0; i < item2.scheduleRoute.scheduleInfo.length; i++) {
                                                    var ringToNumbers = [];
                                                    ringToNumbers = _.map(item2.scheduleRoute.scheduleInfo[i].overflowNumbers, 'overflowNumber');
                                                    ringToNumbers.push(item2.scheduleRoute.scheduleInfo[i].ringTo);
                                                    ringToNumbers.push(item2.scheduleRoute.default_ringto);
                                                    ringToNumbers = _.compact(ringToNumbers);
                                                    ringToNumbers.forEach(function(ringToNum__) {
                                                        body.ringToNumbers.push(ringToNum__.replace(/[^0-9]+/g, '').substring(0, 3));
                                                    });
                                                }
                                            }
                                        });   
                                    }
                                });
                            }
                        });

                        break;    
                    default:
                        body.ringToNumbers = [$scope.selectedCallFlow.ringtoNum.replace(/[^0-9]+/g, '')];
                }

                if($scope.overflowNumbers) {
                    $scope.overflowNumbers.forEach(function(overflowNumber__) {
                        body.ringToNumbers.push(overflowNumber__.overflowNumber.replace(/[^0-9]+/g, '').substring(0, 3));
                    });
                }

				CampaignWebService.checkLDM(body).then(function(res) {
					if(res.data.isLDM) {
						var msg = "The " + res.data.numberType + " you have selected belongs to " + res.data.rateCenter + " rate center. " + 
						"If a call is answered on this number, the minutes would be charged as long distance minutes. Click OK to continue.";
						$bootbox.confirm(msg, function(result) {
							cb(result);
						});
					} else {
                        cb(true);
                    }
				});

            }
            //save call flow
            $scope.saveCallFlow = function() {
                $scope.IVRInvalidFields = [];
                $scope.scheduleInvalidFields = [];
                if ($scope.singlecallForm.$invalid) {
                    $scope.showSubmit();
                    $scope.showSaveButton();
                    return;
                }
                
                //var invalid = $scope.checkForValidSchedules();
                if($scope.selectedCallFlow.routetype == 'schedule'){
                    for(var i=0;i<$scope.scheduleInfo.length;i++){

                        if($scope.scheduleInfo[i].days.length == 0){
                            pinesNotifications.notify({
                                title: 'Following a schedule',
                                text: 'Please select Schedule Day(s) of the week ',
                                type: 'error'
                            });
                            $scope.showSubmit();
                            $scope.showSaveButton();
                            return;
                        }
                        if($scope.selectedCallFlow.num.number !== undefined){

                            if(($scope.selectedCallFlow.num.number != undefined && UserWebService.unMaskData($scope.scheduleInfo[i].ringTo) !=undefined) && ($scope.selectedCallFlow.num.number === UserWebService.unMaskData($scope.scheduleInfo[i].ringTo))){
                                pinesNotifications.notify({
                                    title: 'Tracking Number Details Form',
                                    text: 'Ring to phone number cannot be same as tracking number.',
                                    type: 'error'
                                });
                                $scope.showSubmit();
                                $scope.showSaveButton();
                                return;
                                }
                        }
                      


                        if(validateSchedule(i)){
                            $scope.checkCurrentSchedule(i);
                            return;
                        }
                        
                    }
                    
                }
                if($scope.selectedCallFlow.routetype == 'ivr'){
                    validateIVR($scope.ivrActions,1);
                    if($scope.IVRInvalidFields.length > 0 || $scope.scheduleInvalidFields.length > 0){
                        $scope.showSubmit();
                        $scope.showSaveButton();
                        return;
                    }
                     if($scope.keycheck){
                        $scope.showSubmit();
                        $scope.showSaveButton();
                        $scope.keycheck=false;
                        return;
                    }
                    if($scope.isOverlappingSchedules.levelOne || $scope.isOverlappingSchedules.levelTwo || $scope.isOverlappingSchedules.levelThird){
                        $scope.showSubmit();
                        $scope.showSaveButton();
                        return;
                    }
                }
                
                
                        
                //     }
                // if($scope.showAddSchedule || scheduleData.days.length == 0){
                //     //console.log($scope.duplicateSchelduleID);
                //     return;
                   // })
                // if($scope.duplicateScheldule){
                //      pinesNotifications.notify({
                //          title: 'Following a schedule',
                //          text: 'Check for Overlaping Schedule For ' + ($scope.duplicateSchelduleID + 1) + " Schedule",
                //          type: 'error'
                //      });
                //     $scope.showAddSchedule = true;
                //     $scope.submitted1 = true;
                //     $scope.formSubmit1 = true;
                //    /* $scope.submitted1 = false;
                //     $scope.formSubmit1 = false;*/
                //     return;
                // }
                
               /* if($scope.showAddSchedule){
                    pinesNotifications.notify({
                        title: 'Following a schedule',
                        text: 'Please enter days for schedule',
                        type: 'error'
                    });
                    console.log($scope.duplicateSchelduleID);
                    return;
                }
*/
                var radius = null;
                var geoOus = [];
                var location = null;
                var routeBy = null;
                var whisper_enabled = null;
                var whisper_type = ''; //null;
                var whisper_message = ''; //null;
                var message_enabled = null;
                var message_type = '';
                var message = '';
                var pool_phone_numbers = [];
                var state = "";
                var rc1 = [];
                var numbers = [];
                var pool = {};
                var insertPoolId;
                var numberPoolFormSubmit = false;
                var vpdta = [];
                var poolData = {};
                var status;
                var browserTZ = "";

                if (this.selectedCallFlow.value == 'undefined')
                    this.selectedCallFlow.value = null;
                if (this.selectedCallFlow.rinterval == 'undefined')
                    this.selectedCallFlow.rinterval = null;

                $scope.selectedCallFlow.ringtoNum = UserWebService.unMaskData($scope.selectedCallFlow.ringtoNum);
                $scope.flowname = this.selectedCallFlow.name;
                $scope.category = this.selectedCallFlow.channel.category;
                $scope.sub_category = this.selectedCallFlow.channel.sub_category;
                $scope.callFlowvalue = this.selectedCallFlow.value;
                $scope.callFlowrinterval = this.selectedCallFlow.rinterval;

                status = ($scope.campActive !== true ? 'inactive' : 'active');
                $scope.callFlowstatus = ($scope.cfactive !== true ? 'inactive' : 'active');

                if (status === "inactive" && $scope.dateTime.endDate.date !== undefined && $scope.showReferral && $scope.referralChecked) {
                    console.log("In referral condition **************");
                    var referralNumber = $scope.referralNumber.replace(/\D/g, "");
                    console.log(referralNumber.length);
                    if (moment($scope.dateTime.endDate.date).isBefore(moment.tz($rootScope.timezone).format('DD MMMM YYYY hh:mm A')) && referralNumber.length === 10) {
                        $scope.callFlowstatus = "referral";
                    }
                }
                $scope.browserAgentName = $window.navigator.userAgent;
               if($scope.browserAgentName.indexOf("firefox")>-1)
               {
                    browserTZ = moment($scope.dateTime.startDate.date).isBefore(moment.tz($rootScope.timezone).format('DD-MMMM-YYYY hh:mm A'))
               }
               if($scope.browserAgentName.indexOf("chrome")>-1){
                    browserTZ = moment($scope.dateTime.startDate.date).isAfter(moment.tz($rootScope.timezone).format('DD-MMMM-YYYY hh:mm A'))
               }
            // open section to show error if repeat_interval is not added
            if (($scope.selectedCallFlow.rinterval === null || $scope.selectedCallFlow.rinterval === undefined) && $scope.selectedCallFlow.routetype !=='outbound' && $scope.selectedCallFlow.routetype !=='voicemail') {
                $scope.showSaveButton();
                $scope.isAdvancedTrackingNumbersOpen = true;
                pinesNotifications.notify({
                    title: 'Save Tracking Number',
                    text: 'Repeat Interval, field is required.',
                    type: 'error'
                });
                return;
            }
            if (($scope.selectedCallFlow.voicemail_rings_count === null || $scope.selectedCallFlow.voicemail_rings_count === undefined || $scope.selectedCallFlow.voicemail_rings_count === 0) && $scope.selectedCallFlow.routetype !=='outbound' && $scope.selectedCallFlow.routetype !== 'voicemail' && $scope.selectedCallFlow.routetype !== 'hangup' && $scope.voicemailComponent) {
                $scope.showSaveButton();
                $scope.isAdvancedTrackingNumbersOpen = true;
                pinesNotifications.notify({
                    title: 'Save Tracking Number',
                    text: 'Voicemail rings, field is required.',
                    type: 'error'
                });
                return;
            }
                if ($scope.dateTime.startDate.date !== null && browserTZ && $scope.cfactive == true) {
                    $scope.showSaveButton();
                    pinesNotifications.notify({
                        title: 'Save Tracking Number',
                        text: 'Cannot activate Tracking Number, Campaign is set to future date.',
                        type: 'error'
                    });
                    return;
                }

                //console.log("$scope.callFlowstatus:" + $scope.callFlowstatus);
                var record_until;
                if ($scope.selectedCallFlow.recordCall === true) {
                    record_until = '';
                } else {
                    record_until = '2015-02-24 00:00:00'; //past date (today)
                    $scope.selectedCallFlow.playDisclaimer = 'never';
                }
                if ($scope.selectedCallFlow.voicePrompt1 === true) {
                    message_enabled = '1';
                    if ($scope.TTSSelected) {
                        message_type = 'text';
                        message = $scope.selectedCallFlow.voicePromptTTSText;
                    } else {
                        message_type = 'file';
                        message = $scope.selectedCallFlow.voicePromptFileName;
                        vpdta.push($scope.selectedCallFlow.voicePromptId);
                    }
                } else {
                    message_enabled = '0'; //past date (today)
                }
                if ($scope.selectedCallFlow.whisperPrompt1 === true) {
                    whisper_enabled = '1';

                    if ($scope.TTSWhisperSelected) {
                        whisper_type = "text";
                        whisper_message = $scope.selectedCallFlow.whisperTTSText;
                    } else {
                        whisper_type = "file";
                        whisper_message = $scope.selectedCallFlow.whisperFileName;
                        vpdta.push($scope.selectedCallFlow.whisperId);
                    }
                } else {
                    whisper_enabled = '0'; //past date (today)
                }

                var vm_type = 'text';
                var vm_message = '';
                
                if($scope.TTSvoicemailGreetingsSelected){
                    vm_type = 'text';
                    vm_message = $scope.selectedCallFlow.voicemailGreetingsTTSText === undefined ? "" : $scope.selectedCallFlow.voicemailGreetingsTTSText;
                }
                else{
                    vm_type = 'file';
                    vm_message = $scope.selectedCallFlow.voicemailGreetingsFileName;
                }

                

                var customSources = [{
                        custom_source_id: $scope.selectedCallFlow.customSourceList_1,
                        custom_source_type: 'CS1'
                    },
                    {
                        custom_source_id: $scope.selectedCallFlow.customSourceList_2,
                        custom_source_type: 'CS2'
                    },
                    {
                        custom_source_id: $scope.selectedCallFlow.customSourceList_3,
                        custom_source_type: 'CS3'
                    },
                    {
                        custom_source_id: $scope.selectedCallFlow.customSourceList_4,
                        custom_source_type: 'CS4'
                    },
                    {
                        custom_source_id: $scope.selectedCallFlow.customSourceList_5,
                        custom_source_type: 'CS5'
                    }
                ];

                var ivrs = [];
                var sendingRouteType;
                var locIds = [];
                var geo_rt = {};
                var geo_opt = {};
                var isIVRGeo = false;
                var isPostIVREnabled = false;
                var postIVR = {};
                var schedule_data = {};
                var schedule =[];

                function findDuplicates(arra1) {
                    var object = {};
                    var result = [];                    
                    arra1.forEach(function (item) {
                      if(!object[item])
                        object[item] = 0;
                        object[item] += 1;
                    })                    
                    for (var prop in object) {
                       if(object[prop] >= 2) {
                           result.push(prop);
                       }
                    }                    
                    return result;
                }
                //$scope.selectedCallFlow.postIVR.voicePromptTTSText = '';
                $scope.selectedCallFlow.postIVRData = {};

                if($scope.userAccess.postcallivr !== undefined && $scope.userAccess.postcallivr > 4 && $scope.postCallIVR ){
                    isPostIVREnabled = true;
                    var keyPressMsgtype = 'text';
                    var recordASaleMsgtype = 'text';
                    var recordALeadMsgtype = 'text';
                    var agentVoicePromtMsgtype = 'text';

                    var keyPressMsg = $scope.selectedCallFlow.outComePromtTTSText  ;
                    var recordASaleMsg = $scope.selectedCallFlow.salesAmountVoiceTTSText;
                    var agentVoicePromtMsg = $scope.selectedCallFlow.AgentIDVoicePromptTTSText;

                    var noOfDigits = $scope.selectedCallFlow.lengthOfAgentId;
                    if(!$scope.TTSAgentIDVoicePromptSelected){
                        agentVoicePromtMsgtype = 'file';
                        agentVoicePromtMsg = $scope.selectedCallFlow.AgentIDVoicePromptFileName;
                    }

                    if(!$scope.TTSsalesAmountVoiceSelected){
                        recordASaleMsgtype = 'file';
                        recordASaleMsg = $scope.selectedCallFlow.salesAmountVoiceFileName;
                        
                    }

                    if(!$scope.TTSoutComePromtSelected){
                        keyPressMsgtype = 'file';
                        keyPressMsg = $scope.selectedCallFlow.outComePromtFileName;
                    }
                    switch($scope.postIVRType){
                    case 'conversion':                        
                        $scope.selectedCallFlow.postIVRData = {
                            type: "conversion",
                            post_call_ivr_id: $scope.selectedCallFlow.post_call_ivr_id,
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
                    case 'agentID':
                        $scope.selectedCallFlow.postIVRData = {
                            type: "agentID",
                            post_call_ivr_id: $scope.selectedCallFlow.post_call_ivr_id,                            
                            prompts : [{
                                type: 'record_agent_id',
                                msgType: agentVoicePromtMsgtype,
                                noOfDigits: noOfDigits,
                                promt: agentVoicePromtMsg
                            }]                            
                        };
                        break;
                    case 'conversionAgentID':
                    $scope.selectedCallFlow.postIVRData = {
                        type: "conversionAgentID",
                        post_call_ivr_id: $scope.selectedCallFlow.post_call_ivr_id,
                        prompts : [{
                            type:'record_call_outcome',
                            msgType: keyPressMsgtype,
                            promt: keyPressMsg
                        },
                        {   type: 'record_a_sale',
                            msgType: recordASaleMsgtype,
                            promt: recordASaleMsg
                        },
                        {
                            type: 'record_agent_id',
                            msgType: agentVoicePromtMsgtype,
                            noOfDigits: noOfDigits,
                            promt: agentVoicePromtMsg
                        }]
                    };
                    break;
                    }
                }
                switch ($scope.selectedCallFlow.routetype) {
                    case "geo":
                        var unmaskOfNumbersForgeo = []
                        var overflow_error = false;
                        var geo_ringto_error = false;
                        sendingRouteType = $scope.selectedCallFlow.routetype;
                        routeBy = $scope.selectedCallFlow.routeBy;
                        $scope.selectedCallFlow.geoList = $scope.locObj.id;
                        locIds.push($scope.selectedCallFlow.geoList);
                        geo_opt = {
                            location_ids: locIds
                        };
                        geo_rt = {
                            strategy: routeBy
                        };
                        if (routeBy !== "Claimed" && routeBy !== "claimedState") {
                            radius = $scope.selectedCallFlow.radius;
                            geo_rt.radius = radius;
                            //location = $scope.selectedCallFlow.location;
                        }

                        if($scope.selectedCallFlow.playGeoLocationPrompt && routeBy !== 'claimedState' && routeBy !== 'Npa' ){
                            geo_rt.message_enabled = true;
                            if($scope.TTGeoloLocationPromptSelected){
                                geo_rt.message_type= 'text';
                                geo_rt.message = $scope.selectedCallFlow.geoLocationPromptTTSText;
                            }else{
                                geo_rt.message_type= 'file';
                                geo_rt.message = $scope.selectedCallFlow.geoLocationPromptName;
                            }
                        }else{
                            geo_rt.message_enabled = false;
                            geo_rt.message = '';
                        }
                        var matched_geo_list = {};
                        matched_geo_list = _.find($scope.georoutelocations,function(list){
                            return ( $scope.selectedCallFlow.geoList === list.id);
                        });
                        if(matched_geo_list){
                        for(var j=0;j<matched_geo_list.routes.length;j++){
                            if(matched_geo_list.routes[j].target === $scope.selectedCallFlow.num.number){
                                $scope.showSaveButton();
                                $scope.showSubmit();
                                pinesNotifications.notify({
                                    title: 'Tracking Number Details Form',
                                    text: 'Location Ring to phone number cannot be same as tracking number.',
                                    type: 'error'
                                });
                                geo_ringto_error = true;
                                return;
                            }
                        }
                        matched_geo_list = {};
                        }
                        if ($scope.selectedCallFlow.geoRouteId) {
                            var arr1 = [];
                            arr1.push($scope.selectedCallFlow.geoRouteId);
                            geo_rt.id = arr1;
                        }
                        var duplicateRingToOverflow = [];
                        var duplicateGeoRouteRingto = [];
                       // var duplicateGeoRouteOverflow = [];
                        var ringToNumber = UserWebService.unMaskData($scope.selectedCallFlow.ringtoNum);
                        _.each($scope.overflowNumbers,function(number){
                            var overflowNum = UserWebService.unMaskData(number.overflowNumber);
                            if(overflowNum === ringToNumber){
                                duplicateRingToOverflow.push(overflowNum);
                            }
                            // if(overflowNum === $scope.selectedCallFlow.num.number){
                            //     duplicateGeoRouteOverflow.push(overflowNum);
                            // }
                            unmaskOfNumbersForgeo.push({'overflowNumber' :number.overflowNumber, 'unmaskNumber' : overflowNum, 'rings':number.rings});   
                         });
                         if(ringToNumber === $scope.selectedCallFlow.num.number){
                            duplicateGeoRouteRingto.push(ringToNumber);
                         }
                         if((unmaskOfNumbersForgeo.length != _.uniq(unmaskOfNumbersForgeo, 'unmaskNumber').length) && $scope.isSimultaneousRing === true){
                            $scope.showSaveButton();
                            $scope.showSubmit();
                            pinesNotifications.notify({
                               title: 'Tracking Number Details Form',
                               text: 'Duplicate Overflow Numbers are not allowed in simultaneous',
                               type: 'error'
                           });
                           overflow_error = true;
                        }
                        if(!_.isEmpty(duplicateRingToOverflow) && $scope.isSimultaneousRing === true){
                            $scope.showSaveButton();
                            $scope.showSubmit();
                            pinesNotifications.notify({
                                title: 'Tracking Number Details Form',
                                text: 'Overflow Number can not be same as Ring to Phone Number in simultaneous',
                                type: 'error'
                                });
                                overflow_error = true;
                        }
                        if(!_.isEmpty(duplicateGeoRouteRingto)){
                            $scope.showSaveButton();
                            $scope.showSubmit();
                            pinesNotifications.notify({
                                title: 'Tracking Number Details Form',
                                text: 'Ring to phone number cannot be same as tracking number.',
                                type: 'error'
                            });
                            geo_ringto_error = true;
                        }
                        // if(!_.isEmpty(duplicateGeoRouteOverflow)){
                        //     $scope.showSaveButton();
                        //     $scope.showSubmit();
                        //     pinesNotifications.notify({
                        //         title: 'Tracking Number Details Form',
                        //         text: 'Overflow Number cannot be same as tracking number.',
                        //         type: 'error'
                        //     });
                        //     overflow_error = true;
                        // }
                        if(overflow_error || geo_ringto_error)
                            return;
                        break;

                    case "ivr":
                        var cnt = 0;
                        var message_type;
                        var overflow_error = false;
                        var ringTo_error = false;

                        var ivrs = {};
                        if($scope.TTSIVRSelected){
                            ivrs.message_type= 'text';
                            ivrs.message = $scope.selectedCallFlow.voicepromptTTSText;
                        }else{
                            ivrs.message_type= 'file';
                            ivrs.message = $scope.selectedCallFlow.voicepromptFileName;
                        }
                        $scope.keypressDuplicateL1 = [];
                        $scope.keypressDuplicateL2 = [];
                        $scope.keypressDuplicateL3 = [];
                        var duplicateKeyPress = false;
                        _.each($scope.ivrActions, function(action){
                            $scope.keypressDuplicateL1.push(action.keypress);
                            _.each(action.ivrActions, function(action1){
                                if(action1.keypress !== ''){
                                    $scope.keypressDuplicateL2.push(action1.keypress);
                                }
                                _.each(action1.ivrActions, function(action2){
                                    if(action2.keypress !== ''){
                                        $scope.keypressDuplicateL3.push(action2.keypress);
                                    }
                                });
                            });
                            //for second and third level
                            $scope.keypressL2 = _.uniq($scope.keypressDuplicateL2);
                            $scope.keypressL3 = _.uniq($scope.keypressDuplicateL3);
                            if ($scope.keypressL2.length !== $scope.keypressDuplicateL2.length || $scope.keypressL3.length !== $scope.keypressDuplicateL3.length){
                                duplicateKeyPress = true;
                            }
                            $scope.keypressDuplicateL2 = [];
                            $scope.keypressDuplicateL3 = [];
                            $scope.keypressL2 =[];
                            $scope.keypressL3 =[];
                        });
                        //for First level
                        $scope.keypressL1 = _.uniq($scope.keypressDuplicateL1);
                        if ($scope.keypressL1.length !== $scope.keypressDuplicateL1.length ){
                            duplicateKeyPress = true;
                        }
                        if(duplicateKeyPress){
                            $scope.showSaveButton();
                            $scope.showSubmit();
                            pinesNotifications.notify({
                                title: 'Multilevel IVR Form',
                                text: 'Duplicate Key Press Numbers are not allowed',
                                type: 'error'
                            });
                            return;
                        }
						_.each($scope.ivrActions, function(action){
                            $scope.overflowNumberDuplicateL1 = [];
                            $scope.duplicateRingToOverflowL1 = [];
                            $scope.duplicateTrackingRingto1 = [];
                            $scope.duplicateTrackingOverflow1 = [];
                            _.forEach(action.overflowNumbers,function(num){
                                if(num.overflowNumber !== '' && num.overflowNumber !== undefined){
                                    var overflowNumber = UserWebService.unMaskData(num.overflowNumber);
                                    var  ringToNum = UserWebService.unMaskData(action.ringtoNum);
                                        if(overflowNumber === ringToNum){
                                            $scope.duplicateRingToOverflowL1.push(overflowNumber);
                                        }
                                        if(overflowNumber === $scope.selectedCallFlow.num.number){
                                            $scope.duplicateTrackingOverflow1.push(overflowNumber);
                                        }
                                    $scope.overflowNumberDuplicateL1.push({'unmaskNumber' :overflowNumber, 'overflowNumber':num.overflowNumber,'rings':num.rings,'overflow_order':num.overflow_order});
                                }
                            });
                            if(action.action ==='geo'){
                                var matched_geo_list1 = {};
                                matched_geo_list1 = _.find($scope.georoutelocations,function(list){
                                    return ( parseInt(action.geoRoute.geoList) === list.id);
                                });
                                if(matched_geo_list1){
                                for(var j=0;j<matched_geo_list1.routes.length;j++){
                                    if(matched_geo_list1.routes[j].target === $scope.selectedCallFlow.num.number){
                                        $scope.showSaveButton();
                                        $scope.showSubmit();
                                        pinesNotifications.notify({
                                            title: '1st level IVR Form',
                                            text: 'Location Ring to phone number cannot be same as tracking number.',
                                            type: 'error'
                                        });
                                        ringTo_error = true;
                                        return;
                                    }
                                }
                                matched_geo_list1 = {};
                                }
                            }
                            if($scope.selectedCallFlow.num.number !== undefined){
                                if(UserWebService.unMaskData(action.ringtoNum) === $scope.selectedCallFlow.num.number){
                                    $scope.duplicateTrackingRingto1.push(action.ringToNum);
                                }
                            }
                            
                            
                            if(($scope.overflowNumberDuplicateL1.length != _.uniq($scope.overflowNumberDuplicateL1, 'unmaskNumber').length) && action.isSimultaneousRing === true && action.action !== 'interactiveVoice'){
                                $scope.showSaveButton();
                                $scope.showSubmit();
                                pinesNotifications.notify({
                                title: '1st level IVR Form',
                                text: 'Duplicate Overflow Numbers are not allowed in simultaneous',
                                type: 'error'
                                });
                                overflow_error = true;
                            }
                            if(!_.isEmpty($scope.duplicateRingToOverflowL1) && action.isSimultaneousRing === true && action.action !== 'interactiveVoice'){
                                $scope.showSaveButton();
                                $scope.showSubmit();
                                pinesNotifications.notify({
                                    title: '1st level IVR Form',
                                    text: 'Overflow Number can not be same as Ring to Phone Number in simultaneous',
                                    type: 'error'
                                });
                                overflow_error = true;
                            }
                            if(!_.isEmpty($scope.duplicateTrackingRingto1) && action.action !== 'interactiveVoice'){
                                $scope.showSaveButton();
                                $scope.showSubmit();
                                pinesNotifications.notify({
                                    title: '1st level IVR Form',
                                    text: 'Ring to phone number cannot be same as tracking number.',
                                    type: 'error'
                                });
                                ringTo_error = true;
                            }
                            if(!_.isEmpty($scope.duplicateTrackingOverflow1) && action.action !== 'interactiveVoice'){
                                $scope.showSaveButton();
                                $scope.showSubmit();
                                pinesNotifications.notify({
                                    title: '1st level IVR Form',
                                    text: 'Overflow Number cannot be same as tracking number.',
                                    type: 'error'
                                });
                                overflow_error = true;
                            }
                            _.each(action.ivrActions, function(action1){
                                $scope.overflowNumberDuplicateL2 = [];
                                $scope.duplicateRingToOverflowL2 = [];
                                $scope.duplicateTrackingRingto2 = [];
                                $scope.duplicateTrackingOverflow2 = [];
                                _.forEach(action1.overflowNumbers,function(num){
                                    if(num.overflowNumber !== '' && num.overflowNumber !== undefined){
                                        var overflowNumber = UserWebService.unMaskData(num.overflowNumber);
                                        var  ringToNum = UserWebService.unMaskData(action1.ringtoNum);
                                            if(overflowNumber === ringToNum){
                                                $scope.duplicateRingToOverflowL2.push(overflowNumber);
                                            }
                                            if(overflowNumber === $scope.selectedCallFlow.num.number){
                                                $scope.duplicateTrackingOverflow2.push(overflowNumber);
                                            }
                                        $scope.overflowNumberDuplicateL2.push({'unmaskNumber' :overflowNumber, 'overflowNumber':num.overflowNumber,'rings':num.rings,'overflow_order':num.overflow_order});
                                    }
                                });
                                if(action1.action ==='geo'){
                                    var matched_geo_list2 = {};
                                    matched_geo_list2 = _.find($scope.georoutelocations,function(list){
                                        return ( parseInt(action1.geoRoute.geoList) === list.id);
                                    });
                                    if(matched_geo_list2){
                                    for(var j=0;j<matched_geo_list2.routes.length;j++){
                                        if(matched_geo_list2.routes[j].target === $scope.selectedCallFlow.num.number){
                                            $scope.showSaveButton();
                                            $scope.showSubmit();
                                            pinesNotifications.notify({
                                                title: '2nd level IVR Form',
                                                text: 'Location Ring to phone number cannot be same as tracking number.',
                                                type: 'error'
                                            });
                                            ringTo_error = true;
                                            return;
                                        }
                                    }
                                    matched_geo_list2 = {};
                                    }
                                }
                                if($scope.selectedCallFlow.num.number !== undefined){
                                    if(UserWebService.unMaskData(action1.ringtoNum) === $scope.selectedCallFlow.num.number){
                                        $scope.duplicateTrackingRingto2.push(action1.ringToNum);
                                    }
                                }
                                    
                                if(($scope.overflowNumberDuplicateL2.length != _.uniq($scope.overflowNumberDuplicateL2, 'unmaskNumber').length) && action1.isSimultaneousRing === true && action1.action !== 'interactiveVoice'){
                                    $scope.showSaveButton();
                                    $scope.showSubmit();
                                    pinesNotifications.notify({
                                    title: '2nd level IVR Form',
                                    text: 'Duplicate Overflow Numbers are not allowed in simultaneous',
                                    type: 'error'
                                    });
                                    overflow_error = true;
                                }
                                if(!_.isEmpty($scope.duplicateRingToOverflowL2) && action1.isSimultaneousRing === true && action1.action !== 'interactiveVoice'){
                                    $scope.showSaveButton();
                                    $scope.showSubmit();
                                    pinesNotifications.notify({
                                        title: '2nd level IVR Form',
                                        text: 'Overflow Number can not be same as Ring to Phone Number in simultaneous',
                                        type: 'error'
                                    });
                                    overflow_error = true;
                                }
                                if(!_.isEmpty($scope.duplicateTrackingRingto2) && action1.action !== 'interactiveVoice'){
                                    $scope.showSaveButton();
                                    $scope.showSubmit();
                                    pinesNotifications.notify({
                                        title: '2nd level IVR Form',
                                        text: 'Ring to phone number cannot be same as tracking number.',
                                        type: 'error'
                                    });
                                    ringTo_error = true;
                                }
                                if(!_.isEmpty($scope.duplicateTrackingOverflow2) && action1.action !== 'interactiveVoice'){
                                    $scope.showSaveButton();
                                    $scope.showSubmit();
                                    pinesNotifications.notify({
                                        title: '2nd level IVR Form',
                                        text: 'Overflow Number cannot be same as tracking number.',
                                        type: 'error'
                                    });
                                    overflow_error = true;
                                }
                                _.each(action1.ivrActions, function(action2){
                                    $scope.overflowNumberDuplicateL3 = [];
                                    $scope.duplicateRingToOverflowL3 = [];
                                    $scope.duplicateTrackingRingto3 = [];
                                    $scope.duplicateTrackingOverflow3 = [];
                                    _.forEach(action2.overflowNumbers,function(num){
                                        if(num.overflowNumber !== '' && num.overflowNumber !== undefined){
                                            var overflowNumber = UserWebService.unMaskData(num.overflowNumber);
                                            var  ringToNum = UserWebService.unMaskData(action2.ringtoNum);
                                            if(overflowNumber === ringToNum){
                                                $scope.duplicateRingToOverflowL3.push(overflowNumber);
                                            }
                                            if(overflowNumber === $scope.selectedCallFlow.num.number){
                                                $scope.duplicateTrackingOverflow3.push(overflowNumber);
                                            }
                                            $scope.overflowNumberDuplicateL3.push({'unmaskNumber' :overflowNumber, 'overflowNumber':num.overflowNumber,'rings':num.rings,'overflow_order':num.overflow_order});
                                        }
                                    });
                                    if(action2.action ==='geo'){
                                        var matched_geo_list3 = {};
                                        matched_geo_list3 = _.find($scope.georoutelocations,function(list){
                                            return ( parseInt(action2.geoRoute.geoList) === list.id);
                                        });
                                        if(matched_geo_list3){
                                        for(var j=0;j<matched_geo_list3.routes.length;j++){
                                            if(matched_geo_list3.routes[j].target === $scope.selectedCallFlow.num.number){
                                                $scope.showSaveButton();
                                                $scope.showSubmit();
                                                pinesNotifications.notify({
                                                    title: '3rd level IVR Form',
                                                    text: 'Location Ring to phone number cannot be same as tracking number.',
                                                    type: 'error'
                                                });
                                                ringTo_error = true;
                                                return;
                                            }
                                        }
                                        matched_geo_list3 = {};
                                        }
                                    }
                                    if($scope.selectedCallFlow.num.number !== undefined){
                                        if(UserWebService.unMaskData(action2.ringtoNum) === $scope.selectedCallFlow.num.number){
                                            $scope.duplicateTrackingRingto3.push(action2.ringToNum);
                                        }
                                    }
                                        
                                    if(($scope.overflowNumberDuplicateL3.length != _.uniq($scope.overflowNumberDuplicateL3, 'unmaskNumber').length) && action2.isSimultaneousRing === true && action2.action !== 'interactiveVoice'){
                                        $scope.showSaveButton();
                                        $scope.showSubmit();
                                        pinesNotifications.notify({
                                        title: '3rd level IVR Form',
                                        text: 'Duplicate Overflow Numbers are not allowed in simultaneous',
                                        type: 'error'
                                        });
                                        overflow_error = true;
                                    }
                                    if(!_.isEmpty($scope.duplicateRingToOverflowL3) && action2.isSimultaneousRing === true && action2.action !== 'interactiveVoice'){
                                        $scope.showSaveButton();
                                        $scope.showSubmit();
                                        pinesNotifications.notify({
                                            title: '3rd level IVR Form',
                                            text: 'Overflow Number can not be same as Ring to Phone Number in simultaneous',
                                            type: 'error'
                                        });
                                        overflow_error = true;
                                    }
                                    if(!_.isEmpty($scope.duplicateTrackingRingto3) && action2.action !== 'interactiveVoice'){
                                        $scope.showSaveButton();
                                        $scope.showSubmit();
                                        pinesNotifications.notify({
                                            title: '3rd level IVR Form',
                                            text: 'Ring to phone number cannot be same as tracking number.',
                                            type: 'error'
                                        });
                                        ringTo_error = true;
                                    }
                                    if(!_.isEmpty($scope.duplicateTrackingOverflow3) && action2.action !== 'interactiveVoice'){
                                        $scope.showSaveButton();
                                        $scope.showSubmit();
                                        pinesNotifications.notify({
                                            title: '3rd level IVR Form',
                                            text: 'Overflow Number cannot be same as tracking number.',
                                            type: 'error'
                                        });
                                        overflow_error = true;
                                    }
                                });
                            });
                        });
                    
                    
                    
                    _.each($scope.ivrActions, function(action){
                            _.each(action.scheduleRoute.scheduleInfo,function(schedule1){
                                var overflowNumberDuplicateL1 = [];
                                var duplicateRingToOverflowL1 = [];
                                var duplicateTrackingRingto1 = [];
                                var duplicateTrackingOverflow1 = [];
                                var ringTo = UserWebService.unMaskData(schedule1.ringTo);

                                    _.forEach(schedule1.overflowNumbers,function(num){
                                        if(num.overflowNumber !== '' && num.overflowNumber !== undefined){
                                            var overflowNumber = UserWebService.unMaskData(num.overflowNumber);
                                            if(overflowNumber === ringTo){
                                                duplicateRingToOverflowL1.push(overflowNumber);
                                            }
                                            if(overflowNumber === $scope.selectedCallFlow.num.number){
                                                duplicateTrackingOverflow1.push(overflowNumber);
                                            }
                                            overflowNumberDuplicateL1.push({'unmaskNumber' :overflowNumber, 'overflowNumber':num.overflowNumber,'rings':num.rings,'overflow_order':num.overflow_order});
                                        }
                                    });
                                if($scope.selectedCallFlow.num.number !== undefined){
                                    if(UserWebService.unMaskData(ringTo) === $scope.selectedCallFlow.num.number){
                                        duplicateTrackingRingto1.push(ringTo);
                                    }
                                }
                                    
                                if((overflowNumberDuplicateL1.length != _.uniq(overflowNumberDuplicateL1, 'unmaskNumber').length) && schedule1.simultaneousRings === true && action.action !== 'interactiveVoice'){
                                    $scope.showSaveButton();
                                    $scope.showSubmit();
                                    pinesNotifications.notify({
                                    title: '1st level IVR Form',
                                    text: 'Duplicate Overflow Numbers are not allowed in simultaneous',
                                    type: 'error'
                                    });
                                    overflow_error = true;
                                }
                                if(!_.isEmpty(duplicateRingToOverflowL1) && schedule1.simultaneousRings === true && action.action !== 'interactiveVoice'){
                                    $scope.showSaveButton();
                                    $scope.showSubmit();
                                    pinesNotifications.notify({
                                        title: '1st level IVR Form',
                                        text: 'Overflow Number can not be same as Ring to Phone Number in simultaneous',
                                        type: 'error'
                                    });
                                    overflow_error = true;
                                }
                                if(!_.isEmpty(duplicateTrackingRingto1) && action.action !== 'interactiveVoice'){
                                    $scope.showSaveButton();
                                    $scope.showSubmit();
                                    pinesNotifications.notify({
                                        title: '1st level IVR Form',
                                        text: 'Ring to phone number cannot be same as tracking number.',
                                        type: 'error'
                                    });
                                    ringTo_error = true;
                                }
                                if(!_.isEmpty(duplicateTrackingOverflow1) && action.action !== 'interactiveVoice'){
                                    $scope.showSaveButton();
                                    $scope.showSubmit();
                                    pinesNotifications.notify({
                                        title: '1st level IVR Form',
                                        text: 'Overflow Number cannot be same as tracking number.',
                                        type: 'error'
                                    });
                                    overflow_error = true;
                                }
                            });
                        _.each(action.ivrActions, function(action2){
                            _.each(action2.scheduleRoute.scheduleInfo,function(schedule2){
                                var overflowNumberDuplicateL2 = [];
                                var duplicateRingToOverflowL2 = [];
                                var duplicateTrackingRingto2 = [];
                                var duplicateTrackingOverflow2 = [];
                                var ringTo = UserWebService.unMaskData(schedule2.ringTo);

                                    _.forEach(schedule2.overflowNumbers,function(num){
                                        if(num.overflowNumber !== '' && num.overflowNumber !== undefined){
                                            var overflowNumber = UserWebService.unMaskData(num.overflowNumber);
                                            if(overflowNumber === ringTo){
                                                duplicateRingToOverflowL2.push(overflowNumber);
                                            }
                                            if(overflowNumber === $scope.selectedCallFlow.num.number){
                                                duplicateTrackingOverflow2.push(overflowNumber);
                                            }
                                            overflowNumberDuplicateL2.push({'unmaskNumber' :overflowNumber, 'overflowNumber':num.overflowNumber,'rings':num.rings,'overflow_order':num.overflow_order});
                                        }
                                    });
                                    if($scope.selectedCallFlow.num.number !== undefined){
                                        if(ringTo === $scope.selectedCallFlow.num.number){
                                            duplicateTrackingRingto2.push(ringTo);
                                        }
                                    }
                                
                                if((overflowNumberDuplicateL2.length != _.uniq(overflowNumberDuplicateL2, 'unmaskNumber').length) && schedule2.simultaneousRings === true && action2.action !== 'interactiveVoice'){
                                    $scope.showSaveButton();
                                    $scope.showSubmit();
                                    pinesNotifications.notify({
                                    title: '2nd level IVR Form',
                                    text: 'Duplicate Overflow Numbers are not allowed in simultaneous',
                                    type: 'error'
                                    });
                                    overflow_error = true;
                                }
                                if(!_.isEmpty(duplicateRingToOverflowL2) && schedule2.simultaneousRings === true && action2.action !== 'interactiveVoice'){
                                    $scope.showSaveButton();
                                    $scope.showSubmit();
                                    pinesNotifications.notify({
                                        title: '2nd level IVR Form',
                                        text: 'Overflow Number can not be same as Ring to Phone Number in simultaneous',
                                        type: 'error'
                                    });
                                    overflow_error = true;
                                }
                                if(!_.isEmpty(duplicateTrackingRingto2) && action2.action !== 'interactiveVoice'){
                                    $scope.showSaveButton();
                                    $scope.showSubmit();
                                    pinesNotifications.notify({
                                        title: '2nd level IVR Form',
                                        text: 'Ring to phone number cannot be same as tracking number.',
                                        type: 'error'
                                    });
                                    ringTo_error = true;
                                }
                                if(!_.isEmpty(duplicateTrackingOverflow2) && action2.action !== 'interactiveVoice'){
                                    $scope.showSaveButton();
                                    $scope.showSubmit();
                                    pinesNotifications.notify({
                                        title: '2nd level IVR Form',
                                        text: 'Overflow Number cannot be same as tracking number.',
                                        type: 'error'
                                    });
                                    overflow_error = true;
                                }
                            });
                            _.each(action2.ivrActions, function(action3){
                                _.each(action3.scheduleRoute.scheduleInfo,function(schedule3){
                                    var overflowNumberDuplicateL3 = [];
                                    var duplicateRingToOverflowL3 = [];
                                    var duplicateTrackingRingto3 = [];
                                    var duplicateTrackingOverflow3 = [];
                                    var ringTo = UserWebService.unMaskData(schedule3.ringTo);

                                    _.forEach(schedule3.overflowNumbers,function(num){
                                        if(num.overflowNumber !== '' && num.overflowNumber !== undefined){
                                            var overflowNumber = UserWebService.unMaskData(num.overflowNumber);
                                            if(overflowNumber === ringTo){
                                                duplicateRingToOverflowL3.push(overflowNumber);
                                            }
                                            if(overflowNumber === $scope.selectedCallFlow.num.number){
                                                duplicateTrackingOverflow3.push(overflowNumber);
                                            }
                                            overflowNumberDuplicateL3.push({'unmaskNumber' :overflowNumber, 'overflowNumber':num.overflowNumber,'rings':num.rings,'overflow_order':num.overflow_order});
                                        }
                                    });
                                    if($scope.selectedCallFlow.num.number !== undefined){
                                        if(ringTo === $scope.selectedCallFlow.num.number){
                                            duplicateTrackingRingto3.push(ringTo);
                                        }
                                    }
                                    
                                    if((overflowNumberDuplicateL3.length != _.uniq(overflowNumberDuplicateL3, 'unmaskNumber').length) && schedule3.simultaneousRings=== true && action3.action !== 'interactiveVoice'){
                                        $scope.showSaveButton();
                                        $scope.showSubmit();
                                        pinesNotifications.notify({
                                        title: '3rd level IVR Form',
                                        text: 'Duplicate Overflow Numbers are not allowed in simultaneous',
                                        type: 'error'
                                        });
                                        overflow_error = true;
                                    }
                                    if(!_.isEmpty(duplicateRingToOverflowL3) && schedule3.simultaneousRings === true && action3.action !== 'interactiveVoice'){
                                        $scope.showSaveButton();
                                        $scope.showSubmit();
                                        pinesNotifications.notify({
                                            title: '3rd level IVR Form',
                                            text: 'Overflow Number can not be same as Ring to Phone Number in simultaneous',
                                            type: 'error'
                                        });
                                        overflow_error = true;
                                    }
                                    if(!_.isEmpty(duplicateTrackingRingto3) && action3.action !== 'interactiveVoice'){
                                        $scope.showSaveButton();
                                        $scope.showSubmit();
                                        pinesNotifications.notify({
                                            title: '3rd level IVR Form',
                                            text: 'Ring to phone number cannot be same as tracking number.',
                                            type: 'error'
                                        });
                                        ringTo_error = true;
                                    }
                                    if(!_.isEmpty(duplicateTrackingOverflow3) && action3.action !== 'interactiveVoice'){
                                        $scope.showSaveButton();
                                        $scope.showSubmit();
                                        pinesNotifications.notify({
                                            title: '3rd level IVR Form',
                                            text: 'Overflow Number cannot be same as tracking number.',
                                            type: 'error'
                                        });
                                        overflow_error = true;
                                    }
                                });
                            });
                        });
                    });
                
                        if(overflow_error || ringTo_error)
                            return;
                        ivrs.ivrActions = jsonFormationIvr($scope.ivrActions);
                        sendingRouteType = $scope.selectedCallFlow.routetype;
                        break;

                    case "hangup":
                        sendingRouteType = "simple";
                        $scope.selectedCallFlow.ringtoNum = 'hangup';
                        delete $scope.selectedCallFlow.overflowNumbers;
                        break;

                    case "simple":
                        if(validateOverFlow($scope.overflowNumbers,UserWebService.unMaskData($scope.selectedCallFlow.ringtoNum),$scope.selectedCallFlow.num.number,$scope.isSimultaneousRing)){
                            $scope.showSubmit();
                            $scope.showSaveButton();
                            return;
                        }
                        if(UserWebService.unMaskData($scope.selectedCallFlow.ringtoNum) === $scope.selectedCallFlow.num.number){
                            pinesNotifications.notify({
                                title: 'Tracking Number Details Form',
                                text: 'Ring to phone number cannot be same as tracking number.',
                                type: 'error'
                            });
                            $scope.showSubmit();
                            $scope.showSaveButton();
                            return;
                        }
                        sendingRouteType = $scope.selectedCallFlow.routetype;
                        break;
                    case "outbound":
                        sendingRouteType = $scope.selectedCallFlow.routetype;
                        $scope.selectedCallFlow.showDNI = false;
                        $scope.selectedCallFlow.whisperPrompt1 = false;
                        $scope.selectedCallFlow.spamActive = false;
                        delete $scope.selectedCallFlow['value'];
                        delete $scope.selectedCallFlow['rinterval'];
                        delete $scope.selectedCallFlow['voicemail_rings_count'];
                        delete $scope.selectedCallFlow['voicemailGreetingsTTSText'];
                        delete $scope.selectedCallFlow['destination_url'];
                        delete $scope.selectedCallFlow['dniType'];
                        delete $scope.selectedCallFlow['dni_element'];
                        delete $scope.selectedCallFlow['referrer'];
                        break;

                    case "PercentageBasedRoute":
                        var pringtonums = [];
                        var percentageCount = 0;
                        var isRingToValid = false;
                        var isRingToRequired = false;
                        var isOverflowNumbersValid = false;
                        var overflow_error = false;
                        var duplicateArr = [];
                        var duplicateArrRingtoNum = [];
                        
                        var percentageRingToNumbers = _.pluck($scope.percentInfo,'ringToNum')
                        _.each(percentageRingToNumbers,function(percentageRingToNumbers){
                            duplicateArrRingtoNum.push(UserWebService.unMaskData(percentageRingToNumbers));
                        })
                        var duplicateNumber = findDuplicates(duplicateArrRingtoNum)
                        _.each(duplicateNumber,function(duplicateNumber){
                            if(duplicateNumber !== '' && duplicateNumber !== undefined){
                                duplicateArr.push(duplicateNumber)
                            }
                        });
                        for (var i = 0; i < $scope.percentInfo.length; i++) {
                            if(($scope.selectedCallFlow.num.number != undefined && UserWebService.unMaskData($scope.percentInfo[i].ringToNum) !=undefined) && ($scope.selectedCallFlow.num.number === UserWebService.unMaskData($scope.percentInfo[i].ringToNum))){
                                pinesNotifications.notify({
                                    title: 'Tracking Number Details Form',
                                    text: 'Ring to phone number cannot be same as tracking number.',
                                    type: 'error'
                                });
                                $scope.showSubmit();
                                $scope.showSaveButton();
                                return;
                            }
                            if ($scope.percentInfo[i].percentage) {
                                percentageCount = percentageCount + parseInt($scope.percentInfo[i].percentage);
                                var  ringToNum = UserWebService.unMaskData($scope.percentInfo[i].ringToNum)
                                var duplicateRingToOverflow = [];
                                if(!ringToNum){
                                    isRingToRequired = true;
                                }
                                if(!ringToNum || ringToNum.length < 10){
                                    isRingToValid = true;
                                }
                                if(validateRingToNum($scope.percentInfo[i])){
                                    isOverflowNumbersValid = true;
                                }
                                $scope.percentInfo[i].unmaskOverflowNumbers = [];
                                _.forEach($scope.percentInfo[i].overflowNumbers,function(num){
                                    if(num.overflowNumber !== '' && num.overflowNumber !== undefined){
                                        var overflowNumber = UserWebService.unMaskData(num.overflowNumber);
                                        if(!overflowNumber || overflowNumber.length < 10){
                                            isOverflowNumbersValid = true;
                                        }
                                        if(overflowNumber === ringToNum){
                                            duplicateRingToOverflow.push(overflowNumber);
                                        }
                                        if(overflowNumber === $scope.selectedCallFlow.num.number){
                                            $scope.showSaveButton();
                                            $scope.showSubmit();
                                            pinesNotifications.notify({
                                                title: 'Tracking Number Details Form',
                                                text: 'Overflow Number cannot be same as tracking number.',
                                                type: 'error'
                                             });
                                             overflow_error = true;
                                        }
                                        $scope.percentInfo[i].unmaskOverflowNumbers.push({'unmaskNumber' :overflowNumber, 'overflowNumber':num.overflowNumber,'rings':num.rings,'overflow_order':num.overflow_order});
                                    }
                                });
                                if(($scope.percentInfo[i].unmaskOverflowNumbers.length != _.uniq($scope.percentInfo[i].unmaskOverflowNumbers, 'unmaskNumber').length) && $scope.percentInfo[i].isSimultaneousRing === true){
                                    $scope.showSaveButton();
                                    $scope.showSubmit();
                                    pinesNotifications.notify({
                                       title: 'Percentage Call Route',
                                       text: 'Duplicate Overflow Numbers are not allowed in simultaneous',
                                       type: 'error'
                                    });
                                    overflow_error = true;
                                }
                                if(!_.isEmpty(duplicateRingToOverflow) && $scope.percentInfo[i].isSimultaneousRing === true){
                                    $scope.showSaveButton();
                                    $scope.showSubmit();
                                    pinesNotifications.notify({
                                        title: 'Percentage Call Route',
                                        text: 'Overflow Number can not be same as Ring to Phone Number in simultaneous',
                                        type: 'error'
                                    });
                                    overflow_error = true;
                                }
                                pringtonums.push({
                                    "ringto": UserWebService.unMaskData($scope.percentInfo[i].ringToNum),
                                    "percentage": parseInt($scope.percentInfo[i].percentage),
                                    "overflowNumbers" : $scope.percentInfo[i].unmaskOverflowNumbers,
                                    "activateVoicemail" : ($scope.percentInfo[i].activateVoicemail)?$scope.percentInfo[i].activateVoicemail:false,
                                    "simultaneousRings": ($scope.percentInfo[i].isSimultaneousRing)?$scope.percentInfo[i].isSimultaneousRing:false,
                                    "route_order" : $scope.percentInfo[i].route_order
                                });
                            }
                        }
                        if (percentageCount > 100) {
                            $scope.showSaveButton();
                            $scope.showSubmit();
                            pinesNotifications.notify({
                                title: 'Percentage Call Route',
                                text: 'Percentage is greater than 100 ',
                                type: 'error'
                            });
                            return;
                        } else if (percentageCount < 100) {
                            $scope.showSaveButton();
                            $scope.showSubmit();
                            pinesNotifications.notify({
                                title: 'Percentage Call Route',
                                text: 'Percentage is less than 100 ',
                                type: 'error'
                            });
                            return;
                        }else if(isRingToRequired){
                            $scope.showSaveButton();
                            $scope.showSubmit();
                            pinesNotifications.notify({
                                title: 'Percentage Call Route',
                                text: 'Ring to Phone Number is required ',
                                type: 'error'
                            });
                            return;
                        }else if(isRingToValid){
                            $scope.showSaveButton();
                            $scope.showSubmit();
                            pinesNotifications.notify({
                                title: 'Percentage Call Route',
                                text: 'Ring to Phone Number is not valid ',
                                type: 'error'
                            });
                            return;
                        }else if(duplicateArr.length > 0){
                            $scope.showSaveButton();
                            $scope.showSubmit();
                            pinesNotifications.notify({
                                title: 'Percentage Call Route',
                                text: 'Duplicate ring to number '+ duplicateNumber.toString(),
                                type: 'error'
                            });
                            return;
                            
                        }else if(isOverflowNumbersValid){
                            $scope.showSaveButton();
                            $scope.showSubmit();
                            pinesNotifications.notify({
                                title: 'Percentage Call Route',
                                text: "'Overflow Ring to Phone Numbers' are not valid",
                                type: 'error'
                            });
                            return;
                        }
                        if(overflow_error)
                            return;
                        $scope.selectedCallFlow.ringtoNum = "";
                        sendingRouteType = $scope.selectedCallFlow.routetype;
                        break;
                    case "voicemail":
                        sendingRouteType = $scope.selectedCallFlow.routetype;
                        // $scope.selectedCallFlow.activateVoicemail = true;
                        vm_message = $scope.selectedCallFlow.voicemailGreetingsTTSText;
                        if(!$scope.TTSvoicemailGreetingsSelected){
                            vm_type = 'file';
                            vm_message = $scope.selectedCallFlow.voicemailGreetingsFileName;
                        }
                        break;
                    case "schedule":
                        sendingRouteType = $scope.selectedCallFlow.routetype;
                        var isOverflowNumbersValid = false;
                        var overflow_error = false;
                        //var isDaysValid = false;
                        if($scope.selectedCallFlow.num.number !== undefined){
                            if(UserWebService.unMaskData($scope.selectedCallFlow.ringtoNum) === $scope.selectedCallFlow.num.number){
                                pinesNotifications.notify({
                                    title: 'Tracking Number Details Form',
                                    text: 'Ring to phone number cannot be same as tracking number.',
                                    type: 'error'
                                });
                                $scope.showSubmit();
                                $scope.showSaveButton();
                                return;
                            }

                        }
                        
                        for (var i = 0; i < $scope.scheduleInfo.length; i++) {
                            if(validateRingToNum($scope.scheduleInfo[i])){
                                isOverflowNumbersValid = true;
                            }
                            var duplicateRingToOverflow = [];
                            var  ringToNum = UserWebService.unMaskData($scope.scheduleInfo[i].ringTo)
                            $scope.scheduleInfo[i].unmaskOverflowNumbers = [];
                                _.forEach($scope.scheduleInfo[i].overflowNumbers,function(num){
                                    if(num.overflowNumber !== '' && num.overflowNumber !== undefined){
                                        var overflowNumber = UserWebService.unMaskData(num.overflowNumber);
                                        if(overflowNumber === ringToNum){
                                            duplicateRingToOverflow.push(overflowNumber);
                                        }
                                        if(overflowNumber === $scope.selectedCallFlow.num.number){
                                            $scope.showSaveButton();
                                            $scope.showSubmit();
                                            pinesNotifications.notify({
                                                title: 'Tracking Number Details Form',
                                                text: 'Overflow Number cannot be same as tracking number.',
                                                type: 'error'
                                             });
                                             overflow_error = true;
                                        }
                                        $scope.scheduleInfo[i].unmaskOverflowNumbers.push({'unmaskNumber' :overflowNumber, 'overflowNumber':num.overflowNumber,'rings':num.rings,'overflow_order':num.overflow_order});
                                    }
                                });
                                if(($scope.scheduleInfo[i].unmaskOverflowNumbers.length != _.uniq($scope.scheduleInfo[i].unmaskOverflowNumbers, 'unmaskNumber').length) && $scope.scheduleInfo[i].simultaneousRings === true){
                                    $scope.showSaveButton();
                                    $scope.showSubmit();
                                    pinesNotifications.notify({
                                       title: 'Schedule Call Route',
                                       text: 'Duplicate Overflow Numbers are not allowed in simultaneous',
                                       type: 'error'
                                    });
                                    overflow_error = true;
                                }
                                if(!_.isEmpty(duplicateRingToOverflow) && $scope.scheduleInfo[i].simultaneousRings === true){
                                    $scope.showSaveButton();
                                    $scope.showSubmit();
                                    pinesNotifications.notify({
                                        title: 'Schedule Call Route',
                                        text: 'Overflow Number can not be same as Ring to Phone Number in simultaneous',
                                        type: 'error'
                                    });
                                    overflow_error = true;
                                }
                            // if($scope.scheduleInfo[i].days.length === 0){
                            //     isDaysValid = true
                            // }
                        }
                        if(isOverflowNumbersValid){
                            $scope.showSaveButton();
                            $scope.showSubmit();
                            pinesNotifications.notify({
                                title: 'schedule Call Route',
                                text: "'Overflow Ring to Phone Numbers' are not valid",
                                type: 'error'
                            });
                            return;
                        }
                        if(overflow_error)
                            return;
                        // if(isDaysValid){
                        //     $scope.showSaveButton();
                        //     $scope.showSubmit();
                        //     pinesNotifications.notify({
                        //         title: 'Following a schedule',
                        //         text: 'Please enter days for schedule',
                        //         type: 'error'
                        //     });
                        //     return;
                        // }

                        break;
                }

                var dniSettingData = {};
                if ($scope.selectedCallFlow.showDNI) {
                    var temp = $scope.selectedCallFlow.referrer.split("|");
                    var tempReferrer = temp[0];
                    $scope.selectedCallFlow.referrer_type = temp[1];
                    if (!$scope.selectedCallFlow.referrer_type) $scope.selectedCallFlow.referrer_type = null;
                    dniSettingData = {
                        "provisioned_route_id": $scope.selectedCallFlow.id,
                        "org_unit_id": $rootScope.currentOUId,
                        "dni_setting_id": $scope.selectedCallFlow.dni_setting_id,
                        "destination_url": $scope.selectedCallFlow.destination_url,
                        "dni_type": $scope.selectedCallFlow.dniType,
                        "dni_element": $scope.selectedCallFlow.dni_element,
                        "referrer": tempReferrer,
                        "referrer_type": $scope.selectedCallFlow.referrer_type,
                        "dni_ttl": $scope.selectedCallFlow.dni_ttl
                    };
                    var validateDni = CampaignWebService.validateDniData(dniSettingData, $scope.showReferrerTextBox);
                    if (validateDni.length) {
                        $scope.showSaveButton();
                        pinesNotifications.notify({
                            title: 'Save Tracking Number',
                            text: '\'' + _.uniq(validateDni).join(','),
                            type: 'error'
                        });
                        return;
                    }
                }
                var isLDM = '';
                $scope.checkLDM(function(continue_) {
                    if(continue_) {
                       $scope.checkSMSFeature(function(checked){
                        if(checked){
                            pinesNotifications.notify({
                                title: 'Save Tracking Number',
                                text: 'Saving....',
                                type: 'success'
                            });
                            if ($scope.Id) {
                                // we have an id so so just add the provisioned route
                                // we now need to look to see if we are adding or editing a provisioned route
                                var pr = {};
                                var cfdata = [];
    
    
                                if ($scope.selectedCallFlow.id) {
                                    //var cfdata = [];
                                        $scope.unmaskOverflowNumbers = [];
                                        if($scope.overflowNumbers.length >0){
                                            _.forEach($scope.overflowNumbers,function(num){
                                                if(num.overflowNumber !== '' && num.overflowNumber !== undefined){
                                                    var overflowNumber = UserWebService.unMaskData(num.overflowNumber);
                                                    $scope.unmaskOverflowNumbers.push({'unmaskNumber' :overflowNumber, 'overflowNumber':num.overflowNumber,'rings':num.rings, 'overflow_order':num.overflow_order});
                                                }
                                            });
                                        }                            
                                    if( $scope.selectedCallFlow.preCallWebhook == false)
                                    {
                                        $scope.selectedCallFlow.webhook ="";
                                    }
                                        
                                    if ($scope.selectedCallFlow.callflowOption !== "numberPool") {
                                        console.log('Not number pool');
                                        var src = '';
                                        _.each($scope.numList, function(val) {
                                            if (val.id === $scope.selectedCallFlow.phoneid) {
                                                src = val.source;
                                            }
                                        });
                                        cfdata.push({
                                            "provisioned_route": {
                                                "route_type": sendingRouteType,
                                                "name": $scope.selectedCallFlow.name,
                                                "repeat_interval": $scope.selectedCallFlow.routetype =='outbound' ? 0 : $scope.selectedCallFlow.routetype =='voicemail' ? 72 : $scope.selectedCallFlow.rinterval,
                                                "call_value": $scope.selectedCallFlow.value,
                                                "org_unit_id": $scope.selectedCallFlow.org_unit_id,
                                                "id": $scope.selectedCallFlow.id,
                                                "post_IVR_enabled": isPostIVREnabled, 
                                            },
                                            "call_flow": {
                                                "id": $scope.callFlowId,
                                                "provisioned_route_id": $scope.selectedCallFlow.id,
                                                "tracking_number": $scope.selectedCallFlow.phone,
                                                "organizational_unit_id": $scope.selectedCallFlow.org_unit_id,
                                                "ringto": ($scope.selectedCallFlow.routetype =='outbound' || $scope.selectedCallFlow.routetype =='voicemail') ? '': $scope.selectedCallFlow.ringtoNum,
                                                "route_type": sendingRouteType,
                                                "status": $scope.callFlowstatus,
                                                "play_disclaimer": $scope.selectedCallFlow.playDisclaimer,
                                                "whisper_enabled": whisper_enabled,
                                                "whisper_type": whisper_type,
                                                "whisper_message": whisper_message,
                                                "message_enabled": message_enabled,
                                                "message_type": message_type,
                                                "message": message,
                                                "record_until": record_until,
                                                "webhook_id": $scope.selectedCallFlow.showWebhook === true ? $scope.selectedCallFlow.webhook : null,
                                                "customSourceList": customSources,
                                                "isSimultaneousRing": $scope.isSimultaneousRing,
                                                "vm_type":vm_type,
                                                "vm_enabled": $scope.selectedCallFlow.activateVoicemail,
                                                "vm_message": vm_message,
                                                "hunt_option":$scope.hunt_option,
                                                "overflowNumbers": ($scope.selectedCallFlow.routetype === 'hangup' || $scope.selectedCallFlow.routetype =='outbound' || $scope.selectedCallFlow.routetype =='voicemail') ? '' : $scope.unmaskOverflowNumbers,
                                                "spam_active": $scope.selectedCallFlow.spamActive,
                                                "sms_enabled" : $scope.selectedCallFlow.smsActive,
                                                "voicemail_rings_count" : $scope.selectedCallFlow.routetype =='outbound' ? '3' : $scope.selectedCallFlow.voicemail_rings_count,
                                            },
                                            "phone_number": {
                                                "id": $scope.selectedCallFlow.phoneid,
                                                "vendor_id": $scope.selectedCallFlow.vendor_id,
                                                "source": 'inventory'
                                            },
                                            "channel": {
                                                "id": $scope.selectedCallFlow.channel.channel_id
                                            }
                                        });
                                        if(isPostIVREnabled){
                                            cfdata[0].call_flow.post_IVR_data =  $scope.selectedCallFlow.postIVRData;
                                        }
                                        if ($scope.selectedCallFlow.routetype === 'ivr'){
                                            var dummyIvr = [
                                                {
                                                "ivr": {
                                                    "value": 1,
                                                    "target_did": "1111111111",
                                                    "name": "Destincation",
                                                    "ouid": 8,
                                                    "play_disclaimer": "after",
                                                    "record_enabled": 1,
                                                    "message_enabled": 1,
                                                    "message_type": "file",
                                                    "message": "3IvolFCP_1548758869863",
                                                    "webhook_enabled": 0
                                                }
                                                }
                                            ];
                                            cfdata[0].ivrs = dummyIvr;
                                            //cfdata[0].call_flow_recording = {"id": [6426,6427]};
                                            cfdata[0].multiIvrs = ivrs;
                                        }                                
                                        
                                        if ($scope.selectedCallFlow.routetype === 'simple')
                                            cfdata[0].call_flow.dnis_as_cid = $scope.selectedCallFlow.dnis_as_cid;    
    
                                        if ($scope.selectedCallFlow.routetype === 'PercentageBasedRoute' ){
                                            cfdata[0].ringto_percentage = pringtonums;
                                            for(var i=0; i<cfdata[0].ringto_percentage.length;i++){
                                                if(($scope.selectedCallFlow.phone != undefined && cfdata[0].ringto_percentage[i].ringto !=undefined) && ($scope.selectedCallFlow.phone === cfdata[0].ringto_percentage[i].ringto)){
                                                    pinesNotifications.notify({
                                                        title: 'Tracking Number Details Form',
                                                        text: 'Ring to phone number cannot be same as tracking number.',
                                                        type: 'error'
                                                    });
                                                    $scope.showSubmit();
                                                    $scope.showSaveButton();
                                                    return;
                                                }
                                            }
                                        }
                                        // if (vpdta.length > 0)
                                        //     cfdata[0].call_flow_recording = {
                                        //         id: vpdta
                                        //     };
    
                                        // if (vpdta.length > 0 && ($scope.selectedCallFlow.whisperFileName !== undefined))
                                        //     cfdata[0].call_flow_recording = {
                                        //         id: vpdta
                                        //     };
    
                                        if ($scope.selectedCallFlow.routetype === 'geo') {
                                            cfdata[0].geo_route = geo_rt;
                                            cfdata[0].geo_options = geo_opt;
                                        }
    
    
                                        if ($scope.selectedCallFlow.routetype === 'outbound'){
                                            cfdata[0].provisioned_route.route_type = $scope.selectedCallFlow.routetype;
                                            cfdata[0].provisioned_route.callerid =  $scope.selectedCallFlow.caller_id;
                                            cfdata[0].provisioned_route.pin =($scope.selectedCallFlow.pin == undefined || $scope.selectedCallFlow.pin == "")? null:($scope.selectedCallFlow.pin).toString().replace(/ +/g, "")  ;
    
                                            //cfdata[0].provisioned_route.pin =($scope.selectedCallFlow.pin).replace(/ +/g, "");
                                        }
                                        if ($scope.selectedCallFlow.showDNI) {
                                            cfdata[0].dni_setting = dniSettingData;
                                        }else{
                                            cfdata[0].dni_setting = "";
                                        }
                                        console.log(dniSettingData);
                                        if ($scope.selectedCallFlow.routetype === 'schedule') {
                                            cfdata[0].call_flow.ringto = cfdata[0].call_flow.ringto == undefined ? '':cfdata[0].call_flow.ringto;
                                            cfdata[0].provisioned_route.schedule_data ={};
                                            _.each($scope.scheduleInfo, function(data){
                                                data.ringTo = UserWebService.unMaskData(data.ringTo); 
                                                if(data.overflowNumbers.length > 0 && data.overflowNumbers[0].overflowNumber !==''){
                                                    _.each(data.overflowNumbers, function(oData){
                                                        oData.overflowNumber = UserWebService.unMaskData(oData.overflowNumber)
                                                    })
                                                }else{
                                                    data.overflowNumbers = [];
                                                }
                                            })
                                            cfdata[0].provisioned_route.schedule_data.schedule = $scope.scheduleInfo;
                                            cfdata[0].provisioned_route.schedule_data.timezone =  $scope.selectedCallFlow.timezone.value
                                            cfdata[0].provisioned_route.schedule_data.default_ringto =  $scope.selectedCallFlow.ringtoNum;
                                            cfdata[0].provisioned_route.schedule_data.vm_enabled =  $scope.selectedCallFlow.activateVoicemail;
                                        }
                                    
                                        pr = {
                                            "campaign": {
                                                "id": $scope.Id,
                                                "start_date": $scope.dateTime.startDate.date,
                                                "end_date": $scope.dateTime.endDate.date,
                                                "date_changed": $scope.date_changed,
                                                "campaign_status": status,
                                                "timezone": $rootScope.timezone
                                            },
                                            "call_flows": cfdata
                                        };
                                        $(".addTrackingNumbersProgressLoader").show();
                                        CampaignWebService.saveCallFlow(pr).then(function(result) {
                                            $(".addTrackingNumbersProgressLoader").hide();
                                            $("#addTrackingNumbersProgressLoader").css("opacity","1");
                                            $scope.showSaveButton();
                                            $scope.showSubmit();
                                            $scope.formSubmit1 = false;
                                            console.log("Error Response Save Tracking Number:", JSON.stringify(result.data.err));
                                            if (result.data.err === '') {
    
                                                pinesNotifications.notify({
                                                    title: 'Updated Tracking Number',
                                                    text: 'Tracking Number updated successfully.',
                                                    type: 'success'
                                                });
                                                if (!$scope.bCreateAnother) {
                                                    $window.location.href = '#/set-campaign-builder?id='+pr.campaign.id; 
                                                    $route.reload();
                                                } else {
                                                    $scope.getCallFlowList($scope.Id);
                                                    $scope.selectedCallFlow.name = '';
                                                    $scope.selectedCallFlow.callflowlabel = '';
                                                    $scope.isNew = true;
                                                    $scope.selectedCallFlow.callflowOption = 'singleNumber';
                                                }
                                            } else {
                                                pinesNotifications.notify({
                                                    title: 'Updated Tracking Number',
                                                    text: result.data.err,
                                                    type: 'error'
                                                });
                                            }
                                        });
                                    } 
                                    else { // ------------------- edit an existing number pool -----------------------------
    
                                        // it is an existing number pool - just have to know the pool id
                                        var totalRequired = $scope.selectedCallFlow.numberPool - $scope.oldQuantity;
                                        console.log($scope.selectedCallFlow.id);
                                        cfdata.push({
                                            "number_pool": {
                                                "id": $scope.pool_id,
                                                "number_quantity": $scope.selectedCallFlow.numberPool
                                            },
                                            "provisioned_route": {
                                                "route_type": sendingRouteType,
                                                "name": $scope.selectedCallFlow.name,
                                                "repeat_interval": $scope.selectedCallFlow.routetype =='outbound' ? 0 : $scope.selectedCallFlow.routetype =='voicemail' ? 72 : $scope.selectedCallFlow.rinterval,
                                                "call_value": $scope.selectedCallFlow.value,
                                                "org_unit_id": $scope.selectedCallFlow.org_unit_id,
                                                "id": $scope.selectedCallFlow.id,
                                                "post_IVR_enabled": isPostIVREnabled, 
                                            },
                                            "call_flow": {
                                                "id": $scope.callFlowId,
                                                "provisioned_route_id": $scope.selectedCallFlow.id,
                                                "tracking_number": "",
                                                "organizational_unit_id": $scope.selectedCallFlow.org_unit_id,
                                                "ringto": ($scope.selectedCallFlow.routetype =='Outbound' || $scope.selectedCallFlow.routetype =='voicemail') ? '': $scope.selectedCallFlow.ringtoNum,
                                                "route_type": sendingRouteType,
                                                "status": $scope.callFlowstatus,
                                                "play_disclaimer": $scope.selectedCallFlow.playDisclaimer,
                                                "whisper_enabled": whisper_enabled,
                                                "whisper_type": whisper_type,
                                                "whisper_message": whisper_message,
                                                "message_enabled": message_enabled,
                                                "message_type": message_type,
                                                "message": message,
                                                "record_until": record_until,
                                                "number_quantity": $scope.selectedCallFlow.numberPool,
                                                "webhook_id": $scope.selectedCallFlow.showWebhook === true ? $scope.selectedCallFlow.webhook : null,
                                                "customSourceList": customSources,
                                                "spam_active": $scope.selectedCallFlow.spamActive,
                                                "sms_enabled" : $scope.selectedCallFlow.smsActive,
                                                "isSimultaneousRing": $scope.isSimultaneousRing,
                                                "vm_type":vm_type,
                                                "vm_enabled": $scope.selectedCallFlow.activateVoicemail,
                                                "vm_message": vm_message,
                                                "hunt_option":$scope.hunt_option,
                                                "overflowNumbers": ($scope.selectedCallFlow.routetype =='outbound' || $scope.selectedCallFlow.routetype =='voicemail') ? '' :$scope.unmaskOverflowNumbers,
                                                "voicemail_rings_count" : $scope.selectedCallFlow.routetype =='outbound' ? 3 : $scope.selectedCallFlow.voicemail_rings_count,
                                            },
                                            //  "ivrs" : ivrs,
                                            "channel": {
                                                "id": $scope.selectedCallFlow.channel.channel_id
                                            }
                                        });
                                        if(isPostIVREnabled){
                                            cfdata[0].call_flow.post_IVR_data =  $scope.selectedCallFlow.postIVRData;
                                        }
                                        if ($scope.selectedCallFlow.routetype === 'ivr'){
                                            var dummyIvr = [
                                                {
                                                "ivr": {
                                                    "value": 1,
                                                    "target_did": "1111111111",
                                                    "name": "Destincation",
                                                    "ouid": 8,
                                                    "play_disclaimer": "after",
                                                    "record_enabled": 1,
                                                    "message_enabled": 1,
                                                    "message_type": "file",
                                                    "message": "3IvolFCP_1548758869863",
                                                    "webhook_enabled": 0
                                                }
                                                }
                                            ];
                                            cfdata[0].ivrs = dummyIvr;
                                            //cfdata[0].call_flow_recording = {"id": [6426,6427]};
                                            cfdata[0].multiIvrs = ivrs;
                                        }
    
                                        /*if ($scope.selectedCallFlow.routetype === 'outbound'){
                                            cfdata[0].caller_id = 'aaaa'
                                        }*/
                                        if ($scope.selectedCallFlow.routetype === 'simple')
                                            cfdata[0].call_flow.dnis_as_cid = $scope.selectedCallFlow.dnis_as_cid;
    
                                        if ($scope.selectedCallFlow.routetype === 'PercentageBasedRoute')
                                            cfdata[0].ringto_percentage = pringtonums;
    
                                        // if (vpdta.length > 0)
                                        //     cfdata[0].call_flow_recording = {
                                        //         id: vpdta
                                        //     };
    
                                        if ($scope.selectedCallFlow.routetype === 'geo') {
                                            cfdata[0].geo_route = geo_rt;
                                            cfdata[0].geo_options = geo_opt;
                                        }
                                        if ($scope.selectedCallFlow.showDNI) {
                                            cfdata[0].dni_setting = dniSettingData;
                                        }
    
                                        if ($scope.selectedCallFlow.routetype === 'schedule') {
                                            cfdata[0].call_flow.ringto = cfdata[0].call_flow.ringto == undefined ? '':cfdata[0].call_flow.ringto;
                                            cfdata[0].provisioned_route.schedule_data ={};
                                            _.each($scope.scheduleInfo, function(data){
                                                data.ringTo = UserWebService.unMaskData(data.ringTo); 
                                                if(data.overflowNumbers.length > 0 && data.overflowNumbers[0].overflowNumber !==''){
                                                    _.each(data.overflowNumbers, function(oData){
                                                        oData.overflowNumber = UserWebService.unMaskData(oData.overflowNumber)
                                                    })
                                                }else{
                                                    data.overflowNumbers = [];
                                                }
                                            })
                                            cfdata[0].provisioned_route.schedule_data.schedule = $scope.scheduleInfo;
                                            cfdata[0].provisioned_route.schedule_data.timezone =  $scope.selectedCallFlow.timezone.value
                                            cfdata[0].provisioned_route.schedule_data.default_ringto =  $scope.selectedCallFlow.ringtoNum;
                                            cfdata[0].provisioned_route.schedule_data.vm_enabled =  $scope.selectedCallFlow.activateVoicemail;
                                        }
    
                                        pr = {
                                            "campaign": {
                                                "id": $scope.Id,
                                                "start_date": $scope.dateTime.startDate.date,
                                                "end_date": $scope.dateTime.endDate.date,
                                                "date_changed": $scope.date_changed,
                                                "campaign_status": status,
                                                "timezone": $rootScope.timezone
                                            },
                                            "call_flows": cfdata
                                        };
                                        // ------------- need more numbers in pool ---------------
                                        if (($scope.selectedCallFlow.numberPool - $scope.oldQuantity) > 0) {
                                            if ($scope.selectedCallFlow.rate_center.length <= 0) {
                                                // toll free number so order vendor numbers
                                                CampaignWebService.getPhoneNumbers('TOLLFREE', "XX", '888').then(function(result) {
                                                    if (result.data.result != 'error') {
                                                        numbers.push(result.data.json);
                                                        if (numbers.length === 0 || numbers[0].length < ($scope.selectedCallFlow.numberPool - $scope.oldQuantity)) {
                                                            $scope.formSubmit1 = false;
                                                            $scope.showSaveButton();
                                                            $scope.showSubmit();
                                                            pinesNotifications.notify({
                                                                title: 'Pool Numbers',
                                                                text: 'Not enough numbers in the inventory. Please contact customer support or the account manager to get the numbers.',
                                                                type: 'error'
                                                            });
                                                        } else {
                                                            // NOTE:  this will only use the first result set of phone numbers.  Davey 2015-09-10
                                                            numbers = numbers[0].slice(0, ($scope.selectedCallFlow.numberPool - $scope.oldQuantity));
                                                            for (var i = 0; i < numbers.length; i++) {
                                                                var temp_hash = {};
                                                                temp_hash.number = numbers[i].number;
                                                                temp_hash.last_used = null;
                                                                temp_hash.vendor_id = numbers[i].vendor_id;
                                                                pool_phone_numbers.push(temp_hash);
                                                            }
    
                                                            poolData = {
                                                                "type": "add",
                                                                "quantity": $scope.selectedCallFlow.numberPool - $scope.oldQuantity,
                                                                "newNumbers": pool_phone_numbers,
                                                                "name": $scope.selectedCallFlow.name,
                                                                "pool_src": "inventory",
                                                                "dni_setting": ($scope.selectedCallFlow.showDNI) ? dniSettingData : '',
                                                                "webhook": ($scope.selectedCallFlow.showWebhook) ? $scope.selectedCallFlow.webhook : ''
                                                            };
                                                            $(".addTrackingNumbersProgressLoader").show();
                                                            CampaignWebService.updateNumberPool(poolData, $scope.pool_id).then(function(result) {
                                                                CampaignWebService.saveCallFlow(pr).then(function(result) {
                                                                    $(".addTrackingNumbersProgressLoader").hide();
                                                                    $("#addTrackingNumbersProgressLoader").css("opacity","1");
                                                                    $scope.formSubmit1 = false;
                                                                    if (result.data.err === '') {
                                                                        pinesNotifications.notify({
                                                                            title: 'Updated Tracking Number',
                                                                            text: 'Tracking Number updated successfully.',
                                                                            type: 'success'
                                                                        });
                                                                        // $route.reload();
                                                                        $scope.selectedCallFlow.name = '';
                                                                        $scope.selectedCallFlow.callflowlabel = '';    
                                                                        if (!$scope.bCreateAnother) {
                                                                            //$route.reload();
                                                                            $window.location.href = '#/set-campaign-builder?id='+pr.campaign.id+'&cfid='+$scope.selectedCallFlow.id;
                                                                            //$route.reload();
                                                                        } else {
                                                                            $scope.getCallFlowList($scope.Id);
                                                                            $scope.onFocus($scope.selectedCallFlow.address);
                                                                        }
                                                                        // $location.path('/setup-campaign-builder2');
                                                                    } else {
                                                                        pinesNotifications.notify({
                                                                            title: 'Save Tracking Number',
                                                                            text: result.data.err,
                                                                            type: 'error'
                                                                        });
                                                                    }
                                                                });
                                                            });
                                                        }
                                                    }
                                                });
    
    
                                            } //end of if tollfree
                                            else {
                                                var state = '';
                                                if ($scope.rate_center !== null || $scope.rate_center !== '') {
                                                    CampaignWebService.getThirdPartyNumbers($scope.pool_state, $scope.rate_center).then(function(result) {
                                                        if (result.data.result !== 'error') {
                                                            if (result.data.json[0] !== 'fail') {
                                                                numbers.push(result.data.json);
                                                            }
                                                        }
                                                        if (numbers.length === 0 || numbers[0].length < totalRequired) {
                                                            $scope.formSubmit1 = false;
                                                            $scope.showSaveButton();
                                                            $scope.showSubmit();
                                                            pinesNotifications.notify({
                                                                title: 'Pool Numbers',
                                                                text: 'Not enough numbers in the inventory. Please contact customer support or the account manager to get the numbers.',
                                                                type: 'error'
                                                            });
                                                        } else {
                                                            numbers = numbers[0].slice(0, ($scope.selectedCallFlow.numberPool - $scope.oldQuantity));
                                                            console.log('numbers', numbers);
                                                            pool_phone_numbers = [];
                                                            for (var i = 0; i < numbers.length; i++) {
                                                                var temp_hash = {};
                                                                temp_hash.number = numbers[i].number;
                                                                temp_hash.last_used = null;
                                                                temp_hash.vendor_id = numbers[i].vendor_id;
                                                                pool_phone_numbers.push(temp_hash);
                                                            }
                                                            poolData = {
                                                                "type": "add",
                                                                "quantity": $scope.selectedCallFlow.numberPool - $scope.oldQuantity,
                                                                "newNumbers": pool_phone_numbers,
                                                                "name": $scope.selectedCallFlow.name,
                                                                "pool_src": "vendor",
                                                                "dni_setting": ($scope.selectedCallFlow.showDNI) ? dniSettingData : '',
                                                                "webhook": ($scope.selectedCallFlow.showWebhook) ? $scope.selectedCallFlow.webhook : ''
                                                            };
                                                            $(".addTrackingNumbersProgressLoader").show();
                                                            CampaignWebService.updateNumberPool(poolData, $scope.pool_id).then(function(result) {
                                                                if (result.data.err) {
                                                                    $(".addTrackingNumbersProgressLoader").hide();
                                                                    $("#addTrackingNumbersProgressLoader").css("opacity","1");
                                                                    $scope.showSaveButton();
                                                                    $scope.showSubmit();
                                                                    $scope.formSubmit1 = false;
                                                                    pinesNotifications.notify({
                                                                        title: 'Create Tracking Number',
                                                                        text: result.data.err,
                                                                        type: 'error'
                                                                    });
                                                                } else {
                                                                    CampaignWebService.saveCallFlow(pr).then(function(result) {
                                                                        $scope.formSubmit1 = false;
                                                                        $(".addTrackingNumbersProgressLoader").hide();
                                                                        $("#addTrackingNumbersProgressLoader").css("opacity","1");
                                                                        if (result.data.err === '') {
                                                                            pinesNotifications.notify({
                                                                                title: 'Updated Tracking Number',
                                                                                text: 'Tracking Number updated successfully.',
                                                                                type: 'success'
                                                                            });
                                                                            // $route.reload();
                                                                            $scope.selectedCallFlow.name = '';
                                                                            $scope.selectedCallFlow.callflowlabel = ''; 
                                                                            if (!$scope.bCreateAnother) {
                                                                                //$route.reload();
                                                                                $window.location.href = '#/set-campaign-builder?id='+pr.campaign.id+'&cfid='+$scope.selectedCallFlow.id;
                                                                            } else {
                                                                                $scope.getCallFlowList($scope.Id);
                                                                                $scope.onFocus($scope.selectedCallFlow.address);
                                                                            }
                                                                            // $location.path('/setup-campaign-builder2');
                                                                        } else {
                                                                            pinesNotifications.notify({
                                                                                title: 'Save Tracking Number',
                                                                                text: result.data.err,
                                                                                type: 'error'
                                                                            });
                                                                        }
                                                                    });
                                                                }
                                                            });
                                                        }
                                                    });
                                                }
                                            }
                                            // call 3rd party API
    
                                            // ----------------- no additional numbers in pool ----------------
                                        } 
                                        else if (($scope.selectedCallFlow.numberPool - $scope.oldQuantity) < 0) {
                                            var psrc = '';
                                            if ($scope.selectedCallFlow.rate_center.length <= 0) {
                                                psrc = 'inventory';
                                            } else {
                                                psrc = 'vendor';
                                            }
                                            //directly pop the pool numbers
                                            poolData = {
                                                "type": "delete",
                                                "quantity": $scope.oldQuantity - $scope.selectedCallFlow.numberPool,
                                                "name": $scope.selectedCallFlow.name,
                                                "newNumbers": [],
                                                "pool_src": psrc
                                            };
                                            $(".addTrackingNumbersProgressLoader").show();
                                            CampaignWebService.updateNumberPool(poolData, $scope.pool_id).then(function(result) {
                                                if (result.data.err) {
                                                    $(".addTrackingNumbersProgressLoader").hide();
                                                    $("#addTrackingNumbersProgressLoader").css("opacity","1");
                                                    // handled error on update number pool mongo
                                                    $scope.showSaveButton();
                                                    $scope.showSubmit();
                                                    $scope.formSubmit1 = false;
                                                    pinesNotifications.notify({
                                                        title: 'Create Tracking Number',
                                                        text: result.data.err,
                                                        type: 'error'
                                                    });
                                                } else {
                                                    CampaignWebService.saveCallFlow(pr).then(function(result) {
                                                        $scope.formSubmit1 = false;
                                                        $(".addTrackingNumbersProgressLoader").hide();
                                                        $("#addTrackingNumbersProgressLoader").css("opacity","1");
                                                        if (result.data.err === '') {
                                                            pinesNotifications.notify({
                                                                title: 'Updated Tracking Number',
                                                                text: 'Tracking Number updated successfully.',
                                                                type: 'success'
                                                            });
                                                            // $route.reload();
                                                            if (!$scope.bCreateAnother) {
                                                                //$route.reload();
                                                                $window.location.href = '#/set-campaign-builder?id='+pr.campaign.id+'&cfid='+$scope.selectedCallFlow.id;
                                                            // $route.reload();
                                                            } else {
                                                                $scope.getCallFlowList($scope.Id);
                                                                $scope.onFocus($scope.selectedCallFlow.address);
                                                            }
                                                        } else {
                                                            pinesNotifications.notify({
                                                                title: 'Save Tracking Number',
                                                                text: result.data.err,
                                                                type: 'error'
                                                            });
                                                        }
                                                    });
                                                }
                                            });
    
                                        } 
                                        else { // -------------------------- just save call flow ----------------------------
                                            $(".addTrackingNumbersProgressLoader").show();
                                            CampaignWebService.saveCallFlow(pr).then(function(result) {
                                                $scope.formSubmit1 = false;
                                                $(".addTrackingNumbersProgressLoader").hide();
                                                $("#addTrackingNumbersProgressLoader").css("opacity","1");
                                                if (result.data.err === '') {
                                                    pinesNotifications.notify({
                                                        title: 'Updated Tracking Number',
                                                        text: 'Tracking Number updated successfully.',
                                                        type: 'success'
                                                    });
                                                    //  $route.reload();
                                                    if (!$scope.bCreateAnother) {
                                                        //$route.reload();
                                                        $window.location.href = '#/set-campaign-builder?id='+pr.campaign.id;
                                                        $route.reload();
                                                    } else {
                                                        $scope.getCallFlowList($scope.Id);
                                                        $scope.onFocus($scope.selectedCallFlow.address);
                                                        $scope.selectedCallFlow.name = '';
                                                        $scope.selectedCallFlow.callflowlabel = '';
                                                        $scope.selectedCallFlow.callflowOption = 'numberPool';
                                                        $scope.isNew = true;
                                                    }
                                                } else {
                                                    pinesNotifications.notify({
                                                        title: 'Save Tracking Number',
                                                        text: result.data.err,
                                                        type: 'error'
                                                    });
                                                }
                                            });
                                        }
    
                                    } //end of existing number pool
    
                                } else { // ========================== adding a new call flow =================================
                                    cfdata = [];
                                    //  $scope.selectedCallFlow.ringtoNum = "";
                                    $scope.unmaskOverflowNumbers = [];
                                    if($scope.overflowNumbers.length >0){
                                        _.forEach($scope.overflowNumbers,function(num){
                                            if(num.overflowNumber !== '' && num.overflowNumber !== undefined){
                                                var overflowNumber = UserWebService.unMaskData(num.overflowNumber);
                                                $scope.unmaskOverflowNumbers.push({'unmaskNumber' : overflowNumber, 'overflowNumber':num.overflowNumber,'rings':num.rings,'overflow_order':num.overflow_order});
                                            }                               
                                        });
                                    }
                                    if($scope.selectedCallFlow.vmenabled == true){
                                        $scope.selectedCallFlow.vmenabled =1;
                                    }else { $scope.selectedCallFlow.vmenabled = 0; }
                                    // ----------------------- single number call flow -------------------------------------
                                    if ($scope.selectedCallFlow.callflowOption !== "numberPool") {
                                        // if ($scope.selectedCallFlow.routetype === 'ivr')
                                        //  $scope.selectedCallFlow.ringtoNum = "";
                                        cfdata.push({
                                            "provisioned_route": {
                                                "route_type": sendingRouteType,
                                                "name": $scope.selectedCallFlow.name,
                                                "repeat_interval": $scope.selectedCallFlow.routetype =='outbound' ? 0 : $scope.selectedCallFlow.routetype =='voicemail' ? 72 : $scope.selectedCallFlow.rinterval,
                                                "call_value": $scope.selectedCallFlow.value,
                                                "org_unit_id": $rootScope.currentOUId,
                                                "post_IVR_enabled": isPostIVREnabled
                                            },
                                            "call_flow": {
                                                "tracking_number": $scope.selectedCallFlow.num.number,
                                                "organizational_unit_id": $rootScope.currentOUId,
                                                "ringto": ($scope.selectedCallFlow.routetype =='outbound' || $scope.selectedCallFlow.routetype =='voicemail') ? '': $scope.selectedCallFlow.ringtoNum,
                                                "route_type": sendingRouteType,
                                                "status": $scope.callFlowstatus,
                                                "play_disclaimer": $scope.selectedCallFlow.playDisclaimer,
                                                "whisper_enabled": whisper_enabled,
                                                "whisper_type": whisper_type,
                                                "whisper_message": whisper_message,
                                                "message_enabled": message_enabled,
                                                "message_type": message_type,
                                                "message": message,
                                                "record_until": record_until,
                                                "webhook_id": $scope.selectedCallFlow.showWebhook === true ? $scope.selectedCallFlow.webhook : null,
                                                "customSourceList": customSources,
                                                "spam_active": $scope.selectedCallFlow.spamActive,
                                                "sms_enabled" : $scope.selectedCallFlow.smsActive,
                                                "isSimultaneousRing": $scope.isSimultaneousRing,
                                                "vm_type":vm_type,
                                                "vm_enabled": $scope.selectedCallFlow.activateVoicemail,
                                                "vm_message": vm_message,
                                                // "voicemailRings": $scope.selectedCallFlow.voicemailRings,
                                                // "overflowRings": $scope.selectedCallFlow.overflowRings,
                                                "overflowNumbers": ($scope.selectedCallFlow.routetype =='outbound' || $scope.selectedCallFlow.routetype =='voicemail') ? '' :$scope.unmaskOverflowNumbers,
                                                "voicemail_rings_count" : $scope.selectedCallFlow.routetype =='outbound' ? 3 : $scope.selectedCallFlow.voicemail_rings_count
                                            },
                                            "channel": {
                                                "id": $scope.selectedCallFlow.channel.channel_id
                                            }
                                        });
    
                                        if(isPostIVREnabled){
                                            cfdata[0].call_flow.post_IVR_data =  $scope.selectedCallFlow.postIVRData;
                                        }
                                        if ($scope.selectedCallFlow.num.source === 'inventory') {
                                            // JAW CT-7264:updated phone_number_id to number_id
                                            cfdata[0].phone_number = {
                                                "id": $scope.selectedCallFlow.num.number_id,
                                                "vendor_id": $scope.selectedCallFlow.num.vendor_id,
                                                "source": $scope.selectedCallFlow.num.number_ou_id == undefined ? "special_inventory" : $scope.selectedCallFlow.num.source,
                                                "number_ou_id": $scope.selectedCallFlow.num.number_ou_id == undefined ? $rootScope.currentOUId : $scope.selectedCallFlow.num.number_ou_id
                                            };
                                        } else {
                                            // JAW CT-7264:updated phone_number_id to number_id
                                            console.log("inside else",typeof $scope.selectedCallFlow.num.number_id);
                                            cfdata[0].phone_number = {
                                                "number": $scope.selectedCallFlow.num.number_id,
                                                "vendor_id": $scope.selectedCallFlow.num.vendor_id,
                                                "source": $scope.selectedCallFlow.num.source,
                                                "number_ou_id": $scope.selectedCallFlow.num.number_ou_id == undefined ? $rootScope.currentOUId : $scope.selectedCallFlow.num.number_ou_id
                                            };
                                        }
    
                                        if ($scope.selectedCallFlow.routetype === 'ivr'){
                                            var dummyIvr = [
                                                {
                                                "ivr": {
                                                    "value": 1,
                                                    "target_did": "1111111111",
                                                    "name": "Destincation",
                                                    "ouid": 8,
                                                    "play_disclaimer": "after",
                                                    "record_enabled": 1,
                                                    "message_enabled": 1,
                                                    "message_type": "file",
                                                    "message": "3IvolFCP_1548758869863",
                                                    "webhook_enabled": 0
                                                }
                                                }
                                            ];
                                            cfdata[0].ivrs = dummyIvr;
                                            //cfdata[0].call_flow_recording = {"id": [6426,6427]};
                                            cfdata[0].multiIvrs = ivrs;
                                        }
                                        if (pringtonums)
                                            cfdata[0].ringto_percentage = pringtonums;
                                        // if (vpdta.length > 0)
                                        //     cfdata[0].call_flow_recording = {
                                        //         id: vpdta
                                        //     };
                                        if ($scope.selectedCallFlow.routetype === 'geo') {
                                            cfdata[0].geo_route = geo_rt;
                                            cfdata[0].geo_options = geo_opt;
                                        }
                                        if ($scope.selectedCallFlow.routetype === 'outbound'){
                                            cfdata[0].provisioned_route.route_type = $scope.selectedCallFlow.routetype;
                                            cfdata[0].provisioned_route.callerid =  $scope.selectedCallFlow.caller_id;
                                            cfdata[0].provisioned_route.pin = ($scope.selectedCallFlow.pin == undefined || $scope.selectedCallFlow.pin == "") ? null:($scope.selectedCallFlow.pin).toString().replace(/ +/g, "")  ;
                                            
                                        }
                                        if ($scope.selectedCallFlow.showDNI) {
                                            cfdata[0].dni_setting = dniSettingData;
                                        }
    
                                        if ($scope.selectedCallFlow.routetype === 'simple')
                                        {   cfdata[0].call_flow.dnis_as_cid = $scope.selectedCallFlow.dnis_as_cid;  }
                                        if ($scope.selectedCallFlow.routetype === 'schedule') {
                                            cfdata[0].call_flow.ringto = cfdata[0].call_flow.ringto == undefined ? '':cfdata[0].call_flow.ringto;
                                            cfdata[0].provisioned_route.schedule_data ={};
                                            _.each($scope.scheduleInfo, function(data){
                                                data.ringTo = UserWebService.unMaskData(data.ringTo); 
                                                if(data.overflowNumbers.length > 0 && data.overflowNumbers[0].overflowNumber !==''){
                                                    _.each(data.overflowNumbers, function(oData){
                                                        oData.overflowNumber = UserWebService.unMaskData(oData.overflowNumber)
                                                    })
                                                }else{
                                                    data.overflowNumbers = [];
                                                }
                                            })
                                            cfdata[0].provisioned_route.schedule_data.schedule = $scope.scheduleInfo;
                                            cfdata[0].provisioned_route.schedule_data.timezone =  $scope.selectedCallFlow.timezone.value
                                            cfdata[0].provisioned_route.schedule_data.default_ringto =  $scope.selectedCallFlow.ringtoNum;
                                            cfdata[0].provisioned_route.schedule_data.vm_enabled =  $scope.selectedCallFlow.activateVoicemail;
                                        }
                                        pr = {
                                            "campaign": {
                                                "id": $scope.Id,
                                                "start_date": $scope.dateTime.startDate.date,
                                                "end_date": $scope.dateTime.endDate.date,
                                                "date_changed": $scope.date_changed,
                                                "campaign_status": status,
                                                "timezone": $rootScope.timezone
                                            },
                                            "call_flows": cfdata
                                        };
    
                                        console.log(pr);
                                        $(".addTrackingNumbersProgressLoader").show();
                                        CampaignWebService.createCallFlow(pr).then(function(result) {
                                            $scope.showSaveButton();
                                            $scope.showSubmit();
                                            $(".addTrackingNumbersProgressLoader").hide();
                                            $("#addTrackingNumbersProgressLoader").css("opacity","1");
                                            if (result.data.err === '') {
                                                pinesNotifications.notify({
                                                    title: 'Create Tracking Number',
                                                    text: 'Tracking Number created successfully.',
                                                    type: 'success'
                                                });
                                                $scope.selectedCallFlow.name = '';
                                                $scope.selectedCallFlow.callflowlabel = '';                                    
                                                if (!$scope.bCreateAnother) {
                                                    $scope.cfid = $location.search().cfid;
                                                    if($scope.cfid){
                                                        $location.search($scope.cfid, null);
                                                        $window.location.href = '#/set-campaign-builder?id='+pr.campaign.id;
                                                    }else{
                                                        $route.reload();
                                                    }
                                                } else {
                                                    $scope.getCallFlowList($scope.Id);
                                                    $scope.selectedCallFlow.address = '';
                                                    $scope.onFocus($scope.selectedCallFlow.address);
                                                }
                                            } else {
                                                pinesNotifications.notify({
                                                    title: 'Save Tracking Number',
                                                    text: result.data.err,
                                                    type: 'error'
                                                });
                                            }
                                        });
    
                                        // ----------------------- number pool call flow -------------------------------------
                                    } 
                                    else {
                                        // it is a New number pool do stuff
                                        //call the vendors API
                                        if ($scope.selectedCallFlow.address === null || $scope.selectedCallFlow.address === '') {
                                            $scope.showSaveButton();
                                            $scope.showSubmit();
                                            pinesNotifications.notify({
                                                title: 'Save Tracking Number',
                                                text: 'Address field is required',
                                                type: 'error'
                                            });
                                            return;
                                        }
                                        console.log('selectedCallFlow.address', $scope.selectedCallFlow.address);
                                        if ($scope.selectedCallFlow.address.indexOf("TOLLFREE") > 0) {
                                            var stsarr = $scope.selectedCallFlow.address.split(/,|-/);
                                            if (stsarr.length > 2) {
                                                if (stsarr[1] === 'TOLLFREE') {
                                                    stsarr[2] = "XX";
                                                }
                                                if (stsarr[1] != '' && stsarr[2] != '' && stsarr[0] != '') {
                                                    CampaignWebService.getPhoneNumbers(stsarr[1], stsarr[2], stsarr[0]).then(function(result) {
                                                        if (result.data.result != 'error') {
                                                            numbers.push(result.data.json);
                                                            if (numbers.length === 0 || numbers[0].length < $scope.selectedCallFlow.numberPool) {
                                                                $scope.formSubmit1 = false;
                                                                $scope.showSaveButton();
                                                                $scope.showSubmit();
                                                                pinesNotifications.notify({
                                                                    title: 'Pool Numbers',
                                                                    text: 'Not enough numbers in the inventory. Please contact customer support or the account manager to get the numbers.',
                                                                    type: 'error'
                                                                });
                                                            } else {
                                                                // NOTE:  this will only use the first result set of phone numbers.  Davey 2015-09-10
                                                                numbers = numbers[0].slice(0, $scope.selectedCallFlow.numberPool);
                                                                for (var i = 0; i < numbers.length; i++) {
                                                                    var temp_hash = {};
                                                                    temp_hash.number = numbers[i].number;
                                                                    temp_hash.last_used = null;
                                                                    temp_hash.vendor_id = numbers[i].vendor_id;
                                                                    pool_phone_numbers.push(temp_hash);
                                                                }
    
                                                                pool = {
                                                                    "phone_number": pool_phone_numbers,
                                                                    "keep_alive_minutes": null,
                                                                    "organizational_unit_id": $rootScope.currentOUId,
                                                                    "pool_id": null,
                                                                    "provisioned_route_id": null,
                                                                    "name": $scope.selectedCallFlow.name,
                                                                    "state": state,
                                                                    "rate_center": rc2,
                                                                    "pool_src": 'inventory',
                                                                    "dni_setting": ($scope.selectedCallFlow.showDNI) ? dniSettingData : '',
                                                                    "webhook": ($scope.selectedCallFlow.showWebhook) ? $scope.selectedCallFlow.webhook : ''
                                                                };
                                                                $(".addTrackingNumbersProgressLoader").show();
                                                                CampaignWebService.createNumberPool(pool).then(function(result) {
                                                                    if (result.data.err) {
                                                                        // error handling on duplicate dni settings
                                                                        $(".addTrackingNumbersProgressLoader").hide();
                                                                        $("#addTrackingNumbersProgressLoader").css("opacity","1");
                                                                        $scope.showSaveButton();
                                                                        $scope.showSubmit();
                                                                        $scope.formSubmit1 = false;
                                                                        pinesNotifications.notify({
                                                                            title: 'Create Tracking Number',
                                                                            text: result.data.err,
                                                                            type: 'error'
                                                                        });
                                                                    } else {
                                                                        numberPoolFormSubmit = true;
                                                                        insertPoolId = result.data.json[0].pool_id;
                                                                        cfdata.push({
                                                                            "number_pool": {
                                                                                "id": insertPoolId,
                                                                                "number_quantity": $scope.selectedCallFlow.numberPool //pool_phone_numbers.length
                                                                            },
                                                                            "provisioned_route": {
                                                                                "route_type": sendingRouteType,
                                                                                "name": $scope.selectedCallFlow.name,
                                                                                "repeat_interval": ($scope.selectedCallFlow.routetype =='outbound') ? 0 : $scope.selectedCallFlow.rinterval,
                                                                                "call_value": $scope.selectedCallFlow.value,
                                                                                "org_unit_id": $rootScope.currentOUId,
                                                                                "post_IVR_enabled": isPostIVREnabled
                                                                            },
                                                                            "call_flow": {
                                                                                "tracking_number": "",
                                                                                "organizational_unit_id": $rootScope.currentOUId,
                                                                                "ringto": ($scope.selectedCallFlow.routetype =='outbound' || $scope.selectedCallFlow.routetype =='voicemail') ? '': $scope.selectedCallFlow.ringtoNum,
                                                                                "route_type": sendingRouteType,
                                                                                "status": $scope.callFlowstatus,
                                                                                "play_disclaimer": $scope.selectedCallFlow.playDisclaimer,
                                                                                "whisper_enabled": whisper_enabled,
                                                                                "whisper_type": whisper_type,
                                                                                "whisper_message": whisper_message,
                                                                                "message_enabled": message_enabled,
                                                                                "message_type": message_type,
                                                                                "message": message,
                                                                                "record_until": record_until,
                                                                                "number_quantity": $scope.selectedCallFlow.numberPool,
                                                                                "webhook_id": $scope.selectedCallFlow.showWebhook === true ? $scope.selectedCallFlow.webhook : null,
                                                                                "customSourceList": customSources,
                                                                                "vm_type":vm_type,
                                                                                "vm_enabled": $scope.selectedCallFlow.activateVoicemail,
                                                                                "vm_message": vm_message,
                                                                                "spam_active": $scope.selectedCallFlow.spamActive,
                                                                                "sms_enabled" : $scope.selectedCallFlow.smsActive,
                                                                                "isSimultaneousRing": $scope.isSimultaneousRing,
                                                                                "hunt_option":$scope.hunt_option,
                                                                                "overflowNumbers": $scope.unmaskOverflowNumbers,
                                                                                "voicemail_rings_count" : $scope.selectedCallFlow.routetype =='outbound' ? 3 : $scope.selectedCallFlow.voicemail_rings_count,
                                                                            },
                                                                            //"ivrs" : ivrs,
                                                                            "channel": {
                                                                                "id": $scope.selectedCallFlow.channel.channel_id
                                                                            }
                                                                        });
                                                                        if(isPostIVREnabled){
                                                                            cfdata[0].call_flow.post_IVR_data =  $scope.selectedCallFlow.postIVRData;
                                                                        }
                                                                        if ($scope.selectedCallFlow.routetype === 'ivr'){
                                                                            var dummyIvr = [
                                                                                {
                                                                                "ivr": {
                                                                                    "value": 1,
                                                                                    "target_did": "1111111111",
                                                                                    "name": "Destincation",
                                                                                    "ouid": 8,
                                                                                    "play_disclaimer": "after",
                                                                                    "record_enabled": 1,
                                                                                    "message_enabled": 1,
                                                                                    "message_type": "file",
                                                                                    "message": "3IvolFCP_1548758869863",
                                                                                    "webhook_enabled": 0
                                                                                }
                                                                                }
                                                                            ];
                                                                            cfdata[0].ivrs = dummyIvr;
                                                                        // cfdata[0].call_flow_recording = {"id": [6426,6427]};
                                                                            cfdata[0].multiIvrs = ivrs;
                                                                        }
                                                                        if (pringtonums)
                                                                            cfdata[0].ringto_percentage = pringtonums;
                                                                        // if (vpdta.length > 0)
                                                                        //     cfdata[0].call_flow_recording = {
                                                                        //         id: vpdta
                                                                        //     };
                                                                        if ($scope.selectedCallFlow.routetype === 'geo') {
                                                                            cfdata[0].geo_route = geo_rt;
                                                                            cfdata[0].geo_options = geo_opt;
                                                                        }
                                                                        if ($scope.selectedCallFlow.showDNI) {
                                                                            cfdata[0].dni_setting = dniSettingData;
                                                                        }
    
                                                                        if ($scope.selectedCallFlow.routetype === 'simple')
                                                                            cfdata[0].call_flow.dnis_as_cid = $scope.selectedCallFlow.dnis_as_cid;  
    
    
                                                                        if ($scope.selectedCallFlow.routetype === 'schedule') {
                                                                            cfdata[0].call_flow.ringto = cfdata[0].call_flow.ringto == undefined ? '':cfdata[0].call_flow.ringto;
                                                                            cfdata[0].provisioned_route.schedule_data ={};
                                                                            _.each($scope.scheduleInfo, function(data){
                                                                                data.ringTo = UserWebService.unMaskData(data.ringTo); 
                                                                                if(data.overflowNumbers.length > 0 && data.overflowNumbers[0].overflowNumber !==''){
                                                                                    _.each(data.overflowNumbers, function(oData){
                                                                                        oData.overflowNumber = UserWebService.unMaskData(oData.overflowNumber)
                                                                                    })
                                                                                }else{
                                                                                    data.overflowNumbers = [];
                                                                                }
                                                                            })
                                                                            cfdata[0].provisioned_route.schedule_data.schedule = $scope.scheduleInfo;
                                                                            cfdata[0].provisioned_route.schedule_data.timezone =  $scope.selectedCallFlow.timezone.value
                                                                            cfdata[0].provisioned_route.schedule_data.default_ringto =  $scope.selectedCallFlow.ringtoNum;
                                                                            cfdata[0].provisioned_route.schedule_data.vm_enabled =  $scope.selectedCallFlow.activateVoicemail; 
                                                                        }
    
                                                                        pr = {
                                                                            "campaign": {
                                                                                "id": $scope.Id,
                                                                                "start_date": $scope.dateTime.startDate.date,
                                                                                "end_date": $scope.dateTime.endDate.date,
                                                                                "date_changed": $scope.date_changed,
                                                                                "campaign_status": status,
                                                                                "timezone": $rootScope.timezone
                                                                            },
                                                                            "call_flows": cfdata
                                                                        };
    
                                                                        console.log(pr);
                                                                        CampaignWebService.createCallFlow(pr).then(function(result) {
                                                                            $scope.formSubmit1 = false;
                                                                            $(".addTrackingNumbersProgressLoader").hide();
                                                                            $("#addTrackingNumbersProgressLoader").css("opacity","1");
                                                                            if (result.data.err === '') {
                                                                                pinesNotifications.notify({
                                                                                    title: 'Create Tracking Number',
                                                                                    text: 'Tracking Number created successfully.',
                                                                                    type: 'success'
                                                                                });
                                                                                $scope.selectedCallFlow.name = '';
                                                                                $scope.selectedCallFlow.callflowlabel = '';
                                                                                if (!$scope.bCreateAnother) {
                                                                                    $scope.cfid = $location.search().cfid;
                                                                                    if($scope.cfid){
                                                                                        $location.search($scope.cfid, null);
                                                                                        $window.location.href = '#/set-campaign-builder?id='+pr.campaign.id;
                                                                                    }else{
                                                                                        $route.reload();
                                                                                    }
                                                                                } else {
                                                                                    $scope.getCallFlowList($scope.Id);
                                                                                    $scope.selectedCallFlow.address = '';
                                                                                    $scope.onFocus($scope.selectedCallFlow.address);
                                                                                }
                                                                            } else {
                                                                                pinesNotifications.notify({
                                                                                    title: 'Save Tracking Number',
                                                                                    text: result.data.err,
                                                                                    type: 'error'
                                                                                });
                                                                            }
                                                                        });
                                                                    }
                                                                });
                                                            }
                                                        } else {
                                                            // got an error getting numbers
    
                                                        }
                                                    });
                                                }
                                            }    
                                        } else {
                                            $.each($scope.rc, function(key, value) {
                                                if (value.address === $scope.selectedCallFlow.address && rc1.indexOf(value.rc) === -1) {
                                                    rc1.push((value.rc).trim());
                                                    state = (value.state).trim();
                                                }
                                            });
                                            var rc2 = [];
                                            // get third party numbers
                                            for (i = 0; i < rc1.length; i++) {
                                                if (rc1[i] !== null || rc1[i] !== '') {
                                                    CampaignWebService.getThirdPartyNumbers(state, rc1[i]).then(function(result) {
                                                        if (result.data.result !== 'error') {
                                                            if (result.data.json[0] !== 'fail') {
                                                                numbers.push(result.data.json);
                                                            }
                                                        }
    
                                                        rc2.push(rc1.shift());
                                                        if (rc1.length == 0) {
                                                            // NOTE:  testing here against numbers[0] will check against the total number of the first result set - not all result sets combined.  Davey 2015-09-10
                                                            if (numbers.length === 0 || numbers[0].length < $scope.selectedCallFlow.numberPool) {
                                                                $scope.formSubmit1 = false;
                                                                $scope.showSaveButton();
                                                                $scope.showSubmit();
                                                                pinesNotifications.notify({
                                                                    title: 'Pool Numbers',
                                                                    text: 'Not enough numbers in the inventory. Please contact customer support or the account manager to get the numbers.',
                                                                    type: 'error'
                                                                });
                                                            } else {
                                                                // NOTE:  this will only use the first result set of phone numbers.  Davey 2015-09-10
                                                                numbers = numbers[0].slice(0, $scope.selectedCallFlow.numberPool);
                                                                for (var i = 0; i < numbers.length; i++) {
                                                                    var temp_hash = {};
                                                                    temp_hash.number = numbers[i].number;
                                                                    temp_hash.last_used = null;
                                                                    temp_hash.vendor_id = numbers[i].vendor_id;
                                                                    pool_phone_numbers.push(temp_hash);
                                                                }
    
                                                                pool = {
                                                                    "phone_number": pool_phone_numbers,
                                                                    "keep_alive_minutes": null,
                                                                    "organizational_unit_id": $rootScope.currentOUId,
                                                                    "pool_id": null,
                                                                    "provisioned_route_id": null,
                                                                    "name": $scope.selectedCallFlow.name,
                                                                    "state": state,
                                                                    "rate_center": rc2,
                                                                    "pool_src": 'vendor',
                                                                    "dni_setting": ($scope.selectedCallFlow.showDNI) ? dniSettingData : '',
                                                                    "webhook": ($scope.selectedCallFlow.showWebhook) ? $scope.selectedCallFlow.webhook : ''
                                                                };
                                                                $(".addTrackingNumbersProgressLoader").show();
                                                                CampaignWebService.createNumberPool(pool).then(function(result) {
                                                                    if (result.data.err) {
                                                                        $(".addTrackingNumbersProgressLoader").hide();
                                                                        $("#addTrackingNumbersProgressLoader").css("opacity","1");
                                                                        $scope.showSaveButton();
                                                                        $scope.showSubmit();
                                                                        $scope.formSubmit1 = false;
                                                                        pinesNotifications.notify({
                                                                            title: 'Create Tracking Number',
                                                                            text: result.data.err,
                                                                            type: 'error'
                                                                        });
                                                                    } else {
                                                                        numberPoolFormSubmit = true;
                                                                        insertPoolId = result.data.json[0].pool_id;
                                                                        cfdata.push({
                                                                            "number_pool": {
                                                                                "id": insertPoolId,
                                                                                "number_quantity": $scope.selectedCallFlow.numberPool //pool_phone_numbers.length
                                                                            },
                                                                            "provisioned_route": {
                                                                                "route_type": sendingRouteType,
                                                                                "name": $scope.selectedCallFlow.name,
                                                                                "repeat_interval": $scope.selectedCallFlow.rinterval,
                                                                                "call_value": $scope.selectedCallFlow.value,
                                                                                "org_unit_id": $rootScope.currentOUId,
                                                                                "post_IVR_enabled": isPostIVREnabled,
                                                                            },
                                                                            "call_flow": {
                                                                                "tracking_number": "",
                                                                                "organizational_unit_id": $rootScope.currentOUId,
                                                                                "ringto": ($scope.selectedCallFlow.routetype =='outbound' || $scope.selectedCallFlow.routetype =='voicemail') ? '': $scope.selectedCallFlow.ringtoNum,
                                                                                "route_type": sendingRouteType,
                                                                                "status": $scope.callFlowstatus,
                                                                                "play_disclaimer": $scope.selectedCallFlow.playDisclaimer,
                                                                                "whisper_enabled": whisper_enabled,
                                                                                "whisper_type": whisper_type,
                                                                                "whisper_message": whisper_message,
                                                                                "message_enabled": message_enabled,
                                                                                "message_type": message_type,
                                                                                "message": message,
                                                                                "record_until": record_until,
                                                                                "number_quantity": $scope.selectedCallFlow.numberPool,
                                                                                "webhook_id": $scope.selectedCallFlow.showWebhook === true ? $scope.selectedCallFlow.webhook : null,
                                                                                "customSourceList": customSources,
                                                                                "post_IVR_data": $scope.selectedCallFlow.postIVRData,
                                                                                "vm_type":vm_type,
                                                                                "vm_enabled": $scope.selectedCallFlow.activateVoicemail,
                                                                                "vm_message": vm_message,
                                                                                "spam_active": $scope.selectedCallFlow.spamActive,
                                                                                "sms_enabled" : $scope.selectedCallFlow.smsActive,
                                                                                "isSimultaneousRing": $scope.isSimultaneousRing,
                                                                                "hunt_option":$scope.hunt_option,
                                                                                "overflowNumbers": ($scope.selectedCallFlow.routetype =='outbound' || $scope.selectedCallFlow.routetype =='voicemail') ? '' : $scope.unmaskOverflowNumbers,
                                                                                "voicemail_rings_count" : $scope.selectedCallFlow.routetype =='outbound' ? 3 : $scope.selectedCallFlow.voicemail_rings_count,
                                                                            },
                                                                            //"ivrs" : ivrs,
                                                                            "channel": {
                                                                                "id": $scope.selectedCallFlow.channel.channel_id
                                                                            }
                                                                        });
    
                                                                        if ($scope.selectedCallFlow.routetype === 'ivr'){
                                                                            var dummyIvr = [
                                                                                {
                                                                                "ivr": {
                                                                                    "value": 1,
                                                                                    "target_did": "1111111111",
                                                                                    "name": "Destincation",
                                                                                    "ouid": 8,
                                                                                    "play_disclaimer": "after",
                                                                                    "record_enabled": 1,
                                                                                    "message_enabled": 1,
                                                                                    "message_type": "file",
                                                                                    "message": "3IvolFCP_1548758869863",
                                                                                    "webhook_enabled": 0
                                                                                }
                                                                                }
                                                                            ];
                                                                            cfdata[0].ivrs = dummyIvr;
                                                                            //cfdata[0].call_flow_recording = {"id": [6426,6427]};
                                                                            cfdata[0].multiIvrs = ivrs;
                                                                        }
                                                                        if (pringtonums)
                                                                            cfdata[0].ringto_percentage = pringtonums;
                                                                        // if (vpdta.length > 0)
                                                                        //     cfdata[0].call_flow_recording = {
                                                                        //         id: vpdta
                                                                        //     };
                                                                        if ($scope.selectedCallFlow.routetype === 'geo') {
                                                                            cfdata[0].geo_route = geo_rt;
                                                                            cfdata[0].geo_options = geo_opt;
                                                                        }
    
                                                                        if ($scope.selectedCallFlow.routetype === 'simple')
                                                                            cfdata[0].call_flow.dnis_as_cid = $scope.selectedCallFlow.dnis_as_cid;  
    
                                                                        if ($scope.selectedCallFlow.showDNI) {
                                                                            cfdata[0].dni_setting = dniSettingData;
                                                                        }
    
                                                                        if ($scope.selectedCallFlow.routetype === 'schedule') {
                                                                            cfdata[0].call_flow.ringto = cfdata[0].call_flow.ringto == undefined ? '':cfdata[0].call_flow.ringto;
                                                                            cfdata[0].provisioned_route.schedule_data ={};
                                                                            _.each($scope.scheduleInfo, function(data){
                                                                                data.ringTo = UserWebService.unMaskData(data.ringTo); 
                                                                                if(data.overflowNumbers.length > 0 && data.overflowNumbers[0].overflowNumber !==''){
                                                                                    _.each(data.overflowNumbers, function(oData){
                                                                                        oData.overflowNumber = UserWebService.unMaskData(oData.overflowNumber)
                                                                                    })
                                                                                }else{
                                                                                    data.overflowNumbers = [];
                                                                                }
                                                                            })
                                                                            cfdata[0].provisioned_route.schedule_data.schedule = $scope.scheduleInfo;
                                                                            cfdata[0].provisioned_route.schedule_data.timezone =  $scope.selectedCallFlow.timezone.value
                                                                            cfdata[0].provisioned_route.schedule_data.default_ringto =  $scope.selectedCallFlow.ringtoNum;
                                                                            cfdata[0].provisioned_route.schedule_data.vm_enabled =  $scope.selectedCallFlow.activateVoicemail;
                                                                        }
    
                                                                        pr = {
                                                                            "campaign": {
                                                                                "id": $scope.Id,
                                                                                "start_date": $scope.dateTime.startDate.date,
                                                                                "end_date": $scope.dateTime.endDate.date,
                                                                                "date_changed": $scope.date_changed,
                                                                                "campaign_status": status,
                                                                                "timezone": $rootScope.timezone
                                                                            },
                                                                            "call_flows": cfdata
                                                                        };
    
                                                                        console.log(pr);
                                                                        CampaignWebService.createCallFlow(pr).then(function(result) {
                                                                            $scope.formSubmit1 = false;
                                                                            $(".addTrackingNumbersProgressLoader").hide();
                                                                            $("#addTrackingNumbersProgressLoader").css("opacity","1");
                                                                            if (result.data.err === '') {
                                                                                pinesNotifications.notify({
                                                                                    title: 'Create Tracking Number',
                                                                                    text: 'Tracking Number created successfully.',
                                                                                    type: 'success'
                                                                                });
                                                                                $scope.selectedCallFlow.name = '';
                                                                                $scope.selectedCallFlow.callflowlabel = '';
                                                                                if (!$scope.bCreateAnother) {
                                                                                    $scope.cfid = $location.search().cfid;
                                                                                    if($scope.cfid){
                                                                                        $location.search($scope.cfid, null);
                                                                                        $window.location.href = '#/set-campaign-builder?id='+pr.campaign.id;
                                                                                    }else{
                                                                                        $route.reload();
                                                                                    }
                                                                                } else {
                                                                                    $scope.getCallFlowList($scope.Id);
                                                                                    $scope.selectedCallFlow.address = '';
                                                                                    $scope.onFocus($scope.selectedCallFlow.address);
                                                                                }
                                                                            } else {
                                                                                pinesNotifications.notify({
                                                                                    title: 'Save Tracking Number',
                                                                                    text: result.data.err,
                                                                                    type: 'error'
                                                                                });
                                                                            }
                                                                        });
                                                                    }
                                                                });
                                                            }
                                                        }
                                                    });
                                                }
                                            }
                                        } //end of else get thirs party sh
                                    } // end of new number pool
                                } // end of new call flow
                            } // $scope.Id
                        }else{
                            $scope.showSubmit();
                            $scope.formSubmit1 = false;
                        }
                       });
                    }else{
                        $scope.showSubmit();
                        $scope.formSubmit1 = false;
                    }
                });
            };

            ////////////////////////////////////////////////////////////////////////////////////
            // DNI functions

            $scope.dni_settings = [];

            //set default referrers
            $scope.dniReferrer = [{
                    value: 'new',
                    text: "Add New"
                },
                {
                    value: '*.*|null',
                    text: "Any"
                },
                {
                    value: '*.bing.com|null',
                    text: "Bing"
                },
                {
                    value: '*.google.*|paid',
                    text: "Google (Paid)"
                },
                {
                    value: '*.google.*|organic',
                    text: "Google (Organic)"
                },
                {
                    value: '*.yahoo.com|paid',
                    text: "Yahoo (Paid)"
                },
                {
                    value: '*.yahoo.com|organic',
                    text: "Yahoo (Organic)"
                }
            ];

            $scope.dniOuId = null;
            $scope.showTtl = [];

            //get dni settings

            $scope.dni_type = [{
                    id: "url",
                    text: "URL"
                },
                {
                    id: "source",
                    text: "Source"
                },
                {
                    id: "session",
                    text: "Session"
                }
            ];
        }
     
    ]);
