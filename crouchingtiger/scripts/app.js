angular
    .module( 'themesApp', [
        //'easypiechart',
        'toggle-switch',
        'ui.bootstrap',
        //'ui.tree',
        'ui.select2',
        'ngGrid',
        'xeditable',
        'flow',
        'theme.services',
        'theme.directives',
        'theme.navigation-controller',
        'theme.notifications-controller',
        'theme.messages-controller',
        'theme.colorpicker-controller',
        //'ngFileSaver',
        //'theme.layout-horizontal',
        //'theme.layout-boxed',
        'theme.ui-modals',
        'theme.ui-tables-basic',
        //'theme.ui-panels',
        'logout',
        //'theme.vector_maps',
        //'theme.google_maps',
        //'theme.calendars',
        //'theme.gallery',
        //'theme.tasks',
        //'theme.ui-ratings',
        //'theme.ui-tiles',
        //'theme.ui-alerts',
        //'theme.ui-sliders',
        //'theme.ui-progressbars',
        //'theme.ui-carousel',
        //'theme.ui-nestable',
        //'theme.form-image-crop',
        //'theme.tables-ng-grid2',
        //'theme.tables-ng-grid3',
        //'theme.setup-campaign-builder2b',
        //'theme.ui-paginations',
        //'theme.ui-tabs',
        //'email-digest-builder',
        'theme.form-components',
        'theme.form-directives',
        'theme.form-validation',
        'theme.form-inline',
        'theme.form-uploads',
        'theme.tables-ng-grid',
        'theme.tables-editable',
        'theme.charts-flot',
        //'theme.charts-canvas',
        //'theme.charts-svg',
        'theme.charts-inline',
        'theme.pages-controllers',
        'theme.pages-signup',
        'theme.pages-support',
        'theme.dashboard',
        'theme.callsdetails',
        'theme.calloverview',
        'theme.conversations',
        'theme.cfareports',
	    'theme.scorecards',
        'theme.select-score-detail',
        'theme.cfcontroller',
        'theme.templates',
        'theme.template-overrides',
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ngRoute',
        'ngAnimate',
        'ngMaterial',
        'smDateTimeRangePicker',
        'call-flows',
        'ngIdle',
        'campaigns-builder',
        'old-campaigns-builder',
        'callers-blacklist',
        'users-builder',
        'org-unit',
        'old-org-unit',
        'breadcrumb',
        'georoute-builder',
        'old-georoute-builder',
        'tag-builder',
        'dni',
        'theme.call_flow',
        //'theme.report_campaign',
        'theme.report_service',
        'activitystream-builder',
        'infinite-scroll',
        'webhook',
        'caller_privacy',
        'dataappend',
        'subscriptions',
        'doubleclick',
        'googleanalytics',
        'dashboard_report_widgets',
		"api-param",
		"admin-session",
		"timehelper",
		"report-param",
		"numForm",
		"whitelabel",
        "call-flow-settings",
        // 'sandboxing',
        // 'turn/stickyTableHeader',
        'turn/stickyTableHeader2',
        'turn/stickyTableHeader3',
        // "ng/deviceDetector",
        "group_activity",
        "group_activity_webservices",
        "scheduled_reports",
        "scheduled_plans",
        "scheduled_report_webservices",
        "distributionList",
        "distribution_list_webservices",
        "scheldue_url_formatter",
        "filter_helper",
        "campaign_list",
        "ngTagsInput",
        "campaign_list_webservices",
        'angularjs-dropdown-multiselect',
        'angularjs-dropdown-multiselect-v2',
        'angularjs-dropdown-multiselect-v3',
        'angularjs-dropdown-multiselect-v4',
        "com.2fdevs.videogular",
        "com.2fdevs.videogular.plugins.controls",
        "textAngular",
        "vanity-number"
        ])
    .config( function($logProvider) {
        angular.injector(['ngCookies']).invoke(['$cookies', function($cookies) {
            var ENV = $cookies.get('name');
            $logProvider.debugEnabled( ENV === 'development' );
        }]);
    })
    .config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }])
    .config(function(paginationTemplateProvider) {
        paginationTemplateProvider.setPath('../views/dirPagination.tpl.html');
    })
    .config(function(tagsInputConfigProvider) {
        tagsInputConfigProvider.setDefaults('tagsInput', { placeholder: '' });
        tagsInputConfigProvider.setActiveInterpolation('tagsInput', { placeholder: true });
      })
    .config(function(IdleProvider, KeepaliveProvider) {
            // configure Idle settings
            IdleProvider.idle(5); // in seconds
            IdleProvider.timeout(3600); // in seconds
            KeepaliveProvider.interval(2); // in seconds
    })
    .factory('loggerService', function() {
        'use strict';
        return {
            logAction: function(name, action) { return true; }
        };
    })
	.factory('errorInterceptor', function ($q, $cookies, $location) {
	    return {
	        response: function (response) {
				if (response.status === 200) {
					// console.log('got a :', response.status);
				}
	            return response || $q.when(response);
	        },
	        responseError: function (response) {
	            if (response && response.status === 401) {
					console.log('got a :', response.status);
					window.sessionStorage.removeItem('token');
                    delete window.sessionStorage.token;
                    $cookies.remove('ct_token');
                    $location.path('login');
                    //$scope.disconnectSocket();
	            }
	            return $q.reject(response);
	        }
	    };
	})
	.config(function ($httpProvider) {
    	$httpProvider.interceptors.push('errorInterceptor');
	})
    .filter('truncate_campaignGroupName', function () {
        return function (value, key) {
            if (!value) return '';
            if((key !== 'campaign_name' && key !== 'org_unit_name') && (key !== 'campaign' && key !== 'group') && (key !== 'camp_name')) return value;
            var max = 30;
            max = parseInt(max, 10);
            if (!max) return value;
            if (value.length <= max) return value;
            value = value.substr(0, max);
                var lastspace = value.lastIndexOf(' ');
                if (lastspace != -1) {
                    value = value.substr(0, lastspace);
                }
            return value + (' …');
        };
    })
    .filter('truncate_campGroupName', function () {
        return function (value) {
                if (!value) return '';
                var max = 30;
                max = parseInt(max, 10);
                if (!max) return value;
                if (value.length <= max) return value;
                value = value.substr(0, max);
                        var lastspace = value.lastIndexOf(' ');
                        if (lastspace != -1) {
                                value = value.substr(0, lastspace);
                        }
                return value + (' …');
        };
    })
    .filter('truncate_smsCampGroupName', function(){
       return function (value) {
        if (!value) return '';
        var max = 30;
        max = parseInt(max);
        if (!max) return value;
        if (value.length <= max) return value;
        value = value.substr(0, max);
        return value + (' …');
       };
    })
    .factory('smsWebService', function( $http, ApiParam) {
        'use strict';
        var smsWebService = {};
        smsWebService.sendMessage = function(data) {
            var req = {
                method: 'POST',
                url: ApiParam.baseURL() + "/v1/conversation/sendMessage",
                headers: ApiParam.headerConfig().headers,
                data: data
            };
            return $http(req);
        };
        smsWebService.getChatHistory = function(conversation_id) {
            $http.defaults.useXDomain = true;
            return $http.get(ApiParam.baseURL() + "/v1/conversation/chatHistory/" +conversation_id, ApiParam.headerConfig());
        };
        smsWebService.setConversationStatus = function(conversation_id,status) {
            $http.defaults.useXDomain = true;
            return $http.put(ApiParam.baseURL() + "/v1/conversation/status/",{conversation_id: conversation_id , conversation_status: status}, ApiParam.headerConfig());
        };
        smsWebService.getLiveMessages = function(conversation_ids) {
            $http.defaults.useXDomain = true;
            return $http.get(ApiParam.baseURL() + "/v1/conversation/live-sms?ids=" +conversation_ids, ApiParam.headerConfig());
        };  
        return smsWebService;
    })
    .filter('chatHeading', function(){
        return function(conversation) {
           var chatHeading = conversation.org_unit_name; 
           var labelUpdate = conversation.labelUpdate;
           chatHeading = chatHeading + ((labelUpdate && labelUpdate!=='') ? ('-'+labelUpdate): '');
           if(chatHeading.length > 34){
            return chatHeading.substring(0, 34)+'...';
           } else {
            return chatHeading;
           }
        };
    })
    .controller( 'MainController', ['$scope', '$global', '$timeout', '$cookies', '$interval', 'progressLoader', '$location', 'loggerService', '$window', '$rootScope', 'OrgUnitLocal', 'LogoutService', "AdminSession", "SupportAdminWebService", "Idle", "ApiParam", "$http","$document","pinesNotifications","ConversationWebService","smsWebService",
        function($scope, $global, $timeout, $cookies, $interval, progressLoader, $location, loggerService, $window,  $rootScope, OrgUnitLocal, LogoutService, AdminSession, SupportAdminWebService, Idle, ApiParam, $http,$document,pinesNotifications,ConversationWebService,smsWebService) {
            'use strict';
            $rootScope.loginState = 'nologin';
            var token = null;
            var is_from_phantom = false;
            is_from_phantom = $cookies.get('is_from_phantom');
            if(is_from_phantom){
                $window.sessionStorage.is_from_phantom = is_from_phantom;
            }else{
                $window.sessionStorage.is_from_phantom = false;
            }
			console.log("MAIN TOKEN", $window.sessionStorage.token);
            if (!angular.isDefined($window.sessionStorage.token)) {
                console.log('getting token from cookie');
                token = $cookies.get('ct_token');
                console.log('token', token);
                if (token) {
                    console.log('Found token - setting to', token);
                    $window.sessionStorage.token = token;
                    //$scope.isLoggedIn = true;
                    //$rootScope.loginState = 'loggedin';
                }
            } else {
                console.log('Skipping cookie lookup', $window.sessionStorage.token);
            }
            $scope.isMaximize=true;
            $scope.chatboxClass=[];
            $scope.conversationData=[];
            $scope.time=moment().format('MM-DD-YY HH:mm A');
            $scope.countChatWindow=[];
            $scope.countAdd=0;
            $scope.chatWindowLoading=false;
            $scope.isPreviewMode = false;
            $scope.style_fixedHeader = $global.get('fixedHeader');
            $scope.style_headerBarHidden = $global.get('headerBarHidden');
            $scope.style_layoutBoxed = $global.get('layoutBoxed');
            $scope.style_fullscreen = $global.get('fullscreen');
            $scope.style_leftbarCollapsed = $global.get('leftbarCollapsed');
            $scope.style_leftbarCollapsed = $global.get('leftbarCollapsed');
            $scope.style_leftbarShown = $global.get('leftbarShown');
            $scope.style_rightbarCollapsed = $global.get('rightbarCollapsed');
            $scope.style_isSmallScreen = false;
            $scope.style_showSearchCollapsed = $global.get('showSearchCollapsed');
            $scope.style_layoutHorizontal = $global.get('layoutHorizontal');
            $scope.events = [];
            $scope.oldLabelChat = null;
            var env = $cookies.get('name');
            var history = [];
            var callsHistory = [];

            if ($location.search().preview === 'true') {
              $scope.isPreviewMode = true;
            }
            $rootScope.url = $cookies.get('restapiurl');
            $rootScope.socketUrl = $cookies.get('socketUrl');
            $rootScope.port = $cookies.get('port');
            $rootScope.dniHost = $cookies.get('dniHost');
            console.log('getting token from cookie');
            token = $cookies.get('ct_token');
            console.log('token', token);
            if (token) {
                console.log('Found token - setting to', token);
                $window.sessionStorage.token = token;
                // $scope.isLoggedIn = false;
                // LogoutService.logout();
                $scope.isLoggedIn = true;
                $rootScope.loginState = 'loggedin';
            }


            //recover white label enabled setting after reload
            if($window.sessionStorage.white_label_active) $rootScope.white_label_active = $window.sessionStorage.white_label_active;

            $scope.$on( 'IdleStart', function() {
                // the user appears to have gone idle
            });

            $scope.$on( 'IdleWarn', function(e, countdown) {
                // follows after the $idleStart event, but includes a countdown until the user is considered timed out
                // the countdown arg is the number of seconds remaining until then.
                // you can change the title or display a warning dialog from here.
                // you can let them resume their session by calling $idle.watch()
            });

            $scope.$on( 'IdleTimeout', function() {
                // the user has timed out (meaning idleDuration + timeout has passed without any activity)
                // this is where you'd log them
                //$scope.logOut();
                $scope.isLoggedIn = false;
                LogoutService.logout();
            });

            $scope.$on( 'IdleEnd', function() {
                // the user has come back from AFK and is doing stuff. if you are warning them, you can use this to hide the dialog
            });

            // used on profile menu to return to support admin access
            $scope.switchAdmin = function() {
                $cookies.remove('ct_token');
                SupportAdminWebService.switchToAdmin($rootScope.supportToken, $window.sessionStorage.token).then(function(result) {
                    $rootScope.token = $window.sessionStorage.token = result.data.token;
                    $cookies.put('ct_token', $window.sessionStorage.token);
                    $rootScope.user_id = result.data.userId;
                    $rootScope.roleId = $window.sessionStorage.roleId = result.data.data.role_id;
                    AdminSession.setAdminType(result.data.data.role_id);
                    //AdminSession.setToken(result.data.token);
                    // redirect to main admin page
                    $location.path("/admin-access");
                });
            };

            $scope.hideSearchBar = function() {
                $global.set( 'showSearchCollapsed', false );
            };

            $scope.hideHeaderBar = function() {
                $global.set( 'headerBarHidden', true );
            };

            $scope.showHeaderBar = function($event) {
                $event.stopPropagation();
                $global.set( 'headerBarHidden', false );
            };

            $scope.toggleLeftBar = function() {
                if ($scope.style_isSmallScreen) {
                    return $global.set( 'leftbarShown', !$scope.style_leftbarShown );
                }
                $global.set( 'leftbarCollapsed', !$scope.style_leftbarCollapsed );
            };

            $scope.showSubscription = false;
            $scope.toggleRightBar = function() {
                $global.set( 'rightbarCollapsed', !$scope.style_rightbarCollapsed );
                $rootScope.rightbar = $global.get('rightbarCollapsed');
                $scope.showSubscription = $scope.style_rightbarCollapsed;

            };

            $scope.resizeWindow = function () {
              setTimeout(function() {
                $(window).trigger('resize');
              }, 50);
            };

            $scope.$on( 'globalStyles:changed', function(event, newVal) {
                $scope['style_' + newVal.key] = newVal.value;
            });

            $scope.$on( 'globalStyles:maxWidth767', function(event, newVal) {
                $timeout( function() {
                    $scope.style_isSmallScreen = newVal;
                    if
                    (!newVal) {
                        $global.set( 'leftbarShown', false );
                    } else {
                        $global.set( 'leftbarCollapsed', false );
                    }
                });
            });

            // this is code for Google Analytics - do not delete
            $scope.$on('$viewContentLoaded', function(event) {
                if($window.ga) {
                    $window.ga('send', 'pageview', { page: $location.url() });
                }
            });

            // there are better ways to do this, e.g. using a dedicated service
            // but for the purposes of this demo this will do :P

            //$global.set('isLoggedIn', false);
            $scope.showBreadCrumb = true;
            $scope.isLoggedIn = $window.sessionStorage.token;
            var isLogged = $scope.isLoggedIn;
            /* $scope.logOut = function() {
                delete $window.sessionStorage.token;
                                delete $window.sessionStorage.currentOUId;
                                delete $window.sessionStorage.currentOUName;
                    delete $window.sessionStorage.currentOULevel;
                    delete $window.sessionStorage.topLevelOUId;
                    delete $window.sessionStorage.userOULevel;
                                delete $window.sessionStorage.highestOUId;
                                delete $window.sessionStorage.highestOUName;
                                delete $window.sessionStorage.userId;
                                delete $window.sessionStorage.fullName;
                                delete $window.sessionStorage.userAccess;
                    delete $window.sessionStorage.timezone;
                    delete $window.sessionStorage;

                                delete $rootScope.currentOUId;
                                delete $rootScope.currentOUName;
                    delete $rootScope.currentOULevel;
                    delete $rootScope.topLevelOUId;
                    delete $rootScope.userOULevel;
                                delete $rootScope.highestOUId;
                                delete $rootScope.highestOUName;
                                delete $rootScope.userId;
                                delete $rootScope.fullName;
                    delete $rootScope.timezone;
                                delete $rootScope.userAccess;
                    //delete $rootScope;
                    $scope.isLoggedIn = false;

                                window.location.replace(document.location.protocol + '//' + document.location.host);
                        };
                        */
            $scope.logIn = function() {
                // alert($scope.password);
                $scope.isLoggedIn = true;
            };

            $scope.logger = function(user, msg) {
                loggerService.logAction( user, msg );
            };

            $scope.rightbarAccordionsShowOne = false;
            $scope.rightbarAccordions = [{
                open: true
                }, {
                open: true
                }, {
                open: true
                }, {
                open: true
                }, {
                open: true
                }, {
                open: true
                }, {
                open: true
            }];


            $scope.$on("$locationChangeStart", function (event) {

                    // I feel like 'rightbarCollapsed' would need to be true in order to be collapsed but for some reason false
                    // makes it stay closed.
                    // - We don't want our summary widget to stay open if they click on sign out while it's open at the same time
                    if ($location.path() === "/login" || $location.path() === "/vanity-number") {
                            $global.set( 'rightbarCollapsed', false);
                    }


                    if ($location.path() === "/login" && $window.sessionStorage.token) {
                        console.log("Err... no reason to go back to login page if you're already logged in.");
                            event.preventDefault(); // Prevents page from not only going to /login, but even doesnt require a page reload
                    }


            });


            $scope.$on('$routeChangeStart', function(event, next, current) {
                var token = $cookies.get('ct_token');
                if(!token){
                    delete $window.sessionStorage.token;
                }
                if(!token || next.$$route.templateUrl == 'views/login.html'){
                    $scope.conversationData=[];
                    //$scope.disconnectSocket();
                }
                var paramChanged = false;
                history.push($location.search());
                callsHistory.push($location.path());
                var currentParam = $location.search();
                /*
                    Read only users can access pages which they don't have access to by direct hit url
                    so listed pages below which are not accessible to read only users and diverted user
                    to access denied page.
                */
                var restrictedUrlForReadOnly = [
                    "/set-campaign-builder",
                    "/set-legacy-campaign-builder",
                    "/set-campaign",
                    "/set-group",
                    "/set-legacy-group",
                    "/set-blacklist",
                    "/set-dni",
                    "/set-location",
                    "/set-legacy-location",
                    "/set-tags",
                    "/set-webhook",
                    "/set-caller-privacy",
                    "/set-acquisio",
                    "/set-append",
                    "/set-doubleclick",
                    "/set-ga",
                    "/set-dist",
                    "/set-scheduled",
                    "/scheduled-plans",
                    "/set-schedule-builder"
                ];

                var restrictedUrlForStandard = [
                    "/set-group",
                    "/set-legacy-group",
                ];
               
                if(parseInt($rootScope.roleId) === 2){
                    if(restrictedUrlForStandard.indexOf($location.path()) > -1){
                        location.href = '#/access-denied';
                    }
                }

                if(parseInt($rootScope.roleId) === 3){
                    if(restrictedUrlForReadOnly.indexOf($location.path()) > -1){
                        location.href = '#/access-denied';
                    }
                }

                if ($window.sessionStorage.token !== undefined && ($location.path() === '/signup' || $location.path() === '/login' || $location.path() === "/login-admin" || $location.path() === '/thankyou')) {
                    $location.path('/');
                } else if(!$window.sessionStorage.token && ($location.path() === '/signup' || $location.path() === '/login' || $location.path() === "/login-admin" || $location.path() === '/thankyou')) {
					return;
                }

                // if (!$window.sessionStorage.token) {
                //     if (next.params.templateFile !== 'forgotpassword' && next.params.templateFile !== 'resetpassword') {
                //         $location.path( '/login' );
                //     }
                // }
                //else if($window.sessionStorage.token && $location.path() == '/login'){
                //    $location.path( '/');
                //}
                // console.log( 'start: ', $location.path() );
                progressLoader.start();
                progressLoader.set( 50 );
                $scope.isLoggedIn = $window.sessionStorage.token;

                // if (!angular.isDefined($rootScope.currentOUName) && $window.sessionStorage.token) {
                //     console.log('page refreshed.... IN APP.JS... retrieving basic OU data needed for user');
                //     console.log('$window.sessionStorage.token');
                //     console.log($window.sessionStorage.token);
                //     OrgUnitLocal.getSetLocalOrgUnitData(false);
                // }


                //OrgUnitLocal.getSessData();
            });

			$scope.tagAlreadyOnPage = false;

            $scope.$on('$routeChangeSuccess', function(e) {
                // console.log('success: ', $location.path());
				// if($location.path() !== '/login') {
				// 	if(!$scope.tagAlreadyOnPage) {
				// 		console.log('executing jQuery');
				// 		$(function() {
				// 			$('<noscript>')
				// 				.text('<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PXTLD3" height="0" width="0" style="display:none;visibility:hidden"></iframe>')
				// 				.appendTo('body');

				// 			$('<script>')
				// 				.attr('type', 'text/javascript')
				// 				.text("(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-PXTLD3');")
				// 				.appendTo('body');
				// 		});
				// 		$scope.tagAlreadyOnPage = true;
				// 	}
				// }
                progressLoader.end();
            });

            // Connect to socket and ready to receive message
            //$scope.socket = undefined;
            $scope.connectSocket = function() {
                // $scope.socket = io(ApiParam.socketURL());
                // $scope.socket.on('connect', function(){
                //     console.log('socket.connected', $scope.socket.connected);
                //     $scope.initializeChatConnection();
                // });
                
                // Receive message once receive-sms event triggerd
                // $scope.socket.on('conversation:receive-sms', function (receivedSms) {
                //     console.log('Received SMS:', receivedSms);
                //     angular.forEach($scope.conversationData, function (conversation) {
                //         $scope.conversationIds.push(conversation.conver.conversation_id);
                //         if (conversation && conversation.conver.conversation_id === receivedSms.conversation_id) {
                //             var smsIndex = _.findIndex(conversation.conver.messages, function (sms) { return sms.sms_id == Integer(receivedSms.sms_id); });
                //             if (smsIndex !== -1) {
                //                 receivedSms.time = moment(receivedSms.time).format('MM-DD-YY hh:mm A');
                //                 conversation.conver.messages.push(receivedSms);
                //                 conversation.conver.newMessage = true;
                //             }
                //         }
                //     });
                // });
            };

            $scope.$on('logout', function(){
                //$scope.disconnectSocket();
            });

            $scope.initializeChatConnection = function() {
                // $scope.conversationIds=[];
                // angular.forEach($scope.conversationData, function(conversation){
                //     $scope.conversationIds.push(conversation.conver.conversation_id);
                // });
                // $scope.socket.emit('conversation:init', $scope.conversationIds);
            };
            
            $scope.disconnectSocket = function(){
                // if($scope.socket && $scope.socket.connected){
                //     $scope.socket.disconnect($scope.socket.id);
                // }
            };

            $scope.onChatWindowClicked = function(conversation){
                var divObj = $("#"+conversation.conver.conversation_id)[0];
                if(conversation.conver.newMessage && conversation.conver.newMessage !=undefined && conversation.conver.newMessage == true) {
                    if(divObj.scrollHeight<=divObj.clientHeight){
                        $scope.onScrollMessageRead(conversation,divObj);
                    }
                    conversation.conver.newMessage = false;
                }
            };

            var promise;
             // starts the interval  for fetching live sms
            $scope.startSMSInterval = function () {
                // stops any running interval to avoid two intervals running at the same time
                $scope.stopSMSInterval();

                // store the interval promise
                promise = $interval(fetchLiveMessages, 8000);
            };
    
            // stops the interval for fetching live sms
            $scope.stopSMSInterval = function () {
                $interval.cancel(promise);
            };

            function fetchLiveMessages() {
                if($rootScope.loginState == 'loggedin' && $scope.conversationData.length>0){
                    var conversation_ids = '';
                    angular.forEach($scope.conversationData,function(conversation){
                        conversation_ids +=  (conversation_ids === '') ? (conversation.conver.conversation_id) : (','+conversation.conver.conversation_id); 
                    });
                    smsWebService.getLiveMessages(conversation_ids).then(function(response) {
                        if(response.data && response.data.err == '' && response.data.json && !_.isEmpty(response.data.json)){
                            var messageData = response.data.json;
                            angular.forEach($scope.conversationData, function (conversation) {
                                if(messageData[conversation.conver.conversation_id]){
                                    var liveMessages = messageData[conversation.conver.conversation_id].split('@sep@');
                                    angular.forEach(liveMessages, function(message){
                                        message = JSON.parse(message);
                                        var smsIndex = _.findIndex(conversation.conver.messages, function (sms) { return sms.sms_id == Number(message.sms_id); });
                                        if (smsIndex === -1) {
                                            message.sms_id = Number(message.sms_id);
                                            message.time = moment(message.time).tz($rootScope.timezone).format('MM-DD-YY hh:mm A');
                                            conversation.conver.messages.push(message);
                                            conversation.conver.newMessage = true;
                                            // conversation.conver.conversation_status = 'read';
                                        }
                                    });
                                }
                            });
                        }                  
                    });
                }
            }

            $scope.$on('closeChatArchive', function(event, index) {
                $scope.closeChat(index);
            });

            $scope.$on('campaignOrGroupUpdateSms', function(event, data) {
                if($scope.conversationData.length > 0){
                    $scope.conversationData.forEach(function(item){
                        if(data.campaignOrGroupObject.type == 'campaign'){
                            if(item.conver.campaign_id == data.campaignOrGroupObject.campaign_id){
                                item.conver.campaign_name=data.campaignOrGroupObject.campaign_name;
                            }
                        }else{
                            if(item.conver.org_unit_id == data.campaignOrGroupObject.org_unit_id){
                                item.conver.org_unit_name=data.campaignOrGroupObject.org_unit_name;
                            }
                        }
                    });  
                }             
            });

            //Receive the event with data for opening the chat box dynamically
            $scope.$on('chatWindowOpen', function(event, data) {
                $scope.canModify = false;
                if($rootScope.userAccess.sms && (parseInt($rootScope.userAccess.sms) === 7)){
                    $scope.canModify = true;
                }
                var pushIndex;
                if($scope.countChatWindow.length==1){
                    data.conver.chatBoxClass="chatbox";
                }else if($scope.countChatWindow.length==2){
                    data.conver.chatBoxClass="chatboxTWO";
                }else if($scope.countChatWindow.length==3){
                    data.conver.chatBoxClass="chatboxThree";
                }else{
                    if($scope.countChatWindow.length==4){
                        data.conver.chatBoxClass="chatboxFour";
                    }else{
                        data.conver.chatBoxClass="chatbox";
                    }
                }
                    data.conver.tracking_number=data.conver.tracking.toString().replace(/(\d\d\d)(\d\d\d)(\d\d\d\d)/, "($1) $2-$3");
                    data.conver.caller_id=data.conver.source.toString().replace(/(\d\d\d)(\d\d\d)(\d\d\d\d)/, "($1) $2-$3");
                    data.conver.isMaximize=true;
                    data.conver.isOpenLabel=false;
                    data.conver.formData = {
                        typingText: ""
                    };
                    data.conver.sendSmsEnable=true;
                    data.conver.messages=[];
                    data.conver.labelUpdate=data.conver.label;
                    if($scope.canModify && data.conver.labelUpdate && data.conver.labelUpdate.length>0){
                        data.conver.isDisabledSpan="button-label";
                    }else{
                        data.conver.isDisabledSpan="button-label-disable";
                    }
                    data.conver.arrowClassLabel="fa fa-chevron-down";
                    data.conver.chatWindowLoading=true;
                    //Check no of windows and shifting there positions according with current window state
                    if($scope.conversationData.length>=4){
                        pushIndex=$scope.conversationData.splice(0, 0, data);
                        $scope.conversationData.forEach(function(item,idx){
                            if(idx==1){
                                if($scope.conversationData[idx].conver.isMaximize){
                                    $scope.conversationData[idx].conver.chatBoxClass="chatboxTWO";
                                }else{
                                    $scope.conversationData[idx].conver.chatBoxClass="minimizeChatTwo";
                                }                    
                            }else if(idx==2){
                                if($scope.conversationData[idx].conver.isMaximize){
                                    $scope.conversationData[idx].conver.chatBoxClass="chatboxThree";
                                }else{
                                    $scope.conversationData[idx].conver.chatBoxClass="minimizeChatThree";
                                }                    
                            }else{
                                if(idx==3){
                                    if($scope.conversationData[idx].conver.isMaximize){
                                        $scope.conversationData[idx].conver.chatBoxClass="chatboxFour";
                                    }else{
                                        $scope.conversationData[idx].conver.chatBoxClass="minimizeChatFour";
                                    }
                                }
                                if(idx>=4){
                                    $scope.conversationData[idx].conver.chatBoxClass="hideChat";
                                }
                            }
                        });

                    }else{
                        pushIndex=$scope.conversationData.push(data);
                        // if($scope.conversationData.length > 0) {
                        //     if($scope.socket && $scope.socket.connected){
                        //        $scope.initializeChatConnection();
                        //     } else {
                        //         $scope.connectSocket();
                        //     }
                        // }
                    }
                    
                if ($scope.conversationData.length === 1) {
                    $scope.startSMSInterval();
                }
                    //Get historical chat data and update the status read API
                    smsWebService.getChatHistory(data.conver.conversation_id).then(function(result) {
                    if(result.data && result.data.status == 'success' && result.data.err == ''){
                        angular.forEach($scope.conversationData, function (conversation) {
                            if (conversation && conversation.conver.conversation_id === data.conver.conversation_id) {
                                conversation.conver.messages = result.data.json;
                                conversation.conver.chatWindowLoading = false;
                            }
                        });
                        var classBox = data.conver.chatBoxClass;
                        setTimeout(function(){
                            var div_height= $("."+classBox+" .main-window")[0].scrollHeight;
                            $("."+classBox+" .main-window").animate({scrollTop: div_height});
                        }, 100);

                        //trial one!
                        angular.forEach($scope.conversationData, function (conversation) {
                            if (conversation && conversation.conver.conversation_id === data.conver.conversation_id) {
                                var divObj = $("#"+conversation.conver.conversation_id)[0];
                                    divObj.addEventListener("scroll", function(){
                                        $scope.onScrollMessageRead(conversation,divObj);
                                        $scope.onChatWindowClicked(conversation);
                                    }); 
                                
                            }
                        });
                        

                    }else{
                        pinesNotifications.notify({
                            title: 'SMS',
                            text: result.data.err,
                            type: 'error'
                        });
                        $scope.conversationData[pushIndex-1].conver.chatWindowLoading=false;
                    }
                });
            });
            //Close the particular window and others are shifting there positions
            $scope.closeChat = function(index) {
                $scope.conversationData.splice(index,1);
                if($scope.conversationData.length === 0){
                    //$scope.disconnectSocket();
                    $scope.stopSMSInterval();
                }
                $scope.countChatWindow.splice(index,1);
                $scope.conversationData.forEach(function(item,idx){
                    if(idx==0){
                        if($scope.conversationData[idx].conver.isMaximize){
                            $scope.conversationData[idx].conver.chatBoxClass="chatbox";
                        }else{
                            $scope.conversationData[idx].conver.chatBoxClass="minimizeChat";
                        }
                    }else if(idx==1){
                        if($scope.conversationData[idx].conver.isMaximize){
                            $scope.conversationData[idx].conver.chatBoxClass="chatboxTWO";
                        }else{
                            $scope.conversationData[idx].conver.chatBoxClass="minimizeChatTwo";
                        }                    
                    }else if(idx==2){
                        if($scope.conversationData[idx].conver.isMaximize){
                            $scope.conversationData[idx].conver.chatBoxClass="chatboxThree";
                        }else{
                            $scope.conversationData[idx].conver.chatBoxClass="minimizeChatThree";
                        }                    
                    }else{
                        if(idx==3){
                            if($scope.conversationData[idx].conver.isMaximize){
                                $scope.conversationData[idx].conver.chatBoxClass="chatboxFour";
                            }else{
                                $scope.conversationData[idx].conver.chatBoxClass="minimizeChatFour";
                            }
                        }
                    }
                });
            };
            //minimize and maximize the window
            $scope.toggleMiniMaxChat = function(index) {
                if(index==0){
                    if(!$scope.conversationData[index].conver.isMaximize){
                        $scope.conversationData[index].conver.chatBoxClass="chatbox";
                    }else{
                        $scope.conversationData[index].conver.chatBoxClass="minimizeChat";
                    }
                }else if(index==1){
                    if(!$scope.conversationData[index].conver.isMaximize){
                        $scope.conversationData[index].conver.chatBoxClass="chatboxTWO";
                    }else{
                        $scope.conversationData[index].conver.chatBoxClass="minimizeChatTwo";
                    }
                }else if(index==2){
                    if(!$scope.conversationData[index].conver.isMaximize){
                        $scope.conversationData[index].conver.chatBoxClass="chatboxThree";
                    }else{
                        $scope.conversationData[index].conver.chatBoxClass="minimizeChatThree";
                    }
                }else{
                    if(!$scope.conversationData[index].conver.isMaximize){
                        $scope.conversationData[index].conver.chatBoxClass="chatboxFour";
                    }else{
                        $scope.conversationData[index].conver.chatBoxClass="minimizeChatFour";
                    }
                }
                    if(!$scope.conversationData[index].conver.isMaximize){
                        $scope.conversationData[index].conver.isMaximize=true;
                    }else{
                        $scope.conversationData[index].conver.isMaximize=false;
                    }              
            };
            
            $scope.onScrollMessageRead = function(conversation,divObj){
                    if( divObj.scrollTop > (divObj.scrollHeight - divObj.offsetHeight)){
                        $rootScope.activeConversations.forEach(function(conversationData){
                            if(conversation.conver.conversation_id === conversationData.conversation_id && conversationData.conversation_status == $rootScope.conversationStatus.UNREAD){
                                conversationData.conversation_status = $rootScope.conversationStatus.READ;
                                smsWebService.setConversationStatus(conversation.conver.conversation_id, $rootScope.conversationStatus.READ);
                            }
                        });
                        
                    }else if(divObj.scrollHeight<=divObj.clientHeight){
                        $rootScope.activeConversations.forEach(function(conversationData){
                            if(conversation.conver.conversation_id === conversationData.conversation_id && conversationData.conversation_status == $rootScope.conversationStatus.UNREAD){
                                conversationData.conversation_status = $rootScope.conversationStatus.READ;
                                smsWebService.setConversationStatus(conversation.conver.conversation_id, $rootScope.conversationStatus.READ);
                            }
                        });
                    }  
            };
            //sending a message
            $scope.sendMessage = function(index,data) {
                if(data && data.formData.typingText && data.formData.typingText !="" && !data.chatWindowLoading && $scope.canModify && $scope.conversationData[index].conver.sendSmsEnable){
                    $scope.conversationData[index].conver.sendSmsEnable=false;
                    if(sessionStorage.userId){
                        var sendingData={
                            "conversation_id": data.conversation_id,
                            "ct_user_id": sessionStorage.userId,
                            "message": data.formData.typingText,
                            "tracking_number": data.tracking_number.replace(/[&\/\\#,+()$~%'":*?<>{}|-]/g, '').replace(/ +/g, "").toString(),
                            "caller_id": data.caller_id.replace(/[&\/\\#,+()$~%'":*?<>{}|-]/g, '').replace(/ +/g, "").toString()
                        };
                        smsWebService.sendMessage(sendingData).then(function(result) {
                            if(result.data && result.data.status == 'success' && result.data.err == ''){
                                var sentObject={
                                    "message": data.formData.typingText, 
                                    "type": "outgoing",
                                    "time": moment().tz($rootScope.timezone).format('MM-DD-YY HH:mm A')
                                };
                                $scope.conversationData[index].conver.messages.push(sentObject);
                                $scope.conversationData[index].conver.formData.typingText="";
                                $scope.conversationData[index].conver.sendSmsEnable=true;
                                var classBox = $scope.conversationData[index].conver.chatBoxClass;
                                setTimeout(function(){
                                    var div_height= $("."+classBox+" .main-window")[0].scrollHeight;
                                    $("."+classBox+" .main-window").animate({scrollTop: div_height});
                                }, 30);
                                $scope.convertingActiveConversation(data.conversation_id);
                            }else{
                                $scope.conversationData[index].conver.sendSmsEnable=true;
                                pinesNotifications.notify({
                                    title: 'SMS',
                                    text: (result.data.err && result.data.err !== '') ? result.data.err : 'Failed while sending sms.',
                                    type: 'error'
                                });
                            }
                        });
                    }else{
                        $scope.conversationData[index].conver.sendSmsEnable=true;
                        pinesNotifications.notify({
                            title: 'SMS',
                            text: 'Failed while sending sms.',
                            type: 'error'
                        });
                    }
                }
            };
            //Toggle the opening label
            $scope.toggleOpenLabel = function(index) {
                $scope.conversationData[index].conver.labelUpdate=$scope.conversationData[index].conver.label;
                if($scope.conversationData[index].conver.isOpenLabel){
                    $scope.conversationData[index].conver.isOpenLabel=false;
                    $scope.conversationData[index].conver.arrowClassLabel="fa fa-chevron-down";
                }else{
                    $scope.conversationData[index].conver.isOpenLabel=true;
                    $scope.conversationData[index].conver.arrowClassLabel="fa fa-chevron-up";
                }
                if($scope.conversationData[index].conver.labelUpdate && $scope.conversationData[index].conver.labelUpdate.length>0){
                    $scope.isDisabledSpan="button-label";
                }
            };
            $scope.convertingActiveConversation = function(conversation_id){
                var activeObj = _.find($rootScope.activeConversations, function (obj) { return obj.conversation_id == conversation_id; });
                activeObj.conversation_status = $rootScope.conversationStatus.REPLIED;
                var conversationIndex = _.findIndex($rootScope.activeConversations, function (obj) { return obj.conversation_id == conversation_id; });
                $rootScope.activeConversations.splice(conversationIndex, 1);
                if(sessionStorage.userEmail && sessionStorage.fullName){
                    activeObj.agent_email_id = sessionStorage.userEmail;
                    activeObj.agent_name = sessionStorage.fullName;
                }
                $rootScope.conversations.unshift(activeObj);
                $rootScope.$broadcast('message-sent');
                $rootScope.$broadcast("conversation-moved");
                console.log($rootScope.activeConversations , "activeConversation >>>>",activeObj);
                console.log($rootScope.conversations , "conversations <<<<<");

            };
            //Cancel the update label
            $scope.cancelUpdate = function(index) {
                $scope.conversationData[index].conver.labelUpdate=$scope.conversationData[index].conver.label;
                $scope.conversationData[index].conver.isOpenLabel=false;
                $scope.conversationData[index].conver.arrowClassLabel="fa fa-chevron-down";
            };
            //update the label
            $scope.updateLabel = function(index,conversation) {
                if($scope.canModify){
                    if(($scope.oldLabelChat == null || $scope.oldLabelChat == '') && (conversation.labelUpdate ==null || conversation.labelUpdate == '')){
                        var errorText = 'Failed while updating conversation label. Label text should not be empty.';
                        pinesNotifications.notify({
                            title: 'Conversation',
                            text: errorText,
                            type: 'error'
                        });
                    }else {
                        if(conversation.conversation_id){
                            var obj = {
                                'conversation_id' : conversation.conversation_id,
                                'conversation_status' : conversation.conversation_status,
                                'label' : conversation.labelUpdate
                            };
                            //update the label calling webservice
                            ConversationWebService.updateLabel(obj).then(function(result) {
                                $rootScope.$broadcast("labelUpdate", obj);
                                if (result.data.status === 'success') {
                                    pinesNotifications.notify({
                                        title: 'Conversation',
                                        text:  'Label updated successfully',
                                        type:  'success'
                                    });
                                    $scope.oldLabelChat = null;
                                    $scope.conversationData[index].conver.label=conversation.labelUpdate;
                                } else {
                                    pinesNotifications.notify({
                                        title: 'Conversation',
                                        text: 'Failed while updating conversation label. ' + result.data.err,
                                        type: 'error'
                                    });
                                    $scope.conversationData[index].conver.labelUpdate=conversation.label;
                                }
                            });
                        } else {
                            pinesNotifications.notify({
                                title: 'Conversation',
                                text: 'Failed while updating conversation label.',
                                type: 'error'
                            });
                            $scope.conversationData[index].conver.labelUpdate=conversation.label;
                        } 
                        $scope.conversationData[index].conver.isOpenLabel=false;
                        $scope.conversationData[index].conver.arrowClassLabel="fa fa-chevron-down";
                    }
                }
             };
             
            //applying runtime class if label empty or not
            $scope.runTimeChange = function(index,runtimetext) {
                $scope.oldLabelChat = $scope.conversationData[index].conver.label;
                $scope.newLabelChat = runtimetext;
                if($scope.conversationData[index].conver.label == null && runtimetext.length == 0){
                    $scope.conversationData[index].conver.isDisabledSpan="button-label-disable";
                }else{
                    $scope.conversationData[index].conver.isDisabledSpan="button-label";
                }
            };
        }
        ])
        .config(function(IdleProvider, KeepaliveProvider) {
                // configure Idle settings
                IdleProvider.idle(5 * 60); // in seconds
                IdleProvider.timeout(60 * 60); // in seconds
                KeepaliveProvider.interval(2); // in seconds
        })
    .config( ['$provide', '$routeProvider',
        function($provide, $routeProvider) {
            // configure $idle settings
            'use strict';
            //$idleProvider.idleDuration( 1800 );
            //$idleProvider.warningDuration( 5 );
            //$keepaliveProvider.interval( 10 );
            //IdleProvider.idle(5); // in seconds
            //IdleProvider.timeout(5); // in seconds
            //KeepaliveProvider.interval(2); // in seconds
            $routeProvider
                .when( '/', {
                    templateUrl: 'views/index.html',
                    resolve: {
                        'userScope':function( OrgUnitLocal){
                            return OrgUnitLocal.getSessData();
                        }
                    }
                } )
                    .when( '/login', {
                    templateUrl: 'views/login.html',
                    // resolve: {
                    //     'userScope':function( OrgUnitLocal){
                    //         return OrgUnitLocal.getLoggedInSessData();
                    //     }
                    // }
                })
                .when( '/login-admin', {
                    templateUrl: 'views/login-admin.html',
                    // resolve: {
                    //     'userScope':function( OrgUnitLocal){
                    //         return OrgUnitLocal.getLoggedInSessData();
                    //     }
                    // }
                })
                .when('/admin-access',{
                    templateUrl: 'views/admin-access.html',
                    // resolve: {
                    //     'userScope':function( OrgUnitLocal){
                    //         return OrgUnitLocal.getLoggedInSessData();
                    //     }
                    // }
                })
                .when('/signup',{
                    templateUrl: 'views/signup.html',
                    resolve: {
                        'userScope':function( OrgUnitLocal){
                            return OrgUnitLocal.getLoggedInSessData();
                        }
                    }
                })
                .when('/forgotpassword',{
                    templateUrl: 'views/forgotpassword.html',
                    resolve: {
                        'userScope':function( OrgUnitLocal){
                            return OrgUnitLocal.getLoggedInSessData();
                        }
                    }
                })
                .when('/resetpassword',{
                    templateUrl: 'views/resetpassword.html',
                    resolve: {
                        'userScope':function( OrgUnitLocal){
                            return OrgUnitLocal.getLoggedInSessData();
                        }
                    }
                })
                .when('/thankyou',{
                    templateUrl: 'views/thankyou.html',
                    resolve: {
                        'userScope':function( OrgUnitLocal){
                            return OrgUnitLocal.getLoggedInSessData();
                        }
                    }
                })
                .when('/support',{
                    templateUrl: 'views/support.html',
                    resolve: {
                        'userScope':function( OrgUnitLocal){
                            return OrgUnitLocal.getSessData();
                        }
                    }
                })
                .when('/access-denied',{
                    templateUrl: 'views/access-denied.html',
                    resolve: {
                        'userScope':function( OrgUnitLocal){
                            return OrgUnitLocal.getSessData();
                        }
                    }
                })
                .when( '/activity-stream', {
                    templateUrl: 'views/activity-stream.html',
                    resolve: {
                        'userScope':function( OrgUnitLocal){
                            return OrgUnitLocal.getSessData();
                        }
                    }
                })
                .when( '/acq-call-flows4', {
                    templateUrl: 'views/acq-call-flows4.html',
                    resolve: {
                        'userScope':function( OrgUnitLocal){
                            return OrgUnitLocal.getSessData();
                        }
                    }
                })
                .when( '/calls-callback', {
                    templateUrl: 'views/calls-callback.html',
                    resolve: {
                        'userScope':function( OrgUnitLocal){
                            return OrgUnitLocal.getSessData();
                        }
                    }
                })
                .when( '/calls-details', {
                    templateUrl: 'views/calls-details.html',
                    resolve: {
                        'userScope':function( OrgUnitLocal){
                            return OrgUnitLocal.getSessData();
                        }
                    }
                })
                // .when( '/set-select-score', {
                //     templateUrl: 'views/set-select-score.html',
                    
                // })
                .when( '/profile', {
                    templateUrl: 'views/profile.html',
                    resolve: {
                        'userScope':function( OrgUnitLocal){
                            return OrgUnitLocal.getSessData();
                        }
                    }
                })
                .when( '/set-alerts', {
                    templateUrl: 'views/set-alerts.html',
                    resolve: {
                        'userScope':function( OrgUnitLocal){
                            return OrgUnitLocal.getSessData();
                        }
                    }
                })
                .when( '/set-api', {
                    templateUrl: 'views/set-api.html',
                    resolve: {
                        'userScope':function( OrgUnitLocal){
                            return OrgUnitLocal.getSessData();
                        }
                    }
                })
                .when( '/set-append', {
                    templateUrl: 'views/set-append.html',
                    resolve: {
                        'userScope':function( OrgUnitLocal){
                            return OrgUnitLocal.getSessData();
                        }
                    }
                })
                .when( '/set-blacklist', {
                    templateUrl: 'views/set-blacklist.html',
                    resolve: {
                        'userScope':function( OrgUnitLocal){
                            return OrgUnitLocal.getSessData();
                        }
                    }
                })
                .when('/set-doubleclick', {
                  templateUrl: 'views/set-doubleclick.html',
                  resolve: {
                    'userScope':function( OrgUnitLocal){
                        return OrgUnitLocal.getSessData();
                    }
                }
                })
                .when('/set-dni', {
                  templateUrl: 'views/set-dni.html',
                  resolve: {
                    'userScope':function( OrgUnitLocal){
                        return OrgUnitLocal.getSessData();
                    }
                }
                })
                .when('/set-ga', {
                  templateUrl: 'views/set-ga.html',
                  resolve: {
                    'userScope':function( OrgUnitLocal){
                        return OrgUnitLocal.getSessData();
                    }
                }
                })
                .when( '/set-group', {
                    templateUrl: 'views/set-group.html',
                    resolve: {
                        'userScope':function( OrgUnitLocal){
                            return OrgUnitLocal.getSessData();
                        }
                    }
                })
                .when( '/set-legacy-group', {
                    templateUrl: 'views/set-legacy-group.html',
                    resolve: {
                        'userScope':function( OrgUnitLocal){
                            return OrgUnitLocal.getSessData();
                        }
                    }
                })
                .when( '/set-location', {
                    templateUrl: 'views/set-location.html',
                    resolve: {
                        'userScope':function( OrgUnitLocal){
                            return OrgUnitLocal.getSessData();
                        }
                    }
                })
                .when( '/set-legacy-location', {
                    templateUrl: 'views/set-legacy-location.html',
                    resolve: {
                        'userScope':function( OrgUnitLocal){
                            return OrgUnitLocal.getSessData();
                        }
                    }
                })
                .when( '/set-notifications', {
                    templateUrl: 'views/set-notifications.html',
                    resolve: {
                        'userScope':function( OrgUnitLocal){
                            return OrgUnitLocal.getSessData();
                        }
                    }
                })
                .when( '/set-tags', {
                    templateUrl: 'views/set-tags.html',
                    resolve: {
                        'userScope':function( OrgUnitLocal){
                            return OrgUnitLocal.getSessData();
                        }
                    }
                })
                .when( '/set-webhook', {
                    templateUrl: 'views/set-webhook.html',
                    resolve: {
                        'userScope':function( OrgUnitLocal){
                            return OrgUnitLocal.getSessData();
                        }
                    }
                })
                .when( '/set-webhook-builder', {
                    templateUrl: 'views/set-webhook-builder.html',
                    resolve: {
                        'userScope':function( OrgUnitLocal){
                            return OrgUnitLocal.getSessData();
                        }
                    }
                })
                .when( '/set-caller-privacy', {
                    templateUrl: 'views/set-caller-privacy.html',
                    resolve: {
                        'userScope':function( OrgUnitLocal){
                            return OrgUnitLocal.getSessData();
                        }
                    }
                })
                .when( '/form-ckeditor', {
                    templateUrl: 'views/form-ckeditor.html',
                    resolve: {
                        'userScope':function( OrgUnitLocal){
                            return OrgUnitLocal.getSessData();
                        }
                    }
                })
                .when( '/form-wizard', {
                    templateUrl: 'views/form-wizard.html',
                    resolve: {
                        'userScope':function( OrgUnitLocal){
                            return OrgUnitLocal.getSessData();
                        }
                    }
                })
                .when( '/set-campaign-builder', {
                    templateUrl: 'views/set-campaign-builder.html',
                    resolve: {
                        'userScope':function( OrgUnitLocal){
                            return OrgUnitLocal.getSessData();
                        }
                    }
                })
                .when( '/set-legacy-campaign-builder', {
                    templateUrl: 'views/set-legacy-campaign-builder.html',
                    resolve: {
                        'userScope':function( OrgUnitLocal){
                            return OrgUnitLocal.getSessData();
                        }
                    }
                })
                .when( '/set-campaign', {
                    templateUrl: 'views/set-campaign.html',
                    resolve: {
                        'userScope':function( OrgUnitLocal){
                            return OrgUnitLocal.getSessData();
                        }
                    }
                })
                .when( '/scheduled-plans', {
                    templateUrl: 'views/scheduled-plans.html',
                    resolve: {
                        'userScope':function( OrgUnitLocal){
                            return OrgUnitLocal.getSessData();
                        }
                    }
                })
                .when( '/set-schedule-builder', {
                    templateUrl: 'views/set-schedule-builder.html',
                    resolve: {
                        'userScope':function( OrgUnitLocal){
                            return OrgUnitLocal.getSessData();
                        }
                    }
                })
                .when( '/call-overview', {
                    templateUrl: 'views/call-overview.html',
                    resolve: {
                        'userScope':function( OrgUnitLocal){
                            return OrgUnitLocal.getSessData();
                        }
                    }
                })
                //.when('/maps-vector', {
                //  templateUrl: 'views/maps-vector.html',
                //  resolve: {
                //    lazyLoad: ['lazyLoad', function (lazyLoad) {
                //      return lazyLoad.load([
                //        'bower_components/jqvmap/jqvmap/maps/jquery.vmap.europe.js',
                //        'bower_components/jqvmap/jqvmap/maps/jquery.vmap.usa.js'
                //      ]);
                //    }]
                //  }
                //})
                .when( '/charts-svg', {
                    templateUrl: 'views/charts-svg.html',
                    resolve: {
                        'userScope':function( OrgUnitLocal){
                            return OrgUnitLocal.getSessData();
                        }
                    }
                })
                .when( '/settings-call-flow', {
                    templateUrl: 'views/settings-call-flow.html',
                    resolve: {
                        'userScope':function( OrgUnitLocal){
                            return OrgUnitLocal.getSessData();
                        }
                    }
                })
                .when( '/cfa-reports', {
                    templateUrl: 'views/cfa-reports.html',
                    resolve: {
                        'userScope':function( OrgUnitLocal){
                            return OrgUnitLocal.getSessData();
                        }
                    }
                })
                .when( '/activity-group', {
                    templateUrl: 'views/activity-group.html',
                    resolve: {
                        'userScope':function( OrgUnitLocal){
                            return OrgUnitLocal.getSessData();
                        }
                    }
                })
                .when( '/set-score-card', {
                    templateUrl: 'views/set-score-card.html',
                    resolve: {
                        'userScope':function( OrgUnitLocal){
                            return OrgUnitLocal.getSessData();
                        }
                    }
                })
                .when( '/set-select-score', {
                    templateUrl: 'views/set-select-score.html',
                    resolve: {
                        'userScope':function( OrgUnitLocal){
                            return OrgUnitLocal.getSessData();
                        }
                    }
                })
                .when( '/set-scheduled', {
                    templateUrl: 'views/set-scheduled.html',
                    resolve: {
                        'userScope':function( OrgUnitLocal){
                            return OrgUnitLocal.getSessData();
                        }
                    }
                })
                .when( '/set-dist', {
                    templateUrl: 'views/set-dist.html',
                    resolve: {
                        'userScope':function( OrgUnitLocal){
                            return OrgUnitLocal.getSessData();
                        }
                    }
                })
                .when( '/set-acquisio', {
                    templateUrl: 'views/set-acquisio.html',
                    resolve: {
                        'userScope':function( OrgUnitLocal){
                            return OrgUnitLocal.getSessData();
                        }
                    }
                })
                .when( '/set-whitelabel', {
                    templateUrl: 'views/set-whitelabel.html',
                    resolve: {
                        'userScope':function( OrgUnitLocal){
                            return OrgUnitLocal.getSessData();
                        }
                    }
                })
                .when( '/sms-conversations', {
                    templateUrl: 'views/sms-conversations.html',
                    resolve: {
                        'userScope':function( OrgUnitLocal){
                            return OrgUnitLocal.getSessData();
                        }
                    }
                })
                .when( '/vanity-number', {
                    templateUrl: 'views/vanity-number.html'
                })
                .when( '/request-quote', {
                    templateUrl: 'views/request-quote.html'
                })
                // .when( '/:templateFile', {
                //     templateUrl: function(param) {
                //         return 'views/' + param.templateFile + '.html';
                //     },
                //     resolve: {
                //         'userScope':function( OrgUnitLocal){
                //             return OrgUnitLocal.getSessData();
                //         }
                //     }
                // })
                .otherwise( {
                    redirectTo: '/'
                });

    }])
    .config(['$routeProvider', function($routeProvider){
        'use strict';

     }])
    .run( function(Idle) {
        // // start watching when the app runs. also starts the $keepalive service by default.
        Idle.watch();
    });
