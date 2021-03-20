angular
	.module('breadcrumb', ["api-param", "whitelabel","theme.navigation-controller"])
    .factory('BreadcrumbWebService', function($q, $http, $window, $rootScope, ApiParam) {

  	'use strict';
    var BreadcrumbWebService = {};

  	BreadcrumbWebService.getChildrenOUs = function(id) {
  		$http.defaults.useXDomain = true;
  		return $http.get(ApiParam.baseURL() + '/v1/orgUnit?org_unit_parent_id=' + id, ApiParam.headerConfig());
  	};


	BreadcrumbWebService.getOUData = function(id) {
  		$http.defaults.useXDomain = true;
		return $http.get(ApiParam.baseURL() + '/v1/orgUnit/'+id, ApiParam.headerConfig());
  	};

    BreadcrumbWebService.getOUDataInfo = function(id) {
	    $http.defaults.useXDomain = true;
	    return $http.get(ApiParam.baseURL() + '/v1/orgUnit/info/'+id, ApiParam.headerConfig());
    };

	BreadcrumbWebService.updateUser= function(nc) {
		var req = {
			method:  'PUT',
			url:     ApiParam.baseURL() + '/v1/user',
			headers: ApiParam.headerConfig().headers,
			data:    nc
		};
		return $http(req);
	};
	$rootScope.level1OUs = [];
	$rootScope.bc_ous = [
		{"id": $rootScope.highestOUId, "name": $rootScope.highestOUName},
		{"id": null, "name": null},
		{"id": null, "name": null}
	];

	$rootScope.showLevel1 = false;
	$rootScope.showLevel2 = false;

	BreadcrumbWebService.loadLevel1 = function(id) {
		$rootScope.showOUInput1 = false;
		$rootScope.showLevel1 = true;
		$rootScope.showLevel2 = false;

		this.getChildrenOUs(id).then(function(response) {
			var result = response.data;
			$rootScope.level2OUs =  [];
			$rootScope.level3OUs =  [];
			//console.log(result);
			for (var x in result.json) {
				$rootScope.level2OUs.push({"id":result.json[x].org_unit_id, "name":result.json[x].org_unit_name});
				//console.log(ou)
			}
		}, function errorHandler(err) {
			console.log('err fetching children');
			console.log(err);
		});
	};

	BreadcrumbWebService.loadLevel2 = function(id) {
		$rootScope.showOUInput2 = false;
		$rootScope.showLevel2 = true;
		$rootScope.level3Parent = id;
		this.getChildrenOUs(id).then(function(response) {
			var result = response.data;
			$rootScope.level3OUs =  [];
			//console.log(result);
			for(var x in result.json) {
				$rootScope.level3OUs.push({"id":result.json[x].org_unit_id, "name":result.json[x].org_unit_name});
				//console.log(ou)
			}
		}, function errorHandler() {
			console.log('err fetching children');
			console.log(err);
		});
	};

	return BreadcrumbWebService;
})
.controller('BreadcrumbController', ['$scope', 'BreadcrumbWebService', '$rootScope', '$routeParams', 'pinesNotifications', 'OrgUnitLocal', '$location', 'OrgUnitWebService', '$route', '$window', "DynamicCssInsertion","menuBarService",
    function($scope, BreadcrumbWebService, $rootScope, $routeParams, pinesNotifications, OrgUnitLocal, $location, OrgUnitWebService, $route, $window, DynamicCssInsertion,menuBarService) {
        'use strict';

	    $scope.showBreadCrumb = true;
        var pagesToNotShowBreadCrumb = [
            "/profile",
            "/acq-call-flows",
            "/acq-call-flows4",
            "/calls-details",
			"/set-select-score",
			"/set-score-card",
            "/calls-callback",
			"/call-overview",
            "/settings-call-flow",
            "/activity-group",
			"/set-blacklist",
            "/cfa-reports",
			"/scheduled-plans",
			"/access-denied",
			"/support",
			"/login",
			"/login-admin",
			"/sms-conversations"
        ];
	    $scope.$on("$locationChangeStart", function (event) {
		    $scope.showBreadCrumb = !_.contains(pagesToNotShowBreadCrumb, $location.path()); // Hide breadcrumb if we're on /profile page
		    if($location.path() == '/set-schedule-builder' && ($location.search()).id){
		    	$scope.showBreadCrumb = false;
		    }
	    });

			$scope.resizeWindow = function () {
				setTimeout(function() {
					$(window).trigger('resize');
				}, 50);
			};

			$(window).scroll(function() {
				var yoda = window.pageYOffset;
				var scroll_position = 200;

				if(yoda > scroll_position) {
					$(window).trigger('resize');
				}
			});

		$scope.loadLevel1 = function(id) {
			BreadcrumbWebService.loadLevel1(id);
		};

		$scope.loadLevel2 = function(id) {
			BreadcrumbWebService.loadLevel2(id);
		};

		$rootScope.$on('current-ou-updated', function(event, orgiUnit) {
			// profileObj contains; name, country and email from emitted event
			if(($rootScope.level2OUs === undefined || $rootScope.level2OUs.length < 1) && orgiUnit.level > 1 && orgiUnit.billing_id !== null && orgiUnit.parent_id !== undefined ){
				BreadcrumbWebService.getChildrenOUs(orgiUnit.billing_id).then(function(response) {
					var result = response.data;
					$rootScope.level2OUs =  [];
					//console.log(result);
					for(var x in result.json) {
						$rootScope.level2OUs.push({"id":result.json[x].org_unit_id, "name":result.json[x].org_unit_name});
						//console.log(ou)
					}
					$scope.setCurrentOU(orgiUnit.id, orgiUnit.level, $scope.doNothing, true);
				}, function errorHandler() {
					console.log('err fetching children');
					console.log(err);
				});
			}else{
				$scope.setCurrentOU(orgiUnit.id, orgiUnit.level, $scope.doNothing, true);
			}
			
		});
    $scope.setCurrentOU = function(id, level, callback2, isNotfromBreadcrumb) {
			//check to see if they are allowed to change to this ou
			//note: levels start at 0

			BreadcrumbWebService.getOUDataInfo(id)// Load Breadcrumb Data
			.success(function(result) {
				$rootScope.white_label_active = $window.sessionStorage.white_label_active = false;

				//if(result.json[0].style.org_unit_id === Number(id) && result.json[0].style.white_label_active === true) {
				if(result.json[0].style.white_label_active === true) {
					$rootScope.white_label_active = $window.sessionStorage.white_label_active = true;
				}
				$rootScope.protect_caller_id = $window.sessionStorage.protect_caller_id = result.json[0].protect_caller_id;
				//update session
				//OrgUnitLocal.updateSessData(id, result.json[0].org_unit_name, level);
				// check for white label styling
				if (result.json[0].style && Object.keys(result.json[0].style).length > 0) {
					$rootScope.chatURL    = $window.sessionStorage.chatURL    = "https://support.convirza.com/customer/portal/chats/new"; //result.json[0].style.chat_url;
					$rootScope.chatActive = $window.sessionStorage.chatActive = result.json[0].style.chat_active;
					if(!result.json[0].style.support_url && !result.json[0].style.domain_name){
						$rootScope.supportURL = $window.sessionStorage.supportURL = "https://knowledgebase.convirza.com";
					}else{
						$rootScope.supportURL = $window.sessionStorage.supportURL = result.json[0].style.support_url;
					}
					// dynamically inject the custom CSS styling into the document
					//if (result.json[0].style.white_label_css && Object.keys(result.json[0].style.white_label_css).length > 0) {
                        DynamicCssInsertion.whiteLabelCSSInject(result.json[0].style.white_label_css, result.json[0].style.org_logo, result.json[0].style.org_logo, false);
					//}

				} else { // allow the style to be set to default if no style is set
					$rootScope.chatURL    = $window.sessionStorage.chatURL    = "https://support.convirza.com/customer/portal/chats/new";
					$rootScope.chatActive = $window.sessionStorage.chatActive = true;
					$rootScope.supportURL = $window.sessionStorage.supportURL = "https://knowledgebase.convirza.com";
					DynamicCssInsertion.whiteLabelCSSInject(null, null, null, false);
				}

				$rootScope.feedbackURL = $window.sessionStorage.feedbackURL = "https://convirza.uservoice.com?sso=" + window.sessionStorage.uservoiceSSO;
				$rootScope.currentOUId    = $window.sessionStorage.currentOUId    = id;
				$rootScope.currentOUName  = $window.sessionStorage.currentOUName  = result.json[0].org_unit_name;
				$rootScope.currentOULevel = $window.sessionStorage.currentOULevel = level;
				//update session
				$rootScope.bc_ous[level].id = id;
				$rootScope.bc_ous[level].name = result.json[0].org_unit_name;
				//if we are setting the third level search second level ou's for the returned parent id to get that ou name and set it for the breadcrumbs
				if (level === 2) {
					//loop over level2OUs to get selected level 3 ou parent id name
					for(var z in $scope.level2OUs) {
						if ($scope.level2OUs[z].id == result.json[0].org_unit_parent_id) {
							$rootScope.bc_ous[1].id = result.json[0].org_unit_parent_id;
							$rootScope.bc_ous[1].name = $scope.level2OUs[z].name;
						}
					}
				}else if(level === 1){
					$rootScope.showLevel2 = false;
					$rootScope.showLevel1 = true;
					for(var x in $rootScope.levelOneOus) {
						if ($rootScope.levelOneOus[x].id == result.json[0].org_unit_parent_id) {
							$rootScope.bc_ous[0].id = result.json[0].org_unit_parent_id;
							$rootScope.bc_ous[0].name = $rootScope.levelOneOus[x].name;
						}
					}
				} else{
					$rootScope.showLevel2 = false;
					$rootScope.showLevel1 = false;
					for(var y in $rootScope.levelOneOus) {
						if ($rootScope.levelOneOus[y].id == result.json[0].org_unit_parent_id) {
							$rootScope.bc_ous[0].id = result.json[0].org_unit_parent_id;
							$rootScope.bc_ous[0].name = $rootScope.levelOneOus[y].name;
						}
					}
				}
				//loop to clear out breadcrumbs at higher levels
				var tempLevel = level;
				while (tempLevel < 2) {
					tempLevel++;
					$rootScope.bc_ous[tempLevel].id = null;
					$rootScope.bc_ous[tempLevel].name = null;
				}

				$scope.showBoxes = false;
				//update root scope values
				$rootScope.currentOUId   = id;
				$rootScope.currentOUName = result.json[0].org_unit_name;
				$rootScope.currentOULevel = level;
				$window.sessionStorage.bc_ous = JSON.stringify($rootScope.bc_ous);
				if(result.json[0].prompts && result.json[0].prompts.length > 0){
					$rootScope.prompts = result.json[0].prompts;
					$window.sessionStorage.prompts = JSON.stringify($rootScope.prompts);
				}
				if(result.json[0].whispers && result.json[0].whispers.length > 0){
					$rootScope.whispers = result.json[0].whispers;
					$window.sessionStorage.whispers = JSON.stringify($rootScope.whispers);
				}
				if(result.json[0].voicemails && result.json[0].voicemails.length > 0){
					$rootScope.voicemails = result.json[0].voicemails;
					$window.sessionStorage.voicemails = JSON.stringify($rootScope.voicemails);
				}
				
				localStorage.setItem("sessionStorageData", JSON.stringify($window.sessionStorage));
				//console.log($rootScope.bc_ous);
				$rootScope.selectedOU = {"id":id, "level": level};
				if(!isNotfromBreadcrumb){
					if ($location.path() == '/set-campaign-builder' || $location.path() == '/set-legacy-campaign-builder') {
						$location.path('/set-campaign');
					}else if ($location.path() == '/set-schedule-builder'){
							$location.url('/set-scheduled');
					} else {
						$route.reload();
					}
				}
				var menu = menuBarService.getMenuBar();
				_.each(menu, function(main, mainIndex) { // cycle through main menu
					if (main.label === 'Settings') { // matched main menu entry
						_.each(menu[mainIndex].children, function(sub, subIndex) { // cycle through sub-menu
						  	if (sub.label === 'Customization') { // matched sub-menu entry
							  // insert White Label into sub-menu list at end
						  		var index = _.findLastIndex(menu[mainIndex].children[subIndex].children, {
							  		label: 'Blacklist'
								});
							  	if(result.json[0].protect_caller_id){
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
				$rootScope.download_audio_enabled = $window.localStorage.download_audio_enabled = result.json[0].download_audio_enabled;
				$scope.handleDownloadAudioSetting(menu, $rootScope.download_audio_enabled);
				//menuBarService.setMenuBar(menu);
			})
			.error(function(err) {
				console.log('err fetching Org');
				console.log(err);
			});
			callback2('done');
		};

		$scope.handleDownloadAudioSetting = function(menu, allowDownloadAudio){
			var legacyReportMenuIndex = _.findIndex(menu, { label: 'Legacy Reports' });
			if(allowDownloadAudio == true) {
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
		};

		$scope.setSelected = function(id, level) {
			$rootScope.selectedOU = {"id":id, "level": level};
			if(level >= $rootScope.userOULevel) { }
			//console.log($rootScope.selectedOU);
		};

		//$scope.setCurrentOU($rootScope.highestOUId, 0, function() {

		//});

		$scope.editOU = function(ouid, level) {
			$scope.setCurrentOU(ouid, level, function() {
				$location.path("/set-group");
				$scope.showBoxes = false;
			});
		};

		$scope.doNothing = function() {};

		$scope.saveOU = function(ouName,parentId,level) {
			var formValid = false;
			//validate one form or the other
			if(level == 1) {
				formValid = $scope.newOUForm1.$valid;
			}
			else if(level == 2) {
				formValid = $scope.newOUForm2.$valid;
			}
			if (formValid) {
				var ouData = {
					orgUnit: {
						org_unit_name:   ouName,
						org_unit_parent_id: parentId,
						org_unit_status: 'inactive'
					}
				};

				OrgUnitWebService.createOrgUnit(ouData)
				.then(function(result) {
					var text = null;
					if(result.data.status != 'error') {
					pinesNotifications.notify({
						title: 'Company Details',
						text: ouData.orgUnit.org_unit_name + ' created ',
						type: 'success'
					});
					if(level == 1) {
						$scope.showOUInput1 = false;
						$scope.level2OUs.push({id: result.data.json.insertId, name: ouName});
					}
					else if(level == 2) {
						$scope.showOUInput2 = false;
						$scope.level3OUs.push({id: result.data.json.insertId, name: ouName});
						}
					} else {
						pinesNotifications.notify({
							title: 'Company Details',
							text: result.data.err,
							type: 'error'
						});
					}

				});
			}
			else {
				pinesNotifications.notify({
                    title: 'Group Name',
                    text: 'Please provide a group name.',
                    type: 'error'
                });
			}
		};

		$scope.saveOUEnter=function(ouName,parentId,level,key) {
			//if enter was pressed
			if(key == 13) {
				$scope.saveOU(ouName,parentId,level);
			}

		};

		$scope.setFocus = function(elemId) {
			var element = document.getElementById(elemId);
			setTimeout(function(){ element.focus(); }, 100);
		};

	    //console.log($rootScope.bc_ous);
	    //set missing breadcrumb on reload
	    if ($rootScope.currentOULevel === '1' && $rootScope.bc_ous[1].id === null) {
		    //console.log('first level ', $rootScope.currentOUId, $rootScope.currentOUName);
		    $rootScope.bc_ous[1].id = $rootScope.currentOUId;
		    $rootScope.bc_ous[1].name = $rootScope.currentOUName;

		    BreadcrumbWebService.loadLevel1($rootScope.highestOUId);
	    }
	    if ($rootScope.currentOULevel === '2' && $rootScope.userOULevel !== '2') {
		    //console.log('second level ',  $rootScope.currentOUId, $rootScope.currentOUName);
		    $rootScope.bc_ous[2].id = $rootScope.currentOUId;
		    $rootScope.bc_ous[2].name = $rootScope.currentOUName;
		    //get level 2 ou id and name
		    //get parent id
		    BreadcrumbWebService.getOUData($rootScope.currentOUId).success(function(result) {
			    //console.log('parent of current OU ', result.json[0].org_unit_parent_id);
			    if (result.json[0].org_unit_parent_id) {
				    //get parent info
				    //console.log(result.json[0].org_unit_parent_id);
				    BreadcrumbWebService.getOUData(result.json[0].org_unit_parent_id).success(function(result2) {
					    //console.log(result2);
					    $rootScope.bc_ous[1].id = result2.json[0].org_unit_id;
					    $rootScope.bc_ous[1].name = result2.json[0].org_unit_name;

					    //console.log('level1 ', $rootScope.highestOUId, 'level2 ', result.json[0].org_unit_parent_id)
					    BreadcrumbWebService.loadLevel1($rootScope.highestOUId);
					    $scope.loadLevel2(result.json[0].org_unit_parent_id);
				    });
			    }
		    });
	    }
    }
]);
