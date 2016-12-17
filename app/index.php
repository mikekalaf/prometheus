<?php require('includes/prometheus.php'); ?>
<!DOCTYPE html>
<html lang="en-us">
	<head>
		<meta charset="utf-8">
		<!--<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">-->
		<title>Project Prometheus</title>
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
		<!-- Basic Styles -->
		<link rel="stylesheet" type="text/css" media="screen" href="assets/css/app.min.css">
		<!-- FAVICONS -->
		<link rel="shortcut icon" href="assets/img/favicon/favicon.ico" type="image/x-icon">
		<link rel="icon" href="assets/img/favicon/favicon.ico" type="image/x-icon">
		<!-- GOOGLE FONT -->
		<link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:400italic,700italic,300,400,700">
		<!-- Specifying a Webpage Icon for Web Clip
			 Ref: https://developer.apple.com/library/ios/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html -->
		<link rel="apple-touch-icon" href="assets/img/splash/sptouch-icon-iphone.png">
		<link rel="apple-touch-icon" sizes="76x76" href="assets/img/splash/touch-icon-ipad.png">
		<link rel="apple-touch-icon" sizes="120x120" href="assets/img/splash/touch-icon-iphone-retina.png">
		<link rel="apple-touch-icon" sizes="152x152" href="assets/img/splash/touch-icon-ipad-retina.png">
		<!-- iOS web-app metas : hides Safari UI Components and Changes Status Bar Appearance -->
		<meta name="apple-mobile-web-app-capable" content="yes">
		<meta name="apple-mobile-web-app-status-bar-style" content="black">
	</head>
	<body>
		<div id="prometheusWrapper">
			<div class="appBackground"></div>
				<div id="appMenu">
						<div class="menuItem menuTitle">Project <span>Prometheus</span></div>
						<div class="menuHeader menuItem appLink overlayLink" data-app="skynet" data-target="skynetView">Skynet</div>
						<div class="menuHeader menuItem">Cerebro Archives</div>
						<div class="menuSubHeader menuItem appLink" data-app="grindr">Sector 1</div>
						<div class="menuSubHeader menuItem appLink" data-app="jackd">Sector 2</div>
						<div class="menuSubHeader menuItem appLink" data-app="scruff">Sector 3</div>
						<div class="menuHeader menuItem appLink" data-app="junkcollector">JunkCollector</div>
				</div>
				<div id="topBanner">
						<div class="appMenuTrigger">
							<i class="fa fa-bars"></i>
						</div>
						<div class="appLogo">Prometheus</div>
				</div>
				<div id="appContainer">
					<div id="appView"></div>
					<div id="ajaxLoader"></div>
				</div>
				<div id="skynetView" class="app-overlay-window">
					<div class="app-overylay-header">
						<div class="app-overlay-title">Skynet</div>
						<div class="app-overlay-close" data-target="skynetView"><i class="fa fa-times"></i></div>
					</div>
					<div class="app-overlay-body">
							<iframe class="app-iframe" src="https://skynet.chasingthedrift.com"></iframe>
					</div>
				</div>
				<?php include('partials/sector1User.php'); ?>
				<?php include('partials/sector2User.php'); ?>
				<?php include('partials/sector3User.php'); ?>
		</div>
		<div id="prometheusSplash" class="animated fadeIn">
			<div id="loader"></div>
			<div>
				<div class="title">Project<span>Prometheus</span></div>
				<div class="subTitle">Version 1.0</div>
			</div>
		</div>
		<script type="text/javascript" src="assets/js/app.min.js"></script>
  </body>
</html>
