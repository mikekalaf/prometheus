<?php
include('../includes/skynet.php');

$url = "http://v9.ikioskcloudapps.com/shield/cerebro/map";
$request_headers = array();
$fetchData = curl_handler($url, $request_headers, $blank, "GET");
$sectorData = json_decode($fetchData ,true);

//Cleanup the Duplicates
$protocolArray = array();
$deleteArray = array();
foreach($sectorData['data'] as $key => $gpspoint) {
  if (in_array($gpspoint['protocol_id'], $protocolArray)) {
    $deleteArray[] = $key;
  } else {
    $protocolArray[] = $gpspoint['protocol_id'];
  }
}

foreach($deleteArray as $key) {
  unset($sectorData['data'][$key]);
}

$ajaxScripts = "";
foreach($sectorData['data'] as $key => $beacon) {
  $protocolArray[] = $beacon['protocol_id'];
  $beacon['trackingDate'] = date('M d Y, g:ia', strtotime($beacon['date_created']));
  if (isProd()) {
    mysql_select_db($database_ikiosk, $ikiosk);
    $query_checkScan = "SELECT * FROM ".$beacon['user_type']." WHERE protocol_id = '".$beacon['protocol_id']."'";
    $checkScan = mysql_query($query_checkScan, $ikiosk) or die(mysql_error());
    $row_checkScan = mysql_fetch_assoc($checkScan);
    $totalRows_checkScan = mysql_num_rows($checkScan);
    if ($totalRows_checkScan != 0){
      switch($beacon['user_type']) {
          case "profiles_grindr":
            $beacon['type'] = "Sector 1";
            $beacon['id'] = $row_checkScan['profile_id'];
            $beacon['display_name'] = $row_checkScan['display_name'];
            $beacon['age'] = $row_checkScan['age'];
            $beacon['about'] = $row_checkScan['about_me'];
            $beacon['thumbnail'] = $row_checkScan['thumbnail'];
            $beacon['fullsize'] = $row_checkScan['profile_photo'];
            $beacon['url'] = "partials/cerebro/grindr.php?id=".$row_checkScan['profile_id'];
            break;
          case "profiles_scruff":
            $beacon['type'] = "Sector 3";
            $beacon['id'] = $row_checkScan['profile_id'];
            $beacon['display_name'] = $row_checkScan['display_name'];
            $beacon['age'] = $row_checkScan['age'];
            $beacon['about'] = $row_checkScan['about_me'];
            $beacon['thumbnail'] = $row_checkScan['thumbnail'];
            $beacon['fullsize'] = $row_checkScan['profile_photo'];
            $beacon['url'] = "partials/cerebro/scruff.php?id=".$row_checkScan['profile_id'];
            break;
          case "profiles_jackd":
            $beacon['type'] = "Sector 2";
            $beacon['id'] = $row_checkScan['profile_no'];
            $beacon['display_name'] = $row_checkScan['first_name'].$row_checkScan['last_name'];
            $beacon['age'] = $row_checkScan['age'];
            $beacon['about'] = $row_checkScan['profile_text'];
            if (!empty($row_checkScan['photo1'])) {
              $beacon['fullsize'] = $row_checkScan['photo1'];
            } else if (!empty($row_checkScan['photo2'])) {
              $beacon['fullsize'] = $row_checkScan['photo2'];
            } else if (!empty($row_checkScan['photo3'])) {
              $beacon['fullsize'] = $row_checkScan['photo3'];
            } else if (!empty($row_checkScan['photo4'])) {
              $beacon['fullsize'] = $row_checkScan['photo4'];
            } else if (!empty($row_checkScan['photo5'])) {
              $beacon['fullsize'] = $row_checkScan['photo5'];
            }
            $beacon['fullsize'] = "https://skynet.chasingthedrift.com/pages/embed/imageProxy.php?image=".$beacon['fullsize'];
            $beacon['thumbnail'] = $beacon['fullsize']."s";
            $beacon['url'] = "partials/cerebro/jackd.php?id=".$row_checkScan['profile_no'];

        }
    }
  }
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
   zoom: 10,
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
