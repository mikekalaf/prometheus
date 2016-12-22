<?php
include('../includes/prometheus.php');

$url = "http://v9.ikioskcloudapps.com/shield/cerebro/map";
$request_headers = array();
$fetchData = curl_handler($url, $request_headers, $blank, "GET");
$sectorData = json_decode($fetchData ,true);

$ajaxScripts = "";
foreach($sectorData['data'] as $key => $beacon) {
  $beacon['trackingDate'] = date('M d Y, g:ia', strtotime($beacon['date_created']));
  //$beacon['userData'] = "http://skynet.chasingthedrift.com/api/index.php?action=finduser&id=".$beacon['protocol_id'];
  $ajaxScripts .= "prometheus.userMap.push(".json_encode($beacon).");\r\n";
}
echo "<div id='cerebroMap'></div>";
echo "<script id='ajaxScript'>\r\n";
echo $ajaxScripts;
?>
var styledMapType = new google.maps.StyledMapType(
[{"featureType":"administrative","elementType":"all","stylers":[{"saturation":"-100"}]},{"featureType":"administrative.province","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"all","stylers":[{"saturation":-100},{"lightness":65},{"visibility":"on"}]},{"featureType":"poi","elementType":"all","stylers":[{"saturation":-100},{"lightness":"50"},{"visibility":"simplified"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":"-100"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"all","stylers":[{"lightness":"30"}]},{"featureType":"road.local","elementType":"all","stylers":[{"lightness":"40"}]},{"featureType":"transit","elementType":"all","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#ffff00"},{"lightness":-25},{"saturation":-97}]},{"featureType":"water","elementType":"labels","stylers":[{"lightness":-25},{"saturation":-100}]}], {name: 'Styled Map'});
var mapCenter = {lat: 40.748441, lng: -73.985664};
setTimeout(function() {
  prometheus.googlemap = new google.maps.Map(document.getElementById('cerebroMap'), {
   zoom: 15,
   center: mapCenter
  });
  prometheus.googlemap.mapTypes.set('styled_map', styledMapType);
  prometheus.googlemap.setMapTypeId('styled_map');
  prometheus.mapMarkers = [];
},1000);
<?php
echo "prometheus.cerebromap.displayMapBeacons();\r\n";
echo "</script>\r\n";
?>
