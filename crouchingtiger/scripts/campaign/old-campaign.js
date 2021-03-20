//jshint ignore:start
angular
    .module('old-campaigns-builder', ['angularFileUpload', 'kendo.directives', 'ui.select2', 'toggle-switch', 'angularUtils.directives.dirPagination', "api-param", "datetime-timezoned", "ngTagsInput"])
    .directive('file', function() {
        return {
            scope: {
                file: '='
            },
            link: function(scope, el, attrs) {
                el.bind('change', function(event) {
                    var files = event.target.files;
                    var file = files[0];
                    scope.file = file ? file.name : undefined;
                    scope.$apply();
                });
            }
        };
    })
    .factory('OldCampaignWebService', function($q, $timeout, $http, $window, $rootScope, $upload, ApiParam) {
        'use strict';
        var OldCampaignWebService = {};
        OldCampaignWebService.getCampaigns = function(userAccess, pageSize) {
            $http.defaults.useXDomain = true;
            return $http.get(ApiParam.baseURL() + "/v1/campaign/ouid/" + $rootScope.currentOUId + "/userAccess/" + userAccess + "/" + encodeURIComponent($rootScope.timezone) + "/pageSize/" + pageSize, ApiParam.headerConfig());

        };
 
        OldCampaignWebService.getCampaign = function(id) {
            $http.defaults.useXDomain = true;
            return $http.get(ApiParam.baseURL() + "/v1/campaign/" + id + "/" + encodeURIComponent($rootScope.timezone), ApiParam.headerConfig());
        };
        //SP campaigndata for report
        OldCampaignWebService.getCampaignsReport = function(userAccess, pageSize) {
            $http.defaults.useXDomain = true;
            return $http.get(ApiParam.baseURL() + "/v1/campaign/reportData/ouid/" + $rootScope.currentOUId + "/userAccess/" + userAccess + "/" + encodeURIComponent($rootScope.timezone), ApiParam.headerConfig());

        };

        OldCampaignWebService.saveBulkCallActions = function(ca) {
            var req = {
                method: 'POST',
                url: ApiParam.baseURL() + "/v1/callAction/bulk",
                headers: ApiParam.headerConfig().headers,
                data: ca
            };
            return $http(req);
        };
        //SP campaign Tracking Number details

        OldCampaignWebService.getCampaignsCallFlowReport = function(userAccess) {

            $http.defaults.useXDomain = true;
            return $http.get(ApiParam.baseURL() + "/v1/campaign/reportData/ouid/" + $rootScope.currentOUId + "/userAccess/" + userAccess + "/" + encodeURIComponent($rootScope.timezone), ApiParam.headerConfig());


        };



        //SP

        //SPservice
        OldCampaignWebService.getCampaignCallflows = function(campaignIds) {
            var req = {
                method: 'POST',
                url: ApiParam.baseURL() + "/v1/campaignCallflow",
                headers: ApiParam.headerConfig().headers,
                data: campaignIds
            };
            return $http(req);
        };
        //SPservice
        // //SP service for report
        // OldCampaignWebService.getCampaignCallflowsReport = function (campIdReport) {
        //     var req = {
        //         method:  'POST',
        //         url:     ApiParam.baseURL() + "/v1/campaignCallflowReport",
        //         headers: ApiParam.headerConfig().headers,
        //         data:    campIdReport
        //     };
        //     return $http(req);
        // };

        OldCampaignWebService.showCall = function(camo) {
            var req = {
                method: 'POST',
                url: ApiParam.baseURL() + "/v1/campaign",
                headers: ApiParam.headerConfig().headers,
                data: nc
            };
            return $http(req);
        };

        OldCampaignWebService.createCampaign = function(nc) {
            var req = {
                method: 'POST',
                url: ApiParam.baseURL() + "/v1/campaign",
                headers: ApiParam.headerConfig().headers,
                data: nc
            };
            return $http(req);
        };

        OldCampaignWebService.createNumberPool = function(numberPool) {
            var req = {
                method: 'POST',
                url: ApiParam.baseURL() + "/v1/numberpool",
                headers: ApiParam.headerConfig().headers,
                data: numberPool
            };
            return $http(req);
        };

        OldCampaignWebService.updateNumberPool = function(numberPool, pool_id) {
            var req = {
                method: 'PUT',
                url: ApiParam.baseURL() + "/v1/numberpool/" + pool_id,
                headers: ApiParam.headerConfig().headers,
                data: numberPool
            };
            return $http(req);
        };

        OldCampaignWebService.updateCampaign = function(campaignData) {
            var req = {
                method: 'PUT',
                url: ApiParam.baseURL() + "/v1/campaign/",
                headers: ApiParam.headerConfig().headers,
                data: campaignData
            };
            return $http(req);
        };

        OldCampaignWebService.setCampaignStatus = function(nc) {
            var req = {
                method: 'PUT',
                url: ApiParam.baseURL() + "/v1/campaign/status",
                headers: ApiParam.headerConfig().headers,
                data: nc
            };
            return $http(req);
        };

        OldCampaignWebService.getPhoneNumbers = function(city, state, npa) {
            $http.defaults.useXDomain = true;
            return $http.get(ApiParam.baseURL() + "/v1/phonenumber/city/" + city + "/state/" + state + "/npa/" + npa, ApiParam.headerConfig());

        };

        OldCampaignWebService.getReservedNumbers = function() {
            $http.defaults.useXDomain = true;
            return $http.get(ApiParam.baseURL() + "/v1/phonenumber/reserved/" + $rootScope.currentOUId, ApiParam.headerConfig());
        };

        OldCampaignWebService.getPhoneNumber = function(number) {
            $http.defaults.useXDomain = true;
            return $http.get(ApiParam.baseURL() + "/v1/phonenumber/number/" + number, ApiParam.headerConfig());

        };

        OldCampaignWebService.createCallFlow = function(cf) {
            var req = {
                method: 'POST',
                url: ApiParam.baseURL() + "/v1/provisionedroute",
                headers: ApiParam.headerConfig().headers,
                data: cf
            };
            return $http(req);
        };

        OldCampaignWebService.saveCallFlow = function(cf) {
            var req = {
                method: 'PUT',
                url: ApiParam.baseURL() + "/v1/provisionedroute",
                headers: ApiParam.headerConfig().headers,
                data: cf
            };
            return $http(req);
        };

        OldCampaignWebService.getGeoCity = function(val) {
            $http.defaults.useXDomain = true;
            return $http.get(ApiParam.baseURL() + "/v1/geolookup/cities/" + val, ApiParam.headerConfig());
        };

        OldCampaignWebService.getGeoZip = function(val) {
            $http.defaults.useXDomain = true;
            return $http.get(ApiParam.baseURL() + "/v1/phonenumber/zip/" + val, ApiParam.headerConfig());

        };

        OldCampaignWebService.getDefaultData = function(ouid) {
            $http.defaults.useXDomain = true;
            return $http.get(ApiParam.baseURL() + "/v1/defgroupsetting/populatecallflow/" + ouid, ApiParam.headerConfig());

        };

        OldCampaignWebService.getGeoArea = function(val) {
            $http.defaults.useXDomain = true;
            return $http.get(ApiParam.baseURL() + "/v1/phonenumber/npa/" + val, ApiParam.headerConfig());
        };

        OldCampaignWebService.getCompUsers = function(id) {
            $http.defaults.useXDomain = true;
            return $http.get(ApiParam.baseURL() + "/v1/user/campaignUser/" + id, ApiParam.headerConfig());
        };

        OldCampaignWebService.getCampOwners = function(id, campId) {
            $http.defaults.useXDomain = true;
            return $http.get(ApiParam.baseURL() + "/v1/user/campaignOwner/" + $rootScope.currentOUId + "/" + campId, ApiParam.headerConfig());
        };

        OldCampaignWebService.getChannels = function() {
            $http.defaults.useXDomain = true;
            return $http.get(ApiParam.baseURL() + "/v1/channel", ApiParam.headerConfig());
        };

        OldCampaignWebService.getprovRouteCallFlow = function(id) {
            $http.defaults.useXDomain = true;
            return $http.get(ApiParam.baseURL() + "/v1/callflow/provisionedroute/" + id, ApiParam.headerConfig());
        };

        OldCampaignWebService.getVoicePrompts = function(id) {
            var id1 = $rootScope.currentOUId;
            $http.defaults.useXDomain = true;
            return $http.get(ApiParam.baseURL() + "/v1/callflowrecording/" + id1 + "/prompt", ApiParam.headerConfig());
        };

        OldCampaignWebService.getWhispers = function(id) {
            var id1 = 1;
            $http.defaults.useXDomain = true;
            return $http.get(ApiParam.baseURL() + "/v1/callflowrecording/" + id + "/whisper", ApiParam.headerConfig());
        };

        OldCampaignWebService.getTags = function() {
            // $http.defaults.useXDomain = true;
            return $http.get(ApiParam.baseURL() + "/v1/tag/" + $rootScope.currentOUId, ApiParam.headerConfig());
        };

        OldCampaignWebService.getCustomSources = function() {
            // $http.defaults.useXDomain = true;
            return $http.get(ApiParam.baseURL() + "/v1/customsource/ouid/" + $rootScope.currentOUId + "/userAccess/" + $rootScope.userAccess.campaign, ApiParam.headerConfig());
        };

        OldCampaignWebService.getWebhooks = function() {
            var id1 = $rootScope.currentOUId;
            // $http.defaults.useXDomain = true;
            return $http.get(ApiParam.baseURL() + "/v1/webhook/list/" + id1, ApiParam.headerConfig());
        };

        OldCampaignWebService.createTag = function(tag) {
            var req = {
                method: 'POST',
                url: ApiParam.baseURL() + "/v1/tag",
                headers: ApiParam.headerConfig().headers,
                data: tag
            };
            return $http(req);
        };

        OldCampaignWebService.createCustomSource = function(customSource) {
            var req = {
                method: 'POST',
                url: ApiParam.baseURL() + "/v1/customsource",
                headers: ApiParam.headerConfig().headers,
                data: customSource
            };
            return $http(req);
        };

        OldCampaignWebService.uploadVoicePrompt = function(files) {
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

        OldCampaignWebService.uploadWhisper = function(files) {
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
        OldCampaignWebService.uploadAudio = function(files, message) {
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
        OldCampaignWebService.saveCallActions = function(ca) {
            var req = {
                method: 'POST',
                url: ApiParam.baseURL() + "/v1/callAction",
                headers: ApiParam.headerConfig().headers,
                data: ca
            };
            return $http(req);
        };

        OldCampaignWebService.updateCallActions = function(ca) {
            var req = {
                method: 'PUT',
                url: ApiParam.baseURL() + "/v1/callAction",
                headers: ApiParam.headerConfig().headers,
                data: ca
            };
            return $http(req);
        };

        OldCampaignWebService.getcallActions = function(id) {
            $http.defaults.useXDomain = true;
            return $http.get(ApiParam.baseURL() + "/v1/callAction/byRoute/" + id, ApiParam.headerConfig());
        };

        OldCampaignWebService.removecallActions = function(id) {
            var req = {
                method: 'DELETE',
                url: ApiParam.baseURL() + "/v1/callAction/" + id,
                headers: ApiParam.headerConfig().headers
            };
            return $http(req);
        };

        OldCampaignWebService.callActionDC = function(id) {
            $http.defaults.useXDomain = true;
            return $http.get(ApiParam.baseURL() + "/v1/doubleclick/callAction/" + id, ApiParam.headerConfig());
        };

        /*
         * Call third party url for numbers
         * @param: state, rc
         * @return: json array
         */
        OldCampaignWebService.getThirdPartyNumbers = function(state, rc) {
            var req = {
                method: 'GET',
                url: ApiParam.baseURL() + "/v1/shoutpoint/rcState/" + encodeURIComponent(rc) + "/" + state,
                headers: ApiParam.headerConfig().headers
            };
            return $http(req);
        };
        OldCampaignWebService.removeCallFlow = function(pnumber) {
            var req = {
                method: 'PUT',
                url: ApiParam.baseURL() + "/v1/provisionedroute/delete",
                headers: ApiParam.headerConfig().headers,
                data: pnumber
            };
            return $http(req);
        };
        //saveBlackList
        OldCampaignWebService.saveBlackList = function(bl) {
            var req = {
                method: 'POST',
                url: ApiParam.baseURL() + "/v1/blacklist",
                headers: ApiParam.headerConfig().headers,
                data: bl
            };
            return $http(req);
        };
        OldCampaignWebService.getBlackList = function(id) {
            var req = {
                method: 'GET',
                url: ApiParam.baseURL() + "/v1/blacklist/ouid/" + id,
                headers: ApiParam.headerConfig().headers
            };
            return $http(req);
        };
        OldCampaignWebService.deleteAudioFile = function(data) {
            var req = {
                method: 'PUT',
                url: ApiParam.baseURL() + "/v1/callflowrecording/delete",
                headers: ApiParam.headerConfig().headers,
                data: data
            };
            return $http(req);
        };

        OldCampaignWebService.getGeoLocations = function() {
            //console.log($window.sessionStorage.token);
            $http.defaults.useXDomain = true;
            return $http.get(ApiParam.baseURL() + "/v1/location/ouid/" + $rootScope.currentOUId + "/" + encodeURIComponent($rootScope.timezone), ApiParam.headerConfig());

        };
        OldCampaignWebService.getTTS = function(TextToSpeech) {
            //console.log($window.sessionStorage.token);
            $http.defaults.useXDomain = true;
            return $http.get(ApiParam.baseURL() + "/v1/callflow/getmedia/" + encodeURIComponent(TextToSpeech), ApiParam.headerConfig());
        };

        OldCampaignWebService.getAnalytics = function() {
            $http.defaults.useXDomain = true;
            return $http.get(ApiParam.baseURL() + "/v1/analytic/ouid/" + $rootScope.currentOUId + "/includeParentAnalytics/" + true, ApiParam.headerConfig());
        };

        OldCampaignWebService.validateDniData = function(data, show) {
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
            } else if (!data.referrer) {
                arrInvalidMessage.push("Referring Website field is required.");
            }

            if (data.dni_type == "" || data.dni_type == 'Select') {
                arrInvalidMessage.push("DNI Type field is required.");
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

        OldCampaignWebService.checkLDM = function(body) {
            var req = {
                method: 'POST',
                url: ApiParam.baseURL() + "/v1/ldm",
                headers: ApiParam.headerConfig().headers,
                data: body
            };
            return $http(req);
        };
        return OldCampaignWebService;
    })
    .factory('VoicePromptService', ['$rootScope', 'OldCampaignWebService',
        function($rootScope, OldCampaignWebService) {
            'use strict';
            var prompts = [];
            OldCampaignWebService.getVoicePrompts($rootScope.currentOUId).then(function(result) {
                if (result.data.result != 'error') {
                    prompts = result.data.json;
                    if (prompts.length) {
                        for (var i = 0; i < prompts.length; i++) {
                            prompts[i].selectedprompt = false;
                        }
                    }
                } else {
                    //alert("Failed to update campaign");
                }
            });
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
    .factory('WhisperMessageService', ['$rootScope', 'OldCampaignWebService', function($rootScope, OldCampaignWebService) {
        'use strict';
        var whispers = [];

        OldCampaignWebService.getWhispers($rootScope.currentOUId).then(function(result) {
            //console.log(result);
            if (result.data.result != 'error') {
                whispers = result.data.json;
                if (whispers.length) {
                    for (var i = 0; i < whispers.length; i++) {
                        whispers[i].selectedwhisper = false;
                    }
                }
            } else {
                //alert("Failed to update campaign");
            }
        });
        return {
            getWhispers: function() {
                return whispers;
            },
            setWhispers: function(whisper) {
                whispers = whisper;
            }
        };
    }])
    .controller('oldVoiceModal', ['$scope', '$rootScope', '$window', '$uibModalInstance', 'VoicePromptService', 'OldCampaignWebService', 'pinesNotifications', '$bootbox',
        function($scope, $rootScope, $window, $uibModalInstance, voicepromptService, OldCampaignWebService, pinesNotifications, $bootbox) {
            var filecontrol = $("#filecontrol");
            $scope.upload = {};
            $scope.upload.showme = [];

            $rootScope.prompts = [];
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
                $rootScope.prompts = '';
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
                        OldCampaignWebService.deleteAudioFile(promtFile).then(function(response) {
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

                                pinesNotifications.notify({
                                    title: 'Voice Prompt Message',
                                    text: 'Voice Prompt Message deleted successfully',
                                    type: 'success'
                                });
                                $scope.prompts.splice(index, 1);
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
                    OldCampaignWebService.uploadAudio(fd, 'prompt').then(function(response) {
                        $scope.fileIsUploading = false;
                        if (response.data.result != 'error') {
                            $scope.inserted = {
                                id: $scope.prompts.length + 1,
                                name: response.data.json.call_flow_recording.url.filename,
                                url: response.data.json.call_flow_recording.url.url,
                                status: null,
                                group: null
                            };
                            $scope.upload.files = null;
                            // $scope.prompts.push($scope.inserted);
                            OldCampaignWebService.getVoicePrompts($rootScope.currentOUId).then(function(result) {
                                if (result.data.result != 'error') {
                                    $scope.prompts = result.data.json;

                                    var prompts = JSON.parse($window.sessionStorage.prompts);
                                    var uploaded = $scope.prompts[$scope.prompts.length-1];
                                    uploaded['active'] = true;
                                    prompts.push(uploaded);

                                    $window.sessionStorage.prompts = JSON.stringify(prompts);
                                    $rootScope.prompts = prompts;
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
                            $scope.audio[index].currentTime = playtime - 10;
                        }
                        $scope.audio[index].play();
                        break;

                    case 'forward':
                        $scope.audio[index].pause();
                        if ($scope.audio[x].currentTime) {
                            playtime = $scope.audio[index].currentTime;
                            $scope.audio[index].currentTime = playtime + 10;
                        }
                        $scope.audio[index].play();
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
    .controller('oldWhisperModal', ['$scope', '$rootScope', '$window', '$uibModalInstance', 'WhisperMessageService', 'OldCampaignWebService', 'pinesNotifications', '$bootbox',
        function($scope, $rootScope, $window, $uibModalInstance, whispermessageService, OldCampaignWebService, pinesNotifications, $bootbox) {
            var filecontrol = $("#filecontrol");
            $scope.upload = {};
            $scope.upload.showme = [];

            $scope.whispers = [];
            $rootScope.whispers = [];
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
                        OldCampaignWebService.deleteAudioFile(whispFile).then(function(response) {
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
                    OldCampaignWebService.uploadAudio(fd, 'whisper').then(function(response) {
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
                            OldCampaignWebService.getWhispers($rootScope.currentOUId).then(function(result) {
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
                            $scope.audio[index].currentTime = playtime - 10;
                            $scope.audio[index].play();
                        }
                        break;

                    case 'forward':
                        $scope.audio[index].pause();
                        if ($scope.audio[x].currentTime) {
                            playtime = $scope.audio[index].currentTime;
                            $scope.audio[index].currentTime = playtime + 10;
                        }
                        $scope.audio[index].play();
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
    .controller('CampaignsTableController', ['$scope', '$rootScope', '$filter', 'OldCampaignWebService', 'SelectedCampaign', '$location', '$window', '$q', '$bootbox', 'pinesNotifications', 'ApiParam',
        function($scope, $rootScope, $filter, OldCampaignWebService, SelectedCampaign, $location, $window, $q, $bootbox, pinesNotifications, ApiParam) {
            'use strict';


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
            $scope.CurrentOUNameCSV = $scope.CurrentOUName + ".csv";
            // $scope.CurrentOUNameTSV = $scope.CurrentOUName + ".tsv";
            $scope.campaginCallFlowHeader = ['Name', 'Campaign Start', 'Campaign End', 'Tracking Numbers', 'Status'];
            $scope.actionHeader = ['Actions'];
            $scope.userId = parseInt($rootScope.userId);
            $rootScope.isSafari = $window.sessionStorage.isSafari = /constructor/i.test(window.HTMLElement) || (function(p) {
                return p.toString() === "[object SafariRemoteNotification]";
            })(!window.safari || safari.pushNotification);
            $scope.pageNumber = 1;
            var token = 'bearer ' + $window.sessionStorage.token;
            $scope.collapse = false;
            console.log(ApiParam.baseURL());

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
                                //console.log(e.responseText)
                            },
                            dataType: "json"
                        },
                    },
                    schema: {
                        //--------------------------------------------------------------
                        //Show the data & count on the grid (otherwise it'll throw the error - "Unable to get __count of undefined or null...."
                        data: function(data) {
                            return data.json.campaigns;
                        },
                        total: function(data) {
                                return data.json.total
                                    //NEED TO KNOW HOW TO RETURN TOTAL?
                            }
                            //--------------------------------------------------------------
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
                        OldCampaignWebService.removeCallFlow(pr).then(function(result) {
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
                console.log(dataItem);
                $location.path('/set-campaign-builder');
                $location.search('id', dataItem.campaign_id);

            };
            $scope.archiveCampaign = function(dataItem) {
                console.log(camp_id);
                var campaignName = dataItem.name,
                    camp_id = dataItem.campaign_id;
                //   campaignId   = index[0],
                //   list_ids     = index[8];


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
                        OldCampaignWebService.setCampaignStatus(saveData).then(function(result) {
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
                return ["Account Name", "Account ID", "Group Name", "Group ID", "Group External ID", "Group Status", "Campaign Name", "Campaign ID", "Campaign External ID", "Campaign Start", "Campaign End", "Campaign Status", "Tracking Number Name", "Tracking Number ID", "Tracking Number", "Ring-to", "DNI", "Ad Source", "Custom Source 1", "Custom Source 2", "Custom Source 3", "Custom Source 4", "Custom Source 5", "Spam Guard Status"];
            };
            $scope.getCSVData = function(formate) {

                var campIdReport = {};
                var campaignIdsRport = [];
                var campReportData = {};
                var callFlowData = {};
                var getCallFlowReport = {};
                var deferred = $q.defer();
                var response = OldCampaignWebService.getCampaignsCallFlowReport($scope.userAccess.campaign);
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
    .controller('OldCampaignFormController', ['$scope', '$timeout', '$http', '$uibModal', '$location', 'OldCampaignWebService', 'SelectedCampaign', 'PhoneList', '$window', '$rootScope', 'pinesNotifications', '$route', 'DNIWebService', 'smDateTimePicker',
        function($scope, $timeout, $http, $uibModal, $location, OldCampaignWebService, SelectedCampaign, PhoneList, $window, $rootScope, pinesNotifications, $route, DNIWebService, smDateTimePicker) {
            'use strict';

            // CT-15371 - James Lemire
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
            if($rootScope.is_migrated == true || $rootScope.is_migrated == 'true' ){
                var path = $location.url().split('?');
                if($location.path() == '/set-campaign-builder'){
                    location.href = '#/set-legacy-campaign-builder?'+ path[1];
                }else{
                    $location.path('/set-campaign-builder');
                    $location.search('id',$rootScope.editClickId);
                }
            }

            $scope.dateTime = {};
            $scope.dateTime.startDate = {};
            $scope.universalNow = moment.tz($rootScope.timezone);
            $scope.dateTime.startDate.minDate = moment.tz($rootScope.timezone);
            $scope.dateTime.startDate.date = moment.tz($rootScope.timezone);
            $scope.dateTime.startDate.opened = false;
            $scope.dateTime.startDate.isMeridian = true;
            $scope.startOnLoad = true;

            $scope.dateTime.endDate = {};
            $scope.dateTime.endDate.minDate = moment.tz($rootScope.timezone);
            $scope.dateTime.endDate.date = undefined;
            $scope.dateTime.endDate.opened = false;
            $scope.dateTime.endDate.isMeridian = true;

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
                        document.getElementById("referral-label").style.cursor = "pointer";
                        referralCheckbox.style.cursor = "pointer";

                        $scope.disableReferral = false;
                    } else {
                        document.getElementById("referral-container").style.opacity = "0.5";
                        document.getElementById("referral-label").style.cursor = "not-allowed";
                        referralCheckbox.style.cursor = "not-allowed";

                        $scope.disableReferral = true;
                    }
                }
            }

            $scope.updateCallFlows = function() {
                    OldCampaignWebService.getCampaign($scope.Id).then(function(result) {
                        var campaignData = result.data.json.campaigns[0];
                        console.log('INSIDE updateCallFlows IN campaign.js: Updating $scope.phoneNumbers with:', campaignData);
                        $scope.phoneNumbers = [];
                        campaignData.status === "inactive" ? $scope.campActive = false : $scope.campActive = true;
                        campaignData.provisioned_routes.forEach(function(provRoute) {
                            if (provRoute.phone_numbers.length > 0) {
                                var provCategory = '';
                                var provSubCategory = '';
                                var provChannelId = '';
                                var f = (provRoute.status).charAt(0).toUpperCase();
                                provRoute.status = f + (provRoute.status).substr(1);

                                if (provRoute.channels[0]) {
                                    provCategory = provRoute.channels[0].category;
                                    provSubCategory = provRoute.channels[0].sub_category;
                                    provChannelId = provRoute.channels[0].id;
                                }

                                if (provRoute.phone_numbers[0].number) {
                                    if (!provRoute.pool) {
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
                                            webhook_id: provRoute.webhook_id
                                        });
                                    } else {
                                        $scope.phoneNumbers.push({
                                            id: provRoute.id,
                                            phonep: provRoute.name,
                                            pooId: provRoute.pool[0].pool_id,
                                            quantity: provRoute.pool[0].quantity,
                                            state: provRoute.pool[0].state,
                                            rate_center: provRoute.pool[0].rate_center,
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
                                            webhook_id: provRoute.webhook_id
                                        });
                                    }
                                }
                            }
                        });
                    });
                }
                // CT-15371 - James Lemire

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
            }

            $scope.checkCallFlowIdUrl = function(pnumber) {
                    $rootScope.$emit("loadCallFlowReceiver", pnumber);

                }
                //$scope.callFlowActive = true;
            OldCampaignWebService.getCampOwners($rootScope.currentOUId, $scope.Id).then(function(result) {
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
            // OldCampaignWebService.getCompUsers needs to be called before getCampaign does in order for
            // Assign Users to correctly fill in previously selected users
            OldCampaignWebService.getCompUsers($rootScope.currentOUId).then(function(result) {
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
                            return OldCampaignWebService.getCampaign($scope.Id);
                        } else {
                            $scope.campActive = true;
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
                //Notice the web service call up above a few lines for OldCampaignWebService.getCampaign($scope.Id);
                .then(function(result) {
                    if (result) {
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
                            $scope.name = campaignData.name;
                            $scope.campId = campaignData.campaign_id;
                            $scope.campExtId = campaignData.campaign_ext_id;
                            initialStatus = campaignData.status;
                            var provisionedrouteIds = [];

                            if (initialStatus === null || initialStatus === "inactive" || initialStatus === "referral") {
                                $scope.campActive = false;
                                $scope.iStatus = false;
                                $scope.endDateIsNotEditable = true;
                            } else {
                                $scope.campActive = true;
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
                            // console.log('INSIDE OldCampaignWebService.getCampaign IN campaign.js: selUsers:', $scope.selUsers);
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
                                    var showExtraData = false;
                                    var f = (provRoute.status).charAt(0).toUpperCase();
                                    provRoute.status = f + (provRoute.status).substr(1);
                                    if (provRoute.channels[0]) {
                                        provCategory = provRoute.channels[0].category;
                                        provSubCategory = provRoute.channels[0].sub_category;
                                        provChannelId = provRoute.channels[0].id;
                                    }
                                    

                                    if(provisionedrouteIds.length === 0){
                                        provisionedrouteIds.push(provRoute.id);
                                        showExtraData = true;
                                    }
                                    else if(provisionedrouteIds.indexOf(provRoute.id) === -1){
                                        showExtraData = true;
                                        provisionedrouteIds.push(provRoute.id);
                                    }

                                    if (provRoute.phone_numbers[0].number && showExtraData) {
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
                                                routetype:provRoute.route_type, 
                                                group: 4,
                                                groupName: 'admin',
                                                vendor_id: provRoute.phone_numbers[0].vendor_id,
                                                end_date: moment.utc(provRoute.referral_end_date).format('MM/DD/YYYY'),
                                                webhook_id: provRoute.webhook_id
                                            });
                                        } else {
                                            $scope.phoneNumbers.push({
                                                id: provRoute.id,
                                                phonep: provRoute.name,
                                                pooId: provRoute.pool[0].pool_id,
                                                quantity: provRoute.pool[0].quantity,
                                                state: provRoute.pool[0].state,
                                                rate_center: provRoute.pool[0].rate_center,
                                                name: provRoute.name,
                                                channels: provCategory + ":" + provSubCategory,
                                                channelId: provChannelId,
                                                status: provRoute.status,
                                                routetype: provRoute.route_type, 
                                                value: provRoute.call_value,
                                                rinterval: provRoute.repeat_interval,
                                                status2: provRoute.status,
                                                group: 4,
                                                groupName: 'admin',
                                                vendor_id: provRoute.phone_numbers[0].vendor_id,
                                                end_date: moment.utc(provRoute.referral_end_date).format('MM/DD/YYYY'),
                                                webhook_id: provRoute.webhook_id
                                            });
                                        }
                                    } else if(showExtraData) {
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
                                                routetype: provRoute.route_type, 
                                                value: provRoute.call_value,
                                                rinterval: provRoute.repeat_interval,
                                                status2: provRoute.status,
                                                group: 4,
                                                groupName: 'admin',
                                                vendor_id: provRoute.phone_numbers[0].vendor_id,
                                                end_date: moment.utc(provRoute.referral_end_date).format('MM/DD/YYYY'),
                                                webhook_id: provRoute.webhook_id
                                            });
                                        } else {
                                            $scope.phoneNumbers.push({
                                                id: provRoute.id,
                                                phonep: provRoute.name,
                                                pooId: provRoute.pool[0].pool_id,
                                                quantity: provRoute.pool[0].quantity,
                                                state: provRoute.pool[0].state,
                                                rate_center: provRoute.pool[0].rate_center,
                                                name: provRoute.name,
                                                channels: provCategory + ":" + provSubCategory,
                                                channelId: provChannelId,
                                                status: provRoute.status,
                                                value: provRoute.call_value,
                                                rinterval: provRoute.repeat_interval,
                                                status2: provRoute.status,
                                                routetype: provRoute.route_type, 
                                                group: 4,
                                                groupName: 'admin',
                                                vendor_id: provRoute.phone_numbers[0].vendor_id,
                                                end_date: moment.utc(provRoute.referral_end_date).format('MM/DD/YYYY'),
                                                webhook_id: provRoute.webhook_id
                                            });
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
                    console.log("INSIDE saveCampaign IN campaign.js: Updating campaign with:", campaignData);

                    OldCampaignWebService.updateCampaign(campaignData).then(function(result) {
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
                        } else {
                            pinesNotifications.notify({
                                title: 'Update Campaign',
                                text: result.data.err,
                                type: 'error'
                            });
                        }
                        $scope.savingCampaign = false;
                    });
                } else {
                    console.log("INSIDE saveCampaign IN campaign.js: Creating campaign with:", campaignData);
                    OldCampaignWebService.createCampaign(campaignData).then(function(result) {
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
                } else {
                    $scope.ignoreEndDateWatch = true;
                    $scope.dateTime.endDate.minDate = moment.tz($rootScope.timezone);
                    console.log('ACTIVE TOGGLE END DATE');
                    $scope.dateTime.endDate.date = moment.tz($rootScope.timezone);
                    $scope.endDateIsNotEditable = true;
                    $scope.dateIsNotEditable = true;
                    $scope.referralChecked = false;
                    $scope.referralNumber = null;
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
                // CT-15371 - James Lemire
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
    .controller('BlacklistController', ['$scope', '$http', '$location', 'OldCampaignWebService', 'SelectedCampaign', 'PhoneList', '$window', '$rootScope', 'pinesNotifications', '$route',
        function($scope, $http, $location, OldCampaignWebService, SelectedCampaign, PhoneList, $window, $rootScope, pinesNotifications, $route) {
            'use strict';
            if ($rootScope.protect_caller_id === undefined || $rootScope.protect_caller_id === true || $rootScope.protect_caller_id === "true") {
                location.href = '#/access-denied';
            }
            OldCampaignWebService.getBlackList($rootScope.currentOUId).then(function(result) {
                console.log(result);
                if (result.data.result != 'error') {
                    var number = [];
                    angular.forEach(result.data.json, function(item) {
                        number.push(item.number);
                    });
                    $scope.search = {
                        number: number.join(',')
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

            $scope.validateBlaclistNumbers = function() {
                var blacklistNumbers = $scope.search.number;
                var arrNumbers;
                if (blacklistNumbers !== '' && blacklistNumbers !== undefined)
                    arrNumbers = blacklistNumbers.split(',');
                var flag = false;
                var arrInvalid = [];
                if (angular.isArray(arrNumbers)) {
                    arrNumbers.forEach(function(number) {
                        number = number.trim();
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
                blacklistNumbers = blacklistNumbers.replace(/ /g, '');
                var blacklistjson = {
                    "blacklist": {
                        "org_unit_id": $rootScope.currentOUId,
                        "numbers": blacklistNumbers
                    }
                };

                if (!$scope.validateBlaclistNumbers()) {
                    OldCampaignWebService.saveBlackList(blacklistjson).then(function(result) {
                        console.log(result);
                        if (result.data.result != 'error') {
                            OldCampaignWebService.getBlackList($rootScope.currentOUId).then(function(result) {
                                if (result.data.result != 'error') {
                                    var number = [];
                                    angular.forEach(result.data.json, function(item) {
                                        number.push(item.number);
                                    });
                                    $scope.search = {
                                        number: number.join(',')
                                    };
                                }
                            });

                            pinesNotifications.notify({
                                title: 'Blacklist Phone Number',
                                text: 'Successfully Saved BlackList',
                                type: 'success'
                            });
                        }
                    });
                }
            };
        }
    ])
    .controller('DNIModelController', ['$scope', '$http', '$uibModalInstance', '$location', 'OldCampaignWebService', 'OrgUnitWebService', 'SelectedCampaign', 'PhoneList', '$window', '$rootScope', 'pinesNotifications', '$route', 'DNIWebService', 'canModify', 'callingController',
        function($scope, $http, $uibModalInstance, $location, OldCampaignWebService, OrgUnitWebService, SelectedCampaign, PhoneList, $window, $rootScope, pinesNotifications, $route, DNIWebService, canModify, callingController) {
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
    .controller('BlacklistModalController', ['$scope', '$http', '$uibModalInstance', '$location', 'OldCampaignWebService', 'SelectedCampaign', 'PhoneList', '$window', '$rootScope', 'pinesNotifications', '$route',
        function($scope, $http, $uibModalInstance, $location, OldCampaignWebService, SelectedCampaign, PhoneList, $window, $rootScope, pinesNotifications, $route) {
            'use strict';
            OldCampaignWebService.getBlackList($rootScope.currentOUId).then(function(result) {
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
                    OldCampaignWebService.saveBlackList(blacklistjson).then(function(result) {
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
    .controller('OldPhoneNumbersEditableController', ['$scope', 'UserWebService', 'TagWebService', '$filter', '$http', 'PhoneList', 'OldCampaignWebService', 'WebhookService', '$location', '$route', 'SelectedCampaign', '$rootScope', 'pinesNotifications', 'locationWebService', '$window', 'VoicePromptService', 'WhisperMessageService', '$uibModal', '$timeout', 'DNIWebService', '$compile', '$bootbox', "DateTimeTimeZoned", "$q", "OrgUnitWebService",
        function($scope, UserWebService, TagWebService, $filter, $http, PhoneList, OldCampaignWebService, WebhookService, $location, $route, SelectedCampaign, $rootScope, pinesNotifications, locationWebService, $window, voicepromptService, whispermessageService, $uibModal, $timeout, DNIWebService, $compile, $bootbox, DateTimeTimeZoned, $q, OrgUnitWebService) {
            'use strict';
            $scope.showSpamButton = false;

            if ($scope.userAccess && $scope.userAccess.spamguard) {
                $scope.showSpambutton = true
            }
            $scope.browserAgentName = '';
            $scope.showCallFlow = false;
            $scope.showCallActions = false;
            $scope.showMultiPass = false;
            $scope.selectedCallFlow = {};
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
            $scope.customsourcesArray = {
                "CS1" : [],
                "CS2" : [],
                "CS3" : [],
                "CS4" : [],
                "CS5" : []
            };
            $scope.selectedCallFlow.spamActive = false;
            $scope.addCallAction.postEvent = {};
            $scope.addCallAction.webhook = {};
            $scope.addCallAction.sendCallDetails = {};
            $scope.addCallAction.callbackFlag = {};
            $scope.TTSSelected = true;
            $scope.TTSWhisperSelected = true;
            $scope.TTSIVRSelected = [true, true, true, true, true, true, true, true, true, true];
            $scope.voicetextIVRChanged = [false, false, false, false, false, false, false, false, false, false];
            $scope.hasValidTTSVoiceURL = [false, false, false, false, false, false, false, false, false, false];
            $scope.hasValidVoiceURL = false;
            $scope.hadValidWhisperURL = false;
            // $scope.TTSIVRSelected[0] = true;
            // $scope.selectedCallFlow.ringtoNum;
            //$scope.selectedCallFlow;
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
            $scope.ShowHide = function() {
                $scope.IsVisible = $scope.IsVisible ? false : true;


            };
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
            $scope.campaignBuilderHeader = ['Tracking Number', 'Name', 'Ad Source', 'Call Value', 'Repeat Interval (hours)', 'Status'];
            $scope.multipleNumbersHeader = ['Tracking Number', 'Name', 'Ad Source', 'Custom Source 1', 'Custom Source 2', 'Custom Source 3', 'Custom Source 4', 'Custom Source 5', 'Call Value', 'Repeat Interval (hours)', 'Ring to', 'Record Call'];
            $scope.actionHeader = ['Actions'];
            $scope.customTaggingOptions = [];
            $scope.callActionTaggingOptions = [];

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
            console.log("textcount called");

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
                OldCampaignWebService.createTag(tag).then(function(result) {
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
            $http.get('assets/demo/old_call_actions.json').then(function(res) {
                $scope.names = res.data;

            });

            $scope.addLocationVisible = function() {
                $scope.showAddloc = false;
            };
            $scope.chkSpclChar = function (text, prompt,cb){
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
            };
            $scope.voiceTextChange = function() {
                $scope.promptAudio = undefined;
                if ($scope.selectedCallFlow.voicePromptTTSText === undefined || $scope.selectedCallFlow.voicePromptTTSText.length === 0) {
                    $scope.hasValidVoiceURL = false;
                    $scope.TTSSelected = true;
                } else {
                    $scope.chkSpclChar($scope.selectedCallFlow.voicePromptTTSText, 'Voice Prompt', function(t){
                        $scope.selectedCallFlow.voicePromptTTSText = t;
                        $scope.hasValidVoiceURL = true;
                        $scope.TTSSelected = true;
                    })
                }
            };

            $scope.whisperTextChange = function() {
                console.log("canModify", $scope.canModify);
                console.log("$scope.hasValidWhisperURL", $scope.hasValidWhisperURL);
                $scope.whisperAudio = undefined;
                if ($scope.selectedCallFlow.whisperTTSText === undefined || $scope.selectedCallFlow.whisperTTSText.length === 0) {
                    $scope.hasValidWhisperURL = false;
                    $scope.TTSWhisperSelected = true;
                } else {
                    $scope.chkSpclChar($scope.selectedCallFlow.whisperTTSText, 'Whisper Message', function(t){
                        $scope.selectedCallFlow.whisperTTSText = t;
                        $scope.hasValidWhisperURL = true;
                        $scope.TTSWhisperSelected = true;
                    })
                }
            };

            $scope.voiceTextIVRChange = function(index) {
                $scope.ivrAudio = undefined;
                if ($scope.ivrActions[index].voicepromptTTSText === undefined || $scope.ivrActions[index].voicepromptTTSText.length === 0) {
                    $scope.hasValidTTSVoiceURL[index] = false;
                    $scope.TTSIVRSelected[index] = true;
                } else {
                    $scope.chkSpclChar($scope.ivrActions[index].voicepromptTTSText, 'Voice Prompt', function(t){
                        $scope.ivrActions[index].voicepromptTTSText = t;
                        $scope.hasValidTTSVoiceURL[index] = true;
                        $scope.TTSIVRSelected[index] = true;      
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
            }

            $scope.audioIsDownloading = function() {
                if ($scope.whisperAudio !== undefined && $scope.onTTS_WH_Request !== undefined)
                    return true;
                if ($scope.promptAudio !== undefined && $scope.onTTS_VP_Request !== undefined)
                    return true;
                if ($scope.ivrAudio !== undefined && $scope.onTTS_IVR_Request !== undefined)
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
                            $scope.selectedCallFlow.voicePromptText = $rootScope.prompts[i].name;
                            $scope.selectedCallFlow.voicePromptFileName = $rootScope.prompts[i].filename;
                            $scope.selectedCallFlow.voicePromptId = $rootScope.prompts[i].id;
                            $scope.selectedCallFlow.voiceURL = $rootScope.prompts[i].url;
                            $scope.selectedCallFlow.hasValidVoiceURL = true;
                            $scope.selectedCallFlow.TTSSelected = true;
                            $scope.selectedCallFlow.promptAudio = undefined;
                        }
                    }
                    $scope.prompts = $rootScope.prompts;
                    $scope.TTSSelected = false;
                    $scope.hasValidVoiceURL = true;
                    $scope.selectedCallFlow.voicePromptTTSText = '';
                }, function() {
                    console.log('Modal dismissed at: ' + new Date());
                });

            };

            $scope.totPercent = 0;
            $scope.numPer = 0;
            $scope.percentageCount = function(index) {
                var percentageCount = 0;
                for (var i = 0; i <= index; i++) {
                    if ($scope.percentageRingtoNum[i].percentage === '' || $scope.percentageRingtoNum[i].percentage === undefined || isNaN($scope.percentageRingtoNum[i].percentage)) {
                        return;
                    }
                    percentageCount = percentageCount + $scope.percentageRingtoNum[i].percentage;
                }
                $scope.totPercent = percentageCount;
                if ($scope.totPercent > 100) {
                    pinesNotifications.notify({
                        title: 'Percentage Call route',
                        text: 'Percentage is greater than 100 ',
                        type: 'error'
                    });
                    return;
                }
                if ((100 - percentageCount) > 0) {
                    if (index < 9) {
                        if ($scope.percentageRingtoNum[index + 1].ringtonum === '' || angular.isUndefined($scope.percentageRingtoNum[index + 1].ringtonum)) {
                            $scope.percentageRingtoNum[index + 1].percentage = (100 - percentageCount);
                            $scope.numPer = index + 1;
                        }
                    }
                } else {
                    setTimeout(function() {
                        for (var i = index + 1; i < 10; i++) {
                            $scope.percentageRingtoNum[i].percentage = '';
                        }
                    }, 100);

                    if ($scope.percentageRingtoNum[index + 1].ringtonum === '' || angular.isUndefined($scope.percentageRingtoNum[index + 1].ringtonum)) {
                        setTimeout(function() {
                            for (var i = index + 1; i < 10; i++) {
                                $scope.percentageRingtoNum[i].ringtonum = '';
                            }
                        }, 100);
                        $scope.numPer = index;
                    }
                }
            };

            $scope.removePercentNumber = function(index) {
                $scope.percentageRingtoNum[index].ringtonum = '';
                $scope.percentageRingtoNum[index].percentage = '';
                $scope.percentageRingtoNum.splice(index, 1);
                $scope.percentageRingtoNum.push({
                    'id': 9,
                    'percentage': '',
                    'ringtonum': '',
                    'readonly': false
                });
                setTimeout(function() {
                    $scope.numPer = $scope.numPer - 1;
                }, 100);
            };

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
                            $scope.selectedCallFlow.whisperText = $rootScope.whispers[i].name;
                            $scope.selectedCallFlow.whisperFileName = $rootScope.whispers[i].filename;
                            $scope.selectedCallFlow.whisperId = $rootScope.whispers[i].id;
                            $scope.selectedCallFlow.whisperURL = $rootScope.whispers[i].url;
                            $scope.selectedCallFlow.whisperAudio = undefined;
                            $scope.selectedCallFlow.hasValidWhisperURL = true;
                            $scope.selectedCallFlow.TTSWhisperSelected = true;
                        }
                    }
                    $scope.whispers = $rootScope.whispers;
                    $scope.TTSWhisperSelected = false;
                    $scope.hasValidWhisperURL = true;
                    $scope.selectedCallFlow.whisperTTSText = '';
                }, function() {
                    console.log('Modal dismissed at: ' + new Date());
                });

            };

            $scope.showIVRVoiceModal = function(size, index) {
                stopAudio();
                var modalInstance = $uibModal.open({
                    templateUrl: 'assets/partials/assignPrompt.html',
                    controller: 'oldVoiceModal',
                    size: size
                });

                modalInstance.result.then(function() {
                    for (var i = 0; i < voicepromptService.prompts.length; i++) {
                        if (voicepromptService.prompts[i].selectedprompt === true) {
                            $scope.ivrActions[index].voicepromptText = voicepromptService.prompts[i].name;
                            $scope.ivrActions[index].voicepromptFileName = voicepromptService.prompts[i].filename;
                            $scope.ivrActions[index].voicepromptURL = voicepromptService.prompts[i].url;
                            $scope.ivrActions[index].voicepromptId = voicepromptService.prompts[i].id;
                            $scope.ivrActions[index].ivrAudio = undefined
                            //$scope.selectedCallFlow.voicepromptId =voicepromptService.prompts[i].id;
                            //$scope.selectedCallFlow.voiceURL = voicepromptService.prompts[i].url;
                        }
                    }
                    console.log(voicepromptService.prompts);
                    $scope.prompts = voicepromptService.prompts;
                    $scope.TTSIVRSelected[index] = false;
                    $scope.hasValidTTSVoiceURL[index] = true;
                    $scope.ivrActions[index].voicepromptTTSText = '';
                }, function() {
                    console.log('Modal dismissed at: ' + new Date());
                });
            };

            //$scope.addLocation = function() {
            //            $scope.inserted = {
            //            };
            //            if ($scope.addedlocation.id === "0"){
            //                $scope.locations.push( $scope.inserted );
            //            }
            //            else if($scope.locations.indexOf($scope.addedlocation) < 0) {
            //             $scope.locations.push($scope.addedlocation);
            //             $scope.showAddloc = true;
            //             }
            //        };
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
                        return OldCampaignWebService.getGeoCity(stsarr[0]).then(function(res) {
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
                setTimeout(function() {
                    $scope.submitted1 = false;
                }, 100);
            };

            $scope.showSaveButton = function() {
                setTimeout(function() {
                    $scope.formSubmit1 = false;
                }, 100);
            };

            $scope.onReservedNumberFocus = function() {
                OldCampaignWebService.getReservedNumbers().then(function(result) {
                    if (result.data.result != 'error') {
                        $scope.resNumList = result.data.json;
                    }
                });
            };

            $scope.onFocus = function(address) {
                if (address) {
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
                            OldCampaignWebService.getPhoneNumbers(st_city, st_state, st_npa).then(function(result) {
                                if (result.data.result != 'error') {
                                    $scope.numList = result.data.json;
                                    if (!($scope.numList instanceof Array)) {
                                        $scope.numList = [];
                                    }
                                    //JAW CT-7264: updated phone_number_id as number_id
                                    if (st_city !== 'TOLLFREE') {
                                        $scope.numList.push({
                                            "number": "more",
                                            "number_id": 0,
                                            // "pretty_number": "More...."
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
                    $scope.numList = [];
                }
            };
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
	$scope.LoadTrackingNumber = true;
	$("#LoadTrackingNumber").show();
	console.log("$scope.LoadTrackingNumber ****",$scope.LoadTrackingNumber);
	if (num  && num.number === 'more' && address !== '') {
		$scope.numList.pop();
		$.each($scope.rc, function(key, value) {
			if (value.address === address) {
				if (rc.indexOf(value.rc) === -1 && value.rc !== undefined) {
					rc.push((value.rc).trim());
					state = (value.state).trim();
				}
			}
		});

		// get third party numbers
		if (rc.length > 0) {
			totalRc = rc.length;
			for (var i = 0; i < rc.length && flag == 0; i++) {
				if (rc[i] !== null || rc[i] !== '') {
					OldCampaignWebService.getThirdPartyNumbers(state, rc[i]).then(function(result) {
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
							$scope.numList = $scope.numList.slice(0,24);
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



///////////////////////////////////////

  
			

            $scope.updateqCall = function() {
                $scope.qcf = this.qcf;
            };

            $scope.$watch('selectedCallFlow.routetype', function(newVal, oldVal) {
                if (newVal !== oldVal && oldVal !== undefined) {
                    if ($scope.basicRoute === 'ivr' && newVal === 'ivr') {
                        $scope.selectedCallFlow.voicePromptTTSText = $scope.oldVoicePromptTTSText;
                        $scope.selectedCallFlow.voicePrompt1 = $scope.oldVoicePrompt1;
                        $scope.selectedCallFlow.voicePromptFileName = $scope.oldVoicePromptFileName;

                        if (($scope.oldVoicePromptText !== '' || $scope.oldVoicePromptText !== undefined) && $scope.oldVoicePromptText !== 'hh') {
                            $scope.hasValidVoiceURL = $scope.oldHasValidVoiceURL;
                            $scope.selectedCallFlow.voicePromptText = $scope.oldVoicePromptText;
                            $scope.TTSSelected = false;
                        }
                    } else if (newVal === 'ivr' && $scope.basicRoute !== 'ivr') {
                        // set all the value to old values to retrive on change
                        $scope.oldVoicePromptTTSText = $scope.selectedCallFlow.voicePromptTTSText;
                        $scope.oldVoicePrompt1 = $scope.selectedCallFlow.voicePrompt1;
                        $scope.oldHasValidVoiceURL = $scope.hasValidVoiceURL;
                        $scope.oldVoicePromptText = $scope.selectedCallFlow.voicePromptText;
                        // set values to default ivr
                        $scope.TTSSelected = true;
                        $scope.selectedCallFlow.voicePrompt1 = true;
                        $scope.hasValidVoiceURL = true;
                        $scope.selectedCallFlow.voicePromptTTSText = '';
                    }else if(oldVal === 'ivr'){
                        if( $scope.oldVoicePromptTTSText !== ""){
                            $scope.TTSSelected = true;
                        $scope.selectedCallFlow.voicePromptTTSText = $scope.oldVoicePromptTTSText;
                        $scope.selectedCallFlow.voicePromptText = '';
                        $scope.hasValidVoiceURL = $scope.oldHasValidVoiceURL;
                        $scope.selectedCallFlow.voicePromptFileName = $scope.oldVoicePromptFileName;
                        $scope.selectedCallFlow.voicePrompt1 = $scope.oldVoicePrompt1;
                        }else{
                            $scope.TTSSelected = false;
                            $scope.selectedCallFlow.voicePromptTTSText = $scope.oldVoicePromptTTSText;
                            $scope.selectedCallFlow.voicePromptText = $scope.oldVoicePromptText;
                            $scope.hasValidVoiceURL = $scope.oldHasValidVoiceURL;
                            $scope.selectedCallFlow.voicePromptFileName = $scope.oldVoicePromptFileName;
                            $scope.selectedCallFlow.voicePrompt1 = $scope.oldVoicePrompt1;
                        }
                    }
                    // } else {
                        
                    //     console.log("************ Hello here when ivr to other route" , $scope.TTSSelected , $scope.selectedCallFlow.voicePromptText);
                    //     // if it is not ivr set the old values

                    //     $scope.selectedCallFlow.voicePromptTTSText = $scope.oldVoicePromptTTSText;
                    //     $scope.selectedCallFlow.voicePrompt1 = $scope.oldVoicePrompt1;
                    //     $scope.selectedCallFlow.voicePromptFileName = $scope.oldVoicePromptFileName;
                    //     if (($scope.oldVoicePromptText !== '' || $scope.oldVoicePromptText !== undefined) && $scope.oldVoicePromptText !== 'hh') {
                    //         $scope.TTSSelected = false;
                    //         $scope.hasValidVoiceURL = $scope.oldHasValidVoiceURL;
                    //         $scope.selectedCallFlow.voicePromptText = $scope.oldVoicePromptText;
                    //     }
                        
                    // }
                } else if (($scope.selectedCallFlow.voicePromptTTSText !== '' && $scope.selectedCallFlow.voicePromptTTSText !== undefined) || $scope.selectedCallFlow.voicePromptText !== 'hh') {
                    // set the old values if the voice prompt data is not set
                    $scope.oldVoicePromptTTSText = $scope.selectedCallFlow.voicePromptTTSText;
                    $scope.oldVoicePrompt1 = $scope.selectedCallFlow.voicePrompt1;
                    $scope.oldHasValidVoiceURL = $scope.hasValidVoiceURL;
                    $scope.oldVoicePromptText = $scope.selectedCallFlow.voicePromptText; 
                    // if ($scope.basicRoute === 'newRoute' && newVal === 'simple' &&( $scope.selectedCallFlow.voicePromptTTSText === '' || $scope.selectedCallFlow.voicePromptTTSText === undefined)) {
                    //     $scope.TTSSelected = false;
                    //     $scope.hasValidVoiceURL = true;
                    //     $scope.selectedCallFlow.voicePromptTTSText = '';
                    // }else{
                    //     $scope.TTSSelected = true;
                    //     $scope.hasValidVoiceURL = false;
                    //     $scope.selectedCallFlow.voicePromptTTSText = $scope.selectedCallFlow.voicePromptTTSText
                    // }
                } else if (newVal === 'ivr' && oldVal === undefined) {
                    $scope.oldVoicePromptTTSText = $scope.selectedCallFlow.voicePromptTTSText;
                    $scope.oldVoicePrompt1 = $scope.selectedCallFlow.voicePrompt1;
                    $scope.oldHasValidVoiceURL = $scope.hasValidVoiceURL;
                    $scope.oldVoicePromptText = $scope.selectedCallFlow.voicePromptText;

                    // set values to default ivr
                    $scope.TTSSelected = true;
                    $scope.selectedCallFlow.voicePrompt1 = true;
                    $scope.hasValidVoiceURL = true;
                    $scope.selectedCallFlow.voicePromptTTSText = '';
                } else {
                    $scope.oldVoicePromptTTSText = $scope.selectedCallFlow.voicePromptTTSText;
                    $scope.oldVoicePrompt1 = $scope.selectedCallFlow.voicePrompt1;
                    $scope.oldHasValidVoiceURL = $scope.hasValidVoiceURL;
                    $scope.oldVoicePromptText = $scope.selectedCallFlow.voicePromptText;
                }
            });

            function setDefaultData(result) {
                $scope.populatedDniType = '';
                var prompts = $rootScope.prompts;
                var whispers = $rootScope.whispers;
                if (result.data.json.callFlowData.dniSettingData.length > 0 && $scope.userAccess.dni !== undefined && $scope.userAccess.dni > 4) {
                    $scope.selectedCallFlow.showDNI = true;
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
                    $scope.selectedCallFlow.showDNI = val.share_with_subgroup;
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

                    var message = val.play_voice_prompt_first_text;
                    console.log("Voice Prompt: ", message);
                    var substring = message.substring(0, 7);
                    if (substring == "file://") {
                        $scope.TTSSelected = false;
                        $scope.hasValidVoiceURL = true;
                        $scope.selectedCallFlow.voicePromptText = val.prompt_message_name;
                        $scope.selectedCallFlow.voicePromptFileName = message.replace("file://", '');
                        $scope.selectedCallFlow.voiceURL = val.voice_prompt_url;
                        $scope.selectedCallFlow.voicePromptId = val.voice_prompt_id;
                        $scope.hasValidVoiceURL = true;
                        // for (var i = 0; i < prompts.length; i++) {
                        //     if (prompts[i].name === $scope.selectedCallFlow.voicePromptText) {
                        //         $scope.selectedCallFlow.voicePromptId = prompts[i].id;
                        //     }
                        // }
                        console.log($scope.prompts);
                    } else {
                        $scope.TTSSelected = true;
                        $scope.selectedCallFlow.voicePromptTTSText = message;
                        $scope.selectedCallFlow.voicePromptFileName = message;
                        console.log("Voice Prompt: ", $scope.selectedCallFlow.voicePromptTTSText);
                    }


                    var whisperMessage = val.play_whisper_message_text;
                    var whisperSubstring = whisperMessage.substring(0, 7);
                    if (whisperSubstring == "file://") {
                        $scope.TTSWhisperSelected = false;
                        
                        $scope.selectedCallFlow.whisperText = val.whisper_message_name;
                        $scope.selectedCallFlow.whisperFileName = whisperMessage.replace("file://", '');
                        $scope.selectedCallFlow.whisperURL = val.whisper_message_url;
                        $scope.selectedCallFlow.whisperId = val.whisper_id;
                        $scope.hasValidWhisperURL = true;
                       } else {
                        $scope.TTSWhisperSelected = true;
                        $scope.selectedCallFlow.whisperTTSText = whisperMessage;
                        $scope.selectedCallFlow.whisperFileName = whisperMessage;
                    }


                    $scope.selectedCallFlow.routetype = "simple";
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
                }

                if (result.data.json.featureData.defaultData.length > 0) {
                    var val = result.data.json.featureData.defaultData[0];
                    $scope.selectedCallFlow.spamActive = val.spam_guard_status;
                }
            }

            $rootScope.$on("loadCallFlowReceiver", function(event, passedPnumber) {
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
            // $scope.qCallFlowList = []
            $scope.loadCallFlow = function(passedPnumber) {
                console.log("passedPnumber", passedPnumber)
                $scope.referrerClassCombinations = [];
                $scope.showReferrerTextBox = false;
                $scope.showWebHookTextBox = false;
                $scope.oldVoicePromptTTSText = '';
                $scope.oldVoicePrompt1 = false;
                // $scope.$watch('selectedCallFlow.callflowOption', function(newValue, oldValue) {
                //      if (newValue === "singleNumber" || newValue === "reservedNumber") {
                //         console.log($scope.dni_type);
                //         delete $scope.dni_type.session;
                //         //$scope.selectedCallFlow.dniType = 'source';
                //     } else {
                //         $scope.dni_type = [{
                //             id: "session",
                //             text: "Session"
                //         }];
                //     }
                // });

                if ($scope.promptAudio !== undefined)
                    $scope.promptAudio.pause();
                    $scope.promptAudio = undefined;
                if ($scope.ivrAudio !== undefined)
                    $scope.ivrAudio.pause();
                    $scope.ivrAudio = undefined;
                if ($scope.whisperAudio !== undefined)
                    $scope.whisperAudio.pause();
                    $scope.whisperAudio = undefined;
                $scope.changeReferrer = function() {
                    if ($scope.selectedCallFlow.referrer === "new") {
                        $scope.showReferrerTextBox = true;
                        $scope.selectedCallFlow.referrer = '';

                    } else if ($scope.selectedCallFlow.referrer === '' || $scope.selectedCallFlow.referrer === undefined) {
                        $scope.showReferrerTextBox = false;
                        $scope.selectedCallFlow.referrer = '';
                    }
                };


                $scope.singlecallForm.$setPristine();
                //alert(passedPnumber.id);
                //$scope.selectedCallFlow = passedPnumber;
                $scope.showCallFlow = true;
                $scope.showMultiPass = false;
                $scope.numList = [];
                $scope.bCreateAnother = false;
                $scope.percentageRingtoNum = [];

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
                    name: 'Forward to nearest location',
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

                OldCampaignWebService.getChannels().then(function(result) {
                    if (result.data.result != 'error') {
                        result.data.json = result.data.json.filter(function(channel__) { return channel__.category !== 'API'});
                        $scope.channels = result.data.json; //[];
                        angular.forEach(result.data.json, function(value) {
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
                    DNIWebService.getDniSettings($rootScope.currentOUId, provisionedrouteId).then(function(result) {

                        if (result.data.json[0].dni_settings.length > 0) {
                            $scope.selectedCallFlow.showDNI = true;
                            $.each(result.data.json[0].dni_settings, function(key, val) {
                                var temp_referrer = val.referrer;
                                if (val.referrer_type) temp_referrer += "|" + val.referrer_type;

                                $scope.selectedCallFlow.dni_setting_id = val.dni_setting_id;
                                $scope.selectedCallFlow.destination_url = val.destination_url;
                                $scope.selectedCallFlow.referrer = temp_referrer;
                                $scope.selectedCallFlow.dniType = val.dni_type;
                                $scope.selectedCallFlow.dni_element = val.dni_element;
                                $scope.selectedCallFlow.dni_ttl = val.dni_ttl;
                            });
                        }
                    });
                    //populate custom params if they exist
                }
                if (!passedPnumber) {
                    $scope.basicRoute = 'newRoute';
                    $scope.isNew = true;
                    //$scope.callFlowChannels = $scope.channe, ls[0];
                    $scope.selectedCallFlow = {
                        rinterval: 72,
                        callflowOption: "singleNumber"
                    }; // ,routetype:'action0'
                    $scope.selectedCallFlow.recordCall = true;


                    $scope.selectedCallFlow.spamActive = false;

                    if($scope.showSpambutton)
                        $scope.selectedCallFlow.spamActive = true;

                    $scope.selectedCallFlow.showDNI = false;
                    $scope.selectedCallFlow.showWebhook = false;
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
                    if (!$scope.campActive) {
                        $scope.cfactive = false;
                    }
                    $scope.callActions = [];
                    $scope.ivrActions = [];
                    $scope.ivrActions = [{
                        id: 1,
                        action: "",
                        value: "",
                        voiceprompt: false,
                        whisper: false,
                        webhook: false,
                        recordCall: true,
                        playDisclaimer: 'before',
                        name: 'Forward to phone number',
                        voicepromptURL: '',
                        voicepromptId: '',
                        ringtonum: ""
                    }];
                    $scope.percentageRingtoNum = [];
                    $scope.numPer = 0;
                    for (var id = 1; id < 11; id++) {
                        $scope.percentageRingtoNum.push({
                            'id': id,
                            'percentage': '',
                            'ringtonum': '',
                            'readonly': false
                        });
                    }


                    OldCampaignWebService.getDefaultData($scope.currentOUId).then(function(result) {
                        setDefaultData(result);
                    });
                } 
                else {
                    $scope.numList.push({
                        "id": passedPnumber.id,
                        "number": passedPnumber.phone,
                        "pretty_number": passedPnumber.phonep,
                        "numberid": passedPnumber.phoneid,
                        "vendor_id": passedPnumber.vendor_id,
                    });
                    $scope.oldQuantity = passedPnumber.quantity;
                    $scope.selectedCallFlow.num = $scope.numList[0];
                    $scope.isNew = false;
                    $scope.selectedCallFlow = passedPnumber;
                    $scope.selectedCallFlow.numberPool = passedPnumber.quantity;
                    $scope.pool_state = passedPnumber.state;
                    $scope.rate_center = passedPnumber.rate_center;
                    $scope.pool_id = passedPnumber.pooId;

                    if (passedPnumber.phone) {
                        $scope.selectedCallFlow.callflowOption = "singleNumber" || "reservedNumber";
                        // $scope.dni_type = [{
                        //         id: "url",
                        //         text: "URL"
                        //     },
                        //     {
                        //         id: "source",
                        //         text: "Source"
                        //     },
                        // ];
                    } else {
                        $scope.selectedCallFlow.callflowOption = "numberPool";
                        // $scope.dni_type = [{
                        //     id: "session",
                        //     text: "Session"
                        // }];
                    }
                    $scope.selectedCallFlow.showWebhook = false;
                    if (passedPnumber.webhook_id) {
                        $scope.selectedCallFlow.showWebhook = true;
                        $scope.selectedCallFlow.webhook = passedPnumber.webhook_id;
                    }
                    $scope.selectedCallFlowEdit = true;
                    if (passedPnumber.status2 == "Active") {
                        $scope.cfactive = true;
                    } else {
                        $scope.cfactive = false;
                    }
                    //need to get the callflow data of the provisionedroute
                    OldCampaignWebService.getprovRouteCallFlow(passedPnumber.id).then(function(result) {
                        console.log("get callflow",result.data.json);
                        var j;

                        $rootScope.whispers = JSON.parse($window.sessionStorage.whispers);
                        $rootScope.prompts = JSON.parse($window.sessionStorage.prompts);

                        if (result.data.result != 'error') {
                            if(result.data.json.call_flow.spam_active === 1 || result.data.json.call_flow.spam_active === true){
                                $scope.selectedCallFlow.spamActive =  true;
                            }
                            else{
                                $scope.selectedCallFlow.spamActive =  false;
                            }
                            $scope.selectedCallFlow.customSourceList_1 = '';
                            $scope.selectedCallFlow.customSourceList_2 = '';
                            $scope.selectedCallFlow.customSourceList_3 = '';
                            $scope.selectedCallFlow.customSourceList_4 = '';
                            $scope.selectedCallFlow.customSourceList_5 = '';
                            $scope.callFlowId = result.data.json.call_flow.id;
                            $scope.selectedCallFlow.ringtoNum = result.data.json.call_flow.default_ringto;
                            $scope.selectedCallFlow.org_unit_id = result.data.json.call_flow.org_unit_id;
                            // whisper section

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
                        console.log("result.data.json.call_flow.whisper_enabled",$scope.whispers);
                        
                        if (result.data.json.call_flow.whisper_enabled === 1 || result.data.json.call_flow.whisper_enabled === true) {
                            $scope.selectedCallFlow.whisperPrompt1 = true;
                            if (result.data.json.call_flow.whisper_type == 'file') {
                                if($rootScope.whispers !== undefined && $rootScope.whispers !== null){
                                    for (j = 0; j < $rootScope.whispers.length; j++) {
                                        if(result.data.json.call_flow.whisper_message.split("/").length > 0){
                                            result.data.json.call_flow.whisper_message = result.data.json.call_flow.whisper_message.split("/")[result.data.json.call_flow.whisper_message.split("/").length -1];
                                        }
                                        if (result.data.json.call_flow.whisper_message === $rootScope.whispers[j].filename) {
                                            $scope.selectedCallFlow.whisperText = $rootScope.whispers[j].name;
                                            $scope.selectedCallFlow.whisperURL = $rootScope.whispers[j].url;
                                            $scope.selectedCallFlow.whisperId = $rootScope.whispers[j].id;
                                            $scope.selectedCallFlow.whisperFileName = $rootScope.whispers[j].filename;
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
                        if (result.data.json.call_flow.message_enabled === 1 || result.data.json.call_flow.message_enabled === true) {
                            $scope.selectedCallFlow.voicePrompt1 = true;
                            if (result.data.json.call_flow.message_type == 'file') {
                                if($rootScope.prompts !==undefined && $rootScope.prompts !==null){
                                    for (j = 0; j < $rootScope.prompts.length; j++) {
                                            if(result.data.json.call_flow.message.split("/").length > 0){
                                                result.data.json.call_flow.message = result.data.json.call_flow.message.split("/")[result.data.json.call_flow.message.split("/").length -1];
                                            }
                                            if (result.data.json.call_flow.message === $rootScope.prompts[j].filename) {
    
                                                // if (result.data.json.call_flow.message == $scope.prompts[j].filename) {
                                                $scope.selectedCallFlow.voicePromptText = $rootScope.prompts[j].name;
                                                $scope.selectedCallFlow.voiceURL = $rootScope.prompts[j].url;
                                                $scope.selectedCallFlow.voicePromptId = $rootScope.prompts[j].id;
                                                $scope.TTSSelected = false;
                                                $scope.hasValidVoiceURL = true;
                                                $scope.selectedCallFlow.voicePromptFileName = $rootScope.prompts[j].filename;
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
                                // $scope.oldVoicePromptTTSText = $scope.selectedCallFlow.voicePromptTTSText;
                                // $scope.oldVoicePrompt1 = $scope.selectedCallFlow.voicePrompt1;
                                // $scope.oldHasValidVoiceURL = $scope.hasValidVoiceURL;
                                // $scope.oldVoicePromptText = $scope.selectedCallFlow.voicePromptText;
                                //$scope.voicetextChanged = true;
                            }

                        } else
                            $scope.selectedCallFlow.voicePrompt1 = false;

                        if (result.data.json.call_flow.record_call === 1 || result.data.json.call_flow.record_call === true) {
                            $scope.selectedCallFlow.playDisclaimer = result.data.json.call_flow.play_disclaimer;
                            $scope.selectedCallFlow.recordCall = true;
                        } else
                            $scope.selectedCallFlow.recordCall = false;

                        if (result.data.json.call_flow.routable_type != 'PercentageBasedRoute') {
                            $scope.percentageRingtoNum = [];
                            for (var id = 1; id < 11; id++) {
                                $scope.percentageRingtoNum.push({
                                    'id': id,
                                    'percentage': '',
                                    'ringtonum': '',
                                    'readonly': false
                                });
                            }
                        }
                        $scope.basicRoute = result.data.json.call_flow.routable_type;
                        switch (result.data.json.call_flow.routable_type) {                           
                            case 'SimpleRoute':
                                if (result.data.json.call_flow.default_ringto === "hangup")
                                    $scope.selectedCallFlow.routetype = 'hangup';
                                else
                                    $scope.selectedCallFlow.routetype = 'simple';
                                break;
                            case 'GeoRoute':
                                $scope.selectedCallFlow.routetype = 'geo';
                                $scope.selectedCallFlow.routeBy = result.data.json.geo_route[0].strategy;
                                $scope.selectedCallFlow.geoRouteId = result.data.json.geo_route[0].id;
                                $scope.selectedCallFlow.ringtoNum = result.data.json.geo_route[0].default_ringto;
                                $scope.selectedCallFlow.geoList = parseInt(result.data.json.geo_route[0].location_id);
                                if (result.data.json.geo_route[0].strategy === 'Npa' || result.data.json.geo_route[0].strategy === 'Zipcode')
                                    $scope.selectedCallFlow.radius = parseFloat(result.data.json.geo_route[0].radius);
                                break;
                            case 'PercentageBasedRoute':
                                $scope.selectedCallFlow.routetype = 'PercentageBasedRoute';
                                var percentageCount = 0;
                                var i;
                                for (i = 0; i < result.data.json.ringto_percentage.length; i++) {
                                    $scope.percentageRingtoNum.push({
                                        "id": i,
                                        "percentage": result.data.json.ringto_percentage[i].percentage,
                                        "ringtonum": result.data.json.ringto_percentage[i].ringToNum,
                                        "readonly": false
                                    });
                                    percentageCount = percentageCount + result.data.json.ringto_percentage[i].percentage;
                                }
                                $scope.totPercent = percentageCount;
                                $scope.numPer = result.data.json.ringto_percentage.length - 1;
                                // fill up the rest of the percentage with blanks
                                for (i = result.data.json.ringto_percentage.length; i < 10; i++) {
                                    $scope.percentageRingtoNum.push({
                                        id: i,
                                        percentage: '',
                                        ringtonum: '',
                                        readonly: false
                                    });
                                }
                                break;
                            case 'IvrRoute2':
                                $scope.basicRoute = 'ivr';
                                $scope.selectedCallFlow.routetype = 'ivr';
                                $scope.ivrActions = [];
                                //  $scope.cAction= {}
                                //  $scope.cAction.action;
                                var cnt = 0;
                                if (result.data.json.ivrs) {
                                    result.data.json.ivrs.sort(function(a, b) {
                                        return a.value - b.value;
                                    });
                                    result.data.json.ivrs.forEach(function(ivr) {
                                        var faction;
                                        var vpbox;
                                        var mtype;
                                        var name;
                                        var url;
                                        var fname;
                                        var recid;
                                        var ttsname;
                                        var routeBy;
                                        var geoRouteId;
                                        var radius;
                                        var geoList;
                                        var playDisclaimer;
                                        var recordCall = false;
                                        var ringtoNum;
                                        var groute = 'geo_route://';
                                        var ringtoname;
                                        if (ivr.name)
                                            ringtoname = ivr.name;

                                        if (result.data.json.call_flow.default_ringto) {
                                            ringtoNum = result.data.json.call_flow.default_ringto;
                                        }
                                        if (ivr.record_enabled === 1 || ivr.record_enabled === true) {
                                            playDisclaimer = ivr.play_disclaimer;
                                            recordCall = true;
                                        }
                                        if (ivr.target_did === 'hangup') {
                                            faction = 'qHangup';
                                        } else if (ivr.ivr_option_type == 'geo') {
                                            faction = 'qGeo';
                                            routeBy = ivr.geo_route[0].strategy;
                                            geoRouteId = ivr.geo_route[0].id;
                                            ringtoNum = ivr.target_did;
                                            geoList = parseInt(ivr.geo_route[0].location_id);
                                            if (ivr.geo_route[0].strategy === 'Npa' || ivr.geo_route[0].strategy === 'Zipcode')
                                                radius = parseFloat(ivr.geo_route[0].radius);
                                        } else {
                                            faction = 'qSimple';
                                            ringtoNum = ivr.target_did;
                                        }
                                        if (ivr.message && ivr.message.length > 1) {
                                            vpbox = true;
                                            if (ivr.message_type == 'file') {
                                                for (var i = 0; i < $scope.prompts.length; i++) {
                                                    if (ivr.message.indexOf($scope.prompts[i].filename) > -1) {
                                                        name = $scope.prompts[i].name;
                                                        url = $scope.prompts[i].url;
                                                        recid = $scope.prompts[i].id;
                                                        fname = $scope.prompts[i].filename;
                                                        $scope.TTSIVRSelected[cnt] = false;
                                                        $scope.hasValidTTSVoiceURL[cnt] = true;
                                                        ttsname = '';
                                                    }
                                                }
                                            } else // it is a tts
                                            {
                                                ttsname = ivr.message;
                                                $scope.TTSIVRSelected[cnt] = true;
                                                $scope.hasValidTTSVoiceURL[cnt] = false;
                                                name = '';
                                                url = '';
                                                fname = '';
                                                recid = '';
                                            }
                                        }
                                        var idnum = $scope.ivrActions.length + 1;
                                        if ($scope.ivrActions.length === 9)
                                            idnum = 0;

                                        $scope.ivrActions.push({
                                            "id": idnum,
                                            "action": faction,
                                            "whisper": false,
                                            "webhook": false,
                                            "value": faction,
                                            "name": 'Forward to phone number',
                                            "ringtonum": ivr.target_did,
                                            "ringtoname": ringtoname,
                                            "voicepromptText": name,
                                            "voicepromptURL": url,
                                            "voicepromptTTSText": ttsname,
                                            "voicepromptId": recid,
                                            "voicepromptFileName": fname,
                                            "voiceprompt": vpbox,
                                            "routeBy": routeBy,
                                            "geoRouteId": geoRouteId,
                                            "radius": radius,
                                            "geoList": geoList,
                                            "playDisclaimer": playDisclaimer,
                                            "recordCall": recordCall,
                                            'ringtoNum': ringtoNum
                                        });
                                        //  $scope.cAction.action= faction;
                                        cnt++;
                                    });
                                }
                                break;
                        }

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
                    if($scope.addCallAction.routetype == 'IVR'|| $scope.addCallAction.routetype == 'ivr'){
                        var target = Object.assign({}, $scope.names.fields);
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
                    }else{
                        var target1 = Object.assign({}, $scope.names.fields);
                        delete target1['Ring to Phone Number'];
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
      
                if($scope.addCallAction.routetype == 'IVR'|| $scope.addCallAction.routetype == 'ivr'){
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


            OldCampaignWebService.getWebhooks().then(function(result) {
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
            OldCampaignWebService.getAnalytics().then(function(result) {
                if (result.data.err === '' && result.data.json.length > 0) {
                    if (result.data.json[0].all_routes || result.data.json[0].analytic_status === 'inactive') {

                        $scope.gaSetting = false;
                    }
                }
            });

            $scope.dcSetting = false;
            OldCampaignWebService.callActionDC($rootScope.currentOUId).then(function(result) {
                if (result.data.result === 'success') {
                    if (result.data.json.dc_enabled) {
                        console.log('Setting dcSetting to true');
                        $scope.doubleclick_id = result.data.json.doubleclick_id;
                        $scope.dcSetting = true;
                    }
                }
            });
            $scope.loadCallActions = function(passedPnumber) {
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
                $scope.addCallAction.cfname = passedPnumber.name;
                $scope.addCallAction.routetype = passedPnumber.routetype;
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

                OldCampaignWebService.getcallActions(passedPnumber.id).then(function(result) {
                    $scope.callActionLoaded = true;
                    if (result.data.result != 'error' && result.data.json.length && result.data.json[0].rules.length > 0) {
                        $scope.loadCallActionsTemplate(result);
                    } else if (result.data.result != 'error' && result.data.json.length === 0) {
                        OrgUnitWebService.getCallActions($scope.currentOUId).then(function(result) {
                            if (result.data.result != 'error' && result.data.json.length && result.data.json[0].rules.length > 0) {
                                $scope.loadCallActionsTemplate(result);
                            }
                        })
                    }
                    if($scope.addCallAction.routetype == 'IVR' || $scope.addCallAction.routetype == 'ivr'){
                        if (isEmpty($scope.addCallAction.actionOptions)) {
                            $scope.addCallAction.actionOptions[1] = "action0";
						    $scope.addCallAction.callActionFormSubmitted[1] = false;
						
						// $scope.addCallAction.email[1] = [];						
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
						
						// $scope.addCallAction.email[1] = [];						
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

                OldCampaignWebService.getChannels().then(function(result) {
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

            $scope.addNewCallAction = function(cActionId) {
                if($scope.addCallAction.routetype == 'IVR' || $scope.addCallAction.routetype == 'ivr'){
                    var addedAction;

                    cActionId = parseInt(cActionId);
                    addedAction = {
                        id: (cActionId + 1)
                    };
                    $scope.callActions.push(addedAction);
                    $scope.addCallAction.remainingText[cActionId + 1] = 1024 + " characters are remaining"
                    $scope.addCallAction.actionOptions[cActionId + 1] = "action0";
                    $scope.ruleDropDown[cActionId + 1] = {
                        0: {
                            "fields": Object.keys($scope.names.fields)
                        }
                    };
                    $scope.addCallAction.email[cActionId + 1] = []
                    $scope.addCallAction.rule[cActionId + 1] = {
                        0: {
                            "fields": "",
                            "operators": "",
                            "enum": "",
                            "join_type": ""
                        }
                    };
                }else{
                    var addedAction;

                    cActionId = parseInt(cActionId);
                    addedAction = {
                        id: (cActionId + 1)
                    };
                    $scope.callActions.push(addedAction);
                    $scope.addCallAction.remainingText[cActionId + 1] = 1024 + " characters are remaining"
                    $scope.addCallAction.actionOptions[cActionId + 1] = "action0";
                    var target = Object.assign({}, $scope.names.fields);
                    delete target['Ring to Phone Number'];
                    $scope.ruleDropDown[cActionId + 1] = {
                        0: {
                            "fields": Object.keys(target)
                        }
                    };
                    $scope.addCallAction.email[cActionId + 1] = []
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
                        title: 'IVR Tracking Numbers',
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
                        id: idnum,
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
                    $scope.TTSIVRSelected[idnum-1] = true;
                }
            };

            $scope.removeIvrAction = function(actionId) {
                var keepLooking = true;
                $.each($scope.ivrActions, function(index, value) {
                    if (keepLooking && value.id == actionId) {
                        $scope.ivrActions.splice(index, 1);
                        $scope.TTSIVRSelected[index] = $scope.TTSIVRSelected[index+1];
                        keepLooking = false;
                    }
                });

                $.each($scope.ivrActions, function(index, value) {
                    if (value.id > actionId && actionId !== 0) {
                        $scope.ivrActions[index].id = (value.id - 1);
                        $scope.TTSIVRSelected[index] = $scope.TTSIVRSelected[index+1];
                    }
                    if (value.id === 0) {
                        $scope.ivrActions[index].id = (index + 1);
                    }

                });
                //console.log($scope.callActions);

            };
            $scope.removeCallAction = function(actionId) {
                var keepLooking = true;
                $.each($scope.callActions, function(index, callAction) {
                    if (keepLooking && callAction.id === actionId) {
                        if (!angular.isUndefined($scope.addCallAction.action_id[actionId])) {
                            $bootbox.confirm("Are you sure you want to delete this Call Action?", function(clickedOK) {
                                if (clickedOK) {
                                    OldCampaignWebService.removecallActions($scope.addCallAction.action_id[actionId]).then(function(result) {
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
                if($scope.addCallAction.routetype == 'IVR' || $scope.addCallAction.routetype == 'ivr'){
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
                
            }

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
                                    OldCampaignWebService.getThirdPartyNumbers(state, rc[i]).then(function(result) {
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

                                            OldCampaignWebService.getDefaultData($scope.currentOUId).then(function(result) {
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
                                                            "ringto": "",
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

                            OldCampaignWebService.getDefaultData($scope.currentOUId).then(function(result) {
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
                                        "ringto": "",
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
                action: "",
                value: "",
                voiceprompt: false,
                recordCall: true,
                playDisclaimer: 'before',
                whisper: false,
                webhook: false,
                voicepromptURL: '',
                name: 'Forward to phone number',
                ringtonum: ""
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
            OldCampaignWebService.getVoicePrompts($rootScope.currentOUId).then(function(result) {
                // console.log('INSIDE OldCampaignWebService.getVoicePrompts IN campaign.js: Voice prompts:', result.data.json);
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
            OldCampaignWebService.getWhispers($rootScope.currentOUId).then(function(result) {
                // console.log('INSIDE OldCampaignWebService.getWhispers IN campaign.js: Whispers:', result.data.json);
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
            $scope.getGeoLocationList = function(){
                OldCampaignWebService.getGeoLocations().then(function(result) {
                    if (result.data.result != 'error') {
                        var locationData = result.data.json.locations;
                        $scope.georoutelocations = [];
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
            }
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
                        OldCampaignWebService.createTag(tag).then(function(result) {
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
                if ($scope.promptAudio !== undefined)
                    $scope.promptAudio.pause();
                if ($scope.ivrAudio !== undefined)
                    $scope.ivrAudio.pause();
                if ($scope.whisperAudio !== undefined)
                    $scope.whisperAudio.pause();
            });

            $scope.removeSelectedVoiceAudio = function() {
                // remove the text from the text field
                if ($scope.promptAudio !== undefined)
                    $scope.promptAudio.pause();
                $scope.promptAudio = undefined;
                $scope.selectedCallFlow.voiceURL = undefined;
                $scope.selectedCallFlow.voicePromptTTSText = "";
                $scope.TTSSelected = true;
                $scope.hasValidVoiceURL = false;
                //$scope.voicetextChanged = false;
            };
            $scope.removeSelectedIVRVoiceAudio = function(index) {
                // remove the text from the text field
                if ($scope.ivrActions[index].ivrAudio !== undefined)
                    $scope.ivrActions[index].ivrAudio.pause();
                $scope.ivrActions[index].ivrAudio = undefined;
                $scope.ivrActions[index].voicepromptURL = undefined;
                $scope.ivrActions[index].voicepromptTTSText = "";
                $scope.TTSIVRSelected[index] = true;
                $scope.hasValidTTSVoiceURL[index] = false;
            };
            $scope.playVoiceAudio = function(url) {

                console.log('url is: %s', url);
                console.log('voicePromptTTSText is: %s', $scope.selectedCallFlow.voicePromptTTSText);

                if ($scope.promptAudio !== undefined && !$scope.promptAudio.paused) {
                    $scope.promptAudio.pause();
                } else if ($scope.promptAudio !== undefined && $scope.promptAudio.paused) {
                    $scope.promptAudio.play();
                } else {

                    if ($scope.selectedCallFlow.voicePromptTTSText !== undefined && $scope.selectedCallFlow.voicePromptTTSText.length > 0) {
                        $scope.promptAudio = new Audio();
                        $scope.onTTS_VP_Request = true;
                        OldCampaignWebService.getTTS($scope.selectedCallFlow.voicePromptTTSText).then(function(result) {
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

                console.log("DD1 playWhisperAudio");

                if ($scope.whisperAudio !== undefined && !$scope.whisperAudio.paused) {
                    $scope.whisperAudio.pause();
                } else if ($scope.whisperAudio !== undefined && $scope.whisperAudio.paused) {
                    $scope.whisperAudio.play();
                } else {
                    if ($scope.selectedCallFlow.whisperTTSText !== undefined && $scope.selectedCallFlow.whisperTTSText.length > 0) {
                        // create the HTML5 audio element
                        $scope.whisperAudio = new Audio();
                        $scope.onTTS_WH_Request = true;
                        // get the TTS data
                        OldCampaignWebService.getTTS($scope.selectedCallFlow.whisperTTSText).then(function(result) {
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

            $scope.playTTSVoiceAudio = function(index) {

                if ($scope.ivrActions[index].ivrAudio !== undefined && !$scope.ivrActions[index].ivrAudio.paused) {
                    $scope.ivrActions[index].ivrAudio.pause();
                } else if ($scope.ivrActions[index].ivrAudio !== undefined && $scope.ivrActions[index].ivrAudio.paused) {
                    $scope.ivrActions[index].ivrAudio.play();
                } else {
                    if ($scope.ivrActions[index].voicepromptTTSText.length > 0) {
                        $scope.ivrActions[index].ivrAudio = new Audio();
                        $scope.onTTS_IVR_Request = true;
                        OldCampaignWebService.getTTS($scope.ivrActions[index].voicepromptTTSText).then(function(result) {
                            if (result.data.json) {
                                var TTSData = result.data.json 
                                var source = "data:audio/mp3;base64," + TTSData;
                                $scope.ivrActions[index].ivrAudio.src = source;
                                if ($scope.ivrActions[index].ivrAudio.paused) {
                                    $scope.ivrActions[index].ivrAudio.play();
                                } else {
                                    $scope.ivrActions[index].ivrAudio.pause();
                                }
                            }
                            $scope.onTTS_IVR_Request = undefined;
                        });
                    } else {
                        $scope.ivrActions[index].ivrAudio = new Audio($scope.ivrActions[index].voicepromptURL);
                        $scope.ivrActions[index].ivrAudio.play();
                    }
                }
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

                var pr = {};
                pr = {
                    "provisioned_route": {
                        "ids": [pnumber.id]
                    }
                };

                $bootbox.confirm("Are you sure you want to delete this Tracking Number?", function(clickedOK) {
                    if (clickedOK) {
                        OldCampaignWebService.removeCallFlow(pr).then(function(result) {
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
                            "ringto": $scope.MultCallFlowList[i].ringto,
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
                    OldCampaignWebService.createCallFlow(pr).then(function(result) {
                        if (result.data.err === '') {
                            pinesNotifications.notify({
                                title: 'Multiple Tracking Numbers',
                                text: 'Tracking Number created successfully.',
                                type: 'success'
                            });
                            $scope.selectedCallFlow.name = '';
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
                    OldCampaignWebService.createCampaign(cf).then(function(result) {
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
                if($scope.addCallAction.routetype == 'IVR'|| $scope.addCallAction.routetype == 'ivr'){
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
                if($scope.addCallAction.routetype == 'IVR'|| $scope.addCallAction.routetype == 'ivr'){
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
                    OldCampaignWebService.saveBulkCallActions(saveCallActionObject).then(function(result) {
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
                    if($scope.addCallAction.routetype == 'IVR'|| $scope.addCallAction.routetype == 'ivr'){
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
                $scope.bCreateAnother = true;
            };

            $scope.getCallFlowList = function(campaignId) {

                OldCampaignWebService.getCampaign(campaignId).then(function(result) {
                    if (result) {
                        if (result.data.result !== 'error') {
                            $scope.phoneNumbers = [];
                            $scope.isNew = true;
                            var campaignData = result.data.json.campaigns[0];
                            $scope.selectedCallFlow.name = "";
                            $scope.selectedCallFlow.num = "";
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
                                    var f = (provRoute.status).charAt(0).toUpperCase();
                                    provRoute.status = f + (provRoute.status).substr(1);
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
                                                end_date: moment.utc(provRoute.referral_end_date).format('MM/DD/YYYY')
                                            });
                                        } else {
                                            $scope.phoneNumbers.push({
                                                id: provRoute.id,
                                                phonep: provRoute.name,
                                                pooId: provRoute.pool[0].pool_id,
                                                quantity: provRoute.pool[0].quantity,
                                                state: provRoute.pool[0].state,
                                                rate_center: provRoute.pool[0].rate_center,
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
                                                end_date: moment.utc(provRoute.referral_end_date).format('MM/DD/YYYY')
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
                                                end_date: moment.utc(provRoute.referral_end_date).format('MM/DD/YYYY')
                                            });
                                        } else {
                                            $scope.phoneNumbers.push({
                                                id: provRoute.id,
                                                phonep: provRoute.name,
                                                pooId: provRoute.pool[0].pool_id,
                                                quantity: provRoute.pool[0].quantity,
                                                state: provRoute.pool[0].state,
                                                rate_center: provRoute.pool[0].rate_center,
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
                                                end_date: moment.utc(provRoute.referral_end_date).format('MM/DD/YYYY')
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

                /*   OldCampaignWebService.getChannels().then(function (result) {
                                        if (result.data.result != 'error') {
                                                $scope.channels = result.data.json;
                                        }
                                });
                        */
                $scope.selectedCallFlow.address = '';
                $scope.onFocus($scope.selectedCallFlow.address);
            };

            $scope.proceedToCallFlowUpdate = function() {
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
						if($scope.originalcfactive == true ) {
							$bootbox.confirm("Are you sure you want to deactivate this Tracking Number?", function(clickedOK) {
								if (clickedOK) {
									if (moment($scope.dateTime.startDate.date).isBefore(moment.tz($rootScope.timezone).format('DD-MM-YYYY hh:mm A'))) {
										$scope.dateTime.startDate.date = moment.tz($rootScope.timezone).format('DD-MM-YYYY hh:mm A');
									}
									$scope.dateTime.endDate.date = null;
									$scope.date_changed = true;
									$scope.saveCallFlow();
								  }
								else{
									$scope.showSubmit();
									  $scope.showSaveButton();
								}
							});
						}else{
							$scope.saveCallFlow();
						}
					}else{
                        			$scope.saveCallFlow();
					}
				 }

            };
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
                        _.pluck($scope.percentageRingtoNum,'ringtonum')
                        .forEach(function(ringToNumber__) {
                            body.ringToNumbers.push(ringToNumber__.replace(/[^0-9]+/g, '').substring(0, 3));
                        });
                        break;
                    case "outbound":
                        break;
                    case "voicemail":
                    case "hangup":    
                        //these dont have not have ring to number, so do nothing
                        cb(true);
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

                        if(_.filter(ivrActions, function(ivrAction__) { return ivrAction__.action  === 'qHangup'; })
                        .length === ivrActions.length) {
                            cb(true);
                            return;
                        }

                        _.each(ivrActions,function(item){
                            if(item.ringtoNum) {
                                body.ringToNumbers.push(item.ringtoNum.replace(/[^0-9]+/g, '').substring(0, 3));
                            }
                            if(item.length > 0){
                                _.each(item,function(item1){
                                    if(item1.ringtoNum){
                                        body.ringToNumbers.push(item1.ringtoNum.replace(/[^0-9]+/g, '').substring(0, 3));
                                    }
                                    if(item1 && item1.length > 0){
                                        _.each(item1,function(item2){ 
                                            body.ringToNumbers.push(item2.ringtoNum.replace(/[^0-9]+/g, '').substring(0, 3)); 
                                        });   
                                    }
                                });
                            }
                        });

                        break;    
                    default:
                        body.ringToNumbers = [$scope.selectedCallFlow.ringtoNum.replace(/[^0-9]+/g, '')];
                }

				OldCampaignWebService.checkLDM(body).then(function(res) {
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
                if ($scope.singlecallForm.$invalid) {
                    $scope.showSubmit();
                    $scope.showSaveButton();
                    return;
                }

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
                /* console.log($scope.selectedCallFlow.ringtoNum);
                console.log($scope.Id);
                console.log($scope.name);
                console.log($scope.campId);
                console.log(this.selectedCallFlow.name);
                console.log(this.selectedCallFlow.channel.channel_id);
                console.log(this.selectedCallFlow.value);
                */

                if (this.selectedCallFlow.value == 'undefined')
                    this.selectedCallFlow.value = null;
                if (this.selectedCallFlow.rinterval == 'undefined')
                    this.selectedCallFlow.rinterval = null;

                /*console.log(this.selectedCallFlow.rinterval);
                console.log(this.address);
                console.log($scope.status);
                console.log($scope.iStatus);
                console.log($scope.bCreateAnother);
                */
                $scope.selectedCallFlow.ringtoNum = UserWebService.unMaskData($scope.selectedCallFlow.ringtoNum);
                //console.log($scope.selectedCallFlow.ringtoNum);
                //$scope.callFlowActive = true;
                //console.log($scope.cfactive);
                $scope.flowname = this.selectedCallFlow.name;
                $scope.category = this.selectedCallFlow.channel.category;
                $scope.sub_category = this.selectedCallFlow.channel.sub_category;
                $scope.callFlowvalue = this.selectedCallFlow.value;
                $scope.callFlowrinterval = this.selectedCallFlow.rinterval;
                $scope.browserAgentName = $window.navigator.userAgent;
                if($scope.browserAgentName.indexOf("firefox")>-1)
                {
                     browserTZ = moment($scope.dateTime.startDate.date).isBefore(moment.tz($rootScope.timezone).format('DD-MMMM-YYYY hh:mm A'))
                }
                if($scope.browserAgentName.indexOf("chrome")>-1){
                     browserTZ = moment($scope.dateTime.startDate.date).isAfter(moment.tz($rootScope.timezone).format('DD-MMMM-YYYY hh:mm A'))
                }
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
                switch ($scope.selectedCallFlow.routetype) {

                    case "geo":
                        sendingRouteType = $scope.selectedCallFlow.routetype;
                        routeBy = $scope.selectedCallFlow.routeBy;
                        locIds.push($scope.selectedCallFlow.geoList);
                        message_enabled = '0';
                        if($scope.selectedCallFlow.callflowOption !== "numberPool"){
                            if(UserWebService.unMaskData($scope.selectedCallFlow.ringtoNum) === ($scope.selectedCallFlow.phone || $scope.selectedCallFlow.num.number)){
                                pinesNotifications.notify({
                                    title: 'Tracking Number Details Form',
                                    text: 'Ring to phone number cannot be same as tracking number.',
                                    type: 'error'
                                });
                                $scope.showSaveButton();
                                return;
                            }
                        }
                        
                       // if(message_type === 'text'){
                        //    message = ' ';
                       // }else{
                          //  message = null;
                        //}
                        message = '';
                        message_type = '';
                        geo_opt = {
                            location_ids: locIds
                        };
                        geo_rt = {
                            strategy: routeBy
                        };
                        var matched_geo_list = {};
                        matched_geo_list = _.find($scope.georoutelocations,function(list){
                            return ( parseInt($scope.selectedCallFlow.geoList) === list.id);
                        });
                        if(matched_geo_list){
                        for(var j=0;j<matched_geo_list.routes.length;j++){
                            if($scope.selectedCallFlow.callflowOption !== "numberPool"){
                                if(matched_geo_list.routes[j].target === ($scope.selectedCallFlow.phone ||$scope.selectedCallFlow.num.number)){
                                    pinesNotifications.notify({
                                        title: 'Tracking Number Details Form',
                                        text: 'Location Ring to phone number cannot be same as tracking number.',
                                        type: 'error'
                                    });
                                    $scope.showSaveButton();
                                    return;
                                }
                            }
                           
                        }
                        matched_geo_list = {};
                        }
                        if (routeBy != "Claimed") {
                            radius = $scope.selectedCallFlow.radius;
                            geo_rt.radius = radius;
                            //location = $scope.selectedCallFlow.location;
                        }
                        if ($scope.selectedCallFlow.geoRouteId) {
                            var arr1 = [];
                            arr1.push($scope.selectedCallFlow.geoRouteId);
                            geo_rt.id = arr1;
                        }
                        break;

                    case "ivr":
                        $scope.selectedCallFlow.playDisclaimer = 'never';
                        var cnt = 0;
                        var ivrMsgtype;
                        var action_order = 0;
                        var duplicatieRingTo = [];
                        var ringto_error = false;
                        // we have to get the call actions associated with the questions which are stored in $scope.ivrActions array
                        $scope.ivrActions.forEach(function(callAct) {
                            action_order = action_order + 1;
                            var ringto;
                            var vptext = null;
                            var vpselected = 0;
                            var locIds = [];
                            var playDisclaimer = '';
                            var record_enabled = 0;

                            if (callAct.recordCall && callAct.action !== 'qHangup') {
                                record_enabled = 1;
                                playDisclaimer = callAct.playDisclaimer;
                            }
                            if (callAct.action === 'qHangup')
                                ringto = 'hangup';
                            else {
                                ringto = UserWebService.unMaskData(callAct.ringtoNum);
                                //  ringto = callAct.ringtonum ;
                            }
                            if($scope.selectedCallFlow.callflowOption !== "numberPool"){
                                if(ringto === ($scope.selectedCallFlow.phone ||$scope.selectedCallFlow.num.number)){
                                    duplicatieRingTo.push(ringto);
                                }
                            }
                            
                            if(!_.isEmpty(duplicatieRingTo)){
                                pinesNotifications.notify({
                                    title: 'Tracking Number Details Form',
                                    text: 'Ring to phone number cannot be same as tracking number.',
                                    type: 'error'
                                });
                                $scope.showSaveButton();
                                ringto_error = true;
                            }
                            if (callAct.action === 'qGeo') {
                                ringto = '';
                                ringto = UserWebService.unMaskData(callAct.ringtoNum);
                                isIVRGeo = true;
                                routeBy = callAct.routeBy;
                                locIds.push(callAct.geoList);
                                geo_opt = {
                                    location_ids: locIds
                                };
                                geo_rt = {
                                    strategy: routeBy
                                };
                                var matched_geo_list = {};
                                matched_geo_list = _.find($scope.georoutelocations,function(list){
                                    return ( parseInt(callAct.geoList) === list.id);
                                });
                                if(matched_geo_list){
                                for(var j=0;j<matched_geo_list.routes.length;j++){
                                    if($scope.selectedCallFlow.callflowOption !== "numberPool"){
                                        if(matched_geo_list.routes[j].target === ($scope.selectedCallFlow.phone || $scope.selectedCallFlow.num.number)){
                                            pinesNotifications.notify({
                                                title: 'Tracking Number Details Form',
                                                text: 'Location Ring to phone number cannot be same as tracking number.',
                                                type: 'error'
                                            });
                                            $scope.showSaveButton();
                                            ringto_error = true;
                                            return;
                                        }
                                    }
                                    
                                }
                                matched_geo_list = {};
                                }

                                if (routeBy != "Claimed") {
                                    radius = callAct.radius;
                                    geo_rt.radius = radius;
                                    //location = $scope.selectedCallFlow.location;
                                }
                                if (callAct.geoRouteId && $scope.selectedCallFlow.id) {
                                    var arr1 = [];
                                    arr1.push(callAct.geoRouteId);
                                    geo_rt.id = arr1;
                                }

                            } // enf geo
                            if (callAct.voiceprompt) {
                                vpselected = 1;
                                if ($scope.TTSIVRSelected[cnt]) {
                                    ivrMsgtype = 'text';
                                    vptext = callAct.voicepromptTTSText;
                                } else {
                                    ivrMsgtype = 'file';
                                    vptext = callAct.voicepromptFileName;
                                    vpdta.push(callAct.voicepromptId);
                                }
                            }
                            if (callAct.action === 'qGeo') {
                                ivrs.push({
                                    ivr: {
                                        "value": callAct.id,
                                        "route_type": "geo",
                                        "name": callAct.ringtoname,
                                        "ouid": $rootScope.currentOUId,
                                        "play_disclaimer": playDisclaimer,
                                        "record_enabled": record_enabled,
                                        "message_enabled": vpselected,
                                        "message_type": ivrMsgtype,
                                        "message": vptext,
                                        "webhook_enabled": $scope.selectedCallFlow.showWebhook ? 1 : 0,
                                        "action_order": action_order,
                                        "default_ringto": ringto
                                    },
                                    geo_route: geo_rt,
                                    geo_options: geo_opt

                                });
                            } else {
                                ivrs.push({
                                    ivr: {
                                        "value": callAct.id,
                                        "target_did": ringto,
                                        "name": callAct.ringtoname,
                                        "ouid": $rootScope.currentOUId,
                                        "play_disclaimer": playDisclaimer,
                                        "record_enabled": record_enabled,
                                        "message_enabled": vpselected,
                                        "message_type": ivrMsgtype,
                                        "message": vptext,
                                        "webhook_enabled": $scope.selectedCallFlow.showWebhook ? 1 : 0,
                                        "action_order": action_order
                                    }
                                });
                            }
                            cnt++;
                        });
                        console.log('ivrActions', $scope.ivrActions);
                        sendingRouteType = $scope.selectedCallFlow.routetype;
                        if(ringto_error){
                            return;
                        }
                        break;

                    case "hangup":
                        console.log("hangup selected");
                        sendingRouteType = "simple";
                        $scope.selectedCallFlow.ringtoNum = 'hangup';
                        break;

                    case "simple":
                        console.log("simple selected");
                        if($scope.selectedCallFlow.callflowOption !== "numberPool"){
                            if(UserWebService.unMaskData($scope.selectedCallFlow.ringtoNum) === ($scope.selectedCallFlow.phone ||$scope.selectedCallFlow.num.number)){
                                pinesNotifications.notify({
                                    title: 'Tracking Number Details Form',
                                    text: 'Ring to phone number cannot be same as tracking number.',
                                    type: 'error'
                                });
                                $scope.showSaveButton();
                                return;
                            }
                        }
                        
                        sendingRouteType = $scope.selectedCallFlow.routetype;
                        break;

                    case "PercentageBasedRoute":
                        var pringtonums = [];
                        var percentageCount = 0;
                        for (var i = 0; i < $scope.percentageRingtoNum.length; i++) {
                            console.log($scope.percentageRingtoNum[i].percentage);
                            if ($scope.percentageRingtoNum[i].percentage) {
                                percentageCount = percentageCount + parseInt($scope.percentageRingtoNum[i].percentage);
                                pringtonums.push({
                                    "ringto": UserWebService.unMaskData($scope.percentageRingtoNum[i].ringtonum),
                                    "percentage": parseInt($scope.percentageRingtoNum[i].percentage),
                                    "activateVoicemail" : false,
                                    "simultaneousRings": false,
                                    "route_order" : 1
                                });
                            }
                           
                            if($scope.selectedCallFlow.callflowOption !== "numberPool"){
                                if(UserWebService.unMaskData($scope.percentageRingtoNum[i].ringtonum) === ($scope.selectedCallFlow.phone || $scope.selectedCallFlow.num.number)){
                                    pinesNotifications.notify({
                                        title: 'Tracking Number Details Form',
                                        text: 'Ring to phone number cannot be same as tracking number.',
                                        type: 'error'
                                    });
                                    $scope.showSaveButton();
                                    return;
                                }
                            }
                            
                        }
                        if (percentageCount > 100) {
                            $scope.showSaveButton();
                            pinesNotifications.notify({
                                title: 'Percentage Call route',
                                text: 'Percentage is greater than 100 ',
                                type: 'error'
                            });
                            return;
                        } else if (percentageCount < 100) {
                            $scope.showSaveButton();
                            pinesNotifications.notify({
                                title: 'Percentage Call route',
                                text: 'Percentage is less than 100 ',
                                type: 'error'
                            });
                            return;
                        }
                        $scope.selectedCallFlow.ringtoNum = "";
                        sendingRouteType = $scope.selectedCallFlow.routetype;
                        break;
                }

                var dniSettingData = {};
                if ($scope.selectedCallFlow.showDNI) {
                    console.log('showDNI is set');

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
                    var validateDni = OldCampaignWebService.validateDniData(dniSettingData, $scope.showReferrerTextBox);
                    //console.log(validateDni);
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
                $scope.checkLDM(function(continue_) {
                    if(continue_) { 
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
                            // =============================== edit an existing call flow =========================================
                            if ($scope.selectedCallFlow.id) {
                                //var cfdata = [];
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
                                            "repeat_interval": $scope.selectedCallFlow.rinterval,
                                            "call_value": $scope.selectedCallFlow.value,
                                            "org_unit_id": $scope.selectedCallFlow.org_unit_id,
                                            "id": $scope.selectedCallFlow.id
                                        },
                                        "call_flow": {
                                            "id": $scope.callFlowId,
                                            "provisioned_route_id": $scope.selectedCallFlow.id,
                                            "tracking_number": $scope.selectedCallFlow.phone,
                                            "organizational_unit_id": $scope.selectedCallFlow.org_unit_id,
                                            "ringto": $scope.selectedCallFlow.ringtoNum,
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
                                            "spam_active": $scope.selectedCallFlow.spamActive
                                        },
                                        //  "ivrs" : ivrs,
                                        "phone_number": {
                                            "id": $scope.selectedCallFlow.phoneid,
                                            "vendor_id": $scope.selectedCallFlow.vendor_id,
                                            "source": 'inventory'
                                        },
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

                                    if ($scope.selectedCallFlow.routetype === 'PercentageBasedRoute' )
                                        cfdata[0].ringto_percentage = pringtonums;

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

                                    if ($scope.selectedCallFlow.showDNI) {
                                        cfdata[0].dni_setting = dniSettingData;
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

                                    OldCampaignWebService.saveCallFlow(pr).then(function(result) {
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
                                                $route.reload();
                                            } else {
                                                $scope.getCallFlowList($scope.Id);
                                                $scope.selectedCallFlow.name = '';
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
                                            "repeat_interval": $scope.selectedCallFlow.rinterval,
                                            "call_value": $scope.selectedCallFlow.value,
                                            "org_unit_id": $scope.selectedCallFlow.org_unit_id,
                                            "id": $scope.selectedCallFlow.id
                                        },
                                        "call_flow": {
                                            "id": $scope.callFlowId,
                                            "provisioned_route_id": $scope.selectedCallFlow.id,
                                            "tracking_number": "",
                                            "organizational_unit_id": $scope.selectedCallFlow.org_unit_id,
                                            "ringto": $scope.selectedCallFlow.ringtoNum,
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
                                            "spam_active": $scope.selectedCallFlow.spamActive
                                        },
                                        //  "ivrs" : ivrs,
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
                                    if ($scope.selectedCallFlow.showDNI) {
                                        cfdata[0].dni_setting = dniSettingData;
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


                                            OldCampaignWebService.getPhoneNumbers('TOLLFREE', "XX", '888').then(function(result) {
                                                if (result.data.result != 'error') {
                                                    numbers.push(result.data.json);
                                                    if (numbers.length === 0 || numbers[0].length < ($scope.selectedCallFlow.numberPool - $scope.oldQuantity)) {
                                                        $scope.formSubmit1 = false;
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
                                                        OldCampaignWebService.updateNumberPool(poolData, $scope.pool_id).then(function(result) {
                                                            OldCampaignWebService.saveCallFlow(pr).then(function(result) {
                                                                $scope.formSubmit1 = false;
                                                                if (result.data.err === '') {
                                                                    pinesNotifications.notify({
                                                                        title: 'Updated Tracking Number',
                                                                        text: 'Tracking Number updated successfully.',
                                                                        type: 'success'
                                                                    });
                                                                    // $route.reload();
                                                                    $scope.selectedCallFlow.name = '';
                                                                    if (!$scope.bCreateAnother) {
                                                                        $route.reload();
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
                                            var cnt = 0; // added new variable as after sending third party request for loop does not wait for third party no.
                                            for (var k = 0; k < $scope.rate_center.length; k++) {
                                                if ($scope.rate_center[k] !== null || $scope.rate_center[k] !== '') {
                                                    OldCampaignWebService.getThirdPartyNumbers($scope.pool_state, $scope.rate_center[k]).then(function(result) {
                                                        if (result.data.result !== 'error') {
                                                            if (result.data.json[0] !== 'fail') {
                                                                numbers.push(result.data.json);
                                                            }
                                                        }

                                                        cnt++;
                                                        console.log(cnt);
                                                        if ($scope.rate_center.length === cnt) {
                                                            k++;
                                                            // numbers = [[{"number":"3852084884","phone_number_id":"3852084884","pretty_number":"(385) 208-4884"},
                                                            //          {"number":"3852084891","phone_number_id":"3852084891","pretty_number":"(385) 208-4891"}]];

                                                            if (numbers.length === 0 || numbers[0].length < totalRequired) {
                                                                $scope.formSubmit1 = false;
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
                                                                OldCampaignWebService.updateNumberPool(poolData, $scope.pool_id).then(function(result) {
                                                                    if (result.data.err) {
                                                                        $scope.showSaveButton();
                                                                        $scope.showSubmit();
                                                                        $scope.formSubmit1 = false;
                                                                        pinesNotifications.notify({
                                                                            title: 'Create Tracking Number',
                                                                            text: result.data.err,
                                                                            type: 'error'
                                                                        });
                                                                    } else {
                                                                        OldCampaignWebService.saveCallFlow(pr).then(function(result) {
                                                                            $scope.formSubmit1 = false;
                                                                            if (result.data.err === '') {
                                                                                pinesNotifications.notify({
                                                                                    title: 'Updated Tracking Number',
                                                                                    text: 'Tracking Number updated successfully.',
                                                                                    type: 'success'
                                                                                });
                                                                                // $route.reload();
                                                                                $scope.selectedCallFlow.name = '';
                                                                                if (!$scope.bCreateAnother) {
                                                                                    $route.reload();
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
                                                        }
                                                    });
                                                }
                                            }
                                        }
                                        // call 3rd party API

                                        // ----------------- no additional numbers in pool ----------------
                                    } else if (($scope.selectedCallFlow.numberPool - $scope.oldQuantity) < 0) {
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
                                        OldCampaignWebService.updateNumberPool(poolData, $scope.pool_id).then(function(result) {
                                            if (result.data.err) {
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
                                                OldCampaignWebService.saveCallFlow(pr).then(function(result) {
                                                    $scope.formSubmit1 = false;
                                                    if (result.data.err === '') {
                                                        pinesNotifications.notify({
                                                            title: 'Updated Tracking Number',
                                                            text: 'Tracking Number updated successfully.',
                                                            type: 'success'
                                                        });
                                                        // $route.reload();
                                                        if (!$scope.bCreateAnother) {
                                                            $route.reload();
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

                                    } else { // -------------------------- just save call flow ----------------------------
                                        OldCampaignWebService.saveCallFlow(pr).then(function(result) {
                                            $scope.formSubmit1 = false;
                                            if (result.data.err === '') {
                                                pinesNotifications.notify({
                                                    title: 'Updated Tracking Number',
                                                    text: 'Tracking Number updated successfully.',
                                                    type: 'success'
                                                });
                                                //  $route.reload();
                                                if (!$scope.bCreateAnother) {
                                                    $route.reload();
                                                } else {
                                                    $scope.getCallFlowList($scope.Id);
                                                    $scope.onFocus($scope.selectedCallFlow.address);
                                                    $scope.selectedCallFlow.name = '';
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

                            } 
                            else { // ========================== adding a new call flow =================================
                                cfdata = [];

                                // ----------------------- single number call flow -------------------------------------
                                if ($scope.selectedCallFlow.callflowOption !== "numberPool") {
                                    // if ($scope.selectedCallFlow.routetype === 'ivr')
                                    //  $scope.selectedCallFlow.ringtoNum = "";
                                    cfdata.push({
                                        "provisioned_route": {
                                            "route_type": sendingRouteType,
                                            "name": $scope.selectedCallFlow.name,
                                            "repeat_interval": $scope.selectedCallFlow.rinterval,
                                            "call_value": $scope.selectedCallFlow.value,
                                            "org_unit_id": $rootScope.currentOUId
                                        },
                                        "call_flow": {
                                            "tracking_number": $scope.selectedCallFlow.num.number,
                                            "organizational_unit_id": $rootScope.currentOUId,
                                            "ringto": $scope.selectedCallFlow.ringtoNum,
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
                                            "spam_active": $scope.selectedCallFlow.spamActive
                                        },
                                        //"ivrs" : ivrs,
                                        /*"phone_number":      {
                                                ph_col: $scope.selectedCallFlow.num.phone_number_id,
                                                "vendor_id": $scope.selectedCallFlow.num.vendor_id,
                                                "source":    $scope.selectedCallFlow.num.source
                                        },
                                        */
                                        "channel": {
                                            "id": $scope.selectedCallFlow.channel.channel_id
                                        }
                                    });
                                    console.log("scope.selectedCallFlow.num.vendor_id : " + $scope.selectedCallFlow.num.vendor_id, 'source:', $scope.selectedCallFlow.num.source);

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

                                    if ($scope.selectedCallFlow.routetype === 'PercentageBasedRoute' )
                                        cfdata[0].ringto_percentage = pringtonums;    
                                    
                                    // if (vpdta.length > 0){
                                    //   cfdata[0].call_flow_recording = {
                                    //         id: vpdta };
                                        
                                    // }
                                    // else {
                                    //     cfdata[0].call_flow_recording = {
                                    //         id: [1]
                                    //     };
                                    // }    
                                    if ($scope.selectedCallFlow.routetype === 'geo') {
                                        cfdata[0].geo_route = geo_rt;
                                        cfdata[0].geo_options = geo_opt;
                                    }

                                    if ($scope.selectedCallFlow.showDNI) {
                                        cfdata[0].dni_setting = dniSettingData;
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
                                    OldCampaignWebService.createCallFlow(pr).then(function(result) {
                                        $scope.showSaveButton();
                                        $scope.showSubmit();
                                        if (result.data.err === '') {
                                            pinesNotifications.notify({
                                                title: 'Create Tracking Number',
                                                text: 'Tracking Number created successfully.',
                                                type: 'success'
                                            });
                                            $scope.selectedCallFlow.name = '';
                                            if (!$scope.bCreateAnother) {
                                                $route.reload();
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
                                } else {
                                    // it is a New number pool do stuff
                                    //call the vendors API
                                    if ($scope.selectedCallFlow.address === null || $scope.selectedCallFlow.address === '') {
                                        $scope.showSaveButton();
                                        pinesNotifications.notify({
                                            title: 'Save Tracking Number',
                                            text: 'Address field is required',
                                            type: 'error'
                                        });
                                        return;
                                    }
                                    console.log('selectedCallFlow.address', $scope.selectedCallFlow.address);
                                    if ($scope.selectedCallFlow.address.indexOf("TOLLFREE") > 0) {
                                        // $scope.showSaveButton();
                                        // pinesNotifications.notify({
                                        //     title: 'Save Tracking Number',
                                        //     text:  'Cannot create a number pool from TOLLFREE numbers',
                                        //     type:  'error'
                                        // });
                                        // return;
                                        var stsarr = $scope.selectedCallFlow.address.split(/,|-/);
                                        if (stsarr.length > 2) {
                                            if (stsarr[1] === 'TOLLFREE') {
                                                stsarr[2] = "XX";
                                            }
                                            if (stsarr[1] != '' && stsarr[2] != '' && stsarr[0] != '') {
                                                OldCampaignWebService.getPhoneNumbers(stsarr[1], stsarr[2], stsarr[0]).then(function(result) {
                                                    if (result.data.result != 'error') {
                                                        numbers.push(result.data.json);
                                                        if (numbers.length === 0 || numbers[0].length < $scope.selectedCallFlow.numberPool) {
                                                            $scope.formSubmit1 = false;
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
                                                            OldCampaignWebService.createNumberPool(pool).then(function(result) {
                                                                if (result.data.err) {
                                                                    // error handling on duplicate dni settings
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
                                                                            "org_unit_id": $rootScope.currentOUId
                                                                        },
                                                                        "call_flow": {
                                                                            "tracking_number": "",
                                                                            "organizational_unit_id": $rootScope.currentOUId,
                                                                            "ringto": $scope.selectedCallFlow.ringtoNum,
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

                                                                            "spam_active": $scope.selectedCallFlow.spamActive
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
                                                                    OldCampaignWebService.createCallFlow(pr).then(function(result) {
                                                                        $scope.formSubmit1 = false;
                                                                        if (result.data.err === '') {
                                                                            pinesNotifications.notify({
                                                                                title: 'Create Tracking Number',
                                                                                text: 'Tracking Number created successfully.',
                                                                                type: 'success'
                                                                            });
                                                                            $scope.selectedCallFlow.name = '';
                                                                            if (!$scope.bCreateAnother) {
                                                                                $route.reload();
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
                                        } // if len > 2


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
                                                OldCampaignWebService.getThirdPartyNumbers(state, rc1[i]).then(function(result) {
                                                    if (result.data.result !== 'error') {
                                                        if (result.data.json[0] !== 'fail') {
                                                            numbers.push(result.data.json);
                                                        }
                                                    }

                                                    rc2.push(rc1.shift());
                                                    if (rc1.length == 0) {
                                                        // numbers = [[{"number":"3852084884","phone_number_id":"3852084884","pretty_number":"(385) 208-4884"},
                                                        //              {"number":"3852084891","phone_number_id":"3852084891","pretty_number":"(385) 208-4891"}]];

                                                        // NOTE:  testing here against numbers[0] will check against the total number of the first result set - not all result sets combined.  Davey 2015-09-10
                                                        if (numbers.length === 0 || numbers[0].length < $scope.selectedCallFlow.numberPool) {
                                                            $scope.formSubmit1 = false;
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
                                                            OldCampaignWebService.createNumberPool(pool).then(function(result) {
                                                                if (result.data.err) {
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
                                                                            "org_unit_id": $rootScope.currentOUId
                                                                        },
                                                                        "call_flow": {
                                                                            "tracking_number": "",
                                                                            "organizational_unit_id": $rootScope.currentOUId,
                                                                            "ringto": $scope.selectedCallFlow.ringtoNum,
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

                                                                            "spam_active": $scope.selectedCallFlow.spamActive


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
                                                                    if ($scope.selectedCallFlow.showDNI) {
                                                                        cfdata[0].dni_setting = dniSettingData;
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
                                                                    OldCampaignWebService.createCallFlow(pr).then(function(result) {
                                                                        $scope.formSubmit1 = false;
                                                                        if (result.data.err === '') {
                                                                            pinesNotifications.notify({
                                                                                title: 'Create Tracking Number',
                                                                                text: 'Tracking Number created successfully.',
                                                                                type: 'success'
                                                                            });
                                                                            $scope.selectedCallFlow.name = '';
                                                                            if (!$scope.bCreateAnother) {
                                                                                $route.reload();
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
