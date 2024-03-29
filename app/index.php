<?php
if(($_SERVER['SERVER_PORT'] != '443') && ($_SERVER['HTTP_HOST'] == "prometheus.chasingthedrift.com")) {
    header('Location: https://'.$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI']);
    exit();
}
require('includes/prometheus.php'); ?>
<!DOCTYPE html>
<html lang="en-us">
	<head>
		<meta charset="utf-8">
		<!--<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">-->
		<title>Project Prometheus</title>
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta name="robots" content="noindex, nofollow"/>

		<!-- Basic Styles -->
		<link rel="stylesheet" type="text/css" media="screen" href="assets/css/app.min.css">
		<!-- FAVICONS -->
		<link rel="shortcut icon" href="assets/img/favicon/favicon.ico" type="image/x-icon">
		<link rel="icon" href="assets/img/favicon/favicon.ico" type="image/x-icon">
		<!-- GOOGLE FONT -->
		<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans:400italic,700italic,300,400,700">
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
						<div id="app-cerebro" class="menuHeader menuItem appLink" data-app="skynet">Cerebro</div>
						<div id="app-map" class="menuSubHeader menuItem appLink" data-app="cerebromap">User Map</div>
						<div class="menuHeader menuItem">S.H.I.E.L.D. Archives</div>
						<div id="app-sector1" class="menuSubHeader menuItem appLink" data-app="grindr" data-profile="grindrUser">Sector 1</div>
						<div id="app-sector2" class="menuSubHeader menuItem appLink" data-app="jackd" data-profile="jackdUser">Sector 2</div>
						<div id="app-sector3" class="menuSubHeader menuItem appLink" data-app="scruff" data-profile="scruffUser">Sector 3</div>
						<div id="app-junk" class="menuHeader menuItem appLink" data-app="junkcollector">JunkCollector</div>
				</div>
				<div id="topBanner">
						<div class="appMenuTrigger">
							<i class="fa fa-bars"></i>
						</div>
						<div class="appLogo">Prometheus</div>
						<div class="appSearchTrigger">
							<i class="fa fa-search"></i>
						</div>
				</div>
				<div id="appContainer">
					<div id="appView"></div>
					<div id="ajaxLoader"></div>
				</div>
				<?php include('partials/sector1User.php'); ?>
				<?php include('partials/sector2User.php'); ?>
				<?php include('partials/sector3User.php'); ?>
        <?php include('partials/cerebroProfile.php'); ?>
				<?php include('partials/mediaViewer.php'); ?>
		</div>
		<div id="prometheusSplash" class="animated fadeIn">
			<div id="loader"></div>
			<div>
				<div class="title">Project<span>Prometheus</span></div>
				<div class="subTitle">Version 1.0</div>
			</div>
		</div>
    <script src="https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/markerclusterer.js"></script>
		<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCuVIyhoWZ0kI2uHPuBGjaXMLb6dmkMg-A"></script>
		<script type="text/javascript" src="assets/js/app.min.js"></script>
  </body>
</html>
