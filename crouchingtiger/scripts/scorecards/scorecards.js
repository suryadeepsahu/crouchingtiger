angular
	.module('theme.scorecards', ['angularFileUpload','angularjs-dropdown-multiselect','angularUtils.directives.dirPagination', 'ui.select2', 'toggle-switch','ngTouch','ngAnimate','ui.bootstrap', "api-param", "datetime-timezoned"])
    .directive('file', function () {
        return {
            scope: {
                file: '='
            },
            link:  function (scope, el, attrs) {
                el.bind('change', function (event) {
                    var files = event.target.files;
                    var file = files[0];
                    scope.file = file ? file.name : undefined;
                    scope.$apply();
                });
            }
        };
    })

    .factory('SelectedScorecard', function () {
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
.factory("ScoreCardService",function ($q, $timeout, $http, $window, $rootScope, $upload, ApiParam) {
		'use strict';
		var ScoreCardService = {};
		ScoreCardService.getScoreCards = function (page, isExport,timezone) {
				$http.defaults.useXDomain = true;
				return $http.get(ApiParam.baseURL() + "/v1/scorecard/getScoreCards?page=" + page+ "&isExport=" + isExport + "&timezone=" + timezone, ApiParam.headerConfig());
		};
        ScoreCardService.getGroups = function () {
                $http.defaults.useXDomain = true;
                return $http.get(ApiParam.baseURL() + "/v1/scorecard/getGroups", ApiParam.headerConfig());
        };
		ScoreCardService.getScoreCard = function (scoreId) {
				$http.defaults.useXDomain = true;
				  return $http.get(ApiParam.baseURL() + "/v1/scorecard/scoreId/" + scoreId, ApiParam.headerConfig());
		};

        ScoreCardService.archiveScorecard = function (scoreId) {
                $http.defaults.useXDomain = true;
                  return $http.get(ApiParam.baseURL() + "/v1/scorecard/archiveScorecard/scoreId/" + scoreId, ApiParam.headerConfig());
		};
		ScoreCardService.getAttachedCalls = function (scoreCardId) {
			$http.defaults.useXDomain = true;
			  return $http.get(ApiParam.baseURL() + "/v1/scorecard/getAttachedCalls/scoreCardId/" + scoreCardId, ApiParam.headerConfig());
		};
         ScoreCardService.checkScoreCardStatus = function (scoreId) {
                $http.defaults.useXDomain = true;
                  return $http.get(ApiParam.baseURL() + "/v1/scorecard/checkScoreCardStatus/scoreId/" + scoreId, ApiParam.headerConfig());
        };
        
		ScoreCardService.createScorCard = function (scoreCard) {
				return $http.post(ApiParam.baseURL() + "/v1/scorecard", scoreCard, ApiParam.headerConfig());
		};

		ScoreCardService.updateScoreCard = function (scoreCard) {
				return $http.put(ApiParam.baseURL() + "/v1/scorecard/" + scoreCard.score_card_id, scoreCard, ApiParam.headerConfig());
		};
		ScoreCardService.enableScoreCard = true;
		ScoreCardService.notify = function (args) {
				PNotify.removeAll();
				var notification = new PNotify(args);
				notification.notify = notification.update;
				return notification;
		};

		return ScoreCardService;
	})
.controller('ScorecardsController', ['$uibModal','$scope', '$rootScope', '$filter', 'SelectedScorecard', '$location', '$window', '$bootbox', 'ScoreCardService','pinesNotifications', '$q',
    function ($uibModal, $scope, $rootScope, $filter, $location, SelectedScorecard, $window, $bootbox, ScoreCardService, pinesNotifications, $q) {
    'use strict';
	var retData;
	//var deferred = $q.defer();	
    $scope.currentPage = 1;
    $scope.pageSize = 100;
    $scope.CurrentOUId = $rootScope.currentOUId;
    $scope.scorecardHeader = ['Scorecard Name', 'Created By', 'Date Created', 'Modified Date', 'Group'];
    $scope.actionHeader = ['Actions'];
    $scope.scorecardList = [];
    $scope.scorecards = [];
    $scope.mutiselectDrpVals = [];
    $scope.scorecardWithCriteria = [];
    $scope.totalRecords = 0;
    $scope.groupList = [];
	$scope.editButtonStatus = false;
    $scope.scoreName = "Scorecards";
    var groupsReportName = $scope.scoreName + "_" + moment().format('YYYY-MM-DD');
	$scope.roleId = $rootScope.roleId;
	$scope.isPendingReq = true;
	 $scope.settings = {
		enableSearch: true,
		//$scope.onGoingRequests = [];
        scrollable: true,
        scrollableHeight: 200,
		checkBoxes: true,

		
    };
    $rootScope.isSafari= $window.sessionStorage.isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window.safari || safari.pushNotification);
   // $scope.ctypeOption = ["Pass/Fail","Scale 0-3", "Scale 0-5", "Scale 0-10"];

		if(parseInt($scope.roleId) !== 1 && parseInt($scope.roleId) !== 4){
			$window.location.href = '#/access-denied';
		}
		//$scope.currentPage = $scope.currentPage+1;

		$scope.onGoingRequests = [];
		$scope.isLoadingApi = true;

		$scope.intialGrid = function(){
			loadDataGrid();
		};

		$scope.scoreCardsForExport = false;

		function loadDataGrid(){
			if($scope.onGoingRequests.length < 2){
				$scope.isLoadingApi = true;
				$scope.onGoingRequests = [];
				$scope.isPendingReq = true;

				$(".pageProgressLoader").show();
	            $("#progressLoader").css("opacity","0");
	            $(".table>tbody>tr>td").css("border-top","none");

				ScoreCardService.getScoreCards($scope.currentPage, false, $rootScope.timezone).then(function(result){
					$scope.isLoadingApi = false;
					if(result.data.json !== undefined){
						if(result.data.json.score_card_detail.length > 0){
							$scope.scoreCardsForExport = true;
						}

						$scope.scorecardList = [];
						$scope.scorecardWithCriteria = result.data.json.score_card_detail;

						$scope.totalRecords = result.data.json.total;
						
						angular.forEach(result.data.json.score_card_detail, function(value, key){
							//$scope.mutiselectDrpVals.push({'id':value.org_unit_id,'label':value.org_unit_name});
							var tempHash = {
								score_card_id: value.score_card_id,
								score_card_title: value.score_card_title,
								created_by: value.created_by,
								created_on: value.created_on,
								updated_on: value.updated_on,
								groups_list: (value.groups_list).split(','),
								group_name:(value.groups_list).split(',')[0],
								outcome_label: value.score_card_outcome_label,
								importance: value.importance,
								instruction: value.score_card_instructions,
								criteria_count: 1
							};
		
							var tempListData = _.find($scope.scorecardList, function(list){
								return list.score_card_id == tempHash.score_card_id;
							});
							if(tempListData === undefined)
								$scope.scorecardList.push(tempHash);
							else
								tempListData.criteria_count += 1;

						});

						//$scope.scorecardList = result.data.json;
					}
					$(".pageProgressLoader").hide();
                    $("#progressLoader").css("opacity","1");
                    $(".table>tbody>tr>td").css("border-top","1px solid #e9ecf0");
                    $scope.isPendingReq = false;
				
					// $scope.$watch("currentPage + pageSize", function() {
					// 	var begin = (($scope.currentPage - 1) * $scope.newPageNumber)
					// 	end = begin + $scope.newPageNumber;
					// }
		
				});
				
			}
		}

		$rootScope.$on("changeInRecords", function(event, totalRecordsFromModal) {
            $scope.totalRecords = totalRecordsFromModal;
        });
		
		$scope.pageChanged = function(newPageNumber){
			$scope.onGoingRequests.push(true);
			$scope.currentPage = newPageNumber ;
			console.log("page is ",$scope.currentPage);
			loadDataGrid();
		};


        $scope.archiveScorecard = function (scoreCardId) {
            if(scoreCardId !== undefined){
            	ScoreCardService.checkScoreCardStatus(scoreCardId).then(function(res){
            		var archiveScorecardMsg='';
            		if(res.data.result == 'success'){
            		 	if(parseInt(res.data.json[0].count) === 0){
            		 		archiveScorecardMsg	="Are you sure you want to delete this Scorecard?";
            		 	}
            		 	if(res.data.json[0].count>0)
            		 	{
            		 		archiveScorecardMsg="This scorecard is attached with ( " + res.data.json[0].count + " ) calls which might be scored and reviewed. Are you sure you want to archive it?";
            		 	}
            		}
            		$bootbox.confirm(archiveScorecardMsg, function (clickedOK) {
						if (clickedOK) {
			                ScoreCardService.archiveScorecard(scoreCardId).then(function(res){
		                     if(res.data.result == 'success'){
		                        for (var i = 0; i < $scope.scorecardList.length; i++) {
		                            if($scope.scorecardList[i].score_card_id == scoreCardId){
		                                $scope.scorecardList.splice(i, 1);
		                                $scope.totalRecords= $scope.totalRecords-1;
		                                pinesNotifications.notify({
		                                     title: 'Scorecard',
		                                     text:  'Successfully Archived Scorecard',
		                                     type:  'success'
		                                });
		                            }
		                        }
		                    }
			                });
						}
					});
            	});
            }
        };
        
    $scope.groupListInfo = function(data){
    	$scope.groupDisplay = data;
    	$scope.allGroupList =_.union(data.groups_list);
    	var uibModalInstance = $uibModal.open({
			 ariaLabelledBy: 'modal-title',
			 ariaDescribedBy: 'modal-body',
			 templateUrl: './views/score-grouplistinfomodel.html',
			// controllerAs: 'ScorecardsController',
			 scope: $scope,
				 backdrop  : 'static',
		 		 keyboard  : false,
			 size: 'lg',
			 resolve: {
			 	
			 }
		 });
    };
    /*$scope.loadAssignedGroup=function(displayData){
    	//console.log("loadAssignedGroup is called..=",displayData)
    }*/

	$scope.enableScoreCard = ScoreCardService.enableScoreCard ;
	$scope.addNewScoreCard = function(score_card_id){
		$scope.enableScoreCard =  false;
		var ctypeOption = [{key:"Pass/Fail",value:"Pass/Fail", radioOption: [] },
							{key:"scale_0-3",value:"Scale 0-3", radioOption: ["0","1","2","3"] },
							{key:"scale_0-5",value:"Scale 0-5", radioOption: ["0","1","2","3","4","5"] },
							{key:"scale_0-10",value:"Scale 0-10", radioOption: ["0","1","2","3","4","5","6","7","8","9","10"] }
						];
		$rootScope.score_card_id = score_card_id;
		$scope.scorecards = (score_card_id > 0) ? $scope.scorecards : [];
        $scope.scorecards.criteriaList = [];
		$scope.scorecards.actions = '';
		 var uibModalInstance = $uibModal.open({
			 ariaLabelledBy: 'modal-title',
			 ariaDescribedBy: 'modal-body',
			 templateUrl: './views/score-model.html',
			 controllerAs: 'ScoreModelController',
			 scope: $scope,
				 backdrop  : 'static',
		 		 keyboard  : false,
			 size: 'lg',
			 resolve: {
			 }
		 });

         var editedScoreCard = [];
         if(score_card_id > 0 && score_card_id !== undefined){
            ScoreCardService.getScoreCard(score_card_id).then(function(result){
                if(result.data.json !== undefined){
                    var editedScoreCard = result.data.json;
                    $scope.scorecards.criteriaList = [];
					$scope.scorecards.groups = editedScoreCard.scoreCard.groups;
					$scope.scorecards.title = editedScoreCard.scoreCard.score_card_title;
					$scope.scorecards.instruction = editedScoreCard.scoreCard.instructions;
					$scope.scorecards.importance = editedScoreCard.scoreCard.importance;
					 // angular.forEach(editedScoreCard.scoreCard.groups, function(value, key){
						// 	// if(editedScoreCard.scoreCard.groups.indexOf(value.org_unit_id) != -1){
						// 	 		//if(value.id != $rootScope.highestOUId)
						// 				$scope.scorecards.groups.push({'id':value.id,'label':value.label});
						// 	 //}
					 // });
					$scope.scorecards.outcome = editedScoreCard.scoreCard.outcome_label;
                    angular.forEach(editedScoreCard.scoreCriteriaList, function(value, key){
                    	var ctype = {
                    		key:  value.criteria_type,
                    		value: _.find(ctypeOption, function(opt){ return opt.key == value.criteria_type; }).value,
                    		radioOption: _.find(ctypeOption, function(opt){ return opt.key == value.criteria_type; }).radioOption
                    	};
                        $scope.scorecards.criteriaList.push({'criteria_id':value.criteria_id,'title':value.criteria_title,'ctype':ctype,'helpText':value.help_text,'criteria_importance':value.criteria_importance,'acceptCheck':value.is_required});
                    });
                }
            });
		 }
		 
		 $scope.uibModalInstance = uibModalInstance;
		 $rootScope.uibModalInstance = uibModalInstance;
	};
	
	
    $scope.editScoreCard = function (score_card_id) {
        if(score_card_id !== '' || score_card_id !== undefined){
                    $scope.addNewScoreCard(score_card_id);
                }
    };
	$scope.close = function(){
		$scope.enableScoreCard =  true;
	};
	
    $scope.getHeader = function () { return ["Scorecard Name", "Date Created", "Created By", "Modified Date", "Group", "Number of Criteria","Outcome Label","Importance"]; };
    $scope.getCSVData = function (formate) {
		var deferred = $q.defer();
        var scorecardData = [];
        
        $scope.groupsReportFileName = groupsReportName + "." + formate;
        var ctypeOption = [
	    	{key:"Pass/Fail",value:"Pass/Fail", radioOption: [] },
	    	{key:"scale_0-3",value:"Scale 0-3", radioOption: ["0","1","2","3"] },
	    	{key:"scale_0-5",value:"Scale 0-5", radioOption: ["0","1","2","3","4","5"] },
	    	{key:"scale_0-10",value:"Scale 0-10", radioOption: ["0","1","2","3","4","5","6","7","8","9","10"] }
		];
		
		ScoreCardService.getScoreCards($scope.currentPage, true, $rootScope.timezone).then(function(result){
			if(result.data.json !== undefined){
				$scope.scorecardListExport = result.data.json.score_card_detail;
			
				for (var i = 0; i < $scope.scorecardListExport.length; i++) {
					scorecardData.push({
						a: $scope.scorecardListExport[i].score_card_title,
						b: $scope.scorecardListExport[i].created_on,
						c: $scope.scorecardListExport[i].created_by,
						d: $scope.scorecardListExport[i].updated_on,
						e: $scope.scorecardListExport[i].groups_list.split(",").length,
						f: $scope.scorecardListExport[i].criteria_count,
						g: $scope.scorecardListExport[i].score_card_outcome_label,
						h: $scope.scorecardListExport[i].importance,
					   // k: $scope.scorecardWithCriteria[i].updated_by
		
					});
				}
				deferred.resolve(scorecardData);

				if ($rootScope.isSafari) {
					deferred.resolve(JSONToCSVConvertor(scorecardData, $scope.groupsReportFileName, true, formate));
				} else {
					return deferred.promise;
				}
			}
		});	
		if (!$rootScope.isSafari) {
			return deferred.promise;
		}
    };
    $scope.exportPDF = function () {
        // Hide the drop down for Export so it doesnt appear in the PDF
        $(".buttons").hide();

        var pdf = new jsPDF('p', 'pt', 'a4');

        //pdf.addHTML(document.body, function () {
        //    var string = pdf.output('datauristring');
        //    //$('.preview-pane').attr('src', string);
        //});
        pdf.addHTML($("#scoreData"), function () {
            var string = pdf.output('datauristring');
            //$('.preview-pane').attr('src', string);
        });

        setTimeout(function () {
            pdf.save('scorecard.pdf');
            $(".buttons").show();
        }, 5000);
	};
	$rootScope.$on('enableScoreCard',function(event,data){
		$scope.enableScoreCard = data;
	});

}])
.controller('ScoreModelController', ['$uibModal', '$scope', '$rootScope', '$filter', 'SelectedScorecard', '$location', '$window', '$bootbox', 'ScoreCardService', 'pinesNotifications',
    function ($uibModal, $scope, $rootScope, $filter, $location, SelectedScorecard,  $window, $bootbox, ScoreCardService,pinesNotifications) {
    'use strict';
    var retData;
	$scope.currentPage = 1;
	$scope.export_scorecard_id = '';
	$scope.scoreCardCreationReq = false;
    $scope.pageSize = 100;
    $scope.mutiselectDrpVals = [];
    $scope.groupList = [];
		$scope.scorecards.groups = [];
		$scope.arrRequired    = [];
		$scope.arrInvalid     = [];
		$scope.specificErrors = [];

    ScoreCardService.getGroups().then(function(result){
       if(result.data.json !== undefined){
			$scope.groupList = result.data.json;
			console.log("acces are",$scope.groupList);
            angular.forEach($scope.groupList, function(value, key){
            	//var disabled = false;
            	//if(value.org_unit_id != $rootScope.highestOUId){
            		$scope.mutiselectDrpVals.push({'id':value.org_unit_id,'label':value.org_unit_name});
            	//}
              	
            });
						// $scope.example14settings = {scrollableHeight: '100px', scrollable: true };
        }
    });
    $scope.CurrentOUName = $rootScope.currentOUName;
	$scope.CurrentOUId = $rootScope.currentOUId;
    $scope.scorecardHeader = ['Scorecard Name', 'Created By', 'Date Created', 'Modified Date', 'Group'];
    $scope.actionHeader = ['Actions'];
    $rootScope.isSafari= $window.sessionStorage.isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window.safari || safari.pushNotification);
    $scope.ctypeOption = [
    	{key:"Pass/Fail",value:"Pass/Fail", radioOption: [] },
    	{key:"scale_0-3",value:"Scale 0-3", radioOption: ["0","1","2","3"] },
    	{key:"scale_0-5",value:"Scale 0-5", radioOption: ["0","1","2","3","4","5"] },
    	{key:"scale_0-10",value:"Scale 0-10", radioOption: ["0","1","2","3","4","5","6","7","8","9","10"] }
    ];
		$scope.moreactions=['Export','Import'];	
		$scope.importanceOption = [1,2,3,4,5,6,7,8,9,10];
		$scope.scorecards.importance = $scope.importanceOption[0];

		$scope.scorecards.criteriaList = [];
		$scope.criteriaId = 1;
		var criteria = {"id" : $scope.criteriaId ,
			"title" : "",
			"helpText":"",
			"importance":"",
			"criteria_importance":$scope.importanceOption[0],
			"ctype":$scope.ctypeOption[0]
		};
		$scope.scorecards.criteriaList.push(criteria);
		$scope.criteriaId =$scope.criteriaId+1;
		$scope.addNewCriteria = function () {
			if($scope.scorecards.criteriaList.length < 60){
				var criteria = {"id" : $scope.criteriaId,
					"title" : "",
					"display_order" : $scope.scorecards.criteriaList.length-1,
					"helpText":"",
					"criteria_importance":$scope.importanceOption[0],
					"ctype":$scope.ctypeOption[0]
				};
				$scope.scorecards.criteriaList.push(criteria);
				$scope.criteriaId =$scope.criteriaId+1;
			}else{
				pinesNotifications.notify({
						title: 'Criteria',
						text:  'cannot add more than 60',
						type:  'err'
				});
			}	
		};
		
		$scope.removeCriteria = function(index){
			
			$scope.scorecards.criteriaList.splice(index,1);
			$scope.criteriaId = $scope.criteriaId-1;
			
		};
		$scope.resetSearchFilter = function(){
			$scope.input.searchFilter = '';
		};

		$scope.resetCriteria = function(){
			
			if($scope.scorecards.criteriaList.length === 0 || $scope.scorecards.criteriaList.length === 1){
				
				$scope.scorecards.criteriaList = [];
				
				var criteria = {"id" : 1,
					"title" : "",
					//"display_order" : 1,
					"helpText":"",
					"criteria_importance":$scope.importanceOption[0],
					"ctype":$scope.ctypeOption[0]
				};
				$scope.scorecards.criteriaList.push(criteria);
			}
		};

		$scope.validateData = function (data, name, index) {
				var NAME_REGEXP = /^[a-zA-Z0-9_ -\xAE]+$/;
				var messageText;

				if (name == 'Scorecard Title') {
						if (!NAME_REGEXP.test(data)) {
								$scope.arrInvalid.push(name);
								return '   ';
						}
				}

				if (name == 'Instruction') {
						if (!NAME_REGEXP.test(data)) {
								$scope.arrInvalid.push(name);
								return '   ';
						}
				}

				if (name == 'Outcome Lable') {
						if (!NAME_REGEXP.test(data)) {
								$scope.arrInvalid.push(name);
								return '   ';
						}
				}

				if (name == 'Criteria Title') {
						if (!NAME_REGEXP.test(data)) {
								$scope.arrInvalid.push(name);
								return '   ';
						}
				}

				if (name == 'Help Text') {
						if (!NAME_REGEXP.test(data)) {
								$scope.arrInvalid.push(name);
								return '   ';
						}
				}

				if (name == 'Criteria Type') {
						if (!NAME_REGEXP.test(data)) {
								$scope.arrInvalid.push(name);
								return '   ';
						}
				}

			// 	$scope.Avail = function (data , name){
			// 	if(name == 'Available to'){
			// 		if($scope.arrRequired.length){
			// 			console.log("I am in Available to feild")
			// 			messageText ="field is required";
			// 			if($scope.arrRequired.length > 1){
			// 				messageText = "field is required";

			// 			}
			// 			$scope.isRequestSent = false;
			// 			ScoreCardService.notify({
			// 				title: 'Scorecard',
			// 				text: '\'' + $scope.arrRequired.join(', ') + '\' ' + messageText,
			// 				type: 'error'
			// 		});
			// 		var roleExist = $scope.arrRequired.indexOf("Available to");
			// 		$scope.arrInvalid = [];
			// 		$scope.arrRequired = [];
			// 		}
			// 	}
			// }

				if (name == 'Importance') {
						if ($scope.arrRequired.length) {
								messageText = 'field is required.';
								if ($scope.arrRequired.length > 1) {
										messageText = 'fields are required.';
								}
								$scope.isRequestSent = false;
								ScoreCardService.notify({
										title: 'Scorecard',
										text: '\'' + $scope.arrRequired.join(', ') + '\' ' + messageText,
										type: 'error'
								});
								var roleExist = $scope.arrRequired.indexOf("Importance");
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

								if ($scope.arrInvalid.length) {
								ScoreCardService.notify({
										title: 'Scorecard ',
										text: '\'' + $scope.arrInvalid.join(', ') + '\' ' + messageText,
										type: 'error'
								});
								}
								//var res = $scope.specificErrors.join(', ');
								$scope.isRequestSent = false;
								if ($scope.specificErrors.length) {
										ScoreCardService.notify({
												title: 'Scorecard ',
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
		$scope.AvailFeild = function(){
			if($scope.scorecards.groups.length === 0){
				ScoreCardService.notify({
					title: 'Scorecard Details Form',
					text: " 'Available to' field is required",
					type: 'error'
			});
			return false;
			}
			if($scope.scorecards.title === '' || $scope.scorecards.title === undefined || $scope.scorecards.title === null){
				ScoreCardService.notify({
					title: 'Scorecard Detail Form',
					text:  " 'Scorecard Title' field is required",
					type:  'error'
				});
				return false;
			}

			if($scope.scorecards.outcome ==='' || $scope.scorecards.outcome === undefined || $scope.scorecards.outcome === null){
				ScoreCardService.notify({
					title: 'Scorecard Detail Form',
					text:  " 'Outcome Label' field is required",
					type:  'error'
				});
				return false;
			}
		};

		$scope.uibModalInstance = $rootScope.uibModalInstance;
		$scope.saveScoreCard = function(criteria, uibModalInstance){
			$scope.scoreCardCreationReq = true;	
			if(criteria.title === '' || criteria.title === undefined || criteria.title === null){
				$scope.scoreCardCreationReq = false;
				return false;
			}
			if(criteria.groups.length === 0){
				$scope.scoreCardCreationReq = false;
				return false;
			}
			if(criteria.outcome === '' || criteria.outcome === undefined || criteria.outcome === null){
				$scope.scoreCardCreationReq = false;
				return false;
			}
			var temp_group_list = criteria.groups;
			
			criteria.ou_id = $scope.currentOUId;
            criteria.user_name = $rootScope.fullName;
            //criteria.groups = _.pluck($scope.scorecards.groups,'id');
            _.each(criteria.criteriaList, function(criteriaObj) {
            	criteriaObj.created_by = $rootScope.userId;
            	criteriaObj.updated_by = $rootScope.userId;
            	criteriaObj.display_order = _.indexOf(criteria.criteriaList,criteriaObj) + 1;	
				criteriaObj.ctype = criteriaObj.ctype;
				
            });
            criteria.groups = _.pluck(criteria.groups, 'id');
           // criteria.groups.push(parseInt($rootScope.highestOUId));
				var scoreData = {
					"criteriaList": criteria.criteriaList,
					"score_card_name": criteria.title,
					"ou_id": $scope.currentOUId,
					"user_name": $rootScope.fullName,
					"groups": criteria.groups,
					"outcome": criteria.outcome,
					"instruction": criteria.instruction,
					"importance": criteria.importance,
					"created_by" : $rootScope.userId,
					"updated_by" : $rootScope.userId
				};
				if($rootScope.score_card_id !== 0){
					var callIds = [];
					scoreData.score_card_id = $rootScope.score_card_id;
					$scope.date = new Date();
					$scope.date = moment($scope.date).tz($rootScope.timezone).format("MM-DD-YYYY h:mm:ss a");

					scoreData.score_card_modified = $scope.date;
					var score_card_id = scoreData.score_card_id;
					
					ScoreCardService.getScoreCard(score_card_id).then(function (result) {
						
						$scope.initialGroups = result.data.json.scoreCard.groups;
						$scope.initialGroups = _.pluck($scope.initialGroups, 'id');
						$scope.Uncheckedflag = true;
						var found = _.difference($scope.initialGroups, criteria.groups);
						ScoreCardService.getAttachedCalls(score_card_id).then(function (result){
							
							 callIds =  result.data.json;
							
						if ((!_.isEmpty(found)) && callIds.length >0) {
							
							$scope.Uncheckedflag = true;
							
						} else {
							$scope.Uncheckedflag = false;
						}
						if ($scope.Uncheckedflag === true) {
							$bootbox.confirm("This Scorecard is attached with calls from Groups. Are you sure you want to remove its association with groups?", function (clickedOK) {
								if (clickedOK) {
									scoreData.org_unit_id = found;
									scoreData.flag = $scope.Uncheckedflag;
									ScoreCardService.updateScoreCard(scoreData).then(function (result) {
										$scope.scoreCardCreationReq = false;
										if (result.data.result === "success") {
											ScoreCardService.enableScoreCard = true;
											$rootScope.$emit('enableScoreCard',ScoreCardService.enableScoreCard);
											pinesNotifications.notify({
												title: 'Update Scorecard',
												text: 'Successfully updated Scorecard',
												type: 'success'
											});
											var group_name = [];
											angular.forEach($scope.groupList,function(val,key){
												angular.forEach(temp_group_list, function (value, key) {
													if(val.org_unit_id == value.id){
														group_name.push(val.org_unit_name);
													}
												});
												
											});
											$scope.uibModalInstance.close();
											scoreData.group_name = group_name[0];
											scoreData.groups_list = group_name;
											var score = _.find($scope.scorecardList, { score_card_id: parseInt($rootScope.score_card_id) });
											$scope.export_scorecard_id = parseInt($rootScope.score_card_id);
											if (score !== undefined) {
												score.score_card_title = scoreData.score_card_name;
												score.updated_on = scoreData.score_card_modified;
												score.group_name = group_name[0];
												score.groups_list = group_name;
											}
										}
										else {
											pinesNotifications.notify({
												title: 'Update Scorecard',
												text: result.data.err,
												type: 'error'
											});
										}
									});
								}
							});
						}
						else {
							ScoreCardService.updateScoreCard(scoreData).then(function (result) {
								$scope.scoreCardCreationReq = false;
								
								if (result.data.result === "success") {
									ScoreCardService.enableScoreCard = true;
									$rootScope.$emit('enableScoreCard',ScoreCardService.enableScoreCard);
									pinesNotifications.notify({
										title: 'Update Scorecard',
										text: 'Successfully updated Scorecard',
										type: 'success'
									});
									var group_name = [];
									angular.forEach($scope.groupList,function(val,key){
										angular.forEach(temp_group_list, function (value, key) {
											if(val.org_unit_id == value.id){
												group_name.push(val.org_unit_name);
											}
										});
										
									});
									$scope.uibModalInstance.close();
									scoreData.group_name = group_name[0];
									scoreData.groups_list = group_name;
									
									var score = _.find($scope.scorecardList, { score_card_id: parseInt($rootScope.score_card_id) });
									$scope.export_scorecard_id = parseInt($rootScope.score_card_id);
									if (score !== undefined) {
										score.score_card_title = scoreData.score_card_name;
										score.updated_on = scoreData.score_card_modified;
										score.group_name = group_name[0];
										score.groups_list = group_name;
									}
								}
								else {
									pinesNotifications.notify({
										title: 'Update Scorecard',
										text: result.data.err,
										type: 'error'
									});
								}
							});

						}
							
						});
						
					});
				}else{
					
					ScoreCardService.createScorCard(scoreData).then(function (result) {
						$scope.scoreCardCreationReq = false;
						if (result.data.result === "success") {
							ScoreCardService.enableScoreCard = true;
							$rootScope.$emit("changeInRecords", (parseInt($scope.totalRecords) + 1));
							$rootScope.$emit('enableScoreCard',ScoreCardService.enableScoreCard);
							pinesNotifications.notify({
								title: 'Create Scorecard',
								text:  'Successfully Created Scorecard',
								type:  'success'
							});
							  
							  
							$scope.uibModalInstance.close();
							$scope.date = new Date();
							$scope.date = moment($scope.date).tz($rootScope.timezone).format("MM-DD-YYYY h:mm:ss a");

							scoreData.score_card_id = result.data.json.score_card_id;
							$scope.export_scorecard_id = result.data.json.score_card_id;
							scoreData.score_card_title = scoreData.score_card_name;
							scoreData.created_on = $scope.date;
							scoreData.updated_on = $scope.date;
							scoreData.created_by = $rootScope.fullName;
							var group_name = [];
							angular.forEach($scope.groupList, function(value, key){
									if(scoreData.groups.indexOf(value.org_unit_id) != -1){
											group_name.push(value.org_unit_name);
									}
							});
							scoreData.group_name = group_name[0];
							scoreData.groups_list = group_name;
							$scope.scorecardList.unshift(scoreData);
						}else{
							pinesNotifications.notify({
								title: 'Create Scorecard',
								text:  result.data.err,
								type:  'error'
							});
						}
					});
				}

		};
		
		
		$scope.moreActions = function(item){

			if(item === 'Export'){
				
				if($rootScope.score_card_id !== undefined && $rootScope.score_card_id > 0){
					ScoreCardService.getScoreCard($rootScope.score_card_id).then(function(result){
						
						if(result.data.json !== undefined){
							var editedScoreCard = result.data.json;
							$scope.fileName = '';
							$scope.fileName = editedScoreCard.scoreCard.score_card_title ;
							
							var link = document.createElement("a");
								link.download = $scope.fileName + "." + "json";
								var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(editedScoreCard));
								link.href = "data:" + data;
								link.click();
							$scope.scorecards.actions = '';
							console.log("at end of the file");
						}
					});
				}
			}
			if(item === 'Import'){
				$scope.scorecards.actions = '';
				var importScoreCardModel = $uibModal.open({
					ariaLabelledBy: 'modal-title',
					ariaDescribedBy: 'modal-body',
					templateUrl: './views/import-scorecard.html',
					scope: $scope,
						backdrop  : 'static',
						keyboard  : false,
					size: 'lg',
					resolve: {
					}
				});
				$scope.importScoreCardModel = importScoreCardModel;
				//$scope.importScoreCard();
			}
		};

		$scope.importScoreCard = function() {

			var f = document.getElementById('file').files[0],
				r = new FileReader();
				
		if(f === undefined){
			pinesNotifications.notify({
								title: 'Import ScoreCard',
								text:  "Import File is not selected",
								type:  'error'
							});
		}
		else{
			if(f.name.slice(-5) != ".json"){
				pinesNotifications.notify({
								title: 'Import ScoreCard',
								text:  "Please import a .json file",
								type:  'error'
							});
			}
			else{
				r.onloadend = function(e) {
				var data = decodeURIComponent(escape(e.target.result.replace(/[^\x00-\x7F]/g, "")));
				var ctypeOption = [{key:"Pass/Fail",value:"Pass/Fail", radioOption: [] },
    							{key:"scale_0-3",value:"Scale 0-3", radioOption: ["0","1","2","3"] },
    							{key:"scale_0-5",value:"Scale 0-5", radioOption: ["0","1","2","3","4","5"] },
    							{key:"scale_0-10",value:"Scale 0-10", radioOption: ["0","1","2","3","4","5","6","7","8","9","10"] }
							];
							//console.log("data===========import====",data)			
				var editedScoreCard =JSON.parse(data);
				
				$scope.scorecards.criteriaList = [];
				$scope.scorecards.groups = [];
				
							
				_.forEach($scope.groupList, function(id){
					_.forEach(editedScoreCard.scoreCard.groups,function(group){
						if(group.id == id.org_unit_id){
							$scope.scorecards.groups.push(group);
						}
					});
				});
				
				//$scope.scorecards.groups = editedScoreCard.scoreCard.groups;
				$scope.scorecards.title = f.name.slice(0,-5);
				$scope.scorecards.instruction = editedScoreCard.scoreCard.instructions;
				$scope.scorecards.importance = editedScoreCard.scoreCard.importance;
					// angular.forEach(editedScoreCard.scoreCard.groups, function(value, key){
					// 		// if(editedScoreCard.scoreCard.groups.indexOf(value.org_unit_id) != -1){
					// 		 		//if(value.id != $rootScope.highestOUId)
					// 					$scope.scorecards.groups.push({id:value.org_unit_id, label:value.org_unit_name});
					// 		 //}
					//  });
				$scope.scorecards.outcome = editedScoreCard.scoreCard.outcome_label;
				angular.forEach(editedScoreCard.scoreCriteriaList, function(value, key){
					//console.log("criteria_type", value.criteria_type);
					
					if(value.criteria_type === "" || value.criteria_type === undefined || value.criteria_type === null){
						
						pinesNotifications.notify({
							title: 'Import ScoreCard',
							text:  "Criteria_Type can not be blank",
							type:  'error'
						});
						
						$scope.uibModalInstance.close();
						console.log("i am here");
					}
					else{
						var ctype = {
							key:  value.criteria_type,
							value: _.find(ctypeOption, function(opt){ return opt.key == value.criteria_type; }).value,
							radioOption: _.find(ctypeOption, function(opt){ return opt.key == value.criteria_type; }).radioOption
						};
						$scope.scorecards.criteriaList.push({'criteria_id':value.criteria_id,'title':value.criteria_title,'ctype':ctype,'helpText':value.help_text,'criteria_importance':value.criteria_importance,'acceptCheck':value.is_required});
					}
				});
		
			};
		
			r.readAsBinaryString(f);
			$scope.importScoreCardModel.close();
			}
			
			
		}
		
		};

		
		
	}]);
