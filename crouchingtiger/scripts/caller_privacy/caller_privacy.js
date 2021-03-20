/**
 * Created by Ashutosh Jagtap on 4/9/15.
 */
angular
    .module('caller_privacy', ["api-param","theme.navigation-controller"])

    .factory('callerPrivacyService', function ($q, $timeout, $http, $window, $rootScope, ApiParam) {
        'use strict';
        var callerPrivacyService = {};

        callerPrivacyService.getJsonConfig = function () {
            return {
                'content-type': 'application/json',
                'Authorization': 'bearer ' + $window.sessionStorage.token
            };
        };
        callerPrivacyService.notify = function (args) {
            PNotify.removeAll();
            var notification = new PNotify(args);
            notification.notify = notification.update;
            return notification;
        };

        callerPrivacyService.access = function (ouid) {
	        return $http.get(ApiParam.baseURL() + "/v1/callerprivacy/" + ouid, ApiParam.headerConfig());
        };

        callerPrivacyService.setSettings = function (cp) {
            var req = {
                method: 'POST',
                url: $rootScope.url + ":" + $rootScope.port + "/v1/callerprivacy",
                headers: this.getJsonConfig(),
                data: cp
            };
            return $http(req);
        };

        callerPrivacyService.setDownloadAudioSetting = function (cp) {
          var req = {
              method: 'POST',
              url: $rootScope.url + ":" + $rootScope.port + "/v1/callerprivacy/download-audio",
              headers: this.getJsonConfig(),
              data: cp
          };
          return $http(req);
      };

        callerPrivacyService.setProtection = function (cp) {
            var req = {
                method: 'POST',
                url: $rootScope.url + ":" + $rootScope.port + "/v1/callerprivacy/protection",
                headers: this.getJsonConfig(),
                data: cp
            };
            return $http(req);
        };

        return callerPrivacyService;
    })
    .controller('callerPrivacyController', ['$scope', '$filter', '$location', '$routeParams', '$rootScope', 'callerPrivacyService', 'pinesNotifications','$bootbox','$route','menuBarService','$window',
        function ($scope, $filter, $location, $routeParams, $rootScope, callerPrivacyService, pinesNotifications,$bootbox,$route,menuBarService,$window) {
            'use strict';

            if($rootScope.highestOUId !== $rootScope.billingId || $rootScope.userAccess.hipaa === undefined || (parseInt($rootScope.roleId) !== 1 || parseInt($rootScope.userAccess.hipaa) !== 7)){
              location.href = '#/access-denied';
            }
            if ($scope.userAccess && $scope.userAccess.downloadaudio) {
              $scope.downloadAudioToggle = true;
            }
            $scope.callerName = false;
            $scope.address = false;
            $scope.city =false;
            $scope.lineType = false;
            $scope.state = false;
            $scope.odnActive = false;
            $scope.companyName = false;
            $scope.isDataAppend = false;
            callerPrivacyService.access($rootScope.currentOUId).then(function (result) {
                if (result.data.result === 'success') {
                    var cp = result.data.json[0];
                    $scope.callerName = cp.is_caller_name;
                    $scope.address = cp.is_address;
                    $scope.city = cp.is_city;
                    $scope.lineType = cp.is_line_type;
                    $scope.state = cp.is_state;
                    $scope.zip = cp.is_zip;
                    $scope.odnActive = cp.protect_caller_id;
                    $scope.companyName = cp.is_company_name;
                    $scope.isDataAppend = cp.data_append;
                    $scope.allowDownloadAudio = cp.download_audio_enabled;
                  } else {
                    pinesNotifications.notify({
                        title: 'Caller Privacy Setting',
                        text: 'Error fetching settings' + result.data.err,
                        type: 'error'
                    });
                }
            });
            $scope.activeToggle = function(){
              $scope.cpSttings = {};
              $scope.cpSttings.is_caller_name = $scope.callerName;
              $scope.cpSttings.is_address = $scope.address;
              $scope.cpSttings.is_city = $scope.city;
              $scope.cpSttings.is_line_type = $scope.lineType;
              $scope.cpSttings.is_state = $scope.state;
              $scope.cpSttings.is_zip = $scope.zip;
              $scope.cpSttings.is_company_name = $scope.companyName;
              $scope.cpSttings.org_unit_id = $rootScope.currentOUId;
              callerPrivacyService.setSettings($scope.cpSttings).then(function (result) {
                  if (result.data.result === 'success') {
                    pinesNotifications.notify({
                        title: 'Caller Privacy Setting',
                        text: 'Settings updated successfully',
                        type: 'success'
                    });
                    } else {
                      pinesNotifications.notify({
                          title: 'Caller Privacy Setting',
                          text: 'Error updating settings : ' + result.data.err,
                          type: 'error'
                      });
                  }
              });
            };
            $scope.setProtection = function(){
              $scope.cpSttings = {};
              $scope.cpSttings.protect_caller_id = $scope.odnActive;
              $scope.cpSttings.org_unit_id = $rootScope.currentOUId;
              callerPrivacyService.setProtection($scope.cpSttings).then(function (result) {
                  if (result.data.result === 'success') {
                    pinesNotifications.notify({
                        title: 'Caller Privacy Setting',
                        text: 'Settings updated successfully',
                        type: 'success'
                    });
                    } else {
                      pinesNotifications.notify({
                          title: 'Caller Privacy Setting',
                          text: 'Error updating settings : ' + result.data.err,
                          type: 'error'
                      });
                  }
                  $rootScope.protect_caller_id = $window.sessionStorage.protect_caller_id = result.data.json.protect_caller_id;
                  var menu = menuBarService.getMenuBar();
                  _.each(menu, function(main, mainIndex) { // cycle through main menu
                    if (main.label === 'Settings') { // matched main menu entry
                      _.each(menu[mainIndex].children, function(sub, subIndex) { // cycle through sub-menu
                          if (sub.label === 'Customization') { // matched sub-menu entry
                          // insert White Label into sub-menu list at end
                            var index = _.findLastIndex(menu[mainIndex].children[subIndex].children, {
                              label: 'Blacklist'
                          });
                            if(result.data.json.protect_caller_id){
                              if(index > -1){
                                menu[mainIndex].children[subIndex].children.splice(index,1);
                              }
                            }else{
                              if(index === -1){
                              menu[mainIndex].children[subIndex].children.push({
                                 label: 'Blacklist',
                                             url: '#/set-blacklist'
                              });
                            }
                            }
                          }
                        menu[mainIndex].children[subIndex].children = _.sortBy(menu[mainIndex].children[subIndex].children, function(nav) { return nav.label; });
                      });
                    }
                  });

                  menuBarService.setMenuBar(menu);
              });
            };
            $scope.setDownloadAudioSetting = function(){
              $scope.daSettings = {};
              $scope.daSettings.is_caller_name = $scope.callerName;
              $scope.daSettings.is_address = $scope.address;
              $scope.daSettings.is_city = $scope.city;
              $scope.daSettings.is_line_type = $scope.lineType;
              $scope.daSettings.is_state = $scope.state;
              $scope.daSettings.is_zip = $scope.zip;
              $scope.daSettings.is_company_name = $scope.companyName;
              $scope.daSettings.download_audio_enabled = $scope.allowDownloadAudio;
              $scope.daSettings.org_unit_id = $rootScope.currentOUId;
              callerPrivacyService.setDownloadAudioSetting($scope.daSettings).then(function (result) {
                  if (result.data.result === 'success') {
                    pinesNotifications.notify({
                        title: 'Download Audio Setting',
                        text: 'Settings updated successfully',
                        type: 'success'
                    });
                    } else {
                      pinesNotifications.notify({
                          title: 'Download Audio Setting',
                          text: 'Error updating settings : ' + result.data.err,
                          type: 'error'
                      });
                  }
                  $rootScope.download_audio_enabled = $window.localStorage.download_audio_enabled = $scope.allowDownloadAudio;
                  var menu = menuBarService.getMenuBar();
                  var legacyReportMenuIndex = _.findIndex(menu, { label: 'Legacy Reports' });
                  if($scope.allowDownloadAudio == true) {
                    if (legacyReportMenuIndex == -1) {
                        menu.splice(2, 0, {
                            label: 'Legacy Reports',
                            iconClasses: 'fa fa-bar-chart-o',
                            children: [{
                                label: 'Call Details',
                                url: '#/calls-details?report=call_detail'
                            },
                            {
                                label: 'Group Activity',
                                url: '#/activity-group?report=group_activity'
                            },
                            {
                                label: 'Tracking Number Settings',
                                url: '#/settings-call-flow?report=callflow_setting'
                            }
                            ]
                        });
                      _.each(menu, function (main, mainIndex) { // cycle through main menu
                        if (main.label === 'Settings') { // matched main menu entry
                          menu[mainIndex].children.splice(1, 0, {
                            label: 'Legacy Scheduled Reports',
                            url: '#/set-scheduled'
                          });
                        }
                      });
                    }
                  } else {
                    if (legacyReportMenuIndex !== -1) {
                      menu.splice(legacyReportMenuIndex, 1);
                      var legacyScheduleReportMenuIndex = -1;
                      _.each(menu, function (main, mainIndex) { // cycle through main menu
                        if (main.label === 'Settings') { // matched main menu entry
                          _.each(menu[mainIndex].children, function (sub, subIndex) { // cycle through sub-menu
                            if (sub.label === 'Legacy Scheduled Reports') { // matched sub-menu entry
                              legacyScheduleReportMenuIndex = subIndex;
                            }
                          });
                          if (legacyScheduleReportMenuIndex !== -1) {
                            menu[mainIndex].children.splice(legacyScheduleReportMenuIndex, 1);
                          }
                        }
                      });
                    }
                  }
                  menuBarService.setMenuBar(menu);
              });
            };
      }]);
