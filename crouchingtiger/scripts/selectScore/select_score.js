//jshint ignore:start
angular.module('theme.select-score-detail', ['ui.select2', 'angularFileUpload', 'theme.services', 'angularUtils.directives.dirPagination', "api-param", 'xeditable','ngTagsInput'])
    .service('cfilter', ['$http', function($http) {
        'use strict';

        var cfobj = {};
        cfobj.cf = crossfilter([]);
        var ndx, all;
        $http.get('assets/demo/call_flow.json')
            .success(function(data) {
                if (data.json !== undefined) {
                    cfobj.data = data.json;
                    cfobj.ndx = cfobj.cf.add(cfobj.data);
                    cfobj.all = cfobj.ndx.groupAll();
                }
            })
            .error(function(data) {
                alert("error loading config.json");
            });

        return cfobj;
        //var idDim = cf.dimension(function(d) {
        //  return d.id;
        //});
	}])
	
    .factory('ScoreDetailsWebService', function($q, $timeout, $http, $window, $rootScope, ApiParam) {
        'use strict';
        var ScoreDetailsWebService = {};
        ScoreDetailsWebService.getJsonConfig = function() {
            var config = {
                headers: {
                    'content-type': 'application/json',
                    'Authorization': 'bearer ' + $window.sessionStorage.token
                }
            }; 
            return config;
        };  
        ScoreDetailsWebService.getCallsSummaryList = function(qryStr) {
            $http.defaults.useXDomain = true;
            //if (report === 'calls-callback') { report = 'call_back'; }
            return $http.get(ApiParam.baseURL() + "/v1/scoreCardCall/retriveScoreCardCalls?"+qryStr+"&count=true", ApiParam.headerConfig());
        };
        ScoreDetailsWebService.getCallsDetailsList = function(qryStr) {
            $http.defaults.useXDomain = true;
            //if (report === 'calls-callback') { report = 'call_back'; }
            return $http.get(ApiParam.baseURL() + "/v1/scoreCardCall/retriveScoreCardCalls?"+qryStr+"&count=false", ApiParam.headerConfig());
        };

        ScoreDetailsWebService.setCallListened = function (callId, scoreCardCallDetail) {
          return $http.post(ApiParam.baseURL() + "/v1/scoreCard/set-call-listened/callId/"+callId,scoreCardCallDetail,ApiParam.headerConfig());
        };

        ScoreDetailsWebService.createScorCardCallDetail = function (scoreCardCallDetail) {
    				return $http.post(ApiParam.baseURL() + "/v1/scoreCard/attchscorecard/callId/" + scoreCardCallDetail.call_id , scoreCardCallDetail, ApiParam.headerConfig());
    		};

        ScoreDetailsWebService.updateScorCardCallDetail = function (scoreCardCallDetail) {
    				return $http.post(ApiParam.baseURL() + "/v1/scorecard/scorecall/scoreCardCallId/" + scoreCardCallDetail.call_id +"/scoreId/" + scoreCardCallDetail.score_card_id , scoreCardCallDetail, ApiParam.headerConfig());
    		};

        ScoreDetailsWebService.updateScoreStatus = function (call_score_card_id,call_score_status) {
    				return $http.get(ApiParam.baseURL() + "/v1/scorecarddetail/updateScoreStatus/callScorecardId/"+call_score_card_id+"/callScoreStatus/"+call_score_status, ApiParam.headerConfig());
    		};

        ScoreDetailsWebService.getGroups = function () {
                $http.defaults.useXDomain = true;
                return $http.get(ApiParam.baseURL() + "/v1/scorecard/getGroups", ApiParam.headerConfig());
        };

        ScoreDetailsWebService.getIdentifiedUsers = function (callId) {
                $http.defaults.useXDomain = true;
                return $http.get(ApiParam.baseURL() + "/v1/scoreCardCall/getIdentifyUsers/"+callId, ApiParam.headerConfig());
        };
        ScoreDetailsWebService.checkIfUserValid = function (ct_user_id,callGroup) {
            $http.defaults.useXDomain = true;
            return $http.get(ApiParam.baseURL() + "/v1/scoreCardCall/checkifuservalid/userid/"+ct_user_id+"/callgroup/"+callGroup, ApiParam.headerConfig());
        };

        ScoreDetailsWebService.getCallAudioFile = function (callID) {
                $http.defaults.useXDomain = true;
                return $http.get(ApiParam.baseURL() + "/v1/scorecarddetail/getCallAudioFile/callID/"+ callID, ApiParam.headerConfig());
        };

        ScoreDetailsWebService.getCallsTags = function (callID) {
                $http.defaults.useXDomain = true;
                return $http.get(ApiParam.baseURL() + "/v1/scorecarddetail/getCallsTags/callID/"+ callID, ApiParam.headerConfig());
        };

        ScoreDetailsWebService.getActiveScoreCards = function (org_unit_id) {
            $http.defaults.useXDomain = true;
              return $http.get(ApiParam.baseURL() + "/v1/scoreCardCall/retriveActiveScoreCards/" + org_unit_id, ApiParam.headerConfig());
        };
       
        ScoreDetailsWebService.getScoreCard = function (scoreId, callId) {
    				$http.defaults.useXDomain = true;
    				  return $http.get(ApiParam.baseURL() + "/v1/scoreCard/scoreId/" + scoreId + "?call_id=" + callId, ApiParam.headerConfig());
    		};

        ScoreDetailsWebService.getCallScores = function (scoreId, callId) {
            $http.defaults.useXDomain = true;
              return $http.get(ApiParam.baseURL() + "/v1/scoreCard/scoreCardDetail/scoreCardCallId/" + callId + "/scoreId/" + scoreId, ApiParam.headerConfig());
        };

        ScoreDetailsWebService.getTags = function () {
            $http.defaults.useXDomain = true;
            var url = ApiParam.baseURL() +
                "/v1/tag/ouid/"+ $rootScope.currentOUId + "/userAccess/" + $rootScope.userAccess.campaign;
            return $http.get(url, ApiParam.headerConfig());
        };
        ScoreDetailsWebService.addTagByCallId = function (callID ,data) {
            $http.defaults.useXDomain = true;
            return $http.post(ApiParam.baseURL() + "/v1/scorecarddetail/addTagByCallId/callID/"+callID, data,ApiParam.headerConfig());
        };
        ScoreDetailsWebService.deleteTagByCallId=function(callID,tagId) {
            $http.defaults.useXDomain = true;
            return $http.delete(ApiParam.baseURL() + "/v1/scorecarddetail/deleteTagByCallId/callID/"+callID+"/tagId/"+tagId,ApiParam.headerConfig());
        };
        ScoreDetailsWebService.createTag = function (tag) {
            
            return $http.post(ApiParam.baseURL() + "/v1/tag", tag, ApiParam.headerConfig());
        };


        ScoreDetailsWebService.deleteTag = function (tag) {
            return $http.put(ApiParam.baseURL() + "/v1/tag/delete", tag, ApiParam.headerConfig());
        };


        ScoreDetailsWebService.unMaskData = function (data) {
            if (data) {
                return data.replace(/[^0-9]+/g, '');
            }
        };

        ScoreDetailsWebService.addComment = function (call_id, commentData) {
            return $http.post(ApiParam.baseURL() + "/v1/scoreCardCall/saveComment/callID/"+ call_id, commentData, ApiParam.headerConfig());
        };

        ScoreDetailsWebService.addAndRemoveCriteria = function (call_id, criteriaData) {
            return $http.post(ApiParam.baseURL() + "/v1/scoreCardCall/saveCallCriteria/callID/"+ call_id, criteriaData, ApiParam.headerConfig());
        };
        ScoreDetailsWebService.addCommentRespons=function(comment_id,data){
            return $http.post(ApiParam.baseURL() + "/v1/scorecarddetail/addCommentRespons/commentID/" + comment_id , data, ApiParam.headerConfig());

        };
        ScoreDetailsWebService.getCommentResponses= function(comment_id){
            return $http.get(ApiParam.baseURL() + "/v1/scorecarddetail/getCommentResponses/commentID/"+ comment_id, ApiParam.headerConfig());

        };
        ScoreDetailsWebService.getAllComments=function(call_id){
            $http.defaults.useXDomain = true;
                return $http.get(ApiParam.baseURL() + "/v1/scorecarddetail/getAllComments/callID/"+ call_id, ApiParam.headerConfig());

        };
        ScoreDetailsWebService.deleteComment = function(comment_id) {
            return $http.delete(ApiParam.baseURL() + "/v1/scorecarddetail/deleteComment/commentID/" + comment_id,  ApiParam.headerConfig());
        };

        ScoreDetailsWebService.deleteCommentResponse = function(response_id) {
            return $http.delete(ApiParam.baseURL() + "/v1/scorecarddetail/deleteCommentResponse/responseID/" + response_id,  ApiParam.headerConfig());
        };

        ScoreDetailsWebService.getRetriveActiveScoreCards = function (org_unit_id) {
            $http.defaults.useXDomain = true;
              return $http.get(ApiParam.baseURL() + "/v1/scoreCardCall/AdvancedActiveScoreCards/" + org_unit_id, ApiParam.headerConfig());
        };

        ScoreDetailsWebService.notify = function (args) {
            PNotify.removeAll();
            var notification = new PNotify(args);
            notification.notify = notification.update;
            return notification;
        };
        
        // Fetch call details appended info
        ScoreDetailsWebService.getCallsDetailsInfo = function(userID, callID) {
          $http.defaults.useXDomain = true;
          return $http.get(ApiParam.baseURL() + "/v1/call/Info/" + callID + "/?user_id=" + userID, ApiParam.headerConfig());
        };

        // Fetch call comments 
        ScoreDetailsWebService.getCallsComments = function(userID, callID) {
         $http.defaults.useXDomain = true;
          return $http.get(ApiParam.baseURL() + "/v1/call/Comment/" + callID + "/?user_id=" + userID + "&timezone=" + encodeURIComponent($rootScope.timezone), ApiParam.headerConfig());
        };

         // Add call comments 
        ScoreDetailsWebService.setCallsComments = function(commentdata, userID) {
          var req = {
              method: 'POST',
              url: ApiParam.baseURL() + "/v1/call/Comment/" + "?user_id=" + userID,
              headers: ApiParam.headerConfig().headers,
              data: commentdata
          };
          return $http(req);
        };

        // Delete call comments 
        ScoreDetailsWebService.deleteCallsComments = function(commentID, userID) {
          return $http.delete(ApiParam.baseURL() + "/v1/call/Comment/" + commentID + "/?user_id=" + userID, ApiParam.headerConfig());
        };

        // Fetch call tags
        ScoreDetailsWebService.fetchCallsTags = function(userID, callID) {
         $http.defaults.useXDomain = true;
         return $http.get($rootScope.url + ":" + $rootScope.port + "/v1/call/Tag/" + callID + "/?user_id=" + userID, this.getJsonConfig());
        };
        
        // Fetch available tags which can be applied to call
        ScoreDetailsWebService.fetchTags = function(userID, callID) {
          $http.defaults.useXDomain = true;
          return $http.get($rootScope.url + ":" + $rootScope.port + "/v1/tag/ouid/" + $rootScope.currentOUId + "/userAccess/" + $rootScope.userAccess.tag, this.getJsonConfig());
        };

        // Set call tags
        ScoreDetailsWebService.setCallsTags = function(calltagdata, userID) {
          var req = {
              method: 'POST',
              url: $rootScope.url + ":" + $rootScope.port + "/v1/call/Tag/" + "?user_id=" + userID,
              headers: {
                  'content-type': 'application/json',
                  'Authorization': 'bearer ' + $window.sessionStorage.token
              },
              data: calltagdata
          };

          return $http(req);
        };

        return ScoreDetailsWebService;
    })
     .factory('ScoreNotificationsWebService', function($q, $timeout, $http, $window, $rootScope, ApiParam) {
        'use strict';
        var ScoreNotificationsWebService = {};
        ScoreNotificationsWebService.getJsonConfig = function() {
            var config = {
                headers: {
                    'content-type': 'application/json',
                    'Authorization': 'bearer ' + $window.sessionStorage.token
                }
            };
            return config;
        };
        //on load
        ScoreNotificationsWebService.getNotifcationsList = function(id) {
            $http.defaults.useXDomain = true;
            //if (report === 'calls-callback') { report = 'call_back'; }scoremanualaction
            return $http.get(ApiParam.baseURL() + "/v1/scoremanualaction/user/"+id, ApiParam.headerConfig());
        };
        // extra get
        ScoreNotificationsWebService.getNotifications = function(id) {
            $http.defaults.useXDomain = true;
            //if (report === 'calls-callback') { report = 'call_back'; }
            return $http.get(ApiParam.baseURL() + "/v1/scoremanualaction"+id, ApiParam.headerConfig());
        };

        //on save
        ScoreNotificationsWebService.createScoreNotification = function (scoreNotifcationsDetail) {
            return $http.post(ApiParam.baseURL() + "/v1/scoremanualaction", scoreNotifcationsDetail, ApiParam.headerConfig());
        };
         //on bulk insert
        ScoreNotificationsWebService.createScoreNotifications = function (id,scoreNotifcationsDetails) {
            return $http.post(ApiParam.baseURL() + "/v1/scoremanualaction/"+id, scoreNotifcationsDetails, ApiParam.headerConfig());
        };
        //on Edit
        ScoreNotificationsWebService.updateScoreNotifications = function (scoreNotifcationsDetail) {
            return $http.put(ApiParam.baseURL() + "/v1/scoremanualaction", scoreNotifcationsDetail, ApiParam.headerConfig());
        };
        //on delete
        ScoreNotificationsWebService.deleteScoreNotification = function (id) {
          
            return $http.delete(ApiParam.baseURL() + "/v1/scoremanualaction/"+id, ApiParam.headerConfig());
        };

        return ScoreNotificationsWebService;
    })


    //The dynamicUrl directive is calling from calls-details.html and calls-callback.html page, this is created for ading the source url the audio tag
    .directive('dynamicUrl', function () {
        return {
            restrict: 'A',
            link: function postLink(scope, element, attrs) {
                element.attr('src', attrs.ngId);
                //increase the count
                scope.increaseAudioInitializationCount();
            }
        };
    })
.controller('SelectScoreController', ['$scope', '$http', '$window', '$rootScope', '$routeParams','$filter','$sce', 'ScoreDetailsWebService', 'pinesNotifications', '$timeout', '$compile', '$q', '$bootbox', '$uibModal', '$location', 'advFilSrvc',
        function($scope, $http, $window, $rootScope, $routeParams, $filter,$sce, ScoreDetailsWebService, pinesNotifications, $timeout, $compile, $q, $bootbox, $uibModal, $location, advFilSrvc) {
			// window.onbeforeunload = function (event) {
			// 	var message = 'Sure you want to leave?';
			// 	if (typeof event == 'undefined') {
			// 	  event = window.event;
			// 	}
			// 	if (event) {
			// 	  event.returnValue = message;
			// 	}
			// 	return message;
			//   }
            $scope.audioInitializationCount = 0;
			      $scope.simpleSearchFilter =  "";
            $scope.filterApplied = false;
      			$scope.horsemanFlag = false;
            $scope.isReadonlyScore = false;
            $scope.checkIfscorecardChange = '';
            $scope.checkIfAssignChange='';
            $scope.previouscheckIfscorecardChange = '';
            $scope.previouscheckIfAssignChange='';
            $scope.editButtonStatus = false;
            $scope.attachedScoreCardChange = false;
            $scope.roleId = $rootScope.roleId;
            $scope.currentPage = 1;
            $scope.pageSize = 100;
            $scope.showme = [];
            $scope.radioOption = [];
            $scope.previousDataEditable = {};
            $scope.scoreName = "SelectandScore_Calls";
            var groupsReportName = $scope.scoreName + "_" + moment().format('YYYY-MM-DD');
            $scope.passFail = ["Pass","Fail"];
            $scope.isScoreEditInProgress = false;
            //$scope.scorecardReplica_id = undefined;
            $scope.actionHeader = ['Actions'];
            $scope.scoreDetailHeader = ['Group Name', 'Agent', 'Call Title', 'Duration', 'Call Date/Time','Scorecard','Score Date','Score', 'Status'];
            $scope.pagination = { current: ($routeParams.page ? $routeParams.page : 1) };
            var csVisible = false;
            $rootScope.isSafari= $window.sessionStorage.isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window.safari || safari.pushNotification);
	           $scope.preview = ($location.search().preview ? $location.search().preview : false);
            $scope.isFromReportEngine  = ($location.search().isFromReportEngine ? $location.search().isFromReportEngine : false);
            $scope.date = new Date();
            $scope.date = moment.utc($scope.date).format("MM-DD-YYYY h:mm:ss a");
            $scope.criteriaInProgress = false;
            var callID=0;
            $scope.isScoreCardUpdate = false;
            $scope.isLoadingApi = true;
            $scope.config = {
                autoHide: false,
                autoPlay: false,
                sources: "",
                preload: "auto",
                controls: false,
                theme: {
                    url: "assets/css/videogular.css"
                }
            };

			$scope.scoreDetailsColumnMapping = [
				{ label: "Play Call",			key: "",				visible: true,  sorting: false },
				{ label: "Status",				key: "",				visible: true,  sorting: false },
				{ label: "Date/Time",			key: "call_date_time",	visible: true,  sorting: true },
				{ label: "Duration",			key: "duration",		visible: true,	sorting: true },
				{ label: "Group",				key: "group_name",	visible: true,	sorting: true },
				{ label: "Identified Agent",	key: "username",		visible: true,	sorting: true },
				{ label: "Call Title",			key: "call_title",		visible: true,	sorting: true },
				{ label: "Scorecard",			key: "scorecard",		visible: true,  sorting: true },
				{ label: "Score Date",			key: "score_date",		visible: true,  sorting: true },
				{ label: "Score",				key: "score",			visible: true,  sorting: true },
                { label: "Actions",				key: "",				visible: true,  sorting: false }
            ];
      if($scope.roleId === '3' || $scope.roleId === '8'){
        $scope.isReadonlyScore = true;
      } else if ((parseInt($scope.roleId) === 2 && ($rootScope.score_call === "false" || $rootScope.score_call === false)) || (parseInt($scope.roleId) === 1 && ($rootScope.score_call === "false" || $rootScope.score_call === false))) {
        $scope.isReadonlyScore = true;
      }
			$scope.callDetailsColumnToggle = function(ele) {
				
			};
      if ($location.search().preview) {
          $("#wrap").append('<div id="previewBlock">&nbsp;</div>');
      }
       $scope.sortOrder = false;
        $scope.getDataforSorting = function(){
            $scope.sortedPagination = true;
            if($scope.pagination.current != 1){
                $scope.pagination.current = 1;
                $scope.urlParams.offset = 0;
            }                
            $scope.loadReportBasedOnQueryString();
       }
       

      $scope.notificationsPopUp = function(){
       
       $rootScope.uibModalInstance = $uibModal.open({
         ariaLabelledBy: 'modal-title',
         ariaDescribedBy: 'modal-body',
         templateUrl: './views/score-notifications.html',
         controllerAs: 'ScoreNotificationsController',
         scope: $scope,
         backdrop  : 'static',
         keyboard  : false,
         size: 'lg',
         resolve: {
         }
       });
        
      };
            $scope.drp_options = {
                ranges:    {
                    'Today':        [moment().startOf('day'),                                       moment().endOf('day')],
                    'Yesterday':    [moment().subtract(1, 'days').startOf('day'),                   moment().subtract(1, 'days').endOf('day')],
                    'Last 7 Days':  [moment().subtract(6, 'days').startOf('day'),                   moment().subtract(0, 'days').endOf('day')],
                    'Last 30 Days': [moment().subtract(29, 'days').startOf('day'),                  moment().subtract(0, 'days').endOf('day')],
                    'This Month':   [moment().startOf('month').startOf('day'),                      moment().endOf('month').endOf('day')],
                    'Last Month':   [moment().subtract(1, 'month').startOf('month').startOf('day'), moment().subtract(1, 'month').endOf('month').endOf('day')]
                },
                opens:     'left',
                startDate: moment().subtract(7, 'days').startOf('day'),
                endDate:   moment().subtract(1, 'days').endOf('day')
            };

          //tag

          if ($scope.userAccess.campaign >= 6)
          $scope.canModify = true;
          $scope.OU_Name = $rootScope.currentOUName;
          $scope.OUtags = [];
          var tags = [];
          $scope.selected = 0;
          $scope.selTags = [];
          $scope.ALLOUtags = [];
          $scope.NonOUtags = [];
          $scope.isClicked =false;
          $scope.agents = [];
          $scope.scorecardData = [];
          $scope.scorecards = [];
          $scope.groupScoreCards = [];
          $scope.indentifiedUsers = [];
          $scope.comments = [];
          $scope.comment = [];
          $scope.isRespons=false;
          $scope.isComment=true
          $scope.isAddTagProcesssing=false;
           $scope.isPendingReq = true;


        //   ScoreDetailsWebService.getActiveScoreCards($rootScope.currentOUId).then(function(result) {
            
        //     if(result.data.json.length > 0){
        //       $scope.advFilterScorecards =  result.data.json;
        //     }
        //     // body...
        //   });


        ScoreDetailsWebService.getRetriveActiveScoreCards($rootScope.currentOUId).then(function(result) {
            $scope.isLoadingApi = false;
            
            if(result.data.json.length > 0){
              $scope.advFilterScorecards =  result.data.json;
            }
          });

          // ScoreDetailsWebService.getIdentifiedUsers().then(function(result){
          //   if(result.data.json.length > 0){
          //     $scope.indentifiedUsers =  result.data.json;
          //     console.log("$scope.indentifiedUsers",$scope.indentifiedUsers);
          //   }
          // });
          
          $scope.ischecked = function (index, tag) {
              if (tag.selected) {
                  $scope.selected++;
                  $scope.selTags.push(tag.id);
              }
              else {
                  var arrindex = $scope.selTags.indexOf(tag.id);
                  if (arrindex > -1) {
                      $scope.selTags.splice(arrindex, 1);
                      $scope.selected--;
                  }
              }
          };
          $scope.deleteSelectedTag=function(tag_id){
            
              var tagMsg = "Are you sure you want to remove this Tag?";
               $bootbox.confirm(tagMsg, function (clickedOK) {
                  if (clickedOK) {
                    
                     ScoreDetailsWebService.deleteTagByCallId(callID,tag_id).then(function (response) {
                      if (response.data.result !== 'error') {
                        
                        getTagsByCallId(callID);
                       }
                    })
                  }
                }) 
          }
          $scope.deleteSelectedTags = function () {
            
              var errors = [];
              var tags = {};
              var tagMsg = "Are you sure you want to delete this Tag?";
              if($scope.selTags.length > 1){
                  tagMsg = "Are you sure you want to delete these Tags?";
              }
              if($scope.selected > 0){
                  $bootbox.confirm(tagMsg, function (clickedOK) {
                      if (clickedOK) {
                          $scope.deltag = {
                              tag:{
                                  id: $scope.selTags
                              }
                          };

                          ScoreDetailsWebService.deleteTag($scope.deltag).then(function (response) {
                              if (response.data.result !== 'error') {
                                  $scope.deltag.tag.id.forEach(function (tag) {
                                      for (var i = 0; i < $scope.OUtags.length; i++) {
                                          if ($scope.OUtags[i].id === tag){
                                              $scope.OUtags.splice(i, 1);
                                              $scope.selected--;
                                          }
                                      }
                                  });
                                  var deleteTag = "Tag deleted successfully";
                                  if($scope.selTags.length > 1){
                                              deleteTag = "Tags deleted successfully";
                                          }
                                  pinesNotifications.notify({
                                      title: 'Tag',
                                      text:  deleteTag,
                                      type:  'success'
                                  });
                                  $scope.deltag = [];
                                  $scope.selTags = [];
                              }
                              else {
                                  pinesNotifications.notify({
                                      title: 'Tag',
                                      text:  "Error in deleting Tag" + response.data.err,
                                      type:  'error'
                                  });
                              }
                          });
                      }
                  });
              }
          };
          $scope.clearSelectedTags = function () {
              for (var i = 0; i < $scope.OUtags.length; i++) {
                  if ($scope.OUtags[i].selected) {
                      $scope.OUtags[i].selected = false;
                      $scope.selected--;
                  }
              }
              $scope.selTags = [];
          };
           
          $scope.addTag = function (tagText) {
            $scope.disableAddTagButton = true;
            $scope.isClicked =true;
              var tag = {
                  "tag": {
                      "tag_name":    $scope.noResultsTag,
                      "org_unit_id": $rootScope.currentOUId
                  }
              };
              ScoreDetailsWebService.createTag(tag).then(function (result) {
                  $scope.isClicked =false;
                  if (result.data.err === '') {
                      $scope.tags.push({tag_id: result.data.json.tag_id, tag_name: $scope.noResultsTag, org_unit_id: $rootScope.currentOUId, editable: false});
                      pinesNotifications.notify({
                          title: 'Create Tag',
                          text:  'Successfully created tag',
                          type:  'success'
					  });
                      // $scope.tags.push({
                      //   "tag_name":    $scope.noResultsTag,
                      //   "org_unit_id": $rootScope.currentOUId,
                      //   "editable": true,
                      //   "tag_id": 
                      // })
                        var noResultsLink = $('.select2-drop');
                        noResultsLink.hide();
					  $scope.disableAddTagButton = false;					  
                      return;
                  }
                  else {
					$scope.disableAddTagButton = false;					  
                      pinesNotifications.notify({
                          title: 'Create tag',
                          text:  result.data.err,
                          type:  'error'
					  });
					  
                  }
              });
          };
        $scope.addTagByCallId = function(data){
          //data['call_id']=callID;
          if(data == '' || data == null || data == undefined){
             $scope.isAddTagProcesssing=false;

            pinesNotifications.notify({
            title: 'Select and Score Calls',
            text:  "Please select tag before you add",
            type:  'error'
          });
          }else{
             $scope.isAddTagProcesssing=true;
         var tempData =JSON.parse(data)
         

         var isTagExit=  _.findWhere($scope.OUtags,{ id : parseInt(tempData.tag_id) });
         
         if(isTagExit==undefined){
           $rootScope.userId = $window.sessionStorage.userId 
          
          
          
        
          var newData={
            "userId":$rootScope.userId,
            "tag_id":tempData.tag_id,
            "tag_name":tempData.tag_name
          }
          newData.callID=callID;
          
          ScoreDetailsWebService.addTagByCallId(callID,newData).then(function(result){
            
            if(result.data.status!='error'){
              $scope.tagText='';
              $scope.isAddTagProcesssing=false;
              getTagsByCallId(callID);
            }
          })
        }else{
            $scope.isAddTagProcesssing=false;
           pinesNotifications.notify({
            title: 'Select and Score Calls',
            text:  "This tag is already present.",
            type:  'error'
          });
        }
          }
         
         
         


        }

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
            

			//$scope.paginateHeaderTemp = null;
			//$scope.summaryItemsTemp = null;

			$scope.audioAccessPermission = true;
			$scope.scoringPermission = true;


      $scope.loadReportBasedOnQueryString = function() {
         // $scope.paginateHeader = 'Loading Data...';
          var urlParams = angular.copy($scope.urlParams);
        // urlParams.order = '';
        // urlParams.orderBy = '';
         $scope.isPendingReq = true;
         $scope.userIdCheck=$rootScope.userId
          $(".pageProgressLoader").show();
          $("#progressLoader").css("opacity","0");
          $(".table>tbody>tr>td").css("border-top","none");
          ScoreDetailsWebService.getCallsSummaryList($.param(urlParams)).then(function(result) {
			  var audioAccess = result.data.json.access_audio;
			  var scoreingAccess = result.data.json.score_call;

			  if (audioAccess === false){
				  $scope.audioAccessPermission = false;
			  };
			  if (scoreingAccess === false){
				  $scope.scoringPermission = false;
			  };
              $scope.summaryitems = result.data.json.total.total_count_calls ;

              if (result.data.json === undefined) {
                  return false;
              } else if (result.data.json.call.length > 0) {
               // 
                setTimeout(function() {
                   $("#cdr_table").floatingScroll("update");
                }, 100);

                  var dataSet = result.data.json.call;
                  $scope.agents = result.data.json.agent;
                  $scope.scorecardData = result.data.json.score_card;
                  console.log("$scope.scorecardData",$scope.scorecardData);
                  var timeFormat2 = d3.time.format('%Y-%m-%dT%H:%M:%S.%LZ');

                  _.each(dataSet, function(data) {
                      //data.d3_date = timeFormat2.parse(data.call_started);
                      //data.call_start_date = moment(data.call_started, "YYYY-MM-DD").format("MM-DD-YYYY h:mm:ss a");
                      data.call_date_time = moment(data.call_date_time).format("MM-DD-YYYY h:mm:ss a");
                      data.score_date = (data.score_date) ? moment(data.score_date).format("MM-DD-YYYY h:mm:ss a") : 'Not scored';
                      data.reviwed_date_time = (data.reviwed_date_time) ? moment(data.reviwed_date_time).format("MM-DD-YYYY h:mm:ss a") : 'Not scored';
                      data.singlerec = 1;
                      data.call_title = data.call_title;
                      data.agents = "";
                      data.isScoreCardSelected =false;
                      data.isScoreNowSelected = false;
                      data.scoreShow = false;
                      data.selectedScorecard = "";
                      data.noRecording = false;
                      data.audioShow = false;
                      data.listenLabel = "Listen to call";
                      if (data.play_call === null || data.play_call === '' || data.disposition == "REFERRAL") {
                          data.noRecording = true;
                          data.listenLabel = "No recording for this call";
                      }
                      data.call_score_status = (data.call_score_status === null) ? 'Need Scorecard' : data.call_score_status;
                      if(data.ct_user_id !== null && data.ct_user_id !== '' && data.ct_user_id !== undefined){
                          // var selected = _.find($scope.agents,{ct_ct_user_id:parseInt(data.ct_user_id)});
                        data.identifyAgent = { ct_user_id: data.ct_user_id, username: data.agent , ct_user_ou_id: data.userOuId};
                      }
                      if(data.score_card_id !== null && data.score_card_id !== '' && data.score_card_id !== undefined){
                          data.selectedScorecard = { score_card_id: parseInt(data.score_card_id), score_card_title: data.scorecard};
                          
                          data.isScoreCardSelected = (data.selectedScorecard !== null || data.selectedScorecard !== undefined) ? true : false;
                      }
                  });

                     if($scope.indentifiedUsers){
                        $scope.indentifiedUsers.shift();
                        $scope.indentifiedUsers = _.sortBy($scope.indentifiedUsers, 'username');
                        $scope.indentifiedUsers.unshift({
                            "username": "Unassign",
                            "ct_user_id": "unassigned",
                            "ct_user_ou_id": "unassigned"
                        });
                        
                     }
                  $scope.items = dataSet;
                  $scope.xf1 = crossfilter(dataSet);
                  $scope.dc1 = dc;
                  for (var i = 0; i < dataSet.length; i++) {
                      $scope.showme[i] = false;
                  }
                  
              } else {
                  
                  $scope.items = [];
              }


              $scope.hideDataTable = false;
             // 
             // $scope.summaryitems = $scope.summaryItemsTemp;
             $(".pageProgressLoader").hide();
              $("#progressLoader").css("opacity","1");
              $(".table>tbody>tr>td").css("border-top","1px solid #e9ecf0");
               $scope.isPendingReq = false;
              setTimeout(function() {
                $scope.horsemanFlag = true;
              }, 1000);

              if ($scope.showAdvFilter === true && $scope.advFilterDefinitions.length > 0) {
                if ($scope.advFilterDefinitions[0].user_input || $scope.advFilterDefinitions[0].user_input === 0) {
                  $scope.filterApplied = true;
                }
              } else if ($scope.simpleSearchFilter.length > 0) {
                $scope.filterApplied = true;
              }
          });
      };


      $scope.scoreIncludes = [];
      $scope.includeScore = function(score, isChecked) {
        if(isChecked){
          $scope.scoreIncludes.push(score);
        }else{
          $scope.scoreIncludes.splice(_.lastIndexOf($scope.scoreIncludes, score), 1) 
        }
        $scope.urlParams.status =  $scope.scoreIncludes;
        $scope.loadReportBasedOnQueryString();
		$scope.isScoreEditInProgress = false;
        // var i = $.inArray(score, $scope.scoreIncludes);
        // if (i > -1) {
        //     $scope.scoreIncludes.splice(i, 1);
        // } else {
        //     $scope.scoreIncludes.push(score);
        // }
      };

    $scope.getAgent = function(org_unit_id){
        $scope.callAgent = [];
        angular.forEach($scope.agents, function(value, key){
          _.each(value.groups_list,function(group){
            if(parseInt(group)===parseInt(org_unit_id)){
              $scope.callAgent.push(value);
            }
          });
        });
        if($scope.callAgent.length < 1){
          pinesNotifications.notify({
            title: 'Select and Score Calls',
            text:  "No assign user for this call.",
            type:  'error'
          });
        }
    };
    // $scope.callScoreFilter = function(items) {
    //     if ($scope.scoreIncludes.length > 0) {
    //         if ($.inArray(items.call_score_status, $scope.scoreIncludes) < 0)
    //             return;
    //     }
    //     return items;
    // };

      // $scope.getActiveScorecards = function(agents){
      //         $scope.scorecard = [];
      //         $scope.score_groups = [];
      //         angular.forEach($scope.agents, function(value, key){
      //           if(value.ct_user_id === agents){
      //             $scope.score_groups = value.groups_list;
      //           }
      //         });
      //         angular.forEach($scope.scorecardData, function(value, key){
      //           if($scope.score_groups.indexOf(value.org_unit_id) != -1){
      //             $scope.scorecard.push(value);
      //           }
      //         });
      // };

      $scope.loadAudio = function(call_id){
        _.map($scope.items,function(score){
            if(score.call_id != call_id){
              score.audioShow = false;
              score.scoreShow = false;
            }
        });
        ScoreDetailsWebService.getCallAudioFile(call_id).then(function(result){
          if(result.data.json !== undefined){
            var src = result.data.json.s3URL;
            result.data.json.noRecording = false;
            result.data.json.listenLabel = "Listen to call";
            if (result.data.json.recording_file === null || result.data.json.recording_file === '' || result.data.json.disposition == "REFERRAL") {
                result.data.json.noRecording = true;
                result.data.json.listenLabel = "No recording for this call";
            }
            $scope.trustSrc = function(src) {
              return $sce.trustAsResourceUrl(src);
            };
			$scope.s3URL = {'src':src};
            $(".playerProgressLoader").hide();
            $("#progressLoader").css("opacity","1");
		  }
			setS3UrlForAudio($scope.s3URL.src);
		  
        });
      };

      $scope.checkIfEdit = function(row, item) {
        $scope.call_title = item.call_title;
        $scope.score_card_id = item.score_card_id;
        //$scope.selectedScorecard = item.selectedScorecard;
        $scope.user_id = item.user_id;
        $scope.previousDataEditable.call_title = item.call_title;
        $scope.previousDataEditable.score_card_id = item.score_card_id;
        $scope.previousDataEditable.identifyAgent = item.identifyAgent;
        $scope.previousDataEditable.selectedScorecard = item.selectedScorecard;
        $scope.previousDataEditable.isScoreCardSelected = item.isScoreCardSelected;
        $scope.editButtonStatus = true;
        if((item.identifyAgent !== undefined) && (item.identifyAgent !== null)){
            $scope.identifyAgent = item.identifyAgent.ct_user_id;
        }else{
            $scope.identifyAgent = undefined;
        }
        if($scope.isScoreEditInProgress){
            $bootbox.confirm("It seems as if you have made changes but didn't click Save. Are you sure you want to proceed?", function(clickedOK) {
                if (clickedOK) {
                    $(".score-cancel").trigger("click");
                    $scope.loadScoreCard(item);
                    row.$show();
                }else{
                    row.$show();
                    $scope.editButtonStatus = true;
                }
            });
        }else{
            $scope.loadScoreCard(item);
            row.$show();
        }
      }

      $scope.checkResponses = function(commentCount){
        if(parseInt(commentCount) > 0)
            return true
        else
            return false;   
      }

      $scope.scoreCardInprogress = function(){
        $scope.isScoreCardUpdate = true;
      }

      $scope.scoreNow = function(score_card_id, call_id, isScored){
        var openScoreSection = false;
        $scope.isComment = true;
        $("#cdr_table").floatingScroll("update");
        // if($scope.isScoreCardUpdate){
        //     $bootbox.confirm("It seems as if you have made changes but didn't click Save. Are you sure you want to proceed?", function(clickedOK) {
        //         if (clickedOK) {
        //             $scope.isScoreCardUpdate = false;
        //             $scope.showScoredData(score_card_id, call_id, isScored)
        //         }
        //     });
        // }else{
            $scope.showScoredData(score_card_id, call_id, isScored)
        //}  
      };
    //

    $scope.showScoredData = function(score_card_id, call_id, isScored){
        $scope.selTag = [];
        $scope.comments = [];
        $scope.displayOrder = null;
        $scope.scorecard
        var fetchApiData = false;
        $("#cdr_table").floatingScroll("update");
        _.map($scope.items,function(score){
            if(score.call_id != call_id){
              score.scoreShow = false;
              score.audioShow = false;
            }else {
              fetchApiData = !score.scoreShow;
              score.audioShow = !score.scoreShow;
              score.scoreShow = !score.scoreShow;
            }
        });
        if(fetchApiData){
            $(".criteriaProgressLoader").show();
            $(".playerProgressLoader").show();
            $scope.isUpdateScore = true;
            $("#progressLoader").css("opacity","0");

            callID = call_id
            ScoreDetailsWebService.getCallAudioFile(call_id).then(function(result){

              if(result.data.json !== undefined){
                getAllComments(call_id);
                getAllTags();
                getTagsByCallId(call_id);
                var src = result.data.json.s3URL;
                $scope.totalTime = result.data.json.duration;
                result.data.json.noRecording = false;
                result.data.json.listenLabel = "Listen to call";
                if (result.data.json.recording_file === null || result.data.json.recording_file === '' || result.data.json.disposition == "REFERRAL") {
                    result.data.json.noRecording = true;
                    result.data.json.listenLabel = "No recording for this call";
                }
                $scope.trustSrc = function(src) {
                  return $sce.trustAsResourceUrl(src);
                };
                $scope.s3URL = {'src':src};
                //setS3UrlForAudio($scope.s3URL.src);
                $scope.API.stop();
                $scope.config.sources = $scope.s3URL.src;

                if(!isScored){
                  ScoreDetailsWebService.getScoreCard(score_card_id, call_id).then(function(result){
                      if(result.data.json !== undefined){
                         var editedScoreCard = result.data.json;
                         $scope.scorecards.criteriaList = [];
                         $scope.scorecards.title = editedScoreCard.scoreCard.score_card_title;
                         $scope.scorecards.instruction = editedScoreCard.scoreCard.instructions;
                         $scope.scorecards.importance = editedScoreCard.scoreCard.importance;
                         $scope.scorecards.appt_booked = null;
                         $scope.scorecards.outcome = editedScoreCard.scoreCard.outcome_label;
                          angular.forEach(editedScoreCard.scoreCriteriaList, function(value, key){
                              if(value.criteria_type === 'scale_0-3'){
                                $scope.radioOption = ["0","1","2","3","N/A"];
                              }else if(value.criteria_type === 'scale_0-5'){
                                $scope.radioOption = ["0","1","2","3","4","5","N/A"];
                              }else {
                                $scope.radioOption = ["0","1","2","3","4","5","6","7","8","9","10","N/A"];
                              }
                              if(value.tagged_scorecard_criteria_id !== null){
                                var callCriteriaId = value.tagged_scorecard_criteria_id + "_" + call_id;
                                $scope.placeIcon(parseFloat(value.criteria_timestamp), callCriteriaId, 'criteria', 'icon-marker-active.png', value.criteria_title);
                              }
                              $scope.scorecards.criteriaList.push({'criteria_id':value.criteria_id,'title':value.criteria_title,'ctype':value.criteria_type,'radioOption':$scope.radioOption,'helpText':value.help_text,'criteria_importance':value.criteria_importance.toString(),'selectedCheckPass':value.selectedCheckPass,'is_required':value.is_required, 'tagged_scorecard_criteria_id': value.tagged_scorecard_criteria_id, 'display_order' : value.display_order });
                          });
                      }
                       $(".criteriaProgressLoader").hide();
                       $scope.isUpdateScore = false;
                      $("#progressLoader").css("opacity","1");
                  });
                }
                if(isScored){
                   ScoreDetailsWebService.getCallScores(score_card_id, call_id).then(function(result){ 
                    if(result.data.json !== undefined){
                         var editedScoreCard = result.data.json;
                         if(editedScoreCard.scoreCriteriaList.length == 0 ){
                             $(".criteriaProgressLoader").hide();
                             $("#progressLoader").css("opacity","1");
                         }
                         $scope.scorecards.criteriaList = [];
                         $scope.scorecards.title = editedScoreCard.scoreCard.score_card_title;
                         $scope.scorecards.instruction = editedScoreCard.scoreCard.instructions;
                         $scope.scorecards.importance = editedScoreCard.scoreCard.importance;
                         $scope.displayOrder = editedScoreCard.scoreCriteriaList.display_order;
                         $scope.scorecards.outcome = editedScoreCard.scoreCard.outcome_label;
                          if(editedScoreCard.scoreCard.outcome_answer){
                            if(editedScoreCard.scoreCard.outcome_answer == true){
                                $scope.scorecards.appt_booked = "Yes";
                            }
                            else{ $scope.scorecards.appt_booked = "No";}
                          }else{
                            $scope.scorecards.appt_booked = "No";
                          }
                          angular.forEach(editedScoreCard.scoreCriteriaList, function(value, key){
                              if(value.criteria_type === 'scale_0-3'){
                                $scope.radioOption = ["0","1","2","3","N/A"];
                                value.selectedRadio = value.score_value;
                              }else if(value.criteria_type === 'scale_0-5'){
                                $scope.radioOption = ["0","1","2","3","4","5","N/A"];
                                value.selectedRadio = value.score_value;
                              }else if(value.criteria_type === 'scale_0-10'){
                                $scope.radioOption = ["0","1","2","3","4","5","6","7","8","9","10","N/A"];
                                value.selectedRadio = value.score_value;
                              }else {
                                if(value.score_value === "true")
                                  value.selectedCheckPass = true;
                                else if(value.score_value === "false")
                                  value.selectedCheckFail = true;
                                else if(value.score_value === "N/A")
                                  value.selectedCheckNa = true;
                              }
                              if(value.tagged_scorecard_criteria_id !== null){
                                var callCriteriaId = value.tagged_scorecard_criteria_id + "_" + call_id;
                                $scope.placeIcon(parseFloat(value.criteria_timestamp), callCriteriaId, 'criteria', 'icon-marker-active.png', value.criteria_title);
                              }
                              $scope.scorecards.criteriaList.push({'criteria_id':value.criteria_id,'title':value.criteria_title,'ctype':value.criteria_type,'radioOption':$scope.radioOption,'helpText':value.help_text,'criteria_importance':value.criteria_importance.toString(),'selectedCheckPass':value.selectedCheckPass, 'selectedCheckFail':value.selectedCheckFail, 'selectedCheckNa':value.selectedCheckNa, 'is_required':value.is_required, "selectedRadio": value.selectedRadio, 'tagged_scorecard_criteria_id': value.tagged_scorecard_criteria_id, 'display_order' : value.display_order});
                            });
                      }
                      $(".criteriaProgressLoader").hide();
                      $scope.isUpdateScore = false;
                      $("#progressLoader").css("opacity","1");
                      
                  });
    		      }	  
                }
                // $(".playerProgressLoader").hide();
                // $("#progressLoader").css("opacity","1");
                
            });
        }
      };
    
    var getAllTags=function(){
        $(".tagProgressLoader").show();
          $("#progressLoader").css("opacity","0");
       ScoreDetailsWebService.getTags().then(function(result){
        
        if(result.data.status!='error'){
            $scope.tags=result.data.json
        }
        /*$(".tagProgressLoader").hide();
         $("#progressLoader").css("opacity","1")*/;
        //  $scope.isLoadingApi = false; 
       });
       
    }
   var getTagsByCallId = function(call_id){
    $(".tagProgressLoader").show();
          $("#progressLoader").css("opacity","0");
        $scope.OUtags=[];
      ScoreDetailsWebService.getCallsTags(call_id).then(function(result){
              if(result.data.json !== undefined ){
                var allTags=result.data.json.tags;
                _.each(allTags,function(tag){
                 $scope.OUtags.push({'id':tag.tag_id,'name':tag.tag_name,'OU':tag.org_unit_id,'selected':true});
                })
               
              }
               $(".tagProgressLoader").hide();
               $("#progressLoader").css("opacity","1");
            });
        
    }

    // Function to add call tag option template
    $scope.callTagOptionTemplate = function(actionId) {
      var options = {
          formatNoMatches: function(term) {
              $scope.actionId = actionId;
              var message = "";
              if (term !== '') {
                  message = '<a ng-href="#" ng-click="postcalltag($index, item.call_id, false);">Add tag:"' + term.trim() + '"</a>';
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

              var Uniqresults = _.uniq(results, function(tag){
                  return tag.text.trim();
              });

              query.term = query.term.trim();
              if (query.term.length > 0) {
                  for (var x in Uniqresults) {
                      //console.log('Term:'+query.term+'--Result:'+results[x].text);
                      if (query.term.trim().toLowerCase() == Uniqresults[x].text.trim().toLowerCase()) {
                          found = true;
                          break;
                      }
                  }
                  //add option to top of the list of results
                  if (!found) $('.select2-results').prepend('<li class="select2-no-results"><a ng-href="#" ng-click="postcalltag($index, item.call_id, false);">Add tag:"' + query.term + '"</a></li>');
                  //compile the new html in angular to get it to evaluate the new ng-click
                  if (!$scope.$$phase) {
                      $scope.$apply(function() {
                          $scope.noResultsTag = query.term;
                      });
                  }
              }
              //return list unchanged
              return Uniqresults;
          },
          simple_tags: true,
          allowClear: true
      };
      return options;
  };

   // Function to add tag option template.
    $scope.tagoptiontemplate = function() {
                var options = {
                    formatNoMatches: function(term) {
                        //
                        var message = "";
                        //term = term.trim();
                        if (term !== '') {
                            message = '<a ng-class="{disablePointer: disableAddTagButton}"  ng-click="addTag(term);">Add tag:"' + term.trim() + '"</a>';
                            //message = '<a ng-href="#" ng-click="addTag("'+term+'");">Add tag:"' + term.trim() + '"</a>';
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
                                //
                                if (query.term.trim() == results[x].text.trim()) {
                                    found = true;
                                    break;
                                }
                            }
                            //add option to top of the list of results
                            if (!found) $('.select2-results').prepend('<li class="select2-no-results"><a ng-class="{disablePointer: disableAddTagButton}" ng-href="#" ng-click="addTag(query.term);">Add tag:"' + query.term + '"</a></li>');
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

     $scope.$watch('noResultsTag', function(newVal, oldVal) {
            if (newVal && newVal !== oldVal) {
                $timeout(function() {
                    var noResultsLink = $('.select2-no-results');
                    
                    $compile(noResultsLink.contents())($scope);
                });
            }
        }, true);

	function setS3UrlForAudio(s3url){
		$scope.media = [
			{
				sources: [
					{
						src: s3url,
						type: "audio/mp3"
					}                   
				]
			}
		];
		$scope.config = {
			autoHide: false,
			autoPlay: false,
			sources: $scope.media[0].sources,
			preload: "auto",
			controls: false,
			theme: {
				url: "assets/css/videogular.css"
			}
		};
        
	}

      $scope.showAgent = function(item){
        if(item.ct_user_id !== null || item.ct_user_id !== '' || item.ct_user_id !== undefined){
            var selected = _.find($scope.indentifiedUsers,{ct_user_id:parseInt(item.ct_user_id)});
            return (selected !== undefined) ? selected.username : 'Not set';
        }
      };

      $scope.showScorecard = function(item){
        if(item.score_card_id !== null || item.score_card_id !== '' || item.score_card_id !== undefined){
            var selectedScore = _.find($scope.scorecards,{score_card_id:parseInt(item.score_card_id)});
            return (selectedScore !== undefined) ? selectedScore.score_card_title : 'Need Scorecard';
        }
      };
      $scope.removeComment=function(comment_id){
        
         $bootbox.confirm("Are you sure you want to delete this Comment?", function(clickedOK) {
          if (clickedOK) {
            ScoreDetailsWebService.deleteComment(comment_id).then(function(result) {
              getAllComments(callID);
              if(result.data.status!='error'){
                pinesNotifications.notify({
                  title: 'Select and Score Calls',
                  text:  "Comment deleted successfully",
                  type:  'success'
                });
                
            
              }
              $scope.showCommentBox();
            
              // $scope.notificationActions=[];
              // showListOfNottification();
            });
          }
        });
      }
       $scope.removeResponse=function(comment_response_id,comment_id){
        
        
        
         $bootbox.confirm("Are you sure you want to delete this Comment Response?", function(clickedOK) {
          if (clickedOK) {
            ScoreDetailsWebService.deleteCommentResponse(comment_response_id).then(function(result) {
              if(result.data.status!='error'){
                pinesNotifications.notify({
                  title: 'Select and Score Calls',
                  text:  "Response deleted successfully",
                  type:  'success'
                });
                getAllComments(callID);
                getCommentResponses(comment_id);
              }
               $scope.showCommentBox();
             
              // $scope.notificationActions=[];
              // showListOfNottification();
            });
          }
        });
      }

      var getAllComments=function(call_id){
        $(".commentProgressLoader").show();
          $("#progressLoader").css("opacity","0");
        $scope.isResponseBox= false;
        ScoreDetailsWebService.getAllComments(call_id).then(function (result) {
          $scope.commentDetails = result.data.json;
          $(".comment").remove();
          _.each($scope.commentDetails, function(comment){
              var duration = Number(comment.comment_timestamp);
              var h = Math.floor(duration / 3600);
              var m = Math.floor(duration % 3600 / 60);
              var s = Math.floor(duration % 3600 % 60);
              comment.comment_displayDuration = ('0' + m).slice(-2) + ":" + ('0' + s).slice(-2);
              if(comment.is_from_report && comment.source=='recording'){
                comment.comment_displayDuration = 'From Recording (00:00)';
              }else if(!comment.is_from_report && comment.source=='API'){
                comment.comment_displayDuration = 'From API (00:00)';
              }else{
                comment.comment_displayDuration = 'From Scorecard ('+ comment.comment_displayDuration +')';
              }
              if(!comment.is_from_report){
              $scope.placeIcon(comment.comment_timestamp, comment.comment_id, 'comment', 'icon-post.png', '');}
          });
        });
         $(".commentProgressLoader").hide();
         $("#progressLoader").css("opacity","1");
      }
      var getCommentResponses= function(comment_id){
         ScoreDetailsWebService.getCommentResponses(comment_id).then(function(result) {
            
            if(result.data.status!='success'){
              
            }else{
              $scope.responsDetails=result.data.json
            }
          })
      }
      $scope.makeInprogressFalse = function() {
          $scope.isScoreEditInProgress = false;
      }
      $scope.cancelScorecardAndAgentChange = function() {
        $scope.checkIfscorecardChange = $scope.previouscheckIfscorecardChange;
        $scope.checkIfAssignChange = $scope.previouscheckIfAssignChange;
        
    }
      $scope.loadScoreCard = function(item) {
        $scope.isScoreEditInProgress = true;
        //item.scoreShow = false;
        //item.audioShow = false;
        ScoreDetailsWebService.getActiveScoreCards(item.group_id).then(function(result) {
            if(result.data.json.length > 0){
              //$scope.scorecards =  result.data.json;
              $scope.groupScoreCards =  result.data.json;
            }
          });
          ScoreDetailsWebService.getIdentifiedUsers(item.call_id).then(function(result) {
            console.log("result",result);
            if(result.data.json.length > 0){
              $scope.indentifiedUsers =  result.data.json;
            }
          });
      }

      $scope.saveScoreCallDetail = function(data,item){
        //Check if scorecard For a call is changed
        item.isScoreCardChange =  $scope.checkIfscorecardChange;
        item.isScoreCardAgentChange = $scope.checkIfAssignChange;
        if($scope.previousDataEditable.identifyAgent === undefined && data.identifyAgent && data.identifyAgent.ct_user_id !== "unassigned"){
            ScoreDetailsWebService.checkIfUserValid(data.identifyAgent.ct_user_id, item.group_id).then(function(result) {
                if(result.data.json.length > 0){
                    $scope.saveScoreCallDetailFinally(data,item);
                }else{
                    $bootbox.confirm("The agent you are identifying on the call is not a part of the group the call belongs to. Are you sure you want to proceed?", function (clickedOK) {
                        if (clickedOK) {                      
                            $scope.saveScoreCallDetailFinally(data,item);
                        }else{
                            item.call_title = $scope.previousDataEditable.call_title;
                            item.score_card_id = $scope.previousDataEditable.score_card_id;
                            item.identifyAgent = $scope.previousDataEditable.identifyAgent;
                            item.selectedScorecard = $scope.previousDataEditable.selectedScorecard;
                            item.isScoreCardSelected = $scope.previousDataEditable.isScoreCardSelected;                            
                            if((item.identifyAgent !== undefined) && (item.identifyAgent !== null)){
                                $scope.identifyAgent = item.identifyAgent.ct_user_id;
                            }else{
                                $scope.identifyAgent = undefined;
                            }
                            $scope.isScoreEditInProgress = false;
                        }
                      }) 
                    }
                }); 
        } else if(data.identifyAgent && data.identifyAgent.ct_user_id !== "unassigned" && $scope.previousDataEditable.identifyAgent && data.identifyAgent.ct_user_id !== $scope.previousDataEditable.identifyAgent.ct_user_id){
            ScoreDetailsWebService.checkIfUserValid(data.identifyAgent.ct_user_id, item.group_id).then(function(result) {
                if(result.data.json.length > 0){
                    $scope.saveScoreCallDetailFinally(data,item);
                }else{
                    $bootbox.confirm("The agent you are identifying on the call is not a part of the group the call belongs to. Are you sure you want to proceed?", function (clickedOK) {
                        if (clickedOK) {                      
                            $scope.saveScoreCallDetailFinally(data,item);
                        }else{
                            item.call_title = $scope.previousDataEditable.call_title;
                            item.score_card_id = $scope.previousDataEditable.score_card_id;
                            item.identifyAgent = $scope.previousDataEditable.identifyAgent;
                            item.selectedScorecard = $scope.previousDataEditable.selectedScorecard;
                            item.isScoreCardSelected = $scope.previousDataEditable.isScoreCardSelected;                            
                            if((item.identifyAgent !== undefined) && (item.identifyAgent !== null)){
                                $scope.identifyAgent = item.identifyAgent.ct_user_id;
                            }else{
                                $scope.identifyAgent = undefined;
                            }
                            $scope.isScoreEditInProgress = false;
                        }
                      }) 
                    }
                }); 
          }else {
              
            $scope.saveScoreCallDetailFinally(data,item);
             
            
          }
         
      };
      
      $scope.checkScorecardChange = function(previousScorecardOrAgent , newScorecardOrAgent){
        if((newScorecardOrAgent.ct_user_id != null ||  newScorecardOrAgent.ct_user_id != undefined)){
            
                $scope.checkIfAssignChange = newScorecardOrAgent.ct_user_id;
                $scope.previouscheckIfAssignChange = previousScorecardOrAgent.ct_user_id;
         
        }
        if((newScorecardOrAgent.score_card_id != null ||  newScorecardOrAgent.score_card_id != undefined)){
            
                $scope.checkIfscorecardChange = newScorecardOrAgent.score_card_id;
                $scope.previouscheckIfscorecardChange = previousScorecardOrAgent.score_card_id;
        }

      };


      $scope.saveScoreCallDetailFinally  = function(data,item){
        item.score = 0;
        item.call_scored_by = '';
        item.score_card_id = data !== undefined && data.selectedScorecard !== undefined ? data.selectedScorecard.score_card_id : item.score_card_id;
        item.user_id = data !== undefined && data.identifyAgent !== undefined  ? data.identifyAgent.ct_user_id : item.user_id;
        item.call_title = data !== undefined ? data.call_title : item.call_title;
        $scope.isScoreEditInProgress = false;

          if(item.user_id === undefined)
            item.user_id = null;
          ScoreDetailsWebService.createScorCardCallDetail(item).then(function (result) {
            if (result.data.result === "success") {
                $scope.checkIfscorecardChange = '';
                $scope.checkIfAssignChange = '';  
              item.call_score_card_id = result.data.json.call_score_card_id;
              $scope.previouscheckIfscorecardChange = '';
              $scope.previouscheckIfAssignChange = '';
              if(item.score_card_id){
                item.status = (result.data.json.length > 0 && result.data.json.length != undefined) ? result.data.json[0].status:"unscored";
                item.score = (result.data.json.length > 0 && result.data.json.length != undefined) ? result.data.json[0].score:'0';
                item.score_card_id = ((item.score_card_id === "unassigned") || (result.data.json.length <=0 || result.data.json.length == undefined)) ? null : item.score_card_id;
                item.scorecard = (data.selectedScorecard && data.selectedScorecard.score_card_title === "Unassign")|| (result.data.json.length <=0 || result.data.json.length == undefined)? null : data.selectedScorecard.score_card_title;

                if(item.score_card_id === null){
                    item.status = (result.data.json.length > 0 && result.data.json.length != undefined) ? result.data.json[0].status:"needs_scorecard";
                    item.selectedScorecard = undefined;
                    item.score_date = 'Not scored';  
                }

                
                //item.scorecard = data.selectedScorecard.score_card_title;
              }


              
              if(item.user_id){
                item.ct_user_id = item.user_id === "unassigned" ? null : item.user_id;
                item.agent = (data.identifyAgent == undefined || data.identifyAgent.username === "Unassign") ? null : data.identifyAgent.username;


                if(item.user_id === "unassigned"){
                  item.identifyAgent = undefined;
                }
              }

              var msg = "Call record updated successfully."
              
            if(($scope.score_card_id == undefined || $scope.score_card_id == null) && ($scope.call_title == undefined || $scope.call_title == null || $scope.call_title == '') && ($scope.identifyAgent == undefined)){
                console.log("I am here");
                if((item.score_card_id == null || item.score_card_id == undefined ) && (item.call_title == null || item.call_title == '') && (item.user_id != null && item.user_id != undefined && item.user_id !== "unassigned")){
                    
                    msg = "Identified Agent is added successfully."
                }
                if((item.score_card_id != null || item.score_card_id != undefined ) && (item.call_title == null || item.call_title == '') && (item.user_id == null || item.user_id == undefined || item.user_id == "unassigned")){
                   
                    msg = "Scorecard is added successfully."
                }
                if((item.score_card_id == null || item.score_card_id == undefined ) && (item.call_title !== null && item.call_title !== '' && item.call_title !== undefined) && (item.user_id == null || item.user_id == undefined || item.user_id == "unassigned")){
                   
                    msg = "Call Title  is added successfully."
                }
                if((item.score_card_id == null || item.score_card_id == undefined ) && (item.call_title == null || item.call_title == '' || item.call_title == undefined) && (item.user_id == null || item.user_id == undefined || item.user_id == "unassigned")){
                   
                    msg = "Nothing is added in Call record."
                }
              
            }
            else if(($scope.score_card_id !== undefined && $scope.score_card_id !== null) && ($scope.call_title == undefined || $scope.call_title == null || $scope.call_title == '') && ($scope.identifyAgent !== undefined)){
                console.log("SC & agent is there ");
                if((item.score_card_id != null && item.score_card_id != undefined && item.score_card_id == $scope.score_card_id) && (item.call_title !== null && item.call_title != '' && item.call_title !=  undefined) && (item.user_id !== null && item.user_id !== undefined && item.user_id !=="unassigned" && item.user_id == $scope.identifyAgent)){
                   
                    msg = "Call Title is added successfully."
                }
                if((item.score_card_id != null && item.score_card_id != undefined && item.score_card_id == $scope.score_card_id ) && (item.call_title == null || item.call_title == '' || item.call_title ==  undefined) && (item.user_id =="unassigned")){
                    
                    msg = "Identified Agent is removed successfully."
                }
                if((item.score_card_id == null || item.score_card_id == undefined ) && (item.call_title == null || item.call_title == '' || item.call_title ==  undefined) &&(item.user_id !== null && item.user_id !== undefined && item.user_id !=="unassigned" && item.user_id == $scope.identifyAgent)){
                    
                    msg = "Scorecard is removed successfully."
                }
                if((item.score_card_id != null && item.score_card_id != undefined && item.score_card_id !== $scope.score_card_id ) && (item.call_title == null || item.call_title == '' || item.call_title == undefined) && (item.user_id !== null && item.user_id !== undefined && item.user_id !=="unassigned" && item.user_id == $scope.identifyAgent)){
                    
                    msg = "Scorecard is updated successfully.";
                    if(item.scoreShow){
                      item.scoreShow = false;
                      item.audioShow = false;
                    }
                }
                if((item.score_card_id != null && item.score_card_id != undefined && item.score_card_id == $scope.score_card_id ) && (item.call_title == null || item.call_title == '' || item.call_title == undefined) && (item.user_id !== null && item.user_id !== undefined && item.user_id !=="unassigned" && item.user_id !== $scope.identifyAgent)){
                    
                    msg = "Identified Agent is updated successfully."
                }
              
               
            }
            else if(($scope.score_card_id !== undefined && $scope.score_card_id !== null) && ($scope.call_title != undefined && $scope.call_title != null && $scope.call_title != '') && ($scope.identifyAgent == undefined)){
                console.log("for SC & CT is there");
                if((item.score_card_id != null && item.score_card_id != undefined && item.score_card_id == $scope.score_card_id) && (item.call_title !== null && item.call_title != '' && item.call_title == $scope.call_title) && (item.user_id !== null && item.user_id !== undefined && item.user_id !=="unassigned")){
                    
                    msg = "Identified Agent is added successfully."
                }
                if((item.score_card_id != null && item.score_card_id != undefined && item.score_card_id == $scope.score_card_id) && (item.call_title == null || item.call_title == '' || item.call_title == undefined ) && (item.user_id == null || item.user_id == undefined || item.user_id =="unassigned")){
                    
                    msg = "Call Title is removed successfully."
                }
                if((item.score_card_id == null || item.score_card_id == undefined ) && (item.call_title !== null && item.call_title != '' && item.call_title == $scope.call_title) && (item.user_id == null || item.user_id == undefined || item.user_id =="unassigned")){
                    
                    msg = "Scorecard is removed successfully."
                }
                if((item.score_card_id != null && item.score_card_id != undefined && item.score_card_id !== $scope.score_card_id) && (item.call_title !== null && item.call_title != '' && item.call_title == $scope.call_title) && (item.user_id == null || item.user_id == undefined || item.user_id =="unassigned")){
                    
                    msg = "Scorecard is updated successfully."
                    if(item.scoreShow){
                      item.scoreShow = false;
                      item.audioShow = false;
                    }
                }
                if((item.score_card_id != null && item.score_card_id != undefined && item.score_card_id == $scope.score_card_id) && (item.call_title !== null && item.call_title != '' && item.call_title !== $scope.call_title) && (item.user_id == null || item.user_id == undefined || item.user_id =="unassigned")){
                    
                    msg = "Call Title is updated successfully."
                }
                
            }
            else if(($scope.score_card_id == undefined || $scope.score_card_id == null) && ($scope.call_title != undefined && $scope.call_title != null && $scope.call_title != '') && ($scope.identifyAgent !== undefined)){
                console.log("for Agent & CT is there");
                if((item.score_card_id != null && item.score_card_id != undefined ) && (item.call_title !== null && item.call_title != '' && item.call_title == $scope.call_title) && (item.user_id !== null && item.user_id !== undefined && item.user_id !=="unassigned" && item.user_id == $scope.identifyAgent )){
                   
                    msg = "Scorecard is added successfully."
                }
                if((item.score_card_id == null || item.score_card_id == undefined ) && (item.call_title == null || item.call_title == '' || item.call_title == undefined) && (item.user_id !== null && item.user_id !== undefined && item.user_id !=="unassigned" && item.user_id == $scope.identifyAgent )){
                   
                    msg = "Call title is removed successfully."
                }
                if((item.score_card_id == null || item.score_card_id == undefined ) && (item.call_title !== null && item.call_title != '' && item.call_title == $scope.call_title) && (item.user_id =="unassigned" || item.user_id == null || item.user_id == undefined)){
                    
                    msg = "Identified Agent is removed successfully."
                }
                if((item.score_card_id == null || item.score_card_id == undefined ) && (item.call_title !== null && item.call_title != '' && item.call_title !== $scope.call_title) && (item.user_id !== null && item.user_id !== undefined && item.user_id !=="unassigned" && item.user_id == $scope.identifyAgent )){
                    
                    msg = "Call title is updated successfully."
                }
                if((item.score_card_id == null || item.score_card_id == undefined ) && (item.call_title !== null && item.call_title != '' && item.call_title == $scope.call_title) && (item.user_id !== null && item.user_id !== undefined && item.user_id !=="unassigned" && item.user_id != $scope.identifyAgent )){
                    
                    msg = "Identified Agent is updated successfully."
                }
                
            }
            else if(($scope.score_card_id == undefined || $scope.score_card_id == null) && ($scope.call_title == undefined || $scope.call_title == null || $scope.call_title == '') && ($scope.identifyAgent !== undefined)){
                console.log("only for  agent is there ");
                if((item.score_card_id != null && item.score_card_id != undefined ) && (item.call_title == null || item.call_title == '' || item.call_title == undefined) && (item.user_id !== null && item.user_id !== undefined && item.user_id !=="unassigned")){
                    
                    msg = "Scorecard is added successfully."
                }
                if((item.score_card_id == null || item.score_card_id == undefined ) && (item.call_title != null && item.call_title != '' ) && (item.user_id !== null && item.user_id !== undefined && item.user_id !=="unassigned")){
                    
                    msg = "Call Title is added successfully."
                }
                if((item.score_card_id == null || item.score_card_id == undefined ) && (item.call_title == null || item.call_title == '' || item.call_title == undefined) && ( item.user_id =="unassigned")){
                    
                    msg = "Identified Agent is removed successfully."
                }
                if((item.score_card_id == null || item.score_card_id == undefined ) && (item.call_title == null || item.call_title == '' || item.call_title == undefined) && (item.user_id !== null && item.user_id !== undefined && item.user_id !=="unassigned" && item.user_id !== $scope.identifyAgent)){
                    
                    msg = "Identified Agent is updated successfully."
                }
               

            }
            else if(($scope.score_card_id !== undefined && $scope.score_card_id !== null) && ($scope.call_title == undefined || $scope.call_title == null || $scope.call_title == '') && ($scope.identifyAgent == undefined)){
                console.log("for SC  is there ");
               if((item.score_card_id != null && item.score_card_id != undefined && item.score_card_id == $scope.score_card_id) && (item.call_title == null || item.call_title == '' || item.call_title == undefined) && (item.user_id !== null && item.user_id !== undefined && item.user_id !=="unassigned")){
                   
                    msg = "Identified Agent is added successfully."
                }
                if((item.score_card_id != null && item.score_card_id != undefined && item.score_card_id == $scope.score_card_id) && (item.call_title !== null && item.call_title != '') && (item.user_id == null || item.user_id == undefined || item.user_id =="unassigned")){
                    
                    msg = "Call Title is added successfully."
                }
                if((item.score_card_id != null && item.score_card_id != undefined && item.score_card_id !== $scope.score_card_id) && (item.call_title == null || item.call_title == '' || item.call_title == undefined) && (item.user_id == null || item.user_id == undefined || item.user_id =="unassigned")){
                    
                    msg = "Scorecard is updated successfully."
                    if(item.scoreShow){
                      item.scoreShow = false;
                      item.audioShow = false;
                    }
                }
                if((item.score_card_id == null || item.score_card_id == undefined ) && (item.call_title == null || item.call_title == '' || item.call_title == undefined) && (item.user_id == null || item.user_id == undefined || item.user_id =="unassigned")){
                    
                    msg = "Scorecard is removed successfully."
                }
               
            }
            else if(($scope.score_card_id == undefined || $scope.score_card_id == null) && ($scope.call_title !== undefined && $scope.call_title !== null && $scope.call_title !== '') && ($scope.identifyAgent == undefined)){
                console.log("for CT  is there ");
               if((item.score_card_id == null || item.score_card_id == undefined ) && (item.call_title !== null && item.call_title != '' && item.call_title == $scope.call_title ) && (item.user_id !== null && item.user_id !== undefined && item.user_id !=="unassigned")){
                    
                    msg = "Identified Agent is added successfully."
                }
                if((item.score_card_id != null && item.score_card_id != undefined ) && (item.call_title !== null && item.call_title != '' && item.call_title == $scope.call_title) && (item.user_id == null || item.user_id == undefined || item.user_id =="unassigned")){
                    
                    msg = "Scorecard is added successfully."
                }
                if((item.score_card_id == null || item.score_card_id == undefined ) && (item.call_title !== null && item.call_title != '' && item.call_title !== $scope.call_title ) && (item.user_id == null || item.user_id == undefined || item.user_id =="unassigned")){
                   
                    msg = "Call Title is updated successfully."
                }
                if((item.score_card_id == null || item.score_card_id == undefined ) && (item.call_title == null || item.call_title == '' || item.call_title == undefined ) && (item.user_id == null || item.user_id == undefined || item.user_id =="unassigned")){
                    
                    msg = "Call Title is removed successfully."
                }
               
            }
            else  if(($scope.score_card_id !== undefined && $scope.score_card_id !== null) && ($scope.call_title !== undefined && $scope.call_title !== null && $scope.call_title !== '') && ($scope.identifyAgent !== undefined)){
                console.log("For updated");
               
                if((item.score_card_id != $scope.score_card_id && item.score_card_id != null) &&  item.call_title == $scope.call_title && item.user_id == $scope.identifyAgent){
                    
                    msg = "Scorecard is updated successfully."
                    if(item.scoreShow){
                      item.scoreShow = false;
                      item.audioShow = false;
                    }
                }
                if(item.score_card_id == $scope.score_card_id && (item.call_title != '' && item.call_title != $scope.call_title && item.call_title != undefined) && item.user_id == $scope.identifyAgent){
                    
                    msg = "Call Title is updated successfully."
                }
                if(item.score_card_id == $scope.score_card_id && item.call_title == $scope.call_title && (item.user_id != $scope.identifyAgent && item.user_id != "unassigned")){
                    
                    msg = "Identified Agent is updated successfully."
                }
               
                if((item.score_card_id != null && item.score_card_id != undefined && item.score_card_id == $scope.score_card_id) && (item.call_title != '' && item.call_title == $scope.call_title && item.call_title != undefined) && item.user_id == "unassigned"){
                    
                    msg = "Identified Agent is removed successfully."
                }
                if(item.score_card_id == null && (item.call_title != '' && item.call_title == $scope.call_title && item.call_title != undefined) && (item.user_id == $scope.identifyAgent && item.user_id != "unassigned")){
                    
                    msg = "Scorecard is removed successfully."
                }
                if((item.score_card_id != null && item.score_card_id != undefined && item.score_card_id == $scope.score_card_id) && (item.call_title == undefined || item.call_title == '') && (item.user_id == $scope.identifyAgent && item.user_id != "unassigned")){
                    
                    msg = "Call Title is removed successfully."
                }
                
            }
            
              pinesNotifications.notify({
                title: 'Select and Score Calls',
                text:  msg,
                type:  'success'
              });
            }else{
              pinesNotifications.notify({
                title: 'Select and Score Calls',
                text:  result.data.err,
                type:  'error'
              });
            }
          });
        //}
      };

     
    $scope.changeScoreStatus = function(data,item){
        item.status = "reviewed";
        item.call_score_status = "reviewed";

        $scope.date = new Date();
        $scope.date = moment($scope.date).tz($rootScope.timezone).format("MM-DD-YYYY h:mm:ss a");

        item.reviewer = $rootScope.fullName + " | " + $rootScope.userEmail;
        item.reviwed_date_time = $scope.date;
        ScoreDetailsWebService.updateScoreStatus(item.call_id,item.call_score_status).then(function (result) {
          if (result.data.status === "success") {
            pinesNotifications.notify({
              title: 'Select and Score Calls',
              text:  "Call Reviewed successfully.",
              type:  'success'
            });
          }else{
            pinesNotifications.notify({
              title: 'Select and Score Calls',
              text:  result.data.err,
              type:  'error'
            });
          }
        });
          
    };

      $scope.updateScoreCallDetail = function(data,item, isNew){
        var validationFlag= false;
        item.call_scored_by = $rootScope.email;
        item.score_card_id = data !== undefined ? data.selectedScorecard : item.score_card_id;
        item.user_id = data !== undefined ? data.identifyAgent : item.user_id;
        $scope.totalGrade = 0;
        $scope.totalImportance = 0;
        $scope.finalGrade = 0;
        $scope.radioScore = 10;
        item.status = "scored";
        item.rating = $scope.rating;
        item.isNew = isNew;
        //item.replica_id = $scope.scorecardReplica_id;
        item.scorecard_rating = $scope.scorecards.criteriaList;
        item.comments = $scope.comment;
        item.tags = $scope.selTags;
          //check validation for manatory filed
          _.map($scope.scorecards.criteriaList,function(criteria) {
                if(criteria.is_required ){
                    if(criteria.ctype === 'scale_0-3' || criteria.ctype === 'scale_0-5'|| criteria.ctype === "scale_0-10"){
                        if(!criteria.selectedRadio){
                            validationFlag = true;
                        }
                    }
                    if(criteria.ctype === "Pass/Fail"){
                        if(criteria.selectedCheckPass != true && criteria.selectedCheckFail != true && criteria.selectedCheckNa != true){
                            validationFlag = true;
                        }
                    }
                }
            });

            if($scope.scorecards.appt_booked==undefined){
                validationFlag = true;
            }else{
                item.appt_booked = ($scope.scorecards.appt_booked  === 'Yes') ? true : false;
            }

            if(validationFlag){
                item.status = "unscored"
                pinesNotifications.notify({
                    title: 'Select and Score Calls',
                    text:  "Please make sure you have answered all mandatory questions before clicking on Done button",
                    type:  'error'
                });
               return false;          
            }

          _.map($scope.scorecards.criteriaList,function(criteria) {
                var score = 0;
                var importance = criteria.criteria_importance;                
                if(criteria.ctype === 'scale_0-3'){
                    $scope.radioScore = 3;
                }else if(criteria.ctype === 'scale_0-5'){
                    $scope.radioScore = 5;
                }else{
                    $scope.radioScore = 10;
                }
                criteria.selectedRadio = criteria.selectedRadio == "undefined" ? undefined : criteria.selectedRadio;

                if(criteria.selectedCheckPass){
                    score = 1;
                    $scope.totalImportance += parseInt(importance);
                } else if(criteria.selectedCheckFail){
                    score = 0;
                    $scope.totalImportance += parseInt(importance);
                } else if(criteria.selectedCheckNa){
                    //score = 1;
                    //$scope.totalImportance += parseInt(importance);
                } else if(criteria.selectedRadio) {
                  //$scope.totalImportance += parseInt(importance);
                    if(criteria.selectedRadio === 'N/A'){
                      //score = parseFloat(parseInt(criteria.radioOption.length - 2)/$scope.radioScore);
                    } else {
                      $scope.totalImportance += parseInt(importance);
                      score = parseFloat(parseInt(criteria.selectedRadio)/$scope.radioScore);
                    }
                }

                if(!isNaN(score)){
                    criteria.criteria_score = (importance > 0) ? (score * importance) : 0;
                    $scope.finalGrade += criteria.criteria_score;
                }else{
                    criteria.criteria_score = 0;
                }
                criteria.score = score;
                criteria.criteria_score = Math.round(parseFloat((criteria.criteria_score)).toFixed(2));
          });

          // Ingore outcome lable importance in the score calculation
         /*if($scope.scorecards.appt_booked === "Yes"){
            $scope.finalGrade += parseInt($scope.scorecards.importance);
          }*/

          _.map($scope.scorecards.criteriaList,function(criteria){
                var importance = criteria.criteria_importance;
                if(criteria.ctype === 'scale_0-3'){
                    $scope.radioScoreForCriteria = 3;
                }else if(criteria.ctype === 'scale_0-5'){
                    $scope.radioScoreForCriteria = 5;
                }else{
                    $scope.radioScoreForCriteria = 10;
                }              
                if(criteria.selectedCheckPass){
                    var score = parseInt(importance);
                    return criteria.criteria_score = Math.round(parseFloat(score/parseInt(criteria.criteria_importance) * 100).toFixed(2));
                } else if(criteria.selectedCheckFail){
                    var score = 0;
                    return criteria.criteria_score = 0;
                } else if(criteria.selectedCheckNa){
                  var score = parseInt(importance);
                  return criteria.criteria_score = Math.round(parseFloat(score/parseInt(criteria.criteria_importance) * 100).toFixed(2));
                } else if(criteria.selectedRadio) {
                    if(criteria.selectedRadio === 'N/A') {
                      score =  Math.round((parseFloat(parseInt(criteria.radioOption.length - 2)/$scope.radioScoreForCriteria)*100).toFixed(2));
                    } else {
                      score =  Math.round((parseFloat(parseInt(criteria.selectedRadio)/$scope.radioScoreForCriteria)*100).toFixed(2));
                    }
                    return criteria.criteria_score = score;
                }
          })

          //$scope.totalImportance += parseInt($scope.scorecards.importance); // Ingore outcome lable importance in the score calculation
          if($scope.finalGrade == 0 && $scope.totalImportance == 0){
            item.score = 0;
          } else {
            item.score = Math.round(parseFloat($scope.finalGrade/$scope.totalImportance * 100).toFixed(2));
            item.score = parseFloat(item.score);
          }
          
          if (Number(item.score) === item.score && item.score % 1 === 0) {
              item.score = parseInt(item.score);
          }
          
          ScoreDetailsWebService.updateScorCardCallDetail(item).then(function (result) {
            if (result.data.result === "success") {
                $scope.date = new Date();
                $scope.date = moment($scope.date).tz($rootScope.timezone).format("MM-DD-YYYY h:mm:ss a");
                $scope.updateScoreCallDetail1 = false;
                item.status = "scored";
                item.scorer = $rootScope.fullName + " | " + $rootScope.userEmail;
                item.score_date = $scope.date;
            var msg = "Call Scored Successfully.";

            if(!isNew){
              msg = "Call Scores updated successfully.";
              pinesNotifications.notify({
                  title: 'Select and Score Calls',
                  text:  msg,
                  type:  'success'
              });
            }
            
            }else{
                pinesNotifications.notify({
                    title: 'Select and Score Calls',
                    text:  result.data.err,
                    type:  'error'
                });
            }
        });         
      };

      $scope.redirectScheduledEditor = function(whichReport) {
          $scope.applyFilterParams();
          $scope.loadReportBasedOnQueryString();
          //determineReportQueryParams();
          //$location.url($location.path()+'?'+$.param($scope.urlParams));
      };

      $scope.pageChanged = function(newPage) {
         if(!$scope.sortedPagination){
                $scope.offset = ($scope.pageSize * ($scope.pagination.current - 1));                        console.log('PAGE CHANGED');
                $scope.applyFilter();                       $scope.offset = ($scope.pageSize * ($scope.pagination.current - 1));                    
                    $scope.applyFilter();
                }
                $scope.sortedPagination = false;
          // $scope.offset = ($scope.pageSize * ($scope.pagination.current - 1));
          // $scope.applyFilter();
      };

			$scope.noPulse = function() {
				if(document.getElementsByClassName('pulse').length !== 0) {
					document.getElementsByClassName('pulse')[0].classList.remove('pulse');
				}
			};

            $scope.resizeWindow = function() {
                setTimeout(function() {
                    $(window).trigger('resize');
                }, 100);
            };

          

            $scope.report = "set-select-score";
           
            // 

            $scope.isReadonly = false;
            $scope.isTagAccess = true;
            $scope.isClick = true;

            if ($scope.userAccess && ($scope.userAccess.campaign === undefined || $scope.userAccess.campaign < 5)) {
                $scope.isReadonly = true;
            }
            // if ($scope.userAccess && ($scope.userAccess.tag < 5 || $scope.userAccess.tag === undefined)) {
            //     $scope.isTagAccess = false;
            // }

            $scope.getHeader = function () { return [ "Call ID", "Status", " Call Date/Time", "Duration", "Group", "Group ID", "Group External ID", "Identified Agent", "Call Title", "Tags", "Comments","Commenter", "Comment Date/Time", "Scorecard", "Score", "Outcome", "Selector", "Scorer", "Scored Date/Time", "Reviewer", "Reviewed Date/Time","Play Call"]; };
            $scope.getCSVData = function (formate) {
                var scorecardData = [];
                $scope.scorecardList = [];
                $scope.groupsReportFileName = groupsReportName + "." + formate;
                  var deferred = $q.defer();
                ScoreDetailsWebService.getCallsDetailsList($.param($scope.urlParams)).then(function(result) {
                    if (result.data.json.call.length > 0) {
                        $scope.scorecardList = result.data.json.call;
                        for (var i = 0; i < $scope.scorecardList.length; i++) {
                          if($scope.scorecardList[i].user_id !== null || $scope.scorecardList[i].user_id !== '' || $scope.scorecardList[i].user_id !== undefined){
                              var selected = _.find($scope.agents,{ct_user_id:parseInt($scope.scorecardList[i].user_id)});
                              $scope.scorecardList[i].username = (selected !== undefined) ? selected.username : 'Not set';
                          }

                          if($scope.scorecardList[i].score_card_id !== null || $scope.scorecardList[i].score_card_id !== '' || $scope.scorecardList[i].score_card_id !== undefined){
                              var selectedScore = _.find($scope.scorecardData,{score_card_id:parseInt($scope.scorecardList[i].score_card_id)});
                              $scope.scorecardList[i].score_card_name = (selectedScore !== undefined) ? selectedScore.score_card_name : 'Need Scorecard';
                          }
                          var commentStr = [];
                          var commentStr = $scope.scorecardList[i].comment_date_time;

                          var comment = commentStr.split(",");
                          var formateDate = '';
                          for (var j = 0; j < comment.length; j++) {
                              formateDate += moment.utc(comment[j]).format("MM-DD-YYYY h:mm:ss a");
                              if (j !== comment.length - 1) {
                                  formateDate += ",";
                              }

                          }
                          scorecardData.push({
                              a: $scope.scorecardList[i].call_id,
                              b: $scope.scorecardList[i].status  === 'needs_scorecard' ? 'Needs Scorecard' : $scope.scorecardList[i].status.charAt(0).toUpperCase() + $scope.scorecardList[i].status.substr(1),                          
                              c: $scope.scorecardList[i].call_date_time ? moment.utc($scope.scorecardList[i].call_date_time).format("MM-DD-YYYY h:mm:ss a") : '',
                              d: $scope.scorecardList[i].duration,
                              e: $scope.scorecardList[i].group_name,
                              f: $scope.scorecardList[i].group_id,
                              g: $scope.scorecardList[i].group_external_id,
                              h: $scope.scorecardList[i].agent,
                              i: $scope.scorecardList[i].call_title,
                              j: $scope.scorecardList[i].tag,
                              k: $scope.scorecardList[i].comment,
                              l: $scope.scorecardList[i].commenter,
                              m: $scope.scorecardList[i].comment_date_time ? formateDate : '',
                              n: $scope.scorecardList[i].scorecard,
                              o: $scope.scorecardList[i].score,
                            //   o: $scope.scorecardList[i].outcome == true ? 'Yes' : 'No',
                              p: $scope.scorecardList[i].outcome,
                              q: $scope.scorecardList[i].selector,                        
                              //q: $scope.scorecardList[i].selected_date_time ? moment.utc($scope.scorecardList[i].selected_date_time).format("MM-DD-YYYY h:mm:ss a") : '',
                              r: $scope.scorecardList[i].scorer,
                              s: $scope.scorecardList[i].score_date  ? moment.utc($scope.scorecardList[i].score_date).format("MM-DD-YYYY h:mm:ss a") : '',
                              t: $scope.scorecardList[i].reviewer,
                              u: $scope.scorecardList[i].reviwed_date_time  ? moment.utc($scope.scorecardList[i].reviwed_date_time).format("MM-DD-YYYY h:mm:ss a") : '',
                              v: $scope.scorecardList[i].play_call
                          });
                          formateDate = ''
                }
                
                // templateData.push("Here")
                deferred.resolve(scorecardData);
              		  if($rootScope.isSafari){
              		    // var reportName = "scorecardCallDetail";
              		    // if(formate === 'tsv'){ reportName = "scorecardCallDetail";}
              		    deferred.resolve(JSONToCSVConvertor(scorecardData,$scope.groupsReportFileName,true,formate));
              		  }
             }
           });
           if(!$rootScope.isSafari){
       		    return deferred.promise;
       		}
        };
            $scope.exportPDF = function() {
              var tempCustomSource = [];
              // $scope.customSourceMapping = ['Custom Source 1','Custom Source 2','Custom Source 3','Custom Source 4','Custom Source 5'];
              $scope.scoreDetailsColumnMapping.forEach( function(ele) {

                    var obj= {
                      label : ele.label,
                      visible : ele.visible
                    };

                    tempCustomSource.push(obj);
                    ele.visible = true;
              });
                var pdf = new jsPDF('l', 'pt', 'legal');
                var options = {
                    pagesplit: true
                };
                pdf.addHTML($("#callsData"), options, function() {
                    var string = pdf.output('datauristring');
                    //$('.preview-pane').attr('src', string);
                    setTimeout(function() {
                        pdf.save('call-detail-scoreard.pdf');
                        //     $(".buttons").show();
                    }, 100);
                    tempCustomSource.forEach(function(ele) {
                      $scope.scoreDetailsColumnMapping.forEach(function(obj) {
                          if(ele.label === obj.label){
                            obj.visible = ele.visible;
                        }
                      });
                    });
                });
            };

            $scope.call_tags = [];
            $scope.selCallTags = {};
            $scope.call_tagslength = [];

            var internalMappedNames = {};

            // reference keys on the aggregated data objects
            internalMappedNames.aggregate_property_keys = {
                call_id: "call_id",
                date_time: "call_started",
                group_name: "org_unit_name",
                username: "user_id",
                score_card_name: "score_card_id",
                score_date: "call_scored_date",
                score:"score"
            };

            // values displayed at top of columns
            internalMappedNames.dataTableHeaderValues = {
                call_id: "Call ID",
                date_time: "Call Date/Time",
                group_name: "Group Name",
                username: "Agent",
                score_card_name: "Scorecard",
                score_date: "Score Date",
                score:"Score"
            };

            function createHeaderValueToAggKeyName() {
                var headerValues = internalMappedNames.dataTableHeaderValues;
                var aggKeyNames = internalMappedNames.aggregate_property_keys;


                var headerValueToAggKeyName = {};
                headerValueToAggKeyName[headerValues.call_id] = aggKeyNames.call_id;
                headerValueToAggKeyName[headerValues.date_time] = aggKeyNames.date_time;
                headerValueToAggKeyName[headerValues.group_name] = aggKeyNames.group_name;
                headerValueToAggKeyName[headerValues.username] = aggKeyNames.username;
                headerValueToAggKeyName[headerValues.score_card_name] = aggKeyNames.score_card_name;
                headerValueToAggKeyName[headerValues.score_date] = aggKeyNames.score_date;
                headerValueToAggKeyName[headerValues.score] = aggKeyNames.score;
                return headerValueToAggKeyName;
            }

            function getDataGridHeaderValues() {
                var dataTableHVs = internalMappedNames.dataTableHeaderValues;

                var valuesToDisplayInDataGridHeaders = [

                    // These can be manually added in since they're static
                    dataTableHVs.call_id,
                    dataTableHVs.date_time,
                    dataTableHVs.group_name,
                    dataTableHVs.username,
                    dataTableHVs.score_card_name,
                    dataTableHVs.score_date,
                    dataTableHVs.score
              ];

                // array of string names of the header values that go at the top of the data grid
                return valuesToDisplayInDataGridHeaders;
            }
            //$scope.advFiltersAreApplied = false;
            $scope.simpleSearchApplied = true;
            $scope.simpleSearchPlaceholder = '';

            function determineReportQueryParams() {
                $scope.applyFilterParams();
                //$scope.urlParams = {};
                //$rootScope.$broadcast('start_url_assembly', 'blank');

				// Update pagination header -- DON'T STOMP ME
				setTimeout(function() {
					var offset = ($location.search().offset !== undefined) ? parseInt($location.search().offset) : 0;
					$scope.pagination.current = (parseInt(offset / 100) + 1);
					return $scope.urlParams;
				}, 1000);
            }

            // Scope methods used when user uses filter that requires a new data-set from backend
            $scope.changeDateRange = function() {
                $scope.filterReset();
				$window.sessionStorage.report_start_date = $scope.drp_start;
				$window.sessionStorage.report_end_date = $scope.drp_end;
                $scope.offset = 0;
                $scope.pagination.current = 1;
				$scope.horsemanFlag = false;
				$scope.filterApplied = false;
				$scope.applyFilter();
				$scope.isScoreEditInProgress = false;
            };

       

            /////////////////////////
            //Filter Section
            /////////////////////////
            $scope.updateSimpleFilter = function(cleanUpDS) {
                //if adv filters are applied, always update $scope.dataTableValues with dcfilters && advFilters
                // otherwise, only update the $scope.dataTableValues with dcfilters
                // Using adv filter to update DS
                $scope.advFiltersAreApplied = false;


                if ($scope.simpleSearchFilter !== undefined) {
                    $scope.filter = $scope.simpleSearchFilter;
                    $scope.filtertype = 's';
                } else {
                    $scope.filter = '';
                    $scope.filtertype = 'a';
                }
                $scope.offset = 0;
                $scope.pagination.current = 1;
                $scope.applyFilterParams();

                return;
            };


            $scope.mappedHeaderValues = createHeaderValueToAggKeyName();
            $scope.headerNames = getDataGridHeaderValues();

            $scope.toggleFilterUsed = function() {
                $scope.advFiltersAreApplied = !$scope.advFiltersAreApplied;
                $scope.simpleSearchApplied = !$scope.simpleSearchApplied;

                $scope.initializeAdvFilterDefinitions();
                $scope.updateAdvancedFilter(true);
                $scope.applyFilterParams();
            };

            $scope.disableButton = function(index) {
                if ($scope.audio !== undefined && $scope.audio[index] !== undefined && !isNaN($scope.audio[index].duration)) {
                    return false;
                }
                return true;
            };



            $scope.openEmail = function(size, s3URL) {
                $scope.s3URL = s3URL;
                var modalInstance = $uibModal.open({
                    animation: $scope.animationsEnabled,
                    templateUrl: 'assets/partials/emailCall.html',
                    controller: 'ModalInstanceCtrl',
                    size: size,
                    resolve: {
                        s3URL: function() {
                            return s3URL;
                        }
                    }
                });

                modalInstance.result.then(function(selectedItem) {
                    $scope.selected = selectedItem;
                }, function() {

                });
            };


            // video angular


        $scope.currentTime = 0;
        $scope.state = null;
        $scope.volume = 1;
        $scope.isCompleted = false;
        $scope.API = null;
       
        $scope.commentDetails = [];
        $scope.comment_id = 0;
        $scope.totalTime = 0;
        $scope.isProcessing= false;
        $scope.isResponseBox= false;
        $scope.onPlayerReady = function (API) {
            $scope.API = API;
        };

        $scope.onError = function (event) {
            
            
        };

        $scope.onCompleteVideo = function (item) {
            $scope.isCompleted = true;
            if(!item.is_call_listened) {
              $scope.setCallToListen(item.call_id);
              item.is_call_listened = true;
            }
        };
        
        $scope.setCallToListen = function(callId) {
          var data = {
            call_id: callId,
            userId: $rootScope.userId
          };
          ScoreDetailsWebService.setCallListened(callId, data).then(function(result) {
            if(result.data.status === "success"){
              console.log('Result', result);
            } 
          });
        };

        $scope.onUpdateState = function (state) {
            $scope.state = state;
        };

        $scope.onChangeSource = function (source) {
            $scope.source = source;
        };

        $scope.onUpdateTime = function (currentTime, totalTime) {
            $scope.currentTime = currentTime;
            if(!isNaN(totalTime))
              $scope.totalTime = totalTime;
        };

        $scope.onUpdateVolume = function (newVol) {
            $scope.volume = newVol;
		};
		

        $scope.saveAndRemoveCallCriteria = function (currentTime,criteria,call_id, isChecked,displayOrder) {
            $scope.criteriaInProgress = true;
            var msg = "Call Criteria is added successfully";
              var bodyData = {
                scorecard_criteria_id: criteria.criteria_id,
                criteria_timestamp: currentTime,
                ct_user_id: $rootScope.userId,
                isChecked:isChecked,
                displayOrder:criteria.display_order
              }

            if(!isChecked)
                msg = "Call Criteria is removed successfully"
            

            ScoreDetailsWebService.addAndRemoveCriteria(call_id, bodyData).then(function(result) {
                if(result.data.status === "success"){
                    $scope.criteriaInProgress = false;
                  // pinesNotifications.notify({
                  //   title: 'Select and Score Calls',
                  //   text:  msg,
                  //   type:  'success'
                  // });
                }
                var callCriteriaId = criteria.criteria_id + "_" + call_id;
                if(isChecked){
                  $scope.placeIcon(currentTime, callCriteriaId, 'criteria', 'icon-marker-active.png', criteria.title);
                  criteria.tagged_scorecard_criteria_id = criteria.criteria_id;
                }else{
                  var tempMarkerId = "marker_criteria" + "_" + callCriteriaId;
                  $("#" + tempMarkerId).remove();
                  criteria.tagged_scorecard_criteria_id = null;
                }
            });            
        };
        var commentID,parentResponId;
        $scope.commentResponse=function(comment_id,comment_response_id){
                //add css here
        
                $scope.isResponseBox=true;
                commentID = comment_id;
                parentResponId = comment_response_id;
                $scope.isComment=false;
        }
        $scope.cancelChange = function(){
            $scope.isComment = true;
        }
        $scope.$watch('isComment', function(newVal, oldVal) {
            if(newVal){
                $scope.myplaceholder="Type your comment here";
            }else{
                $scope.myplaceholder="Type your response here";
            }
        }, true);
        
        $scope.toggleResponses=function(comment_id){
          
            //here
           _.map($scope.commentDetails,function(comment){
            
            if(comment.comment_id != comment_id){
              comment.showResponses = false;
            }else {
			  comment.showResponses = !comment.showResponses;
                // getCommentResponse commented due to not needed anymore becuase we are already fetching replies with comments
             // getCommentResponses(comment_id); 
            }
        });
          $scope.isRespons=!$scope.isRespons;
          if($scope.isRespons==true) {
            // getCommentResponse commented due to not needed anymore becuase we are already fetching replies with comments
            // getCommentResponses(comment_id);
          }

        }
        $scope.showCommentBox=function(){
            $scope.isComment=true;
        }
        $scope.responsDetails=[];
        $scope.addRespons=function(commentText){
          //$rootScope.userId = $window.sessionStorage.userId 
            $scope.isProcessing=true;            
            
            
            if($("#commentSection").val() ==undefined ||$("#commentSection").val() ==''){
                 $scope.isProcessing=false;
               pinesNotifications.notify({
                  title: 'Select and Score Calls',
                  text:  "Response Text is needed",
                  type:  'error'
                });
            }else{
               var data = {
                    "commentText": $("#commentSection").val(),
                    "created_by": $rootScope.userId,
                    "updated_by":  $rootScope.userId
               };
            
             //comment.commentText = commentText;
            ScoreDetailsWebService.addCommentRespons(commentID,data).then(function(result) {
            
            if(result.data.status!='success'){
              
            }else{
              $scope.isProcessing=false;
              pinesNotifications.notify({
                      title: 'Select and Score Calls',
                      text:  "Response is added successfully",
                      type:  'success'
                    });
            }
            getAllComments(callID);
             getCommentResponses(commentID);
                  $("#commentSection").val('');
                   $("#commentSection").text('');
                  commentText = '';
                  $scope.showCommentBox();
            });
            }       

        }
        $scope.addComment = function (currentTime,commentText,call_id) {
             $scope.isProcessing=true;
            if($("#commentSection").val()==undefined ||$("#commentSection").val()==''){
               $scope.isProcessing=false;
              pinesNotifications.notify({
                  title: 'Select and Score Calls',
                  text:  "Comment Text is needed",
                  type:  'error'
                });
            }else{
              var bodyData = {
                comment_text: $("#commentSection").val(),
                comment_timestamp: currentTime,
                ct_user_id: $rootScope.userId,
              }
            ScoreDetailsWebService.addComment(call_id, bodyData).then(function(result) {
              if(result.data.status === "success"){
                 $scope.isProcessing=false;
                pinesNotifications.notify({
                  title: 'Select and Score Calls',
                  text:  "Comment is added successfully",
                  type:  'success'
                });
              }
              getAllComments(call_id);
              $("#commentSection").val('');
              $("#commentSection").text('');
              commentText = '';
               // $scope.commentDetails.push({"comment_id" : result.data.json[0].comment_id,"currentTime": currentTime, "commentText": commentText});
                //$scope.placeIcon(currentTime, result.data.json[0].comment_id, 'comment', 'icon-post.png', commentText);
            });
            }
                       
        };

        $scope.exportScoreCardPDF = function () {
          $scope.pdfRenderTimeout = $scope.isIEOrEdge() ? 2000 : 5000;
          // $scope.pdfFullWidth = ($scope.isIEOrEdge() && screen.width > 1366) ? '90%' : '100%';
          var html2CanvasOption = $scope.isIEOrEdge() ? { dpi: 96, letterRendering: true } : { scale: $scope.getScale(), letterRendering: true };
          var pdfMargin = ($scope.isIEOrEdge() && $scope.scorecards.criteriaList.length > 40) ? [6, 5] : [15, 15];
          document.getElementById('cdr_table').scrollLeft -= 200; // scroll to left for perfect capture scorecard 
          $scope.showHideCommentReplies(true);
          // $("#scorecardarea").css('max-height', '300000px');
          setTimeout(function() {
        // Hide the drop down for Export so it doesnt appear in the PDF
          $(".pdfIcon").hide();
             var element = angular.element(document).find('#scorecardarea'); // get element and clone scorecard 
             angular.element(element).css('overflow-y', 'visible').css('max-height', '100%').css('break-inside', 'avoid').css('page-break-inside', 'avoid').css('width', '100%').css('background', 'transparent').css('pointer-events', 'none'); //.css('width', '58%');
             angular.element(element).find('.helpText').addClass('col-md-12 col-lg-12');
             angular.element(element).find('.helpText').removeClass('col-md-8 col-lg-8');
             // Append comments if added for scorecard 
             if($scope.commentDetails && $scope.commentDetails.length > 0) {
                var comments = angular.element(document).find('#commentsContainer'); // find comment section on dom
                var commentLabel = angular.element(document).find('#commentLabel');
                // angular.element(commentLabel.clone()).appendTo(element);
                angular.element(commentLabel.clone()).prependTo(comments);
                angular.element(comments.clone()).appendTo(element); // append cloned comment section to scorecard
                angular.element(element).find('#commentsContainer').css('overflow-y', 'visible').css('max-height', '100%'); // add css properties to cloned comments
                angular.element(element).find('.Responses').css('display', 'none'); // Hide show and hide response text in appended element
                angular.element(element).find('.fa-times').css('display', 'none'); // Hide delete icon for comments
                angular.element(element).find('#commentLabel').css('margin-top', '20px'); // Add comment label before comment list.
            }
             var updatedElement = document.getElementById('scorecardarea'); // Get updated element
             //var pdf = new jsPDF('p','pt','a4');
             pdfFileName = $('#scorecardarea').attr('name') + '.pdf';
             var opt = {
              margin: pdfMargin,
              filename: pdfFileName,
              image:        { type: 'jpeg', quality: 0.98 },
              html2canvas:  html2CanvasOption,
              jsPDF:        { unit: 'pt', format: 'letter', orientation: 'portrait' },
              pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
            };
            const pdf = html2pdf().set(opt).from(updatedElement).outputImg();
             //var options = { pagesplit : true };
             //pdf.addHTML(updatedElement,options,function() {
                //  pdf.save($('#scorecardarea').attr('name'));
                  
          //  });
            pdf.then(function() { 
              setTimeout(function() {
                pdf.save();
                $(".buttons").show();
                $(".pdfIcon").show();
                angular.element(element).css('overflow-y', 'auto').css('max-height', '490px').css('width', '66.667%').css('pointer-events', 'auto').css('background', '#fff');
                angular.element(element).find('.helpText').addClass('col-md-8 col-lg-8');
                angular.element(element).find('.helpText').removeClass('col-md-12 col-lg-12');
                angular.element(element).find('#commentLabel').remove();
                angular.element(element).find('#commentsContainer').remove();
                angular.element(document).find('#commentsContainer').find('#commentLabel').remove();
                $scope.showHideCommentReplies(false);
                // Set timeout to retain criteria after download pdf
                setTimeout(function() {
                  for(var i=0; i<$scope.scorecards.criteriaList.length; i++) {
                    var criteria = $scope.scorecards.criteriaList[i];
                    if(criteria.ctype != 'Pass/Fail') {
                      if(criteria.selectedRadio && criteria.selectedRadio!==''){
                        document.getElementById(criteria.criteria_id+'_radioOption_'+ criteria.selectedRadio).checked = true;
                      } 
                    }
                  }
                }, 500);
              }, $scope.pdfRenderTimeout);
            });
          }, 0000);
      };

      // Function to find current browser is IE/Edge or not
      $scope.isIEOrEdge = function() {
        return /msie\s|trident\/|edge\//i.test(window.navigator.userAgent) || /*@cc_on!@*/false || !!document.documentMode || !!window.StyleMedia;
      } 

      // Change canvas scale according to no. of criterias available in scorecard
      $scope.getScale = function() {
        if($scope.scorecards.criteriaList.length <= 39) {
          return 2;
        } else if($scope.scorecards.criteriaList.length > 39 && $scope.scorecards.criteriaList.length <= 53) {
          return 1.5;
        } else {
          return 1.3;
        }
      }

        // Show replies for all comments for download pdf
        $scope.showHideCommentReplies = function(display){
            $scope.commentDetails.forEach(function(comment){
              if(comment.showResponses === true && display === true && !$scope.showResponseComment) {
                 $scope.responseOpenComment = comment.comment_id;
                 comment.showResponses = display;
              } else if(display === false && $scope.responseOpenComment === comment.comment_id) {
                $scope.showResponseComment = undefined;
                comment.showResponses = true;
              } else { 
                if(comment.replies && comment.replies.length > 0){
                  comment.showResponses = display;
                }
              }
            })
        }

        $scope.placeIcon = function(currentTime, id, type, imgOfIcon, text){
            var call_length = document.getElementsByTagName('vg-scrub-bar')[0].clientWidth;
            var player_width = document.getElementById("player_width");
            var div_width = player_width.clientWidth;
            var pixel_per_sec = (call_length/$scope.totalTime);
            var position = (currentTime * pixel_per_sec) + 45;
            var current_id = "marker_" + type + "_" + id;
            var html = '';
                html+= "<img title= '"+text.replace(/'/g,"")+"'";
                html+= "id='"+current_id+"'";
                html+= "class='"+type+"'";
                html+= "src='../img/"+ imgOfIcon + "'";
                html+="onclick=angular.element(this).scope().commentPostion_play('comment_"+ id +"',"+currentTime+") ";
                html+="onmouseover=angular.element(this).scope().highlight_comment('comment_"+ id +"') ";
                html+="onmouseout=angular.element(this).scope().unhighlight_comment('comment_"+ id +"') ";
                html+= "/>";
                player_width.innerHTML += html;

                var marker_comment = document.getElementById(current_id);
                marker_comment.style.position = "absolute";
                marker_comment.style.marginLeft = position+"px";              
                marker_comment.style.zIndex= "50";
        };

        $scope.commentPostion_play=function(comment_id, currentTime,API){
            console.log("commentPostion_play is called...",comment_id)
            console.log("commentPostion_play is called...",currentTime)
            $scope.API.seekTime(currentTime, false)
            $scope.API.play();


        }
        $scope.highlight_comment = function(comment_id) {
          var currentComment = document.getElementById(comment_id);
          $('#'+comment_id).css('border', '3px solid rgb(31, 64, 125)');
        }

        $scope.unhighlight_comment = function(comment_id) {
            
            // show_all_comments();
            var currentComment = document.getElementById(comment_id);
            // currentComment.style.borderColor = '#4a64a0';
            //currentComment.style.color = 'pink';
            $('#'+comment_id).css('border', '1px solid rgb(31, 64, 125)');
        }

        $scope.changeSource = function () {
            $scope.config.sources = $scope.media[1].sources;
            $scope.config.tracks = undefined;
            $scope.config.preload = true;
        };

           

			// ***** begin NECESSARY CODE FOR ADV FILTER TO WORK *******************
			$scope.preloading = false;
			$scope.showAdvFilter = false;
			$scope.advancedFilterConfig = { maxQuantity: 5 };

			$scope.extendUrlParams = function(urlParams) {
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

			$scope.getInitialUrlParams = function() {
				advFilSrvc.determineInitializationMethod($scope).then(function(r) {
					
					$scope.advFilterDefinitions = advFilSrvc.getAdvFilterDefinitions();
                    if ($scope.advFilterDefinitions.length > 0 && $scope.advFilterDefinitions[0].selected_column !== undefined) {
						$scope.showAdvFilter = true;
					}
					$scope.extendUrlParams(r);
					$scope.loadReportBasedOnQueryString();
				});
			}();

			$scope.addFilterDefinition = function() {
				advFilSrvc.addFilterDefinition(false);
				$scope.advFilterDefinitions = advFilSrvc.getAdvFilterDefinitions();
			};

			$scope.updateOperators = function(preloading, af, $index) {
				advFilSrvc.updateOperators(preloading, af, $index);
				$scope.advFilterDefinitions = advFilSrvc.getAdvFilterDefinitions();
			};

            $scope.applyFilterParams = function() {
                var urlParams = advFilSrvc.applyFilter($scope);
                if(urlParams) {
                	$scope.extendUrlParams(urlParams);
                    return true;
                }

                return false;
            };

			$scope.applyFilter = function() {
				$scope.horsemanFlag = false;
				var noErrors = $scope.applyFilterParams();
                for (var x in $scope.audio) {
                    $scope.audio[x].pause();
                }

                // Kill all event listeners on leave
                var importantListeners = ['$destroy', '$locationChangeStart', '$locationChangeSuccess'];
                for(var i in $rootScope.$$listeners) {
                    if(importantListeners.indexOf(i) === -1) {
                        delete $rootScope.$$listeners[i];
                    }
                }
                $scope.audio = undefined;
                if( $scope.scoreIncludes.length > 0)
                    $scope.urlParams.status =  $scope.scoreIncludes;
                $scope.isScoreEditInProgress = false;
                if (noErrors) {
                    $scope.loadReportBasedOnQueryString();
                }
			};

            $scope.filterReset = function() {
                if($routeParams && $routeParams.filtertype) {
                    $location.search({'report':'call_detail_scorecard'});
                }
				advFilSrvc.resetAdvFilter();
				$scope.advFilterDefinitions = advFilSrvc.getAdvFilterDefinitions();
				$scope.showAdvFilter = false;
				$scope.simpleFilterText = '';
				$scope.filtertype = 's';
                $scope.filter = '';
                if ($scope.filterApplied) {
                    $scope.applyFilter();
                    $scope.filterApplied = false;
                }
            };

			$scope.removeFilterDefinition = function(i) {
				advFilSrvc.removeFilterDefinition(i);
				$scope.advFilterDefinitions = advFilSrvc.getAdvFilterDefinitions();
			};

			$scope.validateInput = function(e) {
				advFilSrvc.validateInput(e);
			};
      $scope.increaseAudioInitializationCount = function() {
          ++$scope.audioInitializationCount;
      };

       /*Info section code  
       / Get info */
       $scope.getinfodetails = function(index, callID, showStatus) {
        if (showStatus) {
            //$scope.hasExtendedData = false;
            ScoreDetailsWebService.getCallsDetailsInfo($rootScope.userId, callID).then(function(result) {
                var dataSet = result.data.json;
                //console.log(dataSet);
                var dni = dataSet[0].dni;
                var dnilength = dni.length;

                var source_data = dataSet[0].source_data;
                var source_datalength = source_data.length;

                var indicator_scores = dataSet[0].indicator_scores;

                var indicator_scoreslength = indicator_scores.length;

                _.each(dataSet, function(data) {
                    data.singlerec = 1;
                });
                if (dataSet[0] !== undefined) {
                    if (source_datalength > 0) {
                        $scope.hasExtendedData = true;
                        if (source_data[0].call_data != "NoInfo") {
                            source_data[0].call_data = (typeof(source_data[0].call_data) !== "object") ? JSON.parse(source_data[0].call_data) : source_data[0].call_data;
                        }
                        if (source_data[0].call_data === 'NoInfo') {
                            $scope.caller_info[index] = {
                                'consumer1': {
                                    'first_name': 'No Information'
                                }
                            };
                        } else {
                            $scope.caller_info[index] = !source_data[0].call_data.reverse_phone_append ? source_data[0].call_data : source_data[0].call_data.reverse_phone_append;
                            $scope.caller_info[index].source = !source_data[0].call_data.reverse_phone_append ? "white pages" : "acxiom";
                        }
                    } else {
                        $scope.hasExtendedData = true;
                    }
                    if (indicator_scoreslength > 0) {
                        //console.log(indicator_scores);

                        $scope.ind_scores[index] = [];
                        //create array of ind scores keyed by indicator name
                        //console.log('index: '+index);
                        for (var key in indicator_scores) {
                            $scope.ind_scores[index][indicator_scores[key].indicator_name] = indicator_scores[key].score_value;
                        }

                        //console.log($scope.ind_scores);
                    }
                    if (dnilength > 0) {
                        if (dni[0] !== undefined) {
                            $scope.dnidata[index] = dataSet[0].dni[0];

                            // Base URL regex since referring is a messy long link with all its query strings attached
                            var baseUrl = $scope.dnidata[index].referring.match(new RegExp(".+?[^\/:](?=[?\/]|$)"));

                            // Javascript RE will return null if no matches, otherwise it's an array of grouping matches
                            if (baseUrl !== null) {
                                $scope.dnidata[index].referring = baseUrl[0];
                            }
                        }
                    }
                }

            });

            //Get the Call Comments
            $scope.getcallcomments($rootScope.userId, callID);

            //Get the Call Tags
            $scope.call_tagslength[callID] = '';
            $scope.call_tags[callID] = [];
            $scope.getcalltags($rootScope.userId, callID);
        } else {
            $scope.comment.text = [];
        }
    };
    // End get call info
    
    // Get call comments
    $scope.call_commentslength = [];
    $scope.call_comments = [];
    $scope.getcallcomments = function(userID, callID) {

      ScoreDetailsWebService.getCallsComments(userID, callID).then(function(result) {
          var dataSet = result.data.json;

          _.each(dataSet, function(data) {

              data.comment_created_formatted = moment(data.comment_created).format("MM-DD-YYYY h:mm:ss a");
              data.singlerec = 1;
          });
          $scope.call_id = callID;
          $scope.call_comments[callID] = _.filter(dataSet, function(data) {
              return data.comment_parent_id === null;
          });
          $scope.call_commentslength[callID] = ($scope.call_comments[callID] !== undefined) ? $scope.call_comments[callID].length : 0;

          $scope.call_responses = _.filter(dataSet, function(data) {
              return data.comment_parent_id !== null;
          });
          $scope.call_responseslength = ($scope.call_responses !== undefined) ? $scope.call_responses.length : 0;
      });
     };
     // End get call comments

     // Get call tags 
     $scope.getcalltags = function(userID, callID) {

      ScoreDetailsWebService.fetchCallsTags($rootScope.userId, callID).then(function(result) {

          var dataSet = result.data.json;
          var selectedCallTags = [];

          if (dataSet !== undefined) {
              _.each(dataSet, function(data) {
                  data.singlerec = 1;
                  var o = {};
                  o.id = data.tag_id;
                  o.text = data.tag_name;
                  selectedCallTags.push(o.id);
                  if (data.permission > $scope.userAccess.tag) {
                      data.locked = 'locked';
                  }
              });
              $scope.selCallTags[callID] = selectedCallTags;
              $scope.call_id = callID;
              $scope.call_tagslength[callID] = dataSet.length;
              $scope.call_tags[callID] = dataSet;
          }
          ScoreDetailsWebService.fetchTags($rootScope.userId, callID).then(function(result) {
              var dataSet = result.data.json;
              //console.log(dataSet);
              $scope.selTags = [];
              if (dataSet !== undefined) {
                  _.each(dataSet, function(data) {
                      data.singlerec = 1;
                      $scope.selTags.push(data.tag_id);
                      //replacing line below that assigns dataSet to $scope.tags.
                      $('#calltagselect' + callID).append('<option value="' + data.tag_id + '" >' + data.tag_name + '</option>');
                  });
                  $scope.call_id = callID;
                  $scope.tagslength = dataSet.length;

                  $scope.tags = dataSet; //way too slow to assign this much data to a scope variable that is being used in an ngrepeat
              }
          });
      });
    };
    // End get call tags

    // Post comment from call info section
    $scope.postcomment = function(index, callid) {
      var callcommentjson = {
          "comment": {
              "call_id": callid,
              "ct_user_id": $rootScope.userId,
              "comment_text": $scope.comment.text[callid],
              "comment_created": null,
              "is_from_report": true,
              "comment_modified": null,
              "comment_parent_id": null,
              "comment_active": true
          }
      };

      ScoreDetailsWebService.setCallsComments(callcommentjson, $rootScope.userId).then(function(result) {
          var dataSet = result.data.json;
          if (result.data.err === '') {
              pinesNotifications.notify({
                  title: 'Update Comments',
                  text: 'Successfully added comment',
                  type: 'success'
              });

              //Get the Call Comments
              $scope.comment.text[callid] = "";
              $scope.getcallcomments($rootScope.userId, callid);

          } else {
              pinesNotifications.notify({
                  title: 'Update Comments',
                  text: result.data.err,
                  type: 'error'
              });
          }
          return;
      });
   };

   // End post comment from call info section

   // Add tag from call info section

   $scope.newtagvalue = $scope.oldtagvalue = '';
   $scope.postcalltag = function(index, callID, multiple) {
       var calltagjson = {};
       var calltags = [];
       calltagjson.addmultiple = multiple;
       calltagjson.call_id = $scope.call_id;
       calltagjson.ct_user_id = $rootScope.userId;
       calltagjson.currentOUId = $rootScope.currentOUId;

       if (multiple) {
           // Add multiple tags
           currentTags = $('#calltagselect' + callID).select2("data");

           _.each(currentTags, function(tagdata, index) {
               calltags.push({
                   "tag": {
                       "call_id": $scope.call_id,
                       "ct_user_id": $rootScope.userId,
                       "org_unit_id": $rootScope.currentOUId,
                       "tag_id": parseInt(currentTags[index].id),
                       "tag_text": currentTags[index].text.trim(),
                       "tag_created": null
                   }
               });
           });

           calltagjson.calltags = calltags;

           ScoreDetailsWebService.setCallsTags(calltagjson, $rootScope.userId).then(function(result) {
               var dataSet = result.data.json;
               if (result.data.err === '') {
                   pinesNotifications.notify({
                       title: 'Update Call Tags',
                       text: 'Successfully updated call tags',
                       type: 'success'
                   });

                   $scope.call_tagslength[callID] = calltags.length;
                   // $scope.getcalltags($rootScope.userId, result.config.data.call_id);

               } else {
                   pinesNotifications.notify({
                       title: 'Update Call Tags',
                       text: result.data.err,
                       type: 'error'
                   });
               }
               return;
           });
       } else {
           var arraytags = _.pluck($scope.tags , 'tag_name');
           arraytags = arraytags.map(function(tag){ return tag.toLowerCase(); });
           var duplicateTags = _.filter(arraytags, function(tag){
               return tag == $scope.noResultsTag.trim().toLowerCase();
           });

           if ($scope.newtagvalue === '') {
               $scope.oldtagvalue = '';
           } else {
               $scope.oldtagvalue = $scope.newtagvalue;
           }
           $scope.newtagvalue = $scope.noResultsTag.trim();

           if ($scope.newtagvalue === $scope.oldtagvalue) {
               return;
           }

           if (duplicateTags.length > 0) {
               pinesNotifications.notify({
                   title: 'Update Call Tags',
                   text: 'This Tag already exists',
                   type: 'error'
               });
               return false;
           }
           calltags.push({
               "tag": {
                   "call_id": $scope.call_id,
                   "ct_user_id": $rootScope.userId,
                   "org_unit_id": $rootScope.currentOUId,
                   "tag_id": null,
                   "tag_text": $scope.noResultsTag.trim(),
                   "tag_created": null
               }
           });

           calltagjson.calltags = calltags;

           ScoreDetailsWebService.setCallsTags(calltagjson, $rootScope.userId).then(function(result) {
               var dataSet = result.data.json;
               if (result.data.err === '') {
                   pinesNotifications.notify({
                       title: 'Update Call Tags',
                       text: 'Successfully added call tag',
                       type: 'success'
                   });
                   //Get the Call Tags
                   currentTags = $('#calltagselect' + $scope.call_id).select2("data");
                   var selectedCallTags = [];
                   var calTagDataSet = [];
                   _.each(currentTags, function(data) {
                       data.singlerec = 1;
                       selectedCallTags.push(data.id);
                       calTagDataSet.push({
                           "call_id": $scope.call_id,
                           "tag_id": data.id,
                           "tag_name": data.text,
                           "locked": (data.locked ? "locked" : "unlocked")
                       });
                   });
                   selectedCallTags.push(dataSet.tag_id);
                   calTagDataSet.push({
                       "call_id": $scope.call_id,
                       "tag_id": dataSet.tag_id,
                       "tag_name": dataSet.tag_name,
                       "locked": false
                   });

                   $scope.selCallTags[$scope.call_id] = selectedCallTags;
                   $scope.call_tagslength[$scope.call_id] = calTagDataSet.length;
                   $scope.call_tags[$scope.call_id] = calTagDataSet;

                   //$scope.getcalltags($rootScope.userId, result.config.data.call_id);
               } else {
                   pinesNotifications.notify({
                       title: 'Update Comments',
                       text: result.data.err,
                       type: 'error'
                   });
               }
               return;
           });
         }
      };
      // End add tag from call info section

      // Check if user can delete comment or not of call info section
      $scope.userCanDeleteComment = function(comment_user_id) {
        if (!$scope.isReadonly) {
            return true;
        } else {
            // if they are a readonly user, then only allow user to delete comment if it is his/her own
            return parseInt($rootScope.userId) === comment_user_id;
        }
      };

      // Delete comment of call info comment section.
      $scope.deletecomment = function(index, commentid, callID) {
        ScoreDetailsWebService.deleteCallsComments(commentid, $rootScope.userId).then(function(result) {
            var dataSet = result.data.json;
            if (result.data.err === '') {
                pinesNotifications.notify({
                    title: 'Delete Comments',
                    text: 'Successfully deleted comment',
                    type: 'success'
                });

                //Get the Call Comments
                $scope.getcallcomments($rootScope.userId, callID);

            } else {
                pinesNotifications.notify({
                    title: 'Delete Comments',
                    text: result.data.err,
                    type: 'error'
                });
            }
            return;
        });
      };
       
     
      }
    ])
.controller('ScoreNotificationsController', ['$uibModal', '$scope', '$rootScope', '$filter', 'SelectedScorecard', '$location', '$window', '$bootbox', 'ScoreCardService', 'pinesNotifications','ScoreNotificationsWebService',
  function ($uibModal, $scope, $rootScope, $filter, $location, SelectedScorecard, $window, $bootbox, ScoreCardService, pinesNotifications,ScoreNotificationsWebService) {
/**/
  $scope.score_card_rule = [
    {name:"A call has been scored for me", value:"scored"},
    {name:"A call I scored has been reviewed",value:"reviewed"}
  ];
  $scope.actionOptions = [
  {name:"Send email alert to", value:"email"},
  {name:"Send SMS to", value:"sms"}];
  $scope.notificationActions = [];
  $scope.addNewStep = true;
  $scope.addNotification = {};
  $scope.addNotification.actionOptions = {};
  $scope.addNotification.phone_number = {};
  $scope.addNotification.email ={};
  $scope.addNotification.email[0] = $rootScope.userEmail;
  $scope.addNotification.score_card_rule ={};
  var validationFlag=true;
  $scope.loadScoreNotifications = function() {
    showListOfNottification();
  };
  $scope.changeActionOption=function(id){
     $scope.addNotification.email[id] = $rootScope.userEmail;
  }
  $scope.removeScoreNotifications = function(actionId,savedflag,indexID) {
   $bootbox.confirm("Are you sure you want to delete this Notification Action?", function(clickedOK) {
      if (clickedOK) {
          
        if(savedflag==true){
            ScoreNotificationsWebService.deleteScoreNotification(actionId).then(function(result) {
              if(result.data.status!='error'){
                pinesNotifications.notify({
                  title: 'Score Notifications',
                  text:  "Notification Action deleted successfully",
                  type:  'success'
                });
              }
              $scope.notificationActions=[];
              showListOfNottification();
        });
        }else{
            if((indexID==0)&&($scope.notificationActions.length==1)){
                $scope.clearScoreNotificationAction(actionId);
            }
            else{         
            $scope.notificationActions.splice(indexID,1);
            pinesNotifications.notify({
                title: 'Score Notifications',
                text:  "Notification Action deleted successfully",
                type:  'success'
              });
            }
        }
        
      }
    });
  };


  $scope.clearScoreNotificationAction=function(actionId){
    $scope.addNotification.score_card_rule[actionId ] = [];
    $scope.addNotification.actionOptions[actionId ] = [];
    $scope.addNotification.email[actionId ] = $rootScope.userEmail;
    $scope.addNotification.phone_number[actionId ] = "";
}


  function deleteNotificationActionsValue(callActionIndex) {
    delete $scope.addNotification.callActionFormSubmitted[callActionIndex.toString()];
    $.each($scope.notificationActions, function(index, action) {
      if (!angular.isUndefined(action)  && typeof(action) != "string") {
          delete action[(callActionIndex).toString()];
      }
    });
    if ($scope.notificationActions.length === 0) {
      $scope.notificationActions = [];
      $scope.notificationActions.push({
          "id": 1
      });
      $scope.addNotification.actionOptions[1] = [];
      $scope.addNotification.email[1] = [];
      $scope.addNotification.callActionFormSubmitted[1] = false;
    }
  }
///-----------
  $scope.addNewScoreNotifications = function(cActionId) {
    var addedAction;
    cActionId = parseInt(cActionId);
    addedAction = {
        id: (cActionId + 1),
        savedflag: false
    };
    $scope.notificationActions.push(addedAction);
    $scope.addNotification.score_card_rule[cActionId + 1] = [];
    $scope.addNotification.actionOptions[cActionId + 1] = [];
    $scope.addNotification.email[cActionId + 1] = $rootScope.userEmail;
    $scope.addNotification.phone_number[cActionId + 1] = "";
    //$scope.addNotification.savedflag[cActionId + 1] = false;
  };
 
  

/////--------
  $scope.saveScoreNotifications=function(actionId,value){
    validationFlag=true;

    $scope.notificationActions.forEach(function(r) {
            r.ct_user_id = $rootScope.userId;
            r.created_by = $rootScope.userId;
            r.updated_by = $rootScope.userId;
            if( $scope.addNotification.score_card_rule[r.id] != undefined || $scope.addNotification.actionOptions[r.id] != undefined || $scope.addNotification.phone_number[r.id] == undefined ||
                $scope.addNotification.score_card_rule[r.id] != '' || $scope.addNotification.actionOptions[r.id] != '' || $scope.addNotification.phone_number[r.id] == '' ){
               if($scope.addNotification.score_card_rule[r.id] == undefined ||$scope.addNotification.score_card_rule[r.id] == ''){
                validationFlag=false;
                 pinesNotifications.notify({
                  title: 'Score Notifications',
                  text:  "Rule field is required",
                  type:  'error'
                });
               }
               if($scope.addNotification.actionOptions[r.id] == undefined || $scope.addNotification.actionOptions[r.id] == ''){
                 validationFlag=false;
                 pinesNotifications.notify({
                  title: 'Score Notifications',
                  text:  "Rule_Option field is required",
                  type:  'error'
                });
               }
               if($scope.addNotification.actionOptions[r.id]=='sms'){
                   if($scope.addNotification.phone_number[r.id] === undefined || $scope.addNotification.phone_number[r.id]==''){
                    validationFlag=false;
                     pinesNotifications.notify({
                      title: 'Score Notifications',
                      text:  "Phone number field is required",
                      type:  'error'
                    });
                   }else{
                      if($scope.addNotification.phone_number[r.id] != undefined && $scope.addNotification.phone_number[r.id].replace(/[_]/g, "").length > 0 && $scope.addNotification.phone_number[r.id].replace(/[_]/g, "").length !== 14){
                       validationFlag=false;
                       pinesNotifications.notify({
                        title: 'Score Notifications',
                        text:  "Phone number field is Invalid",
                        type:  'error'
                      });
                     }
                   }
                }

                 if($scope.addNotification.actionOptions[r.id]=='email'){

                    var EMAIL_REGEXP = /^[-._a-zA-Z0-9]+(\.[_a-zA-Z0-9]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,7})$/;

                   if($scope.addNotification.email[r.id] === undefined || $scope.addNotification.email[r.id]==''){
                    validationFlag=false;
                     pinesNotifications.notify({
                      title: 'Score Notifications',
                      text:  "Email field is required",
                      type:  'error'
                    });
                   }else{
                      if((($scope.addNotification.email[r.id] !='')|| ($scope.addNotification.email[r.id] != undefined)) && (!EMAIL_REGEXP.test($scope.addNotification.email[r.id]))){
                       validationFlag=false;
                       pinesNotifications.notify({
                        title: 'Score Notifications',
                        text:  "Email field is Invalid",
                        type:  'error'
                      });
                     }
                   }
                }
            }

            r.score_card_rule = $scope.addNotification.score_card_rule[r.id] ;
            r.score_card_action = $scope.addNotification.actionOptions[r.id]; 
            if($scope.addNotification.actionOptions[r.id] === "email"){
              r.score_card_action_target =$scope.addNotification.email[r.id];
            }
            if($scope.addNotification.actionOptions[r.id] == "sms"){
              r.score_card_action_target =$scope.addNotification.phone_number[r.id];
            }
     })
    if(validationFlag==true){
      ScoreNotificationsWebService.createScoreNotifications($rootScope.userId,$scope.notificationActions).then(function(result) {
        if(result.data.status!='error')
        {
          pinesNotifications.notify({
            title: 'Score Notifications',
            text:  "Notification Actions saved successfully",
            type:  'success'
          });
          $rootScope.uibModalInstance.close();
        }
      });
    }
  }

  function showListOfNottification(){
    ScoreNotificationsWebService.getNotifcationsList($rootScope.userId).then(function(result) {
      if (result.data.status !== 'error') {
        if (result.data.json.length>0){
          result.data.json.forEach(function(r) {
            $scope.notificationActions.push({
              "id" : r.score_card_action_id,
              "savedflag": true
            })
            $scope.addNotification.actionOptions[r.score_card_action_id] = r.score_card_action;
            $scope.addNotification.score_card_rule[r.score_card_action_id] = r.score_card_rule;
            if(r.score_card_action === "email"){
              
              $scope.addNotification.email[r.score_card_action_id] = r.score_card_action_target==''?$rootScope.userEmail:r.score_card_action_target;
            }
            if(r.score_card_action === "sms"){
              
              $scope.addNotification.phone_number[r.score_card_action_id] = r.score_card_action_target;
            }
            //$scope.addNotification[r.savedflag]=true;
          }) 

        }else{
          $scope.notificationActions.push({
            "id" : 0,
            "savedflag": false

          })
        }
      } 
    });

     console.log(" $scope.addNotification==", $scope.addNotification);
  }
}]);


