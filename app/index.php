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
				</div>
				<div id="appContainer">
					<div id="topBanner">
							<div class="appMenuTrigger">
								<i class="fa fa-bars" aria-hidden="true"></i>
							</div>
							<div class="appLogo">Prometheus</div>
					</div>
					<div id="appView">
					
					</div>
				</div>
		</div>
		<div id="prometheusSplash" class="animated fadeIn">
			<div id="loader"></div>
			<div>
				<div class="title">Project<span>Prometheus</span></div>
				<div class="subTitle">Version 1.0</div>
			</div>
		</div>
		<div id="appOverlay">
	  <div>
		<div id="modalWrapper">
		</div>
		<script type="text/javascript" src="assets/js/app.min.js"></script>
  </body>
</html>
