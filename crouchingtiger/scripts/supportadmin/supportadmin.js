angular
	.module("admin-session", ['org-unit'])
	.factory("AdminSession", function ($rootScope, $window, OrgUnitLocal) {
		'use strict';
		var AdminSession = {};

		AdminSession.isAdmin = function () {
			return angular.isDefined(this.adminType);
		};
		AdminSession.setAdminType = function(role_id) {
		    //$rootScope.role_id = $window.sessionStorage.role_id = role_id;
		    if (role_id === 5) {
		        this.adminType = "support";
		    } else if (role_id === 6) {
			    this.adminType = "super";
		    } else if (role_id === 7) {
			    this.adminType = "partner";
		    }
		};
		return AdminSession;
	})
	.factory("SupportAdminWebService", function (ApiParam, $http) {
		'use strict';
		var SupportAdminWebService = {};		
		
		SupportAdminWebService.getBillingNodes = function (adminType, user_id) {
			return $http.get(ApiParam.baseURL() + "/v1/support/billingnodes/"+adminType+"/"+user_id, ApiParam.headerConfig());
		};

		SupportAdminWebService.switchToSystemOUadmin = function(data) {
			return $http.post(ApiParam.baseURL() + "/v1/support/switchuser", data, ApiParam.headerConfig());
		};

		SupportAdminWebService.getAdminList = function(ou_id) {
			return $http.get(ApiParam.baseURL() + "/v1/support/adminlist/"+ou_id, ApiParam.headerConfig());
		};

		SupportAdminWebService.switchToAdmin = function(supportToken, userToken) {
			return $http.post(ApiParam.baseURL() + "/v1/support/switchback", {'support_token':supportToken, 'user_token':userToken }, ApiParam.headerConfig());
		};
		
		SupportAdminWebService.getPartnerAdminUser = function(ou_id, user_id) {
			return $http.get(ApiParam.baseURL() + "/v1/support/partneradminuser/"+ou_id+"/"+user_id, ApiParam.headerConfig());
		};
		
		SupportAdminWebService.getGlobalSearch = function(adminType, user_id, category, searchText, limit, offset) {
			return $http.get(ApiParam.baseURL() + "/v1/support/search/"+adminType+"/"+user_id+"/"+category+"/"+encodeURIComponent(searchText)+"/"+limit+"/"+offset, ApiParam.headerConfig());
		};

		return SupportAdminWebService;
	})
	.controller("SupportAdminAccessController", [
		"$scope", "$rootScope", "AdminSession", "SupportAdminWebService", "$routeParams", "$location","$cookies", "pinesNotifications", "OrgUnitLocal", "DynamicCssInsertion", "$window", "LogoutService",
		function($scope, $rootScope, AdminSession, SupportAdminWebService, $routeParams, $location,$cookies,  pinesNotifications, OrgUnitLocal, DynamicCssInsertion, $window, LogoutService) {
			AdminSession.setAdminType(parseInt($window.sessionStorage.role_id));
			if (!AdminSession.isAdmin()) {
			    $location.path("/access-denied");
			}
			if(!$rootScope.user_id){
				$rootScope.user_id = parseInt($window.sessionStorage.user_id);
			}
			//Initializations
			$scope.currentPage = 1;
            $scope.pageSize = 10;
			$scope.limit = 10;
			$scope.offset = 0;
			$scope.searchData = [];
			$scope.filterApplied = false;
			$scope.searchText = '';
			$scope.searchLoading = true;
			$scope.noDataFound = false;
			$scope.totalSearchData = 0;
			$scope.adminType = AdminSession.adminType;
			$scope.pagination = { current: ($routeParams.page ? $routeParams.page : 1) };
			$scope.searchHeader = ["Search Results", "Billing Account", "Billing ouid", "Users"];

			if($scope.adminType != 'partner'){
				$scope.searchHeader = ["Search Results", "Billing Account", "Billing ouid", "Users"];
			}else{
				$scope.searchHeader = ["Search Results", "Billing Account", "Billing ouid"];
			}

			$scope.actionHeader = ["Action"];
			$scope.categoryList = [
				{ name : "Account Name", value: "account_name" },
				{ name : "Sub Group Names",value: "group_name" },
				{ name : "External Group ID",value: "org_unit_ext_id" },
				{ name : "Tracking Number",value: "tracking_number" },
				{ name : "Tracking Number Name",value: "tracking_number_name" },
				{ name : "Ring to number",value: "ring_to_number" },
				{ name : "User name",value: "user_name" },
				{ name : "Email",value: "email" },
				{ name : "External User ID",value: "user_ext_id" },
				{ name : "Campaign name",value: "campaign_name" }
			];
			
			SupportAdminWebService.getBillingNodes(AdminSession.adminType, $rootScope.user_id).then(function (dataResult) {
				var arrBillingNodes = dataResult.data.data;
				console.log("TOKEN", $window.sessionStorage.token);
				if (arrBillingNodes.length) {
					$scope.billingNodes = _.sortBy(arrBillingNodes, "org_unit_name");
				} else {
					$scope.billingNodes = [];
				}

			}).catch(function (err) {
				console.log("For some reason there was an ", err);
			});

			$scope.getAdminList = function(ou_id, adminType) {
				angular.element('.ui-pnotify').hide();
				if(adminType == 'partner') {
					//$scope.selectedAdmin = 101;
					//$scope.adminList = 101;
					SupportAdminWebService.getPartnerAdminUser(ou_id, $rootScope.user_id).then(function(result) {
						if (result.data.status === 'success') {
							console.log("-----------result:---");
							console.log(result.data.data);
							$scope.selectedAdmin = result.data.data[0].ct_user_id;
						}
					}).catch(function(err) {
						console.log('Strange error with admin list', err);
					});
					
				}else {
					$scope.adminList = null;
					for(var i=0; i<$scope.billingNodes.length; i++){
						if($scope.billingNodes[i].org_unit_id == ou_id)
						{
							if($scope.billingNodes[i].allow_admin === false && $scope.adminType === 'support'){
								pinesNotifications.notify({
									title: "Support access",
									text:  "Customer support access is set to No. Please check with the customer on the access.",
									type:  "error"
								});
								break;
							}
							else{
								SupportAdminWebService.getAdminList(ou_id).then(function(result) {
									if (result.data.status === 'success') {
										$scope.adminList = result.data.data;
									}
								}).catch(function(err) {
									console.log('Strange error with admin list', err);
								});
								break;
							}
						}
					}
				}
			};

			$scope.switchToUserAccount = function(adminUser, userList, adminType) {
				if(userList.length < 1){
					userList = $scope.adminList;
				}
				adminUser = parseInt(adminUser);
				if(adminType != 'partner') {
					var isValidUser = _.chain(userList)
									.pluck("ct_user_id")
									.contains(adminUser)
									.value();

					if (!isValidUser) {
						return pinesNotifications.notify({
							title: "Billing Nodes",
							text:  "Invalid admin user for billing node selected",
							type:  "error"
						});
					}
				}

				var data = {
					'user_id': adminUser,
					'token': $window.sessionStorage.token
				};

				SupportAdminWebService.switchToSystemOUadmin(data).then(function (systemOUadminData) {
					// update token for user to take over
					if (systemOUadminData.status !== 200 || !systemOUadminData.data.access_token) {
						return pinesNotifications.notify({
							title: "Billing Nodes",
							text:   "Invalid response from server for switching to user account of selected billing node.",
							type:  "error"
						});
					}
					var sessionObj = systemOUadminData.data;
					var so = sessionObj.session;
					$cookies.put('ct_token', sessionObj.access_token);
					$scope.isLoggedIn = true;
					$rootScope.loginState = 'loggedin';
					$rootScope.token          = $window.sessionStorage.token          = sessionObj.access_token;
					$rootScope.currentOUId    = $window.sessionStorage.currentOUId    = so.ou_id;
					$rootScope.currentOUName  = $window.sessionStorage.currentOUName  = so.ou_name;
					$rootScope.currentOULevel = $window.sessionStorage.currentOULevel = 0;
					$rootScope.topLevelOUId   = $window.sessionStorage.topLevelOUId   = so.tl_id;
					$rootScope.userOULevel    = $window.sessionStorage.userOULevel    = so.user_ou_level;
					$rootScope.highestOUId    = $window.sessionStorage.highestOUId    = so.ou_id;
					$rootScope.highestOUName  = $window.sessionStorage.highestOUName  = so.ou_name;
					$rootScope.userId         = $window.sessionStorage.userId         = so.user_id;
					$rootScope.fullName       = $window.sessionStorage.fullName       = so.first_name + " " + so.last_name;
					$rootScope.timezone       = $window.sessionStorage.timezone       = so.timezone;
					$rootScope.billingId      = $window.sessionStorage.billingId      = so.billing_id;
					$rootScope.supportToken   = $window.sessionStorage.supportToken   = so.support_token;
					$rootScope.access_audio   = $window.sessionStorage.access_audio   = so.access_audio;
					$rootScope.userEmail	  = $window.sessionStorage.userEmail      = so.email;
					$rootScope.partnerConvirzaAdmin	  = $window.sessionStorage.partnerConvirzaAdmin      = true;
					
					$rootScope.roleId         = $window.sessionStorage.roleId         = so.role_id;
					$rootScope.score_call = $window.sessionStorage.score_call = so.score_call;
		      		$rootScope.protect_caller_id = $window.sessionStorage.protect_caller_id   = so.protect_caller_id;
					$rootScope.orglist        = $window.sessionStorage.orglist        = so.orglist;
					$window.sessionStorage.prompts        = JSON.stringify(sessionObj.session.prompts);
					$window.sessionStorage.voicemails     = JSON.stringify(sessionObj.session.voicemails);
					$window.sessionStorage.whispers       = JSON.stringify(sessionObj.session.whispers);
					$rootScope.prompts        = JSON.parse($window.sessionStorage.prompts);
					$rootScope.voicemails     = JSON.parse($window.sessionStorage.voicemails);
					$rootScope.whispers       = JSON.parse($window.sessionStorage.whispers);
					$rootScope.bc_ous[0].id =  $rootScope.highestOUId;
					$rootScope.bc_ous[0].name = $rootScope.highestOUName;
					$rootScope.levelOneOus = so.levelOneOus;
					$rootScope.is_migrated = $window.sessionStorage.is_migrated =so.is_migrated;
					$window.sessionStorage.levelOneOus = JSON.stringify(so.levelOneOus);

					if(so.badge && so.badge > 0){
						$rootScope.activeConversation   = $window.sessionStorage.activeConversation   = so.badge;
					}

					if(so.reports.length === 0){
						$rootScope.reports = [];
					}else {
						$window.sessionStorage.reports = JSON.stringify(so.reports);
						$rootScope.reports        = so.reports;
					}
					$rootScope.chatURL    = $window.sessionStorage.chatURL    = "https://support.convirza.com/customer/portal/chats/new";
					$rootScope.white_label_active = $window.sessionStorage.white_label_active = false;

					if (Object.keys(so.style).length > 0) {
						if (so.style.white_label_active === true) {
							$rootScope.white_label_active = $window.sessionStorage.white_label_active = true;
						}
						if(!so.style.support_url && !so.style.domain_name){
							$rootScope.supportURL = $window.sessionStorage.supportURL = "https://knowledgebase.convirza.com";
						}else{
							$rootScope.supportURL = $window.sessionStorage.supportURL = so.style.support_url;
						}
						$rootScope.chatActive = $window.sessionStorage.chatActive = so.style.chat_active;
					} else {
						$rootScope.supportURL = $window.sessionStorage.supportURL = "https://knowledgebase.convirza.com";
						$rootScope.chatActive = $window.sessionStorage.chatActive = true;
					}
					$window.sessionStorage.scope = JSON.stringify(sessionObj.scope);
					// get user scopes
					OrgUnitLocal.getUserAccess(sessionObj.scope);
					$rootScope.$emit('current-ou-updated', {
						'id': parseInt($rootScope.currentOUId),
						'level': 0,
						'billing_id': parseInt($rootScope.billingId)
					});
					// dynamically inject the custom CSS styling into the document
					if (so.style.org_logo === undefined) { so.style.org_logo = null; }
					if (so.style.white_label_css && so.style.white_label_css !== undefined && Object.keys(so.style.white_label_css).length > 0) {
						DynamicCssInsertion.whiteLabelCSSInject(so.style.white_label_css, so.style.org_logo, so.style.org_logo, false);
					} else {
						DynamicCssInsertion.whiteLabelCSSInject(null, null, null, false);
					}
					$window.sessionStorage.style = JSON.stringify(so.style);
					localStorage.setItem("sessionStorageData", JSON.stringify($window.sessionStorage));
					$location.path("/");

				}).catch(function (err) {
					pinesNotifications.notify({
						title: "Billing Nodes",
						text:  "Session has expired",
						type:  "error"
					});
					LogoutService.logout();
				});
			};

			$scope.applyFilter = function(){
				$scope.filterApplied = true;
				$scope.searchLoading = true;
				SupportAdminWebService.getGlobalSearch(AdminSession.adminType, $rootScope.user_id, $scope.category, $scope.searchText, $scope.limit, $scope.offset).then(function (dataResult) {
					if(dataResult.data.data && dataResult.data.data.length > 0){
						var responce = dataResult.data;
						$scope.searchData = [];
						$scope.searchData = responce.data;
						$scope.totalSearchData = (responce.total) ? responce.total : 0;
						$scope.noDataFound = false;
						$scope.searchLoading = false;
					}else{
						$scope.searchData = [];
						$scope.noDataFound = true;
						$scope.searchLoading = false;
					}
				}).catch(function (err) {
					console.log("For some reason there was an ", err);
					$scope.noDataFound = true;
					$scope.searchLoading = false;
				});
			};

			$scope.pageChanged = function(newPage) {
                $scope.offset = ($scope.pageSize * ($scope.pagination.current - 1));
                $scope.applyFilter();
			};
			
			$scope.clearFilter = function(){
				$scope.filterApplied = false;
				$scope.searchText = '';
				$scope.category = '';
				$scope.searchData = [];
			};

			$scope.changeCategory = function(){
				$scope.searchData = [];
				$scope.totalSearchData = 0;
			};
		}
	]);
