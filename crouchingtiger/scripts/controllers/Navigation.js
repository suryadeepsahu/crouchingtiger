angular
    .module('theme.navigation-controller', ['theme.conversations'])
    .service('menuBarService', function() {
        var menuBar = {};
        return {
            getMenuBar: function() {
                return menuBar;
            },
            setMenuBar: function(value) {
                menuBar = value;
            }
        };
    })
    .controller('NavigationController', ['$scope', '$rootScope', '$location','$timeout', '$interval', '$global', '$cookies', 'menuBarService', 'ConversationWebService',
        function($scope, $rootScope, $location, $timeout, $interval, $global, $cookies, menuBarService, ConversationWebService) {
            'use strict';
            var setParent = function(children, parent) {
                angular.forEach(children, function(child) {
                    child.parent = parent;
                    if (child.children !== undefined) {
                        setParent(child.children, child);
                    }
                });
            };

            var buildMenu = function() {
                var menu = [{
                        label: 'Home',
                        iconClasses: 'fa fa-home',
                        url: '#/'
                    },
                    {
                        label: 'Reports',
                        iconClasses: 'fa fa-bar-chart-o',
                        id: 'elemReport',
                        url: '#/cfa-reports'
                            // children: [
                            // 	{
                            // 		label: 'Acquisition',
                            // 		//iconClasses: 'fa fa-magnet',
                            // 		children: [
                            // 			{
                            // 				label: 'Groups',
                            // 				url: '#/acq-call-flows4?report=acq_group'
                            // 			},
                            // 			{
                            // 				label: 'Campaigns',
                            // 				url: '#/acq-call-flows4?report=acq_campaign'
                            // 			},
                            // 			{
                            // 				label: 'Call Flows',
                            // 				url: '#/acq-call-flows4?report=acq_callflow'
                            // 			},
                            // 			{
                            // 				label: 'Keywords',
                            // 				url: '#/acq-call-flows4?report=acq_keyword'
                            // 			},
                            // 			{
                            // 				label: 'Sources',
                            // 				url: '#/acq-call-flows4?report=acq_source'
                            // 			}
                            // 		]
                            // 	},

                        // 	{
                        // 		label: 'Call Logs',
                        // 		//iconClasses: 'fa fa-phone',
                        // 		children: [
                        // 			{
                        // 				label: 'Details',
                        // 				url: '#/calls-details?report=call_detail'
                        // 			},
                        // 			{
                        // 				label: 'Call Back',
                        // 				url: '#/calls-callback?report=call_back'
                        // 			}
                        // 		]
                        // 	},
                        // 	{
                        // 		label: 'Activity & Settings',
                        // 		//iconClasses: 'fa fa-table',
                        // 		children: [
                        // 			{
                        // 				label: 'Stream',
                        // 				url: '#/activity-stream'
                        // 			},
                        // 			{
                        // 				label: 'Group Activity',
                        // 				url: '#/activity-group?report=group_activity'
                        // 			}
                        // 		]
                        // 	},
                        //    //    		{
                        // 			// 	label: 'Call Overview',
                        // 			// 	url: '#/call-overview?report=call_overview'
                        // 			// },
                        // ]
                    },
                    // {
                    //     label: 'Legacy Reports',
                    //     iconClasses: 'fa fa-bar-chart-o',
                    //     children: [{
                    //             label: 'Call Details',
                    //             url: '#/calls-details?report=call_detail'
                    //         },
                    //         {
                    //             label: 'Group Activity',
                    //             url: '#/activity-group?report=group_activity'
                    //         },
                    //         {
                    //             label: 'Tracking Number Settings',
                    //             url: '#/settings-call-flow?report=callflow_setting'
                    //         }
                    //     ]
                    // },
                    {
                        label: 'Scorecard',
                        iconClasses: 'fa fa-columns',
                        children: [
                            
                        ]
                    }

                ];
                if ($rootScope.download_audio_enabled === true || $rootScope.download_audio_enabled === null ) {
                    var legacyReportMenuIndex = _.findIndex(menu, { label: 'Legacy Reports' });
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
                    }
                }
                if ($scope.userAccess && parseInt($scope.userAccess.campaign) > 4) {
                    menu.push({
                        label: 'Campaign & Tracking Number',
                        iconClasses: 'fa fa-phone',
                        url: '#/set-campaign'
                    });
                }

                if ($scope.userAccess && parseInt($scope.userAccess.campaign) > 4 && (parseInt($rootScope.roleId) === 4 || parseInt($rootScope.roleId) === 1 || parseInt($rootScope.roleId) === 5 || parseInt($rootScope.roleId) === 6)) {
                    if($rootScope.is_migrated === true || $rootScope.is_migrated === 'true' ){
                        menu.push({
                            label: 'Group & User',
                            iconClasses: 'fa fa-group',
                            url: '#/set-group'
                        });
                    }
                    else{
                        menu.push({
                            label: 'Group & User',
                            iconClasses: 'fa fa-group',
                            url: '#/set-legacy-group'
                        });
                    }
                }

                if (($rootScope.is_migrated === true || $rootScope.is_migrated === 'true' ) && $scope.userAccess && parseInt($scope.userAccess.sms) > 4) {
                        menu.push({
                            label: 'Conversations',
                            iconClasses: 'fa fa-comment',
                            url: '#/sms-conversations',
                            count: $rootScope.activeConversation
                        });
                }

                if ($scope.userAccess && parseInt($scope.userAccess.campaign) > 4) {
                    if($rootScope.is_migrated === true || $rootScope.is_migrated === 'true' ){
                    menu.push({
                        label: 'Settings',
                        iconClasses: 'fa fa-cog',
                        children: [{
                                label: 'My Scheduled Reports',
                                url: '#/scheduled-plans'
                            },
                            {
                                label: 'Legacy Scheduled Reports',
                                url: '#/set-scheduled'
                            },
                            {
                                label: 'Customization',
                                children: [{
                                        label: 'Legacy Distribution Lists',
                                        url: '#/set-dist'
                                    },
                                    // {
                                    //     label: 'DNI',
                                    //     url: '#/set-dni'
                                    // },
                                    {
                                        label: 'GeoRoute',
                                        url: '#/set-location'
                                    },
                                    {
                                        label: 'Tags ',
                                        url: '#/set-tags'
                                    },
                                    {
                                        label: 'Webhook',
                                        url: '#/set-webhook'
                                    }
                                ]
                            },
                            {
                                label: 'Integration',
                                children: [{
                                        label: 'Acquisio',
                                        url: '#/set-acquisio'
                                    },
                                    {
                                        label: 'Data Append',
                                        url: '#/set-append'
                                    },
                                    {
                                        label: 'DoubleClick',
                                        url: '#/set-doubleclick'
                                    },
                                    {
                                        label: 'Google Analytics',
                                        url: '#/set-ga'
                                    }
                                ]
                            }
                        ]
                    });
                    }
                    else{
                        menu.push({
                            label: 'Settings',
                            iconClasses: 'fa fa-cog',
                            children: [{
                                    label: 'My Scheduled Reports',
                                    url: '#/scheduled-plans'
                                },
                                {
                                    label: 'Legacy Scheduled Reports',
                                    url: '#/set-scheduled'
                                },
                                {
                                    label: 'Customization',
                                children: [{
                                            label: 'Legacy Distribution Lists',
                                            url: '#/set-dist'
                                        },
                                        // {
                                        //     label: 'DNI',
                                        //     url: '#/set-dni'
                                        // },
                                        {
                                            label: 'GeoRoute',
                                            url: '#/set-legacy-location'
                                        },
                                        {
                                            label: 'Tags ',
                                            url: '#/set-tags'
                                        },
                                        {
                                            label: 'Webhook',
                                            url: '#/set-webhook'
                                        }
                                    ]
                                },
                                {
                                    label: 'Integration',
                                    children: [{
                                            label: 'Acquisio',
                                            url: '#/set-acquisio'
                                        },
                                        {
                                            label: 'Data Append',
                                            url: '#/set-append'
                                        },
                                        {
                                            label: 'DoubleClick',
                                            url: '#/set-doubleclick'
                                        },
                                        {
                                            label: 'Google Analytics',
                                            url: '#/set-ga'
                                        }
                                    ]
                                }
                            ]
                        });
                    }
                }

                    if ( $scope.userAccess && !$scope.userAccess.blocked_recording && $scope.userAccess.manualscorecard >= 4) {
              		    if(parseInt($rootScope.roleId) === 1 || parseInt($rootScope.roleId) === 4){
                                _.each(menu, function(main, mainIndex) { // cycle through main menu
                                    if (main.label === 'Scorecard') { // matched main menu entry
                                                    if( $rootScope.score_call === true || $rootScope.score_call === "true"){
                                                        menu[mainIndex].children.push({
                                                            label: 'Manage Scorecard',
                                                            url: '#/set-score-card'
                                                        });
                                                    }
                                                        menu[mainIndex].children.push({
                                                            label: 'Select & Score',
                                                            url: '#/set-select-score'
                                                        });
                                                
                                    }
                                    // menu[mainIndex].children = _.sortBy(menu[mainIndex].children, function(nav) { return nav.label; });
                                });
                        }
                        if(parseInt($rootScope.roleId) === 8 || parseInt($rootScope.roleId) === 2 || parseInt($rootScope.roleId) === 3){
                            _.each(menu, function(main, mainIndex) { // cycle through main menu
                                if (main.label === 'Scorecard') { // matched main menu entry
                                            menu[mainIndex].children.push({
                                                label: 'Select & Score',
                                                url: '#/set-select-score'
                                                });
                                }
                                // menu[mainIndex].children = _.sortBy(menu[mainIndex].children, function(nav) { return nav.label; });
                            });
                        }
              	}else{
                    menu.splice(_.findLastIndex(menu, { label: "Scorecard" }), 1);
                  }

                if($scope.userAccess && $scope.userAccess.blocked_data_append){
                    _.each(menu, function(main, mainIndex) { // cycle through main menu
                        if (main.label === 'Settings') { // matched main menu entry
                            var integrationIndex = _.findLastIndex(menu[mainIndex].children, { label: "Integration" }); 
                            menu[mainIndex].children[integrationIndex].children.splice(_.findLastIndex(menu[mainIndex].children[integrationIndex].children, { label: "Data Append" }), 1);
 
                        }
                        // menu[mainIndex].children = _.sortBy(menu[mainIndex].children, function(nav) { return nav.label; });
                    });
                    
                }
                // check if user is admin of top level billing node
                if (parseInt($rootScope.billingId) === 8 || parseInt($rootScope.billingId) === 194 || parseInt($rootScope.billingId) === 7414) {
                    _.each(menu, function(main, mainIndex) { // cycle through main menu
                        if (main.label === 'Reports') { // matched main menu entry
                            _.each(menu[mainIndex].children, function(sub, subIndex) { // cycle through sub-menu
                                if (sub.label === 'Activity & Settings') { // matched sub-menu entry
                                    // insert Call Overview into sub-menu list at end
                                    menu[mainIndex].children.push({
                                        label: 'Calls Overview',
                                        url: '#/call-overview?report=call_overview'
                                    });
                                }
                            });
                        }
                    });
				}
				if ($rootScope.highestOUId === $rootScope.billingId && $scope.userAccess && $scope.userAccess.dni >= 4) {
                    _.each(menu, function(main, mainIndex) { // cycle through main menu
                        if (main.label === 'Settings') { // matched main menu entry
                            _.each(menu[mainIndex].children, function(sub, subIndex) { // cycle through sub-menu
                                if (sub.label === 'Customization') { // matched sub-menu entry
                                    // insert White Label into sub-menu list at end
                                    menu[mainIndex].children[subIndex].children.push({
										label: 'DNI',
                                        url: '#/set-dni'
                                    });
                                }
                            });
                        }
                    });
                }
                 //Handle show and hide legacy schedule report
                if ($rootScope.download_audio_enabled === false) {
                    var legacyScheduleReportMenuIndex = -1;
                    _.each(menu, function(main, mainIndex) { // cycle through main menu
                        if (main.label === 'Settings') { // matched main menu entry
                            _.each(menu[mainIndex].children, function(sub, subIndex) { // cycle through sub-menu
                                if (sub.label === 'Legacy Scheduled Reports') { // matched sub-menu entry
                                    legacyScheduleReportMenuIndex = subIndex; 
                                }
                            });
                            if(legacyScheduleReportMenuIndex!==-1){
                                menu[mainIndex].children.splice(legacyScheduleReportMenuIndex, 1);
                            }
                        }
                    });
                }
			
                if ($rootScope.highestOUId === $rootScope.billingId && $scope.userAccess && $scope.userAccess.white >= 6) {
                    _.each(menu, function(main, mainIndex) { // cycle through main menu
                        if (main.label === 'Settings') { // matched main menu entry
                            _.each(menu[mainIndex].children, function(sub, subIndex) { // cycle through sub-menu
                                if (sub.label === 'Customization') { // matched sub-menu entry
                                    // insert White Label into sub-menu list at end
                                    menu[mainIndex].children[subIndex].children.push({
                                        label: 'Whitelabel',
                                        url: '#/set-whitelabel'
                                    });
                                }
                            });
                        }
                    });
                }

                if ($rootScope.highestOUId === $rootScope.billingId && ($rootScope.userAccess && !$rootScope.userAccess.blocked_data_append && $rootScope.userAccess.hipaa && (parseInt($rootScope.roleId) === 1 && parseInt($rootScope.userAccess.hipaa) === 7))) {
                    _.each(menu, function(main, mainIndex) { // cycle through main menu
                        if (main.label === 'Settings') { // matched main menu entry
                            _.each(menu[mainIndex].children, function(sub, subIndex) { // cycle through sub-menu
                                if (sub.label === 'Customization') { // matched sub-menu entry
                                    // insert White Label into sub-menu list at end
                                    menu[mainIndex].children[subIndex].children.push({
                                        label: 'Caller Privacy',
                                        url: '#/set-caller-privacy'
                                    });
                                }
                                menu[mainIndex].children[subIndex].children = _.sortBy(menu[mainIndex].children[subIndex].children, function(nav) { return nav.label; });
                            });
                        }
                    });
                }
                if ($rootScope.protect_caller_id === false || $rootScope.protect_caller_id === "false") {
                    _.each(menu, function(main, mainIndex) { // cycle through main menu
                        if (main.label === 'Settings') { // matched main menu entry
                            _.each(menu[mainIndex].children, function(sub, subIndex) { // cycle through sub-menu
                                if (sub.label === 'Customization') { // matched sub-menu entry
                                    // insert White Label into sub-menu list at end
                                    menu[mainIndex].children[subIndex].children.push({
                                        label: 'Blacklist',
                                        url: '#/set-blacklist'
                                    });
                                }
                                menu[mainIndex].children[subIndex].children = _.sortBy(menu[mainIndex].children[subIndex].children, function(nav) { return nav.label; });
                            });
                        }
                    });
                }

                if ($scope.userAccess && $scope.userAccess.report >= 4) {
                    _.each(menu, function(main, mainIndex) { // cycle through main menu
                        if (main.label === 'Reports') { // matched main menu entry
                            _.each(menu[mainIndex].children, function(sub, subIndex) { // cycle through sub-menu
                                if (sub.label === 'Activity & Settings') { // matched sub-menu entry
                                    // insert settings reports into menu
                                    /*menu[mainIndex].children[subIndex].children.push({
							  label: 'Campaign Settings',
							  url: '#/settings-campaign'
						  });*/
                                    // menu[mainIndex].children[subIndex].children.push({
                                    //  label: 'Group Activity',
                                    //  url: '#/activity-group'
                                    // });
                                    menu[mainIndex].children[subIndex].children.push({
                                        label: 'Call Flow Settings',
                                        url: '#/settings-call-flow?report=callflow_setting'
                                    });
                                }
                            });
                        }
                    });
                }
                menuBarService.setMenuBar(menu);
                setParent(menu, null);
            };

            //do initial build of the menu.
            buildMenu();
            $scope.menu = menuBarService.getMenuBar();

            $scope.$watch(function() { return menuBarService.getMenuBar(); },
                function(value) {
                    setParent(value, null);
                    $scope.menu = value;
                }
            );
            //change in unread_msgs
            $scope.$on('download_audio_setting_changed', function() {
                buildMenu();
            }, false);
            //change in unread_msgs
            $scope.$on('unread_msgs', function() {
                buildMenu();
            }, false);

            $scope.$on('msg_read', function(event, activeConversationCount) {
                $rootScope.activeConversation = activeConversationCount;
                buildMenu();
            }, false);

            //if userAccess changes rebuild the menu
            $scope.$watch('userAccess', function(newValue, oldValue) {
                buildMenu();
                //console.log('-----user access changed-----');

            }, false);


            $scope.findItemByUrl = function(children, url) {
                for (var i = 0, length = children.length; i < length; i++) {
                    if (children[i].url && children[i].url.replace('#', '') == url) return children[i];
                    if (children[i].children !== undefined) {
                        var item = $scope.findItemByUrl(children[i].children, url);
                        if (item) return item;
                    }
                }
            };

            //setParent ($scope.menu, null);

            $scope.openItems = [];
            $scope.selectedItems = [];
            $scope.selectedFromNavMenu = false;

            $scope.select = function(item) {
                //console.log(item);
                // close open nodes
                if (item.open) {
                    item.open = false;
                    return;
                }
                for (var i = $scope.openItems.length - 1; i >= 0; i--) {
                    $scope.openItems[i].open = false;
                }
                $scope.openItems = [];

                var parentRef = item;
                while (parentRef !== null && parentRef !== undefined) {
                    parentRef.open = true;
                    $scope.openItems.push(parentRef);
                    parentRef = parentRef.parent;
                }

                // handle leaf nodes
                if (!item.children || (item.children && item.children.length < 1)) {
                    $scope.selectedFromNavMenu = true;
                    for (var j = $scope.selectedItems.length - 1; j >= 0; j--) {
                        $scope.selectedItems[j].selected = false;
                    }
                    $scope.selectedItems = [];
                    parentRef = item;
                    while (parentRef !== null && parentRef !== undefined) {
                        parentRef.selected = true;
                        $scope.selectedItems.push(parentRef);
                        parentRef = parentRef.parent;
                    }
                }

            };

            $scope.$watch(function() {
                return $location.path();
            }, function(newVal, oldVal) {
                var item = null;

                if (newVal === '/acq-call-flows4') {
                    var locationParam = $location.search();
                    newVal = newVal + '?report=' + locationParam.report;
                }
                if (newVal === '/profile') {
                    newVal = '/set-group';
                }
                if (newVal === '/set-campaign-builder') {
                    newVal = '/set-campaign';
                }
                if (newVal === '/calls-details') {
                    newVal = '/calls-details?report=call_detail';
                }

                item = $scope.findItemByUrl($scope.menu, newVal);
                if (item) { $timeout(function() { $scope.select(item); }); }
            });


            // searchbar
            $scope.showSearchBar = function($e) {
                $e.stopPropagation();
                $global.set('showSearchCollapsed', true);
            };
            $scope.$on('globalStyles:changed:showSearchCollapsed', function(event, newVal) {
                $scope.style_showSearchCollapsed = newVal;
            });
            $scope.goToSearch = function() {
                $location.path('/extras-search');
            };

            $interval(function() {
                var token = $cookies.get('ct_token');
                if($rootScope.loginState == 'loggedin' && token && $scope.userAccess && parseInt($scope.userAccess.sms) > 4){
                    ConversationWebService.getActiveBadgeCount().then(function(result) {
                        if(result.data && result.data.err == ''){
                           if(parseInt($rootScope.activeConversation) !== parseInt(result.data.json)){
                                $rootScope.activeConversation = result.data.json;
                                $scope.$broadcast('unread_msgs');
                           }
                        }else{
                            $rootScope.activeConversation = 0;
                            $scope.$broadcast('unread_msgs');
                        }                  
                    });
                }else{
                    return;
                }
            }, 30000);
        }
    ]);
