angular.module('theme.conversations', ['ui.select2', 'angularUtils.directives.dirPagination', "api-param"])
    .factory('ConversationWebService', function($q, $timeout, $http, $window, $rootScope, ApiParam) {
        'use strict';
        var ConversationWebService = {};
        
        ConversationWebService.getActiveConversations = function(qryStr) {
            $http.defaults.useXDomain = true;
            return $http.get(ApiParam.baseURL() + "/v1/conversation?" + qryStr + "&count=true&status=read,unread", ApiParam.headerConfig());
        };

        ConversationWebService.getActiveBadgeCount = function() {
            $http.defaults.useXDomain = true;
            return $http.get(ApiParam.baseURL() + "/v1/conversation/badge", ApiParam.headerConfig());
        };

        ConversationWebService.getConversations = function(qryStr) {
            $http.defaults.useXDomain = true;
            return $http.get(ApiParam.baseURL() + "/v1/conversation?" + qryStr + "&count=true", ApiParam.headerConfig());
        };

        ConversationWebService.viewConversation = function(conversations_id) {
            $http.defaults.useXDomain = true;
            return $http.get($rootScope.url + ":" + $rootScope.port + "/v1/conversation/" + conversations_id, ApiParam.headerConfig());
        };

        ConversationWebService.archiveConversation = function(conversation) {
            var req = {
                method: 'PUT',
                url: ApiParam.baseURL() + "/v1/conversation/status",
                headers: ApiParam.headerConfig().headers,
                data: conversation
            };
            return $http(req);
        };

        ConversationWebService.updateLabel = function(conversation) {
            var req = {
                method: 'PUT',
                url: ApiParam.baseURL() + "/v1/conversation/label",
                headers: ApiParam.headerConfig().headers,
                data: conversation
            };
            return $http(req);
        };
        return ConversationWebService;
    })
    .controller('ActiveConversationController', ['$scope', '$window', '$location', '$interval', '$rootScope', '$routeParams', 'ConversationWebService', 'advFilSrvc', 'pinesNotifications','progressLoader', '$bootbox',
        function($scope, $window, $location, $interval, $rootScope, $routeParams, ConversationWebService, advFilSrvc, pinesNotifications, progressLoader, $bootbox) {
            $scope.isActiveConversationsOpne = true;
            $scope.activeConversationsLoading = false;
            $rootScope.isSafari = $window.sessionStorage.isSafari = /constructor/i.test(window.HTMLElement) || (function(p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window.safari || safari.pushNotification);
            $scope.conversationsHeader = ['Group | External Id', 'Campaign | External Id', 'Tracking Number','Caller ID', 'First Message', 'Last Message', 'Agent Name | Agent Email', 'Label'];
            $scope.actionHeader = ['Actions'];
            $scope.currentPage = 1;
            $scope.pageSize = 10;
            $scope.limit = 10;
            $scope.isLabelEditing = false;
            $scope.noDataFound = false;
            $rootScope.activeConversations = [];
            $scope.totalActiveConversations = 0;
            $scope.advFilterDefinitions = [];
            $scope.canModify = false;
            $scope.oldLabel = '';
            $rootScope.conversationStatus = {
                UNREAD: 'unread',
                READ: 'read',
                REPLIED: 'replied',
                DELETED: 'deleted'
            };
            $rootScope.notificationType = {
                ERROR: 'error',
                SUCCESS: 'success'
            };
            $scope.pagination = { current: ($routeParams.page ? $routeParams.page : 1) };
            if($rootScope.userAccess.sms && (parseInt($rootScope.userAccess.sms) === 7)){
                $scope.canModify = true;
            }
            $scope.$on('message-sent', function(event, data) {
                if($rootScope.activeConversations.length === 0) {
                    $scope.noDataFound = true;
                }
            });
            // Common code to show notification
            $scope.showNotification = function(text, type){
                pinesNotifications.notify({
                    title: 'Conversation',
                    text: text,
                    type: type
                });
            };
            $scope.loadActiveConversationReport = function() {
                var tmp = "";
                $rootScope.activeConversations = [];
                $scope.activeConversationsLoading = true;
                if ($scope.urlParams.filtertype == "s" && $scope.urlParams.filter){                   
                    if (typeof($scope.urlParams.filter == "string")){
                        tmp = $scope.urlParams.filter;
                        var hashIndex = $scope.urlParams.filter.indexOf("`");
                        if (hashIndex > -1){
                            comIndex = $scope.urlParams.filter;
                            tmp = comIndex.replace(/`/g,",");
                        }
                    }
                    $scope.simpleSearchFilter = tmp;
                }
                ConversationWebService.getActiveConversations($.param($scope.urlParams)).then(function(result) {
                    if(result.data && result.data.err == '' && result.data.json && result.data.json.conversation && result.data.json.conversation.length){
                        $rootScope.activeConversations = result.data.json.conversation;
                        $scope.totalActiveConversations = result.data.json.total_record;
                        $scope.activeConversationsLoading = false;
                        $scope.noDataFound = false;
                    }else{
                        $scope.totalActiveConversations = 0;
                        $rootScope.activeConversations = [];
                        $scope.activeConversationsLoading = false;
                        $scope.noDataFound = true;
                    }                    
                });
            };

            $scope.applyActiveConversationsFilter = function() {
                var noErrors = $scope.applyActiveConversationsFilterParams();
                // Kill all event listeners on leave
                var importantListeners = ['$destroy', '$locationChangeStart', '$locationChangeSuccess'];
                for (var i in $rootScope.$$listeners) {
                    if (importantListeners.indexOf(i) === -1) {
                        delete $rootScope.$$listeners[i];
                    }
                }
                $scope.loadActiveConversationReport();
            };

            $scope.applyActiveConversationsFilterParams = function() {
                var urlParams = advFilSrvc.applyFilter($scope);
                if (urlParams) {
                    $scope.extendActiveConversationsUrlParams(urlParams);
                    return true;
                }
                return false;
            };

            $scope.extendActiveConversationsUrlParams = function(urlParams) {
                if (urlParams.vars.filtertype === 's') {
                    $scope.simpleSearchFilter = urlParams.vars.filter;
                }
                $scope.urlParams = urlParams.vars;
                $scope.drp_start = moment($scope.urlParams.start_date, 'YYYY-MM-DD').format('MMMM DD, YYYY');
                $scope.drp_end = moment($scope.urlParams.end_date, 'YYYY-MM-DD').format('MMMM DD, YYYY');
                angular.extend($scope, urlParams.vars);
                delete urlParams.vars;
                angular.extend($scope, urlParams);
            };

            $scope.filterReset = function() {
                $scope.advFilterDefinitions = [];
                $scope.showAdvFilter = false;
                $scope.simpleFilterText = '';
                $scope.filtertype = 's';
                $scope.filter = '';
                $scope.applyActiveConversationsFilter();
            };

            $scope.pageChanged = function(newPage) {
                $scope.offset = ($scope.pageSize * ($scope.pagination.current - 1));
                $scope.applyActiveConversationsFilter();
            };
            $scope.saveLabel = function(conversation) {
                if(($scope.oldLabel == null || $scope.oldLabel == '') && (conversation.label ==null || conversation.label == '')){
                    var errorText = 'Failed while updating conversation label. Label text should not be empty.';
                  $scope.showNotification(errorText,$rootScope.notificationType.ERROR);
                }else {
                    if (conversation.conversation_id){
                        var obj = {
                            'conversation_id' : conversation.conversation_id,
                            'conversation_status' : conversation.conversation_status,
                            'label' : conversation.label
                        };
                        ConversationWebService.updateLabel(obj).then(function(result) {
                            if (result.data.status === 'success') {
                                $scope.isLabelEditing =  false;
                                $scope.applyActiveConversationsFilter();
                                $scope.showNotification('Label updated successfully',$rootScope.notificationType.SUCCESS);
                                if($scope.conversationData.length > 0){
                                    $scope.conversationData.forEach(function(item,idx){
                                        if(conversation.conversation_id == item.conver.conversation_id){
                                            $scope.conversationData[idx].conver.label=conversation.label;
                                            $scope.conversationData[idx].conver.labelUpdate=conversation.label;
                                          }
                                    });
                                }
                            } else {
                                $scope.isLabelEditing =  false;
                                $scope.applyActiveConversationsFilter();
                                var errorText = 'Failed while updating conversation label. ' + result.data.err;
                                $scope.showNotification(errorText,$rootScope.notificationType.ERROR);
                            }
                        });
                    } else {
                        $scope.showNotification('Failed while updating conversation label.',$rootScope.notificationType.ERROR);
                    }           
                }
                     
            };
            
            $scope.applyActiveConversationsFilter();

            $scope.refactoringInactiveConversations = function(){
                var listOfConversations = _.pluck($rootScope.activeConversations , 'conversation_id');
                _.forEach(listOfConversations, function(id){
                    var index = _.findIndex($rootScope.conversations, function (obj) { return obj.conversation_id == id; });
                    if(index !== -1){
                        $rootScope.conversations.splice(index,1);
                    }else{
                        console.log("nothing to remove");
                    }
                    
                });
            };

            $scope.removeConversation = function(conversation){
                var mes = "Conversation will not be shown once archived. For retrieval you need to contact customer support. Do you still want to proceed?";
                $bootbox.confirm(mes, function (clickedOK) {
                    if (clickedOK && conversation.conversation_id) {
                        var obj = {
                            'conversation_id' : conversation.conversation_id,
                            'conversation_status' : $rootScope.conversationStatus.DELETED
                        };
                        ConversationWebService.archiveConversation(obj).then(function(result) {
                            if (result.data.status === 'success') {
                                $scope.applyActiveConversationsFilter();
                                $scope.showNotification('Conversation archived successfully',$rootScope.notificationType.SUCCESS);
                                var index = _.findIndex($scope.conversationData, function (obj) { 
                                    return obj.conver.conversation_id == conversation.conversation_id; 
                                });
                                $rootScope.$broadcast('closeChatArchiev', {index: index});
                            } else {
                                var errorText = 'Failed while archiving your conversation. ' + result.data.err;
                                $scope.showNotification(errorText,$rootScope.notificationType.ERROR);
                            }
                        });
                    }
                });
            };

            $scope.labelEdit = function(conversation){
                $scope.oldLabel = conversation.label;
                $scope.isLabelEditing =  true;
            };

            $scope.refactoringInactiveConversations = function(){
                var listOfConversations = _.pluck($rootScope.activeConversations , 'conversation_id');
                _.forEach(listOfConversations, function(id){
                    var index = _.findIndex($rootScope.conversations, function (obj) { return obj.conversation_id == id; });
                    if(index !== -1){
                        $rootScope.conversations.splice(index,1);
                        $rootScope.$broadcast("conversation-moved");
                    }else{
                        console.log("nothing to remove");
                    }
                    
                });
            };

            $interval(function() {
                if($rootScope.loginState == 'loggedin' && $location.path() === '/sms-conversations' && $scope.isLabelEditing == false){
                    ConversationWebService.getActiveConversations($.param($scope.urlParams)).then(function(result) {
                        if(result.data && result.data.err == '' && result.data.json && result.data.json.conversation && result.data.json.conversation.length){
                            $rootScope.activeConversations = result.data.json.conversation;
                            $scope.totalActiveConversations = result.data.json.total_record;
                            $scope.noDataFound = false;
                            $scope.refactoringInactiveConversations();
                        }else{
                            $scope.totalActiveConversations = 0;
                            $rootScope.activeConversations = [];
                            $scope.activeConversationsLoading = false;
                            $scope.noDataFound = true;
                        }                    
                    });
                }
            }, 30000);
            //Passing the data to open chat window 
            $rootScope.replyConversation = function(data) {
                $scope.isAlreadyOpen=false;
                // Broadcast message to navigation to update badge count
                if(data.conversation_status === $rootScope.conversationStatus.UNREAD){
                    data.conversation_status = $rootScope.conversationStatus.READ;
                    $rootScope.$broadcast('msg_read', $rootScope.activeConversation - 1);
                }
                if($scope.conversationData){
                    $scope.conversationData.forEach(function(item){
                        if(item.conver.conversation_id==data.conversation_id){
                            $scope.isAlreadyOpen=true;
                        }
                    });
                }
                if(!$scope.isAlreadyOpen){
                    var conver=Object.assign({}, data);
                    $scope.countAdd++;
                    obj= {
                        countAdd:$scope.countAdd
                    };
                    $scope.countChatWindow.push(obj);
                    $scope.$emit('chatWindowOpen', {conver: conver});
                }
            };
            $scope.$on("labelUpdate", function(event, UpdatedConversation) {
                $scope.activeConversations.forEach(function(conversation){
                     if(UpdatedConversation.conversation_id === conversation.conversation_id){
                        conversation.label = UpdatedConversation.label;
                     }  
                });
            });
            $scope.$on("conversation-moved", function(event) {
                $scope.totalActiveConversations = $scope.totalActiveConversations - 1;
                $scope.noDataFound = $rootScope.activeConversations.length === 0 ? true : false;
            });
        }
    ])
    .controller('ConversationController', ['$scope', '$window', '$rootScope', '$routeParams', 'ConversationWebService', 'advFilSrvc', 'pinesNotifications','progressLoader', '$bootbox', '$q',
    function($scope, $window, $rootScope, $routeParams, ConversationWebService, advFilSrvc, pinesNotifications, progressLoader, $bootbox, $q) {
        $scope.isConversationsOpne = true;
        $scope.conversationsLoading = false;
        $rootScope.isSafari = $window.sessionStorage.isSafari = /constructor/i.test(window.HTMLElement) || (function(p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window.safari || safari.pushNotification);
        $scope.conversationsHeader = ['Group | External Id', 'Campaign | External Id', 'Tracking Number','Caller ID', 'First Message', 'Last Message', 'Agent Name | Agent Email', 'Label'];
        $scope.actionHeader = ['Actions'];
        $scope.noDataFound = false;
        $rootScope.conversations = [];
        $scope.totalConversations = 0;
        $scope.advFilterDefinitions = [];
        $scope.pagination = { current: ($routeParams.page ? $routeParams.page : 1) };
        $scope.currentPage = 1;
        $scope.pageSize = 100;
        $scope.oldLabel = null;
        $scope.canModify = false;
        $scope.drp_options = {
            ranges: {
                'Today': [moment().startOf('day'), moment().endOf('day')],
                'Yesterday': [moment().subtract(1, 'days').startOf('day'), moment().subtract(1, 'days').endOf('day')],
                'Last 7 Days': [moment().subtract(6, 'days').startOf('day'), moment().subtract(0, 'days').endOf('day')],
                'Last 30 Days': [moment().subtract(29, 'days').startOf('day'), moment().subtract(0, 'days').endOf('day')],
                'This Month': [moment().startOf('month').startOf('day'), moment().endOf('month').endOf('day')],
                'Last Month': [moment().subtract(1, 'month').startOf('month').startOf('day'), moment().subtract(1, 'month').endOf('month').endOf('day')]
            },
            opens: 'left',
            startDate: moment().subtract(7, 'days').startOf('day'),
            endDate: moment().subtract(1, 'days').endOf('day')
        };

        $scope.$on('message-sent', function(event, data) {
                $scope.noDataFound = false;
        });

        $scope.$on("conversation-moved", function() {
            $scope.totalConversations = $rootScope.conversations.length;
            $scope.noDataFound = $rootScope.conversations.length === 0 ? true : false;
        });

        $scope.showNotification = function(text, type){
            pinesNotifications.notify({
                title: 'Conversation',
                text: text,
                type: type
            });
        };

        // Set datepicker on load
        if ($window.sessionStorage.report_start_date) {
            $scope.drp_start = moment($window.sessionStorage.report_start_date).format('MMMM D, YYYY');
        } else {
            $scope.drp_start = $scope.drp_options.ranges['Last 7 Days'][0].format('MMMM D, YYYY');
        }
        if ($window.sessionStorage.report_end_date) {
            $scope.drp_end = moment($window.sessionStorage.report_end_date).format('MMMM D, YYYY');
        } else {
            $scope.drp_end = $scope.drp_options.ranges['Last 7 Days'][1].format('MMMM D, YYYY');
        }
        
        $scope.drp_options.startDate = moment($scope.drp_start);
        $scope.drp_options.endDate = moment($scope.drp_end);

        if($rootScope.userAccess.sms && (parseInt($rootScope.userAccess.sms) === 7)){
            $scope.canModify = true;
        }

        $scope.loadConversationReport = function() {
            var tmp = "";
            $scope.conversationsLoading = true;
            $rootScope.conversations = [];
            if ($scope.urlParams.filtertype == "s" && $scope.urlParams.filter){                   
                if (typeof($scope.urlParams.filter == "string")){
                    tmp = $scope.urlParams.filter;
                    var hashIndex = $scope.urlParams.filter.indexOf("`");
                    if (hashIndex > -1){
                        comIndex = $scope.urlParams.filter;
                        tmp = comIndex.replace(/`/g,",");
                    }
                }
                $scope.simpleSearchFilter = tmp;
            }

            ConversationWebService.getConversations($.param($scope.urlParams)).then(function(result) {
                if(result.data && result.data.err == '' && result.data.json && result.data.json.conversation && result.data.json.conversation.length){
                    $rootScope.conversations = result.data.json.conversation;
                    $scope.totalConversations = result.data.json.total_record;
                    $scope.conversationsLoading = false;
                    $scope.noDataFound = false;
                }else{
                    $scope.totalConversations = 0;
                    $rootScope.conversations = [];
                    $scope.conversationsLoading = false;
                    $scope.noDataFound = true;
                }                
            });
        };
        
        $scope.labelEdit = function(conversation){
            $scope.oldLabel = conversation.label;
        };

        var conversationReportName =  "SMS Conversation" + " " + moment().format('YYYY-MM-DD');
        $scope.conversationsHeaders = function() { return['Group | External Id', 'Campaign | External Id', 'Tracking Number','Caller ID', 'First Message', 'Last Message', 'Agent Name | Agent Email', 'Label']; };
        //export functionality started
         $scope.getCSVConversationData = function(formate) {
         var heading = "Export SMS Conversation";
         pinesNotifications.notify({
             title: heading,
             text: "Download is in process, it will be completed in few minutes",
             type: 'info'
         });
         $scope.conversationReportFileName = conversationReportName + "." + formate;
         progressLoader.start();
         var conversationExportData = {};
         var deferred = $q.defer();
         var exportDataParams = $scope.urlParams;
         exportDataParams.offset = 0;
         exportDataParams.limit = 50000;
         var response = ConversationWebService.getConversations($.param(exportDataParams));
         response.then(function(result) {
             if (result.data.json != 'error') {
                 conversationExportData = result.data.json;
                 var conversationData = [];
                 for (var i = 0; i < conversationExportData.conversation.length; i++) {
                     conversationData.push({
                         a: conversationExportData.conversation[i].org_unit_name +  " | " + (conversationExportData.conversation[i].org_unit_ext_id != null ? conversationExportData.conversation[i].org_unit_ext_id : " "),
                         b: conversationExportData.conversation[i].campaign_name +  " | " + (conversationExportData.conversation[i].campaign_ext_id != null ? conversationExportData.conversation[i].campaign_ext_id : " "),
                         c: conversationExportData.conversation[i].tracking,
                         d: conversationExportData.conversation[i].source,
                         e: conversationExportData.conversation[i].conversation_started,
                         f: conversationExportData.conversation[i].conversation_ended,
                         g: conversationExportData.conversation[i].agent_name +  " | " + conversationExportData.conversation[i].agent_email_id,
                         h: conversationExportData.conversation[i].label
                      });
                 }
                 progressLoader.set(50);
             deferred.resolve(conversationData);
             if ($rootScope.isSafari) {
                 deferred.resolve(JSONToCSVConvertor(conversationData, $scope.conversationReportFileName, true, formate));
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
     //export functionality ended


        $scope.applyConversationsFilter = function() {
            var noErrors = $scope.applyConversationsFilterParams();
            // Kill all event listeners on leave
            var importantListeners = ['$destroy', '$locationChangeStart', '$locationChangeSuccess'];
            for (var i in $rootScope.$$listeners) {
                if (importantListeners.indexOf(i) === -1) {
                    delete $rootScope.$$listeners[i];
                }
            }
            $scope.loadConversationReport();
        } ;

        $scope.applyConversationsFilterParams = function() {
            var urlParams = advFilSrvc.applyFilter($scope);
            if (urlParams) {
                $scope.extendConversationsUrlParams(urlParams);
                return true;
            }
            return false;
        };

        $scope.extendConversationsUrlParams = function(urlParams) {
            if (urlParams.vars.filtertype === 's') {
                $scope.simpleSearchFilter = urlParams.vars.filter;
            }
            $scope.urlParams = urlParams.vars;
            $scope.drp_start = moment($scope.urlParams.start_date, 'YYYY-MM-DD').format('MMMM DD, YYYY');
            $scope.drp_end = moment($scope.urlParams.end_date, 'YYYY-MM-DD').format('MMMM DD, YYYY');
            angular.extend($scope, urlParams.vars);
            delete urlParams.vars;
            angular.extend($scope, urlParams);
        };

         // Scope methods used when user uses filter that requires a new data-set from backend
         $scope.changeDateRange = function() {
            $scope.filterReset();
            $window.sessionStorage.report_start_date = $scope.drp_start;
            $window.sessionStorage.report_end_date = $scope.drp_end;
            $scope.offset = 0;
            $scope.pagination.current = 1;
            $scope.horsemanFlag = false;
            $scope.applyConversationsFilter();
        };

        $scope.filterReset = function() {
            $scope.advFilterDefinitions = [];
            $scope.showAdvFilter = false;
            $scope.simpleFilterText = '';
            $scope.filtertype = 's';
            $scope.filter = '';
            $scope.applyConversationsFilter();
            $scope.filterApplied = false;
        };

        $scope.pageChanged = function(newPage) {
            $scope.offset = ($scope.pageSize * ($scope.pagination.current - 1));
            $scope.applyConversationsFilter();
        };

        // Handle label change event from chat window
        $scope.$on("labelUpdate", function(event, UpdatedConversation) {
            $scope.conversations.forEach(function(conversation){
                 if(UpdatedConversation.conversation_id === conversation.conversation_id){
                    conversation.label = UpdatedConversation.label;
                 }  
            });
        });

        $scope.saveLabel = function(conversation) {
            if(($scope.oldLabel == null || $scope.oldLabel == '') && (conversation.label ==null || conversation.label == '')){
                var errorText = 'Failed while updating conversation label. Label text should not be empty.';
              $scope.showNotification(errorText,$rootScope.notificationType.ERROR);
            }else{
                if (conversation.conversation_id){
                    var obj = {
                        'conversation_id' : conversation.conversation_id,
                        'conversation_status' : conversation.conversation_status,
                        'label' : conversation.label
                    };
                    ConversationWebService.updateLabel(obj).then(function(result) {
                        if (result.data.status === 'success') {
                            $scope.isLabelEditing =  false;
                            $scope.applyConversationsFilter();
                            $scope.showNotification('Label updated successfully',$rootScope.notificationType.SUCCESS);
                            if($scope.conversationData.length > 0){
                                $scope.conversationData.forEach(function(item,idx){
                                    if(conversation.conversation_id == item.conver.conversation_id){
                                        $scope.conversationData[idx].conver.label=conversation.label;
                                        $scope.conversationData[idx].conver.labelUpdate=conversation.label;
                                      }
                                });
                            }
                        } else {
                            $scope.isLabelEditing =  false;
                            $scope.applyConversationsFilter();
                            var errorText = 'Failed while updating conversation label. ' + result.data.err;
                            $scope.showNotification(errorText,$rootScope.notificationType.ERROR);
                        }
                    });
                } else {
                    $scope.showNotification('Failed while updating conversation label.',$rootScope.notificationType.ERROR);
                }  
            }             
        };

        $scope.removeConversation = function(conversation){
            var mes = "Conversation will not be shown once archived. For retrieval you need to contact customer support. Do you still want to proceed?";
            $bootbox.confirm(mes, function (clickedOK) {
                if (clickedOK && conversation.conversation_id) {
                    var obj = {
                        'conversation_id' : conversation.conversation_id,
                        'conversation_status' : $rootScope.conversationStatus.DELETED
                    };
                    ConversationWebService.archiveConversation(obj).then(function(result) {
                        if (result.data.status === 'success') {
                            $scope.applyConversationsFilter();
                            $scope.showNotification('Conversation archived successfully.',$rootScope.notificationType.SUCCESS);
                            var index = _.findIndex($scope.conversationData, function (obj) { 
                                return obj.conver.conversation_id == conversation.conversation_id; 
                            });
                            $rootScope.$broadcast('closeChatArchive', {index: index});
                        } else {
                            var errorText = 'Failed while archiving your conversation. ' + result.data.err;
                            $scope.showNotification(errorText,$rootScope.notificationType.ERROR);
                        }
                    });
                }
            });
        };
        
        $scope.applyConversationsFilter();
    }
]);
