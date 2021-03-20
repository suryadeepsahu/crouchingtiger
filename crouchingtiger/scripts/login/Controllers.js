/*global ElizaBot:false */
/*global unescape:false */

angular
    .module('theme.pages-controllers', ['ngCookies'])
    .factory('LoginWebService', function($q, $timeout, $http, $window, $rootScope) {
        'use strict';
		var LoginWebService = {};

		LoginWebService.notify = function (args) {
			PNotify.removeAll();
			var notification = new PNotify(args);
			notification.notify = notification.update;
			return notification;
		};

		LoginWebService.getToken = function(cred) {
			var req = {
				method: 'POST',
				url: $rootScope.url + ":" + $rootScope.port + "/oauth/token",
				headers: {
					'content-type': 'application/json'
				},
				data: cred
			};
			return $http(req);
		};

		LoginWebService.recover = function(email) {
			var req = {
				method: 'POST',
				url: $rootScope.url + ":" + $rootScope.port + "/login/recover",
				headers: {
					'content-type': 'application/json'
				},
				data: email
			};
			return $http(req);
		};

		LoginWebService.reset = function(info) {
			var req = {
				method: 'POST',
				url: $rootScope.url + ":" + $rootScope.port + "/login/reset",
				headers: {
					'content-type': 'application/json'
				},
				data: info
			};
			return $http(req);
		};

		LoginWebService.resetCheck = function(token) {
			var req = {
				method: 'GET',
				url: $rootScope.url + ":" + $rootScope.port + "/login/resetCheck/" + token,
				headers: {
					'content-type': 'application/json'
				}
			};
			return $http(req);
		};

		/*LoginWebService.logout = function(info) {
			var req = {
				method: 'POST',
				url: $rootScope.url + ":" + $rootScope.port + "/login/logout",
				headers: {
					'content-type': 'application/json'
				},
				data: info
			};
			return $http(req);
		};
		*/

        return LoginWebService;
    })
    .factory('$remember', function($cookies) {
        'use strict';

		// retrieve current cookie if no value is passed, otherwise set the cookie with the current values
        return function(name, values) {
	        var exdays = 365; // set cookie for a year
	        var $cook = $cookies.get(name);
	        //console.log('cookie ' + name, $cook);
	        if (arguments.length === 1) {
		        if ($cook) {
			        var data = CryptoJS.AES.decrypt($cookies.get(name), "Security");
			        return data.toString(CryptoJS.enc.Utf8);
		        }
		        return false;
	        }
 	        // set cookie settings and value - AngularJS v1.4
			// console.log('Saving cookie data');
	        //var option = {
		    //    expires     : moment().add(exdays, 'd').format('ddd, DD MMM YYYY:HH:mm:ss ZZ')
	        //};
	        $cookies.put(name, CryptoJS.AES.encrypt(values, "Security"));
        };
    })

.controller('SignupPageController', ['$scope', '$global', function($scope, $global) {
    'use strict';
    $global.set('fullscreen', true);

    $scope.$on('$destroy', function() {
        $global.set('fullscreen', false);
    });
}])

.controller('LoginController', ['$scope', '$global', '$http', '$location', 'LoginWebService', '$cookies','$remember', '$window', 'OrgUnitLocal', '$rootScope', 'DynamicCssInsertion',"progressLoader",
		function($scope, $global, $http, $location, LoginWebService, $cookies, $remember, $window, OrgUnitLocal, $rootScope, DynamicCssInsertion, progressLoader) {
		    'use strict';
			
			$scope.remember = false; // set default to off
			$scope.forever = ($cookies.forever ? $cookies.forever : false);
			var email = $remember('data'); // grab value if it exists in cookie
            if (email) { // set to current scope
                $scope.remember = true;
                $scope.email     = email;
            }
            if($location.search().email){
              $scope.email = $location.search().email;
            }
            $scope.error = "";
            $global.set('fullscreen', true);
            $scope.$on('$destroy', function() { $global.set('fullscreen', false); });
			$scope.logIn = function() {

                if ($scope.remember && angular.isDefined($scope.email)) {
                    $remember('data', $scope.email);
                } else {
                    $remember('data', '');
				}
				progressLoader.start();
			    
				var env = $cookies.get('name');
	            var data = {
		            'grant_type'    :'password',
		            'username'      :$scope.email.toLowerCase(),
		            'password'      :$scope.password,
		            'client_id'     :$cookies.get('client_id'),
		            'client_secret' :$cookies.get('client_secret')
				};
				progressLoader.set( 60 );

                LoginWebService.getToken(data).then(function(result) {
	                if (result.data.status === 'success') {
		                // remember is set then save the refresh token to cookie
		                if ($scope.forever) {
			                //var option = { expires : moment().add(30, 'd').format('ddd, DD MMM YYYY:HH:mm:ss ZZ') };
			                $cookies.forever = 'on';
			                $cookies.refresh_token = result.data.refresh_token; //, option);
		                }
		                $cookies.put('ct_token', result.data.access_token); // set token to a cookie
                        $scope.isLoggedIn = true;
            						$rootScope.loginState = 'loggedin';
            						$window.sessionStorage.token = result.data.access_token;
			                $rootScope.currentOUId    = $window.sessionStorage.currentOUId    = result.data.session.ou_id;
							$rootScope.currentOUName  = $window.sessionStorage.currentOUName  = result.data.session.ou_name;
							$rootScope.currentOULevel = $window.sessionStorage.currentOULevel = 0;
							$rootScope.topLevelOUId   = $window.sessionStorage.topLevelOUId   = result.data.session.tl_id;
							$rootScope.userOULevel    = $window.sessionStorage.userOULevel    = result.data.session.user_ou_level;
							$rootScope.highestOUId    = $window.sessionStorage.highestOUId    = result.data.session.ou_id;
							$rootScope.highestOUName  = $window.sessionStorage.highestOUName  = result.data.session.ou_name;
							$rootScope.userId         = $window.sessionStorage.userId         = result.data.session.user_id;
							$rootScope.fullName       = $window.sessionStorage.fullName       = result.data.session.first_name +' '+ result.data.session.last_name;
							$rootScope.timezone       = $window.sessionStorage.timezone       = result.data.session.timezone;
							$rootScope.billingId      = $window.sessionStorage.billingId      = result.data.session.billing_id;
							$rootScope.billingOu      = $window.sessionStorage.billingOu      = result.data.session.billing_ou;
							$rootScope.userEmail      = $window.sessionStorage.userEmail      = result.data.session.email;
							if(result.data.session.badge && result.data.session.badge > 0){
								$rootScope.activeConversation      = $window.sessionStorage.activeConversation      = result.data.session.badge;
							}
								
	                    $rootScope.orglist        = $window.sessionStorage.orglist        = result.data.session.orglist;
                      $rootScope.score_call     = $window.sessionStorage.score_call     = result.data.session.score_call;
                      $rootScope.access_audio = $window.sessionStorage.access_audio = result.data.session.access_audio;
					  $rootScope.is_migrated = $window.sessionStorage.is_migrated = result.data.session.is_migrated;
					  $rootScope.download_audio_enabled = $window.localStorage.download_audio_enabled = result.data.session.download_audio_enabled;
					  if(result.data.session.prompts !== undefined && result.data.session.prompts!=="" && result.data.session.prompts!==null){
						$window.sessionStorage.prompts = JSON.stringify(result.data.session.prompts);
					  }else{
						$window.sessionStorage.prompts = [];
					  }
					  if(result.data.session.voicemails !== undefined && result.data.session.voicemails!=="" && result.data.session.voicemails!==null){
						$window.sessionStorage.voicemails = JSON.stringify(result.data.session.voicemails);
					  }else{
						$window.sessionStorage.voicemails = [];
					  }
					  if(result.data.session.whispers !== undefined && result.data.session.whispers!=="" && result.data.session.whispers!==null){
						$window.sessionStorage.whispers = JSON.stringify(result.data.session.whispers);
					  }else{
						$window.sessionStorage.whispers = [];
					  }
					  if($window.sessionStorage.prompts === undefined || $window.sessionStorage.prompts === null || $window.sessionStorage.prompts === ""){
						$rootScope.prompts = [];
					  }else{
						$rootScope.prompts = JSON.parse($window.sessionStorage.prompts);
					  }
					  if($window.sessionStorage.voicemails === undefined || $window.sessionStorage.voicemails ===null ||  $window.sessionStorage.voicemails === ""){
						$rootScope.voicemails = [];
					  }else{
						$rootScope.voicemails = JSON.parse($window.sessionStorage.voicemails);
					  }
					  if($window.sessionStorage.whispers === undefined || $window.sessionStorage.whispers ===null ||  $window.sessionStorage.whispers === ""){
						$rootScope.whispers = [];
					  }else{
						$rootScope.whispers = JSON.parse($window.sessionStorage.whispers);
					  }
		              if(result.data.session.reports.length === 0){
		                $rootScope.reports = [];
                    		$window.sessionStorage.reports = JSON.stringify(result.data.session.reports);
		              }else {

		                $window.sessionStorage.reports = JSON.stringify(result.data.session.reports);
		                $rootScope.reports        = result.data.session.reports;
		              }
						$window.sessionStorage.levelOneOus    = JSON.stringify(result.data.session.levelOneOus);
						$rootScope.levelOneOus    = result.data.session.levelOneOus;
						$rootScope.bc_ous = [
							{"id": $rootScope.highestOUId, "name": $rootScope.highestOUName},
							{"id": null, "name": null},
							{"id": null, "name": null}
						];
	                	$rootScope.roleId         = $window.sessionStorage.roleId         = result.data.session.role_id;
			            $rootScope.uservoiceSSO   = $window.sessionStorage.uservoiceSSO   = result.data.session.uservoiceSSO;
			            $rootScope.protect_caller_id = $window.sessionStorage.protect_caller_id   = result.data.session.protect_caller_id;

			            // Safari 3.0+ "[object HTMLElementConstructor]"
			            $rootScope.isSafari= $window.sessionStorage.isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window.safari || safari.pushNotification);


                    	// only set when used by a support admin
		                if (result.data.session.support_token !== undefined) {
			                $rootScope.supportToken      = $window.sessionStorage.supportToken = result.data.session.support_token;
		                }
						//check to see if white label is active for the current ou
 						$rootScope.white_label_active = $window.sessionStorage.white_label_active = false;
		                $rootScope.chatURL    = $window.sessionStorage.chatURL    = "https://support.convirza.com/customer/portal/chats/new";
						if(!result.data.session.style){
							result.data.session.style = {};
						} 
 						//if(Number(result.data.session.style.org_unit_id) === Number($rootScope.currentOUId) && result.data.session.style.white_label_active === true) {
						if (result.data.session.style.white_label_active === true) {
 							$rootScope.white_label_active = $window.sessionStorage.white_label_active = true;
 						}
		                if (Object.keys(result.data.session.style).length > 0) {
			                $rootScope.chatActive = $window.sessionStorage.chatActive = result.data.session.style.chat_active;
							if(!result.data.session.style.support_url && !result.data.session.style.domain_name){
								$rootScope.supportURL = $window.sessionStorage.supportURL = "https://knowledgebase.convirza.com";
							}else{
								$rootScope.supportURL = $window.sessionStorage.supportURL = result.data.session.style.support_url;
							}
		                } else {
							$rootScope.chatActive = $window.sessionStorage.chatActive = true;
							$rootScope.supportURL = $window.sessionStorage.supportURL = "https://knowledgebase.convirza.com";
		                }
						// Set the supportURL and UserVoice SSO to the generated SSO token (this has to happen here or it will not work)
						$rootScope.feedbackURL = $window.sessionStorage.feedbackURL = "https://convirza.uservoice.com?sso=" + $window.sessionStorage.uservoiceSSO;
						// window.UserVoice.setSSO($rootScope.uservoiceSSO);
						$window.sessionStorage.scope = JSON.stringify(result.data.scope);
						$window.sessionStorage.style = JSON.stringify(result.data.session.style);
		                // set the user access list
						OrgUnitLocal.getUserAccess(result.data.scope);
						console.log("Is pendo loaded 1: ", $window.sessionStorage.loadedPendoScript);
						if($window.sessionStorage.loadedPendoScript && $window.sessionStorage.loadedPendoScript === 'YES'){
							if(!$rootScope.white_label_active){
								console.log("Pendo Loading");
								pendoInitializeOnLogin();
							}else if($rootScope.white_label_active && !result.data.session.style.domain_name){
								pendoInitializeOnLogin();
							}
						}
		                // dynamically inject the custom CSS styling into the document
		                if (!result.data.session.style.org_logo) { result.data.session.style.org_logo = null; }
		                if (result.data.session.style.white_label_css && Object.keys(result.data.session.style.white_label_css).length > 0) {
			                DynamicCssInsertion.whiteLabelCSSInject(result.data.session.style.white_label_css, result.data.session.style.org_logo, result.data.session.style.org_logo, false);
		                } else {
			                DynamicCssInsertion.whiteLabelCSSInject(null, null, null, false);
		                }
						localStorage.setItem("sessionStorageData", JSON.stringify($window.sessionStorage));
                    } else {
		                console.log('FAILED', result);
                        $scope.error = (result.err ? result.err : "Invalid email or password");
	                }

					progressLoader.end();
                }).catch(function(err) {
					progressLoader.end();
					if (err.data.error_description && err.data.error_description === 'Invalid resource owner credentials') {
						$scope.error = "Invalid email or password";
					} else if (err.data.error_description) {
						$scope.error = err.data.error_description;
					} else {
						$scope.error = "Invalid email or password";
					}
                });
            };

			$scope.recoverPass = function(email) {
				console.log(email);
				$scope.show_fail = false;
				$scope.show_succes = false;
				$scope.error = '';

				var EMAIL_REGEXP = /^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,9})$/;
				if (!angular.isDefined(email) || email.trim().length === 0) {
					$scope.error = "Email field can not be empty.";
					$scope.show_fail = true;
				}
				else if (!EMAIL_REGEXP.test(email)) {
					$scope.error = "Invalid e-mail address";
					$scope.show_fail = true;

				} else {
					var data = {
						"domain": location.host,
						'username': email
					};
					LoginWebService.recover(data).then(function(result) {
						if (result.data.result === 'success') {
							$scope.show_success = true;
							$scope.hide_next = true;
						} else {
							$scope.error = result.data.err;
							$scope.show_fail = true;
						}
					});
				}
			};

			$scope.closeFail = function() {
				console.log('hit close fail');
				$scope.show_fail = false;
			};
        }
    ])
	.controller('ResetController', ['$scope', '$global', '$http', '$location', 'LoginWebService', '$remember', '$window', 'OrgUnitLocal', '$rootScope', 'DynamicCssInsertion','$cookies',
		function($scope, $global, $http, $location, LoginWebService, $remember, $window, OrgUnitLocal, $rootScope, DynamicCssInsertion, $cookies) {
			'use strict';

			$global.set('fullscreen', true);
			$scope.$on('$destroy', function() { $global.set('fullscreen', false); });

			$scope.token = $location.search().token;
			console.log('TOKEN: ' + $scope.token);

			// retrieve user account information
			if ($scope.token) {
				LoginWebService.resetCheck($scope.token).then(function (result) {
					if (result.data.result === 'success') {
						$scope.username = result.data.json.username;
						$scope.first_name = result.data.json.first_name;
						$scope.last_name = result.data.json.last_name;
						$scope.ct_user_id = result.data.json.ct_user_id;
					} else {
						$scope.error = 'Invalid or expired account token used';
						$scope.show_fail = true;
						$scope.hide_next = true;
					}
				});
			} else {
				$scope.error = 'No valid token present - cannot proceed.';
				$scope.show_fail = true;
				$scope.hide_next = true;
			}

			$scope.resetPass = function() {
				$scope.show_fail = false;

				if($scope.passwd) {
					if ($scope.passwd !== $scope.verifypass) {
						$scope.error = 'Passwords do not match';
						$scope.show_fail = true;

					} else if ($scope.passwd.length < 6) {
						$scope.error = 'Password must be at least 6 characters in length';
						$scope.show_fail = true;

					} else {

						var data = {
							'username'  :$scope.username,
							'password'  :$scope.passwd,
							'token'     :$scope.token,
							'ct_user_id':$scope.ct_user_id
						};

						LoginWebService.reset(data).then(function (result) {
							if (result.data.result === 'success') {
								var env = $cookies.get('name');
								var loginData = {
									'grant_type'    :'password',
									'username'      :$scope.username.toLowerCase(),
									'password'      :$scope.passwd,
									'client_id'     :$cookies.get('client_id'),
									'client_secret' :$cookies.get('client_secret')
								};
								LoginWebService.getToken(loginData).then(function (result) {
									if (result.data.result !== 'error') {
										$scope.isLoggedIn = true;
										$cookies.put('ct_token', result.data.access_token); // set token to a cookie
										$rootScope.token          = $window.sessionStorage.token          = result.data.access_token;
										$rootScope.currentOUId    = $window.sessionStorage.currentOUId    = result.data.session.ou_id;
										$rootScope.currentOUName  = $window.sessionStorage.currentOUName  = result.data.session.ou_name;
										$rootScope.currentOULevel = $window.sessionStorage.currentOULevel = 0;
										$rootScope.topLevelOUId   = $window.sessionStorage.topLevelOUId   = result.data.session.tl_id;
										$rootScope.userOULevel    = $window.sessionStorage.userOULevel    = result.data.session.user_ou_level;
										$rootScope.highestOUId    = $window.sessionStorage.highestOUId    = result.data.session.ou_id;
										$rootScope.highestOUName  = $window.sessionStorage.highestOUName  = result.data.session.ou_name;
										$rootScope.userId         = $window.sessionStorage.userId         = result.data.session.user_id;
                   						$rootScope.email          = $window.sessionStorage.email          = result.data.session.email;
										$rootScope.fullName       = $window.sessionStorage.fullName       = result.data.session.first_name +' '+ result.data.session.last_name;
										$rootScope.timezone       = $window.sessionStorage.timezone       = result.data.session.timezone;
										$rootScope.billingId      = $window.sessionStorage.billingId      = result.data.session.billing_id;
										$rootScope.billingOu      = $window.sessionStorage.billingOu      = result.data.session.billing_ou;
										$rootScope.orglist      = $window.sessionStorage.orglist          = result.data.session.orglist;
                    					$rootScope.score_call     = $window.sessionStorage.score_call     = result.data.session.score_call;
                   						$rootScope.access_audio = $window.sessionStorage.access_audio = result.data.session.access_audio;
										$rootScope.is_migrated = $window.sessionStorage.is_migrated = result.data.session.is_migrated;
										$rootScope.download_audio_enabled = $window.localStorage.download_audio_enabled = result.data.session.download_audio_enabled;
										if(result.data.session.badge && result.data.session.badge > 0){
											$rootScope.activeConversation      = $window.sessionStorage.activeConversation      = result.data.session.badge;
										}
										if(result.data.session.prompts && result.data.session.prompts.length){
											$window.sessionStorage.prompts = JSON.stringify(result.data.session.prompts);
											$rootScope.prompts =  JSON.parse($window.sessionStorage.prompts);
										}
										if(result.data.session.voicemails && result.data.session.voicemails.length){
											$window.sessionStorage.voicemails = JSON.stringify(result.data.session.voicemails);
											$rootScope.voicemails =  JSON.parse($window.sessionStorage.voicemails);
										}
										if(result.data.session.whispers && result.data.session.whispers.length){
											$window.sessionStorage.whispers = JSON.stringify(result.data.session.whispers);
											$rootScope.whispers =  JSON.parse($window.sessionStorage.whispers);
										}
										console.log("login.....$rootScope.access_audio==",$rootScope.access_audio);
										if(result.data.session.reports.length === 0){
											$rootScope.reports = [];
                      								$window.sessionStorage.reports = JSON.stringify(result.data.session.reports);
										}else {
											$window.sessionStorage.reports = JSON.stringify(result.data.session.reports);
											$rootScope.reports        = result.data.session.reports;
										      }
									     $window.sessionStorage.levelOneOus    = JSON.stringify(result.data.session.levelOneOus);
									     $rootScope.levelOneOus    = result.data.session.levelOneOus;
									       $rootScope.bc_ous = [
										 {"id": $rootScope.highestOUId, "name": $rootScope.highestOUName},
										 {"id": null, "name": null},
										 {"id": null, "name": null}
									       ];
										$rootScope.roleId         = $window.sessionStorage.roleId         = result.data.session.role_id;
										$rootScope.protect_caller_id  = $window.sessionStorage.protect_caller_id        = result.data.session.protect_caller_id;
										// only set when used by a support admin
										if (result.data.session.support_token !== undefined) {
											$rootScope.supportToken      = $window.sessionStorage.supportToken      = result.data.session.support_token;
										}
										//check to see if white label is active for the current ou
										$rootScope.chatURL    = $window.sessionStorage.chatURL    = "https://support.convirza.com/customer/portal/chats/new";
										$rootScope.white_label_active = $window.sessionStorage.white_label_active = false;
										if (result.data.session.style && result.data.session.style.white_label_active === true) {
											$rootScope.white_label_active = $window.sessionStorage.white_label_active = true;
										}

										if(!result.data.session.style){
											result.data.session.style = {};
										}
										if (Object.keys(result.data.session.style).length > 0) {
											$rootScope.chatActive = $window.sessionStorage.chatActive = result.data.session.style.chat_active;
											if(!result.data.session.style.support_url && !result.data.session.style.domain_name){
												$rootScope.supportURL = $window.sessionStorage.supportURL = "https://knowledgebase.convirza.com";
											}else{
												$rootScope.supportURL = $window.sessionStorage.supportURL = result.data.session.style.support_url;
											}
										} else {
											$rootScope.chatActive = $window.sessionStorage.chatActive = true;
											$rootScope.supportURL = $window.sessionStorage.supportURL = "https://knowledgebase.convirza.com";
										}
										$rootScope.feedbackURL = $window.sessionStorage.feedbackURL = "https://convirza.uservoice.com?sso=" + $window.sessionStorage.uservoiceSSO;
										$window.sessionStorage.scope = JSON.stringify(result.data.scope);
										$window.sessionStorage.style = JSON.stringify(result.data.session.style);
										// set the user access list
										OrgUnitLocal.getUserAccess(result.data.scope);
										console.log("Is pendo loaded 2: ", $window.sessionStorage.loadedPendoScript);
										if($window.sessionStorage.loadedPendoScript && $window.sessionStorage.loadedPendoScript === 'YES'){
											if(!$rootScope.white_label_active){
												console.log("Pendo Loading");
												pendoInitializeOnLogin();
											}else if($rootScope.white_label_active && !result.data.session.style.domain_name){
												pendoInitializeOnLogin();
											}
										}
										// dynamically inject the custom CSS styling into the document
										if (result.data.session.style && result.data.session.style.org_logo === undefined) { result.data.session.style.org_logo = null; }
										if (result.data.session.style && result.data.session.style.white_label_css !== undefined && Object.keys(result.data.session.style.white_label_css).length > 0) {
											DynamicCssInsertion.whiteLabelCSSInject(result.data.session.style.white_label_css, result.data.session.style.org_logo, result.data.session.style.org_logo, false);
										} else {
											DynamicCssInsertion.whiteLabelCSSInject(null, null, null, false);
										}
										
										localStorage.setItem("sessionStorageData", JSON.stringify($window.sessionStorage));
										$location.path("/");
									} else {
										$scope.error = result.data.err;
										$scope.show_fail = true;
									}
								});

							} else {
								$scope.error = result.data.err;
								$scope.show_fail = true;
							}
						});
					}
				}
				else {
					$scope.error = 'You must enter a Password';
					$scope.show_fail = true;
				}
			};

			$scope.closeFail = function() {
				$scope.show_fail = false;
			};
		}
	])
    .controller('RegistrationPageController', ['$scope', '$timeout', function($scope, $timeout) {
        'use strict';
        $scope.checking = false;
        $scope.checked = false;
        $scope.checkAvailability = function() {
            if ($scope.reg_form.username.$dirty === false) return;
            $scope.checking = true;
            $timeout(function() {
                $scope.checking = false;
                $scope.checked = true;
            }, 500);
        };
    }])
    .controller('ChatRoomController', ['$scope', '$timeout', function($scope, $t) {
        'use strict';
        var eliza = new ElizaBot();
        var avatars = ['potter.png', 'tennant.png', 'johansson.png', 'jackson.png', 'jobs.png'];
        $scope.messages = [];
        $scope.userText = '';
        $scope.elizaTyping = false;
        $scope.elizaAvatar = 'johansson.png';

        $scope.sendMessage = function(msg) {
            var im = {
                class: 'me',
                avatar: 'jackson.png',
                text: msg
            };
            this.messages.push(im);
            this.userText = '';

            $t(function() {
                $scope.elizaAvatar = _.shuffle(avatars).shift();
                $scope.elizaTyping = true;
            }, 500);

            $t(function() {
                var reply = eliza.transform(msg);
                var im = {
                    class: 'chat-success',
                    avatar: $scope.elizaAvatar,
                    text: reply
                };
                $scope.elizaTyping = false;
                $scope.messages.push(im);
            }, 1200);
        };
    }])
    .directive('scrollToBottom', function() {
        'use strict';
        return {
            restrict: 'A',
            scope: {
                model: '=scrollToBottom'
            },
            link: function(scope, element, attr) {
                scope.$watch('model', function(n, o) {
                    if (n != o) {
                        element[0].scrollTop = element[0].scrollHeight;
                    }
                });
            }
        };
    })
	.controller('AdminLoginController', ['$scope', '$global', '$http', '$location', 'LoginWebService', '$cookies','$remember', '$window', 'OrgUnitLocal', '$rootScope', "AdminSession", "pinesNotifications",
		function($scope, $global, $http, $location, LoginWebService, $cookies, $remember, $window, OrgUnitLocal, $rootScope, AdminSession, pinesNotifications) {
			'use strict';

			$scope.remember = false; // set default to off
			$scope.forever = ($cookies.forever ? $cookies.forever : false);
			var email = $remember('data'); // grab value if it exists in cookie
			if (email) { // set to current scope
				$scope.remember = true;
				$scope.email     = email;
			}
			$scope.error = "";
			$global.set('fullscreen', true);
			$scope.$on('$destroy', function() { $global.set('fullscreen', false); });

			$scope.logIn = function() {
				if ($scope.remember && angular.isDefined($scope.email)) {
					$remember('data', $scope.email);
				} else {
					$remember('data', '');
				}
				var env = $cookies.get('name');
				var data = {
					'grant_type'    :'password',
					'username'      :$scope.email,
					'password'      :$scope.password,
					'client_id'     :$cookies.get('client_id'),
					'client_secret' :$cookies.get('client_secret')
				};
				LoginWebService.getToken(data).then(function(result) {
					console.log("------------result:-----------");
					console.log(result);
					if (result.data.status === 'success') {
						try {
							if (!_.contains([5, 6, 7], result.data.session.role_id)) { // shorter than two '!==' checks
								pinesNotifications.notify({
									title: "Permissions",
									text:  "You dont have permission to login as an Admin.\n\n You are being redirected to the standard login page.", // Err I mean an Org Unit
									type:  "error"
								});
								$location.path('/login');
								return; // if it doesn't return out of here, it will proceed to send them to the dashboard
							}
						}
						catch (e) {
							if (e.name === "TypeError") {
								console.log("Your object property access path is unavailable. Probably a backend problem.");
							} else {
								console.log("Error thrown from login response - figure out how to handle this:\n", e);
							}

							$location.path('/login');
							return;
						}

						// remember is set then save the refresh token to cookie
						if ($scope.forever) {
							$cookies.forever = 'on';
							$cookies.refresh_token = result.data.refresh_token; //, option);
						}

						$scope.isLoggedIn = true;
						$rootScope.user_id = $window.sessionStorage.user_id = result.data.session.user_id;
						$rootScope.token = $window.sessionStorage.token = result.data.access_token;
						$cookies.put('ct_token', $rootScope.token);
						$rootScope.role_id = $window.sessionStorage.role_id = result.data.session.role_id;
						AdminSession.setAdminType(result.data.session.role_id);
						//AdminSession.setToken(result.data.access_token);
						$location.path("/admin-access");

					} else {
						$scope.error = (result.error_description ? result.error_description : "Invalid email or password");
					}
				})
				.catch(function(err) {
					$scope.error = (err.data.error_description ? err.data.error_description : "Invalid email or password");
				});
			};
		}
	]);
