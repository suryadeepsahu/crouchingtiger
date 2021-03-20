/**
 * Created by bschermerhorn on 11/10/15.
 */
(function () {
    var app = angular.module("whitelabel", ["white-label-directives", "api-param","ui.bootstrap.modal","theme.form-directives"]);

	app.controller("WhitelabelColorsLogoController", function ($timeout, $scope, $rootScope, $location, WhiteLabelWebService, pinesNotifications, $uibModal, $window, DynamicCssInsertion, OrgUnitWebService) {

		// Don't change this - important that we have no logo if not set
        $scope.DEFAULT_ORG_LOGO_URL = ""; ///assets/img/cfa-logo2.png";
		$scope.support_url = null;
		$scope.chat_active = false;
        $scope.isLoadingApi = true;

        $scope.welcome_text = "";

		// check that user is authorized for page
		if ($rootScope.highestOUId !== $rootScope.billingId || $scope.userAccess.white < 6) {
			location.href = '#/access-denied';
			return;
		}
		$scope.org_log = false;

        // invoked at bottom
        $scope.initialize = function () {
            $scope.fillFormValues();
        };
		var defaultReset = false;
        $scope.resetDefault  = function (e) {
			defaultReset = true;
            e.preventDefault();

            $scope.white_label_css = {
                fonts:  $scope.getDefaultFontThemeSettings(),
                colors_one: $scope.getDefaultColorThemeSettingsOne(),
                colors_two: $scope.getDefaultColorThemeSettingsTwo()
            };
            $scope.org_logo = $scope.DEFAULT_ORG_LOGO_URL;
            $scope.removeImageInFileUpload();
        };

        $scope.removeImageInFileUpload = function () {
            // dont remove this $timeout
            $timeout(function () {
                var $removeBtn = $("a.fileinput-exists");
                if ($removeBtn.length && ($removeBtn.css("display") !== "none")) {
                    $removeBtn.click();
                }
            }, 1);
        };

        $scope.fillFormValues = function () {
            // Initializes
            // Active toggle
            // Domain and support portal
            // and convirza chat
            // Colors and Logo
	        console.log('fillFormValues called');
            WhiteLabelWebService.getAllButEmailWhiteLabelInfo($rootScope.currentOUId).then(function (result) {
                var whiteLabelServerData;
                // if there's valid data, use it
                $scope.isLoadingApi = false;
                if (result.data !== undefined && result.data.json !== undefined && Object.keys(result.data.json).length > 0) {
					console.log('Using defined style found');
                    whiteLabelServerData = result.data.json[0] || $scope.getDefaultWhiteLabelServerData();
	                $scope.org_logo = whiteLabelServerData.org_logo;
	                $scope.white_label_bool = whiteLabelServerData.white_label_active;

                    _.extend($scope, whiteLabelServerData);
                    if (!$scope.white_label_css || !$scope.white_label_css.fonts || !$scope.white_label_css.colors_one || !$scope.white_label_css.colors_two) {
                        $scope.white_label_css = {
                            fonts:  $scope.getDefaultFontThemeSettings(),
                            colors_one: $scope.getDefaultColorThemeSettingsOne(),
                            colors_two: $scope.getDefaultColorThemeSettingsTwo()
                        };
                    }
                } else {
                    //_.extend($scope, $scope.getDefaultWhiteLabelServerData());
	                $scope.white_label_css = $scope.defaultCss();
	                $scope.white_label_bool = false;
	                console.log('Using default values', $scope.white_label_css);
                }
                if (!$scope.org_logo) { $scope.org_logo = $scope.DEFAULT_ORG_LOGO_URL; }
	            if ($scope.white_label_bool === false) { // need to retrieve style to apply
		            console.log('is false - using OUID', $rootScope.currentOUId);
		            WhiteLabelWebService.getStyle($rootScope.currentOUId).then(function(result) {
			            console.log('Getting CSS to apply', result.data);
			            var ret = result.data.json;

			            ret.org_logo = (ret.org_logo ? ret.org_logo : $scope.DEFAULT_ORG_LOGO_URL);
			            console.log('setting logo to ', $scope.org_logo, ret.org_logo);
			            // update the CSS
			            DynamicCssInsertion.whiteLabelCSSInject(ret.white_label_css, ret.org_logo, ret.org_logo, true);
                    });
                }
            });
        };

        $scope.saveWhitelabelActiveToggle = function () {
            $scope.isLoadingApi = false;
            var formData = new FormData();
            formData.append("org_unit_id", $rootScope.currentOUId);
            formData.append("white_label_active", $scope.white_label_bool);
	        console.log('white_label_bool', $scope.white_label_bool);

            //var promise = WhiteLabelWebService.saveAllButEmailWhitelabelSettings(formData);
	        WhiteLabelWebService.saveAllButEmailWhitelabelSettings(formData).then(function (result) {
		        if (result.data !== undefined && result.data.result !== undefined && result.data.result !== 'error') {
			        pinesNotifications.notify({
				        title:"Whitelabel Activity",
				        text :"Whitelabel is now " + ($scope.white_label_bool ? "active" : "inactive") + ".",
				        type :"success"
			        });
			        $scope.applyStyle();

		        } else {
			        pinesNotifications.notify({
				        title:"Whitelabel Activity",
				        text :"Error: " + JSON.stringify(result.data.err),
				        type :"error"
			        });
		        }
	        });
	    };

        $scope.saveDomainAndSupport = function () {
            $scope.isLoadingApi = false;
            // regex to test subdomain
            if (!$scope.domainSupportForm.$valid) {
                pinesNotifications.notify({
                    title:"Domains and Support",
                    text: "Whoops. At least one of your forms is invalid.",
                    type: "error"
                });
                return;
            }
			if ($scope.domain_name) { $scope.domain_name = $scope.domain_name.toLowerCase(); } //set to lower case to match backend
            if ($scope.support_url === undefined || $scope.support_url === null) {
	            $scope.support_url = null;
            } else if ($scope.support_url.length === 0) {
	            $scope.support_url = null;
            }
            if($scope.welcome_text === undefined || $scope.welcome_text === null || $scope.welcome_text.length === 0){
                $scope.welcome_text = "Just log in! Your day is about to get better.";
            }

            var formData = new FormData();
            formData.append("org_unit_id", $rootScope.currentOUId);
            formData.append("domain_name", $scope.domain_name || null);
            formData.append("support_url", $scope.support_url || null);
            formData.append("chat_active", $scope.chat_active || false);
            formData.append("welcome_text", $scope.welcome_text);

            var promise = WhiteLabelWebService.saveAllButEmailWhitelabelSettings(formData);
            promise.then(
                function successHandler(resp) {
                    if (resp.data.result === "success" && !resp.data.err) {
                        pinesNotifications.notify({
                            title:"Domains and Support",
                            text: "Whitelabel settings for Domains and Support have been updated.",
                            type: "success"
                        });
	                    $scope.applyStyle();
                    } else {
						if(resp.data.result === "error" && resp.data.err == 'Problem saving whitelabel settings: error: duplicate key value violates unique constraint \"org_white_label_domain_name_key\"') {
							pinesNotifications.notify({
								title:"Domains and Support",
								text: "Error: This subdomain is already in use. Please enter a unique value." ,
								type: "error"
							});
						}
						else {
							pinesNotifications.notify({
								title:"Domains and Support",
								text: "Error: " + JSON.stringify(resp.data.err),
								type: "error"
							});
						}

                    }
            }, function errorHandler(resp) {
                pinesNotifications.notify({
                    title:"Domains and Support",
                    text: "Error: " + JSON.stringify(resp.data),
                    type: "error"
                });
            });
        };

        $scope.injectDefaultStyling = function () {
            var white_label_css = _.extend({}, $scope.generateCssForFormName({
                colors_one: $scope.getDefaultColorThemeSettingsOne(),
                colors_two: $scope.getDefaultColorThemeSettingsTwo(),
                fonts:  $scope.getDefaultFontThemeSettings()
            }));
            DynamicCssInsertion.whiteLabelCSSInject(white_label_css, $scope.DEFAULT_ORG_LOGO_URL, $scope.DEFAULT_ORG_LOGO_URL, false);
        };

		$scope.previewColor  = function () {
            if (!$scope.themeSettingsForm.$valid) {
                pinesNotifications.notify({
                    title:"Colors and Theme",
                    text: "Whoops. At least one of your forms is invalid.",
                    type: "error"
                });
                return;
            }

            var white_label_css = _.extend({}, $scope.generateCssForFormName($scope.white_label_css, true));

            // use file being uploaded for preview
            var img = $('#img_pre').children().attr('src');
			// no preview - use currently set logo
			if (img === undefined && !defaultReset) { img = $('#current_logo').attr('src'); }

			//check to see if an image has been selected
			//if not lookup the image that should be used for the preview
			if (img === undefined) {
				OrgUnitWebService.getOrgUnitById($rootScope.currentOUId).then(function(ouResult) {
					//console.log(ouResult.data.json[0].parent_id);
					var lookup_ou = $rootScope.currentOUId;
					//if the user has clicked Reset Default we need to get the Logo for the parent OU
					if (defaultReset && ouResult.data.json[0].org_unit_parent_id && ouResult.data.json[0].org_unit_parent_id > 0) {
						lookup_ou = ouResult.data.json[0].org_unit_parent_id;
					}
					WhiteLabelWebService.getStyle(lookup_ou).then(function(result) {
						img = result.data.json.org_logo;
						//check for top level ou that has clicked Reset Default
						if(defaultReset && ouResult.data.json[0].org_unit_parent_id === null) img = "/assets/img/cfa-logo2.png";
						// update the CSS
						DynamicCssInsertion.whiteLabelCSSInject(white_label_css, img, img, true);

						var modalInstance = $uibModal.open({
							templateUrl: 'assets/partials/preview.html',
							controller: 'WhitelabelPreviewController',
							size: 'lg',
							backdrop: 'static',
							keyboard: false
						});
					});
				});
			} else {
				// get the base64 encoding of the image
				DynamicCssInsertion.whiteLabelCSSInject(white_label_css, img, img, true);

				var modalInstance = $uibModal.open({
					templateUrl: 'assets/partials/preview.html',
					controller: 'WhitelabelPreviewController',
					size: 'lg',
					backdrop: 'static',
					keyboard: false
				});
			}
            //img = img ? img : current_logo;
			//console.log(img);
        };

		$scope.saveColorsLogoTheme = function () {
			var max_img_size = 2097152;

            if (!$scope.themeSettingsForm.$valid) {
                pinesNotifications.notify({
                    title:"Colors and Theme",
                    text: "Whoops. At least one of your forms is invalid.",
                    type: "error"
                });
                return;
            }

            var formData = new FormData();
            // if user wants to revert back to default, we can't SET the default file to the
            // input DOM element

            var org_logo = document.getElementById("org-logo");
            if (org_logo && org_logo.files[0]) {
                if (org_logo.files[0].type !== 'image/jpeg' && org_logo.files[0].type !== 'image/png') {
                    pinesNotifications.notify({
                        title:"Colors and Theme",
                        text: "Whoops. The Logo image must be of file type JPG or PNG",
                        type: "error"
                    });
                    return;
                }
	            if (org_logo.files[0].size > max_img_size) {
		            pinesNotifications.notify({
			            title:"Colors and Theme",
			            text: "Whoops. The Logo image must be smaller than "+(max_img_size/1024/1024) + " MB",
			            type: "error"
		            });
		            return;
	            }
                formData.append("file", org_logo.files[0]);

            } else if ($scope.org_logo === $scope.DEFAULT_ORG_LOGO_URL) {
                // formData.append("file", null);
                formData.append("org_logo", null);
            }

            formData.append("org_unit_id", $rootScope.currentOUId);

            // includes keys with $ as a character which doesnt make mongo happy
            var whiteLabelCssWithoutAngularHash = _.extend({}, $scope.generateCssForFormName($scope.white_label_css));
            _.each(whiteLabelCssWithoutAngularHash, function (colorsOrFonts) {
                _.each(colorsOrFonts, function (val) {
                    delete val.$$hashKey;
                });
            });
            formData.append("white_label_css", JSON.stringify(whiteLabelCssWithoutAngularHash));

            var promise = WhiteLabelWebService.saveAllButEmailWhitelabelSettings(formData);
            promise.then(
                function successHandler(resp) {
                if (resp.data.result === "success" && !resp.data.err) {
                    pinesNotifications.notify({
                        title:"Colors and Logo",
                        text: "Whitelabel settings for Colors and Logo have been updated.",
                        type: "success"
                    });
	                $scope.applyStyle();
					defaultReset = false;

                    var img = $('#img_pre').children().attr('src');
                    console.log(img);
                    if (img) {
                        $scope.org_logo = img;
                    }
                    $scope.removeImageInFileUpload();
                } else {
                    pinesNotifications.notify({
                        title:"Colors and Logo",
                        text: "Error: " + JSON.stringify(resp.data.err),
                        type: "error"
                    });
                }
            }, function errorHandler(resp) {
                pinesNotifications.notify({
                    title:"Colors and Logo",
                    text: "Error: " + JSON.stringify(resp),
                    type: "error"
                });
            });
		};




		$scope.applyStyle = function() {
			WhiteLabelWebService.getStyle($rootScope.currentOUId).then(function(result) {

				if (result.data.result !== 'success') {
					pinesNotifications.notify({
						title:"Domains and Support",
						text: "Error: " + result.err,
						type: "error"
					});
				} else {
					// set the support and chat settings
					$rootScope.chatURL    = $window.sessionStorage.chatURL    = "https://support.convirza.com/customer/portal/chats/new";
					if (Object.keys(result.data.json).length > 0) {
						$rootScope.white_label_active = $window.sessionStorage.white_label_active = result.data.json.white_label_active;
                        if(!result.data.json.support_url &&  !result.data.json.domain_name){
                            $rootScope.supportURL = $window.sessionStorage.supportURL = "https://knowledgebase.convirza.com";
                        }else{
                            $rootScope.supportURL = $window.sessionStorage.supportURL = result.data.json.support_url;
                        }
						$rootScope.chatActive = $window.sessionStorage.chatActive = result.data.json.chat_active;
                        $rootScope.welcometext = $window.sessionStorage.welcometext = result.data.json.welcome_text;

					} else {
                        $rootScope.white_label_active = $window.sessionStorage.white_label_active = false;
                        $rootScope.supportURL = $window.sessionStorage.supportURL = "https://knowledgebase.convirza.com";
						$rootScope.chatActive = $window.sessionStorage.chatActive = true;
                        $rootScope.welcometext = $window.sessionStorage.welcometext = "Just log in! Your day is about to get better.";
					}
                    console.log($rootScope.supportURL);
					// dynamically inject the custom CSS styling into the document
					DynamicCssInsertion.whiteLabelCSSInject(result.data.json.white_label_css, result.data.json.org_logo, result.data.json.org_logo, false);
					if (result.data.json.white_label_css && result.data.json.white_label_css !== undefined && Object.keys(result.data.json.white_label_css)) {
                        //DynamicCssInsertion.whiteLabelCSSInject(result.data.json.white_label_css, result.data.json.org_logo, result.data.json.org_logo, false);
                        if (result.data.json.org_logo && $scope.white_label_bool) {
                            $scope.org_logo = result.data.json.org_logo;
                        }
					}// else {
                        // this would be the case where we're at the top level OU and it doesn't have a parent to get CSS rules from
                        //$scope.injectDefaultStyling();
                    //}
				}
			});
		};

        $scope.getDefaultWhiteLabelServerData = function () {
            return {
                chat_active:        false,
                chat_url:           null,
                domain_name:        null,
                org_logo:           null,
                support_url:        null,
                white_label_active: false,
                welcome_text: "",
                white_label_css:    {
                    colors_one: $scope.getDefaultColorThemeSettingsOne(),
                    colors_two: $scope.getDefaultColorThemeSettingsTwo(),
                    fonts:  $scope.getDefaultFontThemeSettings()
                }
            };
        };

		$scope.getDefaultColorThemeSettingsOne = function () {
			return [
                { formName: "Header Background",     value: "#575757"},
                { formName: "Header Text",           value: "#aaaaaa"},
                { formName: "Accent 1 Background",   value: "#1f407d"},
                { formName: "Accent 1 Text",         value: "#ffffff"}
            ];
        };
        
        $scope.getDefaultColorThemeSettingsTwo = function () {
			return [
                { formName: "Navigation Background", value: "#575757"},
                { formName: "Navigation Text",       value: "#f4f3ea"},
                { formName: "Navigation Highlight",  value: "#e36c25"},
                { formName: "Navigation Text Hover", value: "#e0e0e0"},
                { formName: "Sub Nav Background",    value: "#494949"}
            ];
		};

		$scope.getDefaultFontThemeSettings = function () {
			return [
				{ formName: "Font", value: "Helvetica"}
			];
		};

		$scope.generateCssForFormName = function (fontsAndColorsHash, isPreview) {

            // if adding anymore css rules, be sure that the last element in one of these
            // arrays is a selector with the CSS properties, for purposes of the prepending .preview class
            // condition below in an _.each

            // also, make sure the @media ending bracket (ex @media() { }) ending curly bracket
            // is at the end of the last css property within that @media also for the preprending of the .preview class logic
			var cssTextGenerators = {
				"Header Background": [
                    "header.navbar-inverse,",
                    "nav.navbar { background-color: <%= value %>; }",
                    "header li.dropdown { border: 0px solid <%= value %> !important; }",
                    "#rightmenu-trigger { border: 0px solid <%= value %> !important; }",
                    "#leftmenu-trigger { border: 1px solid <%= value %> !important;}",
                ],
				"Navigation Background": [
                    "#page-container,",
                    "nav#page-leftbar,",
                    ".focusedform,",
                    "#sidebar ul,",
                    "#fillerOnPreview { background-color: <%= value %>; }"
                ],
                "Header Text": [
                    ".navbar-inverse .navbar-nav>li>a {color: <%= value %>;}"
                ],
				"Font": [
                    "h4,",
                    "h3,",
                    ".bc-main,",
                    ".bc-drawer-item,",
                    "#page-heading h1,",
                    "btn,",
                    ".btn,",
                    "text,",
                    "#sidebar,",
                    ".panel,",
                    ".row,",
                    "footer,",
                    ".tiles-heading,",
                    ".panel-group,",
                    ".btn-info,",
                    ".btn-default,",
                    ".btn-sm,",
                    ".btn-danger,",
                    ".btn-primary,",
                    ".fileinput-new,",
                    ".fileinput-exists,",
                    "select,",
                    "input,",
                    ".ui-pnotify-text,",
                    ".ui-pnotify-title,",
                    ".control-label,",
                    "btn[type=submit],",
                    ".hidden-xs,",
                    "input[type=file],",
                    ".dropdown-menu,",
                    ".btn-midnightblue-alt,",
                    "h3.popover-title,",
                    "div.popover-content,",
                    ".navbar-inverse .navbar-nav>li>a,",
                    ".panel-heading h4 {font-family: <%= value %> !important;}",
                    "body {font-family: <%= value %>;}"
                ],
				"Sub Nav Background": [
					"#sidebar ul,",
					"#sidebar ul li a,",
					"#sidebar .divider,",
					"#sidebar .divider:hover,",
					"body.collapse-leftbar #search.keep-open > a,",
					".navbar-inverse .navbar-nav > .active > a,",
					".navbar-inverse .navbar-nav > .open > a,",
					".navbar-inverse .navbar-nav > .active > a:focus,",
					".navbar-inverse .navbar-nav > .open > a:focus,",
					".navbar-inverse .navbar-nav > .active > a:hover,",
					".navbar-inverse .navbar-nav > .open > a:hover { background-color: <%= value %> !important;}",
					"header .toolbar .dropdown,",
					"header #headerbardropdown,",
					"header #rightmenu-trigger { border: 1px solid <%= value %>; }",
					"header #leftmenu-trigger { border: 1px solid <%= value %>; }",
					"@media (min-width: 768px) {",
					   "#horizontal-navbar.large-icons-nav .navbar-nav li ul { background-color: <%= value %>; }",
					   "#horizontal-navbar.large-icons-nav .navbar-nav li ul li a:hover { background: <%= value %>; color: #ffffff; } }",
					"@media (max-width: 480px) {",
					   "ul.toolbar {background-color: <%= value %>;} }"
				],
				"Navigation Text": [
					"#sidebar li a,",
					"#sidebar ul li.active:not(.open) > a,",
					"#sidebar ul li a {color: <%= value %>;}",
					"body.collapse-leftbar #search.keep-open > a:hover {background: <%= value %>;}",
					"@media (min-width: 768px) {",
					   "#horizontal-navbar.large-icons-nav .navbar-nav li ul li a { color: <%= value %>;} }"
				],
				"Navigation Highlight": [
					"#sidebar a:hover,",
					"body.collapse-leftbar #sidebar > li:hover,",
					"body.collapse-leftbar #sidebar > li.keep-open { background-color: <%= value %>!important;}",
					"a,",
                    "a:hover,",
                    ".btn-link:hover,",
                    ".btn-link:focus {color: <%= value %>;}",
					"#sidebar > li.active > a { background-color: <%= value %>;}"
				],
				"Navigation Text Hover": [
					"#sidebar a:hover,",
					"#sidebar a:hover i,",
					"body.collapse-leftbar #sidebar > li:hover > a,",
					"body.collapse-leftbar #sidebar > li:hover > a i,",
					"body.collapse-leftbar #sidebar > li.keep-open > a,",
					"body.collapse-leftbar #sidebar > li.keep-open > a i,",
					"#sidebar ul li.active a:hover,",
					"nav.navbar .navbar-toggle,",
					"nav.navbar .navbar-toggle:hover,",
					"nav.navbar .navbar-toggle:focus { color: <%= value %> !important;}"
				],
				"Accent 1 Text": [
					"#sidebar > li.active > a,",
					"body.collapse-leftbar #sidebar > li.active:hover > a,",
					".btn-midnightblue:hover,",
                    ".btn-midnightblue:focus,",
					".btn-midnightblue:active,",
                    ".btn-midnightblue.active,",
					".open > .dropdown-toggle.btn-midnightblue,",
					".btn-midnightblue {color: <%= value %>;}"
				],
				"Accent 1 Background": [
                    ".timeline-midnightblue .timeline-body:after{ border-right-color:<%= value %> !important}",

                    ".info-tiles.tiles-midnightblue .tiles-body,",
                    ".timeline-midnightblue .timeline-body { background-color: <%= value %> !important;}",

                    ".panel-midnightblue .panel-heading,",
                    ".panel-inverse .panel-heading,",
                    ".btn-midnightblue { background-color:<%= value %> !important; border-color:<%= value %> ;}",

                    ".info-tiles.tiles-midnightblue:hover .tiles-heading { background-color:<%= value %>; }",
                    ".info-tiles.tiles-midnightblue .tiles-heading { background-color: <%= lighterVal %>; }",

                    ".info-tiles.tiles-midnightblue:hover .tiles-body,",
                    ".info-tiles.tiles-midnightblue:hover .tiles-body-alt {background:<%= darkerVal %>;}",

                    ".btn-midnightblue:hover,",
                    ".btn-midnightblue:focus,",
                    ".btn-midnightblue.active,",
                    ".open > .dropdown-toggle.btn-midnightblue {background-color: <%= darkerVal %>;}",

                    ".btn-midnightblue:hover,",
                    ".btn-midnightblue:focus,",
                    ".btn-midnightblue:active,",
                    ".open > .dropdown-toggle.btn-midnightblue {border-color: <%= darkerVal %>;}"
                ]
			};





            // our HTML for the Preview modal is namespaced within a .preview div
            // if we're in preview viewing we need to add specific css selectors that
            // wont affect the rest of the app, otherwise we can't revert back
            if (isPreview) {
                _.each(cssTextGenerators, function (val, key, obj) {
                    obj[key] = val.map(function (v) {
                        if (v.substr(0, 6) !== "@media") {
                            return ".preview " + v;
                        } else {
                            return v;
                        }
                    });
                });
            }

            // value must be a function that takes {value: "#ffafaf"} and returns a completed str
            // Accent 1 Background requires some extra work done unique to iteself
            _.each(cssTextGenerators, function (val, key, obj) {
                if (key !== "Accent 1 Background") {
                    obj[key] = _.template(val.join(""));

                } else if (key === "Accent 1 Background") {
                    // color is a hexcode string
                    // positive float percent is by how much you want to make it lighter ex 0.5 would lighten it by 50 percent
                    // negative float percent is by how much you want to make it darker ex -0.5 would darken it by 50 percent
                    obj[key] = function (templateObj) {
                        return accent1Background(val.join(""), templateObj);
                    };
                }
            });



			// Iterate over the keys, colors and fonts, which are arrays of objects.
            // Create a css key for each of those objects based on their hex/style value
            _.each(fontsAndColorsHash, function (arrOfVals, styleType, obj) {
                obj[styleType] = _.map(arrOfVals, function (styleObj) {
                    styleObj.css = cssTextGenerators[styleObj.formName]({value: styleObj.value});
                    return styleObj;
                });
            });

            return fontsAndColorsHash;


            // Helper function
            // Has dependent values that are dynamic based on what the value is for Accent 1 Background, so we
            // break it out and do extra logic in addition to just inserting the value in
            // requires an object in format {value: <string value here>}
            function accent1Background(strSelectors, valTemplateObj) {
                // color is a hexcode string
                // positive float percent is by how much you want to make it lighter ex 0.5 would lighten it by 50 percent
                // negative float percent is by how much you want to make it darker ex -0.5 would darken it by 50 percent
                function shadeColor(color, percent) {
                    var f=parseInt(color.slice(1),16),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=f>>16,G=f>>8&0x00FF,B=f&0x0000FF;
                    return "#"+(0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).slice(1);
                }

                // template
                // val ->        hexcode value OR font family name
                // lighterVal -> 10% lighter value than value
                // darkerVal ->  20% darker value than value
                var accent1BackgroundAndFriends = _.template(strSelectors)(
                    _.extend(valTemplateObj, {lighterVal: shadeColor(valTemplateObj.value, 0.1), darkerVal: shadeColor(valTemplateObj.value, -0.2)})
                );
                return accent1BackgroundAndFriends;
            }//end accent1Background function
		};//end $scope.generateCssForFormName function


		$scope.defaultCss = function() {
			var css = {
				"fonts":[
					{
						"formName":"Font",
						"value":"Helvetica",
						"css":"h4,h3, .bc-main, .bc-drawer-item,#page-heading h1,btn,.btn,text,#sidebar,.panel,.row,footer,.tiles-heading,.panel-group,.btn-info,.btn-default," +
							".btn-sm,.btn-danger,.btn-primary,.fileinput-new,.fileinput-exists,select,input,.ui-pnotify-text,.ui-pnotify-title,.control-label,btn[type=submit]," +
							".hidden-xs,input[type=file],.dropdown-menu,.btn-midnightblue-alt,h3.popover-title,div.popover-content," +
							".panel-heading h4 {}body {}"
					}
				],
				"colors":[
					{
						"formName":"Header Background",
						"value":"#575757",
						"css":"header.navbar-inverse,nav.navbar { background-color: #575757; }header li.dropdown { border: 0px solid #575757 !important; } " +
							"#rightmenu-trigger { border: 0px solid #575757 !important; }#leftmenu-trigger { border: 1px solid #575757 !important;}"
					},
					{
						"formName":"Header Text",
						"value":"#aaaaaa",
						"css":".navbar-inverse .navbar-nav>li>a {color: #aaaaaa;}"
					},
					{
						"formName":"Navigation Background",
						"value":"#575757",
						"css":"#page-container,nav#page-leftbar,.focusedform,#sidebar ul, #fillerOnPreview { background-color: #575757; }"
					},
					{
						"formName":"Navigation Text",
						"value":"#f4f3ea",
						"css":"#sidebar li a, #sidebar ul li.active:not(.open) > a, #sidebar ul li a {color: #f4f3ea;}body.collapse-leftbar #search.keep-open > a:hover {background: #f4f3ea;}" +
							"@media (min-width: 768px) {#horizontal-navbar.large-icons-nav .navbar-nav li ul li a { color: #f4f3ea;} }"
					},
					{
						"formName":"Navigation Highlight",
						"value":"#e36c25",
						"css":"#sidebar a:hover,body.collapse-leftbar #sidebar > li:hover,body.collapse-leftbar #sidebar > li.keep-open { background-color: #e36c25!important;}a," +
							"a:hover,.btn-link:hover,.btn-link:focus {color: #e36c25;}#sidebar > li.active > a { background-color: #e36c25;}"
					},
					{
						"formName":"Navigation Text Hover",
						"value":"#e0e0e0",
						"css":"#sidebar a:hover,#sidebar a:hover i,body.collapse-leftbar #sidebar > li:hover > a,body.collapse-leftbar #sidebar > li:hover > a i," +
							"body.collapse-leftbar #sidebar > li.keep-open > a,body.collapse-leftbar #sidebar > li.keep-open > a i,#sidebar ul li.active a:hover,nav.navbar .navbar-toggle," +
							"nav.navbar .navbar-toggle:hover,nav.navbar .navbar-toggle:focus { color: #e0e0e0 !important;}"
					},
					{
						"formName":"Sub Nav Background",
						"value":"#494949",
						"css":"#sidebar ul,#sidebar ul li a,#sidebar .divider,#sidebar .divider:hover,body.collapse-leftbar #search.keep-open > a,.navbar-inverse .navbar-nav > .active > a," +
							".navbar-inverse .navbar-nav > .open > a,.navbar-inverse .navbar-nav > .active > a:focus,.navbar-inverse .navbar-nav > .open > a:focus," +
							".navbar-inverse .navbar-nav > .active > a:hover,.navbar-inverse .navbar-nav > .open > a:hover { background-color: #494949 !important;}header .toolbar .dropdown," +
							"header #headerbardropdown,header #rightmenu-trigger { border: 1px solid #494949; }header #leftmenu-trigger { border: 1px solid #494949; }" +
							"@media (min-width: 768px) {#horizontal-navbar.large-icons-nav .navbar-nav li ul { background-color: #494949; }#horizontal-navbar .large-icons-nav " +
							".navbar-nav li ul li a:hover { background: #494949; color: #ffffff; } }@media (max-width: 480px) {ul.toolbar {background-color: #494949;} }"
					},
					{
						"formName":"Accent 1 Background",
						"value":"#1f407d",
						"css":".timeline-midnightblue .timeline-body:after{ border-right-color:#1f407d !important}.info-tiles .tiles-midnightblue .tiles-body," +
							".timeline-midnightblue .timeline-body { background-color: #1f407d !important;}.panel-midnightblue .panel-heading," +
							".panel-inverse .panel-heading,.btn-midnightblue { background-color:#1f407d !important; border-color:#1f407d ;}.info-tiles.tiles-midnightblue:hover " +
							".tiles-heading { background-color:#1f407d; }.info-tiles.tiles-midnightblue .tiles-heading { background-color: #35538a; }.info-tiles.tiles-midnightblue:hover " +
							".tiles-body,.info-tiles.tiles-midnightblue:hover .tiles-body-alt {background:#193364;}.btn-midnightblue:hover,.btn-midnightblue:focus," +
							".btn-midnightblue.active,.open > .dropdown-toggle .btn-midnightblue {background-color: #193364;}.btn-midnightblue:hover,.btn-midnightblue:focus," +
							".btn-midnightblue:active,.open > .dropdown-toggle .btn-midnightblue {border-color: #193364;}"
					},
					{
						"formName":"Accent 1 Text",
						"value":"#ffffff",
						"css":"#sidebar > li.active > a,body.collapse-leftbar #sidebar > li.active:hover > a,.btn-midnightblue:hover,.btn-midnightblue:focus,.btn-midnightblue:active," +
						".btn-midnightblue.active,.open > .dropdown-toggle.btn-midnightblue,.btn-midnightblue {color: #ffffff;}"
					}
				]
			};
			return css;
		};




        $scope.initialize();


        // This may or may not be an easter egg

        $scope.themez = {a:0, b:0, c:0};
        $scope.setTheme = function (which) {

            // 1 2 3 1
            if ($scope.themez.a === 1 && $scope.themez.b === 1 && $scope.themez.c === 1 && which === "a") {
                $scope.white_label_css = {
                    fonts:  [
                        { formName: "Font", value: "Helvetica"}
                    ],
                    colors_one: [
                        { formName: "Header Background",     value: "#4b8661"},
                        { formName: "Header Text",           value: "#e22f4a"},
                        { formName: "Accent 1 Background",   value: "#1d4b2b"},
                        { formName: "Accent 1 Text",         value: "#ffffff"}
                    ],
                    colors_two: [
                        { formName: "Navigation Background", value: "#7eb989"},
                        { formName: "Navigation Text",       value: "#256a22"},
                        { formName: "Navigation Highlight",  value: "#ffffff"},
                        { formName: "Navigation Text Hover", value: "#00ffc9"},
                        { formName: "Sub Nav Background",    value: "#652a2a"}
                    ]
                };
                $scope.org_logo = $scope.DEFAULT_ORG_LOGO_URL;
                $scope.themez = {a:0, b:0, c:0};
                return;
            }

            // 3 3 3
            if ($scope.themez.c == 3) {
                $scope.white_label_css = {
                    fonts:  [
                        { formName: "Font", value: "Helvetica"}
                    ],
                    colors_one: [
                        { formName: "Header Background",     value: "#4b8661"},
                        { formName: "Header Text",           value: "#e22f4a"},
                        { formName: "Accent 1 Background",   value: "#1d4b2b"},
                        { formName: "Accent 1 Text",         value: "#ffffff"}
                    ],
                    colors_two: [
                        { formName: "Navigation Background", value: "#7eb989"},
                        { formName: "Navigation Text",       value: "#256a22"},
                        { formName: "Navigation Highlight",  value: "#ffffff"},
                        { formName: "Navigation Text Hover", value: "#00ffc9"},
                        { formName: "Sub Nav Background",    value: "#652a2a"}
                    ]
                };
                $scope.org_logo = $scope.DEFAULT_ORG_LOGO_URL;
                $scope.themez = {a:0, b:0, c:0};
                return;
            }


            ++$scope.themez[which];
        };
	})
	.controller("WhitelabelPreviewController", function ($scope, $rootScope, $location, WhiteLabelWebService, pinesNotifications, $window, $uibModalInstance) {

		$scope.cancelPreview = function () {
            // TODO
            // do we even need to make a call here? If we're only applying styling to .preview namespace of CSS, then we don't need to overwrite anything when we
            // get out of preview mode


			// WhiteLabelWebService.getStyle($rootScope.currentOUId).then(function(result) {
			// 	if (result.data.result !== 'success') {
			// 		pinesNotifications.notify({
			// 			title:"Domains and Support",
			// 			text: "Error: " + result.err,
			// 			type: "error"
			// 		});
			// 	} else {
			// 		// set the support and chat settings
			// 		if (Object.keys(result.data.json).length > 0) {
			// 			$rootScope.supportURL = $window.sessionStorage.supportURL = result.data.json.support_url;
			// 			$rootScope.chatURL    = $window.sessionStorage.chatURL    = result.data.json.chat_url;
			// 			$rootScope.chatActive = $window.sessionStorage.chatActive = result.data.json.chat_active;
			// 		} else {
			// 			$rootScope.supportURL = $window.sessionStorage.supportURL = "#/support";
			// 			$rootScope.chatURL    = $window.sessionStorage.chatURL    = "https://support.convirza.com/customer/portal/chats/new";
			// 			$rootScope.chatActive = $window.sessionStorage.chatActive = true;
			// 		}

			// 		// dynamically inject the custom CSS styling into the document

			// 		if (result.data.json.white_label_css && Object.keys(result.data.json.white_label_css).length > 0) {
   //                      DynamicCssInsertion.whiteLabelCSSInject(result.data.json.white_label_css, result.data.json.org_logo, result.data.json.org_logo, true);

			// 			// var css = (result.data.json.org_logo ? ".navbar-brand { background:url('" + result.data.json.org_logo + "') no-repeat 0 0; }\n" +
			// 			// 	".login-logo { background:url('" + result.data.json.org_logo + "') no-repeat center center; }\n" : '');

			// 			// _.each(result.data.json.white_label_css, function (group) {
			// 			// 	_.each(group, function(elem) {
			// 			// 		css += elem.css + "\n";
			// 			// 	});
			// 			// });

			// 			// var node = document.createElement('style');
			// 			// node.innerHTML = css ;
			// 			// document.body.appendChild(node);
			// 		}
			// 	}
			// });

			$uibModalInstance.dismiss('cancel');
		};
	});
}());
