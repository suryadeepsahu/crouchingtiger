/**
 * Created by davey on 4/9/15.
 */
angular
    .module('webhook', ["api-param","theme.form-directives"])

    .factory('WebhookService', function ($q, $timeout, $http, $window, $rootScope, ApiParam) {
        'use strict';
        var WebhookService = {};

        WebhookService.getJsonConfig = function () {
            return {
                'content-type': 'application/json',
                'Authorization': 'bearer ' + $window.sessionStorage.token
            };
        };

        WebhookService.notify = function (args) {
            PNotify.removeAll();
            var notification = new PNotify(args);
            notification.notify = notification.update;
            return notification;
        };

        WebhookService.list = function (ouid) {
	        return $http.get(ApiParam.baseURL() + "/v1/webhook/list/" + ouid, ApiParam.headerConfig());
        };

        WebhookService.getDataAppendInfo = function (ouid) {
            var req = {
                method: 'GET',
                url: $rootScope.url + ":" + $rootScope.port + "/v1/billing/" + ouid,
                headers: this.getJsonConfig()
            };
            return $http(req);
        };

        WebhookService.webhookList = function (ouid) {
	        return $http.get(ApiParam.baseURL() + "/v1/webhook/webhooklist/" + ouid, ApiParam.headerConfig());
        };
        /* These functions are no longer being used with the current methodology

         WebhookService.trigger = function() {

         var req = {
         method: 'GET',
         url: $rootScope.url + ":" + $rootScope.port + "/v1/webhook/trigger/",
         headers: {
         'content-type': 'application/json',
         'Authorization': 'bearer ' + $window.sessionStorage.token
         }
         };
         return $http(req);
         };

         WebhookService.payloadField = function(trigger) {
         var req = {
         method: 'GET',
         url: $rootScope.url + ":" + $rootScope.port + "/v1/webhook/payload/" + trigger,
         headers: {
         'content-type': 'application/json',
         'Authorization': 'bearer ' + $window.sessionStorage.token
         }
         };
         return $http(req);
         };

         WebhookService.payloadAdd = function(webhookid, triggerid, group) {
         var req = {
         method: 'PUT',
         url: $rootScope.url + ":" + $rootScope.port + "/v1/webhook/payload/" + webhookid + '/' + triggerid + '/' + group,
         headers: {
         'content-type': 'application/json',
         'Authorization': 'bearer ' + $window.sessionStorage.token
         },
         data: al
         };
         return $http(req);
         };
         */

        WebhookService.addHook = function (hook) {
            var req = {
                method: 'POST',
                url: $rootScope.url + ":" + $rootScope.port + "/v1/webhook",
                headers: this.getJsonConfig(),
                data: hook
            };
            return $http(req);
        };

        WebhookService.upHook = function (hook) {
            var req = {
                method: 'PUT',
                url: $rootScope.url + ":" + $rootScope.port + "/v1/webhook",
                headers: this.getJsonConfig(),
                data: hook
            };
            return $http(req);
        };

        WebhookService.getWebhook = function (webhookid) {
            var req = {
                method: 'GET',
                url: $rootScope.url + ":" + $rootScope.port + "/v1/webhook/" + webhookid +"/ouid/"+$rootScope.currentOUId,
                headers: this.getJsonConfig()
            };
            return $http(req);
        };

        WebhookService.addMap = function (map) {
            var req = {
                method: 'POST',
                url: $rootScope.url + ":" + $rootScope.port + "/v1/webhook/map",
                headers: this.getJsonConfig(),
                data: map
            };
            return $http(req);
        };

        WebhookService.updateMap = function (map) {
            var req = {
                method: 'PUT',
                url: $rootScope.url + ":" + $rootScope.port + "/v1/webhook/map",
                headers: this.getJsonConfig(),
                data: map
            };
            return $http(req);
        };

        WebhookService.dropMap = function (mapid) {
            var req = {
                method: 'DELETE',
                url: $rootScope.url + ":" + $rootScope.port + "/v1/webhook/map/" + mapid,
                headers: this.getJsonConfig()
            };
            return $http(req);
        };

        WebhookService.dropWebhook = function (webhookId) {
            var req = {
                method: 'DELETE',
                url: $rootScope.url + ":" + $rootScope.port + "/v1/webhook/" + webhookId,
                headers: this.getJsonConfig()
            };
            return $http(req);
        };
        WebhookService.testWebHook = function (hookInfo) {
        //var map ={"test":"test"};
            var req = {
                method: 'POST',
                url: $rootScope.url + ":" + $rootScope.port + "/v1/webhook/test",
                headers: this.getJsonConfig(),
                data: hookInfo
            };
            return $http(req);
        };

        WebhookService.webhookRoute = function (webhookid) {
            var req = {
                method: 'GET',
                url: $rootScope.url + ":" + $rootScope.port + "/v1/webhook/route/" + webhookid,
                headers: this.getJsonConfig()
            };
            return $http(req);
        };

        return WebhookService;
    })

    .controller('WebhookController', ['$scope', '$filter', 'TagWebService', '$location', '$window', '$routeParams', '$rootScope', 'WebhookService', '$bootbox', 'pinesNotifications','$route',
        function ($scope, $filter, TagWebService, $location, $window, $routeParams, $rootScope, WebhookService, $bootbox, pinesNotifications,$route) {

            'use strict';
            $rootScope.isSafari= $window.sessionStorage.isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window.safari || safari.pushNotification);

	      if (!$rootScope.userAccess.webhook) { location.href = '#/access-denied'; return; }

            $scope.headerNames = {
                name:               "Name",
                related_call_flows: "Related Tracking Numbers",
                status:             "Status",
                actions:            "Actions"
            };
            $scope.isLoadingApi = true;
            // make the initial call to display log records on page load
            WebhookService.list($rootScope.currentOUId).then(function (result) {
                if (result.data.result !== 'error') {
                    $scope.wbhooks = [];
                  _.each(result.data.json, function(row) {
                      var arrayWB = [];
                      if(row.post_webhooks){arrayWB.push(row.post_webhooks);}
                      if(row.pre_webhooks){arrayWB.push(row.pre_webhooks);}
                      row.provisioned_route_name = _.uniq(arrayWB).join(", ");
                      $scope.wbhooks.push(row);
                  });
                    $scope.hooks = $scope.wbhooks;
                    $scope.isLoadingApi = false;
                }
            });

            $scope.editWebhook = function (webhookid) {
                $window.location.href = document.location.protocol + '//' + document.location.host + "/#/set-webhook-builder?webhook_id=" + webhookid;
                //$location.path("/#/set-webhook-builder/" + webhookid);
            };

            $scope.deleteWebhook = function(webhook) {
                var mes = "";
                        if (webhook.provisioned_route_name) {
                            mes = "This webhook is associated with ("+webhook.provisioned_route_name+") Tracking Number.  Are you sure you want to delete?";
                        } else {
                            mes = "Are you sure you want to delete this webhook?";
                        }
                    $bootbox.confirm(mes, function (clickedOK) {
                        if (clickedOK) {

                            WebhookService.dropWebhook(webhook.webhook_id).then(function (result) {
                                if (result.data.result === 'success') {
                                    $route.reload();
                                    pinesNotifications.notify({
                                        title: 'Webhook',
                                        text:  'Webhook deleted successfully',
                                        type:  'success'
                                    });
                                } else {
                                    pinesNotifications.notify({
                                        title: 'Webhook',
                                        text: 'Failed while deleting your webhook. ' + result.data.err,
                                        type: 'error'
                                    });
                                }
                            });
                         }
                    });
            };

            $scope.csvHeaderNames = [
                $scope.headerNames.name,
                $scope.headerNames.related_call_flows,
                $scope.headerNames.status
            ];

            $scope.getCSVData = function (formate) {
                var hN = $scope.headerNames,
                    row;
                var csvData =  _.map($scope.hooks, function (hook) {
                    row = {};
                    row[hN.name] = hook.webhook_name;
                    row[hN.related_call_flows] = hook.provisioned_route_name;
                    row[hN.status] = hook.webhook_status;
                    return row;

                });
                if($rootScope.isSafari){
          		    var reportName = "csv_webhooks";
          		    if(formate === 'tsv'){ reportName = "tsv_webhooks";}
          		    JSONToCSVConvertor(csvData,reportName,true,formate);
          		  }else{
                  return csvData;
                }
            };

            $scope.exportPDF = function () {
                var pdf = new jsPDF('p', 'pt', 'a4');

                pdf.addHTML($("#pdfExportGroup"), function () {
                    var string = pdf.output('datauristring');
                });

                setTimeout(function () {
                    pdf.save("webhooks - " + moment().format('MMMM Do YYYY') + ".pdf");
                }, 2000);
            };

        }])

    .controller('WebhookBuilderController', ['$scope', '$filter', 'TagWebService', '$location', '$window', '$routeParams', '$rootScope', 'WebhookService', 'pinesNotifications','$bootbox','$route',
        function ($scope, $filter, TagWebService, $location, $window, $routeParams, $rootScope, WebhookService, pinesNotifications,$bootbox,$route) {
            'use strict';

            // WebhookService.trigger().success(function(result) { $scope.trigger = result.json; });

            $scope.webhook_id     = $location.search().webhook_id;
            $scope.static_success = false;
            $scope.static_fail    = false;
            $scope.static         = [];
            $scope.routes         = [];
            $scope.dupSubmit      = false;
            $scope.disError       = false;
            $scope.disEdit        = false;
            $scope.data_append    = false;

	        if (!$rootScope.userAccess.webhook) { location.href = '#/access-denied'; return; }

            // make the initial call to display log records on page load
            WebhookService.getDataAppendInfo($window.sessionStorage.billingId).then(function (result) {
                if (result.data.result !== 'error') {
                    if(result.data.json.length > 0){
                        $scope.append_active = result.data.json[0].data_append;
                    }
                }
            });

            if ($scope.webhook_id) {
                WebhookService.getWebhook($scope.webhook_id).success(function (result) {
                  if(result.result === 'error'){
                    WebhookService.notify({
                        title: 'Webhook',
                        text: 'Unauthorised Access to the Webhook',
                        type: 'error'
                    });
                    location.href = '#/set-webhook';
                    return;
                  }else{
                    var webhook_status = false;
                    if(result.json[0].webhook_status === 'active') {
                        webhook_status = true;
                    }
                    $scope.isNewWebhook        = false;
                    $scope.webhook             = result.json[0];
                    $scope.routes              = $scope.webhook.routes;
                    $scope.static              = $scope.webhook.static;
                    $scope.webhook_name        = $scope.webhook.webhook_name;
                    $scope.webhook_desc        = $scope.webhook.webhook_desc;
                    $scope.target_url          = $scope.webhook.target_url;
                    $scope.http_method         = $scope.webhook.http_method;
                    $scope.response_format     = $scope.webhook.response_format;
                    $scope.webhook_id          = $scope.webhook.webhook_id;
                    $scope.webhook_status      = webhook_status; // $scope.webhook.webhook_status;
                    $scope.include_score       = $scope.webhook.include_score;
                    $scope.include_dni         = $scope.webhook.include_dni;
                    $scope.data_append         = $scope.webhook.include_data_append;
 		             }
		           });
            }else{
                $scope.isNewWebhook = true;
                $scope.webhook_status = true;
            }
            /* no longer being used
             $scope.setPayload = function(triggerid) {
             $scope.payload = []; // reset payload
             _.each($scope.trigger, function(key, val) {
             if (key.trigger_id === parseInt(triggerid)) {
             _.each(key.payload, function(ky, vl) {
             $scope.payload.push({'group':ky});
             });
             }
             });
             };
             */
            $scope.arrRequired = [];
             $scope.validateStaticData = function (data, name) {
                var messageText;
                if (!data) {
                    $scope.arrRequired.push(name);
                    if (name != 'Static Value') {
                        return '   ';
                    }
                }

                if (name == 'Static Value') {
                    if ($scope.arrRequired.length) {
                        messageText = 'field is required.';
                        if ($scope.arrRequired.length > 1) {
                            messageText = 'fields are required.';
                        }
                        $scope.disError = true;
                        WebhookService.notify({
                            title: 'Static Parameter',
                            text: '\'' + $scope.arrRequired.join(', ') + '\' ' + messageText,
                            type: 'error'
                        });
                        var lastField = $scope.arrRequired.indexOf("Static Value");
                        $scope.arrInvalid = [];
                        $scope.arrRequired = [];
                        if (lastField > -1) {
                            return '   ';
                        }
                        else {
                            return '';
                        }
                    }
                }
            };

            // create or update a webhook record
            $scope.setWebhook = function () {
                var data = {
                    "org_unit_id": $rootScope.currentOUId,
                    "webhook_name": $scope.webhook_name,
                    "webhook_desc": $scope.webhook_desc,
                    "target_url": $scope.target_url,
                    "http_method": $scope.http_method,
                    "response_format": $scope.response_format,
                    "webhook_status" : ($scope.webhook_status ? 'active' : 'inactive'),
                    "include_dni": ($scope.include_dni ? 'true' : 'false'),
                    "include_score": ($scope.include_score ? 'true' : 'false'),
                    "include_data_append": ($scope.data_append ? 'true' : 'false'),
                };

                if ($scope.webhook_id) {
                    data.webhook_id = $scope.webhook_id;
                    data.webhook_updated = 'CURRENT_TIMESTAMP()';
                    WebhookService.upHook(data).then(function (result) {
                        $scope.formSubmit = false;
                        if (result.data.result === 'success') {
                            pinesNotifications.notify({
                                title: 'Webhook Details',
                                text: 'Successfully updated your webhook',
                                type: 'success'
                            });
                        } else {
                            pinesNotifications.notify({
                                title: 'Webhook Details',
                                text: 'Failed while updating your webhook. ' + result.data.err,
                                type: 'error'
                            });
                        }
                    });
                } else {
                    WebhookService.addHook(data).then(function (result) {
                         $scope.formSubmit = false;
                        if (result.data.result === 'success') {
                            pinesNotifications.notify({
                                title: 'Webhook Details',
                                text: 'Successfully created your webhook',
                                type: 'success'
                            });
                            $scope.webhook_id = result.data.json.insertId;
                            $location.search('webhook_id', $scope.webhook_id);
                            return;
                        } else {
                            pinesNotifications.notify({
                                title: 'Webhook Details',
                                text: 'Failed while creating your webhook. ' + result.data.err,
                                type: 'danger'
                            });
                        }
                    });
                }

            };

            $scope.setStatic = function (data, mapid) {
                // verify that the webhook is created first
                $scope.disEdit = true;
                if (!$scope.webhook_id) {
                    alert('You need to create a webhook first');
                    return;
                }

                var saveData = {
                    "field_name": data.field_name,
                    "field_value": data.field_value,
                    "webhook_id": $scope.webhook_id,
                    "map_order": $scope.static.length
                };

                if (mapid) { //edit existing mapping
                    saveData.webhook_map_id = mapid;
                    WebhookService.updateMap(saveData).then(function (result) {
                        $scope.disEdit = false;
                        if (result.data.result === 'success') {
                            // $scope.static_success = true;
                            $scope.dupSubmit = false;
                            pinesNotifications.notify({
                                title: 'Webhook Details',
                                text: 'Static Parameter updated successfully',
                                type: 'success'
                            });
                            //angular.extend(data, {id: id});
                        } else {
                            pinesNotifications.notify({
                                title: 'Webhook Details',
                                text: 'Error in updating Static Parameter' + result.data.err,
                                type: 'error'
                            });
                            // $scope.static_fail = true;
                            $scope.error = result;
                        }
                    });
                } else {
                    WebhookService.addMap(saveData).then(function (result) {
                        $scope.disEdit = false;
                        if (result.data.result === 'success') {
                            pinesNotifications.notify({
                                title: 'Webhook Details',
                                text: 'Static Parameter created successfully',
                                type: 'success'
                            });
                            $route.reload();
                        } else {
                            pinesNotifications.notify({
                                title: 'Webhook Details',
                                text: 'Error in creating Static Parameter' + result.data.err,
                                type: 'error'
                            });
                            $scope.error = result;
                        }
                    });
                }
            };

            $scope.removeStatic = function (data, mapid) {
                $bootbox.confirm("Are you sure you want to delete this Static Parameter?", function (clickedOK) {
                    if (clickedOK) {
                        WebhookService.dropMap(mapid).then(function (result) {
                            if (result.data.result === 'success') {
                                // now remove the entry from the static list
                                pinesNotifications.notify({
                                    title: 'Webhook Details',
                                    text: 'Static Parameter deleted successfully',
                                    type: 'success'
                                });
                                for (var x in $scope.static) {
                                    if ($scope.static[x].webhook_map_id == mapid) {
                                        $scope.static.splice(x, 1);
                                    }
                                }
                                // $scope.static_success = true;
                            } else {
                                pinesNotifications.notify({
                                    title: 'Webhook Details',
                                    text: 'Error in deleting Static Parameter' + result.data.err,
                                    type: 'error'
                                });
                                // $scope.static_fail = true;
                            }
                        });
                    }
                });
            };

            $scope.addStatic = function () {
                if($scope.static.length > 0) {
                    var lastAddedStatic;
                    lastAddedStatic = $scope.static[$scope.static.length - 1];
                    if ( !lastAddedStatic.field_name || !lastAddedStatic.field_value) {
                        pinesNotifications.notify({
                            title: "Add Location",
                            text:  "Save currently added static parameter before adding another.",
                            type:  "warning"
                        });
                        $scope.dupSubmit = true;
                        return;
                    }
                }

                $scope.inserted = {
                    field_name: '',
                    field_value: ''
                };
                $scope.static.push($scope.inserted);
            };

            $scope.enableSave = function() {
                $scope.disError = false;
            };

            $scope.cancelStatic = function (index, id, rowform) {
                if (!id) {
                    $scope.static.splice(index, 1);
                } else {
                    rowform.$cancel();
                }
                $scope.dupSubmit = false;
            };

			$(".alert").alert();
            $scope.testWebhook = function () {
                if(! $scope.target_url  ){
                    pinesNotifications.notify({
                        title: 'Test Webhook',
                        text: 'End Point URL is required',
                        type: 'error'
                    });
                    return ;
                }
                console.log($scope.static.length);
                var staticParams = [];
                for (var i =0 ;i < $scope.static.length;i++)
                {
                    staticParams.push({fieldname: $scope.static[i].field_name, fieldvalue: $scope.static[i].field_value});

                }
                var staticparam = $scope.static[0];
                var hostNameArr = $scope.target_url.split('/');
                var hostName = hostNameArr[2];

                var hostnamePath = [];
                for(i = 3; i < hostNameArr.length; i++ ) {
                    hostnamePath.push(hostNameArr[i]);
                }
                hostnamePath = hostnamePath.join('/');

                var testData = {
                    url: $scope.target_url,
                    method:$scope.http_method,
                    format:$scope.response_format,
                    host: hostName,
                    path: hostnamePath,
                    param: staticParams
                };
              //  alert(JSON.stringify(testData));
                    WebhookService.testWebHook(testData).then(function (result) {
                    if (result.status === 200) {
                    //    alert(JSON.stringify(result));
                    if(result.data.result !== 'error')
                        $scope.static_success = true;
                    else
                        $scope.static_fail = true;

                    }
                    else
                    {
                        $scope.static_fail = true;
                    }
                });
            };

            $scope.closeFail = function () {
                $scope.static_fail = false;
            };

            $scope.closeSuccess = function () {
                $scope.static_success = false;
            };

            //validate blank data before save.
            $scope.validateData = function (data, name) {
                var NAME_REGEXP = /^[a-zA-Z0-9_ -]+$/;
                var URL_REGEXP = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
                //var URL_REGEXP = /^(((ht|f)tp(s?))\://)?(www.|[a-zA-Z].)[a-zA-Z0-9\-\.]+\.(com|edu|gov|mil|net|org|biz|info|name|museum|us|ca|uk)(\:[0-9]+)*(/($|[a-zA-Z0-9\.\,\;\?\'\\\+&amp;%\$#\=~_\-]+))*$/;

                switch (name) {
                    case 'Webhook Name':
                        if (!NAME_REGEXP.test(data)) {
                            $scope.arrInvalid.push(name);
                            //return '   ';
                        }
                        break;
                    case 'Trigger Point':
                        if (data === '') {
                            $scope.arrInvalid.push(name);
                        }
                        break;
                    case 'End Point URL':
                        if (!NAME_REGEXP.test(data)) {
                            $scope.arrInvalid.push(name);
                        }
                        break;
                    case 'Method':
                        if (data === '') {
                            $scope.arrInvalid.push(name);
                        }
                        break;
                    case 'Format':
                        if (data === '') {
                            $scope.arrInvalid.push(name);
                        }
                        break;
                }

                if ($scope.arrInvalid.length) {
                    var messageText = 'field' + ($scope.arrInvalid.length > 1 ? 's' : '') + ' is invalid.';
                    WebhookService.notify({
                        title: 'Webhook Details',
                        text: '\'' + $scope.arrInvalid.join(', ') + '\' ' + messageText,
                        type: 'error'
                    });
                    $scope.arrRequired = [];
                    $scope.arrInvalid = [];
                    return '';
                }
            };

        }]);
