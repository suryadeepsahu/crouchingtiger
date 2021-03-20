angular
    .module('theme.messages-controller', [])
    .factory('LogActivityService', function($q, $timeout, $http, $window, $rootScope) {
        'use strict';
        var LogActivityService = {};

        LogActivityService.notify = function(args) {
            PNotify.removeAll();
            var notification = new PNotify(args);
            notification.notify = notification.update;
            return notification;
        };

        LogActivityService.stream = function(log) {
            var req = {
                method: 'POST',
                url: $rootScope.url + ":" + $rootScope.port + "/v1/logactivity/stream",
                headers: {
                    'content-type': 'application/json',
                    'Authorization': 'bearer ' + $window.sessionStorage.token
                },
                data: log
            };
            return $http(req);
        };
        return LogActivityService;
    })
    .controller('MessagesController', ['$scope', 'LogActivityService', '$rootScope', '$window', function($scope, LogActivityService, $rootScope, $window) {
        'use strict';

        $scope.log_list = [{
            'log': 'log_billing',
            'text': 'Billing'
        }, {
            'log': 'log_call_action',
            'text': 'Call Actions'
        }, {
            'log': 'log_call_flow',
            'text': 'Call Flow'
        }, {
            'log': 'log_campaign',
            'text': 'Campaigns'
        }, {
            'log': 'log_integration',
            'text': 'Integrations'
        }, {
            'log': 'log_ivr',
            'text': 'IVR Route'
        }, {
            'log': 'log_tag',
            'text': 'Tags'
        }, {
            'log': 'log_user',
            'text': 'User/Group'
        }, {
            'log': 'log_webhook',
            'text': 'Webhooks'
        }];
        var iconmap = {
            'log_billing': 'fa fa-money',
            'log_call_action': 'fa fa-bolt',
            'log_call_flow': 'fa fa-phone',
            'log_campaign': 'fa fa-gear',
            'log_integration': 'fa-cloud',
            'log_ivr': 'fa fa-wrench',
            'log_tag': 'fa fa-tags',
            'log_user': 'fa fa-user',
            'log_webhook': 'fa fa-info'
        };
        var actionmap = {
            'insert': 'added',
            'delete': 'removed',
            'update': 'modified',
            'login': 'login for',
            'logout': 'logout for'
        };


        $scope.getMessageLogs = function() {

						var reqdata = {
                'org_unit_id': $rootScope.currentOUId,
                'start_date': moment().subtract('days', 90).format("YYYY-MM-DD") + " 00:00:00",
                'timezone': $rootScope.timezone,
                'end_date': moment().format("YYYY-MM-DD") + " 23:59:59",
                'limit': 5
            };

            $scope.logs = [];

            if ($window.sessionStorage.token !== undefined) {
                LogActivityService.stream(reqdata).then(function(result) {
                    if (result.data.result != 'error') {

                        _.each(result.data.json, function(row) {
                            row.log_date = moment(row.timezone, 'YYYY-MM-DD hh:mm:ss A').format("YYYY-MM-DD h:m A");
                            row.iconcss = (iconmap[row.log_name] ? iconmap[row.log_name] : iconmap.user);
                            row.action = (actionmap[row.log_data.action] ? actionmap[row.log_data.action] : row.log_data.action);
                            row.username = row.first_name + ' ' + row.last_name + ' (' + row.username + ')';
                            _.each($scope.log_list, function(log) {
                                if (log.log === row.log_name) {
                                    row.log_name = log.text;
                                }
                            });
                            $scope.logs.push(row);
                        });
                    }
                });
            }

        };

        $scope.setRead = function(item, $event) {
            $event.preventDefault();
            $event.stopPropagation();
            item.read = true;
        };

        $scope.setUnread = function(item, $event) {
            $event.preventDefault();
            $event.stopPropagation();
            item.read = false;
        };

        $scope.setReadAll = function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            angular.forEach($scope.messages, function(item) {
                item.read = true;
            });
        };

        /*
        $scope.unseenCount = $filter('filter')($scope.messages, {read:false}).length;


        $scope.$watch('messages', function (messages) {
        	$scope.unseenCount = $filter('filter')(messages, {read:false}).length;
        }, true);
        */
    }]);
