angular
    .module('dni', ["theme.form-directives"])
    .factory('DNIWebService', function($q, $http, $window, $rootScope) {
        'use strict';
        var DNIWebService = {};

        DNIWebService.getDniCustomParameters = function(id, provId, userAccess) {
            var config = {
                headers: {
                    'content-type': 'application/json',
                    'Authorization': 'bearer ' + $window.sessionStorage.token
                }
            };
            $http.defaults.useXDomain = true;
            return $http.get($rootScope.url + ':' + $rootScope.port + '/v1/defgroupsetting/CallFlow/customParams/populate/' + id, config);
            // return $http.get($rootScope.url + ':' + $rootScope.port + '/v1/defgroupsetting/feature/customParams/populate/' + id , config);
        };

        DNIWebService.getshareDni = function(id) {
            var config = {
                headers: {
                    'content-type': 'application/json',
                    'Authorization': 'bearer ' + $window.sessionStorage.token
                }
            };
            $http.defaults.useXDomain = true;
            return $http.get($rootScope.url + ':' + $rootScope.port + '/v1/defgroupsetting/feature/shareDni/' + id, config);
            // return $http.get($rootScope.url + ':' + $rootScope.port + '/v1/defgroupsetting/feature/customParams/populate/' + id , config);
        };

        DNIWebService.getDniCode = function(id, provId, userAccess) {
            var config = {
                headers: {
                    'content-type': 'application/json',
                    'Authorization': 'bearer ' + $window.sessionStorage.token
                }
            };
            $http.defaults.useXDomain = true;
            return $http.get($rootScope.url + ':' + $rootScope.port + '/v1/dniSetting/code/' + id, config);
        };


        DNIWebService.getDniSettings = function(id, provId, userAccess) {
            var config = {
                headers: {
                    'content-type': 'application/json',
                    'Authorization': 'bearer ' + $window.sessionStorage.token
                }
            };
            $http.defaults.useXDomain = true;
            return $http.get($rootScope.url + ':' + $rootScope.port + '/v1/dniSetting/' + id + '/' + provId + '/' + userAccess, config);
        };

        DNIWebService.updateDniOUData = function(nc) {
            var req = {
                method: 'PUT',
                url: $rootScope.url + ':' + $rootScope.port + '/v1/dniOrgUnit',
                headers: {
                    'content-type': 'application/json',
                    'Authorization': 'bearer ' + $window.sessionStorage.token
                },
                data: nc
            };
            return $http(req);
        };

        DNIWebService.createDniOUData = function(nc) {
            var req = {
                method: 'POST',
                url: $rootScope.url + ':' + $rootScope.port + '/v1/dniOrgUnit',
                headers: {
                    'content-type': 'application/json',
                    'Authorization': 'bearer ' + $window.sessionStorage.token
                },
                data: nc
            };
            return $http(req);
        };

        DNIWebService.removeDNI = function(id) {
            var req = {
                method: 'DELETE',
                url: $rootScope.url + ":" + $rootScope.port + "/v1/dniSetting/" + id,
                headers: {
                    'content-type': 'application/json',
                    'Authorization': 'bearer ' + $window.sessionStorage.token
                }
            };
            return $http(req);
        };
        DNIWebService.updateDniSetting = function(nc) {
            var req = {
                method: 'PUT',
                url: $rootScope.url + ':' + $rootScope.port + '/v1/dniSetting',
                headers: {
                    'content-type': 'application/json',
                    'Authorization': 'bearer ' + $window.sessionStorage.token
                },
                data: nc
            };
            return $http(req);
        };

        DNIWebService.notify = function(args) {
            PNotify.removeAll();
            var notification = new PNotify(args);
            notification.notify = notification.update;
            return notification;
        };

        DNIWebService.getDniByID = function(id) {
            var config = {
                headers: {
                    'content-type': 'application/json',
                    'Authorization': 'bearer ' + $window.sessionStorage.token
                }
            };
            $http.defaults.useXDomain = true;
            return $http.get($rootScope.url + ':' + $rootScope.port + '/v1/dniSetting/dniset/' + id, config);
        };

        return DNIWebService;
    })
    .controller('DNIController', ['$scope', 'DNIWebService', '$rootScope', '$routeParams', 'pinesNotifications', 'OrgUnitLocal', '$location', '$filter', '$uibModal', '$q', '$bootbox', 'OrgUnitWebService',
        function($scope, DNIWebService, $rootScope, $routeParams, pinesNotifications, OrgUnitLocal, $location, $filter, $uibModal, $q, $bootbox, OrgUnitWebService) {
            'use strict';
            //console.log($rootScope);
            $scope.dni_settings = [];
            $scope.isLoadingApi = true;
            $scope.dni_settings_show_referrer = {};
            $scope.arrRequired = [];
            $scope.arrInvalid = [];
            $scope.arrInvalidMessage = [];
            $scope.temp_dni_type = "";
            $scope.dni_type = {};
            $scope.original_dni_referrers = [];
            $scope.dniHeaders = ['Host Domain', 'Referring Website', 'DNI Type', 'Class', 'Campaign', 'Tracking Number'];
            $scope.ttlHeader = ['TTL'];
            $scope.actionHeader = ['Actions'];
            $rootScope.isSafari = /constructor/i.test(window.HTMLElement) || (function(p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window.safari || safari.pushNotification);
            $scope.GroupXYZ = "Group XYZ";
            var tempCombination = {};

            $scope.validateDniData = function(data, name, show, index) {
                var ttl_error = false;
                if (data === undefined && name == "Referring Website") {
                    data = $scope.dni_settings[index].referrer;
                }
                var DOMAIN_REGEX = new RegExp(/^[a-z0-9\*]+([\-\.]{1}[a-z0-9\*]+)*\.[a-z\*]{1,5}(:[0-9]{1,5})?(\/.*)?$/i);
                var REF_REGEX = new RegExp(/^([a-z0-9]+|\*)([\-\.]{1}[a-z0-9]+)*\.([a-z]{1,5}|\*)(:[0-9]{1,5})?(\/.*)?$/i);
                if (data === '' || data === undefined) {
                    if (name != 'TTL') {
                        $scope.arrRequired.push(name);
                        //return '  ';
                    } else if (name == 'TTL' && $scope.temp_dni_type == "session") {
                        $scope.arrRequired.push(name);
                        ttl_error = true;
                    }
                }

                if (name == "Host Domain" && data) {
                    if (!DOMAIN_REGEX.test(data)) {
                        $scope.arrInvalid.push(name);
                        $scope.arrInvalidMessage.push("Wrong domain format for Host Domain.");
                        return '  ';
                    } else if ((data.indexOf('*') > -1) && (data.charAt(0) != '*' || data.charAt(1) != '.')) {
                        $scope.arrInvalid.push(name);
                        $scope.arrInvalidMessage.push("When using a wildcard at the beginning of a Host Domain, *.domain format is required. Example: *.logmycalls.com");
                        return '  ';
                    }
                    tempCombination.destination_url = data;
                }

                if (name == "Referring Website" && data && show) {
                    tempCombination.referrer = data + "|" + null;
                    if (!REF_REGEX.test(data)) {
                        $scope.arrInvalid.push(name);
                        $scope.arrInvalidMessage.push("Wrong domain format for Referring Website.");
                        return '  ';
                    } else {
                        var tmp = data.split('.');
                        if (tmp.length == 2) {
                            if (((tmp[0] == '*') && (tmp[1] != '*'))) {
                                $scope.arrInvalid.push(name);
                                $scope.arrInvalidMessage.push("Wrong domain format for Referring Website.");
                                return '  ';
                            }
                        }
                    }
                } else if (name == "Referring Website" && data) {
                    tempCombination.referrer = data;
                }

                if (name == "DNI Type" && data && show) {
                    $scope.temp_dni_type = data;
                    //return '';
                }

                if (name == "Class" && data && show) {
                    if (data == "lmc_track" && ($scope.temp_dni_type == "session" || $scope.temp_dni_type == "source")) {
                        $scope.arrInvalid.push(name);
                        $scope.arrInvalidMessage.push("The HTML Class ID 'lmc_track' is only allowed for URL-based DNI.");
                        return '  ';
                    }
                    if (data != "lmc_track" && $scope.temp_dni_type == "url") {
                        $scope.arrInvalid.push(name);
                        $scope.arrInvalidMessage.push("The HTML Class ID 'lmc_track' is required for URL-based DNI.");
                        return '  ';
                    }

                    if (data.indexOf(" ") > -1) {
                        $scope.arrInvalid.push(name);
                        $scope.arrInvalidMessage.push("The HTML ID Class must not contain spaces.");
                        return '  ';
                    }
                    tempCombination.element = data;
                }

                var messageText;
                if (name == 'TTL') {
                    if (data === 0) {
                        $scope.arrInvalid.push(name);
                        $scope.arrInvalidMessage.push("Invalid TTL value.");
                    }

                    /*if(_.filter($scope.referrerClassCombinations, function(combination){ return (combination.destination_url == tempCombination.destination_url && combination.referrer == tempCombination.referrer && combination.element == tempCombination.element);}).length > 0){
                        $scope.arrInvalid.push("Referrer-HTML Class ID");
                        $scope.arrInvalidMessage.push("Referrer-HTML Class ID combination is currently in use for that Host Domain. A unique combination is required.");
                    }*/


                    if ($scope.arrRequired.length) {
                        messageText = 'field is required.';
                        if ($scope.arrRequired.length > 1) {
                            messageText = 'fields are required.';
                        }
                        DNIWebService.notify({
                            title: 'DNI',
                            text: '\'' + $scope.arrRequired.join(', ') + '\' ' + messageText,
                            type: 'error'
                        });
                        $scope.arrInvalid = [];
                        $scope.arrRequired = [];
                        if (ttl_error) {
                            return '   ';
                        } else {
                            return '';
                        }
                    }

                    if ($scope.arrInvalid.length > 0) {
                        console.log($scope.arrInvalidMessage);
                        DNIWebService.notify({
                            title: 'DNI',
                            text: '\'' + uniq($scope.arrInvalidMessage).join(','),
                            type: 'error'
                        });
                        $scope.arrRequired = [];
                        $scope.arrInvalid = [];
                        $scope.arrInvalidMessage = [];
                        return '';
                    }
                }
            };

            function uniq(a) {
                return a.sort().filter(function(item, pos, ary) {
                    return !pos || item !== ary[pos - 1];
                });
            }

            $scope.getCode = function(size) {
                var modalInstance = $uibModal.open({
                    templateUrl: 'assets/partials/dniInstructions.html',
                    controller: 'DNIModalController',
                    size: size
                });
            };

            $scope.changeReferrer = function(data, dni_setting_id, index) {
                if (data == "new") {
                    $scope.oldReferrer = $scope.dni_settings[index].referrer;
                    $scope.dni_settings_show_referrer[dni_setting_id] = true;
                    angular.element('#reffererText' + index)[0].value = '';
                } else if ($scope.dni_settings_show_referrer[dni_setting_id] === true && (data === '' || data === undefined || $scope.oldReferrer === data)) {
                    $scope.dni_settings_show_referrer[dni_setting_id] = false;
                }
                $scope.dni_settings[index].referrer = data;
                $scope.newReferer = data;

            };

            $scope.updateReferrer = function(data, dni_setting_id, index) {
                $scope.dni_settings[index].referrer = data;
            };

            /*
                Method will store current referrer for the dni so that it can be reverted back if user click cancel button
            */
            $scope.editDni = function(dni_setting_id, index, rowform) {
                $scope.original_dni_referrers[dni_setting_id] = $scope.dni_settings[index].referrer;
                rowform.$show();
            };

            //set default referrers
            $scope.referrer = [
                { value: 'new', text: "Add New" },
                { value: '*.*|null', text: "Any" },
                { value: '*.bing.com|null', text: "Bing" },
                { value: '*.google.*|paid', text: "Google (Paid)" },
                { value: '*.google.*|organic', text: "Google (Organic)" },
                { value: '*.yahoo.com|paid', text: "Yahoo (Paid)" },
                { value: '*.yahoo.com|organic', text: "Yahoo (Organic)" }
            ];

            $scope.dniOuId = null;
            $scope.showTtl = [];

            // OrgUnitWebService.getFeatureSettings($rootScope.currentOUId).then(function(result) {
            //     $scope.showFeatureControl = true;

            //     if (result.data.status === "success") {
            //         var data = result.data.json;
            //         if (data.dniSettingData.length > 0) {
            //             var temp_referrer = data.dniSettingData[0].referrer;
            //             if (data.dniSettingData[0].referrer_type) temp_referrer += "|" + data.dniSettingData[0].referrer_type;
            //             $scope.dni_section = false;
            //             $scope.dniSettingPresent = true;
            //             $scope.destination_url = data.dniSettingData[0].destination_url;
            //             $scope.dni_type = data.dniSettingData[0].dni_type;
            //             $scope.dni_element = data.dniSettingData[0].dni_element;
            //             $scope.referrer = temp_referrer;
            //             $scope.referrer_type = data.dniSettingData[0].referrer_type;
            //             $scope.shareDni = data.dniSettingData[0].share_with_subgroup;
            //             $scope.dni_ttl = data.dniSettingData[0].ttl;

            //         }

            //         if (data.defaultData.length > 0) {
            //             $scope.enableConvAna = data.defaultData[0].conversation_analytics_status;
            //             $scope.enableSpam = data.defaultData[0].spam_guard_status;

            //         }
            //     }
            // });

            //get dni settings
            DNIWebService.getshareDni($rootScope.currentOUId)
                .then(function(result) {
                    if (result.data.status === "success") {
                        $scope.disable_share_dni = result.data.json.disable_share_dni;
                        $scope.share_group_name = result.data.json.share_group_name;
                    }
                });

            $scope.loadDNIData = function() {
                //   $scope.referrerClassCombinations = [];
                DNIWebService.getDniSettings($rootScope.currentOUId, undefined, $rootScope.userAccess.dni)
                    .then(function(result) {
                        //$scope.dni_settings = result.data.json;
                        //console.log(result.data.json);
                        $scope.isLoadingApi = false;
                        if (result.data.json[0].dni_org_unit.length > 0) {
                            $scope.custom_params = result.data.json[0].dni_org_unit[0].custom_params;
                            $scope.dniOuId = result.data.json[0].dni_org_unit[0].org_unit_id;
                            $.each(result.data.json[0].dni_settings, function(key, val) {
                                var temp_referrer = val.referrer;
                                var is_referral = false;
                                if (val.provisioned_route_status == 'referral') { is_referral = true; }
                                if (val.referrer_type) temp_referrer += "|" + val.referrer_type;
                                var num = (val.number) ? "(" + val.number.slice(0, 3) + ") " + val.number.slice(3, 6) + "-" + val.number.slice(6, 10) : '';
                                $scope.dni_settings.push({
                                    dni_setting_id: val.dni_setting_id,
                                    destination_url: val.destination_url,
                                    referrer: temp_referrer,
                                    referrer_text: temp_referrer,
                                    dni_type: val.dni_type,
                                    dni_element: val.dni_element,
                                    campaign_name: val.campaign_name,
                                    provisioned_route_name: val.provisioned_route_name,
                                    number: num,
                                    dni_ttl: parseInt(val.dni_ttl),
                                    provisioned_route_id: parseInt(val.provisioned_route_id),
                                    is_referral: is_referral
                                });
                                /*if(val.dni_type !== "url")
                                    $scope.referrerClassCombinations.push({
                                        "destination_url" : val.destination_url,
                                        "referrer" : val.referrer + "|" + val.referrer_type,
                                        "element" : val.dni_element
                                    });*/
                                if (val.dni_type == 'session') {
                                    $scope.dni_type[key] = [
                                        { id: "session", text: "Session" }
                                    ];
                                    $scope.showTtl[key] = true;
                                    $scope.dni_settings[key].number = val.number;
                                } else {
                                    $scope.dni_type[key] = [
                                        { id: "url", text: "URL" },
                                        { id: "source", text: "Source" },
                                    ];
                                    $scope.showTtl[key] = false;
                                }
                                //check to see if there are any custom referrers and add them to the pick list.
                                var found = $filter('filter')($scope.referrer, temp_referrer, true);
                                if (found.length < 1) $scope.referrer.push({ value: temp_referrer, text: val.referrer });
                            });
                        } else {}
                        //populate custom params if they exist
                    });

            };
            $scope.loadDNIData();
            $scope.showReferrer = function(dni, index) {
                if (dni.referrer && $scope.referrer.length) {
                    // console.log(dni.referrer);
                    var selected = $filter('filter')($scope.referrer, { value: dni.referrer });
                    return selected.length ? selected[0].text : 'Not set';
                } else {
                    if (dni.referrer === undefined) {
                        dni.referrer = $scope.newReferer;
                    }
                    return dni.referrer || 'Not set';
                }
            };




            $scope.showDniType = function(dni, key) {
                if (dni.dni_type && $scope.dni_type[key].length) {
                    var selected = $filter('filter')($scope.dni_type[key], { id: dni.dni_type });
                    return selected.length ? selected[0].text : 'Not set';
                } else {
                    return dni.dni_type || 'Not set';
                }

            };

            $scope.cancelEdit = function(dni_setting_id, index, rowform) {
                // Revert back existing refferer value if got changes without saved from array original_dni_referrers.
                $scope.dni_settings_show_referrer[dni_setting_id] = false;
                $scope.dni_settings[index].referrer = $scope.original_dni_referrers[dni_setting_id];
                rowform.$cancel();
            };

            $scope.saveParams = function() {
                var custom_param = $scope.custom_params;
                custom_param = custom_param.replace(/\s/g, '');
                custom_param = custom_param.split(',');
                custom_param = custom_param.filter(function(v) {
                    return v !== '';
                });
                custom_param = custom_param.join(',');
                var dniOrgUnitData = {
                    dniOrgUnit: {
                        custom_params: custom_param
                    }
                };

                if ($scope.dniOuId) {
                    dniOrgUnitData.dniOrgUnit.org_unit_id = $scope.dniOuId;
                    DNIWebService.updateDniOUData(dniOrgUnitData).then(function(result) {
                        $scope.custom_params = custom_param;
                        pinesNotifications.notify({
                            title: 'Saved Custom URL Parameters',
                            text: 'Custom URL parameters have been saved. ',
                            type: 'success'
                        });
                    });
                } else {
                    dniOrgUnitData.dniOrgUnit.org_unit_id = $rootScope.currentOUId;
                    DNIWebService.createDniOUData(dniOrgUnitData)
                        .then(function(result) {
                            pinesNotifications.notify({
                                title: 'Saved Custom URL Parameters',
                                text: 'Custom URL parameters have been saved. ',
                                type: 'success'
                            });
                            //set this var so the next time we save, it performs an update
                            $scope.custom_params = custom_param;
                        });
                }

            };



            $scope.saveDNISettings = function(data, dni_setting_id, provisioned_route_id, index, rowform) {
                //split out two parts of referrer
                var temp = data.referrer.split("|");
                data.referrer = temp[0];
                data.referrer_type = temp[1];
                if (!data.referrer_type) data.referrer_type = null;
                var temp_dni_referrer = data.referrer + "|" + data.referrer_type;

                //console.log(data);
                var dniSettingData = {
                    dniSetting: {
                        dni_setting_id: dni_setting_id,
                        provisioned_route_id: provisioned_route_id,
                        destination_url: data.destination_url,
                        dni_type: data.dni_type,
                        dni_element: data.dni_element,
                        referrer: data.referrer,
                        referrer_type: data.referrer_type,
                        dni_ttl: data.dni_ttl,
                        org_unit_id: $scope.dniOuId
                    }
                };

                DNIWebService.updateDniSetting(dniSettingData)
                    .then(function(result) {
                        var found = $filter('filter')($scope.referrer, temp_dni_referrer, true);
                        if (found.length < 1) {
                            $scope.dni_settings_show_referrer[dni_setting_id] = false;
                            $scope.referrer.push({ value: temp_dni_referrer, text: data.referrer });
                        }

                        $scope.dni_settings[index].referrer = temp_dni_referrer;
                        if (result.data.status == 'error') {
                            pinesNotifications.notify({
                                title: 'Failed Saving DNI Settings',
                                text: result.data.err,
                                type: 'error'
                            });
                            rowform.$show();
                        } else {
                            pinesNotifications.notify({
                                title: 'Saved DNI Settings',
                                text: 'DNI settings have been saved. ',
                                type: 'success'
                            });
                            $scope.dni_settings_show_referrer[dni_setting_id] = false;
                        }
                    });
            };

            $scope.removeDNI = function(index, id) {
                var dniSettingData = {
                    dniSetting: {
                        dni_setting_id: id,
                        dni_active: false
                    }
                };
                $bootbox.confirm("Are you sure you want to delete this DNI Setting?", function(clickedOK) {
                    if (clickedOK) {
                        DNIWebService.removeDNI(id)
                            .then(function(result) {
                                pinesNotifications.notify({
                                    title: 'Deleted Dni Setting',
                                    text: 'DNI setting deleted.Successfully',
                                    type: 'success'
                                });
                                $scope.dni_settings.splice(index, 1);
                            });
                    }
                });
            };

            $scope.headerNames = {
                destination_url: "Host Domain",
                referrer: "Referring Website",
                dni_type: "DNI Type",
                dni_element: "Class",
                campaign_name: "Campaign",
                call_flow: "Tracking Number",
                dni_ttl: "TTL"
            };

            $scope.csvHeaderNames = [
                $scope.headerNames.destination_url,
                $scope.headerNames.referrer,
                $scope.headerNames.dni_type,
                $scope.headerNames.dni_element,
                $scope.headerNames.campaign_name,
                $scope.headerNames.call_flow,
                $scope.headerNames.dni_ttl
            ];

            $scope.getCSVData = function(formate) {
                console.log($scope.dni_settings);
                var hN = $scope.headerNames,
                    row;
                var csvData = _.map($scope.dni_settings, function(dni) {
                    row = {};
                    row[hN.destination_url] = dni.destination_url;
                    row[hN.referrer] = dni.referrer;
                    row[hN.dni_type] = dni.dni_type;
                    row[hN.dni_element] = dni.dni_element;
                    row[hN.campaign_name] = dni.campaign_name;
                    row[hN.call_flow] = dni.provisioned_route_name + " | " + dni.number;
                    if (isNaN(dni.dni_ttl)) row[hN.dni_ttl] = 'n/a';
                    else row[hN.dni_ttl] = dni.dni_ttl;
                    return row;
                });
                if ($rootScope.isSafari) {
                    var reportName = "csv_dni";
                    if (formate === 'tsv') { reportName = "tsv_dni"; }
                    JSONToCSVConvertor(csvData, reportName, true, formate);
                } else {
                    return csvData;
                }
            };


            $scope.exportPDF = function() {
                var pdf = new jsPDF('p', 'pt', 'a4');

                pdf.addHTML($("#pdfExportGroup"), function() {
                    var string = pdf.output('datauristring');
                });

                setTimeout(function() {
                    pdf.save("DNI - " + moment().format('MMMM Do YYYY') + ".pdf");
                }, 2000);
            };

        }
    ])
    .controller('DNIModalController', ['$scope', 'DNIWebService', '$rootScope', '$routeParams', 'pinesNotifications', 'OrgUnitLocal', '$location', '$filter', '$uibModalInstance',
        function($scope, DNIWebService, $rootScope, $routeParams, pinesNotifications, OrgUnitLocal, $location, $filter, $uibModalInstance, $) {

            $scope.ok = function() {
                $uibModalInstance.close();
            };

            $scope.cancel = function() {
                $uibModalInstance.dismiss('cancel');
            };
            $scope.dniHost = $rootScope.dniHost;
            //get dnis settings for instructions page
            DNIWebService.getDniCode($rootScope.currentOUId)
                .then(function(result) {
                    if (result.data.json.dni_code !== null) {
                        $scope.dni_code = result.data.json.dni_code;
                    }
                });
        }
    ]);
