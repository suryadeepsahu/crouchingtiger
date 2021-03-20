/**
 * Created by davey on 4/9/15.
 */
angular
    .module('dataappend', [])

    .factory('DataAppendService', function ($q, $timeout, $http, $window, $rootScope) {
        'use strict';
        var DataAppendService = {};

        DataAppendService.getJsonConfig = function () {
            return {
                'content-type': 'application/json',
                'Authorization': 'bearer ' + $window.sessionStorage.token
            };
        };

        DataAppendService.notify = function (args) {
            PNotify.removeAll();
            var notification = new PNotify(args);
            notification.notify = notification.update;
            return notification;
        };

        DataAppendService.getDataAppendInfo = function (ouid) {
            var req = {
                method: 'GET',
                url: $rootScope.url + ":" + $rootScope.port + "/v1/billing/" + ouid,
                headers: this.getJsonConfig()
            };
            return $http(req);
        };

 

        DataAppendService.addDataAppendInfo = function (appendInfo) {
            var req = {
                method: 'POST',
                url: $rootScope.url + ":" + $rootScope.port + "/v1/billing",
                headers: this.getJsonConfig(),
                data: appendInfo
            };
            return $http(req);
        };

        DataAppendService.updateDataAppendInfo = function (appendInfo) {
            var req = {
                method: 'PUT',
                url: $rootScope.url + ":" + $rootScope.port + "/v1/billing/",
                headers: this.getJsonConfig(),
                data: appendInfo
            };
            return $http(req);
        };

 
        return DataAppendService;
    })

    .controller('DataAppendController', ['$scope', '$filter',  '$location', '$window', '$routeParams', '$rootScope', 'DataAppendService', '$bootbox', 'pinesNotifications','$route',
        function ($scope, $filter,  $location, $window, $routeParams, $rootScope, DataAppendService, $bootbox, pinesNotifications,$route) {

            'use strict';
             $scope.isNew = true;
            // $scope.canModify = false;
            if ($window.sessionStorage.currentOUId !== $window.sessionStorage.billingId || $scope.userAccess.orgunit < 6)
                { location.href = '#/access-denied';  }
                               // $scope.canModify = true;
            //if (!$rootScope.userAccess.webhook) { location.href = '#/access-denied'; return; }
            $scope.setAppendAct= function(){
	            var pdata = {};
                if($scope.append_active ===true){
                     console.log("action was true");
                     if($scope.isNew === true){
                        // new so POST
                        console.log("new so POST");
                        pdata = {
                            "billing" : {
                                "org_unit_id":$rootScope.currentOUId,
                                "data_append":true
                            }
                        };
                        DataAppendService.addDataAppendInfo(pdata).then(function (result) {
                            if (result.data.result !== 'error') {
                                $scope.isNew = false;
                                pinesNotifications.notify({
                                    title: 'Data Append',
                                    text:  'Data Append successfully Enabled',
                                    type:  'success'
                                });
                                return;
 
                            }
                            else
                            {
                            
                                pinesNotifications.notify({
                                    title: 'Data Append',
                                    text:  'There was an error Enabling Data Append',
                                    type:  'error'
                                });
                                return;
                            }
                      });

                     }
                     else
                     {
                        console.log("existing so PUT");
                        pdata = {
                            "billing" : {
                                "org_unit_id":$rootScope.currentOUId,
                                "data_append":true
                            }
                        };
                        DataAppendService.updateDataAppendInfo(pdata).then(function (result) {
                            if (result.data.result !== 'error') {
                                pinesNotifications.notify({
                                    title: 'Data Append',
                                    text:  'Data Append successfully Enabled',
                                    type:  'success'
                                });
                                return;                                
 
                            }
                            else
                            {
                            
                                pinesNotifications.notify({
                                    title: 'Data Append',
                                    text:  'There was an error Enabling Data Append',
                                    type:  'error'
                                });
                                return;                                
                            }
                      });                        
                     }
                }   
                else{
                     console.log("action was false");
                     if($scope.isNew === true){
                        // new so POST
                        console.log("new so POST");
                       pdata = {
                            "billing" : {
                                "org_unit_id":$rootScope.currentOUId,
                                "data_append":false
                            }
                        };
                        DataAppendService.addDataAppendInfo(pdata).then(function (result) {
                            if (result.data.result !== 'error') {
                                $scope.isNew = false;
                               pinesNotifications.notify({
                                    title: 'Data Append',
                                    text:  'Data Append successfully Disabled',
                                    type:  'success'
                                });
                                return;                                          
 
                            }
                            else
                            {
                                pinesNotifications.notify({
                                    title: 'Data Append',
                                    text:  'There was an error Disabling Data Append',
                                    type:  'error'
                                });
                                return;                                         
                            }
                      });                        

                     }
                     else
                     {
                        console.log("existing so PUT");
                        pdata = {
                            "billing" : {
                                "org_unit_id":$rootScope.currentOUId,
                                "data_append":false
                            }
                        };
                        DataAppendService.updateDataAppendInfo(pdata).then(function (result) {
                            if (result.data.result !== 'error') {
                               pinesNotifications.notify({
                                    title: 'Data Append',
                                    text:  'Data Append successfully Disabled',
                                    type:  'success'
                                });
                                return;   
                            }
                            else
                            {
                                 pinesNotifications.notify({
                                    title: 'Data Append',
                                    text:  'There was an error Disabling Data Append',
                                    type:  'error'
                                });
                                return;                                 
                            }
                      });                                 
                     }
                 } 
            };


            // make the initial call to display log records on page load
            DataAppendService.getDataAppendInfo($window.sessionStorage.billingId).then(function (result) {
                if (result.data.result !== 'error') {
                    if(result.data.json.length > 0){
                        // existing billing data exists so PUT data
                         $scope.isNew = false;
                        $scope.append_active = result.data.json[0].data_append;
                    }
                    else
                    {
                        // no billing data to POST new info
                         $scope.isNew = true;
                    }
                }
            });

 


    }]);

  
