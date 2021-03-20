angular.module('theme.calloverview', ['ui.select2', 'angularUtils.directives.dirPagination', "api-param"])
    .factory('CallTrackingWebService', function($q, $timeout, $http, $window, $rootScope, ApiParam) {
        'use strict';
        var CallTrackingWebService = {};
        CallTrackingWebService.getLookerUrl = function(lookerData) {
          var req = {
              method: 'POST',
              url: ApiParam.baseURL() + "/v1/looker",
              headers: ApiParam.headerConfig().headers,
              data: lookerData
          };
          return $http(req);
        };
        return CallTrackingWebService;
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
    .controller('CallsTrackingController', ['$scope','$sce', '$http', '$window', '$rootScope', '$routeParams', 'progressLoader', 'CallTrackingWebService', 'pinesNotifications', '$timeout', '$compile', '$q', '$bootbox', '$uibModal', '$location',
        function($scope,$sce, $http, $window, $rootScope, $routeParams, progressLoader, CallTrackingWebService, pinesNotifications, $timeout, $compile, $q, $bootbox, $uibModal, $location) {
            if (parseInt($rootScope.billingId) !== 8 && parseInt($rootScope.billingId) !== 194 && parseInt($rootScope.billingId) !== 7414){
                $window.location.href = '#/access-denied';
            }
            $scope.looker_filters = {};
            $(window).on("message", function (event) {
              if (event.originalEvent.source === $("#looker")[0].contentWindow) { // Specifically from the      Looker embed iframe
                eventData = JSON.parse(event.originalEvent.data);
                if(eventData.type == "dashboard:filters:changed") {
                  console.log(eventData.dashboard.dashboard_filters);
                  $scope.looker_filters = eventData.dashboard.dashboard_filters;
                }
              }
            });

            $scope.isCompare = false;
            $scope.report = "call_overview";

            var lookerFilter = {
                "dashboard_id" : ($routeParams.report_id) ? $routeParams.report_id : 10,
                "host":$location.host(),
                'timezone':$rootScope.timezone,
                'filters': $scope.looker_filters

            };
            $scope.showCompare = (parseInt(lookerFilter.dashboard_id) === 9) ? false: true;

            $scope.applyFilter = function() {
                progressLoader.start();
                var lookerFilter = {
                    "dashboard_id" : ($scope.isCompare) ? 7 :10,
                    "host":$location.host(),
                    'timezone': $rootScope.timezone,
                    'filters': $scope.looker_filters
                };

                CallTrackingWebService.getLookerUrl(lookerFilter).then(function(result) {
                    console.log("result.data.json",JSON.stringify(result.data.json));
                    $scope.lookerUrl = $sce.trustAsResourceUrl(result.data.json);
                    progressLoader.set(100);
                    progressLoader.end();
                });
            };


            CallTrackingWebService.getLookerUrl(lookerFilter).then(function(result) {
              $scope.lookerUrl = $sce.trustAsResourceUrl(result.data.json);
            });
        }
    ]
);
