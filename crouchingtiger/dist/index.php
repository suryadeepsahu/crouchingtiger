<?php
	// This will check the domain of the URL used and match it against entries in the DB for custom styling
	// load the config file and verify that the environment is set in the config
	require("config.php");
	if (!$_SERVER['ENV']) { die("Environment variable not set"); }
	$conf = $db[$_SERVER['ENV']]; // set the current environment settings
	$orgname = '';
	
	$actual_link = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
	$parts = parse_url($actual_link);
	parse_str($parts['query'], $query);
	if (isset($query['ct_remote_token'])) {
		print $query['ct_remote_token'];
		setcookie("ct_token", $query['ct_remote_token']);
		$url = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]";
		header("Location: $url/#/calls-details?report=call_detail");
	}

	setcookie("restapiurl", $conf['restapiurl']);
	setcookie("socketUrl", $conf['socketUrl']);
	setcookie("port", $conf['port']);
	setcookie("dniHost", $conf['dniHost']);
	setcookie("client_id", $conf['client_id']);
	setcookie("client_secret", $conf['client_secret']);
	setcookie("encryptionKey", $conf['encryptionKey']);
	setcookie("name", $_SERVER['ENV']);

	// First skip if we are calling the main Convirza domain
	if ($conf['cfa_url'] != $_SERVER['HTTP_HOST']) { // we need to lookup the domain
		// create DB connection and handle
		if (!$dbh = pg_connect("host=$conf[host] dbname=$conf[db] user=$conf[user] password=$conf[pass]")) {
			die("Failed to connect to the database for domain check");
		}
		$query = "SELECT owl.*, o.org_unit_name, wgp.org_logo AS grand_logo, wgp.white_label_css AS grand_css, wgp.white_label_active AS grand_active,  wgp.welcome_text AS grand_welcome_text, wp.welcome_text AS parent_welcome_text, ".
				"wp.org_logo AS parent_logo, wp.white_label_css AS parent_css, wp.white_label_active AS parent_active ".
			"FROM org_white_label owl, org_unit o LEFT JOIN org_white_label wp ON (o.org_unit_parent_id=wp.org_unit_id) ".
			"LEFT JOIN org_white_label wgp ON (o.top_ou_id=wgp.org_unit_id) ".
			"WHERE owl.domain_name='".strtolower($_SERVER['HTTP_HOST'])."' AND owl.org_unit_id=o.org_unit_id";
		if (!$res = pg_query($dbh, $query)) { die("Failed to query the database for domain match"); }
		if (pg_num_rows($res) > 0) { // found matching domain - set CSS
			$logo = $css = '';

			$row = pg_fetch_assoc($res);
			//print "owl active ".$row['white_label_active']."<br />parent active ".$row['parent_active']."<br />grand active ".$row['grand_active']."<br />";
			$orgname = $row['org_unit_name'];
			if ($row['white_label_active'] == 't') {
				$css = $row['white_label_css'];
				$welcome_text = $row['welcome_text'];
				$logo = ($row['org_logo'] ? $row['org_logo'] : ''); //($row['parent_logo'] && $row['parent_active'] == 't' ? $row['parent_logo'] :
					//($row['grand_logo'] && $row['grand_active'] == 't' ? $row['grand_logo'] : '')));
			} elseif ($row['parent_active'] == 't') {
				$css = $row['parent_css'];
				$welcome_text = $row['parent_welcome_text'];
				$logo = ($row['parent_logo'] ? $row['parent_logo'] : ''); //($row['grand_logo'] && $row['grand_active'] == 't' ? $row['grand_logo'] : ''));
			} elseif ($row['grand_active'] == 't') {
				$css = $row['grand_css'];
				$welcome_text = $row['grand_welcome_text'];
				$logo = ($row['grand_logo'] ? $row['grand_logo'] : '');
			}

			if ($css) { $css = json_decode($css, true); }
		}
	}
	if (!isset($logo) || $logo == '') { $logo = '/assets/img/cfa-logo2.png'; }
	if (!isset($welcome_text) || $welcome_text == '') { $welcome_text = 'Just log in! Your day is about to get better.'; }
?>
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<title><?php print ($orgname ? $orgname : 'Convirza for Advertisers'); ?></title>
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />

		<link rel="icon" href="favicon.ico" type="image/x-icon" />

		<!-- build:less assets/css/compiled_styles.css -->
		<link rel="stylesheet/less" media="all" href="assets/less/styles.less" />
		<script type="text/javascript">less = {}; less.env = 'production';</script>
		<script type="text/javascript" src="assets/plugins/misc/less.js"></script>

		<script src="assets/alasql/alasql.min.js"></script>
		<script src="assets/alasql/xlsx.core.min.js"></script>
		<script src="assets/plugins/jquery/1.9.1/jquery.min.js"></script>
		<script src="assets/plugins/jquery/1.11.2/jquery-ui.min.js"></script>
		<script src="assets/plugins/bootstrap/3.2.0/bootstrap.min.js"></script>

		<script src="assets/plugins/momentjs/2.9.0/moment-with-locales.js"></script>
		<script src="assets/plugins/bootstrap-datetimepicker/bootstrap-datetimepicker.js"></script>
		<link href="assets/plugins/bootstrap-datetimepicker/bootstrap-datetimepicker.css" rel="stylesheet">
		<script src="assets/plugins/angularjs/1.4.5/angular.min.js"></script>
		<script src="assets/plugins/angularjs/1.4.5/angular-animate.min.js"></script>
		<script src="assets/plugins/angularjs/1.4.5/angular-cookies.min.js"></script>
		<script src="assets/plugins/angularjs/1.4.5/angular-resource.min.js"></script>
		<script src="assets/plugins/angularjs/1.4.5/angular-route.min.js"></script>
		<script src="assets/plugins/angularjs/1.4.5/angular-sanitize.min.js"></script>
		<script src="assets/plugins/angular-touch/1.6.1/angular-touch.min.js"></script>
		<script src="assets/plugins/angularjs/1.4.5/angular-aria.min.js"></script>
		<script src="assets/plugins/angular-messages/1.6.1/angular-messages.min.js"></script>
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
		<!-- Angular Material style sheet & library -->
		<link rel="stylesheet" href="assets/plugins/angular-material/1.1.1/angular-material.min.css">
		<script src="assets/plugins/angular-material/1.1.1/angular-material.min.js"></script>
		<script src="assets/plugins/bootstrap/ui-bootstrap-tpls-0.10.0.js"></script>
		<!-- The following CSS are included as plugins and can be removed if unused
		<link rel='stylesheet' type='text/css' href='assets/plugins/jcrop/css/jquery.Jcrop.min.css' />
		<link rel="stylesheet" href="bower_components/angular-ui-tree/dist/angular-ui-tree.min.css" />-->

		<link rel="stylesheet" href="assets/css/vendor.css">
		<!--Put up in the concatted vers-->
		<!--<link href="https://cdn.desk.com/assets/widget_embed_191.css" media="screen" rel="stylesheet" type="text/css"/>-->
		<!-- <link rel='stylesheet' type='text/css' href='http://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css' /> -->
		<?php
			// parse through the settings to generate inline CSS definitions
			print '<style type="text/css">'."\n";
			if ($logo) { print ".navbar-brand { background:url('$logo') no-repeat left/ auto auto !important; background-size:contain !important; }\n
			.login-logo { background: rgba(0, 0, 0, 0) url('$logo') no-repeat scroll center center; height:100px; position:relative; top: -10px; }\n
			.signup-logo { background: rgba(0, 0, 0, 0) url('$logo') no-repeat scroll center center;background-size:contain !important;  height:100px; position:relative; top: -10px; }\n
			.user-logo { background: rgba(0, 0, 255, 0.6) url('/assets/img/user-logo.jpg') no-repeat scroll center center;background-size:cover !important;top: -10px;opacity: 0.9;box-shadow: inset 400px 400px 400px 400px rgba(60, 91, 156, 0.74);}"; }
			if($welcome_text){
				print " .welcome_text::after{ content: '$welcome_text'}; \n";
			}
			// check if we need to inject the CSS styling for white label
			if (isset($css) && count($css)) {
				foreach ($css AS $elem) {
					foreach ($elem AS $tag) { print "\t$tag[css]\n"; }
				}
			}
			print "</style>\n";
		?>
		<script type="text/javascript">
			function verifyGoDaddySSLSeal() {
				console.log('hit here');
				window.open(
					"https://seal.godaddy.com/verifySeal?sealID=twNeyE6Pr4LF38p8ZyoemId7ZYQiWasFBklDT2RGMT3BTyl8sLpV6rwRCd8r",
					"SealVerfication",
					"location=yes,status=yes,resizable=yes,scrollbars=no,width=592,height=433"
				);
			}
		</script>
		<style type="text/css">
			[ng-cloak] { display: none; }
			.topNegative1000 { top: -1000px !important; }
			.topZero { top: 0 !important; }
			li#no-margin { margin: 0px; }
			.row .well{background:#fff;}
			.mainview-animation { position: relative; }
			.mainview-animation.ng-enter {
				-webkit-transition: .3s linear all; /* Safari/Chrome */
				-moz-transition: .3s linear all; /* Firefox */
				-o-transition: .3s linear all; /* Opera */
				transition: .3s linear all; /* IE10+ and Future Browsers */
			}

			.mainview-animation.ng-enter { opacity: 0; }
			.mainview-animation.ng-enter.ng-enter-active { opacity: 1; }
			.navbar.navbar-default.ng-hide { display: none; }
			#page-rightbar .jspHorizontalBar {
				/*display: none !important;*/
			}
			.fc-grid .fc-day-number { padding: 5px 6px; }
			.large-icons-nav #top-nav > li > ul { top: 85px; }
			#top-nav li > ul {
				display: none;
				position: absolute;
				top: 40px;
				left: 0;
				padding-left: 0;
				min-width: 200px;
			}

			@media (max-width: 768px) {
				#top-nav li > ul {
					position: inherit !important;
					top: 0px !important;
					padding-left: 20px !important;
				}
				#siteseal img { display: none; }
			}

			#top-nav li > ul li { list-style-type: none; }
			#top-nav li > ul li ul { left: 100%; }
			#top-nav li > ul li a {
				width: 100%;
				display: inline-block;
			}
			#top-nav li > ul li a:hover { text-decoration: none; }
			#top-nav li:hover > ul { display: block; }
			#horizontal-navbar .navbar-nav li.active a:before { display: none; }
			/*.preview-mode {pointer-events: none !important;}*/
		</style>
	</head>

	<body class=""
		  ng-app="themesApp"
		  ng-controller="MainController"
		  ng-class="{
			  'static-header': !style_fixedHeader,
			  'focusedform': style_fullscreen,
			  'layout-horizontal': style_layoutHorizontal,
			  'fixed-layout': style_layoutBoxed,
			  'collapse-leftbar': style_leftbarCollapsed && !style_leftbarShown,
			  'show-rightbar': style_rightbarCollapsed,
			  'show-leftbar': style_leftbarShown
		  }"
		  ng-click="hideSearchBar();hideHeaderBar();"
		  ng-cloak>
		  <!--'preview-mode': isPreviewMode-->
<!-- Google Tag Manager -->
<noscript><iframe src="//www.googletagmanager.com/ns.html?id=GTM-PXTLD3"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'//www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-PXTLD3');</script>
<!-- End Google Tag Manager -->
		<header class="navbar navbar-inverse" ng-class="{'navbar-fixed-top': style_fixedHeader, 'navbar-static-top': !style_fixedHeader}" role="banner">
			<a id="leftmenu-trigger" tooltip-placement="right" tooltip="Toggle Sidebar" ng-click="toggleLeftBar(); resizeWindow();"
			   onClick="ga('send', 'event', { eventCategory: 'Header', eventAction: 'Toggle', eventLabel: 'Toggle Navbar'});"></a>
			<a id="rightmenu-trigger" tooltip-placement="left" tooltip="Toggle Infobar" ng-click="toggleRightBar();"
			   onClick="ga('send', 'event', { eventCategory: 'Header', eventAction: 'Toggle', eventLabel: 'Toggle Infobar'});" class="bootstro" data-bootstro-placement="bottom"
			   data-bootstro-step="1" data-bootstro-width="400px" data-bootstro-content="Click this icon to toggle viewing Usage Data, Subscription Info, and Billing History" data-bootstro-title="Subscription and Billing"></a>

			<div class="navbar-header pull-left">
				<a class="navbar-brand" onClick="ga('send', 'event', { eventCategory: 'Image', eventAction: 'Click', eventLabel: 'Main Logo'});" href="#/">Convirza</a>
			</div>

			<ul class="nav navbar-nav pull-right toolbar">
				<li class="dropdown" ng-show="!isLoggedIn">
					<a href="#/login"  style="font-size: 14px"><i class="fa fa-sign-in"></i>
						Log in</a>
				</li>
				<!--<li class="dropdown " ng-show="isLoggedIn">
				  <a href="#" style="float:left;" class="dropdown-toggle hidden-xs" ng-click="toggleRightBar()"><span class="">Viewing: {{ currentOUName }} </span></a> <i id="rightmenu-trigger" tooltip-placement="left" tooltip="Toggle" class="visible-xs" ng-click="toggleRightBar()" style="border:none;"></i>
				 </li>-->
				<li class="dropdown" uib-dropdown ng-show="isLoggedIn">
					<a href="#" onClick="ga('send', 'event', { eventCategory: 'Header', eventAction: 'Toggle', eventLabel: 'User Dropdown'});" class="dropdown-toggle username bootstro" uib-dropdown-toggle data-bootstro-placement="bottom"
					   data-bootstro-step="0" data-bootstro-width="400px" data-bootstro-content="Click Username to toggle viewing User Access and Support"
					   data-bootstro-title="User Data"><span class="hidden-xs"> {{fullName}} </span> <img src="assets/demo/avatar/user.png" alt="User" />
					</a>
					<ul class="dropdown-menu userinfo arrow">
						<li class="userlinks">
							<ul class="dropdown-menu">
								<li>
									<a href="#/profile" onClick="ga('send', 'event', { eventCategory: 'Header', eventAction: 'Click', eventLabel: 'Edit Profile'});">Edit
										Profile <i class="pull-right fa fa-fw fa-pencil"></i></a></li>
								<!-- The Admin Access link should only be visible for Super Admins or Support Admins so the ng-hide is just an example -->
								<li ng-show="supportToken">
									<a ng-click="switchAdmin()" onClick="ga('send', 'event', { eventCategory: 'Header', eventAction: 'Click', eventLabel: 'Admin Access'});">Admin
										Access <i class="pull-right fa fa-fw fa-sign-in"></i></a></li>
								<li class="divider"></li>
								<li>
									<!-- SHOULD ONLY SHOW ONE OR THE OTHER -->
									<!-- SUPPORT LINK -->
									
									<!-- <a ng-if="!supportURL" ng-href="https://knowledgebase.convirza.com" target="_blank" onClick="ga('send', 'event', { eventCategory: 'Header', eventAction: 'Click', eventLabel: 'Support'});">Support
										<i class="pull-right fa fa-fw fa-compass"></i>
									</a> -->

									<a ng-if="supportURL" ng-href="{{supportURL}}" target="_blank" onClick="ga('send', 'event', { eventCategory: 'Header', eventAction: 'Click', eventLabel: 'Support'});">Support
										<i class="pull-right fa fa-fw fa-compass"></i>
									</a>
								</li>
								<!-- <li>
									<a ng-href="{{feedbackURL}}" target="_blank">
										Customer Feedback
										<i class="pull-right fa fa-fw fa-comment-o"></i>
									</a>
								</li> -->
								<!--<li ng-show="chatActive">
									<a ng-href="{{chatURL}}" target="_blank" onClick="ga('send', 'event', { eventCategory: 'Header', eventAction: 'Click', eventLabel: 'Chat'});">Chat with an Agent  <i class="pull-right fa fa-fw fa-comment"></i></a></li>-->
								<li class="divider"></li>
								<li>
									<a ng-controller="LogoutController" class="text-right" onClick="ga('send', 'event', { eventCategory: 'Header', eventAction: 'Click', eventLabel: 'Sign Out'});" ng-click="logOut()">Sign Out</a></li>
							</ul>
						</li>
					</ul>
				</li>

				<li uib-dropdown ng-controller="MessagesController" ng-show="isLoggedIn">
					<a href="#" class="bootstro" uib-dropdown-toggle ng-click="getMessageLogs(); getMessageLogsOther()" onClick="ga('send', 'event', { eventCategory: 'Header', eventAction: 'Toggle', eventLabel: 'Toggle Activity Stream'});"
					   data-bootstro-placement="bottom" data-bootstro-step="2" data-bootstro-width="400px" data-bootstro-content="Click icon to toggle viewing the most recent activity in your account"
					   data-bootstro-title="Activity Stream">
						<i class="fa fa-clock-o"></i>
						<span class="badge badge-danger" ng-if="unseenCount>0" ng-bind="unseenCount"></span>
					</a>
					<ul class="dropdown-menu messages arrow" style="cursor:text;" >
						<li class="dd-header">
						</li>
						<div class="scrollthis" style="overflow-y:scroll !important;overflow-x:hidden !important;" >
							<li ng-repeat="item in logs">
								<a style="pointer-event:none;cursor:text;" ng-click="$event.stopPropagation();">
									<span class="time">{{item.log_date}}</span>
									<!--<img ng-src="{{item.thumb}}" alt="avatar" />-->
									<span class="name"><i ng-class="item.iconcss"></i> {{item.org_unit_name}}</span>
									<span class="msg">{{item.first_name}} {{item.last_name}} {{item.action}} a <b>{{item.log_name}}</b> {{item.log_data.note}}</span>

								</a>
							</li>
						</div>

					</ul>
				</li>

<!--			<li class="dropdown" ng-controller="NotificationsController" ng-show="isLoggedIn">
					<a href="#" class="dropdown-toggle" title="Alerts">
					  <i class="fa fa-bell"></i><span class="badge badge-orange" ng-if="unseenCount>0" ng-bind="unseenCount"></span>
					</a>
					<ul class="dropdown-menu notifications arrow">
					  <li class="dd-header">
						<span>You have {{unseenCount}} new alert(s)</span>
						<span><a href="javascript:;" ng-click="setSeenAll($event)">Mark all Seen</a></span>
					  </li>
							<div class="scrollthis" jscrollpane="{autoReinitialise:true, autoReinitialiseDelay: 20}">
						<li ng-repeat="item in notifications">
						  <a href="#" class="{{item.class}}" ng-class="{active: !item.seen}">
							<button tooltip-placement="top" tooltip-append-to-body="true" tooltip="Mark Seen" class="btn-mark-read" ng-if="!item.seen" ng-click="setSeen(item, $event)"><i class="fa fa-circle"></i></button>
							<button tooltip-placement="top" tooltip-append-to-body="true" tooltip="Mark Unseen" class="btn-mark-unread" ng-if="item.seen" ng-click="setUnseen(item, $event)"><i class="fa fa-circle-thin"></i></button>
							<span class="time">{{item.time}}</span>
							<i class="{{item.iconClasses}}"></i>
							<span class="msg">{{item.text}}</span>
						  </a>
						</li>
							</div>
					  <li class="dd-footer"><a href="#">Alerts Settings</a></li>
					</ul>
				</li>
-->
			</ul>
		</header>
		<nav class="navbar navbar-default ng-hide" role="navigation" ng-show="style_layoutHorizontal">
			<div class="navbar-header">
				<button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
					<i class="fa fa-reorder"></i>
				</button>
			</div>
			<div class="collapse navbar-collapse navbar-ex1-collapse" ng-class="{'large-icons-nav': style_layoutHorizontalLargeIcons}" id="horizontal-navbar">
				<ul ng-controller="NavigationController" id="top-nav" class="nav navbar-nav">
					<li ng-repeat="item in menu"
						ng-if="!item.hideOnHorizontal"
						ng-class="{ hasChild: (item.children!==undefined),
								active: item.selected,
								  open: (item.children!==undefined) && item.open }"
						ng-include="'templates/nav_renderer_horizontal.html'"
					></li>
				</ul>
			</div>
		</nav>
		<div id="page-container" class="clearfix">

			<!-- BEGIN SIDEBAR -->
			<nav id="page-leftbar" role="navigation" style= "position: fixed !important;z-index: 10001 !important;">
				<div>
					<ul ng-controller="NavigationController" id="sidebar" sticky-scroll="40">
						<li ng-repeat="item in menu"
							ng-class="{ hasChild: (item.children!==undefined),
								active: item.selected,
								  open: (item.children!==undefined) && item.open }"
							ng-include="'templates/nav_renderer.html'"
						></li>
						<li class="mb10"
							ng-class="{ hasChild: (item.children!==undefined),
								active: item.selected,
								  open: (item.children!==undefined) && item.open }" style="position:fixed;bottom:0;width:inherit;padding-left:10px;">
							<!--<div id="GoDaddySSLSeal">
								<img src="img/sslsiteseal.gif" onClick="verifyGoDaddySSLSeal();"/>
							</div>-->
							<!-- <span id="siteseal">
				  				<script type="text/javascript" src="https://seal.godaddy.com/getSeal?sealID=twNeyE6Pr4LF38p8ZyoemId7ZYQiWasFBklDT2RGMT3BTyl8sLpV6rwRCd8r"></script>
							</span> -->
						</li>
					</ul>
				</div>
				<!-- END SIDEBAR MENU -->
			</nav>
			<style>
				/*ul.list-unstyled li:hover{background-color:#CCC;}*/
			</style>
			<!-- BEGIN RIGHTBAR -->
			<div id="page-rightbar" sticky-scroll="40" ng-controller="SubscriptionController" rightbar-right-position="style_layoutBoxed" style="">
				<div jscrollpane="{autoReinitialise:true, autoReinitialiseDelay: 100}" style="height: 100%;padding-bottom:40px">
					<uib-accordion close-others="rightbarAccordionsShowOne">
						<uib-accordion-group is-open="rightbarAccordions[0].open" class="open">

							<uib-accordion-heading>Current Usage Summary</uib-accordion-heading>

							<div class="clearfix mb10">
								<div class="progress-title pull-left">Active/Total Campaigns</div>
								<div class="progress-percentage pull-right">
									{{campActive | number:0}}/{{campTotal | number:0}}
								</div>
							</div>
							<div class="progress">
								<div class="progress-bar progress-bar-midnightblue" style="width: {{(campActive / campTotal) * 100 | number:0}}%"></div>
								<div class="progress-bar progress-bar-info" style="width: {{100 - (campActive / campTotal) * 100 | number:0}}%"></div>
							</div>
							<div class="clearfix mb10">
								<div class="progress-title pull-left">Active/Total Tracking
									Numbers
								</div>
								<div class="progress-percentage pull-right">
									{{trkNumActive | number:0}}/{{trkNumTotal | number:0}}
								</div>
							</div>
							<div class="progress">
								<div class="progress-bar progress-bar-midnightblue" style="width: {{(trkNumActive / trkNumTotal) * 100 | number:0}}%"></div>
								<div class="progress-bar progress-bar-info" style="width: {{100 - (trkNumActive / trkNumTotal) * 100 | number:0}}%"></div>
							</div>
							<div class="clearfix mb10">
								<div class="progress-title pull-left">Active/Total Premium
									Numbers
								</div>
								<div class="progress-percentage pull-right">
									{{preNumActive | number:0}}/{{preNumTotal | number:0}}
								</div>
							</div>
							<div class="progress">
								<div class="progress-bar progress-bar-midnightblue" style="width: {{(preNumActive / preNumTotal) * 100 | number:0}}%"></div>
								<div class="progress-bar progress-bar-info" style="width: {{100 - (preNumActive / preNumTotal) * 100 | number:0}}%"></div>
							</div>
							<div class="clearfix mb10">
 								<div class="progress-title pull-left">Minutes</div>
 								<div class="progress-percentage pull-right">{{minTotal | number:1*(minTotal % 1 !== 0)}}</div>
 							</div>
 							<div class="clearfix mb10">
								<div class="progress-title pull-left">Long Distance Minutes </div>
								<div class="progress-percentage pull-right">{{longDistanceMinutes | number:1*(longDistanceMinutes % 1 !== 0)}}</div>
							</div>
 							<div class="clearfix mb10">
								<div class="progress-title pull-left">Premium Minutes</div>
								<div class="progress-percentage pull-right">{{minPreTotal | number:1*(minPreTotal % 1 !== 0)}}</div>
							</div>
							<div class="clearfix mb10">
								<div class="progress-title pull-left">Calls</div>
								<div class="progress-percentage pull-right">{{callTotal | number:0}}</div>
							</div>
							<div class="clearfix mb10">
								<div class="progress-title pull-left">Analyzed Calls</div>
								<div class="progress-percentage pull-right">{{anaNumTotal | number:0}}</div>
							</div>
							<div class="clearfix mb10">
								<div class="progress-title pull-left">Users</div>
								<div class="progress-percentage pull-right">{{usrTotal | number:0}}</div>
							</div>
							<div class="clearfix mb10">
								<div class="progress-title pull-left">Reserved Numbers</div>
								<div class="progress-percentage pull-right">{{resNum | number:0}}</div>
							</div>
							
							<!--<div class="clearfix mb10">-->
							<!--<div class="progress-title pull-left">Call Actions</div>-->
							<!--<div class="progress-percentage pull-right">{{callActionTotal}}</div>-->
							<!--</div>-->
						</uib-accordion-group>

						<uib-accordion-group is-open="rightbarAccordions[1].open" class="open" ng-if="billing_node && admin">
							<uib-accordion-heading>Subscription Information</uib-accordion-heading>
							<div class="clearfix mb10">
								<div class="progress-title pull-left">Account Number:</div>
								<div class="progress-percentage pull-right">{{si.account_code}}</div>
							</div>
							<div class="clearfix mb10">
								<div class="progress-title pull-left">Account Name:</div>
								<div class="progress-percentage pull-right">{{si.account_name}}</div>
							</div>
							<div class="clearfix mb10">
								<div class="progress-title pull-left">Subscription Number:</div>
								<div class="progress-percentage pull-right">{{si.billing_code}}</div>
							</div>
							<div class="clearfix mb10">
								<div class="progress-title pull-left">Subscription Name:</div>
								<div class="progress-percentage pull-right">{{si.billing_name}}</div>
							</div>
							<div class="clearfix mb10">
								<div class="progress-title pull-left">Activation Date:</div>
								<div class="progress-percentage pull-right">{{si.activation_date}}</div>
							</div>
							<div class="clearfix mb10">
								<div class="progress-title pull-left">Last Invoice Date:</div>
								<div class="progress-percentage pull-right">{{si.prev_invoice_date}}</div>
							</div>
							<div class="clearfix mb10">
								<div class="progress-title pull-left">Last Payment Date:</div>
								<div class="progress-percentage pull-right">{{si.payment_date}}</div>
							</div>
							<div class="clearfix mb10">
								<div class="progress-title pull-left">Last Payment Amount:</div>
								<div class="progress-percentage pull-right">${{si.prev_invoice_amount}}</div>
							</div>
							<div class="clearfix mb10">
								<div class="progress-title pull-left">Next Billing Date:</div>
								<div class="progress-percentage pull-right">{{si.cycle_end}}</div>
							</div>
							<p class="well mt20" style="padding:8px;">To make account changes, please contact Customer Support at 855-889-3939</p>
							<!-- <span id="assistly-widget-1" class="assistly-widget">
							  <span style="clear:both;" class="more mt10"><a class="btn btn-default a-desk-widget a-desk-widget-chat" href="http://support.convirza.com:80/customer/widget/chats/new?">Make Changes</a></span>
							</span> -->
						</uib-accordion-group>

						<uib-accordion-group is-open="rightbarAccordions[3].open" class="open" ng-show="billing_node && admin">
							<uib-accordion-heading>
								Customer Support Access
							</uib-accordion-heading>
							<div class="clearfix mb10">
								<label class="control-label" style="padding-top:8px;">Allow Customer
									Support access to your account?</label>

								<div style="padding-bottom:25px;" class="">
									<toggle-switch on-label="Yes" off-label="No" class="primary switch" ng-model="allow_admin" ng-change="toggleAdmin(allow_admin)">
										<toggle-switch>
								</div>
							</div>
						</uib-accordion-group>

					</uib-accordion>
				</div>
			</div>
			<!-- END RIGHTBAR -->
			<div id="page-content" class="clearfix" fit-height>
				<!-- OU breadcrumbs -->
				<div class="breadcrumb-wrapper bootstro" ng-controller="BreadcrumbController" ng-show="(isLoggedIn && showBreadCrumb)" data-bootstro-placement="bottom" data-bootstro-step="3" data-bootstro-width="400px" data-bootstro-content="Click the breadcrumb bar to toggle access to navigate your group structure and view data for specific groups." data-bootstro-title="Viewing Group">
					<div tabindex="0" class="breadcrumb-container" id="gwt-debug--nav-drawer-container">
						<input type="text" tabindex="-1" role="presentation" style="opacity: 0; height: 1px; width: 1px; z-index: -1; overflow: hidden; position: absolute;">

							<div class="bc-drawer bc-open-shadow">
								<div class="bc-main">
									<!-- first breadcrumb -->
									<div class="bc-drawer-panel-container" id="gwt-debug--nav-drawer-panel-container" title="{{bc_ous[0].name}}">
										<div class="bc-drawer-header-container" id="gwt-debug--nav-drawer-header-container" style="height: 40px;" ng-click="showBoxes = ! showBoxes">
											<span>
												<div class="bc-drawer-header-title" >
													<div class="bc-drawer-header-title-style" id="gwt-debug--nav-drawer-title-AGENCY" ng-click="setCurrentOU(bc_ous[0].id,0,doNothing); $event.stopPropagation();">
														{{bc_ous[0].name}}
													</div>
												</div>
											</span>
											<!-- If they user has NOT chosen an OU to drill down to, then the icon class should be "fa fa-angle-down" -->
											<div ng-show="userOULevel <= 2" ng-switch on="bc_ous[1].name">
												<div ng-switch-when="null" class="bc-drawer-panel-nav"  ng-click="loadLevel1(bc_ous[0].id); setSelected(bc_ous[0].id,1); ">
													<i class="fa fa-angle-down"></i></div>
												<div ng-switch-default class="bc-drawer-panel-nav">
													<i class="fa fa-angle-right"></i></div>
											</div>
										</div>
										<!-- The breadcrumb list container will have display set to none unless the breadcrumb container is active -->
										<div class="bc-drawer-list-container" ng-show="showBoxes && userOULevel <= 2">
										<div class="bc-drawer-search">
											<div class="bc-drawer-search-icon">
												<i class="fa fa-search"></i></div>
											<input type="text" class="bc-drawer-search-box bc-drawer-search-box-style" id="gwt-debug--nav-drawer-search-box-ADVERTISER" ng-model="query1">
												<div class="bc-drawer-search-clear" ng-click="query1 = ''">X
												</div>
										</div>
											<div class="bc-drawer-list-main" style="overflow: auto; position: relative; zoom: 1;">
												<div style="position: relative; zoom: 1;">
													<div ng-class="bc-drawer-item-highlight">
														<table cellspacing="0" cellpadding="0">
															<tbody>
																<tr>
																</tr>
																<tr ng-repeat="ou in levelOneOus | filter: { name: query1 } | orderBy: 'name' ">
																	<td align="left" style="vertical-align: top;" ng-click="loadLevel1(ou.id)(ou.id); setSelected(ou.id,0);">
																			<div ng-class="ou.id == selectedOU.id? 'bc-drawer-item-highlight' : ''">
																				<div class="bc-drawer-item-style" id="gwt-debug--nav-drawer-item-ADVERTISER-LogMyCalls">
																					<div class="bc-drawer-item" title="{{ou.name}}">{{ou.name | truncate_campGroupName }}
																				</div>
																				<a><i class="pull-right fa fa-fw fa-pencil pt5" ng-show="selectedOU.id == ou.id" ng-click="loadLevel1(ou.id)"></i></a>
																			</div>
																		</div>
																	</td>
																</tr>
															</tbody>
														</table>
													</div>
												</div>
											</div>
										</div>
									</div>



									<!-- end first breadcrumb -->
									<!-- second breadcrumb -->
									<div class="bc-drawer-panel-container" id="gwt-debug--nav-drawer-panel-container" title="{{bc_ous[1].name}}">
										<div class="bc-drawer-header-container" id="gwt-debug--nav-drawer-header-container" style="height: 40px;" ng-click="showBoxes = ! showBoxes">
											<span>
												<div class="bc-drawer-header-title">
													<div class="bc-drawer-header-title-style" id="gwt-debug--nav-drawer-title-ADVERTISER" ng-show="bc_ous[1].name != null" ng-click="setCurrentOU(bc_ous[1].id,1,doNothing); $event.stopPropagation();">
														{{ bc_ous[1].name }}
													</div>
												</div>
											</span>
											<!-- If they user has NOT chosen an OU to drill down to, then the icon class should be "fa fa-angle-down" -->
											<div ng-show="bc_ous[1].name != null && userOULevel < 1" ng-switch on="bc_ous[2].name">
												<div ng-switch-when="null" class="bc-drawer-panel-nav" ng-click="resizeWindow();">
													<i class="fa fa-angle-down"></i></div>
												<div ng-switch-default class="bc-drawer-panel-nav">
													<i class="fa fa-angle-right"></i></div>
											</div>
										</div>
										<!-- The breadcrumb list container will have display set to none unless the breadcrumb container is active -->
										<div class="bc-drawer-list-container" ng-show="showBoxes && showLevel1 && userOULevel < 2">
											<div class="bc-drawer-search">
												<div class="bc-drawer-search-icon">
													<i class="fa fa-search"></i></div>
												<input type="text" class="bc-drawer-search-box bc-drawer-search-box-style" id="gwt-debug--nav-drawer-search-box-ADVERTISER" ng-model="query2">
													<!-- this X allows a user to clear the search box and reloads the list of OUs at this level -->
													<div class="bc-drawer-search-clear" ng-click="query2 = ''">X
													</div>
											</div>
											<div class="bc-drawer-list-main" style="overflow: auto; position: relative; zoom: 1;">
												<div style="position: relative; zoom: 1;">
													<div>
														<!-- this is a div to display if a user initiates a search from the search box -->
														<table cellspacing="0" cellpadding="0">
															<tbody>
																<tr ng-repeat="ou in level2OUs | filter: { name: query2 } | orderBy: 'name' ">
																	<td align="left" style="vertical-align: top;" ng-click="loadLevel2(ou.id); setSelected(ou.id,1);">
																		<div ng-class="ou.id == selectedOU.id? 'bc-drawer-item-highlight' : ''">
																			<div class="bc-drawer-item-style" id="gwt-debug--nav-drawer-item-ADVERTISER-LogMyCalls">
																				<div class="bc-drawer-item" title="{{ou.name}}">
																					{{ ou.name | truncate_campGroupName }}
																				</div>
																				<a><i class="pull-right fa fa-fw fa-pencil pt5" ng-show="selectedOU.id == ou.id" ng-click="editOU(ou.id, 1)"></i></a>
																			</div>
																		</div>
																	</td>
																</tr>
															</tbody>
														</table>
														<!-- this is a spinner icon to let a user know a search or lookup is happening and it will be hidden once the list is displayed -->
														<i class="fa fa-spinner fa-spin" style="display: none"></i>
													</div>
												</div>
											</div>

										</div>
									</div>
									<!-- end second breadcrumb -->
									<!-- third breadcrumb -->
									<div class="bc-drawer-panel-container" id="gwt-debug--nav-drawer-panel-container" title="{{ bc_ous[2].name }}">
										<div class="bc-drawer-header-container" id="gwt-debug--nav-drawer-header-container" style="height: 40px;" ng-click="showBoxes = ! showBoxes">
											<span>
												<div class="bc-drawer-header-title">
													<div class="bc-drawer-header-title-style" id="gwt-debug--nav-drawer-title-ENGINE_ACCOUNT" ng-click="setCurrentOU(bc_ous[2].id,2,doNothing); $event.stopPropagation();">
														{{ bc_ous[2].name }}
													</div>
												</div>
											</span>
										</div>
										<!-- The breadcrumb list container will have display set to none unless the breadcrumb container is active -->
										<div class="bc-drawer-list-container" ng-show="showBoxes && showLevel2 && userOULevel < 1">
											<div class="bc-drawer-search">
												<div class="bc-drawer-search-icon">
													<i class="fa fa-search"></i></div>
												<input type="text" class="bc-drawer-search-box bc-drawer-search-box-style" id="gwt-debug--nav-drawer-search-box-ENGINE_ACCOUNT" ng-model="query3">
													<!-- this X allows a user to clear the search box and reloads the list of OUs at this level -->
													<div class="bc-drawer-search-clear" ng-click="query3 = ''">X
													</div>
											</div>
											<div class="bc-drawer-list-main" style="overflow: auto; position: relative; zoom: 1;">
												<div style="position: relative; zoom: 1;">
													<div>
														<!-- this is a div to display if a user initiates a search from the search box -->
														<table cellspacing="0" cellpadding="0">
															<tbody>
																<tr ng-repeat="ou in level3OUs | filter: { name: query3 } | orderBy: 'name' ">
																	<td align="left" style="vertical-align: top;" ng-click="setSelected(ou.id,2);">
																		<div ng-class="ou.id == selectedOU.id? 'bc-drawer-item-highlight' : ''">
																			<div class="bc-drawer-item-style" id="gwt-debug--nav-drawer-item-ENGINE_ACCOUNT-test-engine">
																				<div class="bc-drawer-item" title="{{ ou.name }}">
																					{{ ou.name | truncate_campGroupName }}
																				</div>
																				<a><i class="pull-right fa fa-fw fa-pencil pt5" ng-show="selectedOU.id == ou.id" ng-click="editOU(ou.id, 2)"></i></a>
																			</div>
																		</div>
																	</td>
																</tr>
															</tbody>
														</table>
														<!-- this is a spinner icon to let a user know a search or lookup is happening and it will be hidden once the list is displayed -->
														<i class="fa-li fa fa-spinner fa-spin" style="display: inline;"></i>
													</div>
												</div>
											</div>

										</div>
									</div>
									<!-- end third breadcrumb -->
								</div>
								<!-- apply and cancel buttons -->
								<!-- The breadcrumb drawer action panel is only visible when the breadcrumb container is active -->
								<div class="bc-drawer-action-panel" ng-show="showBoxes && userOULevel <= 2">
									<button type="button" class="btn btn-default btn-sm" id="gwt-debug--nav-drawer-action-button" ng-disabled="applyDisabled" ng-click="setCurrentOU(selectedOU.id, selectedOU.level,doNothing); resizeWindow();" onClick="ga('send', 'event', { eventCategory: 'Button', eventAction: 'Apply', eventLabel: 'View OU'});">
										Apply
									</button>
									<button type="button" class="btn btn-primary btn-sm" id="gwt-debug--nav-drawer-cancel-button" ng-click="showBoxes = false; resizeWindow();" onClick="ga('send', 'event', { eventCategory: 'Button', eventAction: 'Cancel', eventLabel: 'View OU'});">
										Cancel
									</button>
								</div>
							</div>
					</div>
				</div>
				<!-- end OU breadcrumbs -->
				<div id="wrap" ng-view="" class="mainview-animation">

				</div>
				<!--wrap -->
			</div>
			<!-- page-content -->

			<footer role="contentinfo">
				<div class="clearfix">
					<ul class="list-unstyled list-inline pull-left">
						<li ng-hide="white_label_active">Convirza &copy; <script>document.write(new Date().getFullYear())</script></li>
					</ul>
					<button class="pull-right btn btn-default btn-xs hidden-print" back-to-top style="padding: 1px 10px;">
						<i class="fa fa-angle-up"></i></button>
				</div>
			</footer>

		</div>
		<!-- Dynamic chat window -->
		<div ng-show="conversationData.length > 0" ng-class="data.conver.chatBoxClass" ng-repeat="data in conversationData" ng-click="onChatWindowClicked(data)">
				<div class="smsHistoryLoading" ng-show="data.conver.chatWindowLoading">
					<img src="./img/pageloading.gif" class="ProgressLoader-img" alt="pageloading" />
				</div>
				<!-- Showing the chat information -->
				<div style="cursor: pointer;" ng-class="(data.conver.newMessage && data.conver.newMessage == true) ? 'chatbox-heading-new-msg' : 'chatbox-heading'"class=""> 
					<i style="margin-right:7px;" class="fa fa-comment" ng-click="toggleMiniMaxChat($index)"></i>
					<span class="tooltiptext-heading" style="flex-grow:1; width:235px;" ng-click="toggleMiniMaxChat($index)" title="{{data.conver.org_unit_name.length+data.conver.labelUpdate.length > 33 ? data.conver.org_unit_name+(data.conver.labelUpdate ? '-'+data.conver.labelUpdate: '') :''}}">
					     <!-- {{data.conver.org_unit_name}}{{data.conver.labelUpdate ? '-': ''}}{{data.conver.labelUpdate}} -->
						 {{ data.conver | chatHeading }}
						 </span>
					<span style="margin-right:7px;" ng-click="toggleMiniMaxChat($index)" style="cursor: pointer;">—</span>
					<span ng-click="closeChat($index)" style="cursor: pointer;"><i class="fa fa-times" aria-hidden="true"></i></span>
				</div>
				<div class="chatbox-subheading">
					<div style="text-align: center;" class="sub-part tooltiptext" title="{{data.conver.campaign_name.length > 25 ? data.conver.campaign_name : '' }}"><span>Campaign Name</span><br>{{data.conver.campaign_name}}</div>
					<div style="text-align: center;" class="sub-part"><span>Tracking Number</span><br>{{data.conver.tracking_number}}</div>
					<!-- Update the label also hide and show label box-->
					<div ng-show="data.conver.isOpenLabel" class="smallPop">
							<input enter-press="updateLabel($index,data.conver)" maxlength="50" class="form-control" ng-change="runTimeChange($index,data.conver.labelUpdate)"  ng-model="data.conver.labelUpdate" ng-disabled="!canModify" placeholder="Enter Label"/>
							<span ng-click="updateLabel($index,data.conver)"  ng-class="data.conver.isDisabledSpan">
								Save
							</span>
							<span  ng-click="cancelUpdate($index)" class="button-cancel">
								Cancel
							</span>
					</div>
				</div>
				<div style="background:#f5f5f5;cursor:pointer;" ng-click="toggleOpenLabel($index)">
					<i style="margin-left: 50%; color:#446881;" ng-class="data.conver.arrowClassLabel"></i>
				</div>
				<!-- Main chat window receives and send data -->
				<div class="main-window" id="{{data.conver.conversation_id}}">
					<div ng-class="sms.type=='outgoing' ? 'chat-message-sender' : 'chat-message'" ng-repeat="sms in data.conver.messages track by $index">
						{{sms.message}}
						<div ng-class="sms.type=='outgoing' ? 'chat-footer-sender' : 'chat-footer-receiver'">
							<span>{{sms.type=='outgoing' ? data.conver.tracking_number: data.conver.caller_id}}</span>
							<span> {{sms.time}}</span>
						</div>
					</div>       
				</div>
				<div style="display:flex;" >
					<form style="display:flex;width:100%;align-items:center" ng-submit="sendMessage($index,data.conver)">
						<div style="width:226px;margin-right:8px;">
							<textarea enter-press="sendMessage($index,data.conver)" style="border-radius: 5px;width:226px;margin-left: 4px;resize:none;" ng-model="data.conver.formData.typingText" ng-disabled="!canModify" maxlength="160" name="getMessage" rows="2" cols="27" autofocus></textarea>
						</div>
						<div class="text-left">
							<button type="submit" style="border-radius: 5px;" ng-disabled="data.conver.formData.typingText.length==0 || !data.conver.sendSmsEnable || !canModify || data.conver.chatWindowLoading" class="btn btn-primary">SEND</button>
						</div>
					</form>
				</div>
				<div>
					<label style="margin-left: 15px;font-size: smaller;">Message count:{{data.conver.messages.length}}</label>
					<label style="margin-left: 92px;font-size: smaller;">{{data.conver.formData.typingText.length}}/160</label>
				</div>
			</div>

		<!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries. Placeholdr.js enables the placeholder attribute -->
		<!--[if lt IE 9]>
		<script type="text/javascript" src="https://html5shim.googlecode.com/svn/trunk/html5.js"></script>
		<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/respond.js/1.1.0/respond.min.js"></script>
		<script type="text/javascript" src="assets/plugins/charts-flot/excanvas.min.js"></script>
		<script type='text/javascript' src='assets/plugins/misc/placeholdr.js'></script>
		<script src="bower_components/es5-shim/es5-shim.js"></script>
		<script src="bower_components/json3/lib/json3.min.js"></script>
		<![endif]-->

		<script src="js/vendor1.js"></script>

		<script src="js/vendor2.js"></script>
		<!--
		<script src="assets/plugins/form-ckeditor/ckeditor.js"></script>
		<script src="assets/plugins/form-ckeditor/plugins/strinsert/plugin.js"></script>
		<script src='assets/plugins/form-ckeditor/lang/en.js'></script>

		-->
		<script src="assets/alasql/alasql.min.js"></script>
        <script src="assets/alasql/xlsx.core.min.js"></script>
		<script src="assets/plugins/ckeditor/ckeditor.js"></script>
		<script src="assets/plugins/ckeditor/plugins/strinsert/plugin.js"></script>
		<script src='assets/plugins/ckeditor/lang/en.js'></script>


		<script src="assets/plugins/flot/0.8.3/jquery.flot.time.min.js"></script>
		<script src="assets/plugins/lodash/4.13.1/lodash.js"></script>
		<script src="assets/plugins/jspdf/1.3.3/jspdf.min.js"></script>
		<!-- <script src="https://cdn.rawgit.com/laertejjunior/freezeheader/master/js/jquery.freezeheader.js"></script> -->
		<link rel='stylesheet' href='assets/plugins/textAngular/textAngular.css'>
        <script src='assets/plugins/textAngular/textAngular-rangy.min.js'></script>
		<script src='assets/plugins/textAngular/textAngular-sanitize.min.js'></script>
		<script src='assets/plugins/textAngular/textAngular.min.js'></script>

        <!-- Socket CDN --> 
		<script src="assets/plugins/socket.io/socket.io.js"></script>


		<script src="js/app.js"></script>

		<script src="js/vendor3.js"></script>
		<div id="zabbix-monitoring" style="display:none;">{{loginState}}</div>
	</body>
</html>
<style>
    .chatbox{
        position: fixed;
        z-index: 999;
        right: 0;
        bottom: 0;
        border: 2px solid #cecece;
        width: 310px;
        height: 400px;
        background: white;
        display: block;
    }
    .chatboxTWO{
        position: fixed;
        z-index: 999;
        right: 311px;
        bottom: 0;
        border: 2px solid #cecece;
        width: 310px;
        height: 400px;
        background: white;
    }
	.chatboxThree{
        position: fixed;
        z-index: 999;
        right: 622px;
        bottom: 0;
        border: 2px solid #cecece;
        width: 310px;
        height: 400px;
        background: white;
    }
	.chatboxFour{
        position: fixed;
        z-index: 999;
        right: 933px;
        bottom: 0;
        border: 2px solid #cecece;
        width: 310px;
        height: 400px;
        background: white;
    }
	.hideChat{
		display:none;
    }
	.minimizeChat{
        position: fixed;
        z-index: 999;
        right: 0;
        bottom: 0;
        border: 2px solid #cecece;
        width: 310px;
        height: 30px;
        background: white;
        display: block;
    }
	.minimizeChatTwo{
        position: fixed;
        z-index: 999;
        right: 311px;
        bottom: 0;
        border: 2px solid #cecece;
        width: 310px;
        height: 30px;
        background: white;
        display: block;
    }
	.minimizeChatThree{
        position: fixed;
        z-index: 999;
        right: 622px;
        bottom: 0;
        border: 2px solid #cecece;
        width: 310px;
        height: 30px;
        background: white;
        display: block;
    }
	.minimizeChatFour{
        position: fixed;
        z-index: 999;
        right: 933px;
        bottom: 0;
        border: 2px solid #cecece;
        width: 310px;
        height: 30px;
        background: white;
        display: block;
    }
    .chatbox-heading{
        background:#20407a;
        color:white;
        padding:5px 10px;
        font-size:13px;
		display:flex;
		align-items:center;
    }
	.chatbox-heading-new-msg{
        background:#7FFF00;
        color:black;
        padding:5px 10px;
        font-size:13px;
		display:flex;
		align-items:center;
		animation: new-msg 4s infinite;
    }

    @keyframes new-msg {
       from {background-color: #2e78fd;}
       to {background-color: #5793FD;}
     }
    .chatbox-subheading{
        background:#cecece;
        color:#666666;
        display:flex;
        align-items:center;
        font-size:10px;
        position:relative;
    }
    /* .chatbox-subheading:after,
    .chatbox-subheading:before {
        top: 100%;
        left: 50%;
        border: solid transparent;
        content: " ";
        height: 0;
        width: 0;
        position: absolute;
        pointer-events: none;
    } */
    /* .chatbox-subheading:after {
        border-color: rgba(136, 183, 213, 0);
        border-top-color: #ffffff;
        border-width: 12px;
        margin-left: -12px;
        cursor: pointer;
    } */
    /* .chatbox-subheading:before {
        border-color: rgba(194, 225, 245, 0);
        border-top-color: #241FCC;
        border-width: 13px;
        margin-left: -13px;
        cursor: pointer;
    } */
    .chatbox-subheading .smallPop{
        background: white;
        color: #666666;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 10px;
        position: absolute;
        width: calc(100% - 20px);
        top: 53px;
        left: 10px;
        border: 1px solid #6a8da1;
    }
    .chatbox-subheading .smallPop .form-control{
        width:100%;
        border:none;
        padding:5px 10px;
    }
    .chatbox-subheading .sub-part{
        padding:6px;
        width:50%;
    }
    .chatbox-subheading .sub-part span{
        font-weight: bold;
        margin-right:5px;
    }
    .main-window{
        border:10px solid #f5f5f5;
        height: calc(100% - 150px);
        overflow-y: auto;
		border-top: none;
    }
    .main-window .chat-message{
        margin:10px;
        font-size:12px;
        border-bottom:1px solid #ddd;
        padding:2px;
    	font-weight:bold;
		word-break: break-all;
    }
	.main-window .chat-message-sender{
        margin:10px;
        font-size:12px;
        border-bottom:1px solid #ddd;
        padding:2px;
    	font-weight:bold;
		padding-left:20px;
		text-align:right;
		word-break: break-all;
    }
    .main-window .chat-footer-receiver{
        text-align:left;
		font-weight:normal;
    	font-size:10px;
    }
    .chat-footer-sender{
        text-align:right;
		font-weight:normal;
    	font-size:10px;
    }
    .main-window .chat-message .chat-footer{
        margin-top:10px;
        color:grey;
    }
	.button-label{
		text-align: center;
		cursor: pointer;
		border-radius: 4px;
		border:1px solid transparent;
		padding: 4px 6px;
		margin-right: 2px;
		color: #fff;
		background-color: #4697ce;
		border-color: #4697ce;
		margin-right: 4px;
		width: 60px;
	}
	.button-label-disable{
		text-align: center;
		cursor: not-allowed;
		border-radius: 4px;
		border:1px solid transparent;
		padding: 4px 6px;
		margin-right: 2px;
		color: #fff;
		background-color: #4697ce;
		border-color: #4697ce;
		margin-right: 4px;
		width: 60px;
	}
	.button-cancel{
		text-align: center;
		cursor: pointer;
		border-radius: 4px;
		border:1px solid transparent;
		padding: 4px 6px;
		margin-right: 2px;
	}
	.tooltiptext{
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.tooltiptext-heading{
		overflow: hidden;
		white-space: nowrap;
	}
	.smsHistoryLoading{
		z-index: 999999;
		position: absolute;
		pointer-events: all;
		margin-top: 28px;
		margin-left: 43%;
	}
</style>
