angular
  .module('users-builder', ['ngJsTree', 'ngResource', 'disableAll', 'angularUtils.directives.dirPagination','ui.bootstrap', "api-param", "xeditable", "theme.form-directives"])
  .directive('treeView', function($compile) {
           return {
             restrict : 'E',
             scope : {
               localNodes : '=model',
               localClick : '&click',
               reloadOn: '='
             },
             link : function (scope, tElement, tAttrs, transclude) {

               var maxLevels = (angular.isUndefined(tAttrs.maxlevels)) ? 10 : tAttrs.maxlevels;
               var hasCheckBox = (angular.isUndefined(tAttrs.checkbox)) ? false : true;
               scope.showItems = [];
               scope.$watch('reloadOn', function(newVal, oldVal) {
                 scope.showChild = {};
                 scope.showHide = function(ulId) {
                  var hideThis = document.getElementById(ulId);
                  var showHide = angular.element(hideThis).attr('class');
                  angular.element(hideThis).attr('class', (showHide === 'show' ? 'hide' : 'show'));
                  var showIfHide = showHide == 'show' ? true : false;
                  scope.showChild[ulId] = showIfHide;
                 };
                });
                scope.checkIfChildren = function(node) {
                    if (!angular.isUndefined(node.children)) {hasCheckBox = true; return true;}
                };

              function parentCheckChange(item) {
               for (var i in item.children) {
                 item.children[i].checked = item.checked;
                 if (item.children[i].children) {
                   parentCheckChange(item.children[i]);
                 }
               }
             }

            //  function childCheckChanged(item){
            //    if(item.parent){
            //      var groups = flatten(scope.localNodes);
            //      item1 = _.find(groups,{id:item.parent});
            //      item1.checked = true;
            //      scope.localNodes = _.union(scope.localNodes,item1);
            //    }
            //  }

               scope.showIcon = function(node) {
                 if (!angular.isUndefined(node.children)) return true;
               };

               scope.checkChange = function(node) {
                 var checkThis = document.getElementById(node.id);
                 var trueFalse = angular.element(checkThis).attr('class');
                 angular.element(checkThis).attr('class', (trueFalse === 'false' ? 'true' : 'false'));
                 if (node.children) {
                  parentCheckChange(node);
                }
                // else{
                //   childCheckChanged(node);
                // }
               };

               function renderTreeView(collection, level, max) {
                 var text = '';
                 text += '<li ng-repeat="n in ' + collection + ' track by $index" >';
                 text += '<span ng-show=showIcon(n) class="show-hide" style = "padding : 4px;" ng-click=showHide(n.name)><i ng-class="showChild[n.name] ? \'fa fa-plus-square\' : \'fa fa-minus-square\'"></i></span>';
                 text += '<span ng-show=!showIcon(n)></span>';
                 if (hasCheckBox) {
                    text += '<input class="tree-checkbox" ng-disabled="{{n.isDisabled}}" class="true-false" type=checkbox ng-model=n.checked ng-change=checkChange(n) ng-click = "localClick({node:n})">';
                  }
                 text += '<label id="{{n.id}}" class="{{n.checked}}" style = "margin : 0px;">{{n.tName}}</label>';

                 if (level < max) {
                   text += '<ul id="{{n.name}}" class="show" ng-if=checkIfChildren(n) style = "list-style: none;padding-left : 20px;">'+renderTreeView('n.children', level + 1, max)+'</ul></li>';
                 } else {
                   text += '</li>';
                 }

                 return text;
               }
               try {
                 var text = '<ul class="tree-view-wrapper" style = "height: 300px ;color: #4697ce; font-family: Maven Pro,Segoe UI,Droid Sans,Tahoma,Arial,sans-serif; font-weight: bold; font-size :13px; border: 1px solid #a9a9a9; overflow-y : auto; padding: 0px;">';
                 text += renderTreeView('localNodes', 1, maxLevels);
                 text += '</ul>';
                 tElement.html(text);
                 $compile(tElement.contents())(scope);
               }
               catch(err) {
                 tElement.html('<b>ERROR!!!</b> - ' + err);
                 $compile(tElement.contents())(scope);
               }
             }
           };
           })
.directive('reportList', function($compile) {
      return {
        restrict : 'E',
        scope : {
          reportNodes : '=reportmodel',
          reportClick : '&report'
        },
        link : function (scope, tElement, tAttrs, transclude) {

          var maxLevels = (angular.isUndefined(tAttrs.maxlevels)) ? 10 : tAttrs.maxlevels;
          var hasCheckBox = (angular.isUndefined(tAttrs.checkbox)) ? false : true;

          scope.checkReport = function(uId) {
            var checkThisReport = document.getElementById(uId);
            var trueFalse = angular.element(checkThisReport).attr('class');
            angular.element(checkThisReport).attr('class', (trueFalse === 'false' ? 'true' : 'false'));
          };

          function renderReportView(collection, level, max) {
            var text = '';
            text += '<li ng-repeat="r in ' + collection + ' track by $index" >';
            if (hasCheckBox) {
               text += '<input class="tree-checkbox" class="true-false" type=checkbox ng-model=r.report_checked ng-change=checkReport(r.report_id) ng-click = "reportClick({node:r})">';
             }
            text += '<label id="{{r.report_id}}" class="{{r.repotr_checked}}" style = "margin : 0px;">{{r.report_name}}</label>';

            if (level < max) {
              text += '<ul id="{{r.report_name}}" style = "padding-left : 20px;">'+renderReportView('r.children', level + 1, max)+'</ul></li>';
            } else {
              text += '</li>';
            }

            return text;
          }
          try {
            var text = '<ul class="tree-view-wrapper" style = "height: 300px ; font-family: Maven Pro,Segoe UI,Droid Sans,Tahoma,Arial,sans-serif; font-weight: bold; font-size :13px; border: 1px solid #a9a9a9; overflow-y : auto; padding: 0px;">';
            text += renderReportView('reportNodes', 1, maxLevels);
            text += '</ul>';
            tElement.html(text);
            $compile(tElement.contents())(scope);
          }
          catch(err) {
            tElement.html('<b>ERROR!!!</b> - ' + err);
            $compile(tElement.contents())(scope);
          }
        }
      };
      })
  .factory('UserWebService', function ($q, $timeout, $http, $window, $rootScope, ApiParam) {
      'use strict';
      var UserWebService = {};


      UserWebService.getRoles = function () {
          $http.defaults.useXDomain = true;
          return $http.get(ApiParam.baseURL() + '/v1/role', ApiParam.headerConfig());
      };


      UserWebService.getUsers = function (ouid) {
            //if user_status is deleted the web service return users with status active and inactive
            $http.defaults.useXDomain = true;
            return $http.get(ApiParam.baseURL() + "/v1/user?user_status=deleted&ct_user_ou_id=" + ouid, ApiParam.headerConfig());

        };

        UserWebService.checkPassword = function(cred) {
    			var req = {
    				method: 'POST',
    				url: ApiParam.baseURL() + "/oauth/token",
    				headers: { 'content-type': 'application/json' },
    				data: cred
    			};
    			return $http(req);
    		};

        UserWebService.getUser = function (id) {
            $http.defaults.useXDomain = true;
            return $http.get(ApiParam.baseURL() + "/v1/user/" + id, ApiParam.headerConfig());

        };

        UserWebService.createUser = function (nc) {
            return $http.post(ApiParam.baseURL() + '/v1/user', nc, ApiParam.headerConfig());
        };

        UserWebService.updateUser = function (nc) {

            var timeZones = [
                 {value: 'America/Halifax', text: 'Atlantic (AT)'},
                 {value: 'America/New_York', text: 'Eastern (ET)'},
                 {value: 'America/Chicago', text: 'Central (CT)'},
                 {value: 'America/Denver', text: 'Mountain (MT)'},
                 {value: 'America/Phoenix', text: 'Arizona (MT)'},
                 {value: 'America/Los_Angeles', text: 'Pacific (PT)'}
             ];

             $.each(timeZones, function (key, val) {
                 if (val.value == nc.timezone) {
                     nc.timezone = $scope.timeZones[key];
                 }
             });

            return $http.put(ApiParam.baseURL() + '/v1/user', nc, ApiParam.headerConfig());
        };

        UserWebService.unMaskData = function (data) {
            if (data) {
                return data.replace(/[^0-9]+/g, '');
            }
        };

        UserWebService.addUserToCampaigns = function(data) {
            return $http.put(ApiParam.baseURL() + '/v1/user/add_user_to_camapains', data, ApiParam.headerConfig());
        };

        UserWebService.getAllGroups = function (id) {
            $http.defaults.useXDomain = true;
            return $http.get(ApiParam.baseURL() + "/v1/userpermissions/oulist/ouid/"+id+"/topid/"+$rootScope.billingId+"/userOULevel/"+$rootScope.userOULevel+"/currentOULevel/"+$rootScope.currentOULevel, ApiParam.headerConfig());
        };

        UserWebService.getAllGroupsByUserID = function (id) {
            $http.defaults.useXDomain = true;
            return $http.get(ApiParam.baseURL() + "/v1/userpermissions/userid/"+id, ApiParam.headerConfig());
        };
        
        UserWebService.moveUser = function (data) {
            return $http.post(ApiParam.baseURL() + '/v1/userpermissions/moveuser', data, ApiParam.headerConfig());
        };
        UserWebService.getGroupByUserId = function (id, ouid, u_id) {
            $http.defaults.useXDomain = true;
            return $http.get(ApiParam.baseURL() + "/v1/userpermissions/userOulist/topouid/"+id+"/ouid/"+ouid+"/uid/"+u_id, ApiParam.headerConfig());

        };

        UserWebService.getAllReports = function (id) {
            $http.defaults.useXDomain = true;
            return $http.get(ApiParam.baseURL() + "/v1/userpermissions/reportslist/ouid/" + id, ApiParam.headerConfig());
        };

        // UserWebService.getReportByUserId = function (id) {
        //     $http.defaults.useXDomain = true;
        //     return $http.get(ApiParam.baseURL() + "/v1/userpermissions/reportslist/userid/" + id, ApiParam.headerConfig());
        // };

        UserWebService.saveUserPermissions = function (nc) {
            return $http.post(ApiParam.baseURL() + '/v1/userpermissions', nc, ApiParam.headerConfig());
        };
        UserWebService.notify = function (args) {
            PNotify.removeAll();
            var notification = new PNotify(args);
            notification.notify = notification.update;
            return notification;
        };

        return UserWebService;
    })
    .factory('SelectedUser', function () {
        'use strict';

        var data = {
            Id: ''
        };

        return {
            getId: function () {
                return data.Id;
            },
            setId: function (Id) {
                data.Id = Id;
            }
        };
    })
    .run(function (editableOptions) {
        editableOptions.theme = 'bs3';
    })
    .controller('UsersTableController',
    [ '$q','$scope', '$resource','$filter', 'UserWebService','OrgUnitWebService','SelectedUser','$uibModal', '$location', '$routeParams', '$rootScope','$timeout', '$interval', '$bootbox', 'pinesNotifications','paginationService',
        function ($q, $scope, $resource, $filter, UserWebService, OrgUnitWebService, SelectedUser, $uibModal, $location, $routeParams, $rootScope,$timeout, $interval, $bootbox, pinesNotifications,paginationService) {
			'use strict';
            $scope.isScoreCallAccess = false;
            if ($scope.userAccess && $scope.userAccess.manualscorecard) {
                $scope.isScoreCallAccess = true;
			}
            var ouid = $rootScope.currentOUId;
            var billing_id = $rootScope.billingId;
            var billig_name = $rootScope.highestOUName;
            $scope.isReadonly = false;
            $scope.addUserInProcess = false;
            $scope.currentPage = 1;
            $scope.pageSize = 100;
            $scope.locNewRow = 0;
            $scope.subgroups   =[];
            if ($scope.userAccess && $scope.userAccess.user < 7) {
                $scope.isReadonly = true;
            }
            $scope.users          = [];
            $scope.realUsers      = [];
            $scope.arrRequired    = [];
            $scope.arrInvalid     = [];
            $scope.specificErrors = [];
            $scope.score_subscription = false;
            $scope.update = 0;
            $scope.actionHeader   = ['Actions'];
            $scope.groupUserTruncHeaders   = [];
            $scope.groupUserHeaders   = ['First Name', 'Last Name', 'Email', 'External Id', 'Agent Ring-to', 'Agent ID', 'Role', 'Status'];
            $scope.isShowChangePwd = false;
            $scope.isAdmin = false;
            $scope.currentDateTime = new Date();
            if( parseInt($rootScope.roleId) === 1){
                $scope.isShowChangePwd = true;
                $scope.isAdmin = true;
            }
            $scope.isDeleteClicked = false;
            $scope.score_calls = true;
            $scope.access_audio = false;
            $scope.selectAddUser = [];
            $scope.selectRemoveUser = [];
            $scope.usersReports = [];
            $scope.groupList = [];
            $scope.modelView = false;
            $scope.fetchingUserPermissions = false;
            var userReport = [];
            var reportInfo = [];
            $rootScope.groupInfo = [];
            var curretUserId;
            var userGroup = [];
            var ouList = [];
            var reportList = [];
            var tmp = [];
            var userGroupInfo = [];
            var userReportInfo = [];
            $scope.isUserPanelOpen=true;
            $scope.savingUserPermissions = false;

             $scope.nest = function(array) {
             var nested = [];
              for (var i = 0; i < array.length; i++) {
                var parent = array[i].parent;
                if (!parent) {
                  nested.push(array[i]);
                } else {
                  for (var j = 0; j < array.length; j++) {
                    if (array[j].id === parent) {
                      array[j].children = array[j].children || [];
                      array[j].children.push(array[i]);
                    }
                  }
                }
              }
              return nested;
            };

            UserWebService.getAllReports(ouid).then(function (result) {
              if (result.data.result == 'success') {
                reportInfo = result.data.json;
              }
            });

            UserWebService.getAllGroups(ouid).then(function (result) {
                if (result.data.result == 'success') {
                    $rootScope.groupInfo =result.data.json;
                }
            });

            $scope.getUser = function(id,role){
              	if(role === 3 || role === 8){
        					$scope.scoreCallPermission = true;
        				}else{
        					$scope.scoreCallPermission = false;
        				}

                $scope.update = 1;
                curretUserId = id;
                var userRole = parseInt(role);
                $scope.groupList = [];
                $scope.accessReportData = [];
                var allGroup = angular.copy($rootScope.groupInfo);
                var allReport = angular.copy(reportInfo);
				  $scope.fetchingUserPermissions = true;
          UserWebService.getGroupByUserId(billing_id, ouid, curretUserId).then(function (result) {
            console.log("Just got group list");
            if (result.data.result == 'success') {
              if(role !== 1){
                $scope.score_calls = result.data.json.length === 0 ? false :result.data.json.score_call;
              }else{
                $scope.score_calls = result.data.json.length === 0 ? true :result.data.json.score_call;
              }

              if(!$scope.isScoreCallAccess){
                $scope.score_calls = false;
              }
              $scope.access_audio = result.data.json.length === 0 ? true : result.data.json.access_audio;
              $scope.ct_user_ou_id = result.data.json.ct_user_ou_id;
              $scope.groupsList = result.data.json.group_list;
              reportList = result.data.json.length === 0 ? [] : result.data.json.reports_list;
              if($rootScope.userAccess.ca === undefined){
                var accessReport = [];
                allReport = angular.copy(reportInfo);
                var allReportIds = _.pluck(allReport,'report_id');
                _.map(allReportIds,function(reportId){
                  var reports = _.find(allReport,{report_id:parseInt(reportId)});
                  var tmp = [];
                  if(reports !== undefined){
                          if(reports.report_id != '1128' && reports.report_id != '1135'){
                            tmp.push({'report_id': reports.report_id, 'report_name': reports.report_name,'report_checked':false});
                            accessReport = _.union(accessReport,tmp);
                        }
                      }
                  });
                allReport = accessReport;
                allReport = _.uniq(allReport,function(key){ return key.report_id;});
              }
              var accessReports = [];
              _.map(reportList,function(reportId){
              var reports = _.find(allReport,{report_id:parseInt(reportId)});
              var tmp = [];
              if(reports !== undefined){
                  tmp.push({'report_id': reports.report_id, 'report_name': reports.report_name,'report_checked':true});
                  accessReports = _.union(accessReports,tmp);
              }
              });
              $scope.accessReportData = [];
              accessReports = _.union(accessReports,allReport);
              allReport = accessReports;
              allReport = _.uniq(allReport,function(key){ return key.report_id;});
              allReport = _.sortBy(allReport, 'report_name');
              $scope.accessReportData = allReport;
              $scope.fetchingUserPermissions = false;
            }
				  });

          $scope.selectChange = function(firstIndex,secondIndex,thirdIndex,selected,level){
            var group = $scope.groupsList;

            if (selected) {
              if (level > 1 && firstIndex !== null) {
                group[firstIndex].selected = true;

                if (level > 2  && secondIndex !== null) {
                  group[firstIndex].ous[secondIndex].selected = true;
                }
              }
            }

            switch(level){
              case 1:
                angular.forEach(group[firstIndex].ous,function(ou){
                    if(!ou.hidden && !ou.disabled){
                        ou.selected = selected;
                    }                  
                });
              break;
              case 2:
                if (group[firstIndex].ous[secondIndex].ous !== undefined && group[firstIndex].ous[secondIndex].ous !== null) {
                  angular.forEach(group[firstIndex].ous[secondIndex].ous,function(ou){
                    if(!ou.hidden && !ou.disabled){
                        ou.selected = selected;
                    } 
                  });
                }
              break;
            }
          };
                $scope.addSelectedGroup = function(node){
                  if(node.checked === true){
                    if(node.children){
                       var ousid = _.pluck(node.children,'id');
                       ouList = _.union(ouList,ousid);
                       _.each(node.children,function(ou){
                         if(ou.children){
                           var ouid = _.pluck(ou.children,'id');
                           ouList = _.union(ouList,ouid);
                         }
                       });
                    }else{
                      $timeout( function(){
                        $scope.update = 0;
                        var group = _.find(allGroup,{id:parseInt(node.parent)});
                        group.checked = true;
                        ouList.push(parseInt(group.id));
                        var parent = _.find(allGroup,{id:parseInt(group.parent)});
                        parent.checked = true;
                        ouList.push(parseInt(parent.id));
                        $scope.$apply();
                      }, 100);
                    }
                    ouList.push(parseInt(node.id));
                  }else{
                    if(node.children){
                       var ous = _.pluck(node.children,'id');
                       _.each(ous,function(ou){
                         ouList = _.without(ouList,ou);
                       });
                       _.each(node.children,function(ou){
                         if(ou.children){
                           var ousids = _.pluck(ou.children,'id');
                           _.each(ousids,function(ou){
                             ouList = _.without(ouList,ou);
                           });
                         }
                       });
                    }
                    ouList = _.without(ouList,parseInt(node.id));
                  }
                };
                $scope.addSelectedReport =  function(node){
                    if(node.report_checked === true){
                      reportList.push(parseInt(node.report_id));
                    }else{
                      reportList = _.without(reportList,parseInt(node.report_id));
                    }
                };

                 $scope.cancle = function(){
                   $scope.groupList = [];
                   $scope.accessReportData = [];
                   $scope.usersReports = [];
                   reportList = [];
                   ouList = [];
                   $scope.score_call = true;
                   $scope.access_audio = true;
                   $scope.accessAudioValue = false; 

                   $timeout( function(){
                     $scope.update = 0;
                     $scope.$apply();
                   }, 100);
				 };



				//  =================================== Access Audio and Score call Button COde
				$scope.disableScoreCallButton = function(){
					$scope.accessAudioValue = false; 

					if (!$scope.access_audio){
						$scope.accessAudioValue = true; 
						$scope.score_calls = false;
					}
				};




				
               $scope.saveUserPermissions =function(){
                $scope.savingUserPermissions = true;
                 ouList = $scope.groupsList;
                 reportList = _.uniq(reportList);
                 $timeout( function(){
                   $scope.update = 0;
                   $scope.$apply();
                 }, 100);
                 var userData = {
                   user_id:curretUserId,
                   ou_list:ouList,
                   report_list:reportList,
                   score_call:$scope.score_calls,
                   access_audio:$scope.access_audio
                  };
                 UserWebService.saveUserPermissions(userData).then(function (result) {
                     if (result.data.result === 'success') {
                       $scope.groupList = [];
                       reportList = [];
                       ouList = [];
                       $scope.score_call = true;
                       $scope.access_audio = true;
                         pinesNotifications.notify({
                             title: "Users",
                             text:  result.data.json,
                             type:  "success"
                         });
                     }
                     else {
                         pinesNotifications.notify({
                             title: "Users",
                             text:  result.data.err,
                             type:  "error"
                         });
                     }
                     $scope.savingUserPermissions = false;
                   });
                 };
        };
            var createErrObject = function(passed, msg) {
                return {
                    passed: passed,
                    msg:    msg
                };
            };
            // will work on numbers after being passed to UserWebService.unMaskData
            var phoneValidators = {};
            phoneValidators.length = function(phoneNum) {
                return createErrObject(
                    phoneNum.length !== 10,
                    "Phone Number must be 10 digit number"
                );
            };

            // cant be a single repetitive
            phoneValidators.repetitive = function(phoneNum) {
                console.log(_.uniq(phoneNum.split("")));
                return createErrObject(
                    (_.uniq(phoneNum.split("")).length === 1 && _.uniq(phoneNum.split(""))[0] === "0"),
                    "Phone number can't be a repeating number"
                );
            };
            phoneValidators.movie = function(phoneNum) {
                return createErrObject(
                    phoneNum.substring(3, 6) === "555",
                    "Phone Number with 555 is reserved for movies"
                );
            };
            phoneValidators.tollFree = function(phoneNum) {
                return createErrObject(
                    phoneNum.substring(0,3) === "800",
                    "Phone Number can't be a toll free number"
                );
            };

            phoneValidators.startWithZero = function(phoneNum) {
                return createErrObject(
                    phoneNum[0] === "0",
                    "Phone Number can't be a start with zero"
                );
            };

            if (!$routeParams.add) {
                UserWebService.getUsers(ouid).then(function (result) {
                    if (result.data.status == 'success') {
                        $.each(result.data.json, function (key, val) {
                            $scope.users.push(
                                {
                                    id: val.ct_user_id,
                                    fname: val.first_name,
                                    lname: val.last_name,
                                    email: val.username,
                                    user_ext_id: val.user_ext_id,
                                    phonenumber: val.primary_phone,
                                    role: val.role_id,
                                    group: val.ct_user_ou_id,
                                    status: val.user_status,
                                    agent_ring_to: val.agent_ring_to,
                                    agent_code: val.agent_code,
                                    list_ids: val.list_ids,
                                    role_name: val.role_name,
                                    org_phone_no: val.phone_number,
                                    org_unit_name: val.org_unit_name,
                                    org_unit_ext_id: val.org_unit_ext_id,
                                    assigned_calls: val.assigned_calls
                                });
                            $scope.realUsers.push(
                                {
                                    id: val.ct_user_id,
                                    fname: val.first_name,
                                    lname: val.last_name,
                                    email: val.username,
                                    user_ext_id: val.user_ext_id,
                                    phonenumber: val.primary_phone,
                                    role: val.role_id,
                                    group: val.ct_user_ou_id,
                                    status: val.user_status,
                                    agent_ring_to: val.agent_ring_to,
                                    agent_code: val.agent_code
                        });
                        });
                        $scope.totalUsersRows=$scope.users.length;
                        $(".userProgressLoader").hide();
                        $("#userProgressLoader").css("opacity","1");
                        $(".table>tbody>tr>td").css("border-top","1px solid #e9ecf0");
                    }
                    else {
                        $scope.error = result;
                    }
                });
            }

            // return $http.post('/saveUser', data);

            UserWebService.getRoles()
                .success(function (result) {
                    $scope.roles = result.json;
                    for (var i = 0; i < $scope.roles.length; i++) {
                      if($scope.roles[i].id === 8 ){
                        if($scope.userAccess && ($scope.userAccess.manualscorecard === undefined || $scope.userAccess.manualscorecard < 4)){
                          $scope.roles.splice(_.findLastIndex($scope.roles, { id: 8 }), 1);
                        }
                      }
                      // if ($scope.roles[i].id !== 8) {
                      //     $scope.roles[i].disabled = false;
                      // }else if($scope.roles[i].id === 8 && $scope.userAccess && ($scope.userAccess.manualscorecard !== undefined && $scope.userAccess.manualscorecard > 4)){
                      //   $scope.roles[i].disabled = false;
                      // }else{
                      //   $scope.roles[i].disabled = true;
                      // }
                    }

                    
                    $scope.roles.unshift({
                        text: "--Select--",
                        id:   0
                    });
                })
                .error(function (res) {
                    console.log(res);
                    console.log('error in getting roles in user.js');
                });

            //pass correct id's back to post and put user methods

            $scope.statuses = [];
            $scope.statuses1 = [
                {id: 1, text: 'Active'},
            ];
            $scope.statuses2 = [
                {id: 1, text: 'Active'},
                {id: 2, text: 'Inactive'}
            ];

            $scope.campaigns = [
                {value: true, text: 'Yes'},
                {value: false, text: 'No'}
            ];

            $scope.showRoles = function (user) {
                if ($scope.roles && user.role) {
                    if ($scope.roles.length) {
                        var selected = $filter('filter')($scope.roles, {id: user.role});
                        return selected.length ? selected[0].text : 'Not set';
                    } else {
                        return user.role || 'Not set';
                    }
                }
            };

            $scope.showStatuses = function (user) {
                if(user.id === undefined) {
                    $scope.statuses = $scope.statuses1;
                } else {
                    $scope.statuses = $scope.statuses2;
                }
                if (user.status && $scope.statuses.length) {
                    var f = (user.status).charAt(0).toUpperCase();
                    user.status = f + (user.status).substr(1);
                    var selected = $filter('filter')($scope.statuses, {text: user.status});
                    return selected.length ? selected[0].text : 'Not set';
                } else {
                    return user.status || 'Not set';
                }
            };

            $scope.cancelAdd = function (index, id, rowform) {
                if (!id) {
                    var currentPage = paginationService.getCurrentPage('pg-users');
                    if(currentPage > 1) {
                        index = ((currentPage - 1) * 100) + index;
                    }
                    $scope.users.splice(index, 1);
                    $scope.locNewRow = 0;
                } else {
                    var unsaved = $scope.realUsers[index];
                    $scope.users[index] = unsaved;
                    rowform.$cancel();
                    $scope.locNewRow = 0;
                }
            };

            $scope.showCampaigns = function (user) {
                var selected = [];
                if (user.add_to_campaigns) {
                    selected = $filter('filter')($scope.campaigns, {value: user.add_to_campaigns});
                }
                return selected.length ? selected[0].text : 'No';
            };

            //validate blank data before save.
            $scope.validateData = function (data, name, id) {
                var NAME_REGEXP = /^[a-zA-Z0-9_ -]+$/;
                var NUMBER_REGEXP = /^[0-9-() ]{10}$/;
                var EMAIL_REGEXP = /^[-._a-zA-Z0-9]+(\.[_a-zA-Z0-9]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,9})$/;
                var Agent_Id_REGEXP = /^[0-9]{1,9}$/;
                var ring_to_no;
                var messageText;
                if (!data && name != 'Agent ring-to' && name != 'Agent ID') {
                    $scope.arrInvalid.push(name);
                    if (name != 'Role') {
                        return '   ';
                    }
                }

                if (name === "Status") {

                    // Only a newly added user being edited has an undefined id
                    if (id === undefined && data === "Inactive") {
                        $scope.arrInvalid.push(name + " (can't have Inactive new user)");
                        // Im only putting this return empty string here to conform to the other nonsensical returns below...
                        // since I easily give in to peer pressure.
                        return "";
                    }

                }

                if (name == 'Email') {
                    if (!EMAIL_REGEXP.test(data)) {
                        $scope.arrInvalid.push(name);
                        return '   ';
                    }
                }
        				var RING_REGEXP = /^[0-9]{10}$/;

                if(data)
        				  ring_to_no = UserWebService.unMaskData(data.toString());

        				if (name == 'Agent ring-to' && ring_to_no) {
        					if (!RING_REGEXP.test(ring_to_no)) {
        						$scope.arrInvalid.push(name);
        						return '   ';
        					}
                        }
                        if (name == 'Agent ID') { 
                            if(data){
                                if ( !Agent_Id_REGEXP.test(data)) {
                                    UserWebService.notify({
                                        title: 'Users Details',
                                        text: 'Agent ID should be up to 9 digit',
                                        type: 'error'
                                    });
                                    return '   ';
                                }
                            }
                        }
                if (name == 'First Name') {
                    if (!NAME_REGEXP.test(data)) {
                        $scope.arrInvalid.push(name);
                        return '   ';
                    }
                }

                if (name == 'Last Name') {
                    if (!NAME_REGEXP.test(data)) {
                        $scope.arrInvalid.push(name);
                        return '   ';
                    }
                }

                if (name == 'Role') {
                    if ($scope.arrRequired.length) {
                        messageText = 'field is required.';
                        if ($scope.arrRequired.length > 1) {
                            messageText = 'fields are required.';
                        }
                        $scope.isRequestSent = false;
                        UserWebService.notify({
                            title: 'Users Details',
                            text: '\'' + $scope.arrRequired.join(', ') + '\' ' + messageText,
                            type: 'error'
                        });
                        var roleExist = $scope.arrRequired.indexOf("Role");
                        $scope.arrInvalid = [];
                        $scope.arrRequired = [];
                        $scope.specificErrors = [];
                        if (roleExist > -1) {
                            return '   ';
                        }
                        else {
                            return '';
                        }
                    }

                    if ($scope.arrInvalid.length) {
                        messageText = 'field is invalid.';
                        if ($scope.arrInvalid.length > 1) {
                            messageText = 'fields are invalid.';
                        }
                        if($scope.arrInvalid.indexOf('Phone') > -1){
                            var index = $scope.arrInvalid.indexOf("Phone");
                            $scope.arrInvalid.splice(index,1);
                        }
                        if ($scope.arrInvalid.length) {
                        UserWebService.notify({
                            title: 'Users Details',
                            text: '\'' + $scope.arrInvalid.join(', ') + '\' ' + messageText,
                            type: 'error'
                        });
                        }
                        //var res = $scope.specificErrors.join(', ');
                        $scope.isRequestSent = false;
                        if ($scope.specificErrors.length) {
                            UserWebService.notify({
                                title: 'Users Details',
                                text: '\'' + $scope.specificErrors.join(', ') + '\'',
                                type: 'error'
                            });
                        }


                        $scope.arrRequired = [];
                        $scope.arrInvalid = [];
                        $scope.specificErrors = [];
                        return '';
                    }
                }
            };

            $scope.validatePhoneData = function (data, id) {
                if (UserWebService.unMaskData(data)) {
                    var phoneNumDigits = UserWebService.unMaskData(data);

                    var phoneErrorList = [];
                    _.each(phoneValidators, function (validator) {
                        var errObj = validator(phoneNumDigits);
                        if (errObj.passed) {
                            phoneErrorList.push(errObj.msg);
                        }
                    });
                    $scope.specificErrors = $scope.specificErrors.concat(phoneErrorList);
                    if($scope.specificErrors.length > 0) {
                        $scope.arrInvalid.push("Phone");
                        return '   ';
                    }
                }
            };

            $scope.isRequestSent = false;

            $scope.showModal = function(size,userData){
                var modalInstance = $uibModal.open({
                  templateUrl: 'assets/partials/changePassword.html',
                  controller: 'changePasswordModal',
                  size:        size,
                    backdrop : 'static',
                    keyboard : false
                  });
                modalInstance.data = userData;
                /*console.log("userDataUpdate---",userData);
                $scope.userDataUpdate = userData;*/
            };

            $scope.moveUser = function(userData){
                UserWebService.getAllGroupsByUserID($rootScope.userId).then(function (result) {
                    if(result.data.err == null && result.data.json.length > 0){
                        result.data.json = result.data.json.filter(function( group ) {
                            return group.org_unit_id !== userData.group;
                        });
                        var modalInstance = $uibModal.open({
                            templateUrl: 'assets/partials/moveUser.html',
                            controller: 'moveUserController',
                            size:        'lg',
                              backdrop : 'static',
                              keyboard : false
                            });
                            var data = {
                                userData : userData,
                                groupsList : result.data.json
                            };
                          modalInstance.data = data;
                    }else{
                        UserWebService.notify({
                            title: 'Move User',
                            text: 'Please Provide Vaild User Id',
                            type: 'error'
                        });
                    }
                });
            };

            $scope.saveUser = function (data, id, rowform) {
                //var indexToRemove = _.findIndex($scope.users, function (u) { return u.id === id; });

                var saveData = {
                    "user": {
                        "ct_user_ou_id":    $rootScope.currentOUId,
                        "role_id":          data.role,
                        "user_status":      data.status,
                        "first_name":       data.fname,
                        "last_name":        data.lname,
                        "username":         data.email,
                        "user_ext_id":      data.user_ext_id,
                        "primary_phone":    UserWebService.unMaskData(data.phone),
                        "agent_code":  data.agentcode,
                        "agent_ring_to": UserWebService.unMaskData(data.agentringto)
                    }
                };
                //console.log(id);
                if (id) { //edit existing user
                    saveData.user.ct_user_id = id;
                    $scope.isReadonly = true;

                    var index = _.findLastIndex($scope.realUsers, { id: id });

                    if(data.status === 'Inactive' && $scope.realUsers[index].status === 'active' && parseInt($scope.users[index].assigned_calls) > 0){
                      var message = 'This user is assigned to call/calls. ';
                      message += "Are you sure you want to proceed? Type 'yes' to proceed?";
                      $bootbox.prompt(message, function (userResponse) {
                        userResponse = (userResponse === null) ? "" : userResponse;
                        if (userResponse.toLowerCase() != "yes") {
                            pinesNotifications.notify({
                              title:"Update User",
                              text :"User didn't respond 'yes', so no User was updated.",
                              type :"info"
                            });
                            return;
                        }else{
                          UserWebService.updateUser(saveData).then(function (result) {
                              $scope.isReadonly = false;
                              $scope.isRequestSent = false;
                              $scope.realUsers[index].status = data.status.toLowerCase();
                               $scope.addUserInProcess = false;
                              if (result.data.status === 'success') {
                                  //angular.extend(data, {id: id});
                                  var updatedUser = _.find($scope.users, function (u) { return u.email === saveData.user.username; });
                                  //updatedUser.list_ids = result.data.json[3].list_ids;
                                  var msg = "User "+ data.fname +" "+ data.lname +" successfully updated.";
                                  pinesNotifications.notify({
                                      title: "Users",
                                      text:  msg,
                                      type:  "success"
                                  });
                              }
                              else {
                                  $scope.error = result;
                                  pinesNotifications.notify({
                                      title: "Users",
                                      text:  result.data.err,
                                      type:  "error"
                                  });
                                  setTimeout(function () {
                                      rowform.$show();
                                  }, 100);
                              }
                          });
                        }  
                      });

                    }else{
                      UserWebService.updateUser(saveData).then(function (result) {
                          $scope.isReadonly = false;
                          $scope.isRequestSent = false;
                           $scope.addUserInProcess = false;
                           $scope.realUsers[index].status = data.status.toLowerCase();
                          if (result.data.status === 'success') {
                              //angular.extend(data, {id: id});
                              var updatedUser = _.find($scope.users, function (u) { return u.email === saveData.user.username; });
                              //updatedUser.list_ids = result.data.json[3].list_ids;
                              var msg = "User "+ data.fname +" "+ data.lname +" successfully updated.";
                              pinesNotifications.notify({
                                  title: "Users",
                                  text:  msg,
                                  type:  "success"
                              });
                          }
                          else {
                              $scope.error = result;
                              pinesNotifications.notify({
                                  title: "Users",
                                  text:  result.data.err,
                                  type:  "error"
                              });
                              setTimeout(function () {
                                  rowform.$show();
                              }, 100);
                          }
                      });
                    }
                    
                }else { //new user
                    saveData.user.timezone = $rootScope.timezone;
                    saveData.user.domain = location.host;
                    $scope.isReadonly = true;
                   
                    UserWebService.createUser(saveData).then(function (result) {
                        $scope.isRequestSent = false;
                         $scope.addUserInProcess = false;
                        $scope.isReadonly = false;
                        if (result.data.result === 'success') {
                            // angular.extend(data, {id: result.data.json.insertId});
                            // for (var x in $scope.users) {
                            //    if ($scope.users[x].email == saveData.user.username) {
                            //        $scope.users[x].id = result.data.json.insertId;
                            //    }
                            
                            // }
	                        var newlyCreatedUser = _.find($scope.users, function (u) { return u.email === saveData.user.username; });
	                        newlyCreatedUser.id = result.data.json.insertId;
                            newlyCreatedUser.list_ids = result.data.json.list_ids;

                            var msg = "User "+ data.fname +" "+ data.lname +" successfully created.";
                            $scope.realUsers.push({
                                id: newlyCreatedUser.id,
                                fname: saveData.user.first_name,
                                lname: saveData.user.last_name,
                                email: saveData.user.username,
                                user_ext_id: saveData.user.user_ext_id,
                                phonenumber: saveData.user.primary_phone,
                                role: saveData.user.role_id,
                                group: saveData.user.ct_user_ou_id,
                                status: saveData.user.user_status,
                                agent_ring_to: saveData.user.agent_ring_to,
                                agent_code: saveData.user.agent_code
                            });
                            pinesNotifications.notify({
                                title: "Users",
                                text:  msg,
                                type:  "success"
                            });
                            $scope.totalUsersRows=$scope.realUsers.length;
                        }
                        else {
                            $scope.error = result;
                            pinesNotifications.notify({
                                title: "Users",
                                text:  JSON.stringify(result.data.err),
                                type:  "error"
                            });
                             setTimeout(function () {
                                rowform.$show();
                            }, 100);
                        }
                    });
                }

                // return $http.post('/saveUser', data);
            };



            // remove user
            $scope.removeUser = function (id) {

	            var indexToRemove = _.findIndex($scope.users, function (u) { return u.id === id; });
                if (!angular.isDefined(id)) {
                    pinesNotifications.notify({
                        title: "Delete User",
                        text:  "User was saved incorrectly and therefore can't be deleted.",
                        type:  "error"
                    });
                    return;
                }

                var saveData = {
                    "user": {
                        "ct_user_ou_id": $rootScope.currentOUId,
                        "ct_user_id":    id,
                        "user_status":   'deleted',
	                    "username":      $scope.users[indexToRemove].email
                    }
                };


                if (parseInt(id) !== parseInt($rootScope.userId)) {
                    var message = '';
                    message += ($scope.users[indexToRemove].list_ids !== "" ? 'This user is assigned to distribution list. ' : '');

                    if(message.length > 0 && parseInt($scope.users[indexToRemove].assigned_calls) > 0){
                      message = 'This user is assigned to distribution list and call/calls. ';
                    }else if(message.length === 0 && parseInt($scope.users[indexToRemove].assigned_calls) > 0) {
                      message = 'This user is assigned to call/calls. ';
                    }
                    message += "Deleting this User will also delete all scheduled Reports by this user. Are you sure you want to proceed? Type 'yes' to proceed?";
                    $bootbox.prompt(message, function (userResponse) {

                        userResponse = (userResponse === null) ? "" : userResponse;
                        if (userResponse.toLowerCase() != "yes") {
          								pinesNotifications.notify({
          									title:"Delete User",
          									text :"User didn't respond 'yes', so no User was deleted.",
          									type :"info"
          								});
          								return;
          							}else{
                          if (userResponse.toLowerCase() === "yes") {
                              $scope.isDeleteClicked = false;
                              UserWebService.updateUser(saveData).then(function (result) {
                                  if (result.data.status === 'success') {
                                      pinesNotifications.notify({
                                          title: "Delete User",
                                          text:  [
  	                                        $scope.users[indexToRemove].fname,
  	                                        $scope.users[indexToRemove].lname,
  	                                        "has been removed."
                                          ].join(" "),
                                          type:  "success"
                                      });
                                      $scope.users.splice(indexToRemove, 1);
                                      $scope.totalUsersRows=$scope.users.length;
                                  }
                                  else {
                                      pinesNotifications.notify({
                                          title: "Delete User",
                                          text:  JSON.stringify(result.data.err),// "Failed to delete user.",
                                          type:  "error"
                                      });
                                      $scope.error = result;
                                  }
                                  $scope.isDeleteClicked = true;
                              });
                          }
                        }
                    });
                } else {
                    pinesNotifications.notify({
                        title: "Delete User",
                        text:  "Cannot delete logged in user.",
                        type:  "error"
                    });
                }
            };

            // add user
            $scope.addUser = function () {
                $scope.addUserInProcess = true;
                // check last inserted value. if it doesn't have an email key or
                // fname property, then the last added user hasn't been saved yet
                if ($scope.users.length) {
                    var lastAddedUser;
                    if($scope.locNewRow > 0) {
                        lastAddedUser = $scope.users[$scope.locNewRow];
                    } else {
                        lastAddedUser = $scope.users[$scope.users.length - 1];
                    }
                    if (!lastAddedUser.email || !lastAddedUser.fname) {
                        pinesNotifications.notify({
                            title: "Users",
                            text:  "Save currently added user before adding another.",
                            type:  "info"
                        });
                        return;
                    }
                }

                $scope.inserted = {
                    name: '',
                    status: "Active",
                    add_to_campaigns: true,
                    group: null,
                    role: 0
                };
                if($scope.users.length > 99) {
                    var currentPage = paginationService.getCurrentPage('pg-users');
                    $scope.locNewRow = (currentPage * 100) - 1;
                    if($scope.users.length <= $scope.locNewRow) {
                        $scope.locNewRow = $scope.users.length;
                    }
                    $scope.users.splice($scope.locNewRow, 0, $scope.inserted);
                } else {
                $scope.users.push($scope.inserted);
                }
            };

            $scope.cancelClicked = function ($index) {
                if ($rootScope.env === 'development') {
                    console.log("in user table controller, user row form cancel button clicked");
                }
                // when clicking the cancel button on a row of the user table, delete the user from the user array only if the user hasn't been saved.
                // check if the user at $index has id, if it has id, it means it has been saved.
                if (!angular.isDefined($scope.users[$index].id)) {
                    $scope.users.splice($index, 1);
                    if ($rootScope.env === 'development') {
                        console.log("user row deleted because it hasn't been saved to the database yet");
                    }
                    return;
                }
                var r = confirm("Do you really want to canel (it would delete the row from the table) ?");
                if (r === true) {
                    $scope.users.splice($index, 1);
                }

            };


           OrgUnitWebService.getChildrenOUs($rootScope.currentOUId)
            .success(function (result) {
                for (var x in result.json) {
                    $scope.subgroups.push(result.json[x]);
                }
            })
            .error(function (err) {
                console.log('err fetching children');
                console.log(err);
            });
            function finalizaDataToExport(rawData) {
                var rowsOfData = [];
                _.each(rawData, function(row) {

                    rowsOfData.push({
                        "Account Name": $rootScope.highestOUName,
                        "Account OUID": $rootScope.billingId,
                        "Group Name": row.org_unit_name,
                        "Group OUID": row.ct_user_ou_id,
                        "Group External ID": row.org_unit_ext_id,
                        "Group Phone": row.org_phone_no,
                        "User First Name": row.fname,
                        "User Last Name": row.lname,
                        "User Email": row.email,
                        "User Role": row.role_name,
                        "User ID": row.id,
                        "User (Agent) ID": row.agent_code,
                        "User Phone": row.phonenumber
                    });
                });
                return rowsOfData;
            }

            $scope.getUserCSVData = function(formate) {
                var rowsOfData = [];
                var deferred = $q.defer();

                $scope.userHeaderNames = ["Account Name", "Account OUID", "Group Name", "Group OUID", "Group External ID", "Group Phone", "User First Name", "User Last Name", "User Email", "User Role", "User ID", "User (Agent) ID", "User Phone"];
                rowsOfData = finalizaDataToExport($scope.users);
                deferred.resolve(rowsOfData);

                if($rootScope.isSafari){
                    var reportName =  $rootScope.currentOUName + 'Users csv';
                    if(formate === 'tsv'){ reportName = $rootScope.currentOUName + 'Users tsv';}
                    deferred.resolve(JSONToCSVConvertor(rowsOfData,reportName,true,formate));
                  }
                if(!$rootScope.isSafari){
                    return deferred.promise;
                }
            };

            $(window).scroll(function() {
              var yoda = window.pageYOffset;
              var scroll_position = 2000;

              if(yoda > scroll_position) {
                $(window).trigger('resize');
              }
            });


            $(window).scroll(function() {
              var vader = window.pageYOffset;
              var scroll_position = 6000;

              if(vader > scroll_position) {
                $('button').css({height: "34px"});
              } else {
                $('button').css({height: "34px"});
              }
            });

            angular.element(document).ready(function () {
              setTimeout(function() {
                $(window).trigger('resize');
              }, 2500);
            });

            angular.element(document).ready(function () {
              setTimeout(function() {
                $(window).trigger('resize');
              }, 5000);
            });

        }])
    .filter('tel', function () {
        return function (tel) {
            if (!tel) {
                return '';
            }

            var value = tel.toString().trim().replace(/^\+/, '');

            if (value.match(/[^0-9]/)) {
                return tel;
            }

            var country, city, number;

            switch (value.length) {
                case 10: // +1PPP####### -> C (PPP) ###-####
                    country = 1;
                    city = value.slice(0, 3);
                    number = value.slice(3);
                    break;

                case 11: // +CPPP####### -> CCC (PP) ###-####
                    country = value[0];
                    city = value.slice(1, 4);
                    number = value.slice(4);
                    break;

                case 12: // +CCCPP####### -> CCC (PP) ###-####
                    country = value.slice(0, 3);
                    city = value.slice(3, 5);
                    number = value.slice(5);
                    break;

                default:
                    return tel;
            }

            if (country == 1) {
                country = "";
            }

            number = number.slice(0, 3) + '-' + number.slice(3);

            return (country + " (" + city + ") " + number).trim();
        };
    })


    .controller('UserFormController', ['$scope', '$http', '$location', 'UserWebService', 'SelectedUser', function ($scope, $http, $location, UserWebService, SelectedUser) {
        'use strict';
        $scope.switchStatus  = 1;
        $scope.switchStatus2 = 1;
        $scope.switchStatus3 = 1;
        $scope.switchStatus4 = 1;
        $scope.switchStatus5 = 1;
        $scope.switchStatus6 = 1;
        $scope.Id = SelectedUser.Id;
        //console.log($scope.Id);
        if ($scope.Id !== '') {
            UserWebService.getUser($scope.Id).then(function (result) {
                if (result.data.status !== 'error') {
                    //console.log(result);
                    $scope.name = result.data.json[0].name;
                    $scope.campId = result.data.json[0].user_id;
                    //retData = result;

                }

            });
        }
        $scope.name = "New User";
        $scope.campId = "";


        // $scope.startDate;
        $scope.createUser = function () {
            //console.log("inside createUser function");
            //console.log($scope.name);
            //console.log($scope.campId);
            //console.log($scope.dt);
            var nc = {};
            if ($scope.Id) {
                nc = {
                    "users": {
                        "id": $scope.Id,
                        "name": $scope.name,
                        "ouid": "1",
                        "user_id": $scope.campId
                    }
                };

                UserWebService.updateUser(nc).then(function (result) {
                    //console.log(result);
                    if (result.data.status != 'error') {
                        $location.path('/setup-users');
                    }
                    else {
                        $scope.error = "Invalid email or password";
                    }
                });
            }
            else {
                nc = {
                    "users": {
                        "name": $scope.name,
                        "ouid": "1",
                        "user_id": $scope.campId
                    }
                };
                UserWebService.createUser(nc).then(function (result) {
                    //console.log(result);
                    if (result.data.status != 'error') {
                        $location.path('/setup-users');
                    }
                    else {
                        $scope.error = "Invalid email or password";
                    }
                });

            }

        };
        $scope.getLocation = function (val) {
            return $http.get('http://maps.googleapis.com/maps/api/geocode/json', {
                params: {
                    address: val,
                    sensor: false
                }
            }).then(function (res) {
                var addresses = [];
                angular.forEach(res.data.results, function (item) {
                    addresses.push(item.formatted_address);
                });
                return addresses;
            });
        };

        $scope.colorPicked = '#fa4d4d';

        $scope.select2RemoteOptions = {
            placeholder: "Search for a movie",
            minimumInputLength: 3,
            width: 'resolve',
            ajax: {
                url: "http://api.rottentomatoes.com/api/public/v1.0/movies.json",
                dataType: 'jsonp',
                quietMillis: 100,
                data: function (term, page) { // page is the one-based page number tracked by Select2
                    return {
                        q: term, //search term
                        page_limit: 10, // page size
                        page: page, // page number
                        apikey: "8vzys3eka2s9hpvkh7wwzp7e" // please do not use so this example keeps working
                    };
                },
                results: function (data, page) {
                    var more = (page * 10) < data.total; // whether or not there are more results available

                    // notice we return the value of more so Select2 knows if more results can be loaded
                    return {results: data.movies, more: more};
                }
            },
            formatResult: function (movie) {
                var markup = "<table class='movie-result'><tr>";
                if (movie.posters !== undefined && movie.posters.thumbnail !== undefined) {
                    markup += "<td class='movie-image'><img src='" + movie.posters.thumbnail + "'/></td>";
                }
                markup += "<td class='movie-info'><div class='movie-title'>" + movie.title + "</div>";
                if (movie.critics_consensus !== undefined) {
                    markup += "<div class='movie-synopsis'>" + movie.critics_consensus + "</div>";
                }
                else if (movie.synopsis !== undefined) {
                    markup += "<div class='movie-synopsis'>" + movie.synopsis + "</div>";
                }
                markup += "</td></tr></table>";
                return markup;
            },
            formatSelection: function (movie) {
                return movie.title;
            },
            dropdownCssClass: "bigdrop", // apply css that makes the dropdown taller
            escapeMarkup: function (m) {
                return m;
            } // we do not want to escape markup since we are displaying html in results
        };

        $scope.tagList = ['tag1', 'tag2'];
        $scope.select2TaggingOptions = {
            'multiple': true,
            'simple_tags': true,
            'tags': ['tag1', 'tag2', 'tag3', 'tag4'] // Can be empty list.
        };

        $scope.multiSelect1 = [];
        $scope.multiSelect2 = [];
    }])
    .controller('UserProfileController', ['$scope', '$filter', 'UserWebService', 'SelectedUser', '$location', '$routeParams', '$rootScope', 'pinesNotifications', '$window', "AdminSession",'$route', '$cookies',
        function ($scope, $filter, UserWebService, SelectedUser, $location, $routeParams, $rootScope, pinesNotifications, $window, AdminSession, $route, $cookies) {

            $scope.formSubmit      = false;
            $scope.currentUsername = null;
            $scope.changePassword = false;
            $scope.timeZones = [
                {value: 'America/Halifax', text: 'Atlantic (AT)'},
                {value: 'America/New_York', text: 'Eastern (ET)'},
				{value: 'America/Chicago', text: 'Central (CT)'},
                {value: 'America/Denver', text: 'Mountain (MT)'},
                {value: 'America/Phoenix', text: 'Arizona (MT)'},
	            {value: 'America/Los_Angeles', text: 'Pacific (PT)'}
            ];


            $scope.getUserData = function () {
	            $scope.isConvirzaAdmin = AdminSession.isAdmin(); // Can't do this in the root of UserProfileController for some reason

                UserWebService.getUser($rootScope.userId).then(function (result) {
                    if (result.data.status !== 'error') {
                        $scope.user = result.data.json[0];
                        //set time zone
                        $.each($scope.timeZones, function (key, val) {
                            if (val.value == result.data.json[0].timezone) {
                                $scope.user.timezone = $scope.timeZones[key];
                            }
                        });
                        if($scope.timeZones.indexOf($scope.user.timezone) === -1)
                            $scope.user.timezone = {value: 'America/New_York', text: 'Eastern'};
                        $scope.currentUsername = result.data.json[0].username;
                    }

                });
            };

            $scope.getUserData();

            $scope.cancelUser = function () {
                $scope.getUserData();
            };

            //update user data
            $scope.updateUser = function () {
				      if($scope.userForm.$valid) {
					      $scope.formSubmit = true;
                if($scope.user.primary_phone === null){
                    $scope.user.primary_phone = '';
                }else{
                    $scope.user.primary_phone = $scope.user.primary_phone.replace(/\D/g,"");
                }

					      console.log('CREATEING SAVEDATA', $scope.user);

      					var saveData = {
      						"user": {
      							"ct_user_id": $scope.user.ct_user_id,
      							"first_name": $scope.user.first_name,
      							"last_name": $scope.user.last_name,
      							"username": $scope.user.username,
      							"primary_phone": $scope.user.primary_phone,
      							"user_ext_id":   $scope.user.user_ext_id,
      							"timezone": $scope.user.timezone.value,
      							"ct_user_ou_id": $scope.user.ct_user_ou_id
      						}
      					};
                // _.findLastIndex($scope.realUsers, { ct_user_id: $scope.user.ct_user_id })
                // var index = _.findLastIndex($scope.realUsers, { ct_user_id: $scope.user.ct_user_id })
                // $scope.realUsers[index];
      					//update timezone setting
      					$rootScope.timezone = $window.sessionStorage.timezone = $scope.user.timezone.value;
                $rootScope.userEmail = $window.sessionStorage.userEmail = $scope.user.username;
					      UserWebService.updateUser(saveData).then(function (result) {
						// console.log('RESULT FROM BACKEND:', result);

      						if (result.data.status == 'success') {
      							pinesNotifications.notify({
      								title: 'User Profile',
      								text: 'User Profile updated successfully.',
      								type: 'success'
      							});
      							//update username for password lookup
      							$scope.currentUsername = saveData.user.username;
                                  $rootScope.fullName    = saveData.user.first_name +' '+ saveData.user.last_name;
      							//make sure Save button gets re-enabled
      							$scope.formSubmit = false;
      							$scope.submitted = false;
                                  $rootScope.timezone = $scope.user.timezone.value;
      							// Update uservoiceSSO, the supportURL, and update the UserVoice SSO token after updating a profile successfully
      							$rootScope.uservoiceSSO = $window.sessionStorage.uservoiceSSO = result.data.uservoiceSSO;
      							$rootScope.feedbackURL = $window.sessionStorage.feedbackURL = "https://convirza.uservoice.com?sso=" + result.data.uservoiceSSO;
                                $rootScope.supportURL = $window.sessionStorage.supportURL = "https://knowledgebase.convirza.com";
      							window.UserVoice.setSSO($rootScope.uservoiceSSO);
      						}
      						else {
      							pinesNotifications.notify({
      								title: 'User Profile',
      								text: 'User Profile update failed.',
      								type: 'error'
      							});
      							$scope.formSubmit = false;
      						}
      					});
      				}
            };

            $scope.updatePassword = function () {
				if($scope.passwordForm.$valid) {
					var saveData = {
						"user": {
							"ct_user_id": $scope.user.ct_user_id,
							"password":   $scope.newPassword,
							"username":   $scope.currentUsername,
						}
					};

					if ($scope.newPassword != $scope.confirmPassword) {
						pinesNotifications.notify({
							title: 'Update Password',
							text: 'New Passwords do not match.',
							type: 'error'
						});
					}
					else if($scope.newPassword.length < 5 || $scope.confirmPassword.length < 5) {
						pinesNotifications.notify({
							title: 'Update Password',
							text: 'New Password must be at least 5 characters.',
							type: 'error'
						});
					}
					else {
						var env = $cookies.get('name');
						var data = {
							'grant_type'    :'password',
							'username'      :$scope.currentUsername,
							'password'      :$scope.oldPassword,
							'client_id'     :$cookies.get('client_id'),
							'client_secret' :$cookies.get('client_secret')
						};
						UserWebService.checkPassword(data).then(function (result) {
							if (result.data.status == 'success') {
								UserWebService.updateUser(saveData).then(function (result) {
									//console.log(result);
									if (result.data.status == 'success') {
										pinesNotifications.notify({
											title: 'Change Password',
											text: 'Password updated successfully.',
											type: 'success'
										});
										$scope.changePassword = false;
										$scope.oldPassword = $scope.newPassword = $scope.confirmPassword = false;
                                        $route.reload();
									}
									else {
										pinesNotifications.notify({
											title: 'Change Password',
											text: 'Password update failed.',
											type: 'error'
										});
									}
								});
							}
							else {
								pinesNotifications.notify({
									title: 'Change Password',
									text: 'Old password incorrect. Please check and try again.',
									type: 'error'
								});
							}
						}).catch(function(err) {
                            if(err.data.error_description && err.data.error_description == 'Invalid resource owner credentials') $scope.error = "Old password incorrect. Please check and try again.";
                            pinesNotifications.notify({
                                title: 'Change Password',
                                text: $scope.error,
                                type: 'error'
                            });
                        });
					}
				}

            };

			$scope.cancelPassword = function() {
				$scope.changePassword = false;
				$scope.oldPassword = null;
				$scope.newPassword = null;
				$scope.confirmPassword = null;
			};


        }]).controller('changePasswordModal', ['$scope', '$rootScope', '$uibModalInstance', 'pinesNotifications','UserWebService', '$bootbox',
        function ($scope, $rootScope, $uibModalInstance, pinesNotifications, UserWebService, $bootbox) {
            $scope.userDataUpdate = $uibModalInstance.data;
            $scope.newPassword = '';
            $scope.changePassword = function(){
                //added role id to check user has permission to change password or not...
                      var saveData = {
                        "user": {
                            "ct_user_id": $scope.userDataUpdate.id,
                            "password":   $scope.newPassword,
                            "username":   $scope.userDataUpdate.email,
                            "role_id" :   $rootScope.roleId
                        }
                    };
                // if(!angular.element('#changePassword').hasClass('ng-invalid')){
                    UserWebService.updateUser(saveData).then(function (result) {
                        if (result.data.status == 'success') {
                            pinesNotifications.notify({
                                title: 'Change Password',
                                text: 'Password updated successfully.',
                                type: 'success'
                            });
                            $scope.changePassword = false;
                            $scope.oldPassword = $scope.newPassword = $scope.confirmPassword = false;
                        }
                        else {
                            pinesNotifications.notify({
                                title: 'Change Password',
                                text: 'Password update failed.',
                                type: 'error'
                            });
                        }
                    });
                // }
                $uibModalInstance.close();
            };
            $scope.cancel = function () {
                $uibModalInstance.close();
            };

        }]).controller('moveUserController', ['$scope', '$rootScope', '$uibModalInstance', 'pinesNotifications','UserWebService', '$route',
            function ($scope, $rootScope, $uibModalInstance, pinesNotifications, UserWebService, $route) {
                $scope.userData = $uibModalInstance.data.userData;
                $scope.groupsList = $uibModalInstance.data.groupsList;
                $scope.moveUserToSelectedGroup = function(){
                    var saveData = {
                        'org_unit_id': parseInt($scope.selectedGroup),   
                        'ct_user_id': $scope.userData.id
                    };
                    UserWebService.moveUser(saveData).then(function (result) {
                        if (result.data.result == 'success') {
                            pinesNotifications.notify({ 
                                title: 'Move User',
                                text: 'User moved successfully.',
                                type: 'success'
                            });
                            $route.reload();
                        }
                        else {
                            pinesNotifications.notify({
                                title: 'Move User',
                                text: 'Failed to move User',
                                type: 'error'
                            });
                        }
                    });
                    $uibModalInstance.close();
                };

                $scope.cancel = function () {
                    $uibModalInstance.close();
                };
        }]);
