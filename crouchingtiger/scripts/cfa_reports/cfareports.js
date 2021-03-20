angular.module('theme.cfareports', ['ui.select2', 'angularUtils.directives.dirPagination', "api-param"])
    .factory('CfaReportsWebService', function($q, $timeout, $http, $window, $rootScope, ApiParam) {
        'use strict';
        var CfaReportsWebService = {};
        CfaReportsWebService.getLookerUrl = function(lookerData) {
          $http.defaults.useXDomain = true;
          var req = {
              method: 'POST',
              url: ApiParam.baseURL() + "/v1/looker",
              headers: ApiParam.headerConfig().headers,
              data: lookerData
          };
          return $http(req);
        };

        CfaReportsWebService.getDataAppend = function (ouid) {
          $http.defaults.useXDomain = true;
          return $http.get(ApiParam.baseURL() + "/v1/userpermissions/ouid/"+ouid, ApiParam.headerConfig());
          };
        return CfaReportsWebService;
    })
    .directive('setHeight', function($window){
      return function (scope, element) {
        var w = angular.element($window);
        scope.getWindowDimensions = function () {
      return{
                'h': w.innerHeight()
      };
        };
        scope.$watch(scope.getWindowDimensions, function (newValue, oldValue) {
          scope.windowHeight = newValue.h;
          element.css('height', newValue.h - 135 + 'px');
        }, true);

        w.bind('resize', function () {
            scope.$apply();
        });
      };
    })
    .controller('CfaReportsController', ['$scope','$rootScope','$sce', '$http', '$window', '$routeParams', 'progressLoader', 'CfaReportsWebService', 'pinesNotifications', '$timeout', '$compile', '$q', '$bootbox', '$uibModal', '$location','ApiParam',
        function($scope, $rootScope, $sce, $http, $window, $routeParams, progressLoader, CfaReportsWebService, pinesNotifications, $timeout, $compile, $q, $bootbox, $uibModal, $location, ApiParam) {
            $scope.reportList = [];
            var showReportsAtTop = [1139, 1111];
            $scope.looker_filters = {};
            $scope.reportList = $rootScope.reports;
            $scope.showCompare = false;
            $scope.isCompare = false;
            $scope.loadReport = function(selected_report) {
              selected_report = JSON.parse(selected_report);
              if(selected_report.looker_id === 10){
                $scope.showCompare = true;
              } else {
                $scope.showCompare = false;
                $scope.isCompare = false;
              }
              var report_timezone = $rootScope.timezone;
              if(selected_report.report_id === 1133 || selected_report.report_id === 1134) {
                report_timezone = 'GMT';
              }

              var lookerFilter = {
                "dashboard_id" : selected_report.looker_id,
                "host": $location.host(),
                "api_url": ApiParam.baseURL(),
                'timezone': report_timezone,
                'filters': $scope.looker_filters,
                'isCompare': $scope.isCompare
              };
            console.log("$location.host()",$location.host());
              CfaReportsWebService.getLookerUrl(lookerFilter).then(function(result) {
              $scope.lookerUrl = $sce.trustAsResourceUrl(result.data.json);
              CfaReportsWebService.getDataAppend($rootScope.currentOUId).then(function (result) {
                  if (result.data.result == 'success') {
                    if(selected_report.report_id === 1131 && result.data.json[0].data_append === false){
                      $window.location.href = '#/access-denied';
                      return;
                    }
                  }
              });
              });
            };

            if($scope.reportList.length < 1){
                $window.location.href = '#/access-denied';
                pinesNotifications.notify({
                    title: "Reports",
                    text:  "It looks like you do not have permission to access this page. Please reach out to your administrator to have permissions granted.",
                    type:  "error"
                });
                return;
           }else{

            _.map(showReportsAtTop, function(reportAtTop) {
              var report = _.find($scope.reportList,function(rep){
                 return (rep.report_id === reportAtTop);
              });
              if(report){
                $scope.reportList.unshift(report);
                $scope.reportList = _.uniq($scope.reportList,function(key){ return key.report_id;});
              }
              // body...
            });
              $scope.loadReport(JSON.stringify($scope.reportList[0]));
           }
          $scope.selectedReport = function(selected_report) {
            $scope.loadReport(selected_report);
          };
        }
    ]
);
