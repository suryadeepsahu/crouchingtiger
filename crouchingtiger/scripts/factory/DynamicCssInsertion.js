/**
 * Created by bschermerhorn on 11/12/15.
 */
//(function () {
	angular.module("whitelabel")
	.factory("DynamicCssInsertion", function () {
        var DynamicCssInsertion = {};

        // leaving space for a separate loginLogoURI in case we have changes in the future for them being different than the navbar
        DynamicCssInsertion.whiteLabelCSSInject = function (whiteLabelCSSObj, navbarLogoURI, loginLogoURI, isForPreview) {
            var css = "";
            if (navbarLogoURI === null || navbarLogoURI === undefined || navbarLogoURI === '') navbarLogoURI = "/assets/img/cfa-logo2.png";
                //css += (isForPreview ? " .preview " : "") + ".navbar-brand { background:url('" + navbarLogoURI + "') no-repeat center center / auto auto !important; background-size:contain !important; }\n";
			css += (isForPreview ? " .preview " : "") + ".navbar-brand { background:url('" + navbarLogoURI + "') no-repeat left/ auto auto !important; background-size:contain !important; }\n";
            if (loginLogoURI) {
                css += (isForPreview ? " .preview " : "") + ".login-logo { background:url('" + loginLogoURI + "') no-repeat center center; position:relative; top: -10px; }\n";
            }

	        if (whiteLabelCSSObj === null || whiteLabelCSSObj === undefined || whiteLabelCSSObj === '' || Object.keys(whiteLabelCSSObj).length < 1) { // set to convirza defaults
		        whiteLabelCSSObj = {
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
					        "css":".timeline-midnightblue .timeline-body:after{ border-right-color:#1f407d !important}.info-tiles.tiles-midnightblue .tiles-body," +
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
	        }

            _.each(whiteLabelCSSObj, function (group) {
                _.each(group, function(elem) {
                    css += elem.css + "\n";
                });
            });

            var node = document.createElement('style');
            node.innerHTML = css ;
            document.body.appendChild(node);
        };

		return DynamicCssInsertion;
	});
//}());
